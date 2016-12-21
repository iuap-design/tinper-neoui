/**
 * Module : neoui-month
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-11 15:17:07
 */
import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {on, off, stopEvent} from 'tinper-sparrow/js/event';
import {addClass, makeDOM, showPanelByEle, getZIndex, removeClass} from 'tinper-sparrow/js/dom';
import {extend} from 'tinper-sparrow/js/extend';
import {compMgr} from 'tinper-sparrow/js/compMgr';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {trans} from 'tinper-sparrow/js/util/i18n';
import {date as udate} from 'tinper-sparrow/js/util/dateUtils';

const Month = BaseComponent.extend({
	DEFAULTS : {
	},
	init:function(){
		var self = this;
		var element = this.element;
		this.options = extend({}, this.DEFAULTS, this.options);
		this.panelDiv = null;
		this.input = this.element.querySelector("input");

		var d = new Date();
		this.month = d.getMonth() + 1;
		this.defaultMonth = this.month;

		on(this.input, 'blur',function(e){
			self._inputFocus = false;
        	this.setValue(this.input.value);
        }.bind(this));

		// 添加focus事件
		this.focusEvent();
		// 添加右侧图标click事件
		this.clickEvent();
		// 添加keydown事件
		this.keydownEvent();
	},

	createPanel: function(){
		if(this.panelDiv){
			this._fillMonth();
			return;
		}
		var oThis = this;
		this.panelDiv = makeDOM('<div class="u-date-panel" style="margin:0px;"></div>');
		this.panelContentDiv = makeDOM('<div class="u-date-content"></div>');
		this.panelDiv.appendChild(this.panelContentDiv);

		this.preBtn = makeDOM('<button class="u-date-pre-button u-button flat floating mini" style="display:none;">&lt;</button>');
	    this.nextBtn = makeDOM('<button class="u-date-next-button u-button flat floating mini" style="display:none;">&gt;</button>');

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
	    this._fillMonth();

	},


	/**
	 * 填充月份选择面板
	 * @private
	 */
	_fillMonth: function(){
	    var oldPanel,template,monthPage,_month,cells,i;
	    oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
	    if(oldPanel)
	    	this.panelContentDiv.removeChild(oldPanel);
	    _month = this.month;
		var _defaultMonth = _month + '月';
		var monthIndex = udate._jsonLocale.defaultMonth.indexOf(_defaultMonth);
	    template = ['<div class="u-date-content-page">',
			'<div class="u-date-content-title">'+ udate._jsonLocale.monthsShort[monthIndex] + '</div>',

			'<div class="u-date-content-panel">',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[0] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[1] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[2] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[3] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[4] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[5] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[6] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[7] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[8] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[9] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[10] +'</div>',
				'<div class="u-date-content-year-cell">'+ udate._jsonLocale.monthsShort[11] +'</div>',
			'</div>',
	        '</div>'].join("");

	    monthPage = makeDOM(template);
	    cells =monthPage.querySelectorAll('.u-date-content-year-cell');
	    for (i = 0; i < cells.length; i++){
	        if (_month == i + 1){
	            addClass(cells[i],'current');
	        }
	        cells[i]._value = i + 1;
	        new URipple(cells[i]);
	    }
	    on(monthPage, 'click', function(e){
	        var _m = e.target._value;
	        this.month = _m;
	        monthPage.querySelector('.u-date-content-title').innerHTML = _m + '月';
	        this.setValue(_m);
	        this.hide();
	    }.bind(this));

	    this.preBtn.style.display = 'none';
		this.nextBtn.style.display = 'none';
	    this.panelContentDiv.appendChild(monthPage);
	    this.currentPanel = 'month';
	},



	setValue: function(value) {
		value = value ? value : '';
		this.value = value;
		if (parseInt(this.value) > 0 && parseInt(this.value) < 13) {
			this.month = value;
			this.input.value = this.month;
			this.trigger('valueChange', { value: value });
		} else {
			this.month = this.defaultMonth;
			this.input.value = '';
		}
	},

	focusEvent: function() {
		var self = this;
		on(this.input,'focus', function(e) {
			self._inputFocus = true;
			self.show(e);

			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}

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


		this.panelDiv.style.width = 152 + 'px';
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
	comp: Month,
	compAsString: 'u.Month',
	css: 'u-month'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {Month};
