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

replaceExamp


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


