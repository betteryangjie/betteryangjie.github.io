---
layout: post
title: SunDirectoryServerEnterpriseEdition6.3三个实例实现主主复制
categories: [LDAP]
tags: [LDAP]
---
Linux操作系统上已经安装了三个LDAP实例，分别是489、589、689端口。通过下面步骤可实现三个示例的主主复制。初始化方向是489->589，589->689。

## 1.使用以下命令看是否已经配置了允许LDAP实例主主复制

```Bash
[root@yangjie ~]# dsconf list-suffixes -p 489 -v
[root@yangjie ~]# dsconf enable-repl -h localhost -p 489 -d 4891 master dc=zju,dc=edu,dc=cn
[root@yangjie ~]# dsconf list-suffixes -p 489 -v
```

## 2.

```Bash
[root@yangjie ~]# dsconf list-suffixes -p 589 -v
[root@yangjie ~]# dsconf enable-repl -h localhost -p 589 -d 5891 master dc=zju,dc=edu,dc=cn
[root@yangjie ~]# dsconf list-suffixes -p 589 -v
```

## 3.为LDAP实例修改复制管理器的密码

```Bash
[root@yangjie ~]# echo replmanager > pwd.txt
[root@yangjie ~]# cat pwd.txt
[root@yangjie ~]# dsconf set-server-prop -h localhost -p 489 def-repl-manager-pwd-file:pwd.txt
```

## 4.

```Bash
[root@yangjie ~]# echo replmanager > pwd.txt
[root@yangjie ~]# cat pwd.txt
[root@yangjie ~]# dsconf set-server-prop -h localhost -p 589 def-repl-manager-pwd-file:pwd.txt
```

## 5.为每个LDAP实例创建复制协议

```Bash
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 489 -v dc=zju,dc=edu,dc=cn
[root@yangjie ~]# dsconf create-repl-agmt -h localhost -p 489 dc=zju,dc=edu,dc=cn localhost:589
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 489 -v dc=zju,dc=edu,dc=cn
```

## 6.

```Bash
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 589 -v dc=zju,dc=edu,dc=cn
[root@yangjie ~]# dsconf create-repl-agmt -h localhost -p 589 dc=zju,dc=edu,dc=cn localhost:489
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 589 -v dc=zju,dc=edu,dc=cn
```

## 7.初始化LDAP实例的复制协议

```Bash
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 489 dc=zju,dc=edu,dc=cn localhost:589
```

下面的命令运行后，机器localhost上的589实例将被初始化跟localhost上489实例一样

```Bash
[root@yangjie ~]# dsconf init-repl-dest -h localhost -p 489 dc=zju,dc=edu,dc=cn localhost:589
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 489 dc=zju,dc=edu,dc=cn localhost:589
```

## 8.

```Bash
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 589 dc=zju,dc=edu,dc=cn localhost:489
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 589 dc=zju,dc=edu,dc=cn localhost:489
```

## 9.

```Bash
[root@yangjie ~]# dsconf list-suffixes -p 689 -v
[root@yangjie ~]# dsconf enable-repl -h localhost -p 689 -d 6891 master dc=zju,dc=edu,dc=cn
[root@yangjie ~]# dsconf list-suffixes -p 689 -v
```

## 10.

```Bash
[root@yangjie ~]# echo replmanager > pwd.txt
[root@yangjie ~]# cat pwd.txt
[root@yangjie ~]# dsconf set-server-prop -h localhost -p 689 def-repl-manager-pwd-file:pwd.txt
```

## 11.为每个LDAP实例创建复制协议

```Bash
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 589 -v dc=zju,dc=edu,dc=cn
[root@yangjie ~]# dsconf create-repl-agmt -h localhost -p 589 dc=zju,dc=edu,dc=cn localhost:689
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 589 -v dc=zju,dc=edu,dc=cn
```

## 12.

```Bash
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 689 -v dc=zju,dc=edu,dc=cn
[root@yangjie ~]# dsconf create-repl-agmt -h localhost -p 689 dc=zju,dc=edu,dc=cn localhost:589
[root@yangjie ~]# dsconf list-repl-agmts -h localhost -p 689 -v dc=zju,dc=edu,dc=cn
```

## 13.初始化LDAP实例的复制协议

```Bash
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 589 dc=zju,dc=edu,dc=cn localhost:689
```

下面的命令运行后，机器localhost上的689实例将被初始化跟localhost上589实例一样

```Bash
[root@yangjie ~]# dsconf init-repl-dest -h localhost -p 589 dc=zju,dc=edu,dc=cn localhost:689
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 589 dc=zju,dc=edu,dc=cn localhost:689
```

## 14.

```Bash
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 689 dc=zju,dc=edu,dc=cn localhost:589
[root@yangjie ~]# dsconf show-repl-agmt-status -h localhost -p 689 dc=zju,dc=edu,dc=cn localhost:589
```