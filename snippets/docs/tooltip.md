# tooltip控件

当您想要描述一个链接的时候，提示工具（Tooltip）就显得非常有用。

# 如何使用

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

## 创建Tooltip对象

###描述
创建一个Tooltip对象，方法：new u.Tooltip(paramter)

###参数paramter字段说明

* 类型 ：object
* 内容说明
	
	title ：显示内容

	colorLevel：显示颜色的级别`tooltip-primary`、`tooltip-info`、`tooltip-warning`、`tooltip-success`、`tooltip-danger`不同样式代表不同的颜色情感

	placement： 显示的位置`top`、`bottom`、`left`、`right`，默认为向上显示（top）
###例子

	var rightTip=new u.Tooltip(righttoolEle,{
		title:'向右显示',
		placement:'right',
		colorLevel:'tooltip-primary'
	});
