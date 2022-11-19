## 手动处理错误

```ruby
def foo
  begin
    raise TypeError, "Boom in foo", caller
    rescue => e
    puts ..send(:caller)
  end
end
```

报错信息

```ruby
(irb):9:in `foo'
(irb):16:in `irb_binding'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/workspace.rb:85:in `eval'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/workspace.rb:85:in `evaluate'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/context.rb:385:in `evaluate'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:493:in `block (2 levels) in eval_input'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:647:in `signal_status'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:490:in `block in eval_input'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/ruby-lex.rb:246:in `block (2 levels) in each_top_level_statement'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/ruby-lex.rb:232:in `loop'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/ruby-lex.rb:232:in `block in each_top_level_statement'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/ruby-lex.rb:231:in `catch'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb/ruby-lex.rb:231:in `each_top_level_statement'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:489:in `eval_input'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:428:in `block in run'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:427:in `catch'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:427:in `run'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/irb.rb:383:in `start'
/Library/Ruby/Gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
/usr/bin/irb:23:in `load'
/usr/bin/irb:23:in `<main>'
```

如果没有 `rescue` 错误，就是一个常规错误

```ruby
def foo
  begin
    raise TypeError, "Boom in foo"
  end
end
```

报错信息

```ruby
Traceback (most recent call last):
        5: from /usr/bin/irb:23:in `<main>'
        4: from /usr/bin/irb:23:in `load'
        3: from /Library/Ruby/Gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        2: from (irb):32
        1: from (irb):27:in `foo'
TypeError (Boom in foo)
```

## 例子 1

```ruby
def factorial(n)
  raise TypeError unless n.is_a? Integer
  raise ArgumentError if n < 1
  return 1 if n == 1
  n * factorial(n - 1)
end

begin
  x = factorial 2
rescue ArgumentError => e
  puts "Try again with a value >=1"
rescue TypeError => e
  puts "Try again with an integer"
else # 不报错会走这一步
  puts x
ensure # 不管报错还是不报错都会走这一步
  puts "The process of factorial calculation is completed"
end
```

## 例子 2

```ruby
arr = [1, 2, "asdf", 3, "hello", "world", "hjkl", 0.3]

def sum_pair(arr)
  sum = 0
  arr.each_slice(2) do |pair|
    begin
      puts pair[0] + pair[1]
    rescue TypeError => e
      puts "Invalid summation of #{pair[0].class} + #{pair[1].class}"
    ensure
      sum += 1
    end
  end
  puts "***! Altogether there are #{sum} pairs processed !***"
end

sum_pair arr
```
