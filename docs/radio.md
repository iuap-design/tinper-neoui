# radio控件

radio提供了基本的单选框和不同色彩的单选框

# 如何使用

1、创建含有`u-radio`样式的label元素，并添加id属性，for的属性值用于标记唯一的radio。

	<label  class="u-radio" for="option-1">
	</label>
2、在第一步中label元素内创建type为radio的输入框，并且输入框的样式为`u-radio-button`，添加for属性，属性值
要与lable中的for属性值一致。
	
	 <label  class="u-radio" for="option-1">
    	<input type="radio" id="option-1" class="u-radio-button" name="options" value="1" checked>
	</label>
3、在第一步中label元素内创建含有`u-radio-label`样式的span元素用于描述radio的内容

	<label  class="u-radio" for="option-1">
    	<input type="radio" id="option-1" class="u-radio-button" name="options" value="1" checked>
    	<span class="u-radio-label">First</span>
	</label>

# 示例


##基础radio
在单选框中input元素添加`checked`、`disabled`来实现选中和不可用效果
<div class="example-content"><p>可用未选radio</p>
<label class="u-radio" for="option-1">
    <input type="radio" id="option-1" class="u-radio-button" name="options" value="1">
    <span class="u-radio-label">First</span>
</label>
<p>可用已选radio</p>
<label class="u-radio" for="option-6">
    <input type="radio" id="option-6" class="u-radio-button" name="options" value="1" checked>
    <span class="u-radio-label">First</span>
</label>
<p>不可用未选radio</p>
<label class="u-radio" for="option-2">
    <input type="radio" disabled id="option-2" class="u-radio-button" name="options" value="2">
    <span class="u-radio-label">Second</span>
</label>
<p>不可用已选radio</p>
<label class="u-radio" for="option-3">
    <input type="radio" disabled checked id="option-3" class="u-radio-button" name="options1" value="3">
    <span class="u-radio-label">Second</span>
</label>
</div>
<div class="examples-code"><pre><code>&lt;p>可用未选radio&lt;/p>
&lt;label class="u-radio" for="option-1">
    &lt;input type="radio" id="option-1" class="u-radio-button" name="options" value="1">
    &lt;span class="u-radio-label">First&lt;/span>
&lt;/label>
&lt;p>可用已选radio&lt;/p>
&lt;label class="u-radio" for="option-6">
    &lt;input type="radio" id="option-6" class="u-radio-button" name="options" value="1" checked>
    &lt;span class="u-radio-label">First&lt;/span>
&lt;/label>
&lt;p>不可用未选radio&lt;/p>
&lt;label class="u-radio" for="option-2">
    &lt;input type="radio" disabled id="option-2" class="u-radio-button" name="options" value="2">
    &lt;span class="u-radio-label">Second&lt;/span>
&lt;/label>
&lt;p>不可用已选radio&lt;/p>
&lt;label class="u-radio" for="option-3">
    &lt;input type="radio" disabled checked id="option-3" class="u-radio-button" name="options1" value="3">
    &lt;span class="u-radio-label">Second&lt;/span>
&lt;/label></code></pre>
</div>

##不同色彩radio
在单选框中label里面添加`u-radio-success`、`u-radio-info`、`u-radio-warning`、`u-radio-danger`、`u-radio-dark`样式来实现不同色彩的单选框
<div class="example-content"><label class="u-radio u-radio-success" >
    <input type="radio" class="u-radio-button"  checked>
    <span class="u-radio-label">green</span>
</label>
<label class="u-radio u-radio-info">
    <input type="radio" class="u-radio-button"   checked>
    <span class="u-radio-label">blue</span>
</label>
<label class="u-radio u-radio-warning">
    <input type="radio" class="u-radio-button"  checked>
    <span class="u-radio-label">yellow</span>
</label>
<label class="u-radio u-radio-danger">
    <input type="radio" class="u-radio-button"   checked>
    <span class="u-radio-label">red</span>
</label>
<label class="u-radio u-radio-dark">
    <input type="radio" class="u-radio-button"  checked>
    <span class="u-radio-label">grey</span>
</label>
</div>
<div class="examples-code"><pre><code>&lt;label class="u-radio u-radio-success" >
    &lt;input type="radio" class="u-radio-button"  checked>
    &lt;span class="u-radio-label">green&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-info">
    &lt;input type="radio" class="u-radio-button"   checked>
    &lt;span class="u-radio-label">blue&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-warning">
    &lt;input type="radio" class="u-radio-button"  checked>
    &lt;span class="u-radio-label">yellow&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-danger">
    &lt;input type="radio" class="u-radio-button"   checked>
    &lt;span class="u-radio-label">red&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-dark">
    &lt;input type="radio" class="u-radio-button"  checked>
    &lt;span class="u-radio-label">grey&lt;/span>
&lt;/label></code></pre>
</div>




