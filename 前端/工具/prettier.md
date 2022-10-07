## prettier

文档地址：https://prettier.io/docs/en/install.html

### 安装

```bash
npm i prettier -D
```

- 配置文件：`.prettierrc.json`
- 忽略文件：`.prettierignore`
- `git commit` 时运行：`npx mrm lint-staged`
- `eslint` 和 `prettier` 会有冲突
    - 安装
      ```bash
      npm i eslint-config-prettier -D
      ```
    - `eslint` 配置，增加 `prettier`
      ```ts
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest",
          "prettier"
        ]
      }
      ```