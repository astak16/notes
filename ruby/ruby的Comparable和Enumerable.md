## Comparable

内置的 `Comparable`：

- `:==`
- `:>`
- `:<`
- `:<=`
- `:>=`
- `:between?`

### 将自定义的 `class` 变成 `Comparable`

```ruby
class Person
  attr_reader :name
  include Comparable

  def initialize(name)
    @name = name
  end

  # 只需要定义 <=> 方法，就能将自定义 class 变成 Comparable
  # 这里定义了比较方法是根据 name
  def <=>(other)
    self.name <=> other.name
  end
end

p1 = Person.new "Andrea"
p2 = Person.new "Fabio"
p3 = Person.new "Luigi"

p p1 > p2 # false
p p2.between?(p1, p3) # true
```

## Enumerable

1. search and filter
   - `:all?`
   - `:any?`
   - `:detect (alias :find)`
   - `:drop`
   - `:find_all`
   - `:find_index`
   - `:include?`
   - `:none?`
   - `:one?`
   - `:reject`
   - `:select`
2. grouping
   - `:chunk`
   - `:group_by`
   - `:partition`
3. iterate
   - `:cycle`
   - `:each_slice`
   - `:each`
   - `:each_with_index`
   - `:reverse_each`
4. iterate and create new collection
   - `:each_with_object`
   - `:flat_map`
   - `:map`
   - `:inject`
   - `:sort`
   - `:zip`
5. stats
   - `:count`
   - `:max`
   - `:min`
   - `:minmax`
   - `:max_by`
   - `:min_by`
   - `:minmax_by`
6. efficiency
   - `:lazy`

### 自定义的 `class` 变成 `Enumerable`

```ruby
class Person
  attr_reader :people
  include Enumerable

  def initialize(people)
    @people = people
  end

  # 定义 each 方法，因为我们知道 people 是数组，所以可以直接调用 each 方法
  # 定义了 each 方法之后，其他的 enumerable 方法也有了
  def each
    raise "please provide a block" unless block_given?
    people.each do |person|
      yield person
    end
  end
end

p1 = Person.new ["Andrea", "Fabio", "Luigi"]
p1.each do |e|
  p e
end
```
