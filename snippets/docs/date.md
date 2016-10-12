# 日期

用户可以自定义日期的显示格式，默认返回的日期是年-月-日，也可以返回年-月-日 时:分:秒。


replaceExamp


[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/datetime)


用户可以在`u-datepicker`的dom元素添加format属性，来自定义日期的显示格式。具体fomat内容定义如下：

|         | 标记     | 输出结果  |
| ------------- |:-------------:| -----:|
| Year      | YY | 70 71 ... 29 30 |
|     | YYYY    |   1970 1971 ... 2029 2030 |
| Month | M     |   1 2 ... 11 12 |
|  | MM     |   01 02 ... 11 12 |
|  | MMM     |   1月 2月 ... 11月 12月 |
|  | MMMM     |   一月 二月 ... 十一月 十二月 |
| Day of Month | D     |   1 2 ... 30 31 |
|  | DD     |  01 02 ... 30 31 |
| Hour | H     |   0 1 ... 22 23 |
|  | HH     |  00 01 ... 22 23 |
|  | h   |  1 2 ... 11 12 |
|  | hh    |  01 02 ... 11 12 |
| Minute | m     |   0 1 ... 58 59 |
|  | mm     |  00 01 ... 58 59 |
| Second | s     |   0 1 ... 58 59 |
|  | ss     |  00 01 ... 58 59|
| 12小时制时间后缀 | a     |   am/pm |




# API

## \# DateTimePicker 对象

* 类型：`Object`
* 说明： DateTimePicker表示一个时间对象
* 用法：

获取方式：1、获取绑定日期的dom元素 ； 2、读取dom元素上的属性'u.DateTimePicker'

```

var dateObject = document.getElementById('domId')['u.DateTimePicker'];

```

**注：** 如果获取的日期对象为空，原因为日期没有初始化成功，可以先调用`u.compMgr.updateComp();`来初始化页面中的控件。然后再获取日期对象。

## \# setDate 
* 类型： `Function`
* 说明：设置具体的日期
* 参数：
	* `{String} dateStr` 具体格式："YYYY-MM-DD hh:mm:ss"
* 用法：

```
dateObject.setDate('2016-02-03');

```
## \# setEnable 

* 类型：`Function`
* 说明： 设置日期控件是否可用
* 参数：
	* `{Boolean} isEnable` 为`true`时可用，为`false`为不可用 
* 用法：

```

dateObject.setEnable(false);

```

## \# setStartDate 

* 类型：`Function`
* 说明： 设置可选时间范围的起始日期
* 参数：
	* `{String} startDate` 具体格式："YYYY-MM-DD"
* 用法：

```

dateObject.setStartDate('2016-01-01');

```

## \# setEndDate 

* 类型：`Function`
* 说明： 设置可选时间范围的结束日期
* 参数：
	* `{String} endDate` 具体格式："YYYY-MM-DD"
* 用法：

```

dateObject.setEndDate('2016-01-01');

```

## \# setFormat

* 类型：`Function`
* 说明： 规定日期的显示格式
* 参数：
	* `{String} format` 具体格式：参考format内容
* 用法：

```

dateObject.setFormat('YYYY');

```

相关内容：

[日期在kero中使用](http://design.yyuap.com/dist/pages/kero/ex_datetime.html)    

[日期在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)
