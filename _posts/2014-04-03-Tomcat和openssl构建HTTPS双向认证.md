---
layout: post
title: Tomcat和openssl构建HTTPS双向认证
categories: [网络安全]
tags: [HTTPS]
---
本文的目标是在Tomcat中用openssl构建HTTPS双向认证环境。背景：1.在Windows服务器B已经安装好JDK，路径D:\Java\jdk1.6.0_22；2.在Windows服务器B已经安装好Tomcat，路径C:\apache-tomcat-6.0.18。

## 1.利用开源openssl软件，在Linux服务器A创建服务器证书、客户端证书以及CA

### 1.1 按照openssl.cnf文件中配置在当前目录下建立如下文件夹和文件

```Bash
root
  --testca
    --demoCA
      --newcerts(文件夹)
      --index.txt(文件)
      --serial(文件)
```

```Bash
[root@yangjie ~]# pwd
/root
[root@yangjie ~]# mkdir testca
[root@yangjie ~]# cd testca
[root@yangjie testca]# mkdir demoCA
[root@yangjie testca]# cd demoCA
[root@yangjie demoCA]# mkdir newcerts 
[root@yangjie demoCA]# touch index.txt
[root@yangjie demoCA]# echo '01' > serial
[root@yangjie demoCA]# pwd
/root/testca/demoCA
[root@yangjie demoCA]# ls
index.txt  newcerts  serial
[root@yangjie demoCA]# cd ..
[root@yangjie testca]# pwd
/root/testca
```

### 1.2 拷贝openssl.cnf文件到当前目录

```Bash
[root@yangjie ~]# find / -name openssl.cnf
/etc/pki/tls/openssl.cnf
[root@yangjie ~]# cp /etc/pki/tls/openssl.cnf /root/testca
[root@yangjie testca]# ls
demoCA  openssl.cnf
[root@yangjie testca]# more openssl.cnf
#
# OpenSSL example configuration file.
# This is mostly being used for generation of certificate requests.
#
# This definition stops the following lines choking if HOME isn't
# defined.
HOME                    = .
RANDFILE                = $ENV::HOME/.rnd
# Extra OBJECT IDENTIFIER info:
#oid_file               = $ENV::HOME/.oid
oid_section             = new_oids
# To use this configuration file with the "-extfile" option of the
# "openssl x509" utility, name here the section containing the
# X.509v3 extensions to use:
# extensions            =
# (Alternatively, use a configuration file that has only
# X.509v3 extensions in its main [= default] section.)
[ new_oids ]
# We can add new OIDs in here for use by 'ca' and 'req'.
# Add a simple OID like this:
# testoid1=1.2.3.4
# Or use config file substitution like this:
# testoid2=${testoid1}.5.6
####################################################################
[ ca ]
default_ca      = CA_default            # The default ca section
####################################################################
[ CA_default ]
dir             = ../../CA              # Where everything is kept
certs           = $dir/certs            # Where the issued certs are kept
crl_dir         = $dir/crl              # Where the issued crl are kept
database        = $dir/index.txt        # database index file.
#unique_subject = no                    # Set to 'no' to allow creation of
                                        # several ctificates with same subject.
new_certs_dir   = $dir/newcerts         # default place for new certs.
certificate     = $dir/cacert.pem       # The CA certificate
serial          = $dir/serial           # The current serial number
crlnumber       = $dir/crlnumber        # the current crl number
--More--(15%)
[1]+  Stopped                 more openssl.cnf
```

### 1.3 修改openssl.cnf文件

```Bash
[root@yangjie testca]# vi openssl.cnf
#
# OpenSSL example configuration file.
# This is mostly being used for generation of certificate requests.
#
# This definition stops the following lines choking if HOME isn't
# defined.
HOME                    = .
RANDFILE                = $ENV::HOME/.rnd
# Extra OBJECT IDENTIFIER info:
#oid_file               = $ENV::HOME/.oid
oid_section             = new_oids
# To use this configuration file with the "-extfile" option of the
# "openssl x509" utility, name here the section containing the
# X.509v3 extensions to use:
# extensions            =
# (Alternatively, use a configuration file that has only
# X.509v3 extensions in its main [= default] section.)
[ new_oids ]
# We can add new OIDs in here for use by 'ca' and 'req'.
# Add a simple OID like this:
# testoid1=1.2.3.4
# Or use config file substitution like this:
# testoid2=${testoid1}.5.6
####################################################################
[ ca ]
default_ca      = CA_default            # The default ca section
####################################################################
[ CA_default ]
dir             = /root/testca/demoCA             # Where everything is kept
certs           = $dir/certs            # Where the issued certs are kept
crl_dir         = $dir/crl              # Where the issued crl are kept
database        = $dir/index.txt        # database index file.
#unique_subject = no                    # Set to 'no' to allow creation of
                                        # several ctificates with same subject.
new_certs_dir   = $dir/newcerts         # default place for new certs.
certificate     = $dir/cacert.pem       # The CA certificate
serial          = $dir/serial           # The current serial number
crlnumber       = $dir/crlnumber        # the current crl number
"openssl.cnf" 317L, 9593C written
```

