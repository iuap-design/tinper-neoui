"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var U_LANGUAGES = "i_languages";
var U_THEME = "u_theme";
var U_LOCALE = "u_locale";
var U_USERCODE = "usercode";
var enumerables = true,
    enumerablesTest = { toString: 1 },
    toString = Object.prototype.toString;

for (var i in enumerablesTest) {
	enumerables = null;
}
if (enumerables) {
	enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'];
}

window.u = window.u || {};
//window.$ = {}
var u = window.u;
//var $ = u;

u.enumerables = enumerables;
/**
 * 复制对象属性
 *
 * @param {Object}  目标对象
 * @param {config} 源对象
 */
u.extend = function (object, config) {
	var args = arguments,
	    options;
	if (args.length > 1) {
		for (var len = 1; len < args.length; len++) {
			options = args[len];
			if (object && options && (typeof options === "undefined" ? "undefined" : _typeof(options)) === 'object') {
				var i, j, k;
				for (i in options) {
					object[i] = options[i];
				}
				if (enumerables) {
					for (j = enumerables.length; j--;) {
						k = enumerables[j];
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

u.extend(u, {
	setCookie: function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) {
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (oExpires) sCookie += "; expires=" + oExpires.toGMTString();
		if (sPath) sCookie += "; path=" + sPath;
		if (sDomain) sCookie += "; domain=" + sDomain;
		if (bSecure) sCookie += "; secure=" + bSecure;
		document.cookie = sCookie;
	},
	getCookie: function getCookie(sName) {
		var sRE = "(?:; )?" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);

		if (oRE.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else return null;
	},
	/**
  * 创建一个带壳的对象,防止外部修改
  * @param {Object} proto
  */
	createShellObject: function createShellObject(proto) {
		var exf = function exf() {};
		exf.prototype = proto;
		return new exf();
	},
	execIgnoreError: function execIgnoreError(a, b, c) {
		try {
			a.call(b, c);
		} catch (e) {}
	},
	on: function on(element, eventName, child, listener) {
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
	},
	off: function off(element, eventName, listener) {
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
	},
	trigger: function trigger(element, eventName) {
		if (element["uEvent"] && element["uEvent"][eventName]) {
			element["uEvent"][eventName + 'fn']();
		}
	},
	/**
  * 增加样式
  * @param value
  * @returns {*}
  */
	addClass: function addClass(element, value) {
		if (typeof element.classList === 'undefined') {
			if (u._addClass) u._addClass(element, value);
		} else {
			element.classList.add(value);
		}
		return u;
	},
	removeClass: function removeClass(element, value) {
		if (typeof element.classList === 'undefined') {
			if (u._removeClass) u._removeClass(element, value);
		} else {
			element.classList.remove(value);
		}
		return u;
	},
	hasClass: function hasClass(element, value) {
		if (!element) return false;
		if (element.nodeName && (element.nodeName === '#text' || element.nodeName === '#comment')) return false;
		if (typeof element.classList === 'undefined') {
			if (u._hasClass) return u._hasClass(element, value);
			return false;
		} else {
			return element.classList.contains(value);
		}
	},
	toggleClass: function toggleClass(element, value) {
		if (typeof element.classList === 'undefined') {
			return u._toggleClass(element, value);
		} else {
			return element.classList.toggle(value);
		}
	},
	closest: function closest(element, selector) {
		var tmp = element;
		while (tmp != null && !u.hasClass(tmp, selector) && tmp != document.body) {
			tmp = tmp.parentNode;
		}
		if (tmp == document.body) return null;
		return tmp;
	},
	css: function css(element, csstext, val) {
		if (csstext instanceof Object) {
			for (var k in csstext) {
				var tmpcss = csstext[k];
				if (["width", "height", "top", "bottom", "left", "right"].indexOf(k) > -1 && u.isNumber(tmpcss)) {
					tmpcss = tmpcss + "px";
				}
				element.style[k] = tmpcss;
			}
		} else {
			if (arguments.length > 2) {
				element.style[csstext] = val;
			} else {
				return u.getStyle(element, csstext);
			}
		}
	},
	wrap: function wrap(element, parent) {
		var p = u.makeDOM(parent);
		element.parentNode.insertBefore(p, element);
		p.appendChild(element);
	},
	getStyle: function getStyle(element, key) {
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
	},
	/**
  * 统一zindex值, 不同控件每次显示时都取最大的zindex，防止显示错乱
  */
	getZIndex: function getZIndex() {
		if (!u.globalZIndex) {
			u.globalZIndex = 2000;
		}
		return u.globalZIndex++;
	},
	makeDOM: function makeDOM(htmlString) {
		var tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlString;
		var _dom = tempDiv.children[0];
		return _dom;
	},
	/**
  * element
  */
	makeModal: function makeModal(element, parEle) {
		var overlayDiv = document.createElement('div');
		u.addClass(overlayDiv, 'u-overlay');
		overlayDiv.style.zIndex = u.getZIndex();
		// 如果有父元素则插入到父元素上，没有则添加到body上
		if (parEle && parEle != document.body) {
			u.addClass(overlayDiv, 'hasPar');
			parEle.appendChild(overlayDiv);
		} else {
			document.body.appendChild(overlayDiv);
		}

		element.style.zIndex = u.getZIndex();
		u.on(overlayDiv, 'click', function (e) {
			u.stopEvent(e);
		});
		return overlayDiv;
	},
	getOffset: function getOffset(Node, offset) {
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
		if (Node.offsetParent) return u.getOffset(Node.offsetParent, offset);else return offset;
	},
	getScroll: function getScroll(Node, offset) {
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
		offset.top += Node.scrollTop;
		offset.left += Node.scrollLeft;
		if (Node.parentNode) return u.getScroll(Node.parentNode, offset);else return offset;
	},
	showPanelByEle: function showPanelByEle(obj) {
		var ele = obj.ele,
		    panel = obj.panel,
		    position = obj.position,
		    off = u.getOffset(ele),
		    scroll = u.getScroll(ele),
		    offLeft = off.left,
		    offTop = off.top,
		    scrollLeft = scroll.left,
		    scrollTop = scroll.top,
		    eleWidth = ele.offsetWidth,
		    eleHeight = ele.offsetHeight,
		    panelWidth = panel.offsetWidth,
		    panelHeight = panel.offsetHeight,
		    bodyWidth = document.body.clientWidth,
		    bodyHeight = document.body.clientHeight,
		    position = position || 'top',
		    left = offLeft - scrollLeft,
		    top = offTop - scrollTop;
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

		// if((left + panelWidth) > bodyWidth)
		//     left = bodyWidth - panelWidth;
		// if(left < 0)
		//     left = 0;

		// if((top + panelHeight) > bodyHeight)
		//     top = bodyHeight - panelHeight;
		// if(top < 0)
		//     top = 0;
		panel.style.left = left + 'px';
		panel.style.top = top + 'px';
	},

	/**
  * 阻止冒泡
  */
	stopEvent: function stopEvent(e) {
		if (typeof e != "undefined") {
			if (e.stopPropagation) e.stopPropagation();else {
				e.cancelBubble = true;
			}
			//阻止默认浏览器动作(W3C)
			if (e && e.preventDefault) e.preventDefault();
			//IE中阻止函数器默认动作的方式
			else window.event.returnValue = false;
		}
	},
	getFunction: function getFunction(target, val) {
		if (!val || typeof val == 'function') return val;
		if (typeof target[val] == 'function') return target[val];else if (typeof window[val] == 'function') return window[val];else if (val.indexOf('.') != -1) {
			var func = u.getJSObject(target, val);
			if (typeof func == 'function') return func;
			func = u.getJSObject(window, val);
			if (typeof func == 'function') return func;
		}
		return val;
	},
	getJSObject: function getJSObject(target, names) {
		if (!names) {
			return;
		}
		if ((typeof names === "undefined" ? "undefined" : _typeof(names)) == 'object') return names;
		var nameArr = names.split('.');
		var obj = target;
		for (var i = 0; i < nameArr.length; i++) {
			obj = obj[nameArr[i]];
			if (!obj) return null;
		}
		return obj;
	},
	isDate: function isDate(input) {
		return Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
	},
	isNumber: function isNumber(obj) {
		//return obj === +obj
		return obj - parseFloat(obj) + 1 >= 0;
	},
	isArray: Array.isArray || function (val) {
		return Object.prototype.toString.call(val) === '[object Array]';
	},
	isEmptyObject: function isEmptyObject(obj) {
		var name;
		for (name in obj) {
			return false;
		}
		return true;
	},
	inArray: function inArray(node, arr) {

		if (!arr instanceof Array) {
			throw "arguments is not Array";
		}

		for (var i = 0, k = arr.length; i < k; i++) {
			if (node == arr[i]) {
				return true;
			}
		}

		return false;
	},
	each: function each(obj, callback) {
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
	}

});

//core context
(function () {
	var environment = {};
	/**
  * client attributes
  */
	var clientAttributes = {};

	var sessionAttributes = {};

	var fn = {};
	var maskerMeta = {
		'float': {
			precision: 2
		},
		'datetime': {
			format: 'YYYY-MM-DD HH:mm:ss',
			metaType: 'DateTimeFormatMeta',
			speratorSymbol: '-'
		},
		'time': {
			format: 'HH:mm'
		},
		'date': {
			format: 'YYYY-MM-DD'
		},
		'currency': {
			precision: 2,
			curSymbol: '￥'
		},
		'percent': {}
	};
	/**
  * 获取环境信息
  * @return {environment}
  */
	fn.getEnvironment = function () {
		return u.createShellObject(environment);
	};

	/**
  * 获取客户端参数对象
  * @return {clientAttributes}
  */
	fn.getClientAttributes = function () {
		var exf = function exf() {};
		return u.createShellObject(clientAttributes);
	};

	fn.setContextPath = function (contextPath) {
		return environment[IWEB_CONTEXT_PATH] = contextPath;
	};
	fn.getContextPath = function (contextPath) {
		return environment[IWEB_CONTEXT_PATH];
	};
	/**
  * 设置客户端参数对象
  * @param {Object} k 对象名称
  * @param {Object} v 对象值(建议使用简单类型)
  */
	fn.setClientAttribute = function (k, v) {
		clientAttributes[k] = v;
	};
	/**
  * 获取会话级参数对象
  * @return {clientAttributes}
  */
	fn.getSessionAttributes = function () {
		var exf = function exf() {};
		return u.createShellObject(sessionAttributes);
	};

	/**
  * 设置会话级参数对象
  * @param {Object} k 对象名称
  * @param {Object} v 对象值(建议使用简单类型)
  */
	fn.setSessionAttribute = function (k, v) {
		sessionAttributes[k] = v;
		setCookie("ISES_" + k, v);
	};

	/**
  * 移除客户端参数
  * @param {Object} k 对象名称
  */
	fn.removeClientAttribute = function (k) {
		clientAttributes[k] = null;
		execIgnoreError(function () {
			delete clientAttributes[k];
		});
	};

	/**
  * 获取地区信息编码
  */
	fn.getLocale = function () {
		return this.getEnvironment().locale;
	};

	/**
  * 获取多语信息
  */
	fn.getLanguages = function () {
		return this.getEnvironment().languages;
	};
	/**
  * 收集环境信息(包括客户端参数)
  * @return {Object}
  */
	fn.collectEnvironment = function () {
		var _env = this.getEnvironment();
		var _ses = this.getSessionAttributes();

		for (var i in clientAttributes) {
			_ses[i] = clientAttributes[i];
		}
		_env.clientAttributes = _ses;
		return _env;
	};

	/**
  * 设置数据格式信息
  * @param {String} type
  * @param {Object} meta
  */
	fn.setMaskerMeta = function (type, meta) {
		if (typeof type == 'function') {
			getMetaFunc = type;
		} else {
			if (!maskerMeta[type]) maskerMeta[type] = meta;else {
				if ((typeof meta === "undefined" ? "undefined" : _typeof(meta)) != 'object') maskerMeta[type] = meta;else for (var key in meta) {
					maskerMeta[type][key] = meta[key];
				}
			}
		}
	};
	fn.getMaskerMeta = function (type) {
		if (typeof getMetaFunc == 'function') {
			var meta = getMetaFunc.call(this);
			return meta[type];
		} else return u.extend({}, maskerMeta[type]);
	};
	environment.languages = u.getCookie(U_LANGUAGES) ? u.getCookie(U_LANGUAGES).split(',') : navigator.language ? navigator.language : 'zh-CN';
	if (environment.languages == 'zh-cn') environment.languages = 'zh-CN';
	if (environment.languages == 'en-us') environment.languages = 'en-US';

	environment.theme = u.getCookie(U_THEME);
	environment.locale = u.getCookie(U_LOCALE);
	//environment.timezoneOffset = (new Date()).getTimezoneOffset()
	environment.usercode = u.getCookie(U_USERCODE);
	//init session attribute
	document.cookie.replace(/ISES_(\w*)=([^;]*);?/ig, function (a, b, c) {
		sessionAttributes[b] = c;
	});

	var Core = function Core() {};
	Core.prototype = fn;

	u.core = new Core();
})();

u.extend(u, {
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
	    browserMatch = { browser: "", version: '' },
	    match = rMsie.exec(ua);

	if (match != null) {
		browserMatch = { browser: "IE", version: match[2] || "0" };
	}
	match = rFirefox.exec(ua);
	if (match != null) {
		browserMatch = { browser: match[1] || "", version: match[2] || "0" };
	}
	match = rOpera.exec(ua);
	if (match != null) {
		browserMatch = { browser: match[1] || "", version: match[2] || "0" };
	}
	match = rChrome.exec(ua);
	if (match != null) {
		browserMatch = { browser: match[1] || "", version: match[2] || "0" };
	}
	match = rSafari.exec(ua);
	if (match != null) {
		browserMatch = { browser: match[2] || "", version: match[1] || "0" };
	}
	if (match != null) {
		browserMatch = { browser: "", version: "0" };
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
			} else {}
		}
	}
	if ("ontouchend" in document) {
		u.hasTouch = true;
	}
	if (u.isIOS || u.isAndroid) u.isMobile = true;
})();

if (u.isIE8_BEFORE) {
	alert('uui 不支持IE8以前的浏览器版本，请更新IE浏览器或使用其它浏览器！');
	throw new Error('uui 不支持IE8以前的浏览器版本，请更新IE浏览器或使用其它浏览器！');
}
if (u.isIE8 && !u.polyfill) {
	alert('IE8浏览器中使用uui 必须在u.js之前引入u-polyfill.js!');
	throw new Error('IE8浏览器中使用uui 必须在uui之前引入u-polyfill.js!');
}
//TODO 兼容 后面去掉
//u.Core = u.core;
window.iweb = {};
window.iweb.Core = u.core;
window.iweb.browser = {
	isIE: u.isIE,
	isFF: u.isFF,
	isOpera: u.isOpera,
	isChrome: u.isChrome,
	isSafari: u.isSafari,
	isWebkit: u.isWebkit,
	isIE8_BEFORE: u.isIE8_BEFORE,
	isIE8: u.isIE8,
	isIE8_CORE: u.isIE8_CORE,
	isIE9: u.isIE9,
	isIE9_CORE: u.isIE9_CORE,
	isIE10: u.isIE10,
	isIE10_ABOVE: u.isIE10_ABOVE,
	isIE11: u.isIE11,
	isIOS: u.isIOS,
	isIphone: u.isIphone,
	isIPAD: u.isIPAD,
	isStandard: u.isStandard,
	version: 0,
	isWin: u.isWin,
	isUnix: u.isUnix,
	isLinux: u.isLinux,
	isAndroid: u.isAndroid,
	isMac: u.isMac,
	hasTouch: u.hasTouch
};

u.isDomElement = function (obj) {
	if (window['HTMLElement']) {
		return obj instanceof HTMLElement;
	} else {
		return obj && obj.tagName && obj.nodeType === 1;
	}
};
"use strict";

u.event = {};

var touchStartEvent = u.hasTouch ? "touchstart" : "mousedown",
    touchStopEvent = u.hasTouch ? "touchend" : "mouseup",
    touchMoveEvent = u.hasTouch ? "touchmove" : "mousemove";

// tap和taphold
u.event.tap = {
	tapholdThreshold: 750,
	emitTapOnTaphold: true,
	touchstartFun: function touchstartFun() {
		u.trigger(this, 'vmousedown');
	},
	touchendFun: function touchendFun() {
		u.trigger(this, 'vmouseup');
		u.trigger(this, 'vclick');
	},
	setup: function setup() {
		var thisObject = this,
		    isTaphold = false;

		u.on(thisObject, "vmousedown", function (event) {
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

				u.off(thisObject, 'vclick');
				u.off(thisObject, 'vmouseup');
				u.off(document, 'vmousecancel');
			}

			function clickHandler(event) {
				clearTapHandlers();

				// ONLY trigger a 'tap' event if the start target is
				// the same as the stop target.
				if (!isTaphold && origTarget === event.target) {
					u.trigger(thisObject, 'tap');
				} else if (isTaphold) {
					event.preventDefault();
				}
			}
			u.on(thisObject, 'vmouseup', clearTapTimer);
			u.on(thisObject, 'vclick', clickHandler);
			u.on(document, 'vmousecancel', clearTapHandlers);

			timer = setTimeout(function () {
				if (!u.event.tap.emitTapOnTaphold) {
					isTaphold = true;
				}
				u.trigger(thisObject, "taphold");
				clearTapHandlers();
			}, u.event.tap.tapholdThreshold);
		});

		u.on(thisObject, 'touchstart', u.event.tap.touchstartFun);
		u.on(thisObject, 'touchend', u.event.tap.touchendFun);
	},
	teardown: function teardown() {
		u.off(thisObject, 'vmousedown');
		u.off(thisObject, 'vclick');
		u.off(thisObject, 'vmouseup');
		u.off(document, 'vmousecancel');
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

			u.trigger(thisObject, "swipe");
			u.trigger(thisObject, direction);
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
			events = { length: 0 };
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
				u.off(document, touchMoveEvent, context.move);
				context.move = null;
			};

			u.on(document, touchMoveEvent, context.move);
			u.on(document, touchStopEvent, context.stop);
		};
		u.on(thisObject, touchStartEvent, context.start);
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
				u.off(thisObject, touchStartEvent, context.start);
			}
			if (context.move) {
				u.off(document, touchMoveEvent, context.move);
			}
			if (context.stop) {
				u.off(document, touchStopEvent, context.stop);
			}
		}
	}
};

