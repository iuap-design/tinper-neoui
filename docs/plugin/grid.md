# 表格控件

表格控件将数据以表格的方式进行展示，同时提供了排序、交换列、数字列、复选、合计、自定义渲染、修改等复杂功能，满足了复杂场景下数据展示的需求。

# 插件依赖

http://design.yyuap.com/static/uui/latest/css/font-awesome.css

http://design.yyuap.com/static/uui/latest/css/u.css

http://design.yyuap.com/static/jquery/jquery-1.9.1.min.js

http://design.yyuap.com/static/uui/latest/js/u-polyfill.js

http://design.yyuap.com/static/uui/latest/js/u.js

# 如何使用

1、创建div

    <div class="grid-body">
        <div class="grid" id="grid-comp1"></div>
    </div>
2、创建column对象

    var colu = [{
         field: "id",
        title: "id"
    }, {
        field: "pid",
        title: "pid"
    }, {
        field: "column1",
        title: "column1"
    }, {
        field: "column2",
        title: "column2"
    }, {
        field: "column3",
        title: "column3"
    }
    ];

3、创建数据信息

    var data1 = {
        values: [{
            column1: "11",
            column2: "12",
            column3: "13",
            id: '0',
            pid: ''
        }, {
            column1: "21",
            column2: "22",
            column3: "23",
            id: '1',
            pid: '0'
        }, {
            column1: "31",
            column2: "32",
            column3: "33",
            id: '3',
            pid: '1'
        }
        ]
    };

4、创建表格控件
    
    $("#grid-comp1").grid({
        dataSource: data1,
        id: 'case-g1',
        editable: true,
        keyField: 'id',
        columnmenu: false,
        parentKeyField: 'pid',
        columns: colu
    });
    




# API

## 属性

### ﻿id

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>string</td>
		  <td>grid</td>
		  <td>表格控件的标识</td>
    </tr>
</table>

### cancelFocus

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>第二次点击行是否取消focus效果。true表示取消focus效果，false表示不取消focus效果</td>
    </tr>
</table>

### showHeader

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>是否显示表头。true表示显示表头，false表示不显示表头</td>
    </tr>
</table>

### showNumCol

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>是否显示数字列。true表示显示数字列，false表示不显示数字列</td>
    </tr>
</table>

### multiSelect

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>是否显示复选框以支持复选功能。true表示显示复选框，false表示不显示复选框</td>
    </tr>
</table>

### columnMenu

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>是否显示表头操作按钮，通过表头操作按钮可以动态设置数据列是否显示。是表示显示表头操作按钮，false表示不显示表头操作按钮</td>
    </tr>
</table>

### canDrag

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>是否支持拖动表头以修改数据列宽度。true表示支持拖动功能，false表示不支持拖动功能</td>
    </tr>
</table>

### maxHeaderLevel

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>integer</td>
		  <td>1</td>
		  <td>表头的最高层级，用于计算表头区的高度。目前只支持最大为2</td>
    </tr>
</table>

### overWidthHiddenColumn

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>表格的整体宽度不足以显示所有数据列时是否自动隐藏超出部分的数据列。true表示超出时自动隐藏，false表示超出时不自动隐藏</td>
    </tr>
</table>

### sortable

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>是否支持点击表头进行排序功能。true表示支持排序功能，false表示不支持排序功能</td>
    </tr>
</table>

### showSumRow

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>是否支持合计功能以显示合计行。true表示支持合计功能，false表示不支持合计功能</td>
    </tr>
</table>

### canSwap

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>是否支持拖动表头以交换数据列的位置。true表示支持交换功能，false表示不支持交换功能</td>
    </tr>
</table>

### showTree

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>是否支持以树表形式进行展示。true表示支持树表功能，false表示不支持树表功能</td>
    </tr>
</table>

### autoExpand

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>树表形式展示时是否默认展开所有节点。true表示默认展开所有节点，false表示默认不展开节点</td>
    </tr>
</table>

### needTreeSort

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>树表形式下是否需要对传入数据进行排序，次设置是为了优化性能。如果传入数据是无序的则设置为true，如果可以保证先传入父节点后传入子节点则设置为false提高性能。目前只支持为false的情况</td>
    </tr>
