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

	module.exports = __webpack_require__(24);


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
/* 13 */,
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.doValidate = exports.validate = exports.Validate = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : neoui-validate
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-08-06 14:03:15
	                                                                                                                                                                                                                                                                               */


	var _BaseComponent = __webpack_require__(2);

	var _extend = __webpack_require__(7);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _util = __webpack_require__(4);

	var _neouiTooltip = __webpack_require__(25);

	var _i18n = __webpack_require__(26);

	var _compMgr = __webpack_require__(9);

	var Validate = _BaseComponent.BaseComponent.extend({

	    init: function init() {
	        var self = this;
	        this.$element = this.element;
	        this.$form = this.form;
	        this.referDom = this.$element;
	        if (this.referDom.tagName !== 'INPUT' && this.referDom.tagName !== "TEXTAREA") {
	            this.referDom = this.$element.querySelector('input');
	            // 如果referDom的父元素不是this.$element说明时单选框、复选框。则referDom还为$element
	            if (!this.referDom || this.referDom.parentNode !== this.$element) {
	                this.referDom = this.$element;
	            }
	        }
	        this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options, JSON.parse(this.element.getAttribute('uvalidate')));
	        this.required = false;
	        this.timeout = null;
	        this.tipAliveTime = this.options['tipAliveTime'] === undefined ? 3000 : this.options['tipAliveTime'];
	        //所有属性优先级 ：  options参数  > attr属性  > 默认值
	        this.required = this.options['required'] ? this.options['required'] : false;
	        this.validType = this.options['validType'] ? this.options['validType'] : null;
	        //校验模式  blur  submit
	        this.validMode = this.options['validMode'] ? this.options['validMode'] : Validate.DEFAULTS.validMode;
	        //空提示
	        this.nullMsg = this.options['nullMsg'] ? this.options['nullMsg'] : Validate.NULLMSG[this.validType];
	        //是否必填
	        if (this.required && !this.nullMsg) this.nullMsg = Validate.NULLMSG['required'];
	        //错误必填
	        this.errorMsg = this.options['errorMsg'] ? this.options['errorMsg'] : Validate.ERRORMSG[this.validType];
	        //正则校验
	        this.regExp = this.options['reg'] ? this.options['reg'] : Validate.REG[this.validType];
	        try {
	            if (typeof this.regExp == 'string') this.regExp = eval(this.regExp);
	        } catch (e) {}

	        this.notipFlag = this.options['notipFlag']; // 错误信息提示方式是否为tip，默认为false
	        this.hasSuccess = this.options['hasSuccess']; //是否含有正确提示

	        this.showFix = this.options['showFix'];

	        //提示div的id 为空时使用tooltop来提示
	        this.tipId = this.options['tipId'] ? this.options['tipId'] : null;
	        //校验成功提示信息的div
	        this.successId = this.options['successId'] ? this.options['successId'] : null;

	        // 要求显示成功提示，并没有成功提示dom的id时，则创建成功提示dom
	        if (this.hasSuccess && !this.successId) {
	            this.successId = (0, _dom.makeDOM)('<span class="u-form-control-success uf uf-checkedsymbol" ></span>');

	            if (this.referDom.nextSibling) {
	                this.referDom.parentNode.insertBefore(this.successId, this.referDom.nextSibling);
	            } else {
	                this.referDom.parentNode.appendChild(this.successId);
	            }
	        }
	        //不是默认的tip提示方式并且tipId没有定义时创建默认tipid
	        if (this.notipFlag && !this.tipId) {
	            this.tipId = (0, _dom.makeDOM)('<span class="u-form-control-info uf uf-exclamationsign "></span>');
	            this.referDom.parentNode.appendChild(this.tipId);

	            if (this.referDom.nextSibling) {
	                this.referDom.parentNode.insertBefore(this.tipId, this.referDom.nextSibling);
	            } else {
	                this.referDom.parentNode.appendChild(this.tipId);
	            }
	        }
	        //提示框位置
	        this.placement = this.options['placement'] ? this.options['placement'] : Validate.DEFAULTS.placement;
	        //
	        this.minLength = this.options['minLength'] > 0 ? this.options['minLength'] : null;
	        this.maxLength = this.options['maxLength'] > 0 ? this.options['maxLength'] : null;
	        this.min = this.options['min'] !== undefined ? this.options['min'] : null;
	        this.max = this.options['max'] !== undefined ? this.options['max'] : null;
	        this.minNotEq = this.options['minNotEq'] !== undefined ? this.options['minNotEq'] : null;
	        this.maxNotEq = this.options['maxNotEq'] !== undefined ? this.options['maxNotEq'] : null;
	        this.min = (0, _util.isNumber)(this.min) ? this.min : null;
	        this.max = (0, _util.isNumber)(this.max) ? this.max : null;
	        this.minNotEq = (0, _util.isNumber)(this.minNotEq) ? this.minNotEq : null;
	        this.maxNotEq = (0, _util.isNumber)(this.maxNotEq) ? this.maxNotEq : null;
	        this.create();
	    }
	});

	Validate.fn = Validate.prototype;
	//Validate.tipTemplate = '<div class="tooltip" role="tooltip"><div class="tooltip-arrow tooltip-arrow-c"></div><div class="tooltip-arrow"></div><div class="tooltip-inner" style="color:#ed7103;border:1px solid #ed7103;background-color:#fff7f0;"></div></div>'

	Validate.DEFAULTS = {
	    validMode: 'blur',
	    placement: "top"
	};

	Validate.NULLMSG = {
	    "required": (0, _i18n.trans)('validate.required', "不能为空！"),
	    "integer": (0, _i18n.trans)('validate.integer', "请填写整数！"),
	    "float": (0, _i18n.trans)('validate.float', "请填写数字！"),
	    "zipCode": (0, _i18n.trans)('validate.zipCode', "请填写邮政编码！"),
	    "phone": (0, _i18n.trans)('validate.phone', "请填写手机号码！"),
	    "landline": (0, _i18n.trans)('validate.landline', "请填写座机号码！"),
	    "email": (0, _i18n.trans)('validate.email', "请填写邮箱地址！"),
	    "url": (0, _i18n.trans)('validate.url', "请填写网址！"),
	    "datetime": (0, _i18n.trans)('validate.datetime', "请填写日期！"),
	    "phoneNumber": (0, _i18n.trans)('validate.phoneNumber', "请填写正确号码！")

	};

	Validate.ERRORMSG = {
	    "integer": (0, _i18n.trans)('validate.error_integer', "整数格式不对！"),
	    "float": (0, _i18n.trans)('validate.error_float', "数字格式不对！"),
	    "zipCode": (0, _i18n.trans)('validate.error_zipCode', "邮政编码格式不对！"),
	    "phone": (0, _i18n.trans)('validate.error_phone', "手机号码格式不对！"),
	    "landline": (0, _i18n.trans)('validate.error_landline', "座机号码格式不对！"),
	    "email": (0, _i18n.trans)('validate.error_email', "邮箱地址格式不对！"),
	    "url": (0, _i18n.trans)('validate.error_url', "网址格式不对！"),
	    "datetime": (0, _i18n.trans)('validate.error_datetime', "日期格式不对！"),
	    "phoneNumber": (0, _i18n.trans)('validate.error_phoneNumber', "号码格式不对！")
	};

	Validate.REG = {
	    "integer": /^-?\d+$/,
	    "float": /^-?\d+(\.\d+)?$/,
	    "zipCode": /^[0-9]{6}$/,
	    // "phone": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
	    "phone": /^1[3|4|5|7|8]\d{9}$/,
	    "landline": /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
	    "email": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	    "url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
	    "datetime": /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/,
	    "PhoneNumber": /^\d+$/
	};

	Validate.fn.create = function () {
	    if ($(this.element).attr('hasValidate')) {
	        return;
	    }
	    var self = this;
	    (0, _event.on)(this.element, 'blur', function (e) {
	        if (self.validMode == 'blur') {
	            self.passed = self.doValid();
	        }
	    });
	    (0, _event.on)(this.element, 'focus', function (e) {
	        //隐藏错误信息
	        self.hideMsg();
	    });
	    (0, _event.on)(this.element, 'change', function (e) {
	        //隐藏错误信息
	        self.hideMsg();
	    });
	    (0, _event.on)(this.element, 'keydown', function (e) {
	        var event = window.event || e;
	        if (self["validType"] == "float") {
	            var tmp = self.element.value;
	            if (event.shiftKey) {
	                event.returnValue = false;
	                return false;
	            } else if (event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46) {
	                // tab键 左箭头 右箭头 delete键
	                return true;
	            } else if (event.ctrlKey && (event.keyCode == 67 || event.keyCode == 86)) {
	                //复制粘贴
	                return true;
	            } else if (!(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 96 && event.keyCode <= 105 || (0, _util.inArray)(event.keyCode, [8, 110, 190, 189, 109]) > -1)) {
	                event.returnValue = false;
	                return false;
	            } else if ((!tmp || tmp.indexOf(".") > -1) && (event.keyCode == 190 || event.keyCode == 110)) {
	                event.returnValue = false;
	                return false;
	            }

	            if (tmp && (tmp + '').split('.')[0].length >= 25) {
	                return false;
	            }
	        }
	        if (self["validType"] == "integer") {
	            var tmp = self.element.value;

	            if (event.shiftKey) {
	                event.returnValue = false;
	                return false;
	            } else if (event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46) {
	                // tab键 左箭头 右箭头 delete键
	                return true;
	            } else if (event.ctrlKey && (event.keyCode == 67 || event.keyCode == 86)) {
	                //复制粘贴
	                return true;
	            } else if (!(event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 96 && event.keyCode <= 105 || (0, _util.inArray)(event.keyCode, [8, 109, 189]) > -1)) {
	                event.returnValue = false;
	                return false;
	            }

	            if (tmp && (tmp + '').split('.')[0].length >= 25) {
	                return false;
	            }
	        }
	    });

	    $(this.element).attr('hasValidate', true);
	};

	Validate.fn.updateOptions = function (options) {};

	Validate.fn.doValid = function (options) {
	    var self = this;
	    var pValue;
	    this.showMsgFlag = true;
	    if (options) {
	        pValue = options.pValue;
	        this.showMsgFlag = options.showMsg;
	    }
	    this.needClean = false;
	    //只读的也需要校验，所以注释
	    // if (this.element && this.element.getAttribute("readonly")) return {passed:true}
	    var value = null;
	    if (typeof pValue != 'undefined') value = pValue;else if (this.element) value = this.element.value;

	    if (this.isEmpty(value) && this.required) {
	        this.showMsg(this.nullMsg);
	        return {
	            passed: false,
	            Msg: this.nullMsg
	        };
	    } else if (this.isEmpty(value) && !this.required) {
	        return {
	            passed: true
	        };
	    }
	    if (this.regExp) {
	        var reg = new RegExp(this.regExp);
	        if (typeof value == 'number') value = value + "";else if (typeof value == 'boolean') return {
	            passed: true
	        };
	        var r = value.match(reg);
	        if (r === null || r === false) {
	            this.showMsg(this.errorMsg);
	            this.needClean = true;
	            return {
	                passed: false,
	                Msg: this.errorMsg
	            };
	        }
	    }
	    if (this.minLength) {
	        if (value.lengthb() < this.minLength) {
	            var Msg = "输入长度不能小于" + this.minLength + "位";
	            this.showMsg(Msg);
	            return {
	                passed: false,
	                Msg: Msg
	            };
	        }
	    }
	    if (this.maxLength) {
	        if (value.lengthb() > this.maxLength) {
	            var Msg = "输入长度不能大于" + this.maxLength + "位";
	            this.showMsg(Msg);
	            return {
	                passed: false,
	                Msg: Msg
	            };
	        }
	    }
	    if (this.max != undefined && this.max != null) {
	        if (parseFloat(value) > this.max) {
	            var Msg = "输入值不能大于" + this.max;
	            this.showMsg(Msg);
	            return {
	                passed: false,
	                Msg: Msg
	            };
	        }
	    }
	    if (this.min != undefined && this.min != null) {
	        if (parseFloat(value) < this.min) {
	            var Msg = "输入值不能小于" + this.min;
	            this.showMsg(Msg);
	            return {
	                passed: false,
	                Msg: Msg
	            };
	        }
	    }
	    if (this.maxNotEq != undefined && this.maxNotEq != null) {
	        if (parseFloat(value) >= this.maxNotEq) {
	            var Msg = "输入值不能大于或等于" + this.maxNotEq;
	            this.showMsg(Msg);
	            return {
	                passed: false,
	                Msg: Msg
	            };
	        }
	    }
	    if (this.minNotEq != undefined && this.minNotEq != null) {
	        if (parseFloat(value) <= this.minNotEq) {
	            var Msg = "输入值不能小于或等于" + this.minNotEq;
	            this.showMsg(Msg);
	            return {
	                passed: false,
	                Msg: Msg
	            };
	        }
	    }
	    //succes时，将成功信息显示
	    if (this.successId) {
	        // addClass(this.element.parentNode,'u-has-success');
	        var successDiv = this.successId;
	        var successleft = this.referDom.offsetLeft + this.referDom.offsetWidth + 5;
	        var successtop = this.referDom.offsetTop + 10;
	        if (typeof successDiv === 'string') successDiv = document.getElementById(successDiv);
	        successDiv.style.display = 'inline-block';
	        successDiv.style.top = successtop + 'px';
	        successDiv.style.left = successleft + 'px';
	        clearTimeout(this.successtimeout);
	        this.successtimeout = setTimeout(function () {
	            // self.tooltip.hide();
	            successDiv.style.display = 'none';
	        }, this.tipAliveTime);
	    }
	    return {
	        passed: true
	    };
	};

	Validate.fn.check = Validate.fn.doValid;

	//	Validate.fn.getValue = function() {
	//		var inputval
	//		if (this.$element.is(":radio")) {
	//			inputval = this.$form.find(":radio[name='" + this.$element.attr("name") + "']:checked").val();
	//		} else if (this.$element.is(":checkbox")) {
	//			inputval = "";
	//			this.$form.find(":checkbox[name='" + obj.attr("name") + "']:checked").each(function() {
	//				inputval += $(this).val() + ',';
	//			})
	//		} else if (this.$element.is('div')) {
	//			inputval = this.$element[0].trueValue;
	//		} else {
	//			inputval = this.$element.val();
	//		}
	//		inputval = $.trim(inputval);
	//		return this.isEmpty(inputval) ? "" : inputval;
	//	}

	Validate.fn.some = Array.prototype.some ? Array.prototype.some : function () {
	    var flag;
	    for (var i = 0; i < this.length; i++) {
	        if (typeof arguments[0] == "function") {
	            flag = arguments[0](this[i]);
	            if (flag) break;
	        }
	    }
	    return flag;
	};

	Validate.fn.getValue = function () {
	    var inputval = '';
	    //checkbox、radio为u-meta绑定时
	    var bool = this.some.call(this.$element.querySelectorAll('[type="checkbox"],[type="radio"]'), function (ele) {
	        return ele.type == "checkbox" || ele.type == "radio";
	    });
	    if (this.$element.childNodes.length > 0 && bool) {
	        var eleArr = this.$element.querySelectorAll('[type="checkbox"],[type="radio"]');
	        var ele = eleArr[0];
	        if (ele.type == "checkbox") {
	            this.$element.querySelectorAll(":checkbox[name='" + $(ele).attr("name") + "']:checked").each(function () {
	                inputval += $(this).val() + ',';
	            });
	        } else if (ele.type == "radio") {
	            inputval = this.$element.querySelectorAll(":radio[name='" + $(ele).attr("name") + "']:checked").value;
	        }
	    } else if (this.$element.is(":radio")) {
	        //valid-type 绑定
	        inputval = this.$element.parent().querySelectorAll(":radio[name='" + this.$element.attr("name") + "']:checked").val();
	    } else if (this.$element.is(":checkbox")) {
	        inputval = "";
	        this.$element.parent().find(":checkbox[name='" + this.$element.attr("name") + "']:checked").each(function () {
	            inputval += $(this).val() + ',';
	        });
	    } else if (this.$element.find('input').length > 0) {
	        inputval = this.$element.find('input').val();
	    } else {
	        inputval = this.$element.val();
	    }
	    inputval = inputval.trim;
	    return this.isEmpty(inputval) ? "" : inputval;
	};

	Validate.fn.isEmpty = function (val) {
	    return val === "" || val === undefined || val === null; //|| val === $.trim(this.$element.attr("tip"));
	};

	Validate.fn.showMsg = function (msg) {

	    if (this.showMsgFlag == false || this.showMsgFlag == 'false') {
	        return;
	    }
	    var self = this;
	    if (this.tipId) {
	        this.referDom.style.borderColor = 'rgb(241,90,74)';
	        var tipdiv = this.tipId;
	        if (typeof tipdiv === 'string') {
	            tipdiv = document.getElementById(tipdiv);
	        }
	        tipdiv.innerHTML = msg;
	        //如果notipFlag为true说明，可能是平台创建的，需要添加left、top值
	        if (this.notipFlag) {
	            var left = this.referDom.offsetLeft;
	            var top = this.referDom.offsetTop + this.referDom.offsetHeight + 4;
	            tipdiv.style.left = left + 'px';
	            tipdiv.style.top = top + 'px';
	        }

	        tipdiv.style.display = 'block';
	        // addClass(tipdiv.parentNode,'u-has-error');
	        // $('#' + this.tipId).html(msg).show()
	    } else {
	        var tipOptions = {
	            "title": msg,
	            "trigger": "manual",
	            "selector": "validtip",
	            "placement": this.placement,
	            "showFix": this.showFix
	        };

	        if (this.options.tipTemplate) tipOptions.template = this.options.tipTemplate;

	        //月凯修改
	        // if (!this.tooltip)
	        this.referDom = this.$element;
	        if (this.referDom.tagName !== 'INPUT' && this.referDom.tagName !== "TEXTAREA") {
	            this.referDom = this.$element.querySelector('input');
	            // 如果referDom的父元素不是this.$element说明时单选框、复选框。则referDom还为$element
	            if (!this.referDom || this.referDom.parentNode !== this.$element) {
	                this.referDom = this.$element;
	            }
	        }
	        this.tooltip = new _neouiTooltip.Tooltip(this.referDom, tipOptions);
	        this.tooltip.setTitle(msg);
	        this.tooltip.show();
	    }
	    if (this.tipAliveTime !== -1) {
	        clearTimeout(this.timeout);
	        this.timeout = setTimeout(function () {
	            // self.tooltip.hide();
	            self.hideMsg();
	        }, this.tipAliveTime);
	    }
	};
	Validate.fn.hideMsg = function () {
	    //隐藏成功信息
	    // if(this.successId||this.tipId){
	    // 	document.getElementById(this.successId).style.display='none';
	    // 	document.getElementById(this.tipId).style.display='none';
	    // }

	    // removeClass(this.element.parentNode,'u-has-error');
	    // removeClass(this.element.parentNode,'u-has-success');

	    if (this.tipId) {
	        var tipdiv = this.tipId;
	        if (typeof tipdiv === 'string') {
	            tipdiv = document.getElementById(tipdiv);
	        }
	        tipdiv.style.display = 'none';
	        this.referDom.style.borderColor = '';
	        // removeClass(tipdiv.parentNode,'u-has-error');
	    } else {
	        if (this.tooltip) this.tooltip.hide();
	    }
	};

	/**
	 * 只有单一元素时使用
	 */
	Validate.fn._needClean = function () {
	    return true; //this.validates[0].needClean
	};

	var validate = function validate(element) {
	    var self = this,
	        options,
	        childEle;
	    if (typeof element === 'string') {
	        element = document.querySelector(element);
	    }
	    //element本身需要校验
	    if (element.attributes["uvalidate"]) {
	        options = element.attributes["uvalidate"] ? JSON.parse(element.attributes["uvalidate"].value) : {};
	        options = (0, _extend.extend)({
	            el: element
	        }, options);
	        element['Validate'] = new Validate(options);
	    }

	    //element是个父元素，校验子元素
	    childEle = element.querySelectorAll('[uvalidate]');
	    (0, _util.each)(childEle, function (i, child) {
	        if (!child['Validate']) {
	            //如果该元素上没有校验
	            options = child.attributes["validate"] ? JSON.parse(child.attributes["validate"].value) : {};
	            options = (0, _extend.extend)({
	                el: child
	            }, options);
	            child['Validate'] = new Validate(options);
	        }
	    });
	};

	// 对某个dom容器内的元素进行校验
	var doValidate = function doValidate(element) {
	    var passed = true,
	        childEle,
	        result;
	    if (typeof element === 'string') {
	        element = document.querySelector(element);
	    }
	    childEle = element.querySelectorAll('input');
	    (0, _util.each)(childEle, function (i, child) {
	        if (child['Validate'] && child['Validate'].check) {
	            result = child['Validate'].check({
	                trueValue: true,
	                showMsg: true
	            });
	            if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') passed = result['passed'] && passed;else passed = result && passed;
	        }
	    });
	    return passed;
	};

	_compMgr.compMgr.regComp({
	    comp: Validate,
	    compAsString: 'u.Validate',
	    css: 'u-validate'
	});
	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}
	exports.Validate = Validate;
	exports.validate = validate;
	exports.doValidate = doValidate;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Tooltip = undefined;

	var _extend = __webpack_require__(7);

	var _event = __webpack_require__(5);

	var _dom = __webpack_require__(10);

	var Tooltip = function Tooltip(element, options) {
		this.init(element, options);
		//this.show()
	}; /**
	    * Module : neoui-tooltip
	    * Author : Kvkens(yueming@yonyou.com)
	    * Date   : 2016-08-06 13:26:06
	    */


	Tooltip.prototype = {
		defaults: {
			animation: true,
			placement: 'top',
			//selector: false,
			template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow" ></div><div class="tooltip-inner"></div></div>',
			trigger: 'hover focus',
			title: '',
			delay: 0,
			html: false,
			container: false,
			viewport: {
				selector: 'body',
				padding: 0
			},
			showFix: false
		},
		init: function init(element, options) {
			this.element = element;
			this.options = (0, _extend.extend)({}, this.defaults, options);
			this._viewport = this.options.viewport && document.querySelector(this.options.viewport.selector || this.options.viewport);

			var triggers = this.options.trigger.split(' ');

			for (var i = triggers.length; i--;) {
				var trigger = triggers[i];
				if (trigger == 'click') {
					(0, _event.on)(this.element, 'click', this.toggle.bind(this));
				} else if (trigger != 'manual') {
					var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
					var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
					(0, _event.on)(this.element, eventIn, this.enter.bind(this));
					(0, _event.on)(this.element, eventOut, this.leave.bind(this));
				}
			}
			this.options.title = this.options.title || this.element.getAttribute('title');
			this.element.removeAttribute('title');
			if (this.options.delay && typeof this.options.delay == 'number') {
				this.options.delay = {
					show: this.options.delay,
					hide: this.options.delay
				};
			};
			//tip模板对应的dom
			this.tipDom = (0, _dom.makeDOM)(this.options.template);
			(0, _dom.addClass)(this.tipDom, this.options.placement);
			if (this.options.colorLevel) {
				(0, _dom.addClass)(this.tipDom, this.options.colorLevel);
			}
			this.arrrow = this.tipDom.querySelector('.tooltip-arrow');

			// tip容器,默认为当前元素的parent
			this.container = this.options.container ? document.querySelector(this.options.container) : this.element.parentNode;
		},
		enter: function enter() {
			var self = this;
			clearTimeout(this.timeout);
			this.hoverState = 'in';
			if (!this.options.delay || !this.options.delay.show) return this.show();

			this.timeout = setTimeout(function () {
				if (self.hoverState == 'in') self.show();
			}, this.options.delay.show);
		},
		leave: function leave() {
			var self = this;
			clearTimeout(this.timeout);
			self.hoverState = 'out';
			if (!self.options.delay || !self.options.delay.hide) return self.hide();
			self.timeout = setTimeout(function () {
				if (self.hoverState == 'out') self.hide();
			}, self.options.delay.hide);
		},
		show: function show() {
			var self = this;
			this.tipDom.querySelector('.tooltip-inner').innerHTML = this.options.title;
			this.tipDom.style.zIndex = (0, _dom.getZIndex)();

			if (this.options.showFix) {
				document.body.appendChild(this.tipDom);
				this.tipDom.style.position = 'fixed';
				(0, _dom.showPanelByEle)({
					ele: this.element,
					panel: this.tipDom,
					position: "top"
				});
				// fix情况下滚动时隐藏
				(0, _event.on)(document, 'scroll', function () {
					self.hide();
				});
			} else {
				this.container.appendChild(this.tipDom);
				var inputLeft = this.element.offsetLeft;
				var inputTop = this.element.offsetTop;
				var inputWidth = this.element.offsetWidth;
				var inputHeight = this.element.offsetHeight;
				var topWidth = this.tipDom.offsetWidth;
				var topHeight = this.tipDom.offsetHeight;
				if (this.options.placement == 'top') {
					this.left = this.element.offsetLeft + inputWidth / 2;
					this.top = this.element.offsetTop - topHeight;
				}
				// 水平居中
				this.tipDom.style.left = this.left - this.tipDom.clientWidth / 2 + 'px';
				// this.tipDom.style.left = this.left + 'px';
				this.tipDom.style.top = this.top + 'px';
			}

			(0, _dom.addClass)(this.tipDom, 'active');

			// var placement = this.options.placement;
			// var pos = this.getPosition()
			// var actualWidth = this.tipDom.offsetWidth
			// var actualHeight = this.tipDom.offsetHeight
			// var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

			// this.applyPlacement(calculatedOffset, placement)
		},
		hide: function hide() {
			if (this.options.showFix) {
				if (document.body.contains(this.tipDom)) {
					(0, _dom.removeClass)(this.tipDom, 'active');
					document.body.removeChild(this.tipDom);
				}
			} else {
				if (this.container.contains(this.tipDom)) {
					(0, _dom.removeClass)(this.tipDom, 'active');
					this.container.removeChild(this.tipDom);
				}
			}
		},
		applyPlacement: function applyPlacement(offset, placement) {
			var width = this.tipDom.offsetWidth;
			var height = this.tipDom.offsetHeight;

			// manually read margins because getBoundingClientRect includes difference
			var marginTop = parseInt(this.tipDom.style.marginTop, 10);
			var marginLeft = parseInt(this.tipDom.style.marginTop, 10);

			// we must check for NaN for ie 8/9
			if (isNaN(marginTop)) marginTop = 0;
			if (isNaN(marginLeft)) marginLeft = 0;

			offset.top = offset.top + marginTop;
			offset.left = offset.left + marginLeft;

			// $.fn.offset doesn't round pixel values
			// so we use setOffset directly with our own function B-0
			this.tipDom.style.left = offset.left + 'px';
			this.tipDom.style.top = offset.top + 'px';

			(0, _dom.addClass)(this.tipDom, 'active');

			// check to see if placing tip in new offset caused the tip to resize itself
			var actualWidth = this.tipDom.offsetWidth;
			var actualHeight = this.tipDom.offsetHeight;

			if (placement == 'top' && actualHeight != height) {
				offset.top = offset.top + height - actualHeight;
			}
			var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

			if (delta.left) offset.left += delta.left;else offset.top += delta.top;

			var isVertical = /top|bottom/.test(placement);
			var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
			var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

			//$tip.offset(offset)
			this.tipDom.style.left = offset.left + 'px';
			this.tipDom.style.top = offset.top - 4 + 'px';

			// this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
		},
		getCalculatedOffset: function getCalculatedOffset(placement, pos, actualWidth, actualHeight) {
			return placement == 'bottom' ? {
				top: pos.top + pos.height,
				left: pos.left + pos.width / 2 - actualWidth / 2
			} : placement == 'top' ? {
				top: pos.top - actualHeight,
				left: pos.left + pos.width / 2 - actualWidth / 2
			} : placement == 'left' ? {
				top: pos.top + pos.height / 2 - actualHeight / 2,
				left: pos.left - actualWidth
			} :
			/* placement == 'right' */
			{
				top: pos.top + pos.height / 2 - actualHeight / 2,
				left: pos.left + pos.width
			};
		},
		getPosition: function getPosition(el) {
			el = el || this.element;
			var isBody = el.tagName == 'BODY';
			var elRect = el.getBoundingClientRect();
			if (elRect.width == null) {
				// width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
				elRect = (0, _extend.extend)({}, elRect, {
					width: elRect.right - elRect.left,
					height: elRect.bottom - elRect.top
				});
			}
			var elOffset = isBody ? {
				top: 0,
				left: 0
			} : {
				top: el.offsetTop,
				left: el.offsetLeft
			};
			var scroll = {
				scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : el.scrollTop
			};
			var outerDims = isBody ? {
				width: window.innerWidth || document.body.clientWidth,
				height: window.innerHeight || document.body.clientHeight
			} : null;
			//return extend({}, elRect, scroll, outerDims, elOffset)
			return (0, _extend.extend)({}, elRect, scroll, outerDims);
		},
		getViewportAdjustedDelta: function getViewportAdjustedDelta(placement, pos, actualWidth, actualHeight) {
			var delta = {
				top: 0,
				left: 0
			};
			if (!this._viewport) return delta;

			var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
			var viewportDimensions = this.getPosition(this._viewport);

			if (/right|left/.test(placement)) {
				var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
				var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
				if (topEdgeOffset < viewportDimensions.top) {
					// top overflow
					delta.top = viewportDimensions.top - topEdgeOffset;
				} else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
					// bottom overflow
					delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
				}
			} else {
				var leftEdgeOffset = pos.left - viewportPadding;
				var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
				if (leftEdgeOffset < viewportDimensions.left) {
					// left overflow
					delta.left = viewportDimensions.left - leftEdgeOffset;
				} else if (rightEdgeOffset > viewportDimensions.width) {
					// right overflow
					delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
				}
			}

			return delta;
		},
		replaceArrow: function replaceArrow(delta, dimension, isHorizontal) {
			if (isHorizontal) {
				this.arrow.style.left = 50 * (1 - delta / dimension) + '%';
				this.arrow.style.top = '';
			} else {
				this.arrow.style.top = 50 * (1 - delta / dimension) + '%';
				this.arrow.style.left = '';
			}
		},
		destory: function destory() {},
		setTitle: function setTitle(title) {
			this.options.title = title;
		}

	};

	exports.Tooltip = Tooltip;

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	/**
	 * Module : Sparrow i18n
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 10:16:54
	 */
	//import {uuii18n} from '?';//缺失故修改为default值
	var trans = function trans(key, dftValue) {
	  //return  uuii18n ?  uuii18n.t('uui-trans:' + key) : dftValue;
	  return dftValue;
	};

	exports.trans = trans;

/***/ }
/******/ ]);