## 表格控件

表格控件将数据以表格的方式进行展示，同时提供了排序、交换列、数字列、复选、合计、自定义渲染、修改等复杂功能，满足了复杂场景下数据展示的需求。

### 插件依赖

<http://design.yonyoucloud.com/static/uui/latest/css/font-awesome.css>

<http://design.yonyoucloud.com/static/uui/latest/css/u.css>

<http://design.yonyoucloud.com/static/jquery/jquery-1.9.1.min.js>

<http://design.yonyoucloud.com/static/uui/latest/js/u-polyfill.js>

<http://design.yonyoucloud.com/static/uui/latest/js/u.js>

### 如何使用

1、创建div

```
<div class="grid-body">
    <div class="grid" id="grid-comp1"></div>
</div>
```

2、创建column对象

```
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
```

3、创建数据信息

```
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
```

4、创建表格控件

```
$("#grid-comp1").grid({
    dataSource: data1,
    id: 'case-g1',
    editable: true,
    keyField: 'id',
    columnmenu: false,
    parentKeyField: 'pid',
    columns: colu
});
```

### API

#### 属性

#### id

类型     | 默认值  | 说明
------ | ---- | -------
string | grid | 表格控件的标识

#### cancelFocus

类型      | 默认值   | 说明
------- | ----- | ---------------------------------------------------
boolean | false | 第二次点击行是否取消focus效果。true表示取消focus效果，false表示不取消focus效果

#### showHeader

类型      | 默认值  | 说明
------- | ---- | ------------------------------
boolean | true | 是否显示表头。true表示显示表头，false表示不显示表头

##### showNumCol

类型      | 默认值   | 说明
------- | ----- | ---------------------------------
boolean | false | 是否显示数字列。true表示显示数字列，false表示不显示数字列

#### multiSelect

类型      | 默认值   | 说明
------- | ----- | ----------------------------------------
boolean | false | 是否显示复选框以支持复选功能。true表示显示复选框，false表示不显示复选框

##### columnMenu

类型      | 默认值  | 说明
------- | ---- | -------------------------------------------------------------
boolean | true | 是否显示表头操作按钮，通过表头操作按钮可以动态设置数据列是否显示。是表示显示表头操作按钮，false表示不显示表头操作按钮

#### canDrag

类型      | 默认值  | 说明
------- | ---- | --------------------------------------------
boolean | true | 是否支持拖动表头以修改数据列宽度。true表示支持拖动功能，false表示不支持拖动功能

#### maxHeaderLevel

类型      | 默认值 | 说明
------- | --- | ----------------------------
integer | 1   | 表头的最高层级，用于计算表头区的高度。目前只支持最大为2

#### overWidthHiddenColumn

类型      | 默认值   | 说明
------- | ----- | --------------------------------------------------------------
boolean | false | 表格的整体宽度不足以显示所有数据列时是否自动隐藏超出部分的数据列。true表示超出时自动隐藏，false表示超出时不自动隐藏

#### sortable

类型      | 默认值  | 说明
------- | ---- | ------------------------------------------
boolean | true | 是否支持点击表头进行排序功能。true表示支持排序功能，false表示不支持排序功能

#### showSumRow

类型      | 默认值   | 说明
------- | ----- | ------------------------------------------
boolean | false | 是否支持合计功能以显示合计行。true表示支持合计功能，false表示不支持合计功能

#### canSwap

类型      | 默认值  | 说明
------- | ---- | ---------------------------------------------
boolean | true | 是否支持拖动表头以交换数据列的位置。true表示支持交换功能，false表示不支持交换功能

#### showTree

类型      | 默认值   | 说明
------- | ----- | -----------------------------------------
boolean | false | 是否支持以树表形式进行展示。true表示支持树表功能，false表示不支持树表功能

#### autoExpand

类型      | 默认值  | 说明
------- | ---- | -----------------------------------------------
boolean | true | 树表形式展示时是否默认展开所有节点。true表示默认展开所有节点，false表示默认不展开节点

#### needTreeSort

