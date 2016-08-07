---
layout: post
title: Shibboleth的安装以及配置CAS作为验证源
categories: [门户系统]
tags: [Shibboleth,SSO]
---
Shibboleth是一个针对SSO的开源项目，主要应用在高校之间的Web资源共享与访问控制，以及校园间的应用系统的用户身份联合认证。2006年 12月，由北京大学执行的CARSI项目即是在国内高校之间部署Shibboleth，隶属于国家863计划，目前已经有清华大学、北京邮电大学、中国电 子科技大学、华南理工大学等陆续加入，建立了CARSI-Fed（也称为CERNET-Fed），其目标是最终实现中国教育科研网内跨机构用户统一身份认 证、共享资源访问授权和审计系统。更多的详细信息可以参考：http://carsi.edu.cn/。

本文介绍CAS安装、Shibboleth-idp（linux版本）安装、Shibboleth-sp安装以及配置CAS为Shibboleth-idp（linux版本）的验证源。在下面将按照步骤先后顺序进行介绍。

在安装之前，让我们来了解下需要准备些什么。包括安装文件、机器、域名等。

1、需要有三个独立的域名。比如本文中CAS的域名是yangjie.info，Shibboleth-idp的域名是idp.example.org, Shibboleth-sp的域名是sp.example.org。

2、本文中，实际需要三台机器。其中CAS安装在WinXP系统。Shibboleth-idp和Shibboleth-sp分别装在linux系统上。

3、在三台机器的操作系统都已装好的情况下，需要准备如下安装文件：

CAS：

(1)Apache Tomcat（apache-tomcat-6.0.18）

(2)JDK（jdk-6u10-rc2-bin-b32-windows-i586-p-12_sep_2008.exe）

(3)cas-server（cas-server-3.4.2.1-release.zip）

Shibboleth-idp：

(1)Apache Tomcat（apache-tomcat-6.0.18）

(2)JDK（jdk-6u14-linux-i586-rpm.bin）

(3)shibboleth-identityprovider（shibboleth-identityprovider-2.1.5-bin.zip）

(4)cas-client（cas-client-3.1.10-release.tar.gz）

Shibboleth-sp：

省略...

备注：如果需要使用Shibboleth-sp来测试，则Shibboleth-sp和Shibboleth-idp的两台机器时间要相同。

## 1.CAS安装

### 1.1 系统信息

```Dos
Microsoft Window XP
Professional
版本 2002
Service Pack 3
计算机：
Ghost XP SP3 纯净版 Y6.0
Pentium(R) Dual-Core CPU
E5200 @ 2.50GHz
2.52 GHz,1.99GB的内存
物理地址扩展
```

## 2.Shibboleth-idp安装

### 2.1 系统信息

```Bash
[root@idp ~]# lsb_release -a
LSB Version:    :core-3.1-ia32:core-3.1-noarch:graphics-3.1-ia32:graphics-3.1-noarch
Distributor ID: RedHatEnterpriseServer
Description:    Red Hat Enterprise Linux Server release 5.2 (Tikanga)
Release:        5.2
Codename:       Tikanga
```

### 2.2 域名设置

```Bash
[root@idp ~]# hostname idp
[root@idp ~]# domainname example.org
```

### 2.3 linux下JDK安装

#### 2.3.1 准备安装包（jdk-6u14-linux-i586-rpm.bin）

#### 2.3.2 上传到Linux服务器上（上传到/home/software目录下）

#### 2.3.3 给安装文件分配可执行权限

```Bash
[root@idp ~]# cd /home/software
[root@idp ~]# chmod 755 jdk-6u14-linux-i586-rpm.bin
```

#### 2.3.4 运行文件

```Bash
[root@idp ~]# ./jdk-6u14-linux-i586-rpm.bin
```

接下来会有一段Sun的协议，敲几次空格键，当询问是否同意的时候，敲yes就可以了。
程序会自动生成一个jdk-6u14-linux-i586.rpm文件，这是主程序包。

#### 2.3.5 安装

