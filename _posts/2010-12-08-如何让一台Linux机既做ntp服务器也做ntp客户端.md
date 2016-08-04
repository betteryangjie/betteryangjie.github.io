---
layout: post
title: 如何让一台Linux机既做ntp服务器也做ntp客户端
categories: [操作系统]
tags: [Linux,ntp]
---
一台Linux机已经做了ntp的服务器（即时间服务器），此时运行命令/usr/sbin/ntpdate time.example.com后，没有任何响应，该机的时间也没有同步为时间服务器time.example.com的时间。可通过如下步骤实现该机同时做为ntp的客户端，即可解决如上问题。

## 1.新建脚本

```Bash
[root@yangjie ~]# cd /
[root@yangjie ~]# vi gettime.sh
#!/bin/sh
. /etc/profile
. ~/.bash_profile
service ntpd stop
/usr/sbin/ntpdate time.example.com
service ntpd start
```

## 2.修改文件权限

```Bash
[root@yangjie ~]# chmod 777 gettime.sh
```

## 3.在crontab中设置该脚本定时执行

```Bash
[root@yangjie ~]# crontab -e
1-59 * * * * /gettime.sh
```

## 4.使crontab任务生效

```Bash
[root@yangjie ~]# crontab -u root /var/spool/cron/root
```