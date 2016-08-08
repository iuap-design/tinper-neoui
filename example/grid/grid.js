$(document).ready(function () {

    var colu3;
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
    var data3 = {
        values: [{
            column1: "11",
            column2: "2015-1-2",
            column3: "2015-1-3",
            id: '0',
            pid: ''
        }, {
            column1: "21",
            column2: "2015-2-2",
            column3: "2015-2-3",
            id: '1',
            pid: '0'
        }, {
            column1: "31",
            column2: "Wed Mar 25 15:46:21 CST 2015",
            column3: "Wed Mar 25 15:46:21 CST 2015",
            id: '3',
            pid: '1'
        }
        ]
    };
    var data2 = {
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
        }, {
            column1: "41",
            column2: "42",
            column3: "43",
            id: '4',
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
    $("#grid-comp2").grid({

        dataSource: data1,
        width: "500px",
        id: 'case-g2',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp4").grid({

        dataSource: data1,
        height: "200px",
        id: 'case-g4',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp5").grid({

        dataSource: data1,
        columnWidth: "200px",
        id: 'case-g5',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp6").grid({

        dataSource: data1,
        columnWidth: "300px",
        id: 'case-g6',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });

    $("#grid-comp8").grid({

        dataSource: data1,
        sortable: true,
        id: 'case-g8',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp9").grid({

        dataSource: data1,
        sortable: false,
        id: 'case-g9',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp10").grid({

        dataSource: data1,
        canDrag: true,
        id: 'case-g10',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp11").grid({

        dataSource: data1,
        canDrag: false,
        id: 'case-g11',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp12").grid({

        dataSource: data1,
        showHeader: true,
        id: 'case-g12',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp13").grid({

        dataSource: data1,
        showHeader: false,
        id: 'case-g13',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp14").grid({

        dataSource: data1,
        columnMenu: true,
        id: 'case-g14',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp15").grid({

        dataSource: data1,
        columnMenu: false,
        id: 'case-g15',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp16").grid({

        dataSource: data1,
        showNumCol: true,
        id: 'case-g16',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp17").grid({

        dataSource: data1,
        showNumCol: false,
        id: 'case-g17',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp18").grid({

        dataSource: data1,
        multiSelect: true,
        id: 'case-g18',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu

    });
    $("#grid-comp19").grid({

        dataSource: data1,
        multiSelect: false,
        id: 'case-g19',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp20").grid({

        dataSource: data1,
        showSumRow: true,
        id: 'case-g20',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp21").grid({

        dataSource: data1,
        showSumRow: false,
        id: 'case-g21',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp22").grid({

        dataSource: data1,
        id: 'case-g22',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp23").grid({

        dataSource: data1,
        id: 'case-g23',
        editable: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp24").grid({

        dataSource: data2,
        showTree: true,
        id: 'case-g24',
        editable: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp25").grid({

        dataSource: data1,
        id: 'case-g25',
        showTree: false,
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp26").grid({

        dataSource: data2,
        showTree: true,
        autoExpand: true,
        id: 'case-g26',
        editable: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    $("#grid-comp27").grid({

        dataSource: data2,
        showTree: true,
        autoExpand: false,
        id: 'case-g27',
        editable: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu
    });
    /* 	$("#grid-comp28").grid({

     dataSource : data1,
     id : 'case-g28',
     editable : false,
     keyField : 'id',
     parentKeyField : 'pid',
     columns : colu
     }) */
    var colu2 = [{
        field: "id",
        title: "id",
        sortable: true
    }, {
        field: "pid",
        title: "pid",
        sortable: true
    }, {
        field: "column1",
        title: "column1",
        sortable: true
    }, {
        field: "column2",
        title: "autoExpand-false",
        autoExpand: false,
        sortable: true
    }, {
        field: "column3",
        title: "autoExpand-true",
        autoExpand: true,
        sortable: true
    }
    ];
    $("#grid-comp29").grid({

        dataSource: data1,
        id: 'case-g29',
        editable: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu2
    });
    colu3 = [{
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
        title: "sortable-false",
        sortable: false
    }, {
        field: "column3",
        title: "sortable-true",
        sortable: true
    }
    ];
    $("#grid-comp30").grid({

        dataSource: data1,
        id: 'case-g30',
        sortable: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu3
    });
    $("#grid-comp31").grid({

        dataSource: data1,
        id: 'case-g31',
        sortable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu3
    });
    var colu4 = [{
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
        title: "canDrag-false",
        canDrag: false
    }, {
        field: "column3",
        title: "canDrag-true",
        canDrag: true
    }
    ];
    $("#grid-comp32").grid({

        dataSource: data1,
        id: 'case-g32',
        canDrag: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu4
    });
    $("#grid-comp33").grid({

        dataSource: data1,
        id: 'case-g33',
        canDrag: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu4
    });
    var colu5 = [{
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
        title: "fixed-false",
        fixed: false
    }, {
        field: "column3",
        title: "fixed-true",
        fixed: true
    }
    ];
    $("#grid-comp34").grid({

        dataSource: data1,
        id: 'case-g34',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu5
    });
    var colu6 = [{
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
        title: "visible-false",
        visible: true
    }, {
        field: "column3",
        title: "visible-true",
        visible: true
    }
    ];
    $("#grid-comp35").grid({

        dataSource: data1,
        id: 'case-g35',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu6
    });
    var colu7 = [{
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
        title: "sumCol-false",
        sumCol: false
    }, {
        field: "column3",
        title: "sumCol-true",
        sumCol: true
    }
    ];
    $("#grid-comp36").grid({

        dataSource: data1,
        id: 'case-g36',
        showNumCol: true,
        showSumRow: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu7
    });

    var colu8 = [{
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
        title: "editable-false",
        editable: false
    }, {
        field: "column3",
        title: "editable-true",
        editable: true
    }
    ];
    $("#grid-comp37").grid({

        dataSource: data1,
        id: 'case-g37',
        editable: false,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu8
    });
    $("#grid-comp38").grid({

        dataSource: data1,
        id: 'case-g38',
        editable: true,
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu8
    });
    var colu9 = [{
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
        title: "column3",
        editType: function (obj) {
            var htmlStr = "<select><option value ='1'>Volvo</option><option value ='2'>Saab</option><option value='3'>Opel</option><option value='4'>Audi</option></select> ";

            obj.element.innerHTML = htmlStr;

            $('input', $(obj.element)).on('blur', function () {
                $(obj.rowObj).attr(obj.field, obj.value);
            });
        }
    }
    ];
    $("#grid-comp39").grid({

        dataSource: data3,
        editable: true,
        id: 'case-g39',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu9
    });
    var colu10 = [{
        field: "id",
        title: "id"
    }, {
        field: "pid",
        title: "pid"
    }, {
        field: "column1",
        title: "column1",
        dataType: 'string'
    }, {
        field: "column2",
        title: "column2",
        dataType: 'Date'
    }, {
        field: "column3",
        title: "column3",
        dataType: 'DateTime'
    }
    ];
    $("#grid-comp40").grid({

        dataSource: data3,
        editable: true,
        id: 'case-g40',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu10
    });
    var colu11 = [{
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
        title: "column3",
        renderType: function (obj) {

            obj.element.innerHTML = obj.value + obj.row.value.column2;
        }
    }
    ];
    $("#grid-comp41").grid({

        dataSource: data3,
        editable: true,
        id: 'case-g41',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu11
    });
    var colu12 = [{
        field: "id",
        title: "id",
        sumCol: true
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
    var data22 = {
        values: [{
            column1: "2211",
            column2: "2212",
            column3: "2213",
            id: '1'
        }, {
            column1: "2221",
            column2: "2222",
            column3: "2223",
            id: '2',
            pid: '0'
        }, {
            column1: "2231",
            column2: "2232",
            column3: "2233",
            id: '3',
            pid: '1'
        }, {
            column1: "2241",
            column2: "2242",
            column3: "2243",
            id: '4',
            pid: '1'
        }
        ]
    };

    window.gridObj8 = $("#grid-comp42").grid({

        dataSource: {},
        editable: true,
        id: 'case-g42',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu12,
        transMap: {
            ml_clear_set: "clear_set",
            ml_show_column: "show_column",
            ml_no_rows: "no_rows"
        }
    });
    $('#deleteOneRow2').on('click', function () {

        var index1 = window.gridObj8.getAllRows();
        window.gridObj8.deleteOneRow(index1.length - 1);
    });
    $("#grid-comp43").grid({

        dataSource: data22,
        id: 'case-g43',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        editable: false,
        onBeforeRowSelected: function (obj) {
            var i = obj.rowIndex;
            var xy = parseInt(i);
            return xy % 2 == 0;
        }
    });
    $("#grid-comp44").grid({

        dataSource: data22,
        id: 'case-g44',
        keyField: 'id',
        parentKeyField: 'pid',
        columns: colu12,
        editable: false,
        onRowSelected: function (obj) {
            var i = obj.rowIndex;
            if (parseInt(i) % 2 == 0) {

            }

        }
    });
    window.gridObj = $("#grid-comp45").grid({

        dataSource: data22,
        id: 'case-g45',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        editable: false,
        onBeforeRowUnSelected: function (obj) {
            var i = obj.rowIndex;
            var xy = parseInt(i);
            return xy % 2 == 0;
        },
        onRowUnSelected: function (obj) {
            if (obj.rowIndex == 2) {

            }

        }
    });
    var unselect = 0;
    $("#setRowUnselect1").on('click', function () {

        if (unselect > 3) {
            unselect = 0;
        }
        window.gridObj.setRowUnselect(unselect);
        unselect = unselect + 1;
    });
    $("#setRowselect1").on('click', function () {

        if (unselect > 3) {
            unselect = 0;
        }
        window.gridObj.setRowSelect(unselect);
    });
    window.gridObj2 = $("#grid-comp46").grid({

        dataSource: data22,
        id: 'case-g46',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        editable: false,
        onBeforeAllRowSelected: function () {
            return false;
        }

    });
    window.gridObj3 = $("#grid-comp47").grid({

        dataSource: data22,
        id: 'case-g47',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        editable: false,
        onBeforeAllRowSelected: function () {
            return true;
        },
        onAllRowSelected: function (rows) {

        }
    });
    window.gridObj4 = $("#grid-comp48").grid({

        dataSource: data22,
        id: 'case-g48',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        editable: false,
        onBeforeAllRowUnSelected: function () {
            return true;
        },
        onAllRowUnSelected: function (obj) {

        }
    });
    $('#allrowselected1').on('click', function () {
        window.gridObj4.setAllRowSelect();

    });
    $('#allrowunselected1').on('click', function () {
        window.gridObj4.setAllRowUnSelect();

    });
    window.gridObj5 = $("#grid-comp49").grid({

        dataSource: data22,
        editable: true,
        id: 'case-g49',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        onBeforeRowEditConfirm: function () {
            // obj.gridObj = this;
            // obj.oldRowObj = row;
            // obj.editRowObj = this.editRowObj;
            // obj.eidtRowIndex = this.eidtRowIndex;
            return true;
        }
    });
    window.gridObj6 = $("#grid-comp50").grid({

        dataSource: data22,
        editable: true,
        id: 'case-g50',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        showSumRow: false
    });
    var datachange = data1;
    $('#changedatasource1').on('click', function () {

        window.gridObj6.setDataSource(datachange);
        if (datachange == data1)
            datachange = data22;
        else
            datachange = data1;
    });
    var data33 = {
        fields: ["id", "pid", "column1", "column2", "column3"],
        values: [["11", "", "x1", "y1", "z1"],
            ["22", "11", "x2", "y2", "z2"],
            ["33", "22", "x3", "y3", "z3"]
        ]
    };
    $('#changedatasource2').on('click', function () {

        window.gridObj6.setDataSourceFun1(data33);
    });
    $('#getSelectRowsIndex1').on('click', function () {

        window.gridObj6.getSelectRowsIndex();

    });
    $('#getSelectRows1').on('click', function () {

         window.gridObj6.getSelectRows();

    });
    /*var rows1 = [{id: "5", pid: "2", column1: "c1", column2: "c2", column3: "c3"},
        {id: "6", pid: "2", column1: "d1", column2: "d2", column3: "d3"},
        {id: "7", pid: "2", column1: "f1", column2: "f2", column3: "f3"}
    ];*/
    var onerow = 0;
    $('#addOneRow1').on('click', function () {
        lens = window.gridObj6.getAllRows().length;
        if (onerow >= lens) {
            onerow = 0;
        }
        var rand = parseInt(Math.random() * 1000);
        updaterow = {
            "column1": (rand + 1) + "x",
            "column2": (rand + 1) + "y",
            "column3": (rand + 1) + "z",
            "id": (rand + 1) + "id",
            "pid": "112"
        };
        window.gridObj6.addOneRow(updaterow, onerow * 2);
        onerow++;
    });
    $('#addRows1').on('click', function () {

        window.gridObj6.getAllRows();
        var newrows = [];
        for (j = 0; j < 3; j++) {
            newrows.push({
                "column1": (j + 1) + "x",
                "column2": (j + 1) + "y",
                "column3": (j + 1) + "z",
                "id": (j + 1) + "id",
                "pid": "112"
            });
        }
        window.gridObj6.addRows(newrows, 1);
    });
    $('#deleteOneRow1').on('click', function () {

        var inde = window.gridObj6.getSelectRowsIndex();
        indexs = [];
        $.each(inde, function (i) {
            indexs.push(inde[i]);

        });
        window.gridObj6.deleteOneRow(indexs[0]);
    });
    $('#deleteRows1').on('click', function () {

        var inde = window.gridObj6.getSelectRowsIndex();
        indexs = [];
        $.each(inde, function (i) {
            indexs.push(inde[i]);

        });
        if (inde.length > 0) {
            window.gridObj6.deleteRows(inde);
        }

    });
    var ind = 0;
    var updaterow = {};
    $('#updateRow1').on('click', function () {

        lens = window.gridObj6.getAllRows().length;
        if (ind >= lens) {
            ind = 0;
        }
        var rand = parseInt(Math.random() * 1000);
        updaterow = {
            "column1": (rand + 1) + "x",
            "column2": (rand + 1) + "y",
            "column3": (rand + 1) + "z",
            "id": (rand + 1) + "id",
            "pid": "112"
        };
        window.gridObj6.updateRow(ind, updaterow);
        ind++;
    });
    $('#updateValueAt1').on('click', function () {

        lens = window.gridObj6.getAllRows().length;
        var rand = parseInt(Math.random() * lens);
        window.gridObj6.updateValueAt(rand, "id", "newid");
    });
    $('#getRowByIndex1').on('click', function () {

        lens = window.gridObj6.getAllRows().length;
        var rand = parseInt(Math.random() * lens);
        var row = window.gridObj6.getRowByIndex(rand);

    });
    $('#setRenderType1').on('click', function () {

        window.gridObj6.setRenderType("column2", function (obj) {

            obj.element.innerHTML = obj.value + obj.row.value.column2;
        })
    });
    $('#setEditType1').on('click', function () {
        window.gridObj6.setEditType('column1', function (obj) {
            var htmlStr = '<select>\
      <option value ="1">Volvo</option>\
      <option value ="2">Saab</option>\
      <option value="3">Opel</option>\
      <option value="4">Audi</option>\
    </select> ';

            obj.element.innerHTML = htmlStr;

            $('input', $(obj.element)).on('blur', function () {
                $(obj.rowObj).attr(obj.field, obj.value);
            });
        })
    });
    $('#setEditable1').on('click', function () {
        window.gridObj6.setEditable(!gridObj6.options.editable);
    });
    window.gridObj7 = $("#grid-comp51").grid({

        dataSource: data22,
        editable: true,
        id: 'case-g51',
        keyField: 'id',
        parentKeyField: 'pid',
        multiSelect: true,
        columns: colu12,
        showTree: true
    });
    $('#getAllChildRow1').on('click', function () {
        var g = window.gridObj7;
        var rows = g.getAllChildRow(g.getRowByIndex(0));
        $.each(rows, function () {

        });
    });
    $('#getAllChildRowIndex1').on('click', function () {
        var g = window.gridObj7;
        var index2 = g.getAllChildRowIndex(g.getRowByIndex(0));
        $.each(index2, function () {

        });
    });

});