```Bash
[root@idp ~]# rpm -ivh jdk-6u14-linux-i586.rpm
```

#### 2.3.6 设置环境变量

```Bash
[root@idp ~]# vi /etc/profile
#set java environment
JAVA_HOME=/usr/java/jdk1.6.0_14
CLASSPATH=.:$JAVA_HOME/lib.tools.jar
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME CLASSPATH PATH
```

同时按住shift和冒号键，再按w和q，保存退出。

下面使环境变量生效，并对所有用户的shell都生效。

```Bash
[root@idp ~]# source /etc/profile
```

下面来验证一下变量设置是否生效

```Bash
[root@idp ~]# java -version
java version "1.6.0_14"
Java(TM) SE Runtime Environment (build 1.6.0_14-b08)
Java HotSpot(TM) Client VM (build 14.0-b16, mixed mode, sharing)
```

### 2.4 linux下tomcat安装

#### 2.4.1 准备安装包（apache-tomcat-6.0.18.zip）

#### 2.4.2 上传到Linux服务器上（上传到/home/software目录下）

#### 2.4.3 解压安装包

```Bash
[root@idp ~]# cd /home/software
[root@idp ~]# unzip apache-tomcat-6.0.18.zip
```

#### 2.4.4 赋权限给相应文件

```Bash
[root@idp ~]# cd apache-tomcat-6.0.18/bin
[root@idp ~]# chmod +x setclasspath.sh
[root@idp ~]# chmod +x startup.sh
[root@idp ~]# chmod +x shutdown.sh
```

#### 2.4.5 启动tomcat

```Bash
[root@idp ~]# ./startup.sh
```

#### 2.4.6 测试

在浏览器输入http://idp.example.org:8080，如果能显示tomcat页面，则表示tomcat已经正常运行。

### 2.5 shibboleth-idp安装

#### 2.5.1 解压shibboleth-idp的安装文件

```Bash
[root@idp ~]# cd /home/software
[root@idp ~]# jar -xf shibboleth-identityprovider-2.1.5-bin.zip
```

#### 2.5.2 拷贝endorsed文件夹到tomcat目录

```Bash
[root@idp ~]# cp –rf /export/home/shibboleth-identityprovider-2.1.5/endorsed/ /usr/local/apache-tomcat-6.0.18/
```

#### 2.5.3 给安装文件install.sh赋执行权限

```Bash
[root@idp ~]# cd shibboleth-identityprovider-2.1.5
[root@idp ~]# chmod a+x install.sh
```

#### 2.5.4 运行安装文件

```Bash
[root@idp ~]# ./install.sh
```

这时会要求填写shibboleth的安装位置（/opt/shibboleth-idp），本机域名（idp.example.org），为生成数字证书设置密码（123456）。

#### 2.5.5 拷贝idp.war文件到tomcat应用目录下

```Bash
[root@idp ~]# cp –rf /opt/shibboleth-idp/war/idp.war /usr/local/apache-tomcat-6.0.18/webapps
```

#### 2.5.6 启动tomcat

```Bash
[root@idp ~]# cd /usr/local/apache-tomcat-6.0.18/bin
[root@idp ~]# chomd a+x startup.sh shutdown.sh setclasspath.sh
[root@idp ~]# ./startup.sh
```

#### 2.5.7 测试

在浏览器输入http://idp.example.org:8080/idp/profile/Status，如果能显示ok，则表示shibboleth-idp安装成功。

### 2.6 HTTPS验证配置（8443端口）

#### 2.6.1 将tomcat6-dta-ssl-1.0.0.jar文件放置到/usr/local/apache-tomcat-6.0.18/lib目录下

#### 2.6.2 修改/usr/local/apache-tomcat-6.0.18/conf/server.xml文件

在如下内容后

{% highlight xml %}
<!--
    <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS" />
-->
{% endhighlight %}

添加8443端口配置

