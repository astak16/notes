## reactive
1. 创建响应式对象，`Object` 类型
    ```ts
    const data = reactive({
      count: 1,
      increase: () => data.count++,
      double: computed(() => data.count * 2)
    });
    ```
    - `data` 内部定义的属性，可以在 `data` 内部使用
    - 在 `reactive` 中使用 `computed`，会有类型错误，原因是在 `computed` 回调用使用 `data.count` 会造成类型推断的循环，这里可以显示指定 `data` 的类型。
2. 在 js 中使用不需要通过 `.value` 的形式
    ```ts
    const data = reactive({
      count: 1,
    });

    // 使用
    console.log(data.count);
    ```
3. 从响应式对象中将值取出来，将失去响应式，模版中不会更新
    ```ts
    const data = reactive({
      count: 1
    });

    return {
      count: data.count,  // count 不是响应式对象
    }
    ```
