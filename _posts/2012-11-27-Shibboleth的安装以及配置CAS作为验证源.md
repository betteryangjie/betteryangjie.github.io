---
layout: post
title: Shibboleth的安装以及配置CAS作为验证源
categories: [门户系统]
tags: [Shibboleth,SSO]
---
Shibboleth是一个针对SSO的开源项目，主要应用在高校之间的Web资源共享与访问控制，以及校园间的应用系统的用户身份联合认证。2006年 12月，由北京大学执行的CARSI项目即是在国内高校之间部署Shibboleth，隶属于国家863计划，目前已经有清华大学、北京邮电大学、中国电 子科技大学、华南理工大学等陆续加入，建立了CARSI-Fed（也称为CERNET-Fed），其目标是最终实现中国教育科研网内跨机构用户统一身份认 证、共享资源访问授权和审计系统。更多的详细信息可以参考：http://carsi.edu.cn/。

本文介绍CAS安装、Shibboleth-idp（linux版本）安装、Shibboleth-sp安装以及配置CAS为Shibboleth-idp（linux版本）的验证源。在下面将按照步骤先后顺序进行介绍。
在安装之前，让我们来了解下需要准备些什么。包括安装文件、机器、域名等。
1、需要有三个独立的域名。比如本文中CAS的域名是yj.zju.edu.cn，Shibboleth-idp的域名是idp.example.org, Shibboleth-sp的域名是sp.example.org。
2、本文中，实际需要三台机器。其中CAS安装在windows-xp系统。Shibboleth-idp和Shibboleth-sp分别装在linux系统上。
3、在三台机器的系统都已装好的情况下，需要准备如下安装文件：
CAS：
Apache Tomcat（本文采用apache-tomcat-6.0.18）、
JDK（本文采用jdk-6u10-rc2-bin-b32-windows-i586-p-12_sep_2008.exe）、
cas-server（本文采用cas-server-3.4.2.1-release.zip）。

Shibboleth-idp：
Apache Tomcat（本文采用apache-tomcat-6.0.18）、
JDK（本文采用jdk-6u14-linux-i586-rpm.bin）、
shibboleth-identityprovider（shibboleth-identityprovider-2.1.5-bin.zip）、
cas-client（cas-client-3.1.10-release.tar.gz）。

Shibboleth-sp：

>备注：如果需要使用Shibboleth-sp来测试，则Shibboleth-sp和Shibboleth-idp的两台机器时间要相同。

## 1.CAS安装

### 1.1 系统信息

系统：
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

同时按抓shift和冒号键，再按w和q，保存退出。

```Bash
[root@idp ~]# source /etc/profile
```

上面一行代码将使环境变量生效，这样的设置将对所有用户的shell都生效。

下面来验证一下变量设置是否生效：

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

在浏览器输入网址：http://idp.example.org:8080,如果能显示tomcat页面，即表示tomcat已经正常运行。

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

在浏览器输入地址http://ssoldap.zju.edu.cn:8080/idp/profile/Status，如果显示ok则表示shibboleth-idp安装成功。

### 2.6 HTTPS验证配置（8443端口）

#### 2.6.1 将tomcat6-dta-ssl-1.0.0.jar文件放置到/usr/local/apache-tomcat-6.0.18/lib目录下。

#### 2.6.2 修改/usr/local/apache-tomcat-6.0.18/conf/server.xml文件，在如下内容后添加新的8443端口配置：

<!--
    <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS" />
-->
新的8443端口配置：
<Connector port="8443"
           protocol="org.apache.coyote.http11.Http11Protocol"
           SSLImplementation="edu.internet2.middleware.security.tomcat6.DelegateToApplicationJSSEImplementation"
           scheme="https"
           SSLEnabled="true"
           clientAuth="true"
           keystoreFile="/opt/shibboleth-idp/credentials/idp.jks"
           keystorePass="123456" />

#### 2.6.3 重启tomcat

```Bash
[root@idp ~]# cd /usr/local/apache-tomcat-6.0.18/bin
[root@idp ~]# ./shutdown.sh
[root@idp ~]# ./startup.sh
```

#### 2.6.4 测试

在浏览器输入地址https://ssoldap.zju.edu.cn:8443/idp/profile/Status，如果显示ok则表示8443端口配置成功。

### 2.7 HTTPS验证配置（443端口）

#### 2.7.1 修改apache配置文件

