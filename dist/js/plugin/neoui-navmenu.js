/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(36);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.BaseComponent = undefined;

	var _class = __webpack_require__(3);

	var _util = __webpack_require__(4);

	var _event = __webpack_require__(5);

	var _compMgr = __webpack_require__(9);

	/**
	 * Module : Sparrow base component
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-28 18:45:08
	 */

	var BaseComponent = _class.Class.create({
	    initialize: function initialize(element) {
	        if ((0, _util.isDomElement)(element)) {
	            this.element = element;
	            this.options = {};
	        } else {
	            this.element = element['el'];
	            this.options = element;
	        }
	        this.element = typeof this.element === 'string' ? document.querySelector(this.element) : this.element;

	        this.compType = this.compType || this.constructor.compType;
	        this.element[this.compType] = this;
	        this.element['init'] = true;
	        this.init();
	    },
	    /**
	     * 绑定事件
	     * @param {String} name
	     * @param {Function} callback
	     */
	    on: function on(name, callback) {
	        name = name.toLowerCase();
	        this._events || (this._events = {});
	        var events = this._events[name] || (this._events[name] = []);
	        events.push({
	            callback: callback
	        });
	        return this;
	    },
	    /**
	     * 触发事件
	     * @param {String} name
	     */
	    trigger: function trigger(name) {
	        name = name.toLowerCase();
	        if (!this._events || !this._events[name]) return this;
	        var args = Array.prototype.slice.call(arguments, 1);
	        var events = this._events[name];
	        for (var i = 0, count = events.length; i < count; i++) {
	            events[i].callback.apply(this, args);
	        }
	        return this;
	    },
	    /**
	     * 初始化
	     */
	    init: function init() {},
	    /**
	     * 渲染控件
	     */
	    render: function render() {},
	    /**
	     * 销毁控件
	     */
	    destroy: function destroy() {
	        delete this.element['comp'];
	        this.element.innerHTML = '';
	    },
	    /**
	     * 增加dom事件
	     * @param {String} name
	     * @param {Function} callback
	     */
	    addDomEvent: function addDomEvent(name, callback) {
	        (0, _event.on)(this.element, name, callback);
	        return this;
	    },
	    /**
	     * 移除dom事件
	     * @param {String} name
	     */
	    removeDomEvent: function removeDomEvent(name, callback) {
	        (0, _event.off)(this.element, name, callback);
	        return this;
	    },
	    setEnable: function setEnable(enable) {
	        return this;
	    },
	    /**
	     * 判断是否为DOM事件
	     */
	    isDomEvent: function isDomEvent(eventName) {
	        if (this.element['on' + eventName] === undefined) return false;else return true;
	    },
	    createDateAdapter: function createDateAdapter(options) {
	        var opt = options['options'],
	            model = options['model'];
	        var Adapter = _compMgr.compMgr.getDataAdapter(this.compType, opt['dataType']);
	        if (Adapter) {
	            this.dataAdapter = new Adapter(this, options);
	        }
	    },
	    Statics: {
	        compName: '',
	        EVENT_VALUE_CHANGE: 'valueChange',
	        getName: function getName() {
	            return this.compName;
	        }
	    }
	});

	function adjustDataType(options) {
	    var types = ['integer', 'float', 'currency', 'percent', 'string', 'textarea'];
	    var _type = options['type'],
	        _dataType = options['dataType'];
	    if (types.indexOf(_type) != -1) {
	        options['dataType'] = _type;
	        options['type'] = 'originText';
	    }
	}

	var BaseComponent = BaseComponent;

	exports.BaseComponent = BaseComponent;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/**
	 * Module : Sparrow class
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-28 08:45:39
	 */

	var Class = function Class(o) {
		if (!(this instanceof Class) && isFunction(o)) {
			return classify(o);
		}
	};

	// Create a new Class.
	//
	//  var SuperPig = Class.create({
	//    Extends: Animal,
	//    Implements: Flyable,
	//    initialize: function() {
	//      SuperPig.superclass.initialize.apply(this, arguments)
	//    },
	//    Statics: {
	//      COLOR: 'red'
	//    }
	// })
	//
	Class.create = function (parent, properties) {
		if (!isFunction(parent)) {
			properties = parent;
			parent = null;
		}

		properties || (properties = {});
		parent || (parent = properties.Extends || Class);
		properties.Extends = parent;

		// The created class constructor
		function SubClass() {
			var ret;
			// Call the parent constructor.
			parent.apply(this, arguments);

			// Only call initialize in self constructor.
			if (this.constructor === SubClass && this.initialize) {
				ret = this.initialize.apply(this, arguments);
			}
			return ret ? ret : this;
		}

		// Inherit class (static) properties from parent.
		if (parent !== Class) {
			mix(SubClass, parent, parent.StaticsWhiteList);
		}

		// Add instance properties to the subclass.
		implement.call(SubClass, properties);

		// Make subclass extendable.
		return classify(SubClass);
	};

	function implement(properties) {
		var key, value;

		for (key in properties) {
			value = properties[key];

			if (Class.Mutators.hasOwnProperty(key)) {
				Class.Mutators[key].call(this, value);
			} else {
				this.prototype[key] = value;
			}
		}
	}

	// Create a sub Class based on `Class`.
	Class.extend = function (properties) {
		properties || (properties = {});
		properties.Extends = this;

		return Class.create(properties);
	};

	function classify(cls) {
		cls.extend = Class.extend;
		cls.implement = implement;
		return cls;
	}

	// Mutators define special properties.
	Class.Mutators = {

		'Extends': function Extends(parent) {
			var existed = this.prototype;
			var proto = createProto(parent.prototype);

			// Keep existed properties.
			mix(proto, existed);

			// Enforce the constructor to be what we expect.
			proto.constructor = this;

			// Set the prototype chain to inherit from `parent`.
			this.prototype = proto;

			// Set a convenience property in case the parent's prototype is
			// needed later.
			this.superclass = parent.prototype;
		},

		'Implements': function Implements(items) {
			isArray(items) || (items = [items]);
			var proto = this.prototype,
			    item;

			while (item = items.shift()) {
				mix(proto, item.prototype || item);
			}
		},

		'Statics': function Statics(staticProperties) {
			mix(this, staticProperties);
		}
	};

	// Shared empty constructor function to aid in prototype-chain creation.
	function Ctor() {}

	// See: http://jsperf.com/object-create-vs-new-ctor
	var createProto = Object.__proto__ ? function (proto) {
		return {
			__proto__: proto
		};
	} : function (proto) {
		Ctor.prototype = proto;
		return new Ctor();
	};

	// Helpers
	// ------------

	function mix(r, s, wl) {
		// Copy "all" properties including inherited ones.
		for (var p in s) {
			if (s.hasOwnProperty(p)) {
				if (wl && indexOf(wl, p) === -1) continue;

				// 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
				if (p !== 'prototype') {
					r[p] = s[p];
				}
			}
		}
	}

	var toString = Object.prototype.toString;

	var isArray = Array.isArray || function (val) {
		return toString.call(val) === '[object Array]';
	};

	var isFunction = function isFunction(val) {
		return toString.call(val) === '[object Function]';
	};

	var indexOf = function indexOf(arr, item) {
		if (Array.prototype.indexOf && arr.indexOf) {
			return arr.indexOf(item);
		} else {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] === item) {
					return i;
				}
			}
			return -1;
		}
	};

	exports.Class = Class;
	exports.isFunction = isFunction;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module : Sparrow util tools
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-27 21:46:50
	 */

	/**
	 * 创建一个带壳的对象,防止外部修改
	 * @param {Object} proto
	 */
	var createShellObject = function createShellObject(proto) {
		var exf = function exf() {};
		exf.prototype = proto;
		return new exf();
	};
	var execIgnoreError = function execIgnoreError(a, b, c) {
		try {
			a.call(b, c);
		} catch (e) {}
	};

	var getFunction = function getFunction(target, val) {
		if (!val || typeof val == 'function') return val;
		if (typeof target[val] == 'function') return target[val];else if (typeof window[val] == 'function') return window[val];else if (val.indexOf('.') != -1) {
			var func = getJSObject(target, val);
			if (typeof func == 'function') return func;
			func = getJSObject(window, val);
			if (typeof func == 'function') return func;
		}
		return val;
	};
	var getJSObject = function getJSObject(target, names) {
		if (!names) {
			return;
		}
		if ((typeof names === 'undefined' ? 'undefined' : _typeof(names)) == 'object') return names;
		var nameArr = names.split('.');
		var obj = target;
		for (var i = 0; i < nameArr.length; i++) {
			obj = obj[nameArr[i]];
			if (!obj) return null;
		}
		return obj;
	};
	var isDate = function isDate(input) {
		return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
	};
	var isNumber = function isNumber(obj) {
		//return obj === +obj
		return obj - parseFloat(obj) + 1 >= 0;
	};
	var isArray = Array.isArray || function (val) {
		return Object.prototype.toString.call(val) === '[object Array]';
	};
	var isEmptyObject = function isEmptyObject(obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	};
	var inArray = function inArray(node, arr) {
		if (!arr instanceof Array) {
			throw "arguments is not Array";
		}
		for (var i = 0, k = arr.length; i < k; i++) {
			if (node == arr[i]) {
				return true;
			}
		}
		return false;
	};
	var isDomElement = function isDomElement(obj) {
		if (window['HTMLElement']) {
			return obj instanceof HTMLElement;
		} else {
			return obj && obj.tagName && obj.nodeType === 1;
		}
	};
	var each = function each(obj, callback) {
		if (obj.forEach) {
			obj.forEach(function (v, k) {
				callback(k, v);
			});
		} else if (obj instanceof Object) {
			for (var k in obj) {
				callback(k, obj[k]);
			}
		} else {
			return;
		}
	};

	NodeList.prototype.forEach = Array.prototype.forEach;

	/**
	 * 获得字符串的字节长度
	 */
	String.prototype.lengthb = function () {
		//	var str = this.replace(/[^\x800-\x10000]/g, "***");
		var str = this.replace(/[^\x00-\xff]/g, "**");
		return str.length;
	};

	/**
	 * 将AFindText全部替换为ARepText
	 */
	String.prototype.replaceAll = function (AFindText, ARepText) {
		//自定义String对象的方法
		var raRegExp = new RegExp(AFindText, "g");
		return this.replace(raRegExp, ARepText);
	};

	var dateFormat = function dateFormat(str) {
		//如果不是string类型  原型返回
		if (typeof str !== 'string') {
			return str;
		}
		//判断 str 格式如果是 yy-mm-dd
		if (str && str.indexOf('-') > -1) {
			//获取当前是否是 ios版本
			var ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				//转换成 yy/mm/dd
				str = str.replace(/-/g, "/");
			}
		}

		return str;
	};

	exports.createShellObject = createShellObject;
	exports.execIgnoreError = execIgnoreError;
	exports.getFunction = getFunction;
	exports.getJSObject = getJSObject;
	exports.isDate = isDate;
	exports.isNumber = isNumber;
	exports.isArray = isArray;
	exports.isEmptyObject = isEmptyObject;
	exports.inArray = inArray;
	exports.isDomElement = isDomElement;
	exports.each = each;
	exports.dateFormat = dateFormat;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.event = exports.stopEvent = exports.trigger = exports.off = exports.on = undefined;

	var _env = __webpack_require__(6);

	var u = {}; /**
	             * Module : Sparrow touch event
	             * Author : Kvkens(yueming@yonyou.com)
	             * Date	  : 2016-07-28 14:41:17
	             */

	u.event = {};

	var touchStartEvent = _env.env.hasTouch ? "touchstart" : "mousedown",
	    touchStopEvent = _env.env.hasTouch ? "touchend" : "mouseup",
	    touchMoveEvent = _env.env.hasTouch ? "touchmove" : "mousemove";

	// tap和taphold
	u.event.tap = {
		tapholdThreshold: 750,
		emitTapOnTaphold: true,
		touchstartFun: function touchstartFun() {
			trigger(this, 'vmousedown');
		},
		touchendFun: function touchendFun() {
			trigger(this, 'vmouseup');
			trigger(this, 'vclick');
		},
		setup: function setup() {
			var thisObject = this,
			    isTaphold = false;

			on(thisObject, "vmousedown", function (event) {
				isTaphold = false;
				if (event.which && event.which !== 1) {
					return false;
				}

				var origTarget = event.target,
				    timer;

				function clearTapTimer() {
					clearTimeout(timer);
				}

				function clearTapHandlers() {
					clearTapTimer();

					off(thisObject, 'vclick');
					off(thisObject, 'vmouseup');
					off(document, 'vmousecancel');
				}

				function clickHandler(event) {
					clearTapHandlers();

					// ONLY trigger a 'tap' event if the start target is
					// the same as the stop target.
					if (!isTaphold && origTarget === event.target) {
						trigger(thisObject, 'tap');
					} else if (isTaphold) {
						event.preventDefault();
					}
				}
				on(thisObject, 'vmouseup', clearTapTimer);
				on(thisObject, 'vclick', clickHandler);
				on(document, 'vmousecancel', clearTapHandlers);

				timer = setTimeout(function () {
					if (!u.event.tap.emitTapOnTaphold) {
						isTaphold = true;
					}
					trigger(thisObject, "taphold");
					clearTapHandlers();
				}, u.event.tap.tapholdThreshold);
			});

			on(thisObject, 'touchstart', u.event.tap.touchstartFun);
			on(thisObject, 'touchend', u.event.tap.touchendFun);
		},
		teardown: function teardown() {
			off(thisObject, 'vmousedown');
			off(thisObject, 'vclick');
			off(thisObject, 'vmouseup');
			off(document, 'vmousecancel');
		}
	};

	u.event.taphold = u.event.tap;

	u.event.swipe = {

		// More than this horizontal displacement, and we will suppress scrolling.
		scrollSupressionThreshold: 30,

		// More time than this, and it isn't a swipe.
		durationThreshold: 1000,

		// Swipe horizontal displacement must be more than this.
		horizontalDistanceThreshold: 30,

		// Swipe vertical displacement must be less than this.
		verticalDistanceThreshold: 30,

		getLocation: function getLocation(event) {
			var winPageX = window.pageXOffset,
			    winPageY = window.pageYOffset,
			    x = event.clientX,
			    y = event.clientY;

			if (event.pageY === 0 && Math.floor(y) > Math.floor(event.pageY) || event.pageX === 0 && Math.floor(x) > Math.floor(event.pageX)) {

				// iOS4 clientX/clientY have the value that should have been
				// in pageX/pageY. While pageX/page/ have the value 0
				x = x - winPageX;
				y = y - winPageY;
			} else if (y < event.pageY - winPageY || x < event.pageX - winPageX) {

				// Some Android browsers have totally bogus values for clientX/Y
				// when scrolling/zooming a page. Detectable since clientX/clientY
				// should never be smaller than pageX/pageY minus page scroll
				x = event.pageX - winPageX;
				y = event.pageY - winPageY;
			}

			return {
				x: x,
				y: y
			};
		},

		start: function start(event) {
			var data = event.touches ? event.touches[0] : event,
			    location = u.event.swipe.getLocation(data);
			return {
				time: new Date().getTime(),
				coords: [location.x, location.y],
				origin: event.target
			};
		},

		stop: function stop(event) {
			var data = event.touches ? event.touches[0] : event,
			    location = u.event.swipe.getLocation(data);
			return {
				time: new Date().getTime(),
				coords: [location.x, location.y]
			};
		},

		handleSwipe: function handleSwipe(start, stop, thisObject, origTarget) {
			if (stop.time - start.time < u.event.swipe.durationThreshold && Math.abs(start.coords[0] - stop.coords[0]) > u.event.swipe.horizontalDistanceThreshold && Math.abs(start.coords[1] - stop.coords[1]) < u.event.swipe.verticalDistanceThreshold) {
				var direction = start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight";

				trigger(thisObject, "swipe");
				trigger(thisObject, direction);
				return true;
			}
			return false;
		},

		// This serves as a flag to ensure that at most one swipe event event is
		// in work at any given time
		eventInProgress: false,

		setup: function setup() {
			var events,
			    thisObject = this,
			    context = {};

			// Retrieve the events data for this element and add the swipe context
			events = thisObject["mobile-events"];
			if (!events) {
				events = {
					length: 0
				};
				thisObject["mobile-events"] = events;
			}
			events.length++;
			events.swipe = context;

			context.start = function (event) {

				// Bail if we're already working on a swipe event
				if (u.event.swipe.eventInProgress) {
					return;
				}
				u.event.swipe.eventInProgress = true;

				var stop,
				    start = u.event.swipe.start(event),
				    origTarget = event.target,
				    emitted = false;

				context.move = function (event) {
					// if ( !start || event.isDefaultPrevented() ) {
					if (!start) {
						return;
					}

					stop = u.event.swipe.stop(event);
					if (!emitted) {
						emitted = u.event.swipe.handleSwipe(start, stop, thisObject, origTarget);
						if (emitted) {

							// Reset the context to make way for the next swipe event
							u.event.swipe.eventInProgress = false;
						}
					}
					// prevent scrolling
					if (Math.abs(start.coords[0] - stop.coords[0]) > u.event.swipe.scrollSupressionThreshold) {
						event.preventDefault();
					}
				};

				context.stop = function () {
					emitted = true;

					// Reset the context to make way for the next swipe event
					u.event.swipe.eventInProgress = false;
					off(document, touchMoveEvent, context.move);
					context.move = null;
				};

				on(document, touchMoveEvent, context.move);
				on(document, touchStopEvent, context.stop);
			};
			on(thisObject, touchStartEvent, context.start);
		},

		teardown: function teardown() {
			var events, context;

			events = thisObject["mobile-events"];
			if (events) {
				context = events.swipe;
				delete events.swipe;
				events.length--;
				if (events.length === 0) {
					thisObject["mobile-events"] = null;
				}
			}

			if (context) {
				if (context.start) {
					off(thisObject, touchStartEvent, context.start);
				}
				if (context.move) {
					off(document, touchMoveEvent, context.move);
				}
				if (context.stop) {
					off(document, touchStopEvent, context.stop);
				}
			}
		}
	};

	u.event.swipeleft = u.event.swipe;

	u.event.swiperight = u.event.swipe;

	var event = u.event;

	var on = function on(element, eventName, child, listener) {
		if (!element) return;
		if (arguments.length < 4) {
			listener = child;
			child = undefined;
		} else {
			var childlistener = function childlistener(e) {
				if (!e) {
					return;
				}
				var tmpchildren = element.querySelectorAll(child);
				tmpchildren.forEach(function (node) {
					if (node == e.target) {
						listener.call(e.target, e);
					}
				});
			};
		}
		//capture = capture || false;

		if (!element["uEvent"]) {
			//在dom上添加记录区
			element["uEvent"] = {};
		}
		//判断是否元素上是否用通过on方法填加进去的事件
		if (!element["uEvent"][eventName]) {
			element["uEvent"][eventName] = [child ? childlistener : listener];
			if (u.event && u.event[eventName] && u.event[eventName].setup) {
				u.event[eventName].setup.call(element);
			}
			element["uEvent"][eventName + 'fn'] = function (e) {
				//火狐下有问题修改判断
				if (!e) e = typeof event != 'undefined' && event ? event : window.event;
				element["uEvent"][eventName].forEach(function (fn) {
					try {
						e.target = e.target || e.srcElement; //兼容IE8
					} catch (e) {}
					if (fn) fn.call(element, e);
				});
			};
			if (element.addEventListener) {
				// 用于支持DOM的浏览器
				element.addEventListener(eventName, element["uEvent"][eventName + 'fn']);
			} else if (element.attachEvent) {
				// 用于IE浏览器
				element.attachEvent("on" + eventName, element["uEvent"][eventName + 'fn']);
			} else {
				// 用于其它浏览器
				element["on" + eventName] = element["uEvent"][eventName + 'fn'];
			}
		} else {
			//如果有就直接往元素的记录区添加事件
			var lis = child ? childlistener : listener;
			var hasLis = false;
			element["uEvent"][eventName].forEach(function (fn) {
				if (fn == lis) {
					hasLis = true;
				}
			});
			if (!hasLis) {
				element["uEvent"][eventName].push(child ? childlistener : listener);
			}
		}
	};

	var off = function off(element, eventName, listener) {
		//删除事件数组
		if (listener) {
			if (element && element["uEvent"] && element["uEvent"][eventName]) {
				element["uEvent"][eventName].forEach(function (fn, i) {
					if (fn == listener) {
						element["uEvent"][eventName].splice(i, 1);
					}
				});
			}
			return;
		}
		var eventfn = element["uEvent"][eventName + 'fn'];
		if (element.removeEventListener) {
			// 用于支持DOM的浏览器
			element.removeEventListener(eventName, eventfn);
		} else if (element.removeEvent) {
			// 用于IE浏览器
			element.removeEvent("on" + eventName, eventfn);
		} else {
			// 用于其它浏览器
			delete element["on" + eventName];
		}
		if (u.event && u.event[eventName] && u.event[eventName].teardown) {
			u.event[eventName].teardown.call(element);
		}
		element["uEvent"][eventName] = undefined;
		element["uEvent"][eventName + 'fn'] = undefined;
	};
	var trigger = function trigger(element, eventName) {
		if (element["uEvent"] && element["uEvent"][eventName]) {
			element["uEvent"][eventName + 'fn']();
		}
	};

	/**
	 * 阻止冒泡
	 */
	var stopEvent = function stopEvent(e) {
		if (typeof e != "undefined") {
			if (e.stopPropagation) e.stopPropagation();else {
				e.cancelBubble = true;
			}
			//阻止默认浏览器动作(W3C)
			if (e && e.preventDefault) e.preventDefault();
			//IE中阻止函数器默认动作的方式
			else window.event.returnValue = false;
		}
	};

	exports.on = on;
	exports.off = off;
	exports.trigger = trigger;
	exports.stopEvent = stopEvent;
	exports.event = event;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.env = undefined;

	var _extend = __webpack_require__(7);

	var u = {}; /**
	             * Module : Sparrow browser environment
	             * Author : Kvkens(yueming@yonyou.com)
	             * Date	  : 2016-07-27 21:46:50
	             */

	(0, _extend.extend)(u, {
		isIE: false,
		isFF: false,
		isOpera: false,
		isChrome: false,
		isSafari: false,
		isWebkit: false,
		isIE8_BEFORE: false,
		isIE8: false,
		isIE8_CORE: false,
		isIE9: false,
		isIE9_CORE: false,
		isIE10: false,
		isIE10_ABOVE: false,
		isIE11: false,
		isIOS: false,
		isIphone: false,
		isIPAD: false,
		isStandard: false,
		version: 0,
		isWin: false,
		isUnix: false,
		isLinux: false,
		isAndroid: false,
		isAndroidPAD: false,
		isAndroidPhone: false,
		isMac: false,
		hasTouch: false,
		isMobile: false
	});

	(function () {
		var userAgent = navigator.userAgent,
		    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
		    rFirefox = /(firefox)\/([\w.]+)/,
		    rOpera = /(opera).+version\/([\w.]+)/,
		    rChrome = /(chrome)\/([\w.]+)/,
		    rSafari = /version\/([\w.]+).*(safari)/,
		    version,
		    ua = userAgent.toLowerCase(),
		    s,
		    browserMatch = {
			browser: "",
			version: ''
		},
		    match = rMsie.exec(ua);

		if (match != null) {
			browserMatch = {
				browser: "IE",
				version: match[2] || "0"
			};
		}
		match = rFirefox.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		match = rOpera.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		match = rChrome.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[1] || "",
				version: match[2] || "0"
			};
		}
		match = rSafari.exec(ua);
		if (match != null) {
			browserMatch = {
				browser: match[2] || "",
				version: match[1] || "0"
			};
		}

		if (s = ua.match(/opera.([\d.]+)/)) {
			u.isOpera = true;
		} else if (browserMatch.browser == "IE" && browserMatch.version == 11) {
			u.isIE11 = true;
			u.isIE = true;
		} else if (s = ua.match(/chrome\/([\d.]+)/)) {
			u.isChrome = true;
			u.isStandard = true;
		} else if (s = ua.match(/version\/([\d.]+).*safari/)) {
			u.isSafari = true;
			u.isStandard = true;
		} else if (s = ua.match(/gecko/)) {
			//add by licza : support XULRunner
			u.isFF = true;
			u.isStandard = true;
		} else if (s = ua.match(/msie ([\d.]+)/)) {
			u.isIE = true;
		} else if (s = ua.match(/firefox\/([\d.]+)/)) {
			u.isFF = true;
			u.isStandard = true;
		}
		if (ua.match(/webkit\/([\d.]+)/)) {
			u.isWebkit = true;
		}
		if (ua.match(/ipad/i)) {
			u.isIOS = true;
			u.isIPAD = true;
			u.isStandard = true;
		}

		if (ua.match(/iphone/i)) {
			u.isIOS = true;
			u.isIphone = true;
		}

		if (navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel") {
			//u.isIOS = true;
			u.isMac = true;
		}

		if (navigator.platform == "Win32" || navigator.platform == "Windows" || navigator.platform == "Win64") {
			u.isWin = true;
		}

		if (navigator.platform == "X11" && !u.isWin && !u.isMac) {
			u.isUnix = true;
		}
		if (String(navigator.platform).indexOf("Linux") > -1) {
			u.isLinux = true;
		}

		if (ua.indexOf('Android') > -1 || ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('adr') > -1) {
			u.isAndroid = true;
		}

		u.version = version ? browserMatch.version ? browserMatch.version : 0 : 0;
		if (u.isAndroid) {
			if (window.screen.width >= 768 && window.screen.width < 1024) {
				u.isAndroidPAD = true;
			}
			if (window.screen.width <= 768) {
				u.isAndroidPhone = true;
			}
		}
		if (u.isIE) {
			var intVersion = parseInt(u.version);
			var mode = document.documentMode;
			if (mode == null) {
				if (intVersion == 6 || intVersion == 7) {
					u.isIE8_BEFORE = true;
				}
			} else {
				if (mode == 7) {
					u.isIE8_BEFORE = true;
				} else if (mode == 8) {
					u.isIE8 = true;
				} else if (mode == 9) {
					u.isIE9 = true;
					u.isSTANDARD = true;
				} else if (mode == 10) {
					u.isIE10 = true;
					u.isSTANDARD = true;
					u.isIE10_ABOVE = true;
				} else {
					u.isSTANDARD = true;
				}
				if (intVersion == 8) {
					u.isIE8_CORE = true;
				} else if (intVersion == 9) {
					u.isIE9_CORE = true;
				} else if (browserMatch.version == 11) {
					u.isIE11 = true;
				}
			}
		}
		if ("ontouchend" in document) {
			u.hasTouch = true;
		}
		if (u.isIphone || u.isAndroidPhone) u.isMobile = true;
	})();

	var env = u;
	exports.env = env;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.extend = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : Sparrow extend
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-07-27 21:46:50
	                                                                                                                                                                                                                                                                               */

	var _enumerables = __webpack_require__(8);

	/**
	 * 复制对象属性
	 *
	 * @param {Object}  目标对象
	 * @param {config} 源对象
	 */
	var extend = function extend(object, config) {
		var args = arguments,
		    options;
		if (args.length > 1) {
			for (var len = 1; len < args.length; len++) {
				options = args[len];
				if (object && options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					var i, j, k;
					for (i in options) {
						object[i] = options[i];
					}
					if (_enumerables.enumerables) {
						for (j = _enumerables.enumerables.length; j--;) {
							k = _enumerables.enumerables[j];
							if (options.hasOwnProperty && options.hasOwnProperty(k)) {
								object[k] = options[k];
							}
						}
					}
				}
			}
		}
		return object;
	};

	exports.extend = extend;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	/**
	 * Module : Sparrow extend enum
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-27 21:46:50
	 */

	var U_LANGUAGES = "i_languages";
	var U_THEME = "u_theme";
	var U_LOCALE = "u_locale";
	var U_USERCODE = "usercode";

	var enumerables = true,
	    enumerablesTest = {
		toString: 1
	},
	    toString = Object.prototype.toString;
	for (var i in enumerablesTest) {
		exports.enumerables = enumerables = null;
	}
	if (enumerables) {
		exports.enumerables = enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
	}

	exports.enumerables = enumerables;
	exports.U_LANGUAGES = U_LANGUAGES;
	exports.U_THEME = U_THEME;
	exports.U_LOCALE = U_LOCALE;
	exports.U_USERCODE = U_USERCODE;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compMgr = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : Sparrow compMgr
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-07-28 18:41:06
	                                                                                                                                                                                                                                                                               * Update : 2016-09-13 09:26:00
	                                                                                                                                                                                                                                                                               */

	var _dom = __webpack_require__(10);

	var _util = __webpack_require__(4);

	function _findRegisteredClass(name, optReplace) {
	    for (var i = 0; i < CompMgr.registeredControls.length; i++) {
	        if (CompMgr.registeredControls[i].className === name) {
	            if (typeof optReplace !== 'undefined') {
	                CompMgr.registeredControls[i] = optReplace;
	            }
	            return CompMgr.registeredControls[i];
	        }
	    }
	    return false;
	}

	function _getUpgradedListOfElement(element) {
	    var dataUpgraded = element.getAttribute('data-upgraded');
	    // Use `['']` as default value to conform the `,name,name...` style.
	    return dataUpgraded === null ? [''] : dataUpgraded.split(',');
	}

	function _isElementUpgraded(element, jsClass) {
	    var upgradedList = _getUpgradedListOfElement(element);
	    return upgradedList.indexOf(jsClass) != -1;
	}

	function _upgradeElement(element, optJsClass) {
	    if (!((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object' && element instanceof Element)) {
	        throw new Error('Invalid argument provided to upgrade MDL element.');
	    }
	    var upgradedList = _getUpgradedListOfElement(element);
	    var classesToUpgrade = [];
	    if (!optJsClass) {
	        var className = element.className;
	        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
	            var component = CompMgr.registeredControls[i];
	            if (className.indexOf(component.cssClass) > -1 && classesToUpgrade.indexOf(component) === -1 && !_isElementUpgraded(element, component.className)) {
	                classesToUpgrade.push(component);
	            }
	        }
	    } else if (!_isElementUpgraded(element, optJsClass)) {
	        classesToUpgrade.push(_findRegisteredClass(optJsClass));
	    }

	    // Upgrade the element for each classes.
	    for (var i = 0, n = classesToUpgrade.length, registeredClass; i < n; i++) {
	        registeredClass = classesToUpgrade[i];
	        if (registeredClass) {
	            if (element[registeredClass.className]) {
	                continue;
	            }
	            // Mark element as upgraded.
	            upgradedList.push(registeredClass.className);
	            element.setAttribute('data-upgraded', upgradedList.join(','));
	            var instance = new registeredClass.classConstructor(element);
	            CompMgr.createdControls.push(instance);
	            // Call any callbacks the user has registered with this component type.
	            for (var j = 0, m = registeredClass.callbacks.length; j < m; j++) {
	                registeredClass.callbacks[j](element);
	            }
	            element[registeredClass.className] = instance;
	        } else {
	            throw new Error('Unable to find a registered component for the given class.');
	        }
	    }
	}

	function _upgradeDomInternal(optJsClass, optCssClass, ele) {
	    if (typeof optJsClass === 'undefined' && typeof optCssClass === 'undefined') {
	        for (var i = 0; i < CompMgr.registeredControls.length; i++) {
	            _upgradeDomInternal(CompMgr.registeredControls[i].className, registeredControls[i].cssClass, ele);
	        }
	    } else {
	        var jsClass = optJsClass;
	        if (!optCssClass) {
	            var registeredClass = _findRegisteredClass(jsClass);
	            if (registeredClass) {
	                optCssClass = registeredClass.cssClass;
	            }
	        }
	        var elements;
	        if (ele) {
	            elements = (0, _dom.hasClass)(ele, optCssClass) ? [ele] : ele.querySelectorAll('.' + optCssClass);
	        } else {
	            elements = document.querySelectorAll('.' + optCssClass);
	        }
	        for (var n = 0; n < elements.length; n++) {
	            _upgradeElement(elements[n], jsClass);
	        }
	    }
	}

	var CompMgr = {
	    plugs: {},
	    dataAdapters: {},
	    /** 注册的控件*/
	    registeredControls: [],
	    createdControls: [],
	    /**
	     *
	     * @param options  {el:'#content', model:{}}
	     */
	    apply: function apply(options) {
	        if (options) {
	            var _el = options.el || document.body;
	            var model = options.model;
	        }
	        if (typeof _el == 'string') {
	            _el = document.body.querySelector(_el);
	        }
	        if (_el == null || (typeof _el === 'undefined' ? 'undefined' : _typeof(_el)) != 'object') _el = document.body;
	        var comps = _el.querySelectorAll('[u-meta]');
	        comps.forEach(function (element) {
	            if (element['comp']) return;
	            var options = JSON.parse(element.getAttribute('u-meta'));
	            if (options && options['type']) {
	                //var comp = CompMgr._createComp({el:element,options:options,model:model});
	                var comp = CompMgr.createDataAdapter({
	                    el: element,
	                    options: options,
	                    model: model
	                });
	                if (comp) {
	                    element['adpt'] = comp;
	                    element['u-meta'] = comp;
	                }
	            }
	        });
	    },
	    addPlug: function addPlug(config) {
	        var plug = config['plug'],
	            name = config['name'];
	        this.plugs || (this.plugs = {});
	        if (this.plugs[name]) {
	            throw new Error('plug has exist:' + name);
	        }
	        plug.compType = name;
	        this.plugs[name] = plug;
	    },
	    addDataAdapter: function addDataAdapter(config) {
	        var adapter = config['adapter'],
	            name = config['name'];
	        //dataType = config['dataType'] || ''
	        //var key = dataType ? name + '.' + dataType : name;
	        this.dataAdapters || (dataAdapters = {});
	        if (this.dataAdapters[name]) {
	            throw new Error('dataAdapter has exist:' + name);
	        }
	        this.dataAdapters[name] = adapter;
	    },
	    getDataAdapter: function getDataAdapter(name) {
	        if (!name) return;
	        this.dataAdapters || (dataAdapters = {});
	        //var key = dataType ? name + '.' + dataType : name;
	        return this.dataAdapters[name];
	    },
	    createDataAdapter: function createDataAdapter(options) {
	        var opt = options['options'];
	        var type = opt['type'],
	            id = opt['id'];
	        var adpt = this.dataAdapters[type];
	        if (!adpt) return null;
	        var comp = new adpt(options);
	        comp.type = type;
	        comp.id = id;
	        return comp;
	    },
	    _createComp: function _createComp(options) {
	        var opt = options['options'];
	        var type = opt['type'];
	        var plug = this.plugs[type];
	        if (!plug) return null;
	        var comp = new plug(options);
	        comp.type = type;
	        return comp;
	    },
	    /**
	     * 注册UI控件
	     */
	    regComp: function regComp(config) {
	        var newConfig = {
	            classConstructor: config.comp,
	            className: config.compAsString || config['compAsString'],
	            cssClass: config.css || config['css'],
	            callbacks: [],
	            dependencies: config.dependencies || []
	        };
	        config.comp.prototype.compType = config.compAsString;
	        for (var i = 0; i < this.registeredControls.length; i++) {
	            var item = this.registeredControls[i];
	            //registeredControls.forEach(function(item) {
	            if (item.cssClass === newConfig.cssClass) {
	                throw new Error('The provided cssClass has already been registered: ' + item.cssClass);
	            }
	            if (item.className === newConfig.className) {
	                throw new Error('The provided className has already been registered');
	            }
	        };
	        this.registeredControls.push(newConfig);
	    },

	    updateComp: function updateComp(ele) {
	        this._reorderComps();
	        for (var n = 0; n < this.registeredControls.length; n++) {
	            _upgradeDomInternal(this.registeredControls[n].className, null, ele);
	        }
	    },
	    // 后续遍历registeredControls，重新排列
	    _reorderComps: function _reorderComps() {
	        var tmpArray = [];
	        var dictory = {};

	        for (var n = 0; n < this.registeredControls.length; n++) {
	            dictory[this.registeredControls[n].className] = this.registeredControls[n];
	        }
	        for (var n = 0; n < this.registeredControls.length; n++) {
	            traverse(this.registeredControls[n]);
	        }

	        this.registeredControls = tmpArray;

	        function traverse(control) {
	            if ((0, _util.inArray)(control, tmpArray)) return;
	            if (control.dependencies.length > 0) {
	                for (var i = 0, len = control.dependencies.length; i < len; i++) {
	                    var childControl = dictory[control.dependencies[i]];
	                    traverse(childControl);
	                }
	            }
	            tmpArray.push(control);
	        }
	    }
	};

	var compMgr = CompMgr;
	exports.compMgr = compMgr;

	///**
	// * 加载控件
	// */
	//
	//if (document.readyState && document.readyState === 'complete'){
	//    compMgr.updateComp();
	//}else{
	//    on(window, 'load', function() {
	//
	//        //扫描并生成控件
	//        compMgr.updateComp();
	//    });
	//}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.getElementTop = exports.getElementLeft = exports.showPanelByEle = exports.getScroll = exports.getOffset = exports.makeModal = exports.makeDOM = exports.getZIndex = exports.getStyle = exports.wrap = exports.css = exports.closest = exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = undefined;

	var _event = __webpack_require__(5);

	/**
	 * 元素增加指定样式
	 * @param value
	 * @returns {*}
	 */
	var addClass = function addClass(element, value) {
		if (element) {
			if (typeof element.classList === 'undefined') {
				if (u._addClass) u._addClass(element, value);
			} else {
				element.classList.add(value);
			}
		}

		return this;
	};
	/**
	 * 删除元素上指定样式
	 * @param {Object} element
	 * @param {Object} value
	 */
	/**
	 * Module : Sparrow dom
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-16 13:59:17
	 */
	var removeClass = function removeClass(element, value) {
		if (element) {
			if (typeof element.classList === 'undefined') {
				if (u._removeClass) u._removeClass(element, value);
			} else {
				element.classList.remove(value);
			}
		}
		return this;
	};
	/**
	 * 元素上是否存在该类
	 * @param {Object} element
	 * @param {Object} value
	 */
	var hasClass = function hasClass(element, value) {
		if (!element) return false;
		if (element.nodeName && (element.nodeName === '#text' || element.nodeName === '#comment')) return false;
		if (typeof element.classList === 'undefined') {
			if (u._hasClass) return u._hasClass(element, value);
			return false;
		} else {
			return element.classList.contains(value);
		}
	};
	/**
	 * 选择元素类切换
	 * @param {Object} element
	 * @param {Object} value
	 */
	var toggleClass = function toggleClass(element, value) {
		if (typeof element.classList === 'undefined') {
			return u._toggleClass(element, value);
		} else {
			return element.classList.toggle(value);
		}
	};

	/**
	 * 向上查找指定类元素
	 * @param {Object} element
	 * @param {Object} selector
	 */
	var closest = function closest(element, selector) {
		var tmp = element;
		while (tmp != null && !hasClass(tmp, selector) && tmp != document.body) {
			tmp = tmp.parentNode;
		}
		if (tmp == document.body) return null;
		return tmp;
	};

	/**
	 * 元素CSS操作
	 * @param {Object} element
	 * @param {Object} csstext
	 * @param {Object} val
	 */
	var css = function css(element, csstext, val) {
		//TO DO : 实现u.相关方法
		if (csstext instanceof Object) {
			for (var k in csstext) {
				var tmpcss = csstext[k];
				if (["width", "height", "top", "bottom", "left", "right"].indexOf(k) > -1 && isNumber(tmpcss)) {
					tmpcss = tmpcss + "px";
				}
				element.style[k] = tmpcss;
			}
		} else {
			if (arguments.length > 2) {
				element.style[csstext] = val;
			} else {
				return getStyle(element, csstext);
			}
		}
	};

	var wrap = function wrap(element, parent) {
		var p = makeDOM(parent);
		element.parentNode.insertBefore(p, element);
		p.appendChild(element);
	};
	var getStyle = function getStyle(element, key) {
		//不要在循环里用
		var allCSS;
		if (window.getComputedStyle) {
			allCSS = window.getComputedStyle(element);
		} else {
			allCSS = element.currentStyle;
		}
		if (allCSS[key] !== undefined) {
			return allCSS[key];
		} else {
			return "";
		}
	};
	var globalZIndex;
	/**
	 * 统一zindex值, 不同控件每次显示时都取最大的zindex，防止显示错乱
	 */
	var getZIndex = function getZIndex() {
		if (!globalZIndex) {
			globalZIndex = 2000;
		}
		return globalZIndex++;
	};
	var makeDOM = function makeDOM(htmlString) {
		var tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlString;
		var _dom = tempDiv.children[0];
		return _dom;
	};
	/**
	 * element
	 */
	var makeModal = function makeModal(element, parEle) {
		var overlayDiv = document.createElement('div');
		addClass(overlayDiv, 'u-overlay');
		overlayDiv.style.zIndex = getZIndex();
		// 如果有父元素则插入到父元素上，没有则添加到body上
		if (parEle && parEle != document.body) {
			addClass(overlayDiv, 'hasPar');
			parEle.appendChild(overlayDiv);
		} else {
			document.body.appendChild(overlayDiv);
		}

		element.style.zIndex = getZIndex();
		(0, _event.on)(overlayDiv, 'click', function (e) {
			(0, _event.stopEvent)(e);
		});
		return overlayDiv;
	};

	var getOffset = function getOffset(Node, offset) {
		if (!offset) {
			offset = {};
			offset.top = 0;
			offset.left = 0;
		}
		if (Node == document.body) {
			return offset;
		}
		offset.top += Node.offsetTop;
		offset.left += Node.offsetLeft;
		if (Node.offsetParent) return getOffset(Node.offsetParent, offset);else return offset;
	};
	var getScroll = function getScroll(Node, offset) {
		if (!offset) {
			offset = {};
			offset.top = 0;
			offset.left = 0;
		}
		if (Node == document.body) {
			offset.top += Node.scrollTop || document.documentElement.scrollTop;
			offset.left += Node.scrollLeft || document.documentElement.scrollLeft;
			return offset;
		}
		if (Node.tagName != 'INPUT') {
			offset.top += Node.scrollTop;
			offset.left += Node.scrollLeft;
		}

		if (Node.parentNode) return getScroll(Node.parentNode, offset);else return offset;
	};
	var showPanelByEle = function showPanelByEle(obj) {
		var ele = obj.ele,
		    panel = obj.panel,
		    position = obj.position,

		// off = u.getOffset(ele),scroll = u.getScroll(ele),
		// offLeft = off.left,offTop = off.top,
		// scrollLeft = scroll.left,scrollTop = scroll.top,
		// eleWidth = ele.offsetWidth,eleHeight = ele.offsetHeight,
		// panelWidth = panel.offsetWidth,panelHeight = panel.offsetHeight,
		bodyWidth = document.body.clientWidth,
		    bodyHeight = document.body.clientHeight,
		    position = position || 'top',

		// left = offLeft - scrollLeft,top = offTop - scrollTop,
		eleRect = obj.ele.getBoundingClientRect(),
		    panelRect = obj.panel.getBoundingClientRect(),
		    eleWidth = eleRect.width || 0,
		    eleHeight = eleRect.height || 0,
		    left = eleRect.left || 0,
		    top = eleRect.top || 0,
		    panelWidth = panelRect.width || 0,
		    panelHeight = panelRect.height || 0,
		    docWidth = document.documentElement.clientWidth,
		    docHeight = document.documentElement.clientHeight;

		// 基准点为Ele的左上角
		// 后续根据需要完善
		if (position == 'left') {
			left = left - panelWidth;
			top = top + (eleHeight - panelHeight) / 2;
		} else if (position == 'right') {
			left = left + eleWidth;
			top = top + (eleHeight - panelHeight) / 2;
		} else if (position == 'top' || position == 'topCenter') {
			left = left + (eleWidth - panelWidth) / 2;
			top = top - panelHeight;
		} else if (position == 'bottom' || position == 'bottomCenter') {
			left = left + (eleWidth - panelWidth) / 2;
			top = top + eleHeight;
		} else if (position == 'bottomLeft') {
			left = left;
			top = top + eleHeight;
		}

		if (left + panelWidth > docWidth) left = docWidth - panelWidth - 10;
		if (left < 0) left = 0;

		if (top + panelHeight > docHeight) {
			top = docHeight - panelHeight - 10;
		}

		if (top < 0) top = 0;
		panel.style.left = left + 'px';
		panel.style.top = top + 'px';
	};

	var getElementLeft = function getElementLeft(element) {
		var actualLeft = element.offsetLeft;
		var current = element.offsetParent;
		while (current !== null) {
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}
		if (document.compatMode == "BackCompat") {
			var elementScrollLeft = document.body.scrollLeft;
		} else {
			var elementScrollLeft = document.documentElement.scrollLeft;
		}
		return actualLeft - elementScrollLeft;
	};
	var getElementTop = function getElementTop(element) {
		var actualTop = element.offsetTop;
		var current = element.offsetParent;
		while (current !== null) {
			actualTop += current.offsetTop;
			current = current.offsetParent;
		}
		if (document.compatMode == "BackCompat") {
			var elementScrollTop = document.body.scrollTop;
		} else {
			var elementScrollTop = document.documentElement.scrollTop;
		}
		return actualTop - elementScrollTop;
	};
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.hasClass = hasClass;
	exports.toggleClass = toggleClass;
	exports.closest = closest;
	exports.css = css;
	exports.wrap = wrap;
	exports.getStyle = getStyle;
	exports.getZIndex = getZIndex;
	exports.makeDOM = makeDOM;
	exports.makeModal = makeModal;
	exports.getOffset = getOffset;
	exports.getScroll = getScroll;
	exports.showPanelByEle = showPanelByEle;
	exports.getElementLeft = getElementLeft;
	exports.getElementTop = getElementTop;

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.URipple = exports.Ripple = undefined;

	var _env = __webpack_require__(6);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var URipple = function URipple(element) {
	  if (_env.env.isIE8) return;
	  this._element = element;

	  // Initialize instance.
	  this.init();
	};
	//window['URipple'] = URipple;

	/**
	 * Module : Sparrow ripple
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 08:42:13
	 */

	URipple.prototype._down = function (event) {
	  if (_env.env.isIE8) return;
	  if (!this._rippleElement.style.width && !this._rippleElement.style.height) {
	    var rect = this._element.getBoundingClientRect();
	    this.rippleSize_ = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 2 + 2;
	    if (this.rippleSize_ > 0) {
	      this._rippleElement.style.width = this.rippleSize_ + 'px';
	      this._rippleElement.style.height = this.rippleSize_ + 'px';
	    }
	  }

	  (0, _dom.addClass)(this._rippleElement, 'is-visible');

	  if (event.type === 'mousedown' && this._ignoringMouseDown) {
	    this._ignoringMouseDown = false;
	  } else {
	    if (event.type === 'touchstart') {
	      this._ignoringMouseDown = true;
	    }
	    var frameCount = this.getFrameCount();
	    if (frameCount > 0) {
	      return;
	    }
	    this.setFrameCount(1);
	    var t = event.currentTarget || event.target || event.srcElement;
	    var bound = t.getBoundingClientRect();
	    var x;
	    var y;
	    // Check if we are handling a keyboard click.
	    if (event.clientX === 0 && event.clientY === 0) {
	      x = Math.round(bound.width / 2);
	      y = Math.round(bound.height / 2);
	    } else {
	      var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
	      var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
	      x = Math.round(clientX - bound.left);
	      y = Math.round(clientY - bound.top);
	    }
	    this.setRippleXY(x, y);
	    this.setRippleStyles(true);
	    if (window.requestAnimationFrame) window.requestAnimationFrame(this.animFrameHandler.bind(this));
	  }
	};

	/**
	 * Handle mouse / finger up on element.
	 *
	 * @param {Event} event The event that fired.
	 * @private
	 */
	URipple.prototype._up = function (event) {
	  if (_env.env.isIE8) return;
	  var self = this;
	  // Don't fire for the artificial "mouseup" generated by a double-click.
	  if (event && event.detail !== 2) {
	    (0, _dom.removeClass)(this._rippleElement, 'is-visible');
	  }
	  // Allow a repaint to occur before removing this class, so the animation
	  // shows for tap events, which seem to trigger a mouseup too soon after
	  // mousedown.
	  window.setTimeout(function () {
	    (0, _dom.removeClass)(self._rippleElement, 'is-visible');
	  }, 0);
	};

	/**
	     * Getter for frameCount_.
	     * @return {number} the frame count.
	     */
	URipple.prototype.getFrameCount = function () {
	  if (_env.env.isIE8) return;
	  return this.frameCount_;
	};
	/**
	     * Setter for frameCount_.
	     * @param {number} fC the frame count.
	     */
	URipple.prototype.setFrameCount = function (fC) {
	  if (_env.env.isIE8) return;
	  this.frameCount_ = fC;
	};

	/**
	     * Getter for _rippleElement.
	     * @return {Element} the ripple element.
	     */
	URipple.prototype.getRippleElement = function () {
	  if (_env.env.isIE8) return;
	  return this._rippleElement;
	};

	/**
	 * Sets the ripple X and Y coordinates.
	 * @param  {number} newX the new X coordinate
	 * @param  {number} newY the new Y coordinate
	 */
	URipple.prototype.setRippleXY = function (newX, newY) {
	  if (_env.env.isIE8) return;
	  this.x_ = newX;
	  this.y_ = newY;
	};

	/**
	 * Sets the ripple styles.
	 * @param  {boolean} start whether or not this is the start frame.
	 */
	URipple.prototype.setRippleStyles = function (start) {
	  if (_env.env.isIE8) return;
	  if (this._rippleElement !== null) {
	    var transformString;
	    var scale;
	    var size;
	    var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';

	    if (start) {
	      scale = 'scale(0.0001, 0.0001)';
	      size = '1px';
	    } else {
	      scale = '';
	      size = this.rippleSize_ + 'px';
	    }

	    transformString = 'translate(-50%, -50%) ' + offset + scale;

	    this._rippleElement.style.webkitTransform = transformString;
	    this._rippleElement.style.msTransform = transformString;
	    this._rippleElement.style.transform = transformString;

	    if (start) {
	      (0, _dom.removeClass)(this._rippleElement, 'is-animating');
	    } else {
	      (0, _dom.addClass)(this._rippleElement, 'is-animating');
	    }
	  }
	};

	/**
	   * Handles an animation frame.
	   */
	URipple.prototype.animFrameHandler = function () {
	  if (_env.env.isIE8) return;
	  if (this.frameCount_-- > 0) {
	    window.requestAnimationFrame(this.animFrameHandler.bind(this));
	  } else {
	    this.setRippleStyles(false);
	  }
	};

	/**
	 * Initialize element.
	 */
	URipple.prototype.init = function () {
	  if (_env.env.isIE8) return;
	  var self = this;
	  if (this._element) {
	    this._rippleElement = this._element.querySelector('.u-ripple');
	    if (!this._rippleElement) {
	      this._rippleElement = document.createElement('span');
	      (0, _dom.addClass)(this._rippleElement, 'u-ripple');
	      this._element.appendChild(this._rippleElement);
	      this._element.style.overflow = 'hidden';
	      this._element.style.position = 'relative';
	    }
	    this.frameCount_ = 0;
	    this.rippleSize_ = 0;
	    this.x_ = 0;
	    this.y_ = 0;

	    // Touch start produces a compat mouse down event, which would cause a
	    // second ripples. To avoid that, we use this property to ignore the first
	    // mouse down after a touch start.
	    this._ignoringMouseDown = false;
	    (0, _event.on)(this._element, 'mousedown', function (e) {
	      self._down(e);
	    });
	    (0, _event.on)(this._element, 'touchstart', function (e) {
	      self._down(e);
	    });

	    (0, _event.on)(this._element, 'mouseup', function (e) {
	      self._up(e);
	    });
	    (0, _event.on)(this._element, 'mouseleave', function (e) {
	      self._up(e);
	    });
	    (0, _event.on)(this._element, 'touchend', function (e) {
	      self._up(e);
	    });
	    (0, _event.on)(this._element, 'blur', function (e) {
	      self._up(e);
	    });
	  }
	};

	var Ripple = URipple;

	exports.Ripple = Ripple;
	exports.URipple = URipple;

/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.NavMenu = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _extend = __webpack_require__(7);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _ripple = __webpack_require__(13);

	var _compMgr = __webpack_require__(9);

	/**
	 * Module : neoui-navmenu
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-03 08:45:49
	 */

	var NavMenu = _BaseComponent.BaseComponent.extend({
		_Constant: {},
		_CssClasses: {
			NAV: 'u-navmenu',
			NAV_LINK: 'u-navmenu-link',
			NAV_LINK_CURRENT: 'u-navmenu-link-current',
			NAV_LINK_OPEN: 'u-navmenu-link-open',
			NAV_SUB: 'u-navmenu-sub'
		},
		init: function init() {

			if ((0, _dom.hasClass)(this.element, 'u-navmenu-horizontal')) {
				(0, _event.on)(this.element, 'click', this._horNavlinkClickHander.bind(this));
			} else {
				(0, _event.on)(this.element, 'click', this._navlinkClickHander.bind(this));
			}

			var items = this.element.querySelectorAll('.' + this._CssClasses.NAV_LINK);
			for (var i = 0; i < items.length; i++) {
				new _ripple.Ripple(items[i]);
			}
		},
		_horNavlinkClickHander: function _horNavlinkClickHander(e) {
			var item = (0, _dom.closest)(e.target, this._CssClasses.NAV_LINK);

			if (item) {
				var curlink = this.element.querySelector('.' + this._CssClasses.NAV_LINK_CURRENT);
				curlink && (0, _dom.removeClass)(curlink, this._CssClasses.NAV_LINK_CURRENT);
				(0, _dom.addClass)(item, this._CssClasses.NAV_LINK_CURRENT);
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
					if (env.isIE8) sub.style.maxHeight = 0;
				}
				if (sub && !open) {
					(0, _dom.addClass)(item, this._CssClasses.NAV_LINK_OPEN);
					if (env.isIE8) sub.style.maxHeight = '999px';
				}
				// sub && open && removeClass(item, this._CssClasses.NAV_LINK_OPEN);
				// sub && !open && addClass(item, this._CssClasses.NAV_LINK_OPEN);
			}
		}
	});

	_compMgr.compMgr.regComp({
		comp: NavMenu,
		compAsString: 'u.NavMenu',
		css: 'u-navmenu'
	});

	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.NavMenu = NavMenu;

/***/ }
/******/ ]);