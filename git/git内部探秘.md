## `HEAD`
当我们操作 `cat .git/HEAD`，会返回`ref: refs/heads/master`；当我们切换分支的时候，`HEAD`的内容分是会变化，它会告诉我们，目前是在什么分支下，`master`就是当前的分支。

## `config`
可以更改相关用户信息，比如最简单的：`user_name`、`user_eamil`

## refs
![](https://i.loli.net/2018/12/16/5c16227021997.png)

`refs`下可以有很多个`tag`，有些书上会把它叫做里程碑

`heads`对应是分支

外面大写的`HEAD`代表的是整个仓库正在工作在哪个分支上，所有`HEAD`里面是个引用，指向`refs`下的`heads`下的某个分支。

在`tag`下操作：
* 看类型用`-t`
* 看内容用`-p`
```js
cat js01                            //查看 js01 文件的内容：39c488020011...，这是一个 tag 的 hash 值，js01 是 tag 的名字
git cat-file -t 39c488020011        // tag
git cat-file -p 39c488020011        //看 tag hash 的内容：它是个对象 objcet:2b47b37... type:commit  tag:js01
git cat-file -t 2b47b37             //看它的 object 的 hash 值，类型是 commit
```

## `objects`
`objects`是`git`存储内容的区域
![](https://i.loli.net/2018/12/16/5c1628e0cc853.png)
`pack`是打包后的内容

有很多`2`个字节开头的文件，打开他们后会得到一串`hash`值，外面`2`个字节加上这串`hash`值，组成了它完整的`hash`

目前看到的这三个，`b0`是`blob`类型，`d6`是`tree`类型，`d9`是`commit`类型。

查看方式`git cat-file -t b0.....`
1. `commit`类型存储的是提交的信息
2. `tree`类型保存的是`blog`信息
3. `blob`类型存储的是具体的**文件内容**

问题：

为什么`.git/objects`文件夹中的子文件夹都是`hash`值的前两位字符命名？

每个`object`有`40`位字符组成，前两位字符用来当文件夹，后`38`位做文件。
所有对象按照`hash`值先有序地分到子文件夹的好处：
1. 每个操作系统对文件夹可容纳的文件数目都有上限
2. 提供更快的文件存取速度。