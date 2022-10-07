## teleport

作用：将一个在 `#app` 内部渲染的组件移动到 `#app` 外面的节点

使用：
  1. 在 `app` 同级建一个 `modal` 节点
  2. 将组件用 `teleport` 包裹
  3. `teleport` 组件有个 `to` 属性，接收一个 `css` 选择器
    ```vue
    <!-- 和 app 组件同级 -->
    <div id="modal"></div>

    <!-- 会渲染到 modal 节点中 -->
    <teleport to="#modal">
      <div>...</div>
    </teleport>
    ```