{% highlight xml %}
<Connector port="8443"
           protocol="org.apache.coyote.http11.Http11Protocol"
           SSLImplementation="edu.internet2.middleware.security.tomcat6.DelegateToApplicationJSSEImplementation"
           scheme="https"
           SSLEnabled="true"
           clientAuth="true"
           keystoreFile="/opt/shibboleth-idp/credentials/idp.jks"
           keystorePass="123456" />
{% endhighlight %}

#### 2.6.3 重启tomcat

```Bash
[root@idp ~]# cd /usr/local/apache-tomcat-6.0.18/bin
[root@idp ~]# ./shutdown.sh
[root@idp ~]# ./startup.sh
```

#### 2.6.4 测试

在浏览器输入https://idp.example.org:8443/idp/profile/Status，如果能显示ok，则表示8443端口配置成功。

### 2.7 HTTPS验证配置（443端口）

#### 2.7.1 修改apache配置文件

如果系统有独立Apache，443端口已经被占用了。则需要修改/etc/httpd/conf.d/ssl.conf文件，将端口443修改为其他端口（此处修改为1443端口）。

“Listen 443”修改为“Listen 1443”

{% highlight xml %}
<VirtualHost _default_:443>
{% endhighlight %}

修改为

{% highlight xml %}
<VirtualHost _default_:1443>
{% endhighlight %}

#### 2.7.2 重启Apache

```Bash
[root@idp ~]# service httpd restart
```

#### 2.7.3 制作密钥库

```Bash
[root@idp ~]# $JAVA_HOME/bin/keytool -genkey -alias shibbolethidp -keyalg RSA
```

接着输入相关信息。注意：名字与姓氏要输入主机名或域名或localhost，不能随意输入。

#### 2.7.4 修改tomcat配置文件/usr/local/apache-tomcat-6.0.18/conf/server.xml

在如下内容后

{% highlight xml %}
<!--
    <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS" />
-->
{% endhighlight %}

添加443端口配置

{% highlight xml %}
<Connector protocol="org.apache.coyote.http11.Http11Protocol"
           port="443" maxThreads="200"
           scheme="https" secure="true" SSLEnabled="true"
           keystoreFile="${user.home}/.keystore" keystorePass="123456"
           clientAuth="false" sslProtocol="TLS"/>
{% endhighlight %}

#### 2.7.5 重启tomcat

```Bash
[root@idp ~]# cd /usr/local/apache-tomcat-6.0.18/bin
[root@idp ~]# ./shutdown.sh
[root@idp ~]# ./startup.sh
```

#### 2.7.6 测试

在浏览器输入https://idp.example.org:443/idp/profile/Status，如果能显示ok，则表示443端口配置成功。

## 3.Shibboleth-sp安装

### 3.1 系统信息

```Bash
[root@localhost ~]# lsb_release -a
LSB Version:    :core-3.1-ia32:core-3.1-noarch:graphics-3.1-ia32:graphics-3.1-noarch
Distributor ID: RedHatEnterpriseServer
Description:    Red Hat Enterprise Linux Server release 5.2 (Tikanga)
Release:        5.2
Codename:       Tikanga
```

### 3.2 域名设置

```Bash
[root@localhost ~]# hostname 
localhost.localdomain
[root@localhost ~]# hostname sp.example.org
[root@localhost ~]# hostname
sp.example.org
[root@localhost ~]# vi /etc/hosts
# Do not remove the following line, or various programs
# that require network functionality will fail.
::1     localhost.localdomain   localhost       sp
127.0.0.1     sp.example.org    sp  localhost.localdomain    localhost
```

### 3.3 关闭防火墙

```Bash
[root@test1 shibboleth]# /etc/rc.d/init.d/iptables stop
```

### 3.4 httpd安装

#### 3.4.1 安装

