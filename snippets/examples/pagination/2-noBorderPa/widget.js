 var paginationNoBorder = document.getElementById("paginationNoBorder");

 var comp = new u.pagination({ el: paginationNoBorder,showState:false  });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
