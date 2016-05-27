;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype;

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
	},
	gridCompProto.widthChangeGridFunOverWidthHidden = function(){
		if(this.options.overWidthHiddenColumn){
			this.lastVisibleColumn.options.width = this.lastVisibleColumn.options.realWidth;
			var wholeWidth = parseInt(this.wholeWidth) - parseInt(this.leftW);
			var columnWholeWidth = parseInt(this.fixedWidth) + parseInt(this.contentRealWidth);
			if(columnWholeWidth > wholeWidth){
				for(var i = 0;i < this.gridCompHiddenLevelColumnArr.length;i++){
					var column = this.gridCompHiddenLevelColumnArr[i];
					if(column.options.visible){
						column.options.visible = false;
						columnWholeWidth = columnWholeWidth - column.options.width;
					} 
					if(!(columnWholeWidth > wholeWidth)){
						break;
					}
				}
				this.columnsVisibleFun();
			}else{
				for(var i = this.gridCompHiddenLevelColumnArr.length -1;i>-1;i--){
					var column = this.gridCompHiddenLevelColumnArr[i];
					if(!column.options.visible){
						columnWholeWidth = columnWholeWidth + column.options.width;
						if(columnWholeWidth > wholeWidth){
							break;
						}
						column.options.visible = true;
					}
				}
				this.columnsVisibleFun();
			}
		}
	};
})(jQuery, window, document);