```Bash
[root@localhost software]# rpm -ivh apr-1.2.7-11.i386.rpm
warning: apr-1.2.7-11.i386.rpm: Header V3 DSA signature: NOKEY, key ID 1e5e0159
Preparing...                ########################################### [100%]
   1:apr                    ########################################### [100%]
[root@localhost software]# rpm -ivh postgresql-libs-8.1.11-1.el5_1.1.i386.rpm
warning: postgresql-libs-8.1.11-1.el5_1.1.i386.rpm: Header V3 DSA signature: NOKEY, key ID 1e5e0159
Preparing...                ########################################### [100%]
   1:postgresql-libs        ########################################### [100%]
[root@localhost software]# rpm -ivh apr-util-1.2.7-7.el5.i386.rpm
warning: apr-util-1.2.7-7.el5.i386.rpm: Header V3 DSA signature: NOKEY, key ID 1e5e0159
Preparing...                ########################################### [100%]
   1:apr-util               ########################################### [100%]
[root@localhost software]# rpm -ivh httpd-2.2.3-11.el5_1.3.i386.rpm
warning: httpd-2.2.3-11.el5_1.3.i386.rpm: Header V3 DSA signature: NOKEY, key ID 37017186
Preparing...                ########################################### [100%]
   1:httpd                  ########################################### [100%]
[root@localhost software]# service httpd start
Starting httpd:                                            [  OK  ]
```

#### 3.4.2 测试

在浏览器输入http://sp.example.org，如果能显示redhat的欢迎页面，则表示安装成功。

### 3.5 ssl安装

#### 3.5.1 安装

```Bash
[root@localhost software]# rpm -ivh distcache-1.4.5-14.1.i386.rpm
warning: distcache-1.4.5-14.1.i386.rpm: Header V3 DSA signature: NOKEY, key ID 37017186
Preparing...                ########################################### [100%]
   1:distcache              ########################################### [100%]
[root@localhost software]# rpm -ivh mod_ssl-2.2.3-11.el5_1.3.i386.rpm
warning: mod_ssl-2.2.3-11.el5_1.3.i386.rpm: Header V3 DSA signature: NOKEY, key ID 37017186
Preparing...                ########################################### [100%]
   1:mod_ssl                ########################################### [100%]
[root@localhost software]# rpm -ivh openssl097a-0.9.7a-9.el5_2.1.i386.rpm 
warning: openssl097a-0.9.7a-9.el5_2.1.i386.rpm: Header V3 DSA signature: NOKEY, key ID e8562897
Preparing...                ########################################### [100%]
   1:openssl097a            ########################################### [100%]
[root@localhost software]# service httpd restart
Stopping httpd:                                            [  OK  ]
Starting httpd:                                            [  OK  ]
```

#### 3.5.2 测试

在浏览器输入https://sp.example.org，如果能显示redhat的欢迎页面，则表示安装成功。

### 3.6 sp安装

#### 3.6.1 安装

