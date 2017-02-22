# 年月

用户可以通过此插件进行年月的选择。




[试一试](http://tinper.org/webide/#/demos/ui/yearmonth)

# API

## \# YearMonth 对象

* 类型：`Object`
* 说明： YearMonth表示一个年月对象
* 用法：

获取方式：1、获取绑定年月的dom元素 ； 2、读取dom元素上的属性'u.YearMonth'

```

var yearMonthObject = document.getElementById('domId')['u.YearMonth'];

```

**注：** 如果获取的年月对象为空，原因为年月没有初始化成功，可以先调用`u.compMgr.updateComp();`来初始化页面中的控件。然后再获取年月对象。


## \# setValue 
* 类型： `Function`
* 说明：设置具体的年月
* 参数：
	* `{String} value` 具体格式："YYYY-MM"
* 用法：

```
yearMonthObject.setValue('2016-02');

```


相关内容：

[年月在kero中使用](http://tinper.org/dist/kero/docs/ex_yearmonth.html)    

[年月在grid中使用](http://tinper.org/webide/#/demos/grids/edit)




定义样式为`u-yearmonth`的div父元素，包裹样式为`u-input`的input元素。
<div class="example-content">
<div class='u-yearmonth'>
    <input class="u-input" type="text">
</div></div>

<div class="example-content ex-hide"><style>
.example .u-input{
	border: 1px solid rgba(0,0,0, 0.12);
	width: 250px;
}
</style></div>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>

&lt;div class='u-yearmonth'>
    &lt;input class="u-input" type="text">
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example .u-input{
	border: 1px solid rgba(0,0,0, 0.12);
	width: 250px;
}</code></pre>
</div>


</div>