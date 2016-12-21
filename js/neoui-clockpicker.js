/**
 * Module : neoui-clockpicker
 * Author : liuyk(liuyk@yonyou.com)
 * Date	  : 2016-08-11 15:17:07
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass, removeClass, hasClass, showPanelByEle, makeDOM, makeModal, getZIndex} from 'tinper-sparrow/js/dom';
import {on, off} from 'tinper-sparrow/js/event';
import {compMgr} from 'tinper-sparrow/js/compMgr';
import {isMobile, env} from 'tinper-sparrow/js/env';
import {extend} from 'tinper-sparrow/js/extend';
import {core} from 'tinper-sparrow/js/core';
import {date} from 'tinper-sparrow/js/util/dateUtils';
import {trans} from 'tinper-sparrow/js/util/i18n'

const ClockPicker = BaseComponent.extend({
	DEFAULTS : {
	},
	init: function(){
		var self = this;
		var element = this.element;
		this.options = extend({}, this.DEFAULTS, this.options);
		this.format = this.options['format'] || core.getMaskerMeta('time').format;
		this.panelDiv = null;
		this.input = this.element.querySelector("input");
		if(isMobile){
			this.input.setAttribute('readonly', 'readonly')
		}
		addClass(this.element,'u-text');

		this.template = '<div class="u-clock-ul popover clockpicker-popover" style="padding:0px;">';
		this.template += '<div class="popover-title"><button class="u-button u-date-clean u-clock-clean" >';
		this.template += trans('public.clear', "清空");
		this.template += '</button><span class="clockpicker-span-hours">02</span> : <span class="clockpicker-span-minutes text-primary">01</span><span class="clockpicker-span-am-pm"></span></div>';
		this.template += '<div class="popover-content">';
		this.template += '	<div class="clockpicker-plate">';
		this.template += '		<div class="clockpicker-canvas">';
		this.template += '			<svg class="clockpicker-svg">';
		this.template += '				<g transform="translate(100,100)">';
		this.template += '					<circle class="clockpicker-canvas-bg clockpicker-canvas-bg-trans" r="13" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
		this.template += '					<circle class="clockpicker-canvas-fg" r="3.5" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
		this.template += '					<line x1="0" y1="0" x2="8.362277061412277" y2="-79.56175162946187"></line>';
		this.template += '					<circle class="clockpicker-canvas-bearing" cx="0" cy="0" r="2"></circle>';
		this.template += '				</g>';
		this.template += '			</svg>';
		this.template += '		</div>';
		this.template += '		<div class="clockpicker-dial clockpicker-hours" style="visibility: visible;">';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-1" >00</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-2" >1</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-3" >2</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-4" >3</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-5" >4</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-6" >5</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-7" >6</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-8" >7</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-9" >8</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-10" >9</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-11" >10</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-12" >11</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-13" >12</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-14" >13</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-15" >14</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-16" >15</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-17" >16</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-18" >17</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-19" >18</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-20" >19</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-21" >20</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-22" >21</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-23" >22</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-24" >23</div>';
		this.template += '		</div>';
		this.template += '		<div class="clockpicker-dial clockpicker-minutes" style="visibility: hidden;">';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-25" >00</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-26" >05</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-27" >10</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-28" >15</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-29" >20</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-30" >25</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-31" >30</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-32" >35</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-33" >40</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-34" >45</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-35" >50</div>';
		this.template += '			<div class="clockpicker-tick clockpicker-tick-36" >55</div>';
		this.template += '		</div>';
		this.template += '	</div><span class="clockpicker-am-pm-block"></span></div>';
		this.template += '	</div>';
        on(this.input, 'blur',function(e){
        	self._inputFocus = false;
        	this.setValue(this.input.value);
        }.bind(this));

		var d = new Date();
		this.defaultHour = d.getHours() > 9? '' + d.getHours():'0' + d.getHours();
		this.defaultMin = d.getMinutes() > 9? '' + d.getMinutes():'0' + d.getMinutes();
		this.defaultSec = d.getSeconds() > 9? '' + d.getSeconds():'0' + d.getSeconds();

		this.hours = this.defaultHour;
		this.min = this.defaultMin;
		this.sec = this.defaultSec;
		// 添加focus事件
		this.focusEvent();
		// 添加右侧图标click事件
		this.clickEvent();
	},

		_zoomIn: function(newPage){

 		addClass(newPage, 'zoom-in');

		var cleanup = function() {
	    	off(newPage,'transitionend', cleanup);
	    	off(newPage,'webkitTransitionEnd', cleanup);
	        // this.panelContentDiv.removeChild(this.contentPage);
	        this.contentPage = newPage;
	    }.bind(this);
	    if (this.contentPage){
	    	on(newPage,'transitionend', cleanup);
	    	on(newPage,'webkitTransitionEnd', cleanup);
	    }
	    setTimeout(function(){
	    	newPage.style.visibility = 'visible';
	    	removeClass(newPage, 'zoom-in');
	    },150)
	},

	createPanel: function(){
		if(this.panelDiv)
			return;
		var oThis = this;
		this.panelDiv = makeDOM(this.template);

		this.hand = this.panelDiv.querySelector('line');
		this.bg = this.panelDiv.querySelector('.clockpicker-canvas-bg');
		this.fg = this.panelDiv.querySelector('.clockpicker-canvas-fg');
		this.titleHourSpan = this.panelDiv.querySelector('.clockpicker-span-hours');
		this.titleMinSpan = this.panelDiv.querySelector('.clockpicker-span-minutes');
		this.hourDiv = this.panelDiv.querySelector('.clockpicker-hours');
		this.minDiv = this.panelDiv.querySelector('.clockpicker-minutes');
		this.btnClean = this.panelDiv.querySelector('.u-date-clean');
		if(!isMobile)
			this.btnClean.style.display = 'none';
		this.currentView = 'hours';
		on(this.hourDiv,'click',function(e){
			var target = e.target;
			if(hasClass(target,'clockpicker-tick')){
				this.hours = target.innerHTML;
				this.hours = this.hours > 9 || this.hours == 0? '' + this.hours:'0' + this.hours;
				this.titleHourSpan.innerHTML = this.hours;
				this.hourDiv.style.visibility = 'hidden';
				// this.minDiv.style.visibility = 'visible';
				this._zoomIn(this.minDiv)
				this.currentView = 'min';
				this.setHand();
			}
		}.bind(this));

		on(this.minDiv,'click',function(e){
			var target = e.target;
			if(hasClass(target,'clockpicker-tick')){
				this.min = target.innerHTML;
				// this.min = this.min > 9 || this.min == 00? '' + this.min:'0' + this.min;
				this.titleMinSpan.innerHTML = this.min;
				this.minDiv.style.visibility = 'hidden';
				this.hourDiv.style.visibility = 'visible';
				this.currentView = 'hours';
				var v = this.hours + ':' + this.min + ':' + this.sec;
				this.setValue(v);
				this.hide();
			}
		}.bind(this));

		on(this.btnClean,'click',function(e){
			this.setValue("");
			this.hide();
		}.bind(this));
	},

	setHand: function(){
		var dialRadius = 100,
		innerRadius = 54,
		outerRadius = 80;
		var view = this.currentView,
			value = this[view],
			isHours = view === 'hours',
			unit = Math.PI / (isHours ? 6 : 30),
			radian = value * unit,
			radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
			x = Math.sin(radian) * radius,
			y = - Math.cos(radian) * radius;
			this.setHandFun(x,y);
	},

	setHandFun: function(x,y,roundBy5,dragging){
		var dialRadius = 100,
		innerRadius = 54,
		outerRadius = 80;

		var radian = Math.atan2(x, - y),
			isHours = this.currentView === 'hours',
			unit = Math.PI / (isHours ? 6 : 30),
			z = Math.sqrt(x * x + y * y),
			options = this.options,
			inner = isHours && z < (outerRadius + innerRadius) / 2,
			radius = inner ? innerRadius : outerRadius,
			value;

			if (this.twelvehour) {
				radius = outerRadius;
			}

		// Radian should in range [0, 2PI]
		if (radian < 0) {
			radian = Math.PI * 2 + radian;
		}

		// Get the round value
		value = Math.round(radian / unit);

		// Get the round radian
		radian = value * unit;

		// Correct the hours or minutes
		if (options.twelvehour) {
			if (isHours) {
				if (value === 0) {
					value = 12;
				}
			} else {
				if (roundBy5) {
					value *= 5;
				}
				if (value === 60) {
					value = 0;
				}
			}
	    } else {
			if (isHours) {
				if (value === 12) {
					value = 0;
				}
				value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
			} else {
				if (roundBy5) {
					value *= 5;
				}
				if (value === 60) {
					value = 0;
				}
			}
		}

		// Set clock hand and others' position
		var w = this.panelDiv.querySelector('.clockpicker-plate').offsetWidth;
		var u = w / 200;
		var cx = Math.sin(radian) * radius * u,
			cy = - Math.cos(radian) * radius * u;
		var iu = 100 * u;
		this.panelDiv.querySelector('g').setAttribute('transform','translate(' + iu + ',' + iu + ')');

		this.hand.setAttribute('x2', cx);
		this.hand.setAttribute('y2', cy);
		this.bg.setAttribute('cx', cx);
		this.bg.setAttribute('cy', cy);
		this.fg.setAttribute('cx', cx);
		this.fg.setAttribute('cy', cy);
	},

 	setValue: function(value) {
		value = value? value: '';
		var oldShowValue ;
		if(value == ''){
			if( this.input.value != '') {
				this.input.value = '';
				this.trigger('valueChange', { value: '' });
			}
			return;

		}


		if(value && value.indexOf(':') > -1){
			var vA = value.split(":");
			var hour = vA[0];
			hour = hour % 24;
			this.hours = hour > 9 ?'' + hour : '0' + hour;
			var min = vA[1];
			min = min % 60;
			this.min = min > 9 ?'' + min : '0' + min;
			var sec = vA[2] || 0;
			sec = sec % 60;
			this.sec = sec > 9 ?'' + sec : '0' + sec;

			value = this.hours + ':' + this.min + ':' + this.sec;
		}else{
			this.hours = this.defaultHour;
			this.min = this.defaultMin;
			this.sec = this.defaultSec;
		}
		var _date = new Date();
		_date.setHours(this.hours);
		_date.setMinutes(this.min);
		_date.setSeconds(this.sec);
		var showValue = date.format(_date,this.format);
		oldShowValue = this.input.value;
		this.input.value = showValue;
		if (oldShowValue != showValue) {
			this.trigger('valueChange', { value: value });
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

	//下拉图标的点击事件
	clickEvent: function() {
		var self = this;
		var caret = this.element.nextSibling
		on(caret,'click',function(e) {
			self._inputFocus = true;
			self.show(e);
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}

		})
	},


	show: function(evt) {

		var inputValue = this.input.value;
		this.setValue(inputValue);

		var self = this;
		this.createPanel();
		this.minDiv.style.visibility = 'hidden';
		this.hourDiv.style.visibility = 'visible';
		this.currentView = 'hours';
		this.titleHourSpan.innerHTML = this.hours;
		this.titleMinSpan.innerHTML = this.min;

		/*因为元素可能变化位置，所以显示的时候需要重新计算*/
		if(isMobile){
			this.panelDiv.style.position = 'fixed';
			this.panelDiv.style.top = '20%';
			var screenW = document.body.clientWidth;
			var l = (screenW - 226) / 2
			this.panelDiv.style.left = l + 'px';
        	this.overlayDiv = makeModal(this.panelDiv);
        	on(this.overlayDiv, 'click', function(){
		       self.hide();
		    })
        }else{
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
        }

		this.panelDiv.style.zIndex = getZIndex();
        addClass(this.panelDiv, 'is-visible');

   		this.setHand();

        var callback = function (e) {
            if (e !== evt && e.target !== this.input && !self.clickPanel(e.target) && self._inputFocus != true) {
            	off(document,'click', callback);
                this.hide();
            }
        }.bind(this);
        on(document,'click', callback);

        //tab事件
        on(self.input,'keydown',function(e){
            var keyCode = e.keyCode;
            if(keyCode==9) {
                self.hide();
            }
        });


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
        if(this.overlayDiv){
        	try{
        		document.body.removeChild(this.overlayDiv);
        	}catch(e){

        	}

        }
	}
});
if(!env.isIE8){
	compMgr.regComp({
		comp: ClockPicker,
		compAsString: 'u.ClockPicker',
		css: 'u-clockpicker'
	});
}

if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {ClockPicker};
