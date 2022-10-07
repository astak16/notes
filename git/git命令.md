
## `git`最小配置
```js
git config --global user.name 'your_name'
git config --global user.email 'your_email@domain.com'

git config --local      //只对某个仓库有效
git config --global     //对所有仓库有效
git config --system     //对系统所有登录的用户有效
git config --global --list  //可以查看相关配置，是否设置成功
```

## `git`命令

```js
git clone --bare 文件路径        //--bare 不带工作区的仓库
git add -u      //add 所有修改的文件
git branch -v   //查看分支，带最近一条 commit
git checkout -b new_branch commit_id   //基于某个 commit_id 创建一个新的 branch 
git checkout -b new_branch exist_branch   //基于某个 branch 创建一个新的 branch
```

```js
git fetch
git merge origin_branch   //多人维护一个分支，本地分支和远程分支都有更改（当心冲突）
/** 上面两条等同于下面一条 **/
git pull
```

```js
git log     //查看当前分支的 commit 信息
git log --all       //查看所有分支的 commit 信息
git log --all --graph   //查看 branch 演变历史
```
```js
git commit --amend          //修改最近的提交信息
git commit master ^origin/master        //查看已 commit 未 push 的文件
```
```js
git rebase -i HEAD~2        //从 HEAD 版本开始往过去数 2 个版本，将 pick 改为 s 或 squash，然后保存
git rebase --contine        //如有冲突时需要输入，先输入 git add . 不然修改的就会丢失
git rebase -i 3a4226b       //指名要合并的版本之前的版本号
```
`git rebase -i`一些参数说明：
* `pick`：不更改任何东西
* `reword`：修改 commit_message
* `squash`：合并 commit

1. 合并相邻的`commit`只需将要合并的`commit`前面的`pick`改成`squash`；
2. 合并不同的`commit`，将要保留的`commit`放在最上面，前面是`pick`，将要合并的`commit`依次放在它的下面，前面改成`squash`

合并`commit`可能会出现冲突，解决后再合并


```js
git diff                            //比较暂存区和工作区之间的差异
git diff --cached                   //比较暂存区和 HEAD 之间的差异
git diff commit_id commit_id      //比较两个 commit 之间的差异
git diff HEAD HEAD^                 //等价于下面这条命令，意思是当前的 commit 和上一次的 commit
git diff HEAD HEAD~1                //等价于上面这条命令，意思是当前的 commit 和上一次的 commit
```

符号`^`和`~`
1. 一个节点，可以包含多个子节点（checkout 出多个分支）
2. 一个节点可以有多个父节点（多个分支合并）
3. `^`和`~`都是父节点，区别是跟数字的时候，`^2`是第二个父节点，而`~2`是父节点的父节点
4. `^`和`~`可以组合使用，例如`HEAD~2^2`


`git reset`有三个参数
1. `--soft`这个只是把`HEAD`指向的`commit`恢复到你指定的`commit`，暂存区和工作区不变；
2. `--hard`这个是把`HEAD`，暂存区，工作区都修改为：你指定的`commit`的时候的文件状态；
3. `--mixed`这个是不加时候的默认参数，把`HEAD`，暂存区修改为：你指定的`commit`的时候的文件状态，工作区保持不变。