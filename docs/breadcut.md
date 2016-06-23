# breadcut控件

用于带有层次的导航，active状态表明当前页面的位置

# 如何使用

给父元素添加`.u-breadcrumb`,自定义导航结构的分隔符

# 示例


##面包屑

<<<<<<< HEAD
=======
"/"为分隔符

<div class="example-content">
<ol class="u-breadcrumb">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Library</li>
</ol>
<ol class="u-breadcrumb">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol>

</div>
<div class="examples-code"><pre><code>
&lt;ol class="u-breadcrumb">
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li class="active">Library&lt;/li>
&lt;/ol>
&lt;ol class="u-breadcrumb">
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Library&lt;/a>&lt;/li>
    &lt;li class="active">Data&lt;/li>
&lt;/ol>
</code></pre>
</div>

##面包屑

>>>>>>> eb19c08bbbc1281f37d827e3eefc1803a1b61497
"/"为分隔符,并添加Home icon

<div class="csstag" style="display:none">.md-home:before {
    content: "\f015";
    font-family: 'FontAwesome';
}
</div>
<div class="example-content">
<ol class="u-breadcrumb">
    <li><a class="icon md-home u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Data</li>
</ol>
<ol class="u-breadcrumb breadcrumb-arrow">
    <li><a class="icon md-home u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol>
</div>
<div class="examples-code"><pre><code>.md-home:before {
    content: "\f015";
    font-family: 'FontAwesome';
}</code></pre>
</div>
<div class="examples-code"><pre><code>
&lt;ol class="u-breadcrumb">
    &lt;li>&lt;a class="icon md-home u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li class="active">Data&lt;/li>
&lt;/ol>
&lt;ol class="u-breadcrumb breadcrumb-arrow">
    &lt;li>&lt;a class="icon md-home u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Library&lt;/a>&lt;/li>
    &lt;li class="active">Data&lt;/li>
<<<<<<< HEAD
&lt;/ol></code></pre>
</div>

##面包屑

"/"为分隔符

<div class="example-content">
<ol class="u-breadcrumb">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Library</li>
</ol>
<ol class="u-breadcrumb">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol>

</div>
<div class="examples-code"><pre><code>
&lt;ol class="u-breadcrumb">
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li class="active">Library&lt;/li>
&lt;/ol>
&lt;ol class="u-breadcrumb">
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Library&lt;/a>&lt;/li>
    &lt;li class="active">Data&lt;/li>
&lt;/ol>
</code></pre>
</div>

=======
&lt;/ol></code></pre>
</div>

>>>>>>> eb19c08bbbc1281f37d827e3eefc1803a1b61497
##基础Tree
##面包屑

">>"为分隔符

<div class="csstag" style="display:none">.md-home:before {
    content: "\f015";
    font-family: 'FontAwesome';
}
</div>
<div class="example-content">
<ol class="u-breadcrumb u-breadcrumb-arrow">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Library</li>
</ol>
<ol class="u-breadcrumb u-breadcrumb-arrow">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol>
</div>
<div class="examples-code"><pre><code>.md-home:before {
    content: "\f015";
    font-family: 'FontAwesome';
}</code></pre>
</div>
<div class="examples-code"><pre><code>
&lt;ol class="u-breadcrumb u-breadcrumb-arrow">
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li class="active">Library&lt;/li>
&lt;/ol>
&lt;ol class="u-breadcrumb u-breadcrumb-arrow">
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Library&lt;/a>&lt;/li>
    &lt;li class="active">Data&lt;/li>
&lt;/ol></code></pre>
</div>


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
