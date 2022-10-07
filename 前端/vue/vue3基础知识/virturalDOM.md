## 数据结构：
```ts
const vnode = {
  type: "div",
  props: {
    id: "hello",
  },
  children: [
    // more vnodes
  ],
};
```

## `Render Pipeline`

- `Compile`：`vue` 组件的 `template` 模板会被编译成 `render function`，会返回 `Virtural DOM`
- `Mount`：执行 `render function`，遍历虚拟 `DOM`，生成真正的 `DOM` 节点
- `Patch`：当组件中任何响应式对象（依赖）发生变化时，执行更新操作。生成新的 `Virtural DOM`，`vue` 内部会遍历新的 `Virtural DOM`，和旧的 `Virtural DOM` 对比，然后执行必要的更新。

## 实现

1. `Message` 是一个 `vue` 组件
2. `h`，将 `vue` 组件变成 `vnode`
3. `render` 作用
    - 挂载：第一个参数是 `vnode`，第二个参数是挂载节点
    - 销毁：第一个参数是 `null`，第二个参数是挂载节点

```ts
import { h, render } from "vue";
import Message from "./Message.vue";

const createMessage = (
  message: string,
  type: "success" | "error" | "default",
  timeout?: number
) => {
  const messageVNode = h(Message, { message, type });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  render(messageVNode, mountNode);
  const destroy = () => {
    render(null, mountNode);
    document.body.removeChild(mountNode);
  };
  if (timeout) {
    setTimeout(destroy, timeout);
  }
  return { destroy };
};
```