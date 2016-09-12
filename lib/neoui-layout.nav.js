'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NavLayoutTab = exports.NavLayout = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _ripple = require('neoui-sparrow/lib/util/ripple');

var _env = require('neoui-sparrow/lib/env');

var _compMgr = require('neoui-sparrow/lib/compMgr');

/**
 * Module : neoui-layout-nav
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 15:56:32
 */

var NavLayout = _BaseComponent.BaseComponent.extend({
    _Constant: {
        MAX_WIDTH: '(max-width: 1024px)',
        TAB_SCROLL_PIXELS: 100,

        MENU_ICON: 'menu',
        CHEVRON_LEFT: 'chevron_left',
        CHEVRON_RIGHT: 'chevron_right'
    },
    /**
     * Modes.
     *
     * @enum {number}
     * @private
     */
    _Mode: {
        STANDARD: 0,
        SEAMED: 1,
        WATERFALL: 2,
        SCROLL: 3
    },
    /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */
    _CssClasses: {
        CONTAINER: 'u-navlayout-container',
        HEADER: 'u-navlayout-header',
        DRAWER: 'u-navlayout-drawer',
        CONTENT: 'u-navlayout-content',
        DRAWER_BTN: 'u-navlayout-drawer-button',

        ICON: 'fa',

        //JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
        //RIPPLE_CONTAINER: 'mdl-layout__tab-ripple-container',
        //RIPPLE: 'mdl-ripple',
        //RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',

        HEADER_SEAMED: 'seamed',
        HEADER_WATERFALL: 'waterfall',
        HEADER_SCROLL: 'scroll',

        FIXED_HEADER: 'fixed',
        OBFUSCATOR: 'u-navlayout-obfuscator',

        TAB_BAR: 'u-navlayout-tab-bar',
        TAB_CONTAINER: 'u-navlayout-tab-bar-container',
        TAB: 'u-navlayout-tab',
        TAB_BAR_BUTTON: 'u-navlayout-tab-bar-button',
        TAB_BAR_LEFT_BUTTON: 'u-navlayout-tab-bar-left-button',
        TAB_BAR_RIGHT_BUTTON: 'u-navlayout-tab-bar-right-button',
        PANEL: 'u-navlayout-tab-panel',

        HAS_DRAWER: 'has-drawer',
        HAS_TABS: 'has-tabs',
        HAS_SCROLLING_HEADER: 'has-scrolling-header',
        CASTING_SHADOW: 'is-casting-shadow',
        IS_COMPACT: 'is-compact',
        IS_SMALL_SCREEN: 'is-small-screen',
        IS_DRAWER_OPEN: 'is-visible',
        IS_ACTIVE: 'is-active',
        IS_UPGRADED: 'is-upgraded',
        IS_ANIMATING: 'is-animating',

        ON_LARGE_SCREEN: 'u-navlayout-large-screen-only',
        ON_SMALL_SCREEN: 'u-navlayout-small-screen-only',

        NAV: 'u-nav',
        NAV_LINK: 'u-nav-link',
        NAV_LINK_CURRENT: 'u-nav-link-current',
        NAV_LINK_OPEN: 'u-nav-link-open',
        NAV_SUB: 'u-nav-sub'
    },
    init: function init() {
        var container = document.createElement('div');
        (0, _dom.addClass)(container, this._CssClasses.CONTAINER);
        this.element.parentElement.insertBefore(container, this.element);
        this.element.parentElement.removeChild(this.element);
        container.appendChild(this.element);

        var directChildren = this.element.childNodes;
        var numChildren = directChildren.length;
        for (var c = 0; c < numChildren; c++) {
            var child = directChildren[c];
            if ((0, _dom.hasClass)(child, this._CssClasses.HEADER)) {
                this._header = child;
            }

            if ((0, _dom.hasClass)(child, this._CssClasses.DRAWER)) {
                this._drawer = child;
            }

            if ((0, _dom.hasClass)(child, this._CssClasses.CONTENT)) {
                this._content = child;
                var layoutHeight = this.element.offsetHeight;
                var headerHeight = typeof this._header === 'undefined' ? 0 : this._header.offsetHeight;
                this._content.style.height = layoutHeight - headerHeight + 'px';
                var self = this;
                (0, _event.on)(window, 'resize', function () {
                    var layoutHeight = self.element.offsetHeight;
                    var headerHeight = typeof self._header === 'undefined' ? 0 : self._header.offsetHeight;
                    self._content.style.height = layoutHeight - headerHeight + 'px';
                });
            }
        }

        if (this._header) {
            this._tabBar = this._header.querySelector('.' + this._CssClasses.TAB_BAR);
        }

        var mode = this._Mode.STANDARD;

        if (this._header) {
            if ((0, _dom.hasClass)(this._header, this._CssClasses.HEADER_SEAMED)) {
                mode = this._Mode.SEAMED;
                //} else if (hasClass(this._header,this._CssClasses.HEADER_SEAMED)) {
                //    mode = this._Mode.WATERFALL;
                //    on(this._header,'transitionend', this._headerTransitionEndHandler.bind(this));
                //    // this._header.addEventListener('transitionend', this._headerTransitionEndHandler.bind(this));
                //    on(this._header,'click', this._headerClickHandler.bind(this));
                //    // this._header.addEventListener('click', this._headerClickHandler.bind(this));
            } else if ((0, _dom.hasClass)(this._header, this._CssClasses.HEADER_SCROLL)) {
                mode = this._Mode.SCROLL;
                (0, _dom.addClass)(container, this._CssClasses.HAS_SCROLLING_HEADER);
            }

            if (mode === this._Mode.STANDARD) {
                (0, _dom.addClass)(this._header, this._CssClasses.CASTING_SHADOW);
                if (this._tabBar) {
                    (0, _dom.addClass)(this._tabBar, this._CssClasses.CASTING_SHADOW);
                }
            } else if (mode === this._Mode.SEAMED || mode === this._Mode.SCROLL) {
                (0, _dom.removeClass)(this._header, this._CssClasses.CASTING_SHADOW);
                if (this._tabBar) {
                    (0, _dom.removeClass)(this._tabBar, this._CssClasses.CASTING_SHADOW);
                }
            } else if (mode === this._Mode.WATERFALL) {
                // Add and remove shadows depending on scroll position.
                // Also add/remove auxiliary class for styling of the compact version of
                // the header.
                (0, _event.on)(this._content, 'scroll', this._contentScrollHandler.bind(this));
                this._contentScrollHandler();
            }
        }

        // Add drawer toggling button to our layout, if we have an openable drawer.
        if (this._drawer) {
            var drawerButton = this.element.querySelector('.' + this._CssClasses.DRAWER_BTN);
            if (!drawerButton) {
                drawerButton = document.createElement('div');
                (0, _dom.addClass)(drawerButton, this._CssClasses.DRAWER_BTN);

                var drawerButtonIcon = document.createElement('i');
                drawerButtonIcon.className = 'uf uf-reorderoption';
                //drawerButtonIcon.textContent = this._Constant.MENU_ICON;
                drawerButton.appendChild(drawerButtonIcon);
            }

            if ((0, _dom.hasClass)(this._drawer, this._CssClasses.ON_LARGE_SCREEN)) {
                //If drawer has ON_LARGE_SCREEN class then add it to the drawer toggle button as well.
                (0, _dom.addClass)(drawerButton, this._CssClasses.ON_LARGE_SCREEN);
            } else if ((0, _dom.hasClass)(this._drawer, this._CssClasses.ON_SMALL_SCREEN)) {
                //If drawer has ON_SMALL_SCREEN class then add it to the drawer toggle button as well.
                (0, _dom.addClass)(drawerButton, this._CssClasses.ON_SMALL_SCREEN);
            }
            (0, _event.on)(drawerButton, 'click', this._drawerToggleHandler.bind(this));

            // Add a class if the layout has a drawer, for altering the left padding.
            // Adds the HAS_DRAWER to the elements since this._header may or may
            // not be present.
            (0, _dom.addClass)(this.element, this._CssClasses.HAS_DRAWER);

            // If we have a fixed header, add the button to the header rather than
            // the layout.
            if ((0, _dom.hasClass)(this.element, this._CssClasses.FIXED_HEADER) && this._header) {
                this._header.insertBefore(drawerButton, this._header.firstChild);
            } else {
                this.element.insertBefore(drawerButton, this._content);
            }
            this.drawerButton = drawerButton;

            var obfuscator = document.createElement('div');
            (0, _dom.addClass)(obfuscator, this._CssClasses.OBFUSCATOR);
            this.element.appendChild(obfuscator);
            (0, _event.on)(obfuscator, 'click', this._drawerToggleHandler.bind(this));
            this._obfuscator = obfuscator;

            var leftnavs = this.element.querySelectorAll('.' + this._CssClasses.NAV);
            for (var i = 0; i < leftnavs.length; i++) {
                (0, _event.on)(leftnavs[i], 'click', this._navlinkClickHander.bind(this));

                var items = leftnavs[i].querySelectorAll('.' + this._CssClasses.NAV_LINK);
                for (var i = 0; i < items.length; i++) {
                    new _ripple.Ripple(items[i]);
                }
            }
        }

        // Keep an eye on screen size, and add/remove auxiliary class for styling
        // of small screens.


        if (_env.env.isIE8 || _env.env.isIE9) {
            (0, _event.on)(window, 'resize', this._screenSizeHandler.bind(this));
        } else {
            this._screenSizeMediaQuery = window.matchMedia(
            /** @type {string} */this._Constant.MAX_WIDTH);
            this._screenSizeMediaQuery.addListener(this._screenSizeHandler.bind(this));
        }

        this._screenSizeHandler();

        // Initialize tabs, if any.
        if (this._header && this._tabBar) {
            (0, _dom.addClass)(this.element, this._CssClasses.HAS_TABS);

            var tabContainer = document.createElement('div');
            (0, _dom.addClass)(tabContainer, this._CssClasses.TAB_CONTAINER);
            this._header.insertBefore(tabContainer, this._tabBar);
            this._header.removeChild(this._tabBar);

            var leftButton = document.createElement('div');
            (0, _dom.addClass)(leftButton, this._CssClasses.TAB_BAR_BUTTON);
            (0, _dom.addClass)(leftButton, this._CssClasses.TAB_BAR_LEFT_BUTTON);
            var leftButtonIcon = document.createElement('i');
            (0, _dom.addClass)(leftButtonIcon, this._CssClasses.ICON);
            leftButtonIcon.textContent = this._Constant.CHEVRON_LEFT;
            leftButton.appendChild(leftButtonIcon);
            (0, _event.on)(leftButton, 'click', function () {
                this._tabBar.scrollLeft -= this._Constant.TAB_SCROLL_PIXELS;
            }.bind(this));

            var rightButton = document.createElement('div');
            (0, _dom.addClass)(rightButton, this._CssClasses.TAB_BAR_BUTTON);
            (0, _dom.addClass)(rightButton, this._CssClasses.TAB_BAR_RIGHT_BUTTON);
            var rightButtonIcon = document.createElement('i');
            (0, _dom.addClass)(rightButtonIcon, this._CssClasses.ICON);
            rightButtonIcon.textContent = this._Constant.CHEVRON_RIGHT;
            rightButton.appendChild(rightButtonIcon);
            (0, _event.on)(rightButton, 'click', function () {
                this._tabBar.scrollLeft += this._Constant.TAB_SCROLL_PIXELS;
            }.bind(this));

            tabContainer.appendChild(leftButton);
            tabContainer.appendChild(this._tabBar);
            tabContainer.appendChild(rightButton);

            // Add and remove buttons depending on scroll position.
            var tabScrollHandler = function () {
                if (this._tabBar.scrollLeft > 0) {
                    (0, _dom.addClass)(leftButton, this._CssClasses.IS_ACTIVE);
                } else {
                    (0, _dom.removeClass)(leftButton, this._CssClasses.IS_ACTIVE);
                }

                if (this._tabBar.scrollLeft < this._tabBar.scrollWidth - this._tabBar.offsetWidth) {
                    (0, _dom.addClass)(rightButton, this._CssClasses.IS_ACTIVE);
                } else {
                    (0, _dom.removeClass)(rightButton, this._CssClasses.IS_ACTIVE);
                }
            }.bind(this);

            (0, _event.on)(this._tabBar, 'scroll', tabScrollHandler);
            tabScrollHandler();

            if ((0, _dom.hasClass)(this._tabBar, this._CssClasses.JS_RIPPLE_EFFECT)) {
                (0, _dom.addClass)(this._tabBar, this._CssClasses.RIPPLE_IGNORE_EVENTS);
            }

            // Select element tabs, document panels
            var tabs = this._tabBar.querySelectorAll('.' + this._CssClasses.TAB);
            var panels = this._content.querySelectorAll('.' + this._CssClasses.PANEL);

            // Create new tabs for each tab element
            for (var i = 0; i < tabs.length; i++) {
                new UNavLayoutTab(tabs[i], tabs, panels, this);
            }
        }

        (0, _dom.addClass)(this.element, this._CssClasses.IS_UPGRADED);
    },

    /**
     * Handles scrolling on the content.
     *
     * @private
     */
    _contentScrollHandler: function _contentScrollHandler() {
        if ((0, _dom.hasClass)(this._header, this._CssClasses.IS_ANIMATING)) {
            return;
        }

        if (this._content.scrollTop > 0 && !(0, _dom.hasClass)(this._header, this._CssClasses.IS_COMPACT)) {
            (0, _dom.addClass)(this._header, this._CssClasses.CASTING_SHADOW).addClass(this._header, this._CssClasses.IS_COMPACT).addClass(this._header, this._CssClasses.IS_ANIMATING);
        } else if (this._content.scrollTop <= 0 && (0, _dom.hasClass)(this._header, this._CssClasses.IS_COMPACT)) {
            (0, _dom.removeClass)(this._header, this._CssClasses.CASTING_SHADOW).removeClass(this._header, this._CssClasses.IS_COMPACT).addClass(this._header, this._CssClasses.IS_ANIMATING);
        }
    },

    /**
     * Handles changes in screen size.
     *
     * @private
     */
    _screenSizeHandler: function _screenSizeHandler() {
        if (_env.env.isIE8 || _env.env.isIE9) {
            this._screenSizeMediaQuery = {};
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (w > 1024) this._screenSizeMediaQuery.matches = false;else this._screenSizeMediaQuery.matches = true;
        }
        if (this._screenSizeMediaQuery.matches) {
            (0, _dom.addClass)(this.element, this._CssClasses.IS_SMALL_SCREEN);
        } else {
            (0, _dom.removeClass)(this.element, this._CssClasses.IS_SMALL_SCREEN);
            // Collapse drawer (if any) when moving to a large screen size.
            if (this._drawer) {
                (0, _dom.removeClass)(this._drawer, this._CssClasses.IS_DRAWER_OPEN);
                (0, _dom.removeClass)(this._obfuscator, this._CssClasses.IS_DRAWER_OPEN);
            }
        }
    },
    /**
     * Handles toggling of the drawer.
     *
     * @private
     */
    _drawerToggleHandler: function _drawerToggleHandler() {
        (0, _dom.toggleClass)(this._drawer, this._CssClasses.IS_DRAWER_OPEN);
        (0, _dom.toggleClass)(this._obfuscator, this._CssClasses.IS_DRAWER_OPEN);
    },
    /**
     * Handles (un)setting the `is-animating` class
     *
     * @private
     */
    _headerTransitionEndHandler: function _headerTransitionEndHandler() {
        (0, _dom.removeClass)(this._header, this._CssClasses.IS_ANIMATING);
    },
    /**
     * Handles expanding the header on click
     *
     * @private
     */
    _headerClickHandler: function _headerClickHandler() {
        if ((0, _dom.hasClass)(this._header, this._CssClasses.IS_COMPACT)) {
            (0, _dom.removeClass)(this._header, this._CssClasses.IS_COMPACT);
            (0, _dom.addClass)(this._header, this._CssClasses.IS_ANIMATING);
        }
    },
    /**
     * Reset tab state, dropping active classes
     *
     * @private
     */
    _resetTabState: function _resetTabState(tabBar) {
        for (var k = 0; k < tabBar.length; k++) {
            (0, _dom.removeClass)(tabBar[k], this._CssClasses.IS_ACTIVE);
        }
    },
    /**
     * Reset panel state, droping active classes
     *
     * @private
     */
    _resetPanelState: function _resetPanelState(panels) {
        for (var j = 0; j < panels.length; j++) {
            (0, _dom.removeClass)(panels[j], this._CssClasses.IS_ACTIVE);
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
                if (_env.env.isIE8) sub.style.maxHeight = 0;
            }
            if (sub && !open) {
                (0, _dom.addClass)(item, this._CssClasses.NAV_LINK_OPEN);
                if (_env.env.isIE8) sub.style.maxHeight = '999px';
            }
            // sub && open && removeClass(item, this._CssClasses.NAV_LINK_OPEN);
            // sub && !open && addClass(item, this._CssClasses.NAV_LINK_OPEN);
        }
    }
});

