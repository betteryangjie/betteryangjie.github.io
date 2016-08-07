---
layout: post
title: Android中HTTPS的配置
categories: [原生App]
tags: [Android,HTTPS]
---
本文讲解Android开发中如何配置HTTPS。-------------------------------------------------------------------

## 1.根据文章[Tomcat和openssl构建HTTPS双向认证](http://yangjie.info/20140403/Tomcat%E5%92%8Copenssl%E6%9E%84%E5%BB%BAHTTPS%E5%8F%8C%E5%90%91%E8%AE%A4%E8%AF%81)做好配置

## 2.在Android项目中做配置

### 2.1 修改文件AndroidManifest.xml

增加如下配置

{% highlight xml %}
<uses-permission android:name="android.permission.INTERNET" />
{% endhighlight %}

### 2.2 在res目录下新建目录raw

### 2.3 拷贝客户端证书文件client1.p12到目录res/raw下

### 2.4 修改文件res/layout/activity_main.xml

{% highlight xml %}
<?xml version= "1.0" encoding ="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width= "fill_parent"
    android:layout_height= "fill_parent"
    android:orientation= "vertical" >
    <Button
        android:id="@+id/testButton"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="HTTPS Test" />
</LinearLayout>
{% endhighlight %}

### 2.5 修改文件MainActivity.java

```Java
package com.example.https;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyStore;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;
public class MainActivity extends Activity {
     private Button testButton;
     public String httpsUrl = "https://servername:8443"; //OK
     //public String httpsUrl = "https://10.22.23.75:8443"; //Wrong
     @Override
     protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);
          setContentView(R.layout.activity_main);
          testButton = (Button) findViewById(R.id.testButton);
          testButton.setOnClickListener(new OnClickListener() {
               @Override
               public void onClick(View v) {
                    new Thread(access).start();
               }
          });
     }
     public Runnable access = new Runnable() {
          public void run() {
               try {
                    long a = System.currentTimeMillis();
                    String key = "222222";
                    char[] keys = key.toCharArray();
                    KeyStore keyStore = KeyStore.getInstance("PKCS12");
                    InputStream ins = getBaseContext().getResources().openRawResource(R.raw.client1);
                    long b = System.currentTimeMillis();
                    keyStore.load(ins, keys);
                    long c = System.currentTimeMillis();
                    KeyManagerFactory kmf = KeyManagerFactory.getInstance("X509");
                    long d = System.currentTimeMillis();
                    kmf.init(keyStore, keys);
                    KeyManager[] keyManagers = kmf.getKeyManagers();
                    SSLContext sslContext = SSLContext.getInstance("TLS");
                    sslContext.init(keyManagers, null, null);
                    String content = null;
                    HttpURLConnection urlConnection = null;              
                    try {
                        URL requestedUrl = new URL(httpsUrl);
                        urlConnection = (HttpURLConnection) requestedUrl.openConnection();
                        if(urlConnection instanceof HttpsURLConnection) {
                            ((HttpsURLConnection)urlConnection)
                                 .setSSLSocketFactory(sslContext.getSocketFactory());
                        }
                        urlConnection.setRequestMethod("GET");
                        urlConnection.setConnectTimeout(1500);
                        urlConnection.setReadTimeout(1500);
                        InputStream is = urlConnection.getInputStream();
                        StringBuffer sb = new StringBuffer();
                        byte[] bytes = new byte[1024];
                        for (int len = 0; (len = is.read(bytes)) != -1;) {
                            sb.append(new String(bytes, 0, len, "utf-8"));
                        }
                        content = sb.toString();
                    } catch(Exception ex) {
                        content = ex.toString();
                    } finally {
                        if(urlConnection != null) {
                            urlConnection.disconnect();
                        }
                        System.out.println(content);
                    }
                    long e = System.currentTimeMillis();
                    long b_a = b - a;//412
                    long c_b = c - b;//9836
                    long d_c = d - c;//1
                    long e_d = e - d;//576
                    long e_a = e - a;//10825
                    System.out.println("");
               } catch (Exception e) {
                    e.printStackTrace();
               }
          }
     };
}
```

### 2.6 开启Debug模式，打断点进行测试，如果content有期望内容返回，则OK

## 3.修改证书类型，提高证书验证速度

### 3.1 新建JavaProject

### 3.2 新建包certificate

### 3.3 拷贝客户端证书文件client1.p12到certificate包下

