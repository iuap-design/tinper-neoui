# 单选框

radio提供了基本的单选框和不同色彩的单选框

replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/radio)

# API

## \# radio对象

* 类型：`Object`
* 说明： 获取radio对象
* 用法：

获取方式：1、获取绑定radio的dom元素 ； 2、读取dom元素上的属性'u.Radio'

```

var radioObject = document.getElementById('domId')['u.Radio'];

```

## \# check

* 类型：`Function`
* 说明： 调用radio对象的check方法，选中单选框
* 用法：

```

radioObject.check();

```

## \# uncheck

* 类型：`Function`
* 说明： 调用radio对象的uncheck方法，取消选中单选框
* 用法：

```

radioObject.uncheck();

```

## \# disable

* 类型：`Function`
* 说明： 调用radio对象的disable方法，使单选框不可用
* 用法：

```

radioObject.disable();

```
## \# enable

* 类型：`Function`
* 说明： 调用radio对象的enable方法，使单选框可用
* 用法：

```

radioObject.enable();

```

相关内容：

[单选框在kero中使用](http://design.yyuap.com/dist/pages/kero/ex_radio.html)    

[单选框在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)