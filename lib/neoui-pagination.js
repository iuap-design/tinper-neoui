'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pagination = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Module : neoui-pagination
                                                                                                                                                                                                                                                   * Author : Kvkens(yueming@yonyou.com)
                                                                                                                                                                                                                                                   * Date	  : 2016-08-03 08:45:49
                                                                                                                                                                                                                                                   */

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _extend = require('neoui-sparrow/lib/extend');

var _dom = require('neoui-sparrow/lib/dom');

var _util = require('neoui-sparrow/lib/util');

var _event = require('neoui-sparrow/lib/event');

var _compMgr = require('neoui-sparrow/lib/compMgr');

var pagination = _BaseComponent.BaseComponent.extend({});

var PageProxy = function PageProxy(options, page) {
	this.isCurrent = function () {
		return page == options.currentPage;
	};

	this.isFirst = function () {
		return page == 1;
	};

	this.isLast = function () {
		return page == options.totalPages;
	};

	this.isPrev = function () {
		return page == options.currentPage - 1;
	};

	this.isNext = function () {
		return page == options.currentPage + 1;
	};

	this.isLeftOuter = function () {
		return page <= options.outerWindow;
	};

	this.isRightOuter = function () {
		return options.totalPages - page < options.outerWindow;
	};

	this.isInsideWindow = function () {
		if (options.currentPage < options.innerWindow + 1) {
			return page <= options.innerWindow * 2 + 1;
		} else if (options.currentPage > options.totalPages - options.innerWindow) {
			return options.totalPages - page <= options.innerWindow * 2;
		} else {
			return Math.abs(options.currentPage - page) <= options.innerWindow;
		}
	};

	this.number = function () {
		return page;
	};
	this.pageSize = function () {
		return options.pageSize;
	};
};

var View = {
	firstPage: function firstPage(pagin, options, currentPageProxy) {
		return '<li role="first"' + (currentPageProxy.isFirst() ? 'class="disabled"' : '') + '><a >' + options.first + '</a></li>';
	},

	prevPage: function prevPage(pagin, options, currentPageProxy) {
		return '<li role="prev"' + (currentPageProxy.isFirst() ? 'class="disabled"' : '') + '><a  rel="prev">' + options.prev + '</a></li>';
	},

	nextPage: function nextPage(pagin, options, currentPageProxy) {
		return '<li role="next"' + (currentPageProxy.isLast() ? 'class="disabled"' : '') + '><a  rel="next">' + options.next + '</a></li>';
	},

	lastPage: function lastPage(pagin, options, currentPageProxy) {

		return '<li role="last"' + (currentPageProxy.isLast() ? 'class="disabled"' : '') + '><a >' + options.last + '</a></li>';
	},

	gap: function gap(pagin, options) {
		return '<li role="gap" class="disabled"><a href="#">' + options.gap + '</a></li>';
	},

	page: function page(pagin, options, pageProxy) {
		return '<li role="page"' + (pageProxy.isCurrent() ? 'class="active"' : '') + '><a ' + (pageProxy.isNext() ? ' rel="next"' : '') + (pageProxy.isPrev() ? 'rel="prev"' : '') + '>' + pageProxy.number() + '</a></li>';
	}

};

//pagination.prototype.compType = 'pagination';
pagination.prototype.init = function (element, options) {
	var self = this;
	var element = this.element;
	this.$element = element;
	this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
	this.$ul = this.$element; //.find("ul");
	this.render();
};

pagination.prototype.DEFAULTS = {
	currentPage: 1,
	totalPages: 1,
	pageSize: 10,
	pageList: [5, 10, 20, 50, 100],
	innerWindow: 2,
	outerWindow: 0,
	first: '&laquo;',
	prev: '<i class="uf uf-anglepointingtoleft"></i>',
	next: '<i class="uf uf-anglearrowpointingtoright"></i>',
	last: '&raquo;',
	gap: '···',
	//totalText: '合计:',
	totalText: '共',
	truncate: false,
	showState: true,
	page: function page(_page) {
		return true;
	}
};

