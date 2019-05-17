---
path: "/posts/jenkins-docker"
title: Jenkins x Docker Tomcat War 배포하기
banner: ../images/banner/jenkinsxdocker.png
categories: Docker
tags: ["Docker", "jenkins"]
date: 2018-10-22 13:00:15
author: "y0c"
---

요즘의 소프트웨어 개발은 어떻게 만들까도 많이 고민하지만 어떻게 운영하고 유지보수 할 것인가? 에 대한 고민을 많이 하는것 같다. 어플리케이션 구현보다는 운영에 초점이 맞춰지는 것이다.  소프트웨어 개발을 분석/개발/테스트/배포/운영 의 단계로 나눈다면 배포/운영을 뜻한다. 필자는 생산성에 있어서 굉장히 관심이 많은 편인데 개발을 하면서 지속적으로 느끼는점이 배포/운영에 대한 정확한 프로세스가 정확히 구축되어있지 않으면 추후에 많은 생산성 낭비를 가져올 수 있다는 것이다.

Docker를 사용하기 전에는 Maven기반의 프로젝트를 배포할때 보통 Jenkins에서 SCP와 SSH를 통한 배포 혹은 [Deploy to Container Plugins](https://plugins.jenkins.io/deploy) , Maven 의 Tomcat 플러그인 등 여러가지 방법을 통해서 배포해왔지만 먼가 부족한 느낌이 들었다.
이런방식들 모두 배포하는 서버환경에 의존적이거나 WAS  Container에 의존적이기 때문이다. Docker는 DevOps의 도구로 자주쓰이는 도구인 만큼 많은 의존성들을 제거할 수 있고 멱등성(idempotent)을 제공한다.

이번 포스팅은 Maven기반의 프로젝트를 Dockerizing 후 Jenkins를 통해서 배포하는 Workflow 구축에 대해 소개하려한다.

## Deploy Flow

![workflow](/static/posts/workflow.png)

1. 개발한 내용을 Git, Svn 에 반영한다.
2. Jenkins Workspace로 Pull 을 받는다.
3. Maven 혹은, Gradle과 같은 빌드 도구를 통해 Build를 한다.
4. Docker Image 로 Dockerizing 한다.
5. Private Registry에 Push 해준다.
6. 원격지에서  Image를 Pull 받은 후 Container를 배포한다. (Run)

여기서 5번인 Private Registry는 구지 따로 구축하고 싶지않다면 SSH를 통해서 이미지를 빌드하거나 다른방법을 사용하여도 좋다.  이 글에선 Registry 를 이용한다.

### Jenkins 설치

먼저 Jenkins를 설치해보자. 이번 주제는 Docker를 활용하는 만큼 Docker를 통해서 설치해볼 것이다.

Docker를 이용한 설치는 정말 간단하다.
```bash
docker pull jenkins/jenkins:latest
docker run -p 8080:8080 \
   	  -e TZ='Asia/Seoul'
        --name jenkins \
        -v ./jenkins:/var/jenkins_home -d
```

간단하게 사용한다면 이정도만 가지고 실행시키면 된다.

하지만 Jenkins를 Docker로 설치할 경우 Docker 내부에서 Pull & Build가 진행되기 때문에 배포는 모두 Container기준으로 원격지가 된다. 즉 Host OS에 배포하는것도 원격지처럼 배포해야 한다.

SSH를 통해서 명령어를 실행시킬수도 있지만 Docker 에서는 TCP Socket을 지원한다.
이 TCP Socket을 이용하면 환경변수 지정하는것으로 Remote 에 있는 Docker 명령이 가능해진다.

간단한 예제를 통해서 이해해보자
```bash
#!/bin/bash
export DOCKER_HOST=tcp://192.168.0.10:4243
docker ps
```
위 스크립트를 실행하게되면 해당 주소에 있는 docker 프로세스 정보를 보여준다.

TCP Socket을  사용하기위해 준비해야할 것들이 있다.
* Jenkins Container 내부에 Docker가 설치 되어있어야 한다.
* 배포할 원격지에 TCP Socket이 활성화 되어있어야 한다.
[Docker - How do I enable the remote API for dockerd](https://success.docker.com/article/how-do-i-enable-the-remote-api-for-dockerd) 참고

Jenkins 이미지에서 Docker 명령이 가능하도록 Image를 커스터마이징 한다.
아래 Dockerfile을 참고하자
```
# dind-jenkins
FROM jenkinsci/jenkins:latest

USER root
RUN apt-get update -qq
RUN apt-get install -qqy apt-transport-https ca-certificates
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
RUN echo deb https://apt.dockerproject.org/repo debian-jessie main > /etc/apt/sources.list.d/docker.list
RUN apt-get update -qq
RUN apt-get install -qqy docker-engine

USER jenkins
```
이렇게 docker container 내부에 docker를 설치하는것을 Docker in Docker 라고 한다.

위 파일로 dind-jenkins 이미지를 Build 한 후 필요한 옵션만 넣어서 Run 시킨다.
초기에 패스워드를 넣는 창이 나오는데 Docker Container 에 들어가서 확인해야한다.
```bash
docker exec -it dind-jenkins /bin/bash
cat /var/lib/jenkins/secrets/initialAdminPassword
```
그 이후에는 플러그인을 설치하고 계정설정을 해주면 된다.

Jenkins 설치가 완료됬으면 Pipeline Job을 생성한다.
기호에 따라 Maven Job이나 FreeStyle Job을 생성할 수 있지만 최근엔 인프라 설정을 수동으로 설정하는 대신 코드로 관리하는 Infrastructure as Code방식이 많이 쓰이고 있다.

프로젝트 루트에 Jenkins파일과 Dockerfile을 생성한다.
Jenkinsfile은 Jenkins Build 설정을 작성해야한다.
```bash

def mvnHome
node {
    try {
        stage('Checkout') {
            checkout scm
            mvnHome = tool 'M3'
        }
        stage('Environment') {
            sh 'git --version'
            echo "Branch: ${env.BRANCH_NAME}"
            sh 'docker -v'
            sh 'printenv'
        }
        stage('Push Image') {
            sh "'${mvnHome}/bin/mvn' clean install -P production"
            sh('scripts/image.sh')
        }
        stage('Deploy') {
            sh('scripts/deploy.sh')
        }
    } catch (err) {
        throw err
    }
}
```
`image.sh`  에는 Private Registry에 Push하는 스크립트파일이다.
`deploy.sh` 에는 Private Registry에서 Pull 받은 후 Docker Container 를 run 하는 스크립트 파일이다.

상황에 맞게 골격에 맞춰서 스크립트를 작성해주면 된다.

아래는 war파일을 Docker Image로 Dockerizing 할 수 있는 Dockerfile 이다.
```
FROM tomcat:8-jre8
WORKDIR /usr/local/tomcat
RUN rm -rf ./webapps/*
COPY ./target/*.war ./webapps/ROOT.war
EXPOSE 8080
CMD $CATALINA_HOME/bin/startup.sh && tail -f $CATALINA_HOME/logs/catalina.out
```
tomcat은 알맞는 jre 버전과 톰캣 버전을  선택해서 Base Image 를 생성하면 된다.


## 마무리
Docker를 활용한 배포는 기존의 방식보다 서버에 대한 의존성에 많은 부분을 제거할 수 있다. Tomcat Manager를 통해서 배포할떈 Out of memory 혹은 jdk 버전의 문제 등 몇가지 이슈가 있었는데 많은부분을 해소해주었다. 다음엔 Docker Swarm을 통한 Container orchestration 관리에 대해 다뤄보려한다.
