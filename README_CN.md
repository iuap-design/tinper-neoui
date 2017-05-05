<img src="http://tinper.org/assets/images/neouik.png" width="120" style="max-width:100%;"/>


[![npm version](https://img.shields.io/npm/v/tinper-neoui.svg)](https://www.npmjs.com/package/tinper-neoui)
[![Build Status](https://img.shields.io/travis/iuap-design/tinper-neoui/master.svg)](https://travis-ci.org/iuap-design/neoui)
[![devDependency Status](https://img.shields.io/david/dev/iuap-design/tinper-neoui.svg)](https://david-dm.org/iuap-design/tinper-neoui#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/tinper-neoui.svg?style=flat)](https://npmjs.org/package/tinper-neoui)


[English Document](./README.md)
##  介绍
[tinper neoui](http://tinper.org/dist/neoui/index.html) 是基于 UI 设计语言 iuap design 实现的企业级前端UI框架，帮助用户快速构建标准一致的前端页面，提高开发效率。

## 功能

- **丰富的组件**: neoui 包含丰富的 CSS 组件、JS 插件

- **按需定制**: 可以轻松定制所需模块 减小文件尺寸 提升效率，节约资源

- **响应式布局**: 基于12栅格系统 全面兼容不同浏览器及设备 一次开发，多端兼容
- **浏览器兼容性**: 支持IE8+ 、firefox、Chrome、Safari等主流浏览器，轻松帮您解决浏览器兼容问题 

## 快速上手
### 获取neoui
* npm 资源
```
	npm install tinper-neoui
```

* cdn 资源
```
css路径: //design.yonyoucloud.com/static/neoui/latest/css/neoui.css
JS路径: //design.yonyoucloud.com/static/neoui/latest/js/neoui.js
```
### 引入neoui
- ES6语法
```
import { neoui } from "tinper-neoui"

```
* HTML直接引入

```
css资源：
	 <link href="//design.yonyoucloud.com/static/neoui/latest/css/neoui.css" rel="stylesheet">

JS 资源：
	<script src="//design.yonyoucloud.com/static/jquery/jquery-1.11.2.js"></script>
    <script src="//design.yonyoucloud.com/static/neoui/latest/js/neoui.js"></script>
```
**注**： neoui依赖于jquery，引入资源时需先引入jquery

### 具体使用
```
<button class="u-button u-button-primary">Hello World!</button>
```
开发文档详见[这里](http://tinper.org/dist/neoui/global/README.html)

## 如何参与贡献

### 开发及构建

开发者可以一起参与为 neoui 贡献代码，同时也可以基于 neoui 进行二次开发或封装插件。


neoui 使用 [gulp.js](http://gulpjs.com/) 和 [webpack](https://webpack.github.io/)构建项目。

克隆项目文件:

```
$ git clone git@github.com:iuap-design/tinper-neoui.git
```

然后进入目录安装依赖：

```
$ npm install
```

接下来，编译：

```
$ npm run product
```

### 反馈
如在使用过程中遇到任何问题，可以在[这里](https://github.com/iuap-design/tinper-neoui/issues)提交issue反馈；

或者直接fork代码到你的github仓库，提交pull request给我们。


[Bug 反馈及需求提交](CONTRIBUTING.md)


## Licence 版权

[MIT](./LICENSE)
