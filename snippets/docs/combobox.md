# combobox插件

combobox组合框是由一个文本输入控件和一个下拉菜单组成的，类似于select元素。用户可以从一个预先定义的列表里选择一个或者多个选项。

# 插件依赖

首先依赖于 http://design.yyuap.com/static/uui/latest/js/u.js


# 用法

1.定义样式为`u-combo`的div父元素，具体dom结构见示例

2.手动调用

```
u.compMgr.updateComp();
document.getElementById('domid')['u.Combo'].setComboData(dataArray);

```
domid: 需绑定的dom的id

dataArray：下拉数据，数组形式如：`[{value:'01',name:'男'},{value:'02',name:'女'}]`


# 示例

replaceExamp





