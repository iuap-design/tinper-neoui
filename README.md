# neoui

![Bower version](https://img.shields.io/bower/v/neoui.svg)
[![npm version](https://img.shields.io/npm/v/neoui.svg)](https://www.npmjs.com/package/neoui)
[![Build Status](https://img.shields.io/travis/iuap-design/neoui/master.svg)](https://travis-ci.org/iuap-design/neoui)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/neoui.svg)](https://david-dm.org/iuap-design/neoui#info=devDependencies)

[neoui](http://design.yyuap.com/) 是基于 `UI` 设计语言 `iUAP Design` 实现的前端框架，开放自由、易学易用、美观大气，为开发者提供从产品界面设计到前端开发的完整生态。

## 核心能力

### 丰富的组件

neoui 包含丰富的 CSS 组件、JS 插件

### 可扩展主题

更有多个包含不同主题的 Web 组件，可快速构建界面出色、体验优秀的跨屏页面，大幅提升开发效率。

### 完整生态

基于 neoui 扩展的各种功能插件，丰富的主题，易用的快速开发脚手架以及基于框架扩展的datatable等技术元素，为开发者提供一站式解决方案。


## 开始使用

### 获取neoui

- 直接从github获取我们的源码
```
git clone git@github.com:iuap-design/neoui.git
```

- 使用CDN
```
http://design.yyuap.com/static/iuap-design/3.0.1/js/u-ui.js
http://design.yyuap.com/static/iuap-design/3.0.1/js/u-polyfill.js

http://design.yyuap.com/static/iuap-design/3.0.1/css/u.css
http://design.yyuap.com/static/iuap-design/3.0.1/css/u-extend.css
```
- 使用npm安装

```
npm install neoui
```

- 使用bower下载

暂未发布，敬请期待...


### 版本说明

当前neoui框架的版本为3.0.1。


### 目录及文件说明

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
### 开发文档

开发文档详见[这里](https://github.com/iuap-design/neoui/tree/master/docs)。

更多内容请移步我们的[官网](http://design.yyuap.com/)

### 6.参与讨论和开发

如在使用过程中遇到任何问题，可以在[这里](https://github.com/iuap-design/neoui/issues)提交issue反馈；

或者直接fork代码到你的github仓库，提交pull request给我们。

有紧急问题可以直接邮件给我（Email：guoyff@yonyou.com）


## 开发及构建

开发者可以一起参与为 neoui 贡献代码，同时也可以基于 neoui 进行二次开发或封装插件。

### 目录结构

```
bower.json
CHANGELOG.md
CONTRIBUTING.md
dist/
docs/
gulpfile.babel.js
js/
package.json
README.md
scss/
vendor/
widget/
```

### 构建工具

neoui 使用 [gulp.js](http://gulpjs.com/) 构建项目。

克隆项目文件:

```
$ git clone git@github.com:iuap-design/neoui.git
```

然后进入目录安装依赖：

```
$ npm install
```

接下来，执行 `gulp`：

```
$ npm run dev
```

## 反馈

[Bug 反馈及需求提交](CONTRIBUTING.md)

## 版本号
