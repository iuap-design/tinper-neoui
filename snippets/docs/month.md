# 月份

用户可以通过此插件进行月份的选择。

replaceExamp


[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/month)


# API

## \# Month 对象

* 类型：`Object`
* 说明： Month表示一个月对象
* 用法：

获取方式：1、获取绑定月的dom元素 ； 2、读取dom元素上的属性'u.Month'

```

var monthObject = document.getElementById('domId')['u.Month'];

```


## \# setValue 
* 类型： `Function`
* 说明：设置具体的月份
* 参数：
	* `{String} value` value的范围为1~12，不在这个范围会按当前月份处理
* 用法：

```
monthObject.setValue(2);

```


相关内容：

[月份在kero中使用](http://design.yyuap.com/dist/pages/kero/ex_month.html)    

[月份在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)