```Bash
[root@localhost sp]# ls
libunixODBC2-2.2.6-7sls.i586.rpm  xerces-c-3.0.1-6.2.i386.rpm
log4shib-1.0.4-1.2.i386.rpm       xml-security-c-1.5.1-4.2.i386.rpm
opensaml-2.3-1.8.i386.rpm         xmltooling-1.3.3-1.2.i386.rpm
shibboleth-2.3.1-1.3.i386.rpm
[root@localhost sp]# rpm -ivh log4shib-1.0.4-1.2.i386.rpm
warning: log4shib-1.0.4-1.2.i386.rpm: Header V3 DSA signature: NOKEY, key ID 7d0a1b3d
Preparing...                ########################################### [100%]
   1:log4shib               ########################################### [100%]
[root@localhost sp]# rpm -ivh xerces-c-3.0.1-6.2.i386.rpm
warning: xerces-c-3.0.1-6.2.i386.rpm: Header V3 DSA signature: NOKEY, key ID 7d0a1b3d
Preparing...                ########################################### [100%]
   1:xerces-c               ########################################### [100%]
[root@localhost sp]# rpm -ivh xml-security-c-1.5.1-4.2.i386.rpm
warning: xml-security-c-1.5.1-4.2.i386.rpm: Header V3 DSA signature: NOKEY, key ID 7d0a1b3d
Preparing...                ########################################### [100%]
   1:xml-security-c         ########################################### [100%]
[root@localhost sp]# rpm -ivh xmltooling-1.3.3-1.2.i386.rpm
warning: xmltooling-1.3.3-1.2.i386.rpm: Header V3 DSA signature: NOKEY, key ID 7d0a1b3d
Preparing...                ########################################### [100%]
   1:xmltooling             ########################################### [100%]
[root@localhost sp]# rpm -ivh opensaml-2.3-1.8.i386.rpm
warning: opensaml-2.3-1.8.i386.rpm: Header V3 DSA signature: NOKEY, key ID 7d0a1b3d
Preparing...                ########################################### [100%]
   1:opensaml               ########################################### [100%]
[root@localhost sp]# rpm -ivh libunixODBC2-2.2.6-7sls.i586.rpm
warning: libunixODBC2-2.2.6-7sls.i586.rpm: Header V3 DSA signature: NOKEY, key ID 67f22696
Preparing...                ########################################### [100%]
   1:libunixODBC2           ########################################### [100%]
[root@localhost sp]# rpm -ivh shibboleth-2.3.1-1.3.i386.rpm
warning: shibboleth-2.3.1-1.3.i386.rpm: Header V3 DSA signature: NOKEY, key ID 7d0a1b3d
Preparing...                ########################################### [100%]
   1:shibboleth             ########################################### [100%]
[root@localhost sp]# find / -name 'httpd.conf'
/etc/httpd/conf/httpd.conf
[root@localhost sp]# vi /etc/httpd/conf/httpd.conf
# Edit httpd.conf:
    * The UseCanonicalName directive should be set to On or resource mapping errors will result.
    * Ensure that the ServerName directive is properly set, and that Apache is being started with SSL enabled.
[root@localhost sp]# /usr/sbin/apachectl restart
[root@localhost sp]# /sbin/service shibd start
Starting shibd:                                            [  OK  ]
```

#### 3.6.2 测试

在sp.example.org机器上打开浏览器输入https://localhost/Shibboleth.sso/Status，如果能显示出如下内容，则表示安装成功。

{% highlight xml %}
<StatusHandler>
<Version Xerces-C="3.0.1" XML-Security-C="1.5.1" OpenSAML-C="2.3.0" Shibboleth="2.3.1"/>
<SessionCache>
<OK/>
</SessionCache>
<Application id="default" entityID="https://sp.example.org/shibboleth"/>
<Handlers>
...
{% endhighlight %}

### 3.7 sp configure with idp

#### 3.7.1 在sp.example.org机器上做修改

##### (1)将idp的metadata文件idp-metadata.xml放到/etc/shibboleth文件夹下

##### (2)修改shibboleth2.xml，修改<ApplicationDefaults标签里的元素entityID的值

##### (3)修改shibboleth2.xml，修改<SessionInitiator标签里的元素entityID的值

##### (4)修改shibboleth2.xml，将<MetadataProvider的注释去掉，并修改file的值为idp的metadata文件idp-metadata.xml所在路径

##### (5)重启服务

#### 3.7.2 在idp.example.org机器上做修改

##### (1)在浏览器输入https://sp.example.org/Shibboleth.sso/Metadata，将得到一个名为Metadata的文件，这个即是sp的metadata文件

##### (2)将上一步得到的文件放到/opt/shibboleth-idp/metadata文件夹下，并重命名为metadata-sp.xml

##### (3)修改/opt/shibboleth-idp/conf/relying-party.xml文件，在<metadata:MetadataProvider标签里面增加如下内容(注意id要唯一)

{% highlight xml %}
<MetadataProvider id="SPMD2" xsi:type="ResourceBackedMetadataProvider" xmlns="urn:mace:shibboleth:2.0:metadata" >
    <MetadataResource xsi:type="resource:FilesystemResource" file="/opt/shibboleth-idp/metadata/metadata-sp.xml" />
</MetadataProvider>
{% endhighlight %}

##### (4)重启服务

#### 3.7.3 测试

在浏览器输入https://sp.example.org/secure，如果能显示如下内容，则表示以上配置正确。

<pre>
Not Found
The requested URL /secure was not found on this server.
Apache/2.2.3 (Red Hat) Server at sp.example.org Port 443
</pre>

