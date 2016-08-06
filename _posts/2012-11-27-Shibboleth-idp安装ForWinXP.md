---
layout: post
title: Shibboleth-idp安装ForWinXP
categories: [门户系统]
tags: [Shibboleth,SSO]
---
Shibboleth是一个针对SSO的开源项目，主要应用在高校之间的Web资源共享与访问控制，以及校园间的应用系统的用户身份联合认证。2006年 12月，由北京大学执行的CARSI项目即是在国内高校之间部署Shibboleth，隶属于国家863计划，目前已经有清华大学、北京邮电大学、中国电 子科技大学、华南理工大学等陆续加入，建立了CARSI-Fed（也称为CERNET-Fed），其目标是最终实现中国教育科研网内跨机构用户统一身份认 证、共享资源访问授权和审计系统。更多的详细信息可以参考：http://carsi.edu.cn/。本文讲解WinXP系统上Shibboleth-idp的安装过程。

## 1.环境准备

### 1.1 安装Java1.5以上

### 1.2 安装tomcat6

### 1.3 安装ANT1.7.1

## 2.步骤

### 2.1 修改resources\WEB-INF\web.xml

将

```
<param- value>file://$IDP_HOME$/conf/internal.xml; file://$IDP_HOME$/conf/service.xml;</param-value>
```

改为

```
<param- value>file:///$IDP_HOME$/conf/internal.xml ; file:///$IDP_HOME$/conf/service.xml ;</param-value>
```

若不修改，第二步启动tomcat时会报错 (IOException parsing XML document from URL)

## 2.2 运行IDP_HOME\ant.bat

## 2.3 将IDP中的endorsed目录复制到tomcat主目录

## 2.4 在环境变量中加入JAVA_OPTS=-Xmx512m -XX:MaxPermSize=256m

## 2.5 将shib-jce-1.0.jar复制到JAVA_HOME/jre/lib/ext

## 2.6 修改JAVA_HOME\jre\lib\security\java.security文件

将
security.provider.#=edu.internet2.middleware.shibboleth.DelegateToApplicationProvider
加入security.provider最后一行(#是顺序的数字)，示例：

security.provider.8=sun.security.smartcardio.SunPCSC
security.provider.9=sun.security.mscapi.SunMSCAPI
security.provider.10=edu.internet2.middleware.shibboleth.DelegateToApplicationProvider
 
## 2.7 修改TOMCAT_HOME\conf\server.xml

将下列定义加入

<pre>
<Connector protocol="org.apache.coyote.http11.Http11Protocol"
           port="8443"
           maxHttpHeaderSize="8192"
           maxSpareThreads="75"
           scheme="https"
           secure="true"
           clientAuth="want"
           SSLEnabled="true"
           sslProtocol="TLS"
           keystoreFile="IDP_HOME/credentials/idp.jks"
           keystorePass="PASSWORD"
           truststoreFile="IDP_HOME/credentials/idp.jks"
           truststorePass="PASSWORD"
           truststoreAlgorithm="DelegateToApplication"/>
</pre>

如果是tomcat5.5则删除protocol="org.apache.coyote.http11.Http11Protocol"，将IDP_HOME改为IDP的目录，PASSWORD是安装IDP时keystore的密码

## 2.8 将idp.war复制到TOMCAT_HOME\webapps下

## 3.测试

在浏览器中输入http://localhost:8080/idp/profile/Status，看到OK表示成功

## 4.参考文档

[IdP Step-by-Step](https://spaces.internet2.edu/display/ShibInstallFest/IdP+Step-by-Step)
[Configuring User Authentication](https://spaces.internet2.edu/display/SHIB2/IdPUserAuthn)
[Configuring the IdP for Username/Password Authentication](https://spaces.internet2.edu/display/SHIB2/IdPAuthUserPass)