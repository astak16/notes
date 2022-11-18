## 字符串

`ruby` 字符串是可变的，当改变字符串时，它的 `object_id` 是不变的

```ruby
a = "abcd"
a.object_id # 70217661481800
a[1] = "d"
a.object_id # 70217661481800
```

- `symbol` 类型的字符串是不可变的
- `%q('xxx')` 单引号不需要转义，`%Q("xxxx")` 双引号不需要转义
- `string` 转 `symbol`：`s.to_sym`
- `symbol` 转 `string`：`s.to_s`

## 数组

- 创建数组
  1.  创建一个定长的数组(第二个参数是默认值，不传默认为 `nil`)：
  ```ruby
  a = Array.new 3 # [nil, nil, nil]
  b = Array.new 3, 0 # [0, 0, 0]
  ```
  2.  如果定长数组，默认值为字符串，那么它的每项的引用地址都一样，当你改了其中某一项的值后，数组中的每一项都变了，这是因为字符串是可变的
  ```ruby
  a = Array.new 3, "uccs" # ["uccs", "uccs", "uccs"]
  a[1][2] = "b" # ["ucbs", "ucbs", "ucbs"]
  # 解决方法：使用 block
  a = Array.new(3) { "uccs" } # ["uccs", "uccs", "uccs"]
  a[1][2] = "b" # ["uccs", "ucbs", "uccs"]
  ```
  3.  另一种定义字符串数组的方式
  ```ruby
  a = %w(foo bar wut wat) # ["foo", "bar", "wut", "wat"]
  ```
- 数组的一些方法
  1.  取第一项：`arr[0]`
  2.  取最后一项：`arr[-1]`
  3.  取 `2-5` 项：`arr[1..4]`
  4.  安全的取值：
      - `arr.fetch(0)` 等价于 `arr[0]`
      - `a rr.fetch(5, "abcd")` 如果第 `5` 项不存在，默认为 `abcd`
  5.  是否是空数组：`arr.empty?()`
  6.  通过下标删除某一项：`arr.delete_at(1)`
  7.  通过内容删除某一项：`arr.delete("foo")`
  8.  去重：`arr.uniq`
  9.  随机换位置：`arr.shuffle`
  10. 二维数组转一维数组：`arr.flatten`
  11. 筛选出大于 `0` 的元素：`arr.select { |e| e > 0 }`
  12. 排序：`arr.sort`
  13. 遍历：`arr.each { |e| p e}`
  14. 反向遍历：`arr.reverse_each { |e| p e }`
  15. 遍历，打印出 `key` 和 `value`：`arr.each_with_index { |e, i| p [e, i] }`
  16. 在数组中添加一项：`arr.push 3` 等于 `arr << 3`
  17. 去掉 `nil` 的方式：`arr.compact`
  18. 加感叹号的方法会改变数组本身，返回改变后的数组，如果数组没有变，则返回 `nil`
  19. 加问号的方法会返回 `boolean`

## Hash

`Hash` 使用 `immutable` 类型的数据作为 `key`，在 `ruby` 中 `string` 是 `mutable`，为什么也能作为 `key` 呢？

`ruby` 对于 `string` 类型的 `key` 做了一些特殊的处理，把它做了一个备份，这个备份是不可改变的

- 声明
  - `h = Hash.new(3)`：`h` 的每项默认值都为 `3`
    - `h[0] # 3`
    - `h[1] # 3`
    - `h[2] # 3`
  - `h = Hash.new([])`：`h` 的每项默认值都为 `[]`
    - `h[0] # []`
    - `h[1] # []`
    - 在后面定义任何 `key` 时，它的默认值都会改变
      ```ruby
      h[2] << 33 # [33]
      h[3] # [33]
      ```
  - `h = Hash.new { |h, k| h[k] = [] }` 每一项的默认值为 `[]`，互补影响
- 方法
  - `h.assoc(:b) # [:b, 2]` 拿出 `key` 和 `value`
  - `h.empty?()`
  - `h.has_value?(2)`
  - `h.has_key?(:b)`
  - `h.keys`
  - `h.values`
  - 把 `hash` 变成 `array`：`h.to_a`
  - 合并两个 `hash`：`h.merge(h2)`
  - `h.each { |key, value| p [key,value] }`，先添加的 `key` 和 `value` 先遍历
  - `h.each_key { |key| p key }`
  - `h.each_value { |value| p value }`
  - `h.select { |key| key == :a}`

