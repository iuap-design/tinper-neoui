# clockpicker插件

模拟老式表盘设置时间

# 插件依赖

依赖于 http://design.yonyoucloud.com/static/uui/latest/js/u.js

除了js文件还需引入u.css。

# 用法

## 引入文件
在header中引入u.css
```
<link rel="stylesheet" type="text/css" href='http://design.yonyoucloud.com/static/uui/latest/css/u.css'>
```
在文件尾部加入u.js
 
```
<script type="text/javascript" src='http://design.yonyoucloud.com/static/uui/latest/js/u.js'></script>

```

## 代码
定义样式为`u-clockpicker`的div父元素，包裹类`u-input`的input

```
<div class='u-clockpicker'>
    <input class="u-input" type="text">
</div>

```

js会根据`u-clockpicker`来定位dom，然后绑定事件。


# 示例









## clockpicker
<div class="examples-code"><pre><code>
&lt;div class="example">
	&lt;div class='u-clockpicker'>
	    &lt;input class="u-input" type="text">
	&lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example .u-input{
	border: 1px solid rgba(0,0,0, 0.12);
	width: 250px;
}</code></pre>
</div>


