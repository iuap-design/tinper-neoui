var paginationLg = document.getElementById("paginationLg");
var comp = new u.pagination({el:paginationLg,showState:true,showTotal:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationDefault = document.getElementById("paginationDefault");
var comp = new u.pagination({el:paginationDefault,showJump:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationSm = document.getElementById("paginationSm");
var comp = new u.pagination({el:paginationSm,showColumn:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
