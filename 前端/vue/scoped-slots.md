## Scoped Slots

`slots` 形式，父组件拿到子组件的数据

```vue
<slot v-bind:data="data"></slot>

<!-- 使用 -->
<template v-slot:default="slotProps">...</template>
```
