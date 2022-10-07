## watch
1. 接收两个参数
    - 第一个参数是监听的值
    - 第二个参数是个回调，有两个参数：`newValue`，`oldValue`
      - 可以用过 `greetings.value` 拿到最新的值
      - 可以用过 `newValue` 那最新的值
    ```ts
    const greetings = ref("");
    watch(greetings, (newValue, oldValue) => {
      console.log(newValue, oldValue);
      console.log(greetings.value);
    });
    ```
2. 监听两个参数
    - 第一个参数用数组的形式
    - 对应的 `newValue` 和 `oldValue` 也是数组的形式
      ```ts
      const greetings = ref("");
      const count = ref(0);
      watch([greetings, count], (newValue, oldValue) => {
        console.log(newValue, oldValue);
      })
      ```
3. 监听 `reactive` 对象
    - 直接监听 `reactvie` 对象，得到的值是 `proxy`
      ```ts
      const data = reactive({ count: 0 });
      watch(data, (newValue, oldValue) => {
        console.log(newValue, oldValue); // 是个 proxy
      });
      ```
    - 监听 `proxy` 中的某一项，用函数的形式
      ```ts
      // 不能直接使用 data.count，这里不能监听原始类型
      watch(() => data.count, (newValue, oldValue) => {
        console.log(newValue, oldValue); 
      });
      ```
4. 监听 `props` 时，需要用函数，因为 `props` 中的属性不是响应式对象。
    ```ts
    watch(() => props.time, (newValue) => {
      console.log(newValue)
    })
    ```