如果系统有独立Apache，443端口已经被占用了。则需要修改/etc/httpd/conf.d/ssl.conf文件，将端口443修改为其他端口（此处修改为1443端口）。
需要修改两处: “Listen 443”修改为“Listen 1443”，“ <VirtualHost _default_:443>”修改为“<VirtualHost _default_:1443>”。

#### 2.7.2 重启Apache

```Bash
[root@idp ~]# service httpd restart
```

#### 2.7.3 制作密钥库

```Bash
[root@idp ~]# $JAVA_HOME/bin/keytool -genkey -alias shibbolethidp -keyalg RSA
```

接着输入相关信息。
注意：名字与姓氏要输入主机名或域名或localhost，不能随意输入。

#### 2.7.4 修改tomcat配置文件

修改/usr/local/apache-tomcat-6.0.18/conf/server.xml文件，在如下内容后添加443端口配置：
<!--
    <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS" />
-->
443端口配置：
<Connector protocol="org.apache.coyote.http11.Http11Protocol"
           port="443" maxThreads="200"
           scheme="https" secure="true" SSLEnabled="true"
           keystoreFile="${user.home}/.keystore" keystorePass="123456"
           clientAuth="false" sslProtocol="TLS"/>

#### 2.7.5 重启tomcat

```Bash
[root@idp ~]# cd /usr/local/apache-tomcat-6.0.18/bin
[root@idp ~]# ./shutdown.sh
[root@idp ~]# ./startup.sh
```

#### 2.7.6 测试

在浏览器输入地址https://ssoldap.zju.edu.cn:443/idp/profile/Status，如果显示ok则表示443端口配置成功。

## 3.Shibboleth-sp安装

### 3.1 系统信息

```Bash
[root@test1 shibboleth]# lsb_release -a
LSB Version:    :core-3.1-ia32:core-3.1-noarch:graphics-3.1-ia32:graphics-3.1-noarch
Distributor ID: RedHatEnterpriseServer
Description:    Red Hat Enterprise Linux Server release 5.2 (Tikanga)
Release:        5.2
Codename:       Tikanga
```

### 3.2 域名设置

### 3.3 linux下JDK安装

```Bash
[root@test1 shibboleth]# java -version
java version "1.4.2"
gij (GNU libgcj) version 4.1.2 20071124 (Red Hat 4.1.2-42)
Copyright (C) 2006 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

## 4.配置CAS为Shibboleth-idp的验证源

### 4.1

拷贝casclient包（cas-client-3.1.10）中的两个jar包（cas-client-core-3.1.10.jar、commons-logging-1.1.jar）到/usr/local/apache-tomcat-6.0.18/webapps/idp/WEB-INF/lib目录中。

### 4.2

修改/opt/shibboleth-idp/conf/handler.xml文件，定义如下验证方法作为CAS的验证方法：
<LoginHandler xsi:type="RemoteUser">
        <AuthenticationMethod>
urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified
</AuthenticationMethod>
</LoginHandler>

### 4.3

修改/usr/local/apache-tomcat-6.0.18/webapps/idp/WEB-INF/web.xml文件，增加如下代码：

```Xml
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
				http://yj.zju.edu.cn:8080/cas/login
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
			<param-value>http://yj.zju.edu.cn:8080/cas</param-value>
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
```

下面这段代码是Define Shib RemoteUser Servlet，web.xml中已经存在。

```Xml
<!-- Servlet protected by container user for RemoteUser authentication -->
<servlet>
  <servlet-name>RemoteUserAuthHandler</servlet-name>
  <servlet-class>edu.internet2.middleware.shibboleth.idp.authn.provider.RemoteUserAuthServlet</servlet-class>
</servlet>
 
<servlet-mapping>
  <servlet-name>RemoteUserAuthHandler</servlet-name>
  <url-pattern>/Authn/RemoteUser</url-pattern>
</servlet-mapping>
```

### 4.4 重启tomcat

```Bash
[root@idp ~]# cd /usr/local/apache-tomcat-6.0.18/bin
[root@idp ~]# ./shutdown.sh
[root@idp ~]# ./startup.sh
```

### 4.5 测试

在浏览器输入地址https://ssoldap.zju.edu.cn:443/idp/Authn/RemoteUser，如果能转到cas的登录页面，并且输入用户名和密码后能跳转回shibboleth-idp的页面，则表示配置成功。