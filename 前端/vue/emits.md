## emits
1. 使用
    - `emits` 和 `setup`，`props` 他们同级，一眼就可以看清楚这个组件有哪些事件
    - `context` 中可以获得事件名称
    - `html` 模版中支持补全
    - 事件参数可以自定义约束
      ```ts
      emits: {
        "close-modal": (params: any) => {
          return params.type === "close";
        }
      },
      setup(props, context) {
        context.emit("close-modal", {
          type: "close",
        })
      }
      ```
2. 在 `setup` 语法糖中，使用 `defineEmits` 定义 `emits`
    - `defineEmits` 接收一个数组
    ```ts
    const emits = defineEmits(['change'])
    const onChange = () => {
      emits("change", {})
    }
    ```
3. 类型定义
    ```ts
    interface IEvent {
      (e: "change", age: number): void;
    }
    const emits = defineEmits<IEvent>()
    const onChange = () => {
      emits("change", 1);
    }
    ```
