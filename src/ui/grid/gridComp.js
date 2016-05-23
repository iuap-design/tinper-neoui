;
(function($, window, document, undefined) {
	var gridBrowser = {},userAgent = navigator.userAgent,ua = userAgent.toLowerCase(),s;
	if (s=ua.match(/msie ([\d.]+)/)) {
		gridBrowser.isIE = true;
	}
	if (gridBrowser.isIE) {
		var mode = document.documentMode;
		if(mode == null){
		}else{
			if (mode == 8) {
				gridBrowser.isIE8 = true;
			}
			else if (mode == 9) {
				gridBrowser.isIE9 = true;
			}
		}
	}
	/*
	 * 对象所支持的属性及默认值
	 */
	var dataSource = function(options, gridComp) {
		this.init(options, gridComp);
		this.sortRows();
	};
	var gridCompColumn = function(options, gridOptions) {
		this.init(options, gridOptions)
	};

	var gridComp = function(ele, options) {
		this.init(ele,options);
		this.initGrid();
	};
	/*
	 * 对象提供的方法
	 */
	gridComp.prototype = {
		/*
		 * 处理参数
		 */
		init: function(ele, options){
			this.dataSource = dataSource;
			this.gridCompColumn = gridCompColumn;
			this.ele = ele[0];
			this.$ele = ele;
			this.initDefault();
			this.options = $.extend({}, this.defaults, options);
			this.transDefault = {
				ml_show_column:'显示/隐藏列',
				ml_clear_set:'清除设置',
				ml_no_rows:'无数据',
				ml_sum:'合计:',
				ml_close:'关闭'
			}
			this.transMap = $.extend({},this.transDefault,options.transMap);
			this.gridCompColumnFixedArr = new Array();
			this.gridCompColumnArr = new Array(); // 存储设置默认值之后的columns对象
			this.headerHeight = 34; // header区域高度
			this.countContentHeight = true;// 是否计算内容区的高度（是否为流式）
			this.minColumnWidth = 80; // 最小列宽
			this.scrollBarHeight = 16; // 滚动条高度
			this.numWidth = 40; // 数字列宽度
			this.multiSelectWidth = 40; // 复选框列宽度
			this.multiWidth = 40; // 复选框宽度

			this.basicGridCompColumnArr = new Array(); // 存储基本的columns对象，用于清除设置
			this.columnMenuWidth = 160; // column menu的宽度
			this.columnMenuHeight = 33; // column menu的高度
			this.gridCompColumnFixedArr = new Array(); // 存储设置默认值之后的固定列columns对象
			this.gridCompLevelColumn = new Array(); // 存储多级表头时的多级
			this.headerHeight = 34 * parseInt(this.options.maxHeaderLevel);
			this.gridCompHiddenLevelColumnArr = new Array(); // 存储自动隐藏时隐藏优先级排序后的column
			this.treeLeft = 10; // 树表时每一级之间的差值
		},
		/*
		 * 初始化默认参数
		 */
		initDefault: function(){
			this.defaults = {
				id: 'grid',
				cancelFocus:false, // 第二次点击是否取消focus
				showHeader: true, // 是否显示表头
				showNumCol: false, // 是否显示数字列
				multiSelect:false, // 是否显示复选框
				columnMenu: true, // 是否存在列头操作按钮
				canDrag: true, // 是否可以拖动
				formMaxWidth: 300, // 整体宽度小于某一值之后以form展示
				formMaxWidth:0,
				maxHeaderLevel:1, // header的最高层级，用于计算header区域的高度
				overWidthHiddenColumn:false, // 宽度不足时是否自动隐藏column
				sortable: true, // 是否可以排序
				showSumRow: false, // 是否显示合计行
				canSwap: true, // 是否可以交换列位置
				showTree:false, // 是否显示树表
				autoExpand:true, // 是否默认展开
			}
		},
		/*
		 * 创建grid
		 */
		initGrid: function() {
			if(!this.options.columns || this.options.columns.length == 0){
				return;
			}
			var oThis = this;
			this.initOptions();
			this.initVariable();
			this.initWidthVariable();
			this.initGridCompColumn();
			this.initDataSource();
			this.createDivs();
			// UAP-NC 轻量化项目：切换tab时添加form会消失问题
			this.inte = setInterval(function(){oThis.setIntervalFun.call(oThis)}, 300);
		},
		/*
		 * 销毁自身
		 */
		destroySelf: function(){
			clearInterval(this.inte);
			this.$ele.data('gridComp',null);
			this.ele.innerHTML = '';
		},
		/*
		 * 对传入参数进行格式化处理
		 * 宽度、高度处理
		 * 左侧区域宽度计算
		 * 除去内容区域的高度
		 */
		initOptions: function() {
			this.options.width = this.formatWidth(this.options.width);
			this.options.height = this.formatWidth(this.options.height);
			if(this.options.height == '100%' || !this.options.height){
				this.countContentHeight = false;
			}
			this.initOptionsTree();
			this.leftW = 0; // 左侧区域宽度（数字列复选框等）
			if (this.options.showNumCol) {
				this.leftW += this.numWidth;
			}
			if(this.options.multiSelect){
				this.leftW += this.multiWidth;
			}
			this.exceptContentHeight = 0; // 内容区域之外的高度
			if(this.options.showHeader){
				this.exceptContentHeight +=this.headerHeight;
			}
			this.fixedWidth = 0;
			if(this.options.maxHeaderLevel > 1){
				this.options.canSwap = false;
			}
			// 获取缓存id
			var url = window.location.href;
			var index = url.indexOf('?');
			if(index > 0){
				url = url.substring(0,index);
			}
			this.localStorageId = this.options.id + url;
			
		},
		initOptionsTree:function(){

		},
		/*
		 * 初始化变量
		 */
		initVariable:function(){
			this.initDataSourceVariable();
			// 鼠标点击移动时位置记录
			this.mouseUpX = 'mouseUpX';
			this.mouseUpY = 'mouseUpY';
			this.mouseDownX = 'mouseDownX';
			this.mouseDownY = 'mouseDownY';
			this.mouseMoveX = 'mouseMoveX';
			this.mouseMoveY = 'mouseMoveY';
			this.scrollLeft = 0; // 记录横向滚动条
			this.scrollTop = 0;// 记录纵向滚动条
			this.showType = ''; // 记录grid显示方式，form和grid
			this.createGridFlag = false; // 是否已经创建grid展示
			this.columnClickX = 0; // 点击处的X坐标
			this.columnClickY = 0; // 点击处的Y坐标
			this.columnMenuMove = false;// 是否在column menu区域移动
			this.firstColumn = true; // 用于记录是否已经存在第一列，true表示还没有，false表示已经存在
			this.lastVisibleColumn = null;
			this.lastVisibleColumnWidth = 0;
			this.columnMenuMove = false;// 是否在column menu区域移动
			this.createColumnMenuFlag = false; // 是否已经创建column menu 区域
			this.menuColumnsHeight = 0;
			this.createFormFlag = false; // 是否已经创建form展示
			this.$sd_storageData = null;// 本地缓存内容为object
		},
		/*
		 * 初始化datasource相关变量
		 */
		initDataSourceVariable:function(){
			this.selectRows = new Array();
			this.selectRowsObj = new Array();
			this.selectRowsIndex = new Array();
			this.allRows = new Array();
			this.eidtRowIndex = -1; // 当前修改行
		},

		// 初始化宽度相关变量
		initWidthVariable:function(){
			// 计算用变量
			this.wholeWidth = 0; // 整体宽度
			this.wholeHeight = 0; // 整体高度
			this.rowHeight = 0; // 数据行高度
			this.contentRealWidth = 0; // 内容区真实宽度,严格按照设置的width计算的宽度
			this.contentWidth = 0; // 内容区宽度，自动扩展之后的宽度
			this.contentMinWidth = 0; // 内容区最小宽度,即可视宽度
			this.contentHeight = 0; //内容区高度
			this.fixedRealWidth = 0; // 固定区域真实宽度
			this.fixedWidth = 0; // 固定区域宽度
		},
		/*
		 * 创建gridCompColumn对象方便后续处理
		 */
		initGridCompColumn: function() {
			var oThis = this;
			this.initGridCompColumnVar();
			if (this.options.columns) {
				$.each(this.options.columns, function(i) {
					oThis.initGridCompColumnFun(this);
				});
			}
			this.initGridCompColumnLoacl();
			this.initGridHiddenLevelColumn();
			this.initGridCompFixedColumn();
			this.columnsVisibleFun();
		},
		initGridCompColumnVar: function(){
			this.gridCompColumnArr = new Array(); 
			this.basicGridCompColumnArr = new Array();
			this.gridCompColumnFixedArr = new Array(); 
			this.gridCompLevelColumn = new Array(); 
			this.gridCompHiddenLevelColumnArr = new Array();  
		},
		initGridCompColumnFun: function(columnOptions){
			var column = new gridCompColumn(columnOptions, this.options);
			column.options.realWidth = column.options.width;
			this.gridCompColumnArr.push(column);
			this.initGridCompColumnColumnMenuFun(columnOptions);
			this.initGridCompColumnHeaderLevelFun(columnOptions);
		},
		initGridCompColumnColumnMenuFun: function(columnOptions){
		},
		initGridCompColumnHeaderLevelFun: function(columnOptions){
		},
		initGridCompColumnLoacl: function(columnOptions){
		},
		initGridHiddenLevelColumn: function(){
		},
		initGridCompFixedColumn:function(){
		},
		/*
		 * 设置某列是否必输
		 */
		setRequired:function(field, value){
		},
		/*
		 * 创建dataSource对象方便后续处理
		 */
		initDataSource: function() {
			var oThis = this;
			this.dataSourceObj = new dataSource(this.options.dataSource,this);
		},
		/*
		 * 创建顶层div以及_top div层
		 * 添加顶层div相关监听
		 */
		createDivs: function() {
			var oThis = this,styleStr = '',str = '';
			this.ele.innerHTML = '';
			if(this.options.width){
				str += 'width:' + this.options.width + ';';
			}else{
				str += 'width:auto;';
			}
			if(this.options.height){
				str += 'height:' + this.options.height + ';';
			}else{
				str += 'height:auto;';
			}
			if(str != ''){
				styleStr = 'style="' + str + '"';
			}
			var htmlStr = '<div id="' + this.options.id + '" data-role="grid" class="u-grid" ' + styleStr + '>';
			htmlStr += '</div>';
			this.ele.insertAdjacentHTML('afterBegin', htmlStr);
			// 创建屏幕div,用于拖动等操作
			var htmlStr = '<div id="' + this.options.id + '_top" class="u-grid-top"></div>';
			this.ele.insertAdjacentHTML('afterBegin', htmlStr);
			this.initEventFun(); //创建完成之后顶层div添加监听
			this.widthChangeFun(); // 根据整体宽度创建grid或form展示区域
		},
		/*
		 * 创建div区域
		 */
		repaintDivs:function(){
			// 后期可以考虑form展示
			this.repaintGridDivs();
			this.realtimeTableRows = null;
		},		
		/*
		 * 创建grid形式下div区域
		 */
		createGridDivs: function() {
			if (this.createGridFlag) {
				return;
			}
			// 为避免重复渲染，在开始清空里面内容
			if($('#' + this.options.id)[0])
				$('#' + this.options.id)[0].innerHTML = '';
			var htmlStr = '<div id="' + this.options.id + '_grid" class="u-grid-grid">';
				htmlStr += this.createColumnMenu();
				htmlStr += this.createHeader();
			htmlStr += this.createContent();
			htmlStr += '</div>';
			if($('#' + this.options.id)[0])
				$('#' + this.options.id).html(htmlStr);
			this.headerFirstClassFun();
			this.initGridEventFun();
			this.showType = 'grid';
			this.afterGridDivsCreate();
			this.createGridFlag = true;
			this.realtimeTableRows = null;
		},
		/*
		 * 重画grid
		 */
		repaintGridDivs: function() {
			$('#' + this.options.id + '_grid').remove(null, true);
			this.showType = '';
			this.wholeWidth = 0;
			this.createGridFlag = false;
			this.columnsVisibleFun();
			this.widthChangeFun();
			this.realtimeTableRows = null;
		},
		/*
		 * 创建columnMenu区域
		 */
		createColumnMenu: function() {
			return '';
		},
		/*
		 * 创建header区域
		 */
		createHeader: function() {
			var wrapStr = '',headerShowStr = '';
			if(!this.options.showHeader)
				headerShowStr = 'style="display:none;"';
			var htmlStr = '<div class="u-grid-header" id="' + this.options.id + '_header" ' + headerShowStr + '><div class="u-grid-header-wrap" id="' + this.options.id + '_header_wrap" data-role="resizable" ' + wrapStr + '>';
			if (this.options.multiSelect || this.options.showNumCol) {
				htmlStr += '<div id="' + this.options.id + '_header_left" class="u-grid-header-left" style="width:' + this.leftW + 'px;">';
				if (this.options.multiSelect) {
					if(gridBrowser.isIE8){
						htmlStr += '<div class="u-grid-header-multi-select" style="width:' + this.multiWidth + 'px;"><input class="u-grid-multi-input"   type="checkbox" id="' + this.options.id + '_header_multi_input"></div>'
					}else{
						htmlStr += '<div class="u-grid-header-multi-select  checkbox check-success" style="width:' + this.multiWidth + 'px;"><input  class="u-grid-multi-input"  type="checkbox" id="' + this.options.id + '_header_multi_input"><label for="' + this.options.id + '_header_multi_input"></label></div>'
					}
				}
				if (this.options.showNumCol) {
					htmlStr += '<div class="u-grid-header-num" style="width:' + this.numWidth + 'px;"></div>';
				}
				htmlStr += '</div>';
			}
			htmlStr += this.createHeaderTableFixed();
			htmlStr += this.createHeaderTable();
			htmlStr += '</div>';
			htmlStr += this.createHeaderDrag();;
			htmlStr += '</div>';
			return htmlStr;
		},
		/*
		 * 创建header区域table
		 */
		createHeaderTable:function(createFlag){
			var leftW,positionStr,idStr;
			if(createFlag == 'fixed'){
				leftW = parseInt(this.leftW);
				positionStr = 'absolute;width:'+this.fixedWidth+'px;z-index:11;background:#F9F9F9;';
				idStr = 'fixed_';
			}else{
				leftW = parseInt(this.leftW) + parseInt(this.fixedWidth);
				positionStr = 'relative;';
				idStr = '';
				if(this.contentMinWidth > 0){
					positionStr += 'width:'+this.contentMinWidth+'px;';
				}
			}
			var htmlStr = '<table role="grid" id="' + this.options.id + '_header_'+idStr+'table" style="position:'+ positionStr+';left:' + leftW + 'px">';
			htmlStr += this.createColgroup(createFlag);
			htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_header_'+idStr+'thead">';
			htmlStr += this.createThead(createFlag);
			htmlStr += '</thead></table>';
			return htmlStr;
		},
		createHeaderTableFixed:function(){
			return '';
		},
		createHeaderDrag:function(){
			return '';
		},
		/*
		 * 创建colgroup
		 */
		createColgroup: function(createFlag) {
			var oThis = this,htmlStr = '<colgroup>',gridCompColumnArr;
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			$.each(gridCompColumnArr, function() {
				if(this.options.visible){
					htmlStr += '<col';
					htmlStr += ' style="width:' + oThis.formatWidth(this.options.width) + '"';
					htmlStr += '>';
				}
			});
			htmlStr += '</colgroup>';
			return htmlStr;
		},
		/*
		 * 创建thead区域
		 */
		createThead: function(createFlag) {
			var oThis = this,visibleIndex = 0,gridCompColumnArr,trStyle = '';
			if(this.options.maxHeaderLevel >1){
				trStyle = 'style="height:' + this.headerHeight + 'px;"';
			}
			var htmlStr = '<tr role="row" ' + trStyle + '>';
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			$.each(gridCompColumnArr, function(i) {
				var vi = visibleIndex,displayStyle = '';
				if(this.options.visible == false){
					vi = -1;
					displayStyle = 'style="display:none;"';
				}else{
					visibleIndex++;
				}
				// 低版本浏览器不支持th position为relative，因此加入空div
				htmlStr += '<th role="columnheader" data-filed="' + this.options.field + '" rowspan="1" class="u-grid-header-th" ' + displayStyle + 'field="' + this.options.field + '" index="' + i + '" visibleIndex="' + vi + '"><div style="position:relative;">';
				var colorStype = '';
				if(this.options.headerColor){
					colorStype = 'style="color:' + this.options.headerColor + '"';
				}
				htmlStr += '<div class="u-grid-header-link" field="' + this.options.field + '" title="' + this.options.title + '" ' + colorStype + '>' + this.options.title + '</div>';
				if(oThis.options.columnMenu && createFlag != 'fixed'){
					// 创建右侧按钮图标
					htmlStr += '<div class="u-grid-header-columnmenu fa fa-bars " field="' + this.options.field + '" style="display:none;"></div>';
				}
				htmlStr += '</div></th>';
			});
			htmlStr += '</tr>';
			return htmlStr;
		},		/*
		 * 创建内容区域
		 */
		createContent: function() {
			var h = '',displayStr = '',bottonStr='';
			if(this.countContentHeight){
				var wh = $('#' + this.options.id)[0].offsetHeight;
				this.wholeHeight = wh;
				if (wh > 0) {
					this.contentHeight = parseInt(wh) - this.exceptContentHeight > 0?parseInt(wh) - this.exceptContentHeight:0;
					if(this.contentHeight > 0){
						h = 'style="max-height:' + this.contentHeight + 'px;"';
					}
				}
			}
			var htmlStr = '<div id="' + this.options.id + '_content" class="u-grid-content" ' + h + '>';
			if (this.options.showNumCol || this.options.multiSelect) {
				htmlStr += this.createContentLeft();
				if(!(this.contentWidth > this.contentMinWidth)){
					displayStr = 'display:none;';
					bottonStr = 'bottom:0px;'
				}
				htmlStr += this.createContentSumRow();
				if(u.isIOS){
					displayStr += 'width:0px;';
				}
				htmlStr += '<div class="u-grid-content-left-bottom" id="' + this.options.id + '_content_left_bottom" style="width:' + (this.leftW + this.fixedWidth) + 'px;'+displayStr+'">';
				htmlStr += '</div>';
			}
			htmlStr += this.createContentTableFixed();
			htmlStr += this.createContentTable();
			htmlStr += '</div>';
			return htmlStr;
		},
		createContentSumRow:function(){
			return '';
		},
		/*
		 * 创建内容区左侧区域
		 */
		createContentLeft: function() {
			var oThis = this,htmlStr = "",left = 0;
			if(this.options.multiSelect){
				htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_multiSelect" style="width:' + this.multiSelectWidth + 'px;">';
				// 遍历生成所有行
				if (this.dataSourceObj.rows) {
					$.each(this.dataSourceObj.rows, function(i) {
						htmlStr += oThis.createContentLeftMultiSelectRow(this);
					});
				}
				htmlStr += '</div>';
				left += this.multiSelectWidth;
			}
			if (this.options.showNumCol) {
				htmlStr += '<div class="u-grid-content-left" id="' + this.options.id + '_content_numCol" style="width:' + this.numWidth + 'px;left:' + left + 'px;">';
				// 遍历生成所有行
				if (this.dataSourceObj.rows) {
					$.each(this.dataSourceObj.rows, function(i) {
						htmlStr += oThis.createContentLeftNumColRow(i);
					});
				}
				htmlStr += '</div>';
			}
			return htmlStr;
		},
		/*
		 * 创建内容区左侧区域复选区（一行）
		 */
		createContentLeftMultiSelectRow:function(row,displayFlag){
			var displayStr = '';
			if(!this.options.autoExpand && row.level > 0 && displayFlag != 'block'){
				displayStr = 'display:none;'
			}
			var tmpcheck = row.value["$_#_@_id"]
			if(!tmpcheck) {
				tmpcheck = setTimeout(function(){});
			}
			if(gridBrowser.isIE8){
				var	htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect " ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ></div>'
			}else{
				var htmlStr = '<div style="width:' + this.multiSelectWidth + 'px;' + displayStr + '" class="u-grid-content-multiSelect checkbox check-success" ><input class="u-grid-multi-input" id="checkbox'+tmpcheck+'" type="checkbox" value="1" ><label for="checkbox'+tmpcheck+'"></label></div>'
			}
			return htmlStr;
		},
		/*
		 * 创建内容区左侧区域数字列（一行）
		 */
		createContentLeftNumColRow:function(index){
			var htmlStr = '<div style="width:' + this.numWidth + 'px;" class="u-grid-content-num">' + (index+1) + '</div>';
			return htmlStr;
		},
		/*
		 * 创建内容区table
		 */
		createContentTable:function(createFlag){
			var leftW,idStr,styleStr,hStr,cssStr,tableStyleStr;
			if(this.countContentHeight && parseInt(this.contentHeight) > 0){
				hStr = 'max-height:' + this.contentHeight + 'px;';
			}else{
				hStr = "";
			}
			if(createFlag == 'fixed'){
				leftW = parseInt(this.leftW);
				idStr = 'fixed_';
				cssStr = 'fixed-';
				styleStr = 'style="position:absolute;width:'+this.fixedWidth+'px;left:' + leftW + 'px;' +hStr+'"';
				tableStyleStr = 'style="width:'+this.fixedWidth+'px;"';
			}else{
				leftW = parseInt(this.leftW) + parseInt(this.fixedWidth,0); 
				idStr = '';
				cssStr = '';
				styleStr = 'style="position:relative;left:' + leftW + 'px;' +hStr;
				if(this.contentMinWidth > 0){
					styleStr += 'width:' + this.contentMinWidth + 'px;';
				}
				styleStr += '"';
				tableStyleStr = '';
				if(this.contentMinWidth > 0){
					if(this.contentWidth > 0){
						tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;width:' + this.contentWidth + 'px;"';
					}else{
						tableStyleStr = 'style="min-width:' + this.contentMinWidth + 'px;"';
					}
				}
			}
			var  htmlStr = '<div id="' + this.options.id + '_content_'+idStr+'div" class="u-grid-content-'+cssStr+'div" '+styleStr+'>';
			htmlStr += '<div style="height:30px;position:absolute;top:-30px;width:100%;"></div><table role="grid" id="' + this.options.id + '_content_'+idStr+'table" ' + tableStyleStr+'>';
			htmlStr += this.createColgroup(createFlag);
			htmlStr += '<thead role="rowgroup" id="' + this.options.id + '_content_'+idStr+'thead" style="display:none">';
			htmlStr += this.createThead(createFlag);
			htmlStr += '</thead>';
			htmlStr += this.createContentRows(createFlag);
			htmlStr += '</table>';
			if(createFlag != 'fixed'){
				htmlStr += this.createNoRowsDiv();
			}
			htmlStr += '</div>';
			return htmlStr;
		},
		createContentTableFixed:function(){
			return '';
		},
		/*
		 * 创建无数据区域
		 */
		createNoRowsDiv:function(){
			var styleStr = '',styleStr1 = '';
			if(this.contentMinWidth > 0){
				styleStr += 'style="width:' + this.contentMinWidth + 'px;"';
			}
			if(this.contentWidth > 0){
				styleStr1 += 'style="width:' + this.contentWidth + 'px;"';
			}
			var htmlStr = '<div class="u-grid-noRowsDiv"' + styleStr1 + ' id="' + this.options.id + '_noRows"></div>';
			htmlStr += '<div class="u-grid-noRowsShowDiv"' + styleStr + ' id="' + this.options.id + '_noRowsShow">' + this.transMap.ml_no_rows + '</div>';
			return htmlStr;
		},
		/*
		 * 创建内容区域所有行
		 */
		createContentRows: function(createFlag) {
			var oThis = this,htmlStr = "",idStr;
			if(createFlag == 'fixed'){
				idStr = 'fixed_';
			}else{
				idStr = '';
			}
			// 遍历生成所有行
			if (this.dataSourceObj.rows) {
				htmlStr += '<tbody role="rowgroup" id="' + this.options.id + '_content_'+idStr+'tbody">';
				$.each(this.dataSourceObj.rows, function(i) {
					htmlStr += oThis.createContentOneRow(this,createFlag);
				});
				this.createContentRowsSumRow();
				htmlStr += '</tbody>';
			}
			return htmlStr;
		},
		createContentRowsSumRow:function(){
			return '';
		},
		/*
		 * 创建内容区域数据行
		 */
		createContentOneRow: function(row,createFlag,displayFlag) {
			var styleStr = '';
			if(!this.options.autoExpand && row.level > 0 && displayFlag != 'block'){
				styleStr = 'style="display:none"';
			}
			var htmlStr = '<tr role="row" ' + styleStr + '>';
			htmlStr += this.createContentOneRowTd(row,createFlag);
			htmlStr += '</tr>';
			return htmlStr;
		},
		/*
		 * 创建内容区域数据行，针对IE
		 */
		createContentOneRowForIE:function(table,index,rowObj,createFlag,displayFlag){
			var row = table.insertRow(index + 1);
			row.setAttribute("role","row");
			if(!this.options.autoExpand && row.level > 0 && displayFlag != 'block'){
				row.style.display = 'none';
			}
			this.createContentOneRowTdForIE(row,rowObj,createFlag);
		},
		/*
		 * 数据更新重画当前行
		 */
		repaintRow:function(rowIndex){
			var tr = $('#' + this.options.id + '_content_tbody').find('tr[role="row"]')[ rowIndex],
				fixedtr = $('#' + this.options.id + '_content_fixed_tbody').find('tr[role="row"]')[rowIndex],
				row = this.dataSourceObj.rows[rowIndex],$tr = $(tr),
				index = this.getTrIndex($tr);
			if(gridBrowser.isIE8 || gridBrowser.isIE9){
				var table = $('#' + this.options.id + '_content_table')[0],
					fixedtable = $('#' + this.options.id + '_content_fixed_table')[0];
				this.createContentOneRowTdForIE(tr,row)
				this.createContentOneRowTdForIE(fixedtr,row,'fixed')
			}else{
				tr.innerHTML = this.createContentOneRowTd(row);
				if(fixedtr)
					fixedtr.innerHTML = this.createContentOneRowTd(row,'fixed');
			}
			var obj = {};
			obj.begin = index;
			obj.length = 1;
			this.renderTypeFun(obj);
		},
		/*
		 * 创建行td对应的html
		 */
		createContentOneRowTd:function(row,createFlag){
			var oThis = this,htmlStr = '',gridCompColumnArr,value = row.value;
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			$.each(gridCompColumnArr, function() {
				var f = this.options.field,v = $(value).attr(f);
				v = oThis.getString(v,'');
				if($.type(v) == 'object') {
					v = v.showValue
				}
				var renderType = this.options.renderType;
				var treeStyle = '';
				var spanStr ='';
				var iconStr = '';
				var vStr= '';
				var tdStyle = '';
				if(oThis.options.showTree && this.firstColumn){
					var l = parseInt(oThis.treeLeft)*parseInt(row.level);
					treeStyle = 'style="position:relative;';
					if(row.hasChild){
						if(oThis.options.autoExpand){
							spanStr = '<span class=" fa fa-minus-square-o u-grid-content-tree-span"></span>';
						}else{
							spanStr = '<span class=" fa fa-plus-square-o u-grid-content-tree-span"></span>';
						}
					}else{
						l += 16;
					}
					treeStyle += 'left:'+ l +'px;"';
				}
				if(!this.options.visible){
					tdStyle = 'style="display:none;"';
				}
				if(this.options.icon){
					iconStr = '<span class="' + this.options.icon + '"></span>';
				}
				// title="' + v + '" 创建td的时候不在设置title，在renderType中设置,处理现实xml的情况
				htmlStr += '<td role="rowcell"  '+ tdStyle +' title="' + v.replace(/\</g,'\<').replace(/\>/g,'\>') + '"><div class="u-grid-content-td-div" ' + treeStyle+'>' + spanStr + iconStr + '<span>' + v.replace(/\</g,'&lt;').replace(/\>/g,'&gt;') + '</span></div></td>';
			});
			return htmlStr;
		},
		/*
		 * 创建行td,针对IE
		 */
		createContentOneRowTdForIE:function(row,rowObj,createFlag){
			var oThis = this,gridCompColumnArr,value = rowObj.value;
			if(createFlag == 'fixed'){
				gridCompColumnArr = this.gridCompColumnFixedArr;
			}else{
				gridCompColumnArr = this.gridCompColumnArr;
			}
			$.each(gridCompColumnArr, function() {
				var f = this.options.field,v = $(value).attr(f),v = oThis.getString(v,'');
				if($.type(v) == 'object') {
					v = v.showValue
				}
				var renderType = this.options.renderType,treeStyle = '',spanStr ='',iconStr = '',
					vStr= '',htmlStr = '',newCell= row.insertCell();
				newCell.setAttribute("role","rowcell");
				newCell.title = v.replace(/\</g,'\<').replace(/\>/g,'\>');
				if(oThis.options.showTree && this.firstColumn){
					var l = parseInt(oThis.treeLeft)*parseInt(rowObj.level);
					treeStyle = 'style="position:relative;';
					if(rowObj.hasChild){
						if(oThis.options.autoExpand){
							spanStr = '<span class=" fa fa-minus-square-o u-grid-content-tree-span"></span>';
						}else{
							spanStr = '<span class=" fa fa-plus-square-o u-grid-content-tree-span"></span>';
						}
					}else{
						l += 18;
					}
					treeStyle += 'left:'+ l +'px;"';
				}
				if(!this.options.visible){
					newCell.style.display="none";
				}
				if(this.options.icon){
					iconStr = '<span class="' + this.options.icon + '"></span>';
				}
				htmlStr += '<div class="u-grid-content-td-div" ' + treeStyle+'>' + spanStr + iconStr + '<span>' + v.replace(/\</g,'&lt;').replace(/\>/g,'&gt;') + '</span></div>';
				newCell.insertAdjacentHTML('afterBegin',htmlStr);
			});
		},
		/*
		 * 重画内容区域
		 */
		repairContent: function(){
			var $pDiv = $('#' + this.options.id + '_content').parent();
			$('#' + this.options.id + '_content').remove(null, true);
			if($pDiv[0]){
				var htmlStr = this.createContent();
				$pDiv[0].insertAdjacentHTML('beforeEnd', htmlStr);
				this.renderTypeFun();
				this.initContentDivEventFun();
				if($('#' + this.options.id + '_content_div')[0]){
					$('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
				}
				$('#' +this.options.id + '_content_edit_menu').css('display','none');
			}
			this.realtimeTableRows = null;
		},
		/*
		 * 创建完成之后顶层div添加监听
		 */
		initEventFun: function() {
			var oThis = this;
			$('#' + this.options.id).on('mousedown', function(e) {
				if ($(e.target).closest('#' + oThis.options.id + '_header').length > 0) {
					// 点击的是header区域
					oThis.mouseDownX = e.clientX;
					oThis.mouseDownY = e.clientY;
				} else if ($(e.target).closest('#' + oThis.options.id + '_content').length > 0) {
					// 点击的是数据区域
				}
			});
		},
		/*
		 * 创建完成之后grid层 div添加监听
		 */
		initGridEventFun: function() {
			var oThis = this;
			// 拖动
			this.initContentDivEventFun();
			// 全选
			$('#' + this.options.id + '_header_multi_input').on('click', function(e) {
				if(this.checked){
					oThis.setAllRowSelect();
				}else{
					oThis.setAllRowUnSelect();
				}
			});
		},
		/*
		 * 内容区 div添加监听
		 */
		initContentDivEventFun:function(){
			var oThis = this;
			// 通过复选框设置选中行
			$('#' + oThis.options.id + '_content .u-grid-content-left').on('click',function(e){
				var $input = $(e.target).closest('input');
				if($input.length > 0){
					var $div = $($input.parent());
					var index = $('.u-grid-content-multiSelect',$div.parent()).index($div);
					if($input[0].checked){
						oThis.setRowSelect(index);
					}else{
						oThis.setRowUnselect(index);
					}
				}
			});
			// 同步滚动条
			$('#' + this.options.id + '_content_div').on('scroll', function(e) {
				oThis.scrollLeft = this.scrollLeft;
				oThis.scrollTop = this.scrollTop;
				$('#' + oThis.options.id + '_header_table').css('left', oThis.leftW - oThis.scrollLeft + oThis.fixedWidth + "px");
				$('#' + oThis.options.id + '_noRowsShow').css('left', oThis.scrollLeft + "px");
				$('#' + oThis.options.id + '_edit_form').css('left', oThis.scrollLeft + "px");
				$('#' + oThis.options.id + '_content_multiSelect').css('top', -oThis.scrollTop + "px");
				$('#' + oThis.options.id + '_content_numCol').css('top', -oThis.scrollTop + "px");
				$('#' + oThis.options.id + '_content_fixed_div').css('top', -oThis.scrollTop + "px");
			});
			// 数据行相关事件
			$('#' + this.options.id + '_content_tbody').on('click',function(e){
				// 双击处理
				if(typeof oThis.options.onDblClickFun == 'function'){
					oThis.isDblEvent('tbodyClick',oThis.dblClickFun,e,oThis.clickFun,e);
				}else{
					oThis.clickFun(e);
				}
			});
			$('#' + this.options.id + '_content_fixed_tbody').on('click',function(e){
				// 双击处理
				if(typeof oThis.options.onDblClickFun == 'function'){
					oThis.isDblEvent('tbodyClick',oThis.dblClickFun,e,oThis.clickFun,e);
				}else{
					oThis.clickFun(e);
				}
			});
			$('#' + this.options.id + '_content').on('mousemove', function(e) {
				var $tr = $(e.target).closest('tr'),$div = $(e.target).closest('div'),mousemoveIndex = -1;
				// 首先清除所有的背景
				if($tr.length > 0){
					mousemoveIndex = $('tr',$tr.parent()).index($tr);
				}else if($div.length > 0 && ($div.hasClass('u-grid-content-multiSelect') || $div.hasClass('u-grid-content-num'))){ //左侧复选及数字列
					mousemoveIndex = $('div',$div.parent()).index($div);
				}

				oThis.trHoverFun(mousemoveIndex);
			});
			$('#' + this.options.id + '_content').on('mouseout', function(e) {
				$('#' + oThis.options.id + '_content_tbody').find('tr').removeClass('u-grid-move-bg');
				$('#' + oThis.options.id + '_content_fixed_tbody').find('tr').removeClass('u-grid-move-bg');
				if(oThis.options.multiSelect)
					$('#' + oThis.options.id + '_content_multiSelect').find('div').removeClass('u-grid-move-bg');
				if(oThis.options.showNumCol)
					$('#' + oThis.options.id + '_content_numCol').find('div').removeClass('u-grid-move-bg');
				if(typeof oThis.options.onContentOut == 'function'){
			    	var obj = {};
			     	obj.gridObj = oThis;
			     	var $tr = $(e.target).closest('tr');
			     	if($tr.length > 0 && !$tr.is('.u-grid-content-sum-row')){
			      		var mouseoutIndex = $('tr[role="row"]',$tr.parent()).index($tr)
			      		obj.rowObj = oThis.dataSourceObj.rows[mouseoutIndex];
			      		obj.rowIndex = mouseoutIndex;
			     		}
			     	oThis.options.onContentOut(obj);
			    }
			});
		},
		trHoverFun:function(index){
			var oThis = this;
			$('#' + oThis.options.id + '_content_tbody').find('tr').removeClass('u-grid-move-bg');
			$('#' + oThis.options.id + '_content_fixed_tbody').find('tr').removeClass('u-grid-move-bg');
			if(oThis.options.multiSelect)
				$('#' + oThis.options.id + '_content_multiSelect').find('div').removeClass('u-grid-move-bg');
			if(oThis.options.showNumCol)
				$('#' + oThis.options.id + '_content_numCol').find('div').removeClass('u-grid-move-bg');
			if(index > -1){
				var $tr = $('#' + oThis.options.id + '_content_tbody').find('tr').eq(index);
				if($tr[0].id && $tr[0].id == oThis.options.id + '_edit_tr'){
					return;
				}
				$('#' + oThis.options.id + '_content_tbody').find('tr').eq(index).addClass('u-grid-move-bg');
				$('#' + oThis.options.id + '_content_fixed_tbody').find('tr').eq(index).addClass('u-grid-move-bg');
				if(oThis.options.multiSelect)
					$('#' + oThis.options.id + '_content_multiSelect').find('div').eq(index).addClass('u-grid-move-bg');
				if(oThis.options.showNumCol)
					$('#' + oThis.options.id + '_content_numCol').find('div').eq(index).addClass('u-grid-move-bg');
				if(typeof oThis.options.onRowHover == 'function' && !$tr.is('.u-grid-content-sum-row')){
					var obj = {};
					obj.gridObj = oThis;
					obj.rowObj = oThis.dataSourceObj.rows[index];
					obj.rowIndex = index;
					oThis.options.onRowHover(obj);
				}
			}
		},
		/*
		 * 定时器处理
		 */
		setIntervalFun: function(e) {
			this.widthChangeFun();
			this.heightChangeFun();
			this.editorRowChangeFun();
		},
		editorRowChangeFun: function(){
		},
		/*
		 * grid区域创建完成之后处理
		 * 1、数据列显示处理
		 * 2、取行高
		 */
		afterGridDivsCreate:function(){
			this.columnsVisibleFun();
			this.resetThVariable();
			this.countRowHeight();
			this.noRowsShowFun();
			this.renderTypeFun();
			this.resetScrollLeft();
			this.hideEditMenu();
			if(typeof this.options.afterCreate == 'function'){
				this.options.afterCreate.call(this);
			}
		},
		/*
		 * 取行高
		 */
		countRowHeight:function(){
			if($('#' + this.options.id + '_content_tbody tr')[0]){
				this.rowHeight = $('#' + this.options.id + '_content_tbody tr')[0].offsetHeight;
			}
		},
		/*
		 * 处理是否显示无数据行
		 */
		noRowsShowFun:function(){
			if(this.dataSourceObj.rows && this.dataSourceObj.rows.length > 0){
				$('#' + this.options.id + '_noRowsShow').css('display','none');
				$('#' + this.options.id + '_noRows').css('display','none');
			}else{
				$('#' + this.options.id + '_noRowsShow').css('display','block');
				$('#' + this.options.id + '_noRows').css('display','block');
			}
		},
		/*
		 * 更新最后数据行标识
		 */
		updateLastRowFlag: function(){
			var rows =$('#' + this.options.id + '_content_tbody').find('tr[role=row]')
			for(var i=0, count = rows.length; i<count; i++){
				if (i == count -1)
					$(rows[i]).addClass('last-row')
				else
					$(rows[i]).removeClass('last-row')
			}
		},
		updateNumColLastRowFlag: function(){
			var numCols =$('#' + this.options.id + '_content_numCol').find('.u-grid-content-num')
			for(var i=0, count = numCols.length; i<count; i++){
				if (i == count -1)
					$(numCols[i]).addClass('last-row')
				else
					$(numCols[i]).removeClass('last-row')
			}
		},
		/*
		 * 处理renderType
		 * begin为起始行，length为行数（增加行数时使用）
		 */
		renderTypeFun:function(obj){
			if(!this.isGridShow())
				return;
			if(typeof obj == 'undefined'){
				var begin = null,length = null,field = '';
			}else{
				var begin = typeof obj.begin == 'undefined'?null:obj.begin,length = typeof obj.length == 'undefined'?null:obj.length,field = typeof obj.field == 'undefined'?'':obj.field;
			}
			var oThis = this,begin = parseInt(begin),length = parseInt(length),end = begin;
			if(length >0){
				end = parseInt(begin + length - 1);
			}
			if (field == ''){
				if(this.gridCompColumnFixedArr)
					$.each(this.gridCompColumnFixedArr,function(i){
						oThis.renderTypeByColumn(this,i,begin,length,true);
					})
				$.each(this.gridCompColumnArr,function(i){
					oThis.renderTypeByColumn(this,i,begin,length, false);
				})
			}
			else{
				var rendered = false
				if(this.gridCompColumnFixedArr)
					$.each(this.gridCompColumnFixedArr,function(i){
						if (this.options.field == field){
							oThis.renderTypeByColumn(this,i,begin,length,true);
							rendered = true
							return;
						}
					})
				if (!rendered)
					$.each(this.gridCompColumnArr,function(i){
						if (this.options.field == field){
							oThis.renderTypeByColumn(this,i,begin,length,false);
							return;
						}
					})
			}
		},
		/*
		 * 处理renderType
		 * gridCompColumn对象，index为第几列
		 * begin为起始行，length为行数（增加行数时使用）
		 */
		renderTypeByColumn:function(gridCompColumn,i,begin,length, isFixedColumn){
			var oThis = this,renderType = gridCompColumn.options.renderType,
				sumCol = gridCompColumn.options.sumCol,
				sumRenderType = gridCompColumn.options.sumRenderType,
				dataType = gridCompColumn.options.dataType,
				precision = gridCompColumn.options.precision,
				format = gridCompColumn.options.format,field = gridCompColumn.options.field,
				end = begin,idSuffix = isFixedColumn === true ? '_content_fixed_tbody' : '_content_tbody',
				idStr = isFixedColumn === true? 'fixed_' : '';
			if(length >0){
				end = parseInt(begin + length - 1);
			}
			this.realtimeTableRows = document.getElementById(oThis.options.id + idSuffix).children;
			// 记录role不是row的行
			var notRowIndex = -1;
			for(var k = 0;k < oThis.realtimeTableRows.length;k++) {
				if(oThis.realtimeTableRows[k].getAttribute("role") != "row") {
					notRowIndex = k
				}
			}
			$.each(oThis.dataSourceObj.rows, function(j) {
				if((begin >= 0 && j >= begin && j <= end) || isNaN(begin)){
					var trIndex = j;
					if(notRowIndex != -1 && j >= notRowIndex) {
						trIndex++;
					}
					var tr = oThis.realtimeTableRows[trIndex],td = tr.children[i];
					if(td){
						if(td.children[0].innerHTML.indexOf('u-grid-content-tree-span')   !=  -1){
							var span =  td.children[0].children[1];
						}else{
							var span =  td.children[0];
						}
						if(span){
							var v = $(this.value).attr(field);
							if(typeof renderType == 'function' || dataType == 'date' || dataType == 'datetime' || dataType == 'integer' || dataType == 'float'){
								span.innerHTML = '';
								if(typeof renderType == 'function'){
									v = oThis.getString(v,'');
									var obj = {};
									obj.value = v;
									obj.element = span;
									obj.gridObj = oThis;
									obj.row = this;
									obj.gridCompColumn = gridCompColumn;
									obj.rowIndex = j;
									renderType.call(oThis,obj);
								}else if(dataType == 'date' || dataType == 'datetime'){
									if(v == null || v == undefined || v == 'null' || v == 'undefined' || v == ""){
										v = "";
									}
									if (dataType == 'date'){
										v = u.dateRender(v);
									}else{
										v = u.dateTimeRender(v);
									}
									span.innerHTML = v;
									td.title = v;
								}else if(dataType == 'integer'){
									v = parseInt(v);
									span.innerHTML = v;
									td.title = v;
								}else if(dataType == 'float'){
									if(precision){
										var o = {};
										o.value = v;
										o.precision = precision;
										v = oThis.DicimalFormater(o);
									}else{
										v = parseFloat(v);
									}
									span.innerHTML = v;
									td.title = v;
								}else{ //此处逻辑放到渲染处，减少render执行次数。
									v = oThis.getString(v,'');
									var v1 = v.replace(/\</g,'\<');
									v1 = v1.replace(/\>/g,'\>');
									td.title = v;
									v = v.replace(/\</g,'&lt;');
									v = v.replace(/\>/g,'&gt;');

									span.innerHTML = v;
								}
							}else{
								v = oThis.getString(v,'');
								var v1 = v.replace(/\</g,'\<');
								v1 = v1.replace(/\>/g,'\>');
								td.title = v;
								v = v.replace(/\</g,'&lt;');
								v = v.replace(/\>/g,'&gt;');

								span.innerHTML = v;
							}
						}

					}
				}
			});
			this.renderTypeSumRow(gridCompColumn,i,begin,length, isFixedColumn);
		},
		renderTypeSumRow:function(gridCompColumn,i,begin,length, isFixedColumn){
		},
		/*
		 * grid区域重画完成之后处理，已经执行过afterGridDivsCreate
		 * 1、设置横向滚动条
		 * 2、隐藏编辑按钮
		 */
		afterRepaintGrid:function(){
			this.resetScrollLeft();
			this.hideEditMenu();
		},
		/*
		 * 设置横向滚动条
		 */
		resetScrollLeft:function(){
			if($('#' + this.options.id + '_content_div')[0]){
				$('#' + this.options.id + '_content_div')[0].scrollLeft = this.scrollLeft;
			}
		},
		/*
		 * 隐藏编辑按钮
		 */
		hideEditMenu:function(){
		},		
		/*
		 * 整体宽度改变处理
		 */
		widthChangeFun: function() {
			var oThis = this;
			if($('#' + this.options.id)[0]){
				// 获取整体区域宽度
				var w = $('#' + this.options.id).width()  //[0].offsetWidth;
				if(this.wholeWidth != w){
					this.wholeWidth = w;
					// 树展开/合上的时候会导致页面出现滚动条导致宽度改变，没有&&之后会重新刷新页面导致无法收起
					if (w > this.options.formMaxWidth && ((this.showType == 'form' || this.showType == '') || !$('#' + this.options.id + '_content_div tbody')[0]) || this.options.overWidthHiddenColumn) { //lyk--需要完善隐藏之后再显示同事添加数据操作
						oThis.widthChangeGridFun();
					} else if (w > 0 && w < this.options.formMaxWidth && (this.showType == 'grid' || this.showType == '')) {
//						this.widthChangeFormFun();
					}
					// 某些情况下需要重复执行，待优化，去掉，以后也不应该执行这段代码
					if(w > this.options.formMaxWidth){
						this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
						if(this.contentMinWidth < 0)
							this.contentMinWidth = 0;
						setTimeout(function(){ 
							$('#' + oThis.options.id + '_header_wrap').css('max-width', (oThis.wholeWidth) + 'px');
							$('#' + oThis.options.id + '_content_div').css('width', oThis.contentMinWidth  + 'px');
							$('#' + oThis.options.id + '_content_table').css('min-width', oThis.contentMinWidth  + 'px');
							$('#' + oThis.options.id + '_content_table').css('width', oThis.contentMinWidth  + 'px');
							$('#' + oThis.options.id + '_header_table').css('min-width', oThis.contentMinWidth + 'px');
							$('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
							$('#' + oThis.options.id + '_noRowsShow').css('width', oThis.contentMinWidth + 'px');
							//滚动条可能发生变化导致grid内部列的宽度发生变化
							oThis.columnsVisibleFun();
							if(oThis.contentRealWidth < oThis.contentMinWidth){
								oThis.contentWidth = oThis.contentMinWidth;
							}else{
								oThis.contentWidth = oThis.contentRealWidth;
							}
							$('#' + oThis.options.id + '_noRows').css('width', oThis.contentWidth + 'px');
							if(typeof oThis.options.afterCreate == 'function'){
								oThis.options.afterCreate.call(oThis);
							}
						},300);
					}
				}
				$('#' + oThis.options.id + '_header_table').css('width', oThis.contentMinWidth + 'px');
				$('#' + oThis.options.id + '_edit_form').css('width', oThis.contentMinWidth + 'px');
			}
		},
		/*
		 * 整体宽度改变处理(grid形式)
		 */
		widthChangeGridFun: function() {
			var oThis = this,halfWholeWidth = parseInt(this.wholeWidth/2);
			this.widthChangeGridFunFixed(halfWholeWidth);
			/* 如果宽度不足处理自动隐藏*/
			this.widthChangeGridFunOverWidthHidden();
			// 内容区域宽度自动扩展
			this.contentMinWidth = parseInt(this.wholeWidth) - parseInt(this.leftW) - parseInt(this.fixedWidth);
			if(this.contentMinWidth < 0)
				this.contentMinWidth = 0;
			if(this.contentRealWidth < this.contentMinWidth){
				this.contentWidth = this.contentMinWidth;
				var oldWidth = this.lastVisibleColumn.options.width;
				this.lastVisibleColumnWidth = oldWidth + (this.contentMinWidth - this.contentRealWidth);
				// modfied by tianxq1 最后一列自动扩展
				this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth-20;
			}else{
				this.contentWidth = this.contentRealWidth;
			}
			this.createGridFlag = false;
			this.createGridDivs();
			$('#' + this.options.id + '_form').css('display', 'none');
			$('#' + this.options.id + '_grid').css('display', 'block');
		},
		widthChangeGridFunFixed:function(halfWholeWidth){
		},
		widthChangeGridFunOverWidthHidden:function(){
		},
		/*
		 * 整体高度改变处理
		 */
		heightChangeFun: function() {
			if(this.countContentHeight){
				var oldH = this.wholeHeight,h = $('#' + this.options.id)[0].offsetHeight;
				this.wholeHeight = h;
				if (oldH != h) {
					var contentH = h - this.exceptContentHeight > 0 ? h - this.exceptContentHeight : 0;
					$('#' + this.options.id + '_content').css('height', contentH + 'px');
					$('#' + this.options.id + '_content_div').css('height', contentH + 'px');
				}
			}
		},
		/*
		 * column是否显示处理，只在初始化gridCompColumn对象时调用，其他时候不再调用
		 * 计算固定区域及内容区域的真实宽度
		 * 计算第一列
		 * 计算内容区域最后一列显示列
		 */
		columnsVisibleFun:function(){
			var oThis = this,
				w = 0;
			this.firstColumn = true;

			$.each(this.gridCompColumnArr,function(){
				if(this.options.visible){
					w+=parseInt(this.options.width);
					this.firstColumn = oThis.firstColumn;
					oThis.firstColumn = false;
					oThis.lastVisibleColumn = this;
					oThis.lastVisibleColumnWidth = this.options.width;
				}
			});
			this.contentRealWidth = w;
		},
		/*
		 * 创建完成之后处理变量
		 */
		resetThVariable: function() {
			if(this.showType != 'grid')
				return;
			var oThis = this;
			this.contentWidth = 0;
			
			// 记录每列宽度及当前宽度之和
			$('#' + this.options.id + '_header_table th', this.$ele).each(function(i) {  //会出现th多于列的情况，发现问题之后再看下为什么
				var gridCompColumn = oThis.gridCompColumnArr[i];
				var w = 0;
				if(gridCompColumn.options.visible){
					w = gridCompColumn.options.width;
				}
				this.attrLeftTotalWidth = oThis.contentWidth;
				oThis.contentWidth += w;
				oThis.resetThVariableDrag(this,gridCompColumn,w);
				this.gridCompColumn = gridCompColumn;
				this.attrWidth = w;
				this.attrRightTotalWidth = oThis.contentWidth;
				
			});
			oThis.resetThVariableHeaderLevel();
		},
		resetThVariableDrag:function(nowTh,gridCompColumn){
		},
		resetThVariableHeaderLevel:function(){
		},
		/*
		 * 内容区宽度改变
		 */
		contentWidthChange:function(newContentWidth){
			if(newContentWidth < this.contentMinWidth){
				var oldW = this.lastVisibleColumn.options.width;
				this.lastVisibleColumnWidth = oldW + (this.contentMinWidth - newContentWidth);
				$('#' + this.options.id + '_header_table col:last').css('width', this.lastVisibleColumnWidth + "px");
				$('#' + this.options.id + '_content_table col:last').css('width', this.lastVisibleColumnWidth + "px");
				newContentWidth = this.contentMinWidth;
			}
			$('#' + this.options.id + '_content_table').css('width', newContentWidth + "px");
			$('#' + this.options.id + '_noRows').css('width', newContentWidth + "px");
			if(newContentWidth > this.contentMinWidth){
				$('#' + this.options.id + '_content_left_bottom').css('display','block');
				$('#' + this.options.id + '_content_left_sum_bottom').css('bottom',16);
			}else{
				$('#' + this.options.id + '_content_left_bottom').css('display','none');
				$('#' + this.options.id + '_content_left_sum_bottom').css('bottom',0);
			}
			return newContentWidth;
		},
		/*
		 * 获取某列对应属性
		 */
		getColumnAttr: function(attr, field) {
			for (var i = 0; i < this.gridCompColumnArr.length; i++) {
				if (this.gridCompColumnArr[i].options.field == field) {
					return $(this.gridCompColumnArr[i].options).attr(attr);
				}
			}
			return "";
		},
		/*
		 * 根据field获取gridcompColumn对象
		 */
		getColumnByField: function(field){
			for (var i = 0; i < this.gridCompColumnArr.length; i++) {
				if (this.gridCompColumnArr[i].options.field == field) {
					return this.gridCompColumnArr[i];
				}
			}
			return null;
		},
		/*
		 * 获取column属于第几列
		 */
		getIndexOfColumn:function(column){
			var index = -1;
			for(var i=0;i < this.gridCompColumnArr.length;i++){
				if(this.gridCompColumnArr[i] == column){
					index = i;
					break;
				}
			}
			return index;
		},
		/*
		 * 获取column属于当前显示第几列
		 */
		getVisibleIndexOfColumn:function(column){
			var index = -1;
			var j = 0;
			for(var i=0;i < this.gridCompColumnArr.length;i++){
				if(this.gridCompColumnArr[i] == column){
					if(!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){
						index = j;
					}
					break;
				}
				if(!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){
					j++;
				}
			}
			return index;
		},
		/*
		 * 获取column后面第一个显示列所在第几列
		 */
		getNextVisibleInidexOfColumn:function(column){
			var index = -1,flag = false,j = 0;
			for(var i=0;i < this.gridCompColumnArr.length;i++){
				if(this.gridCompColumnArr[i] == column){
					flag = true;
					continue;
				}
				if(flag == true && !($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){
					index = j;
					break;
				}
				if(!($('#' + this.options.id + '_header').find('th').eq(i).css('display') == 'none')){

					j++;
				}
			}
			return index;
		},
		/*
		 * 修改第一列的css
		 */
		headerFirstClassFun:function(){
			$('#' + this.options.id + '_grid .u-grid-header-th-first').removeClass('u-grid-header-th-first');
			$('#' + this.options.id + '_grid').find('th').eq(0).addClass('u-grid-header-th-first');
		},
		/*
		 * 双击/单击处理
		 */
		isDblEvent:function(eventname,dbFun,dbArg,Fun,Arg){
			if (this.currentEventName != null && this.currentEventName == eventname){
				dbFun.call(this,dbArg);
				this.currentEventName = null;
				if (this.cleanCurrEventName)
					clearTimeout(this.cleanCurrEventName);
			}else{
				var oThis = this;
				if (this.cleanCurrEventName)
					clearTimeout(this.cleanCurrEventName);
				this.currentEventName = eventname;
				this.cleanCurrEventName =  setTimeout(function(){
					oThis.currentEventName = null;
					Fun.call(oThis,Arg);
				},500);
			}
		},
		/*
		 * 双击处理
		 */
		dblClickFun:function(e){
			if(typeof this.options.onDblClickFun == 'function'){
				var $tr = $(e.target).closest('tr');
				if($tr[0].id == this.options.id + '_edit_tr'){
					return;
				}
				var index = 0;
				if($tr.length > 0){
					index = this.getTrIndex($tr);
				}
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[index];
				obj.rowIndex = index;
				this.options.onDblClickFun(obj);
			}
		},
		/*
		 * 单击处理
		 */
		clickFun:function(e){
			var oThis = this;
			
			
			// 处理focus事件
			var $tr = $(e.target).closest('tr');
			if($tr.length > 0 && $tr[0].id == this.options.id + '_edit_tr'){
				return;
			}
			var index = this.getTrIndex($tr);
			if(typeof this.options.onBeforeClickFun == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[index];
				obj.rowIndex = index;
				obj.e = e;
				if(!this.options.onBeforeClickFun(obj)){
					return;
				}
			}
			// 处理树表展开/合上
			this.clickFunTree(e);
			if($tr.length > 0){
				
				var row = oThis.dataSourceObj.rows[index];
				if(row){
					if(oThis.options.rowClickBan){
						return;
					}
					var rowChildIndex = row.childRowIndex;
					if(oThis.dataSourceObj.rows[index].focus && oThis.options.cancelFocus){
						oThis.setRowUnFocus(index);
					}else{
						if(!oThis.dataSourceObj.rows[index].focus){
							oThis.setRowFocus(index);
						}
					}
					this.clickFunEdit(e,index);
				}
			}
		},
		clickFunTree:function(e){
		},
		clickFunEdit:function(e){
		},
		/*
		 * 设置某列是否显示(传入column)
		 */
		setColumnVisibleByColumn:function(column,visible){
			var index = this.getIndexOfColumn(column);
			this.setColumnVisibleByIndex(index,visible);
		},
		/*
		 * 设置某列是否显示(传入index为gridCompColumnArr中的数据)
		 */
		setColumnVisibleByIndex:function(index,visible){
			if(index >= 0){
				var column = this.gridCompColumnArr[index],
					visibleIndex = this.getVisibleIndexOfColumn(column);
				// 显示处理
				if(column.options.visible == false && visible){
					var htmlStr = '<col';
					if (column.options.width) {
						htmlStr += ' style="width:' + this.formatWidth(column.options.width) + '"';
					}
					htmlStr += '>';

					$('#' + this.options.id + '_header th:eq(' + index + ')').css('display', "");
					$('#' + this.options.id + '_content th:eq(' + index + ')').css('display', "");
					$('td:eq(' + index + ')',$('#' + this.options.id + '_content tbody tr')).css('display', "");
					// 当前列之后的显示列的index
					var nextVisibleIndex = this.getNextVisibleInidexOfColumn(column);
					if(nextVisibleIndex == -1){
						// 添加在最后面
						try{
							$('#' + this.options.id + '_header col:last')[0].insertAdjacentHTML('afterEnd',htmlStr);
							$('#' + this.options.id + '_content col:last')[0].insertAdjacentHTML('afterEnd',htmlStr);
						}catch(e){
							$('#' + this.options.id + '_header col:last').after(htmlStr);
							$('#' + this.options.id + '_content col:last').after(htmlStr);
						}
					}else{
						// 添加在下一个显示列之前
						try{
							$('#' + this.options.id + '_header col:eq(' + (nextVisibleIndex) + ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
							$('#' + this.options.id + '_content col:eq(' + (nextVisibleIndex) + ')')[0].insertAdjacentHTML('beforeBegin',htmlStr);
						}catch(e){
							$('#' + this.options.id + '_header col:eq(' + (nextVisibleIndex) + ')').before(htmlStr);
							$('#' + this.options.id + '_content col:eq(' + (nextVisibleIndex) + ')').before(htmlStr);
						}
					}
					var newContentW = this.contentWidth + column.options.width;
				}
				// 隐藏处理
				if(column.options.visible == true && !visible){
					$('#' + this.options.id + '_header th:eq(' + index + ')').css('display', "none");
					$('#' + this.options.id + '_header col:eq(' + visibleIndex + ')').remove();
					$('#' + this.options.id + '_content th:eq(' + index + ')').css('display', "none");
					$('#' + this.options.id + '_content col:eq(' + visibleIndex + ')').remove();
					$('td:eq(' + index + ')',$('#' + this.options.id + '_content tbody tr')).css('display', "none");
					// 隐藏之后需要判断总体宽度是否小于内容区最小宽度，如果小于需要将最后一列进行扩展
					var newContentW = this.contentWidth - column.options.width;
				}
				column.options.visible = visible;
				this.columnsVisibleFun();
				var w = this.contentWidthChange(newContentW);
				this.lastVisibleColumn.options.width = this.lastVisibleColumnWidth;
				this.contentWidth = w;
				this.resetThVariable();
				this.saveGridCompColumnArrToLocal();
			}
		},				
		/*
		 * 对宽度和高度进行处理
		 */
		formatWidth: function(w) { // 获得宽度
			if(w){
				return (w + "").indexOf("%") > 0 ? w : parseInt(w) + "px";
			}else{
				return '';
			}
		},
		/*
		 * 两个元素交换位置，要求传入参数e1在e2之前
		 */
		swapEle: function(e1, e2) {
			var n = e1.next(),
				p = e2.prev();
			e2.insertBefore(n);
			e1.insertAfter(p);
		},
		getString:function(value,defaultValue){
			if(value === null || value === undefined || value === 'null' || value === 'undefined' || value === ""){
				value = defaultValue;
			}
			if(gridBrowser.isIE8){
				return [value].join("");
			}else{
				return value + "";
			}
		},
		getInt:function(value,defaultValue){
			if(value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || Number.isNaN(value)){
				value = defaultValue;
			}
			return value;
		},
		getFloat:function(value,defaultValue){
			if(value === null || value === undefined || value === 'null' || value === 'undefined' || value === "" || Number.isNaN(value)){
				value = defaultValue;
			}
			return value;
		},
		/*
		 * 克隆对象
		 */
		cloneObj:function(obj){
		    var o;
		    if(typeof obj == "object"){
		        if(obj === null){
		            o = null;
		        }else{
		            if(obj instanceof Array){
		                o = [];
		                for(var i = 0, len = obj.length; i < len; i++){
		                    o.push(this.cloneObj(obj[i]));
		                }
		            }else{
		                o = {};
		                for(var k in obj){
		                    o[k] = this.cloneObj(obj[k]);
		                }
		            }
		        }
		    }else{
		        o = obj;
		    }
		    return o;
		},
		/*
		 * 处理精度
		 */
		DicimalFormater:function(obj){
			var value = obj.value + '',precision = obj.precision;
			for ( var i = 0; i < value.length; i++) {
				if ("-0123456789.".indexOf(value.charAt(i)) == -1)
					return "";
			}
			return this.checkDicimalInvalid(value, precision);
		},
		checkDicimalInvalid:function(value,precision){
			if (value == null || isNaN(value))
				return "";
			// 浮点数总位数不能超过10位
			var digit = parseFloat(value);
			var result = (digit * Math.pow(10, precision) / Math.pow(10, precision))
					.toFixed(precision);
			if (result == "NaN")
				return "";
			return result;
		},
		accAdd:function(v1,v2){
			var r1,r2,m;
			try{
				r1 = v1.toString().split('.')[1].length;
			}catch(e){
				r1 = 0;
			}
			try{
				r2 = v2.toString().split('.')[1].length;
			}catch(e){
				r2 = 0;
			}
			m = Math.pow(10,Math.max(r1,r2))
			return (v1 * m + v2 * m)/m;
		},
		getTrIndex:function($tr){
			return $('tr[id!="' + this.options.id +'_edit_tr"]',$tr.parent()).index($tr);
		},
		/*
		 * 设置数据源
		 */
		setDataSource: function(dataSource) {
			this.initDataSourceVariable();
			this.options.dataSource = dataSource;
			this.initDataSource();
			this.repairContent();
			this.afterGridDivsCreate();
		},
		/*
		 * 设置数据源 格式为：
		 * {
    		fields:['column1','column2','column3','column4','column5','column6'],
    		values:[["cl1","1","cl3","cl4","cl5","cl6"]
    				,["cl12","2","cl32","cl42","cl52","cl62"]
    				,["cl13","3","cl33","cl43","cl53","cl63"]
    				,["cl14","4","cl34","cl44","cl54","cl64"]
    				,["cl15","5","cl35","cl45","cl55","cl65"]
    				,["cl16","6","cl36","cl46","cl56","cl66"]
		    	]

			}
		 */
		setDataSourceFun1: function(dataSource){
			var dataSourceObj = {};
			if(dataSource.values){
				var valuesArr = new Array();
				$.each(dataSource.values, function() {
					if(dataSource.fields){
						var valueObj = {},value = this;
						$.each(dataSource.fields, function(j) {
							$(valueObj).attr(this,value[j])
						});
						valuesArr.push(valueObj);
					}
				});
			}
			$(dataSourceObj).attr('values',valuesArr);
			this.setDataSource(dataSourceObj);
		},
		/*
		 * 添加一行
		 */
		addOneRow:function(row,index){
			var oThis = this,displayFlag = 'none',rowObj = {},parentIndex,
				parentChildLength = 0,l = this.dataSourceObj.rows.length,endFlag = false;
				rowObj.value = row
			if(this.showType == 'grid'){ //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
				this.editClose();
				index = this.addOneRowTree(row,index,rowObj);
				if(index != 0){
					if(index && index > 0){
						if(l < index)
							index = l;
					}else{
						index = 0;
					}
				}
				if(l == index){
					endFlag = true;
				}
				rowObj.valueIndex = index;
				this.dataSourceObj.rows.splice(index,0,rowObj);
				this.updateEditRowIndex('+', index);
				// 如果是在中间插入需要将后续的valueIndex + 1；
				if(this.dataSourceObj.rows.length > (index + 1)){
					$.each(this.dataSourceObj.rows,function(i){
						if(i > index){
							this.valueIndex =  this.valueIndex + 1;
						}
					});
				}
				try{
					var htmlStr = this.createContentOneRow(rowObj,'normal',displayFlag);
					if(endFlag){
						$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
					}else{
						if($('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index])
							$('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin',htmlStr);
						else if($('#' + this.options.id + '_content_div tbody')[0])
							$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin',htmlStr);
					}
					if($('#' + this.options.id + '_content_fixed_div').length > 0){
						var htmlStr = this.createContentOneRow(rowObj,'fixed',displayFlag);
						if(endFlag){
							$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
						}else{
							if($('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index])
								$('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin',htmlStr);
							else if($('#' + this.options.id + '_content_fixed_div tbody')[0])
								$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin',htmlStr);
						}
					}
				}catch(e){
					//IE情况下
					var table = $('#' + this.options.id + '_content_div table')[0];
					if(table)
						this.createContentOneRowForIE(table,index,rowObj,'normal',displayFlag);
					var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
					if(fixedTable)
						this.createContentOneRowForIE(fixedTable,index,rowObj,'fixed',displayFlag);
				}
				if(this.options.multiSelect){
					var htmlStr = this.createContentLeftMultiSelectRow(rowObj,displayFlag);
					if(endFlag){
						$('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd',htmlStr);
					}else{
						if($('#' + this.options.id + '_content_multiSelect').find('div')[index])
							$('#' + this.options.id + '_content_multiSelect').find('div')[index].insertAdjacentHTML('beforeBegin',htmlStr);
						else
							$('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin',htmlStr);
					}
				}
				if (this.options.showNumCol) {
					var htmlStr = this.createContentLeftNumColRow(l);
					if(endFlag){
						$('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd',htmlStr);
					}else{
						if($('#' + this.options.id + '_content_numCol').find('div')[index])
							$('#' + this.options.id + '_content_numCol').find('div')[index].insertAdjacentHTML('beforeBegin',htmlStr);
						else
							$('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin',htmlStr);
					}
					this.resetNumCol();
					this.updateNumColLastRowFlag();
				}
				this.repairSumRow();
				this.noRowsShowFun();
				this.updateLastRowFlag();
				var obj = {};
				obj.begin = index;
				obj.length = 1;
				this.renderTypeFun(obj);
			}
			// 需要重新排序重置变量
			var l = 0;
			if(this.options.showTree){
				if(this.dataSourceObj.options.values){
					l = this.dataSourceObj.options.values.length;
				}else{
					this.dataSourceObj.options.values = new Array();
				}
				this.dataSourceObj.options.values.splice(index,0,row);
				this.dataSourceObj.sortRows();
				this.addOneRowTreeHasChildF();
			}else{
				if(this.dataSourceObj.options.values){

				}else{
					this.dataSourceObj.options.values = new Array();
				}
				this.dataSourceObj.options.values.splice(index,0,row);
			}
		},
		addOneRowTree:function(row,index){
			return index;
		},
		addOneRowTreeHasChildF:function(){
		},
		editClose:function(){
		},
		/*
		 * 添加多行
		 */
		addRows:function(rows,index){
			if(this.options.showTree){
				// 树表待优化
				var l = rows.length;
				for(var i = l-1; i > -1;i--){
					this.addOneRow(rows[i],index);
				}
				return;
			}
			this.editClose();
			var htmlStr = '',htmlStrmultiSelect='',htmlStrNumCol='',htmlStrFixed='',oThis = this,l = this.dataSourceObj.rows.length,endFlag = false;
			if(index != 0){
				if(index && index > 0){
					if(l < index)
						index = l;
				}else{
					index = 0;
				}
			}
			if(l == index){
				endFlag = true;
			}
			var rowObjArr = new Array();
			$.each(rows, function(i) {
				var rowObj = {};
				rowObj.value = this;
				rowObj.valueIndex = index + i;
				rowObjArr.push(rowObj);
				oThis.dataSourceObj.rows.splice(index + i,0,rowObj);
				oThis.updateEditRowIndex('+', index+i)
			});
			// 如果是在中间插入需要将后续的valueIndex + 1；
			if(this.dataSourceObj.rows.length > (index + rows.length)){
				$.each(this.dataSourceObj.rows,function(i){
					if(i > (index + rows.length - 1)){
						this.valueIndex =  this.valueIndex + rows.length;
					}
				});
			}
			if(this.showType == 'grid' && $('#' + this.options.id + '_content_div tbody')[0]){ //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据 //lyk--需要完善隐藏之后再显示同事添加数据操作
				$.each(rowObjArr, function(i) {
					htmlStr += oThis.createContentOneRow(this);
					htmlStrFixed += oThis.createContentOneRowFixed(this);
					if(oThis.options.multiSelect){
						htmlStrmultiSelect += oThis.createContentLeftMultiSelectRow(this);
					}
					if(oThis.options.showNumCol){
						htmlStrNumCol += oThis.createContentLeftNumColRow(l + i);
					}
				});
				try{
					if(endFlag){
						$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStr);
					}else{
						if($('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index])
							$('#' + this.options.id + '_content_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin',htmlStr);
						else if($('#' + this.options.id + '_content_div tbody')[0])
							$('#' + this.options.id + '_content_div tbody')[0].insertAdjacentHTML('afterBegin',htmlStr);
					}
					if(endFlag){
						$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('beforeEnd',htmlStrFixed);
					}else{
						if($('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index])
							$('#' + this.options.id + '_content_fixed_div').find('tbody').find('tr[role="row"]')[index].insertAdjacentHTML('beforeBegin',htmlStrFixed);
						else if($('#' + this.options.id + '_content_fixed_div tbody')[0])
							$('#' + this.options.id + '_content_fixed_div tbody')[0].insertAdjacentHTML('afterBegin',htmlStrFixed);
					}
				}catch(e){
					//IE情况下
					var table = $('#' + this.options.id + '_content_div table')[0];
					var fixedTable = $('#' + this.options.id + '_content_fixed_div table')[0];
					if(table && fixedTable){
						$.each(rowObjArr, function(i) {
							oThis.createContentOneRowForIE(table,index + i,this);
							oThis.createContentOneRowForIE(fixedTable,index + i,this,'fixed');
						});
					}
				}
				if(this.options.multiSelect){
					if(endFlag){
						$('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('beforeEnd',htmlStrmultiSelect);
					}else{
						var _content_multiSelect = $('#' + this.options.id + '_content_multiSelect').find('div')[index];
						if(_content_multiSelect)
							_content_multiSelect.insertAdjacentHTML('beforeBegin',htmlStrmultiSelect);
						else
							$('#' + this.options.id + '_content_multiSelect')[0].insertAdjacentHTML('afterBegin',htmlStrmultiSelect);
					}
				}
				if (this.options.showNumCol) {
					if(endFlag){
						$('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('beforeEnd',htmlStrNumCol);
					}else{
						var _content_multiSelect = $('#' + this.options.id + '_content_numCol').find('div')[index];
						if(_content_multiSelect)
							_content_multiSelect.insertAdjacentHTML('beforeBegin',htmlStrNumCol);
						else
							$('#' + this.options.id + '_content_numCol')[0].insertAdjacentHTML('afterBegin',htmlStrNumCol);
					}
					this.resetNumCol();
					this.updateNumColLastRowFlag();
				}
				this.repairSumRow();
				this.noRowsShowFun();
				var obj = {};
				obj.begin = index;
				obj.length = rows.length;
				this.renderTypeFun(obj);
			}
			if(this.dataSourceObj.options.values){
			}else{
				this.dataSourceObj.options.values = new Array();
			}
			$.each(rows, function(i) {
				oThis.dataSourceObj.options.values.splice(index + i,0,this);
			});
			this.updateLastRowFlag();
		},
		createContentOneRowFixed:function(rowObj){
			return '';
		},
		updateEditRowIndex: function(opType, opIndex, num) {
		},
		/*
		 * 删除一行
		 */
		deleteOneRow:function(index){
			var oThis = this;
			index = parseInt(index);
			var row = this.dataSourceObj.rows[index];
			if(!row)
				return;
			var rowValue = row.value;
			if(this.showType == 'grid'){ //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
				this.editClose();
			}
			this.dataSourceObj.rows.splice(index,1);
			this.updateEditRowIndex('-', index);
			if(this.selectRows){
				$.each(this.selectRows,function(i){
					if(this == rowValue){
						oThis.selectRows.splice(i,1);
						oThis.selectRowsObj.splice(i,1);
						oThis.selectRowsIndex.splice(i,1);
					}else if(oThis.selectRowsIndex[i] > index){
						oThis.selectRowsIndex[i] = oThis.selectRowsIndex[i] - 1;
					}
				});
			}
			if(this.focusRow){
				if(this.focusRow == rowValue){
					this.focusRow = null;
					this.focusRowObj = null;
					this.focusRowIndex = null;
				}else if(this.focusRowIndex > index){
					this.focusRowIndex = this.focusRowIndex - 1;
				}
			}
			if(this.showType == 'grid'){ //只有grid展示的时候才处理div，针对隐藏情况下还要添加数据
				$('#' + this.options.id + '_content_div tbody tr:eq(' + index+ ')').remove();
				$('#' + this.options.id + '_content_fixed_div tbody tr:eq(' + index+ ')').remove();
				$('#' + this.options.id + '_content_multiSelect >div:eq(' + index + ')').remove();
				$('#' + this.options.id + '_content_numCol >.u-grid-content-num:eq('+ index + ')').remove();
				this.resetNumCol();
				this.repairSumRow();
				this.noRowsShowFun();
				this.updateNumColLastRowFlag();
			}
			if(this.dataSourceObj.options.values) {
				var i = this.dataSourceObj.options.values.indexOf(rowValue);
				this.dataSourceObj.options.values.splice(i,1);
			}
			this.deleteOneRowTree();
			if(typeof this.options.onRowDelete == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.index = index;
				if(!this.options.onRowDelete(index)){
					return;
				}
			}
		},
		repairSumRow:function(){
		},
		deleteOneRowTree:function(){
		},
		/*
		 * 删除多行
		 */
		deleteRows:function(indexs){
			var oThis = this,indexss = new Array();
			$.each(indexs, function(i) {
				indexss.push(indexs[i]);
			});
			indexss.sort(function(a,b){
				return b-a;
			});

			$.each(indexss, function(i) {
				oThis.deleteOneRow(this);
			});
		},
		/*
		 * 修改某一行
		 */
		updateRow:function(index,row){
			this.dataSourceObj.rows[index].value = row;
			this.dataSourceObj.options.values[this.dataSourceObj.rows[index].valueIndex] = row;
			if(this.showType == 'grid'){
				var obj = {};
				obj.begin = index;
				obj.length = 1;
				this.renderTypeFun(obj);
				this.repairSumRow();
			}
		},
		/*
		 * 修改某个cell的值
		 */
		updateValueAt:function(rowIndex,field,value,force){
			var oThis=this,oldValue = $(this.dataSourceObj.rows[rowIndex].value).attr(field),treeRowIndex = rowIndex;
			if(oldValue != value || force){
				$(this.dataSourceObj.rows[rowIndex].value).attr(field,value);
				$(this.dataSourceObj.options.values[this.dataSourceObj.rows[rowIndex].valueIndex]).attr(field,value);
				if(this.showType == 'grid'){
					var obj = {};
					obj.field = field;
					obj.begin = rowIndex;
					obj.length = 1;
					this.renderTypeFun(obj);
					// this.editColIndex = undefined;
					// 如果编辑行为修改行则同时需要修改编辑行的显示
					treeRowIndex = this.updateValueAtTree(rowIndex,field,value,force);
					this.updateValueAtEdit(rowIndex,field,value,force);
					this.repairSumRow();
				}
				if(typeof this.options.onValueChange == 'function'){
					var obj = {};
					obj.gridObj = this;
					//因为树表更新时候可能改变rowIndex的顺序
					obj.rowIndex = treeRowIndex;
					obj.field = field;
					obj.oldValue = oldValue;
					obj.newValue = value;
					this.options.onValueChange(obj);
				}
			}
		},
		updateValueAtTree:function(rowIndex,field,value,force){
			return rowIndex;
		},
		updateValueAtEdit:function(rowIndex,field,value,force){
		},
		/*
		 * 选中一行
		 * slice 设置全选时，slice为true，不做渲染，在setAllRowSelect中统一渲染
		 */
		setRowSelect:function(rowIndex, doms){
			var selectDiv, rowTr, fixedRowTr,numColDiv
			if(!this.dataSourceObj.rows[rowIndex])
				return true;
			//已经选中退出
			if(this.dataSourceObj.rows[rowIndex].checked)
				return true;
			if (doms && doms['multiSelectDivs'])
				selectDiv = doms['multiSelectDivs'][rowIndex]
			else
				selectDiv = this.$ele.find('#' + this.options.id + '_content_multiSelect').children()[rowIndex]
			if(typeof this.options.onBeforeRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				if(!this.options.onBeforeRowSelected(obj)){
					if(this.options.multiSelect){
						var _input = selectDiv.children[0];
						_input.checked = false;
					}
					return false;
				}
			}
			if(!this.options.multiSelect){
				if(this.selectRowsObj && this.selectRowsObj.length > 0){
					$.each(this.selectRowsObj, function() {
						this.checked = false;
					});
				}
				this.selectRows = new Array();
				this.selectRowsObj = new Array();
				this.selectRowsIndex = new Array();
				if(this.showType == 'grid'){
					$('#' + this.options.id + '_content_tbody tr').removeClass("u-grid-content-sel-row");
					$('#' + this.options.id + '_content_tbody tr a').removeClass("u-grid-content-sel-row");
					$('#' + this.options.id + '_content_fixed_tbody tr').removeClass("u-grid-content-sel-row");
					$('#' + this.options.id + '_content_fixed_tbody tr a').removeClass("u-grid-content-sel-row");
					if(this.options.multiSelect){
						$('#' + this.options.id + '_content_multiSelect div').removeClass("u-grid-content-sel-row");
					}
					if(this.options.showNumCol){
						$('#' + this.options.id + '_content_numCol div').removeClass("u-grid-content-sel-row");
					}
				}
			}else{
				if(this.showType == 'grid'){
					var _input = selectDiv.children[0];
					_input.checked = true;
				}
			}
			if(this.showType == 'grid'){
				if (doms && doms['contentTrs'])
					rowTr =  doms['contentTrs'][rowIndex]
				else 
					rowTr = this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]')[rowIndex]
				$(rowTr).addClass("u-grid-content-sel-row");

				if (doms && doms['fixContentTrs'])
					fixedRowTr =  doms['fixContentTrs'][rowIndex]
				else 
					fixedRowTr = this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]')[rowIndex]
				$(fixedRowTr).addClass("u-grid-content-sel-row");
				var ini = rowIndex;
				if(this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form'){
					ini++;
				}
				if(this.options.multiSelect){
					if (ini != rowIndex)
						selectDiv =  this.$ele.find('#' + this.options.id + '_content_multiSelect').children()[ini]
					$(selectDiv).addClass('u-grid-content-sel-row');
				}
				if(this.options.showNumCol){
					if (doms && doms['numColDivs'])
						numColDiv =  doms['numColDivs'][ini]
					else 
						numColDiv = this.$ele.find('#' + this.options.id + '_content_numCol').children()[ini]	
					$(numColDiv).addClass('u-grid-content-sel-row');
				}
			}
			this.selectRows.push(this.dataSourceObj.rows[rowIndex].value);
			this.selectRowsObj.push(this.dataSourceObj.rows[rowIndex]);
			this.selectRowsIndex.push(rowIndex);
			this.dataSourceObj.rows[rowIndex].checked = true;
			if(typeof this.options.onRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				this.options.onRowSelected(obj);
			}
			return true;
		},
		/*
		 * 反选一行
		 */
		setRowUnselect:function(rowIndex){
			var oThis=this;
			if(!this.dataSourceObj.rows[rowIndex])
				return true;
			//已经选中退出
			if(!this.dataSourceObj.rows[rowIndex].checked)
				return true;
			if(typeof this.options.onBeforeRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				if(!this.options.onBeforeRowUnSelected(obj)){
					if(this.options.multiSelect){
						$('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex+ ')')[0].checked = true;
					}
					return false;
				}
			}
			if(this.options.multiSelect){
				$('#' + this.options.id + '_content_multiSelect input:eq(' + rowIndex+ ')')[0].checked = false;
			}
			var ini = rowIndex;
			if(this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form'){
				ini++;
			}
			$('#' + this.options.id + '_content_tbody tr:eq(' + ini+ ')').removeClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_tbody tr:eq(' + ini+ ') a').removeClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini+ ')').removeClass("u-grid-content-sel-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini+ ') a').removeClass("u-grid-content-sel-row");
			if(this.options.multiSelect){
				$('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
			}
			if(this.options.showNumCol){
				$('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-sel-row");
			}
			$.each(this.selectRows,function(i){
				if(this == oThis.dataSourceObj.rows[rowIndex].value){
					oThis.selectRows.splice(i,1);
					oThis.selectRowsObj.splice(i,1);
					oThis.selectRowsIndex.splice(i,1);
				}
			})
			this.dataSourceObj.rows[rowIndex].checked = false;
			if(typeof this.options.onRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				this.options.onRowUnSelected(obj);
			}
			return true;
		},
		/*
		 * 选中所有行
		 */
		setAllRowSelect:function(){
			$('#' + this.options.id + '_header_multi_input').prop('checked', true)
			if(typeof this.options.onBeforeAllRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				if(!this.options.onBeforeAllRowSelected(obj)){
					return;
				}
			}
			// 把需要的dom在循环外获取出来
			var multiSelectDivs = this.$ele.find('#' + this.options.id + '_content_multiSelect').children(),
				numColDivs = this.$ele.find('#' + this.options.id + '_content_numCol').children(),
				contentTrs =  this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]'),
				fixContentTrs =  this.$ele.find('#' + this.options.id + '_content_fixed_tbody tr[role="row"]');
			this.$ele.find('#' + this.options.id + '_content_tbody tr[role="row"]')
			for(var i=0;i<this.dataSourceObj.rows.length;i++){
				this.setRowSelect(i, {multiSelectDivs:multiSelectDivs, numColDivs:numColDivs, contentTrs: contentTrs, fixContentTrs: fixContentTrs});
			}
			if(typeof this.options.onAllRowSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				this.options.onAllRowSelected(obj);
			}
		},
		/*
		 * 反选所有行
		 */
		setAllRowUnSelect:function(){
			$('#' + this.options.id + '_header_multi_input').attr('checked', false)
			if(typeof this.options.onBeforeAllRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				if(!this.options.onBeforeAllRowUnSelected(obj)){
					return;
				}
			}
			for(var i=0;i<this.dataSourceObj.rows.length;i++){
				this.setRowUnselect(i);
			}
			if(typeof this.options.onAllRowUnSelected == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObjs = this.dataSourceObj.rows;
				this.options.onAllRowUnSelected(obj);
			}
		},
		/*
		 * 获取选中行
		 */
		getSelectRows:function(){
			return this.selectRows;
		},
		/*
		 * 获取选中行对应行号
		 */
		getSelectRowsIndex:function(){
			return this.selectRowsIndex;
		},
		/*
		 * focus一行
		 */
		setRowFocus:function(rowIndex){
			//已经选中退出
			if(this.dataSourceObj.rows[rowIndex].focus)
				return true;
			if(!this.dataSourceObj.rows[rowIndex])
				return true;
			if(typeof this.options.onBeforeRowFocus == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				if(!this.options.onBeforeRowFocus(obj)){
					return false;
				}
			}
			$('#' + this.options.id + '_content_tbody tr').removeClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_tbody tr a').removeClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_fixed_tbody tr').removeClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_fixed_tbody tr a').removeClass("u-grid-content-focus-row");
			if(this.options.multiSelect){
				$('#' + this.options.id + '_content_multiSelect').find('div').removeClass("u-grid-content-focus-row");
			}
			if(this.options.showNumCol){
				$('#' + this.options.id + '_content_numCol').find('div').removeClass("u-grid-content-focus-row");
			}
			if(this.focusRowObj){
				this.focusRowObj.focus = false;
			}
			$('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex+ ')').addClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_tbody tr[role="row"]:eq(' + rowIndex+ ') a').addClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex+ ')').addClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_fixed_tbody tr[role="row"]:eq(' + rowIndex+ ') a').addClass("u-grid-content-focus-row");
			var ini = rowIndex;
			if(this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form'){
				ini++;
			}
			if(this.options.multiSelect){
				$('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
			}
			if(this.options.showNumCol){
				$('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').addClass("u-grid-content-focus-row");
			}
			this.focusRow = this.dataSourceObj.rows[rowIndex].value;
			this.focusRowObj = this.dataSourceObj.rows[rowIndex];
			this.focusRowIndex = rowIndex;
			this.dataSourceObj.rows[rowIndex].focus = true;
			if(typeof this.options.onRowFocus == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				this.options.onRowFocus(obj);
			}
			if(!this.options.multiSelect){
				this.setRowSelect(rowIndex);
			}
			return true;
		},
		/*
		 * 反focus一行
		 */
		setRowUnFocus:function(rowIndex){
			var oThis=this;
			if(!this.dataSourceObj.rows[rowIndex])
				return true;
			if(typeof this.options.onBeforeRowUnFocus == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				if(!this.options.onBeforeRowUnFocus(obj)){
					return false;
				}
			}
			//已经选中退出
			if(!this.dataSourceObj.rows[rowIndex].focus)
				return true;
			var ini = rowIndex;
			if(this.eidtRowIndex > -1 && this.eidtRowIndex < rowIndex && this.options.editType == 'form'){
				ini++;
			}
			$('#' + this.options.id + '_content_tbody tr:eq(' + ini+ ')').removeClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_tbody tr:eq(' + ini+ ') a').removeClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini+ ')').removeClass("u-grid-content-focus-row");
			$('#' + this.options.id + '_content_fixed_tbody tr:eq(' + ini+ ') a').removeClass("u-grid-content-focus-row");
			if(this.options.multiSelect){
				$('#' + this.options.id + '_content_multiSelect >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
			}
			if(this.options.showNumCol){
				$('#' + this.options.id + '_content_numCol >div:eq(' + ini + ')').removeClass("u-grid-content-focus-row");
			}
			this.dataSourceObj.rows[rowIndex].focus = false;
			this.focusRow = null;
			this.focusRowObj = null;
			this.focusRowIndex = null;
			if(typeof this.options.onRowUnFocus == 'function'){
				var obj = {};
				obj.gridObj = this;
				obj.rowObj = this.dataSourceObj.rows[rowIndex];
				obj.rowIndex = rowIndex;
				this.options.onRowUnFocus(obj);
			}
			if(!this.options.multiSelect){
				this.setRowUnselect(rowIndex);
			}
			return true;
		},
		/*
		 * 增加删除时重置数字列
		 */
		resetNumCol:function(){
			var numCols = $('#' + this.options.id + '_content_numCol >.u-grid-content-num');
			$.each(numCols,function(i){
				this.innerHTML = i + 1 + "";
			});
		},
		/*
		 * 获取focus行
		 */
		getFocusRow:function(){
			return this.focusRow;
		},
		/*
		 * 获取focus行对应行号
		 */
		getFocusRowIndex:function(){
			return this.focusRowIndex;
		},
		/*
		 * 获取所有行
		 */
		getAllRows:function(){
			var oThis = this;
			this.allRows = new Array();
			if(this.dataSourceObj.rows){
				$.each(this.dataSourceObj.rows,function(){
					oThis.allRows.push(this.value);
				});
			}
			return this.allRows;
		},
		/*
		 * 根据行号获取row
		 */
		getRowByIndex:function(index){
			return this.dataSourceObj.rows[index];
		},
		/*
		 * 根据某个字段值获取rowIndex
		 */
		getRowIndexByValue:function(field,value){
			var index = -1;
			$.each(this.dataSourceObj.rows,function(i){
				var v = $(this.value).attr(field);
				if(v == value){
					index = i;
				}
			})
			return index;
		},
		/*
		 * 根据filed设置renderType
		 */
		setRenderType:function(field,renderType){
			var gridCompColumn = this.getColumnByField(field);
			gridCompColumn.options.renderType = renderType;
			var index = this.getIndexOfColumn(gridCompColumn);
			this.renderTypeByColumn(gridCompColumn,index);
		},
		/*
		 * 设置是否显示header
		 */
		setShowHeader:function(showHeader){
			this.options.showHeader = showHeader;
			if(showHeader){
				$('#' + this.options.id + '_header').css('display',"block");
			}else{
				$('#' + this.options.id + '_header').css('display',"none");
			}
		},
		setColumnPrecision:function(field,precision){
			var gridColumn = this.getColumnByField(field);
			gridColumn.options.precision = precision;
			this.renderTypeFun();
			if(this.options.showSumRow){
				this.repairSumRow();
			}
		},
		setMultiSelect:function(multiSelect){
			var oldMultiSelect = this.options.multiSelect;
			if(oldMultiSelect != multiSelect){
				this.options.multiSelect = multiSelect;
				this.initGrid();
			}
		},
		setShowNumCol:function(showNumCol){
			var oldShowNumCol = this.options.showNumCol;
			if(oldShowNumCol != showNumCol){
				this.options.showNumCol = showNumCol;
				this.initGrid();
			}
		},
		isGridShow:function(){
			if(this.showType == 'grid')
				return true;
			return false;
		}
	}
	gridCompColumn.prototype = {
		/*
		 * 处理参数
		 */
		init:function(options, gridOptions){
			this.defaults = {
					width:200, // 默认宽度为200
					sortable: true, // 是否可以排序
					canDrag: true, // 是否可以拖动
					fixed: false, // 是否固定列
					visible: true, // 是否显示
					canVisible: true, // 是否可以隐藏
					sumCol:false, // 是否计算合计
					editable:true, // 是否可修改
					editFormShow:true, // 是否可修改
					autoExpand:false, // 是否自动扩展列
					editType:'text', // 编辑类型，支持传入function扩展
					dataType:'String', // 数据类型,string, date, datetime, integer, float
					//precision:  //精度
					format:'YYYY-MM-DD hh:mm:ss',
					//renderType:'', 渲染类型
					//headerColor
					headerLevel:1, // header层级
					hiddenLevel:1, // 宽度不足隐藏的优先级，值越大优先隐藏
					// parentHeader 对应的父header的title
					// 目前仅支持两级，多级的话需要改变头的高度，另外处理当前级别的时候需要看下是否存在上级，如果存在上级的话
					// 则创建新的div，这就涉及到需要躲变量计算每级的宽度，需要考虑下如何实现。
					// headerColor:'#a8a8a8'
			};
				// 从grid继承的属性
			var gridDefault = {
				sortable: gridOptions.sortable,
				canDrag: gridOptions.canDrag,
				width: gridOptions.columnWidth
			};
			if(options.dataType == 'Date'){
				this.defaults.format = 'YYYY-MM-DD';
			}
			// 树表暂时不支持排序
			options = this.initTree(options,gridOptions)
			this.options = $.extend({}, this.defaults, gridDefault, options);
			try{
				if(typeof this.options.renderType == 'string')
					this.options.renderType = eval(this.options.renderType)
			}catch(e){

			}
			try{
				if(typeof this.options.editType == 'string')
					this.options.editType = eval(this.options.editType)
			}catch(e){

			}
				
			// 转成数字
			this.options.width = parseInt(this.options.width);
			this.firstColumn = false;
		},
		initTree:function(options){
			return options;
		}
	}
	dataSource.prototype = {
		/*
		 * 处理参数
		 */
		init:function(options, gridComp){
			this.defaults = {}
			this.gridComp = gridComp;
			this.options = $.extend({}, this.defaults, options);
			this.rows = new Array(); // 存储数据行
			this.hasParentRows = new Array(); // 存在父项
			this.nothasParentRows = new Array(); // 不存在父项
		},
		/*
		 * 将values转化为rows并进行排序
		 */
		sortRows:function(field,sortType){
			if(this.gridComp.options.showTree){
				this.treeSortRows(field,sortType);
			}else{
				this.basicSortRows(field,sortType);
			}
			this.gridComp.eidtRowIndex = -1;
		},
		/*
		 * 将values转化为rows并进行排序(标准)
		 */
		basicSortRows: function(field, sortType) {
			var oThis = this,dataType = "";
			if(field){
				dataType = this.gridComp.getColumnByField(field).options.dataType;
			}
			this.rows = new Array();
			if(this.options.values){
				$.each(this.options.values, function(i) {
					var rowObj = {};
					rowObj.value = this;
					rowObj.valueIndex = i;
					oThis.rows.push(rowObj);
				});
			}
			
		},
		treeSortRows:function(field,sortType){
			this.basicSortRows(field,sortType);
		},
		/*
		 * 获取合计值
		 */
		getSumValue:function(field,gridCompColumn,gridComp){
			var sumValue = null;
			if(gridCompColumn.options.sumCol){
				$.each(this.rows, function(i) {
					var v = $(this.value).attr(field);
					if(gridCompColumn.options.dataType == 'Int'){
						v = gridComp.getInt(v,0);
						sumValue  += parseInt(v);
					}else{
						v = gridComp.getFloat(v,0);
						sumValue  = gridComp.accAdd(sumValue,parseFloat(v));
					}
				});
			}
			// 处理精度
			if(gridCompColumn.options.dataType == 'Float' && gridCompColumn.options.precision){
				var o = {};
				o.value = sumValue;
				o.precision = gridCompColumn.options.precision;
				sumValue = gridComp.DicimalFormater(o);
			}
			if(sumValue != null && sumValue != undefined && sumValue != 'null' && sumValue != 'undefined'){
				return sumValue + '';
			}else{
				return '';
			}
		}
	};
	var old = $.fn.grid;
	// 方法扩展
	$.fn.grid = function(options) {
		var grid = $(this).data('gridComp');
		if(!grid)
			$(this).data('gridComp',(grid = new gridComp(this, options)));
		return grid;
	};
	$.fn.grid.gridComp = gridComp;
	$.fn.grid.gridCompColumn = gridCompColumn;
	$.fn.grid.dataSource = dataSource;

	$.fn.grid.noConflict = function() {
		$.fn.grid = old;
		return this;
	}
})(jQuery, window, document);
