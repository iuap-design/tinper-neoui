/**
 * Module : neoui-year
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-11 15:17:07
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {on, off, stopEvent} from 'tinper-sparrow/js/event';
import {addClass, makeDOM, showPanelByEle, getZIndex, removeClass} from 'tinper-sparrow/js/dom';
import {extend} from 'tinper-sparrow/js/extend'; 
import {compMgr} from 'tinper-sparrow/js/compMgr';
import {URipple} from 'tinper-sparrow/js/util/ripple';

var Year = BaseComponent.extend({
	DEFAULTS : {
	},
	init:function(){
		var self = this;			 
		var element = this.element;
		this.options = extend({}, this.DEFAULTS, this.options);
		this.panelDiv = null;
		this.input = this.element.querySelector("input");
		
		var d = new Date();
		this.year = d.getFullYear();
		this.defaultYear = this.year;
		this.startYear = this.year - this.year % 10 - 1;
	
		on(this.input, 'blur',function(e){
			self._inputFocus = false;
        	self.setValue(self.input.value);
        });
        
		// 添加focus事件
		this.focusEvent();
		// 添加右侧图标click事件
		this.clickEvent();
		// 添加keydown事件
		this.keydownEvent();
	},

	createPanel: function(){
		if(this.panelDiv){
			this._fillYear();
			return;
		}
		var oThis = this;
		this.panelDiv = makeDOM('<div class="u-date-panel" style="margin:0px;"></div>');
		this.panelContentDiv = makeDOM('<div class="u-date-content"></div>');
		this.panelDiv.appendChild(this.panelContentDiv);
		
	    this.preBtn = makeDOM('<button class="u-date-pre-button u-button mini">&lt;</button>');
	    this.nextBtn = makeDOM('<button class="u-date-next-button u-button mini">&gt;</button>');
		
		on(this.preBtn, 'click', function(e){
	        oThis.startYear -= 10;
	        oThis._fillYear();
	    });
	    on(this.nextBtn, 'click', function(e){
	        oThis.startYear += 10;
	        oThis._fillYear();
	    });
	    this.panelContentDiv.appendChild(this.preBtn);
	    this.panelContentDiv.appendChild(this.nextBtn);
	    this._fillYear();
		
	},

	/**
	 *填充年份选择面板
	 * @private
	 */
	_fillYear: function(type){
	    var oldPanel,year,template,yearPage,titleDiv,yearDiv, i,cell;
	    oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
	    if(oldPanel)
	    	this.panelContentDiv.removeChild(oldPanel);
	    template = ['<div class="u-date-content-page">',
	                    '<div class="u-date-content-title"></div>',
	                    '<div class="u-date-content-panel"></div>',
	                '</div>'].join("");
	    yearPage = makeDOM(template);
	    titleDiv = yearPage.querySelector('.u-date-content-title');
	    titleDiv.innerHTML = (this.startYear) + '-' + (this.startYear + 11);
	    yearDiv = yearPage.querySelector('.u-date-content-panel');
	    for(i = 0; i < 12; i++){
	        cell = makeDOM('<div class="u-date-content-year-cell">'+ (this.startYear + i) +'</div>');
	        new URipple(cell);
	        if (this.startYear + i == this.year){
	            addClass(cell, 'current');
	        }
	        cell._value = this.startYear + i;
	        yearDiv.appendChild(cell);
	    }
	    on(yearDiv, 'click', function(e){
	        var _y = e.target._value;
	        this.year = _y;
	        this.setValue(_y);
	        this.hide();
	        stopEvent(e);
	    }.bind(this));
		
		this.preBtn.style.display = 'block';
		this.nextBtn.style.display = 'block';
		this.panelContentDiv.appendChild(yearPage);
		
	    this.currentPanel = 'year';
	},

	setValue: function(value) {
		value = value? value: '';
		this.value = value;
		if(value){
			this.year = value;
		}else{
			this.year = this.defaultYear;
		}
		this.startYear = this.year - this.year % 10 - 1;
		this.input.value = value;
		this.trigger('valueChange', {value:value})
	},

	focusEvent: function() {
		var self = this;
		on(this.input,'focus', function(e) {
			self._inputFocus = true;
			self.show(e);
			stopEvent(e);
		});
	},
	keydownEvent:function(){
		var self = this;
		on(self.input, "keydown", function (e) {
			var code = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
			if (!(code >= 48 && code <= 57||code==37||code==39||code==8 ||code==46)) {
				//阻止默认浏览器动作(W3C)
				if ( e && e.preventDefault )
					e.preventDefault();
				//IE中阻止函数器默认动作的方式
				else
					window.event.returnValue = false;
				return false;
			}
		});
	},
	//下拉图标的点击事件
	clickEvent: function() {
		var self = this;		
		var caret = this.element.nextSibling
		on(caret,'click',function(e) {
			self.input.focus();
	    	stopEvent(e);
		})
	},


	show: function(evt) {
		var oThis = this;
		this.createPanel();
		
		this.width = this.element.offsetWidth;
		if(this.width < 300)
			this.width = 300;
	    
		this.panelDiv.style.width = 152 + 'px';
		if(this.options.showFix){
			document.body.appendChild(this.panelDiv);
			this.panelDiv.style.position = 'fixed';
			showPanelByEle({
	            ele:this.input,
	            panel:this.panelDiv,
	            position:"bottomLeft"
	        });
		}else{
		    var bodyWidth = document.body.clientWidth,bodyHeight = document.body.clientHeight,
	        panelWidth = this.panelDiv.offsetWidth,panelHeight = this.panelDiv.offsetHeight;

	        this.element.appendChild(this.panelDiv);
	        this.element.style.position = 'relative'; 
	   		this.left = this.input.offsetLeft;
	    	var inputHeight = this.input.offsetHeight;
	    	this.top = this.input.offsetTop + inputHeight;

	        if(this.left + panelWidth > bodyWidth){
	            this.left = bodyWidth - panelWidth;
	        }

	        if((this.top + panelHeight) > bodyHeight){
	            this.top = bodyHeight - panelHeight;
	        }
	    

	        this.panelDiv.style.left = this.left + 'px';
	        this.panelDiv.style.top = this.top + 'px';
		}
		this.panelDiv.style.zIndex = getZIndex();
	    addClass(this.panelDiv, 'is-visible');
	        
	    var callback = function (e) {
	        if (e !== evt && e.target !== this.input && !oThis.clickPanel(e.target) && oThis._inputFocus != true) {
	        	off(document,'click',callback);
	            // document.removeEventListener('click', callback);
	        	this.hide();
	    	}
	    }.bind(this);
	    on(document,'click',callback);
	    // document.addEventListener('click', callback);
	},

	clickPanel: function(dom){
		while(dom){
			if(dom == this.panelDiv){
				return true
			}else{
				dom = dom.parentNode;
			}
		}
		return false;
	},
	hide: function() {
		removeClass(this.panelDiv, 'is-visible');
	    this.panelDiv.style.zIndex = -1;
	}
});

	


compMgr.regComp({
	comp: Year,
	compAsString: 'u.Year',
	css: 'u-year'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {Year};