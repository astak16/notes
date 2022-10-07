## Store

```ts
const {createStore} from "vuex";

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    add(state){
      state.count++
    }
  }
});
app.use(store);
```

```ts
// 使用
import {useStore} from "vuex";
const store = useStore();

console.log(store.state.count); // 使用 count
store.commit("add"); // 调用 mutation 中的方法
```

### getter

`getter` 可以理解为是 `store` 的计算属性，会根据它的依赖缓存起来，当它的依赖值发生了改变，才会重现计算。

```ts
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    add(state){
      state.count++
    }
  },
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter(c => c.id > 2).length;
    }
  }
});
```

```ts
// 使用
store.getter.biggerColumnsLen
```

### action

`mutation` 必须是同步函数，在 `mutation` 中添加异步请求，可能会破坏 `vuex` 的可追溯性，就提出了一个新的概念 `action`。  

`action` 类似于 `mutation`，不同在于：
  - `action` 提交的是 `mutation`，而不是直接变更状态
  - `action` 可以包含任意的一部操作

`action` 函数接收一个类似与 `store` 实例具有相同方法和属性的 `context` 对象。因此可以通过 `context` 提交一个 `mutation`，这个 `context` 不是对象本身。
  
```ts
const store = createStore({
  state: {
    columns: [],
  },
  mutations: {
    fetchColumns(state, rawData){
      state.columns = rawData.data.list;
    }
  },
  actions: {
    fetchColumns(context){
      axios.get().then(res => {
        context.commit("fetchColumns", res.data);
      })
    }
  },
});
```

```ts
// 使用
onMounted(() => store.dispatch("fetchColumns"));
const columns = computed(() => store.state.columns);
```

#### 组合 action

```ts
const store = createStore({
  state: {
    a: [],
    b: {},
  },
  mutations: {
    fetchA(state, rawData){
      state.a = rawData.data;
    },
    fetchB(state, rawData){
      state.b = rawData.data;
    }
  },
  action: {
    async fetchA(context, payload){
      const res = await axios.post("...", payload);
      context.commit("fetchA", res.data);
    }
    fetchAAndB(context, payload){
      return context.dispatch("fetchA", payload).then(res => {
        return context.dispatch("fetchB");
      })
    }
  },
});
```

```ts
// 使用
onMounted(() => {
  const data = {};
  store.dispatch("fetchAAndB", data);
});
```