### 1.4 生成不带口令的服务器端私钥server.key

```Bash
[root@yangjie testca]# openssl genrsa -out server.key 1024
Generating RSA private key, 1024 bit long modulus
...................++++++
.......................................................................................................++++++
e is 65537 (0x10001)
```

### 1.5 生成服务器端证书请求server.csr

```Bash
[root@yangjie testca]# openssl req -new -key server.key -out server.csr -config openssl.cnf
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [GB]:CN
State or Province Name (full name) [Berkshire]:ZJ
Locality Name (eg, city) [Newbury]:HZ
Organization Name (eg, company) [My Company Ltd]:ZF
Organizational Unit Name (eg, section) []:XX
Common Name (eg, your name or your server's hostname) []:servername
Email Address []:betteryangjie@qq.com
Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:222222
An optional company name []:zf
```

### 1.6 生成不带口令的客户端私钥privatekey.key

```Bash
[root@yangjie testca]# openssl genrsa -des3 -out privatekey.key 1024
Generating RSA private key, 1024 bit long modulus
..............................++++++
..++++++
e is 65537 (0x10001)
Enter pass phrase for privatekey.key:
Verifying - Enter pass phrase for privatekey.key:
```

备注：上面需要设置privatekey.key的保护密码，比如222222

### 1.7 生成客户端证书请求privatekey.csr

```Bash
[root@yangjie testca]# openssl req -new -key privatekey.key -out privatekey.csr -config openssl.cnf
Enter pass phrase for privatekey.key:222222
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [GB]:CN
State or Province Name (full name) [Berkshire]:ZJ
Locality Name (eg, city) [Newbury]:HZ
Organization Name (eg, company) [My Company Ltd]:ZF
Organizational Unit Name (eg, section) []:XX
Common Name (eg, your name or your server's hostname) []:servername
Email Address []:betteryangjie@qq.com
Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:222222
An optional company name []:zf
```

备注：上面需要输入privatekey.key的保护密码222222

### 1.8 生成CA，key口令222222，有效期1095天

```Bash
[root@yangjie testca]# openssl req -new -x509 -keyout ca.key -out ca.crt -config openssl.cnf -days 1095
Generating a 1024 bit RSA private key
................................................++++++
...++++++
writing new private key to 'ca.key'
Enter PEM pass phrase:222222
Verifying - Enter PEM pass phrase:222222
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [GB]:CN
State or Province Name (full name) [Berkshire]:ZJ
Locality Name (eg, city) [Newbury]:HZ
Organization Name (eg, company) [My Company Ltd]:ZF
Organizational Unit Name (eg, section) []:XX
Common Name (eg, your name or your server's hostname) []:servername
Email Address []:betteryangjie@qq.com
```

备注：上面需要设置ca.key的保护密码，比如222222

```Bash
[root@yangjie testca]# ls
ca.crt  ca.key  demoCA  openssl.cnf  privatekey.csr  privatekey.key  server.csr  server.key
```

### 1.9 通过CA签发服务器端证书server.crt