</table>

### editable

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>是否支持编辑功能，true表示支持编辑功能，false表示不支持编辑功能</td>
    </tr>
</table>

### editType

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>string</td>
		  <td>default</td>
		  <td>设置编辑方式，default表示在数据行上进行编辑，form表示在单独的form区域进行编辑</td>
    </tr>
</table>

### onBeforeRowSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行被选中之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onRowSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行被选中时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onBeforeRowUnSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行取消选中之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onRowUnSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行取消选中时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onBeforeAllRowSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在所有数据行被选中之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObjs</td>
		  <td>所有数据行对象</td>
    </tr>
</table>

### onAllRowSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在所有数据行被选中时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObjs</td>
		  <td>所有数据行对象</td>
    </tr>
</table>

### onBeforeAllRowUnSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在所有数据行被取消选中之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObjs</td>
		  <td>所有数据行对象</td>
    </tr>
</table>

### onAllRowUnSelected

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在所有数据行被取消选中时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObjs</td>
		  <td>所有数据行对象</td>
    </tr>
</table>

### onBeforeRowFocus

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行触发focus之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onBeforeRowUnFocus

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行取消focus之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onRowUnFocus

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行取消focus时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onDblClickFun

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行被双击时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onValueChange

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据发生改变时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>数据改变对应的field</td>
    </tr>
    <tr>
		  <td>oldValue</td>
		  <td>数据改变之前的值</td>
    </tr>
    <tr>
		  <td>newValue</td>
		  <td>数据改变之后的值</td>
    </tr>
</table>

### onBeforeClickFun

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行触发click之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### onBeforeEditFun

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行编辑操作之前触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
    <tr>
		  <td>colIndex</td>
		  <td>数据列对应的index</td>
    </tr>
</table>

### onRowHover

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>在数据行hover时触发，调用时传入参数为object，object属性说明如下</td>
    </tr>
</table>

**object属性说明**

<table>
    <tr>
        <td>属性</td>
		  <td >说明</td>
    </tr>
    <tr>
		  <td>gridObj</td>
		  <td>表格控件对象</td>
    </tr>
    <tr>
		  <td>rowObj</td>
		  <td>数据行对象</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>数据行对应的index</td>
    </tr>
</table>

### afterCreate

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>表格创建完成之后触发，调用时无传入参数</td>
    </tr>
</table>

## column属性

### ﻿field

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>string</td>
		  <td>null</td>
		  <td>数据列对应的field</td>
    </tr>
</table>

### width

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>integer</td>
		  <td>200</td>
		  <td>数据列显示的宽度</td>
    </tr>
</table>

### sortable

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>数据列是否支持排序。true表示支持排序，false表示不支持排序</td>
    </tr>
</table>

### canDrag

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>数据列是否支持拖动修改宽度。true表示支持拖动，false表示不支持拖动</td>
    </tr>
</table>

### fixed

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>是否为固定列。true表示此列为固定列，在表头前面固定显示，false，表示此列不为固定列</td>
    </tr>
</table>

### visible

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>是否显示。true表示此列进行显示，false表示此列不进行显示</td>
    </tr>
</table>

### canVisible

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>是否可以通过表头功能设置数据列是否显示。true表示可以通过表头设置是否显示，false表示不可以通过表头设置是否显示</td>
    </tr>
</table>

### sumCol

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>表格支持合计功能时，是否计算合计。true表示需要计算合计，false表示不需要计算合计</td>
    </tr>
</table>

### editable

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>表格支持修改过程时，数据列是否可以修改。true表示可以进行修改，false表示不可以进行修改</td>
    </tr>
</table>

### editFormShow

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>true</td>
		  <td>在表格以form形式编辑时，数据列是否显示。true表示显示，false表示不显示</td>
    </tr>
</table>

### autoExpand

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>boolean</td>
		  <td>false</td>
		  <td>数据列宽度是否需要自动扩展，只有最后一列需要设置为true。true表示自动扩展，false表示不自动扩展</td>
    </tr>
</table>

