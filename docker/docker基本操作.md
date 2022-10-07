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
docker images -a
```

## 用`docker`跑一个`mysql`服务
```shell
docker run -p 3306:3306 --name uccs_mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```
参数`-p`设置端口，`--name`取名，`-e MYSQL_ROOT_PASSWORD=123456`设置账号为`root`，密码为`123456`，`-d`表示作为一个守护进程在后台运行。

## 删除所有停止的容器
```shell
docker container prune
```

## 停止、启动、杀死、重启一个容器
```docker
docker stop Name/ID  
docker start Name/ID  
docker kill Name/ID  
docker restart name/ID
```

## 删除`images`（镜像）
```
docker rmi imageId
```