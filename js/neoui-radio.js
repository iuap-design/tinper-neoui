/**
 * Module : neoui-radio
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 11:16:00
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,hasClass,removeClass} from 'tinper-sparrow/js/dom';
import {env} from 'tinper-sparrow/js/env';
import {on} from 'tinper-sparrow/js/event';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {compMgr} from 'tinper-sparrow/js/compMgr';


var Radio = BaseComponent.extend({
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

    init: function () {
        this._btnElement = this.element.querySelector('input');

        this._boundChangeHandler = this._onChange.bind(this);
        this._boundFocusHandler = this._onChange.bind(this);
        this._boundBlurHandler = this._onBlur.bind(this);
        this._boundMouseUpHandler = this._onMouseup.bind(this);

        var outerCircle = document.createElement('span');
        addClass(outerCircle, this._CssClasses.RADIO_OUTER_CIRCLE);

        var innerCircle = document.createElement('span');
        addClass(innerCircle, this._CssClasses.RADIO_INNER_CIRCLE);

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
        new URipple(rippleContainer)
        //}

        this._btnElement.addEventListener('change', this._boundChangeHandler);
        this._btnElement.addEventListener('focus', this._boundFocusHandler);
        this._btnElement.addEventListener('blur', this._boundBlurHandler);
        this.element.addEventListener('mouseup', this._boundMouseUpHandler);

        this._updateClasses();
        addClass(this.element, this._CssClasses.IS_UPGRADED);

    },

    _onChange: function (event) {
        // Since other radio buttons don't get change events, we need to look for
        // them to update their classes.
        var radios = document.querySelectorAll('.' + this._CssClasses.JS_RADIO);
        for (var i = 0; i < radios.length; i++) {
            var button = radios[i].querySelector('.' + this._CssClasses.RADIO_BTN);
            // Different name == different group, so no point updating those.
            if (button.getAttribute('name') === this._btnElement.getAttribute('name')) {
                if(radios[i]['u.Radio']){
                    radios[i]['u.Radio']._updateClasses();
                }
            }
        }
        this.trigger('change', {isChecked:this._btnElement.checked});
    },

    /**
     * Handle focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _onFocus: function (event) {
        addClass(this.element, this._CssClasses.IS_FOCUSED);
    },

    /**
     * Handle lost focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _onBlur: function (event) {
        removeClass(this.element, this._CssClasses.IS_FOCUSED);
    },

    /**
     * Handle mouseup.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    _onMouseup: function (event) {
        this._blur();
    },

    /**
     * Update classes.
     *
     * @private
     */
    _updateClasses: function () {
        this.checkDisabled();
        this.checkToggleState();
    },

    /**
     * Add blur.
     *
     * @private
     */
    _blur: function () {

        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function () {
            this._btnElement.blur();
        }.bind(this), /** @type {number} */ (this.Constant_.TINY_TIMEOUT));
    },

// Public methods.

    /**
     * Check the components disabled state.
     *
     * @public
     */
    checkDisabled: function () {
        if (this._btnElement.disabled) {
            addClass(this.element, this._CssClasses.IS_DISABLED);
        } else {
            removeClass(this.element, this._CssClasses.IS_DISABLED);
        }
    },


    /**
     * Check the components toggled state.
     *
     * @public
     */
    checkToggleState: function () {
        if (this._btnElement.checked) {
            addClass(this.element, this._CssClasses.IS_CHECKED);
        } else {
            removeClass(this.element, this._CssClasses.IS_CHECKED);
        }
    },


    /**
     * Disable radio.
     *
     * @public
     */
    disable: function () {
        this._btnElement.disabled = true;
        this._updateClasses();
    },

    /**
     * Enable radio.
     *
     * @public
     */
    enable: function () {
        this._btnElement.disabled = false;
        this._updateClasses();
    },


    /**
     * Check radio.
     *
     * @public
     */
    check: function () {
        this._btnElement.checked = true;
        this._updateClasses();
    },


    uncheck: function () {
        this._btnElement.checked = false;
        this._updateClasses();
    }


});


compMgr.regComp({
    comp: Radio,
    compAsString: 'u.Radio',
    css: 'u-radio'
});



if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}

export {Radio};
