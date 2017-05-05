# 插件

## 基本介绍
Javascript插件包括了时间、模态框、页签、grid、进度条等多种插件。可以在 [WebIDE](http://tinper.org/webide/#/demos/ui/dialog/message) 中找到你想要的效果，并且可以直接copy代码，所见即所得，非常贴心方便。

## 具体使用

### 下载文件
登录[官网首页](http://design.yyuap.com/)右下角，有个“下载体验”点击进行下载

下载之后，根目录会有css、js、fonts三个文件夹。后面引入的文件可以从这里获取。

### 引入文件

1、 在header标签内引入u.css

	<link rel="stylesheet" type="text/css" href="yourPath/css/u.css">
如需要用到表格grid相关插件，需要加载grid.css

```
<link rel="stylesheet" type="text/css" href="yourPath/css/grid.css">
```

如需要用到树tree相关插件，需要加载tree.css

```
<link rel="stylesheet" type="text/css" href="yourPath/css/tree.css">
```

也可以通过cdn进行加载

	<link rel="stylesheet" type="text/css" href="//design.yonyoucloud.com/static/uui/latest/css/u.css">
	<link rel="stylesheet" type="text/css" href="//design.yonyoucloud.com/static/uui/latest/css/grid.css">
	<link rel="stylesheet" type="text/css" href="//design.yonyoucloud.com/static/uui/latest/css/tree.css">

2、引入u.js文件

	<script src="yourPath/js/u.js"></script>
如需要用到表格grid相关插件，需要加载u-grid.js

```
<script src="yourPath/js/u-grid.js"></script>
```

如需要用到树tree相关插件，需要加载u-tree.js

```
<script src="yourPath/js/u-tree.js"></script>
```

也可以通过cdn进行加载

	<script src="//design.yonyoucloud.com/static/uui/latest/js/u.js"></script>
	<script src="//design.yonyoucloud.com/static/uui/latest/js/u-grid.js"></script>
	<script src="//design.yonyoucloud.com/static/uui/latest/js/u-tree.js"></script>

### 编写代码

引入相关文件之后，参照各个控件文档，编写代码，进行调试。
