## defineExpose
使用 `<script setup>` 的组件，默认是关闭的，可以通过模版 `ref` 或者 `$parent` 获取组件公开的实例，不会暴露任何 `<script setup>` 中声明的绑定

明确暴露出去的属性，使用 `defineExpose` 编译器宏：

```ts
import {ref, defineExpose} from "vue"
const a = 1;
const b = ref(2)
defineExpose({ a, b })
```

`vue@3.2` 之后的版本 `define` 开头的方法不需要导入了。