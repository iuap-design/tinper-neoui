# 分页控件

分页控件提供了基础分页、无border分页、有间距的分页、多尺寸分页。

# 如何使用

分页通过添加“u-pagination”的样式来实现基本的分页效果

# 示例


##基础分页

<div class="example-content"><div id='pagination' class='u-pagination'>
</div>
</div>
<script>  var element = document.getElementById('pagination');
  var comp = new u.pagination({ el: element, jumppage: true });
  comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

  this.comp.on('pageChange', function(pageIndex) {
      console.log('新的页号为' + pageIndex);
  });

  this.comp.on('sizeChange', function(arg) {
      console.log('每页显示条数为' + arg[0]);
  });

</script>
<div class="examples-code"><pre><code>&lt;div id='pagination' class='u-pagination'>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>  var element = document.getElementById('pagination');
  var comp = new u.pagination({ el: element, jumppage: true });
  comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

  this.comp.on('pageChange', function(pageIndex) {
      console.log('新的页号为' + pageIndex);
  });

  this.comp.on('sizeChange', function(arg) {
      console.log('每页显示条数为' + arg[0]);
  });
</code></pre>
</div>

##无边框的分页

在含有“u-pagination”的div元素中添加“u-pagination-no-border”样式即可
<script> //无边框分页
 var paginationNoBorder = document.getElementById('paginationNoBorder');
 var comp = new u.pagination({ el: paginationNoBorder, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

</script>
<div class="example-content"><div id='paginationNoBorder' class='u-pagination u-pagination-no-border'>
</div>
</div>
<div class="examples-code"><pre><code> //无边框分页
 var paginationNoBorder = document.getElementById('paginationNoBorder');
 var comp = new u.pagination({ el: paginationNoBorder, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div id='paginationNoBorder' class='u-pagination u-pagination-no-border'>
&lt;/div></code></pre>
</div>

##有间距的分页

添加样式“pagination-gap”可以增加页码之间的间距
<script> //有间距的分页
 var paginationGap = document.getElementById('paginationGap');
 var comp = new u.pagination({ el: paginationGap, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });

</script>
<div class="example-content"><div id='paginationGap' class='u-pagination pagination-gap'>
</div>
</div>
<div class="examples-code"><pre><code> //有间距的分页
 var paginationGap = document.getElementById('paginationGap');
 var comp = new u.pagination({ el: paginationGap, jumppage: true });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div id='paginationGap' class='u-pagination pagination-gap'>
&lt;/div></code></pre>
</div>

##不同尺寸的按钮

添加“pagination-lg”、“pagination-sm”样式可以使分页变大、变小
<div class="example-content"><p>大尺寸</p>
<div id='paginationLg' class='u-pagination pagination-lg'>
</div>
<p>默认尺寸</p>
<div id='paginationDefault' class='u-pagination'>
</div>
<p>小尺寸</p>
<div id='paginationSm' class='u-pagination pagination-sm'>
</div>
</div>
<script>
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
</script>
<div class="examples-code"><pre><code>&lt;p>大尺寸&lt;/p>
&lt;div id='paginationLg' class='u-pagination pagination-lg'>
&lt;/div>
&lt;p>默认尺寸&lt;/p>
&lt;div id='paginationDefault' class='u-pagination'>
&lt;/div>
&lt;p>小尺寸&lt;/p>
&lt;div id='paginationSm' class='u-pagination pagination-sm'>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>
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
</div>


# API

## 创建分页对象

###描述
创建一个分页对象，方法：new u.pagination(paramter)

###参数paramter字段说明

* 类型 ：object
* 内容说明
	
	el ：分页绑定的dom元素

	jumppage：是否可跳转到某页。type为：boolean
###例子

		var comp = new u.pagination({el:paginationNoBorder,jumppage:true});

##分页对象update方法
###描述

更新分页的一些属性，方法：comp.update(paramter)//这里的comp指分页对象

###参数paramter字段说明
	
* 类型 ：object
* 内容说明

	totalPages: 总页数

	pageSize:每页显示的条数

	currentPage:当前页面
	
	totalCount:总条数
###例子

	 comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
上例修改了comp分页的总页码为100，每页显示20个，当前页是1，总条数是200
	

