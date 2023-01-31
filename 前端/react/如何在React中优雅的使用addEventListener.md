在 `React Hooks` 中使用第三方库的事件时，很多人会写成这样（指的就是我）：

```js
const [count, setCount] = useState(0);
useEffect(() => {
  const library = new Library();
  library.on("click", () => {
    console.log(count); // 拿不到最新的 count
  });
}, []);
```

这样写会有问题：

它只会在这个组件加载时，绑定事件，如果这个事件中用到了其他的 `state`，那么这个状态发生变化时事件中是拿不到最新的 `state`

你会想到，我把 `state` 放到依赖项中：

```js
const [count, setCount] = useState(0);
useEffect(() => {
  const library = new Library();
  // click 事件会重复绑定
  library.on("click", () => {
    console.log(count);
  });
}, [count]);
```

这样做又会有新问题：`click` 事件会重复绑定

这时候你说那我先卸载 `click` 事件，在绑定事件：

```js
const [count, setCount] = useState(0);
useEffect(() => {
  const library = new Library();
  library.on("click", handleClick);
  return () => {
    // 卸载不掉事件，还是会重复绑定
    handleClick && library.un("click", handleClick);
  };
}, [count]);

const handleClick = () => {
  console.log(count);
};
```

你惊奇的发现，居然卸载不掉之前的事件，还是会重复绑定事件。

如何解决这个问题呢？

## 使用 addEventListener 代替第三方库的事件

这里使用 `addEventListener` 代替第三方库的事件，初始代码

```js
const Test = (props) => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleClick = (event) => {
      console.log("clicked");
      console.log("count", count);
    };
    const element = ref.current;
    element.addEventListener("click", handleClick);
    return () => {
      element.removeEventListener("click", handleClick);
    };
  }, []);

  const onClickIncrement = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h2>Test</h2>
      <button onClick={onClickIncrement}>点击 +1</button>
      <div>count: {count}</div>
      <button ref={ref}>Click Test Button</button>
    </>
  );
};
```

## 方法一：state 变化，卸载/绑定事件

将 `state` 放在依赖项中，就要解决 `state` 变化时，事件重复绑定的问题

解决事件重复绑定问题，首先想到的是事件卸载

你很容易就会想到这样写

```js
useEffect(() => {
  handleClick && ref.current.removeEventListener("click", handleClick);
  ref.current.addEventListener("click", handleClick);
}, [count]);

const handleClick = () => {
  console.log(count);
};
```

这在 `React Hooks` 中是一个坑，`state` 变化后会 `handleClick` 事件函数会重新声明，新的 `handleClick` 和之前的 `handleClick` 不是一个事件函数，导致 `removeEventListener` 移除的事件函数不是之前的事件函数

那你又会想到，我给 `handleClick` 加个 `useCallback`

```js
useEffect(() => {
  handleClick && ref.current.removeEventListener("click", handleClick);
  ref.current.addEventListener("click", handleClick);
}, [count]);

const handleClick = useCallback(() => {
  console.log(count);
}, []);
```

这样写的话还是会有同一个问题：依赖项为空数组，就拿不到最新的 `state`；依赖项中放入 `state`，`state` 变化后就不是同一个事件函数了，无法移除事件

如何解决这个问题呢？

把事件函数保存为状态:

1. 当 `count` 变化时，挂载事件，同时将事件函数保存为 `state`
2. 当 `eventFn.fn` 变化时，在 `useEffect return` 中卸载之前的事件函数（这里利用的是闭包）

具体的代码：

```js
const Test = () => {
  const ref = useRef();
  const [count, setCount] = useState(0);
  const [eventFn, setEventFn] = useState({ fn: null });

  useEffect(() => {
    mountEvent();
  }, [count]);

  const mountEvent = () => {
    if (!ref.current) return;
    //  eventFn.fn && ref.current.removeEventListener("click", eventFn.fn);  // 下面看不懂的话，也可以这样写
    ref.current.addEventListener("click", handleClick);
    setEventFn({ fn: handleClick });
  };

  useEffect(() => {
    return () => {
      eventFn.fn && ref.current.removeEventListener("click", eventFn.fn); // 这里用的是闭包，和上面注释部分任选其一
    };
  }, [eventFn.fn]);

  const handleClick = () => {
    console.log(count);
  };

  const onClickIncrement = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h2>Test</h2>
      <button onClick={onClickIncrement}>点击 +1</button>
      <div>count: {count}</div>
      <button ref={ref}>Click Test Button</button>
    </>
  );
};
```

## 方法二：使用闭包的方式卸载事件

利用闭包，可以将方法一简化

```js
const Test = () => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    element.addEventListener("click", handleClick);
    return () => {
      element.removeEventListener("click", handleClick);
    };
  }, [count]);

  const handleClick = () => {
    console.log(count);
  };

  const onClickIncrement = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h2>Test</h2>
      <button onClick={onClickIncrement}>点击 +1</button>
      <div>count: {count}</div>
      <button ref={ref}>Click Test Button</button>
    </>
  );
};
```

`useEffect return` 中的变量用的是闭包，这点刚开始学的时候不好理解

## 方法三：使用 ref 保存状态

`ref` 保存的数据虽然不能用于页面渲染，但可以作为 `state` 备份，在 `state` 变化时更新 `ref`

在事件函数中就能拿到最新的 `stateRef`

```js
const Test = () => {
  const ref = useRef();
  const [count, setCount] = useState(0);

  const countRef = useRef(count);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const element = ref.current;
    element.addEventListener("click", handleClick);
  }, []);

  const handleClick = () => {
    console.log(countRef.current);
  };

  const onClickIncrement = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h2>Test</h2>
      <button onClick={onClickIncrement}>点击 +1</button>
      <div>count: {count}</div>
      <button ref={ref}>Click Test Button</button>
    </>
  );
};
```

## 优化 state 手动维护

上面三种方法，都有个问题，`state` 需要手动维护

这一步如何优化呢？

方法一和方法二，优化的方式都一样：将依赖项是 `count` 改为 `state`

```js
const [state, setState] = useState({ count: 0 });

useEffect(() => {
  // ...
}, [state]);
```

方法三的优化是，用 `stateRef` 保存 `ref` 对象，当 `state` 变化时，遍历 `state` 给 `stateRef` 赋值

事件函数中使用 `stateRef`

```js
const [state, setState] = useState({ count: 0 });
const stateRef = useRef({});
useEffect(() => {
  Object.keys(state).forEach((key) => {
    stateRef.current[key] = state[key];
  });
}, [state]);
```

## 方案四：useEvent

当前还处于 RFC 阶段

```js
const useEvent = (handler) => {
  const handlerRef = useRef(null);
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return useCallback((...args) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
};
```

## 方案五：useMemoizedFn

`ahook` 实现

```js
function useMemoizedFn(fn) {
  const fnRef = useRef(fn);

  fnRef.current = useMemo(() => fn, [fn]);
  const memoizedFn = useRef();
  if (!memoizedFn.current) {
    memoizedFn.current = function (_this, ...args) {
      return fnRef.current.apply(_this, args);
    };
  }

  return memoizedFn.current;
}
```

## 写在最后

这个问题困扰了我很久，写业务时，我一直用方法一，随着依赖项越来越多，维护是个噩梦（方法三也是噩梦）

我一直在想如何在 `addEventListener` 中拿到最新的 `state`

今天本来想记录下方法一和方法三的

在一点点写下笔记的时候，发现了方法二，可以利用闭包解决事件卸载问题，从而又发现了优化维护依赖项的方法

如果今天不写笔记，这个问题还会继续困扰着我
