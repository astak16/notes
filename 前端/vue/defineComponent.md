## defineComponent
1. 在 vscode 中配 volar 插件进行代码提示，报错并不影响实际运行
2. `LegacyOptions` 代码提示（Vue2 中的 api）
3. `ComponentOptions` 代码提示（vue3 中的 api）

## DefineComponent 类型介绍

- `PropsOrPropOptions`：`props` 属性
- `RawBindings`：`setup` 的返回值
- `D`：`data`
- `C`：`computed`
- `M`：`method`
- `Mixin`：`mixin`
- `Extends`：`extends`
- `E`：`emits`

### ComponentPublicInstanceConstructor
`defineComponent` 返回的类型是 `ComponentPublicInstanceConstructor`，这个类型等于这样一个对象：

```ts
{
  __isFragment?: never
  __isTeleport?: never
  __isSuspense?: never
  new (...args: any[]): T
}
```

为什么会返回这样一个类型，是因为 `vue3` 完全符合 `jsx` 类型需求的，`jsx` 是 `react` 发明的，而`react` 的 `jsx` 和 `vue` 是不一样的，`vue3` 为了能够更好的使用 `jsx`，所以`defineComponent` 返回的类型是完全符合 `react jsx` 类型的。

`ComponentPublicInstanceConstructor` 接收 `ComponentPublicInstance` 作为泛型

`ComponentPublicInstance` 类型就是 `vue2` 中的那些属性。

### DefineComponent

`defineComponent` 有 `4` 种重载

1. 用函数的方式定义组件，是一个 `setup` 函数
  - 接收 `props` 和 `RawBindings` 做为参数
    ```ts
    export function defineComponent<Props, RawBindings = object>(
      setup: (
        props: Readonly<Props>,
        ctx: SetupContext
      ) => RawBindings | RenderFunction
    ): DefineComponent<Props, RawBindings>
    ```
    - 这里声明的 `Props` 是纯 `ts` 的定义，不是 `vue` 组件上的  `props`
      - 这里不能是纯 `ts` 的声明，这会导致 `vue` 上没有 `props`

2. 通过对象声明组件，但是一个没有 `props` 的组件    
    ```ts
    export function defineComponent<Props = {}, ...>(
      options: ComponentOptionsWithoutProps<Props, ...>
    ): DefineComponent<Props, ...>;
    ```
    
3. 通过对象声明组件，`props` 是个数组
    ```ts
    export function defineComponent<PropNames extends string, ...>(
      options: ComponentOptionsWithArrayProps<PropNames, ...>
    ): DefineComponent<Readonly<{ [key in PropNames]?: any }>, ...>;
    ```
    - 可以通过 `this.name`，`this.age` 获取，但这种方式获取到的类型是 `any`
      ```ts
      {
        props: ["name", "age"]
      }
      ```

4.  通过对象的像是去声明 `props`
    ```ts
    export function defineComponent<
      PropsOptions extends Readonly<ComponentPropsOptions, ...>
    >(
      options: ComponentOptionsWithObjectProps<PropsOptions, ...>
    ): DefineComponent<PropsOptions, ...>;

    ```
    - 就是我们平时最常使用的方式
      ```ts
      {
        props: {
          name: {
            type: String,
            required: true,
          }
        }
      }
      ```

`defineComponent` 的实现：
  - 如果是函数返回一个对象，否则就是 `option` 对象
  ```ts
  export function defineComponent(options: unknown) {
    return isFunction(options) ? { setup: options, name: options.name } : options
  }
  ```
