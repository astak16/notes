Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

## clean the state

解决方案：[React useEffect causing: Can't perform a React state update on an unmounted component](https://stackoverflow.com/a/65007703)

```tsx
const NoOp = () => {
  const [a, setA] = (false)
  useEffect(() => {
    setA(true);
  }, []);
  useEffect(() => {
    //  clean the state
    return () => {
      setA(false)
    }
  }, [])
  return <></>
}
```

## cleanup callback

解决方案：[Can't perform a React state update on an unmounted component](https://stackoverflow.com/a/60907638)

```tsx
useEffect(() => {
  let isMounted = true;               // note mutable flag
  someAsyncOperation().then(data => {
    if (isMounted) setState(data);    // add conditional check
  })
  return () => { isMounted = false }; // cleanup toggles value, if unmounted
}, []);               
```

### 自定义 Hook
```tsx
const useAsync = (asyncFn, onSuccess) => {
  useEffect(() => {
    let isActive = true;
    asyncFn().then(()=>{
      if(isActive) onSuccess()
    })
    return () => {
      isActive = false
    }
  }, [asyncFn, onSuccess])
}
```

## 判断是否挂载

解决方法：[React useEffect causing: Can't perform a React state update on an unmounted component](https://stackoverflow.com/a/65152534)

返回组件的挂载状态，如果还没挂载或者已经挂载，返回 `false`，否则返回 `true`

```tsx
const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, [mountedRef]);
  return mountedRef;
};
```


