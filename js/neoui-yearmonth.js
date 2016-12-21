/**
 * Module : neoui-year
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-11 15:17:07
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {on, off, stopEvent} from 'tinper-sparrow/js/event';
import {addClass, makeDOM, showPanelByEle, getZIndex, removeClass} from 'tinper-sparrow/js/dom';
import {extend} from 'tinper-sparrow/js/extend';
import {isIE8} from 'tinper-sparrow/js/env';
import {compMgr} from 'tinper-sparrow/js/compMgr';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {requestAnimationFrame} from 'tinper-sparrow/js/ployfill';
import {trans} from 'tinper-sparrow/js/util/i18n';
import {date as udate} from 'tinper-sparrow/js/util/dateUtils';

const YearMonth = BaseComponent.extend({
	DEFAULTS : {
	},
	init: function(){
		var self = this;
		var element = this.element;
		this.options = extend({}, this.DEFAULTS, this.options);
		this.panelDiv = null;
		this.input = this.element.querySelector("input");

		var d = new Date();
		this.year = d.getFullYear();
		this.startYear = this.year - this.year % 10 - 1;
		this.month = d.getMonth() + 1;

		on(this.input, 'blur',function(e){
            self._inputFocus = false;
        	self.setValue(self.input.value);
        });

		// 添加focus事件
		this.focusEvent();
		// 添加右侧图标click事件
		this.clickEvent();
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

    	// this.preBtn = makeDOM('<button class="u-date-pre-button u-button flat floating mini" style="display:none;">&lt;</button>');
        // this.nextBtn = makeDOM('<button class="u-date-next-button u-button flat floating mini" style="display:none;">&gt;</button>');
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
        var oThis = this;
        on(yearDiv, 'click', function(e){
            var _y = e.target._value;
            oThis.year = _y;
            oThis._fillMonth();
            stopEvent(e);
        });

    	this.preBtn.style.display = 'block';
    	this.nextBtn.style.display = 'block';
    	// this._zoomIn(yearPage);
    	this.panelContentDiv.appendChild(yearPage);
    	this.contentPage = yearPage;
        this.currentPanel = 'year';
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
        var oThis = this;
        on(monthPage, 'click', function(e){
            var _m = e.target._value;
            if (_m) {
                oThis.month = _m;
            }
            monthPage.querySelector('.u-date-content-title').innerHTML = _m + '月';
            oThis.setValue(oThis.year + '-' + oThis.month);
            oThis.hide();
        });

        this.preBtn.style.display = 'none';
    	this.nextBtn.style.display = 'none';
    	this._zoomIn(monthPage);
        this.currentPanel = 'month';
    },


    /**
     * 淡入动画效果
     * @private
     */
    _zoomIn: function(newPage){
        if (!this.contentPage){
            this.panelContentDiv.appendChild(newPage);
            this.contentPage = newPage;
            return;
        }
        addClass(newPage, 'zoom-in');
        this.panelContentDiv.appendChild(newPage);
        if(isIE8){
            this.contentPage = newPage;
        }else{
            var cleanup = function() {
                newPage.removeEventListener('transitionend', cleanup);
                newPage.removeEventListener('webkitTransitionEnd', cleanup);
                // this.panelContentDiv.removeChild(this.contentPage);
                this.contentPage = newPage;
            }.bind(this);
            if (this.contentPage){
                newPage.addEventListener('transitionend', cleanup);
                newPage.addEventListener('webkitTransitionEnd', cleanup);
            }
			//ie9 requestAnimationFrame兼容问题
    		if(requestAnimationFrame){
    			requestAnimationFrame(function() {
    					addClass(this.contentPage, 'is-hidden');
    					removeClass(newPage, 'zoom-in');
    			}.bind(this));
    		}
        }

    },


    setValue: function(value) {
    	value = value? value: '';
    	if(value && value.indexOf('-') > -1){
    		var vA = value.split("-");
    		this.year = vA[0];
    		var month = vA[1];
    		this.month = month % 12;
    		if(this.month == 0)
    			this.month = 12;

    		value = this.year + '-' + this.month;
    	}
    	this.value = value;
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
    	if(this.value && this.value.indexOf('-') > -1){
    		var vA = this.value.split("-");
    		this.year = vA[0];
    		var month = vA[1];
    		this.month = month % 12;
    		if(this.month == 0)
    			this.month = 12;
    	}
    	this.createPanel();
    	/*因为元素可能变化位置，所以显示的时候需要重新计算*/
    	this.width = this.element.offsetWidth;
    	if(this.width < 300)
    		this.width = 300;

    	this.panelDiv.style.width = this.width + 'px';

        if(this.options.showFix){
            document.body.appendChild(this.panelDiv);
            this.panelDiv.style.position = 'fixed';
            showPanelByEle({
                ele:this.input,
                panel:this.panelDiv,
                position:"bottomLeft"
            });
        }else{
         //    this.element.parentNode.appendChild(this.panelDiv);
        	// //调整left和top
         //    this.left = this.element.offsetLeft;
         //    var inputHeight = this.element.offsetHeight;
         //    this.top = this.element.offsetTop + inputHeight;
         //    this.panelDiv.style.left = this.left + 'px';
         //    this.panelDiv.style.top = this.top + 'px';

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
        var oThis = this;
        var callback = function (e) {
            if (e !== evt && e.target !== oThis.input && !oThis.clickPanel(e.target)  && oThis._inputFocus != true) {
                // document.removeEventListener('click', callback);
                off(document,'click',callback);
            	oThis.hide();
        	}
        };
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
    comp: YearMonth,
    compAsString: 'u.YearMonth',
    css: 'u-yearmonth'
});
if(document.readyState && document.readyState === 'complete') {
    compMgr.updateComp();
} else {
    on(window, 'load', function() {
        //扫描并生成控件
        compMgr.updateComp();
    });
}
export {YearMonth};
