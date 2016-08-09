'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Radio = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _env = require('neoui-sparrow/lib/env');

var _event = require('neoui-sparrow/lib/event');

var _ripple = require('neoui-sparrow/lib/util/ripple');

var _compMgr = require('neoui-sparrow/lib/compMgr');

/**
 * Module : neoui-radio
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 11:16:00
 */

var Radio = _BaseComponent.BaseComponent.extend({
    Constant_: {
        TINY_TIMEOUT: 0.001
    },

    _CssClasses: {
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_CHECKED: 'is-checked',
        IS_UPGRADED: 'is-upgraded',
        JS_RADIO: 'u-radio',
        RADIO_BTN: 'u-radio-button',
        RADIO_OUTER_CIRCLE: 'u-radio-outer-circle',
        RADIO_INNER_CIRCLE: 'u-radio-inner-circle'
    },

    init: function init() {
        this._btnElement = this.element.querySelector('input');

        this._boundChangeHandler = this._onChange.bind(this);
        this._boundFocusHandler = this._onChange.bind(this);
        this._boundBlurHandler = this._onBlur.bind(this);
        this._boundMouseUpHandler = this._onMouseup.bind(this);

        var outerCircle = document.createElement('span');
        (0, _dom.addClass)(outerCircle, this._CssClasses.RADIO_OUTER_CIRCLE);

        var innerCircle = document.createElement('span');
        (0, _dom.addClass)(innerCircle, this._CssClasses.RADIO_INNER_CIRCLE);

        this.element.appendChild(outerCircle);
        this.element.appendChild(innerCircle);

        var rippleContainer;
        //if (this.element.classList.contains( this._CssClasses.RIPPLE_EFFECT)) {
        //  addClass(this.element,this._CssClasses.RIPPLE_IGNORE_EVENTS);
        rippleContainer = document.createElement('span');
        //rippleContainer.classList.add(this._CssClasses.RIPPLE_CONTAINER);
        //rippleContainer.classList.add(this._CssClasses.RIPPLE_EFFECT);
        //rippleContainer.classList.add(this._CssClasses.RIPPLE_CENTER);
        rippleContainer.addEventListener('mouseup', this._boundMouseUpHandler);

        //var ripple = document.createElement('span');
        //ripple.classList.add(this._CssClasses.RIPPLE);

        //rippleContainer.appendChild(ripple);
        this.element.appendChild(rippleContainer);
        new _ripple.URipple(rippleContainer);
        //}

        this._btnElement.addEventListener('change', this._boundChangeHandler);
        this._btnElement.addEventListener('focus', this._boundFocusHandler);
        this._btnElement.addEventListener('blur', this._boundBlurHandler);
        this.element.addEventListener('mouseup', this._boundMouseUpHandler);

        this._updateClasses();
        (0, _dom.addClass)(this.element, this._CssClasses.IS_UPGRADED);
    },

    _onChange: function _onChange(event) {
        // Since other radio buttons don't get change events, we need to look for
        // them to update their classes.
        var radios = document.querySelectorAll('.' + this._CssClasses.JS_RADIO);
        for (var i = 0; i < radios.length; i++) {
            var button = radios[i].querySelector('.' + this._CssClasses.RADIO_BTN);
            // Different name == different group, so no point updating those.
            if (button.getAttribute('name') === this._btnElement.getAttribute('name')) {
                if (radios[i]['u.Radio']) {
                    radios[i]['u.Radio']._updateClasses();
                }
            }
        }
        this.trigger('change', { isChecked: this._btnElement.checked });
    },

    /**
     * Handle focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _onFocus: function _onFocus(event) {
        (0, _dom.addClass)(this.element, this._CssClasses.IS_FOCUSED);
    },

    /**
     * Handle lost focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _onBlur: function _onBlur(event) {
        (0, _dom.removeClass)(this.element, this._CssClasses.IS_FOCUSED);
    },

    /**
     * Handle mouseup.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _onMouseup: function _onMouseup(event) {
        this._blur();
    },

    /**
     * Update classes.
     *
     * @private
     */
    _updateClasses: function _updateClasses() {
        this.checkDisabled();
        this.checkToggleState();
    },

    /**
     * Add blur.
     *
     * @private
     */
    _blur: function _blur() {

        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function () {
            this._btnElement.blur();
        }.bind(this), /** @type {number} */this.Constant_.TINY_TIMEOUT);
    },

    // Public methods.

    /**
     * Check the components disabled state.
     *
     * @public
     */
    checkDisabled: function checkDisabled() {
        if (this._btnElement.disabled) {
            (0, _dom.addClass)(this.element, this._CssClasses.IS_DISABLED);
        } else {
            (0, _dom.removeClass)(this.element, this._CssClasses.IS_DISABLED);
        }
    },

    /**
     * Check the components toggled state.
     *
     * @public
     */
    checkToggleState: function checkToggleState() {
        if (this._btnElement.checked) {
            (0, _dom.addClass)(this.element, this._CssClasses.IS_CHECKED);
        } else {
            (0, _dom.removeClass)(this.element, this._CssClasses.IS_CHECKED);
        }
    },

    /**
     * Disable radio.
     *
     * @public
     */
    disable: function disable() {
        this._btnElement.disabled = true;
        this._updateClasses();
    },

    /**
     * Enable radio.
     *
     * @public
     */
    enable: function enable() {
        this._btnElement.disabled = false;
        this._updateClasses();
    },

    /**
     * Check radio.
     *
     * @public
     */
    check: function check() {
        this._btnElement.checked = true;
        this._updateClasses();
    },

    uncheck: function uncheck() {
        this._btnElement.checked = false;
        this._updateClasses();
    }

});

_compMgr.compMgr.regComp({
    comp: Radio,
    compAsString: 'u.Radio',
    css: 'u-radio'
});

if (document.readyState && document.readyState === 'complete') {
    _compMgr.compMgr.updateComp();
} else {
    (0, _event.on)(window, 'load', function () {
        //扫描并生成控件
        _compMgr.compMgr.updateComp();
    });
}

exports.Radio = Radio;