### editType

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>function</td>
		  <td>null</td>
		  <td>数据列的编辑方式，通过function创建数据列对应的编辑控件</td>
    </tr>
</table>

### headerLevel

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>integer</td>
		  <td>1</td>
		  <td>header的层级，目前只支持最大2级</td>
    </tr>
</table>

### hiddenLevel

<table>
    <tr>
        <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>integer</td>
		  <td>1</td>
		  <td>当表格属性overWidthHiddenColumn为true时，自动隐藏的优先级，数值越大，宽度不足时优先显示</td>
    </tr>
</table>

## 方法

### ﻿setRequired

**说明**

编辑模式化设置某列是否必输

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>string</td>
		  <td>true</td>
		  <td>需要设置的数据列对应的field</td>
    </tr>
    <tr>
		  <td>value</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>true表示设置为必输，false表示设置为非必输</td>
    </tr>
</table>

### repairContent

**说明**

重画内容区

**返回值**

无

### getColumnAttr

**说明**

获取field对应的column对象属性

**返回值**

对应的属性值

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>attr</td>
		  <td>string</td>
		  <td>true</td>
		  <td>属性名称</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>string</td>
		  <td>true</td>
		  <td>column对应的field</td>
    </tr>
</table>

### getColumnByField

**说明**

根据field获取column对象

**返回值**

对应的column对象

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>stirng</td>
		  <td>true</td>
		  <td>需要获取的column对象对应的field</td>
    </tr>
</table>

### getIndexOfColumn

**说明**

获取column对象的index

**返回值**

对应的index

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>column</td>
		  <td>object</td>
		  <td>true</td>
		  <td>column对象</td>
    </tr>
</table>

### getVisibleIndexOfColumn

**说明**

获取column对象在显示的数据列中的index

**返回值**

对应的index

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>column</td>
		  <td>object</td>
		  <td>true</td>
		  <td>column对象</td>
    </tr>
</table>

### setColumnVisibleByColumn

**说明**

通过column对象设置某列是否显示

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>column</td>
		  <td>object</td>
		  <td>true</td>
		  <td>column对象</td>
    </tr>
    <tr>
		  <td>visible</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>true表示设置为显示，false表示设置为不显示</td>
    </tr>
</table>

### setColumnVisibleByIndex

**说明**

通过index设置某列是否显示

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>index</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>数据列对应的index</td>
    </tr>
    <tr>
		  <td>visible</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>true表示设置为显示，false表示设置为不显示</td>
    </tr>
</table>

### setDataSource

**说明**

设置表格控件的数据信息

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>dataSource</td>
		  <td>object</td>
		  <td>true</td>
		  <td>数据信息。</td>
    </tr>
</table>

**示例**



    gridObj.setDataSource({
        values: [{
            column1: "11",
            column2: "12",
            column3: "13",
            id: '0',
            pid: ''
        }, {
            column1: "21",
            column2: "22",
            column3: "23",
            id: '1',
            pid: '0'
        }, {
            column1: "31",
            column2: "32",
            column3: "33",
            id: '3',
            pid: '1'
        }]
    });
### setDataSourceFun1

**说明**

设置表格控件的数据信息与setDataSource传入格式不同

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>dataSource</td>
		  <td>object</td>
		  <td>true</td>
		  <td>数据信息。</td>
    </tr>
</table>

**示例**



	gridObj.setDataSourceFun1({
		fields:['column1','column2','column3','column4','column5','column6'],
    		values:[
			["cl1","1","cl3","cl4","cl5","cl6"],
			["cl12","2","cl32","cl42","cl52","cl62"],
			["cl13","3","cl33","cl43","cl53","cl63"],
			["cl14","4","cl34","cl44","cl54","cl64"],
			["cl15","5","cl35","cl45","cl55","cl65"],
			["cl16","6","cl36","cl46","cl56","cl66"]
			]
	});
### addOneRow

**说明**

添加一行数据

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>row</td>
		  <td>object</td>
		  <td>true</td>
		  <td>数据信息</td>
    </tr>
    <tr>
		  <td>index</td>
		  <td>integer</td>
		  <td>false</td>
		  <td>需要插入数据的位置</td>
    </tr>
