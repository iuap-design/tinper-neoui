# tooltip控件

当您想要描述一个链接的时候，提示工具（Tooltip）就显得非常有用。

# 插件依赖

依赖于 http://design.yyuap.com/static/uui/latest/js/u.js

# 用法

##创建tooltip对象
```
var toptip=new u.Tooltip(toptoolEle,{
title:'默认向上显示'
});

```
##参数设置
创建对象时，添加显示内容title、显示位置placement、显示颜色级别colorLevel

# 示例
replaceExamp


# API
###JS 方法参数
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