u.event.swipeleft = u.event.swipe;

u.event.swiperight = u.event.swipe;
"use strict";

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
"use strict";

var XmlHttp = {
  get: "get",
  post: "post",
  reqCount: 4,
  createXhr: function createXhr() {
    var xmlhttp = null;
    /*if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }*/
    if (u.isIE8) {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
    } else if (u.isIE) {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP
      } else if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
        }
    return xmlhttp;
  },
  ajax: function ajax(_json) {
    var url = _json["url"];
    var callback = _json["success"];
    var async = _json["async"] == undefined ? true : _json["async"];
    var error = _json["error"];
    var params = _json["data"] || {};
    var method = (_json["type"] == undefined ? XmlHttp.post : _json["type"]).toLowerCase();
    var gzipFlag = params.compressType;
    url = XmlHttp.serializeUrl(url);
    params = XmlHttp.serializeParams(params);
    if (method == XmlHttp.get && params != null) {
      url += "&" + params;
      params = null; //如果是get请求,保证最终会执行send(null)
    }

    var xmlhttp = XmlHttp.createXhr();
    //xmlhttp.open(method, url+ escape(new Date()), async);
    xmlhttp.open(method, url, async);

    if (method == XmlHttp.post) {
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
    }

    var execount = 0;
    // 异步
    if (async) {
      // readyState 从 1~4发生4次变化
      xmlhttp.onreadystatechange = function () {
        execount++;
        // 等待readyState状态不再变化之后,再执行回调函数
        //if (execount == XmlHttp.reqCount) {// 火狐下存在问题，修改判断方式
        if (xmlhttp.readyState == XmlHttp.reqCount) {
          XmlHttp.execBack(xmlhttp, callback, error);
        }
      };
      // send方法要在在回调函数之后执行
      xmlhttp.send(params);
    } else {
      // 同步 readyState 直接变为 4
      // 并且 send 方法要在回调函数之前执行
      xmlhttp.send(params);
      XmlHttp.execBack(xmlhttp, callback, error);
    }
  },
  execBack: function execBack(xmlhttp, callback, error) {
    //if (xmlhttp.readyState == 4
    if (xmlhttp.status == 200 || xmlhttp.status == 304 || xmlhttp.readyState == 4) {
      callback(xmlhttp.responseText, xmlhttp.status, xmlhttp);
    } else {
      if (error) {
        error(xmlhttp.responseText, xmlhttp.status, xmlhttp);
      } else {
        var errorMsg = "no error callback function!";
        if (xmlhttp.responseText) {
          errorMsg = xmlhttp.responseText;
        }
        alert(errorMsg);
        // throw errorMsg;
      }
    }
  },
  serializeUrl: function serializeUrl(url) {
    var cache = "cache=" + Math.random();
    if (url.indexOf("?") > 0) {
      url += "&" + cache;
    } else {
      url += "?" + cache;
    }
    return url;
  },
  serializeParams: function serializeParams(params) {
    var ud = undefined;
    if (ud == params || params == null || params == "") {
      return null;
    }
    if (params.constructor == Object) {
      var result = "";
      for (var p in params) {
        result += p + "=" + encodeURIComponent(params[p]) + "&";
      }
      return result.substring(0, result.length - 1);
    }
    return params;
  }
};

