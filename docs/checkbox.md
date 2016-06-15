# checkbox控件

checkbox提供了基础复选框、不同色彩复选框、图片复选框、个性复选框

# 如何使用
1、创建含有“u-checkbox”样式的label元素，并添加for属性，for的属性值用于标记唯一的checkbox。

	<label class="u-checkbox" for="checkbox-1"></label>

2、在label标签中创建type为checkbox的输入框，并且输入框的样式为“u-checkbox-input”，添加id属性，属性值
要与lable中的for属性值一致。

	<label class="u-checkbox" for="checkbox-1">
		<input type="checkbox" id="checkbox-1" class="u-checkbox-input">
	</label>

3、在label标签中继续添加含有“u-checkbox-label”样式的span元素用于描述checkbox的内容。

	<label class="u-checkbox" for="checkbox-1">
		<input type="checkbox" id="checkbox-1" class="u-checkbox-input">
		<span class="u-checkbox-label">我是描述</span>
	</label>

# 示例


##基础checkbox
在复选框中input元素添加“checked”、“disabled”来实现选中和不可用效果
<div class="example-content"><p>已选checkbox</p>
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
</div>
<div class="examples-code"><pre><code>&lt;p>已选checkbox&lt;/p>
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
</div>

##图片checkbox
在“u-checkbox-label”的span中添加图片说明即可。
<div class="example-content"><label  class="u-checkbox w-64">
    <input type="checkbox" class="u-checkbox-input" checked>
    <span class="u-checkbox-label"><img src="../static/checkbox-1.png" height="30" width="30"></span>
</label>


<label  class="u-checkbox w-64">
    <input type="checkbox" class="u-checkbox-input" >
    <span class="u-checkbox-label"><img src="../static/checkbox-2.png" height="30" width="30"></span>
</label>
</div>
<div class="examples-code"><pre><code>&lt;label  class="u-checkbox w-64">
    &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;span class="u-checkbox-label">&lt;img src="../static/checkbox-1.png" height="30" width="30">&lt;/span>
&lt;/label>


&lt;label  class="u-checkbox w-64">
    &lt;input type="checkbox" class="u-checkbox-input" >
    &lt;span class="u-checkbox-label">&lt;img src="../static/checkbox-2.png" height="30" width="30">&lt;/span>
&lt;/label></code></pre>
</div>

##个性的checkbox
此复选框经常在电商平台中使用。只需在lable标签中添加“u-checkbox-labelauty”样式
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
</style>
<div class="example-content"><label  class="u-checkbox u-checkbox-labelauty">
    <input type="checkbox" class="u-checkbox-input" checked>
    <span class="u-checkbox-label">30天免息</span>
</label>
</div>
<div class="examples-code"><pre><code>.u-checkbox-labelauty {
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
</div>
<div class="examples-code"><pre><code>&lt;label  class="u-checkbox u-checkbox-labelauty">
    &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;span class="u-checkbox-label">30天免息&lt;/span>
&lt;/label></code></pre>
</div>

##不同颜色的checkbox
在复选框中label里面添加“ u-checkbox-success”、“u-checkbox-info”、“u-checkbox-warning”、“u-checkbox-danger”、“u-checkbox-dark”样式来实现不同色彩的复选框
<div class="example-content"><label  class="u-checkbox u-checkbox-success w-64">
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
</div>
<div class="examples-code"><pre><code>&lt;label  class="u-checkbox u-checkbox-success w-64">
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
</div>


