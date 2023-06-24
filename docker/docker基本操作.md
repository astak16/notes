## 在 linux 中启动 docker

```shell
sudo systemctl start docker
```

## 搜索镜像

```shell
docker search mysql
```

## 下载镜像

```shell
docker pull mysql
```

## 查看运行中的容器

```shell
docker ps
```

`-a`表示所有

## 查看本地镜像

```shell
docker images
# 或者
docker image ls
```

## 用 docker 跑一个 mysql 服务

```shell
docker run -p 3306:3306 --name uccs_mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

参数`-p`设置端口，`--name`取名，`-e MYSQL_ROOT_PASSWORD=123456`设置账号为`root`，密码为`123456`，`-d`表示作为一个守护进程在后台运行。

## 删除所有停止的容器

```shell
docker container prune
```

## 停止、启动、杀死、重启一个容器

```shell
docker stop <container_name/container_id>
docker start <container_name/container_id>
docker kill <container_name/container_id>
docker restart <container_name/container_id>
```

## 删除 images

```shell
# 删除某个 image
docker rmi -f image_id

# 删除所有 image
docker rmi -f $(docker images -aq)
```

## 查看运行的容器

```shell
docker ps
# 或者
docker container ls
```

## 查看所有容器

```shell
docker ps -a
```

## 查看所有容器的 ID

```shell
docker ps -aq
```

## 删除容器

```shell
docker rm -f <container_id>
```

## 删除所有容器

```shell
docker rm -f $(docker ps -aq)
```

## 删除所有已退出的 container

```shell
docker rm -v $(docker ps -a -q -f status=exited)
```

`-v` 删除与容器关联的 `volume`

## 查看容器日志

```shell
docker logs <container_id>
```

## 查看容器进程信息

```shell
docker top <container_id>
```

## 进入当前正在运行的容器

```shell
docker exec -it <container_id> /bin/shell
# 或者
docker attach <container_id>
```

## 进入容器内部

```shell
docker exec -it <container_id> /bin/bash
```

## 从容器中将文件拷贝到主机上

```shell
docker cp <container_id>:容器目录 主机目录
```

## 查看资源

```shell
docker stats
```

## 提交修改到镜像

```shell
docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
```

ps：不推荐用这种方法创建镜像，因为不是很安全，不清楚别人会在里面放什么东西，推荐使用 `Dockerfile` 的方式创建镜像

## 查看容器详细信息

```shell
docker inspect <container_id>
```

## 查看镜像历史

```shell
docker history <image_id>
```
