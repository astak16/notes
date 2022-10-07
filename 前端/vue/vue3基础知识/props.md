## props
1. 在 `setup` 语法糖中，使用 `defineProps` 定义 `props`
    ```ts
    const props = defineProps({
      text: String
    });
    ```
2. 类型定义
    ```ts
    interface IUser {
      name: string;
      age: number;
    }
    const props = defineProps<IUser>();
    ```
3. `PropType`
    ```ts
    props: {
      list: {
        type: Array as PropType<ColumnProps[]>,
        required: true,
      }
    }
    ```

## props 在 ts 中使用方式

`props` 类型声明在外面，`name` 类型是 `string | undefined` 联合类型

```ts
const Props = {
  name: {
    type: String,
    required: true,
  }
}

defineComponent({
  props: Props,
  setup(props) {
    props.name // name 类型是 string | undefined
}
```

解决方法是在声明的最后加上 `as const`，表示这是一个常量。
  - 为什么会这样，因为将声明提取到外面后，`ts` 不知道这个变量是不是常量，所以会推断其类型是和 `undefined` 的联合类型

```ts
const Props = {
  name: {
    type: String,
    required: true,
  }
} as const
```
