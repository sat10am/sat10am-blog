---
path: "/posts/js-decorator"
title: Javascript Decorator Pattern
date: 2018-08-10 22:43:13
tags: ["design-pattern", "javascript"]
categories: Javascript 
banner: ../images/banner/js.png
author: "y0c"
---
Decorator Pattern의 사전적 정의는 아래와 같다. 

> 주어진 상황 및 용도에 따라 어떤 객체에 특성 혹은 행동을 덧붙이는 패턴 

서브클래싱 보다 좀 더 유연한 기능확장을 할 수 있도록 대안으로 쓰임 
앞서 학습한 Builder Pattern에서는 원하는 속성만 셋팅해서 손쉽게 원하는 객체를 만들어냈다면 Decorator Pattern 을 사용한다면 *OCP 원칙*에 어긋나지 않게 객체를 원하는기능만 손쉽게 추가할때 용이하다. 

먼저 일반적인 Decorator Pattern의 예제를 보자. 
아래 예제는 Head First 책에서 나오는 예제를 조금 변형해서 Javascript로 작성한 것이다.
( 코드 가독성을 위해 *ES6 Syntax* 로 작성하였다.)

```javascript
class Coffee {

    getCost() {
        return 1.0;
    }

    getIngredients() {
        return "Coffee";
    }
}

class CoffeeDecorator extends Coffee {

    constructor(decoraterCoffee) {
        super();
        this.decoraterCoffee = decoraterCoffee;
    }

    getCost() {
        return this.decoraterCoffee.getCost();
    }

    getIngredients() {
        return this.decoraterCoffee.getIngredients();
    }

    toString() {
        return `Cost : ${this.getCost()} , Ingredients : ${this.getIngredients()}`;
    }
}

class Milk extends CoffeeDecorator {

    getCost() {
        return super.getCost() + 0.5;
    }

    getIngredients() {
        return super.getIngredients() + ", Milk";
    }
}

class Cream extends CoffeeDecorator {

    getCost() {
        return super.getCost() + 0.7;
    }

    getIngredients() {
        return super.getIngredients() + ", Cream";
    }
}


let coffee = new Coffee();

let caffeLatte = new Milk(coffee);
let caffeMocha = new Cream(milkCoffee);

//Inline-Style
// let milkCreamCoffee = new Cream( new Milk( new Coffee() ) );

console.log(caffeLatte.toString()); // Print -> Cost : 1.5 , Ingredients : Coffee, Milk
console.log(caffeMocha.toString()); // Print -> Cost : 2.2 , Ingredients : Coffee, Milk, Cream
```

위 예제는 주어진 재료를 가지고 다양한 형태의 커피를 만드는 예제이다. 
만약 클래스의 상속을 통해 위 기능을 구현하려 한다면 CaffeeLatte, CaffeeMocha 등 
커피의 종류가 늘어날수록 클래스를 추가해주어야 할 것이다.  데코레이터 패턴을 적용한다면 위와같이 재료를 정의해놓고 커피를 만들때 필요한 것들만 유연하게 추가하여   커피를 제조할 수 있게된다. 

### Javascript 에서의 Decorator Pattern 
자바스크립트는 함수형 프로그래밍이 가능하기 때문에 고차 함수(Higher-Order Function)을 통한 Decorator 구현이 가능하다. 실제로 많은 라이브러리나 프레임워크에서도 이와같은 패턴으로 많이 사용되고 있다. 

예를 들자면 최근에  React의 Higher Order Component나  
물론 Express의 Middleware 같은 경우 Decorator Pattern 과 Chain-Of-Responsibility 가 조합된 형태이다. 

### Higher-Order Function 을 이용한 Decoractor 예제 
```javascript 

function ajaxRequest(url, method, data) {
    console.log(`request -> ${url} , ${method}, ${data}`);
}

function loggerDecorator(func) {
    return (...args) => {
        console.log('Start');
        console.log(`Argument : ${args.join(' , ')}`);
        const result = func.apply(this, args);
        console.log('End');
        return result;
    }
}

const request = loggerDecorator(ajaxRequest);

request('http://www.naver.com', 'get', 'query=test');

//Output
//Start
//Argument : http://www.naver.com , get , query=test
//request -> http://www.naver.com , get, query=test
//End

```

