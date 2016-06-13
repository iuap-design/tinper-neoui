
## 开始使用

### 1.获取iuap-design

- 直接从github获取我们的源码
```
git clone git@github.com:iuap-design/iuap-design.git
```

- 使用CDN
```
http://design.yyuap.com/static/iuap-design/3.0.1/js/u-ui.js
http://design.yyuap.com/static/iuap-design/3.0.1/js/u-polyfill.js

http://design.yyuap.com/static/iuap-design/3.0.1/css/u.css
http://design.yyuap.com/static/iuap-design/3.0.1/css/u-extend.css
```
- 使用npm安装

暂未发布，敬请期待...

- 使用bower下载

暂未发布，敬请期待...


### 2.版本说明

当前iuap-design框架的版本为3.0.1。


### 3.目录及文件说明

提供的资源目录结构
```
dist
│
├─css
│      font-awesome.css
│      u-extend.css
│      u-extend.min.css
│      u.css
│      u.min.css
│
├─fonts
│      fontawesome-webfont.eot
│      fontawesome-webfont.svg
│      fontawesome-webfont.ttf
│      fontawesome-webfont.woff
│      fontawesome-webfont.woff2
│      FontAwesome.otf
│
└─js
        u-polyfill.js
        u-polyfill.min.js
        u-ui.js
        u-ui.min.js


```

### 4.快速创建一个页面

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="viewport"
        content="width=device-width, initial-scale=1">
  <title>iUAP Design Demo</title>

  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp"/>
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="iUAP Design"/>
  <link rel="stylesheet" href="http://design.yyuap.com/static/iuap-design/3.0.1/css/u.css">
</head>
<body>
  <h1> Hi, iUAP Design </h1>

  <!-- 你的代码 -->

  <!--[if (gte IE 9)|!(IE)]><!-->
  <script src="http://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
  <!--<![endif]-->
  <!--[if lte IE 8 ]>
  <script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>
  <script src="http://design.yyuap.com/static/iuap-design/3.0.1/js/u-polyfill.js"></script>
  <![endif]-->
  <script src="http://design.yyuap.com/static/iuap-design/3.0.1/js/u-ui.js"></script>
</body>
</html>
```
### 5.开发文档

开发文档详见[这里](https://github.com/iuap-design/iuap-design/tree/master/docs)。

更多内容请移步我们的[官网](http://design.yyuap.com/)

### 6.参与讨论和开发

如在使用过程中遇到任何问题，可以在[这里](https://github.com/iuap-design/iuap-design/issues)提交issue反馈；

或者直接fork代码到你的github仓库，提交pull request给我们。

有紧急问题可以直接邮件给我（Email：guoyff@yonyou.com）
