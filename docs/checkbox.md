# checkbox控件

checkbox

# 如何使用

暂无

# 示例

<div class="example-head">基础checkbox</div>
<p>已选checkbox</p>
<label  class="u-checkbox w-64">
    <input type="checkbox" class="u-checkbox-input" checked>
    <span class="u-checkbox-label">Checkbox</span>
</label>
<p>未选checkbox</p>

<label  class="u-checkbox w-64">
    <input type="checkbox" class="u-checkbox-input" >
    <span class="u-checkbox-label">Checkbox</span>
</label>
<p>不可用未选checkbox</p>
<label  class="u-checkbox w-64"  >
    <input type="checkbox" class="u-checkbox-input" disabled>
    <span class="u-checkbox-label">Checkbox</span>
</label>
<p>不可用已选checkbox</p>
<label  class="u-checkbox w-64">
    <input type="checkbox" class="u-checkbox-input" disabled checked>
    <span class="u-checkbox-label">Checkbox</span>
</label>
<pre><code>&lt;p>已选checkbox&lt;/p>
&lt;label  class="u-checkbox w-64">
    &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;p>未选checkbox&lt;/p>

&lt;label  class="u-checkbox w-64">
    &lt;input type="checkbox" class="u-checkbox-input" >
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;p>不可用未选checkbox&lt;/p>
&lt;label  class="u-checkbox w-64"  >
    &lt;input type="checkbox" class="u-checkbox-input" disabled>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;p>不可用已选checkbox&lt;/p>
&lt;label  class="u-checkbox w-64">
    &lt;input type="checkbox" class="u-checkbox-input" disabled checked>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label></code></pre>
<div class="example-head">不同颜色的checkbox</div>
<label  class="u-checkbox u-checkbox-success w-64">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">green</span>
</label>

<label  class="u-checkbox u-checkbox-info w-64">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">blue</span>
</label>
<label  class="u-checkbox u-checkbox-warning w-64">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">yellow</span>
</label>
<label  class="u-checkbox u-checkbox-danger w-64">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">red</span>
</label>
<label  class="u-checkbox u-checkbox-dark w-64">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">grey</span>
</label>
<pre><code>&lt;label  class="u-checkbox u-checkbox-success w-64">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">green&lt;/span>
&lt;/label>

&lt;label  class="u-checkbox u-checkbox-info w-64">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">blue&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-warning w-64">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">yellow&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-danger w-64">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">red&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-dark w-64">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">grey&lt;/span>
&lt;/label></code></pre>
<div class="example-head">个性的checkbox</div>
<style>.u-checkbox-labelauty {
    width: auto;
    height: 32px;
    padding: 2px 8px;
    border: solid 1px #ccc;
}

.u-checkbox-labelauty:hover {
    border: solid 2px #e4393c;
    padding: 1px 7px;
    color: #e4393c;
}

.u-checkbox-labelauty.u-checkbox.is-upgraded {
    padding-left: 8px;
}

.u-checkbox-labelauty:hover.u-checkbox.is-upgraded, .u-checkbox-labelauty.is-upgraded.is-checked {
    padding-left: 7px;
}

.u-checkbox-labelauty.is-checked {
    border: solid 2px #e4393c;
    padding: 1px 7px;
}

.u-checkbox-labelauty .u-checkbox-label {
    display: inline-block;
}

.u-checkbox-labelauty .u-checkbox-outline {
    display: none;
}

.u-checkbox-labelauty.is-checked:before {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    content: ' ';
    border-left: 12px solid transparent;
    border-bottom: 12px solid #e4393c;
}

.u-checkbox-labelauty.is-checked:after {
    -webkit-transform: rotate(45deg) scale(.8);
    transform: rotate(45deg) scale(.8);
    position: absolute;
    right: 0;
    bottom: 0;
    display: table;
    width: 5px;
    height: 8px;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    content: ' ';
    -webkit-transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
    transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
}
</style><label  class="u-checkbox u-checkbox-labelauty">
    <input type="checkbox" class="u-checkbox-input" checked>
    <span class="u-checkbox-label">30天免息</span>
</label>
<pre><code>.u-checkbox-labelauty {
    width: auto;
    height: 32px;
    padding: 2px 8px;
    border: solid 1px #ccc;
}

.u-checkbox-labelauty:hover {
    border: solid 2px #e4393c;
    padding: 1px 7px;
    color: #e4393c;
}

.u-checkbox-labelauty.u-checkbox.is-upgraded {
    padding-left: 8px;
}

.u-checkbox-labelauty:hover.u-checkbox.is-upgraded, .u-checkbox-labelauty.is-upgraded.is-checked {
    padding-left: 7px;
}

.u-checkbox-labelauty.is-checked {
    border: solid 2px #e4393c;
    padding: 1px 7px;
}

.u-checkbox-labelauty .u-checkbox-label {
    display: inline-block;
}

.u-checkbox-labelauty .u-checkbox-outline {
    display: none;
}

.u-checkbox-labelauty.is-checked:before {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    content: ' ';
    border-left: 12px solid transparent;
    border-bottom: 12px solid #e4393c;
}

.u-checkbox-labelauty.is-checked:after {
    -webkit-transform: rotate(45deg) scale(.8);
    transform: rotate(45deg) scale(.8);
    position: absolute;
    right: 0;
    bottom: 0;
    display: table;
    width: 5px;
    height: 8px;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    content: ' ';
    -webkit-transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
    transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
}</code></pre>
<pre><code>&lt;label  class="u-checkbox u-checkbox-labelauty">
    &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;span class="u-checkbox-label">30天免息&lt;/span>
&lt;/label></code></pre>
<div class="example-head">图片checkbox</div>
<label  class="u-checkbox w-64">
    <input type="checkbox" class="u-checkbox-input" checked>
    <span class="u-checkbox-label"><img src="../static/checkbox-1.png" height="30" width="30"></span>
</label>


<label  class="u-checkbox w-64">
    <input type="checkbox" class="u-checkbox-input" >
    <span class="u-checkbox-label"><img src="../static/checkbox-2.png" height="30" width="30"></span>
</label>
<pre><code>&lt;label  class="u-checkbox w-64">
    &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;span class="u-checkbox-label">&lt;img src="../static/checkbox-1.png" height="30" width="30">&lt;/span>
&lt;/label>


&lt;label  class="u-checkbox w-64">
    &lt;input type="checkbox" class="u-checkbox-input" >
    &lt;span class="u-checkbox-label">&lt;img src="../static/checkbox-2.png" height="30" width="30">&lt;/span>
&lt;/label></code></pre>


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
