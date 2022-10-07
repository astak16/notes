## watchEffect

`watchEffect` 只有当它内部依赖的变量发生变化时，才会执行

```ts
const name = ref("uccs");

setTimeout(() => {
  name.value = "astak";
}, 1000)

watchEffect(() => {
  console.log(name.value); // 1s 后打印 astak
})
```

