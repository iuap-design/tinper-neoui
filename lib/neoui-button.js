'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Button = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _env = require('neoui-sparrow/lib/env');

var _event = require('neoui-sparrow/lib/event');

var _ripple = require('neoui-sparrow/lib/util/ripple');

var _compMgr = require('neoui-sparrow/lib/compMgr');

/**
 * Module : neoui-button
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 13:01:05
 */

var Button = _BaseComponent.BaseComponent.extend({
	init: function init() {
		var rippleContainer = document.createElement('span');
		(0, _dom.addClass)(rippleContainer, 'u-button-container');
		this._rippleElement = document.createElement('span');
		(0, _dom.addClass)(this._rippleElement, 'u-ripple');
		if (_env.env.isIE8) (0, _dom.addClass)(this._rippleElement, 'oldIE');
		rippleContainer.appendChild(this._rippleElement);
		(0, _event.on)(this._rippleElement, 'mouseup', this.element.blur);
		this.element.appendChild(rippleContainer);

		(0, _event.on)(this.element, 'mouseup', this.element.blur);
		(0, _event.on)(this.element, 'mouseleave', this.element.blur);
		this.ripple = new _ripple.Ripple(this.element);
	}

});

_compMgr.compMgr.regComp({
	comp: Button,
	compAsString: 'u.Button',
	css: 'u-button'
});
if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		//扫描并生成控件
		_compMgr.compMgr.updateComp();
	});
}
exports.Button = Button;