## 级联组件

Cascader级联组件

### 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。


#### type类型

* `.u-cascader` - 默认级联组件
* `.u-cascader .trigger-hover` - 地址级联-移入展开



[试一试](http://tinper.org/webide/#/demos/ui/cascader)

#### API

#### Cascader级联对象

* 类型：`Object`
* 说明： Cascader表示一个级联对象
* 用法：

获取方式：1、获取绑定级联的dom元素 ； 2、读取dom元素上的属性'u.Cascader'

```

var comboObject = document.getElementById('domId')['u.Cascader'];

```

**注：** 如果获取的级联对象为空，原因为级联没有初始化成功，可以先调用`u.compMgr.updateComp();`来初始化页面中的控件。然后再获取级联对象。
#### setData 设置数据源

* 类型： `Function`
* 说明：给级联对象添加数据源
* 参数：
	* `{Array} dataArray`
* 用法：

```
//value为：级联真实值，name为级联显示值，children为子项列表数据，格式同上
var data = [{
        value: "01",
        name: '浙江',
        children: [{
            value: "11",
            name: '杭州',
            children: [{
                value: "21",
                name: '西湖',
                children: [{
                        value: "31",
                        name: '白娘子'
                    },
                    {
                        value: "32",
                        name: '许仙'
                    }
                ]
            }]
        }]
    }];


document.getElementById('demoId')['u.Cascader'].setData(data);

```


#### setValue 根据真实值选中某行
* 类型： `Function`
* 说明： 查找级联数据中与传入的参数相同的真实值，并选中对应的某条数据
* 参数：
	* `{String} value`： 要选中行的真实值，可以为空，如果为空，则不选中任何数据
* 用法：

```

document.getElementById('domId')['u.Combo'].setValue(value);

```


相关内容：

[级联组件在kero中使用](http://docs.tinper.org/moy/kero/cascader.html)    
