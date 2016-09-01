# combobox插件

combobox组合框是由一个文本输入控件和一个下拉菜单组成的，类似于select元素。用户可以从一个预先定义的列表里选择一个或者多个选项。

# 示例

replaceExamp


# API

## Combo

* 类型：`Object`
* 说明： Combo表示一个下拉对象
* 用法：

获取方式：1、获取绑定下拉框的dom元素 ； 2、读取dom元素上的属性'u.Combo'

```

var comboObject = document.getElementById('domId')['u.Combo'];

```

## Combo.setComboData(dataArray)

* 类型： `Function`
* 说明：给下拉框对象添加数据源
* 参数：
	* `{Array} dataArray`
* 用法：

```

var dataArray = [{value:'01',name:'男'},{value:'02',name:'女'}];//value为：下拉框真实值，name为下拉显示值

document.getElementById('domId')['u.Combo'].setComboData(dataArray);

```


