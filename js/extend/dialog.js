/**
 * Created by dingrf on 2015-11-19.
 */

'use strict';

/**
 * 提示框
 * @param options
 */

u.dialogTemplate = '<div class="u-msg-dialog" id="{id}" style="{width}{height}">'+
                        '{close}'+
                    '</div>';

var dialogMode = function(options){
    if (typeof options === 'string'){
        options = {content:options};
    }
    var defaultOptions = {
    	id: '',
    	content: '',
    	hasCloseMenu: true,
    	template: u.dialogTemplate,
    	width: '',
    	height: ''
    }
    
    options = u.extend(defaultOptions,options);
    this.id = options['id'];
    this.hasCloseMenu = options['hasCloseMenu'];
    this.content = options['content'];
    this.template = options['template'];
    this.width = options['width'];
    this.height = options['height'];
    this.create();

    this.resizeFun = function(){
    	var cDom = this.contentDom.querySelector('.u-msg-content');
    	cDom.style.height = '';
    	var wholeHeight = this.templateDom.offsetHeight;
    	var contentHeight = this.contentDom.offsetHeight;
    	if(contentHeight > wholeHeight && cDom)
    		cDom.style.height = wholeHeight - (56+46) + 'px';

    }.bind(this);

    this.resizeFun();
    u.on(window,'resize',this.resizeFun);
}

dialogMode.prototype.create = function(){
	var closeStr = '';
	var oThis = this;
	if(this.hasCloseMenu){
    	var closeStr = '<div class="u-msg-close"> <span aria-hidden="true">&times;</span></div>';
    }
	var templateStr = this.template.replace('{id}', this.id);
    templateStr = templateStr.replace('{close}', closeStr);
    templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
    templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');
	
	this.contentDom = document.querySelector(this.content); //
	this.templateDom = u.makeDOM(templateStr); 
	if(this.contentDom){ // msg第一种方式传入选择器，如果可以查找到对应dom节点，则创建整体dialog之后在msg位置添加dom元素
		this.contentDomParent = this.contentDom.parentNode;
		this.contentDom.style.display = 'block';
	}else{ // 如果查找不到对应dom节点，则按照字符串处理，直接将msg拼到template之后创建dialog
		this.contentDom = u.makeDOM('<div><div class="u-msg-content"><p>' + this.content + '</p></div></div>');
	}
	this.templateDom.appendChild(this.contentDom);
	this.overlayDiv = u.makeModal(this.templateDom);
	if(this.hasCloseMenu){
		this.closeDiv = this.templateDom.querySelector('.u-msg-close');
		u.on(this.closeDiv,'click',function(){
			oThis.close();
		});
	}
	
    document.body.appendChild(this.templateDom);
};

dialogMode.prototype.close = function(){
	if(this.contentDom){
		this.contentDom.style.display = 'none';
		this.contentDomParent.appendChild(this.contentDom);
	}
	document.body.removeChild(this.templateDom);
    document.body.removeChild(this.overlayDiv);
}

u.dialog = function(options){
	return new dialogMode(options);
}
