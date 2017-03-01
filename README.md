<img src="http://tinper.org/assets/images/neouik.png" width="120" style="max-width:100%;"/>


[![npm version](https://img.shields.io/npm/v/tinper-neoui.svg)](https://www.npmjs.com/package/tinper-neoui)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-neoui/master.svg)](https://travis-ci.org/iuap-design/tinper-neoui)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-neoui.svg)](https://david-dm.org/iuap-design/tinper-neoui#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/tinper-neoui.svg?style=flat)](https://npmjs.org/package/tinper-neoui)


[中文文档](./README_CN.md)
##  Introduction
[tinper-neoui](http://tinper.org/dist/neoui/index.html)  is based on the UI design language IUAP design to achieve the enterprise-class front-end framework. It can help users to quickly build a standard consistent front page and improve the development efficiency


## Features


* Rich components

* Download resources according to your needs

* Responsive layout

* Adapter mainstream browser （IE8+ 、firefox、Chrome、Safari）


## Quickstart

### Get neoui

- npm

```
npm install tinper-neoui
```
* cdn 
```
css Path: //design.yyuap.com/static/neoui/latest/css/neoui.css
JS Path: //design.yyuap.com/static/neoui/latest/js/neoui.js
```
### Introducing neoui

- ES6
```
import { neoui } from "tinper-neoui/src/index"
```
* HTML

```
css：
	 <link href="//design.yyuap.com/static/neoui/latest/css/neoui.css" rel="stylesheet">

JS ：
	<script src="//design.yyuap.com/static/jquery/jquery-1.11.2.js"></script>
    <script src="//design.yyuap.com/static/neoui/latest/js/neoui.js"></script>
```
**Note**： neoui is dependent on jQuery

### Use


```
<button class="u-button u-button-primary">Hello World!</button>
```
Read the [Develop documentation](http://tinper.org/dist/neoui/global/README.html) for information on the framework contents, templates and examples, and more.


## Contributing


### Feedback

If you encounter any problems , submit [issues](https://github.com/iuap-design/tinper-neoui/issues),or pull request。

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

## Licence 版权

[MIT](./LICENSE)