//if ($ && $.ajax)
//  u.ajax = $.ajax;
//else
u.ajax = XmlHttp.ajax;
'use strict';

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

u.Class = Class;
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
            elements = u.hasClass(ele, optCssClass) ? [ele] : ele.querySelectorAll('.' + optCssClass);
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
                var comp = CompMgr.createDataAdapter({ el: element, options: options, model: model });
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
            callbacks: []
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
        for (var n = 0; n < this.registeredControls.length; n++) {
            _upgradeDomInternal(this.registeredControls[n].className, null, ele);
        }
    }
};

u.compMgr = CompMgr;

///**
// * 加载控件
// */
//
//if (document.readyState && document.readyState === 'complete'){
//    u.compMgr.updateComp();
//}else{
//    u.on(window, 'load', function() {
//
//        //扫描并生成控件
//        u.compMgr.updateComp();
//    });
//}
'use strict';

//
//if (window.i18n) {
//    var scriptPath = getCurrentJsPath(),
//        _temp = scriptPath.substr(0, scriptPath.lastIndexOf('/')),
//        __FOLDER__ = _temp.substr(0, _temp.lastIndexOf('/'))
//    u.uuii18n = u.extend({}, window.i18n)
//    u.uuii18n.init({
//        postAsync: false,
//        getAsync: false,
//        fallbackLng: false,
//        ns: {namespaces: ['uui-trans']},
//        resGetPath: __FOLDER__ + '/locales/__lng__/__ns__.json'
//    })
//}

window.trans = u.trans = function (key, dftValue) {
    return u.uuii18n ? u.uuii18n.t('uui-trans:' + key) : dftValue;
};
'use strict';

/* ========================================================================
 * UUI: rsautils.js v 1.0.0
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */

/*
 * u.RSAUtils.encryptedString({exponent: 'xxxxx', modulus: 'xxxxx', text: 'xxxxx'})
 * u.RSAUtils.decryptedString({exponent: 'xxxxx', modulus: 'xxxxx', text: 'xxxxx'})
 */

if (typeof u.RSAUtils === 'undefined') u.RSAUtils = {};
var RSAUtils = u.RSAUtils;
var biRadixBase = 2;
var biRadixBits = 16;
var bitsPerDigit = biRadixBits;
var biRadix = 1 << 16; // = 2^16 = 65536
var biHalfRadix = biRadix >>> 1;
var biRadixSquared = biRadix * biRadix;
var maxDigitVal = biRadix - 1;
var maxInteger = 9999999999999998;

//maxDigits:
//Change this to accommodate your largest number size. Use setMaxDigits()
//to change it!
//
//In general, if you're working with numbers of size N bits, you'll need 2*N
//bits of storage. Each digit holds 16 bits. So, a 1024-bit key will need
//
//1024 * 2 / 16 = 128 digits of storage.
//
var maxDigits;
var ZERO_ARRAY;
var bigZero, bigOne;

var BigInt = u.BigInt = function (flag) {
    if (typeof flag == "boolean" && flag == true) {
        this.digits = null;
    } else {
        this.digits = ZERO_ARRAY.slice(0);
    }
    this.isNeg = false;
};

RSAUtils.setMaxDigits = function (value) {
    maxDigits = value;
    ZERO_ARRAY = new Array(maxDigits);
    for (var iza = 0; iza < ZERO_ARRAY.length; iza++) {
        ZERO_ARRAY[iza] = 0;
    }bigZero = new BigInt();
    bigOne = new BigInt();
    bigOne.digits[0] = 1;
};
RSAUtils.setMaxDigits(20);

//The maximum number of digits in base 10 you can convert to an
//integer without JavaScript throwing up on you.
var dpl10 = 15;

RSAUtils.biFromNumber = function (i) {
    var result = new BigInt();
    result.isNeg = i < 0;
    i = Math.abs(i);
    var j = 0;
    while (i > 0) {
        result.digits[j++] = i & maxDigitVal;
        i = Math.floor(i / biRadix);
    }
    return result;
};

//lr10 = 10 ^ dpl10
var lr10 = RSAUtils.biFromNumber(1000000000000000);

RSAUtils.biFromDecimal = function (s) {
    var isNeg = s.charAt(0) == '-';
    var i = isNeg ? 1 : 0;
    var result;
    // Skip leading zeros.
    while (i < s.length && s.charAt(i) == '0') {
        ++i;
    }if (i == s.length) {
        result = new BigInt();
    } else {
        var digitCount = s.length - i;
        var fgl = digitCount % dpl10;
        if (fgl == 0) fgl = dpl10;
        result = RSAUtils.biFromNumber(Number(s.substr(i, fgl)));
        i += fgl;
        while (i < s.length) {
            result = RSAUtils.biAdd(RSAUtils.biMultiply(result, lr10), RSAUtils.biFromNumber(Number(s.substr(i, dpl10))));
            i += dpl10;
        }
        result.isNeg = isNeg;
    }
    return result;
};

RSAUtils.biCopy = function (bi) {
    var result = new BigInt(true);
    result.digits = bi.digits.slice(0);
    result.isNeg = bi.isNeg;
    return result;
};

RSAUtils.reverseStr = function (s) {
    var result = "";
    for (var i = s.length - 1; i > -1; --i) {
        result += s.charAt(i);
    }
    return result;
};

var hexatrigesimalToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

RSAUtils.biToString = function (x, radix) {
    // 2 <= radix <= 36
    var b = new BigInt();
    b.digits[0] = radix;
    var qr = RSAUtils.biDivideModulo(x, b);
    var result = hexatrigesimalToChar[qr[1].digits[0]];
    while (RSAUtils.biCompare(qr[0], bigZero) == 1) {
        qr = RSAUtils.biDivideModulo(qr[0], b);
        digit = qr[1].digits[0];
        result += hexatrigesimalToChar[qr[1].digits[0]];
    }
    return (x.isNeg ? "-" : "") + RSAUtils.reverseStr(result);
};

