---
path: "/posts/serverless-koa"
title: Serverless Koa기반 Api Server 배포하기 
date: 2018-07-29 00:37:00
banner: ../images/serverless.png
tags: ["serverless", "serverless-http"]
categories:
- serverless
author: "y0c"
---
이 포스팅에선 aws lambda와 serverless framework를 통해서 koa 기반의 api server를 배포하는 것에 대해 소개하려한다. 
전체적인 배포 과정을 나열하기보다는 간략한 소개와 boilerplate로 어떤식으로 접근하는지에 중점을 두었다. 

필자가 처음 lambda를 접했을땐 토픽별 기능(크롤링, 이미지처리) 이나 AWS와 연계된 서비스에서 모니터링 혹은 알림 같은 곳에 사용할때 유용한 정도로만 생각하고 있었다. 
lambda에서는 node.js, phtyon, java 등과 같은 여러가지 언어를 제공하고 있지만 
실제로 api server를 통째로 lambda를 이용하기엔 오히려 불편한점이 꽤 많아 보였기 때문이다. 

아래 코드는 AWS lambda 에서 제공하는  nodejs 예시 코드이다. 
```javascript
exports.myHandler = function(event, context, callback) {
   console.log("value1 = " + event.key1);
   console.log("value2 = " + event.key2);  
   callback(null, "some success message");
   // or 
   // callback("some error type"); 
}
```

위 코드가 하나의 function 즉 endpoint가 된다. 
단순한 하나의 function 이 아닌 api server를 개발하려면 수 많은 lambda function을 만들어야하기 떄문에 구조가 굉장히 난해해 보였다. 

지금껏 express, koa, hapi 와 같은 프레임워크를 통해 backend 개발을 해왔다면  위구조에서 어떤식으로 사용해야될지 잘 감이 오지 않을것이다. 

최근에 지인을 통해 serverless-http 모듈에 대해 듣고 잠시 접해볼기회가 있었는데 
serverless-http는 lambda에 대한 약간의 이해만 있으면 기존에 express나 koa를 통해서 API를 쉽게 Wrap해서 배포할 수 있게된다. 
실제로 사용해본 경험으론 serverless-http를 사용하게되면 간단한 설치와 몇라인으로 wrapping 할 수 있었다. 
모듈에대한 자세한 설명은 해당 Repo를 참고하도록 하자.
[GitHub - dougmoscrop/serverless-http: Use your existing middleware framework (e.g. Express, Koa) in AWS Lambda 🎉](https://github.com/dougmoscrop/serverless-http)


이제 본격적으로  koa 기반 api-server 를 lambda에 배포하는 작업을 해보자. 
이 작업을 하기위해선 AWS계정과 Serverless 계정이 필요하다. 
[Serverless - The Serverless Application Framework powered by AWS Lambda, API Gateway, and more](https://serverless.com/)
https://aws.amazon.com/ko/

AWS는 계정을 만든후  IAM을 통해 user를 만든후 `access_key` 와 `secret_key`가 필요하다. 이 과정에 대해선 아래 글에 자세히 설명되있으니 참조하도록 하자. 
[serverless/credentials.md at master · serverless/serverless · GitHub](https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md)


먼저, serverless 를 설치한다. 
`npm install -g serverless`

아래 명령어는 aws nodejs용 템플릿을 만들어주는데 틀을 보고 필요한 부분은 찾아서 작성하도록한다. 
`serverless create -t aws-nodejs` 

koa기반 app 을 배포할것이기 때문에 serverless-http 모듈도 설치하도록 하자. 
`npm install serverless-http` 

여기까지 됬다면  기본적인 앱을 배포하는데 기본적인 준비가 끝난 것이다. 
기존 koa app을 개발하는 구조와 동일하게 사용하여도 무방하다. 
serverless 배포를 위해 작성해야될 코드는 아래가 전부이다. 
```javascript
import serverless from 'serverless-http';
import app from 'app';

// handler는 serverless yml 파일에서 지정해준 이름을 사용하여야한다. 
export const handler = serverless(app);
```

app을 배포할때는 `sls deploy —stage <stage_name>` 을 통해서 배포할 수 있다. 

사용해본 후기로 생각보다 간단하게 koa 혹은 express app을 lambda로 배포할 수 있었다. 앞으로도 간단한 api server 를 구성할때 자주 사용하게 될 것 같다. 

express 기반 boilerplate는 검색하면 바로나오는 편인데 koa 관련해서는 boilerplate가 적당한게 보이지않아서 연습하면서 간단하게 boilerplate를 구성해보았다.  

[GitHub - y0c/serverless-koa-boilerplate: Serverless-http with Koa Boilerplate](https://github.com/y0c/serverless-koa-boilerplate)

ES6/7 Syntax를 사용할 수 있도록 babel 과 serverless-webpack 관련 설정을 추가된 boilerplate 이다. 



