---
path: "/posts/js-generator"
title: JS의 Generator와 Iterator
date: 2018-09-09 17:43:24
tags: ["es6", "generator", "iterator", "javascript"]
categories: Javascript 
banner: "/images/banner/js.png"
author: "Hosung Lim"
---

# ES6의 Generator와 Iterator
이번 포스팅에선 ES6의 Generator와 Iterable, Iterator에 대해서 다뤄보려고 한다. Generator를 살펴보기 전에 먼저 Iterable과 Iterator에 대해서 이해하고 넘어가도록 하자. 

사실 요즘 왠만한 언어들은 반복(loop)에 대해서 추상화된 방법과 인터페이스를 제공하고 있다. Java를 예로들면 Iterator라는 인터페이스를 제공하고 있다.  이런식의 반복(loop)을 추상화된 인터페이스로 제공할경우 얻을 수 있는 장점은 내장반복이 있는 `Array`나 `Map` 과 다르게 사용자 정의 Object나 기본 반복동작이 없는 객체들도 `for...of` 문으로 동일하게 반복을 정의할 수 있다는 것이다. 


## Iterator
iterator 인터페이스는 반복에 대한 표준화된 방법을 제공한다. 
구현 방법은 아래와 같다. 

* `next()`  메소드를 구현
* `next()` 메소드는 `IteratorResultObject`를 리턴

### IteratorResultObject
> `done`  과 `value`를 갖는 객체.
> 여기서 `done`은 반복의 완료여부 `value`는 현재 값을 의미

아래 예시는 배열을 인자로 받아서 반복하는 iterator 예시이다. 
```javascript
//iter 함수는 iterator object를 리턴 
const iterator = data => ({
	data,
	next() {	
		return {
			done: this.data.length == 0,
			value: this.data.pop()
		}
	}
})

const arrayIterator = iterator([1,2,3]);

console.log(arrayIterator.next().value) // 3
console.log(arrayIterator.next().value) // 2
console.log(arrayIterator.next().value) // 1
```

`Iterator`  만으로는 `for…of` 구문을 사용할 수 없다. 
직접 반복에 대한 처리기를 구현해서 사용하거나 추가적으로 `Iterable`과 같이 사용하여야 한다. 

## Iterable
iterable 인터페이스를 구현하면 반복이 가능한 객체를 의미한다. 
즉, 이 iterable 인터페이스를 구현하면 `for...of` 문을 통해 반복문을 작성할 수 있게된다. 
인터페이스 구현은 단지  `Symbol.iterator`메소드를 만들어주면 된다. 단, 여기서 `Symbol.iterator` 메소드는 반드시 `iterator object`를 반환해야 한다. 

아래 예시를 보고 좀 더 정확히 이해하도록 하자. 
```javascript
const iter = data => ({
  //key는 @@iterator로 대체가 가능하다. 
  [Symbol.iterator](){
    // iterator object를 반환 
    return {
      data,
      next() { 
        return {
          done: this.data.length == 0,
          value: this.data.pop()
        }
      }
    }
  }
})
 
for(const a of iter([1,2,3])) 
    console.log(a); 
```
위 `iterator`예제에 추가적으로 `iterable` 인터페이스를 구현하였다. 이 결과로 내장 반복처리기의 사용이 가능해진다. 

내장반복처리기
* Array destructuring
* Spread
* Rest Parameter
* For…of

## Generator
generator는 일반적으로 iterator를 쉽게 구현하기 위해 나온 문법으로 알고있다. 하지만 ES6의 generator는 단지 iteraotr를 쉽게 만들어주는 역활만을 한다고 보기는 어렵다.

먼저 `코루틴` 이라는 개념에 대해 알아보도록 하자. 

### 코루틴 
> 일반적인 함수(루틴)은  Main Flow로 부터 단순히 값을 인자로 받아서 return으로 종료된다. 
 여기에 return 과 더불어 *suspend/resume* 기능을 실행할 수 있게해준다.
 즉 중단을 걸고 중단된 지점부터 실행을 이어갈 수 있다. 

`generator` 문법은 `iterator`를 통해서 이러한 코루틴을 만들어주는 역활을 한다. 

* `yield`키워드를 통해서 `suspend`를 걸 수 있다. 
* `next()`가 호출되면  `resume`된다. 

위에서 만들었던 예제를 generator로 바꾸면 아래와같이 변경할 수 있다.
```javascript
const iter = data => ({
//key는 @@iterator로 대체가 가능하다. 
    *[Symbol.iterator](){
        let v;
        while(v=data.pop()) yield v;
    }
})
 
for(const a of iter([1,2,3])) 
    console.log(a); 

```

`iterator` 를 직접 구현했을 때보다 훨씬 간결하고 편리하게 작성할 수 있다. 

이러한 `generator` 의 사용은 `iterator` 인터페이스의 구현을 도와주기도 하지만 비동기 코드를 다룰때 매우 유용히 사용할 수 있다. 

아래 예시를 보도록 하자 
```javascript
class User {
    constructor(name, age){ 
        this.name = name;
        this.age = age;
    }
}

const users = [
    new User('tony',10),
    new User('john',20),
    new User('jang',30)
]; 

const findUser = name => new Promise((resolve,reject) => {
    setTimeout(_ => {
        resolve(users.find(v => v.name == name));  
    },1000);
});


const submit = user => new Promise((resolve,reject) => {
    setTimeout(_ => {
        resolve({ success : true });
    },2000)
});


const generator = function*() {
    let user = yield findUser('tony');
    user.name = 'test';
    let result = yield submit(user);
    console.log(result);
}
```
일반적으로 회원을 찾아서 수정한 후 submit하는 코드이다. 
db를 따로 구현하지 않고 `setTimeout` 과 `Promise` 를 통해 
Fake API를 만들었다. 

generator를 사용하면 위 예제의 generator 함수와 같이 비동기적인 코드를 동기식으로 표현할 수 있게된다. 
단, promise를 처리하는 반복처리기를 직접 구현해야한다. 

처리기의 내용은 다음과 같다. 
```javascript
const promiseIterator = function(gen) {
    const iterator = gen();
    
    function run(arg) {
        const result = iterator.next(arg);
        
        if( result.done ) {
            return result.value;
        }	else {
            return Promise.resolve(result.value).then(run);
        }
    }

    return run();
}
// 이처럼 사용이 가능하다. 
promiseIterator(generator())
```
이 처리기는 간단하게 promise 반복처리기를 구현한 내용이다. 
실제 사용은 [Co](https://github.com/tj/co) 와 같은 라이브러리를 사용해서 처리하도록 하자. 

이러한 generator를 통한 비동기제어는 promise 처리기를 따로 구현하지 않아도 ES7의 async/await syntax를 통해서 좀 더 편리하게 사용할 수 있다. 

## 참고
[Iteration protocols - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)
[반복기 및 생성기 - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators)





