  var element = document.getElementById('pagination');
    var comp = new u.pagination({el:element,jumppage:true});
    comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});

    this.comp.on('pageChange', function (pageIndex) {
        console.log('新的页号为' + pageIndex);
    });

    this.comp.on('sizeChange', function (arg) {
        console.log('每页显示条数为' + arg[0]);
    });
    //无边框分页
    var paginationNoBorder = document.getElementById('paginationNoBorder');
    var comp = new u.pagination({el:paginationNoBorder,jumppage:true});
    comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});

     //有间距的分页
    var paginationGap = document.getElementById('paginationGap');
    var comp = new u.pagination({el:paginationGap,jumppage:true});
    comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});

    //大尺寸分页
    var paginationLg = document.getElementById('paginationLg');
    var comp = new u.pagination({el:paginationLg,jumppage:true});
    comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200,showState:false});

     //默认尺寸分页
    var paginationDefault = document.getElementById('paginationDefault');
    var comp = new u.pagination({el:paginationDefault,jumppage:true});
    comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200,showState:false});

     //小尺寸分页
    var paginationSm = document.getElementById('paginationSm');
    var comp = new u.pagination({el:paginationSm,jumppage:true});
    comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200,showState:false});