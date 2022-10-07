## 非 props 和 attrs

非 `props` 属性传入，会被添加组件的根节点，如何让非 `props` 属性添加到对应的节点上呢？

```vue
<my-component class="hello" />

<!-- 组件 -->
<template>
<div class="root">
  <div v-bind="$attrs"></div> // class="hello" 会渲染到这个节点上
</div>
</template>
<script>
export default {
  inheritAttrs: false, // 继承属性关闭
}
</script>
```
