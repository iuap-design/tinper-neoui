# 按钮控件

按钮控件包括了普通按钮、文字按钮、圆形按钮、不同色彩按钮、多尺寸按钮、款按钮、圆角按钮、下拉按钮、菜单按钮。

# 如何使用

添加含有“u-button”样式的元素，即可实现一个按钮。其他效果的按钮实现只需添加相应的样式

# 示例


﻿##文字按钮
<div class="example-content"><button class="u-button">BUTTON</button>
<button class="u-button accent">BUTTON</button>
<button class="u-button primary">BUTTON</button>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button">BUTTON&lt;/button>
&lt;button class="u-button accent">BUTTON&lt;/button>
&lt;button class="u-button primary">BUTTON&lt;/button></code></pre>
</div>

﻿##基础按钮


在含有‘u-button’样式的button元素上添加“raised”样式。如果添加“primary”样式，按钮的背景色为系统的主色，如果添加“accent”样式,按钮的背景色为系统的副色。
<div class="example-content"><button class="u-button raised">BUTTON</button>
<button class="u-button raised accent">BUTTON</button>
<button class="u-button raised primary">BUTTON</button>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button raised">BUTTON&lt;/button>
&lt;button class="u-button raised accent">BUTTON&lt;/button>
&lt;button class="u-button raised primary">BUTTON&lt;/button></code></pre>
</div>

##多尺寸响应 


不同尺寸的按钮需添加类.u-button-xg, .u-button-lg,.u-button-sm
<div class="example-content"><button class="u-button raised primary u-button-xg">特大尺寸</button>

<button class="u-button raised primary u-button-lg">大尺寸</button>
<button class="u-button raised primary">默认尺寸
</button>
<button class="u-button raised primary u-button-sm">小尺寸</button>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button raised primary u-button-xg">特大尺寸&lt;/button>

&lt;button class="u-button raised primary u-button-lg">大尺寸&lt;/button>
&lt;button class="u-button raised primary">默认尺寸
&lt;/button>
&lt;button class="u-button raised primary u-button-sm">小尺寸&lt;/button></code></pre>
</div>

﻿##宽按钮


如果想按钮充满，添加类 .u-button-block 
<div class="example-content"><div style="width:600px">
    <button class="u-button raised primary u-button-block">宽按钮
    </button>   
</div>
</div>
<div class="examples-code"><pre><code>&lt;div style="width:600px">
    &lt;button class="u-button raised primary u-button-block">宽按钮
    &lt;/button>   
&lt;/div></code></pre>
</div>

##不同颜色的下拉按钮

按钮配色，不同的色彩代表不同的情感和状态。添加颜色样式类分别为“.u-button-success”、“u-button-info”、“u-button-danger”、“u-button-warning”。
<div class="example-content"><div class="u-row">
    <div class="u-col-3">
        <button class="u-button  u-button-success u-menu-button" id="demo-menu-sucess">
            success
            <span class="u-right-icon fa fa-angle-down"></span>
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
            <span class="u-right-icon fa fa-angle-down"></span>
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
            <span class="u-right-icon fa fa-angle-down"></span>
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
            <span class="u-right-icon fa fa-angle-down"></span>
        </button>
        <ul class="u-menu u-menu-bottom-right u-menu-warning" for="demo-menu-warning">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
</div>
</div>
<div class="examples-code"><pre><code>&lt;div class="u-row">
    &lt;div class="u-col-3">
        &lt;button class="u-button  u-button-success u-menu-button" id="demo-menu-sucess">
            success
            &lt;span class="u-right-icon fa fa-angle-down">&lt;/span>
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
            &lt;span class="u-right-icon fa fa-angle-down">&lt;/span>
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
            &lt;span class="u-right-icon fa fa-angle-down">&lt;/span>
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
            &lt;span class="u-right-icon fa fa-angle-down">&lt;/span>
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

﻿##色彩按钮


色彩按钮请添加类“u-button-success”、“u-button-info”、“u-button-danger”、“u-button-warning”
<div class="example-content"><button class="u-button  u-button-success">success</button>
<button class="u-button   u-button-info">info</button>
<button class="u-button   u-button-danger">danger</button>
<button class="u-button  u-button-warning">warning</button>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button  u-button-success">success&lt;/button>
&lt;button class="u-button   u-button-info">info&lt;/button>
&lt;button class="u-button   u-button-danger">danger&lt;/button>
&lt;button class="u-button  u-button-warning">warning&lt;/button></code></pre>
</div>

﻿##左半圆按钮、右半圆按钮


左半圆按钮的样式：.u-button-pill-left和 .u-button-round一起使用


右半圆按钮的样式： .u-button-pill-right 和 .u-button-round一起使用

