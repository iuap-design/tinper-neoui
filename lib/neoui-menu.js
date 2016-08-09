'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Menu = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _ripple = require('neoui-sparrow/lib/util/ripple');

var _env = require('neoui-sparrow/lib/env');

var _compMgr = require('neoui-sparrow/lib/compMgr');

/**
 * Module : neoui-menu
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 19:22:32
 */
var Menu = _BaseComponent.BaseComponent.extend({
	_Keycodes: {
		ENTER: 13,
		ESCAPE: 27,
		SPACE: 32,
		UP_ARROW: 38,
		DOWN_ARROW: 40
	},
	_CssClasses: {

		BOTTOM_LEFT: 'u-menu-bottom-left', // This is the default.
		BOTTOM_RIGHT: 'u-menu-bottom-right',
		TOP_LEFT: 'u-menu-top-left',
		TOP_RIGHT: 'u-menu-top-right',
		UNALIGNED: 'u-menu-unaligned'
	},

	init: function init() {

		// Create container for the menu.
		var container = document.createElement('div');
		(0, _dom.addClass)(container, 'u-menu-container');
		this.element.parentElement.insertBefore(container, this.element);
		this.element.parentElement.removeChild(this.element);
		container.appendChild(this.element);
		this._container = container;

		// Create outline for the menu (shadow and background).
		var outline = document.createElement('div');
		(0, _dom.addClass)(outline, 'u-menu-outline');
		this._outline = outline;
		container.insertBefore(outline, this.element);

		// Find the "for" element and bind events to it.
		var forElId = this.element.getAttribute('for') || this.element.getAttribute('data-u-for');
		var forEl = null;
		if (forElId) {
			forEl = document.getElementById(forElId);
			if (forEl) {
				this.for_element = forEl;
				(0, _event.on)(forEl, 'click', this._handleForClick.bind(this));
				(0, _event.on)(forEl, 'keydown', this._handleForKeyboardEvent.bind(this));
			}
		}

		var items = this.element.querySelectorAll('.u-menu-item');
		this._boundItemKeydown = this._handleItemKeyboardEvent.bind(this);
		this._boundItemClick = this._handleItemClick.bind(this);
		for (var i = 0; i < items.length; i++) {
			// Add a listener to each menu item.
			(0, _event.on)(items[i], 'click', this._boundItemClick);
			// Add a tab index to each menu item.
			items[i].tabIndex = '-1';
			// Add a keyboard listener to each menu item.
			(0, _event.on)(items[i], 'keydown', this._boundItemKeydown);
		}

		for (i = 0; i < items.length; i++) {
			var item = items[i];

			var rippleContainer = document.createElement('span');
			(0, _dom.addClass)(rippleContainer, 'u-ripple');
			item.appendChild(rippleContainer);
			new _ripple.URipple(item);
		}
		//}

		// Copy alignment classes to the container, so the outline can use them.
		if ((0, _dom.hasClass)(this.element, 'u-menu-bottom-left')) {
			(0, _dom.addClass)(this._outline, 'u-menu-bottom-left');
		}
		if ((0, _dom.hasClass)(this.element, 'u-menu-bottom-right')) {
			(0, _dom.addClass)(this._outline, 'u-menu-bottom-right');
		}
		if ((0, _dom.hasClass)(this.element, 'u-menu-top-left')) {
			(0, _dom.addClass)(this._outline, 'u-menu-top-left');
		}
		if ((0, _dom.hasClass)(this.element, 'u-menu-top-right')) {
			(0, _dom.addClass)(this._outline, 'u-menu-top-right');
		}
		if ((0, _dom.hasClass)(this.element, 'u-menu-unaligned')) {
			(0, _dom.addClass)(this._outline, 'u-menu-unaligned');
		}

		(0, _dom.addClass)(container, 'is-upgraded');
	},
	_handleForClick: function _handleForClick(evt) {
		if (this.element && this.for_element) {
			var rect = this.for_element.getBoundingClientRect();
			var forRect = this.for_element.parentElement.getBoundingClientRect();

			if ((0, _dom.hasClass)(this.element, 'u-menu-unaligned')) {
				// Do not position the menu automatically. Requires the developer to
				// manually specify position.
			} else if ((0, _dom.hasClass)(this.element, 'u-menu-bottom-right')) {
				// Position below the "for" element, aligned to its right.
				this._container.style.right = forRect.right - rect.right + 'px';
				this._container.style.top = this.for_element.offsetTop + this.for_element.offsetHeight + 'px';
			} else if ((0, _dom.hasClass)(this.element, 'u-menu-top-left')) {
				// Position above the "for" element, aligned to its left.
				this._container.style.left = this.for_element.offsetLeft + 'px';
				this._container.style.bottom = forRect.bottom - rect.top + 'px';
			} else if ((0, _dom.hasClass)(this.element, 'u-menu-top-right')) {
				// Position above the "for" element, aligned to its right.
				this._container.style.right = forRect.right - rect.right + 'px';
				this._container.style.bottom = forRect.bottom - rect.top + 'px';
			} else {
				// Default: position below the "for" element, aligned to its left.
				this._container.style.left = this.for_element.offsetLeft + 'px';
				this._container.style.top = this.for_element.offsetTop + this.for_element.offsetHeight + 'px';
			}
		}

		this.toggle(evt);
	},
	/**
  * Handles a keyboard event on the "for" element.
  *
  * @param {Event} evt The event that fired.
  * @private
  */
	_handleForKeyboardEvent: function _handleForKeyboardEvent(evt) {
		if (this.element && this._container && this.for_element) {
			var items = this.element.querySelectorAll('.u-menu-item:not([disabled])');

			if (items && items.length > 0 && (0, _dom.hasClass)(this._container, 'is-visible')) {
				if (evt.keyCode === this._Keycodes.UP_ARROW) {
					(0, _event.stopEvent)(evt);
					// evt.preventDefault();
					items[items.length - 1].focus();
				} else if (evt.keyCode === this._Keycodes.DOWN_ARROW) {
					(0, _event.stopEvent)(evt);
					// evt.preventDefault();
					items[0].focus();
				}
			}
		}
	},
	/**
  * Handles a keyboard event on an item.
  *
  * @param {Event} evt The event that fired.
  * @private
  */
	_handleItemKeyboardEvent: function _handleItemKeyboardEvent(evt) {
		if (this.element && this._container) {
			var items = this.element.querySelectorAll('.u-menu-item:not([disabled])');

			if (items && items.length > 0 && (0, _dom.hasClass)(this._container, 'is-visible')) {
				var currentIndex = Array.prototype.slice.call(items).indexOf(evt.target);

				if (evt.keyCode === this._Keycodes.UP_ARROW) {
					(0, _event.stopEvent)(evt);
					// evt.preventDefault();
					if (currentIndex > 0) {
						items[currentIndex - 1].focus();
					} else {
						items[items.length - 1].focus();
					}
				} else if (evt.keyCode === this._Keycodes.DOWN_ARROW) {
					(0, _event.stopEvent)(evt);
					// evt.preventDefault();
					if (items.length > currentIndex + 1) {
						items[currentIndex + 1].focus();
					} else {
						items[0].focus();
					}
				} else if (evt.keyCode === this._Keycodes.SPACE || evt.keyCode === this._Keycodes.ENTER) {
					(0, _event.stopEvent)(evt);
					// evt.preventDefault();
					// Send mousedown and mouseup to trigger ripple.
					var e = new MouseEvent('mousedown');
					evt.target.dispatchEvent(e);
					e = new MouseEvent('mouseup');
					evt.target.dispatchEvent(e);
					// Send click.
					evt.target.click();
				} else if (evt.keyCode === this._Keycodes.ESCAPE) {
					(0, _event.stopEvent)(evt);
					// evt.preventDefault();
					this.hide();
				}
			}
		}
	},
	/**
  * Handles a click event on an item.
  *
  * @param {Event} evt The event that fired.
  * @private
  */
	_handleItemClick: function _handleItemClick(evt) {
		if (evt.target.hasAttribute('disabled')) {
			(0, _event.stopEvent)(evt);
			// evt.stopPropagation();
		} else {
			// Wait some time before closing menu, so the user can see the ripple.
			this._closing = true;
			window.setTimeout(function (evt) {
				this.hide();
				this._closing = false;
			}.bind(this), 150);
		}
	},
	/**
  * Calculates the initial clip (for opening the menu) or final clip (for closing
  * it), and applies it. This allows us to animate from or to the correct point,
  * that is, the point it's aligned to in the "for" element.
  *
  * @param {number} height Height of the clip rectangle
  * @param {number} width Width of the clip rectangle
  * @private
  */
	_applyClip: function _applyClip(height, width) {
		if ((0, _dom.hasClass)(this.element, 'u-menu-unaligned')) {
			// Do not clip.
			this.element.style.clip = '';
		} else if ((0, _dom.hasClass)(this.element, 'u-menu-bottom-right')) {
			// Clip to the top right corner of the menu.
			this.element.style.clip = 'rect(0 ' + width + 'px ' + '0 ' + width + 'px)';
		} else if ((0, _dom.hasClass)(this.element, 'u-menu-top-left')) {
			// Clip to the bottom left corner of the menu.
			this.element.style.clip = 'rect(' + height + 'px 0 ' + height + 'px 0)';
		} else if ((0, _dom.hasClass)(this.element, 'u-menu-top-right')) {
			// Clip to the bottom right corner of the menu.
			this.element.style.clip = 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)';
		} else {
			// Default: do not clip (same as clipping to the top left corner).
			this.element.style.clip = 'rect(' + 0 + 'px ' + 0 + 'px ' + 0 + 'px ' + 0 + 'px)';
		}
	},
	/**
  * Adds an event listener to clean up after the animation ends.
  *
  * @private
  */
	_addAnimationEndListener: function _addAnimationEndListener() {
		var cleanup = function () {
			(0, _event.off)(this.element, 'transitionend', cleanup);
			// this.element.removeEventListener('transitionend', cleanup);
			(0, _event.off)(this.element, 'webkitTransitionEnd', cleanup);
			// this.element.removeEventListener('webkitTransitionEnd', cleanup);
			(0, _dom.removeClass)(this.element, 'is-animating');
		}.bind(this);

		// Remove animation class once the transition is done.
		(0, _event.on)(this.element, 'transitionend', cleanup);
		// this.element.addEventListener('transitionend', cleanup);
		(0, _event.on)(this.element, 'webkitTransitionEnd', cleanup);
		// this.element.addEventListener('webkitTransitionEnd', cleanup);
	},
	/**
  * Displays the menu.
  *
  * @public
  */
	show: function show(evt) {
		if (this.element && this._container && this._outline) {
			// Measure the inner element.
			var height = this.element.getBoundingClientRect().height;
			var width = this.element.getBoundingClientRect().width;

			if (!width) {
				var left = this.element.getBoundingClientRect().left;
				var right = this.element.getBoundingClientRect().right;
				width = right - left;
			}

			if (!height) {
				var top = this.element.getBoundingClientRect().top;
				var bottom = this.element.getBoundingClientRect().bottom;
				height = bottom - top;
			}

			// Apply the inner element's size to the container and outline.
			this._container.style.width = width + 'px';
			this._container.style.height = height + 'px';
			this._outline.style.width = width + 'px';
			this._outline.style.height = height + 'px';

			var transitionDuration = 0.24;

			// Calculate transition delays for individual menu items, so that they fade
			// in one at a time.
			var items = this.element.querySelectorAll('.u-menu-item');
			for (var i = 0; i < items.length; i++) {
				var itemDelay = null;
				if ((0, _dom.hasClass)(this.element, 'u-menu-top-left') || (0, _dom.hasClass)(this.element, 'u-menu-top-right')) {
					itemDelay = (height - items[i].offsetTop - items[i].offsetHeight) / height * transitionDuration + 's';
				} else {
					itemDelay = items[i].offsetTop / height * transitionDuration + 's';
				}
				items[i].style.transitionDelay = itemDelay;
			}

			// Apply the initial clip to the text before we start animating.
			this._applyClip(height, width);

			// Wait for the next frame, turn on animation, and apply the final clip.
			// Also make it visible. This triggers the transitions.
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(function () {
					(0, _dom.addClass)(this.element, 'is-animating');
					this.element.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
					(0, _dom.addClass)(this._container, 'is-visible');
				}.bind(this));
			} else {
				(0, _dom.addClass)(this.element, 'is-animating');
				this.element.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
				(0, _dom.addClass)(this._container, 'is-visible');
			}

			// Clean up after the animation is complete.
			this._addAnimationEndListener();

			// Add a click listener to the document, to close the menu.
			var firstFlag = true;
			var callback = function (e) {
				if (_env.env.isIE8) {
					if (firstFlag) {
						firstFlag = false;
						return;
					}
				}
				if (e !== evt && !this._closing && e.target.parentNode !== this.element) {
					(0, _event.off)(document, 'click', callback);
					// document.removeEventListener('click', callback);
					this.hide();
				}
			}.bind(this);
			(0, _event.on)(document, 'click', callback);
			// document.addEventListener('click', callback);
		}
	},

	/**
  * Hides the menu.
  *
  * @public
  */
	hide: function hide() {
		if (this.element && this._container && this._outline) {
			var items = this.element.querySelectorAll('.u-menu-item');

			// Remove all transition delays; menu items fade out concurrently.
			for (var i = 0; i < items.length; i++) {
				items[i].style.transitionDelay = null;
			}

			// Measure the inner element.
			var rect = this.element.getBoundingClientRect();
			var height = rect.height;
			var width = rect.width;

			if (!width) {
				var left = rect.left;
				var right = rect.right;
				width = right - left;
			}

			if (!height) {
				var top = rect.top;
				var bottom = rect.bottom;
				height = bottom - top;
			}

			// Turn on animation, and apply the final clip. Also make invisible.
			// This triggers the transitions.
			(0, _dom.addClass)(this.element, 'is-animating');
			this._applyClip(height, width);
			(0, _dom.removeClass)(this._container, 'is-visible');

			// Clean up after the animation is complete.
			this._addAnimationEndListener();
		}
	},
	/**
  * Displays or hides the menu, depending on current state.
  *
  * @public
  */
	toggle: function toggle(evt) {
		if ((0, _dom.hasClass)(this._container, 'is-visible')) {
			this.hide();
		} else {
			this.show(evt);
		}
	}
});

_compMgr.compMgr.regComp({
	comp: Menu,
	compAsString: 'u.Menu',
	css: 'u-menu'
});
if (document.readyState && document.readyState === 'complete') {
	_compMgr.compMgr.updateComp();
} else {
	(0, _event.on)(window, 'load', function () {
		//扫描并生成控件
		_compMgr.compMgr.updateComp();
	});
}

exports.Menu = Menu;