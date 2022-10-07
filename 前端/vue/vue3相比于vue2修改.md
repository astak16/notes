## 生命周期
```ts
// mapping vue2 to vue3
beforeCreate -> setup()
created -> setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
activated -> onActivated
deactivated -> onDeactivated
errorCaptured -> onErrorCaptured

// added
onRenderTracked
onRenderTriggered
```

## vue3 相比于 vue2 全局 API 修改
### Vue.config -> app.config
1. `config.productionTip` 被删除
2. `config.ignoredElements` 改名为 `config.isCustomElement`
3. `config.keyCodes` 被删除

### 全局注册类 api
1. `Vue.component` -> `app.component`
2. `Vue.directive` -> `app.directive`

### 行为扩展类 api
1. `Vue.mixin` -> `app.mixin`
2. `Vue.use` -> `app.use`

### Global API Treeshaking

```ts
// vue2
import Vue from "vue";
Vue.nextTick(() => {});
const obj = Vue.observable({});

// vue3
import Vue, { nextTick, observable } from "vue";
Vue.nextTick // undefined;
nextTick(() =>{});
const obj = observable({});
```