RSAUtils.biToDecimal = function (x) {
    var b = new BigInt();
    b.digits[0] = 10;
    var qr = RSAUtils.biDivideModulo(x, b);
    var result = String(qr[1].digits[0]);
    while (RSAUtils.biCompare(qr[0], bigZero) == 1) {
        qr = RSAUtils.biDivideModulo(qr[0], b);
        result += String(qr[1].digits[0]);
    }
    return (x.isNeg ? "-" : "") + RSAUtils.reverseStr(result);
};

var hexToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

RSAUtils.digitToHex = function (n) {
    var mask = 0xf;
    var result = "";
    for (var i = 0; i < 4; ++i) {
        result += hexToChar[n & mask];
        n >>>= 4;
    }
    return RSAUtils.reverseStr(result);
};

RSAUtils.biToHex = function (x) {
    var result = "";
    var n = RSAUtils.biHighIndex(x);
    for (var i = RSAUtils.biHighIndex(x); i > -1; --i) {
        result += RSAUtils.digitToHex(x.digits[i]);
    }
    return result;
};

RSAUtils.charToHex = function (c) {
    var ZERO = 48;
    var NINE = ZERO + 9;
    var littleA = 97;
    var littleZ = littleA + 25;
    var bigA = 65;
    var bigZ = 65 + 25;
    var result;

    if (c >= ZERO && c <= NINE) {
        result = c - ZERO;
    } else if (c >= bigA && c <= bigZ) {
        result = 10 + c - bigA;
    } else if (c >= littleA && c <= littleZ) {
        result = 10 + c - littleA;
    } else {
        result = 0;
    }
    return result;
};

RSAUtils.hexToDigit = function (s) {
    var result = 0;
    var sl = Math.min(s.length, 4);
    for (var i = 0; i < sl; ++i) {
        result <<= 4;
        result |= RSAUtils.charToHex(s.charCodeAt(i));
    }
    return result;
};

RSAUtils.biFromHex = function (s) {
    var result = new BigInt();
    var sl = s.length;
    for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
        result.digits[j] = RSAUtils.hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
    }
    return result;
};

RSAUtils.biFromString = function (s, radix) {
    var isNeg = s.charAt(0) == '-';
    var istop = isNeg ? 1 : 0;
    var result = new BigInt();
    var place = new BigInt();
    place.digits[0] = 1; // radix^0
    for (var i = s.length - 1; i >= istop; i--) {
        var c = s.charCodeAt(i);
        var digit = RSAUtils.charToHex(c);
        var biDigit = RSAUtils.biMultiplyDigit(place, digit);
        result = RSAUtils.biAdd(result, biDigit);
        place = RSAUtils.biMultiplyDigit(place, radix);
    }
    result.isNeg = isNeg;
    return result;
};

RSAUtils.biDump = function (b) {
    return (b.isNeg ? "-" : "") + b.digits.join(" ");
};

RSAUtils.biAdd = function (x, y) {
    var result;

    if (x.isNeg != y.isNeg) {
        y.isNeg = !y.isNeg;
        result = RSAUtils.biSubtract(x, y);
        y.isNeg = !y.isNeg;
    } else {
        result = new BigInt();
        var c = 0;
        var n;
        for (var i = 0; i < x.digits.length; ++i) {
            n = x.digits[i] + y.digits[i] + c;
            result.digits[i] = n % biRadix;
            c = Number(n >= biRadix);
        }
        result.isNeg = x.isNeg;
    }
    return result;
};

RSAUtils.biSubtract = function (x, y) {
    var result;
    if (x.isNeg != y.isNeg) {
        y.isNeg = !y.isNeg;
        result = RSAUtils.biAdd(x, y);
        y.isNeg = !y.isNeg;
    } else {
        result = new BigInt();
        var n, c;
        c = 0;
        for (var i = 0; i < x.digits.length; ++i) {
            n = x.digits[i] - y.digits[i] + c;
            result.digits[i] = n % biRadix;
            // Stupid non-conforming modulus operation.
            if (result.digits[i] < 0) result.digits[i] += biRadix;
            c = 0 - Number(n < 0);
        }
        // Fix up the negative sign, if any.
        if (c == -1) {
            c = 0;
            for (var i = 0; i < x.digits.length; ++i) {
                n = 0 - result.digits[i] + c;
                result.digits[i] = n % biRadix;
                // Stupid non-conforming modulus operation.
                if (result.digits[i] < 0) result.digits[i] += biRadix;
                c = 0 - Number(n < 0);
            }
            // Result is opposite sign of arguments.
            result.isNeg = !x.isNeg;
        } else {
            // Result is same sign.
            result.isNeg = x.isNeg;
        }
    }
    return result;
};

RSAUtils.biHighIndex = function (x) {
    var result = x.digits.length - 1;
    while (result > 0 && x.digits[result] == 0) {
        --result;
    }return result;
};

RSAUtils.biNumBits = function (x) {
    var n = RSAUtils.biHighIndex(x);
    var d = x.digits[n];
    var m = (n + 1) * bitsPerDigit;
    var result;
    for (result = m; result > m - bitsPerDigit; --result) {
        if ((d & 0x8000) != 0) break;
        d <<= 1;
    }
    return result;
};

RSAUtils.biMultiply = function (x, y) {
    var result = new BigInt();
    var c;
    var n = RSAUtils.biHighIndex(x);
    var t = RSAUtils.biHighIndex(y);
    var u, uv, k;

    for (var i = 0; i <= t; ++i) {
        c = 0;
        k = i;
        for (var j = 0; j <= n; ++j, ++k) {
            uv = result.digits[k] + x.digits[j] * y.digits[i] + c;
            result.digits[k] = uv & maxDigitVal;
            c = uv >>> biRadixBits;
            //c = Math.floor(uv / biRadix);
        }
        result.digits[i + n + 1] = c;
    }
    // Someone give me a logical xor, please.
    result.isNeg = x.isNeg != y.isNeg;
    return result;
};

RSAUtils.biMultiplyDigit = function (x, y) {
    var n, c, uv;

    var result = new BigInt();
    n = RSAUtils.biHighIndex(x);
    c = 0;
    for (var j = 0; j <= n; ++j) {
        uv = result.digits[j] + x.digits[j] * y + c;
        result.digits[j] = uv & maxDigitVal;
        c = uv >>> biRadixBits;
        //c = Math.floor(uv / biRadix);
    }
    result.digits[1 + n] = c;
    return result;
};

RSAUtils.arrayCopy = function (src, srcStart, dest, destStart, n) {
    var m = Math.min(srcStart + n, src.length);
    for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
        dest[j] = src[i];
    }
};

var highBitMasks = [0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800, 0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0, 0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF];

RSAUtils.biShiftLeft = function (x, n) {
    var digitCount = Math.floor(n / bitsPerDigit);
    var result = new BigInt();
    RSAUtils.arrayCopy(x.digits, 0, result.digits, digitCount, result.digits.length - digitCount);
    var bits = n % bitsPerDigit;
    var rightBits = bitsPerDigit - bits;
    for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
        result.digits[i] = result.digits[i] << bits & maxDigitVal | (result.digits[i1] & highBitMasks[bits]) >>> rightBits;
    }
    result.digits[0] = result.digits[i] << bits & maxDigitVal;
    result.isNeg = x.isNeg;
    return result;
};

var lowBitMasks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F, 0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF, 0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];

RSAUtils.biShiftRight = function (x, n) {
    var digitCount = Math.floor(n / bitsPerDigit);
    var result = new BigInt();
    RSAUtils.arrayCopy(x.digits, digitCount, result.digits, 0, x.digits.length - digitCount);
    var bits = n % bitsPerDigit;
    var leftBits = bitsPerDigit - bits;
    for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
        result.digits[i] = result.digits[i] >>> bits | (result.digits[i1] & lowBitMasks[bits]) << leftBits;
    }
    result.digits[result.digits.length - 1] >>>= bits;
    result.isNeg = x.isNeg;
    return result;
};

RSAUtils.biMultiplyByRadixPower = function (x, n) {
    var result = new BigInt();
    RSAUtils.arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n);
    return result;
};

RSAUtils.biDivideByRadixPower = function (x, n) {
    var result = new BigInt();
    RSAUtils.arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n);
    return result;
};

RSAUtils.biModuloByRadixPower = function (x, n) {
    var result = new BigInt();
    RSAUtils.arrayCopy(x.digits, 0, result.digits, 0, n);
    return result;
};

RSAUtils.biCompare = function (x, y) {
    if (x.isNeg != y.isNeg) {
        return 1 - 2 * Number(x.isNeg);
    }
    for (var i = x.digits.length - 1; i >= 0; --i) {
        if (x.digits[i] != y.digits[i]) {
            if (x.isNeg) {
                return 1 - 2 * Number(x.digits[i] > y.digits[i]);
            } else {
                return 1 - 2 * Number(x.digits[i] < y.digits[i]);
            }
        }
    }
    return 0;
};

