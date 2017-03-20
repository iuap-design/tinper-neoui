## 模态框

用户自定义的内容以弹出对话框的形式显示，具有最小和最实用的功能集。


[试一试](http://tinper.org/webide/#/demos/ui/modalDialog)


### API

#### u.dialog 创建一个模态框

* 类型： `Function`
* 说明：创建一个模态框
* 参数：
	* `{Object} dialogParam` dialogParam包括了模态框的初始化所需字段。

下面对dialogParam具体字段内容进行说明。

| 字段名称      |字段类型       |字段说明  |默认值|
| ------------- |:-------------:| :-----:|----:|
| id      | String | 自定义dialog的id值，确定唯一性 |空|
| hasCloseMenu   | Boolean      |   是否含有右上角的关闭图标 | true|
| content  | String  |   具体内容的选择器(例如：#dialog_content，.dialog_content) |空|
| width   | String      |  模态框的宽度 | 空|
| height  | String  |   模态框的高度  |空|
| closeFun| Function  |   点击关闭按钮时触发的函数 |空|



* 用法：

```

var dialogParam ={ id:'testDialg',
			       content:"#dialog_content",
			       hasCloseMenu:true,
			       closeFun:closeFun
				 };

var dialogObject = u.dialog(dialogParam);

```

#### close 关闭模态框

* 类型： `Function`
* 说明：将显示的模态框关闭
* 用法：

```

dialogObject.close();//这里的dialog是通过上u.dialog创建的对象

```

#### show 显示模态框
* 类型： `Function`
* 说明：将隐藏的模态框显示
* 用法：

```

dialogObject.show();//这里的dialog是通过u.dialog创建的对象

```