<div class="example-content"><button class="u-button raised primary u-button-pill-left u-button-round">左半圆按钮
</button>
<button class="u-button raised primary u-button-pill-right u-button-squared">右半圆按钮
</button>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button raised primary u-button-pill-left u-button-round">左半圆按钮
&lt;/button>
&lt;button class="u-button raised primary u-button-pill-right u-button-squared">右半圆按钮
&lt;/button></code></pre>
</div>

##分割按钮

分割按钮由一个普通按钮和一个菜单按钮组成。

* 创建一个含有“u-button-group”、“u-split”的div容器
* 在第一步中的div容器中创建含有“u-split-pre”的button
* 接着在第一步中的div容器中创建含有“u-button-group”、“u-split-sub”的div容器。在容器此div中创建菜单按钮

<div class="example-content"><div class="u-button-group u-split">
    <button class="u-button u-split-pre">
        打印
    </button>
    <div class="u-button-group u-split-sub">
        <button class="u-button u-dropdown-toggle" id="split">
            <span class=" fa fa-angle-down "></span>
        </button>
        <ul class="u-menu u-menu-bottom-right" for="split">
            <li class="u-menu-item"><a>报价单</a></li>
            <li class="u-menu-item"><a>到货单</a></li>
        </ul>
    </div>
</div>
</div>
<div class="examples-code"><pre><code>&lt;div class="u-button-group u-split">
    &lt;button class="u-button u-split-pre">
        打印
    &lt;/button>
    &lt;div class="u-button-group u-split-sub">
        &lt;button class="u-button u-dropdown-toggle" id="split">
            &lt;span class=" fa fa-angle-down ">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-bottom-right" for="split">
            &lt;li class="u-menu-item">&lt;a>报价单&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a>到货单&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
&lt;/div></code></pre>
</div>

﻿##圆形按钮


在含有“u-button”样式的button上添加“floating”样式，即可实现圆形按钮。
<div class="example-content"><button class="u-button floating">
    <i class="fa fa-plus"></i>
</button>
<button class="u-button floating accent">
    <i class="fa fa-plus"></i>
</button>
<button class="u-button floating primary">
    <i class="fa fa-plus"></i>
</button>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button floating">
    &lt;i class="fa fa-plus">&lt;/i>
&lt;/button>
&lt;button class="u-button floating accent">
    &lt;i class="fa fa-plus">&lt;/i>
&lt;/button>
&lt;button class="u-button floating primary">
    &lt;i class="fa fa-plus">&lt;/i>
&lt;/button></code></pre>
</div>

﻿##圆角按钮


圆角和直角按钮来区分不同的行为风格.对应的样式分别为：u-button-round ，.u-button-squared
<div class="example-content"><button class="u-button raised primary u-button-round">圆形按钮
</button>
<button class="u-button raised primary u-button-squared">圆形按钮
</button>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button raised primary u-button-round">圆形按钮
&lt;/button>
&lt;button class="u-button raised primary u-button-squared">圆形按钮
&lt;/button></code></pre>
</div>

##基本菜单按钮

菜单按钮包括一个普通的button按钮和一个下拉内容ul元素。显示效果有4种，
分别为：显示在按钮下方，左对齐、显示在按钮下方，右对齐、显示在按钮上方，左对齐、显示在按钮上方，右对齐。

具体使用

* 创建button元素，添加id属性，属性值可以自己定义 点击它时，菜单会进行隐藏或者显示。

* 创建样式为“u-menu”的ul下拉列表，用于包括菜单内容。ul上定义for属性，属性值与第一步创建button中的id对应。菜单的样式还可以选择“u-menu-bottom-left”、“u-menu-bottom-right”、“u-menu-top-left”、“u-menu-top-right”中的一个来表示菜单相对于按钮的显示位置。

* 在ul标签内，使用样式为“u-menu-item”的li标签定义菜单的具体内容，当li标签不可用时，可以添加“disabled”属性。


<div class="example-content"><button class="u-button  raised u-menu-button" id="demo-menu-lower-right1">
    联查
    <span class="u-right-icon fa fa-angle-down"></span>
</button>
<ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right1">
    <li class="u-menu-item "><a>报价单</a></li>
    <li class="u-menu-item"><a>到货单</a></li>
</ul>
</div>
<div class="examples-code"><pre><code>&lt;button class="u-button  raised u-menu-button" id="demo-menu-lower-right1">
    联查
    &lt;span class="u-right-icon fa fa-angle-down">&lt;/span>
&lt;/button>
&lt;ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right1">
    &lt;li class="u-menu-item ">&lt;a>报价单&lt;/a>&lt;/li>
    &lt;li class="u-menu-item">&lt;a>到货单&lt;/a>&lt;/li>
&lt;/ul></code></pre>
</div>


<!--### 示例1

示例1说明

### 示例2

示例2说-->

