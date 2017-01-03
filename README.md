# tinper neoui

[![npm version](https://img.shields.io/npm/v/tinper-neoui.svg)](https://www.npmjs.com/package/tinper-neoui)
[![Build Status](https://img.shields.io/travis/iuap-design/neoui/master.svg)](https://travis-ci.org/iuap-design/neoui)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-neoui.svg)](https://david-dm.org/iuap-design/tinper-neoui#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/tinper-neoui.svg?style=flat)](https://npmjs.org/package/tinper-neoui)

##  介绍
[tinper neoui](http://tinper.org/dist/neoui/index.html) 是基于 `UI` 设计语言 `iUAP Design` 实现的前端框架，开放自由、易学易用、样式丰富、美观大气，为开发者提供从产品界面设计到前端开发的完整生态。

## 功能

### 丰富的组件

neoui 包含丰富的 CSS 组件、JS 插件

### 按需定制

可以轻松定制所需模块 减小文件尺寸 提升效率，节约资源

### 响应式布局

基于12栅格系统 全面兼容不同浏览器及设备 一次开发，多端兼容

### 完整生态

基于 neoui 扩展的各种功能插件，丰富的主题，易用的快速开发脚手架以及基于框架扩展的datatable等技术元素，为开发者提供一站式解决方案。


## 快速上手

### 获取neoui

- 直接从github获取我们的源码
```
git clone git@github.com:iuap-design/tinper-neoui.git
```

- 使用CDN
```
http://design.yyuap.com/static/uui/latest/js/u.js

http://design.yyuap.com/static/uui/latest/css/u.css
```
- 使用npm安装

```
npm install tinper-neoui
```


### 快速创建一个页面

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
  <title>tinper neoui Demo</title>

  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp"/>
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="iUAP Design"/>
  <link rel="stylesheet" href="//design.yyuap.com/static/uui/latest/css/u.css">
</head>
<body>
  <h1> Hi, tinper neoui </h1>

  <!-- 你的代码 -->

  <script src="//design.yyuap.com/static/jquery/jquery-1.11.2.js"></script>
	
  <!--[if lte IE 8 ]>
  <script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>

  <script src="//design.yyuap.com/static/uui/latest/js/u-polyfill.js"></script>
  <![endif]-->
	

  <script src="//design.yyuap.com/static/uui/latest/js/u.js"></script>
</body>
</html>
```
## 文档

开发文档详见[这里](http://tinper.org/dist/neoui/global/README.html)。

更多内容请移步我们的[官网](http://tinper.org)

## 参与讨论和开发

### 反馈
如在使用过程中遇到任何问题，可以在[这里](https://github.com/iuap-design/tinper-neoui/issues)提交issue反馈；

或者直接fork代码到你的github仓库，提交pull request给我们。

有紧急问题可以直接邮件给我（Email：guoyff@yonyou.com）

[Bug 反馈及需求提交](CONTRIBUTING.md)



### 开发及构建

开发者可以一起参与为 neoui 贡献代码，同时也可以基于 neoui 进行二次开发或封装插件。


neoui 使用 [gulp.js](http://gulpjs.com/) 构建项目。

克隆项目文件:

```
$ git clone git@github.com:iuap-design/tinper-neoui.git
```

然后进入目录安装依赖：

```
$ npm install
```

接下来，执行 `gulp`：

```
$ npm run product
```





