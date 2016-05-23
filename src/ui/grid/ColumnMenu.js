;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype,
		initGridCompColumnFun = gridCompProto.initGridCompColumn,
		initEventFunFun = gridCompProto.initEventFun,
		initGridEventFunFun = gridCompProto.initGridEventFun;
	

	gridCompProto.initGridCompColumnColumnMenuFun = function(columnOptions){
		var column1 = new this.gridCompColumn(columnOptions, this.options);
			column1.options.realWidth = column1.options.width;
			this.basicGridCompColumnArr.push(column1);
	};

	gridCompProto.initGridCompColumn = function(){
		// 执行原有方法
		initGridCompColumnFun.apply(this,arguments);
		// 扩展方法
		this.menuColumnsHeight = this.gridCompColumnArr.length * this.columnMenuHeight;
	};

	gridCompProto.createColumnMenu = function() {
		var oThis = this;
		var htmlStr = '<div class="u-grid-column-menu" id="' + this.options.id + '_column_menu">';
		htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-ul" id="' + this.options.id + '_column_menu_ul">';

		// 创建显示/隐藏列
		htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
		htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_showColumn">';
		htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_show_column + '</span>';
		htmlStr += '<div class="u-grid-column-menu-div3 fa fa-caret-right"></div>';
		htmlStr += '</div></li>';

		// 创建清除设置
		htmlStr += '<li class="u-grid-column-menu-li" role="menuitem">';
		htmlStr += '<div class="u-grid-column-menu-div1" id="' + this.options.id + '_clearSet">';
		htmlStr += '<span class="u-grid-column-menu-span">' + this.transMap.ml_clear_set + '</span>';
		htmlStr += '</div></li>';

		htmlStr += '</ul></div>';

		// 创建数据列区域
		htmlStr += '<div class="u-grid-column-menu-columns" id="' + this.options.id + '_column_menu_columns">';
		htmlStr += '<ul data-role="menu" role="menubar" class="u-grid-column-menu-columns-ul" id="' + this.options.id + '_column_menu_columns_ul">';
		$.each(this.gridCompColumnArr, function(i) {
			if(oThis.getString(this.options.title,'') != ''){
				htmlStr += '<li class="u-grid-column-menu-columns-li" role="menuitem" index="' + i + '">';
				htmlStr += '<div class="u-grid-column-menu-columns-div1">';
				var checkedStr = "";
				if(this.options.visible)
					checkedStr = ' checked';
				if(!this.options.canVisible)
					checkedStr += ' style="display:none;"';
				htmlStr += '<div class="u-grid-column-menu-columns-div2"><input type="checkbox" ' + checkedStr + '></div>';
				htmlStr += '<span class="u-grid-column-menu-columns-span">' + this.options.title + '</span>';
				htmlStr += '</div></li>';
			}
		});
		htmlStr += '</ul></div>';
		return htmlStr;
	};

	gridCompProto.initEventFun = function(){
		// 执行原有方法
		initEventFunFun.apply(this,arguments);
		// 扩展方法
		var oThis = this;
		$('#' + this.options.id).on('mouseup', function(e) {
			if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
				// 点击的是header区域
				oThis.mouseUpX = e.clientX;
				oThis.mouseUpY = e.clientY;
				//点击过程中鼠标没有移动
				if (oThis.mouseDownX == oThis.mouseUpX && oThis.mouseDownY == oThis.mouseUpY) {
				//或者移动距离小于5px(由于移动之后会显示屏幕div，暂时不做处理)
	//					if( Math.abs(parseInt(oThis.mouseDownX) - parseInt(oThis.mouseUpX)) <=5 && Math.abs(parseInt(oThis.mouseDownY) - parseInt(oThis.mouseUpY)) <=5){
					oThis.columnClickX = e.clientX;
					oThis.columnClickY = e.clientY;
					var eleTh = $(e.target).closest('th')[0];
					if($(e.target).hasClass('u-grid-header-columnmenu')){
						//点击的是columnmenu
						$('#' + oThis.options.id + '_column_menu').css('display','block');
						var left = eleTh.attrRightTotalWidth - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth - 20;
						if(left + oThis.columnMenuWidth > oThis.wholeWidth)
							left = eleTh.attrRightTotalWidth - oThis.scrollLeft + oThis.leftW + oThis.fixedWidth - oThis.columnMenuWidth + 1;
						$('#' + oThis.options.id + '_column_menu').css('left',left);
						$('#' + oThis.options.id + '_column_menu').css('top',oThis.headerHeight);
						oThis.ele.createColumnMenuFlag = true;
					}else{
						
					}
				}
			} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
				// 点击的是数据区域

			}
		
		});

		$(document).on('click',function(){
			if(oThis.columnMenuMove == false && oThis.ele.createColumnMenuFlag == false){
				$('#' + oThis.options.id + '_column_menu',oThis.$ele).css('display','none');
			}
			oThis.ele.createColumnMenuFlag = false;
		});
	};

	gridCompProto.initGridEventFun = function(){
		// 执行原有方法
		initGridEventFunFun.apply(this,arguments);
		// 扩展方法
		var oThis = this;
		// 列头按钮显示/隐藏
		$('#' + this.options.id + '_header_table th').on('mousemove',function(e){
			$('.u-grid-header-columnmenu',$(this)).css('display','block');
		});

		$('#' + this.options.id + '_header_table th').on('mouseout',function(e){
			$('.u-grid-header-columnmenu',$(this)).css('display','none');
		});

		/*header 按钮处理开始*/
		// column按钮
		$('#' + this.options.id + '_column_menu_ul').on('mousemove', function(e) {
			oThis.columnMenuMove = true;
		});
		$('#' + this.options.id + '_column_menu_ul').on('mouseout', function(e) {
			oThis.columnMenuMove = false;
		});

		// 显示/隐藏列按钮
		$('#' + this.options.id + '_showColumn').on('mousemove', function(e) {
			//待完善 考虑屏幕高度决定columnMenu显示形式

			if(oThis.hideMenuColumns)
				clearTimeout(oThis.hideMenuColumns);
			if($('#' + oThis.options.id + '_column_menu_columns').css('display') == 'block')
				return;
			var sX = $(window).width();
			var sH = $(window).height();

			var menuLeft = $('#' + oThis.options.id + '_column_menu').css('left');
			var columnsLeft = parseInt(menuLeft) + oThis.columnMenuWidth;
			var maxLeft = oThis.columnClickX + oThis.columnMenuWidth * 2;
			if(maxLeft > sX)
				columnsLeft = parseInt(menuLeft) - oThis.columnMenuWidth;
			$('#' + oThis.options.id + '_column_menu_columns').css('left',columnsLeft);
			var columnsTop = oThis.headerHeight;
			var cY = e.clientY;
			// 如果数据列高度高于屏幕高度则数据列高度设置为屏幕高度-10；
			var columnsHeight = oThis.menuColumnsHeight;
			var hh = 0;
			if((oThis.menuColumnsHeight + 30) > sH){
				columnsHeight = sH - 30;
				$('#' + oThis.options.id + '_column_menu_columns').css('height',columnsHeight + 'px');
			}else{
				$('#' + oThis.options.id + '_column_menu_columns').css('height','');
			}
			var maxHeight = cY + columnsHeight;
			if(maxHeight > sH)
				columnsTop = (cY - (sH - columnsHeight)) * -1 + 30;
			$('#' + oThis.options.id + '_column_menu_columns').css('top',columnsTop);
			$('#' + oThis.options.id + '_column_menu_columns').css('display','block');
			oThis.columnMenuMove = true;
		});
		$('#' + this.options.id + '_showColumn').on('mouseout', function(e) {
			oThis.hideMenuColumns = setTimeout(function(){
				$('#' + oThis.options.id + '_column_menu_columns').css('display','none');
				oThis.columnMenuMove = false;
			},200);

		});
		$('#' + this.options.id + '_column_menu_columns').on('mousemove', function(e) {
			if(oThis.hideMenuColumns)
				clearTimeout(oThis.hideMenuColumns);
			$('#' + oThis.options.id + '_column_menu_columns').css('display','block');
			oThis.columnMenuMove = true;
		});
		$('#' + this.options.id + '_column_menu_columns').on('mouseout', function(e) {
			oThis.hideMenuColumns = setTimeout(function(){
				$('#' + oThis.options.id + '_column_menu_columns').css('display','none');
				oThis.columnMenuMove = false;
			},200);
		});

		// 清除设置按钮
		$('#' + this.options.id + '_clearSet').on('click', function(e) {
			oThis.clearLocalData();
			oThis.initGridCompColumn();
			// 清除排序
			oThis.dataSourceObj.sortRows();
			oThis.repaintGridDivs();
			if(typeof oThis.options.onClearSetFun == 'function'){
				oThis.options.onClearSetFun(oThis);
			}
		});
		// 显示/隐藏列 对应所有列的点击处理
		$('#' + this.options.id + '_column_menu_columns_ul li input').on('click', function(e) {
			//待完善 优化与li的click的代码整合
			var index = $(this).closest('li').attr('index');

			if(oThis.gridCompColumnArr[index].options.visible){
				$(this)[0].checked = false;
				var ll = $('input:checked',$('#' + oThis.options.id + '_column_menu_columns_ul')).length;
				if(ll == 0){
					$(this)[0].checked = true;
					return;
				}

				if(document.documentMode == 8){
					oThis.gridCompColumnArr[index].options.visible = false;
					oThis.repaintGridDivs();
				}else{
					oThis.setColumnVisibleByIndex(index,false);
					oThis.gridCompColumnArr[index].options.visible = false;
				}
			}else{
				$(this)[0].checked = true;

				if(document.documentMode == 8){
					oThis.gridCompColumnArr[index].options.visible = true;
					oThis.repaintGridDivs();
				}else{
					oThis.setColumnVisibleByIndex(index,true);
					oThis.gridCompColumnArr[index].options.visible = true;
				}

			}
			oThis.saveGridCompColumnArrToLocal();
			e.stopPropagation();
		});
		$('#' + this.options.id + '_column_menu_columns_ul li').on('click', function(e) {
			var index = $(this).attr('index');
			var gridCompColumn = oThis.gridCompColumnArr[index];
			if(!gridCompColumn.options.canVisible){
				return false;
			}
			//获取选中列数量，不能小于1
			if(gridCompColumn.options.visible){
				$('input',$(this))[0].checked = false;
				var ll = $('input:checked',$('#' + oThis.options.id + '_column_menu_columns_ul')).length;
				if(ll == 0){
					$('input',$(this))[0].checked = true;
					return;
				}
				oThis.setColumnVisibleByIndex(index,false);
				oThis.gridCompColumnArr[index].options.visible = false;
			}else{
				$('input',$(this))[0].checked = true;
				oThis.setColumnVisibleByIndex(index,true);
				oThis.gridCompColumnArr[index].options.visible = true;
			}
			oThis.saveGridCompColumnArrToLocal();
		});
		/*header 按钮处理结束*/
	};
	if(typeof gridCompProto.saveGridCompColumnArrToLocal == 'undefined'){
		gridCompProto.saveGridCompColumnArrToLocal = function(){
		};
	}
	if(typeof gridCompProto.clearLocalData == 'undefined'){
		gridCompProto.clearLocalData = function(){
		};
	}
})(jQuery, window, document);
