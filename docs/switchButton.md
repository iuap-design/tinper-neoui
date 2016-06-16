# switch控件

switch控件

# 如何使用

暂无

# 示例


##不可以用的switch

在 input 添加disabled属性
<div class="example-content"><div class="example">
    <label class="u-switch u-switch-info" for="switch-info-disable">
        <input type="checkbox" id="switch-info-disable" class="u-switch-input" disabled>
        <span class="u-switch-label"></span>
    </label>
</div>
<div class="example">
    <label class="u-switch u-switch-info" for="switch-info-checkdisalbed">
        <input type="checkbox" id="switch-info-checkdisalbed" class="u-switch-input" checked disabled>
        <span class="u-switch-label"></span>
    </label>
</div>
</div>
<style>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}

</style>
<div class="examples-code"><pre><code>&lt;div class="example">
    &lt;label class="u-switch u-switch-info" for="switch-info-disable">
        &lt;input type="checkbox" id="switch-info-disable" class="u-switch-input" disabled>
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>
&lt;div class="example">
    &lt;label class="u-switch u-switch-info" for="switch-info-checkdisalbed">
        &lt;input type="checkbox" id="switch-info-checkdisalbed" class="u-switch-input" checked disabled>
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}
</code></pre>
</div>

##基础switch

input 的 id 与 label 的 for 属性值保持一致
<div class="example-content">
<label class="u-switch u-switch-info" for="switch-info-unchecked">
    <input type="checkbox" id="switch-info-unchecked" class="u-switch-input">
    <span class="u-switch-label"></span>
</label>

<label class="u-switch u-switch-info" for="switch-info-checked">
    <input type="checkbox" id="switch-info-checked" class="u-switch-input" checked>
    <span class="u-switch-label"></span>
</label>
</div>
<style>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}

</style>
<div class="examples-code"><pre><code>
&lt;label class="u-switch u-switch-info" for="switch-info-unchecked">
    &lt;input type="checkbox" id="switch-info-unchecked" class="u-switch-input">
    &lt;span class="u-switch-label">&lt;/span>
&lt;/label>

&lt;label class="u-switch u-switch-info" for="switch-info-checked">
    &lt;input type="checkbox" id="switch-info-checked" class="u-switch-input" checked>
    &lt;span class="u-switch-label">&lt;/span>
&lt;/label></code></pre>
</div>
<div class="examples-code"><pre><code>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}
</code></pre>
</div>

##不同颜色的switch

在 label 添加样式属性
目前支持六种 u-switch-primary u-switch-success u-switch-info u-switch-warning u-switch-danger u-switch-dark
<style>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}

</style>
<div class="example-content"><div class="example">
    <label class="u-switch u-switch-primary" for="switch-primary">
        <input type="checkbox" id="switch-primary" class="u-switch-input" checked="true">
        <span class="u-switch-label"></span>
    </label>
</div>

<div class="example">
    <label class="u-switch u-switch-success" for="switch-success">
        <input type="checkbox" id="switch-success" class="u-switch-input" checked>
        <span class="u-switch-label"></span>
    </label>
</div>

<div class="example">
    <label class="u-switch u-switch-info" for="switch-info">
        <input type="checkbox" id="switch-info" class="u-switch-input" checked>
        <span class="u-switch-label"></span>
    </label>
</div>

<div class="example">
    <label class="u-switch u-switch-warning" for="switch-warning">
        <input type="checkbox" id="switch-warning" class="u-switch-input" checked>
        <span class="u-switch-label"></span>
    </label>
</div>

<div class="example">
    <label class="u-switch u-switch-danger" for="switch-danger">
        <input type="checkbox" id="switch-danger" class="u-switch-input" checked>
        <span class="u-switch-label"></span>
    </label>
</div>

<div class="example">
    <label class="u-switch u-switch-dark" for="switch-dark">
        <input type="checkbox" id="switch-dark" class="u-switch-input" checked>
        <span class="u-switch-label"></span>
    </label>
</div>

</div>
</div>
<div class="examples-code"><pre><code>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}
</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example">
    &lt;label class="u-switch u-switch-primary" for="switch-primary">
        &lt;input type="checkbox" id="switch-primary" class="u-switch-input" checked="true">
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>

&lt;div class="example">
    &lt;label class="u-switch u-switch-success" for="switch-success">
        &lt;input type="checkbox" id="switch-success" class="u-switch-input" checked>
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>

&lt;div class="example">
    &lt;label class="u-switch u-switch-info" for="switch-info">
        &lt;input type="checkbox" id="switch-info" class="u-switch-input" checked>
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>

&lt;div class="example">
    &lt;label class="u-switch u-switch-warning" for="switch-warning">
        &lt;input type="checkbox" id="switch-warning" class="u-switch-input" checked>
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>

&lt;div class="example">
    &lt;label class="u-switch u-switch-danger" for="switch-danger">
        &lt;input type="checkbox" id="switch-danger" class="u-switch-input" checked>
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>

&lt;div class="example">
    &lt;label class="u-switch u-switch-dark" for="switch-dark">
        &lt;input type="checkbox" id="switch-dark" class="u-switch-input" checked>
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>

&lt;/div></code></pre>
</div>

##不同尺寸的switch

在 label 添加样式属性
目前支持三种 u-switch-lg u-switch-default u-switch-sm
<div class="example-content"><div class="switch-example">
    <label class="u-switch u-switch-primary u-switch-lg" for="switch-primary-lg">
        <input type="checkbox" id="switch-primary-lg" class="u-switch-input" checked="true">
        <span class="u-switch-label"></span>
    </label>
</div>
<div class="switch-example">
    <label class="u-switch u-switch-primary u-switch-default" for="switch-primary-default">
        <input type="checkbox" id="switch-primary-default" class="u-switch-input" checked="true">
        <span class="u-switch-label"></span>
    </label>
</div>
<div class="switch-example">
    <label class="u-switch u-switch-primary u-switch-sm" for="switch-primary-sm">
        <input type="checkbox" id="switch-primary-sm" class="u-switch-input" checked="true">
        <span class="u-switch-label"></span>
    </label>
</div>
</div>
<style>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}

</style>
<div class="examples-code"><pre><code>&lt;div class="switch-example">
    &lt;label class="u-switch u-switch-primary u-switch-lg" for="switch-primary-lg">
        &lt;input type="checkbox" id="switch-primary-lg" class="u-switch-input" checked="true">
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>
&lt;div class="switch-example">
    &lt;label class="u-switch u-switch-primary u-switch-default" for="switch-primary-default">
        &lt;input type="checkbox" id="switch-primary-default" class="u-switch-input" checked="true">
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div>
&lt;div class="switch-example">
    &lt;label class="u-switch u-switch-primary u-switch-sm" for="switch-primary-sm">
        &lt;input type="checkbox" id="switch-primary-sm" class="u-switch-input" checked="true">
        &lt;span class="u-switch-label">&lt;/span>
    &lt;/label>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>
.example{
    padding: 0 10px 20px;
    float: left;
}
h3{
    clear: both;
    padding-top: 10px;
}
.switch-example{    
    height: 57px;
    float: left;
    width: 104px;
}
</code></pre>
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
