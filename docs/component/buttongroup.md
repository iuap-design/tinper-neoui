## 按钮组

样式为`u-button-group`的父元素，包裹多个样式为`u-button`的button元素



[试一试](http://tinper.org/webide/#/demos/ui/buttongroup)


### 基础

<div class="examples-code"><pre><code>
&lt;div class="u-button-group ">
    &lt;button class="u-button">BUTTON&lt;/button>
    &lt;button class="u-button">BUTTON&lt;/button>
    &lt;button class="u-button">BUTTON&lt;/button>
&lt;/div>
</code></pre>
</div>





### 嵌套

按钮组里嵌套下拉菜单

<div class="examples-code"><pre><code>
 &lt;div class="u-button-group">
    &lt;button class="u-button ">BUTTON&lt;/button>
    &lt;button class="u-button ">BUTTON&lt;/button>
    &lt;button class="u-button " id="demo-menu-default">
        dropdown
        &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
    &lt;/button>
    &lt;ul class="u-menu u-menu-bottom-right u-menu-danger" for="demo-menu-default">
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
        &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
    &lt;/ul>
&lt;/div>
</code></pre>
</div>





### 多尺寸

* `.u-button-group-xg` - 特大尺寸
* `.u-button-group-lg` - 大尺寸
* `.u-button-group-xs` - 小尺寸
* 不添加样式代表默认尺寸

<div class="examples-code"><pre><code>
&lt;div class="u-button-group u-button-group-xg">	
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
&lt;/div>
&lt;br>
&lt;div class="u-button-group u-button-group-lg">	
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
&lt;/div>
&lt;br>
&lt;div class="u-button-group ">	
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
&lt;/div>
&lt;br>
&lt;div class="u-button-group u-button-group-xs">	
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
	&lt;button class="u-button raised u-button-border default">BUTTON&lt;/button>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example-content .u-button-group{
	margin: 5px;
}</code></pre>
</div>


