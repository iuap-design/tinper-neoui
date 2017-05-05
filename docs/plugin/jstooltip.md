# tooltip控件

当您想要描述一个链接的时候，提示工具（Tooltip）就显得非常有用。

# 插件依赖

依赖于 http://design.yonyoucloud.com/static/uui/latest/js/u.js

# 用法

## 创建tooltip对象
```
var toptip=new u.Tooltip(toptoolEle,{
title:'默认向上显示'
});

```
## 参数设置
创建对象时，添加显示内容title、显示位置placement、显示颜色级别colorLevel

# API
### JS 方法参数
<table>
  <tbody>
  	  <tr>
	    <td>名称</td>
	    <td>参数</td>
	    <td>描述</td>
	    <td></td>
	  </tr>
	  <tr>
	    <td>new u.Tooltip()</td>
	    <td>1.title:显示内容 2.placement:显示方向 3.colorLevel:颜色主体</td>
	    <td>
	    	1.colorLevel：取值范围tooltip-primary、tooltip-info、tooltip-warning、tooltip-success、tooltip-danger
			2.placement： 取值范围top、bottom、left、right，默认top</td>
	    <td></td>
	  </tr>
	</tbody>
</table>

# 示例




## 普通tooltip

<div class="examples-code"><pre><code>
&lt;div id='example'>
	&lt;label id="top" class="ws">上提示&lt;/label>
	&lt;label id="down" class="ws">下提示&lt;/label>
	&lt;label id="left" class="ws">左提示&lt;/label>
	&lt;label id="right" class="ws">右提示&lt;/label>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.ws{
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 </code></pre>
</div>

<pre class="examples-code"><code>
var toptoolEle=document.getElementById('top');
var bottomtoolEle=document.getElementById('down');
var lefttoolEle=document.getElementById('left');
var righttoolEle=document.getElementById('right');

var toptip=new u.Tooltip(toptoolEle,{
title:'默认向上显示'
});


var bottomtip=new u.Tooltip(bottomtoolEle,{
title:'向下显示',
placement:'bottom'

});

var leftTip=new u.Tooltip(lefttoolEle,{
title:'向左显示',
placement:'left'
});

var rightTip=new u.Tooltip(righttoolEle,{
title:'向右显示',
placement:'right'
});</code></pre>



## 批量生成tooltip

<div class="examples-code"><pre><code>
&lt;div id='example'>
	&lt;label class="ws tl-ws">批量提示&lt;/label>
	&lt;label class="ws tl-ws">批量提示&lt;/label>
	&lt;label class="ws tl-ws">批量提示&lt;/label>
	&lt;label class="ws tl-ws">批量提示&lt;/label>
&lt;/div>
</code></pre>
</div>

<div class="examples-code"><pre><code>
.ws{
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 </code></pre>
</div>

<pre class="examples-code"><code>
var toptoolEle=$('.tl-ws');
// var toptoolEle=document.getElementsByClassName('ws');也可以这样

var toptip=new u.Tooltip(toptoolEle,{
title:'批量向上显示'
});
</code></pre>

