/**
 * Module : neoui-year
 * Author : wanghao(wanghaoo@yonyou.com)
 * Date   : 2016-11-09
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {env} from 'tinper-sparrow/js/env';
import {on, off, stopEvent} from 'tinper-sparrow/js/event';
import {addClass,hasClass, makeDOM, showPanelByEle, getZIndex, removeClass} from 'tinper-sparrow/js/dom';
import {core} from 'tinper-sparrow/js/core';
import {date as udate} from 'tinper-sparrow/js/util/dateUtils';
import {extend} from 'tinper-sparrow/js/extend';
import {isIE8} from 'tinper-sparrow/js/env';
import {compMgr} from 'tinper-sparrow/js/compMgr';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {trans} from 'tinper-sparrow/js/util/i18n';

const MonthDate = BaseComponent.extend({
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
		this.month = d.getMonth() + 1;
		this.date = d.getDate();

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
    		this._fillMonth();
    		return;
    	}
    	var oThis = this;
    	this.panelDiv = makeDOM('<div class="u-date-panel" style="margin:0px;"></div>');
    	this.panelContentDiv = makeDOM('<div class="u-date-content"></div>');
    	this.panelDiv.appendChild(this.panelContentDiv);
        this._fillMonth();

    },

    // 判断是否为闰年,如果闰年返回29天，否则为28天
    _isLeapYear: function () {
        if (((this.year % 4)==0) && ((this.year % 100)!=0) || ((this.year % 400)==0)) {
            return 29;
        } else {
            return 28;
        }
    },

    _getMonthDay: function() {
        var monthTypeOneArray = [1,3,5,7,8,10,12];
        if (this.month == 2) {
            return this._isLeapYear();
        }
        if(monthTypeOneArray.indexOf(this.month) ){
            return 31;
        }else {
            return 30;
        }
    },
    /**
     * 填充月份选择面板
     * @private
     */
    _fillMonth: function(){
        var oldPanel,template,monthPage,_month,cells,i;
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
            if(_m) {
                oThis.month = _m;
                monthPage.querySelector('.u-date-content-title').innerHTML = _m + '月';
            }

            oThis._fillDate();
            stopEvent(e);
        });


    	this._zoomIn(monthPage);
        this.currentPanel = 'month';
    },


    /**
     * 渲染日历
     * @param type : previous  current  next
     * @private
     */
   _fillDate : function(type){

        var year,month,oldPanel,day,date,time,template,datePage,titleDiv,dateDiv,weekSpans,language,tempDate, i,cell,self = this;
        type = type || 'current';
        var oThis = this;

        oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
        if(oldPanel)
        this.panelContentDiv.removeChild(oldPanel);
        language = core.getLanguages();
        template = ['<div class="u-date-content-page">',
            '<div class="u-date-content-title">',
                this.date+trans('public.day','日'),
            '</div>',
            '<div class="u-date-week"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>',
            '<div class="u-date-content-panel"></div>',
            '</div>'].join("");
        datePage = makeDOM(template);
        weekSpans = datePage.querySelectorAll('.u-date-week span');

        for(var i=0; i< 7; i++){
            weekSpans[i].innerHTML = udate._jsonLocale.weekdaysMin[i];
        }
        dateDiv = datePage.querySelector('.u-date-content-panel');
        // tempDate = this.startDate;
        tempDate = new Date(this.year+'-'+this.month+'-01');
        var countdate = 1;
        var monthdate = this._getMonthDay();
        var otherdate = tempDate.getDay();//当前月1号前面需要空白的个数
        // var sumdate = monthdate + otherdate;
        for (var j=0;j<otherdate;j++) {
            cell = makeDOM('<div class="u-date-cell" unselectable="on" onselectstart="return false;"></div>');
            new URipple(cell);
            dateDiv.appendChild(cell);
        }
        // 这块儿时间需要根据月份具体
        while( countdate <= monthdate){
            cell = makeDOM('<div class="u-date-cell" unselectable="on" onselectstart="return false;">'+ countdate +'</div>');
            if ( countdate == this.date){
                addClass(cell, 'current');
            }
            cell._value = countdate;
            cell._month = this.month;
            cell._year = this.year;
            new URipple(cell);
            dateDiv.appendChild(cell);
            countdate++;
        }
        on(dateDiv, 'click', function(e){
            if (hasClass(e.target,'u-disabled')) return;
            var _d = e.target._value;
            if (!_d) return;
            var _cell = e.target.parentNode.querySelector('.u-date-cell.current');
            if (_cell) {
                removeClass(_cell, 'current');
                if(env.isIE8 || env.isIE9)
                    _cell.style.backgroundColor = "#fff";
            }
            addClass(e.target, 'current');
            if(env.isIE8 || env.isIE9)
                e.target.style.backgroundColor = '#3f51b5';

            var currentdateDiv = oThis.panelContentDiv.querySelector('.u-date-content-title');
            currentdateDiv.innerHTML = _d+'日';
            oThis.setValue(e.target._month + '-' + _d);
            oThis.hide();

        }.bind(this));
        this._zoomIn(datePage);
        this.currentPanel = 'date';
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
            window.requestAnimationFrame(function() {
                    addClass(this.contentPage, 'is-hidden');
                    removeClass(newPage, 'zoom-in');
            }.bind(this));
        }

    },


    setValue: function(value) {
    	value = value? value: '';
    	if(value && value.indexOf('-') > -1){
    		var vA = value.split("-");
    		var month = vA[0];
    		this.month = month % 12;
    		if(this.month == 0)
    			this.month = 12;
    	    this.date = vA[1];
    		value = this.month + '-' + this.date;
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
    		var month = vA[0];
    		this.month = month % 12;
    		if(this.month == 0)
    			this.month = 12;
            this.date = vA[1];
            if(this.date>31) {
                this.date = 1;
            }
    	}
    	this.createPanel();
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
    comp: MonthDate,
    compAsString: 'u.MonthDate',
    css: 'u-monthdate'
});
if(document.readyState && document.readyState === 'complete') {
    compMgr.updateComp();
} else {
    on(window, 'load', function() {
        //扫描并生成控件
        compMgr.updateComp();
    });
}
export {MonthDate};
