---
path: "/posts/docker-private-registry"
title: Docker Private Registry 구축하기
date: 2018-10-20 22:33:51
tags: ["Docker"]
categories: Docker
banner: ../images/banner/docker.png
author: "Hosung Lim"
---
기본적으로 Docker는 Docker Hub라는 공식 Registry를 통해서 이미지를 Push, Pull 할 수 있다.
하지만 공개적으로 노출시킬 이미지가 아니라면 Private Registry를 별도로 구축해서 이용해야한다.
이번 포스팅에선 Docker Private Registry를 구축하는 방법에 대해 작성해보려 한다.
Docker Registry 를 구축하기 위해선 SSL 인증서가 필요하다.
만약 인증서를 구매하지 않고 사용하고 싶다면 **insecure-registry** 를 등록하거나 아니면 **Let's Encrypt** 와 같은 무료 TLS솔루션을 찾아보기 바란다.
먼저 Docker Registry에 있는 docker-compose 파일을 이용하도록 한다.

```yaml
    registry:
      restart: always
      image: registry:2
      ports:
        - 5000:5000
      environment:
        REGISTRY_HTTP_TLS_CERTIFICATE: /certs/domain.crt
        REGISTRY_HTTP_TLS_KEY: /certs/domain.key
        REGISTRY_AUTH: htpasswd
        REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
        REGISTRY_AUTH_HTPASSWD_REALM: Registry Realm
      volumes:
        - /path/data:/var/lib/registry
        - /path/certs:/certs
        - /path/auth:/auth
```

- cert - SSL인증서가 들어갈 디렉토리
- auth - htpasswd 계정 정보를 넣어줄 디렉토리

인증서가 준비되었다면 auth/htpasswd 파일을 만들어보자.
htpasswd관련 패키지가 설치되어있지 않다면 설치하고 아래 명령을 실행하도록 한다.

```bash
    sudo htpasswd -B <파일경로> <만들계정>
```
명령어를 실행하면 패스워드를 물어보고 계정이 만들어진다.

이제 잘되는지 확인하는 일만 남았다.

```bash
    docker-compose up -d
```
docker-compose 를 통해서 container를 데몬으로 띄운다.
접속은 브라우저나 curl 원하는 형태로 확인이 가능하다.

```bash
    curl -u <계정명>:<패스워드> https://....
```

정상적으로 Push, Pull이 되는지 확인해보자

```bash
    docker pull hello-world
    docker tag hello-world <Registry URL>/hello-wrold
    docker login <Registry URL>
    docker push <Registry URL> hello-world
```

Push가 되었다면 `<Registry URL>/v2/_catalog` 로 접속해서 Repositories 목록에서 확인할 수 있다.