RSAUtils.biDivideModulo = function (x, y) {
    var nb = RSAUtils.biNumBits(x);
    var tb = RSAUtils.biNumBits(y);
    var origYIsNeg = y.isNeg;
    var q, r;
    if (nb < tb) {
        // |x| < |y|
        if (x.isNeg) {
            q = RSAUtils.biCopy(bigOne);
            q.isNeg = !y.isNeg;
            x.isNeg = false;
            y.isNeg = false;
            r = biSubtract(y, x);
            // Restore signs, 'cause they're references.
            x.isNeg = true;
            y.isNeg = origYIsNeg;
        } else {
            q = new BigInt();
            r = RSAUtils.biCopy(x);
        }
        return [q, r];
    }

    q = new BigInt();
    r = x;

    // Normalize Y.
    var t = Math.ceil(tb / bitsPerDigit) - 1;
    var lambda = 0;
    while (y.digits[t] < biHalfRadix) {
        y = RSAUtils.biShiftLeft(y, 1);
        ++lambda;
        ++tb;
        t = Math.ceil(tb / bitsPerDigit) - 1;
    }
    // Shift r over to keep the quotient constant. We'll shift the
    // remainder back at the end.
    r = RSAUtils.biShiftLeft(r, lambda);
    nb += lambda; // Update the bit count for x.
    var n = Math.ceil(nb / bitsPerDigit) - 1;

    var b = RSAUtils.biMultiplyByRadixPower(y, n - t);
    while (RSAUtils.biCompare(r, b) != -1) {
        ++q.digits[n - t];
        r = RSAUtils.biSubtract(r, b);
    }
    for (var i = n; i > t; --i) {
        var ri = i >= r.digits.length ? 0 : r.digits[i];
        var ri1 = i - 1 >= r.digits.length ? 0 : r.digits[i - 1];
        var ri2 = i - 2 >= r.digits.length ? 0 : r.digits[i - 2];
        var yt = t >= y.digits.length ? 0 : y.digits[t];
        var yt1 = t - 1 >= y.digits.length ? 0 : y.digits[t - 1];
        if (ri == yt) {
            q.digits[i - t - 1] = maxDigitVal;
        } else {
            q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt);
        }

        var c1 = q.digits[i - t - 1] * (yt * biRadix + yt1);
        var c2 = ri * biRadixSquared + (ri1 * biRadix + ri2);
        while (c1 > c2) {
            --q.digits[i - t - 1];
            c1 = q.digits[i - t - 1] * (yt * biRadix | yt1);
            c2 = ri * biRadix * biRadix + (ri1 * biRadix + ri2);
        }

        b = RSAUtils.biMultiplyByRadixPower(y, i - t - 1);
        r = RSAUtils.biSubtract(r, RSAUtils.biMultiplyDigit(b, q.digits[i - t - 1]));
        if (r.isNeg) {
            r = RSAUtils.biAdd(r, b);
            --q.digits[i - t - 1];
        }
    }
    r = RSAUtils.biShiftRight(r, lambda);
    // Fiddle with the signs and stuff to make sure that 0 <= r < y.
    q.isNeg = x.isNeg != origYIsNeg;
    if (x.isNeg) {
        if (origYIsNeg) {
            q = RSAUtils.biAdd(q, bigOne);
        } else {
            q = RSAUtils.biSubtract(q, bigOne);
        }
        y = RSAUtils.biShiftRight(y, lambda);
        r = RSAUtils.biSubtract(y, r);
    }
    // Check for the unbelievably stupid degenerate case of r == -0.
    if (r.digits[0] == 0 && RSAUtils.biHighIndex(r) == 0) r.isNeg = false;

    return [q, r];
};

RSAUtils.biDivide = function (x, y) {
    return RSAUtils.biDivideModulo(x, y)[0];
};

RSAUtils.biModulo = function (x, y) {
    return RSAUtils.biDivideModulo(x, y)[1];
};

RSAUtils.biMultiplyMod = function (x, y, m) {
    return RSAUtils.biModulo(RSAUtils.biMultiply(x, y), m);
};

RSAUtils.biPow = function (x, y) {
    var result = bigOne;
    var a = x;
    while (true) {
        if ((y & 1) != 0) result = RSAUtils.biMultiply(result, a);
        y >>= 1;
        if (y == 0) break;
        a = RSAUtils.biMultiply(a, a);
    }
    return result;
};

RSAUtils.biPowMod = function (x, y, m) {
    var result = bigOne;
    var a = x;
    var k = y;
    while (true) {
        if ((k.digits[0] & 1) != 0) result = RSAUtils.biMultiplyMod(result, a, m);
        k = RSAUtils.biShiftRight(k, 1);
        if (k.digits[0] == 0 && RSAUtils.biHighIndex(k) == 0) break;
        a = RSAUtils.biMultiplyMod(a, a, m);
    }
    return result;
};

u.BarrettMu = function (m) {
    this.modulus = RSAUtils.biCopy(m);
    this.k = RSAUtils.biHighIndex(this.modulus) + 1;
    var b2k = new BigInt();
    b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
    this.mu = RSAUtils.biDivide(b2k, this.modulus);
    this.bkplus1 = new BigInt();
    this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod;
};

function BarrettMu_modulo(x) {
    var $dmath = RSAUtils;
    var q1 = $dmath.biDivideByRadixPower(x, this.k - 1);
    var q2 = $dmath.biMultiply(q1, this.mu);
    var q3 = $dmath.biDivideByRadixPower(q2, this.k + 1);
    var r1 = $dmath.biModuloByRadixPower(x, this.k + 1);
    var r2term = $dmath.biMultiply(q3, this.modulus);
    var r2 = $dmath.biModuloByRadixPower(r2term, this.k + 1);
    var r = $dmath.biSubtract(r1, r2);
    if (r.isNeg) {
        r = $dmath.biAdd(r, this.bkplus1);
    }
    var rgtem = $dmath.biCompare(r, this.modulus) >= 0;
    while (rgtem) {
        r = $dmath.biSubtract(r, this.modulus);
        rgtem = $dmath.biCompare(r, this.modulus) >= 0;
    }
    return r;
}

function BarrettMu_multiplyMod(x, y) {
    /*
     x = this.modulo(x);
     y = this.modulo(y);
     */
    var xy = RSAUtils.biMultiply(x, y);
    return this.modulo(xy);
}

function BarrettMu_powMod(x, y) {
    var result = new BigInt();
    result.digits[0] = 1;
    var a = x;
    var k = y;
    while (true) {
        if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
        k = RSAUtils.biShiftRight(k, 1);
        if (k.digits[0] == 0 && RSAUtils.biHighIndex(k) == 0) break;
        a = this.multiplyMod(a, a);
    }
    return result;
}

var RSAKeyPair = function RSAKeyPair(encryptionExponent, decryptionExponent, modulus) {
    var $dmath = RSAUtils;
    this.e = $dmath.biFromHex(encryptionExponent);
    this.d = $dmath.biFromHex(decryptionExponent);
    this.m = $dmath.biFromHex(modulus);
    // We can do two bytes per digit, so
    // chunkSize = 2 * (number of digits in modulus - 1).
    // Since biHighIndex returns the high index, not the number of digits, 1 has
    // already been subtracted.
    this.chunkSize = 2 * $dmath.biHighIndex(this.m);
    this.radix = 16;
    this.barrett = new u.BarrettMu(this.m);
};

RSAUtils.getKeyPair = function (encryptionExponent, decryptionExponent, modulus) {
    return new RSAKeyPair(encryptionExponent, decryptionExponent, modulus);
};

if (typeof u.twoDigit === 'undefined') {
    u.twoDigit = function (n) {
        return (n < 10 ? "0" : "") + String(n);
    };
}

// Altered by Rob Saunders (rob@robsaunders.net). New routine pads the
// string after it has been converted to an array. This fixes an
// incompatibility with Flash MX's ActionScript.
RSAUtils._encryptedString = function (key, s) {
    var a = [];
    var sl = s.length;
    var i = 0;
    while (i < sl) {
        a[i] = s.charCodeAt(i);
        i++;
    }

    while (a.length % key.chunkSize != 0) {
        a[i++] = 0;
    }

    var al = a.length;
    var result = "";
    var j, k, block;
    for (i = 0; i < al; i += key.chunkSize) {
        block = new BigInt();
        j = 0;
        for (k = i; k < i + key.chunkSize; ++j, k++) {
            block.digits[j] = a[k];
            block.digits[j] += a[k] << 8;
        }
        var crypt = key.barrett.powMod(block, key.e);
        var text = key.radix == 16 ? RSAUtils.biToHex(crypt) : RSAUtils.biToString(crypt, key.radix);
        result += text + " ";
    }
    return result.substring(0, result.length - 1); // Remove last space.
};

RSAUtils._decryptedString = function (key, s) {
    var blocks = s.split(" ");
    var result = "";
    var i, j, block;
    for (i = 0; i < blocks.length; ++i) {
        var bi;
        if (key.radix == 16) {
            bi = RSAUtils.biFromHex(blocks[i]);
        } else {
            bi = RSAUtils.biFromString(blocks[i], key.radix);
        }
        block = key.barrett.powMod(bi, key.d);
        for (j = 0; j <= RSAUtils.biHighIndex(block); ++j) {
            result += String.fromCharCode(block.digits[j] & 255, block.digits[j] >> 8);
        }
    }
    // Remove trailing null, if any.
    if (result.charCodeAt(result.length - 1) == 0) {
        result = result.substring(0, result.length - 1);
    }
    return result;
};

