# 分页控件

分页控件提供了无border分页、有间距的分页、多尺寸分页。

# 如何使用

分页通过添加`u-pagination`的样式来实现基本的分页效果

# 示例


##基础分页
<div class="example-content"><div id='pagination' class='u-pagination'>
</div></div>
<div class="example-content ex-hide"><script>  var element = document.getElementById("pagination");
  var comp = new u.pagination({ el: element,showState:false });
  comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
  comp.on('pageChange', function(pageIndex) {
      console.log('新的页号为' + pageIndex);
  });
  comp.on('sizeChange', function(arg) {
      console.log('每页显示条数为' + arg[0]);
  });
</script></div>

##无边框的分页
在含有`u-pagination`的div元素中添加`u-pagination-no-border`样式即可
<div class="example-content"><div id='paginationNoBorder' class='u-pagination u-pagination-no-border'>
</div></div>
<div class="example-content ex-hide"><script> var paginationNoBorder = document.getElementById("paginationNoBorder");

 var comp = new u.pagination({ el: paginationNoBorder,showState:false  });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

</script></div>

##有间距的分页
添加样式`pagination-gap`可以增加页码之间的间距
<div class="example-content"><div id='paginationGap' class='u-pagination pagination-gap'>
</div></div>
<div class="example-content ex-hide"><script> var paginationGap = document.getElementById('paginationGap');

 var comp = new u.pagination({ el: paginationGap, showState:false  });

 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

</script></div>

##不同尺寸的按钮
添加`pagination-lg`、`pagination-sm`样式可以使分页变大、变小
<div class="example-content"><p>大尺寸</p>
<div id='paginationLg' class='u-pagination pagination-lg'>
</div>
<p>默认尺寸</p>
<div id='paginationDefault' class='u-pagination'>
</div>
<p>小尺寸</p>
<div id='paginationSm' class='u-pagination pagination-sm'>
</div></div>
<div class="example-content ex-hide"><script>var paginationLg = document.getElementById("paginationLg");
var comp = new u.pagination({el:paginationLg,showState:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationDefault = document.getElementById("paginationDefault");
var comp = new u.pagination({el:paginationDefault,jumppage:true,showState:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationSm = document.getElementById("paginationSm");
var comp = new u.pagination({el:paginationSm,jumppage:true,showState:false});

comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});

</script></div>


	

