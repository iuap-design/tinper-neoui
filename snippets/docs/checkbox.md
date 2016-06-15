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

replaceExamp