RSAUtils.setMaxDigits(130);

RSAUtils.encryptedString = function (options) {
    var text = options.text;
    if (options.exponent && options.modulus) {
        var key = RSAUtils.getKeyPair(options.exponent, '', options.modulus);
        text = RSAUtils._encryptedString(key, options.text);
    }
    return text;
};

RSAUtils.decryptedString = function (options) {
    var text = options.text;
    if (options.exponent && options.modulus) {
        var key = RSAUtils.getKeyPair('', options.exponent, options.modulus);
        text = RSAUtils._decryptedString(key, options.text);
    }
    return text;
};
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * 抽象格式化类
 */
function AbstractMasker() {};

AbstractMasker.prototype.format = function (obj) {
	if (obj == null) return null;

	var fObj = this.formatArgument(obj);
	return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.formatArgument = function (obj) {};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.innerFormat = function (obj) {};

/**
 * 拆分算法格式化虚基类
 */
AbstractSplitMasker.prototype = new AbstractMasker();

function AbstractSplitMasker() {};
AbstractSplitMasker.prototype.elements = new Array();
AbstractSplitMasker.prototype.format = function (obj) {
	if (obj == null) return null;

	var fObj = this.formatArgument(obj);
	return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractSplitMasker.prototype.formatArgument = function (obj) {
	return obj;
};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractSplitMasker.prototype.innerFormat = function (obj) {
	if (obj == null || obj == "") return new FormatResult(obj);
	this.doSplit();
	var result = "";
	//dingrf 去掉concat合并数组的方式，换用多维数组来实现 提高效率
	result = this.getElementsValue(this.elements, obj);

	return new FormatResult(result);
};

/**
 * 合并多维数组中的elementValue
 * @param {} element
 * @param {} obj
 * @return {}
 */
AbstractSplitMasker.prototype.getElementsValue = function (element, obj) {
	var result = "";
	if (element instanceof Array) {
		for (var i = 0; i < element.length; i++) {
			result = result + this.getElementsValue(element[i], obj);
		}
	} else {
		if (element.getValue) result = element.getValue(obj);
	}
	return result;
};

AbstractSplitMasker.prototype.getExpress = function () {};

AbstractSplitMasker.prototype.doSplit = function () {
	var express = this.getExpress();
	if (this.elements == null || this.elements.length == 0) this.elements = this.doQuotation(express, this.getSeperators(), this.getReplaceds(), 0);
};

/**
 * 处理引号
 *
 * @param express
 * @param seperators
 * @param replaced
 * @param curSeperator
 * @param obj
 * @param result
 */
AbstractSplitMasker.prototype.doQuotation = function (express, seperators, replaced, curSeperator) {
	if (express.length == 0) return null;
	var elements = new Array();
	var pattern = new RegExp('".*?"', "g");
	var fromIndex = 0;
	var result;
	do {
		result = pattern.exec(express);
		if (result != null) {
			var i = result.index;
			var j = pattern.lastIndex;
			if (i != j) {
				if (fromIndex < i) {
					var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator);
					if (childElements != null && childElements.length > 0) {
						//						elements = elements.concat(childElements);
						elements.push(childElements);
					}
				}
			}
			elements.push(new StringElement(express.substring(i + 1, j - 1)));
			fromIndex = j;
		}
	} while (result != null);

	if (fromIndex < express.length) {
		var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator);
		if (childElements != null && childElements.length > 0)
			//			elements = elements.concat(childElements);
			elements.push(childElements);
	}
	return elements;
};

/**
 * 处理其它分隔符
 *
 * @param express
 * @param seperators
 * @param replaced
 * @param curSeperator
 * @param obj
 * @param result
 */
AbstractSplitMasker.prototype.doSeperator = function (express, seperators, replaced, curSeperator) {
	if (curSeperator >= seperators.length) {
		var elements = new Array();
		elements.push(this.getVarElement(express));
		return elements;
	}

	if (express.length == 0) return null;
	var fromIndex = 0;
	var elements = new Array();
	var pattern = new RegExp(seperators[curSeperator], "g");
	var result;
	do {
		result = pattern.exec(express);
		if (result != null) {
			var i = result.index;
			var j = pattern.lastIndex;
			if (i != j) {
				if (fromIndex < i) {
					var childElements = this.doSeperator(express.substring(fromIndex, i), seperators, replaced, curSeperator + 1);
					if (childElements != null && childElements.length > 0)
						//						elements = elements.concat(childElements);
						elements.push(childElements);
				}

				if (replaced[curSeperator] != null) {
					elements.push(new StringElement(replaced[curSeperator]));
				} else {
					elements.push(new StringElement(express.substring(i, j)));
				}
				fromIndex = j;
			}
		}
	} while (result != null);

	if (fromIndex < express.length) {
		var childElements = this.doSeperator(express.substring(fromIndex, express.length), seperators, replaced, curSeperator + 1);
		if (childElements != null && childElements.length > 0)
			//			elements = elements.concat(childElements);
			elements.push(childElements);
	}
	return elements;
};

/**
 * 地址格式
 */
AddressMasker.prototype = new AbstractSplitMasker();

function AddressMasker(formatMeta) {
	this.update(formatMeta);
};

AddressMasker.prototype.update = function (formatMeta) {
	this.formatMeta = u.extend({}, AddressMasker.DefaultFormatMeta, formatMeta);
};

AddressMasker.prototype.getExpress = function () {
	return this.formatMeta.express;
};

AddressMasker.prototype.getReplaceds = function () {
	return [this.formatMeta.separator];
};

AddressMasker.prototype.getSeperators = function () {
	return ["(\\s)+?"];
};

AddressMasker.prototype.getVarElement = function (express) {
	var ex = {};

	if (express == "C") ex.getValue = function (obj) {
		return obj.country;
	};

	if (express == "S") ex.getValue = function (obj) {
		return obj.state;
	};

	if (express == "T") ex.getValue = function (obj) {
		return obj.city;
	};

	if (express == "D") ex.getValue = function (obj) {
		return obj.section;
	};

	if (express == "R") ex.getValue = function (obj) {
		return obj.road;
	};

	if (express == "P") ex.getValue = function (obj) {
		return obj.postcode;
	};

	if (_typeof(ex.getValue) == undefined) return new StringElement(express);else return ex;
};

AddressMasker.prototype.formatArgument = function (obj) {
	return obj;
};

/**
 * <b> 数字格式化  </b>
 *
 * <p> 格式化数字
 *
 * </p>
 *
 * Create at 2009-3-20 上午08:50:32
 *
 * @author bq
 * @since V6.0
 */
NumberMasker.prototype = new AbstractMasker();
NumberMasker.prototype.formatMeta = null;

/**
 *构造方法
 */
function NumberMasker(formatMeta) {
	this.update(formatMeta);
};

NumberMasker.prototype.update = function (formatMeta) {
	this.formatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, formatMeta);
};

/**
 *格式化对象
 */
NumberMasker.prototype.innerFormat = function (obj) {
	var dValue, express, seperatorIndex, strValue;
	dValue = obj.value;
	if (dValue > 0) {
		express = this.formatMeta.positiveFormat;
		strValue = dValue + '';
	} else if (dValue < 0) {
		express = this.formatMeta.negativeFormat;
		strValue = (dValue + '').substr(1, (dValue + '').length - 1);
	} else {
		express = this.formatMeta.positiveFormat;
		strValue = dValue + '';
	}
	seperatorIndex = strValue.indexOf('.');
	strValue = this.setTheSeperator(strValue, seperatorIndex);
	strValue = this.setTheMark(strValue, seperatorIndex);
	var color = null;
	if (dValue < 0 && this.formatMeta.isNegRed) {
		color = "FF0000";
	}
	return new FormatResult(express.replaceAll('n', strValue), color);
};
/**
 *设置标记
 */
NumberMasker.prototype.setTheMark = function (str, seperatorIndex) {
	var endIndex, first, index;
	if (!this.formatMeta.isMarkEnable) return str;
	if (seperatorIndex <= 0) seperatorIndex = str.length;
	first = str.charCodeAt(0);
	endIndex = 0;
	if (first == 45) endIndex = 1;
	index = seperatorIndex - 3;
	while (index > endIndex) {
		str = str.substr(0, index - 0) + this.formatMeta.markSymbol + str.substr(index, str.length - index);
		index = index - 3;
	}
	return str;
};
NumberMasker.prototype.setTheSeperator = function (str, seperatorIndex) {
	var ca;
	if (seperatorIndex > 0) {
		ca = NumberMasker.toCharArray(str);
		//ca[seperatorIndex] = NumberMasker.toCharArray(this.formatMeta.pointSymbol)[0];
		ca[seperatorIndex] = this.formatMeta.pointSymbol;
		str = ca.join('');
	}
	return str;
};
/**
 * 将字符串转换成char数组
 * @param {} str
 * @return {}
 */
NumberMasker.toCharArray = function (str) {
	var str = str.split("");
	var charArray = new Array();
	for (var i = 0; i < str.length; i++) {
		charArray.push(str[i]);
	}
	return charArray;
};