</table>

**示例**



	gridObj.addonerow({
            "column1": "value1",
            "column2": "value2",
            "column3": "value3"
        },1);
### addRows

**说明**

添加多行数据

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>rows</td>
		  <td>array</td>
		  <td>true</td>
		  <td>数据信息</td>
    </tr>
    <tr>
		  <td>index</td>
		  <td>integer</td>
		  <td>false</td>
		  <td>需要插入数据的位置</td>
    </tr>
</table>

**示例**



	gridObj.addRows([{
            "column1": "value1",
            "column2": "value2",
            "column3": "value3"
        },{
            "column1": "value11",
            "column2": "value22",
            "column3": "value33"
        }],1);
### deleteOneRow

**说明**

删除某条数据

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>index</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>需要删除数据对应的index</td>
    </tr>
</table>

### deleteRows

**说明**

删除多条数据

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>indexs</td>
		  <td>array</td>
		  <td>true</td>
		  <td>需要删除数据的index组成的数组</td>
    </tr>
</table>

### updateRow

**说明**

修改某行数据

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>index</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>被修改行的index</td>
    </tr>
    <tr>
		  <td>row</td>
		  <td>object</td>
		  <td>true</td>
		  <td>修改之后的数据信息</td>
    </tr>
</table>

**示例**



	gridObj.updateRow(1,{
            "column1": "value1",
            "column2": "value2",
            "column3": "value3"
        });
### updateValueAt

**说明**

修改某个单元格的数据

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>所需修改数据对应的行号</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>string</td>
		  <td>true</td>
		  <td>所需修改数据对应的field</td>
    </tr>
    <tr>
		  <td>value</td>
		  <td>string</td>
		  <td>true</td>
		  <td>修改之后的数据</td>
    </tr>
    <tr>
		  <td>force</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>true表示不管数据是否发生改变，都执行update操作，false表示只有数据改变时才执行update操作</td>
    </tr>
</table>

### setRowSelect

**说明**

设置某行选中

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>选中行对应的index</td>
    </tr>
</table>

### setRowUnselect

**说明**

取消某行的选中状态

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>取消选中行对应的index</td>
    </tr>
</table>

### setAllRowSelect

**说明**

设置所有行选中

**返回值**

无 

### setAllRowUnSelect

**说明**

设置所有行取消选中

**返回值**

无 

### getSelectRows

**说明**

获取所有选中行

**返回值**

所有选中行对象

### getSelectRowsIndex

**说明**

获取所有选中行对应的inex

**返回值**

所有选中行index

### setRowFocus

**说明**

设置某行为focus状态

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>focus行对应的index</td>
    </tr>
</table>

### setRowUnFocus

**说明**

取消某行的focus状态

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>取消focus行对应的index</td>
    </tr>
</table>

### getFocusRow

**说明**

获取focus行对象

**返回值**

focus行对象

### getFocusRowIndex

**说明**

获取focus行对应的index

**返回值**

focus行对应的index

### getAllRows

**说明**

获取所有行对象

**返回值**

所有行对象

### getRowByIndex

**说明**

根据行号获取行对象

**返回值**

行号对应的行对象

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>index</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>需要获取的行对象对应的index</td>
    </tr>
</table>

### getRowIndexByValue

**说明**

根据value值获取行号

**返回值**

查找到的行号

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>stirng</td>
		  <td>true</td>
		  <td>value值对应的field</td>
    </tr>
    <tr>
		  <td>value</td>
		  <td>string</td>
		  <td>true</td>
		  <td>value值</td>
    </tr>
</table>

### setRenderType

**说明**

设置某列的renderType属性

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>string</td>
		  <td>true</td>
		  <td>设置renderType属性数据列对应的field</td>
    </tr>
    <tr>
		  <td>renderType</td>
		  <td>function</td>
		  <td>true</td>
		  <td>新的renderType</td>
    </tr>
</table>

### setShowHeader

**说明**

设置是否显示表头

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>showHeader</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>true表示设置为显示表头，false表示设置为不显示表头</td>
    </tr>
</table>

### setColumnPrecision

**说明**

