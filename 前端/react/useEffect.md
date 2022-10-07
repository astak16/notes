## useEffect

1. 依赖更新时 `return` 会被执行
```tsx
useEffect(() => {
  console.log(n);
  return () => {
    console.log("卸载了：", n)
  }
}, [n]);
```

2. 页面卸载时 `return` 才会被执行
```tsx
useEffect(() => {
  console.log(n);
  return () => {
    console.log("卸载了：", n)
  }
}, []);
```

### useDocumentTitle

[useDocumentTitle](./custom-hook/useDocumentTitle.md)