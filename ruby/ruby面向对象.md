## Class

1. 在 `class` 中：
   - `@x` 是 `instance` 变量
   - `@@x` 是 `class` 变量
   - `$x` 是 `global` 变量
   - `x` 是 `local` 变量
2. 在 `ruby` 中，`getter` 和 `setter` 统称为 `accessor`
   - `attr_accessor` => `getter` 和 `accessor`
   - `attr_reader` => `getter`
   - `attr_writer` => `setter`
3. 访问 `instance` 属性，
   - `getter` 时，在定义了 `accessor` 后，再访问 `instance` 属性时可以省略 `self`
     ```ruby
     class Point
        attr_accessor :x, :y
        def initialize x, y
          @x = x
          @y = y
        end
        def first_quadrant?
          x > 1 && y > 1
        end
        # 没有定义 attr_accessor 时，要用 @x 的形式访问 `instance` 属性
        # def first_quadrant
        #  @x > 1 && @y > 1
        # end
     end
     ```
   - 在 `setter` 时，要加上 `@` 或者 `self`，如果不加设置的是 `local` 变量
4. `instance` 和 `class` 方法和属性的区别
   ```ruby
   class Point
      # instance 方法
      def first_quadrant?
        # self 指向 instance
        self.xxx
      end
      # class 方法，self 指向 class
      def self.second_quadrant?
        # self 指向 class
        self.xxx
      def
      # 都是 class 的方法
      class << self
        def a
        end
        def b
        end
      end
   end
   ```
5. `class` 属性有两种，一种是 `@@origin`，另一种是 `ORIGIN`
   ```ruby
    class Point
      @@origin = 1
      ORIGIN = 2
      def self.get_origin
        @@origin
      end
    end
    Point.origin # 报错
    # 访问 class 属性
    Point.get_origin
    # 访问常量的方式
    Point::ORIGIN
   ```

## 继承

在 `ruby` 的继承中 `public`、`protected`、`private` 都是可以继承

- `instance_of?`： 只有当前实例是当前 `class` 的 `instance` 返回 `true`
- `is_a?`：只要当前实例是当前 `class` 或者 `parent class`，都会返回 `true`

## 模块

```ruby
module A
  # class 方法
  def self.first
  end
  # instance 方法
  def second
  end
end
# class 方法调用
A.first
A.second # 报错
```

1. 在模块中 `instance` 方法的作用是用来做 `class` 的 `mixin`
   ```ruby
   class B
     include A
     # prepend A
   end
   b = B.new
   # 调用 module A 的 instance 方法
   b.second
   ```
2. 在 `class` 中 `extend module`，会将 `instance` 方法变成 `class` 的 `class` 方法
   ```ruby
   class B
     extend A
   end
   # module A 的 instance 方法变成 class B 的 class 方法
   B.second
   ```
3. 模块的 `class` 方法不能被 `mixin` 的 `class` 中
4. 将 `module` 中，当 `include` 时，既想引入 `instance` 方法，又想引入 `class` 方法
   ```ruby
   module A
    def first
      p "first"
    end
    # 将 class 方法定义在这里
    module ClassModule
      def second
        p "second"
      end
    end
    # 在 include 时触发
    def self.included(klass)
      klass.extend ClassModule
    end
    # 在 prepended 时触发
    def self.prepended(klass)
      klass.extend ClassModule
    end
   end
   class B
    include A
    # prepend A
   end
   b = B.new
   B.second
   b.first
   ```

## singleton_class

在 `ruby` 中，对象有自己的 `singleton_class`

```ruby
str = "abcd"
def str.foo
  p "foo"
end
str.foo # "foo"
str2 = "abcd"
str2.foo # 报错
```

给 `str` 定义的方法 `foo` 不会出现在 `str2` 上，那么这个实例方法保存在哪里呢？

`foo` 保存在 `singleton_class` 中，也就是说每一个对象都有一个自己 `singleton_class`

也就是说每个对象 `singleton` 方法等于 `sington_class` 的 `instance`方法

`ruby` 中，`class` 可以看作是对象，所以 `class` 也有自己的 `singleton_class`

之前上面说的 `class method`，其实是 `class` 的 `singleton_class` 的 `instance`方法

### 总结来说：

```ruby
class A
  # 实例方法 => A的实例方法
  def first
  end
  # 类方法 => A 的 singleton_class 的实例方法
  def self.second
  end
end
```
