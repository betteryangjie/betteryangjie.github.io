---
layout: post
title: SunDirectoryServerEnterpriseEdition6.3如何自定义属性
categories: [LDAP]
tags: [LDAP]
---
需要新建两个文件eperson-attributeTypes.ldif和eperson-objectclasses.ldif，其中attributeTypes和objectClasses的内容是示例，需要自己按照实际情况进行修改。其中attributeTypes只涉及到1.3.6.1.4.1.1466.115.121.1.15-Directory String syntax 这种类型，其它类型暂未考虑。

```Bash
[root@yangjie schema]# cd /ldap/instance/389_636/config/schema
[root@yangjie schema]# pwd
/ldap/instance/389_636/config/schema
[root@yangjie schema]# vi eperson-attributeTypes.ldif
dn: cn=schema
changetype: modify
add: attributeTypes
attributeTypes: (yhm-oid NAME ('yhm' ) DESC 'yhm' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 SINGLE-VALUE)
attributeTypes: (gender-oid NAME ('gender' ) DESC 'gender' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 SINGLE-VALUE) 
attributeTypes: (cardnumber-oid NAME ('cardnumber') DESC 'cardnumber' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 SINGLE-VALUE)
[root@yangjie schema]# vi  eperson-objectclasses.ldif  
dn: cn=schema
changetype: modify
add: objectclasses
objectClasses:(eperson-oid NAME 'eperson' DESC 'eperson' SUP top MUST (yhm) MAY (gender $ cardnumber) X-ORIGIN 'user defined')
[root@yangjie schema]# ls -al eperson-*.ldif
-rw-r--r--  1 root root 386  8月  28 13:37 eperson-attributeTypes.ldif
-rw-r--r--  1 root root 179  8月  28 13:38 eperson-objectclasses.ldif
[root@yangjie schema]# more 99user.ldif
#
# Copyright 2003 Sun Microsystems, Inc. All Rights Reserved
# Patents Pending.Use is subject to license terms.
# 
#
# PROPRIETARY/CONFIDENTIAL. Use of this product is subject to
# license terms. Copyright (c) 2001 Sun Microsystems, Inc.
# Some preexisting portions Copyright (c) 2001 Netscape Communications Corp.
# All rights reserved.
# 
#
# User-defined schema
#
dn: cn=schema
[root@yangjie schema]# cp 99user.ldif 99user.ldif.bak1
[root@yangjie schema]# /ldap/install/dsrk6/bin/ldapmodify -D cn=admin,cn=Administrators,cn=config -w - -f /ldap/instance/389_636/config/schema/eperson-attributeTypes.ldif
Enter bind password: 
modifying entry cn=schema
[root@yangjie schema]# /ldap/install/dsrk6/bin/ldapsearch -T -b cn=schema "(objectclass=*)" attributeTypes | grep "user defined"
attributeTypes: ( yhm-oid NAME 'yhm' DESC 'yhm' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
attributeTypes: ( gender-oid NAME 'gender' DESC 'gender' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
attributeTypes: ( cardnumber-oid NAME 'cardnumber' DESC 'cardnumber' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
[root@yangjie schema]# more 99user.ldif
dn: cn=schema
objectClass: top
objectClass: ldapSubentry
objectClass: subschema
cn: schema
aci: (target="ldap:///cn=schema")(targetattr !="aci")(version 3.0;acl "anonymous, no acis"; allow (read, search, compare) userdn = "ldap:///anyone";)
modifiersName: cn=admin,cn=administrators,cn=config
modifyTimestamp: 20120828054430Z
attributeTypes: ( yhm-oid NAME 'yhm' DESC 'yhm' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
attributeTypes: ( gender-oid NAME 'gender' DESC 'gender' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
attributeTypes: ( cardnumber-oid NAME 'cardnumber' DESC 'cardnumber' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
nsSchemaCSN: 503c5abe000000000000
[root@yangjie schema]# /ldap/install/dsrk6/bin/ldapmodify -D cn=admin,cn=Administrators,cn=config -w - -f /ldap/instance/389_636/config/schema/eperson-objectclasses.ldif 
Enter bind password: 
modifying entry cn=schema
[root@yangjie schema]# more 99user.ldif
dn: cn=schema
objectClass: top
objectClass: ldapSubentry
objectClass: subschema
cn: schema
aci: (target="ldap:///cn=schema")(targetattr !="aci")(version 3.0;acl "anonymous, no acis"; allow (read, search, compare) userdn = "ldap:///anyone";)
modifiersName: cn=admin,cn=administrators,cn=config
modifyTimestamp: 20120828054536Z
attributeTypes: ( yhm-oid NAME 'yhm' DESC 'yhm' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
attributeTypes: ( gender-oid NAME 'gender' DESC 'gender' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
attributeTypes: ( cardnumber-oid NAME 'cardnumber' DESC 'cardnumber' SYNTAX 1.3.6.1.4.1.1466.115.121.1.15 X-ORIGIN 'user defined' )
objectClasses: ( eperson-oid NAME 'eperson' DESC 'eperson' SUP top STRUCTURAL MUST yhm MAY ( gender $ cardnumber ) X-ORIGIN 'user defined' )
nsSchemaCSN: 503c5b00000000000000
```

以上配置完成之后，便可以新建用户了。

Java增加用户的代码如下

```Java
import java.util.Hashtable;
import javax.naming.Context;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.BasicAttributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
public class LDAP {
     public static void main(String[] args) {
          Hashtable coninfo = new Hashtable();
          coninfo.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
          coninfo.put(Context.REFERRAL, "follow");
          coninfo.put(Context.PROVIDER_URL, "ldap://yangjie.info/dc=example,dc=org");
          coninfo.put(Context.SECURITY_PROTOCOL, "plain");
          coninfo.put("java.naming.ldap.version", "3");
          coninfo.put(Context.SECURITY_AUTHENTICATION, "simple");
          coninfo.put(Context.SECURITY_PRINCIPAL, "cn=directory manager");
          coninfo.put(Context.SECURITY_CREDENTIALS, "admin123");
          coninfo.put("com.sun.jndi.ldap.connect.pool", "true");
          DirContext ctx = null;
          try {
               ctx = new InitialDirContext(coninfo);
               BasicAttributes attrs = new BasicAttributes();
               attrs.put(new BasicAttribute("yhm", "001"));
               attrs.put(new BasicAttribute("gender", "f"));
               attrs.put(new BasicAttribute("cardnumber ", "888888"));
               Attribute atr = new BasicAttribute("objectClass", "top");
               atr.add("ePerson");
               attrs.put(atr);
               ctx.createSubcontext("yhm=001", attrs);
          } catch (NamingException e) {
               e.printStackTrace();
          }
     }
}
```