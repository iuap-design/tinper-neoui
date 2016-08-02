u.Switch = u.BaseComponent.extend({
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

    init: function () {
        this._inputElement = this.element.querySelector('.' + this._CssClasses.INPUT);

        var track = document.createElement('div');
        u.addClass(track, this._CssClasses.TRACK);

        var thumb = document.createElement('div');
        u.addClass(thumb, this._CssClasses.THUMB);

        var focusHelper = document.createElement('span');
        u.addClass(focusHelper, this._CssClasses.FOCUS_HELPER);

        thumb.appendChild(focusHelper);

        this.element.appendChild(track);
        this.element.appendChild(thumb);

        this.boundMouseUpHandler = this._onMouseUp.bind(this);

        //if (this.element.classList.contains(this._CssClasses.RIPPLE_EFFECT)) {
        //  u.addClass(this.element,this._CssClasses.RIPPLE_IGNORE_EVENTS);
        this._rippleContainerElement = document.createElement('span');
        //this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_CONTAINER);
        //this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_EFFECT);
        //this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_CENTER);
        this._rippleContainerElement.addEventListener('mouseup', this.boundMouseUpHandler);

        //var ripple = document.createElement('span');
        //ripple.classList.add(this._CssClasses.RIPPLE);

        //this._rippleContainerElement.appendChild(ripple);
        this.element.appendChild(this._rippleContainerElement);
        new URipple(this._rippleContainerElement);
        //}

        this.boundChangeHandler = this._onChange.bind(this);
        this.boundFocusHandler = this._onFocus.bind(this);
        this.boundBlurHandler = this._onBlur.bind(this);

        this._inputElement.addEventListener('change', this.boundChangeHandler);
        this._inputElement.addEventListener('focus', this.boundFocusHandler);
        this._inputElement.addEventListener('blur', this.boundBlurHandler);
        this.element.addEventListener('mouseup', this.boundMouseUpHandler);

        this._updateClasses();
        u.addClass(this.element, 'is-upgraded');

    },

    _onChange: function (event) {
        this._updateClasses();
        this.trigger('change', {isChecked:this._inputElement.checked});
    },

    _onFocus: function (event) {
        u.addClass(this.element, this._CssClasses.IS_FOCUSED);
    },

    _onBlur: function (event) {
        u.removeClass(this.element, this._CssClasses.IS_FOCUSED);
    },

    _onMouseUp: function (event) {
        this._blur();
    },

    _updateClasses: function () {
        this.checkDisabled();
        this.checkToggleState();
    },

    _blur: function () {
        // TODO: figure out why there's a focus event being fired after our blur,
        // so that we can avoid this hack.
        window.setTimeout(function () {
            this._inputElement.blur();
        }.bind(this), /** @type {number} */ (this._Constant.TINY_TIMEOUT));
    },

// Public methods.

    checkDisabled: function () {
        if (this._inputElement.disabled) {
            u.addClass(this.element, this._CssClasses.IS_DISABLED);
        } else {
            u.removeClass(this.element, this._CssClasses.IS_DISABLED);
        }
    },


    checkToggleState: function () {
        if (this._inputElement.checked) {
            u.addClass(this.element, this._CssClasses.IS_CHECKED);
        } else {
            u.removeClass(this.element, this._CssClasses.IS_CHECKED);
        }
    },


    isChecked: function(){
        //return u.hasClass(this.element,this._CssClasses.IS_CHECKED);
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

    disable: function () {
        this._inputElement.disabled = true;
        this._updateClasses();
    },


    enable: function () {
        this._inputElement.disabled = false;
        this._updateClasses();
    },


    check: function () {
        this._inputElement.checked = true;
        this._updateClasses();
    },


    uncheck: function () {
        this._inputElement.checked = false;
        this._updateClasses();
    }


});

u.compMgr.regComp({
    comp: u.Switch,
    compAsString: 'u.Switch',
    css: 'u-switch'
});
