---
path: "/posts/js-closure"
title: Javascript Closure란?
date: 2018-09-10 04:50:35
categories: Javascript
banner: ../images/banner/js.png
tags: ["closure", "javascript"]
author: "Hosung Lim"
---

javascript 를 공부하다보면 closure라는 개념을 자연스럽게 접하게 된다. 
이번 포스팅에선 Closure에 대해서 좀 더 깊게 다뤄보려고 한다. 

Closure 개념에 앞서서 먼저 `함수`에 대해서 언어별로 처리하고 있는 방법에 대해서 논해보도록 하자.

함수는 언어별로 사용되는 형태의 차이가 있다. 
예를들면, Java와 같은 언어에서는 함수(메소드)를 `문(Statement)` 처럼 취급한다.
다른 예를보면 C, Javascript, Python, Kotlin, Swift 와 같은 언어를 보면 함수도 일반적인 `값(Value)`처럼 취급한다. 

## 1급 객체(first-class citizens)
1급 객체는 일반적으로 위에서 설명한 함수를 `값(Value)`처럼 취급하는 언어들에 해당된다. 

1급 객체의 조건은 다음과 같다. 
* 변수나 데이터 구조안에 담을 수 있다. 
* 파라미터로 전달할 수 있다. 
* 반환값으로 사용할 수 있다. 

여기서 런타임 시에 함수를 생성할 수 있는지 여부에 따라 `2급 객체` 로 분류하기도 한다. 

## 함수를 1급 객체로 다루는 언어들의 특징
함수를 1급 객체로 다루는 언어들의 특징에 대해서 잠시 알아보자. 
* 런타임시에 동적으로 함수를 생성가능  ex) lambda
* 함수를 `값(Value)`로 취급 
* 함수가 생성된 환경을 기억하고 있다. 

아래 간단한 예시를 보자 
```javascript
function makeFunc() {
    //자유변수(Free Variable)
    var name = 'Mozilla';

    //Closure
    function displayName() {
        //지역변수(Local Variable)
        var v1 = 'test';
        alert(name);
    }

    return displayName;
}
```
함수가 런타임시에 동적으로 함수를 생성하는 예제이다. 
여기서 몇가지 개념에 대해 정리하려고 한다. 
런타임시에 함수를 생성할 수 있는 언어들은 생성된 환경(Context)를 기억하고 있다. 
함수를 `문(Statement)`으로 취급하는 언어들은 기본적으로 Global 과 local영역을 참조했다면 참조할 영역이 늘어난 셈이다. `displayName` 함수 입장에서 상위 함수인 `makeFunc`의 name도 참조할 수 있어야한다. 여기서 local영역이 아닌 상위 함수의 변수들을 `자유변수(Free Variable)` 이라고 한다.  그리고 이 자유변수들을 가르키는 함수가 `Closure`이다. 

위 예제에서는 name 자유변수를 사용하고 있는 displayName이 Closure

### Context 
> 함수가 생성된 환경 Javascript에서는 Lexical Environment라고도 한다.  

### 자유변수(Free Variable)
> local영역이 아닌 Context 영역의 변수들 
> 즉, local에 존재하지 않는 모든 변수를 뜻함

### Closure
> 독립적인 자유변수를 가리키는 함수 
> (자유변수를 가두는 영역)

정리하자면, Closure란 JS에 국한된 개념이 아니라 런타임에 함수가 만들어지는 언어에서는 `자유변수` 라는 개념이 존재하고 `자유변수`가 존재하면 필연적으로 `Closure` 가 발생하게 된다. 

## Closure와 성능 
일반적으로 함수의 지역변수는 함수가 끝남과 동시에 메모리에서 해제된다. 
클로저는 위에서 언급했듯이 함수가 생성된 환경(Context)을 기억하고 변수(자유변수)를 참조할 수 있다. 그리고 자유변수를 한 번 이라도 참조했다면 메모리에서 해제되지 않는다. 그러므로 Closure가 필요하지 않은 상황에서 함수내에 함수를 작성하는것은 메모리 소비 측면에서 부정적인 영향을 미친다. 

## Closure와 Scope
ES6이전의 JS에서는 오직 function만의 새로운 scope를 생성했다. 
아래 예시를 보도록 하자.
```javascript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = function() {
            showHelp(item.help);
        }
    }
}
```
대충 훑어보기에는 코드에 문제가 없어보일 수 도 있다. 
하지만 위 코드는 의도한대로 작동하지 않는다. 모두 age에 관한 도움말을 보여주게된다. 
코드를 분석해보면 onfocus에는 클로저가 연결되어있다. loop문을 통해 3개의 클로저가 생성되지만 하나의 자유변수(item)를 공유하기 때문이다. 
(var은 scope 범위가 함수이기 때문에)

해결방법은 클로저를 하나더 생성하는 것이다. 
클로저를 하나 더 생성함으로 동일한 item이 아닌 각각 다른 item을 가리키게 된다. 
```javascript
for (var i = 0; i < helpText.length; i++) {
    (function(item){
        document.getElementById(item.id).onfocus = function() {
            showHelp(item.help);
        }
    })(helpText[i])
}
```

위와같은 방법이 좀 복잡하다고 느껴진다면 `let`을 사용하도록 하자.
let은 유효범위가 block 즉, 중괄호 이므로 클로저를 추가적으로 만들지 않아도 의도한대로 동작하게 된다. 

### 참고 
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures
