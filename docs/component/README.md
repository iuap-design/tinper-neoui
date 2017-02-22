# 组件

## 大体介绍
NeoUI把一些常见的网页组件拆分成不同的部分，进行类似 Web Components 的封装，包括分页、下拉菜单、进度条、弹出框等更多功能。
另外，还为大家精心制作了实用方便的样式板，可以在 [WebIDE](http://tinper.org/webide/#/demos/ui/dialog/message) 中找到你想要的效果，并且可以直接copy代码，所见即所得，非常贴心方便。

## 具体使用

### 下载文件
登录[官网首页](http://design.yyuap.com/)右下角，有个“下载体验”点击进行下载

下载之后，根目录会有css、js、fonts三个文件夹。后面引入的文件可以从这里获取。

### 引入文件

1、 在header标签内引入u.css

	<link rel="stylesheet" type="text/css" href="yourPath/css/u.css">
也可以通过cdn进行加载

	<link rel="stylesheet" type="text/css" href="//design.yyuap.com/static/uui/latest/css/u.css">

2、引入u.js文件

	<script src="yourPath/js/u.js"></script>
也可以通过cdn进行加载

	<script src="//design.yyuap.com/static/uui/latest/js/u.js"></script>

### 编写代码

引入相关文件之后，参照各个控件文档，编写代码，进行调试。
