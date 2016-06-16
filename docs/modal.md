# madal控件

madal控件

# 如何使用

暂无

# 示例


##提示摸态框

只有一个确认按钮
通过messageDialog方法调出模态框


<script>u.compMgr.apply({
    el:'body'
})

var msgBtn = document.body.querySelector("#msgDialogBtn");
u.on(msgBtn, 'click', function() {
    //            u.showMessage("HELLO!!!");
    u.messageDialog({ msg: "HELLO!!!", title: "测试提示", btnText: "OK!" });
})

</script>
<div class="example-content">
<button id="msgDialogBtn" class="u-button raised accent">消息提示框</button>

   
</div>
<div class="examples-code"><pre><code>u.compMgr.apply({
    el:'body'
})

var msgBtn = document.body.querySelector("#msgDialogBtn");
u.on(msgBtn, 'click', function() {
    //            u.showMessage("HELLO!!!");
    u.messageDialog({ msg: "HELLO!!!", title: "测试提示", btnText: "OK!" });
})
</code></pre>
</div>
<div class="examples-code"><pre><code>
&lt;button id="msgDialogBtn" class="u-button raised accent">消息提示框&lt;/button>

   </code></pre>
</div>

##自定义摸态框

通过dialog方法调出模态框
用户自定在html文件自定义所要展现的内容
点击保存，做进一步的确认校验

<div class="example-content">
<button id="msgDialogBtn3" class="u-button raised accent">模态框</button>
<div id="dialog_content" style="display:none;">
	<div class="u-msg-title">
		<h4>单据名称</h4>
	</div>
	<div class="u-msg-content">
		<p>单据内容区</p>
	</div>
	<div class="u-msg-footer">
		<button class="u-msg-ok u-button">保存<span class="u-button-container"><span class="u-ripple"></span></span></button>
		<button class="u-msg-cancel u-button">取消<span class="u-button-container"><span class="u-ripple"></span></span></button>
	</div>
</div>
   
</div>
<script>  u.compMgr.apply({
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
	});
</script>
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
&lt;/div>
   </code></pre>
</div>
<div class="examples-code"><pre><code>  u.compMgr.apply({
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
</div>

##消息摸态框

通过confirmDialog方法调出模态框
当点击取消或者保存，可在js中的方法里进行业务的回调 

<script>  u.compMgr.apply({
        el:'body'
    })

 
    var msgBtn2 = document.body.querySelector("#msgDialogBtn2");
    u.on(msgBtn2,'click', function(){
//            u.showMessage("HELLO!!!");
        u.confirmDialog({
            msg: "是否保存单据？",
            title: "测试确认",
            onOk: function () {
                alert('ok')
            },
            onCancel: function () {
                alert('cancel')
            }
        });
    })
	
</script>
<div class="example-content">
<button id="msgDialogBtn2" class="u-button raised accent">消息确认框</button>

   
</div>
<div class="examples-code"><pre><code>  u.compMgr.apply({
        el:'body'
    })

 
    var msgBtn2 = document.body.querySelector("#msgDialogBtn2");
    u.on(msgBtn2,'click', function(){
//            u.showMessage("HELLO!!!");
        u.confirmDialog({
            msg: "是否保存单据？",
            title: "测试确认",
            onOk: function () {
                alert('ok')
            },
            onCancel: function () {
                alert('cancel')
            }
        });
    })
	</code></pre>
</div>
<div class="examples-code"><pre><code>
&lt;button id="msgDialogBtn2" class="u-button raised accent">消息确认框&lt;/button>

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
