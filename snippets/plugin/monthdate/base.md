## 月日

用户可以通过此插件进行月日的选择。




[试一试](http://tinper.org/webide/#/demos/ui/monthdate)

### API

#### MonthDate 对象

* 类型：`Object`
* 说明： MonthDate表示一个月日对象
* 用法：

获取方式：1、获取绑定月日的dom元素 ； 2、读取dom元素上的属性'u.MonthDate'

```

var monthDateObject = document.getElementById('domId')['u.MonthDate'];

```

**注：** 如果获取的月日对象为空，原因为月日没有初始化成功，可以先调用`u.compMgr.updateComp();`来初始化页面中的控件。然后再获取月日对象。


#### setValue
* 类型： `Function`
* 说明：设置具体的月日
* 参数：
	* `{String} value` 具体格式："MM-DD"
* 用法：

```
monthDateObject.setValue('02-15');

```


相关内容：

[月日在kero中使用](http://tinper.org/dist/kero/docs/ex_yearmonth.html)    
