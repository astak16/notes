## vue-router

```ts
import {createRouter, createWebHistory} from "vue-router"

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "home",
      name: "home",
      component: Home
    }
  ]
});
app.use(router);
```

```ts
// 使用1
<router-link to="/home">首页</router-link>

// 使用2
<router-link :to="{name: 'home', params: { id: 1 }}">首页</router-link>

// 使用3
<router-link :to="`/home/${id}`">首页</router-link>

// 使用4
import { useRouter } from "vue-router";
const router = useRouter();
router.push({name: "home", params: { id: 1 }})
```

### 路由守卫
1. 全局前置守卫
    ```ts
    /* 
     * 异步
     * to 即将要进入的路由
     * from 即将要离开的路由
     * next 让当前钩子 resolve，进入下一个路由
     *  - next(false) // 无法进入下一个路由
     *  - next() // 进入下一个钩子
     *  - next({name: "login"})
     */
    router.beforeEach((to, from, next) => {
      if (to.name !== "home") {
        next({name: "login"});
      } else {
        next();
      }
    })
    ```
2. 路由元信息 `meta`
    - 可以在 `beforeEach` 的回调函数参数的 `to` 中拿到
    ```ts
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: {requireLogin: true}
    }
    ```