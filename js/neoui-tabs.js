/**
 * Module : neoui-tabs
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 14:12:27
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,removeClass} from 'tinper-sparrow/js/dom';
import {on,stopEvent} from 'tinper-sparrow/js/event';
import {Ripple} from 'tinper-sparrow/js/util/ripple';
import {compMgr} from 'tinper-sparrow/js/compMgr';


var Tabs = BaseComponent.extend({
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
	initTabs_: function() {
		addClass(this.element, this._CssClasses.U_JS_RIPPLE_EFFECT_IGNORE_EVENTS)

		// Select element tabs, document panels
		this.tabs_ = this.element.querySelectorAll('.' + this._CssClasses.TAB_CLASS);
		this.panels_ =
			this.element.querySelectorAll('.' + this._CssClasses.PANEL_CLASS);

		// Create new tabs for each tab element
		for(var i = 0; i < this.tabs_.length; i++) {
			new Tab(this.tabs_[i], this);
		}
		addClass(this.element, this._CssClasses.UPGRADED_CLASS)
	},

	/**
	 * Reset tab state, dropping active classes
	 *
	 * @private
	 */
	resetTabState_: function() {
		for(var k = 0; k < this.tabs_.length; k++) {
			removeClass(this.tabs_[k], this._CssClasses.ACTIVE_CLASS)
		}
	},

	/**
	 * Reset panel state, droping active classes
	 *
	 * @private
	 */
	resetPanelState_: function() {
		for(var j = 0; j < this.panels_.length; j++) {
			removeClass(this.panels_[j], this._CssClasses.ACTIVE_CLASS)
		}
	},
	show: function(itemId) {
		var panel = this.element.querySelector('#' + itemId);
		var tab = this.element.querySelector("[href='#" + itemId + "']");
		this.resetTabState_();
		this.resetPanelState_();
		addClass(tab, this._CssClasses.ACTIVE_CLASS);
		addClass(panel, this._CssClasses.ACTIVE_CLASS);

	},

	/**
	 * Initialize element.
	 */
	init: function() {
		if(this.element) {
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
function Tab(tab, ctx) {
	if(tab) {
		var rippleContainer = document.createElement('span');
		addClass(rippleContainer, ctx._CssClasses.U_RIPPLE_CONTAINER);
		addClass(rippleContainer, ctx._CssClasses.U_JS_RIPPLE_EFFECT);
		var ripple = document.createElement('span');
		addClass(ripple, ctx._CssClasses.U_RIPPLE);
		rippleContainer.appendChild(ripple);
		tab.appendChild(rippleContainer);

		tab.ripple = new Ripple(tab)

		tab.addEventListener('click', function(e) {
			stopEvent(e);
			// e.preventDefault();
			var href = tab.href.split('#')[1];
			var panel = ctx.element.querySelector('#' + href);
			ctx.resetTabState_();
			ctx.resetPanelState_();
			addClass(tab, ctx._CssClasses.ACTIVE_CLASS);
			addClass(panel, ctx._CssClasses.ACTIVE_CLASS);
		});

	}
}

compMgr.regComp({
	comp: Tabs,
	compAsString: 'u.Tabs',
	css: 'u-tabs'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}

export {Tabs};
