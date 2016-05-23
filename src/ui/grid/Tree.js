;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype,
		gridCompColumn = $.fn.grid.gridCompColumn,
		gridCompColumnProto = gridCompColumn.prototype,
		dataSource = $.fn.grid.dataSource,
		dataSourceProto = dataSource.prototype;

	gridCompColumnProto.initTree = function(options,gridOptions){
		if(gridOptions.showTree){
			options.sortable = false;
		}
		return options;
	};
	gridCompProto.initOptionsTree = function(){
		if(this.options.showTree){
			this.options.showNumCol = false;
		}
	};
		

	gridCompProto.clickFunTree = function(e){
		var oThis = this,$target = $(e.target),$td = $target.closest('td');
		
		if($td.length > 0){
			var $tr = $td.parent();
			var index = this.getTrIndex($tr);
			var row = oThis.dataSourceObj.rows[index];
			if(row){
				var rowChildIndex = row.childRowIndex;
				if($target.hasClass('fa-minus-square-o') || $target.hasClass('fa-plus-square-o') ){
					var minus = $td.find('.fa-minus-square-o');
					var plus = $td.find('.fa-plus-square-o');
					if(minus.length >0){
						// 合上 需要将所有的都合上
						minus.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
						if(rowChildIndex.length > 0){
							var allChildRowIndex = oThis.getAllChildRowIndex(row);
							$.each(allChildRowIndex, function() {
								var $tr1 = $('tr[role="row"]:eq(' + parseInt(this) +')',$tr.parent());
								$tr1.css('display','none');
								// 左侧复选区隐藏
								$('#' + oThis.options.id + '_content_multiSelect >div:nth-child('+(parseInt(this) +1)+ ')').css('display','none');
								$('.fa-minus-square-o',$tr1).removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
							});
						}
						if(this.options.editType == 'form'){
							$('#' + this.options.id + '_multiSelect_edit').remove(null,true);
							$('#' + this.options.id + '_numCol_edit').remove(null,true);
							$('#' + this.options.id + '_edit_tr').remove(null,true);
							$('#' + this.options.id + '_edit_tr1').remove(null,true);
						}
						return;
					}else if(plus.length > 0){
						// 展开
						plus.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
						if(rowChildIndex.length > 0){
							$.each(rowChildIndex, function() {
								var $tr1 = $('tr[role="row"]:eq(' + parseInt(this) +')',$tr.parent());
								$tr1.css('display','');
								var ss = $('#' + oThis.options.id + '_content_multiSelect >div:nth-child('+(parseInt(this) +1)+ ')')[0];
								$('#' + oThis.options.id + '_content_multiSelect >div:nth-child('+(parseInt(this) +1)+ ')').css('display','');
							});
						}
						return;
					}
				}
			}
		}
	};
	gridCompProto.addOneRowTree = function(row,index,rowObj){
		var oThis = this,l = this.dataSourceObj.rows.length;
		// 存在树结构
		if(this.options.showTree){
			var hasParent = false;
			this.hasChildF = false;
			var keyField = this.options.keyField;
			var parentKeyField = this.options.parentKeyField;
			var keyValue = this.getString($(row).attr(keyField),'');
			var parentKeyValue = this.getString($(row).attr(parentKeyField),'');
			/* 判断是否存在父项/子项 */
			$.each(this.dataSourceObj.rows,function(i){
				var value = this.value;
				var nowKeyValue = oThis.getString($(value).attr(keyField),'');
				var nowParentKeyValue = oThis.getString($(value).attr(parentKeyField),'');
				if(nowKeyValue == parentKeyValue){
					/* 取父项的index和父项的子index*/
					hasParent = true;
					parentIndex = i;
					parentChildLength = this.childRowIndex.length;
					var parentLevel = this.level;
					rowObj.level = parentLevel + 1;
					// 由于不止需要计算最后一个子节点，同时需要计算子节点的子节点。所以现在添加到父节点的下面一个
					index = parentIndex + 1;
					this.allChildRowIndex = new Array();

				}
				if(nowParentKeyValue == keyValue){
					oThis.hasChildF = true;
				}
			});
			if(!hasParent){
				rowObj.level = 0;
				if(index != l) {
					// 如果没有父项则插入到最后，因为index有可能插入到其他节点的子节点之中，计算复杂
					index = 0;
				}

			}
		}

		if(hasParent){
			var $pTr = $('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]').eq(parentIndex);
			if(parentChildLength > 0){
				// 如果存在父项并且父项存在子项则需要判断父项是否展开
				var openDiv = $('.fa-plus-square-o',$pTr);
				if(!(openDiv.length > 0)){
					displayFlag = 'block';
				}
			}else{
				// 如果存在父项并且父项原来没有子项则需要添加图标
				if(this.options.autoExpand){
					displayFlag = 'block';
				}
				
				var d = $("div:eq(0)",$pTr);
				var openDiv = $('.fa-plus-square-o',$pTr);
				var closeDiv = $('.fa-minus-square-o',$pTr);
				if(this.options.autoExpand){
					var spanHtml = '<span class="fa u-grid-content-tree-span fa-minus-square-o"></span>';
				}else{
					var spanHtml = '<span class="fa u-grid-content-tree-span fa-plus-square-o"></span>';
				}
				if(d.length > 0 && openDiv.length == 0 && closeDiv.length == 0){
					d[0].insertAdjacentHTML('afterBegin',spanHtml);
					var oldLeft = parseInt(d[0].style.left);
					l = oldLeft - 16;
					if(l > 0 || l == 0){
						d[0].style.left = l + "px";
					}
				}
				if(openDiv.length > 0){
					openDiv.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
				}
			}
		}
		return index;
	}; 

	gridCompProto.addOneRowTreeHasChildF = function(){
		if(this.hasChildF){
			//如果存在子项则重新渲染整个区域
			this.repairContent();
		}
	};

	gridCompProto.updateValueAtTree = function(rowIndex,field,value,force){
		var keyField = this.options.keyField;
		var parentKeyField = this.options.parentKeyField;
		if(this.options.showTree && (field == keyField || field == parentKeyField)){
			// 目前已经不适用grid源生的编辑设置了，因为树表时关闭edit
			var hasParent = false;
			var hasChildF = false;
			

			$.each(this.dataSourceObj.rows,function(i){
				var vv = this.value;
				var nowKeyValue = oThis.getString($(vv).attr(keyField),'');
				var nowParentKeyValue = oThis.getString($(vv).attr(parentKeyField),'');
				if(field == keyField && value == nowParentKeyValue){
					//修改的是keyfield，判断是否存在子项
					hasChildF = true;
				}
				if(field == parentKeyField && value == nowKeyValue){
					//修改的是parentKeyField，判断是否存在父项
					hasParent = true;
				}
			});
			if(hasChildF || hasParent){
				//删除当前行之后重新插入当前行由addonerow来进行树结构处理
				var rowValue = $(this.dataSourceObj.rows[rowIndex].value);
				this.deleteOneRow(rowIndex);
				this.addOneRow(rowValue[0]);
			}
			
		}
		if(this.options.showTree && (field == keyField || field == parentKeyField) && (hasChildF || hasParent)){
			rowIndex = this.getRowIndexByValue(field,value);
		}
		return rowIndex;
	};

	/*
	 * 获取数据行下所有子元素
	 */
	gridCompProto.getAllChildRow = function(row){
		if(row.allChildRow && row.allChildRow.length > 0){
			return row.allChildRow;
		}
		row.allChildRow = new Array();
		this.getAllChildRowFun(row,row.allChildRow);
		return row.allChildRow;
	};




	/*
	 * 获取数据行下所有子元素的index
	 */
	gridCompProto.getAllChildRowIndex = function(row){
		if(row.allChildRowIndex && row.allChildRowIndex.length > 0){
			return row.allChildRowIndex;
		}
		row.allChildRowIndex = new Array();
		this.getAllChildRowIndexFun(row,row.allChildRowIndex);
		return row.allChildRowIndex;
	};


	gridCompProto.getAllChildRowFun = function(row,rowArry){
		var oThis = this;
		if(row.childRow.length > 0){
			Array.prototype.push.apply(rowArry, row.childRow);
			$.each(row.childRow, function() {
				  oThis.getAllChildRowFun(this,rowArry);
			});
		}
	};

	gridCompProto.getAllChildRowIndexFun = function(row,rowArry){
		var oThis  = this;
		if(row.childRowIndex.length > 0){
			Array.prototype.push.apply(rowArry, row.childRowIndex);
			$.each(row.childRow, function() {
				  oThis.getAllChildRowIndexFun(this,rowArry);
			});
		}
	};

	/*
	 * 将values转化为rows并进行排序(数表)
	 */
	dataSourceProto.treeSortRows = function(field, sortType) {
		var oThis = this;
		this.rows = new Array();
		this.hasParentRows = new Array();
		this.nothasParentRows = new Array();
		if(this.options.values){
			$.each(this.options.values, function(i){
				var rowObj = {};
				var $this = $(this);
				var keyField = oThis.gridComp.options.keyField;
				var parentKeyField = oThis.gridComp.options.parentKeyField;
				var keyValue = oThis.gridComp.getString($this.attr(keyField),'');
				var parentKeyValue = oThis.gridComp.getString($this.attr(parentKeyField),'');
				rowObj.valueIndex = i;
				rowObj.value = this;
				rowObj.keyValue = keyValue;
				rowObj.parentKeyValue = parentKeyValue;
				if(parentKeyValue == ''){
					oThis.nothasParentRows.push(rowObj);
				}else{
					oThis.hasParentRows.push(rowObj);
				}
				oThis.rows.push(rowObj);
			});
			// 判断存在父项的数据的父项是否真正存在
			$.each(this.hasParentRows,function(i){
				var parentKeyValue = this.parentKeyValue;
				var hasParent = false;
				$.each(oThis.rows,function(){
					if(this.keyValue == parentKeyValue){
						hasParent = true;
					}
				});
				if(!hasParent){
					oThis.hasParentRows.splice(i,0);
					oThis.nothasParentRows.push(this);
				}
			});
			oThis.rows = new Array();
			var level = 0;
			// 遍历nothasParentRows，将子项加入rows
			$.each(this.nothasParentRows, function(i) {
				this.level = level;
				oThis.rows.push(this);
				oThis.pushChildRows(this,level);
			});
		}
	};

	/*
	 * 将当前行子项插入rows数组
	 */
	dataSourceProto.pushChildRows = function(row,level){
		var keyValue = row.keyValue;
		var oThis = this;
		var nowLevel = parseInt(level) + 1;
		var hasChild = false;
		var childRowArray = new Array();
		var childRowIndexArray = new Array();
		$.each(this.hasParentRows, function(i) {
			if(this && this.parentKeyValue == keyValue){
				hasChild = true;
				this.level = nowLevel;
				oThis.rows.push(this);
				childRowArray.push(this);
				var index = parseInt(oThis.rows.length - 1);
				childRowIndexArray.push(index);
				oThis.hasParentRows.splice(i,0);
				oThis.pushChildRows(this,nowLevel);
			}
		});
		row.hasChild = hasChild;
		row.childRow = childRowArray;
		row.childRowIndex = childRowIndexArray;
	};
})(jQuery, window, document);
