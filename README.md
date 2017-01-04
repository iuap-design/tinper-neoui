<img src="http://tinper.org/assets/images/neouik.png" width="120" style="max-width:100%;"/>


[![npm version](https://img.shields.io/npm/v/tinper-neoui.svg)](https://www.npmjs.com/package/tinper-neoui)
[![Build Status](https://img.shields.io/travis/iuap-design/neoui/master.svg)](https://travis-ci.org/iuap-design/neoui)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-neoui.svg)](https://david-dm.org/iuap-design/tinper-neoui#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/tinper-neoui.svg?style=flat)](https://npmjs.org/package/tinper-neoui)


[中文文档](./README_CN.md)
##  Introduction
[tinper neoui](http://tinper.org/dist/neoui/index.html)  is based on the UI design language IUAP design to achieve the enterprise-class front-end framework. It can help users to quickly build a standard consistent front page and improve the development efficiency


## Features


* Rich components

* Download resources according to your needs

* Responsive layout

* Adapter mainstream browser （IE8+ 、firefox、Chrome、Safari）


## Quickstart

### Install

- From github
```
git clone git@github.com:iuap-design/tinper-neoui.git
```

- CDN
```
http://design.yyuap.com/static/uui/latest/js/u.js

http://design.yyuap.com/static/uui/latest/css/u.css
```
- npm

```
npm install tinper-neoui
```


### Use

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

  <!-- your code -->

  <script src="//design.yyuap.com/static/jquery/jquery-1.11.2.js"></script>
	
  <!--[if lte IE 8 ]>
  <script src="http://cdn.staticfile.org/modernizr/2.8.3/modernizr.js"></script>

  <script src="//design.yyuap.com/static/uui/latest/js/u-polyfill.js"></script>
  <![endif]-->
	
  <script src="//design.yyuap.com/static/uui/latest/js/u.js"></script>
</body>
</html>
```
## Document

[Develop documentation](http://tinper.org/dist/neoui/global/README.html)。

[Website](http://tinper.org)

## Contributing


### Feedback

If you encounter any problems ，submit [issues](https://github.com/iuap-design/tinper-neoui/issues),or pull request。

[PR code](CONTRIBUTING.md)

### Develop

Developers can participate in the development of neoui,  but also can be based on neoui two development


tinper-neoui use gulp.js and webpack build the project.


clone：

```
$ git clone git@github.com:iuap-design/tinper-neoui.git
```

install：

```
$ npm install
```

build：

```
$ npm run product
```

### Website Chat Group

527124070

## Licence 版权

[MIT](./LICENSE)
