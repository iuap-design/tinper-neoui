# 分页控件

分页控件提供了基础分页、无border分页、有间距的分页、多尺寸分页。

# 如何使用

分页通过添加`u-pagination`的样式来实现基本的分页效果

# 示例

replaceExamp

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
	

