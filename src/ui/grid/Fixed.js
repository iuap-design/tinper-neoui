;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype,
		columnsVisibleFunFun = gridCompProto.columnsVisibleFun;
	/*
	 * 将固定列放入gridCompColumnFixedArr
	 */
	gridCompProto.initGridCompFixedColumn = function(){
		var oThis = this;
		var w = 0;
		$.each(this.gridCompColumnArr,function(i){
			if(this.options.fixed == true){
				oThis.gridCompColumnFixedArr.push(this);
			}
		});
		$.each(this.gridCompColumnFixedArr,function(i){
			for(var i = oThis.gridCompColumnArr.length;i >-1;i-- ){
				if(oThis.gridCompColumnArr[i] == this){
					oThis.gridCompColumnArr.splice(i,1);
					break;
				}
			}
		});
	};

	gridCompProto.columnsVisibleFun = function(){
		// 执行原有方法
		columnsVisibleFunFun.apply(this,arguments);
		// 扩展方法
		var oThis = this,
			fixW = 0;
		$.each(this.gridCompColumnFixedArr,function(){
			if(this.options.visible){
				fixW += parseInt(this.options.width);
				this.firstColumn = oThis.firstColumn;
				oThis.firstColumn = false;
			}
		});
		this.fixedRealWidth = fixW;
	};

	gridCompProto.createHeaderTableFixed = function(){
		return this.createHeaderTable('fixed');
	};

	gridCompProto.createContentTableFixed = function(){
		return this.createContentTable('fixed');
	}
	gridCompProto.createContentOneRowFixed = function(rowObj){
		return this.createContentOneRow(rowObj,'fixed')
	}
	gridCompProto.widthChangeGridFunFixed = function(halfWholeWidth){
		// 固定区域宽度不大于整体宽度的一半
		if(this.fixedRealWidth > halfWholeWidth){
			this.fixedWidth = halfWholeWidth;
		}else{
			this.fixedWidth = this.fixedRealWidth;
		}
	}
})(jQuery, window, document);
