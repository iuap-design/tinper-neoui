'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Switch = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _ripple = require('neoui-sparrow/lib/util/ripple');

var _compMgr = require('neoui-sparrow/lib/compMgr');

var Switch = _BaseComponent.BaseComponent.extend({
	_Constant: {
		TINY_TIMEOUT: 0.001
	},

	_CssClasses: {
		INPUT: 'u-switch-input',
		TRACK: 'u-switch-track',
		THUMB: 'u-switch-thumb',
		FOCUS_HELPER: 'u-switch-focus-helper',
		IS_FOCUSED: 'is-focused',
		IS_DISABLED: 'is-disabled',
		IS_CHECKED: 'is-checked'
	},

	init: function init() {
		this._inputElement = this.element.querySelector('.' + this._CssClasses.INPUT);

		var track = document.createElement('div');
		(0, _dom.addClass)(track, this._CssClasses.TRACK);

		var thumb = document.createElement('div');
		(0, _dom.addClass)(thumb, this._CssClasses.THUMB);

		var focusHelper = document.createElement('span');
		(0, _dom.addClass)(focusHelper, this._CssClasses.FOCUS_HELPER);

		thumb.appendChild(focusHelper);

		this.element.appendChild(track);
		this.element.appendChild(thumb);

		this.boundMouseUpHandler = this._onMouseUp.bind(this);

		//if (this.element.classList.contains(this._CssClasses.RIPPLE_EFFECT)) {
		//  addClass(this.element,this._CssClasses.RIPPLE_IGNORE_EVENTS);
		this._rippleContainerElement = document.createElement('span');
		//this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_CONTAINER);
		//this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_EFFECT);
		//this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_CENTER);
		this._rippleContainerElement.addEventListener('mouseup', this.boundMouseUpHandler);

		//var ripple = document.createElement('span');
		//ripple.classList.add(this._CssClasses.RIPPLE);

		//this._rippleContainerElement.appendChild(ripple);
		this.element.appendChild(this._rippleContainerElement);
		new _ripple.URipple(this._rippleContainerElement);
		//}

		this.boundChangeHandler = this._onChange.bind(this);
		this.boundFocusHandler = this._onFocus.bind(this);
		this.boundBlurHandler = this._onBlur.bind(this);

		this._inputElement.addEventListener('change', this.boundChangeHandler);
		this._inputElement.addEventListener('focus', this.boundFocusHandler);
		this._inputElement.addEventListener('blur', this.boundBlurHandler);
		this.element.addEventListener('mouseup', this.boundMouseUpHandler);

		this._updateClasses();
		(0, _dom.addClass)(this.element, 'is-upgraded');
	},

	_onChange: function _onChange(event) {
		this._updateClasses();
		this.trigger('change', {
			isChecked: this._inputElement.checked
		});
	},

	_onFocus: function _onFocus(event) {
		(0, _dom.addClass)(this.element, this._CssClasses.IS_FOCUSED);
	},

	_onBlur: function _onBlur(event) {
		(0, _dom.removeClass)(this.element, this._CssClasses.IS_FOCUSED);
	},

	_onMouseUp: function _onMouseUp(event) {
		this._blur();
	},

	_updateClasses: function _updateClasses() {
		this.checkDisabled();
		this.checkToggleState();
	},

	_blur: function _blur() {
		// TODO: figure out why there's a focus event being fired after our blur,
		// so that we can avoid this hack.
		window.setTimeout(function () {
			this._inputElement.blur();
		}.bind(this), /** @type {number} */this._Constant.TINY_TIMEOUT);
	},

	// Public methods.

	checkDisabled: function checkDisabled() {
		if (this._inputElement.disabled) {
			(0, _dom.addClass)(this.element, this._CssClasses.IS_DISABLED);
		} else {
			(0, _dom.removeClass)(this.element, this._CssClasses.IS_DISABLED);
		}
	},

	checkToggleState: function checkToggleState() {
		if (this._inputElement.checked) {
			(0, _dom.addClass)(this.element, this._CssClasses.IS_CHECKED);
		} else {
			(0, _dom.removeClass)(this.element, this._CssClasses.IS_CHECKED);
		}
	},

	isChecked: function isChecked() {
		//return hasClass(this.element,this._CssClasses.IS_CHECKED);
		return this._inputElement.checked;
	},

	toggle: function toggle() {
		//return;
		if (this.isChecked()) {
			this.uncheck();
		} else {
			this.check();
		}
	},

	disable: function disable() {
		this._inputElement.disabled = true;
		this._updateClasses();
	},

	enable: function enable() {
		this._inputElement.disabled = false;
		this._updateClasses();
	},

	check: function check() {
		this._inputElement.checked = true;
		this._updateClasses();
	},

	uncheck: function uncheck() {
		this._inputElement.checked = false;
		this._updateClasses();
	}

}); /**
     * Module : neoui-switch
     * Author : Kvkens(yueming@yonyou.com)
     * Date	  : 2016-08-03 13:39:55
     */

_compMgr.compMgr.regComp({
	comp: Switch,
	compAsString: 'u.Switch',
	css: 'u-switch'
});

if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		//扫描并生成控件
		_compMgr.compMgr.updateComp();
	});
}

exports.Switch = Switch;