# 徽章控件

徽章控件

# 如何使用

暂无

# 示例

<div class="example-head">基础按钮</div>
<div class="example-content"><button class="u-button raised">BUTTON</button>
<button class="u-button raised accent">BUTTON</button>
<button class="u-button raised primary">BUTTON</button>

</div><pre><code>&lt;button class="u-button raised">BUTTON&lt;/button>
&lt;button class="u-button raised accent">BUTTON&lt;/button>
&lt;button class="u-button raised primary">BUTTON&lt;/button>
</code></pre>
<div class="example-head">圆形按钮</div>
<div class="example-content"><button class="u-button floating">
    <i class="fa fa-plus"></i>
</button>
<button class="u-button floating accent">
    <i class="fa fa-plus"></i>
</button>
<button class="u-button floating primary">
    <i class="fa fa-plus"></i>
</button>

</div><pre><code>&lt;button class="u-button floating">
    &lt;i class="fa fa-plus">&lt;/i>
&lt;/button>
&lt;button class="u-button floating accent">
    &lt;i class="fa fa-plus">&lt;/i>
&lt;/button>
&lt;button class="u-button floating primary">
    &lt;i class="fa fa-plus">&lt;/i>
&lt;/button>
</code></pre>
<div class="example-head">不同颜色的badge 使用7个基础类。例如.badge-success或 .badge，配色情感含义与之前颜色样式版中的涵义相同。</div>
<div class="example-content"><button class="u-button">BUTTON</button>
<button class="u-button accent">BUTTON</button>
<button class="u-button primary">BUTTON</button>
</div><pre><code>&lt;button class="u-button">BUTTON&lt;/button>
&lt;button class="u-button accent">BUTTON&lt;/button>
&lt;button class="u-button primary">BUTTON&lt;/button></code></pre>
<div class="example-head">色彩按钮</div>
<div class="example-content"><button class="u-button  u-button-success">success</button>
<button class="u-button   u-button-info">info</button>
<button class="u-button   u-button-danger">danger</button>
<button class="u-button  u-button-warning">warning</button>
</div><pre><code>&lt;button class="u-button  u-button-success">success&lt;/button>
&lt;button class="u-button   u-button-info">info&lt;/button>
&lt;button class="u-button   u-button-danger">danger&lt;/button>
&lt;button class="u-button  u-button-warning">warning&lt;/button></code></pre>
<div class="example-head">多尺寸响应 
使用尺寸请添加类.btn-xg, .btn-lg,.btn-sm</div>
<div class="example-content"><button class="u-button raised primary u-button-xg">特大尺寸</button>

<button class="u-button raised primary u-button-lg">大尺寸</button>
<button class="u-button raised primary">默认尺寸
</button>
<button class="u-button raised primary u-button-sm">小尺寸</button>
</div><pre><code>&lt;button class="u-button raised primary u-button-xg">特大尺寸&lt;/button>

&lt;button class="u-button raised primary u-button-lg">大尺寸&lt;/button>
&lt;button class="u-button raised primary">默认尺寸
&lt;/button>
&lt;button class="u-button raised primary u-button-sm">小尺寸&lt;/button></code></pre>
<div class="example-head">宽按钮：如果想按钮充满，添加类 .u-button-block </div>
<div class="example-content"><div style="width:600px">
    <button class="u-button raised primary u-button-block">宽按钮
    </button>   
</div>
</div><pre><code>&lt;div style="width:600px">
    &lt;button class="u-button raised primary u-button-block">宽按钮
    &lt;/button>   
&lt;/div></code></pre>
<div class="example-head">圆角按钮： 圆角和直角来区分不同的行为风格.u-button-round ，.u-button-squared</div>
<div class="example-content"><button class="u-button raised primary u-button-round">圆形按钮
</button>
<button class="u-button raised primary u-button-squared">圆形按钮
</button>
</div><pre><code>&lt;button class="u-button raised primary u-button-round">圆形按钮
&lt;/button>
&lt;button class="u-button raised primary u-button-squared">圆形按钮
&lt;/button></code></pre>
<div class="example-head">
 左半圆样式：.u-button-pill-left和 .u-button-round一起使用

 右半圆样式： .u-button-pill-right 和 .u-button-round一起使用
</div>
<div class="example-content"><button class="u-button raised primary u-button-pill-left u-button-round">左半圆按钮
</button>
<button class="u-button raised primary u-button-pill-right u-button-squared">右半圆按钮
</button>
</div><pre><code>&lt;button class="u-button raised primary u-button-pill-left u-button-round">左半圆按钮
&lt;/button>
&lt;button class="u-button raised primary u-button-pill-right u-button-squared">右半圆按钮
&lt;/button></code></pre>
<div class="example-head">不同颜色的下拉按钮</div>
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
</div><pre><code>&lt;div class="u-row">
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
<div class="example-head">基本菜单按钮</div>
<div class="example-content"><button class="u-button  raised u-menu-button" id="demo-menu-lower-right1">
    联查
    <span class="u-right-icon fa fa-angle-down"></span>
</button>
<ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right1">
    <li class="u-menu-item "><a>报价单</a></li>
    <li class="u-menu-item"><a>到货单</a></li>
</ul>

</div><pre><code>&lt;button class="u-button  raised u-menu-button" id="demo-menu-lower-right1">
    联查
    &lt;span class="u-right-icon fa fa-angle-down">&lt;/span>
&lt;/button>
&lt;ul class="u-menu u-menu-bottom-right" for="demo-menu-lower-right1">
    &lt;li class="u-menu-item ">&lt;a>报价单&lt;/a>&lt;/li>
    &lt;li class="u-menu-item">&lt;a>到货单&lt;/a>&lt;/li>
&lt;/ul>
</code></pre>
<div class="example-head">分割按钮</div>
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

</div><pre><code>&lt;div class="u-button-group u-split">
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
&lt;/div>
</code></pre>


<!--### 示例1

示例1说明

### 示例2

示例2说-->

# API

## 属性

暂无
<!--### 属性1

属性1说明

### 属性2

属性2说明-->

## 方法

暂无
<!--### 方法1

方法1说明

### 方法2

方法2说明-->
