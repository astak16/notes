## provide/inject

1. 在组件中使用
  - `provide` 提供数据（在父组件中），接收两个参数：
    - 第一个参数是 `key`
    - 第二个参数是 `value`
      - 可以是原始值，也可以是响应式对象
  - `inject` 拿到 `provide` 提供的数据（在子组件中），接收的参数是 `provide` 的 `key`
    ```ts
    // 父组件
    provide("lang", "zh");

    // 子组件
    const lang = inject("lang")
    ```
2. 在全局使用
    - 在 `inject` 时会丢失类型，所以在 `inject` 是需要自定义约束
    ```ts
    // main.ts
    const app = createApp(App);

    app.provide("user", { name: "uccs" });
    app.mount("#app");

    // 内部组件
    const user = inject<{ name: string }>("user");
    ```
3. `provide` 提供的是响应式数据，`inject` 接收到的数据才会是变化的
4. 避免文件循环引用，可以用 `provide` 在顶层组件中提供数据


## 源码解析

### provide

- `currentInstance` 是用来判断当前是否处于一个组件的渲染流程中
  - 也就是说 `provide` 只能在 `setup` 中使用
- 如果 `provides` 和 `parentProvides` 相等的话，说明了当前组件使用了 `provides`，那么用 `parentProvides` 作为原型创建一个新的 `provides`
  - `provides` 是当前组件的 `provides`
  - `parentProvides` 是当前组件父组件的 `provides`
  - `const b = Object.create(a)` -> `a` 是 `b` 的原型
  
```ts
function provide<T>(key: InjectionKey<T> | string | number, value: T) {
  if (!currentInstance) {
    if (__DEV__) {
      warn(`provide() can only be used inside setup().`)
    }
  } else {
    let provides = currentInstance.provides
    const parentProvides =
      currentInstance.parent && currentInstance.parent.provides
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    provides[key as string] = value
  }
}
```

### inject

- `currentInstance` 是用来判断当前是否处于一个组件的渲染流程中
  - 也就是说 `inject` 只能在 `setup` 中使用
- 取出 `provides`
  - `provides` 存在，并且 `key` 在 `provides` 中，则从 `provides` 取出当前的 `key`
  - `provides` 不存在，则返回 `defaultValue`

```ts
function inject(key: InjectionKey<any> | string, defaultValue?: unknown, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance
  if (instance) {
    const provides =
      instance.parent == null
        ? instance.vnode.appContext && instance.vnode.appContext.provides
        : instance.parent.provides

    if (provides && (key as string | symbol) in provides) {
      return provides[key as string]
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue.call(instance.proxy)
        : defaultValue
    } else if (__DEV__) {
      warn(`injection "${String(key)}" not found.`)
    }
  } else if (__DEV__) {
    warn(`inject() can only be used inside setup() or functional components.`)
  }
}
```