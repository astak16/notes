### setup
1. 接收两个参数：
    - `props`：
      - 组件传入的属性，会自动推断成 `props` 中定义的属性
      - 响应式对象
    - `context`：这几个值都是自动同步到最新的值
      - `attrs`
      - `slots`
      - `emit`
2. `vue3.2` 语法糖
    - 任何在顶层声明的变量，函数以及引用，都可以在模版中直接使用，不需要在 `return`
    ```vue
    <script setup>...</script>
    ```
3. 注意：
  - `definedProps` 和 `definedEmits` 要么使用运行时声明，要么使用类型声明，不能两者同时使用
  - 作用完善类型检查和类型推断
4. 可以 `return` 一个 `jsx`
    - `setup` 只会在运行时执行一次
    - 任何引起 `setup` 内部声明的值变化，`setup` 不会再次执行，但是 `return` 的函数会再次执行
    ```ts
    export default defineComponent({
      setup(){
        const numberRef = ref(0);
        setTimeout(() => {
          numberRef.value += 1;
        }, 1000)
        // const number = numberRef.value; // 不会执行，永远为 0
        return () => {
          const number = numberRef.value; // 一开始为 0，1s 后由 0 变为 1
          return h()
        }
      }
    })
    ```