## Set

`Set` 是 `mutable`，内部的数据是不允许重复

在 `ruby` 的命令行中使用 `Set`，需要 `require "set"`

- 声明
  - `Set.new [1, 2, 3]`
- 方法
  - `s.add(4)`
  - 判断交集：`s & s1`
  - 判断并集：`s | s1`
  - 判断子集：`s <= s1`

## Range

`..`表示闭区间，`...`表示开区间（开区间时闭开区间）

## 方法

- 方法别名：
  ```ruby
  def foo
     p "foo"
  end
  alias :bar :foo
  ```
- 符号也是方法
  - 在数组中 `[]` 也是方法
    ```ruby
    arr = [1, 2, 3, 4]
    arr[2] # 3
    arr.[] 2 # 3
    ```
  - 在数组中 `+` 运算符是合并两个数组，我们可以对他进行改造
    ```ruby
    def arr.+(num)
      self.dup << num # dup 方法不会改变自身
    end
    ```

## `block`、`proc`、`lambda`

- `{}` 比 `do ... end` 优先级要高，下面代码如果把 `{}` 换成 `do ... end`，就会被 `foo` 和 `lambda` 作为传入参数，把 `do ... end` 作为另外一个 `block`；使用 `{}`，由于 `{}` 优先级比较高，就会把 `{}` 和 `lambda` 绑定在一起
  ```ruby
  scope :foo, lambda { |elem|
     foo(elem)
     bar(elem)
     baz(elem)
  }
  ```
- 方法中传入 `block`，为了区别传入的是参数还是 `block`，在 `block` 前面加上 `&`
  ```ruby
  def foo(&block)
   a = 2
   block.call(a)
  end
  foo { |b| p b }
  ```
- 使用 `iterate` 实现上面方法
  ```ruby
  def foo
   a = 3
   yield a
  end
  foo {|b| p b}
  ```
- `block` 中的 `return` 不是从 `block` 中 `return` 出来，而是从包含 `block` 的方法中 `return` 出来。
  - 报错
    ```ruby
    foo {|a| p a; return}
    ```
  - 正确使用
    ```ruby
    def bar
       x = 3
       yield x
       p 'end of bar'
    end
    def foo
       p 'start of foo'
       bar { |a| return if a > 0 }
       p 'end of foo'
    end
    foo
    ```
- `Proc`
  - `Proc` 是类
    - `proc` 是 `Proc` 中的一个对象
    - `lambda` 是 `Proc` 中的一个对象
  - `block` 是一种语法结构，不是一个对象，如果要找一个对象来代替 `block`，这个对象就是 `Proc`
  - `&block` 这里 `&` 就是把 `block` 转换成 `Proc` 对象
    - 这不仅可以在方法定义的使用把 `block` 转换为 `Proc`，在方法调用的时候把 `Proc` 转换为 `block`
      ```ruby
      arr = %w(a b c)
      arr.map(&:capitalize) # ["A", "B", "C"]
      arr.map { |x| x.capitalize } # ["A", "B", "C"]
      ```
      通过 `&` 把方法 `capitalize` 变成 `Proc`，在变成 `block` 调用
  - 定义 `Proc`：
    - 方式一
      ```ruby
      proc = Proc.new { |x| x * 2 }
      proc.class # Proc
      ```
    - 方式二
      ```ruby
      lambda = lambda { |x| x * 2 }
      lambda.class # Proc
      ```
  - 为什么 `Proc` 要区分 `proc` 和 `lambda`
    - `proc` 的行为更像 `block`
      ```ruby
      p = Proc.new { |x, y| p x, y }
      p.call(1) # 1, nil
      p.call(1, 2) # 1, 2
      p.call(1, 2, 3) # 1, 2
      ```
      ```ruby
      p = Proc.new { |x| return if x > 1 }
      p.call(2) # 报错
      ```
    - `lambda` 的行为更像方法
      ```ruby
      l = lambda { |x, y| p x, y }
      l.call(1) # 报错
      l.call(1, 2) # 1, 2
      l.call(1, 2, 3) # 报错
      ```
      ```ruby
      l = lambda { |x| return if x > 1}
      l.call(2) # 不报错
      ```
