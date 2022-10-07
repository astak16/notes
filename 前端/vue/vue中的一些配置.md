## tsconfig.json
  - files: 可以指定 d.ts
  - compilerOptions：
    - declaration: true 会生成声明文件

`"jsx": "preserve"` 表示打包的时候 `jsx` 交给 `babek`，`ts` 不要管。因为 `ts` 的 `jsx` 编译时遵循 `react` 的规则。


## eslint
关闭组件 name 一个单词命名提示：vue/multi-word-component-names

## jsx

安装 `@vue/babel-plugin-jsx` 插件，就可以在 `vue` 中使用 `jsx` 了

使用 `jsx` 形式编写组件，在引用组件的时候 `ts` 能够对 `props` 进行约束，而用 `.vue` 文件的形式，由于 `ts` 不认识 `vue` 的文件，所以就不支持 `props` 的约束了。

