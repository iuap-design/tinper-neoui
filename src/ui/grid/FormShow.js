;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype;

	/*
	 * 创建form形式下div
	 */
	gridCompProto.createFromDivs = function() {
		if (this.createFormFlag) {
			return;
		}
		var htmlStr = '<div id="' + this.options.id + '_form" class="u-grid-form">';
		htmlStr += this.createFromContent();
		$('#' + this.options.id)[0].insertAdjacentHTML('afterBegin', htmlStr);
		this.createFormFlag = true;
	};

	/*
	 * 创建form形式下内容区域
	 */
	gridCompProto.createFromContent = function() {
		var htmlStr = '<div class="u-grid-form-content" id="' + this.options.id + '_form_content" class="u-grid-content">';
		htmlStr += '<table role="grid" id="' + this.options.id + '_form_content_table">';
		htmlStr += this.createFormContentRows();
		htmlStr += '</table>';
		return htmlStr;
	};

	/*
	 * 创建form形式下内容区域所有行
	 */
	gridCompProto.createFormContentRows = function() {
		var oThis = this,
			htmlStr = "";
		// 遍历生成所有行
		if (this.dataSourceObj.rows) {
			htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_form_content_tbody">';
			$.each(this.dataSourceObj.rows, function() {
				htmlStr += '<tr role="row"><td role="rowcell">';
				var value = this.value;
				$.each(oThis.gridCompColumnArr, function() {
					var f = this.options.field,
						t = this.options.title,
						v = $(value).attr(f);
					htmlStr += '<div>' + t + ':</div>';
					htmlStr += '<div>' + v + '</div>';
				});
				htmlStr += '</td></tr>';
			});
			htmlStr += '</tbody>';
		}
		return htmlStr;
	};

	/*
	 * 整体宽度改变处理(form形式)
	 */
	gridCompProto.widthChangeFormFun = function() {
		this.createFromDivs();
		$('#' + this.options.id + '_grid').css('display', 'none');
		$('#' + this.options.id + '_form').css('display', 'block');
		this.showType = 'form';
		if(typeof this.options.afterCreate == 'function'){
			this.options.afterCreate.call(this);
		}
	};
})(jQuery, window, document);
