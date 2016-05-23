;
(function($, window, document, undefined) {
	var gridComp = $.fn.grid.gridComp,
		gridCompProto = gridComp.prototype,
		initDefaultFun = gridCompProto.initDefault,
		setRequiredFun = gridCompProto.setRequired;

	gridCompProto.initDefault = function(){
		// 执行原有方法
		initDefaultFun.apply(this,arguments);
		// 扩展方法
		this.defaults = $.extend(true,{},this.defaults,{
			noneEditableFormShow:true,// form编辑器是否显示不可编辑字段
		});
	};

	gridCompProto.setRequired = function(field, value){
		// 执行原有方法
		setRequiredFun.apply(this,arguments);
		// 扩展方法
		var oThis = this;
		$.each(this.gridCompColumnArr,function(i){
			if(this.options.field == field){
				this.options.required = value;
				if(!value) {
					$('#' + oThis.options.id +  '_edit_' + this.options.field).parent().find('.u-grid-edit-mustFlag').hide()
				} else {
					$('#' + oThis.options.id +  '_edit_' + this.options.field).parent().find('.u-grid-edit-mustFlag').show()
				}


			}
		});
	};

	gridCompProto.editorRowChangeFun = function(){
		if($('#' + this.options.id + '_edit_form').length > 0){
			var h = $('#' + this.options.id + '_edit_form')[0].offsetHeight;
			$('#' + this.options.id + '_numCol_edit').css('height',h);
			$('#' + this.options.id + '_multiSelect_edit').css('height',h);
		}
	};

	/*
	 * form形式下编辑单元格
	 */
	gridCompProto.formEditCell = function(value,field,title,required,headerColor){
		// 创建lable
		var st = (title+'')
		if(st.lengthb() > 28) {
			st = st.substrCH(26)+'...'
		}
		var htmlStr = '<div class="u-grid-edit-whole-div"><div class="u-grid-edit-label"><div title="'+title+'" style="color:' +headerColor+ '">' + st + '<span style="color:red;' + (!required? 'display: none':'') + '" class="u-grid-edit-mustFlag">*</span></div></div>';			// 创建编辑区域
		htmlStr += '<div id="' + this.options.id + '_edit_' + field + '" class="u-grid-edit-div"></div>';
		htmlStr += '</div>';
		return htmlStr;
	};	

})(jQuery, window, document);
