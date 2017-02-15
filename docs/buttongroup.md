# 按钮组

添加含有`u-button-group`样式的父元素，然后包裹多个类为`u-button`button元素



## 基础按钮组
类`u-group-button`包裹类`u-button`的button
<div class="example-content"><div class="u-button-group ">    
    <button class="u-button">BUTTON</button>
    <button class="u-button">BUTTON</button>
    <button class="u-button">BUTTON</button>
</div></div>
<div class="examples-code"><pre><code>&lt;div class="u-button-group ">    
    &lt;button class="u-button">BUTTON&lt;/button>
    &lt;button class="u-button">BUTTON&lt;/button>
    &lt;button class="u-button">BUTTON&lt;/button>
&lt;/div></code></pre>
</div>

## 嵌套

按钮组里嵌套下拉
<div class="example-content"> <div class="u-button-group">    
    <button class="u-button ">BUTTON</button>
    <button class="u-button ">BUTTON</button>
    <button class="u-button " id="demo-menu-default">
        dropdown
        <span class="u-right-icon uf uf-anglearrowdown"></span>
    </button>
    <ul class="u-menu u-menu-bottom-right u-menu-danger" for="demo-menu-default">
        <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
        <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
        <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
        <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
    </ul>
</div></div>
<div class="examples-code"><pre><code>&lt;div class="u-button-group">    
    &lt;button class="u-button ">BUTTON&lt;/button>
    &lt;button class="u-button ">BUTTON&lt;/button>
    &lt;button class="u-button " id="demo-menu-default">
        dropdown
        &lt;span class="u-right-icon uf uf-anglearrowdown">&lt;/span>
    &lt;/button>
    &lt;ul class="u-menu u-menu-bottom-right u-menu-danger" for="demo-menu-default">
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
    &lt;/ul>
&lt;/div></code></pre>
</div>

## 多尺寸

* `.u-button-group-xg` - 特大尺寸
* `.u-button-group-lg` - 大尺寸
* `.u-button-group-xs` - 小尺寸
* 不添加样式代表默认尺寸
<div class="example-content ex-hide"><style>.example-content .u-button-group{
	margin: 5px;
}
</style></div>
<div class="example-content"><div class="u-button-group u-button-group-xg">	
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
</div>
<br>
<div class="u-button-group u-button-group-lg">	
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
</div>
<br>
<div class="u-button-group ">	
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
</div>
<br>
<div class="u-button-group u-button-group-xs">	
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
	<button class="u-button raised u-button-border default">BUTTON</button>
</div></div>
<div class="examples-code"><pre><code>&lt;div class="u-button-group u-button-group-lg">	
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
&lt;/div></code></pre>
</div>


[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/buttongroup)