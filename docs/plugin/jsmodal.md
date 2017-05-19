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


### 自定义摸态框

通过`dialog`方法调出模态框
用户自定在html文件自定义所要展现的内容
点击保存，做进一步的确认校验

<div class="examples-code"><pre><code>
&lt;button id="msgDialogBtn3" class="u-button raised accent">模态框&lt;/button>
&lt;div id="dialog_content" style="display:none;">
	&lt;div class="u-msg-title">
		&lt;h4>单据名称&lt;/h4>
	&lt;/div>
	&lt;div class="u-msg-content">
		&lt;p>单据内容区&lt;/p>
	&lt;/div>
	&lt;div class="u-msg-footer">
		&lt;button class="u-msg-ok u-button">保存&lt;span class="u-button-container">&lt;span class="u-ripple">&lt;/span>&lt;/span>&lt;/button>
		&lt;button class="u-msg-cancel u-button">取消&lt;span class="u-button-container">&lt;span class="u-ripple">&lt;/span>&lt;/span>&lt;/button>
	&lt;/div>
&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
u.compMgr.apply({
    el:'body'
})
var msgBtn3 = document.body.querySelector("#msgDialogBtn3");
u.on(msgBtn3,'click', function(){
	window.md = u.dialog({id:'testDialg',content:"#dialog_content",hasCloseMenu:true});
});

var okButton = document.body.querySelector(".u-msg-ok");
u.on(okButton,'click', function(){
	alert('ok');
});

var cancelButton = document.body.querySelector(".u-msg-cancel");
u.on(cancelButton,'click', function(){
	md.close();
});</code></pre>

