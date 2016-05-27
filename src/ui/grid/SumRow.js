;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype;

	gridCompProto.createContentRowsSumRow = function(){
		if(this.options.showSumRow && this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0){
			htmlStr += this.createSumRow(createFlag);
		}
	};
	gridCompProto.createContentSumRow = function(){
		var htmlStr = '';
		if(this.options.showSumRow){
			htmlStr += '<div class="u-grid-content-left-sum-bottom" id="' + this.options.id + '_content_left_sum_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;'+bottonStr+'">';
			htmlStr += '</div>';
		}
		return htmlStr;
	}
	/*
	 * 创建合计行
	 */
	gridCompProto.createSumRow = function(createFlag){
		if(this.options.showSumRow){
			var oThis = this,idStr,gridCompColumnArr;
			if(createFlag == 'fixed'){
				idStr = 'fixed_';
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				idStr = '';
				gridCompColumnArr = this.gridCompColumnArr;
			}
			var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
			t = t> 0?t:0;
			var htmlStr = '<tr role="row" class="u-grid-content-sum-row" id="' + this.options.id + '_content_'+idStr+'sum_row" style="top:'+t+'px;">';
			$.each(gridCompColumnArr, function() {
				var f = this.options.field;
				var precision = this.options.precision;
				var dataType = this.options.dataType;
				var sumValue = oThis.dataSourceObj.getSumValue(f,this,oThis);
				if(dataType == 'float'){
					var o = {};
					o.value = sumValue;
					o.precision = precision?precision:2;
					sumValue = oThis.DicimalFormater(o)
				}
				var tdStyle = '';
				if(!this.options.visible){
					tdStyle = 'style="display:none;"';
				}
				htmlStr += '<td role="rowcell" title="' + sumValue + '" ' + tdStyle + '>';
				if(this.firstColumn){
					htmlStr += '<div class="u-gird-centent-sum-div"><span>' + oThis.transMap.ml_sum + '</span></div>';
				}
				var contentStyle = '';
				if(this.options.dataType == 'integer' || this.options.dataType == 'float') {
					contentStyle = 'style="text-align: right;"'
				}
				htmlStr += '<div class="u-grid-content-td-div" ' + contentStyle + '><span value="' + sumValue + '">' + sumValue + '</span></div></td>';				});
			htmlStr += '</tr>';
			return htmlStr;
		}
	};

	/*
	 * 创建合计行 for ie
	 */
	gridCompProto.createSumRowForIE = function(table,createFlag){
		if(this.options.showSumRow){
			var oThis = this,idStr,gridCompColumnArr;
			if(createFlag == 'fixed'){
				idStr = 'fixed_';
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				idStr = '';
				gridCompColumnArr = this.gridCompColumnArr;
			}
			var t = parseInt(this.wholeHeight) - this.exceptContentHeight - 48 - this.scrollBarHeight;
			t = t> 0?t:0;
			var row = table.insertRow();
			row.row = 'row';
			row.className = 'u-grid-content-sum-row';
			row.id = this.options.id + '_content_'+idStr+'sum_row';
			row.style.top = t + 'px';
			$.each(gridCompColumnArr, function() {
				var f = this.options.field;
				var precision = this.options.precision;
				var dataType = this.options.dataType;
				var sumValue = oThis.dataSourceObj.getSumValue(f,this,oThis);
				if(dataType == 'float'){
					var o = {};
					o.value = sumValue;
					o.precision = precision?precision:2;
					sumValue = oThis.DicimalFormater(o)
				}
				var newCell= row.insertCell();
				newCell.role = 'rowcell';
				newCell.title = sumValue;
				var contentStyle = '';
				if(this.options.dataType == 'integer' || this.options.dataType == 'float') {
					contentStyle = 'style="text-align: right;"'
				}
				var htmlStr = '<div class="u-grid-content-td-div" ' + contentStyle + '><span value="' + sumValue + '">' + sumValue + '</span></div>';
				newCell.insertAdjacentHTML('afterBegin',htmlStr);
			});
		}
	};
	/*
	 * 重画合计行
	 */
	gridCompProto.repairSumRow = function(){
		if(this.options.showSumRow){
			$('#' + this.options.id + '_content_div tbody .u-grid-content-sum-row').remove();
			$('#' + this.options.id + '_content_fixed_div tbody .u-grid-content-sum-row').remove();
			try{
				if(this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0){
					var htmlStr = this.createSumRow();
					$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
					var htmlStr = this.createSumRow('fixed');
					if($('#' + this.options.id + '_content_fixed_div tbody')[0])
						$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
				}
			}catch(e){
				var table = $('#' + this.options.id + '_content_div table')[0];
				var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
				this.createSumRowForIE(table);
				this.createSumRowForIE(table,'fixed');
			}
			this.renderSumRow();
		}
	};
		
	gridCompProto.renderSumRow = function(){
		var oThis = this;
		$.each(this.gridCompColumnFixedArr, function(i) {
			var sumCol = this.options.sumCol;
			var sumRenderType = this.options.sumRenderType;
			var idStr = 'fixed_';
			if(sumCol) {
				var sumSpans = $('#' + oThis.options.id + '_content_'+idStr+'sum_row').find('td').eq(i).find('span');
				var sumSpan = sumSpans[sumSpans.length-1];
				if(sumSpan) {
					if(typeof sumRenderType == 'function') {
						var sumV = $(sumSpan).attr('value');
						var obj = {};
						obj.value = sumV;
						obj.element = sumSpan;
						obj.gridObj = oThis;
						obj.gridCompColumn = this;
						sumRenderType.call(oThis,obj);
					} else if(dataType == 'integer' || dataType == 'float'){
						sumSpan.style.textAlign = 'right';
					}
				}	
			}
		});
		$.each(this.gridCompColumnArr, function(i) {
			var sumCol = this.options.sumCol;
			var sumRenderType = this.options.sumRenderType;
			var idStr = '';
			if(sumCol) {
				var sumSpans = $('#' + oThis.options.id + '_content_'+idStr+'sum_row').find('td').eq(i).find('span');
				var sumSpan = sumSpans[sumSpans.length-1];
				if(sumSpan) {
					if(typeof sumRenderType == 'function') {
						var sumV = $(sumSpan).attr('value');
						var obj = {};
						obj.value = sumV;
						obj.element = sumSpan;
						obj.gridObj = oThis;
						obj.gridCompColumn = this;
						sumRenderType.call(oThis,obj);
					} else if(dataType == 'integer' || dataType == 'float'){
						sumSpan.style.textAlign = 'right';
					}
				}	
			}
		});
	};

	gridCompProto.renderTypeSumRow = function(gridCompColumn,i,begin,length, isFixedColumn){
		var oThis = this;
		var sumCol = gridCompColumn.options.sumCol;
		var sumRenderType = gridCompColumn.options.sumRenderType;
		var dataType = gridCompColumn.options.dataType;
		var idStr = isFixedColumn === true? 'fixed_' : '';
		if(sumCol) {
			var sumSpans = $('#' + this.options.id + '_content_'+idStr+'sum_row').find('td').eq(i).find('span');
			var sumSpan = sumSpans[sumSpans.length-1];
			if(sumSpan) {
				if(typeof sumRenderType == 'function') {
					var sumV = $(sumSpan).attr('value');
					var obj = {};
					obj.value = sumV;
					obj.element = sumSpan;
					obj.gridObj = oThis;
					obj.gridCompColumn = gridCompColumn;
					sumRenderType.call(oThis,obj);
				} else if(dataType == 'integer' || dataType == 'float'){
					sumSpan.style.textAlign = 'right';
				}
			}	
		}
	};
})(jQuery, window, document);
