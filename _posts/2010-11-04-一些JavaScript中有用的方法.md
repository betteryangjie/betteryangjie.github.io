---
layout: post
title: 一些JavaScript中有用的方法
categories: [前端技术]
tags: [JavaScript]
---
本文总结一些在前端开发过程中，一些JavaScript中有用的方法。比如对JSON的操作、编码、解码、判断输入法状态等。

## 1.JSON

### 1.1 JSON Object 2 String

```JavaScript
var obj = {
	"name": "张三",
	"age": "18"
}
var str = JSON.stringify(obj);
```

```JavaScript
var obj = {
	"name": "张三",
	"age": "18"
}
var str = $.toJSON(obj);
```

### 1.1 String 2 JSON Object

```JavaScript
var str = '{"name":"张三","age":"18"}';
var obj = JSON.parse(str);
```

```JavaScript
var str = '{"name":"张三","age":"18"}';
var obj = $.parseJSON(str);
```

```JavaScript
var str = '{"name":"张三","age":"18"}';
var obj = $.secureEvalJSON(str);
```

## 2.编码解码

### 2.1 对字符串进行URI编码

```JavaScript
encodeURI("http://yangjie.info/20101104/一些JavaScript中有用的方法")
```

### 2.2 对字符串进行URI解码

```JavaScript
decodeURI("http://yangjie.info/20101104/%E4%B8%80%E4%BA%9BJavaScript%E4%B8%AD%E6%9C%89%E7%94%A8%E7%9A%84%E6%96%B9%E6%B3%95")
```

## 3.判断输入法状态

```JavaScript
document.addEventListener("compositionstart", function(){
    window.IMEStatus=1;//中文输入状态
});
document.addEventListener("compositionend", function(){
    window.IMEStatus=2;//英文输入状态
});
```