### 3.8 linux下JDK安装

### 3.9 linux下tomcat安装

### 3.10 在tomcat中增加测试页面

#### 3.10.1 放置

将headers.jsp文件放置到tomcat的webapps文件夹下的ROOT文件夹中(即/home/web/apache-tomcat-6.0.18/webapps/ROOT)

#### 3.10.2 测试

在浏览器输入http://sp.example.org:8080/headers.jsp，如果能显示如下内容，则表示放置成功。

<pre>
HTTP Request Headers Received
accept image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/msword, application/x-ms-application, application/x-ms-xbap, application/vnd.ms-xpsdocument, application/xaml+xml, application/x-silverlight, */*
accept-language zh-cn
accept-encoding gzip, deflate
user-agent Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; CIBA; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)
host sp.example.org:8080
connection Keep-Alive
</pre>

### 3.11 apache反向代理配置

#### 3.11.1 修改/etc/httpd/conf/httpd.conf文件

##### (1)

{% highlight xml %}
#<IfModule mod_proxy.c>
#ProxyRequests On
{% endhighlight %}

修改为

{% highlight xml %}
<IfModule mod_proxy.c>
ProxyRequests Off
{% endhighlight %}

##### (2)

{% highlight xml %}
#<Proxy *>
#    Order deny,allow
#    Deny from all
#    Allow from .example.com
#</Proxy>
{% endhighlight %}

修改为

{% highlight xml %}
<Proxy *>
    Order deny,allow
#    Deny from all
    Allow from all
</Proxy>
{% endhighlight %}

##### (3)在上一步修改内容之后添加如下内容

<pre>
ProxyPass /test/ http://sp.example.com:8080/
ProxyPassReverse /test/ http://sp.example.com:8080/
</pre>

其中/test/表示相关应用部署路径，http://sp.example.com:8080/表示真实的url

#### 3.11.2 重启httpd服务

```Bash
[root@sp bin]# service httpd restart
```

#### 3.11.3 测试

在浏览器输入http://sp.example.org/test/headers.jsp，如果能显示如下内容，则表示配置成功。

<pre>
HTTP Request Headers Received
host sp.example.org:8080
accept */*
accept-language zh-cn
accept-encoding gzip, deflate
user-agent Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; CIBA; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)
max-forwards 10
x-forwarded-for 10.22.22.23
x-forwarded-host sp.example.org
x-forwarded-server sp.example.com
connection Keep-Alive
</pre>

### 3.12 在sp中增加属性

#### 3.12.1 修改etc\shibboleth\attribute-map.xml文件

在<Attributes标签里增加如下内容

{% highlight xml %}
<Attribute name="uid" id="uid">
    <AttributeDecoder xsi:type="StringAttributeDecoder"/>
</Attribute>
{% endhighlight %}

#### 3.12.2 shibd服务重启

### 3.13 安装ds

```Bash
[root@sp 12-ds-install]# ls
shibboleth-discovery-service-1.1.1-bin.tar.gz
[root@sp 12-ds-install]# gunzip shibboleth-discovery-service-1.1.1-bin.tar.gz
[root@sp 12-ds-install]# ls
shibboleth-discovery-service-1.1.1-bin.tar
[root@sp 12-ds-install]# tar -xvf shibboleth-discovery-service-1.1.1-bin.tar
[root@sp 12-ds-install]# ls
shibboleth-discovery-service-1.1.1  shibboleth-discovery-service-1.1.1-bin.tar
[root@sp 12-ds-install]# cd shibboleth-discovery-service-1.1.1
[root@sp shibboleth-discovery-service-1.1.1]# ls
cpappend.bat  doc  endorsed  install.bat  install.sh  lib  LICENSE.txt  src
[root@sp shibboleth-discovery-service-1.1.1]# cp -rf endorsed/ /home/web/apache-tomcat-6.0.18/
[root@sp shibboleth-discovery-service-1.1.1]# ls /home/web/apache-tomcat-6.0.18/
bin  conf  endorsed  lib  LICENSE  logs  NOTICE  RELEASE-NOTES  RUNNING.txt  temp  webapps  work
[root@sp shibboleth-discovery-service-1.1.1]# pwd
/home/software/12-ds-install/shibboleth-discovery-service-1.1.1
[root@sp shibboleth-discovery-service-1.1.1]# ls
cpappend.bat  doc  endorsed  install.bat  install.sh  lib  LICENSE.txt  src
[root@sp shibboleth-discovery-service-1.1.1]# ./install.sh
```

