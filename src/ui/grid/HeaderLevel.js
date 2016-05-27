;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype;

	gridCompProto.resetThVariableHeaderLevel = function(){
		var oThis = this,oldParentHeaderStr = '',parentWidth = 0;
		$('#' + this.options.id + '_header_table th', this.$ele).each(function(i) {
			var gridCompColumn = oThis.gridCompColumnArr[i];
			var parentHeaderStr = oThis.getString(gridCompColumn.options.parentHeader,'');
			var w = 0;
			if(gridCompColumn.options.visible){
				w = gridCompColumn.options.width;
			}
			// 处理多表头
			if(oldParentHeaderStr != '' && parentHeaderStr != oldParentHeaderStr){ // 上一个父项结束
				// 设置宽度
				$('#' + oThis.options.id + oldParentHeaderStr).css('width',parentWidth - 1 + 'px');
			}
			if(parentHeaderStr != ''){
				var parentHeaderTitleStr = oThis.getLevelTitleByField(parentHeaderStr);
				if(parentHeaderStr != oldParentHeaderStr){  //一个新的父项开始
					parentWidth = 0;
					if(!oThis.parentFlag){ //只添加一次
						var htmlStr ='<div id="' + oThis.options.id + parentHeaderStr + '" class="u-gird-parent"><div class="u-grid-header-link" title="' + parentHeaderTitleStr + '">' + parentHeaderTitleStr +'</div></div>';
						this.insertAdjacentHTML('afterBegin',htmlStr);
					}
				}
				parentWidth += w;
			}
			oldParentHeaderStr = parentHeaderStr;
		});
		if(oldParentHeaderStr != ''){
			$('#' + oThis.options.id + oldParentHeaderStr).css('width',parentWidth - 1 + 'px');
		}
		this.parentFlag = true;
	};

	gridCompProto.initGridCompColumnHeaderLevelFun = function(columnOptions){
		// 扩展方法
		if(columnOptions.headerLevel > 1){
			this.gridCompLevelColumn.push(columnOptions);
			var oldLength = this.gridCompColumnArr.length;
			this.gridCompColumnArr.length = oldLength - 1;
			if(this.basicGridCompColumnArr && this.basicGridCompColumnArr.length > 0){
				this.basicGridCompColumnArr.length = oldLength - 1;
			}
		}
	};
	/*
	 * 按照hiddenLevel对column进行排序
	 */
	gridCompProto.initGridHiddenLevelColumn = function(){
		if(!this.options.overWidthHiddenColumn)
			return;
		var oThis = this;
		var w = 0;
		
		this.gridCompHiddenLevelColumnArr = this.gridCompColumnArr.slice(0);
		
		this.gridCompHiddenLevelColumnArr.sort(function(a, b) {
			var hiddenLevel1 = a.options.hiddenLevel;
			var hiddenLevel2 = b.options.hiddenLevel;
			if(hiddenLevel1 > hiddenLevel2){
				return -1;
			}else{
				return 1;
			}
		});
	};

	gridCompProto.getLevelTitleByField = function(field){
		for(var i = 0; i < this.gridCompLevelColumn.length; i++){
			var columnField = this.gridCompLevelColumn[i].field;
			if(columnField == field){
				return this.gridCompLevelColumn[i].title;
			}
		}
		return '';
	};

})(jQuery, window, document);
