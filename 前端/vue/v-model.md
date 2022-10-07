## v-model

### 方法一
```tsx
<template>
  <input type="text" :value="val" @input="updateValue">
</template>
<script lang="ts">
export default defineComponent({
  props: {
    modelValue: String
  },
  setup(props, context) {
    const val = ref(props.modelValue || "")

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      val.value = targetValue
      context.emit("update:modelValue", targetValue)
    }
    return {
      val,
      updateValue,
    }
  },
})
</script>
```

### 方法二
```tsx
<template>
  <input type="text" v-model="val">
</template>
<script lang="ts">
export default defineComponent({
  props: {
    modelValue: String
  },
  setup(props, context) {
    const val = computed({
      get: () => props.modelValue,
      set: (a) => {
        context.emit("update:modelValue", a);
      }
    })
    return {
      val
    }
  },
})
</script>
```