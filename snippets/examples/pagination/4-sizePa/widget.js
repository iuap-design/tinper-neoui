var paginationLg = document.getElementById("paginationLg");
var comp = new u.pagination({el:paginationLg,showState:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationDefault = document.getElementById("paginationDefault");
var comp = new u.pagination({el:paginationDefault,jumppage:true,showState:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationSm = document.getElementById("paginationSm");
var comp = new u.pagination({el:paginationSm,jumppage:true,showState:false});

comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