pagination.prototype.update = function (options) {
	this.$ul.innerHTML = "";
	this.options = (0, _extend.extend)({}, this.options, options);
	this.render();
};
pagination.prototype.render = function () {
	var a = new Date().valueOf();

	var options = this.options;

	if (!options.totalPages) {
		this.$element.style.display = "none";
		return;
	} else {
		this.$element.style.display = "block";
	}

	var htmlArr = [];
	var currentPageProxy = new PageProxy(options, options.currentPage);

	//update pagination by pengyic@yonyou.com
	//预设显示页码数
	var windows = 2;
	var total = options.totalPages - 0;
	var current = options.currentPage - 0;
	//预设显示页码数截断修正
	var fix = 0;
	var pageProxy;
	if (current - 2 <= windows + 1) {
		for (var i = 1; i <= current; i++) {
			pageProxy = new PageProxy(options, i);
			htmlArr.push(View.page(this, options, pageProxy));
		}

		fix = windows - (current - 1) < 0 ? 0 : windows - (current - 1);

		if (total - current - fix <= windows + 1) {
			for (var i = current + 1; i <= total; i++) {
				pageProxy = new PageProxy(options, i);
				htmlArr.push(View.page(this, options, pageProxy));
			}
		} else {
			for (var i = current + 1; i <= current + windows + fix; i++) {
				pageProxy = new PageProxy(options, i);
				htmlArr.push(View.page(this, options, pageProxy));
			}
			//添加分割'...'
			htmlArr.push(View.gap(this, options));

			pageProxy = new PageProxy(options, total);
			htmlArr.push(View.page(this, options, pageProxy));
		}
	} else {
		if (total - current <= windows + 1) {
			fix = windows - (total - current) < 0 ? 0 : windows - (total - current);

			for (var i = current - windows - fix; i <= total; i++) {
				pageProxy = new PageProxy(options, i);
				htmlArr.push(View.page(this, options, pageProxy));
			}
			if (i >= 2) {
				//添加分割'...'
				htmlArr.unshift(View.gap(this, options));
				pageProxy = new PageProxy(options, 1);
				htmlArr.unshift(View.page(this, options, pageProxy));
			}
		} else {
			for (var i = current - windows; i <= current + windows; i++) {
				pageProxy = new PageProxy(options, i);
				htmlArr.push(View.page(this, options, pageProxy));
			}
			//添加分割'...'
			htmlArr.push(View.gap(this, options));

			pageProxy = new PageProxy(options, total);
			htmlArr.push(View.page(this, options, pageProxy));

			//添加分割'...'
			htmlArr.unshift(View.gap(this, options));
			pageProxy = new PageProxy(options, 1);
			htmlArr.unshift(View.page(this, options, pageProxy));
		}
	}
	htmlArr.unshift(View.prevPage(this, options, currentPageProxy));
	htmlArr.push(View.nextPage(this, options, currentPageProxy));
	/*
 if (!currentPageProxy.isFirst() || !options.truncate) {
 		if (options.first) {
 		htmlArr.push(View.firstPage(this, options, currentPageProxy))
 	}
 	if (options.prev) {
 		htmlArr.push(View.prevPage(this, options, currentPageProxy));
 	}
 }
 
 var wasTruncated = false;
 	for (var i = 1, length = options.totalPages; i <= length; i++) {
 	var pageProxy = new PageProxy(options, i);
 	if (pageProxy.isLeftOuter() || pageProxy.isRightOuter() || pageProxy.isInsideWindow()) {
 		htmlArr.push(View.page(this, options, pageProxy));
 		wasTruncated = false;
 	} else {
 		if (!wasTruncated && options.outerWindow > 0) {
 			htmlArr.push(View.gap(this, options));
 			wasTruncated = true;
 		}
 	}
 }
 	if (!currentPageProxy.isLast() || !options.truncate) {
 	if (options.next) {
 		htmlArr.push(View.nextPage(this, options, currentPageProxy));
 	}
 		if (options.last) {
 		htmlArr.push(View.lastPage(this, options, currentPageProxy));
 	}
 }
 */
	if (options.totalCount === undefined || options.totalCount <= 0) {
		options.totalCount = 0;
	}
	if (options.showState) {
		var htmlStr = '<div class="pagination-state">' + options.totalText + '&nbsp;' + options.totalCount + '&nbsp;条</div>';
		htmlArr.push(htmlStr);

		if (options.jumppage || options.pageSize) {

			var pageOption = '';
			options.pageList.forEach(function (item) {
				if (options.pageSize - 0 == item) {
					pageOption += '<option selected>' + item + '</option>';
				} else {
					pageOption += '<option>' + item + '</option>';
				}
			});
			var jumppagehtml = '到<input class="page_j" value=' + options.currentPage + '>页<input class="pagination-jump" type="button" value="确定"/>';
			var sizehtml = '显示<select  class="page_z">' + pageOption + '</select>条&nbsp;&nbsp;';
			var tmpjump = "<div class='pagination-state'>" + (options.pageSize ? sizehtml : "") + (options.jumppage ? jumppagehtml : "") + "</div>";
			htmlArr.push(tmpjump);
			//<i class='jump_page fa fa-arrow-circle-right' style='margin-left: 8px; cursor: pointer;'></i>
		}
	}

	this.$ul.innerHTML = "";
	this.$ul.insertAdjacentHTML('beforeEnd', htmlArr.join(''));

	var me = this;
	(0, _event.on)(this.$ul.querySelector(".pagination-jump"), "click", function () {
		var jp, pz;
		jp = me.$ul.querySelector(".page_j").value || options.currentPage;
		pz = me.$ul.querySelector(".page_z").value || options.pageSize;

		//if (pz != options.pageSize){
		//	me.$element.trigger('sizeChange', [pz, jp - 1])
		//}else{
		//	me.$element.trigger('pageChange', jp - 1)
		//}
		me.page(jp, options.totalPages, pz);
		//me.$element.trigger('pageChange', jp - 1)
		//me.$element.trigger('sizeChange', pz)
		return false;
	});

	(0, _event.on)(this.$ul.querySelector('[role="first"] a'), 'click', function () {
		if (options.currentPage <= 1) return;
		me.firstPage();
		//me.$element.trigger('pageChange', 0)
		return false;
	});
	(0, _event.on)(this.$ul.querySelector('[role="prev"] a'), 'click', function () {
		if (options.currentPage <= 1) return;
		me.prevPage();
		//me.$element.trigger('pageChange', options.currentPage - 1)
		return false;
	});
	(0, _event.on)(this.$ul.querySelector('[role="next"] a'), 'click', function () {
		if (parseInt(options.currentPage) + 1 > options.totalPages) return;
		me.nextPage();
		//me.$element.trigger('pageChange', parseInt(options.currentPage) + 1)
		return false;
	});
	(0, _event.on)(this.$ul.querySelector('[role="last"] a'), 'click', function () {
		if (options.currentPage == options.totalPages) return;
		me.lastPage();
		//me.$element.trigger('pageChange', options.totalPages - 1)
		return false;
	});
	(0, _util.each)(this.$ul.querySelectorAll('[role="page"] a'), function (i, node) {
		(0, _event.on)(node, 'click', function () {
			var pz = me.$element.querySelector(".page_z") && me.$element.querySelector(".page_z").value || options.pageSize;
			me.page(parseInt(this.innerHTML), options.totalPages, pz);
			//me.$element.trigger('pageChange', parseInt($(this).html()) - 1)

			return false;
		});
	});
	(0, _event.on)(this.$ul.querySelector('.page_z'), 'change', function () {
		var pz = me.$element.querySelector(".page_z") && me.$element.querySelector(".page_z").value || options.pageSize;
		me.trigger('sizeChange', pz);
	});
};

