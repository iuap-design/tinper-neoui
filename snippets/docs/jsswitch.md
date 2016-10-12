# 开关

开关控件实现了两种状态的切换，提供了多种色彩、多种尺寸样式。


replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/switch)


# API

## \# switch对象

* 类型：`Object`
* 说明： 获取switch对象
* 用法：

获取方式：1、获取绑定switch的dom元素 ； 2、读取dom元素上的属性'u.Switch'


```

var switchObject = document.getElementById('domId')['u.Switch'];

```

## \# check

* 类型：`Function`
* 说明： 调用switch对象的check方法，打开开关
* 用法：

```

switchObject.check();

```

## \# uncheck

* 类型：`Function`
* 说明： 调用switch对象的uncheck方法，关闭开关
* 用法：

```

switchObject.uncheck();

```

## \# disable

* 类型：`Function`
* 说明： 调用switch对象的disable方法，使开关不可用
* 用法：

```

switchObject.disable();

```
## \# enable

* 类型：`Function`
* 说明： 调用switch对象的enable方法，使开关可用
* 用法：

```

switchObject.enable();

```

## \# toggle

* 类型：`Function`
* 说明： 调用switch对象的toggle方法，反选开关的另一个状态
* 用法：

```

switchObject.toggle();

```

## \# isChecked

* 类型：`Function`
* 说明： 调用switch对象的isChecked方法，获取当前开关的状态，true为打开，false为关闭
* 用法：

```

switchObject.isChecked();

```


相关内容：

[开关在kero中使用](http://design.yyuap.com/dist/pages/kero/ex_switch.html)    

[开关在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)