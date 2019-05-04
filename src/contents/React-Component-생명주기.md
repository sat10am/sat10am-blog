---
path: "/posts/react-component-lifecycle"
title: React Component 생명주기
tags: ["React"]
categories: React
banner: ../images/banner/react.jpg
date: 2018-01-06 08:53:57
author: "Hosung Lim"
---


---
# 목차
1. [Component LifeCycle - Mounting](#mounting)
2. [Component LifeCycle - Updating](#updating)
3. [Component LifeCycle - Unmounting](#unmounting)
---

Web Service, Mobile App 또는 다른 Application을 개발해봤다면 <code>생명주기</code> 라는말을 한 번쯤 들어보았을 것이다.  혹시 들어보지 못했더라도 전혀 상관없다!
생명주기란 Application 이 시작, 실행, 활성, 비활성, 정지, 종료 등 일련의 상태를 순환하는데 이것을 생명주기라고 한다.

React 에서도 마찬가지로 Component가 <code>생성</code>, <code>수정</code>, <code>소멸</code> 크게 3가지 부분으로 나뉘어서  LifeCycle API 가 제공되고 있는데. 이것들을 기억해두셨다가 개발도중에 필요할때 적절하게 구현해놓고 사용하면 된다.

<div id="mounting">
</div>

## Component LifeCycle - Mounting
컴포넌트가 생성될때 호출되는 LifeCycle API 이다.
생성자 메소드의 경우 ES6를 사용하지 않는다면 <code>getInitialState</code> 메소드를 사용하실 수 있고 더 자세한 내용은 React 공식문서 [React Without ES6](https://reactjs.org/docs/react-without-es6.html) 를 참고하도록 하자.

<div id="updating">
</div>

## Component LifeCycle - Updating
컴포넌트가 생성될때 호출되는 LifeCycle API 이다.
여기서 *shouldComponentUpdate* 메소드는 중요한 역활을 한다.
**이 메소드에서 변경된 props와 state를 통해 리렌더링을 할지 여부를 결정하게 되는데 기본적으로 true를 리턴하게 되있는데 false를 리턴할경우 렌더링을 하지 않는다.**

```javascript
shouldComponentUpdate( nextProps, nextState ) {
    return nextProps.list !== this.props.list
}
```

위 코드는 shouldComponentUpdate를 통해 이전 props와 변경될 props를 비교해서 렌더링 여부를 결정하는 예시이다. 여기서 기억해두어야할 점은 React에서는
<code>deep checking</code>이나 <code>JSON.stringfiy()</code> 메소드를 통한 비교는 권장하지 않는다는 것이다.
이는 비효율적이고 성능에 영향을 끼치기 때문에 일반적으로 <code>shallow checking</code>을 사용하고 있다. <code>deep checking</code> , <code>shallow checking</code>, <code>immutable fashion</code> 에 관해서는 다른 글을 통해서 더 자세히 다뤄볼 수 있도록 준비할 예정이다.

<code>React.PureComponent</code>를 상속받게되면 props와 state에 대해 shallow compare로직이 들어가 있어서 좀 더 편리하게 사용할 수 있다고 한다.
하지만 무분별하게 PureComponent를 상속받아서 사용한다면 오히려 성능저하를 야기할 수 있고 적절히 필요한곳에 shouldComponentUpdate를 구현하여 사용하시는 것이 좋은 방법이라고 생각된다.

그리고 설사 shouldComponentUpdate를 구현하지 않아서 무조건 true를 리턴하는 상황이 있다고 하더라도 React는 모든경우에 리렌더링을 하지는 않는다. shouldComponentUpdate를 통해 true를 리턴하게 되면 기존 Vitural DOM과 변경된 props나 state를 통해 만들어질 Vitural DOM과 비교하여 변경된 내용이 없다면 리렌더링을 하지 않는다.

하지만 규모가 커질수록 큰 성능 차이를 낼 수 있기 때문에 최적화 하는 습관을 들여놓는게 좋다고 생각한다.

<div id="unmounting">
</div>

## Component LifeCycle - Unmounting
컴포넌트가 소멸될시 호출되는 LifeCycle API입니다.
위 설명과 같이 타이머 제거, 네트워크 요청취소, 이벤트 리스너 제거등에 주로 사용된다.

### 개인 공부용으로 쓴 글이라 혹시 잘못된 정보가 있다면 댓글로 알려주시면 수정하도록하겠습니다.