/**
 *默认构造方法
 */
NumberMasker.prototype.formatArgument = function (obj) {
	var numberObj = {};
	numberObj.value = obj;
	return numberObj;
};

/**
 * 货币格式
 */
CurrencyMasker.prototype = new NumberMasker();
CurrencyMasker.prototype.formatMeta = null;

function CurrencyMasker(formatMeta) {
	this.update(formatMeta);
};

CurrencyMasker.prototype.update = function (formatMeta) {
	this.formatMeta = u.extend({}, CurrencyMasker.DefaultFormatMeta, formatMeta);
};

/**
 * 重载格式方法
 * @param {} obj
 * @return {}
 */
CurrencyMasker.prototype.innerFormat = function (obj) {
	if (!obj.value) {
		return { value: "" };
	}
	var fo = new NumberMasker(this.formatMeta).innerFormat(obj);
	fo.value = this.formatMeta.curSymbol + fo.value; //fo.value.replace("$", this.formatMeta.curSymbol);
	return fo;
};

PercentMasker.prototype = new NumberMasker();

function PercentMasker(formatMeta) {
	this.update(formatMeta);
};

PercentMasker.prototype.update = function (formatMeta) {
	this.formatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, formatMeta);
};

PercentMasker.prototype.formatArgument = function (obj) {
	return obj;
};

PercentMasker.prototype.innerFormat = function (value) {
	var val = "";
	if (value != "") {
		var obj = new NumberMasker(this.formatMeta).innerFormat({ value: value }).value;
		// 获取obj保留几位小数位,obj小数位-2为显示小数位
		var objStr = String(obj);
		var objPrecision = objStr.length - objStr.indexOf(".") - 1;
		var showPrecision = objPrecision - 2;
		if (showPrecision < 0) {
			showPrecision = 0;
		}
		val = parseFloat(obj) * 100;
		val = (val * Math.pow(10, showPrecision) / Math.pow(10, showPrecision)).toFixed(showPrecision);
		val = val + "%";
	}
	return {
		value: val
	};
};

/**
 * 将结果输出成HTML代码
 * @param {} result
 * @return {String}
 */
function toColorfulString(result) {
	var color;
	if (!result) {
		return '';
	}
	if (result.color == null) {
		return result.value;
	}
	color = result.color;
	return '<font color="' + color + '">' + result.value + '<\/font>';
};

/**
 * 格式解析后形成的单个格式单元
 * 适用于基于拆分算法的AbstractSplitFormat，表示拆分后的变量单元
 */
StringElement.prototype = new Object();

function StringElement(value) {
	this.value = value;
};
StringElement.prototype.value = "";

StringElement.prototype.getValue = function (obj) {
	return this.value;
};
/**
 *格式结果
 */
FormatResult.prototype = new Object();
/**
 *默认构造方法
 */
function FormatResult(value, color) {
	this.value = value;
	this.color = color;
};

NumberMasker.DefaultFormatMeta = {
	isNegRed: true,
	isMarkEnable: true,
	markSymbol: ",",
	pointSymbol: ".",
	positiveFormat: "n",
	negativeFormat: "-n"
};

CurrencyMasker.DefaultFormatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, {
	//curSymbol: "",
	positiveFormat: "n",
	negativeFormat: "-n"
});

AddressMasker.defaultFormatMeta = {
	express: "C S T R P",
	separator: " "
};

u.AddressMasker = AddressMasker;
u.NumberMasker = NumberMasker;
u.CurrencyMasker = CurrencyMasker;
u.PercentMasker = PercentMasker;
"use strict";

/**
 * 数据格式化工具
 */

function NumberFormater(precision) {
    this.precision = precision;
};

NumberFormater.prototype.update = function (precision) {
    this.precision = precision;
};

NumberFormater.prototype.format = function (value) {
    if (!u.isNumber(value)) return "";

    // 以0开头的数字将其前面的0去掉
    while ((value + "").charAt(0) == "0" && value.length > 1 && (value + "").indexOf('0.') != 0) {
        value = value.substring(1);
    }
    var result = value;
    if (u.isNumber(this.precision)) {
        if (window.BigNumber) {
            // 已经引入BigNumber
            result = new BigNumber(value).toFixed(this.precision);
        } else {
            var digit = parseFloat(value);
            // 解决toFixed四舍五入问题，如1.345
            result = (Math.round(digit * Math.pow(10, this.precision)) / Math.pow(10, this.precision)).toFixed(this.precision);
        }
        if (result == "NaN") return "";
    }

    return result;
};

function DateFormater(pattern) {
    this.pattern = pattern;
};

DateFormater.prototype.update = function (pattern) {
    this.pattern = pattern;
};

DateFormater.prototype.format = function (value) {
    return moment(value).format(this.pattern);
};

u.NumberFormater = NumberFormater;
u.DateFormater = DateFormater;
'use strict';

u.date = {
    /**
     * 多语言处理
     */
    //TODO 后续放到多语文件中
    _dateLocale: {
        'zh-CN': {
            months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
            monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
            weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
            weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
            weekdaysMin: '日_一_二_三_四_五_六'.split('_')
        },
        'en-US': {
            months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
            monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
            weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thurday_Friday_Saturday'.split('_'),
            weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
            weekdaysMin: 'S_M_T_W_T_F_S'.split('_')
        }
    },

    _formattingTokens: /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYY|YY|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,

    leftZeroFill: function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? forceSign ? '+' : '' : '-') + output;
    },

    _formats: {
        //year
        YY: function YY(date) {
            return u.date.leftZeroFill(date.getFullYear() % 100, 2);
        },
        YYYY: function YYYY(date) {
            return date.getFullYear();
        },
        //month
        M: function M(date) {
            return date.getMonth() + 1;
        },
        MM: function MM(date) {
            var m = u.date._formats.M(date);
            return u.date.leftZeroFill(m, 2);
        },
        MMM: function MMM(date, language) {
            var m = date.getMonth();
            return u.date._dateLocale[language].monthsShort[m];
        },
        MMMM: function MMMM(date, language) {
            var m = date.getMonth();
            return u.date._dateLocale[language].months[m];
        },
        //date
        D: function D(date) {
            return date.getDate();
        },
        DD: function DD(date) {
            var d = u.date._formats.D(date);
            return u.date.leftZeroFill(d, 2);
        },
        // weekday
        d: function d(date) {
            return date.getDay();
        },
        dd: function dd(date, language) {
            var d = u.date._formats.d(date);
            return u.date._dateLocale[language].weekdaysMin[d];
        },
        ddd: function ddd(date, language) {
            var d = u.date._formats.d(date);
            return u.date._dateLocale[language].weekdaysShort[d];
        },
        dddd: function dddd(date, language) {
            var d = u.date._formats.d(date);
            return u.date._dateLocale[language].weekdays[d];
        },
        // am pm
        a: function a(date) {
            if (date.getHours() > 12) {
                return 'pm';
            } else {
                return 'am';
            }
        },
        //hour
        h: function h(date) {
            var h = date.getHours();
            h = h > 12 ? h - 12 : h;
            return h;
        },
        hh: function hh(date) {
            var h = u.date._formats.h(date);
            return u.date.leftZeroFill(h, 2);
        },
        H: function H(date) {
            return date.getHours();
        },
        HH: function HH(date) {
            return u.date.leftZeroFill(date.getHours(), 2);
        },
        // minutes
        m: function m(date) {
            return date.getMinutes();
        },
        mm: function mm(date) {
            return u.date.leftZeroFill(date.getMinutes(), 2);
        },
        //seconds
        s: function s(date) {
            return date.getSeconds();
        },
        ss: function ss(date) {
            return u.date.leftZeroFill(date.getSeconds(), 2);
        }
    },

    /**
     * 日期格式化
     * @param date
     * @param formatString
     */
    format: function format(date, formatString, language) {
        if (!date) return date;
        var array = formatString.match(u.date._formattingTokens),
            i,
            length,
            output = '';
        var _date = u.date.getDateObj(date);
        if (!_date) return date;
        language = language || u.core.getLanguages();
        for (i = 0, length = array.length; i < length; i++) {
            if (u.date._formats[array[i]]) {
                output += u.date._formats[array[i]](_date, language);
            } else {
                output += array[i];
            }
        }
        return output;
    },

    _addOrSubtract: function _addOrSubtract(date, period, value, isAdding) {
        var times = date.getTime(),
            d = date.getDate(),
            m = date.getMonth(),
            _date = u.date.getDateObj(date);
        if (period === 'ms') {
            times = times + value * isAdding;
            _date.setTime(times);
        } else if (period == 's') {
            times = times + value * 1000 * isAdding;
            _date.setTime(times);
        } else if (period == 'm') {
            times = times + value * 60000 * isAdding;
            _date.setTime(times);
        } else if (period == 'h') {
            times = times + value * 3600000 * isAdding;
            _date.setTime(times);
        } else if (period == 'd') {
            d = d + value * isAdding;
            _date.setDate(d);
        } else if (period == 'w') {
            d = d + value * 7 * isAdding;
            _date.setDate(d);
        } else if (period == 'M') {
            m = m + value * isAdding;
            _date.setMonth(d);
        } else if (period == 'y') {
            m = m + value * 12 * isAdding;
            _date.setMonth(d);
        }
        return _date;
    },

    add: function add(date, period, value) {
        return u.date._addOrSubtract(date, period, value, 1);
    },
    sub: function sub(date, period, value) {
        return u.date._addOrSubtract(date, period, value, -1);
    },
    getDateObj: function getDateObj(value) {
        if (!value || typeof value == 'undefined') return value;
        var dateFlag = false;
        var _date = new Date(value);
        if (isNaN(_date)) {
            // IE的话对"2016-2-13 12:13:22"进行处理
            var index1, index2, index3, s1, s2, s3;
            index1 = value.indexOf('-');
            index2 = value.indexOf(':');
            index3 = value.indexOf(' ');
            if (index1 > 0 || index2 > 0 || index3 > 0) {
                _date = new Date();
                if (index3 > 0) {
                    s3 = value.split(' ');
                    s1 = s3[0].split('-');
                    s2 = s3[1].split(':');
                } else if (index1 > 0) {
                    s1 = value.split('-');
                } else if (index2 > 0) {
                    s2 = value.split(':');
                }
                if (s1 && s1.length > 0) {
                    _date.setYear(s1[0]);
                    _date.setMonth(parseInt(s1[1] - 1));
                    _date.setDate(s1[2] ? s1[2] : 0);
                    dateFlag = true;
                }
                if (s2 && s2.length > 0) {
                    _date.setHours(s2[0] ? s2[0] : 0);
                    _date.setMinutes(s2[1] ? s2[1] : 0);
                    _date.setSeconds(s2[2] ? s2[2] : 0);
                    dateFlag = true;
                }
            } else {
                _date = new Date(parseInt(value));
                if (isNaN(_date)) {
                    throw new TypeError('invalid Date parameter');
                } else {
                    dateFlag = true;
                }
            }
        } else {
            dateFlag = true;
        }

        if (dateFlag) return _date;else return null;
    }
};
'use strict';