/**
 * Constructor for an individual tab.
 *
 * @constructor
 * @param {HTMLElement} tab The HTML element for the tab.
 * @param {!Array<HTMLElement>} tabs Array with HTML elements for all tabs.
 * @param {!Array<HTMLElement>} panels Array with HTML elements for all panels.
 * @param {UNavLayout} layout The UNavLayout object that owns the tab.
 */
function UNavLayoutTab(tab, tabs, panels, layout) {

    /**
     * Auxiliary method to programmatically select a tab in the UI.
     */
    function selectTab() {
        var href = tab.href.split('#')[1];
        var panel = layout._content.querySelector('#' + href);
        layout._resetTabState(tabs);
        layout._resetPanelState(panels);
        (0, _dom.addClass)(tab, layout._CssClasses.IS_ACTIVE);
        (0, _dom.addClass)(panel, layout._CssClasses.IS_ACTIVE);
    }

    //if (layout.tabBar_.classList.contains(layout._CssClasses.JS_RIPPLE_EFFECT)) {
    var rippleContainer = document.createElement('span');
    (0, _dom.addClass)(rippleContainer, 'u-ripple');
    //rippleContainer.classList.add(layout._CssClasses.JS_RIPPLE_EFFECT);
    //var ripple = document.createElement('span');
    //ripple.classList.add(layout._CssClasses.RIPPLE);
    //rippleContainer.appendChild(ripple);
    tab.appendChild(rippleContainer);
    new _ripple.URipple(tab);
    //}
    (0, _event.on)(tab, 'click', function (e) {
        if (tab.getAttribute('href').charAt(0) === '#') {
            e.preventDefault();
            selectTab();
        }
    });

    tab.show = selectTab;

    (0, _event.on)(tab, 'click', function (e) {
        e.preventDefault();
        var href = tab.href.split('#')[1];
        var panel = layout._content.querySelector('#' + href);
        layout._resetTabState(tabs);
        layout._resetPanelState(panels);
        (0, _dom.addClass)(tab, layout._CssClasses.IS_ACTIVE);
        (0, _dom.addClass)(panel, layout._CssClasses.IS_ACTIVE);
    });
}
var NavLayoutTab = UNavLayoutTab;

_compMgr.compMgr.regComp({
    comp: NavLayout,
    compAsString: 'u.NavLayout',
    css: 'u-navlayout'
});

if (document.readyState && document.readyState === 'complete') {
    _compMgr.compMgr.updateComp();
} else {
    (0, _event.on)(window, 'load', function () {
        //扫描并生成控件
        _compMgr.compMgr.updateComp();
    });
}

exports.NavLayout = NavLayout;
exports.NavLayoutTab = NavLayoutTab;