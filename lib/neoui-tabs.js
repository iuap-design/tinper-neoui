'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Tabs = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _ripple = require('neoui-sparrow/lib/util/ripple');

var _compMgr = require('neoui-sparrow/lib/compMgr');

var Tabs = _BaseComponent.BaseComponent.extend({
	_Constant: {},
	_CssClasses: {
		TAB_CLASS: 'u-tabs__tab',
		PANEL_CLASS: 'u-tabs__panel',
		ACTIVE_CLASS: 'is-active',
		UPGRADED_CLASS: 'is-upgraded',

		U_JS_RIPPLE_EFFECT: 'u-js-ripple-effect',
		U_RIPPLE_CONTAINER: 'u-tabs__ripple-container',
		U_RIPPLE: 'u-ripple',
		U_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'u-js-ripple-effect--ignore-events'
	},

	/**
  * Handle clicks to a tabs component
  *
  * @private
  */
	initTabs_: function initTabs_() {
		(0, _dom.addClass)(this.element, this._CssClasses.U_JS_RIPPLE_EFFECT_IGNORE_EVENTS);

		// Select element tabs, document panels
		this.tabs_ = this.element.querySelectorAll('.' + this._CssClasses.TAB_CLASS);
		this.panels_ = this.element.querySelectorAll('.' + this._CssClasses.PANEL_CLASS);

		// Create new tabs for each tab element
		for (var i = 0; i < this.tabs_.length; i++) {
			new Tab(this.tabs_[i], this);
		}
		(0, _dom.addClass)(this.element, this._CssClasses.UPGRADED_CLASS);
	},

	/**
  * Reset tab state, dropping active classes
  *
  * @private
  */
	resetTabState_: function resetTabState_() {
		for (var k = 0; k < this.tabs_.length; k++) {
			(0, _dom.removeClass)(this.tabs_[k], this._CssClasses.ACTIVE_CLASS);
		}
	},

	/**
  * Reset panel state, droping active classes
  *
  * @private
  */
	resetPanelState_: function resetPanelState_() {
		for (var j = 0; j < this.panels_.length; j++) {
			(0, _dom.removeClass)(this.panels_[j], this._CssClasses.ACTIVE_CLASS);
		}
	},
	show: function show(itemId) {
		var panel = this.element.querySelector('#' + itemId);
		var tab = this.element.querySelector("[href='#" + itemId + "']");
		this.resetTabState_();
		this.resetPanelState_();
		(0, _dom.addClass)(tab, this._CssClasses.ACTIVE_CLASS);
		(0, _dom.addClass)(panel, this._CssClasses.ACTIVE_CLASS);
	},

	/**
  * Initialize element.
  */
	init: function init() {
		if (this.element) {
			this.initTabs_();
		}
	}
});

/**
 * Constructor for an individual tab.
 *
 * @constructor
 * @param {Element} tab The HTML element for the tab.
 * @param {Tabs} ctx The Tabs object that owns the tab.
 */
/**
 * Module : neoui-tabs
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 14:12:27
 */

function Tab(tab, ctx) {
	if (tab) {
		var rippleContainer = document.createElement('span');
		(0, _dom.addClass)(rippleContainer, ctx._CssClasses.U_RIPPLE_CONTAINER);
		(0, _dom.addClass)(rippleContainer, ctx._CssClasses.U_JS_RIPPLE_EFFECT);
		var ripple = document.createElement('span');
		(0, _dom.addClass)(ripple, ctx._CssClasses.U_RIPPLE);
		rippleContainer.appendChild(ripple);
		tab.appendChild(rippleContainer);

		tab.ripple = new _ripple.Ripple(tab);

		tab.addEventListener('click', function (e) {
			(0, _event.stopEvent)(e);
			// e.preventDefault();
			var href = tab.href.split('#')[1];
			var panel = ctx.element.querySelector('#' + href);
			ctx.resetTabState_();
			ctx.resetPanelState_();
			(0, _dom.addClass)(tab, ctx._CssClasses.ACTIVE_CLASS);
			(0, _dom.addClass)(panel, ctx._CssClasses.ACTIVE_CLASS);
		});
	}
}

_compMgr.compMgr.regComp({
	comp: Tabs,
	compAsString: 'u.Tabs',
	css: 'u-tabs'
});
if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		//扫描并生成控件
		_compMgr.compMgr.updateComp();
	});
}

exports.Tabs = Tabs;