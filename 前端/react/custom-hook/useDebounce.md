```tsx
const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 再上一个 useEffect 处理完之后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};
```