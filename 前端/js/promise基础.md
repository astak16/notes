## then 函数

`then` 函数的会接收两个回调函数，一个是 `onFulfilled` 函数，一个是 `onRejected` 函数

如果这两个回调函数没有写返回值，默认会 `return undefined;`

进入下一个函数的 `onFulfilled` 函数中

```js
const p = new Promise((resolve, reject) => {
  resolve(22);
});
p.then(
  (success1) => {
    console.log("success1", success1); // "success2" 22
    // 没写 return 默认返回 return undefined
  },
  (err1) => {
    console.log("err1", err1);
  }
).then(
  (success2) => {
    console.log("success2", success2); // "success2" undefined
  },
  (err2) => {
    console.log("err2", err2);
  }
);
```

在这两个回调中 `return xxx` ，相当于调用 `return new Promise((resolve) => resolve(xxx));`

```js
const p = new Promise((resolve, reject) => {
  resolve(22);
});
p.then(
  (success1) => {
    return new Promise((resolve, reject) => resolve("success"));
    // 等价于
    return "success";
  },
  (err1) => {
    console.log("err1", err1);
  }
).then(
  (success2) => {
    console.log("success2", success2); // "success2" "success"
  },
  (err2) => {
    console.log("err2", err2);
  }
);
```

在 `onFulfilled` 函数和 `onRejected` 函数中默认返回的都是成功，如果需要返回失败需要显示调用 `reject` 或者用 `throw` 抛出错误可以

```js
const p = new Promise((resolve, reject) => {
  resolve(22);
});
p.then(
  (success1) => {
    return new Promise((resolve, reject) => reject("error"));
    // 等价于
    // throw "error";
  },
  (err1) => {
    console.log("err1", err1);
  }
).then(
  (success2) => {
    console.log("success2", success2);
  },
  (err2) => {
    console.log("err2", err2); // "err2" error
  }
);
```

总结：在 `then` 回调中 `return xxx` 会被自动包装成 `return new Promise((resolve) => resolve(xxx));`，

## catch

`catch` 是用来处理 `rejected` 状态，是 `then` 函数的一种特例，相当于 `then(null, (err) => {});`

`catch` 为什么能捕获前面的错误？

在 `onRejected` 函数中，如果没有显示抛出错误，默认会 `return undefined;` 进入一下个 `onFulfilled` 函数

## finally

`finally` 不管当前 `promise` 是什么状态都会执行，也是 `then` 函数的一种特例，相当于 `then(result => result, err => new Promsie((\_, reject) => reject(err)));

## Promise.resolve

`Promise.resolve` 是 `Promise` 在 `fulfilled` 状态时的简写，相当于 `new Promise(resolve => resolve(xxx))`

`onFulfilled` 函数接收参数

- 当参数是普通参数时，会直接传递给后面 `then` 函数
  ```js
  new Promise((resolve) => resolve({ name: "uccs" })).then((data) => {
    console.log(data);
  });
  ```
- 当参数是 `Promise` 对象时，后面的 `then` 会根据传递的 `Promise` 对象的状态变化执行哪一个回调
  ```js
  const p = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, "我执行了");
  });
  new Promise((resolve) => resolve(p)).then((data) => {
    console.log(data);
  });
  ```
- 具有 `then` 方法的对象
  - 用这种这种方式，如果需要改变 `Promise` 状态是，不能使用 `return` 形式，这个 `then` 方法也是有两个回调函数的：`onFulfilled` 和 `onRejected`
  ```js
  const thenable = {
    then(resolve, reject) {
      console.log("thenable");
    },
  };
  new Promise((resolve) => resolve(thenable)).then((data) => {
    console.log(data);
  });
  ```

## Promise.reject

`Promise.reject` 是 `Promise` 在 `rejected` 状态是的简写，相当于 `new Promise((_, reject) => reject(xxx))`

`onRejected` 函数不管接收什么参数，都会原封不动的向后传递，作为后续方法的参数
