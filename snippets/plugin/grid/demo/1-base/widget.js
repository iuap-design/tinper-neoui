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