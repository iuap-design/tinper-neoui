'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _env = require('neoui-sparrow/lib/env');

var _event = require('neoui-sparrow/lib/event');

var _compMgr = require('neoui-sparrow/lib/compMgr');

var Text = _BaseComponent.BaseComponent.extend({
    _Constant: {
        NO_MAX_ROWS: -1,
        MAX_ROWS_ATTRIBUTE: 'maxrows'
    },

    _CssClasses: {
        LABEL: 'u-label',
        INPUT: 'u-input',
        IS_DIRTY: 'is-dirty',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_INVALID: 'is-invalid',
        IS_UPGRADED: 'is-upgraded'
    },

    init: function init() {
        var oThis = this;
        this.maxRows = this._Constant.NO_MAX_ROWS;
        this.label_ = this.element.querySelector('.' + this._CssClasses.LABEL);
        this._input = this.element.querySelector('input');

        if (this._input) {
            if (this._input.hasAttribute(
            /** @type {string} */this._Constant.MAX_ROWS_ATTRIBUTE)) {
                this.maxRows = parseInt(this._input.getAttribute(
                /** @type {string} */this._Constant.MAX_ROWS_ATTRIBUTE), 10);
                if (isNaN(this.maxRows)) {
                    this.maxRows = this._Constant.NO_MAX_ROWS;
                }
            }

            this.boundUpdateClassesHandler = this._updateClasses.bind(this);
            this.boundFocusHandler = this._focus.bind(this);
            this.boundBlurHandler = this._blur.bind(this);
            this.boundResetHandler = this._reset.bind(this);
            this._input.addEventListener('input', this.boundUpdateClassesHandler);
            if (_env.env.isIE8) {
                this._input.addEventListener('propertychange', function () {
                    oThis._updateClasses();
                });
            }
            this._input.addEventListener('focus', this.boundFocusHandler);
            if (_env.env.isIE8 || _env.env.isIE9) {
                if (this.label_) {
                    this.label_.addEventListener('click', function () {
                        this._input.focus();
                    }.bind(this));
                }
            }

            this._input.addEventListener('blur', this.boundBlurHandler);
            this._input.addEventListener('reset', this.boundResetHandler);

            if (this.maxRows !== this._Constant.NO_MAX_ROWS) {
                // TODO: This should handle pasting multi line text.
                // Currently doesn't.
                this.boundKeyDownHandler = this._down.bind(this);
                this._input.addEventListener('keydown', this.boundKeyDownHandler);
            }
            var invalid = (0, _dom.hasClass)(this.element, this._CssClasses.IS_INVALID);
            this._updateClasses();
            (0, _dom.addClass)(this.element, this._CssClasses.IS_UPGRADED);
            if (invalid) {
                (0, _dom.addClass)(this.element, this._CssClasses.IS_INVALID);
            }
        }
    },

    /**
     * Handle input being entered.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _down: function _down(event) {
        var currentRowCount = event.target.value.split('\n').length;
        if (event.keyCode === 13) {
            if (currentRowCount >= this.maxRows) {
                event.preventDefault();
            }
        }
    },
    /**
     * Handle focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _focus: function _focus(event) {
        (0, _dom.addClass)(this.element, this._CssClasses.IS_FOCUSED);
    },
    /**
     * Handle lost focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _blur: function _blur(event) {
        (0, _dom.removeClass)(this.element, this._CssClasses.IS_FOCUSED);
    },
    /**
     * Handle reset event from out side.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _reset: function _reset(event) {
        this._updateClasses();
    },
    /**
     * Handle class updates.
     *
     * @private
     */
    _updateClasses: function _updateClasses() {
        this.checkDisabled();
        this.checkValidity();
        this.checkDirty();
    },

    // Public methods.

    /**
     * Check the disabled state and update field accordingly.
     *
     * @public
     */
    checkDisabled: function checkDisabled() {
        if (this._input.disabled) {
            (0, _dom.addClass)(this.element, this._CssClasses.IS_DISABLED);
        } else {
            (0, _dom.removeClass)(this.element, this._CssClasses.IS_DISABLED);
        }
    },
    /**
     * Check the validity state and update field accordingly.
     *
     * @public
     */
    checkValidity: function checkValidity() {
        if (this._input.validity) {
            if (this._input.validity.valid) {
                (0, _dom.removeClass)(this.element, this._CssClasses.IS_INVALID);
            } else {
                (0, _dom.addClass)(this.element, this._CssClasses.IS_INVALID);
            }
        }
    },
    /**
     * Check the dirty state and update field accordingly.
     *
     * @public
     */
    checkDirty: function checkDirty() {
        if (this._input.value && this._input.value.length > 0) {
            (0, _dom.addClass)(this.element, this._CssClasses.IS_DIRTY);
        } else {
            (0, _dom.removeClass)(this.element, this._CssClasses.IS_DIRTY);
        }
    },
    /**
     * Disable text field.
     *
     * @public
     */
    disable: function disable() {
        this._input.disabled = true;
        this._updateClasses();
    },
    /**
     * Enable text field.
     *
     * @public
     */
    enable: function enable() {
        this._input.disabled = false;
        this._updateClasses();
    },
    /**
     * Update text field value.
     *
     * @param {string} value The value to which to set the control (optional).
     * @public
     */
    change: function change(value) {
        this._input.value = value || '';
        this._updateClasses();
    }

});

//if (compMgr)
//    compMgr.addPlug({
//        name:'text',
//        plug: Text
//    })

/**
 * Module : neoui-combo
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 14:22:46
 */

_compMgr.compMgr.regComp({
    comp: Text,
    compAsString: 'u.Text',
    css: 'u-text'
});
if (document.readyState && document.readyState === 'complete') {
    _compMgr.compMgr.updateComp();
} else {
    (0, _event.on)(window, 'load', function () {
        //扫描并生成控件
        _compMgr.compMgr.updateComp();
    });
}
exports.Text = Text;