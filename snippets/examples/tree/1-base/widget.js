$(document).ready(function () {
    var viewModel = {
    	treeSetting:{
    		view:{
    			showLine:false,
                multiSelect:true
    		}
    	},
        dataTable: new u.DataTable({
            meta: {
                'id': {
                    'value':""
                },
                'pid': {
                    'value':""
                },
                'title':{
                	'value':""
                }
            }
        })
    };
var app = u.createApp();
    app.init(viewModel);
    var data = {
      "pageIndex": 1,
      "pageSize": 10,
      "rows": [
        {
          "status": "nrm",
          "data": {
            "id": "01",
            "pid": "root",
            "title": "f1"
          }
        },
        {
          "status": "nrm",
          "data": {
            "id": "02",
            "pid": "root",
            "title": "f2"
          }
        },
        {
          "status": "nrm",
          "data": {
            "id": "101",
            "pid": "01",
            "title": "f11"
          }
        },
        {
          "status": "nrm",
          "data": {
            "id": "102",
            "pid": "01",
            "title": "f12"
          }
        },
        {
          "status": "nrm",
          "data": {
            "id": "201",
            "pid": "02",
            "title": "f21"
          }
        }
      ]
    }
    // ajax 获取数据源
    /* $.ajax({
         type: 'GET',
         url: 'treeJson.json',
         dataType: 'JSON',
         async: true,
         success: function (data) {
            
          }
       }); 
    */
    viewModel.dataTable.setData(data);
    window.app=app;
    $("#addOneRow1").on("click",function(){
        var row={
            "status": "nrm",
            "data": {
                "id": "202",
                "pid": "02",
                "title": "f22"
            }};
        //先创建行模型，然后将数据插入行
        var r=new u.Row({parent:viewModel.dataTable});
        r.setData(row);
        //新增一行
        viewModel.dataTable.addRow(r);
    });
    $("#deleteOneRow").on("click",function(){
    	var index=viewModel.dataTable.getSelectedIndex();
    	//console.log(index);
    	viewModel.dataTable.removeRow(index)
    });
    $("#deleteAllRows").on("click",function(){
    	viewModel.dataTable.removeAllRows();
    })
});