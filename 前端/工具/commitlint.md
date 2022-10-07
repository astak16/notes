## commitlint

文档地址：https://github.com/conventional-changelog/commitlint

### 安装

```bash
npm i @commitlint/{config-conventional,cli} -D
```

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

### add hooks

```bash
npx husky add .husky/commit-msg  "npx --no -- commitlint --edit ${1}"
```