```Bash
[root@yangjie testca]# openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key -config openssl.cnf
Using configuration from openssl.cnf
Enter pass phrase for ca.key:222222
Check that the request matches the signature
Signature ok
Certificate Details:
        Serial Number: 1 (0x1)
        Validity
            Not Before: Apr  3 08:22:09 2014 GMT
            Not After : Apr  3 08:22:09 2015 GMT
        Subject:
            countryName               = CN
            stateOrProvinceName       = ZJ
            organizationName          = ZF
            organizationalUnitName    = XX
            commonName                = servername
            emailAddress              = betteryangjie@qq.com
        X509v3 extensions:
            X509v3 Basic Constraints:
                CA:FALSE
            Netscape Comment:
                OpenSSL Generated Certificate
            X509v3 Subject Key Identifier:
                AE:0F:E8:E6:30:6C:86:42:63:E9:7F:00:28:5B:97:F9:C0:F2:31:05
            X509v3 Authority Key Identifier:
                keyid:34:B8:DF:19:19:82:24:04:B0:6A:DB:0B:14:F9:84:53:FD:E6:AC:00
Certificate is to be certified until Apr  3 08:22:09 2015 GMT (365 days)
Sign the certificate? [y/n]:y
1 out of 1 certificate requests certified, commit? [y/n]y
Write out database with 1 new entries
Data Base Updated
```

备注：上面需要输入ca.key的保护密码222222

### 1.10 通过CA签发客户端证书privatekey.crt

```Bash
[root@yangjie testca]# openssl ca -in privatekey.csr -out privatekey.crt -cert ca.crt -keyfile ca.key -config openssl.cnf
Using configuration from openssl.cnf
Enter pass phrase for ca.key:222222
Check that the request matches the signature
Signature ok
Certificate Details:
        Serial Number: 2 (0x2)
        Validity
            Not Before: Apr  3 08:22:27 2014 GMT
            Not After : Apr  3 08:22:27 2015 GMT
        Subject:
            countryName               = CN
            stateOrProvinceName       = ZJ
            organizationName          = ZF
            organizationalUnitName    = XX
            commonName                = servername
            emailAddress              = betteryangjie@qq.com
        X509v3 extensions:
            X509v3 Basic Constraints:
                CA:FALSE
            Netscape Comment:
                OpenSSL Generated Certificate
            X509v3 Subject Key Identifier:
                6A:02:53:CD:25:1E:BA:80:F2:AE:DF:28:CB:EF:D9:2D:54:E8:82:4D
            X509v3 Authority Key Identifier:
                keyid:34:B8:DF:19:19:82:24:04:B0:6A:DB:0B:14:F9:84:53:FD:E6:AC:00
Certificate is to be certified until Apr  3 08:22:27 2015 GMT (365 days)
Sign the certificate? [y/n]:y
1 out of 1 certificate requests certified, commit? [y/n]y
Write out database with 1 new entries
Data Base Updated
```

备注：上面需要输入ca.key的保护密码222222

### 1.11 合并证书文件（crt）和私钥文件（key）生成pem格式证书

```Bash
[root@yangjie testca]# cat privatekey.crt privatekey.key > privatekey.pem
[root@yangjie testca]# cat server.crt server.key > server.pem
```

### 1.12 生成pkcs12格式服务器证书tomcat.p12（该证书包含根证书、服务器端的证书和密钥文件）

```Bash
[root@yangjie testca]# openssl pkcs12 -export -in server.crt -inkey server.key  -out tomcat.p12 -name tomcat -CAfile ca.crt  -caname root -chain
Enter Export Password:
Verifying - Enter Export Password:
```

备注：上面需要设置tomcat.p12的保护密码，比如222222

### 1.13 生成pkcs12格式服务器证书client1.p12（该证书包含根证书、客户端的证书和密钥文件）

```Bash
[root@yangjie testca]# openssl pkcs12 -export -in privatekey.crt -inkey privatekey.key -out client1.p12 -name client1 -chain -CAfile ca.crt
Enter pass phrase for privatekey.key:
Enter Export Password:
Verifying - Enter Export Password:
```

备注：上面需要设置client1.p12的保护密码，比如222222

```Bash
[root@yangjie testca]# ls
ca.crt  ca.key  client1.p12  demoCA  openssl.cnf  privatekey.crt  privatekey.csr  privatekey.key  server.crt  server.csr  server.key  tomcat.p12
```

## 2.拷贝文件ca.crt、server.crt、tomcat.p12、client1.p12到C:\apache-tomcat-6.0.18\conf目录下

## 3.创建服务器信任的CA证书库，并把ca.crt证书导入该信任证书库

### 3.1 进入C:\apache-tomcat-6.0.18\conf目录

```Dos
C:\Users\yj>cd C:\apache-tomcat-6.0.18\conf
```

### 3.2 创建服务器信任的CA证书库，并把ca.crt证书导入该信任证书库

