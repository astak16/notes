## useDocumentTitle

### 使用 `useRef`
```tsx
const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // useRef 可用来做持久化
  const oldTitle = useRef(document.title).current;
  
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keepOnUnmount]);
};
```

### 使用闭包
```tsx
const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = document.title
  
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      // 这里拿到的 title 永远不会变，这里有闭包
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};
```