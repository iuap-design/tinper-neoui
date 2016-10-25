# 下拉框

combobox组合框是由一个文本输入控件和一个下拉菜单组成的，类似于select元素。用户可以从一个预先定义的列表里选择一个或者多个选项。

* `.u-combo` - 单选下拉框
* `.u-combo .mutil-select` - 多选下拉框

replaceExamp

[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/combobox)

# API

## \# Combo下拉框对象

* 类型：`Object`
* 说明： Combo表示一个下拉对象
* 用法：

获取方式：1、获取绑定下拉框的dom元素 ； 2、读取dom元素上的属性'u.Combo'

```

var comboObject = document.getElementById('domId')['u.Combo'];

```

**注：** 如果获取的下拉对象为空，原因为下拉框没有初始化成功，可以先调用`u.compMgr.updateComp();`来初始化页面中的控件。然后再获取下拉对象。
## \# setComboData 设置数据源

* 类型： `Function`
* 说明：给下拉框对象添加数据源
* 参数：
	* `{Array} dataArray`
* 用法：

```

var dataArray = [{value:'01',name:'男'},{value:'02',name:'女'}];//value为：下拉框真实值，name为下拉显示值

document.getElementById('domId')['u.Combo'].setComboData(dataArray);

```

## \# selectItem 选中某行
* 类型： `Function`
* 说明：设置选中下拉框的某条数据
* 参数：
	* `{Integer} index`：要选中的某行，从0开始
* 用法：

```

document.getElementById('domId')['u.Combo'].selectItem(index);

```

## \# setValue 根据真实值选中某行
* 类型： `Function`
* 说明： 查找下拉框数据中与传入的参数相同的真实值，并选中对应的某条数据
* 参数：
	* `{String} value`： 要选中行的真实值
* 用法：

```

document.getElementById('domId')['u.Combo'].setValue(value);

```

## \# setName 根据显示值选中某行
* 类型： `Function`
* 说明： 查找下拉框数据中与传入的参数相同的显示值，并选中对应的某条数据
* 参数：
	* `{String} name`： 要选中行的显示值
* 用法：

```

document.getElementById('domId')['u.Combo'].setName(name);

```


## \# emptyValue 清空所选内容
* 类型： `Function`
* 说明： 清空下拉列表所选内容
* 用法：

```

document.getElementById('domId')['u.Combo'].emptyValue();

```

相关内容：

[下拉框在kero中使用](http://design.yyuap.com/dist/pages/kero/combobox_ex.html)    

[下拉框在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)