```Dos
C:\apache-tomcat-6.0.18\conf>D:\Java\jdk1.6.0_22\bin\keytool -keystore truststore.jks -keypass 222222 -storepass 222222 -alias ca -import -trustcacerts -file ca.crt
所有者:EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, L=HZ, ST=ZJ, C=CN
签发人:EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, L=HZ, ST=ZJ, C=CN
序列号:e3050811a431e590
有效期: Thu Apr 03 15:42:10 CST 2014 至Sun Apr 02 15:42:10 CST 2017
证书指纹:
         MD5:C3:88:A2:73:8A:C3:D5:DC:EE:4F:B9:88:77:6A:73:86
         SHA1:C6:C1:4F:C2:9E:80:A8:57:C1:0F:A4:E6:C0:8A:B6:86:5A:85:8B:73
         签名算法名称:SHA1withRSA
         版本: 3
扩展:
#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 34 B8 DF 19 19 82 24 04   B0 6A DB 0B 14 F9 84 53  4.....$..j.....S
0010: FD E6 AC 00                                        ....
]
]
#2: ObjectId: 2.5.29.19 Criticality=false
BasicConstraints:[
  CA:true
  PathLen:2147483647
]
#3: ObjectId: 2.5.29.35 Criticality=false
AuthorityKeyIdentifier [
KeyIdentifier [
0000: 34 B8 DF 19 19 82 24 04   B0 6A DB 0B 14 F9 84 53  4.....$..j.....S
0010: FD E6 AC 00                                        ....
]
[EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, L=HZ, ST=ZJ, C=CN]
SerialNumber: [    e3050811 a431e590]
]
信任这个认证？ [否]：  Y
认证已添加至keystore中
```

### 3.3 查看信任证书库内容

```Dos
C:\apache-tomcat-6.0.18\conf>D:\Java\jdk1.6.0_22\bin\keytool -keystore truststore.jks -keypass 222222 -storepass 222222 -list -v
Keystore 类型： JKS
Keystore 提供者： SUN
您的 keystore 包含 1 输入
别名名称： ca
创建日期： 2014-4-3
输入类型： trustedCertEntry
所有者:EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, L=HZ, ST=ZJ, C=CN
签发人:EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, L=HZ, ST=ZJ, C=CN
序列号:e3050811a431e590
有效期: Thu Apr 03 15:42:10 CST 2014 至Sun Apr 02 15:42:10 CST 2017
证书指纹:
         MD5:C3:88:A2:73:8A:C3:D5:DC:EE:4F:B9:88:77:6A:73:86
         SHA1:C6:C1:4F:C2:9E:80:A8:57:C1:0F:A4:E6:C0:8A:B6:86:5A:85:8B:73
         签名算法名称:SHA1withRSA
         版本: 3
扩展:
#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 34 B8 DF 19 19 82 24 04   B0 6A DB 0B 14 F9 84 53  4.....$..j.....S
0010: FD E6 AC 00                                        ....
]
]
#2: ObjectId: 2.5.29.19 Criticality=false
BasicConstraints:[
  CA:true
  PathLen:2147483647
]
#3: ObjectId: 2.5.29.35 Criticality=false
AuthorityKeyIdentifier [
KeyIdentifier [
0000: 34 B8 DF 19 19 82 24 04   B0 6A DB 0B 14 F9 84 53  4.....$..j.....S
0010: FD E6 AC 00                                        ....
]
[EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, L=HZ, ST=ZJ, C=CN]
SerialNumber: [    e3050811 a431e590]
]
*******************************************
*******************************************
```

## 4.修改C:\apache-tomcat-6.0.18\conf\server.xml文件

{% highlight xml %}
<Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="true" sslProtocol="TLS"
               keystoreFile="conf/tomcat.p12" keystorePass="222222" keystoreType="PKCS12"
               truststoreFile="conf/truststore.jks" truststorePass="222222" truststoreType="JKS" />
{% endhighlight %}

## 5.安装证书

进入C:\apache-tomcat-6.0.18\conf目录，双击文件client1.p12完成证书安装。

## 6.启动tomcat

进入C:\apache-tomcat-6.0.18\bin目录，双击文件startup.bat。

## 7.测试

### 7.1 打开浏览器输入https://servername:8443/，会弹出证书选择框，选择client1即可。

### 7.2 没有弹出“此网站的安全证书有问题“的警告信息，且有黄色的锁图标，表明配置OK。

