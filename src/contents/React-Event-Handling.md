---
path: "/posts/react-event-handling"
title: React Event Handling
date: 2018-01-03 23:30:05
banner: ../images/banner/react.jpg
tags: ["react", "event-handling"]
categories:
- React
author: "Hosung Lim"
---


---
# 목차
1. [React 와 일반적인  DOM element 에서 이벤트 핸들링의 차이](#react-dom-difference)
2. [React에서 Event를 바인딩하는 여러가지 방법](#react-event-bind-method)
3. [SyntheticEvent](#react-synthetic-event)
---

<div id="react-dom-difference">
</div>

## React 와 일반적인  DOM element 에서 이벤트 핸들링의 차이

React에서 이벤트를 핸들링하는 방법은 DOM elements의 이벤트를 핸들링 하는 방법과 매우 유사하다.  아래 가장 기본적인 예시를 보도록 하자.
먼저 일반적인 <code>DOM Element</code>의 바인딩 하는 방법이다.
```html
<button onclick="activeLasers()">
	Activate Lasers
</button>
```

위와 같이 표현할 수 있다.

같은 역활을 하는 Element를 <code>React Way</code>로 표현하면 다음과 같다.
```html
<button onClick={this.activeLaser}>
	Activate Lasers
</button>
```

첫 번째 차이점은 React에서는 Event를 *CamelCase*를 사용하여 표기한다는 점이다.
두번째로 일반적인 DOM에서 이벤트를 바인딩 할 때에는 function을 직접 호출하지만 React는 이벤트를 직접 호출하지않고 function을 지정해주기만 한다.
(즉 function 의 포인터 만 넘겨주고 직접 핸들링하지 않는다.)

### return false; 에 관해
DOM element에 이벤트를 바인딩 한 경험이 있다면 <code>return false;</code> 를 많이 사용해봤을 것이다. 이 <code>return false;</code>의 역활은 브라우저의 기본동작을 막아주도록 동작한다.
즉 <code>event.preventDefault</code>와 같은 역활을 한다고 볼 수 있다.

같은 syntax 를 jQuery event handler 안에서 사용할 경우
<code>event.preventdefault()</code> 와 <code>event.stopPropagation()</code>을 동시에 처리해준다.

**하지만 React의 경우 return false와 같은 syntax는 아무 동작을 하지 않는다.**
반드시 기본동작이나 버블링을 제어할 시에는 명시적으로 <code>event.preventDefault()</code>
<code>event.stopPropagation()</code>을 작성해주어야 한다.

---

<div id="react-event-bind-method">
</div>

## React 에서 Event를 바인딩하는 여러가지 방법에 관하여
**Event Handler 에서 this**
ES6 Class syntax를 사용하여 React Component를 작성한 경우 event handler에서 this는 undefined가 된다. 왜냐하면 javascript에서 this는 호출한 context에 의해 결정되기 때문이다.
만약 잘 이해가 가지 않는다면 아래 문서를 참고하도록 하자.

[this - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

이러한 this 에 관한 이슈로 인해 this를 이벤트 핸들러가 아닌 클래스에 바인딩 할 수 있는 몇가지 방법을 소개해볼까한다.

**1. React.createClass**
React 의 createClass 메소드를 사용하여 컴포넌트를 제작할경우 react는 모든 함수를 this에 자동으로 바인딩한다.
즉 따로 바인딩 할 필요가 없지만 React.createClass syntax는 조만간 이후 버전의 릴리즈에서 추출 될 수 있으므로 지양하는 것이 좋다.

**2. Rendering 시 바인딩**
```javascript
onChange={this.handleChange.bind(this)}
```
위와 같이 렌더링시에 바로 this에 바인딩 해주는 방법도 있는데 이는 렌더링이 실행될때마다 새로운 함수를 만들어주기 때문에 퍼포먼스에 좋지 않다고 한다.

**3. Constructor를 통한 바인딩**
```javascript
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
}
```
생성자 함수에서 함수를 바인딩해주는 방법이다. 생성자 호출 될시 한번만 바인딩 되므로 퍼포먼스 이슈가 없고 React에서 권장하는 가장 일반적인 방법인데
이벤트 핸들러가 많아지면 바인딩을 못한 휴먼에러가 생길 수 있고 매 번 바인딩을 하는 것은 꽤나 부담스럽고 귀찮은 작업이 될 수도 있다.

**4. Class Property 의 Arrow Function 을 통한 바인딩**
```javascript
handleChange = () => {

}
```
위와 같은 방법은 가장 심플하게 함수를 클래스에 바인딩 할 수 있는 방법을 제공하는데
해당 syntax를 사용하기 위해서는 babel *state-2* 혹은 *transfrom-class-properties* 가 추가되있어야 정상적으로 동작한다.

*참고*
```javascript
 class Bork {
    //Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    }

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    }
  }

  let myBork = new Bork;

  //Property initializers are not on the prototype.
  console.log(myBork.__proto__.boundFunction); // > undefined

  //Bound functions are bound to the class instance.
  console.log(myBork.boundFunction.call(undefined)); // > "bork"

  //Static function exists on the class.
  console.log(Bork.staticFunction()); // > "babelIsCool"
```
 위 코드는 babel 공식문서에서 발췌한 코드이다.
[Class properties transform · Babel](https://babeljs.io/docs/plugins/transform-class-properties/)

코드에 있는 설명에는 Property initializer 를 통한 Arrow Function은 Prototype에 추가되지 않는다. 즉, Prototype 에 추가되지 않는 다는 의미는 클래스가 생성될때마다 메모리 공간을 차지하고 상속을 하지 못하는 문제점이 존재한다.

개인적인 생각으로는 이벤트 핸들러는 React Component 중에서도 주로 컨테이너 즉 Statefull Component 에 주로 바인딩 되고 props를 통해서 하위 컴포넌트로 핸들러를 전달한다. 컨테이너 특성상 자주 생성되지 않고 이벤트 핸들러는 일반적으로 상속이 자주 사용되지 않아서 단점보다 auto-binding을 통한 편리함과 장점이 크다고 생각하기 때문에 앞으로도 위와 같은 syntax를 자주 사용할 것 같다.
저런 방법 마저 마음에 들지 않는다면 <code>react-autobind</code>, <code>autobind-decorator</code> 와 같은 라이브러리들이 있으니 참고하도록 하자.

---
<div id="react-synthetic-event">
</div>


## SyntheticEvent
React 에서는 DOM 이벤트를 직접다루지 않고 이를 Wrapping한 <code>SyntheticEvent</code>를 사용한다. 이 <code>SyntheticEvent</code> 를 사용함으로써 **브라우저마다 다른 event 객체에 대해 신경쓸 필요가 없다!** 즉 크로스 브라우징에 관한 이슈가 해결된다.
SyntheticEvent 에 관한 속성들은 따로 언급하진 않겠다.
DOM 이벤트와 완벽하게 매칭되는게 아니므로 찾아볼 게 있을때는 React 공식문서를 참조하도록 하자.
[SyntheticEvent - React](https://reactjs.org/docs/events.html)

---

### 개인 공부용으로 쓴 글이라 혹시 잘못된 정보가 있다면 댓글로 알려주시면 수정하도록하겠습니다.

