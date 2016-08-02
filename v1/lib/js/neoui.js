(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("neoui", [], factory);
	else if(typeof exports === 'object')
		exports["neoui"] = factory();
	else
		root["neoui"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _neouiAutocomplete = __webpack_require__(1);
	
	var _neouiButton = __webpack_require__(12);
	
	var _neouiCheckbox = __webpack_require__(14);
	
	var _neouiCombo = __webpack_require__(15);
	
	var _neouiTextfield = __webpack_require__(16);
	
	var _neouiCombobox = __webpack_require__(17);
	
	var _neouiDataTable = __webpack_require__(18);
	
	var _neouiDialog = __webpack_require__(19);
	
	var _neouiLayout = __webpack_require__(20);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Autocomplete = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _event = __webpack_require__(5);
	
	var _extend = __webpack_require__(7);
	
	var _env = __webpack_require__(6);
	
	var _ajax = __webpack_require__(11);
	
	var _compMgr = __webpack_require__(9);
	
	var Autocomplete = _BaseComponent.BaseComponent.extend({
		defaults: {
			inputClass: "ac_input",
			resultsClass: "ac_results",
			lineSeparator: "\n",
			cellSeparator: "|",
			minChars: 1,
			delay: 400,
			matchCase: 0,
			matchSubset: 1,
			matchContains: 0,
			cacheLength: 1,
			mustMatch: 0,
			extraParams: {},
			loadingClass: "ac_loading",
			selectFirst: false,
			selectOnly: false,
			maxItemsToShow: -1,
			autoFill: false,
			width: 0,
			source: null,
			select: null,
			multiSelect: false
		},
		init: function init() {
			var self = this;
			this.options = (0, _extend.extend)({}, this.defaults, this.options);
			this.requestIndex = 0;
			this.pending = 0;
			if (this.options.inputClass) {
				(0, _dom.addClass)(this.element, this.options.inputClass);
			}
			this._results = document.querySelector('#autocompdiv');
			if (!this._results) {
				this._results = (0, _dom.makeDOM)('<div id="autocompdiv"></div>');
				document.body.appendChild(this._results);
			}
			this._results.style.display = 'none';
			this._results.style.position = 'absolute';
			(0, _dom.addClass)(this._results, this.options.resultsClass);
			if (this.options.width) {
				this._results.style.width = this.options.width;
			}
			this.timeout = null;
			this.prev = "";
			this.active = -1;
			this.cache = {};
			this.keyb = false;
			this.hasFocus = false;
			this.lastKeyPressCode = null;
			this._initSource();
			(0, _event.on)(this.element, 'keydown', function (e) {
				self.lastKeyPressCode = e.keyCode;
				switch (e.keyCode) {
					case 38:
						// up
						(0, _event.stopEvent)(e);
						self.moveSelect(-1);
						break;
					case 40:
						// down
						(0, _event.stopEvent)(e);
						self.moveSelect(1);
						break;
					case 9: // tab
					case 13:
						// return
						if (self.selectCurrent()) {
							// make sure to blur off the current field
							// self.element.blur();
							(0, _event.stopEvent)(e);
						}
						break;
					default:
						self.active = -1;
						if (self.timeout) clearTimeout(self.timeout);
						self.timeout = setTimeout(function () {
							self.onChange();
						}, self.options.delay);
						break;
				}
			});
			(0, _event.on)(this.element, 'focus', function () {
				self.hasFocus = true;
			});
			(0, _event.on)(this.element, 'blur', function () {
				self.hasFocus = false;
				self.hideResults();
			});
			this.hideResultsNow();
		},
		flushCache: function flushCache() {
			this.cache = {};
			this.cache.data = {};
			this.cache.length = 0;
		},
		_initSource: function _initSource() {
			var array,
			    url,
			    self = this;
			if (_env.env.isArray(this.options.source)) {
				array = this.options.source;
				this.source = function (request, response) {
					//				response( $.ui.autocomplete.filter( array, request.term ) );
					response(self.filterData(request.term, array));
				};
			} else if (typeof this.options.source === "string") {
				url = this.options.source;
				this.source = function (request, response) {
					if (self.xhr) {
						self.xhr.abort();
					}
					self.xhr = (0, _ajax.ajax)({
						url: url,
						data: request,
						dataType: "json",
						success: function success(data) {
							response(data);
						},
						error: function error() {
							response([]);
						}
					});
				};
			} else {
				this.source = this.options.source;
			}
		},
		_response: function _response() {
			var self = this;
			var index = ++this.requestIndex;
	
			return function (content) {
				if (index === self.requestIndex) {
					self.__response(content);
				}
	
				self.pending--;
				if (!self.pending) {}
			};
		},
		__response: function __response(content) {
			if (content) this.receiveData2(content);
			this.showResults();
		},
		onChange: function onChange() {
			// ignore if the following keys are pressed: [del] [shift] [capslock]
			if (this.lastKeyPressCode == 46 || this.lastKeyPressCode > 8 && this.lastKeyPressCode < 32) return this._results.style.disply = 'none';
			if (!this.element.value) return;
			var vs = this.element.value.split(','),
			    v = vs[vs.length - 1].trim();
			if (v == this.prev) return;
			this.prev = v;
			if (v.length >= this.options.minChars) {
				(0, _dom.addClass)(this.element, this.options.loadingClass);
				this.pending++;
				this.source({
					term: v
				}, this._response());
			} else {
				(0, _dom.removeClass)(this.element, this.options.loadingClass);
				this._results.style.display = 'none';
			}
		},
		moveSelect: function moveSelect(step) {
			var lis = this._results.querySelectorAll('li');
			if (!lis) return;
	
			this.active += step;
	
			if (this.active < 0) {
				this.active = 0;
			} else if (this.active >= lis.length) {
				this.active = lis.length - 1;
			}
			lis.forEach(function (li) {
				(0, _dom.removeClass)(li, 'ac_over');
			});
			(0, _dom.addClass)(lis[this.active], 'ac_over');
		},
		selectCurrent: function selectCurrent() {
			var li = this._results.querySelector('li.ac_over'); //$("li.ac_over", this.$results[0])[0];
			if (!li) {
				var _li = this._results.querySelectorAll('li'); //$("li", this.$results[0]);
				if (this.options.selectOnly) {
					if (_li.length == 1) li = _li[0];
				} else if (this.options.selectFirst) {
					li = _li[0];
				}
			}
			if (li) {
				this.selectItem(li);
				return true;
			} else {
				return false;
			}
		},
		selectItem: function selectItem(li) {
			var self = this;
			if (!li) {
				li = document.createElement("li");
				li.selectValue = "";
			}
			var v = li.selectValue ? li.selectValue : li.innerHTML;
			this.lastSelected = v;
			this.prev = v;
			this._results.innerHTML = '';
			if (this.options.multiSelect) {
	
				if ((this.element.value + ',').indexOf(v + ',') != -1) return;
				var vs = this.element.value.split(',');
				var lastValue = this.element.value.substring(0, this.element.value.lastIndexOf(','));
	
				this.element.value = (lastValue ? lastValue + ', ' : lastValue) + v + ', ';
			} else {
				this.element.value = v;
			}
	
			this.hideResultsNow();
	
			this.element.focus();
	
			if (this.options.select) setTimeout(function () {
				self.options.select(li._item, self);
			}, 1);
		},
		createSelection: function createSelection(start, end) {
			// get a reference to the input element
			var field = this.element;
			if (field.createTextRange) {
				var selRange = field.createTextRange();
				selRange.collapse(true);
				selRange.moveStart("character", start);
				selRange.moveEnd("character", end);
				selRange.select();
			} else if (field.setSelectionRange) {
				field.setSelectionRange(start, end);
			} else {
				if (field.selectionStart) {
					field.selectionStart = start;
					field.selectionEnd = end;
				}
			}
			field.focus();
		},
		// fills in the input box w/the first match (assumed to be the best match)
		autoFill: function autoFill(sValue) {
			// if the last user key pressed was backspace, don't autofill
			if (this.lastKeyPressCode != 8) {
				// fill in the value (keep the case the user has typed)
				this.element.value = this.element.value + sValue.substring(this.prev.length);
				// select the portion of the value not typed by the user (so the next character will erase)
				this.createSelection(this.prev.length, sValue.length);
			}
		},
		showResults: function showResults() {
			// get the position of the input field right now (in case the DOM is shifted)
			var pos = findPos(this.element);
			// either use the specified width, or autocalculate based on form element
			var iWidth = this.options.width > 0 ? this.options.width : this.element.offsetWidth;
			// reposition
			if ('100%' === this.options.width) {
				this._results.style.top = pos.y + this.element.offsetHeight + "px";
				this._results.style.left = pos.x + "px";
				this._results.style.display = 'block';
			} else {
				this._results.style.width = parseInt(iWidth) + "px";
				this._results.style.top = pos.y + this.element.offsetHeight + "px";
				this._results.style.left = pos.x + "px";
				this._results.style.display = 'block';
			}
		},
		hideResults: function hideResults() {
			var self = this;
			if (this.timeout) clearTimeout(this.timeout);
			this.timeout = setTimeout(function () {
				self.hideResultsNow();
			}, 200);
		},
		hideResultsNow: function hideResultsNow() {
			if (this.timeout) clearTimeout(this.timeout);
			(0, _dom.removeClass)(this.element, this.options.loadingClass);
			//if (this.$results.is(":visible")) {
			this._results.style.display = 'none';
			//}
			if (this.options.mustMatch) {
				var v = this.element.value;
				if (v != this.lastSelected) {
					this.selectItem(null);
				}
			}
		},
		receiveData: function receiveData(q, data) {
			if (data) {
				(0, _dom.removeClass)(this.element, this.options.loadingClass);
				this._results.innerHTML = '';
	
				if (!this.hasFocus || data.length == 0) return this.hideResultsNow();
	
				this._results.appendChild(this.dataToDom(data));
				// autofill in the complete box w/the first match as long as the user hasn't entered in more data
				if (this.options.autoFill && this.element.value.toLowerCase() == q.toLowerCase()) this.autoFill(data[0][0]);
				this.showResults();
			} else {
				this.hideResultsNow();
			}
		},
		filterData: function filterData(v, items) {
			if (!v) return items;
			var _items = [];
			for (var i = 0, count = items.length; i < count; i++) {
				var label = items[i].label;
				if (label.indexOf(v) > -1) _items.push(items[i]);
			}
			return _items;
		},
		receiveData2: function receiveData2(items) {
			if (items) {
				(0, _dom.removeClass)(this.element, this.options.loadingClass);
				this._results.innerHTML = '';
	
				// if the field no longer has focus or if there are no matches, do not display the drop down
				if (!this.hasFocus || items.length == 0) return this.hideResultsNow();
	
				this._results.appendChild(this.dataToDom2(items));
				this.showResults();
			} else {
				this.hideResultsNow();
			}
		},
		dataToDom2: function dataToDom2(items) {
			var ul = document.createElement("ul");
			var num = items.length;
			var me = this;
			var showMoreMenu = false;
	
			// limited results to a max number
			if (this.options.maxItemsToShow > 0 && this.options.maxItemsToShow < num) {
				num = this.options.maxItemsToShow;
				if (this.options.moreMenuClick) {
					showMoreMenu = true;
				}
			}
	
			for (var i = 0; i < num; i++) {
				var item = items[i];
				if (!item) continue;
				var li = document.createElement("li");
				if (this.options.formatItem) li.innerHTML = this.options.formatItem(item, i, num);else li.innerHTML = item.label;
				li.selectValue = item.label;
				li._item = item;
				ul.appendChild(li);
				(0, _event.on)(li, 'mouseenter', function () {
					var _li = ul.querySelector('li.ac_over');
					if (_li) (0, _dom.removeClass)(_li, 'ac_over');;
					(0, _dom.addClass)(this, "ac_over");
					me.active = indexOf(ul.querySelectorAll('li'), this);
				});
				(0, _event.on)(li, 'mouseleave', function () {
					(0, _dom.removeClass)(this, "ac_over");
				});
				(0, _event.on)(li, 'mousedown', function (e) {
					(0, _event.stopEvent)(e);
					me.selectItem(this);
				});
			}
			if (showMoreMenu) {
				var li = document.createElement("li");
				li.innerHTML = '更多';
				ul.appendChild(li);
				(0, _event.on)(li, 'mouseenter', function () {
					var _li = ul.querySelector('li.ac_over');
					if (_li) (0, _dom.removeClass)(_li, 'ac_over');;
					(0, _dom.addClass)(this, "ac_over");
				});
				(0, _event.on)(li, 'mouseleave', function () {
					(0, _dom.removeClass)(this, "ac_over");
				});
				(0, _event.on)(li, 'mousedown', function (e) {
					(0, _event.stopEvent)(e);
					me.options.moreMenuClick.call(me);
				});
			}
			return ul;
		},
		parseData: function parseData() {
			if (!data) return null;
			var parsed = [];
			var rows = data.split(this.options.lineSeparator);
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (row) {
					parsed[parsed.length] = row.split(this.options.cellSeparator);
				}
			}
			return parsed;
		},
		dataToDom: function dataToDom(data) {
			var ul = document.createElement("ul");
			var num = data.length;
			var self = this;
			var showMoreMenu = false;
	
			// limited results to a max number
			if (this.options.maxItemsToShow > 0 && this.options.maxItemsToShow < num) {
				num = this.options.maxItemsToShow;
				if (this.options.moreMenuClick) {
					showMoreMenu = true;
				}
			}
	
			for (var i = 0; i < num; i++) {
				var row = data[i];
				if (!row) continue;
				var li = document.createElement("li");
				if (this.options.formatItem) {
					li.innerHTML = this.options.formatItem(row, i, num);
					li.selectValue = row[0];
				} else {
					li.innerHTML = row[0];
					li.selectValue = row[0];
				}
				var extra = null;
				if (row.length > 1) {
					extra = [];
					for (var j = 1; j < row.length; j++) {
						extra[extra.length] = row[j];
					}
				}
				li.extra = extra;
				ul.appendChild(li);
				(0, _event.on)(li, 'mouseenter', function () {
					var _li = ul.querySelector('li.ac_over');
					if (_li) (0, _dom.removeClass)(_li, 'ac_over');;
					(0, _dom.addClass)(this, "ac_over");
					self.active = indexOf(ul.querySelectorAll('li'), this);
				});
				(0, _event.on)(li, 'mouseleave', function () {
					(0, _dom.removeClass)(this, "ac_over");
				});
				(0, _event.on)(li, 'mousedown', function () {
					(0, _event.stopEvent)(e);
					self.selectItem(this);
				});
			}
			if (showMoreMenu) {
				var li = document.createElement("li");
				li.innerHTML = '更多';
				ul.appendChild(li);
				(0, _event.on)(li, 'mouseenter', function () {
					var _li = ul.querySelector('li.ac_over');
					if (_li) (0, _dom.removeClass)(_li, 'ac_over');;
					(0, _dom.addClass)(this, "ac_over");
				});
				(0, _event.on)(li, 'mouseleave', function () {
					(0, _dom.removeClass)(this, "ac_over");
				});
				(0, _event.on)(li, 'mousedown', function (e) {
					(0, _event.stopEvent)(e);
					self.options.moreMenuClick.call(self);
				});
			}
			return ul;
		},
		requestData: function requestData() {
			var self = this;
			if (!this.options.matchCase) q = q.toLowerCase();
			var data = this.options.cacheLength ? this.loadFromCache(q) : null;
			// recieve the cached data
			if (data) {
				this.receiveData(q, data);
				// if an AJAX url has been supplied, try loading the data now
			} else if (typeof this.options.url == "string" && this.options.url.length > 0) {
				(0, _ajax.ajax)({
					url: this.makeUrl(q),
					success: function success(data) {
						data = self.parseData(data);
						self.addToCache(q, data);
						self.receiveData(q, data);
					}
				});
				// if there's been no data found, remove the loading class
			} else {
				(0, _dom.removeClass)(this.element, this.options.loadingClass);
			}
		},
		makeUrl: function makeUrl(q) {
			var url = this.options.url + "?q=" + encodeURI(q);
			for (var i in this.options.extraParams) {
				url += "&" + i + "=" + encodeURI(this.options.extraParams[i]);
			}
			return url;
		},
		loadFromCache: function loadFromCache() {
			if (!q) return null;
			if (this.cache.data[q]) return this.cache.data[q];
			if (this.options.matchSubset) {
				for (var i = q.length - 1; i >= this.options.minChars; i--) {
					var qs = q.substr(0, i);
					var c = this.cache.data[qs];
					if (c) {
						var csub = [];
						for (var j = 0; j < c.length; j++) {
							var x = c[j];
							var x0 = x[0];
							if (this.matchSubset(x0, q)) {
								csub[csub.length] = x;
							}
						}
						return csub;
					}
				}
			}
			return null;
		},
		matchSubset: function matchSubset(s, sub) {
			if (!this.options.matchCase) s = s.toLowerCase();
			var i = s.indexOf(sub);
			if (i == -1) return false;
			return i == 0 || this.options.matchContains;
		},
		addToCache: function addToCache(q, data) {
			if (!data || !q || !this.options.cacheLength) return;
			if (!this.cache.length || this.cache.length > this.options.cacheLength) {
				this.flushCache();
				this.cache.length++;
			} else if (!this.cache[q]) {
				this.cache.length++;
			}
			this.cache.data[q] = data;
		}
	}); /**
	     * Module : neoui-autocompete
	     * Author : Kvkens(yueming@yonyou.com)
	     * Date	  : 2016-08-02 15:14:43
	     */
	
	function findPos(obj) {
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
		return {
			x: curleft,
			y: curtop
		};
	}
	
	function indexOf(element, e) {
		for (var i = 0; i < element.length; i++) {
			if (element[i] == e) return i;
		}
		return -1;
	};
	
	_compMgr.compMgr.regComp({
		comp: Autocomplete,
		compAsString: 'u.Autocomplete',
		css: 'u-autocomplete'
	});
	
	exports.Autocomplete = Autocomplete;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
		if (match != null) {
			browserMatch = {
				browser: "",
				version: "0"
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
	
	var env = u;
	exports.env = env;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.extend = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.compMgr = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Module : Sparrow compMgr
	                                                                                                                                                                                                                                                   * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                   * Date	  : 2016-07-28 18:41:06
	                                                                                                                                                                                                                                                   */
	
	var _dom = __webpack_require__(10);
	
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
	
	var compMgr = CompMgr;
	exports.compMgr = compMgr;
	
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.showPanelByEle = exports.getScroll = exports.getOffset = exports.makeModal = exports.makeDOM = exports.getZIndex = exports.getStyle = exports.wrap = exports.css = exports.closest = exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = undefined;
	
	var _event = __webpack_require__(5);
	
	/**
	 * 元素增加指定样式
	 * @param value
	 * @returns {*}
	 */
	var addClass = function addClass(element, value) {
		if (typeof element.classList === 'undefined') {
			if (u._addClass) u._addClass(element, value);
		} else {
			element.classList.add(value);
		}
		return u;
	};
	/**
	 * 删除元素上指定样式
	 * @param {Object} element
	 * @param {Object} value
	 */
	/**
	 * Module : Sparrow dom
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-27 21:46:50
	 */
	var removeClass = function removeClass(element, value) {
		if (typeof element.classList === 'undefined') {
			if (u._removeClass) u._removeClass(element, value);
		} else {
			element.classList.remove(value);
		}
		return u;
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
		offset.top += Node.scrollTop;
		offset.left += Node.scrollLeft;
		if (Node.parentNode) return getScroll(Node.parentNode, offset);else return offset;
	};
	var showPanelByEle = function showPanelByEle(obj) {
		var ele = obj.ele,
		    panel = obj.panel,
		    position = obj.position,
		    off = getOffset(ele),
		    scroll = getScroll(ele),
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

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ajax = undefined;
	
	var _env = __webpack_require__(6);
	
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
			if (_env.env.isIE8) {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP  
			} else if (_env.env.isIE) {
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
	}; /**
	    * Module : Sparrow ajax
	    * Author : Kvkens(yueming@yonyou.com)
	    * Date	  : 2016-07-28 19:06:36
	    */
	
	var ajax = XmlHttp.ajax;
	exports.ajax = ajax;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Button = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _env = __webpack_require__(6);
	
	var _event = __webpack_require__(5);
	
	var _ripple = __webpack_require__(13);
	
	var _compMgr = __webpack_require__(9);
	
	/**
	 * Module : neoui-button
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 13:01:05
	 */
	
	var Button = _BaseComponent.BaseComponent.extend({
		init: function init() {
			var rippleContainer = document.createElement('span');
			(0, _dom.addClass)(rippleContainer, 'u-button-container');
			this._rippleElement = document.createElement('span');
			(0, _dom.addClass)(this._rippleElement, 'u-ripple');
			if (_env.env.isIE8) (0, _dom.addClass)(this._rippleElement, 'oldIE');
			rippleContainer.appendChild(this._rippleElement);
			(0, _event.on)(this._rippleElement, 'mouseup', this.element.blur);
			this.element.appendChild(rippleContainer);
	
			(0, _event.on)(this.element, 'mouseup', this.element.blur);
			(0, _event.on)(this.element, 'mouseleave', this.element.blur);
			this.ripple = new _ripple.Ripple(this.element);
		}
	
	});
	
	_compMgr.compMgr.regComp({
		comp: Button,
		compAsString: 'u.Button',
		css: 'u-button'
	});
	
	exports.Button = Button;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ripple = undefined;
	
	var _env = __webpack_require__(6);
	
	var _dom = __webpack_require__(10);
	
	var _event = __webpack_require__(5);
	
	var URipple = function URipple(element) {
	  if (_env.isIE8) return;
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
	  if (_env.isIE8) return;
	  if (!this._rippleElement.style.width && !this._rippleElement.style.height) {
	    var rect = this._element.getBoundingClientRect();
	    this.rippleSize_ = Math.sqrt(rect.width * rect.width + rect.height * rect.height) * 2 + 2;
	    this._rippleElement.style.width = this.rippleSize_ + 'px';
	    this._rippleElement.style.height = this.rippleSize_ + 'px';
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
	  if (_env.isIE8) return;
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
	  if (_env.isIE8) return;
	  return this.frameCount_;
	};
	/**
	     * Setter for frameCount_.
	     * @param {number} fC the frame count.
	     */
	URipple.prototype.setFrameCount = function (fC) {
	  if (_env.isIE8) return;
	  this.frameCount_ = fC;
	};
	
	/**
	     * Getter for _rippleElement.
	     * @return {Element} the ripple element.
	     */
	URipple.prototype.getRippleElement = function () {
	  if (_env.isIE8) return;
	  return this._rippleElement;
	};
	
	/**
	 * Sets the ripple X and Y coordinates.
	 * @param  {number} newX the new X coordinate
	 * @param  {number} newY the new Y coordinate
	 */
	URipple.prototype.setRippleXY = function (newX, newY) {
	  if (_env.isIE8) return;
	  this.x_ = newX;
	  this.y_ = newY;
	};
	
	/**
	 * Sets the ripple styles.
	 * @param  {boolean} start whether or not this is the start frame.
	 */
	URipple.prototype.setRippleStyles = function (start) {
	  if (_env.isIE8) return;
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
	  if (_env.isIE8) return;
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
	  if (_env.isIE8) return;
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Checkbox = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _event = __webpack_require__(5);
	
	var _compMgr = __webpack_require__(9);
	
	/**
	 * Module : neoui-checkbox
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 13:55:07
	 */
	var Checkbox = _BaseComponent.BaseComponent.extend({
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
	    init: function init() {
	        this._inputElement = this.element.querySelector('input');
	
	        var boxOutline = document.createElement('span');
	        (0, _dom.addClass)(boxOutline, this._CssClasses.BOX_OUTLINE);
	
	        var tickContainer = document.createElement('span');
	        (0, _dom.addClass)(tickContainer, this._CssClasses.FOCUS_HELPER);
	
	        var tickOutline = document.createElement('span');
	        (0, _dom.addClass)(tickOutline, this._CssClasses.TICK_OUTLINE);
	
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
	        if (!(0, _dom.hasClass)(this.element, 'only-style')) {
	            (0, _event.on)(this.element, 'click', function (e) {
	                if (!this._inputElement.disabled) {
	                    this.toggle();
	                    (0, _event.stopEvent)(e);
	                }
	            }.bind(this));
	        }
	
	        this._updateClasses();
	        (0, _dom.addClass)(this.element, this._CssClasses.IS_UPGRADED);
	    },
	
	    _onChange: function _onChange(event) {
	        this._updateClasses();
	        this.trigger('change', { isChecked: this._inputElement.checked });
	    },
	
	    _onFocus: function _onFocus() {
	        (0, _dom.addClass)(this.element, this._CssClasses.IS_FOCUSED);
	    },
	
	    _onBlur: function _onBlur() {
	        (0, _dom.removeClass)(this.element, this._CssClasses.IS_FOCUSED);
	    },
	
	    _onMouseUp: function _onMouseUp(event) {
	        this._blur();
	    },
	
	    /**
	     * Handle class updates.
	     *
	     * @private
	     */
	    _updateClasses: function _updateClasses() {
	        this.checkDisabled();
	        this.checkToggleState();
	    },
	
	    /**
	     * Add blur.
	     *
	     * @private
	     */
	    _blur: function _blur() {
	        // TODO: figure out why there's a focus event being fired after our blur,
	        // so that we can avoid this hack.
	        window.setTimeout(function () {
	            this._inputElement.blur();
	        }.bind(this), /** @type {number} */this._Constant.TINY_TIMEOUT);
	    },
	
	    // Public methods.
	
	    /**
	     * Check the inputs toggle state and update display.
	     *
	     * @public
	     */
	    checkToggleState: function checkToggleState() {
	        if (this._inputElement.checked) {
	            (0, _dom.addClass)(this.element, this._CssClasses.IS_CHECKED);
	        } else {
	            (0, _dom.removeClass)(this.element, this._CssClasses.IS_CHECKED);
	        }
	    },
	
	    /**
	     * Check the inputs disabled state and update display.
	     *
	     * @public
	     */
	    checkDisabled: function checkDisabled() {
	        if (this._inputElement.disabled) {
	            (0, _dom.addClass)(this.element, this._CssClasses.IS_DISABLED);
	        } else {
	            (0, _dom.removeClass)(this.element, this._CssClasses.IS_DISABLED);
	        }
	    },
	
	    isChecked: function isChecked() {
	        //return hasClass(this.element,this._CssClasses.IS_CHECKED);
	        return this._inputElement.checked;
	    },
	
	    toggle: function toggle() {
	        //return;
	        if (this.isChecked()) {
	            this.uncheck();
	        } else {
	            this.check();
	        }
	    },
	
	    /**
	     * Disable checkbox.
	     *
	     * @public
	     */
	    disable: function disable() {
	        this._inputElement.disabled = true;
	        this._updateClasses();
	    },
	
	    /**
	     * Enable checkbox.
	     *
	     * @public
	     */
	    enable: function enable() {
	        this._inputElement.disabled = false;
	        this._updateClasses();
	    },
	
	    /**
	     * Check checkbox.
	     *
	     * @public
	     */
	    check: function check() {
	        this._inputElement.checked = true;
	        this._updateClasses();
	        this.boundInputOnChange();
	    },
	
	    /**
	     * Uncheck checkbox.
	     *
	     * @public
	     */
	    uncheck: function uncheck() {
	        this._inputElement.checked = false;
	        this._updateClasses();
	        this.boundInputOnChange();
	    }
	
	});
	
	_compMgr.compMgr.regComp({
	    comp: Checkbox,
	    compAsString: 'u.Checkbox',
	    css: 'u-checkbox'
	});
	exports.Checkbox = Checkbox;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Combo = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _env = __webpack_require__(6);
	
	var _event = __webpack_require__(5);
	
	var _neouiTextfield = __webpack_require__(16);
	
	var _compMgr = __webpack_require__(9);
	
	/**
	 * Module : neoui-combo
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 14:09:22
	 */
	
	var Combo = _BaseComponent.BaseComponent.extend({
		init: function init() {
			this.mutilSelect = this.options['mutilSelect'] || false;
			if ((0, _dom.hasClass)(this.element, 'mutil-select')) {
				this.mutilSelect = true;
			}
	
			this.onlySelect = this.options['onlySelect'] || false;
			if (this.mutilSelect) this.onlySelect = true;
	
			this.comboDatas = [];
			var i,
			    option,
			    datas = [],
			    self = this;
			//addClass(this.element, 'u-text')
			new _neouiTextfield.Text(this.element);
			var options = this.element.getElementsByTagName('option');
			for (i = 0; i < options.length; i++) {
				option = options[i];
				datas.push({
					value: option.value,
					name: option.text
				});
			}
	
			this.setComboData(datas);
			this._input = this.element.querySelector("input");
			if (this.onlySelect || _env.env.isMobile) {
				setTimeout(function () {
					self._input.setAttribute('readonly', 'readonly');
				}, 1000);
			} else {
				(0, _event.on)(this._input, 'blur', function (e) {
					var v = this.value;
					/*校验数值是否存在于datasource的name中*/
					for (var i = 0; i < self.comboDatas.length; i++) {
						if (v == self.comboDatas[i].name) {
							v = self.comboDatas[i].value;
							break;
						}
					}
					self.setValue(v);
				});
			}
			this._combo_name_par = this.element.querySelector(".u-combo-name-par");
			(0, _event.on)(this._input, 'focus', function (e) {
				self._inputFocus = true;
				self.show(e);
				(0, _event.stopEvent)(e);
			});
			(0, _event.on)(this._input, 'blur', function (e) {
				self._inputFocus = false;
			});
	
			(0, _event.on)(this.input, 'keydown', function (e) {
				var keyCode = e.keyCode;
				if (e.keyCode == 13) {
					// 回车
					this.blur();
				}
			});
			this.iconBtn = this.element.querySelector("[data-role='combo-button']");
			if (this.iconBtn) {
				(0, _event.on)(this.iconBtn, 'click', function (e) {
					self._input.focus();
					(0, _event.stopEvent)(e);
				});
			}
		},
	
		show: function show(evt) {
	
			var self = this,
			    width = this._input.offsetWidth;
			if (this.options.showFix) {
				document.body.appendChild(this._ul);
				this._ul.style.position = 'fixed';
				(0, _dom.showPanelByEle)({
					ele: this._input,
					panel: this._ul,
					position: "bottomLeft"
				});
			} else {
				this.element.parentNode.appendChild(this._ul);
				var left = this.element.offsetLeft,
				    inputHeight = this.element.offsetHeight,
				    top = this.element.offsetTop + inputHeight;
				this._ul.style.left = left + 'px';
				this._ul.style.top = top + 'px';
			}
			this._ul.style.width = width + 'px';
			(0, _dom.addClass)(this._ul, 'is-animating');
			this._ul.style.zIndex = (0, _dom.getZIndex)();
			(0, _dom.addClass)(this._ul, 'is-visible');
	
			var callback = function (e) {
				if (e === evt || e.target === this._input || self._inputFocus == true) return;
				if (this.mutilSelect && ((0, _dom.closest)(e.target, 'u-combo-ul') === self._ul || (0, _dom.closest)(e.target, 'u-combo-name-par') || (0, _dom.closest)(e.target, 'u-combo-name'))) return;
				off(document, 'click', callback);
				// document.removeEventListener('click', callback);
				this.hide();
			}.bind(this);
			(0, _event.on)(document, 'click', callback);
			(0, _event.on)(document.body, 'touchend', callback);
			// document.addEventListener('click', callback);
		},
	
		hide: function hide() {
			(0, _dom.removeClass)(this._ul, 'is-visible');
			this._ul.style.zIndex = -1;
			this.trigger('select', {
				value: this.value
			});
		},
	
		/**
	  * 设置下拉数据
	  * @param datas  数据项
	  * @param options  指定name value对应字段 可以为空
	  */
		setComboData: function setComboData(datas, options) {
			var i,
			    li,
			    self = this;
			if (!options) this.comboDatas = datas;else {
				this.comboDatas = [];
				for (var i = 0; i < datas.length; i++) {
					this.comboDatas.push({
						name: datas[i][options.name],
						value: datas[i][options.value]
					});
				}
			}
			if (!this._ul) {
				this._ul = (0, _dom.makeDOM)('<ul class="u-combo-ul"></ul>');
	
				// document.body.appendChild(this._ul);
			}
			this._ul.innerHTML = '';
			//TODO 增加filter
			for (i = 0; i < this.comboDatas.length; i++) {
				li = (0, _dom.makeDOM)('<li class="u-combo-li">' + this.comboDatas[i].name + '</li>'); //document.createElement('li');
				li._index = i;
				(0, _event.on)(li, 'click', function () {
					self.selectItem(this._index);
				});
				var rippleContainer = document.createElement('span');
				(0, _dom.addClass)(rippleContainer, 'u-ripple-container');
				var _rippleElement = document.createElement('span');
				(0, _dom.addClass)(_rippleElement, 'u-ripple');
	
				rippleContainer.appendChild(_rippleElement);
				li.appendChild(rippleContainer);
				new URipple(li);
				this._ul.appendChild(li);
			}
		},
	
		selectItem: function selectItem(index) {
			var self = this;
	
			if (this.mutilSelect) {
				var val = this.comboDatas[index].value;
				var name = this.comboDatas[index].name;
				var index = (this.value + ',').indexOf(val + ',');
				var l = val.length + 1;
				var flag;
				if (index != -1) {
					// 已经选中
					this.value = this.value.substring(0, index) + this.value.substring(index + l);
					flag = '-';
				} else {
					this.value = !this.value ? val + ',' : this.value + val + ',';
					flag = '+';
				}
	
				if (flag == '+') {
					var nameDiv = (0, _dom.makeDOM)('<div class="u-combo-name" key="' + val + '">' + name + /*<a href="javascript:void(0)" class="remove">x</a>*/'</div>');
					var parNameDiv = (0, _dom.makeDOM)('<div class="u-combo-name-par" style="position:absolute"></div>');
					/*var _a = nameDiv.querySelector('a');
	    on(_a, 'click', function(){
	        var values = self.value.split(',');
	        values.splice(values.indexOf(val),1);
	        self.value = values.join(',');
	        self._combo_name_par.removeChild(nameDiv);
	        self._updateItemSelect();
	        self.trigger('select', {value: self.value, name: name});
	    });*/
					if (!this._combo_name_par) {
						this._input.parentNode.insertBefore(parNameDiv, this._input);
						this._combo_name_par = parNameDiv;
					}
					this._combo_name_par.appendChild(nameDiv);
				} else {
					if (this._combo_name_par) {
						var comboDiv = this._combo_name_par.querySelector('[key="' + val + '"]');
						if (comboDiv) this._combo_name_par.removeChild(comboDiv);
					}
				}
	
				this._updateItemSelect();
	
				// this.trigger('select', {value: this.value, name: name});
			} else {
				this.value = this.comboDatas[index].value;
				this._input.value = this.comboDatas[index].name;
				this._updateItemSelect();
				// this.trigger('select', {value: this.value, name: this._input.value});
			}
		},
	
		_updateItemSelect: function _updateItemSelect() {
			var lis = this._ul.querySelectorAll('.u-combo-li');
			if (this.mutilSelect) {
				var values = this.value.split(',');
				for (var i = 0; i < lis.length; i++) {
					if (values.indexOf(this.comboDatas[i].value) > -1) {
						(0, _dom.addClass)(lis[i], 'is-selected');
					} else {
						(0, _dom.removeClass)(lis[i], 'is-selected');
					}
				}
				/*根据多选区域div的高度调整input的高度*/
				var h = this._combo_name_par.offsetHeight;
				if (h < 25) h = 25;
				this._input.style.height = h + 'px';
			} else {
				for (var i = 0; i < lis.length; i++) {
					if (this.value == this.comboDatas[i].value) {
						(0, _dom.addClass)(lis[i], 'is-selected');
					} else {
						(0, _dom.removeClass)(lis[i], 'is-selected');
					}
				}
			}
		},
	
		/**
	  *设置值
	  * @param value
	  */
		setValue: function setValue(value) {
			var self = this;
			value = value + '';
			value = value || '';
	
			var values = value.split(',');
			if (this.mutilSelect === true) {
				if (self._combo_name_par) self._combo_name_par.innerHTML = '';
				this.value = '';
			}
			if (!value) {
				this._input.value = '';
				this.value = '';
			}
			var matched = false;
			this.comboDatas.forEach(function (item, index) {
				if (this.mutilSelect === true) {
					if (values.indexOf(item.value) != -1) {
						this.selectItem(index);
					}
				} else {
					if (item.value === value) {
						this.selectItem(index);
						matched = true;
						return;
					}
				}
			}.bind(this));
			if (!this.onlySelect && !matched) {
				this.value = value;
				this._input.value = value;
				this.trigger('select', {
					value: this.value,
					name: this._input.value
				});
			}
		},
	
		/**
	  * 设置显示名
	  * @param name
	  */
		setName: function setName(name) {
			this.comboDatas.forEach(function (item, index) {
				if (item.name === name) {
					this.selectItem(index);
					return;
				}
			}.bind(this));
		}
	
	});
	
	_compMgr.compMgr.regComp({
		comp: Combo,
		compAsString: 'u.Combo',
		css: 'u-combo'
	});
	exports.Combo = Combo;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Text = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _env = __webpack_require__(6);
	
	var _event = __webpack_require__(5);
	
	var _compMgr = __webpack_require__(9);
	
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
	exports.Text = Text;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Combobox = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _event = __webpack_require__(5);
	
	var _extend = __webpack_require__(7);
	
	var _env = __webpack_require__(6);
	
	var _compMgr = __webpack_require__(9);
	
	/**
	 * Module : neoui-combobox
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 12:56:32
	 */
	
	var Combobox = _BaseComponent.BaseComponent.extend({
		DEFAULTS: {
			dataSource: {},
			mutil: false,
			enable: true,
			single: true,
			onSelect: function onSelect() {}
		},
		init: function init() {
			var self = this;
			var element = this.element;
			this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
			this.items = [];
			//this.oLis = [];
			this.mutilPks = [];
			this.oDiv = null;
			Object.defineProperty(element, 'value', {
				get: function get() {
	
					return this.trueValue;
				},
				set: function set(pk) {
	
					var items = self.items;
					//var oLis = self.oLis;
					var oLis = self.oDiv.childNodes;
	
					if (self.options.single == "true" || self.options.single == true) {
	
						for (var i = 0, length = items.length; i < length; i++) {
	
							var ipk = items[i].pk;
							if (ipk == pk) {
								this.innerHTML = items[i].name;
								this.trueValue = pk;
								break;
							} else {
	
								this.trueValue = '';
								this.innerHTML = '';
							}
						}
					} else if (self.options.mutil == "true" || self.options.mutil == true) {
	
						if (!_env.env.isArray(pk)) {
							if (typeof pk == "string" && pk !== "") {
								pk = pk.split(',');
								self.mutilPks = pk;
							} else {
								return;
							}
						}
	
						if (self.mutilPks.length == 0) {
							self.mutilPks = pk;
						}
	
						this.innerHTML = '';
						var valueArr = [];
	
						for (var j = 0; j < pk.length; j++) {
	
							for (var i = 0, length = oLis.length; i < length; i++) {
								var ipk = oLis[i].item.pk;
								if (pk[j] == ipk) {
	
									valueArr.push(pk[j]);
	
									oLis[i].style.display = 'none';
									var activeSelect = document.createElement("Div");
									activeSelect.className = "mutil-select-div";
									var selectName = "<i class='itemName'>" + items[i].name + "</i>";
									var imageFont = "<i class='uf uf-removesymbol'></i>";
									activeSelect.insertAdjacentHTML("beforeEnd", imageFont + selectName);
									this.appendChild(activeSelect);
	
									//activeSelect.append(imageFont);
									//	activeSelect.append(selectName);
	
									(0, _event.on)(activeSelect.querySelector(".uf-removesymbol"), 'mousedown', function () {
	
										//var $this = $(this);
										//var lis = self.oLis;
										//var lis = $(self.oDiv).find('li');
										var lis = self.oDiv.childNodes;
										for (var j = 0, len = lis.length; j < len; j++) {
											if (lis[j].item.name == this.nextSibling.innerHTML) {
												lis[j].style.display = 'block';
	
												for (var h = 0; h < self.mutilPks.length; h++) {
													if (self.mutilPks[h] == lis[j].item.pk) {
														self.mutilPks.splice(h, 1);
														h--;
													}
												}
	
												for (var b = 0; b < valueArr.length; b++) {
													if (valueArr[b] == lis[j].item.pk) {
														valueArr.splice(b, 1);
														b--;
													}
												}
											}
										}
	
										activeSelect.removeChild(this.parentNode);
										element.trueValue = '';
										element.trueValue = valueArr.toString();
										(0, _event.trigger)(element, 'mutilSelect', valueArr.toString());
									});
	
									//	var selectName = $("<i class='itemName'>" + items[i].name + "</i>");
	
									//	var activeSelect = $("<div class='mutil-select-div'></div>")
	
								}
							}
						}
	
						this.trueValue = valueArr.toString();
					}
				}
			});
			//禁用下拉框
			if (this.options.readonly === "readonly") return;
	
			if (this.options.single == "true" || this.options.single == true) {
				this.singleSelect();
			}
	
			if (this.options.mutil == "true" || this.options.mutil == true) {
				this.mutilSelect();
			}
	
			this.clickEvent();
	
			this.blurEvent();
	
			this.comboFilter();
	
			this.comboFilterClean();
		}
	});
	
	Combobox.fn = Combobox.prototype;
	
	Combobox.fn.createDom = function () {
	
		var data = this.options.dataSource;
		if (_env.env.isEmptyObject(data)) {
			throw new Error("dataSource为空！");
		}
	
		var oDiv = document.createElement("div");
		oDiv.className = 'select-list-div';
		//this.oDiv
		this.oDiv = oDiv;
		//新增搜索框
	
		var searchDiv = document.createElement("div");
		searchDiv.className = 'select-search';
		var searchInput = document.createElement("input");
		searchDiv.appendChild(searchInput);
		oDiv.appendChild(searchDiv);
		//禁用搜索框
		if (this.options.readchange) {
			searchDiv.style.display = "none";
		}
		var oUl = document.createElement("ul");
	
		oUl.className = 'select-list-ul';
	
		for (var i = 0; i < data.length; i++) {
			var item = {
				pk: data[i].pk,
				name: data[i].name
			};
			this.items.push(item);
			var oLi = document.createElement("li");
	
			oLi.item = item;
			oLi.innerHTML = data[i]['name'];
	
			//this.oLis.push(oLi);
	
			oUl.appendChild(oLi);
		}
	
		oDiv.appendChild(oUl);
		oDiv.style.display = 'none';
		document.body.appendChild(oDiv);
	};
	
	Combobox.fn.focusEvent = function () {
		var self = this;
		(0, _event.on)(this.element, 'click', function (e) {
			if (self.options.readchange == true) return;
			var returnValue = self.show();
	
			if (returnValue === 1) return;
			// self.show();
	
			self.floatLayer();
	
			self.floatLayerEvent();
	
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		});
	};
	
	//下拉图标的点击事件
	Combobox.fn.clickEvent = function () {
		var self = this;
		//var caret = this.$element.next('.input-group-addon')[0] || this.$element.next(':button')[0];
		var caret = this.element.nextSibling;
		(0, _event.on)(caret, 'click', function (e) {
			self.show();
			self.floatLayer();
			self.floatLayerEvent();
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		});
	};
	
	//tab键切换 下拉隐藏	
	Combobox.fn.blurEvent = function () {
		var self = this;
	
		(0, _event.on)(this.element, 'keyup', function (e) {
			var key = e.which || e.keyCode;
			if (key == 9) self.show();
		});
		(0, _event.on)(this.element, 'keydown', function (e) {
			var key = e.which || e.keyCode;
			if (key == 9) self.hide();
		});
	};
	
	Combobox.fn.floatLayer = function () {
	
		if (!document.querySelector(".select-floatDiv")) {
	
			var oDivTwo = document.createElement("div");
			oDivTwo.className = 'select-floatDiv';
			document.body.appendChild(oDivTwo);
		}
	};
	
	Combobox.fn.floatLayerEvent = function () {
		var self = this;
		(0, _event.on)(document.querySelector(".select-floatDiv"), "click", function (e) {
	
			self.hide();
			this.parentNode.removeChild(this);
	
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		});
	};
	
	Combobox.fn.show = function () {
	
		//var oLis = this.oLis;
		var oLis = this.oDiv.querySelector("ul").childNodes;
		var vote = 0;
		for (var i = 0, length = oLis.length; i < length; i++) {
	
			if (oLis[i].style.display == 'none') {
				vote++;
			}
		}
	
		if (vote === length) return 1;
	
		var left = this.element.offsetLeft;
		var top = this.element.offsetTop;
	
		var selectHeight = this.options.dataSource.length * 30 + 10 + 10;
	
		var differ = top + (0, _dom.getStyle)(this.element, "height") + selectHeight - (window.outerHeight + window.scrollY);
		var oDiv = this.oDiv;
	
		if (differ > 0) {
	
			oDiv.style.left = left + 'px';
			oDiv.style.top = top - selectHeight + 'px';
		} else {
	
			oDiv.style.left = left + 'px';
			oDiv.style.top = top + (0, _dom.getStyle)(this.element, "height") + 'px';
		}
	
		oDiv.style.display = 'block';
	};
	
	Combobox.fn.hide = function () {
		this.oDiv.style.display = 'none';
	};
	
	Combobox.fn.singleDivValue = function () {
		var self = this;
		//var oLis = this.oLis;
		var oLis = this.oDiv.querySelector("ul").childNodes;
		for (var i = 0; i < oLis.length; i++) {
	
			(0, _event.on)(oLis[i], "click", function () {
	
				var item = this.item;
				self.element.value = item.pk;
	
				self.oDiv.style.display = 'none';
	
				self.options.onSelect(item);
	
				(0, _event.trigger)(self.element, 'change');
			});
		}
	};
	
	Combobox.fn.mutilDivValue = function () {
		var self = this;
		//var oLis = this.oLis;
		var oLis = this.oDiv.querySelector("ul").childNodes;
		for (var i = 0; i < oLis.length; i++) {
			(0, _event.on)(oLis[i], "click", function () {
	
				var pk = this.item.pk;
				var mutilpks = self.mutilPks;
				var mutilLenth = mutilpks.length;
	
				if (mutilLenth > 0) {
	
					for (var k = 0; k < mutilLenth; k++) {
	
						if (pk == mutilpks[k]) {
	
							mutilpks.splice(k, 1);
							k--;
						}
					}
				}
	
				mutilpks.push(pk);
	
				self.element.value = mutilpks;
				(0, _event.trigger)(self.element, 'mutilSelect', mutilpks.toString());
				// element.trigger('mutilSelect',mutilpks.toString())
	
				self.oDiv.style.display = 'none';
				this.style.display = 'none';
				(0, _event.trigger)(self.element, 'change');
			});
		}
	};
	
	Combobox.fn.singleSelect = function () {
	
		this.createDom();
		this.focusEvent();
		this.singleDivValue();
	};
	
	Combobox.fn.mutilSelect = function () {
	
		this.createDom();
		this.mutilDivValue();
		this.focusEvent();
	};
	//过滤下拉选项
	Combobox.fn.comboFilter = function () {
		var self = this;
		(0, _event.on)(this.oDiv, "keyup", function () {
	
			var content = this.querySelector('.select-search input').value;
	
			var oLis = this.oDiv.querySelector("ul").childNodes;
			for (var i = 0; i < oLis.length; i++) {
				if (oLis[i].item.name.indexOf(content) != -1) {
					oLis[i].style.display = 'block';
				} else {
					oLis[i].style.display = 'none';
				}
			}
		});
	};
	
	//过滤的后续处理
	Combobox.fn.comboFilterClean = function () {
		var self = this;
		(0, _event.on)(self.element, "click", function () {
			// $(this.$element).on('click',function(){
			// $(self.oDiv).find('.select-search input').val('')  	
			self.oDiv.querySelector('.select-search input').value = "";
			var oLis = this.oDiv.querySelector("ul").childNodes;
			if (self.options.single == "true" || self.options.single == true) {
				for (var i = 0; i < oLis.length; i++) {
					oLis[i].style.display = 'block';
				}
			} else if (self.options.mutil == "true" || self.options.mutil == true) {
				var selectLisIndex = [];
				var selectLisSpan = this.querySelector('.mutil-select-div .itemName');
	
				for (var i = 0; i < selectLisSpan.length; i++) {
					for (var k = 0; k < oLis.length; k++) {
						if (selectLisSpan[i].innerHTML == oLis[k].item.name) {
							//oLis[k].style.display = 'none';
							selectLisIndex.push(k);
						}
					}
				}
	
				for (var l = 0; l < oLis.length; l++) {
					oLis[l].style.display = 'block';
					for (var j = 0; j < selectLisIndex.length; j++) {
						if (l == selectLisIndex[j]) oLis[l].style.display = 'none';
					}
				}
			}
		});
	};
	// var Plugin = function(option) {
	
	// var $this = $(this);
	// var data = $this.data('s.select');
	// var options = typeof option == 'object' && option
	
	// if (!data) $this.data('s.select', (new Combobox(this, options)))
	
	// }
	
	//动态设置li值
	// $.fn.setComboData = function(dataSourse) {
	// var $this = $(this).data('s.select');
	// if(!$this)return;
	// var data = dataSourse;
	// if (!$.isArray(data) || data.length == 0) return;
	
	// $this.items.length = 0;
	
	// var Olis = $($this.oDiv).find('li');
	
	
	// if(data.length < Olis.length){
	
	// for(var k=data.length;k<Olis.length;k++){
	// $(Olis[k]).remove();
	// }		
	
	// }else if(data.length > Olis.length){
	// var liTemplate = Olis[0]
	// var oUl = $($this.oDiv).find('ul')
	// for(var j=0;j<(data.length-Olis.length);j++){
	// $(liTemplate).clone(true).appendTo(oUl)
	// }
	// }
	
	// Olis = $($this.oDiv).find('li');
	
	// for (var i = 0; i < data.length; i++) {
	// var item = {
	// pk: data[i].pk,
	// name: data[i].name
	// }
	// $this.items.push(item)
	// Olis[i].item = item;
	// Olis[i].innerHTML = data[i]['name']
	// }
	
	// }
	
	// $.fn.Combobox = Plugin;
	_compMgr.compMgr.regComp({
		comp: Combobox,
		compAsString: 'u.Combobox',
		css: 'u-combobox'
	});
	
	exports.Combobox = Combobox;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Table = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _compMgr = __webpack_require__(9);
	
	/**
	 * Module : neoui-datatable
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 15:23:19
	 */
	
	var Table = _BaseComponent.BaseComponent.extend({
	    _CssClasses: {
	
	        SELECTABLE: 'selectable',
	        SELECT_ELEMENT: 'u-table-select',
	        IS_SELECTED: 'is-selected',
	        IS_UPGRADED: 'is-upgraded'
	    },
	
	    init: function init() {
	        var self = this;
	        this.element_ = this.element;
	        if (this.element_) {
	            var firstHeader = this.element_.querySelector('th');
	            var bodyRows = Array.prototype.slice.call(this.element_.querySelectorAll('tbody tr'));
	            var footRows = Array.prototype.slice.call(this.element_.querySelectorAll('tfoot tr'));
	            var rows = bodyRows.concat(footRows);
	
	            //if (this.element_.classList.contains(this._CssClasses.SELECTABLE)) {
	            //    var th = document.createElement('th');
	            //    var headerCheckbox = this._createCheckbox(null, rows);
	            //    th.appendChild(headerCheckbox);
	            //    firstHeader.parentElement.insertBefore(th, firstHeader);
	            //
	            //    for (var i = 0; i < rows.length; i++) {
	            //        var firstCell = rows[i].querySelector('td');
	            //        if (firstCell) {
	            //            var td = document.createElement('td');
	            //            if (rows[i].parentNode.nodeName.toUpperCase() === 'TBODY') {
	            //                var rowCheckbox = this._createCheckbox(rows[i]);
	            //                td.appendChild(rowCheckbox);
	            //            }
	            //            rows[i].insertBefore(td, firstCell);
	            //        }
	            //    }
	            //    this.element_.classList.add(this._CssClasses.IS_UPGRADED);
	            //}
	        }
	    },
	    _selectRow: function _selectRow(checkbox, row, opt_rows) {
	        if (row) {
	            return function () {
	                if (checkbox.checked) {
	                    row.classList.add(this._CssClasses.IS_SELECTED);
	                } else {
	                    row.classList.remove(this._CssClasses.IS_SELECTED);
	                }
	            }.bind(this);
	        }
	
	        if (opt_rows) {
	            return function () {
	                var i;
	                var el;
	                if (checkbox.checked) {
	                    for (i = 0; i < opt_rows.length; i++) {
	                        el = opt_rows[i].querySelector('td').querySelector('.u-checkbox');
	                        // el['MaterialCheckbox'].check();
	                        opt_rows[i].classList.add(this._CssClasses.IS_SELECTED);
	                    }
	                } else {
	                    for (i = 0; i < opt_rows.length; i++) {
	                        el = opt_rows[i].querySelector('td').querySelector('.u-checkbox');
	                        //el['MaterialCheckbox'].uncheck();
	                        opt_rows[i].classList.remove(this._CssClasses.IS_SELECTED);
	                    }
	                }
	            }.bind(this);
	        }
	    },
	    _createCheckbox: function _createCheckbox(row, opt_rows) {
	        var label = document.createElement('label');
	        var labelClasses = ['u-checkbox', this._CssClasses.SELECT_ELEMENT];
	        label.className = labelClasses.join(' ');
	        var checkbox = document.createElement('input');
	        checkbox.type = 'checkbox';
	        checkbox.classList.add('u-checkbox-input');
	
	        if (row) {
	            checkbox.checked = row.classList.contains(this._CssClasses.IS_SELECTED);
	            checkbox.addEventListener('change', this._selectRow(checkbox, row));
	        } else if (opt_rows) {
	            checkbox.addEventListener('change', this._selectRow(checkbox, null, opt_rows));
	        }
	
	        label.appendChild(checkbox);
	        new Checkbox(label);
	        return label;
	    }
	
	});
	
	_compMgr.compMgr.regComp({
	    comp: Table,
	    compAsString: 'u.Table',
	    css: 'u-table'
	});
	
	exports.Table = Table;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.dialogWizard = exports.dialog = exports.dialogMode = exports.confirmDialog = exports.messageDialog = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _event = __webpack_require__(5);
	
	var _extend = __webpack_require__(7);
	
	var _neouiButton = __webpack_require__(12);
	
	var _compMgr = __webpack_require__(9);
	
	/**
	 * messageDialog.js
	 */
	
	/**
	 * Module : neoui-dialog
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 15:29:55
	 */
	
	'use strict';
	
	/**
	 * 消息提示框
	 * @param options
	 */
	
	var messageDialogTemplate = '<div class="u-msg-dialog">' + '<div class="u-msg-title">' + '<h4>{title}</h4>' + '</div>' + '<div class="u-msg-content">' + '<p>{msg}</p>' + '</div>' + '<div class="u-msg-footer only-one-btn"><button class="u-msg-button u-button primary raised">{btnText}</button></div>' + '</div>';
	
	var messageDialog = function messageDialog(options) {
		var title, msg, btnText, template;
		if (typeof options === 'string') {
			options = {
				msg: options
			};
		}
		msg = options['msg'] || "";
		title = options['title'] || "提示";
		btnText = options['btnText'] || "确定";
		template = options['template'] || messageDialogTemplate;
	
		template = template.replace('{msg}', msg);
		template = template.replace('{title}', title);
		template = template.replace('{btnText}', btnText);
	
		var msgDom = (0, _dom.makeDOM)(template);
	
		var closeBtn = msgDom.querySelector('.u-msg-button');
		new _neouiButton.Button({
			el: closeBtn
		});
		(0, _event.on)(closeBtn, 'click', function () {
			document.body.removeChild(msgDom);
			document.body.removeChild(overlayDiv);
		});
		var overlayDiv = makeModal(msgDom);
		document.body.appendChild(msgDom);
	
		this.resizeFun = function () {
			var cDom = msgDom.querySelector('.u-msg-content');
			if (!cDom) return;
			cDom.style.height = '';
			var wholeHeight = msgDom.offsetHeight;
			var contentHeight = msgDom.scrollHeight;
			if (contentHeight > wholeHeight && cDom) cDom.style.height = wholeHeight - (56 + 46) + 'px';
		}.bind(this);
	
		this.resizeFun();
		(0, _event.on)(window, 'resize', this.resizeFun);
	};
	
	/**
	 * Module : confirmDialog
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 10:21:33
	 */
	var confirmDialogTemplate = '<div class="u-msg-dialog">' + '<div class="u-msg-title">' + '<h4>{title}</h4>' + '</div>' + '<div class="u-msg-content">' + '<p>{msg}</p>' + '</div>' + '<div class="u-msg-footer"><button class="u-msg-ok u-button primary raised">{okText}</button><button class="u-msg-cancel u-button">{cancelText}</button></div>' + '</div>';
	
	var confirmDialog = function confirmDialog(options) {
		var title, msg, okText, cancelText, template, onOk, onCancel;
		msg = options['msg'] || "";
		title = options['title'] || "确认";
		okText = options['okText'] || "确定";
		cancelText = options['cancelText'] || "取消";
		onOk = options['onOk'] || function () {};
		onCancel = options['onCancel'] || function () {};
		template = options['template'] || confirmDialogTemplate;
	
		template = template.replace('{msg}', msg);
		template = template.replace('{title}', title);
		template = template.replace('{okText}', okText);
		template = template.replace('{cancelText}', cancelText);
	
		var msgDom = (0, _dom.makeDOM)(template);
		var okBtn = msgDom.querySelector('.u-msg-ok');
		var cancelBtn = msgDom.querySelector('.u-msg-cancel');
		new _neouiButton.Button({
			el: okBtn
		});
		new _neouiButton.Button({
			el: cancelBtn
		});
		(0, _event.on)(okBtn, 'click', function () {
			if (onOk() !== false) {
				document.body.removeChild(msgDom);
				document.body.removeChild(overlayDiv);
			}
		});
		(0, _event.on)(cancelBtn, 'click', function () {
			if (onCancel() !== false) {
				document.body.removeChild(msgDom);
				document.body.removeChild(overlayDiv);
			}
		});
		var overlayDiv = makeModal(msgDom);
		document.body.appendChild(msgDom);
	
		this.resizeFun = function () {
			var cDom = msgDom.querySelector('.u-msg-content');
			if (!cDom) return;
			cDom.style.height = '';
			var wholeHeight = msgDom.offsetHeight;
			var contentHeight = msgDom.scrollHeight;
			if (contentHeight > wholeHeight && cDom) cDom.style.height = wholeHeight - (56 + 46) + 'px';
		}.bind(this);
	
		this.resizeFun();
		(0, _event.on)(window, 'resize', this.resizeFun);
	};
	
	/**
	 * Created by dingrf on 2015-11-19.
	 */
	
	/**
	 * 三按钮确认框（是 否  取消）
	 */
	var threeBtnDialog = function threeBtnDialog() {};
	
	/**
	 * dialog.js
	 */
	
	var dialogTemplate = '<div class="u-msg-dialog" id="{id}" style="{width}{height}">' + '{close}' + '</div>';
	
	var dialogMode = function dialogMode(options) {
		if (typeof options === 'string') {
			options = {
				content: options
			};
		}
		var defaultOptions = {
			id: '',
			content: '',
			hasCloseMenu: true,
			template: dialogTemplate,
			width: '',
			height: ''
		};
	
		options = (0, _extend.extend)(defaultOptions, options);
		this.id = options['id'];
		this.hasCloseMenu = options['hasCloseMenu'];
		this.content = options['content'];
		this.template = options['template'];
		this.width = options['width'];
		this.height = options['height'];
		this.lazyShow = options['lazyShow'];
		this.create();
	
		this.resizeFun = function () {
			var cDom = this.contentDom.querySelector('.u-msg-content');
			cDom.style.height = '';
			var wholeHeight = this.templateDom.offsetHeight;
			var contentHeight = this.contentDom.offsetHeight;
			if (contentHeight > wholeHeight && cDom) cDom.style.height = wholeHeight - (56 + 46) + 'px';
		}.bind(this);
	
		this.resizeFun();
		(0, _event.on)(window, 'resize', this.resizeFun);
	};
	
	dialogMode.prototype.create = function () {
		var closeStr = '';
		var oThis = this;
		if (this.hasCloseMenu) {
			var closeStr = '<div class="u-msg-close"> <span aria-hidden="true">&times;</span></div>';
		}
		var templateStr = this.template.replace('{id}', this.id);
		templateStr = templateStr.replace('{close}', closeStr);
		templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
		templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');
	
		this.contentDom = document.querySelector(this.content); //
		this.templateDom = (0, _dom.makeDOM)(templateStr);
		if (this.contentDom) {
			// msg第一种方式传入选择器，如果可以查找到对应dom节点，则创建整体dialog之后在msg位置添加dom元素
			this.contentDomParent = this.contentDom.parentNode;
			this.contentDom.style.display = 'block';
		} else {
			// 如果查找不到对应dom节点，则按照字符串处理，直接将msg拼到template之后创建dialog
			this.contentDom = (0, _dom.makeDOM)('<div><div class="u-msg-content"><p>' + this.content + '</p></div></div>');
		}
		this.templateDom.appendChild(this.contentDom);
		this.overlayDiv = makeModal(this.templateDom);
		if (this.hasCloseMenu) {
			this.closeDiv = this.templateDom.querySelector('.u-msg-close');
			(0, _event.on)(this.closeDiv, 'click', function () {
				oThis.close();
			});
		}
		if (this.lazyShow) {
			this.templateDom.style.display = 'none';
			this.overlayDiv.style.display = 'none';
		}
		document.body.appendChild(this.templateDom);
		this.isClosed = false;
	};
	
	dialogMode.prototype.show = function () {
		if (this.isClosed) {
			this.create();
		}
		this.templateDom.style.display = 'block';
		this.overlayDiv.style.display = 'block';
	};
	
	dialogMode.prototype.hide = function () {
		this.templateDom.style.display = 'none';
		this.overlayDiv.style.display = 'none';
	};
	
	dialogMode.prototype.close = function () {
		if (this.contentDom) {
			this.contentDom.style.display = 'none';
			this.contentDomParent.appendChild(this.contentDom);
		}
		document.body.removeChild(this.templateDom);
		document.body.removeChild(this.overlayDiv);
		this.isClosed = true;
	};
	
	var dialog = function dialog(options) {
		return new dialogMode(options);
	};
	
	/**
	 * 对话框向导
	 * @param options:  {dialogs: [{content:".J-goods-pro-add-1-dialog",hasCloseMenu:false},
	                               {content:".J-goods-pro-add-2-dialog",hasCloseMenu:false},
	                            ]
	                    }
	 */
	var dialogWizard = function dialogWizard(options) {
		var dialogs = [],
		    curIndex = 0;
		options.dialogs = options.dialogs || [], len = options.dialogs.length;
		if (len == 0) {
			throw new Error('未加入对话框');
		}
		for (var i = 0; i < len; i++) {
			dialogs.push(dialog((0, _extend.extend)(options.dialogs[i], {
				lazyShow: true
			})));
		}
		var wizard = function wizard() {};
		wizard.prototype.show = function () {
			dialogs[curIndex].show();
		};
		wizard.prototype.next = function () {
			dialogs[curIndex].hide();
			dialogs[++curIndex].show();
		};
		wizard.prototype.prev = function () {
			dialogs[curIndex].hide();
			dialogs[--curIndex].show();
		};
		wizard.prototype.close = function () {
			for (var i = 0; i < len; i++) {
				dialogs[i].close();
			}
		};
		return new wizard();
	};
	
	exports.messageDialog = messageDialog;
	exports.confirmDialog = confirmDialog;
	exports.dialogMode = dialogMode;
	exports.dialog = dialog;
	exports.dialogWizard = dialogWizard;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.MDLayout = undefined;
	
	var _BaseComponent = __webpack_require__(2);
	
	var _dom = __webpack_require__(10);
	
	var _event = __webpack_require__(5);
	
	var _extend = __webpack_require__(7);
	
	var _env = __webpack_require__(6);
	
	var _neouiButton = __webpack_require__(12);
	
	var _compMgr = __webpack_require__(9);
	
	var MDLayout = _BaseComponent.BaseComponent.extend({
		_CssClasses: {
			MASTER: 'u-mdlayout-master',
			DETAIL: 'u-mdlayout-detail',
			PAGE: 'u-mdlayout-page',
			PAGE_HEADER: 'u-mdlayout-page-header',
			PAGE_SECTION: 'u-mdlayout-page-section',
			PAGE_FOOTER: 'u-mdlayout-page-footer'
		},
		init: function init() {
			//this.browser = _getBrowserInfo();
			var me = this;
			this.minWidth = 600;
			//this.options = $.extend({}, MDLayout.DEFAULTS, options)
			//this.$element.css('position','relative').css('width','100%').css('height','100%').css('overflow','hidden')
			this._master = this.element.querySelector('.' + this._CssClasses.MASTER);
			this._detail = this.element.querySelector('.' + this._CssClasses.DETAIL);
	
			//this.$master.css('float','left').css('height','100%')
			//this.$detail.css('height','100%').css('overflow','hidden').css('position','relative');
			if (this.master) this.masterWidth = this._master.offsetWidth;else this.masterWidth = 0;
			this.detailWidth = this._detail.offsetWidth;
			if (this._master) this.mPages = this._master.querySelectorAll('.' + this._CssClasses.PAGE);
			this.dPages = this._detail.querySelectorAll('.' + this._CssClasses.PAGE);
			this.mPageMap = {};
			this.dPageMap = {};
			if (this._master) this.initPages(this.mPages, 'master');
			this.initPages(this.dPages, 'detail');
	
			this.mHistory = [];
			this.dHistory = [];
			this.isNarrow = null;
			this.response();
			(0, _event.on)(window, 'resize', function () {
				me.response();
			});
		},
	
		initPages: function initPages(pages, type) {
			var pageMap, pWidth;
			if (type === 'master') {
				pageMap = this.mPageMap;
				pWidth = this.masterWidth;
			} else {
				pageMap = this.dPageMap;
				pWidth = this.detailWidth;
			}
			for (var i = 0; i < pages.length; i++) {
				var pid = pages[i].getAttribute('id');
				if (!pid) throw new Error('u-mdlayout-page mast have id attribute');
				pageMap[pid] = pages[i];
				if (i === 0) {
					if (type === 'master') this.current_m_pageId = pid;else this.current_d_pageId = pid;
					(0, _dom.addClass)(pages[i], 'current');
					//pages[i].style.transform = 'translate3d('+ pWidth +'px,0,0)';
					pages[i].style.transform = 'translate3d(0,0,0)';
				} else {
					pages[i].style.transform = 'translate3d(' + pWidth + 'px,0,0)';
				}
				if (_env.env.isIE8 || _env.env.isIE9) {
					(0, _dom.addClass)(pages[i], 'let-ie9');
				}
			}
		},
	
		//	MDLayout.DEFAULTS = {
		//		minWidth: 600,
		////		masterFloat: false,
		//		afterNarrow:function(){},
		//		afterUnNarrow:function(){},
		//		afterMasterGo:function(pageId){},
		//		afterMasterBack:function(pageId){},
		//		afterDetailGo:function(pageId){},
		//		afterDetailBack:function(pageId){}
		//	}
	
		response: function response() {
			var totalWidth = this.element.offsetWidth;
			if (totalWidth < this.minWidth) {
				if (this.isNarrow == null || this.isNarrow == false) this.isNarrow = true;
				this.hideMaster();
			} else {
				if (this.isNarrow == null || this.isNarrow == true) this.isNarrow = false;
				this.showMaster();
			}
			this.calcWidth();
		},
	
		calcWidth: function calcWidth() {
			if (!(_env.env.isIE8 || _env.env.isIE9)) {
				this.detailWidth = this._detail.offsetWidth;
				if (this._master) this.masterWidth = this._master.offsetWidth;else this.masterWidth = 0;
				//TODO this.mHistory中的panel应该置为-值
				for (var i = 0; i < this.dPages.length; i++) {
					var pid = this.dPages[i].getAttribute('id');
					if (pid !== this.current_d_pageId) {
						this.dPages[i].style.transform = 'translate3d(' + this.detailWidth + 'px,0,0)';
					}
				}
				//this.$detail.find('[data-role="page"]').css('transform','translate3d('+ this.detailWidth +'px,0,0)')
				//this.$detail.find('#' + this.current_d_pageId).css('transform','translate3d(0,0,0)')
			}
		},
	
		mGo: function mGo(pageId) {
			if (this.current_m_pageId == pageId) return;
			this.mHistory.push(this.current_m_pageId);
			_hidePage(this.mPageMap[this.current_m_pageId], this, '-' + this.masterWidth);
			this.current_m_pageId = pageId;
			_showPage(this.mPageMap[this.current_m_pageId], this);
		},
	
		mBack: function mBack() {
			if (this.mHistory.length == 0) return;
			_hidePage(this.mPageMap[this.current_m_pageId], this, this.masterWidth);
			this.current_m_pageId = this.mHistory.pop();
			_showPage(this.mPageMap[this.current_m_pageId], this);
		},
	
		dGo: function dGo(pageId) {
			if (this.current_d_pageId == pageId) return;
			this.dHistory.push(this.current_d_pageId);
			_hidePage(this.dPageMap[this.current_d_pageId], this, '-' + this.detailWidth);
			this.current_d_pageId = pageId;
			_showPage(this.dPageMap[this.current_d_pageId], this);
		},
	
		dBack: function dBack() {
			if (this.dHistory.length == 0) return;
			_hidePage(this.dPageMap[this.current_d_pageId], this, this.detailWidth);
			this.current_d_pageId = this.dHistory.pop();
			_showPage(this.dPageMap[this.current_d_pageId], this);
		},
	
		showMaster: function showMaster() {
			if (this._master) {
				if (_env.env.isIE8 || _env.env.isIE9) this._master.style.display = 'none'; //IE下暂时不显示此区域
				else {
						this._master.style.transform = 'translate3d(0,0,0)';
					}
				if (!this.isNarrow) this._master.style.position = 'relative';
			}
		},
	
		hideMaster: function hideMaster() {
			if (this._master) {
				if (this._master.offsetLeft < 0 || this._master.style.display == 'none') return;
				if (_env.env.isIE8 || _env.env.isIE9) this._master.style.display = 'none';else {
					this._master.style.transform = 'translate3d(-' + this.masterWidth + 'px,0,0)';
				}
				this._master.style.position = 'absolute';
				this._master.style.zIndex = 5;
				this.calcWidth();
			}
		}
	});
	
	/**
	 * masterFloat属性只有在宽屏下起作用，为true时，master层浮动于detail层之上
	 *
	 */
	//	MDLayout.fn.setMasterFloat = function(float){
	//		this.masterFloat = float;
	//
	//	}
	
	//function _getBrowserInfo(){
	//	var browser = {};
	//	var ua = navigator.userAgent.toLowerCase();
	//	var s;
	//	(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? browser.ie = parseInt(s[1]) :
	//			(s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] :
	//					(s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
	//							(s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
	//									(s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
	//											(s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
	//	return browser;
	//}
	
	/**
	 * Module : neoui-layout-md
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 15:42:33
	 */
	
	function _showPage(el, me) {
		(0, _dom.addClass)(el, 'current');
		if (!(_env.env.isIE8 || _env.env.isIE9)) el.style.transform = 'translate3d(0,0,0)';
	}
	
	function _hidePage(el, me, width) {
		(0, _dom.removeClass)(el, 'current');
		if (!(_env.env.isIE8 || _env.env.isIE9)) el.style.transform = 'translate3d(' + width + 'px,0,0)';
	}
	
	_compMgr.compMgr.regComp({
		comp: MDLayout,
		compAsString: 'u.MDLayout',
		css: 'u-mdlayout'
	});
	
	exports.MDLayout = MDLayout;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=neoui.js.map