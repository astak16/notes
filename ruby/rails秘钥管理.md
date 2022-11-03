## Rails 秘钥管理

master.key + 其他所有的 key，得到一个加密后的 key

- 加密：master.key + keys => encrypted
- 解密：encrypted + master.key => keys

1. 创建秘钥：`EDITOR="code --wait" bin/rails credentials:edit`
   - 会创建一个临时文件：`5002.credentials.yml`，关闭临时文件就会删除
   - `config/master.key` 需要添加到 `.gitignore`
2. 读 `key`
   - 在 `Rails` 控制台中读
     - 打开控制台：`bin/rails console`：这个读到的是开发环境的 `key`
       - 生产环境：`RAILs_ENV=production bin/rails c`
     - 运行命令
       - `Rails.application.credentials.xxxx`，就可以得到 `key` 了
       - `Rails.application.credentials.config`，可以所有的 `key`
3. 多环境管理
   - `EDITOR="code --wait" bin/rails credentials:edit --environment production`
     - 会创建一个 `credentials` 目录
       - 在这个目录下会创建两个文件：`production.key` 和 `production.yml.enc`
     - 这个文件 `/config/credentials/production.key` 会被添加到 `.gitignore`