类型      | 默认值   | 说明
------- | ----- | -----------------------------------------------------------------------------------------------
boolean | false | 树表形式下是否需要对传入数据进行排序，次设置是为了优化性能。如果传入数据是无序的则设置为true，如果可以保证先传入父节点后传入子节点则设置为false提高性能。目前只支持为false的情况

#### editable

类型      | 默认值   | 说明
------- | ----- | ------------------------------------
boolean | false | 是否支持编辑功能，true表示支持编辑功能，false表示不支持编辑功能

#### editType

类型     | 默认值     | 说明
------ | ------- | ----------------------------------------------
string | default | 设置编辑方式，default表示在数据行上进行编辑，form表示在单独的form区域进行编辑

#### onBeforeRowSelected

类型       | 默认值  | 说明
-------- | ---- | ---------------------------------------
function | null | 在数据行被选中之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onRowSelected

类型       | 默认值  | 说明
-------- | ---- | --------------------------------------
function | null | 在数据行被选中时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onBeforeRowUnSelected

类型       | 默认值  | 说明
-------- | ---- | ----------------------------------------
function | null | 在数据行取消选中之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onRowUnSelected

类型       | 默认值  | 说明
-------- | ---- | ---------------------------------------
function | null | 在数据行取消选中时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onBeforeAllRowSelected

类型       | 默认值  | 说明
-------- | ---- | -----------------------------------------
function | null | 在所有数据行被选中之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

#### onAllRowSelected

类型       | 默认值  | 说明
-------- | ---- | ----------------------------------------
function | null | 在所有数据行被选中时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

#### onBeforeAllRowUnSelected

类型       | 默认值  | 说明
-------- | ---- | -------------------------------------------
function | null | 在所有数据行被取消选中之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

#### onAllRowUnSelected

类型       | 默认值  | 说明
-------- | ---- | ------------------------------------------
function | null | 在所有数据行被取消选中时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性      | 说明
------- | -------
gridObj | 表格控件对象
rowObjs | 所有数据行对象

#### onBeforeRowFocus

类型       | 默认值  | 说明
-------- | ---- | -------------------------------------------
function | null | 在数据行触发focus之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onBeforeRowUnFocus

类型       | 默认值  | 说明
-------- | ---- | -------------------------------------------
function | null | 在数据行取消focus之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onRowUnFocus

类型       | 默认值  | 说明
-------- | ---- | ------------------------------------------
function | null | 在数据行取消focus时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onDblClickFun

类型       | 默认值  | 说明
-------- | ---- | --------------------------------------
function | null | 在数据行被双击时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onValueChange

类型       | 默认值  | 说明
-------- | ---- | --------------------------------------
function | null | 在数据发生改变时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | ------------
gridObj  | 表格控件对象
rowIndex | 数据行对应的index
field    | 数据改变对应的field
oldValue | 数据改变之前的值
newValue | 数据改变之后的值

#### onBeforeClickFun

类型       | 默认值  | 说明
-------- | ---- | -------------------------------------------
function | null | 在数据行触发click之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### onBeforeEditFun

类型       | 默认值  | 说明
-------- | ---- | ----------------------------------------
function | null | 在数据行编辑操作之前触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index
colIndex | 数据列对应的index

#### onRowHover

类型       | 默认值  | 说明
-------- | ---- | ----------------------------------------
function | null | 在数据行hover时触发，调用时传入参数为object，object属性说明如下

**object属性说明**

属性       | 说明
-------- | -----------
gridObj  | 表格控件对象
rowObj   | 数据行对象
rowIndex | 数据行对应的index

#### afterCreate

类型       | 默认值  | 说明
-------- | ---- | -------------------
function | null | 表格创建完成之后触发，调用时无传入参数

### column属性

#### field

类型     | 默认值  | 说明
------ | ---- | -----------
string | null | 数据列对应的field

#### width

类型      | 默认值 | 说明
------- | --- | --------
integer | 200 | 数据列显示的宽度

#### sortable

类型      | 默认值  | 说明
------- | ---- | ---------------------------------
boolean | true | 数据列是否支持排序。true表示支持排序，false表示不支持排序

#### canDrag