### 3.4 新建类CovertPFXToBKS.java

```Java
package certificate;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.Key;
import java.security.KeyStore;
import java.security.Security;
import java.util.Enumeration;
public class CovertPFXToBKS {
    public static final String     PKCS12                         = "PKCS12";
    public static final String     BKS                              = "BKS";
    // PKCS12 keystore propert
    public static final String     INPUT_KEYSTORE_FILE          = "src/certificate/client1.p12";     // "cert/dev_coo1.p12";
    public static final String     pfxPasswd                    = "222222";                              // vc端的密码
    // JKS output file
    public static final String     OUTPUT_KEYSTORE_FILE     = "src/certificate/client1.bks";
    public static final String     jksPasswd                    = "222222";                              // vc端的密码
    public static void main(String[] args) throws Throwable {
        FileInputStream fis = null;
        try {
            KeyStore inputKeyStore = KeyStore.getInstance("PKCS12");
            fis = new FileInputStream(INPUT_KEYSTORE_FILE);
            char[] srcPwd = jksPasswd == null ? null : jksPasswd.toCharArray();
            char[] destPwd = pfxPasswd == null ? null : pfxPasswd.toCharArray();
            inputKeyStore.load(fis, srcPwd);
            KeyStore outputKeyStore = KeyStore.getInstance("BKS", new org.bouncycastle.jce.provider.BouncyCastleProvider());
            Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
            Enumeration<String> enums = inputKeyStore.aliases();
            while (enums.hasMoreElements()) {
                String keyAlias = (String) enums.nextElement();
                System.out.println("alias=[" + keyAlias + "]");
                outputKeyStore.load(null, destPwd);
                if (inputKeyStore.isKeyEntry(keyAlias)) {
                    Key key = inputKeyStore.getKey(keyAlias, srcPwd);
                    java.security.cert.Certificate[] certChain = inputKeyStore.getCertificateChain(keyAlias);
                    outputKeyStore.setKeyEntry(keyAlias, key, destPwd, certChain);
                }
                // String fName = OUTPUT_KEYSTORE_FILE + "_" + keyAlias + ".bks";
                String fName = OUTPUT_KEYSTORE_FILE;
                FileOutputStream out = new FileOutputStream(fName);
                outputKeyStore.store(out, destPwd);
                out.close();
                outputKeyStore.deleteEntry(keyAlias);
            }
        } finally {
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 3.5 运行CovertPFXToBKS.java文件，即会在包certificate下生成BKS格式的证书文件client1.bks

### 3.6 拷贝client1.bks文件到Android项目的目录res/raw下，然后删除原来的文件client1.p12

### 3.7 修改MainActivity.java文件

```Java
package com.example.https;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyStore;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;
public class MainActivity extends Activity {
    private Button testButton;
    public String httpsUrl = "https://servername:8443"; //OK
    //public String httpsUrl = "https://10.22.23.75:8443"; //Wrong
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        testButton = (Button) findViewById(R.id.testButton);
        testButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                new Thread(access).start();
            }
        });
    }

    public Runnable access = new Runnable() {
        public void run() {
            try {
                long a = System.currentTimeMillis();
                String key = "222222";
                char[] keys = key.toCharArray();
                KeyStore keyStore = KeyStore.getInstance("BKS");
                InputStream ins = getBaseContext().getResources().openRawResource(R.raw.client1);
                long b = System.currentTimeMillis();
                keyStore.load(ins, keys);
                long c = System.currentTimeMillis();
                KeyManagerFactory kmf = KeyManagerFactory.getInstance("X509");
                long d = System.currentTimeMillis();
                kmf.init(keyStore, keys);
                KeyManager[] keyManagers = kmf.getKeyManagers();
                SSLContext sslContext = SSLContext.getInstance("TLS");
                sslContext.init(keyManagers, null, null);
                String content = null;
                HttpURLConnection urlConnection = null;              
                try {
                    URL requestedUrl = new URL(httpsUrl);
                    urlConnection = (HttpURLConnection) requestedUrl.openConnection();
                    if(urlConnection instanceof HttpsURLConnection) {
                        ((HttpsURLConnection)urlConnection)
                            .setSSLSocketFactory(sslContext.getSocketFactory());
                    }
                    urlConnection.setRequestMethod("GET");
                    urlConnection.setConnectTimeout(1500);
                    urlConnection.setReadTimeout(1500);
                    InputStream is = urlConnection.getInputStream();
                    StringBuffer sb = new StringBuffer();
                    byte[] bytes = new byte[1024];
                    for (int len = 0; (len = is.read(bytes)) != -1;) {
                        sb.append(new String(bytes, 0, len, "utf-8"));
                    }
                    content = sb.toString();
                } catch(Exception ex) {
                    content = ex.toString();
                } finally {
                    if(urlConnection != null) {
                        urlConnection.disconnect();
                    }
                    System.out.println(content);
                }
                long e = System.currentTimeMillis();
                long b_a = b - a;//2
                long c_b = c - b;//196
                long d_c = d - c;//0
                long e_d = e - d;//4525
                long e_a = e - a;//4723
                System.out.println("");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };
}
```

### 3.8 开启Debug模式，打断点进行测试，如果content有期望内容返回，则OK。可以看到时间缩短很多。

## 4.不用域名，用IP

改为ip后，会报错：

java.security.cert.CertPathValidatorException: Trust anchor for certification path not found

java.io.IOException: Hostname <URL> was not verified

```Java
package com.example.https;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import android.util.Log;
public class NullHostNameVerifier implements HostnameVerifier {
    public boolean verify(String hostname, SSLSession session) {
        Log.i("RestUtilImpl", "Approving certificate for " + hostname);
        return true;
    }
}
```

```Java
package com.example.https;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import javax.net.ssl.X509TrustManager;
public class NullX509TrustManager implements X509TrustManager{
    @Override
    public void checkClientTrusted(X509Certificate[] arg0, String arg1)
             throws CertificateException {
        // TODO Auto-generated method stub
    }
    @Override
    public void checkServerTrusted(X509Certificate[] arg0, String arg1)
             throws CertificateException {
        // TODO Auto-generated method stub
    }
    @Override
    public X509Certificate[] getAcceptedIssuers() {
        // TODO Auto-generated method stub
        return null;
    }
}
```

```Java
package com.example.https;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyStore;
import java.security.SecureRandom;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
public class MainActivity extends Activity {
    private Button testButton;
    public String httpsUrl = "https://10.22.23.75:8443";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout. activity_main);
        testButton = (Button) findViewById(R.id.testButton );
        testButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                new Thread(access ).start();
            }
        });
    }
    public Runnable access = new Runnable() {
        public void run() {
            try {
                /*===============下面是为了信任自建的根证书=====================*/
                /*否则会报错：java.security.cert.CertPathValidatorException: Trust anchor for certification path not found*/
                // Load CAs from an InputStream
                // (could be from a resource or ByteArrayInputStream or ...)
                CertificateFactory cf = CertificateFactory.getInstance("X.509");
                // From https://www.washington.edu/itconnect/security/ca/load-der.crt
                InputStream caInput = getBaseContext().getResources().openRawResource(R.raw.ca);
                Certificate ca;
                try {
                    ca = cf.generateCertificate(caInput);
                    System. out.println("ca=" + ((X509Certificate) ca).getSubjectDN());
                } finally {
                    caInput.close();
                }
                // Create a KeyStore containing our trusted CAs
                String keyStoreType = KeyStore.getDefaultType();
                KeyStore ks = KeyStore.getInstance(keyStoreType);
                ks.load( null, null );
                ks.setCertificateEntry( "ca", ca);
                // Create a TrustManager that trusts the CAs in our KeyStore
                String tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
                TrustManagerFactory tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
                tmf.init(ks);
                /*===============上面是为了信任自建的根证书=====================*/
                long a = System.currentTimeMillis();
                String key = "222222";
                char[] keys = key.toCharArray();
                KeyStore keyStore = KeyStore.getInstance("PKCS12");
                InputStream ins = getBaseContext().getResources().openRawResource(R.raw.client1);
                long b = System.currentTimeMillis();
                keyStore.load(ins, keys);
                long c = System.currentTimeMillis();
                KeyManagerFactory kmf = KeyManagerFactory.getInstance("X509");
                long d = System.currentTimeMillis();
                kmf.init(keyStore, keys);
                KeyManager[] keyManagers = kmf.getKeyManagers();
                SSLContext sslContext = SSLContext.getInstance("TLS");
                //sslContext.init(keyManagers, tmf.getTrustManagers(), null);
                sslContext.init(keyManagers, new X509TrustManager[]{new NullX509TrustManager()}, new SecureRandom());             
                String content = null;
                /*===============下面一行是为了解决java.io.IOException: Hostname <URL> was not verified=====================*/
                HttpsURLConnection. setDefaultHostnameVerifier(new NullHostNameVerifier());
                HttpURLConnection urlConnection = null;              
                try {
                    URL requestedUrl = new URL(httpsUrl);
                    urlConnection = (HttpURLConnection) requestedUrl.openConnection();
                    if(urlConnection instanceof HttpsURLConnection) {
                        ((HttpsURLConnection)urlConnection)
                            .setSSLSocketFactory(sslContext.getSocketFactory());
                    }
                    urlConnection.setRequestMethod("GET" );
                    urlConnection.setConnectTimeout(1500);
                    urlConnection.setReadTimeout(1500);
                    InputStream is = urlConnection.getInputStream();
                    StringBuffer sb = new StringBuffer();
                    byte[] bytes = new byte[1024];
                    for (int len = 0; (len = is.read(bytes)) != -1;) {
                        sb.append( new String(bytes, 0, len, "utf-8"));
                    }
                    content = sb.toString();
                } catch(Exception ex) {
                    content = ex.toString();
                } finally {
                    if(urlConnection != null) {
                        urlConnection.disconnect();
                    }
                    System. out.println(content);
                }
                long e = System.currentTimeMillis();
                long b_a = b - a; //412
                long c_b = c - b; //9836
                long d_c = d - c; //1
                long e_d = e - d; //576
                long e_a = e - a; //10825
                System.out.println("" );               
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };
}
```

```Java
package com.example.https;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyStore;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.X509TrustManager;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;
public class MainActivity extends Activity {
    private Button testButton;
    public String httpsUrl = "https://10.22.23.75:8443";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        testButton = (Button) findViewById(R.id.testButton);
        testButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                new Thread(access).start();
            }
        });
    }
    public Runnable access = new Runnable() {
        public void run() {
            try {
                long a = System.currentTimeMillis();
                String key = "222222";
                char[] keys = key.toCharArray();
                KeyStore keyStore = KeyStore.getInstance("BKS");
                InputStream ins = getBaseContext().getResources().openRawResource(R.raw.client1);
                long b = System.currentTimeMillis();
                keyStore.load(ins, keys);
                long c = System.currentTimeMillis();
                KeyManagerFactory kmf = KeyManagerFactory.getInstance("X509");
                long d = System.currentTimeMillis();
                kmf.init(keyStore, keys);
                KeyManager[] keyManagers = kmf.getKeyManagers();
                SSLContext sslContext = SSLContext.getInstance("TLS");
                /* 第二个参数解决：java.security.cert.CertPathValidatorException: Trust anchor for certification path not found */
                sslContext.init(keyManagers, new X509TrustManager[]{new NullX509TrustManager()}, null);
                String content = null;
                /* 下面一行是为了解决：java.io.IOException: Hostname <URL> was not verified */
                HttpsURLConnection.setDefaultHostnameVerifier(new NullHostNameVerifier());
                HttpURLConnection urlConnection = null;              
                try {
                    URL requestedUrl = new URL(httpsUrl);
                    urlConnection = (HttpURLConnection) requestedUrl.openConnection();
                    if(urlConnection instanceof HttpsURLConnection) {
                        ((HttpsURLConnection)urlConnection)
                            .setSSLSocketFactory(sslContext.getSocketFactory());
                    }
                    urlConnection.setRequestMethod("GET");
                    urlConnection.setConnectTimeout(1500);
                    urlConnection.setReadTimeout(1500);
                    InputStream is = urlConnection.getInputStream();
                    StringBuffer sb = new StringBuffer();
                    byte[] bytes = new byte[1024];
                    for (int len = 0; (len = is.read(bytes)) != -1;) {
                        sb.append(new String(bytes, 0, len, "utf-8"));
                    }
                    content = sb.toString();
                } catch(Exception ex) {
                    content = ex.toString();
                } finally {
                    if(urlConnection != null) {
                        urlConnection.disconnect();
                    }
                    System.out.println(content);
                }
                long e = System.currentTimeMillis();
                long b_a = b - a;//2
                long c_b = c - b;//196
                long d_c = d - c;//0
                long e_d = e - d;//4525
                long e_a = e - a;//4723
                System.out.println("");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };
}
```