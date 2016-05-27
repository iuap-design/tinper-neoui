;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype,
		initEventFunFun = gridCompProto.initEventFun,
		initGridEventFunFun = gridCompProto.initGridEventFun;

	

	gridCompProto.initEventFun = function(){
		// 执行原有方法
		initEventFunFun.apply(this,arguments);
		// 扩展方法
		var oThis = this;
		$('#' + this.options.id).on('mousedown', function(e) {
			if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
				// 点击的是header区域
				var eleTh = $(e.target).closest('th')[0];
				if(oThis.options.canSwap){
					oThis.swapColumnStart(e, eleTh);
				}
				e.preventDefault();
			} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
				// 点击的是数据区域
			}
		});

		$('#' + this.options.id).on('mousemove', function(e) {
			oThis.mouseMoveX = e.clientX;
			oThis.mouseMoveY = e.clientY;
			if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX' && oThis.options.canSwap) {
				// 鼠标按下之后移动了
				oThis.swapColumnFlag = true;
			}
			oThis.swapColumnFun(e);
			e.stopPropagation();
		}); 

		$('#' + this.options.id + '_top').on('mousemove', function(e) {
			oThis.mouseMoveX = e.clientX;
			oThis.mouseMoveY = e.clientY;
			if ((oThis.mouseMoveX != oThis.mouseDownX || oThis.mouseDownY != oThis.mouseMoveY) && oThis.mouseDownX != 'mouseDownX' && oThis.options.canSwap) {
				// 鼠标按下之后移动了
				oThis.swapColumnFlag = true;
			}
			oThis.swapColumnFun(e);
			e.stopPropagation();
		});

		$('#' + this.options.id).on('mouseup', function(e) {
			oThis.mouseUpX = e.clientX;
			oThis.mouseUpY = e.clientY;	
			oThis.swapColumnEnd(e);
			oThis.mouseUpX = 'mouseUpX';
			oThis.mouseUpY = 'mouseUpY';
			oThis.mouseDownX = 'mouseDownX';
			oThis.mouseDownY = 'mouseDownY';
			oThis.mouseMoveX = 'mouseMoveX';
			oThis.mouseMoveY = 'mouseMoveY';
		});

		$('#' + this.options.id+ '_top').on('mouseup', function(e) {
			oThis.mouseUpX = e.clientX;
			oThis.mouseUpY = e.clientY;
			oThis.swapColumnEnd(e);
			oThis.mouseUpX = 'mouseUpX';
			oThis.mouseUpY = 'mouseUpY';
			oThis.mouseDownX = 'mouseDownX';
			oThis.mouseDownY = 'mouseDownY';
			oThis.mouseMoveX = 'mouseMoveX';
			oThis.mouseMoveY = 'mouseMoveY';
		});
	};

	gridCompProto.initGridEventFun = function(){
		// 执行原有方法
		initGridEventFunFun.apply(this,arguments);
		// 扩展方法
		var oThis = this;
	};

	/*
	 * 交换列位置开始，并不修改swapColumnFlag，当移动的时候才修改swapColumnFlag
	 */
	gridCompProto.swapColumnStart = function(e, ele) {
		if(!this.options.canSwap){
			return;
		}
		this.swapColumnEle = ele;
		this.swapColumnStartX = e.clientX;
		this.swapColumnStartY = e.clientY;
	};
	/*
	 * 交换位置
	 */
	gridCompProto.swapColumnFun = function(e) {
		if(!this.options.canSwap){
			return;
		}
		var oThis = this;
		if (this.swapColumnFlag) {
			var nowTh = this.swapColumnEle,
				$nowTh = $(nowTh),
				nowGridCompColumn = nowTh.gridCompColumn;
			//创建拖动区域
			if ($('#' + this.options.id + '_clue').length == 0) {
				var $d = $('<div class="u-grid u-grid-header-drag-clue" id="' + this.options.id + '_clue" />').css({
					width: nowTh.scrollWidth + "px",
					left: nowTh.attrLeftTotalWidth - oThis.scrollLeft + oThis.leftW +oThis.fixedWidth + "px",
					top: "0px",
					paddingLeft: $nowTh.css("paddingLeft"),
					paddingRight: $nowTh.css("paddingRight"),
					lineHeight: $nowTh.height() + "px",
					paddingTop: $nowTh.css("paddingTop"),
					paddingBottom: $nowTh.css("paddingBottom")
				}).html(nowGridCompColumn.options.title || nowGridCompColumn.options.field).prepend('<span class="fa fa-ban u-grid-header-drag-status" />');
				$('#' + this.options.id)[0].insertAdjacentElement('afterBegin',$d[0]);
				$d.on('mousemove',function(){
					e.stopPropagation();
				});
			}
			this.swapColumnEndX = e.clientX;
			this.swapColumnEndY = e.clientY;
			var changeX = this.swapColumnEndX - this.swapColumnStartX,
				changeY = this.swapColumnEndY - this.swapColumnStartY;
			$('#' + this.options.id + '_clue').css({
				left: nowTh.attrLeftTotalWidth + changeX - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth + "px",
				top: changeY + "px"
			});

			// 创建提示div
			if ($('#' + this.options.id + '_swap_top').length == 0) {
				var $d = $('<span class="fa fa-sort-desc u-grid-header-swap-tip-span"  id="' + this.options.id + '_swap_top"/>');
				$d.css({
					top: $nowTh.height() - 6 + 'px'
				});
				var $d1 = $('<span class="fa fa-sort-asc u-grid-header-swap-tip-span" id="' + this.options.id + '_swap_down" />');
				$d1.css({
					top: '6px'
				});
				$('#' + this.options.id)[0].insertAdjacentElement('afterBegin',$d[0]);
				$('#' + this.options.id)[0].insertAdjacentElement('afterBegin',$d1[0]);
			}
			this.canSwap = false;
			$('#' + this.options.id + '_header_table th').each(function(i) {
				var left = $(this).offset().left,
					right = left + parseInt(this.attrWidth);
				if (i == 0 && e.clientX < left) {
					// 移动到最左边
					if (oThis.swapColumnEle != this) {
						oThis.swapToColumnEle = 'LeftEle';
						$('#' + oThis.options.id + '_swap_top').css({
							left: -oThis.scrollLeft - 3 + oThis.leftW +oThis.fixedWidth + 'px',
							display: 'block'
						});
						$('#' + oThis.options.id + '_swap_down').css({
							left: -oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
							display: 'block'
						});
					}
					oThis.canSwap = true;
				} else if (left < e.clientX && e.clientX < right) {
					if (oThis.swapColumnEle != this && parseInt($(this).attr('index')) + 1 != parseInt($(oThis.swapColumnEle).attr('index'))) {
						if (oThis.swapToColumnEle != this) {
							oThis.swapToColumnEle = this;
							$('#' + oThis.options.id + '_swap_top').css({
								left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW  + oThis.fixedWidth + 'px',
								display: 'block'
							});
							$('#' + oThis.options.id + '_swap_down').css({
								left: this.attrRightTotalWidth - oThis.scrollLeft - 3 + oThis.leftW + oThis.fixedWidth + 'px',
								display: 'block'
							});
						}
						oThis.canSwap = true;
						return false;
					}
				}
			});
			if (this.canSwap) {
				$('.u-grid-header-drag-status').removeClass('fa-ban').addClass('fa-plus-circle');
			} else {
				$('#' + this.options.id + '_swap_top').css('display', 'none');
				$('#' + this.options.id + '_swap_down').css('display', 'none');
				$('.u-grid-header-drag-status').removeClass('fa-plus-circle').addClass('fa-ban');
				this.swapToColumnEle = null;
			}
			$('#' + this.options.id + '_top').css('display', 'block');
		}
	};
	/*
	 * 交换位置结束
	 */
	gridCompProto.swapColumnEnd = function(e) {
		if(!this.options.canSwap){
			return;
		}
		var oThis = this;
		if (this.swapColumnFlag) {
			if (this.swapToColumnEle) {
				var swapColumnEle = this.swapColumnEle,
					swapToColumnEle = this.swapToColumnEle,
					swapColumnIndex = $(swapColumnEle).attr('index'),
					swapToColumnIndex = $(swapToColumnEle).attr('index'),
					swapGridCompColumn = this.gridCompColumnArr[swapColumnIndex];
				this.gridCompColumnArr.splice(parseInt(swapToColumnIndex) + 1, 0, swapGridCompColumn);
				if (swapColumnIndex < swapToColumnIndex)
					this.gridCompColumnArr.splice(swapColumnIndex, 1);
				else
					this.gridCompColumnArr.splice(parseInt(swapColumnIndex) + 1, 1);
				this.saveGridCompColumnArrToLocal();
				this.repaintGridDivs();
			}
			$('#' + this.options.id + '_clue').remove();
			$('#' + this.options.id + '_swap_top').css('display', 'none');
			$('#' + this.options.id + '_swap_down').css('display', 'none');
		}
		this.swapColumnFlag = false;
		$('#' + this.options.id + '_top').css('display', 'none');
	};
	if(typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined'){
		gridCompProto.saveGridCompColumnArrToLocal = function(){
		};
	}
})(jQuery, window, document);