类型      | 默认值  | 说明
------- | ---- | -------------------------------------
boolean | true | 数据列是否支持拖动修改宽度。true表示支持拖动，false表示不支持拖动

#### fixed

类型      | 默认值   | 说明
------- | ----- | ---------------------------------------------
boolean | false | 是否为固定列。true表示此列为固定列，在表头前面固定显示，false，表示此列不为固定列

#### visible

类型      | 默认值  | 说明
------- | ---- | --------------------------------
boolean | true | 是否显示。true表示此列进行显示，false表示此列不进行显示

#### canVisible

类型      | 默认值  | 说明
------- | ---- | -----------------------------------------------------------
boolean | true | 是否可以通过表头功能设置数据列是否显示。true表示可以通过表头设置是否显示，false表示不可以通过表头设置是否显示

#### sumCol

类型      | 默认值   | 说明
------- | ----- | --------------------------------------------
boolean | false | 表格支持合计功能时，是否计算合计。true表示需要计算合计，false表示不需要计算合计

#### editable

类型      | 默认值  | 说明
------- | ---- | -----------------------------------------------
boolean | true | 表格支持修改过程时，数据列是否可以修改。true表示可以进行修改，false表示不可以进行修改

#### editFormShow

类型      | 默认值  | 说明
------- | ---- | -----------------------------------------
boolean | true | 在表格以form形式编辑时，数据列是否显示。true表示显示，false表示不显示

#### autoExpand

类型      | 默认值   | 说明
------- | ----- | -----------------------------------------------------
boolean | false | 数据列宽度是否需要自动扩展，只有最后一列需要设置为true。true表示自动扩展，false表示不自动扩展

#### editType

类型       | 默认值  | 说明
-------- | ---- | -------------------------------
function | null | 数据列的编辑方式，通过function创建数据列对应的编辑控件

#### headerLevel

类型      | 默认值 | 说明
------- | --- | -------------------
integer | 1   | header的层级，目前只支持最大2级

#### hiddenLevel

类型      | 默认值 | 说明
------- | --- | --------------------------------------------------------
integer | 1   | 当表格属性overWidthHiddenColumn为true时，自动隐藏的优先级，数值越大，宽度不足时优先显示

### 方法

#### setRequired

**说明**

编辑模式化设置某列是否必输

**返回值**

无

**参数说明**

参数    | 类型      | 默认值  | 说明
----- | ------- | ---- | -------------------------
field | string  | true | 需要设置的数据列对应的field
value | boolean | true | true表示设置为必输，false表示设置为非必输

#### repairContent

**说明**

重画内容区

**返回值**

无

#### getColumnAttr

**说明**

获取field对应的column对象属性

**返回值**

对应的属性值

**参数说明**

参数    | 类型     | 默认值  | 说明
----- | ------ | ---- | --------------
attr  | string | true | 属性名称
field | string | true | column对应的field

#### getColumnByField

**说明**

根据field获取column对象

**返回值**

对应的column对象

**参数说明**

参数    | 类型     | 默认值  | 说明
----- | ------ | ---- | ---------------------
field | stirng | true | 需要获取的column对象对应的field

#### getIndexOfColumn

**说明**

获取column对象的index

**返回值**

对应的index

**参数说明**

参数     | 类型     | 默认值  | 说明
------ | ------ | ---- | --------
column | object | true | column对象

#### getVisibleIndexOfColumn

**说明**

获取column对象在显示的数据列中的index

**返回值**

对应的index

**参数说明**

参数     | 类型     | 默认值  | 说明
------ | ------ | ---- | --------
column | object | true | column对象

#### setColumnVisibleByColumn

**说明**

通过column对象设置某列是否显示

**返回值**

无

**参数说明**

参数      | 类型      | 默认值  | 说明
------- | ------- | ---- | -------------------------
column  | object  | true | column对象
visible | boolean | true | true表示设置为显示，false表示设置为不显示

#### setColumnVisibleByIndex

**说明**

通过index设置某列是否显示

**返回值**

无

**参数说明**

