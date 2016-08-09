'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Progress = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _env = require('neoui-sparrow/lib/env');

var _event = require('neoui-sparrow/lib/event');

var _compMgr = require('neoui-sparrow/lib/compMgr');

var Progress = _BaseComponent.BaseComponent.extend({
	_Constant: {},
	_CssClasses: {
		INDETERMINATE_CLASS: 'u-progress__indeterminate'
	},
	setProgress: function setProgress(p) {

		if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
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

		if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
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

		if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
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

		(0, _dom.addClass)(this.element, 'is-upgraded');

		if (_env.env.isIE8 || _env.env.isIE9) {

			if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
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

}); /**
     * Module : neoui-progress
     * Author : Kvkens(yueming@yonyou.com)
     * Date	  : 2016-08-03 10:46:37
     */

_compMgr.compMgr.regComp({
	comp: Progress,
	compAsString: 'u.Progress',
	css: 'u-progress'
});
if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		//扫描并生成控件
		_compMgr.compMgr.updateComp();
	});
}
exports.Progress = Progress;