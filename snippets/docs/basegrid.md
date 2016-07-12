# 基础grid插件

动态生成基本表格

# 插件依赖

首先依赖于 http://design.yyuap.com/static/uui/3.0.6/js/u.js


再引入js: http://design.yyuap.com/static/uui/3.0.6/js/u-grid.js

# 用法

定义div父元素，配置`U-meta`,与options

```
<div id="gridTest" u-meta='{"id":"grid","type":"grid","data":"dataTable","columnMenu":false,"canDrag":false,"sortable":false,"canSwap":false}'>
		<div options='{"field":"name","dataType":"String","title":"姓名"}'></div>
</div>

```

js会根据`u-year`来定位dom，然后绑定事件。


# 示例

replaceExamp





