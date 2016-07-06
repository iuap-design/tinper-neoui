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
    
    $.ajax({
        type: 'GET',
        url: 'treeJson.json',
        dataType: 'JSON',
        async: true,
        success: function (data) {
            viewModel.dataTable.setData(data);
        }
    });
    
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