### 3.14 配置ds

#### 3.14.1 修改文件opt\shibboleth-ds\conf\wayfconfig.xml

##### (1)修改<Default标签里面的属性warnOnBadBinding和showUnusableIdPs，均将其值设为true

##### (2)修改<MetadataProvider标签里面属性url的值为：file:///opt/shibboleth-ds/metadata/my-federation.xml

##### (3)在标签</DiscoveryServiceHandler>之前增加如下内容：

{% highlight xml %}
<Federation identifier="FirstSite"/>
{% endhighlight %}

#### 3.14.2 部署文件/opt/shibboleth-ds/war/discovery.war到tomcat

```Bash
[root@sp conf]# cp /opt/shibboleth-ds/war/discovery.war /home/web/apache-tomcat-6.0.18/webapps/
[root@sp conf]# ls /home/web/apache-tomcat-6.0.18/webapps/
discovery  discovery.war  docs  examples  host-manager  manager  ROOT
```

在浏览器输入http://sp.example.org:8080/discovery/wayferror.jsp，如果能显示如下内容，则表示部署成功。

"The DiscoveryService should not be called directly"

#### 3.14.3 将idp和sp的metadata内容放置到my-federation-begin.xml文件中，并重命名为my-federation.xml

#### 3.14.4 将my-federation.xml文件放到/opt/shibboleth-ds/metadata文件夹下

### 3.15 sp configure with ds

#### 3.15.1 修改文件\etc\shibboleth\shibboleth2.xml

##### (1)注释掉如下内容

{% highlight xml %}
<SessionInitiator type="Chaining" Location="/Login"
<SessionInitiator type="Chaining" Location="/WAYF"
{% endhighlight %}

##### (2)

{% highlight xml %}
<SessionInitiator type="Chaining" Location="/DS" id="DS" relayState="cookie">
    <SessionInitiator type="SAML2" acsIndex="1" template="bindingTemplate.html"/>
    <SessionInitiator type="Shib1" acsIndex="5"/>
    <SessionInitiator type="SAMLDS" URL="https://ds.example.org/DS/WAYF"/>
</SessionInitiator>
{% endhighlight %}

修改为

{% highlight xml %}
<SessionInitiator type="Chaining" Location="/DS" id="DS" relayState="cookie">
    <SessionInitiator type="SAML2" acsIndex="1" template="bindingTemplate.html"/>
    <SessionInitiator type="Shib1" acsIndex="5"/>
    <SessionInitiator type="SAMLDS" URL="http://sp.example.org:8080/discovery/WAYF"/>
</SessionInitiator>
{% endhighlight %}

#### 3.15.2 重启shibd服务

#### 3.15.3 测试

在浏览器输入https://sp.example.org/secure，如果能跳转到ds的选择页面"Select an identity provider"，并且选择idp后，能成功到达idp的登录页面，登陆后能返回sp，则表示以上配置成功。

### 3.16 配置shibd到apache的反向代理

修改etc\httpd\conf.d\shib.conf文件，在末尾增加如下代码

{% highlight xml %}
<Location /test>
  AuthType shibboleth
  ShibRequestSetting requireSession 1
  require valid-user
  ShibUseHeaders On
</Location>
{% endhighlight %}

### 3.17 sp常见错误及解决方法

#### 3.17.1 错误提示:Message expired, was issued too long ago

解决方法：修改sp与idp其中一台机器的时间，保持一致。

#### 3.17.2 错误提示:Message did not meet security requirements

解决方法：修改sp与idp其中一台机器的时间，保持一致。