参数      | 类型      | 默认值  | 说明
------- | ------- | ---- | -------------------------
index   | integer | true | 数据列对应的index
visible | boolean | true | true表示设置为显示，false表示设置为不显示

#### setDataSource

**说明**

设置表格控件的数据信息

**返回值**

无

**参数说明**

参数         | 类型     | 默认值  | 说明
---------- | ------ | ---- | -----
dataSource | object | true | 数据信息。

**示例**

```
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
```

#### setDataSourceFun1

**说明**

设置表格控件的数据信息与setDataSource传入格式不同

**返回值**

无

**参数说明**

参数         | 类型     | 默认值  | 说明
---------- | ------ | ---- | -----
dataSource | object | true | 数据信息。

**示例**

```
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
```

#### addOneRow

**说明**

添加一行数据

**返回值**

无

**参数说明**

参数    | 类型      | 默认值   | 说明
----- | ------- | ----- | ---------
row   | object  | true  | 数据信息
index | integer | false | 需要插入数据的位置

**示例**

```
gridObj.addonerow({
        "column1": "value1",
        "column2": "value2",
        "column3": "value3"
    },1);
```

#### addRows

**说明**

添加多行数据

**返回值**

无

**参数说明**

参数    | 类型      | 默认值   | 说明
----- | ------- | ----- | ---------
rows  | array   | true  | 数据信息
index | integer | false | 需要插入数据的位置

**示例**

```
gridObj.addRows([{
        "column1": "value1",
        "column2": "value2",
        "column3": "value3"
    },{
        "column1": "value11",
        "column2": "value22",
        "column3": "value33"
    }],1);
```

#### deleteOneRow

**说明**

删除某条数据

**返回值**

无

**参数说明**

参数    | 类型      | 默认值  | 说明
----- | ------- | ---- | --------------
index | integer | true | 需要删除数据对应的index

#### deleteRows

**说明**

删除多条数据

**返回值**

无

**参数说明**

参数     | 类型    | 默认值  | 说明
------ | ----- | ---- | -----------------
indexs | array | true | 需要删除数据的index组成的数组

#### updateRow

**说明**

修改某行数据

**返回值**

无

**参数说明**

参数    | 类型      | 默认值  | 说明
----- | ------- | ---- | ----------
index | integer | true | 被修改行的index
row   | object  | true | 修改之后的数据信息

**示例**

```
gridObj.updateRow(1,{
        "column1": "value1",
        "column2": "value2",
        "column3": "value3"
    });
```

#### updateValueAt

**说明**

修改某个单元格的数据

**返回值**

无

**参数说明**

参数       | 类型      | 默认值   | 说明
-------- | ------- | ----- | ------------------------------------------------------
rowIndex | integer | true  | 所需修改数据对应的行号
field    | string  | true  | 所需修改数据对应的field
value    | string  | true  | 修改之后的数据
force    | boolean | false | true表示不管数据是否发生改变，都执行update操作，false表示只有数据改变时才执行update操作

#### setRowSelect

**说明**

设置某行选中

**返回值**

无

**参数说明**

参数       | 类型      | 默认值  | 说明
-------- | ------- | ---- | -----------
rowIndex | integer | true | 选中行对应的index

#### setRowUnselect

**说明**

取消某行的选中状态

**返回值**

无

**参数说明**

参数       | 类型      | 默认值  | 说明
-------- | ------- | ---- | -------------
rowIndex | integer | true | 取消选中行对应的index

#### setAllRowSelect

**说明**

设置所有行选中

**返回值**

无

#### setAllRowUnSelect

**说明**

设置所有行取消选中

**返回值**

无

#### getSelectRows

**说明**

获取所有选中行

**返回值**

所有选中行对象

#### getSelectRowsIndex

**说明**

获取所有选中行对应的inex

**返回值**

所有选中行index

#### setRowFocus

**说明**

设置某行为focus状态

**返回值**

无

**参数说明**

参数       | 类型      | 默认值  | 说明
-------- | ------- | ---- | --------------
rowIndex | integer | true | focus行对应的index

#### setRowUnFocus

**说明**

取消某行的focus状态

**返回值**

无

**参数说明**