设置数据列的精度

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>string</td>
		  <td>true</td>
		  <td>需要设置的数据列对应的fieldprecision</td>
    </tr>
</table>

### setMultiSelect

**说明**

设置是否显示复选框

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>multiSelect</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>true表示显示复选框，false表示不显示复选框</td>
    </tr>
</table>

### setShowNumCol

**说明**

设置是否显示数字列

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>showNumCol</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>true表示显示数字列，false表示不显示数字列</td>
    </tr>
</table>

### setEditType

**说明**

设置某列的editType属性

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>field</td>
		  <td>string</td>
		  <td>true</td>
		  <td>设置renderType属性数据列对应的field</td>
    </tr>
    <tr>
		  <td>editType</td>
		  <td>function</td>
		  <td>true</td>
		  <td>新的editType</td>
    </tr>
</table>

### setEditable

**说明**

设置是否支持编辑功能

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>editable</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>true表示支持编辑功能，false表示不支持编辑功能</td>
    </tr>
</table>

### setGridEditType

**说明**

设置编辑方式

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>newEditType</td>
		  <td>string</td>
		  <td>true</td>
		  <td>default表示在数据行上进行编辑，form表示在单独的form区域进行编辑</td>
    </tr>
</table>

### setGridEditTypeAndEditRow

**说明**

设置编辑方式同时出发对应单元格的编辑

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>newEditType</td>
		  <td>string</td>
		  <td>true</td>
		  <td>default表示在数据行上进行编辑，form表示在单独的form区域进行编辑</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>单元格对应的行号</td>
    </tr>
    <tr>
		  <td>colIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>单元格对应的列号</td>
    </tr>
</table>

### expandNode

**说明**

树表形式下通过value展开某个节点

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>keyValue</td>
		  <td>string</td>
		  <td>true</td>
		  <td>需要展开节点的keyField对应的数值</td>
    </tr>
</table>

### expandNodeByIndex

**说明**

树表形式下通过index展开某个节点

**返回值**

无

**参数说明**

<table>
    <tr>
        <td>参数</td>
		  <td>类型</td>
		  <td>默认值</td>
		  <td>说明</td>
    </tr>
    <tr>
		  <td>rowIndex</td>
		  <td>integer</td>
		  <td>true</td>
		  <td>需要展开节点的index</td>
    </tr>
</table>

# 示例




<div class="example-content"><div class="grid-body">
	<div class="grid" id="grid-comp1"></div>
</div></div>



<script>
$(document).ready(function () {
	var data1 = {
        values: [{
            column1: "11",
            column2: "12",
            column3: "13",
            id: '0',
            pid: ''
        }, {
            column1: "21",
            column2: "22",
            column3: "23",
            id: '1',
            pid: '0'
        }, {
            column1: "31",
            column2: "32",
            column3: "33",
            id: '3',
            pid: '1'
        }
        ]
    };

    var colu = [{
        field: "id",
        title: "id"
    }, {
        field: "pid",
        title: "pid"
    }, {
        field: "column1",
        title: "column1"
    }, {
        field: "column2",
        title: "column2"
    }, {
        field: "column3",
        title: "column3"
    }
    ];

    $("#grid-comp1").grid({
        dataSource: data1,
        id: 'case-g1',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
});
</script>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;div class="grid-body">
	&lt;div class="grid" id="grid-comp1">&lt;/div>
&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
$(document).ready(function () {
	var data1 = {
        values: [{
            column1: "11",
            column2: "12",
            column3: "13",
            id: '0',
            pid: ''
        }, {
            column1: "21",
            column2: "22",
            column3: "23",
            id: '1',
            pid: '0'
        }, {
            column1: "31",
            column2: "32",
            column3: "33",
            id: '3',
            pid: '1'
        }
        ]
    };

    var colu = [{
        field: "id",
        title: "id"
    }, {
        field: "pid",
        title: "pid"
    }, {
        field: "column1",
        title: "column1"
    }, {
        field: "column2",
        title: "column2"
    }, {
        field: "column3",
        title: "column3"
    }
    ];

    $("#grid-comp1").grid({
        dataSource: data1,
        id: 'case-g1',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
});</code></pre>

</div>