pagination.prototype.page = function (pageIndex, totalPages, pageSize) {

	var options = this.options;

	if (totalPages === undefined) {
		totalPages = options.totalPages;
	}
	if (pageSize === undefined) {
		pageSize = options.pageSize;
	}
	var oldPageSize = options.pageSize;
	// if (pageIndex > 0 && pageIndex <= totalPages) {
	// 	if (options.page(pageIndex)) {

	// 		this.$ul.innerHTML="";
	// 		options.pageSize = pageSize;
	// 		options.currentPage = pageIndex;
	// 		options.totalPages = totalPages;
	// 		this.render();

	// 	}
	// }else{
	// 	return false;
	// }

	if (options.page(pageIndex)) {
		if (pageIndex < 0) {
			pageIndex = 0;
		}

		if (pageIndex > totalPages) {
			pageIndex = totalPages;
		}
		this.$ul.innerHTML = "";
		options.pageSize = pageSize;
		options.currentPage = pageIndex;
		options.totalPages = totalPages;
		this.render();
	}
	if (pageSize != oldPageSize) {
		this.trigger('sizeChange', [pageSize, pageIndex - 1]);
	} else {
		this.trigger('pageChange', pageIndex - 1);
	}

	//this.$element.trigger('pageChange', pageIndex)

	return false;
};

pagination.prototype.firstPage = function () {
	return this.page(1);
};

pagination.prototype.lastPage = function () {
	return this.page(this.options.totalPages);
};

pagination.prototype.nextPage = function () {
	return this.page(parseInt(this.options.currentPage) + 1);
};

pagination.prototype.prevPage = function () {
	return this.page(this.options.currentPage - 1);
};

pagination.prototype.disableChangeSize = function () {
	this.$element.querySelector('.page_z').setAttribute('readonly', true);
};

pagination.prototype.enableChangeSize = function () {
	this.$element.querySelector('.page_z').removeAttribute('readonly');
};

function Plugin(option) {
	return this.each(function () {
		var $this = $(this);
		var data = $this.data('u.pagination');
		var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

		if (!data) $this.data('u.pagination', data = new Pagination(this, options));else data.update(options);
	});
}

// var old = $.fn.pagination;

// $.fn.pagination = Plugin
// $.fn.pagination.Constructor = Pagination

if (_compMgr.compMgr) _compMgr.compMgr.regComp({
	comp: pagination,
	compAsString: 'u.pagination',
	css: 'u-pagination'
});

if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		//扫描并生成控件
		_compMgr.compMgr.updateComp();
	});
}

exports.pagination = pagination;