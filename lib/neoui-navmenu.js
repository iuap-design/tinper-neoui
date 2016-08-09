'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NavMenu = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _extend = require('neoui-sparrow/lib/extend');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _ripple = require('neoui-sparrow/lib/util/ripple');

var _compMgr = require('neoui-sparrow/lib/compMgr');

/**
 * Module : neoui-navmenu
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 08:45:49
 */

var NavMenu = _BaseComponent.BaseComponent.extend({
	_Constant: {},
	_CssClasses: {
		NAV: 'u-navmenu',
		NAV_LINK: 'u-navmenu-link',
		NAV_LINK_CURRENT: 'u-navmenu-link-current',
		NAV_LINK_OPEN: 'u-navmenu-link-open',
		NAV_SUB: 'u-navmenu-sub'
	},
	init: function init() {

		if ((0, _dom.hasClass)(this.element, 'u-navmenu-horizontal')) {
			(0, _event.on)(this.element, 'click', this._horNavlinkClickHander.bind(this));
		} else {
			(0, _event.on)(this.element, 'click', this._navlinkClickHander.bind(this));
		}

		var items = this.element.querySelectorAll('.' + this._CssClasses.NAV_LINK);
		for (var i = 0; i < items.length; i++) {
			new _ripple.Ripple(items[i]);
		}
	},
	_horNavlinkClickHander: function _horNavlinkClickHander(e) {
		var item = (0, _dom.closest)(e.target, this._CssClasses.NAV_LINK);

		if (item) {
			var curlink = this.element.querySelector('.' + this._CssClasses.NAV_LINK_CURRENT);
			curlink && (0, _dom.removeClass)(curlink, this._CssClasses.NAV_LINK_CURRENT);
			(0, _dom.addClass)(item, this._CssClasses.NAV_LINK_CURRENT);
		}
	},
	_navlinkClickHander: function _navlinkClickHander(e) {
		//var _target = e.currentTarget || e.target || e.srcElement;
		var curlink = this.element.querySelector('.' + this._CssClasses.NAV_LINK_CURRENT);
		curlink && (0, _dom.removeClass)(curlink, this._CssClasses.NAV_LINK_CURRENT);
		// if (curlink && isIE8){
		// 	var sub = curlink.parentNode.querySelector('.'+this._CssClasses.NAV_SUB);
		// 	if (sub){
		// 		sub.style.maxHeight = '0';
		// 	}
		// }

		var item = (0, _dom.closest)(e.target, this._CssClasses.NAV_LINK);

		if (item) {
			(0, _dom.addClass)(item, this._CssClasses.NAV_LINK_CURRENT);
			var sub = item.parentNode.querySelector('.' + this._CssClasses.NAV_SUB),
			    open = (0, _dom.hasClass)(item, this._CssClasses.NAV_LINK_OPEN);
			if (sub && open) {
				(0, _dom.removeClass)(item, this._CssClasses.NAV_LINK_OPEN);
				if (env.isIE8) sub.style.maxHeight = 0;
			}
			if (sub && !open) {
				(0, _dom.addClass)(item, this._CssClasses.NAV_LINK_OPEN);
				if (env.isIE8) sub.style.maxHeight = '999px';
			}
			// sub && open && removeClass(item, this._CssClasses.NAV_LINK_OPEN);
			// sub && !open && addClass(item, this._CssClasses.NAV_LINK_OPEN);
		}
	}
});

_compMgr.compMgr.regComp({
	comp: NavMenu,
	compAsString: 'u.NavMenu',
	css: 'u-navmenu'
});

if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		//扫描并生成控件
		_compMgr.compMgr.updateComp();
	});
}

exports.NavMenu = NavMenu;