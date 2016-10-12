# 复选框

checkbox提供了基础复选框、不同色彩复选框、图片复选框、个性复选框


replaceExamp


[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/checkbox)



# API

## \# checkbox对象

* 类型：`Object`
* 说明： 获取checkbox对象
* 用法：

获取方式：1、获取绑定checkbox的dom元素 ； 2、读取dom元素上的属性'u.Checkbox'


```

var checkboxObject = document.getElementById('domId')['u.Checkbox'];

```

## \# check

* 类型：`Function`
* 说明： 调用checkbox对象的check方法，选中复选框
* 用法：

```

checkboxObject.check();

```

## \# uncheck

* 类型：`Function`
* 说明： 调用checkbox对象的uncheck方法，取消选中复选框
* 用法：

```

checkboxObject.uncheck();

```

## \# disable

* 类型：`Function`
* 说明： 调用checkbox对象的disable方法，使复选框不可用
* 用法：

```

checkboxObject.disable();

```
## \# enable

* 类型：`Function`
* 说明： 调用checkbox对象的enable方法，使复选框可用
* 用法：

```

checkboxObject.enable();

```

## \# toggle

* 类型：`Function`
* 说明： 调用checkbox对象的toggle方法，反选复选框
* 用法：

```

checkboxObject.toggle();


```

相关内容：

[复选框在kero中使用](http://design.yyuap.com/dist/pages/kero/ex_checkbox.html)    

[复选框在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)
