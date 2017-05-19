## dropdown


### 左边menu

<div class="examples-code"><pre><code>
&lt;!-- Left aligned menu below button -->
&lt;div class="example">
	&lt;button id="demo-menu-lower-left" class="u-button floating u-button-icon">
	    &lt;i class="uf uf-3dot-v">&lt;/i>
	&lt;/button>
	左对齐
	&lt;ul class="u-menu u-menu-bottom-left" for="demo-menu-lower-left">
	    &lt;li class="u-menu-item">新增&lt;/li>
	    &lt;li class="u-menu-item">修改&lt;/li>
	    &lt;li disabled class="u-menu-item">删除&lt;/li>
	    &lt;li class="u-menu-item">审核&lt;/li>
	&lt;/ul>
&lt;/div>
&lt;!-- right aligned menu below button -->
&lt;div class="example">
	&lt;button id="demo-menu-lower-right" class="u-button floating u-button-icon">
	    &lt;i class="uf uf-3dot-v">&lt;/i>
	&lt;/button>右对齐
	&lt;ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right">
	    &lt;li class="u-menu-item">新增&lt;/li>
	    &lt;li class="u-menu-item">修改&lt;/li>
	    &lt;li disabled class="u-menu-item">删除&lt;/li>
	    &lt;li class="u-menu-item">审核&lt;/li>
	&lt;/ul>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example{
	padding-left: 30px;
}</code></pre>
</div>




### 不同颜色的下拉
按钮配色，不同的色彩代表不同的情感和状态。添加颜色样式类分别为`.u-button-success`、`u-button-info`、`u-button-danger`、`u-button-warning`。

<div class="examples-code"><pre><code>
&lt;div class="u-row">
    &lt;div class="u-col-3">
        &lt;button class="u-button  u-button-success u-menu-button" id="demo-menu-sucess">
            success
            &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-bottom-right u-menu-success" for="demo-menu-sucess">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;div class="u-col-3">
        &lt;button class="u-button  u-button-info u-menu-button" id="demo-menu-info">
            info
            &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-bottom-right u-menu-info" for="demo-menu-info">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;div class="u-col-3">
        &lt;button class="u-button  u-button-danger u-menu-button" id="demo-menu-danger">
            danger
            &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-bottom-right u-menu-danger" for="demo-menu-danger">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;div class="u-col-3">
        &lt;button class="u-button  u-button-warning u-menu-button" id="demo-menu-warning">
            warning
            &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-bottom-right u-menu-warning" for="demo-menu-warning">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
&lt;/div></code></pre>
</div>





### 分割下拉
分割下拉由一个文字和一个图标组成。

* 创建一个含有`u-button-group`、`u-split`的div容器
* 在第一步中的div容器中创建含有`u-split-pre`的button
* 接着在第一步中的div容器中创建含有`u-button-group`、`u-split-sub`的div容器。在容器此div中创建菜单按钮

<div class="examples-code"><pre><code>
&lt;div class="u-button-group u-split">
    &lt;button class="u-button u-split-pre">
        打印
    &lt;/button>
    &lt;div class="u-button-group u-split-sub">
        &lt;button class="u-button u-dropdown-toggle" id="split">
            &lt;span class=" uf uf-arrow-down ">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-bottom-right" for="split">
            &lt;li class="u-menu-item">&lt;a>报价单&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a>到货单&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
&lt;/div></code></pre>
</div>





### 基本菜单按钮
菜单按钮包括一个普通的button按钮和一个下拉内容ul元素。显示效果有4种，
分别为：显示在按钮下方，左对齐、显示在按钮下方，右对齐、显示在按钮上方，左对齐、显示在按钮上方，右对齐。

具体使用

* 创建button元素，添加id属性，属性值可以自己定义 点击它时，菜单会进行隐藏或者显示。

* 创建样式为“u-menu”的ul下拉列表，用于包括菜单内容。ul上定义for属性，属性值与第一步创建button中的id对应。菜单的样式还可以选择`u-menu-bottom-left`、`u-menu-bottom-right`、`u-menu-top-left`、`u-menu-top-right`中的一个来表示菜单相对于按钮的显示位置。

* 在ul标签内，使用样式为`u-menu-item`的li标签定义菜单的具体内容，当li标签不可用时，可以添加`disabled`属性。

<div class="examples-code"><pre><code>
&lt;button class="u-button  raised u-menu-button" id="demo-menu-lower-right1">
    联查
    &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
&lt;/button>
&lt;ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right1">
    &lt;li class="u-menu-item ">&lt;a>报价单&lt;/a>&lt;/li>
    &lt;li class="u-menu-item">&lt;a>到货单&lt;/a>&lt;/li>
&lt;/ul></code></pre>
</div>