参数       | 类型      | 默认值  | 说明
-------- | ------- | ---- | ----------------
rowIndex | integer | true | 取消focus行对应的index

#### getFocusRow

**说明**

获取focus行对象

**返回值**

focus行对象

#### getFocusRowIndex

**说明**

获取focus行对应的index

**返回值**

focus行对应的index

#### getAllRows

**说明**

获取所有行对象

**返回值**

所有行对象

#### getRowByIndex

**说明**

根据行号获取行对象

**返回值**

行号对应的行对象

**参数说明**

参数    | 类型      | 默认值  | 说明
----- | ------- | ---- | ----------------
index | integer | true | 需要获取的行对象对应的index

#### getRowIndexByValue

**说明**

根据value值获取行号

**返回值**

查找到的行号

**参数说明**

参数    | 类型     | 默认值  | 说明
----- | ------ | ---- | --------------
field | stirng | true | value值对应的field
value | string | true | value值

#### setRenderType

**说明**

设置某列的renderType属性

**返回值**

无

**参数说明**

参数         | 类型       | 默认值  | 说明
---------- | -------- | ---- | -------------------------
field      | string   | true | 设置renderType属性数据列对应的field
renderType | function | true | 新的renderType

#### setShowHeader

**说明**

设置是否显示表头

**返回值**

无

**参数说明**

参数         | 类型      | 默认值  | 说明
---------- | ------- | ---- | -----------------------------
showHeader | boolean | true | true表示设置为显示表头，false表示设置为不显示表头

#### setColumnPrecision

**说明**

设置数据列的精度

**返回值**

无

**参数说明**

参数    | 类型     | 默认值  | 说明
----- | ------ | ---- | -------------------------
field | string | true | 需要设置的数据列对应的fieldprecision

#### setMultiSelect

**说明**

设置是否显示复选框

**返回值**

无

**参数说明**

参数          | 类型      | 默认值  | 说明
----------- | ------- | ---- | -------------------------
multiSelect | boolean | true | true表示显示复选框，false表示不显示复选框

#### setShowNumCol

**说明**

设置是否显示数字列

**返回值**

无

**参数说明**

参数         | 类型      | 默认值  | 说明
---------- | ------- | ---- | -------------------------
showNumCol | boolean | true | true表示显示数字列，false表示不显示数字列

#### setEditType

**说明**

设置某列的editType属性

**返回值**

无

**参数说明**

参数       | 类型       | 默认值  | 说明
-------- | -------- | ---- | -------------------------
field    | string   | true | 设置renderType属性数据列对应的field
editType | function | true | 新的editType

#### setEditable

**说明**

设置是否支持编辑功能

**返回值**

无

**参数说明**

参数       | 类型      | 默认值  | 说明
-------- | ------- | ---- | ---------------------------
editable | boolean | true | true表示支持编辑功能，false表示不支持编辑功能

#### setGridEditType

**说明**

设置编辑方式

**返回值**

无

**参数说明**

参数          | 类型     | 默认值  | 说明
----------- | ------ | ---- | ---------------------------------------
newEditType | string | true | default表示在数据行上进行编辑，form表示在单独的form区域进行编辑

#### setGridEditTypeAndEditRow

**说明**

设置编辑方式同时出发对应单元格的编辑

**返回值**

无

**参数说明**

参数          | 类型      | 默认值  | 说明
----------- | ------- | ---- | ---------------------------------------
newEditType | string  | true | default表示在数据行上进行编辑，form表示在单独的form区域进行编辑
rowIndex    | integer | true | 单元格对应的行号
colIndex    | integer | true | 单元格对应的列号

#### expandNode

**说明**

树表形式下通过value展开某个节点

**返回值**

无

**参数说明**

参数       | 类型     | 默认值  | 说明
-------- | ------ | ---- | --------------------
keyValue | string | true | 需要展开节点的keyField对应的数值

#### expandNodeByIndex

**说明**

树表形式下通过index展开某个节点

**返回值**

无

**参数说明**

参数       | 类型      | 默认值  | 说明
-------- | ------- | ---- | ------------
rowIndex | integer | true | 需要展开节点的index
