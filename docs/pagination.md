# 分页控件

分页

# 如何使用

暂无

# 示例

<div class="example-head">基础分页</div>
<div class="example-content"><div id='pagination' class='u-pagination'>
</div>

</div><script>  var element = document.getElementById('pagination');
  var comp = new u.pagination({ el: element, jumppage: true });
  comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

  this.comp.on('pageChange', function(pageIndex) {
      console.log('新的页号为' + pageIndex);
  });

  this.comp.on('sizeChange', function(arg) {
      console.log('每页显示条数为' + arg[0]);
  });

</script><pre><code>&lt;div id='pagination' class='u-pagination'>
&lt;/div>
</code></pre>
<pre><code>  var element = document.getElementById('pagination');
  var comp = new u.pagination({ el: element, jumppage: true });
  comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

  this.comp.on('pageChange', function(pageIndex) {
      console.log('新的页号为' + pageIndex);
  });

  this.comp.on('sizeChange', function(arg) {
      console.log('每页显示条数为' + arg[0]);
  });
</code></pre>
<div class="example-head">有间距的分页</div>
<div class="example-content"><div id='paginationGap' class='u-pagination pagination-gap'>
</div>

</div><script> //有间距的分页
 var paginationGap = document.getElementById('paginationGap');
 var comp = new u.pagination({ el: paginationGap, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

</script><pre><code>&lt;div id='paginationGap' class='u-pagination pagination-gap'>
&lt;/div>
</code></pre>
<pre><code> //有间距的分页
 var paginationGap = document.getElementById('paginationGap');
 var comp = new u.pagination({ el: paginationGap, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
</code></pre>
<div class="example-head">无边框的分页</div>
<div class="example-content"><div id='paginationNoBorder' class='u-pagination u-pagination-no-border'>
</div>

</div><script> //无边框分页
 var paginationNoBorder = document.getElementById('paginationNoBorder');
 var comp = new u.pagination({ el: paginationNoBorder, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

</script><pre><code>&lt;div id='paginationNoBorder' class='u-pagination u-pagination-no-border'>
&lt;/div>
</code></pre>
<pre><code> //无边框分页
 var paginationNoBorder = document.getElementById('paginationNoBorder');
 var comp = new u.pagination({ el: paginationNoBorder, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
</code></pre>
<div class="example-head">不同尺寸的按钮</div>
<div class="example-content"><p>大尺寸</p>
<div id='paginationLg' class='u-pagination pagination-lg'>
</div>
<p>默认尺寸</p>
<div id='paginationDefault' class='u-pagination'>
</div>
<p>小尺寸</p>
<div id='paginationSm' class='u-pagination pagination-sm'>
</div>

</div><script>
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
</script><pre><code>&lt;p>大尺寸&lt;/p>
&lt;div id='paginationLg' class='u-pagination pagination-lg'>
&lt;/div>
&lt;p>默认尺寸&lt;/p>
&lt;div id='paginationDefault' class='u-pagination'>
&lt;/div>
&lt;p>小尺寸&lt;/p>
&lt;div id='paginationSm' class='u-pagination pagination-sm'>
&lt;/div>
</code></pre>
<pre><code>
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
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200,showState:false});</code></pre>


<!--### 示例1

示例1说明

### 示例2

示例2说-->

# API

## 属性

暂无
<!--### 属性1

属性1说明

### 属性2

属性2说明-->

## 方法

暂无
<!--### 方法1

方法1说明

### 方法2

方法2说明-->
