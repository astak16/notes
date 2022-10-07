## 用`watch`完成撤销操作

- 监听`n`发现`n`变化时，将操作记录存进`history`中
- 点击撤销，要回到上一步操作
- 当点击撤销时，`n`会变化，触发`watch`
- 需要有一个变量阻止`watch`来监听`n`
- 由于`watch`是异步的，所以需要`this.$nextTick()`函数异步操作。

```js
new Vue({
  data: {
    n: 0,
    history: [],
    inUndoMode: false,
  },
  watch: {
    n(newValue, oldValue) {
      if (!this.inUndoMode) {
        this.history.push({ from: oldValue, to: newValue });
      }
    },
  },
  template: `
    <div>
      {{n}}
      <hr />
      <button @click="add1">+1</button>
      <button @click="add2">+2</button>
      <button @click="minus1">-1</button>
      <button @click="minus2">-2</button>
      <hr />
      <button @click="undo">撤销</button>
      <hr />
      {{history}}
    </div>
  `,
  methods: {
    add1() {
      this.n += 1;
    },
    add2() {
      this.n += 2;
    },
    minus1() {
      this.n -= 1;
    },
    minus2() {
      this.n -= 2;
    },
    undo() {
      const last = this.history.pop();
      this.inUndoMode = true;
      this.n = last.from;
      this.$nextTick(() => {
        this.inUndoMode = false;
      }, 0);
    },
  },
}).$mount("#app");
```

## `watch`模拟`computed`

`watch`第一次不监听，因为第一次是从无到有，`Vue`认为这没有变化。

```js
new Vue({
  data: {
    user: {
      email: "tiantain@qq.com",
      nickname: "天天",
      phone: "1234566789",
    },
    displayName: "",
  },
  watch: {
    "user.email": {
      handler: "handle",
      immediate: true,
    },
    "user.nickname": {
      handler: "handle",
      immediate: true,
    },
    "user.phone": {
      handler: "handle",
      immediate: true,
    },
  },
  template: `
    <div>
      {{displayName}}
      <button @click="user.nickname=undefined">remove nickname</button>
    </div>
  `,
  methods: {
    change() {
      const user = this.user;
      this.displayName = user.nickname || user.email || user.phone;
    },
    handle() {
      const {
        user: { email, nickname, phone },
      } = this;
      this.displayName = nickname || email || phone;
    },
  },
}).$mount("#app");
```

`watch`在监听对象时，只有改变了对象的地址，`Vue`才会认为这个对象变了。

```js
obj.a = 1
"obj.a"(){}   // 会执行
obj(){}       // 不会执行

obj = {a:1}
"obj.a"(){}   // 会执行
obj(){}       // 不会执行
```

`Vue`提供了一个属性，可以让`obj.a`变化，也能触发`obj`的监听函数

```js
obj: {
  handle(){},
  deep: true
}
```

- `deep`：改变对象的属性，是否触发对象的监听函数
- `immediate`：第一次渲染也触发`watch`

## `computed`和`watch`区别

1. 英文翻译成中文
2. 各自描述（用代码举例）
   - `computed`调用时可以当属性用，且有缓存。
   - 有两个选项`immediate`和`deep`
3. 总结
