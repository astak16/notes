## 用邮件发送验证码

文档：https://guides.rubyonrails.org/action_mailer_basics.html#action-mailer-configuration

1. 创建 `mailer`：`bin/rails generate mailer User`
2. 创建一个发送者
   ```ruby
   # app/mailers/application_mailer.rb
   class ApplicationMailer < ActionMailer::Base
      default from: "from@example.com"
      layout 'mailer'
   end
   ```
3. 创建一个接收者
   ```ruby
   # app/mailers/user_mailer.rb
   class UserMailer < ApplicationMailer
      def welcome_email(code)
         @code = code
         mail(to: "1500846601@qq.com", subject: "Hi")
      end
   end
   ```
4. 创建一个邮件模版
   ```html
   <!-- app/views/user_mailer/welcome_email.html.erb -->
   <!DOCTYPE html>
   <html>
     <head>
       <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
     </head>
     <body>
       Hi <%= @code %>
     </body>
   </html>
   ```
5. 在邮箱的设置中，找到 POP3 服务中的 IMAP，将其开启
6. 将邮箱的密码保存到 `master.key` 中
7. 配置邮箱服务
   ```ruby
   # config/environments/development.rb
   config.action_mailer.raise_delivery_errors = true # 抛出邮件发送失败错误
   config.action_mailer.perform_caching = false # 是否使用缓存
   config.action_mailer.delivery_method = :smtp
   config.action_mailer.smtp_settings = {
      address: "smtp.qq.com",
      port: 587,
      domain: "smtp.qq.com",
      user_name: "1500846601@qq.com",
      password: Rails.application.credentials.email_password,
      authentication: "plain",
      enable_starttls_auto: true,
      open_timeout: 10,
      read_timeout: 10,
   }
   ```
8. 在 `rails` 控制台发邮件：`UserMailer.welcome_email("123456").deliver`
