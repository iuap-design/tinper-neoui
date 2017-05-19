## 面包屑

用于带有层次的导航，active状态表明当前页面的位置

#### 如何使用

给父元素添加`.u-breadcrumb`,自定义导航结构的分隔符


### 基础

"/"为分隔符

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





### 图标面包屑

"/"为分隔符,并添加Home icon

<div class="examples-code"><pre><code>

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




### 其他分隔符

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

<div class="examples-code"><pre><code>
.md-home:before {
    content: "\e6a2";
    font-family: 'uf';
}</code></pre>
</div>