## 8.查看客户端证书信息

### 8.1 新建文件C:\apache-tomcat-6.0.18\webapps\ROOT\seecert.jsp，文件内容如下

```Java
<%@ page  import="java.security.cert.X509Certificate" contentType="text/html; charset=GB2312" %>
<%
    java.security.cert.X509Certificate[] certs=null;
    try{
            certs=(X509Certificate[])request.getAttribute("javax.servlet.request.X509Certificate");
                if (certs == null) {
                        out.println("No certificates");
                } else if (certs.length == 0) {
                        out.println("Certificates length is 0");
                } else {
                        java.security.cert.X509Certificate cert = certs[0];
                        String dn = cert.getSubjectX500Principal().toString();
                        out.println("SubjectDN: " + dn);
                        out.println();
                        out.println("------------------certification detail--------------------");
                        out.println(cert);
                        out.println("----------------------------------------------------------");
                }
    } catch(Exception e){
                out.println("Exception=" + e.getMessage());
    }
%>
```

### 8.2 访问https://servername:8443/seecert.jsp，页面信息如下所示

```Bash
SubjectDN: EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, ST=ZJ, C=CN
------------------certification detail--------------------
[
[
  Version: V3
  Subject: EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, ST=ZJ, C=CN
  Signature Algorithm: SHA1withRSA, OID = 1.2.840.113549.1.1.5
  Key:  Sun RSA public key, 1024 bits
  modulus: 141449114454407038988786918853555701524900549122008150584947995419374485239561446908807989020106067409798055076644958924902632418014284643709924189550344080373755112316439867755824656686857330046832163496387135099687328331273050401321270638541241576419970877346433456905236838312941637366688847974396944760667
  public exponent: 65537
  Validity: [From: Thu Apr 03 20:04:35 CST 2014,
               To: Fri Apr 03 20:04:35 CST 2015]
  Issuer: EMAILADDRESS=betteryangjie@qq.com, CN=servername, OU=XX, O=ZF, L=HZ, ST=ZJ, C=CN
  SerialNumber: [    02]
Certificate Extensions: 4
[1]: ObjectId: 2.16.840.1.113730.1.13 Criticality=false
Extension unknown: DER encoded OCTET string =
0000: 04 1F 16 1D 4F 70 65 6E   53 53 4C 20 47 65 6E 65  ....OpenSSL Gene
0010: 72 61 74 65 64 20 43 65   72 74 69 66 69 63 61 74  rated Certificat
0020: 65                                                 e
[2]: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 5E E5 AF A5 FB 83 AC 8F   B0 69 97 B0 33 90 5D 07  ^........i..3.].
0010: 48 67 37 BA                                        Hg7.
]
]
[3]: ObjectId: 2.5.29.35 Criticality=false
AuthorityKeyIdentifier [
KeyIdentifier [
0000: 6F AE 82 D8 D7 E0 72 9E   17 80 3C 9B 7D 1A 22 91  o.....r...<...".
0010: 89 90 0F D7                                        ....
]
]
[4]: ObjectId: 2.5.29.19 Criticality=false
BasicConstraints:[
  CA:false
  PathLen: undefined
]
]
  Algorithm: [SHA1withRSA]
  Signature:
0000: 9A 9A 98 ED 17 A4 6C 59   8A 9C F6 5B 87 E9 BD 9E  ......lY...[....
0010: 5F 87 1C AE 50 CF 3C FE   92 3D 40 BB 03 54 CE 14  _...P.<..=@..T..
0020: 68 DA 30 49 68 A9 72 DD   9B 2A 62 78 0D 98 68 36  h.0Ih.r..*bx..h6
0030: A2 00 8D 5A B2 1C E0 CB   DA 22 EF 19 50 E0 96 1D  ...Z....."..P...
0040: B4 BA E2 1E 40 C9 13 5E   7B 70 46 0E 17 FC 16 EF  ....@..^.pF.....
0050: 25 B3 1C 9D 7D B1 13 99   18 2B CC C1 0E AB 47 18  %........+....G.
0060: E9 D7 50 EE FC 0D 52 B3   EB 9C 2F 53 F0 14 C2 BA  ..P...R.../S....
0070: 47 E2 51 6B E0 11 33 38   05 45 6B BF 81 97 82 1A  G.Qk..38.Ek.....
]
----------------------------------------------------------
```