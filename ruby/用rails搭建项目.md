## 用 rails 搭建项目

```ruby
rails new --api --database=postgresql --skip-test mangosteen
```

- `--api`：使用 `api` 模式
- `--database=postgresql`：使用的数据库是 `postgresql`
- `--skip-test`：跳过测试
- `mangosteen`：项目名

## 项目启动

```ruby
bundle exe rails server
# 等价于
bin/rails s
```

## 创建数据库

```ruby
docker run -p 5432:5432  -d \
    --name db-for-mangosteen \
    -e POSTGRES_USER=mangosteen \
    -e POSTGRES_PASSWORD=123456 \
    -e POSTGRES_DB=mangosteen_dev \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v mangosteen-data:/var/lib/postgresql/data \
    --network=network1 \
    postgres:14
```

## 数据建模

```ruby
bin/rails g model user name:string email:string
```

## 同步数据库

```ruby
bin/rails db:migrate
```

### 回滚

```ruby
bin/rails db:rollback # 回滚一步
bin/rails db:rollback step=2 # 回滚两步
```

## 创建 controller

```ruby
bin/rails g controller user create show # 创建 user controller，并添加 create 和 show 方法
```

## 查看路由

```ruby
bin/rails routes
```

## 安装测试

`rspec` 文档：https://github.com/rspec/rspec-rails

安装 `gem "rspec-rails", "~> 5.0.0"` 后运行命令

```ruby
bin/rails generate rspec:install
```

### 在测试环境下创建数据库

```ruby
RAILS_ENV=test bin/rails db:create
```

### 测试环境下同步数据库

```ruby
RAILS_ENV=test bin/rails db:migrate
```

### 运行测试用例

```ruby
bundle exec rspec
# 可简写
rspec
```

`request` 测试文档：https://relishapp.com/rspec/rspec-rails/docs/request-specs/request-spec