/**
 * 处理数据显示格式
 */

u.floatRender = function (value, precision) {
    var trueValue = value;
    if (typeof value === 'undefined' || value === null) return value;
    //value 为 ko对象
    if (typeof value === 'function') trueValue = value();
    var maskerMeta = u.core.getMaskerMeta('float') || {};
    if (typeof precision === 'number') maskerMeta.precision = precision;
    var formater = new u.NumberFormater(maskerMeta.precision);
    var masker = new NumberMasker(maskerMeta);
    return masker.format(formater.format(trueValue)).value;
};

u.integerRender = function (value) {
    var trueValue = value;
    if (typeof value === 'undefined' || value === null) return value;
    //value 为 ko对象
    if (typeof value === 'function') trueValue = value();
    return trueValue;
};

var _dateRender = function _dateRender(value, format, type) {
    var trueValue = value;
    if (typeof value === 'undefined' || value === null) return value;
    //value 为 ko对象
    if (typeof value === 'function') trueValue = value();
    var maskerMeta = u.core.getMaskerMeta(type) || {};
    if (typeof format != 'undefined') maskerMeta.format = format;
    var maskerValue = u.date.format(trueValue, maskerMeta.format);
    return maskerValue;
};

u.dateRender = function (value, format) {
    return _dateRender(value, format, 'date');
};

u.dateTimeRender = function (value, format) {
    return _dateRender(value, format, 'datetime');
};

u.timeRender = function (value, format) {
    return _dateRender(value, format, 'time');
};

u.percentRender = function (value) {
    var trueValue = value;
    if (typeof value === 'undefined' || value === null) return value;
    //value 为 ko对象
    if (typeof value === 'function') trueValue = value();
    var maskerMeta = u.core.getMaskerMeta('percent') || {};
    var masker = new PercentMasker(maskerMeta);
    var maskerValue = masker.format(trueValue);
    return maskerValue && maskerValue.value ? maskerValue.value : '';
};

u.dateToUTCString = function (date) {
    if (!date) return '';
    if (date.indexOf("-") > -1) date = date.replace(/\-/g, "/");
    var utcString = Date.parse(date);
    if (isNaN(utcString)) return "";
    return utcString;
};
'use strict';

var _hotkeys = {};
_hotkeys.special_keys = {
    27: 'esc', 9: 'tab', 32: 'space', 13: 'enter', 8: 'backspace', 145: 'scroll', 20: 'capslock',
    144: 'numlock', 19: 'pause', 45: 'insert', 36: 'home', 46: 'del', 35: 'end', 33: 'pageup',
    34: 'pagedown', 37: 'left', 38: 'up', 39: 'right', 40: 'down', 112: 'f1', 113: 'f2', 114: 'f3',
    115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8', 120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12'
};

_hotkeys.shift_nums = {
    "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
    "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ":", "'": "\"", ",": "<",
    ".": ">", "/": "?", "\\": "|"
};

_hotkeys.add = function (combi, options, callback) {
    if (u.isFunction(options)) {
        callback = options;
        options = {};
    }
    var opt = {},
        defaults = { type: 'keydown', propagate: false, disableInInput: false, target: document.body, checkParent: true },
        that = this;
    opt = u.extend(opt, defaults, options || {});
    combi = combi.toLowerCase();

    // inspect if keystroke matches
    var inspector = function inspector(event) {
        //event = $.event.fix(event); // jQuery event normalization.
        var element = this; //event.target;
        // @ TextNode -> nodeType == 3
        element = element.nodeType == 3 ? element.parentNode : element;

        if (opt['disableInInput']) {
            // Disable shortcut keys in Input, Textarea fields
            var target = element; //$(element);
            if (target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
                return;
            }
        }
        var code = event.which,
            type = event.type,
            character = String.fromCharCode(code).toLowerCase(),
            special = that.special_keys[code],
            shift = event.shiftKey,
            ctrl = event.ctrlKey,
            alt = event.altKey,
            propagate = true,
            // default behaivour
        mapPoint = null;

        // in opera + safari, the event.target is unpredictable.
        // for example: 'keydown' might be associated with HtmlBodyElement
        // or the element where you last clicked with your mouse.
        if (opt.checkParent) {
            //              while (!that.all[element] && element.parentNode){
            while (!element['u.hotkeys'] && element.parentNode) {
                element = element.parentNode;
            }
        }

        //          var cbMap = that.all[element].events[type].callbackMap;
        var cbMap = element['u.hotkeys'].events[type].callbackMap;
        if (!shift && !ctrl && !alt) {
            // No Modifiers
            mapPoint = cbMap[special] || cbMap[character];
        }
        // deals with combinaitons (alt|ctrl|shift+anything)
        else {
                var modif = '';
                if (alt) modif += 'alt+';
                if (ctrl) modif += 'ctrl+';
                if (shift) modif += 'shift+';
                // modifiers + special keys or modifiers + characters or modifiers + shift characters
                mapPoint = cbMap[modif + special] || cbMap[modif + character] || cbMap[modif + that.shift_nums[character]];
            }
        if (mapPoint) {
            mapPoint.cb(event);
            if (!mapPoint.propagate) {
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        }
    };
    // first hook for this element
    var data = opt.target['u.hotkeys'];
    if (!data) {
        opt.target['u.hotkeys'] = data = { events: {} };
    }
    //      if (!_hotkeys.all[opt.target]){
    //          _hotkeys.all[opt.target] = {events:{}};
    //      }
    if (!data.events[opt.type]) {
        data.events[opt.type] = { callbackMap: {} };
        u.on(opt.target, opt.type, inspector);
        //$.event.add(opt.target, opt.type, inspector);
    }
    //      if (!_hotkeys.all[opt.target].events[opt.type]){
    //          _hotkeys.all[opt.target].events[opt.type] = {callbackMap: {}}
    //          $.event.add(opt.target, opt.type, inspector);
    //      }
    data.events[opt.type].callbackMap[combi] = { cb: callback, propagate: opt.propagate };
    //      _hotkeys.all[opt.target].events[opt.type].callbackMap[combi] =  {cb: callback, propagate:opt.propagate};
    return u.hotkeys;
};
_hotkeys.remove = function (exp, opt) {
    opt = opt || {};
    target = opt.target || document.body;
    type = opt.type || 'keydown';
    exp = exp.toLowerCase();

    delete target['u.hotkeys'].events[type].callbackMap[exp];
};

_hotkeys.scan = function (element, target) {
    element = element || document.body;
    element.querySelectorAll('[u-enter]').forEach(function (el) {
        var enterValue = el.getAttribute('u-enter');
        if (!enterValue) return;
        if (enterValue.substring(0, 1) == '#') u.hotkeys.add('enter', { target: this }, function () {
            var _el = element.querySelector(enterValue);
            if (_el) {
                _el.focus();
            }
        });else {
            target = target || window;
            var func = u.getFunction(target, enterValue);
            u.hotkeys.add('enter', { target: this }, function () {
                func.call(this);
            });
        }
    });
    element.querySelectorAll('[u-hotkey]').forEach(function (el) {
        var hotkey = el.getAttribute('u-hotkey');
        if (!hotkey) return;
        u.hotkeys.add(hotkey, function () {
            el.click();
        });
    });
};

u.hotkeys = _hotkeys;