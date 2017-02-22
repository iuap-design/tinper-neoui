# breadcrumb控件

用于带有层次的导航，active状态表明当前页面的位置

# 如何使用

给父元素添加`.u-breadcrumb`,自定义导航结构的分隔符

# 示例





## 默认面包屑

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



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>

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



</div>

## 图标面包屑

"/"为分隔符,并添加Home icon

<div class="example-content">
<ol class="u-breadcrumb">
    <li><a class="icon md-home u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Data</li>
</ol>
<ol class="u-breadcrumb breadcrumb-arrow">
    <li><a class="icon md-home u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol></div>

<div class="example-content ex-hide"><style>
.md-home:before {
    content: "\e6a2";
    font-family: 'uf';
}
</style></div>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>

&lt;ol class="u-breadcrumb">
    &lt;li>&lt;a class="icon md-home u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li class="active">Data&lt;/li>
&lt;/ol>
&lt;ol class="u-breadcrumb breadcrumb-arrow">
    &lt;li>&lt;a class="icon md-home u-link" href="javascript:void(0)">Home&lt;/a>&lt;/li>
    &lt;li>&lt;a class="u-link" href="javascript:void(0)">Library&lt;/a>&lt;/li>
    &lt;li class="active">Data&lt;/li>
&lt;/ol></code></pre>
</div>

<div class="examples-code"><pre><code>
.md-home:before {
    content: "\e6a2";
    font-family: 'uf';
}</code></pre>
</div>


</div>

## ">>"为分隔符的面包屑
<div class="example-content">
<ol class="u-breadcrumb u-breadcrumb-arrow">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Library</li>
</ol>
<ol class="u-breadcrumb u-breadcrumb-arrow">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol></div>

<div class="example-content ex-hide"><style>
.md-home:before {
    content: "\e6a2";
    font-family: 'uf';
}
</style></div>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>

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

<div class="examples-code"><pre><code>
.md-home:before {
    content: "\e6a2";
    font-family: 'uf';
}</code></pre>
</div>


</div>