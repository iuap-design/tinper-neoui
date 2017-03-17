/**
 * Module : neoui-progress
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 10:46:37
 */

import { addClass, hasClass } from 'tinper-sparrow/src/dom';
import { env } from 'tinper-sparrow/src/env';
import { on } from 'tinper-sparrow/src/event';

var Progress = u.BaseComponent.extend({
	_Constant: {},
	_CssClasses: {
		INDETERMINATE_CLASS: 'u-progress__indeterminate'
	},
	setProgress: function setProgress(p) {

		if (hasClass(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
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
	setProgressHeight: function setProgressHeight(p) {

		if (hasClass(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
			return;
		}

		this.progressbar_.style.height = p + '%';
		this.progressbar_.style.width = '100%';
		return this;
	},
	/**
  * 设置进度条中的html内容
  * @param p 要设置的html内容
  * @returns {u.Progress}
  */
	setProgressHTML: function setProgressHTML(html) {

		if (hasClass(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
			return;
		}

		this.progressbar_.innerHTML = html;
		return this;
	},
	setBuffer: function setBuffer(p) {
		this.bufferbar_.style.width = p + '%';
		this.auxbar_.style.width = 100 - p + '%';
		return this;
	},

	init: function init() {
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

		addClass(this.element, 'is-upgraded');

		if (env.isIE8 || env.isIE9) {

			if (hasClass(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
				var p = 0;
				var oThis = this;
				setInterval(function () {
					p += 5;
					p = p % 100;
					oThis.progressbar_.style.width = p + '%';
				}, 100);
			}
		}
	}

});

if (u.compMgr) u.compMgr.regComp({
	comp: Progress,
	compAsString: 'u.Progress',
	css: 'u-progress'
});

export { Progress };