위 예제처럼 ajaxRequset를 하는 함수에 logging을 해주는 decorator를 추가한 예제이다.  이 예제는 정말 간단한 예제이지만 매우 유용하게 사용될 수 있다. 
전처리, 후처리 공통된 작업을 Decorator를 통해 추가할 수 있고  기능을 손쉽게 확장할 수 있다. 

### ES7 Decorator 
ECMAScript2016(ES7) 스펙에 추가된 것 중 Decorator라는 문법이 새로 제안되었다.  이 Decorator 문법은`class`, `function`, `property` 모두 어떤 특성이나 행동을 쉽고 깔끔하게 덧붙일 수 있다.  위에서 고차함수를 통해 구현했던 Decorator를 ES7의 Decorator 문법을 통해  아래와 같이 변경해 볼 수 있다. 
(아래 예제는 log 이외에 권한체크를 하는 decorator를 추가로 구현했다)
```javascript 

//log Decorator
function log(name) {
    return function (target, name, descriptor) {
        const func = descriptor.value;

        descriptor.value = (...args) => {
            console.log('Start');
            console.log(`Argument : ${args.join(' , ')}`);
            const result = func.apply(this, args);
            return result;
        }
    }
}


//Fake Auth
const AuthUtil = {
    isAuth: () => {
        return false;
    },

    roleCheck: (role) => {
        let currentUserRole = 'admin';
        return role === currentUserRole;
    }

}

// Authentication Decorator
function Authentication({
    isAuth,
    role
}) {
    return (target, name, descriptor) => {
        const func = descriptor.value;

        descriptor.value = (...args) => {

            if (isAuth) {
                if (!AuthUtil.isAuth()) {
                    throw new Error('Unauthorized Error!!!');
                }
            }

            if (role) {
                if (!AuthUtil.roleCheck(role)) {
                    throw new Error('Unauthorized Error!!!');
                }
            }
            return func.apply(this, args);
        }
    }
}




class Router {

    @log('index page')
    index() {
        console.log('request -> index');
    }

    @log('login page')
    login() {
        console.log('request -> login');
    }

    @log('admin page')
    @Authentication({
        isAuth: true,
        role: 'admin'
    })
    admin() {
        console.log('request -> admin');
    }
}

const router = new Router();

try {
    router.index('test', 'test2');
    router.admin('request admin page...');
} catch (e) {
    console.log(e.message);
}

//Output 
/*
Start
Argument : test , test2
request -> index
test
Start
Argument : request admin page...
Unauthorized Error!!!
*/
```
이 글에선 ES7 Decorator에 대해 자세히 내용을 다루진 않는다. 
( 파라미터에 대한 설명등은 babel 이나 mdn을 참조하도록 하자)

Decorator 자체는 함수이고 이 함수는 원래 함수를 변형시켜 새로운 함수를 만들어서 리턴한다. 아마 위에 Decorator Pattern에 대해 이해했다면 어렵지 않게 이해할 수 있을거라고 생각한다. 

위 예제와 같이 logging, auth check, parameter check 등 공통적으로 분리하기 어려운 관심사(Cross-Cutting Concern) 을 깔끔하게 분리해서 구현하고 사용할 수 있다. 

최근 React에서도 HOC와 Decorator를 조합해서 위와 비슷한 패턴으로 많이 사용되고 있다고 한다. 추후에 이 조합에 대해서도 다뤄봐야 될 것 같다. 

### 참고 
ES7의 Decorator문법은 아직 제안 상태이므로 babel 과 함께 사용하여야 정상적으로 작동한다.  [링크][Decorators transform · Babel](https://babeljs.io/docs/plugins/transform-decorators/)  



