## 分页控件

分页控件提供了无border分页、有间距的分页、多尺寸分页。

#### 如何使用

分页通过添加`u-pagination`的样式来实现基本的分页效果


### 基础

<div class="examples-code"><pre><code>
&lt;div id='pagination' class='u-pagination'>
&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
  var element = document.getElementById("pagination");
  var comp = new u.pagination({ el: element,showState:false });
  comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
  comp.on('pageChange', function(pageIndex) {
      console.log('新的页号为' + pageIndex);
  });
  comp.on('sizeChange', function(arg) {
      console.log('每页显示条数为' + arg[0]);
  });</code></pre>



### 无边框
在含有`u-pagination`的div元素中添加`u-pagination-no-border`样式即可

<div class="examples-code"><pre><code>
&lt;div id='paginationNoBorder' class='u-pagination u-pagination-no-border'>
&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
 var paginationNoBorder = document.getElementById("paginationNoBorder");

 var comp = new u.pagination({ el: paginationNoBorder,showState:false  });
 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
</code></pre>



### 有间距
添加样式`pagination-gap`可以增加页码之间的间距

<div class="examples-code"><pre><code>
&lt;div id='paginationGap' class='u-pagination pagination-gap'>
&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
 var paginationGap = document.getElementById('paginationGap');

 var comp = new u.pagination({ el: paginationGap, showState:false  });

 comp.update({ totalPages: 100, pageSize: 20, currentPage: 1, totalCount: 200 });
</code></pre>



### 多尺寸
添加`pagination-lg`、`pagination-sm`样式可以使分页变大、变小

<div class="examples-code"><pre><code>
&lt;p>大尺寸&lt;/p>
&lt;div id='paginationLg' class='u-pagination pagination-lg'>
&lt;/div>
&lt;p>默认尺寸&lt;/p>
&lt;div id='paginationDefault' class='u-pagination'>
&lt;/div>
&lt;p>小尺寸&lt;/p>
&lt;div id='paginationSm' class='u-pagination pagination-sm'>
&lt;/div></code></pre>
</div>


<pre class="examples-code"><code>
var paginationLg = document.getElementById("paginationLg");
var comp = new u.pagination({el:paginationLg,showState:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationDefault = document.getElementById("paginationDefault");
var comp = new u.pagination({el:paginationDefault,jumppage:true,showState:false});
comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
var paginationSm = document.getElementById("paginationSm");
var comp = new u.pagination({el:paginationSm,jumppage:true,showState:false});

comp.update({totalPages: 100,pageSize:20,currentPage:1,totalCount:200});
</code></pre>

