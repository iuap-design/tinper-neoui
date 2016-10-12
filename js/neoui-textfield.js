/**
 * Module : neoui-combo
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 14:22:46
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,removeClass,hasClass} from 'tinper-sparrow/js/dom';
import {env} from 'tinper-sparrow/js/env';
import {on,stopEvent} from 'tinper-sparrow/js/event';
import {compMgr} from 'tinper-sparrow/js/compMgr';


var Text = BaseComponent.extend({
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

    init: function () {
        var oThis = this;
        this.maxRows = this._Constant.NO_MAX_ROWS;
        this.label_ = this.element.querySelector('.' + this._CssClasses.LABEL);
        this._input = this.element.querySelector('input');

        if (this._input) {
            if (this._input.hasAttribute(
                    /** @type {string} */ (this._Constant.MAX_ROWS_ATTRIBUTE))) {
                this.maxRows = parseInt(this._input.getAttribute(
                    /** @type {string} */ (this._Constant.MAX_ROWS_ATTRIBUTE)), 10);
                if (isNaN(this.maxRows)) {
                    this.maxRows = this._Constant.NO_MAX_ROWS;
                }
            }

            this.boundUpdateClassesHandler = this._updateClasses.bind(this);
            this.boundFocusHandler = this._focus.bind(this);
            this.boundBlurHandler = this._blur.bind(this);
            this.boundResetHandler = this._reset.bind(this);
            this._input.addEventListener('input', this.boundUpdateClassesHandler);
            if(env.isIE8){
                this._input.addEventListener('propertychange', function(){
                    oThis._updateClasses();
                });
            }
            this._input.addEventListener('focus', this.boundFocusHandler);
            if(env.isIE8 || env.isIE9){
                if(this.label_){
                    this.label_.addEventListener('click', function(){
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
            var invalid = hasClass(this.element, this._CssClasses.IS_INVALID);
            this._updateClasses();
            addClass(this.element, this._CssClasses.IS_UPGRADED);
            if (invalid) {
                addClass(this.element, this._CssClasses.IS_INVALID);
            }
        }
    },

    /**
     * Handle input being entered.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _down: function (event) {
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
    _focus : function (event) {
        addClass(this.element, this._CssClasses.IS_FOCUSED);
    },
    /**
     * Handle lost focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _blur : function (event) {
        removeClass(this.element, this._CssClasses.IS_FOCUSED);
        this.trigger('u.text.blur');
    },
    /**
     * Handle reset event from out side.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _reset : function (event) {
        this._updateClasses();
    },
    /**
     * Handle class updates.
     *
     * @private
     */
    _updateClasses : function () {
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
    checkDisabled : function () {
        if (this._input.disabled) {
            addClass(this.element, this._CssClasses.IS_DISABLED);
        } else {
            removeClass(this.element, this._CssClasses.IS_DISABLED);
        }
    },
    /**
     * Check the validity state and update field accordingly.
     *
     * @public
     */
    checkValidity : function () {
        if (this._input.validity) {
            if (this._input.validity.valid) {
                removeClass(this.element, this._CssClasses.IS_INVALID);
            } else {
                addClass(this.element, this._CssClasses.IS_INVALID);
            }
        }
    },
    /**
     * Check the dirty state and update field accordingly.
     *
     * @public
     */
    checkDirty: function () {
        if (this._input.value && this._input.value.length > 0) {
            addClass(this.element, this._CssClasses.IS_DIRTY);
        } else {
            removeClass(this.element, this._CssClasses.IS_DIRTY);
        }
    },
    /**
     * Disable text field.
     *
     * @public
     */
    disable: function () {
        this._input.disabled = true;
        this._updateClasses();
    },
    /**
     * Enable text field.
     *
     * @public
     */
    enable: function () {
        this._input.disabled = false;
        this._updateClasses();
    },
    /**
     * Update text field value.
     *
     * @param {string} value The value to which to set the control (optional).
     * @public
     */
    change: function (value) {
        this._input.value = value===0?value: (value|| '');
        this._updateClasses();
    }


});



//if (compMgr)
//    compMgr.addPlug({
//        name:'text',
//        plug: Text
//    })

compMgr.regComp({
    comp: Text,
    compAsString: 'u.Text',
    css: 'u-text'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {Text};
