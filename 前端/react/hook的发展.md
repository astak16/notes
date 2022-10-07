## hook 的发展
对代码的复用，经历了：`Mixin`，`HOC`，`Render Props`，`Custom Hook`

### 1. Mixin
```tsx
const setIntervalMixin = { ... }

const createReactClass = require("create-react-class")

const TickTock = createReactClass({
  mixins: [setIntervalMixin],
  ...
})
```
优点：
  1. 起到重用代码的作用

缺点：
  1. 它是隐式依赖，隐式依赖被认为在 React 中是不好的
  2. 名字冲突问题
  3. 只能在 `React.createClass` 里工作，不支持 `ES6` 的 `Class Component`
  4. 实践下来，难以使用

### 2. HOC 模式

2015 年后推荐使用，采用装饰器模式来复用代码

```tsx
function withWindowWidth(BaseComponent){
  class DerivedClass extends React.Component {
    ...
    render () {
      return <BaseComponent {...this.props} {...this.state} />
    }
  }
}

const MyComponent = (props) => <div>...</div>

const NewMyComponent = withWindowWidth(MyComponent) 
```

优点：（容器组件与展示组件分离）
  1. 可以在任何组件包括 `Class Component` 中使用
  2. 它所倡导的容器组件与展示组件分离，原则做到了：关注点分离

缺点：
  1. 不直观，难以阅读
  2. 名字冲突
  3. 组件层层层层层嵌套

`react-redux connect` 采用这种设计

### 3. Render Props

2017 后开始流行起来，采用代理模式来复用代码

```tsx
class WindowWidth extends React.Component {
  ...
  render () {
    return this.props.children(this.state.windowWidth)
  }
}

const MyComponent = () =>{
  return (
    <WindowWidth>
      {width => <div>{width}</div>}
    </WindowWidth>
  )
}
```
优点：
  1. 灵活

缺点：
  1. 难以阅读，难以理解

`React Router` 采用这种设计

### 4. Hook

2018年，React 突出全新的重用代码的方式 —— Hook

它的核心改变是：允许函数式组件存储自己的状态，在这之前，函数式组件是不能有自己的状态

这个改变使我们可以像抽象一个普通函数一样抽象 React 组件中的逻辑

实现原理：闭包

```tsx
const useWindowWidth = () => {
  const [isScreenSmall, setIsScreenSmall] = useState()
  
  useEffect(() => {
    ...
  }, [])
  
  return isScreenSmall
}
```

优点：
  1. 提取逻辑出来非常容易
  2. 非常易于组合
  3. 可读性非常强
  4. 没有名字冲突问题

缺点：
  1. Hook 有自身的用法限制：只能在组件顶层使用，只能在组件中使用
  2. 由于原理为闭包，所以极少数情况下会出现难以理解的问题