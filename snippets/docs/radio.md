# radio控件

radio提供了基本的单选框和不同色彩的单选框

# 如何使用

1、创建含有“u-radio”样式的label元素，并添加id属性，for的属性值用于标记唯一的radio。

	<label  class="u-radio" for="option-1">
	</label>
2、在第一步中label元素内创建type为radio的输入框，并且输入框的样式为“u-radio-button”，添加for属性，属性值
要与lable中的for属性值一致。
	
	 <label  class="u-radio" for="option-1">
    	<input type="radio" id="option-1" class="u-radio-button" name="options" value="1" checked>
	</label>
3、在第一步中label元素内创建含有“u-radio-label”样式的span元素用于描述radio的内容

	<label  class="u-radio" for="option-1">
    	<input type="radio" id="option-1" class="u-radio-button" name="options" value="1" checked>
    	<span class="u-radio-label">First</span>
	</label>

# 示例

replaceExamp