#### 3.17.3 错误提示:No peer endpoint available to which to send SAML response

原因分析：产生这个错误的原因是配置到idp中的sp的metadata文件有问题。我是因为获取metadata文件时，路径输入错误，误把https://sp.example.org/Shibboleth.sso/Metadata输为http://sp.example.org/Shibboleth.sso/Metadata

解决方法：重新用获取正确的sp的metadata文件，并放置到idp的metadata文件夹下,并重新启动idp。

## 4.配置CAS为Shibboleth-idp的验证源

### 4.1 拷贝

拷贝casclient（cas-client-3.1.10）中的两个jar包（cas-client-core-3.1.10.jar、commons-logging-1.1.jar）到/usr/local/apache-tomcat-6.0.18/webapps/idp/WEB-INF/lib目录中。

### 4.2 修改/opt/shibboleth-idp/conf/handler.xml文件

定义如下验证方法作为CAS的验证方法

{% highlight xml %}
<LoginHandler xsi:type="RemoteUser">
    <AuthenticationMethod>
        urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified
    </AuthenticationMethod>
</LoginHandler>
{% endhighlight %}

### 4.3 修改/usr/local/apache-tomcat-6.0.18/webapps/idp/WEB-INF/web.xml文件

增加如下代码

{% highlight xml %}
<!-- For CAS client support -->
<context-param>
  <param-name>serverName</param-name>
  <param-value>idp.example.org</param-value>
</context-param>
<!-- CAS client filters -->
	<filter>
		<filter-name>CAS Authentication Filter</filter-name>
		<filter-class>
			org.jasig.cas.client.authentication.AuthenticationFilter
		</filter-class>
		<init-param>
			<param-name>casServerLoginUrl</param-name>
			<param-value>
				http://yangjie.info:8080/cas/login
			</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>CAS Authentication Filter</filter-name>
		<url-pattern>/Authn/RemoteUser</url-pattern>
	</filter-mapping>
	<filter>
		<filter-name>CAS Validation Filter</filter-name>
		<filter-class>
			org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter
		</filter-class>
		<init-param>
			<param-name>casServerUrlPrefix</param-name>
			<param-value>http://yangjie.info:8080/cas</param-value>
		</init-param>
		<init-param>
			<param-name>redirectAfterValidation</param-name>
			<param-value>true</param-value>
		</init-param>
	</filter>
	<filter-mapping>
		<filter-name>CAS Validation Filter</filter-name>
		<url-pattern>/Authn/RemoteUser</url-pattern>
	</filter-mapping>
	<filter>
		<filter-name>CAS HttpServletRequest Wrapper Filter</filter-name>
		<filter-class>
			org.jasig.cas.client.util.HttpServletRequestWrapperFilter
		</filter-class>
	</filter>
	<filter-mapping>
		<filter-name>CAS HttpServletRequest Wrapper Filter</filter-name>
		<url-pattern>/Authn/RemoteUser</url-pattern>
	</filter-mapping>
{% endhighlight %}

下面这段代码是Define Shib RemoteUser Servlet，web.xml中已经存在。

{% highlight xml %}
<!-- Servlet protected by container user for RemoteUser authentication -->
<servlet>
  <servlet-name>RemoteUserAuthHandler</servlet-name>
  <servlet-class>edu.internet2.middleware.shibboleth.idp.authn.provider.RemoteUserAuthServlet</servlet-class>
</servlet>
<servlet-mapping>
  <servlet-name>RemoteUserAuthHandler</servlet-name>
  <url-pattern>/Authn/RemoteUser</url-pattern>
</servlet-mapping>
{% endhighlight %}

### 4.4 重启tomcat

```Bash
[root@idp ~]# cd /usr/local/apache-tomcat-6.0.18/bin
[root@idp ~]# ./shutdown.sh
[root@idp ~]# ./startup.sh
```

### 4.5 测试

在浏览器输入https://idp.example.org:443/idp/Authn/RemoteUser，如果能转到cas的登录页面，并且输入用户名和密码后能跳转回shibboleth-idp的页面，则表示配置成功。