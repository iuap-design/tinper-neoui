# modal控件

区分与message,显示更多的信息,且自带确认取消回调。

# 插件依赖

依赖于 http://design.yyuap.com/static/uui/latest/js/u.js

# 用法

1.定义触发弹出事件的DOM

```
<button id="modalBtn" class="u-button" >Success</button>

```

2.js 定义应用范围

```
u.compMgr.apply({
        el:'body'
})

```

3.获取dom

```
var msgBtn2 = document.body.querySelector("#msgDialogBtn2");

```


4.绑定modal事件

```
u.on(msgBtn2,'click', function(){
        u.confirmDialog({
            msg: "是否保存单据？",       //modal内容
            title: "测试确认",           //modal title
            onOk: function () {          //确认后的回调
                alert('ok')
            },
            onCancel: function () {		 //取消后的回调
                alert('cancel')
            }
        });
})

```

# 示例


##消息摸态框

通过`confirmDialog`方法调出模态框
当点击取消或者保存，可在js中的方法里进行业务的回调 

<div class="example-content"><button id="msgDialogBtn2" class="u-button raised accent">消息确认框</button></div>
<div class="example-content ex-hide"><script>u.compMgr.apply({
        el:'body'
})
var msgBtn2 = document.body.querySelector("#msgDialogBtn2");
u.on(msgBtn2,'click', function(){
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
</script></div>

##自定义摸态框

通过`dialog`方法调出模态框
用户自定在html文件自定义所要展现的内容
点击保存，做进一步的确认校验

<div class="example-content"><button id="msgDialogBtn3" class="u-button raised accent">模态框</button>
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
</div></div>
<div class="example-content ex-hide"><script>u.compMgr.apply({
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
</script></div>

##提示摸态框

只有一个确认按钮
通过`messageDialog`方法调出模态框


<div class="example-content"><button id="msgDialogBtn" class="u-button raised accent">消息提示框</button>

   </div>
<div class="example-content ex-hide"><script>u.compMgr.apply({
    el:'body'
})
var msgBtn = document.body.querySelector("#msgDialogBtn");
u.on(msgBtn, 'click', function() {
    //            u.showMessage("HELLO!!!");
    u.messageDialog({ msg: "HELLO!!!", title: "测试提示", btnText: "OK!" });
})

</script></div>



# API

##js方法与参数
<table>
  <tbody>
  	  <tr>
	    <td>名称</td>
	    <td>方法参数</td>
	    <td>回调方法</td>
	    <td>描述</td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>confirmDialog</td>
	    <td>1.msg  2.title</td>
	    <td>1.onOk 2.onCancel</td>
	    <td>确认和取消都有回调</td>
	    <td></td>
	  </tr>
	    <td>messageDialog</td>
	    <td>1.msg  2.title  3.btnText</td>
	    <td>无</td>
	    <td>只有确认按钮，自定义确认按钮字样btnText</td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>dialog</td>
	    <td>1.id  2.content  3.hasCloseMenu </td>
	    <td>自定义回调</td>
	    <td>id定义dialog唯一性,content自定义内容,可以是html.确认取消时间自行绑定</td>
	    <td></td>
	  </tr>
	</tbody>
</table>


