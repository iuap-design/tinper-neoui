/**
 * Module : neoui-checkbox
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 13:55:07
 */
import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,removeClass,hasClass} from 'tinper-sparrow/js/dom';
import {on,stopEvent} from 'tinper-sparrow/js/event';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {compMgr} from 'tinper-sparrow/js/compMgr';

var Checkbox = BaseComponent.extend({
    _Constant: {
        TINY_TIMEOUT: 0.001
    },

    _CssClasses: {
        INPUT: 'u-checkbox-input',
        BOX_OUTLINE: 'u-checkbox-outline',
        FOCUS_HELPER: 'u-checkbox-focus-helper',
        TICK_OUTLINE: 'u-checkbox-tick-outline',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_CHECKED: 'is-checked',
        IS_UPGRADED: 'is-upgraded'
    },
    init: function () {
        this._inputElement = this.element.querySelector('input');


        var boxOutline = document.createElement('span');
        addClass(boxOutline, this._CssClasses.BOX_OUTLINE);

         var tickContainer = document.createElement('span');
        addClass(tickContainer, this._CssClasses.FOCUS_HELPER);

         var tickOutline = document.createElement('span');
        addClass(tickOutline, this._CssClasses.TICK_OUTLINE);

         boxOutline.appendChild(tickOutline);
         this.element.appendChild(tickContainer);
         this.element.appendChild(boxOutline);


        //if (this.element.classList.contains(this._CssClasses.RIPPLE_EFFECT)) {
        //  addClass(this.element,this._CssClasses.RIPPLE_IGNORE_EVENTS);
        this.rippleContainerElement_ = document.createElement('span');
        //this.rippleContainerElement_.classList.add(this._CssClasses.RIPPLE_CONTAINER);
        //this.rippleContainerElement_.classList.add(this._CssClasses.RIPPLE_EFFECT);
        //this.rippleContainerElement_.classList.add(this._CssClasses.RIPPLE_CENTER);
        this.boundRippleMouseUp = this._onMouseUp.bind(this);
        this.rippleContainerElement_.addEventListener('mouseup', this.boundRippleMouseUp);

        //var ripple = document.createElement('span');
        //ripple.classList.add(this._CssClasses.RIPPLE);

        //this.rippleContainerElement_.appendChild(ripple);
        this.element.appendChild(this.rippleContainerElement_);
        new URipple(this.rippleContainerElement_);

        //}
        this.boundInputOnChange = this._onChange.bind(this);
        this.boundInputOnFocus = this._onFocus.bind(this);
        this.boundInputOnBlur = this._onBlur.bind(this);
        this.boundElementMouseUp = this._onMouseUp.bind(this);
        //this._inputElement.addEventListener('change', this.boundInputOnChange);
        //this._inputElement.addEventListener('focus', this.boundInputOnFocus);
        //this._inputElement.addEventListener('blur', this.boundInputOnBlur);
        //this.element.addEventListener('mouseup', this.boundElementMouseUp);
        if (!hasClass(this.element, 'only-style')){
            on(this.element, 'click', function(e){
                if(e.target.nodeName != 'INPUT'){
                    if(!this._inputElement.disabled){
                        this.toggle();
                        stopEvent(e);
                    }
                }
            }.bind(this));
        }


        this._updateClasses();
        addClass(this.element, this._CssClasses.IS_UPGRADED);

    },

    _onChange: function (event) {
        this._updateClasses();
        this.trigger('change', {isChecked:this._inputElement.checked});
    },

    _onFocus: function () {
        addClass(this.element, this._CssClasses.IS_FOCUSED)
    },

    _onBlur: function () {
        removeClass(this.element, this._CssClasses.IS_FOCUSED)
    },

    _onMouseUp: function (event) {
        this._blur();
    },

    /**
     * Handle class updates.
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
            this._inputElement.blur();
        }.bind(this), /** @type {number} */ (this._Constant.TINY_TIMEOUT));
    },

// Public methods.

    /**
     * Check the inputs toggle state and update display.
     *
     * @public
     */
    checkToggleState: function () {
        if (this._inputElement.checked) {
            addClass(this.element, this._CssClasses.IS_CHECKED)
        } else {
            removeClass(this.element, this._CssClasses.IS_CHECKED)
        }
    },


    /**
     * Check the inputs disabled state and update display.
     *
     * @public
     */
    checkDisabled: function () {
        if (this._inputElement.disabled) {
            addClass(this.element, this._CssClasses.IS_DISABLED)
        } else {
            removeClass(this.element, this._CssClasses.IS_DISABLED)
        }
    },


    isChecked: function(){
        //return hasClass(this.element,this._CssClasses.IS_CHECKED);
        return this._inputElement.checked
    },

    toggle: function(){
        //return;
        if (this.isChecked()){
            this.uncheck()
        }else{
            this.check();
        }
    },

    /**
     * Disable checkbox.
     *
     * @public
     */
    disable: function () {
        this._inputElement.disabled = true;
        this._updateClasses();
    },


    /**
     * Enable checkbox.
     *
     * @public
     */
    enable: function () {
        this._inputElement.disabled = false;
        this._updateClasses();
    },

    // 点击时查看是否有beforeEdit（从checkboxAdapter那里传来）方法，根据beforeEdit方法判断是否触发check或者uncheck
    beforeToggle: function() {
        if (typeof this.beforeEdit === 'function') {
            return this.beforeEdit();
        }else {
            return true;
        }
    },
    /**
     * Check checkbox.
     *
     * @public
     */
    check: function () {
        if (this.beforeToggle()) {
            this._inputElement.checked = true;
            this._updateClasses();
            this.boundInputOnChange();
        }
    },


    /**
     * Uncheck checkbox.
     *
     * @public
     */
    uncheck: function () {
        if (this.beforeToggle()) {
            this._inputElement.checked = false;
            this._updateClasses();
            this.boundInputOnChange();
        }
    }


});


compMgr.regComp({
    comp: Checkbox,
    compAsString: 'u.Checkbox',
    css: 'u-checkbox'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {Checkbox};