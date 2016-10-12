/**
 * Module : neoui-progress
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 10:46:37
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,hasClass} from 'tinper-sparrow/js/dom';
import {env} from 'tinper-sparrow/js/env';
import {on} from 'tinper-sparrow/js/event';
import {compMgr} from 'tinper-sparrow/js/compMgr';

var Progress = BaseComponent.extend({
	_Constant: {},
	_CssClasses: {
		INDETERMINATE_CLASS: 'u-progress__indeterminate'
	},
	setProgress: function(p) {
		
		if (hasClass(this.element,this._CssClasses.INDETERMINATE_CLASS)) {
			return;
		}

		this.progressbar_.style.width = p + '%';
		return this;
	},
	/**
	 * 设置竖向进度条的进度
	 * @param p 要设置的进度
	 * @returns {u.Progress}
     */
	setProgressHeight: function(p) {

		if (hasClass(this.element,this._CssClasses.INDETERMINATE_CLASS)) {
			return;
		}

		this.progressbar_.style.height = p + '%';
		this.progressbar_.style.width ='100%';
		return this;
	},
	/**
	 * 设置进度条中的html内容
	 * @param p 要设置的html内容
	 * @returns {u.Progress}
	 */
	setProgressHTML: function(html) {

		if (hasClass(this.element,this._CssClasses.INDETERMINATE_CLASS)) {
			return;
		}

		this.progressbar_.innerHTML = html;
		return this;
	},
	setBuffer: function(p) {
		this.bufferbar_.style.width = p + '%';
		this.auxbar_.style.width = (100 - p) + '%';
		return this;
	},

	init: function() {
		var el = document.createElement('div');
		el.className = 'progressbar bar bar1';
		this.element.appendChild(el);
		this.progressbar_ = el;

		el = document.createElement('div');
		el.className = 'bufferbar bar bar2';
		this.element.appendChild(el);
		this.bufferbar_ = el;

		el = document.createElement('div');
		el.className = 'auxbar bar bar3';
		this.element.appendChild(el);
		this.auxbar_ = el;

		this.progressbar_.style.width = '0%';
		this.bufferbar_.style.width = '100%';
		this.auxbar_.style.width = '0%';

		addClass(this.element,'is-upgraded');

		if(env.isIE8 || env.isIE9){

			if (hasClass(this.element,this._CssClasses.INDETERMINATE_CLASS)) {
				var p = 0;
				var oThis = this;
				setInterval(function(){
					p += 5;
					p = p % 100;
					oThis.progressbar_.style.width = p + '%';
				},100)
			}
		}
			
	}

});


compMgr.regComp({
	comp: Progress,
	compAsString: 'u.Progress',
	css: 'u-progress'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {Progress};
