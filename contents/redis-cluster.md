---
path: "/posts/redis-cluster"
title: Redis Cluster 구축하기
tags: ["Redis"]
categories: Redis
banner: "/images/banner/redis.png"
date: 2018-10-21 10:21:57
author: "Hosung Lim"
---

최근에 구축한 서버환경 중 Session Clustering과 Cache의 용도로 Redis를 사용한 적이 있다.
하지만 Redis가 설치된 서버가 한개라 해당 서버가 다운되면 모든 WAS가 서비스를 하지못하는 상황이 나오게 된다.
이런 문제때문에 FailOver처리를 위해 Redis Cluster 구축을 생각하게 되었다.
이번 포스팅에선 Redis Cluster를 구축하면서 있었던 문제점과 경험담에 대해 공유해보려 한다.

Redis 는 기본적으로 손쉽게 Replication을 구성해서 장애대비를 할 수 있다.
Master/Slave구조를 갖게되는데 Master는 Read/Write 모두가능하고 Slave는 Read Only이다.
상황에 따라서 Read Only Connection만 필요한경우도 있을테지만 이런구조에서는 Master가 Down되면 수동으로
Master를 복구해주어야 한다.

이런상황을 막기위한 솔루션으로 Redis Sentinel 과 Redis Cluster 라는 솔루션이 있는데
이 두 가지 솔루션중 선택은 상황에 맞게 써주면 좋을 것 같다. Sentinel 에 관해선 따로 포스팅을 작성해 보려한다.
이번글에선 Redis Cluster 솔루션에 대해 다뤄보려고 한다.

## Redis Cluster가 제공하는 기능

* Dataset을 여러노드에 분산해서 저장
* Auto FailOver( Master - Slave ) 구조를 통해 해결

## Redis Cluster TCP Port

Redis Cluster는 두개의 TCP Port를 사용하여 통신한다. 기본포트인 6379 혹은 다른포트여도 상관없다.
그리고 Node간 통신을 위한포트인 16379 가 사용되는데 이 두 포트 사이의 간격을 10000으로 설정하여 사용한다.
자세히 알필요는 없지만 추후에 방화벽 설정에 유의해야한다.

## Redis x Docker
Redis Cluster공식 튜토리얼을 읽어보면 Redis는 Docker의 bridge, 혹은 overlay네트워크를 지원하지 않는다고 작성되어있다. 그래서 기본적으로 Host모드를 사용하라고 한다. 작성하면서 다른글들을 좀 읽어보았는데 Redis 4.0 이상의 버전부터는 `cluster-announce-ip`, `cluster-announce-port`, `cluster-announce-bus-port`를 직접지정할 수 있게되어서 다른 네트워크도 사용이 가능해진것 같다. 여기에 대해 자세한 사항은 아래글을 참고하도록 하자.
[https://get-reddie.com/blog/redis4-cluster-docker-compose/](https://get-reddie.com/blog/redis4-cluster-docker-compose/)
필자의 경우 Redis Instance를 Host Mode로 사용하고 있다.

## Try Redis Cluster
이제 간단하게 Redis Cluster를 구성해보자. 지금 만들어볼 구조는 Master 3, Slave 3개의 노드를 갖는 Redis Cluster이다.

### Redis를 설치한다.
Source를 받아서 컴파일하는 방식으로 설치할 수 있고, apt와 같은 패키지 매니저로 설치할 수 있다.
```bash
wget http://download.redis.io/releases/redis-4.0.11.tar.gz
tar -xvf redis-4.0.11.tar.gz
cd redis-4.0.11
make
make install
```

### Redis Cluster에 사용될 Reids Server를 셋팅한다.
```bash
mkdir cluster-test
cd cluster-test
mkdir $(seq 7000 7005)
```
위와같이 cluster-test 라는 폴더를 만들고 거기에 서버에서 각각사용할 포트별로 폴더를 구성한다.
폴더에는 각서버의 config파일과 redis-server executable 파일이 들어가면 된다.
config 파일은 redis설치폴더에 그리고 redis-server파일은 src폴더 아래에 존재한다.
해당파일을 폴더에 각각 복사하도록 하자.

이때 redis.conf파일에 들어갈 내용은 cluster기본설정만을 포함하고 있다.
    ```
    port 7000
    cluster-enabled yes
    cluster-node-timeout 5000
    pidfile /var/run/redis.pid
    dbfilename dump-cluster00.rdb
    cluster-config-file nodes.conf
    ```

### Redis Server를 실행한다.
```bash
# 폴더 별로 들어가서 실행 (귀찮다면 bash script를 하나만들어서 쓰면 된다. )
./redis-server ./redis.conf &
```

여기까지 되었다면 redis-cli 를 통해서 접속이 가능한 상태가 되었다.
하지만 아직 cluster로 구성해주지 않았기 때문에 get,set이 불가능하다.

cluster를 만드는 도구는 여러가지가 존재한다.
* redis-cli
* redis-trib.rb
* redis-trib.py

이글에선 redis-trib.rb를 통해 만들어보도록 한다.
```bash
redis-trib.rb create --replicas 1 \
        127.0.0.1:7000 \
        127.0.0.1:7001 \
        127.0.0.1:7002 \
        127.0.0.1:7003 \
        127.0.0.1:7004 \
        127.0.0.1:7005
```
replicas 1은 master하나당 slave하나라는 의미이다.
위 명령어를 실행하면 위에서 부터 3개의 master 그밑으로 3개의 slave로 설정할거냐고 묻는 메시지가 나온다.
yes를 누르면 cluster가 구성된다.

### 접속해서 Test 한다.
```bash
redis-cli -p 7000 -c
```
뒤에 `-c`옵션은 cluster mode를 의미하므로 반드시 붙여주어야 한다.
접속이 정상적으로 이루여젔다면 get, set 명령어를 통해서 dataset의 분산저장 그리고 failover테스트를 할 수 있다.

```bash
set <KEY> <VALUE>
get <KEY>
```

set이나 get을 실행하면 어떤 cluster node로 Redirect됬는지 간단하게 나올것이다.
그리고 Failover 테스트의 경우 server를 하나씩 내리면서 테스트하면 된다. 필자의 경우 8개의 노드중 6개이상 Down되지않으면 정상적으로 동작하였다.



## 유의사항
Redis Cluster를 사용할땐 Client가 cluster를 지원해야 한다. 필자는 spring환경에서 Jedis Client를 활용하였다.
Spring Boot은 간단하게 되어있는데 MVC는 오래되서 마땅한 예제를 찾기 어려웠던 기억이 있다.


## 마무리
간단하게 Redis Cluster를 구축해보고 적용해보았는데 구축자체는 굉장히 간단하지만 여러가지로 생각을 많이 해봤던것같다. Sentinel과 Cluster 사이에서 어떤것을 사용할지 고민했었고 한편으론 Redis의 용도에 비해 과한 아키텍쳐가 아닌가 까지생각을 해봤던것같다. 처음 Redis를 도입하게된 이유도 Session Clustering이나 Cache를 현재 구조에서 가장 적절하게 풀어낼 수 있을거라 생각했는데 관리포인트가 느는건 어쩔수 없는느낌이다. Redis는 Socket, Cache, session등 정말 여러가지 용도로 사용되고 있지만 좀 더 잘 활용할수 있는 밥법도 생각해봐야겠다.

## 참고
* [Redis-tutorial](https://redis.io/topics/cluster-tutorial)
* [Redis 4 with docker-compose](https://get-reddie.com/blog/redis4-cluster-docker-compose/)
