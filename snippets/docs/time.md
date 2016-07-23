# time插件

只选择时分秒

# 插件依赖

依赖于 http://design.yyuap.com/static/uui/latest/js/u.js

除了js文件还需引入u.css。

# 用法

##引入文件
在header中引入u.css
```
<link rel="stylesheet" type="text/css" href='http://design.yyuap.com/static/uui/latest/css/u.css'>
```
在文件尾部加入u.js
 
```
<script type="text/javascript" src='http://design.yyuap.com/static/uui/latest/js/u.js'></script>

```

##代码

定义样式为`u-time`的div父元素，包裹类`u-input`的input

```
<div class='u-time'>
    <input class="u-input" type="text">
</div>

```

js会根据`u-time`来定位dom，然后绑定事件。


# 示例

replaceExamp





