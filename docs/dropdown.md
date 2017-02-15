# dropdown



# 示例


##左边menu
<div class="example-content ex-hide"><style>.example{
	padding-left: 30px;
}
</style></div>
<div class="example-content"><!-- Left aligned menu below button -->
<div class="example">
	<button id="demo-menu-lower-left" class="u-button floating u-button-icon">
	    <i class="uf uf-verticalellipsis"></i>
	</button>
	左对齐
	<ul class="u-menu u-menu-bottom-left" for="demo-menu-lower-left">
	    <li class="u-menu-item">新增</li>
	    <li class="u-menu-item">修改</li>
	    <li disabled class="u-menu-item">删除</li>
	    <li class="u-menu-item">审核</li>
	</ul>
</div>
<!-- right aligned menu below button -->
<div class="example">
	<button id="demo-menu-lower-right" class="u-button floating u-button-icon">
	    <i class="uf uf-verticalellipsis"></i>
	</button>右对齐
	<ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right">
	    <li class="u-menu-item">新增</li>
	    <li class="u-menu-item">修改</li>
	    <li disabled class="u-menu-item">删除</li>
	    <li class="u-menu-item">审核</li>
	</ul>
</div></div>

##不同颜色的下拉
按钮配色，不同的色彩代表不同的情感和状态。添加颜色样式类分别为`.u-button-success`、`u-button-info`、`u-button-danger`、`u-button-warning`。
<div class="example-content"><div class="u-row">
    <div class="u-col-3">
        <button class="u-button  u-button-success u-menu-button" id="demo-menu-sucess">
            success
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-bottom-right u-menu-success" for="demo-menu-sucess">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
    <div class="u-col-3">
        <button class="u-button  u-button-info u-menu-button" id="demo-menu-info">
            info
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-bottom-right u-menu-info" for="demo-menu-info">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
    <div class="u-col-3">
        <button class="u-button  u-button-danger u-menu-button" id="demo-menu-danger">
            danger
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-bottom-right u-menu-danger" for="demo-menu-danger">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
    <div class="u-col-3">
        <button class="u-button  u-button-warning u-menu-button" id="demo-menu-warning">
            warning
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-bottom-right u-menu-warning" for="demo-menu-warning">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
</div></div>

##分割下拉
分割下拉由一个文字和一个图标组成。

* 创建一个含有`u-button-group`、`u-split`的div容器
* 在第一步中的div容器中创建含有`u-split-pre`的button
* 接着在第一步中的div容器中创建含有`u-button-group`、`u-split-sub`的div容器。在容器此div中创建菜单按钮

<div class="example-content"><div class="u-button-group u-split">
    <button class="u-button u-split-pre">
        打印
    </button>
    <div class="u-button-group u-split-sub">
        <button class="u-button u-dropdown-toggle" id="split">
            <span class=" uf uf-anglearrowdown "></span>
        </button>
        <ul class="u-menu u-menu-bottom-right" for="split">
            <li class="u-menu-item"><a>报价单</a></li>
            <li class="u-menu-item"><a>到货单</a></li>
        </ul>
    </div>
</div></div>

##基本菜单按钮
菜单按钮包括一个普通的button按钮和一个下拉内容ul元素。显示效果有4种，
分别为：显示在按钮下方，左对齐、显示在按钮下方，右对齐、显示在按钮上方，左对齐、显示在按钮上方，右对齐。

具体使用

* 创建button元素，添加id属性，属性值可以自己定义 点击它时，菜单会进行隐藏或者显示。

* 创建样式为“u-menu”的ul下拉列表，用于包括菜单内容。ul上定义for属性，属性值与第一步创建button中的id对应。菜单的样式还可以选择`u-menu-bottom-left`、`u-menu-bottom-right`、`u-menu-top-left`、`u-menu-top-right`中的一个来表示菜单相对于按钮的显示位置。

* 在ul标签内，使用样式为`u-menu-item`的li标签定义菜单的具体内容，当li标签不可用时，可以添加`disabled`属性。


<div class="example-content"><button class="u-button  raised u-menu-button" id="demo-menu-lower-right1">
    联查
    <span class="u-right-icon uf uf-anglearrowdown"></span>
</button>
<ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right1">
    <li class="u-menu-item "><a>报价单</a></li>
    <li class="u-menu-item"><a>到货单</a></li>
</ul></div>







