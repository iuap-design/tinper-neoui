/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		22:0
/******/ 	};

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

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

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

	module.exports = __webpack_require__(41);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Autocomplete = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _extend = __webpack_require__(7);

	var _env = __webpack_require__(6);

	var _util = __webpack_require__(4);

	var _ajax = __webpack_require__(11);

	var _compMgr = __webpack_require__(9);

	/**
	 * Module : neoui-autocompete
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 15:14:43
	 */

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
			if ((0, _util.isArray)(this.options.source)) {
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
	});

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
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.Autocomplete = Autocomplete;

/***/ },
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
			//获取当前是否是 ios版本,>8是因为ios不识别new Date（“2016/11”）格式
			var ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua) && str.length > 8) {
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
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

	exports.__esModule = true;
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

			// 增加disabled效果
			var disableAttr = this.element.getAttribute('disabled');
			if (disableAttr != null) {
				this.element.className += " disable";
			}

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
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}
	exports.Button = Button;

/***/ },
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Checkbox = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _ripple = __webpack_require__(13);

	var _compMgr = __webpack_require__(9);

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
	        new _ripple.URipple(this.rippleContainerElement_);

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
	                if (e.target.nodeName != 'INPUT') {
	                    if (!this._inputElement.disabled) {
	                        this.toggle();
	                        (0, _event.stopEvent)(e);
	                    }
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

	}); /**
	     * Module : neoui-checkbox
	     * Author : Kvkens(yueming@yonyou.com)
	     * Date	  : 2016-08-02 13:55:07
	     */


	_compMgr.compMgr.regComp({
	    comp: Checkbox,
	    compAsString: 'u.Checkbox',
	    css: 'u-checkbox'
	});
	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}
	exports.Checkbox = Checkbox;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ClockPicker = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _compMgr = __webpack_require__(9);

	var _env = __webpack_require__(6);

	var _extend = __webpack_require__(7);

	var _core = __webpack_require__(16);

	var _dateUtils = __webpack_require__(18);

	/**
	 * Module : neoui-clockpicker
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-11 15:17:07
	 */

	var ClockPicker = _BaseComponent.BaseComponent.extend({
		DEFAULTS: {},
		init: function init() {
			var self = this;
			var element = this.element;
			this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
			this.format = this.options['format'] || _core.core.getMaskerMeta('time').format;
			this.panelDiv = null;
			this.input = this.element.querySelector("input");
			if (_env.isMobile) {
				this.input.setAttribute('readonly', 'readonly');
			}
			(0, _dom.addClass)(this.element, 'u-text');

			this.template = '<div class="u-clock-ul popover clockpicker-popover" style="padding:0px;">';
			this.template += '<div class="popover-title"><button class="u-button u-date-clean u-clock-clean" >清空</button><span class="clockpicker-span-hours">02</span> : <span class="clockpicker-span-minutes text-primary">01</span><span class="clockpicker-span-am-pm"></span></div>';
			this.template += '<div class="popover-content">';
			this.template += '	<div class="clockpicker-plate">';
			this.template += '		<div class="clockpicker-canvas">';
			this.template += '			<svg class="clockpicker-svg">';
			this.template += '				<g transform="translate(100,100)">';
			this.template += '					<circle class="clockpicker-canvas-bg clockpicker-canvas-bg-trans" r="13" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
			this.template += '					<circle class="clockpicker-canvas-fg" r="3.5" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
			this.template += '					<line x1="0" y1="0" x2="8.362277061412277" y2="-79.56175162946187"></line>';
			this.template += '					<circle class="clockpicker-canvas-bearing" cx="0" cy="0" r="2"></circle>';
			this.template += '				</g>';
			this.template += '			</svg>';
			this.template += '		</div>';
			this.template += '		<div class="clockpicker-dial clockpicker-hours" style="visibility: visible;">';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-1" >00</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-2" >1</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-3" >2</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-4" >3</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-5" >4</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-6" >5</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-7" >6</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-8" >7</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-9" >8</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-10" >9</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-11" >10</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-12" >11</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-13" >12</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-14" >13</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-15" >14</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-16" >15</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-17" >16</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-18" >17</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-19" >18</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-20" >19</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-21" >20</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-22" >21</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-23" >22</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-24" >23</div>';
			this.template += '		</div>';
			this.template += '		<div class="clockpicker-dial clockpicker-minutes" style="visibility: hidden;">';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-25" >00</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-26" >05</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-27" >10</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-28" >15</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-29" >20</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-30" >25</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-31" >30</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-32" >35</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-33" >40</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-34" >45</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-35" >50</div>';
			this.template += '			<div class="clockpicker-tick clockpicker-tick-36" >55</div>';
			this.template += '		</div>';
			this.template += '	</div><span class="clockpicker-am-pm-block"></span></div>';
			this.template += '	</div>';
			(0, _event.on)(this.input, 'blur', function (e) {
				self._inputFocus = false;
				this.setValue(this.input.value);
			}.bind(this));

			var d = new Date();
			this.defaultHour = d.getHours() > 9 ? '' + d.getHours() : '0' + d.getHours();
			this.defaultMin = d.getMinutes() > 9 ? '' + d.getMinutes() : '0' + d.getMinutes();
			this.defaultSec = d.getSeconds() > 9 ? '' + d.getSeconds() : '0' + d.getSeconds();

			this.hours = this.defaultHour;
			this.min = this.defaultMin;
			this.sec = this.defaultSec;
			// 添加focus事件
			this.focusEvent();
			// 添加右侧图标click事件
			this.clickEvent();
		},

		_zoomIn: function _zoomIn(newPage) {

			(0, _dom.addClass)(newPage, 'zoom-in');

			var cleanup = function () {
				(0, _event.off)(newPage, 'transitionend', cleanup);
				(0, _event.off)(newPage, 'webkitTransitionEnd', cleanup);
				// this.panelContentDiv.removeChild(this.contentPage);
				this.contentPage = newPage;
			}.bind(this);
			if (this.contentPage) {
				(0, _event.on)(newPage, 'transitionend', cleanup);
				(0, _event.on)(newPage, 'webkitTransitionEnd', cleanup);
			}
			setTimeout(function () {
				newPage.style.visibility = 'visible';
				(0, _dom.removeClass)(newPage, 'zoom-in');
			}, 150);
		},

		createPanel: function createPanel() {
			if (this.panelDiv) return;
			var oThis = this;
			this.panelDiv = (0, _dom.makeDOM)(this.template);

			this.hand = this.panelDiv.querySelector('line');
			this.bg = this.panelDiv.querySelector('.clockpicker-canvas-bg');
			this.fg = this.panelDiv.querySelector('.clockpicker-canvas-fg');
			this.titleHourSpan = this.panelDiv.querySelector('.clockpicker-span-hours');
			this.titleMinSpan = this.panelDiv.querySelector('.clockpicker-span-minutes');
			this.hourDiv = this.panelDiv.querySelector('.clockpicker-hours');
			this.minDiv = this.panelDiv.querySelector('.clockpicker-minutes');
			this.btnClean = this.panelDiv.querySelector('.u-date-clean');
			if (!_env.isMobile) this.btnClean.style.display = 'none';
			this.currentView = 'hours';
			(0, _event.on)(this.hourDiv, 'click', function (e) {
				var target = e.target;
				if ((0, _dom.hasClass)(target, 'clockpicker-tick')) {
					this.hours = target.innerHTML;
					this.hours = this.hours > 9 || this.hours == 0 ? '' + this.hours : '0' + this.hours;
					this.titleHourSpan.innerHTML = this.hours;
					this.hourDiv.style.visibility = 'hidden';
					// this.minDiv.style.visibility = 'visible';
					this._zoomIn(this.minDiv);
					this.currentView = 'min';
					this.setHand();
				}
			}.bind(this));

			(0, _event.on)(this.minDiv, 'click', function (e) {
				var target = e.target;
				if ((0, _dom.hasClass)(target, 'clockpicker-tick')) {
					this.min = target.innerHTML;
					// this.min = this.min > 9 || this.min == 00? '' + this.min:'0' + this.min;
					this.titleMinSpan.innerHTML = this.min;
					this.minDiv.style.visibility = 'hidden';
					this.hourDiv.style.visibility = 'visible';
					this.currentView = 'hours';
					var v = this.hours + ':' + this.min + ':' + this.sec;
					this.setValue(v);
					this.hide();
				}
			}.bind(this));

			(0, _event.on)(this.btnClean, 'click', function (e) {
				this.setValue("");
				this.hide();
			}.bind(this));
		},

		setHand: function setHand() {
			var dialRadius = 100,
			    innerRadius = 54,
			    outerRadius = 80;
			var view = this.currentView,
			    value = this[view],
			    isHours = view === 'hours',
			    unit = Math.PI / (isHours ? 6 : 30),
			    radian = value * unit,
			    radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
			    x = Math.sin(radian) * radius,
			    y = -Math.cos(radian) * radius;
			this.setHandFun(x, y);
		},

		setHandFun: function setHandFun(x, y, roundBy5, dragging) {
			var dialRadius = 100,
			    innerRadius = 54,
			    outerRadius = 80;

			var radian = Math.atan2(x, -y),
			    isHours = this.currentView === 'hours',
			    unit = Math.PI / (isHours ? 6 : 30),
			    z = Math.sqrt(x * x + y * y),
			    options = this.options,
			    inner = isHours && z < (outerRadius + innerRadius) / 2,
			    radius = inner ? innerRadius : outerRadius,
			    value;

			if (this.twelvehour) {
				radius = outerRadius;
			}

			// Radian should in range [0, 2PI]
			if (radian < 0) {
				radian = Math.PI * 2 + radian;
			}

			// Get the round value
			value = Math.round(radian / unit);

			// Get the round radian
			radian = value * unit;

			// Correct the hours or minutes
			if (options.twelvehour) {
				if (isHours) {
					if (value === 0) {
						value = 12;
					}
				} else {
					if (roundBy5) {
						value *= 5;
					}
					if (value === 60) {
						value = 0;
					}
				}
			} else {
				if (isHours) {
					if (value === 12) {
						value = 0;
					}
					value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
				} else {
					if (roundBy5) {
						value *= 5;
					}
					if (value === 60) {
						value = 0;
					}
				}
			}

			// Set clock hand and others' position
			var w = this.panelDiv.querySelector('.clockpicker-plate').offsetWidth;
			var u = w / 200;
			var cx = Math.sin(radian) * radius * u,
			    cy = -Math.cos(radian) * radius * u;
			var iu = 100 * u;
			this.panelDiv.querySelector('g').setAttribute('transform', 'translate(' + iu + ',' + iu + ')');

			this.hand.setAttribute('x2', cx);
			this.hand.setAttribute('y2', cy);
			this.bg.setAttribute('cx', cx);
			this.bg.setAttribute('cy', cy);
			this.fg.setAttribute('cx', cx);
			this.fg.setAttribute('cy', cy);
		},

		setValue: function setValue(value) {
			value = value ? value : '';

			if (value == '') {
				this.input.value = '';

				this.trigger('valueChange', { value: '' });
				return;
			}

			if (value && value.indexOf(':') > -1) {
				var vA = value.split(":");
				var hour = vA[0];
				hour = hour % 24;
				this.hours = hour > 9 ? '' + hour : '0' + hour;
				var min = vA[1];
				min = min % 60;
				this.min = min > 9 ? '' + min : '0' + min;
				var sec = vA[2] || 0;
				sec = sec % 60;
				this.sec = sec > 9 ? '' + sec : '0' + sec;

				value = this.hours + ':' + this.min + ':' + this.sec;
			} else {
				this.hours = this.defaultHour;
				this.min = this.defaultMin;
				this.sec = this.defaultSec;
			}
			var _date = new Date();
			_date.setHours(this.hours);
			_date.setMinutes(this.min);
			_date.setSeconds(this.sec);
			var showValue = _dateUtils.date.format(_date, this.format);
			this.input.value = showValue;

			this.trigger('valueChange', { value: value });
		},

		focusEvent: function focusEvent() {
			var self = this;
			(0, _event.on)(this.input, 'focus', function (e) {
				self._inputFocus = true;
				self.show(e);
				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}
			});
		},

		//下拉图标的点击事件
		clickEvent: function clickEvent() {
			var self = this;
			var caret = this.element.nextSibling;
			(0, _event.on)(caret, 'click', function (e) {
				self._inputFocus = true;
				self.show(e);
				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}
			});
		},

		show: function show(evt) {

			var inputValue = this.input.value;
			this.setValue(inputValue);

			var self = this;
			this.createPanel();
			this.minDiv.style.visibility = 'hidden';
			this.hourDiv.style.visibility = 'visible';
			this.currentView = 'hours';
			this.titleHourSpan.innerHTML = this.hours;
			this.titleMinSpan.innerHTML = this.min;

			/*因为元素可能变化位置，所以显示的时候需要重新计算*/
			if (_env.isMobile) {
				this.panelDiv.style.position = 'fixed';
				this.panelDiv.style.top = '20%';
				var screenW = document.body.clientWidth;
				var l = (screenW - 226) / 2;
				this.panelDiv.style.left = l + 'px';
				this.overlayDiv = (0, _dom.makeModal)(this.panelDiv);
				(0, _event.on)(this.overlayDiv, 'click', function () {
					self.hide();
				});
			} else {
				if (this.options.showFix) {
					document.body.appendChild(this.panelDiv);
					this.panelDiv.style.position = 'fixed';
					(0, _dom.showPanelByEle)({
						ele: this.input,
						panel: this.panelDiv,
						position: "bottomLeft"
					});
				} else {

					var bodyWidth = document.body.clientWidth,
					    bodyHeight = document.body.clientHeight,
					    panelWidth = this.panelDiv.offsetWidth,
					    panelHeight = this.panelDiv.offsetHeight;

					this.element.appendChild(this.panelDiv);
					this.element.style.position = 'relative';
					this.left = this.input.offsetLeft;
					var inputHeight = this.input.offsetHeight;
					this.top = this.input.offsetTop + inputHeight;

					if (this.left + panelWidth > bodyWidth) {
						this.left = bodyWidth - panelWidth;
					}

					if (this.top + panelHeight > bodyHeight) {
						this.top = bodyHeight - panelHeight;
					}

					this.panelDiv.style.left = this.left + 'px';
					this.panelDiv.style.top = this.top + 'px';
				}
			}

			this.panelDiv.style.zIndex = (0, _dom.getZIndex)();
			(0, _dom.addClass)(this.panelDiv, 'is-visible');

			this.setHand();

			var callback = function (e) {
				if (e !== evt && e.target !== this.input && !self.clickPanel(e.target) && self._inputFocus != true) {
					(0, _event.off)(document, 'click', callback);
					this.hide();
				}
			}.bind(this);
			(0, _event.on)(document, 'click', callback);

			//tab事件
			(0, _event.on)(self.input, 'keydown', function (e) {
				var keyCode = e.keyCode;
				if (keyCode == 9) {
					self.hide();
				}
			});
		},

		clickPanel: function clickPanel(dom) {
			while (dom) {
				if (dom == this.panelDiv) {
					return true;
				} else {
					dom = dom.parentNode;
				}
			}
			return false;
		},

		hide: function hide() {
			(0, _dom.removeClass)(this.panelDiv, 'is-visible');
			this.panelDiv.style.zIndex = -1;
			if (this.overlayDiv) {
				try {
					document.body.removeChild(this.overlayDiv);
				} catch (e) {}
			}
		}
	});

	_compMgr.compMgr.regComp({
		comp: ClockPicker,
		compAsString: 'u.ClockPicker',
		css: 'u-clockpicker'
	});
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}
	exports.ClockPicker = ClockPicker;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.core = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : Sparrow core context
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-07-28 13:52:19
	                                                                                                                                                                                                                                                                               */


	var _extend = __webpack_require__(7);

	var _util = __webpack_require__(4);

	var _cookies = __webpack_require__(17);

	var _enumerables = __webpack_require__(8);

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
		'percent': {},
		'phoneNumber': {}
	};
	/**
	 * 获取环境信息
	 * @return {environment}
	 */
	fn.getEnvironment = function () {
		return (0, _util.createShellObject)(environment);
	};

	/**
	 * 获取客户端参数对象
	 * @return {clientAttributes}
	 */
	fn.getClientAttributes = function () {
		var exf = function exf() {};
		return (0, _util.createShellObject)(clientAttributes);
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
		return (0, _util.createShellObject)(sessionAttributes);
	};

	/**
	 * 设置会话级参数对象
	 * @param {Object} k 对象名称
	 * @param {Object} v 对象值(建议使用简单类型)
	 */
	fn.setSessionAttribute = function (k, v) {
		sessionAttributes[k] = v;
		(0, _cookies.setCookie)("ISES_" + k, v);
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
				if ((typeof meta === 'undefined' ? 'undefined' : _typeof(meta)) != 'object') maskerMeta[type] = meta;else for (var key in meta) {
					maskerMeta[type][key] = meta[key];
				}
			}
		}
	};
	fn.getMaskerMeta = function (type) {
		if (typeof getMetaFunc == 'function') {
			var meta = getMetaFunc.call(this);
			return meta[type];
		} else return (0, _extend.extend)({}, maskerMeta[type]);
	};
	environment.languages = (0, _cookies.getCookie)(_enumerables.U_LANGUAGES) ? (0, _cookies.getCookie)(_enumerables.U_LANGUAGES).split(',') : navigator.language ? navigator.language : 'zh-CN';
	if (environment.languages == 'zh-cn') environment.languages = 'zh-CN';
	if (environment.languages == 'en-us') environment.languages = 'en-US';

	environment.theme = (0, _cookies.getCookie)(_enumerables.U_THEME);
	environment.locale = (0, _cookies.getCookie)(_enumerables.U_LOCALE);
	//environment.timezoneOffset = (new Date()).getTimezoneOffset()
	environment.usercode = (0, _cookies.getCookie)(_enumerables.U_USERCODE);
	//init session attribute
	document.cookie.replace(/ISES_(\w*)=([^;]*);?/ig, function (a, b, c) {
		sessionAttributes[b] = c;
	});

	var Core = function Core() {};
	Core.prototype = fn;

	var core = new Core();

	exports.core = core;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	/**
	 * Module : Sparrow cookies
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-27 21:46:50
	 */

	var setCookie = function setCookie(sName, sValue, oExpires, sPath, sDomain, bSecure) {
		var sCookie = sName + "=" + encodeURIComponent(sValue);
		if (oExpires) sCookie += "; expires=" + oExpires.toGMTString();
		if (sPath) sCookie += "; path=" + sPath;
		if (sDomain) sCookie += "; domain=" + sDomain;
		if (bSecure) sCookie += "; secure=" + bSecure;
		document.cookie = sCookie;
	};

	var getCookie = function getCookie(sName) {
		var sRE = "(?:; )?" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);

		if (oRE.test(document.cookie)) {
			return decodeURIComponent(RegExp["$1"]);
		} else return null;
	};

	exports.setCookie = setCookie;
	exports.getCookie = getCookie;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.date = undefined;

	var _core = __webpack_require__(16);

	var _util = __webpack_require__(4);

	/**
	 * Module : Sparrow date util
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-06 13:37:20
	 */

	var u = {};
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
			language = language || _core.core.getLanguages();
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
				_date.setMonth(m);
			} else if (period == 'y') {
				m = m + value * 12 * isAdding;
				_date.setMonth(m);
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
			var _date = new Date((0, _util.dateFormat)(value));
			if (isNaN(_date)) {
				// IE的话对"2016-2-13 12:13:22"进行处理
				var index1, index2, index3, s1, s2, s3;
				if (value.indexOf) {
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
				}
			} else {
				dateFlag = true;
			}

			if (dateFlag) return _date;else return null;
		}

	};

	var date = u.date;
	exports.date = date;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Combo = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _env = __webpack_require__(6);

	var _event = __webpack_require__(5);

	var _neouiTextfield = __webpack_require__(20);

	var _ripple = __webpack_require__(13);

	var _compMgr = __webpack_require__(9);

	var Combo = _BaseComponent.BaseComponent.extend({
	    init: function init() {
	        this.name = '';
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
	            datas.push({ value: option.value, name: option.text });
	        }

	        this._input = this.element.querySelector("input");
	        this.setComboData(datas);

	        if (this.mutilSelect) {
	            this.nowWidth = 0;
	            this.fullWidth = this._input.offsetWidth;
	        }

	        if (this.onlySelect || _env.env.isMobile) {
	            setTimeout(function () {
	                self._input.setAttribute('readonly', 'readonly');
	            }, 1000);
	        } else {
	            (0, _event.on)(this._input, 'blur', function (e) {
	                var v = this.value;
	                if (!v) return;
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

	        this.isAutoTip = this.options['isAutoTip'] || false; //是否支持自动提示
	        //if (hasClass(this.element, 'is-auto-tip')){
	        //    this.isAutoTip = true;
	        //}
	        (0, _event.on)(this._input, 'keydown', function (e) {
	            var keyCode = e.keyCode;

	            if (self.isAutoTip) {
	                switch (keyCode) {
	                    case 38:
	                        // up
	                        u.stopEvent(e);
	                        break;
	                    case 40:
	                        // down
	                        u.stopEvent(e);
	                        break;
	                    case 9: // tab
	                    case 13:
	                        // return
	                        // make sure to blur off the current field
	                        // self.element.blur();
	                        u.stopEvent(e);
	                        break;
	                    default:
	                        if (self.timeout) clearTimeout(self.timeout);
	                        self.timeout = setTimeout(function () {
	                            self.onChange();
	                        }, 400);
	                        break;
	                }
	            } else {
	                // 回车
	                if (keyCode == 13) this.blur();
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

	    //输入框内容发生变化时修改提示词.
	    onChange: function onChange() {
	        var v = this._input.value;
	        if (!v) v = '';
	        var filterData = [];
	        for (var i = 0, len = this.initialComboData.length; i < len; i++) {
	            if (this.initialComboData[i].name.indexOf(v) >= 0 || this.initialComboData[i].value.indexOf(v) >= 0) {
	                filterData.push(this.initialComboData[i]);
	            }
	        }
	        this.setComboData(filterData);
	        this.show();
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
	            // this.element.parentNode.appendChild(this._ul);
	            // var left = this.element.offsetLeft,
	            // inputHeight = this.element.offsetHeight,
	            // top = this.element.offsetTop + inputHeight;
	            // this._ul.style.left = left + 'px';
	            // this._ul.style.top = top + 'px';
	            var bodyWidth = document.body.clientWidth,
	                bodyHeight = document.body.clientHeight,
	                panelWidth = this._ul.offsetWidth,
	                panelHeight = this._ul.offsetHeight;
	            this.element.appendChild(this._ul);
	            this.element.style.position = 'relative';
	            this.left = this._input.offsetLeft;
	            var inputHeight = this._input.offsetHeight;
	            this.top = this._input.offsetTop + inputHeight;
	            if (this.left + panelWidth > bodyWidth) {
	                this.left = bodyWidth - panelWidth;
	            }

	            if (this.top + panelHeight > bodyHeight) {
	                this.top = bodyHeight - panelHeight;
	            }

	            this._ul.style.left = this.left + 'px';
	            this._ul.style.top = this.top + 'px';
	        }
	        this._ul.style.width = width + 'px';
	        (0, _dom.addClass)(this._ul, 'is-animating');
	        this._ul.style.zIndex = (0, _dom.getZIndex)();
	        (0, _dom.addClass)(this._ul, 'is-visible');

	        var callback = function (e) {
	            if (e === evt || e.target === this._input || self._inputFocus == true) return;
	            if (this.mutilSelect && ((0, _dom.closest)(e.target, 'u-combo-ul') === self._ul || (0, _dom.closest)(e.target, 'u-combo-name-par') || (0, _dom.closest)(e.target, 'u-combo-name'))) return;
	            (0, _event.off)(document, 'click', callback);
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
	        this.trigger('select', { value: this.value, name: this._input.value });
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

	        //统一指定datas格式为[{name:"",value:""}].
	        if (!options) this.comboDatas = datas;else {
	            this.comboDatas = [];
	            for (var i = 0; i < datas.length; i++) {
	                this.comboDatas.push({ name: datas[i][options.name], value: datas[i][options.value] });
	            }
	        }

	        //将初始数据保留一份,以便input输入内容改变时自动提示的数据从全部数据里头筛选.
	        if (!(this.initialComboData && this.initialComboData.length)) {
	            this.initialComboData = this.comboDatas;
	        }
	        // isAutoTip 可以输入的情况下不清空内容，后续要清空内容需要重点考虑。
	        // this.value = '';
	        // this._input.value = '';

	        //若没有下拉的ul,新生成一个ul结构.
	        if (!this._ul) {
	            this._ul = (0, _dom.makeDOM)('<ul class="u-combo-ul"></ul>');
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
	            new _ripple.URipple(li);
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
	            if (this.fullWidth == 0) {
	                this.fullWidth = this._input.offsetWidth;
	                if (this.fullWidth > 0) {
	                    if (this._combo_name_par) {
	                        this._combo_name_par.style.maxWidth = this.fullWidth + 'px';
	                    }
	                }
	            }

	            if (index != -1) {
	                // 已经选中
	                this.value = this.value.substring(0, index) + this.value.substring(index + l);
	                flag = '-';
	            } else {
	                this.value = !this.value ? val + ',' : this.value + val + ',';
	                flag = '+';
	            }

	            if (flag == '+') {
	                this.name += name + ',';
	                var nameDiv = (0, _dom.makeDOM)('<div class="u-combo-name" key="' + val + '">' + name + /*<a href="javascript:void(0)" class="remove">x</a>*/'</div>');
	                var parNameDiv = (0, _dom.makeDOM)('<div class="u-combo-name-par" style="position:absolute;max-width:' + this.fullWidth + 'px;"></div>');

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
	                    (0, _event.on)(this._combo_name_par, 'click', function (e) {
	                        (0, _event.trigger)(self._input, 'focus');
	                    });
	                }
	                this._combo_name_par.appendChild(nameDiv);
	                this._combo_name_par.title = this.name;
	                var nWidth = nameDiv.offsetWidth + 20;
	                this.nowWidth += nWidth;
	                if (this.nowWidth > this.fullWidth && this.fullWidth > 0) {
	                    this.nowWidth -= nWidth;
	                    this._combo_name_par.removeChild(nameDiv);
	                    (0, _dom.addClass)(this._combo_name_par, 'u-combo-overwidth');
	                }
	            } else {
	                this.name = this.name.replace(name + ',', '');
	                if (this._combo_name_par) {
	                    var comboDiv = this._combo_name_par.querySelector('[key="' + val + '"]');
	                    if (comboDiv) {
	                        var nWidth = comboDiv.offsetWidth + 20;
	                        this._combo_name_par.removeChild(comboDiv);
	                        this.nowWidth -= nWidth;
	                        (0, _dom.removeClass)(this._combo_name_par, 'u-combo-overwidth');
	                    }
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
	            /*实际上input的高度并不需要调整*/
	            /*var h = this._combo_name_par.offsetHeight;
	            if(h < 25){
	                h = 25;
	                this._input.style.height = h + 'px';
	            }*/
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
	            this._updateItemSelect();
	        }
	        var matched = false;
	        this.nowWidth = 0;
	        this.comboDatas.forEach(function (item, index) {
	            if (this.mutilSelect === true) {
	                if (values.indexOf(item.value) != -1) {
	                    this.selectItem(index);
	                }
	            } else {
	                if (item.value + '' === value) {
	                    this.selectItem(index);
	                    matched = true;
	                    return;
	                }
	            }
	        }.bind(this));
	        if (!this.onlySelect && !matched) {
	            this.value = value;
	            this._input.value = value;
	            this.trigger('select', { value: this.value, name: this._input.value });
	        }
	    },

	    emptyValue: function emptyValue() {
	        this.value = '';
	        this._input.value = '';
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
	}); /**
	     * Module : neoui-combo
	     * Author : Kvkens(yueming@yonyou.com)
	     * Date	  : 2016-08-06 13:19:10
	     */

	_compMgr.compMgr.regComp({
	    comp: Combo,
	    compAsString: 'u.Combo',
	    css: 'u-combo'
	});
	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}
	exports.Combo = Combo;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
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
	        this.trigger('u.text.blur');
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
	        this._input.value = value === 0 ? value : value || '';
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
	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}
	exports.Text = Text;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
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
	 * Date	  : 2016-08-02 18:42:07
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

	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.Combobox = Combobox;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Table = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _event = __webpack_require__(5);

	var _neouiCheckbox = __webpack_require__(14);

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
	        new _neouiCheckbox.Checkbox(label);
	        return label;
	    }

	});

	_compMgr.compMgr.regComp({
	    comp: Table,
	    compAsString: 'u.Table',
	    css: 'u-table'
	});

	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}

	exports.Table = Table;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.DateTimePicker = undefined;

	var _extend = __webpack_require__(7);

	var _BaseComponent = __webpack_require__(2);

	var _env = __webpack_require__(6);

	var _event = __webpack_require__(5);

	var _dom = __webpack_require__(10);

	var _core = __webpack_require__(16);

	var _dateUtils = __webpack_require__(18);

	var _neouiValidate = __webpack_require__(24);

	var _compMgr = __webpack_require__(9);

	var _ripple = __webpack_require__(13);

	var _util = __webpack_require__(4);

	var DateTimePicker = _BaseComponent.BaseComponent.extend({});

	DateTimePicker.fn = DateTimePicker.prototype;

	DateTimePicker.fn.init = function () {

	    var self = this,
	        _fmt,
	        _defaultFmt;
	    this.enable = true;
	    this._element = this.element;
	    //this.type = 'datetime';
	    //if (hasClass(this.element,'u-datepicker')){
	    //    this.type = 'date';
	    //}
	    //addClass(this._element,'u-text')
	    //this._element.style.display = "inline-table"; // 存在右侧图标，因此修改display
	    //new UText(this._element);
	    this._input = this._element.querySelector("input");

	    // if(env.isMobile){
	    //     // setTimeout(function(){
	    //     //     self._input.setAttribute('readonly','readonly');
	    //     // },1000);
	    // }

	    setTimeout(function () {
	        self._input.setAttribute('readonly', 'readonly');
	    }, 1000);

	    (0, _event.on)(this._input, 'focus', function (e) {
	        // 用来关闭键盘
	        /*if(env.isMobile)
	            this.blur();*/
	        self._inputFocus = true;
	        if (self.isShow !== true) {
	            self.show(e);
	        }
	        (0, _event.stopEvent)(e);
	    });

	    (0, _event.on)(this._input, 'blur', function (e) {
	        self._inputFocus = false;
	    });
	    this._span = this._element.querySelector("span");
	    if (this._span) {
	        (0, _event.on)(this._span, 'click', function (e) {
	            // if (self.isShow !== true){
	            //     self.show(e);
	            // }
	            self._input.focus();
	            (0, _event.stopEvent)(e);
	        });
	    }

	    if ((0, _dom.hasClass)(this._element, 'time')) {
	        this.type = 'datetime';
	        _defaultFmt = 'YYYY-MM-DD hh:mm:ss';
	    } else {
	        this.type = 'date';
	        _defaultFmt = 'YYYY-MM-DD';
	    }
	    _fmt = this._element.getAttribute("format");
	    this.format = _fmt || this.options['format'] || _defaultFmt;
	    this.isShow = false;
	};

	/**
	 * 轮播动画效果
	 * @private
	 */
	DateTimePicker.fn._carousel = function (newPage, direction) {
	    if (direction == 'left') {
	        (0, _dom.addClass)(newPage, 'right-page');
	    } else {
	        (0, _dom.addClass)(newPage, 'left-page');
	    }
	    this._dateContent.appendChild(newPage);
	    if (_env.env.isIE8 || _env.env.isIE9 || _env.env.isFF) {
	        // this._dateContent.removeChild(this.contentPage);
	        var pages = this._dateContent.querySelectorAll('.u-date-content-page');
	        for (var i = 0; i < pages.length; i++) {
	            this._dateContent.removeChild(pages[i]);
	        }
	        this.contentPage = newPage;
	        this._dateContent.appendChild(newPage);
	        if (direction == 'left') {
	            (0, _dom.removeClass)(newPage, 'right-page');
	        } else {
	            (0, _dom.removeClass)(newPage, 'left-page');
	        }
	    } else {

	        var cleanup = function () {
	            newPage.removeEventListener('transitionend', cleanup);
	            newPage.removeEventListener('webkitTransitionEnd', cleanup);
	            // this._dateContent.removeChild(this.contentPage);
	            var pages = this._dateContent.querySelectorAll('.u-date-content-page');
	            for (var i = 0; i < pages.length; i++) {
	                this._dateContent.removeChild(pages[i]);
	            }
	            this.contentPage = newPage;
	            this._dateContent.appendChild(newPage);
	        }.bind(this);

	        newPage.addEventListener('transitionend', cleanup);
	        newPage.addEventListener('webkitTransitionEnd', cleanup);
	        if (window.requestAnimationFrame) window.requestAnimationFrame(function () {
	            if (direction == 'left') {
	                (0, _dom.addClass)(this.contentPage, 'left-page');
	                (0, _dom.removeClass)(newPage, 'right-page');
	            } else {
	                (0, _dom.addClass)(this.contentPage, 'right-page');
	                (0, _dom.removeClass)(newPage, 'left-page');
	            }
	        }.bind(this));
	    }
	};

	/**
	 * 淡入动画效果
	 * @private
	 */
	DateTimePicker.fn._zoomIn = function (newPage) {
	    if (!this.contentPage) {
	        this._dateContent.appendChild(newPage);
	        this.contentPage = newPage;
	        return;
	    }
	    (0, _dom.addClass)(newPage, 'zoom-in');
	    this._dateContent.appendChild(newPage);
	    if (_env.env.isIE8 || _env.env.isIE9 || _env.env.isFF) {
	        var pages = this._dateContent.querySelectorAll('.u-date-content-page');
	        for (var i = 0; i < pages.length; i++) {
	            this._dateContent.removeChild(pages[i]);
	        }
	        // this._dateContent.removeChild(this.contentPage);
	        this.contentPage = newPage;
	        this._dateContent.appendChild(newPage);
	        (0, _dom.removeClass)(newPage, 'zoom-in');
	    } else {
	        var cleanup = function () {
	            newPage.removeEventListener('transitionend', cleanup);
	            newPage.removeEventListener('webkitTransitionEnd', cleanup);
	            // this._dateContent.removeChild(this.contentPage);
	            var pages = this._dateContent.querySelectorAll('.u-date-content-page');
	            for (var i = 0; i < pages.length; i++) {
	                this._dateContent.removeChild(pages[i]);
	            }
	            this.contentPage = newPage;
	            this._dateContent.appendChild(newPage);
	        }.bind(this);
	        if (this.contentPage) {
	            newPage.addEventListener('transitionend', cleanup);
	            newPage.addEventListener('webkitTransitionEnd', cleanup);
	        }
	        if (window.requestAnimationFrame) window.requestAnimationFrame(function () {
	            (0, _dom.addClass)(this.contentPage, 'is-hidden');
	            (0, _dom.removeClass)(newPage, 'zoom-in');
	        }.bind(this));
	    }
	};

	/**
	 *填充年份选择面板
	 * @private
	 */
	DateTimePicker.fn._fillYear = function (type) {
	    var year,
	        template,
	        yearPage,
	        titleDiv,
	        yearDiv,
	        _year,
	        i,
	        cell,
	        language,
	        year,
	        month,
	        date,
	        time,
	        self = this;
	    template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">',
	    /*'<div class="u-date-content-title-year"></div>-',
	    '<div class="u-date-content-title-month"></div>-',
	    '<div class="u-date-content-title-date"></div>',
	    '<div class="u-date-content-title-time"></div>',*/
	    '</div>', '<div class="u-date-content-panel"></div>', '</div>'].join("");
	    type = type || 'current';
	    _year = this.pickerDate.getFullYear();
	    if ('current' === type) {
	        this.startYear = _year - _year % 10 - 1;
	    } else if (type === 'preivous') {
	        this.startYear = this.startYear - 10;
	    } else {
	        this.startYear = this.startYear + 10;
	    }
	    yearPage = (0, _dom.makeDOM)(template);
	    // titleDiv = yearPage.querySelector('.u-date-content-title');
	    // titleDiv.innerHTML = (this.startYear - 1) + '-' + (this.startYear + 11);
	    language = _core.core.getLanguages();
	    year = _dateUtils.date._formats['YYYY'](this.pickerDate);
	    month = _dateUtils.date._formats['MM'](this.pickerDate, language);
	    date = _dateUtils.date._formats['DD'](this.pickerDate, language);
	    time = _dateUtils.date._formats['HH'](this.pickerDate, language) + ':' + _dateUtils.date._formats['mm'](this.pickerDate, language) + ':' + _dateUtils.date._formats['ss'](this.pickerDate, language);

	    this._yearTitle = yearPage.querySelector('.u-date-content-title');
	    this._yearTitle.innerHTML = year;
	    /*this._headerYear = yearPage.querySelector('.u-date-content-title-year');
	    this._headerYear.innerHTML = year;
	    this._headerMonth = yearPage.querySelector('.u-date-content-title-month');
	    this._headerMonth.innerHTML = month;
	    this._headerDate = yearPage.querySelector('.u-date-content-title-date');
	    this._headerDate.innerHTML = date;
	    this._headerTime = yearPage.querySelector('.u-date-content-title-time');
	    this._headerTime.innerHTML = time;*/
	    if (this.type == 'date') {
	        this._headerTime.style.display = 'none';
	    }

	    /*on(this._headerYear, 'click', function(e){
	        self._fillYear();
	        stopEvent(e)
	    });
	     on(this._headerMonth, 'click', function(e){
	        self._fillMonth();
	        stopEvent(e)
	    });
	     on(this._headerTime, 'click', function(e){
	        self._fillTime();
	        stopEvent(e)
	    });*/

	    yearDiv = yearPage.querySelector('.u-date-content-panel');
	    for (var i = 0; i < 12; i++) {

	        cell = (0, _dom.makeDOM)('<div class="u-date-content-year-cell">' + (this.startYear + i) + '</div>');
	        new _ripple.URipple(cell);
	        if (this.startYear + i == _year) {
	            (0, _dom.addClass)(cell, 'current');
	        }
	        if (this.startYear + i < this.beginYear) {
	            (0, _dom.addClass)(cell, 'u-disabled');
	        }
	        cell._value = this.startYear + i;
	        yearDiv.appendChild(cell);
	    }
	    (0, _event.on)(yearDiv, 'click', function (e) {
	        if ((0, _dom.hasClass)(e.target, 'u-disabled')) return;
	        var _y = e.target._value;
	        this.pickerDate.setYear(_y);
	        this._updateDate();
	        this._fillMonth();
	    }.bind(this));

	    if (type === 'current') {
	        this._zoomIn(yearPage);
	    } else if (type === 'next') {
	        this._carousel(yearPage, 'left');
	    } else if (type === 'preivous') {
	        this._carousel(yearPage, 'right');
	    }
	    this.currentPanel = 'year';
	};

	/**
	 * 填充月份选择面板
	 * @private
	 */
	DateTimePicker.fn._fillMonth = function () {
	    var template,
	        monthPage,
	        _month,
	        cells,
	        i,
	        language,
	        year,
	        month,
	        date,
	        time,
	        self = this;
	    template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">',
	    /*'<div class="u-date-content-title-year"></div>-',
	    '<div class="u-date-content-title-month"></div>-',
	    '<div class="u-date-content-title-date"></div>',
	    '<div class="u-date-content-title-time"></div>',*/
	    '</div>', '<div class="u-date-content-panel">', '<div class="u-date-content-year-cell">1月</div>', '<div class="u-date-content-year-cell">2月</div>', '<div class="u-date-content-year-cell">3月</div>', '<div class="u-date-content-year-cell">4月</div>', '<div class="u-date-content-year-cell">5月</div>', '<div class="u-date-content-year-cell">6月</div>', '<div class="u-date-content-year-cell">7月</div>', '<div class="u-date-content-year-cell">8月</div>', '<div class="u-date-content-year-cell">9月</div>', '<div class="u-date-content-year-cell">10月</div>', '<div class="u-date-content-year-cell">11月</div>', '<div class="u-date-content-year-cell">12月</div>', '</div>', '</div>'].join("");

	    monthPage = (0, _dom.makeDOM)(template);
	    language = _core.core.getLanguages();
	    year = _dateUtils.date._formats['YYYY'](this.pickerDate);
	    month = _dateUtils.date._formats['MM'](this.pickerDate, language);
	    date = _dateUtils.date._formats['DD'](this.pickerDate, language);
	    time = _dateUtils.date._formats['HH'](this.pickerDate, language) + ':' + _dateUtils.date._formats['mm'](this.pickerDate, language) + ':' + _dateUtils.date._formats['ss'](this.pickerDate, language);

	    this._monthTitle = monthPage.querySelector('.u-date-content-title');
	    this._monthTitle.innerHTML = _dateUtils.date._formats['MMM'](this.pickerDate, language);
	    /*this._headerYear = monthPage.querySelector('.u-date-content-title-year');
	    this._headerYear.innerHTML = year;
	    this._headerMonth = monthPage.querySelector('.u-date-content-title-month');
	    this._headerMonth.innerHTML = month;
	    this._headerDate = monthPage.querySelector('.u-date-content-title-date');
	    this._headerDate.innerHTML = date;
	    this._headerTime = monthPage.querySelector('.u-date-content-title-time');
	    this._headerTime.innerHTML = time;*/
	    if (this.type == 'date') {
	        this._headerTime.style.display = 'none';
	    }

	    /*on(this._headerYear, 'click', function(e){
	        self._fillYear();
	        stopEvent(e)
	    });
	     on(this._headerMonth, 'click', function(e){
	        self._fillMonth();
	        stopEvent(e)
	    });
	     on(this._headerTime, 'click', function(e){
	        self._fillTime();
	        stopEvent(e)
	    });*/

	    cells = monthPage.querySelectorAll('.u-date-content-year-cell');
	    for (var i = 0; i < cells.length; i++) {
	        if (_month - 1 == i) {
	            (0, _dom.addClass)(cells[i], 'current');
	        }
	        if (this.pickerDate.getFullYear() == this.beginYear && i < this.beginMonth) {
	            (0, _dom.addClass)(cells[i], 'u-disabled');
	        }
	        if (this.pickerDate.getFullYear() < this.beginYear) {
	            (0, _dom.addClass)(cells[i], 'u-disabled');
	        }
	        cells[i]._value = i;
	        new _ripple.URipple(cells[i]);
	    }
	    (0, _event.on)(monthPage, 'click', function (e) {
	        if ((0, _dom.hasClass)(e.target, 'u-disabled')) return;
	        if ((0, _dom.hasClass)(e.target, 'u-date-content-title')) return;
	        var _m = e.target._value;
	        this.pickerDate.setMonth(_m);
	        this._updateDate();
	        this._fillDate();
	    }.bind(this));
	    this._zoomIn(monthPage);
	    this.currentPanel = 'month';
	};

	DateTimePicker.fn._getPickerStartDate = function (date) {
	    var d = new Date((0, _util.dateFormat)(date));
	    d.setDate(1);
	    var day = d.getDay();
	    d = _dateUtils.date.sub(d, 'd', day);
	    return d;
	};

	DateTimePicker.fn._getPickerEndDate = function (date) {
	    var d = new Date((0, _util.dateFormat)(date));
	    d.setDate(1);
	    d.setMonth(d.getMonth() + 1);
	    d.setDate(0);
	    var day = d.getDay();
	    d = _dateUtils.date.add(d, 'd', 6 - day);
	    return d;
	};

	/**
	 * 渲染日历
	 * @param type : previous  current  next
	 * @private
	 */
	DateTimePicker.fn._fillDate = function (type) {
	    // if (env.isMobile){
	    //     this._dateMobileScroll()
	    //     return
	    // }
	    var year,
	        month,
	        day,
	        date,
	        time,
	        template,
	        datePage,
	        titleDiv,
	        dateDiv,
	        weekSpans,
	        language,
	        tempDate,
	        i,
	        cell,
	        self = this;
	    type = type || 'current';
	    if ('current' === type) {
	        tempDate = this.pickerDate;
	    } else if (type === 'preivous') {
	        tempDate = _dateUtils.date.sub(this.startDate, 'd', 1);
	    } else {
	        tempDate = _dateUtils.date.add(this.endDate, 'd', 1);
	    }
	    this.startDate = this._getPickerStartDate(tempDate);
	    this.endDate = this._getPickerEndDate(tempDate);

	    language = _core.core.getLanguages();
	    year = _dateUtils.date._formats['YYYY'](tempDate);
	    month = _dateUtils.date._formats['MM'](tempDate, language);
	    date = _dateUtils.date._formats['DD'](tempDate, language);
	    time = _dateUtils.date._formats['HH'](tempDate, language) + ':' + _dateUtils.date._formats['mm'](tempDate, language) + ':' + _dateUtils.date._formats['ss'](tempDate, language);
	    template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">', '<div class="u-date-content-title-year"></div>-', '<div class="u-date-content-title-month"></div>-', '<div class="u-date-content-title-date"></div>', '<div class="u-date-content-title-time"></div>', '</div>', '<div class="u-date-week"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>', '<div class="u-date-content-panel"></div>', '</div>'].join("");
	    datePage = (0, _dom.makeDOM)(template);
	    this._headerYear = datePage.querySelector('.u-date-content-title-year');
	    this._headerYear.innerHTML = year;
	    this._headerMonth = datePage.querySelector('.u-date-content-title-month');
	    this._headerMonth.innerHTML = month;
	    this._headerDate = datePage.querySelector('.u-date-content-title-date');
	    this._headerDate.innerHTML = date;
	    this._headerTime = datePage.querySelector('.u-date-content-title-time');
	    this._headerTime.innerHTML = time;
	    if (this.type == 'date') {
	        this._headerTime.style.display = 'none';
	    }

	    (0, _event.on)(this._headerYear, 'click', function (e) {
	        self._fillYear();
	        (0, _event.stopEvent)(e);
	    });

	    (0, _event.on)(this._headerMonth, 'click', function (e) {
	        self._fillMonth();
	        (0, _event.stopEvent)(e);
	    });

	    (0, _event.on)(this._headerTime, 'click', function (e) {
	        self._fillTime();
	        (0, _event.stopEvent)(e);
	    });

	    weekSpans = datePage.querySelectorAll('.u-date-week span');

	    for (var i = 0; i < 7; i++) {
	        weekSpans[i].innerHTML = _dateUtils.date._dateLocale[language].weekdaysMin[i];
	    }
	    dateDiv = datePage.querySelector('.u-date-content-panel');
	    tempDate = this.startDate;

	    while (tempDate <= this.endDate) {
	        var tempDateMonth = tempDate.getMonth(),
	            tempDateYear = tempDate.getFullYear(),
	            tempDateDate = tempDate.getDate();
	        cell = (0, _dom.makeDOM)('<div class="u-date-cell" unselectable="on" onselectstart="return false;">' + tempDateDate + '</div>');
	        if (tempDateYear == this.pickerDate.getFullYear() && tempDateMonth == this.pickerDate.getMonth() && tempDateDate == this.pickerDate.getDate()) {
	            (0, _dom.addClass)(cell, 'current');
	        }

	        if (tempDateYear < this.beginYear || tempDateYear == this.beginYear && tempDateMonth < this.beginMonth || tempDateYear == this.overYear && tempDateMonth > this.overMonth || tempDateYear > this.overYear) {
	            (0, _dom.addClass)(cell, 'u-disabled');
	            (0, _dom.removeClass)(cell, 'current');
	        }

	        if (tempDateYear == this.beginYear && tempDateMonth == this.beginMonth && tempDateDate < this.beginDate || tempDateYear == this.overYear && tempDateMonth == this.overMonth && tempDateDate > this.overDate) {
	            (0, _dom.addClass)(cell, 'u-disabled');
	            (0, _dom.removeClass)(cell, 'current');
	        }
	        cell._value = tempDateDate;
	        cell._month = tempDateMonth;
	        cell._year = tempDateYear;
	        new _ripple.URipple(cell);
	        dateDiv.appendChild(cell);
	        tempDate = _dateUtils.date.add(tempDate, 'd', 1);
	    }
	    (0, _event.on)(dateDiv, 'click', function (e) {
	        if ((0, _dom.hasClass)(e.target, 'u-disabled')) return;
	        var _d = e.target._value;
	        if (!_d) return;
	        this.pickerDate.setFullYear(e.target._year);
	        this.pickerDate.setMonth(e.target._month);
	        this.pickerDate.setDate(_d);
	        var _cell = e.target.parentNode.querySelector('.u-date-cell.current');
	        if (_cell) {
	            (0, _dom.removeClass)(_cell, 'current');
	            if (_env.env.isIE8 || _env.env.isIE9) _cell.style.backgroundColor = "#fff";
	        }
	        (0, _dom.addClass)(e.target, 'current');
	        if (_env.env.isIE8 || _env.env.isIE9) e.target.style.backgroundColor = '#3f51b5';
	        this._updateDate();
	        if (this.type === 'date') {
	            this.onOk();
	        }
	    }.bind(this));
	    if (type === 'current') {
	        this._zoomIn(datePage);
	    } else if (type === 'next') {
	        this._carousel(datePage, 'left');
	    } else if (type === 'preivous') {
	        this._carousel(datePage, 'right');
	    }
	    this.currentPanel = 'date';
	};

	/**
	 * 填充时间选择面板
	 * @private
	 */
	DateTimePicker.fn._fillTime = function (type) {
	    // if (env.isMobile) {
	    //     this._timeMobileScroll()
	    //     return;
	    // }
	    if (this.timeOpen) return;
	    this.timeOpen = true;
	    var year, month, day, date, time, template, timePage, titleDiv, dateDiv, weekSpans, language, tempDate, i, cell, timetemplate;
	    var self = this;
	    type = type || 'current';
	    if ('current' === type) {
	        tempDate = this.pickerDate;
	    } else if (type === 'preivous') {
	        tempDate = _dateUtils.date.sub(this.startDate, 'd', 1);
	    } else {
	        tempDate = _dateUtils.date.add(this.endDate, 'd', 1);
	    }
	    this.startDate = this._getPickerStartDate(tempDate);
	    this.endDate = this._getPickerEndDate(tempDate);

	    language = _core.core.getLanguages();
	    year = _dateUtils.date._formats['YYYY'](tempDate);
	    month = _dateUtils.date._formats['MM'](tempDate, language);
	    date = _dateUtils.date._formats['DD'](tempDate, language);
	    time = _dateUtils.date._formats['HH'](tempDate, language) + ':' + _dateUtils.date._formats['mm'](tempDate, language) + ':' + _dateUtils.date._formats['ss'](tempDate, language);

	    template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">', '<div class="u-date-content-title-year"></div>-', '<div class="u-date-content-title-month"></div>-', '<div class="u-date-content-title-date"></div>', '<div class="u-date-content-title-time"></div>', '</div>', '<div class="u-date-content-panel"></div>', '</div>'].join("");
	    timePage = (0, _dom.makeDOM)(template);
	    //    titleDiv = timePage.querySelector('.u-date-content-title');
	    //    titleDiv.innerHTML = year + ' ' + month + ' ' +day ;
	    this._headerYear = timePage.querySelector('.u-date-content-title-year');
	    this._headerYear.innerHTML = year;
	    this._headerMonth = timePage.querySelector('.u-date-content-title-month');
	    this._headerMonth.innerHTML = month;
	    this._headerDate = timePage.querySelector('.u-date-content-title-date');
	    this._headerDate.innerHTML = date;
	    this._headerTime = timePage.querySelector('.u-date-content-title-time');
	    this._headerTime.innerHTML = time;

	    this.editTimeShow = false;
	    function editTime(obj) {
	        var inputTemplate = "<div><input class='editTime' value='' maxlength='8' /></div>";
	        obj._headerTime.innerHTML = inputTemplate;

	        var editTime = timePage.querySelector('.editTime');
	        obj.editTimeShow = true;
	        editTime.focus();
	        (0, _event.on)(editTime, 'keydown', function (e) {
	            var code = e.keyCode;
	            var value = this.value;
	            if (!(code >= 48 && code <= 57 || code >= 96 && code <= 105 || code == 37 || code == 102 || code == 39 || code == 8 || code == 46 || code == 110 || code == 190)) {
	                (0, _event.stopEvent)(e);
	            }
	            var length = value.length;
	            if (length && code != 8) {
	                if (length == 2 || length == 5) {
	                    value = value += ':';
	                }
	            }

	            this.value = value;
	        });

	        (0, _event.on)(editTime, 'keyup', function (e) {
	            var value = this.value,
	                length = value.length,
	                valueArray = [];
	            if (length == 8) {
	                valueArray = value.split(':');
	                obj.pickerDate.setHours(valueArray[0]);
	                obj.pickerDate.setMinutes(valueArray[1]);
	                obj.pickerDate.setSeconds(valueArray[2]);
	            }
	        });
	    }

	    if (this.type == 'date') {
	        this._headerTime.style.display = 'none';
	    }

	    (0, _event.on)(this._headerYear, 'click', function (e) {
	        self._fillYear();
	        (0, _event.stopEvent)(e);
	    });

	    (0, _event.on)(this._headerMonth, 'click', function (e) {
	        self._fillMonth();
	        (0, _event.stopEvent)(e);
	    });

	    (0, _event.on)(this._headerTime, 'click', function (e) {
	        if (self.currentView == 'hours' && !self.editTimeShow) {
	            editTime(self);
	        } else {
	            self.editTimeShow = false;
	        }
	        self._fillTime();
	        self.timeOpen = true;
	        (0, _event.stopEvent)(e);
	    });

	    dateDiv = timePage.querySelector('.u-date-content-panel');
	    // tempDate = this.startDate;
	    // while(tempDate <= this.endDate){
	    // cell = makeDOM('<div class="u-date-cell">'+ udate._formats['HH'](tempDate,language) +'</div>');
	    // if (tempDate.getFullYear() == this.pickerDate.getFullYear() && tempDate.getMonth() == this.pickerDate.getMonth()
	    // && tempDate.getDate() == this.pickerDate.getDate()){
	    // addClass(cell, 'current');
	    // }
	    // cell._value = tempDate.getDate();
	    // new URipple(cell);
	    // dateDiv.appendChild(cell);
	    // tempDate = udate.add(tempDate, 'd', 1);
	    // }
	    if (_env.env.isIE8) {
	        // IE8/IE9保持原来，非IE8/IE9使用clockpicker
	        timetemplate = ['<div class="u_time_box">', '<div class="u_time_cell">',
	        //'<div class="add_hour_cell"><i class="add_hour_cell icon-angle-up"></i></div>',
	        '<div class="show_hour_cell">' + _dateUtils.date._formats['HH'](tempDate) + '</div>',
	        //'<div class="subtract_hour_cell"><i class="subtract_hour_cell icon-angle-down"></i></div>',
	        '</div>', '<div class="u_time_cell">',
	        //'<div class="add_min_cell"><i class="add_min_cell icon-angle-up"></i></div>',
	        '<div class="show_min_cell">' + _dateUtils.date._formats['mm'](tempDate) + '</div>',
	        //'<div class="subtract_min_cell"><i class="subtract_min_cell icon-angle-down"></i></div>',
	        '</div>', '<div class="u_time_cell">',
	        //'<div class="add_sec_cell"><i class="add_sec_cell icon-angle-up"></i></div>',
	        '<div class="show_sec_cell">' + _dateUtils.date._formats['ss'](tempDate) + '</div>',
	        //'<div class="subtract_sec_cell"><i class="subtract_sec_cell icon-angle-down"></i></div>',
	        '</div>', '</div>'].join("");
	        cell = (0, _dom.makeDOM)(timetemplate);
	        dateDiv.appendChild(cell);
	        (0, _event.on)(dateDiv, 'click', function (e) {
	            var _arrary = e.target.getAttribute("class").split("_");
	            if (_arrary[0] == "add") {
	                if (_arrary[1] == "hour") {
	                    var tmph = Number(_dateUtils.date._formats['HH'](this.pickerDate));
	                    if (tmph < 23) {
	                        tmph++;
	                    } else {
	                        tmph = 0;
	                    }

	                    this.pickerDate.setHours(tmph);
	                    dateDiv.querySelector(".show_hour_cell").innerHTML = tmph;
	                } else if (_arrary[1] == "min") {
	                    var tmpm = Number(_dateUtils.date._formats['mm'](this.pickerDate));
	                    if (tmpm < 59) {
	                        tmpm++;
	                    } else {
	                        tmpm = 0;
	                    }
	                    this.pickerDate.setMinutes(tmpm);
	                } else if (_arrary[1] == "sec") {
	                    var tmps = Number(_dateUtils.date._formats['ss'](this.pickerDate));
	                    if (tmps < 59) {
	                        tmps++;
	                    } else {
	                        tmps = 0;
	                    }
	                    this.pickerDate.setSeconds(tmps);
	                }
	            } else if (_arrary[0] == "subtract") {
	                if (_arrary[1] == "hour") {
	                    var tmph = Number(_dateUtils.date._formats['HH'](this.pickerDate));
	                    if (tmph > 0) {
	                        tmph--;
	                    } else {
	                        tmph = 23;
	                    }
	                    this.pickerDate.setHours(tmph);
	                } else if (_arrary[1] == "min") {
	                    var tmpm = Number(_dateUtils.date._formats['mm'](this.pickerDate));
	                    if (tmpm > 0) {
	                        tmpm--;
	                    } else {
	                        tmpm = 59;
	                    }
	                    this.pickerDate.setMinutes(tmpm);
	                } else if (_arrary[1] == "sec") {
	                    var tmps = Number(_dateUtils.date._formats['ss'](this.pickerDate));
	                    if (tmps > 0) {
	                        tmps--;
	                    } else {
	                        tmps = 59;
	                    }
	                    this.pickerDate.setSeconds(tmps);
	                }
	            } else if (_arrary[0] == "show") {
	                var tmptarget = e.target;
	                var tmpinput = (0, _dom.makeDOM)("<input type='text' class='u-input'>");
	                if (tmptarget.querySelector('.u-input')) return;
	                this._updateDate();
	                tmpinput.value = tmptarget.innerHTML;
	                tmptarget.innerHTML = "";
	                tmptarget.appendChild(tmpinput);
	                if (_arrary[1] == "hour") {
	                    var vali = new _neouiValidate.Validate(tmpinput, { validType: "integer", minLength: 0, maxLength: 2, min: 0, max: 23 });
	                    (0, _event.on)(tmpinput, 'blur', function () {
	                        if (vali.passed) {
	                            self.pickerDate.setHours(tmpinput.value);
	                            self._updateDate();
	                        }
	                    });
	                } else if (_arrary[1] == "min") {
	                    var vali = new _neouiValidate.Validate(tmpinput, { validType: "integer", minLength: 0, maxLength: 2, min: 0, max: 59 });
	                    (0, _event.on)(tmpinput, 'blur', function () {
	                        if (vali.passed) {
	                            self.pickerDate.setMinutes(tmpinput.value);
	                            self._updateDate();
	                        }
	                    });
	                } else if (_arrary[1] == "sec") {
	                    var vali = new _neouiValidate.Validate(tmpinput, { validType: "integer", minLength: 0, maxLength: 2, min: 0, max: 59 });
	                    (0, _event.on)(tmpinput, 'blur', function () {
	                        if (vali.passed) {
	                            self.pickerDate.setSeconds(tmpinput.value);
	                            self._updateDate();
	                        }
	                    });
	                }

	                tmpinput.focus();
	                return;
	            } else {
	                return false;
	            }

	            this._updateDate();
	        }.bind(this));
	    } else {
	        timetemplate = '<div class="u-combo-ul clockpicker-popover is-visible" style="width:100%;padding:0px;">';
	        //        timetemplate += '<div class="popover-title"><span class="clockpicker-span-hours">02</span> : <span class="clockpicker-span-minutes text-primary">01</span><span class="clockpicker-span-am-pm"></span></div>';
	        timetemplate += '<div class="popover-content">';
	        timetemplate += '  <div class="clockpicker-plate data-clockpicker-plate">';
	        timetemplate += '      <div class="clockpicker-canvas">';
	        timetemplate += '          <svg class="clockpicker-svg">';
	        timetemplate += '              <g transform="translate(100,100)">';
	        timetemplate += '                  <circle class="clockpicker-canvas-bg clockpicker-canvas-bg-trans" r="13" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
	        timetemplate += '                  <circle class="clockpicker-canvas-fg" r="3.5" cx="8.362277061412277" cy="-79.56175162946187"></circle>';
	        timetemplate += '                  <line x1="0" y1="0" x2="8.362277061412277" y2="-79.56175162946187"></line>';
	        timetemplate += '                  <circle class="clockpicker-canvas-bearing" cx="0" cy="0" r="2"></circle>';
	        timetemplate += '              </g>';
	        timetemplate += '          </svg>';
	        timetemplate += '      </div>';
	        timetemplate += '      <div class="clockpicker-dial clockpicker-hours" style="visibility: visible;">';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-1" >00</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-2" >1</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-3" >2</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-4" >3</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-5" >4</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-6" >5</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-7" >6</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-8" >7</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-9" >8</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-10" >9</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-11" >10</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-12" >11</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-13" >12</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-14" >13</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-15" >14</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-16" >15</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-17" >16</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-18" >17</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-19" >18</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-20" >19</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-21" >20</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-22" >21</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-23" >22</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-24" >23</div>';
	        timetemplate += '      </div>';
	        timetemplate += '      <div class="clockpicker-dial clockpicker-minutes" style="visibility: hidden;">';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-25" >00</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-26" >05</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-27" >10</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-28" >15</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-29" >20</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-30" >25</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-31" >30</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-32" >35</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-33" >40</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-34" >45</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-35" >50</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-36" >55</div>';
	        timetemplate += '      </div>';

	        timetemplate += '      <div class="clockpicker-dial clockpicker-seconds" style="visibility: hidden;">';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-25" >00</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-26" >05</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-27" >10</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-28" >15</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-29" >20</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-30" >25</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-31" >30</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-32" >35</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-33" >40</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-34" >45</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-35" >50</div>';
	        timetemplate += '          <div class="clockpicker-tick clockpicker-tick-36" >55</div>';
	        timetemplate += '      </div>';

	        timetemplate += '  </div><span class="clockpicker-am-pm-block"></span></div>';
	        timetemplate += '  </div>';
	        cell = (0, _dom.makeDOM)(timetemplate);
	        this.cell = cell;
	        dateDiv.appendChild(cell);

	        this.hand = cell.querySelector('line');
	        this.bg = cell.querySelector('.clockpicker-canvas-bg');
	        this.fg = cell.querySelector('.clockpicker-canvas-fg');
	        this.titleHourSpan = cell.querySelector('.clockpicker-span-hours');
	        this.titleMinSpan = cell.querySelector('.clockpicker-span-minutes');
	        this.titleSecSpan = cell.querySelector('.clockpicker-span-seconds');
	        this.hourDiv = cell.querySelector('.clockpicker-hours');
	        this.minDiv = cell.querySelector('.clockpicker-minutes');
	        this.secDiv = cell.querySelector('.clockpicker-seconds');
	        this.currentView = 'hours';
	        this.hours = _dateUtils.date._formats['HH'](tempDate);
	        this.min = _dateUtils.date._formats['mm'](tempDate);
	        this.sec = _dateUtils.date._formats['ss'](tempDate);
	        //this.titleHourSpan.innerHTML = this.hours;
	        //this.titleMinSpan.innerHTML = this.min;


	        (0, _event.on)(this.hourDiv, 'click', function (e) {
	            var target = e.target;
	            if ((0, _dom.hasClass)(target, 'clockpicker-tick')) {
	                this.hours = target.innerHTML;
	                this.hours = this.hours > 9 || this.hours == 0 ? '' + this.hours : '0' + this.hours;
	                // this.titleHourSpan.innerHTML = this.hours;
	                self.pickerDate.setHours(this.hours);
	                var language = _core.core.getLanguages();
	                var time = _dateUtils.date._formats['HH'](this.pickerDate, language) + ':' + _dateUtils.date._formats['mm'](this.pickerDate, language) + ':' + _dateUtils.date._formats['ss'](this.pickerDate, language);
	                this._headerTime.innerHTML = time;
	                this.hourDiv.style.visibility = 'hidden';
	                this.minDiv.style.visibility = 'visible';
	                this.currentView = 'min';
	                this.setHand();
	            }
	        }.bind(this));

	        (0, _event.on)(this.minDiv, 'click', function (e) {
	            var target = e.target;
	            if ((0, _dom.hasClass)(target, 'clockpicker-tick')) {
	                this.min = target.innerHTML;
	                // this.min = this.min > 9 || this.min  == 00? '' + this.min:'0' + this.min;
	                // this.titleMinSpan.innerHTML = this.min;
	                self.pickerDate.setMinutes(this.min);
	                var language = _core.core.getLanguages();
	                var time = _dateUtils.date._formats['HH'](this.pickerDate, language) + ':' + _dateUtils.date._formats['mm'](this.pickerDate, language) + ':' + _dateUtils.date._formats['ss'](this.pickerDate, language);
	                this._headerTime.innerHTML = time;
	                this.minDiv.style.visibility = 'hidden';
	                this.secDiv.style.visibility = 'visible';
	                this.currentView = 'sec';
	                this.setHand();
	            }
	        }.bind(this));

	        (0, _event.on)(this.secDiv, 'click', function (e) {
	            var target = e.target;
	            if ((0, _dom.hasClass)(target, 'clockpicker-tick')) {
	                this.sec = target.innerHTML;
	                // this.min = this.min > 9 || this.min  == 00? '' + this.min:'0' + this.min;
	                // this.titleMinSpan.innerHTML = this.min;
	                self.pickerDate.setSeconds(this.sec);
	                var language = _core.core.getLanguages();
	                var time = _dateUtils.date._formats['HH'](this.pickerDate, language) + ':' + _dateUtils.date._formats['mm'](this.pickerDate, language) + ':' + _dateUtils.date._formats['ss'](this.pickerDate, language);
	                this._headerTime.innerHTML = time;
	                this.secDiv.style.visibility = 'hidden';
	                this.hourDiv.style.visibility = 'visible';
	                this.currentView = 'hours';
	                this.setHand();
	            }
	        }.bind(this));
	    }

	    this._zoomIn(timePage);
	    if (!_env.env.isIE8) this.setHand();
	    this.currentPanel = 'time';
	    dateDiv.onselectstart = new Function("return false");

	    var value = timePage.querySelector('.u-date-content-title-time').innerHTML;
	    var inputTemplate = '<div><input value=' + value + ' /></div>';
	};

	DateTimePicker.fn.setHand = function () {
	    var dialRadius = 100,
	        innerRadius = 54,
	        outerRadius = 80;
	    var view = this.currentView,
	        value = this[view],
	        isHours = view === 'hours',
	        unit = Math.PI / (isHours ? 6 : 30),
	        radian = value * unit,
	        radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
	        x = Math.sin(radian) * radius,
	        y = -Math.cos(radian) * radius;
	    this.setHandFun(x, y);
	};

	DateTimePicker.fn.setHandFun = function (x, y, roundBy5, dragging) {
	    var dialRadius = 100,
	        innerRadius = 54,
	        outerRadius = 80;

	    var radian = Math.atan2(x, -y),
	        isHours = this.currentView === 'hours',
	        unit = Math.PI / (isHours ? 6 : 30),
	        z = Math.sqrt(x * x + y * y),
	        options = this.options,
	        inner = isHours && z < (outerRadius + innerRadius) / 2,
	        radius = inner ? innerRadius : outerRadius,
	        value;

	    if (this.twelvehour) {
	        radius = outerRadius;
	    }

	    // Radian should in range [0, 2PI]
	    if (radian < 0) {
	        radian = Math.PI * 2 + radian;
	    }

	    // Get the round value
	    value = Math.round(radian / unit);

	    // Get the round radian
	    radian = value * unit;

	    // Correct the hours or minutes
	    if (options.twelvehour) {
	        if (isHours) {
	            if (value === 0) {
	                value = 12;
	            }
	        } else {
	            if (roundBy5) {
	                value *= 5;
	            }
	            if (value === 60) {
	                value = 0;
	            }
	        }
	    } else {
	        if (isHours) {
	            if (value === 12) {
	                value = 0;
	            }
	            value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
	        } else {
	            if (roundBy5) {
	                value *= 5;
	            }
	            if (value === 60) {
	                value = 0;
	            }
	        }
	    }

	    // Set clock hand and others' position
	    var w = this._panel.offsetWidth;
	    var u = w / 294;
	    var cx = Math.sin(radian) * radius * u,
	        cy = -Math.cos(radian) * radius * u;
	    var iu = 100 * u;
	    this.cell.querySelector('g').setAttribute('transform', 'translate(' + iu + ',' + iu + ')');
	    this.hand.setAttribute('x2', cx);
	    this.hand.setAttribute('y2', cy);
	    this.bg.setAttribute('cx', cx);
	    this.bg.setAttribute('cy', cy);
	    this.fg.setAttribute('cx', cx);
	    this.fg.setAttribute('cy', cy);
	};

	/**
	 * 重新渲染面板
	 * @private
	 */
	DateTimePicker.fn._updateDate = function () {
	    var year, month, week, date, time, hour, minute, seconds, language;

	    language = _core.core.getLanguages();
	    year = _dateUtils.date._formats['YYYY'](this.pickerDate);
	    // week = udate._formats['ddd'](this.pickerDate, language);
	    month = _dateUtils.date._formats['MM'](this.pickerDate, language);
	    time = _dateUtils.date._formats['HH'](this.pickerDate, language) + ':' + _dateUtils.date._formats['mm'](this.pickerDate, language) + ':' + _dateUtils.date._formats['ss'](this.pickerDate, language);

	    //TODO 多语
	    // date = udate._formats['D'](this.pickerDate) + '日';
	    date = _dateUtils.date._formats['DD'](this.pickerDate, language);
	    if (this._headerYear) {
	        this._headerYear.innerHTML = '';
	        this._headerYear.innerHTML = year;
	    }
	    // this._headerWeak.innerHTML = '';
	    // this._headerWeak.innerHTML = week;
	    if (this._headerMonth) {
	        this._headerMonth.innerHTML = '';
	        this._headerMonth.innerHTML = month;
	    }
	    if (this._headerDate) {
	        this._headerDate.innerHTML = '';
	        this._headerDate.innerHTML = date;
	    }
	    if (this._headerTime) {
	        this._headerTime.innerHTML = '';
	        this._headerTime.innerHTML = time;
	    }
	    if (this.currentPanel == 'time') {
	        if (_env.env.isIE8) {
	            this._panel.querySelector(".show_hour_cell").innerHTML = _dateUtils.date._formats['HH'](this.pickerDate, language);
	            this._panel.querySelector(".show_min_cell").innerHTML = _dateUtils.date._formats['mm'](this.pickerDate, language);
	            this._panel.querySelector(".show_sec_cell").innerHTML = _dateUtils.date._formats['ss'](this.pickerDate, language);
	        }
	    }
	};

	DateTimePicker.fn._response = function () {
	    return;
	    var bodyHeight = document.body.offsetHeight; //395
	    var _height = 430;
	    if (this.type === 'date' && !_env.env.isMobile) _height = 395;
	    if (bodyHeight > _height) {
	        this._panel.style.height = _height;
	    }
	    //if (bodyHeight > 500){
	    //    this._panel.style.height =  '500px';
	    //}
	    //this._dateContent.style.height =panelHeight - 158 + 'px';   // 106 52
	};

	var dateTimePickerTemplateArr = ['<div class="u-date-panel">', '<div class="u-date-body">',
	/*'<div class="u-date-header">',
	    '<span class="u-date-header-year"></span>',
	     '<div class="u-date-header-h3">',
	        '<span class="u-date-header-week"></span>',
	        '<span>,</span>',
	        '<span class="u-date-header-month"></span>',
	        '<span> </span>',
	        '<span class="u-date-header-date"></span>',
	        '<span> </span>',
	        '<span class="u-date-header-time"></span>',
	     '</div>',
	'</div>',*/
	'<div class="u-date-content"></div>', '</div>', '<div class="u-date-nav">', '<button type="button" class="u-button u-date-ok right primary">确定</button>', '<button type="button" class="u-button u-date-cancel right">取消</button>', '<button type="button" class="u-button u-date-clean">清空</button>', '</div>', '</div>'];

	/******************************
	 *  Public method
	 ******************************/

	DateTimePicker.fn.show = function (evt) {
	    if (!this.enable) {
	        return;
	    }
	    var inputValue = this._input.value;
	    this.setDate(inputValue);

	    var self = this;
	    if (!this._panel) {
	        this._panel = (0, _dom.makeDOM)(dateTimePickerTemplateArr.join(""));
	        /*if(env.isMobile){
	            removeClass(this._panel,'u-date-panel')
	            addClass(this._panel,'u-date-panel-mobile');
	        }*/
	        this._dateNav = this._panel.querySelector('.u-date-nav');
	        // if (this.type === 'date' && !env.isMobile){
	        //    this._dateNav.style.display = 'none';
	        // }
	        this._dateContent = this._panel.querySelector('.u-date-content');
	        if (this.type == 'datetime') {
	            /*if(env.isMobile){
	                this._dateContent.style.height = '226/16*2rem';
	            }
	            else{
	                this._dateContent.style.height = '226px';
	            }*/
	        }
	        this.btnOk = this._panel.querySelector('.u-date-ok');
	        this.btnCancel = this._panel.querySelector('.u-date-cancel');
	        this.btnClean = this._panel.querySelector('.u-date-clean');
	        var rippleContainer = document.createElement('span');
	        (0, _dom.addClass)(rippleContainer, 'u-ripple');
	        this.btnOk.appendChild(rippleContainer);
	        var rippleContainer = document.createElement('span');
	        (0, _dom.addClass)(rippleContainer, 'u-ripple');
	        this.btnCancel.appendChild(rippleContainer);
	        var rippleContainer = document.createElement('span');
	        (0, _dom.addClass)(rippleContainer, 'u-ripple');
	        this.btnClean.appendChild(rippleContainer);
	        new _ripple.URipple(this.btnOk);
	        new _ripple.URipple(this.btnCancel);
	        new _ripple.URipple(this.btnClean);
	        (0, _event.on)(this.btnOk, 'click', function (e) {
	            this.onOk();
	            (0, _event.stopEvent)(e);
	        }.bind(this));
	        (0, _event.on)(this.btnCancel, 'click', function (e) {
	            self.onCancel();
	            (0, _event.stopEvent)(e);
	        });
	        (0, _event.on)(this.btnClean, 'click', function (e) {
	            self.pickerDate = null;
	            self.onOk();
	            (0, _event.stopEvent)(e);
	        });

	        // this.preBtn = makeDOM('<button class="u-date-pre-button u-button flat floating mini">&lt;</button>');
	        // this.nextBtn = makeDOM('<button class="u-date-next-button u-button flat floating mini">&gt;</button>');
	        this.preBtn = (0, _dom.makeDOM)('<button class="u-date-pre-button u-button mini">&lt;</button>');
	        this.nextBtn = (0, _dom.makeDOM)('<button class="u-date-next-button u-button mini">&gt;</button>');
	        // new u.Button(this.nextBtn);

	        (0, _event.on)(this.preBtn, 'click', function (e) {
	            if (self.currentPanel == 'date') {
	                self._fillDate('preivous');
	            } else if (self.currentPanel == 'year') {
	                self._fillYear('preivous');
	            }
	            (0, _event.stopEvent)(e);
	        });
	        (0, _event.on)(this.nextBtn, 'click', function (e) {
	            if (self.currentPanel == 'date') {
	                self._fillDate('next');
	            } else if (self.currentPanel == 'year') {
	                self._fillYear('next');
	            }
	            (0, _event.stopEvent)(e);
	        });
	        // if(!env.isMobile){
	        this._dateContent.appendChild(this.preBtn);
	        this._dateContent.appendChild(this.nextBtn);
	        // }

	    }
	    this.pickerDate = this.date || new Date();
	    this._updateDate();
	    this._fillDate();
	    this._response();
	    (0, _event.on)(window, 'resize', function () {
	        self._response();
	    });
	    /*if(env.isMobile){
	        this.overlayDiv = makeModal(this._panel);
	        on(this.overlayDiv, 'click', function(){
	            self.onCancel();
	        })
	    }*/
	    (0, _dom.addClass)(this._panel, 'is-visible');
	    if (!_env.env.isMobile) {
	        if (this.options.showFix) {
	            document.body.appendChild(this._panel);
	            this._panel.style.position = 'fixed';
	            (0, _dom.showPanelByEle)({
	                ele: this._input,
	                panel: this._panel,
	                position: "bottomLeft"
	            });
	        } else {
	            var bodyWidth = document.body.clientWidth,
	                bodyHeight = document.body.clientHeight,
	                panelWidth = this._panel.offsetWidth,
	                panelHeight = this._panel.offsetHeight;
	            //调整left和top
	            // this._element.parentNode.appendChild(this._panel);
	            this._element.appendChild(this._panel);
	            this._element.style.position = 'relative';
	            // this.left = this.element.offsetLeft;
	            //
	            this.left = this._input.offsetLeft;
	            var inputHeight = this._input.offsetHeight;
	            // this.top = this.element.offsetTop + inputHeight;
	            this.top = this._input.offsetTop + inputHeight;

	            var abLeft = (0, _dom.getElementLeft)(this._input),
	                abTop = (0, _dom.getElementTop)(this._input);

	            if (abLeft + panelWidth > bodyWidth) {
	                if (abLeft - bodyWidth > 0) {
	                    this.left = -panelWidth;
	                } else {
	                    this.left = bodyWidth - panelWidth - abLeft;
	                }
	            }

	            if (abTop + panelHeight > bodyHeight) {
	                if (abTop - bodyHeight > 0) {
	                    this.top = -panelHeight;
	                } else {
	                    this.top = bodyHeight - panelHeight - abTop;
	                }
	            }

	            this._panel.style.left = this.left + 'px';
	            this._panel.style.top = this.top + 'px';
	        }

	        this._panel.style.marginLeft = '0px';
	        var callback = function callback(e) {
	            if (e !== evt && e.target !== self._input && !(0, _dom.hasClass)(e.target, 'u-date-content-year-cell') && !(0, _dom.hasClass)(e.target, 'u-date-content-year-cell') && (0, _dom.closest)(e.target, 'u-date-panel') !== self._panel && self._inputFocus != true) {
	                (0, _event.off)(document, 'click', callback);
	                self.onCancel();
	            }
	        };
	        (0, _event.on)(document, 'click', callback);

	        //tab事件
	        (0, _event.on)(self._input, 'keydown', function (e) {
	            var keyCode = e.keyCode;
	            if (keyCode == 9) {
	                self.onCancel();
	            }
	        });
	    }

	    this.isShow = true;
	};

	/**
	 * 确定事件
	 */
	DateTimePicker.fn.onOk = function () {
	    if (typeof this.options.beforeValueChangeFun == 'function') {
	        if (!this.options.beforeValueChangeFun.call(this, this.pickerDate)) {
	            return;
	        }
	    }
	    this.setDate(this.pickerDate);
	    this.isShow = false;
	    this.timeOpen = false;
	    (0, _dom.removeClass)(this._panel, 'is-visible');
	    try {
	        document.body.removeChild(this.overlayDiv);
	    } catch (e) {}
	    this.trigger('select', { value: this.pickerDate });
	    this.trigger('validate');
	};

	DateTimePicker.fn.hide = function () {
	    this.isShow = false;
	    this.timeOpen = false;
	    (0, _dom.removeClass)(this._panel, 'is-visible');
	};

	/**
	 * 确定事件
	 */
	DateTimePicker.fn.onCancel = function () {
	    this.isShow = false;
	    this.timeOpen = false;
	    (0, _dom.removeClass)(this._panel, 'is-visible');
	    try {
	        document.body.removeChild(this.overlayDiv);
	    } catch (e) {}
	    this.trigger('validate');
	};

	DateTimePicker.fn.setDate = function (value) {
	    if (!value) {
	        this.date = null;
	        this._input.value = '';
	        return;
	    }

	    var _date = _dateUtils.date.getDateObj(value);
	    if (_date) {
	        if (this.beginDateObj) {
	            if (_date < this.beginDateObj) return;
	        }
	        this.date = _date;
	        this._input.value = _dateUtils.date.format(this.date, this.format);
	    }
	};
	/**
	 *设置format
	 * @param format
	 */
	DateTimePicker.fn.setFormat = function (format) {
	    this.format = format;
	    this._input.value = _dateUtils.date.format(this.date, this.format);
	};

	DateTimePicker.fn.setStartDate = function (startDate, type) {
	    if (startDate) {
	        this.beginDateObj = _dateUtils.date.getDateObj(startDate);
	        switch (type) {
	            case 'YYYY-MM':
	                this.beginDateObj = _dateUtils.date.add(this.beginDateObj, 'M', 1);
	                break;
	            case 'YYYY-MM-DD':
	                this.beginDateObj = _dateUtils.date.add(this.beginDateObj, 'd', 1);
	                break;
	        }

	        this.beginYear = this.beginDateObj.getFullYear();
	        this.beginMonth = this.beginDateObj.getMonth();
	        this.beginDate = this.beginDateObj.getDate();
	    }
	};

	DateTimePicker.fn.setEndDate = function (endDate) {
	    if (endDate) {
	        this.overDateObj = _dateUtils.date.getDateObj(endDate);
	        this.overYear = this.overDateObj.getFullYear();
	        this.overMonth = this.overDateObj.getMonth();
	        this.overDate = this.overDateObj.getDate();
	    }
	};

	DateTimePicker.fn.setEnable = function (enable) {
	    if (enable === true || enable === 'true') {
	        this.enable = true;
	    } else {
	        this.enable = false;
	    }
	};

	_compMgr.compMgr.regComp({
	    comp: DateTimePicker,
	    compAsString: 'u.DateTimePicker',
	    css: 'u-datepicker'
	});

	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}

	exports.DateTimePicker = DateTimePicker;

/***/ },
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

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.iframeDialog = exports.dialogWizard = exports.dialog = exports.dialogMode = exports.confirmDialog = exports.messageDialog = undefined;

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

	var messageDialogTemplate = '<div class="u-msg-dialog-top" id="{id}_top">' + '<div class="u-msg-dialog" style="{width}{height}{top}">' + '<div class="u-msg-dialog-content">' + '<div class="u-msg-title">' + '<h4>{title}</h4>' + '</div>' + '<div class="u-msg-content"></div>' + '{footer}' + '</div></div>';

	var messageDialogF = function messageDialogF(options) {

		if (typeof options === 'string') {
			options = {
				content: options
			};
		}
		var defaultOptions = {
			id: '',
			msg: '',
			template: messageDialogTemplate,
			width: '',
			height: '',
			top: '',
			hasFooter: true,
			title: '提示',
			btnText: '确定',
			closeFun: function closeFun() {}

		};
		options = (0, _extend.extend)(defaultOptions, options);
		this.id = options['id'];
		this.hasFooter = options['hasFooter'];
		this.content = options['msg'];
		this.title = options['title'];
		this.template = options['template'];
		this.width = options['width'];
		this.height = options['height'];
		this.top = options['top'];
		this.bthText = options['btnText'];
		this.lazyShow = options['lazyShow'];
		this.closeFun = options['closeFun'];
		this.create();

		var msgDom = this.templateDom.querySelector('.u-msg-dialog');
		if (this.height) {
			this.resizeFun = function () {
				var cDom = msgDom.querySelector('.u-msg-content');
				if (!cDom) return;
				cDom.style.height = '';
				var wholeHeight = msgDom.offsetHeight;
				var contentHeight = msgDom.scrollHeight;
				// if(contentHeight > wholeHeight && cDom)
				cDom.style.height = wholeHeight - (56 + 46) + 'px';
			}.bind(this);

			this.resizeFun();
			(0, _event.on)(window, 'resize', this.resizeFun);
		}
	};

	messageDialogF.prototype.create = function () {
		var self = this,
		    closeStr = '';
		if (this.hasFooter) {
			var footerStr = '<div class="u-msg-footer only-one-btn"><button class="u-msg-ok u-button u-button-primary raised">' + this.bthText + '</button></div>' + '</div>';
		}
		var templateStr = this.template.replace('{id}', this.id).replace('{id}', this.id);
		templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
		templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');
		templateStr = templateStr.replace('{top}', this.top ? 'top:' + this.top + ';' : '');
		templateStr = templateStr.replace('{title}', this.title);
		templateStr = templateStr.replace('{footer}', footerStr);
		var htmlReg = /^(\s*)?<[a-zA-Z]+/ig;
		var selectReg = /^(\.|#)/;
		if (htmlReg.test(this.content)) {
			this.contentDom = (0, _dom.makeDOM)(this.content);
			this.contentDomParent = this.contentDom.parentNode;
			this.contentDom.style.display = 'block';
		} else if (selectReg.test(this.content)) {
			this.contentDom = document.querySelector(this.content);
			this.contentDomParent = this.contentDom.parentNode;
			this.contentDom.style.display = 'block';
		} else {
			this.contentDom = (0, _dom.makeDOM)('<p>' + this.content + '</p>');
		}
		this.templateDom = (0, _dom.makeDOM)(templateStr);

		this.templateDom.querySelector('.u-msg-content').appendChild(this.contentDom);
		this.overlayDiv = (0, _dom.makeModal)(this.templateDom);

		this.okDiv = this.templateDom.querySelector('.u-msg-ok');
		(0, _event.on)(this.okDiv, 'click', function () {
			self.close();
		});

		if (this.lazyShow) {
			this.templateDom.style.display = 'none';
			this.overlayDiv.style.display = 'none';
		}
		document.body.appendChild(this.templateDom);
		disable_mouseWheel();
		this.isClosed = false;
	};

	messageDialogF.prototype.close = function () {
		this.closeFun && this.closeFun.call(this);
		if (this.contentDom) {
			this.contentDom.style.display = 'none';
			this.contentDomParent && this.contentDomParent.appendChild(this.contentDom);
		}
		document.body.removeChild(this.templateDom);
		document.body.removeChild(this.overlayDiv);
		this.isClosed = true;
		enable_mouseWheel();
	};

	var messageDialog = function messageDialog(options) {
		return new messageDialogF(options);
	};

	/**
	 * Module : confirmDialog
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-07-29 10:21:33
	 */
	var confirmDialogTemplate = '<div class="u-msg-dialog-top" id="{id}_top">' + '<div class="u-msg-dialog" style="{width}{height}{top}">' + '<div class="u-msg-dialog-content">' + '<div class="u-msg-title">' + '<h4>{title}</h4>' + '</div>' + '<div class="u-msg-content">' + '</div>' + '{footer}' + '</div></div>';

	var confirmDialogF = function confirmDialogF(options) {
		if (typeof options === 'string') {
			options = {
				content: options
			};
		}
		var defaultOptions = {
			id: '',
			msg: '',
			template: confirmDialogTemplate,
			width: '',
			height: '',
			top: '',
			hasFooter: true,
			onOk: function onOk() {},
			onCancel: function onCancel() {},
			okText: '确定',
			cancelText: '取消'
		};

		options = (0, _extend.extend)(defaultOptions, options);
		this.id = options['id'];
		this.hasFooter = options['hasFooter'];
		this.content = options['msg'];
		this.template = options['template'];
		this.width = options['width'];
		this.height = options['height'];
		this.height = options['top'];
		this.title = options['title'];
		this.lazyShow = options['lazyShow'];
		this.onOk = options['onOk'];
		this.onCancel = options['onCancel'];
		this.okText = options['okText'];
		this.cancelText = options['cancelText'];
		this.create();

		var msgDom = this.templateDom.querySelector('.u-msg-dialog');

		if (this.height) {
			this.resizeFun = function () {
				var cDom = msgDom.querySelector('.u-msg-content');
				if (!cDom) return;
				cDom.style.height = '';
				var wholeHeight = msgDom.offsetHeight;
				var contentHeight = msgDom.scrollHeight;
				// if(contentHeight > wholeHeight && cDom)
				cDom.style.height = wholeHeight - (56 + 46) + 'px';
			}.bind(this);

			this.resizeFun();
			(0, _event.on)(window, 'resize', this.resizeFun);
		}
	};

	confirmDialogF.prototype.create = function () {
		var footerStr = '',
		    oThis = this;
		if (this.hasFooter) {
			var footerStr = '<div class="u-msg-footer"><button class="u-msg-ok u-button u-button-primary raised">{okText}</button><button class="u-msg-cancel u-button">{cancelText}</button></div>' + '</div>';
		}
		var templateStr = this.template.replace('{id}', this.id).replace('{id}', this.id);
		templateStr = templateStr.replace('{title}', this.title);
		templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
		templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');
		templateStr = templateStr.replace('{top}', this.top ? 'top:' + this.top + ';' : '');
		templateStr = templateStr.replace('{footer}', footerStr);
		templateStr = templateStr.replace('{okText}', this.okText);
		templateStr = templateStr.replace('{cancelText}', this.cancelText);
		var htmlReg = /^(\s*)?<[a-zA-Z]+/ig;
		var selectReg = /^(\.|#)/;
		if (htmlReg.test(this.content)) {
			this.contentDom = (0, _dom.makeDOM)(this.content);
			this.contentDomParent = this.contentDom.parentNode;
			this.contentDom.style.display = 'block';
		} else if (selectReg.test(this.content)) {
			this.contentDom = document.querySelector(this.content);
			this.contentDomParent = this.contentDom.parentNode;
			this.contentDom.style.display = 'block';
		} else {
			this.contentDom = (0, _dom.makeDOM)('<p>' + this.content + '</p>');
		}
		this.templateDom = (0, _dom.makeDOM)(templateStr);

		this.templateDom.querySelector('.u-msg-content').appendChild(this.contentDom);
		this.overlayDiv = (0, _dom.makeModal)(this.templateDom);

		if (this.lazyShow) {
			this.templateDom.style.display = 'none';
			this.overlayDiv.style.display = 'none';
		}

		if (this.hasFooter) {
			var okBtn = this.templateDom.querySelector('.u-msg-ok');
			var cancelBtn = this.templateDom.querySelector('.u-msg-cancel');
			var closeBtn = new _neouiButton.Button({
				el: okBtn
			});
			new _neouiButton.Button({
				el: cancelBtn
			});
			(0, _event.on)(okBtn, 'click', function () {
				if (oThis.onOk() !== false) {
					oThis.close();
				}
			});
			(0, _event.on)(cancelBtn, 'click', function () {
				if (oThis.onCancel() !== false) {
					oThis.close();
				}
			});
		}

		document.body.appendChild(this.templateDom);
		disable_mouseWheel();
		this.isClosed = false;
	};

	confirmDialogF.prototype.close = function () {
		document.body.removeChild(this.templateDom);
		document.body.removeChild(this.overlayDiv);
		this.isClosed = true;
	};

	var confirmDialog = function confirmDialog(options) {
		return new confirmDialogF(options);
	};
	/**
	 * Created by dingrf on 2015-11-19.
	 */

	/**
	 * 三按钮确认框（是 否  取消）
	 */
	var threeBtnDialog = function threeBtnDialog() {};
	/**
	 * 禁用鼠标滚轮事件
	 * @return {[type]} [description]
	 */
	var disable_mouseWheel = function disable_mouseWheel() {
		document.body.style.paddingRight = '17px';
		document.body.style.overflow = 'hidden';
	};
	/**
	 * 事件禁用
	 * @param  {[type]} evt [description]
	 * @return {[type]}     [description]
	 */
	var scrollFunc = function scrollFunc(evt) {
		evt = evt || window.event;
		if (evt.preventDefault) {
			// Firefox
			evt.preventDefault();
			evt.stopPropagation();
		} else {
			// IE
			evt.cancelBubble = true;
			evt.returnValue = false;
		}
		return false;
	};

	/**
	 * 开启鼠标滚轮事件
	 * @return {[type]} [description]
	 */
	var enable_mouseWheel = function enable_mouseWheel() {
		document.body.style.paddingRight = '';
		document.body.style.overflow = '';
	};

	/**
	 * dialog.js
	 */

	var dialogTemplate = '<div class="u-msg-dialog-top" id="{id}_top">' + '<div class="u-msg-dialog" id="{id}" style="{width}{height}">' + '{close}' + '<div class="u-msg-dialog-content"></div>' + '</div></div>';

	var dialogMode = function dialogMode(options) {
		// 传入字符串的情况直接将字符串作为内容显示
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
		this.closeFun = options['closeFun'];
		this.create();

		var msgDom = this.templateDom.querySelector('.u-msg-dialog');

		if (this.height) {
			this.resizeFun = function () {
				var cDom = msgDom.querySelector('.u-msg-content');
				if (!cDom) return;
				cDom.style.height = '';
				var wholeHeight = msgDom.offsetHeight;
				var contentHeight = msgDom.scrollHeight;
				// if(contentHeight > wholeHeight && cDom)
				cDom.style.height = wholeHeight - (56 + 46) + 'px';
			}.bind(this);

			this.resizeFun();
			(0, _event.on)(window, 'resize', this.resizeFun);
		}
	};

	dialogMode.prototype.create = function () {
		var closeStr = '',
		    oThis = this;
		if (this.hasCloseMenu) {
			var closeStr = '<div class="u-msg-close"> <span aria-hidden="true">&times;</span></div>';
		}
		var templateStr = this.template.replace('{id}', this.id).replace('{id}', this.id);
		templateStr = templateStr.replace('{close}', closeStr);
		templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
		templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');

		var htmlReg = /^(\s*)?<[a-zA-Z]+/ig;
		var selectReg = /^(\.|#)/;
		if (htmlReg.test(this.content)) {
			this.contentDom = (0, _dom.makeDOM)(this.content);
			this.contentDomParent = this.contentDom.parentNode;
			this.contentDom.style.display = 'block';
		} else if (selectReg.test(this.content)) {
			this.contentDom = document.querySelector(this.content);
			this.contentDomParent = this.contentDom.parentNode;
			this.contentDom.style.display = 'block';
		} else {
			this.contentDom = (0, _dom.makeDOM)('<div><div class="u-msg-content"><p>' + this.content + '</p></div></div>');
		}
		this.templateDom = (0, _dom.makeDOM)(templateStr);

		this.templateDom.querySelector('.u-msg-dialog-content').appendChild(this.contentDom);
		this.overlayDiv = (0, _dom.makeModal)(this.templateDom);
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
		disable_mouseWheel();
		this.isClosed = false;
	};

	dialogMode.prototype.show = function () {
		if (this.isClosed) {
			this.create();
		}
		this.templateDom.style.display = 'block';
		this.overlayDiv.style.display = 'block';
		disable_mouseWheel();
	};

	dialogMode.prototype.hide = function () {
		this.templateDom.style.display = 'none';
		this.overlayDiv.style.display = 'none';
		enable_mouseWheel();
	};

	dialogMode.prototype.close = function () {
		this.closeFun && this.closeFun.call(this);
		if (this.contentDom) {
			this.contentDom.style.display = 'none';
			this.contentDomParent && this.contentDomParent.appendChild(this.contentDom);
		}
		document.body.removeChild(this.templateDom);
		try {
			document.body.removeChild(this.overlayDiv);
		} catch (e) {}

		this.isClosed = true;
		enable_mouseWheel();
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
			disable_mouseWheel();
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
			enable_mouseWheel();
		};
		return new wizard();
	};

	/**
	 * Module : iframeDialog
	 * Author : wh(wanghaoo@yonyou.com)
	 * Date	  : 2016-09-8 9:33
	 */
	var iframeDialogTemplate = '<div class="u-msg-dialog u-iframe-dialog" style="{width}{height}{top}">' + '{close}' + '<div class="u-msg-title">' + '<h4>{title}</h4>' + '</div>' + '<div class="u-msg-content">' + '<iframe src="{url}" width = "99%" height ="100%"></iframe>' + '</div>' + '{footer}';

	// '<div class="u-msg-title">' +
	// '<h4>{title}</h4>' +
	// '</div>' +
	// '<div class="u-msg-content">' +

	// '</div>' +
	// '<div class="u-msg-footer"><button class="u-msg-ok u-button primary raised">{okText}</button><button class="u-msg-cancel u-button">{cancelText}</button></div>' +
	// '</div>';

	var iframeDialogF = function iframeDialogF(options) {

		var defaultOptions = {
			hasCloseMenu: true,
			hasFooter: false,
			url: '',
			width: '',
			height: '',
			title: '标题',
			top: '10%',
			onClose: function onClose() {},
			onCancel: function onCancel() {},
			onOk: function onOk() {}
		};

		options = (0, _extend.extend)(defaultOptions, options);
		this.id = options['id'];
		this.template = iframeDialogTemplate;
		this.hasCloseMenu = options['hasCloseMenu'];
		this.hasFooter = options['hasFooter'];
		this.url = options['url'];
		this.top = options['top'];
		this.title = options['title'];
		this.width = options['width'];
		this.height = options['height'];
		this.onClose = options['onClose'];
		this.onOk = options['onOk'];
		this.onCancel = options['onCancel'];
		//是否有url，没有url直接跳出
		if (!this.url) {
			return;
		}

		this.create();

		this.resizeFun = function () {
			// var cDom = this.contentDom.querySelector('.u-msg-content');
			// cDom.style.height = '';
			// var wholeHeight = this.templateDom.offsetHeight;
			// var contentHeight = this.contentDom.offsetHeight;
			// if(contentHeight > wholeHeight && cDom)
			// 	cDom.style.height = wholeHeight - (56 + 46) + 'px';

			var wholeHeight = this.templateDom.offsetHeight;
			var cDom = this.templateDom.querySelector('.u-msg-content');
			if (this.hasFooter) {
				cDom.style.height = wholeHeight - (56 + 52) + 'px';
			} else {
				cDom.style.height = wholeHeight - 52 + 'px';
			}
		}.bind(this);

		this.resizeFun();
		(0, _event.on)(window, 'resize', this.resizeFun);
	};

	iframeDialogF.prototype.create = function () {
		var closeStr = '',
		    footerStr = '';
		var oThis = this;
		if (this.hasCloseMenu) {
			var closeStr = '<div class="u-msg-close"> <span aria-hidden="true">&times;</span></div>';
		}
		if (this.hasFooter) {
			var footerStr = '<div class="u-msg-footer"><button class="u-msg-ok u-button u-button-primary raised">确定</button><button class="u-msg-cancel u-button">取消</button></div>' + '</div>';
		}
		var templateStr = this.template.replace('{close}', closeStr);
		templateStr = templateStr.replace('{url}', this.url);
		templateStr = templateStr.replace('{title}', this.title);
		templateStr = templateStr.replace('{footer}', footerStr);
		templateStr = templateStr.replace('{width}', this.width ? 'width:' + this.width + ';' : '');
		templateStr = templateStr.replace('{height}', this.height ? 'height:' + this.height + ';' : '');
		templateStr = templateStr.replace('{top}', this.top ? 'top:' + this.top + ';' : '');

		this.templateDom = (0, _dom.makeDOM)(templateStr);
		this.overlayDiv = (0, _dom.makeModal)(this.templateDom);

		if (this.hasCloseMenu) {
			this.closeDiv = this.templateDom.querySelector('.u-msg-close');
			(0, _event.on)(this.closeDiv, 'click', function () {
				if (oThis.onClose() !== false) {
					oThis.close();
				}
			});
		}

		if (this.hasFooter) {
			var okBtn = this.templateDom.querySelector('.u-msg-ok');
			var cancelBtn = this.templateDom.querySelector('.u-msg-cancel');
			var closeBtn = new _neouiButton.Button({
				el: okBtn
			});
			new _neouiButton.Button({
				el: cancelBtn
			});
			(0, _event.on)(okBtn, 'click', function () {
				if (oThis.onOk() !== false) {
					oThis.close();
				}
			});
			(0, _event.on)(cancelBtn, 'click', function () {
				if (oThis.onCancel() !== false) {
					oThis.close();
				}
			});
		}

		document.body.appendChild(this.templateDom);
		this.isClosed = false;
	};

	iframeDialogF.prototype.close = function () {

		document.body.removeChild(this.templateDom);
		document.body.removeChild(this.overlayDiv);
		this.isClosed = true;
	};

	var iframeDialog = function iframeDialog(options) {
		return new iframeDialogF(options);
	};

	exports.messageDialog = messageDialog;
	exports.confirmDialog = confirmDialog;
	exports.dialogMode = dialogMode;
	exports.dialog = dialog;
	exports.dialogWizard = dialogWizard;
	exports.iframeDialog = iframeDialog;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
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
			// on(window, 'resize', function(){
			// 	me.response();
			// })

			setInterval(function () {
				me.response();
			}, 100);
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
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.MDLayout = MDLayout;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.NavLayoutTab = exports.NavLayout = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _ripple = __webpack_require__(13);

	var _env = __webpack_require__(6);

	var _compMgr = __webpack_require__(9);

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

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;
	exports.hideLoader = exports.showLoader = undefined;

	var _dom = __webpack_require__(10);

	/*
	 *加载loading
	 */
	var loadTemplate = "<div class='u-loader-container'><div class='u-loader'>{centerContent}</div>{loadDesc}</div>"; //{centerContent}为加载条中间内容
	/**
	 * @param  {Object} options
	 * @return {[type]}
	 */
	/**
	 * Module : neoui-loader
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 19:02:09
	 */
	var showLoader = function showLoader(options) {
		// hasback:是否含有遮罩层，centerContent加载图标中的内容，parEle加载图标的父元素,hasDesc加载条说明
		var hasback, centerContent, template, parEle, templateDom, loadDesc;
		options = options || {};
		hasback = options["hasback"];
		centerContent = options["centerContent"] || '';
		// hasDesc=options["hasDesc"];
		template = loadTemplate.replace('{centerContent}', centerContent);
		loadDesc = options["hasDesc"] ? "<div class='u-loader-desc'>页面加载中，请稍后。。。</div>" : " ";

		template = template.replace("{loadDesc}", loadDesc);

		templateDom = (0, _dom.makeDOM)(template);
		parEle = options["parEle"] || document.body;
		if (hasback) {
			var overlayDiv = (0, _dom.makeModal)(templateDom, parEle);
		}
		if (parEle == document.body) {
			templateDom.style.position = 'fixed';
		}
		parEle.appendChild(templateDom);
	};
	var hideLoader = function hideLoader(options) {
		var cssStr, hasback;
		options = options || {};
		if (options && options.cssStr) {
			cssStr = options.cssStr;
		} else {
			cssStr = '.u-loader-container';
		}

		hasback = options["hasback"];
		if (hasback) {
			// 默认删除最高层的
			var overlayDivs = document.querySelectorAll('.u-overlay');
			var l = overlayDivs.length;
			var div = overlayDivs[l - 1];
			div.parentNode.removeChild(div);
		}
		var divs = document.querySelectorAll(cssStr);
		for (var i = 0; i < divs.length; i++) {
			divs[i].parentNode.removeChild(divs[i]);
		}
	};

	exports.showLoader = showLoader;
	exports.hideLoader = hideLoader;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.removeWaiting = exports.showWaiting = exports.hideLoading = exports.showLoading = exports.Loading = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _env = __webpack_require__(6);

	var _event = __webpack_require__(5);

	var _compMgr = __webpack_require__(9);

	var Loading = _BaseComponent.BaseComponent.extend({
		_Constant: {
			U_LOADING_LAYER_COUNT: 4
		},

		_CssClasses: {
			U_LOADING_LAYER: 'u-loading-layer',
			U_LOADING_CIRCLE_CLIPPER: 'u-loading-circle-clipper',
			U_LOADING_CIRCLE: 'u-loading-circle',
			U_LOADING_GAP_PATCH: 'u-loading-gap-patch',
			U_LOADING_LEFT: 'u-loading-left',
			U_LOADING_RIGHT: 'u-loading-right'
		},

		init: function init() {
			if (_env.env.isIE8 || _env.env.isIE9) {
				var img = document.createElement('div');
				img.className = "loadingImg";
				this.element.appendChild(img);
			} else {
				for (var i = 1; i <= this._Constant.U_LOADING_LAYER_COUNT; i++) {
					this.createLayer(i);
				}
			}
			(0, _dom.addClass)(this.element, 'is-upgraded');
		},

		createLayer: function createLayer(index) {
			var layer = document.createElement('div');
			(0, _dom.addClass)(layer, this._CssClasses.U_LOADING_LAYER);
			(0, _dom.addClass)(layer, this._CssClasses.U_LOADING_LAYER + '-' + index);

			var leftClipper = document.createElement('div');
			(0, _dom.addClass)(leftClipper, this._CssClasses.U_LOADING_CIRCLE_CLIPPER);
			(0, _dom.addClass)(leftClipper, this._CssClasses.U_LOADING_LEFT);

			var gapPatch = document.createElement('div');
			(0, _dom.addClass)(gapPatch, this._CssClasses.U_LOADING_GAP_PATCH);

			var rightClipper = document.createElement('div');
			(0, _dom.addClass)(rightClipper, this._CssClasses.U_LOADING_CIRCLE_CLIPPER);
			(0, _dom.addClass)(rightClipper, this._CssClasses.U_LOADING_RIGHT);

			var circleOwners = [leftClipper, gapPatch, rightClipper];

			for (var i = 0; i < circleOwners.length; i++) {
				var circle = document.createElement('div');
				(0, _dom.addClass)(circle, this._CssClasses.U_LOADING_CIRCLE);
				circleOwners[i].appendChild(circle);
			}

			layer.appendChild(leftClipper);
			layer.appendChild(gapPatch);
			layer.appendChild(rightClipper);

			this.element.appendChild(layer);
		},

		stop: function stop() {
			(0, _dom.removeClass)(this.element, 'is-active');
		},

		start: function start() {
			(0, _dom.addClass)(this.element, 'is-active');
		}

	}); /**
	     * Module : neoui-loading
	     * Author : Kvkens(yueming@yonyou.com)
	     * Date	  : 2016-08-02 19:11:45
	     */


	_compMgr.compMgr.regComp({
		comp: Loading,
		compAsString: 'u.Loading',
		css: 'u-loading'
	});

	var showLoading = function showLoading(op) {
		var htmlStr = '<div class="alert alert-waiting"><i class="uf uf-spinnerofdots"></i></div>';
		document.body.appendChild((0, _dom.makeDOM)(htmlStr));
		htmlStr = '<div class="alert-backdrop" role="waiting-backdrop"></div>';
		document.body.appendChild((0, _dom.makeDOM)(htmlStr));
	};

	var hideLoading = function hideLoading() {
		var divs = document.querySelectorAll('.alert-waiting,.alert-backdrop');
		for (var i = 0; i < divs.length; i++) {
			document.body.removeChild(divs[i]);
		}
	};
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}
	//兼容性保留
	var showWaiting = showLoading;
	var removeWaiting = hideLoading;

	exports.Loading = Loading;
	exports.showLoading = showLoading;
	exports.hideLoading = hideLoading;
	exports.showWaiting = showWaiting;
	exports.removeWaiting = removeWaiting;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Menu = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _ripple = __webpack_require__(13);

	var _env = __webpack_require__(6);

	var _compMgr = __webpack_require__(9);

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
					var El = this.element;
					console.log(this.for_element.getAttribute('data-event'));
					if (this.for_element.getAttribute('data-event') == 'hover') {
						(0, _event.on)(forEl, 'mouseover', this._handleForHover.bind(this));
						(0, _event.on)(El, 'mouseover', this._handleForElHover.bind(this));
						(0, _event.on)(forEl.parentElement, 'mouseout', this._handleForMouseout.bind(this));
						(0, _event.on)(El, 'mouseout', this._handleForElMouseout.bind(this));
					} else {
						(0, _event.on)(forEl, 'click', this._handleForClick.bind(this));
					}

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
		_handleForElHover: function _handleForElHover(evt) {
			this.hoverFlag = false;
		},
		_handleForElMouseout: function _handleForElMouseout(evt) {
			var self = this;
			this.hoverFlag = true;
			window.setTimeout(function () {
				if (self.hoverFlag) {
					self.toggle(evt, 'out');
				}
			}, 100);
		},
		_handleForMouseout: function _handleForMouseout(evt) {
			var self = this;
			this.hoverFlag = true;
			window.setTimeout(function () {
				if (self.hoverFlag) {
					self.toggle(evt, 'out');
				}
			}, 100);
		},
		_handleForHover: function _handleForHover(evt) {

			if (this.element && this.for_element) {
				this.hoverFlag = false;
				var rect = this.for_element.getBoundingClientRect();
				var forRect = this.for_element.parentElement.getBoundingClientRect();

				if ((0, _dom.hasClass)(this.element, 'u-menu-unaligned')) {
					// Do not position the menu automatically. Requires the developer to
					// manually specify position.
				} else if ((0, _dom.hasClass)(this.element, 'u-menu-bottom-right')) {
					// Position below the "for" element, aligned to its right.
					this._container.style.left = this.for_element.offsetLeft + this.for_element.offsetWidth - this.element.offsetWidth + 'px';
					// this._container.style.right = (forRect.right - rect.right) + 'px';
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

			this.toggle(evt, 'over');
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
					this._container.style.left = this.for_element.offsetLeft + this.for_element.offsetWidth - this.element.offsetWidth + 'px';
					// this._container.style.right = (forRect.right - rect.right) + 'px';
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
		toggle: function toggle(evt, tab) {

			if (typeof tab == 'undefined') {
				if ((0, _dom.hasClass)(this._container, 'is-visible')) {} else {
					this.show(evt);
				}
			} else {
				if (tab == 'over') {
					this.show(evt);
				} else {
					this.hide();
				}
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

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.showMessage = exports.showMessageDialog = undefined;

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	/**
	 * Module : neoui-message
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-02 19:40:59
	 */

	var messageTemplate = '<div class="u-message"><span class="u-msg-close uf uf-removesymbol"></span>{msg}</div>';

	var showMessage = function showMessage(options) {
		var msg, position, width, height, showSeconds, msgType, template;
		if (typeof options === 'string') {
			options = {
				msg: options
			};
		}
		msg = options['msg'] || "";
		position = options['position'] || "bottom-right"; //center. top-left, top-center, top-right, bottom-left, bottom-center, bottom-right,
		//TODO 后面改规则：没设宽高时，自适应
		width = options['width'] || "";
		// height = options['height'] || "100px";
		msgType = options['msgType'] || 'info';
		//默认为当用户输入的时间，当用户输入的时间为false并且msgType=='info'时，默认显示时间为2s
		showSeconds = parseInt(options['showSeconds']) || (msgType == 'info' ? 2 : 0);

		template = options['template'] || messageTemplate;

		template = template.replace('{msg}', msg);
		var msgDom = (0, _dom.makeDOM)(template);
		(0, _dom.addClass)(msgDom, 'u-mes' + msgType);
		msgDom.style.width = width;
		// msgDom.style.height = height;
		// msgDom.style.lineHeight = height;
		if (position == 'bottom-right') {
			msgDom.style.bottom = '10px';
		}

		if (position == 'center') {
			msgDom.style.bottom = '50%';
			msgDom.style.transform = 'translateY(50%)';
		}
		var closeBtn = msgDom.querySelector('.u-msg-close');
		//new Button({el:closeBtn});
		var closeFun = function closeFun() {
			(0, _dom.removeClass)(msgDom, "active");
			setTimeout(function () {
				try {
					document.body.removeChild(msgDom);
				} catch (e) {}
			}, 500);
		};
		(0, _event.on)(closeBtn, 'click', closeFun);
		document.body.appendChild(msgDom);

		if (showSeconds > 0) {
			setTimeout(function () {
				closeFun();
			}, showSeconds * 1000);
		}

		setTimeout(function () {
			(0, _dom.addClass)(msgDom, "active");
		}, showSeconds * 1);
	};

	var showMessageDialog = showMessage;

	exports.showMessageDialog = showMessageDialog;
	exports.showMessage = showMessage;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Month = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _event = __webpack_require__(5);

	var _dom = __webpack_require__(10);

	var _extend = __webpack_require__(7);

	var _compMgr = __webpack_require__(9);

	var _ripple = __webpack_require__(13);

	/**
	 * Module : neoui-month
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-11 15:17:07
	 */
	var Month = _BaseComponent.BaseComponent.extend({
		DEFAULTS: {},
		init: function init() {
			var self = this;
			var element = this.element;
			this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
			this.panelDiv = null;
			this.input = this.element.querySelector("input");

			var d = new Date();
			this.month = d.getMonth() + 1;
			this.defaultMonth = this.month;

			(0, _event.on)(this.input, 'blur', function (e) {
				self._inputFocus = false;
				this.setValue(this.input.value);
			}.bind(this));

			// 添加focus事件
			this.focusEvent();
			// 添加右侧图标click事件
			this.clickEvent();
			// 添加keydown事件
			this.keydownEvent();
		},

		createPanel: function createPanel() {
			if (this.panelDiv) {
				this._fillMonth();
				return;
			}
			var oThis = this;
			this.panelDiv = (0, _dom.makeDOM)('<div class="u-date-panel" style="margin:0px;"></div>');
			this.panelContentDiv = (0, _dom.makeDOM)('<div class="u-date-content"></div>');
			this.panelDiv.appendChild(this.panelContentDiv);

			this.preBtn = (0, _dom.makeDOM)('<button class="u-date-pre-button u-button flat floating mini" style="display:none;">&lt;</button>');
			this.nextBtn = (0, _dom.makeDOM)('<button class="u-date-next-button u-button flat floating mini" style="display:none;">&gt;</button>');

			(0, _event.on)(this.preBtn, 'click', function (e) {
				oThis.startYear -= 10;
				oThis._fillYear();
			});
			(0, _event.on)(this.nextBtn, 'click', function (e) {
				oThis.startYear += 10;
				oThis._fillYear();
			});
			this.panelContentDiv.appendChild(this.preBtn);
			this.panelContentDiv.appendChild(this.nextBtn);
			this._fillMonth();
		},

		/**
	  * 填充月份选择面板
	  * @private
	  */
		_fillMonth: function _fillMonth() {
			var oldPanel, template, monthPage, _month, cells, i;
			oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
			if (oldPanel) this.panelContentDiv.removeChild(oldPanel);
			_month = this.month;
			template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">' + _month + '月</div>', '<div class="u-date-content-panel">', '<div class="u-date-content-year-cell">1月</div>', '<div class="u-date-content-year-cell">2月</div>', '<div class="u-date-content-year-cell">3月</div>', '<div class="u-date-content-year-cell">4月</div>', '<div class="u-date-content-year-cell">5月</div>', '<div class="u-date-content-year-cell">6月</div>', '<div class="u-date-content-year-cell">7月</div>', '<div class="u-date-content-year-cell">8月</div>', '<div class="u-date-content-year-cell">9月</div>', '<div class="u-date-content-year-cell">10月</div>', '<div class="u-date-content-year-cell">11月</div>', '<div class="u-date-content-year-cell">12月</div>', '</div>', '</div>'].join("");

			monthPage = (0, _dom.makeDOM)(template);
			cells = monthPage.querySelectorAll('.u-date-content-year-cell');
			for (i = 0; i < cells.length; i++) {
				if (_month == i + 1) {
					(0, _dom.addClass)(cells[i], 'current');
				}
				cells[i]._value = i + 1;
				new _ripple.URipple(cells[i]);
			}
			(0, _event.on)(monthPage, 'click', function (e) {
				var _m = e.target._value;
				this.month = _m;
				monthPage.querySelector('.u-date-content-title').innerHTML = _m + '月';
				this.setValue(_m);
				this.hide();
			}.bind(this));

			this.preBtn.style.display = 'none';
			this.nextBtn.style.display = 'none';
			this.panelContentDiv.appendChild(monthPage);
			this.currentPanel = 'month';
		},

		setValue: function setValue(value) {
			value = value ? value : '';
			this.value = value;
			if (parseInt(this.value) > 0 && parseInt(this.value) < 13) {
				this.month = value;
				this.input.value = this.month;
				this.trigger('valueChange', { value: value });
			} else {
				this.month = this.defaultMonth;
				this.input.value = '';
			}
		},

		focusEvent: function focusEvent() {
			var self = this;
			(0, _event.on)(this.input, 'focus', function (e) {
				self._inputFocus = true;
				self.show(e);

				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}
			});
		},
		keydownEvent: function keydownEvent() {
			var self = this;
			(0, _event.on)(self.input, "keydown", function (e) {
				var code = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
				if (!(code >= 48 && code <= 57 || code == 37 || code == 39 || code == 8 || code == 46)) {
					//阻止默认浏览器动作(W3C)
					if (e && e.preventDefault) e.preventDefault();
					//IE中阻止函数器默认动作的方式
					else window.event.returnValue = false;
					return false;
				}
			});
		},

		//下拉图标的点击事件
		clickEvent: function clickEvent() {
			var self = this;
			var caret = this.element.nextSibling;
			(0, _event.on)(caret, 'click', function (e) {
				self.input.focus();
				(0, _event.stopEvent)(e);
			});
		},

		show: function show(evt) {
			var oThis = this;
			this.createPanel();

			this.width = this.element.offsetWidth;
			if (this.width < 300) this.width = 300;
			if (this.options.showFix) {
				document.body.appendChild(this.panelDiv);
				this.panelDiv.style.position = 'fixed';
				(0, _dom.showPanelByEle)({
					ele: this.input,
					panel: this.panelDiv,
					position: "bottomLeft"
				});
			} else {
				var bodyWidth = document.body.clientWidth,
				    bodyHeight = document.body.clientHeight,
				    panelWidth = this.panelDiv.offsetWidth,
				    panelHeight = this.panelDiv.offsetHeight;

				this.element.appendChild(this.panelDiv);
				this.element.style.position = 'relative';
				this.left = this.input.offsetLeft;
				var inputHeight = this.input.offsetHeight;
				this.top = this.input.offsetTop + inputHeight;

				if (this.left + panelWidth > bodyWidth) {
					this.left = bodyWidth - panelWidth;
				}

				if (this.top + panelHeight > bodyHeight) {
					this.top = bodyHeight - panelHeight;
				}

				this.panelDiv.style.left = this.left + 'px';
				this.panelDiv.style.top = this.top + 'px';
			}

			this.panelDiv.style.width = 152 + 'px';
			this.panelDiv.style.zIndex = (0, _dom.getZIndex)();
			(0, _dom.addClass)(this.panelDiv, 'is-visible');

			var callback = function (e) {
				if (e !== evt && e.target !== this.input && !oThis.clickPanel(e.target) && oThis._inputFocus != true) {
					(0, _event.off)(document, 'click', callback);
					// document.removeEventListener('click', callback);
					this.hide();
				}
			}.bind(this);
			(0, _event.on)(document, 'click', callback);
		},

		clickPanel: function clickPanel(dom) {
			while (dom) {
				if (dom == this.panelDiv) {
					return true;
				} else {
					dom = dom.parentNode;
				}
			}
			return false;
		},

		hide: function hide() {
			(0, _dom.removeClass)(this.panelDiv, 'is-visible');
			this.panelDiv.style.zIndex = -1;
		}
	});

	_compMgr.compMgr.regComp({
		comp: Month,
		compAsString: 'u.Month',
		css: 'u-month'
	});
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}
	exports.Month = Month;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.MonthDate = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _env = __webpack_require__(6);

	var _event = __webpack_require__(5);

	var _dom = __webpack_require__(10);

	var _core = __webpack_require__(16);

	var _dateUtils = __webpack_require__(18);

	var _extend = __webpack_require__(7);

	var _compMgr = __webpack_require__(9);

	var _ripple = __webpack_require__(13);

	/**
	 * Module : neoui-year
	 * Author : wanghao(wanghaoo@yonyou.com)
	 * Date   : 2016-11-09
	 */

	var MonthDate = _BaseComponent.BaseComponent.extend({
	    DEFAULTS: {},
	    init: function init() {
	        var self = this;
	        var element = this.element;
	        this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
	        this.panelDiv = null;
	        this.input = this.element.querySelector("input");

	        var d = new Date();
	        this.year = d.getFullYear();
	        this.month = d.getMonth() + 1;
	        this.date = d.getDate();

	        (0, _event.on)(this.input, 'blur', function (e) {
	            self._inputFocus = false;
	            self.setValue(self.input.value);
	        });

	        // 添加focus事件
	        this.focusEvent();
	        // 添加右侧图标click事件
	        this.clickEvent();
	    },

	    createPanel: function createPanel() {
	        if (this.panelDiv) {
	            this._fillMonth();
	            return;
	        }
	        var oThis = this;
	        this.panelDiv = (0, _dom.makeDOM)('<div class="u-date-panel" style="margin:0px;"></div>');
	        this.panelContentDiv = (0, _dom.makeDOM)('<div class="u-date-content"></div>');
	        this.panelDiv.appendChild(this.panelContentDiv);
	        this._fillMonth();
	    },

	    // 判断是否为闰年,如果闰年返回29天，否则为28天
	    _isLeapYear: function _isLeapYear() {
	        if (this.year % 4 == 0 && this.year % 100 != 0 || this.year % 400 == 0) {
	            return 29;
	        } else {
	            return 28;
	        }
	    },

	    _getMonthDay: function _getMonthDay() {
	        var monthTypeOneArray = [1, 3, 5, 7, 8, 10, 12];
	        if (this.month == 2) {
	            return this._isLeapYear();
	        }
	        if (monthTypeOneArray.indexOf(this.month)) {
	            return 31;
	        } else {
	            return 30;
	        }
	    },
	    /**
	     * 填充月份选择面板
	     * @private
	     */
	    _fillMonth: function _fillMonth() {
	        var oldPanel, template, monthPage, _month, cells, i;
	        _month = this.month;
	        template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">' + _month + '月</div>', '<div class="u-date-content-panel">', '<div class="u-date-content-year-cell">1月</div>', '<div class="u-date-content-year-cell">2月</div>', '<div class="u-date-content-year-cell">3月</div>', '<div class="u-date-content-year-cell">4月</div>', '<div class="u-date-content-year-cell">5月</div>', '<div class="u-date-content-year-cell">6月</div>', '<div class="u-date-content-year-cell">7月</div>', '<div class="u-date-content-year-cell">8月</div>', '<div class="u-date-content-year-cell">9月</div>', '<div class="u-date-content-year-cell">10月</div>', '<div class="u-date-content-year-cell">11月</div>', '<div class="u-date-content-year-cell">12月</div>', '</div>', '</div>'].join("");

	        monthPage = (0, _dom.makeDOM)(template);
	        cells = monthPage.querySelectorAll('.u-date-content-year-cell');
	        for (i = 0; i < cells.length; i++) {
	            if (_month == i + 1) {
	                (0, _dom.addClass)(cells[i], 'current');
	            }
	            cells[i]._value = i + 1;
	            new _ripple.URipple(cells[i]);
	        }
	        var oThis = this;
	        (0, _event.on)(monthPage, 'click', function (e) {
	            var _m = e.target._value;
	            if (_m) {
	                oThis.month = _m;
	                monthPage.querySelector('.u-date-content-title').innerHTML = _m + '月';
	            }

	            oThis._fillDate();
	            (0, _event.stopEvent)(e);
	        });

	        this._zoomIn(monthPage);
	        this.currentPanel = 'month';
	    },

	    /**
	     * 渲染日历
	     * @param type : previous  current  next
	     * @private
	     */
	    _fillDate: function _fillDate(type) {

	        var year,
	            month,
	            oldPanel,
	            day,
	            date,
	            time,
	            template,
	            datePage,
	            titleDiv,
	            dateDiv,
	            weekSpans,
	            language,
	            tempDate,
	            i,
	            cell,
	            self = this;
	        type = type || 'current';
	        var oThis = this;

	        oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
	        if (oldPanel) this.panelContentDiv.removeChild(oldPanel);
	        language = _core.core.getLanguages();
	        template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">', this.date + '日', '</div>', '<div class="u-date-week"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>', '<div class="u-date-content-panel"></div>', '</div>'].join("");
	        datePage = (0, _dom.makeDOM)(template);
	        weekSpans = datePage.querySelectorAll('.u-date-week span');

	        for (var i = 0; i < 7; i++) {
	            weekSpans[i].innerHTML = _dateUtils.date._dateLocale[language].weekdaysMin[i];
	        }
	        dateDiv = datePage.querySelector('.u-date-content-panel');
	        // tempDate = this.startDate;
	        tempDate = new Date(this.year + '-' + this.month + '-01');
	        var countdate = 1;
	        var monthdate = this._getMonthDay();
	        var otherdate = tempDate.getDay(); //当前月1号前面需要空白的个数
	        // var sumdate = monthdate + otherdate;
	        for (var j = 0; j < otherdate; j++) {
	            cell = (0, _dom.makeDOM)('<div class="u-date-cell" unselectable="on" onselectstart="return false;"></div>');
	            new _ripple.URipple(cell);
	            dateDiv.appendChild(cell);
	        }
	        // 这块儿时间需要根据月份具体
	        while (countdate <= monthdate) {
	            cell = (0, _dom.makeDOM)('<div class="u-date-cell" unselectable="on" onselectstart="return false;">' + countdate + '</div>');
	            if (countdate == this.date) {
	                (0, _dom.addClass)(cell, 'current');
	            }
	            cell._value = countdate;
	            cell._month = this.month;
	            cell._year = this.year;
	            new _ripple.URipple(cell);
	            dateDiv.appendChild(cell);
	            countdate++;
	        }
	        (0, _event.on)(dateDiv, 'click', function (e) {
	            if ((0, _dom.hasClass)(e.target, 'u-disabled')) return;
	            var _d = e.target._value;
	            if (!_d) return;
	            var _cell = e.target.parentNode.querySelector('.u-date-cell.current');
	            if (_cell) {
	                (0, _dom.removeClass)(_cell, 'current');
	                if (_env.env.isIE8 || _env.env.isIE9) _cell.style.backgroundColor = "#fff";
	            }
	            (0, _dom.addClass)(e.target, 'current');
	            if (_env.env.isIE8 || _env.env.isIE9) e.target.style.backgroundColor = '#3f51b5';

	            var currentdateDiv = oThis.panelContentDiv.querySelector('.u-date-content-title');
	            currentdateDiv.innerHTML = _d + '日';
	            oThis.setValue(e.target._month + '-' + _d);
	            oThis.hide();
	        }.bind(this));
	        this._zoomIn(datePage);
	        this.currentPanel = 'date';
	    },
	    /**
	     * 淡入动画效果
	     * @private
	     */
	    _zoomIn: function _zoomIn(newPage) {
	        if (!this.contentPage) {
	            this.panelContentDiv.appendChild(newPage);
	            this.contentPage = newPage;
	            return;
	        }
	        (0, _dom.addClass)(newPage, 'zoom-in');
	        this.panelContentDiv.appendChild(newPage);
	        if (_env.isIE8) {
	            this.contentPage = newPage;
	        } else {
	            var cleanup = function () {
	                newPage.removeEventListener('transitionend', cleanup);
	                newPage.removeEventListener('webkitTransitionEnd', cleanup);
	                // this.panelContentDiv.removeChild(this.contentPage);
	                this.contentPage = newPage;
	            }.bind(this);
	            if (this.contentPage) {
	                newPage.addEventListener('transitionend', cleanup);
	                newPage.addEventListener('webkitTransitionEnd', cleanup);
	            }
	            window.requestAnimationFrame(function () {
	                (0, _dom.addClass)(this.contentPage, 'is-hidden');
	                (0, _dom.removeClass)(newPage, 'zoom-in');
	            }.bind(this));
	        }
	    },

	    setValue: function setValue(value) {
	        value = value ? value : '';
	        if (value && value.indexOf('-') > -1) {
	            var vA = value.split("-");
	            var month = vA[0];
	            this.month = month % 12;
	            if (this.month == 0) this.month = 12;
	            this.date = vA[1];
	            value = this.month + '-' + this.date;
	        }
	        this.value = value;
	        this.input.value = value;
	        this.trigger('valueChange', { value: value });
	    },

	    focusEvent: function focusEvent() {
	        var self = this;
	        (0, _event.on)(this.input, 'focus', function (e) {
	            self._inputFocus = true;
	            self.show(e);
	            (0, _event.stopEvent)(e);
	        });
	    },

	    //下拉图标的点击事件
	    clickEvent: function clickEvent() {
	        var self = this;
	        var caret = this.element.nextSibling;
	        (0, _event.on)(caret, 'click', function (e) {
	            self.input.focus();
	            (0, _event.stopEvent)(e);
	        });
	    },

	    show: function show(evt) {
	        var oThis = this;
	        if (this.value && this.value.indexOf('-') > -1) {
	            var vA = this.value.split("-");
	            var month = vA[0];
	            this.month = month % 12;
	            if (this.month == 0) this.month = 12;
	            this.date = vA[1];
	            if (this.date > 31) {
	                this.date = 1;
	            }
	        }
	        this.createPanel();
	        if (this.options.showFix) {
	            document.body.appendChild(this.panelDiv);
	            this.panelDiv.style.position = 'fixed';
	            (0, _dom.showPanelByEle)({
	                ele: this.input,
	                panel: this.panelDiv,
	                position: "bottomLeft"
	            });
	        } else {

	            var bodyWidth = document.body.clientWidth,
	                bodyHeight = document.body.clientHeight,
	                panelWidth = this.panelDiv.offsetWidth,
	                panelHeight = this.panelDiv.offsetHeight;

	            this.element.appendChild(this.panelDiv);
	            this.element.style.position = 'relative';
	            this.left = this.input.offsetLeft;
	            var inputHeight = this.input.offsetHeight;
	            this.top = this.input.offsetTop + inputHeight;

	            if (this.left + panelWidth > bodyWidth) {
	                this.left = bodyWidth - panelWidth;
	            }

	            if (this.top + panelHeight > bodyHeight) {
	                this.top = bodyHeight - panelHeight;
	            }

	            this.panelDiv.style.left = this.left + 'px';
	            this.panelDiv.style.top = this.top + 'px';
	        }

	        this.panelDiv.style.zIndex = (0, _dom.getZIndex)();
	        (0, _dom.addClass)(this.panelDiv, 'is-visible');
	        var oThis = this;
	        var callback = function callback(e) {
	            if (e !== evt && e.target !== oThis.input && !oThis.clickPanel(e.target) && oThis._inputFocus != true) {
	                // document.removeEventListener('click', callback);
	                (0, _event.off)(document, 'click', callback);
	                oThis.hide();
	            }
	        };
	        (0, _event.on)(document, 'click', callback);
	        // document.addEventListener('click', callback);
	    },

	    clickPanel: function clickPanel(dom) {
	        while (dom) {
	            if (dom == this.panelDiv) {
	                return true;
	            } else {
	                dom = dom.parentNode;
	            }
	        }
	        return false;
	    },

	    hide: function hide() {
	        (0, _dom.removeClass)(this.panelDiv, 'is-visible');
	        this.panelDiv.style.zIndex = -1;
	    }
	});

	_compMgr.compMgr.regComp({
	    comp: MonthDate,
	    compAsString: 'u.MonthDate',
	    css: 'u-monthdate'
	});
	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}
	exports.MonthDate = MonthDate;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Multilang = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : neoui-multilang
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-08-02 20:19:37
	                                                                                                                                                                                                                                                                               */

	var _BaseComponent = __webpack_require__(2);

	var _extend = __webpack_require__(7);

	var _util = __webpack_require__(4);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _compMgr = __webpack_require__(9);

	var Multilang = _BaseComponent.BaseComponent.extend({
		DEFAULTS: {
			dataSource: {},
			onSelect: function onSelect() {}
		},
		init: function init() {
			var self = this;
			var element = this.element;
			this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
			this.multinfo(this.options.multinfo);
			this.addData(this.options.multidata);
		}
	});
	Multilang.fn = Multilang.prototype;
	Multilang.fn.addData = function (val) {
		var target = this.element,
		    tmparray,
		    target_div = target.parentNode;
		if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == "object") {
			tmparray = val;
		} else {
			tmparray = val.split(",");
		}
		target_div.value = tmparray;
		(0, _util.each)(tmparray, function (i, node) {
			target_div.querySelectorAll(".m_context")[i].innerHTML = node;
		});
	};
	Multilang.fn.multinfo = function (sort) {

		var target = this.element,
		    me = this,
		    tmplabel = "",
		    close_menu = true,
		    tmpfield = "name";
		if (sort.lang_name) {
			tmpfield = sort.lang_name;
		}
		if ((0, _util.isArray)(sort)) {

			(0, _dom.wrap)(target, "<div class='multilang_body'><input class='lang_value' contenteditable='true'><span class='uf uf-caretdown lang_icon'><span class='m_icon'></span></span>");
			(0, _dom.css)(target, "display", "none");

			(0, _util.each)(sort, function (i, node) {
				if (i) {
					tmplabel += "<label attr='" + tmpfield + (i + 1) + "'><span class='m_context'></span><span class='m_icon'>" + node + "</span></label>";
				} else {
					tmplabel += "<label attr='" + tmpfield + "'><span class='m_context'></span><span class='m_icon'>" + node + "</span></label>";
				}
			});
			var target_div = target.parentNode;

			target_div.insertAdjacentHTML("beforeEnd", "<div class='multilang_menu '>" + tmplabel + "</div>");
			var tmpIconv = target_div.querySelector(".lang_icon"),
			    target_menu = target_div.querySelector(".multilang_menu"),
			    tmpvaluebox = target_div.querySelector(".lang_value");
			(0, _event.on)(tmpIconv, "click", function () {
				var target_icon = this;
				target_div.querySelector(".lang_value").focus();
				if ((0, _dom.css)(target_menu, "display") == "block") {
					(0, _dom.css)(target_menu, "display", "none");
				} else {
					(0, _dom.css)(target_menu, "display", "block");
				}
			});
			(0, _event.on)(target_menu, "mouseenter", function () {
				close_menu = false;
			});
			(0, _event.on)(target_menu, "mouseleave", function () {
				close_menu = true;
			});

			(0, _event.on)(tmpvaluebox, "blur", function () {
				//this//
				//target_box = me.fixtarget(target_input),
				//target_div = target_input.parents(".multilang_body"),
				target = this;
				tmpkey = target.className.split(" ")[2], tmptext = target.value;

				if ((0, _dom.hasClass)(target, "ready_change")) {
					me.changeData(target_div, tmpkey, tmptext);
				}
				if (close_menu) {
					(0, _dom.css)(target_menu, "display", "none");
				}
			});
			(0, _event.on)(target_menu, "click", "label", function () {
				var target_label = this,
				    tmpfield = target_label.getAttribute("attr"),
				    tmptext = target_label.querySelector(".m_context").innerHTML,
				    tmpicon = target_label.querySelector(".m_icon").cloneNode(true);

				tmpvaluebox.setAttribute("class", "ready_change lang_value " + tmpfield);
				tmpvaluebox.value = tmptext;
				tmpvaluebox.focus();
				var tmpicom = target_div.querySelector(".lang_icon"),
				    oldicon = target_div.querySelector(".m_icon");
				(0, _dom.removeClass)(tmpicom, "uf-caretdown");
				tmpicom.replaceChild(tmpicon, oldicon);
			});
		} else {
			console.error('Not object');
		}
	};
	Multilang.fn.changeData = function (target_div, field, text) {
		var tmpdata = target_div.value;
		tmplabel = target_div.querySelector("label[attr='" + field + "']");
		tmpcontext = tmplabel.querySelector(".m_context");
		tmpcontext.innerHTML = text;
		tmpcontext.value = text;
		(0, _util.each)(target_div.querySelectorAll(".m_context"), function (i, node) {
			tmpdata[i] = node.innerHTML;
		});

		(0, _event.trigger)(this.element, 'change.u.multilang', {
			newValue: text,
			field: field
		});
	};
	Multilang.fn.getData = function () {
		var target = $(multilang.target).next(".multilang_body")[0],
		    multilang_data = target.value;
		return multilang_data;
	};
	_compMgr.compMgr.regComp({
		comp: Multilang,
		compAsString: 'u.Multilang',
		css: 'u-multilang'
	});

	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.Multilang = Multilang;

/***/ },
/* 37 */
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

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.pagination = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * Module : neoui-pagination
	                                                                                                                                                                                                                                                                               * Author : Kvkens(yueming@yonyou.com)
	                                                                                                                                                                                                                                                                               * Date	  : 2016-08-03 08:45:49
	                                                                                                                                                                                                                                                                               */

	var _BaseComponent = __webpack_require__(2);

	var _extend = __webpack_require__(7);

	var _dom = __webpack_require__(10);

	var _util = __webpack_require__(4);

	var _event = __webpack_require__(5);

	var _compMgr = __webpack_require__(9);

	var pagination = _BaseComponent.BaseComponent.extend({});

	var PageProxy = function PageProxy(options, page) {
		this.isCurrent = function () {
			return page == options.currentPage;
		};
		this.isFirst = function () {
			return page == 1;
		};
		this.isLast = function () {
			return page == options.totalPages;
		};
		this.isPrev = function () {
			return page == options.currentPage - 1;
		};
		this.isNext = function () {
			return page == options.currentPage + 1;
		};
		this.isLeftOuter = function () {
			return page <= options.outerWindow;
		};
		this.isRightOuter = function () {
			return options.totalPages - page < options.outerWindow;
		};
		this.isInsideWindow = function () {
			if (options.currentPage < options.innerWindow + 1) {
				return page <= options.innerWindow * 2 + 1;
			} else if (options.currentPage > options.totalPages - options.innerWindow) {
				return options.totalPages - page <= options.innerWindow * 2;
			} else {
				return Math.abs(options.currentPage - page) <= options.innerWindow;
			}
		};
		this.number = function () {
			return page;
		};
		this.pageSize = function () {
			return options.pageSize;
		};
	};

	var View = {
		firstPage: function firstPage(pagin, options, currentPageProxy) {
			return '<li role="first"' + (currentPageProxy.isFirst() ? 'class="disabled"' : '') + '><a >' + options.first + '</a></li>';
		},
		prevPage: function prevPage(pagin, options, currentPageProxy) {
			return '<li role="prev"' + (currentPageProxy.isFirst() ? 'class="disabled"' : '') + '><a  rel="prev">' + options.prev + '</a></li>';
		},
		nextPage: function nextPage(pagin, options, currentPageProxy) {
			return '<li role="next"' + (currentPageProxy.isLast() ? 'class="disabled"' : '') + '><a  rel="next">' + options.next + '</a></li>';
		},
		lastPage: function lastPage(pagin, options, currentPageProxy) {

			return '<li role="last"' + (currentPageProxy.isLast() ? 'class="disabled"' : '') + '><a >' + options.last + '</a></li>';
		},
		gap: function gap(pagin, options) {
			return '<li role="gap" class="disabled"><a >' + options.gap + '</a></li>';
		},
		page: function page(pagin, options, pageProxy) {
			return '<li role="page"' + (pageProxy.isCurrent() ? 'class="active"' : '') + '><a ' + (pageProxy.isNext() ? ' rel="next"' : '') + (pageProxy.isPrev() ? 'rel="prev"' : '') + '>' + pageProxy.number() + '</a></li>';
		}
	};

	//pagination.prototype.compType = 'pagination';
	pagination.prototype.init = function (element, options) {
		var self = this;
		var element = this.element;
		this.$element = element;
		this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
		this.$ul = this.$element; //.find("ul");
		this.render();
	};

	pagination.prototype.DEFAULTS = {
		currentPage: 1,
		totalPages: 1,
		pageSize: 10,
		pageList: [5, 10, 20, 50, 100],
		innerWindow: 2,
		outerWindow: 0,
		first: '&laquo;',
		prev: '<i class="uf uf-anglepointingtoleft"></i>',
		next: '<i class="uf uf-anglearrowpointingtoright"></i>',
		last: '&raquo;',
		gap: '···',
		//totalText: '合计:',
		totalText: '共',
		truncate: false,
		showState: true,
		showTotal: true, //初始默认显示总条数 “共xxx条”
		showColumn: true, //初始默认显示每页条数 “显示xx条”
		showJump: true, //初始默认显示跳转信息 “到xx页 确定”
		page: function page(_page) {
			return true;
		}
	};

	pagination.prototype.update = function (options) {
		this.$ul.innerHTML = "";
		this.options = (0, _extend.extend)({}, this.options, options);
		this.render();
	};
	pagination.prototype.render = function () {
		var a = new Date().valueOf();

		var options = this.options;

		if (!options.totalPages) {
			this.$element.style.display = "none";
			return;
		} else {
			this.$element.style.display = "block";
		}

		var htmlArr = [];
		var currentPageProxy = new PageProxy(options, options.currentPage);

		//update pagination by pengyic@yonyou.com
		//预设显示页码数
		var windows = 2;
		var total = options.totalPages - 0;
		var current = options.currentPage - 0;
		//预设显示页码数截断修正
		var fix = 0;
		var pageProxy;
		if (current - 2 <= windows + 1) {
			for (var i = 1; i <= current; i++) {
				pageProxy = new PageProxy(options, i);
				htmlArr.push(View.page(this, options, pageProxy));
			}

			fix = windows - (current - 1) < 0 ? 0 : windows - (current - 1);

			if (total - current - fix <= windows + 1) {
				for (var i = current + 1; i <= total; i++) {
					pageProxy = new PageProxy(options, i);
					htmlArr.push(View.page(this, options, pageProxy));
				}
			} else {
				for (var i = current + 1; i <= current + windows + fix; i++) {
					pageProxy = new PageProxy(options, i);
					htmlArr.push(View.page(this, options, pageProxy));
				}
				//添加分割'...'
				htmlArr.push(View.gap(this, options));

				pageProxy = new PageProxy(options, total);
				htmlArr.push(View.page(this, options, pageProxy));
			}
		} else {
			if (total - current <= windows + 1) {
				fix = windows - (total - current) < 0 ? 0 : windows - (total - current);

				for (var i = current - windows - fix; i <= total; i++) {
					pageProxy = new PageProxy(options, i);
					htmlArr.push(View.page(this, options, pageProxy));
				}
				if (i >= 2) {
					//添加分割'...'
					htmlArr.unshift(View.gap(this, options));
					pageProxy = new PageProxy(options, 1);
					htmlArr.unshift(View.page(this, options, pageProxy));
				}
			} else {
				for (var i = current - windows; i <= current + windows; i++) {
					pageProxy = new PageProxy(options, i);
					htmlArr.push(View.page(this, options, pageProxy));
				}
				//添加分割'...'
				htmlArr.push(View.gap(this, options));

				pageProxy = new PageProxy(options, total);
				htmlArr.push(View.page(this, options, pageProxy));

				//添加分割'...'
				htmlArr.unshift(View.gap(this, options));
				pageProxy = new PageProxy(options, 1);
				htmlArr.unshift(View.page(this, options, pageProxy));
			}
		}
		htmlArr.unshift(View.prevPage(this, options, currentPageProxy));
		htmlArr.push(View.nextPage(this, options, currentPageProxy));

		if (options.totalCount === undefined || options.totalCount <= 0) {
			options.totalCount = 0;
		}
		if (options.showState) {
			// 处理pageOption字符串
			var pageOption = '';
			options.pageList.forEach(function (item) {
				if (options.pageSize - 0 == item) {
					pageOption += '<option selected>' + item + '</option>';
				} else {
					pageOption += '<option>' + item + '</option>';
				}
			});
			var htmlTmp = '';
			//分别得到分页条后“共xxx条”、“显示xx条”、“到xx页 确定”三个html片段
			if (options.showTotal) {
				htmlTmp += '<div class="pagination-state">' + options.totalText + '&nbsp;' + options.totalCount + '&nbsp;条</div>';
			}
			if (options.showColumn) {
				htmlTmp += '<div class="pagination-state">显示<select  class="page_z">' + pageOption + '</select>条</div>';
			}
			if (options.showJump) {
				htmlTmp += '<div class="pagination-state">到<input class="page_j" value=' + options.currentPage + '>页<input class="pagination-jump" type="button" value="确定"/></div>';
			}

			htmlArr.push(htmlTmp);
		}

		//在将htmlArr插入到页面之前，对htmlArr进行处理
		this.$ul.innerHTML = "";
		this.$ul.insertAdjacentHTML('beforeEnd', htmlArr.join(''));

		var me = this;
		(0, _event.on)(this.$ul.querySelector(".pagination-jump"), "click", function () {
			var jp, pz;
			jp = me.$ul.querySelector(".page_j").value || options.currentPage;
			pz = me.$ul.querySelector(".page_z").value || options.pageSize;
			if (isNaN(jp)) return;
			//if (pz != options.pageSize){
			//	me.$element.trigger('sizeChange', [pz, jp - 1])
			//}else{
			//	me.$element.trigger('pageChange', jp - 1)
			//}
			me.page(jp, options.totalPages, pz);
			//me.$element.trigger('pageChange', jp - 1)
			//me.$element.trigger('sizeChange', pz)
			return false;
		});

		(0, _event.on)(this.$ul.querySelector('[role="first"] a'), 'click', function () {
			if (options.currentPage <= 1) return;
			me.firstPage();
			//me.$element.trigger('pageChange', 0)
			return false;
		});
		(0, _event.on)(this.$ul.querySelector('[role="prev"] a'), 'click', function () {
			if (options.currentPage <= 1) return;
			me.prevPage();
			//me.$element.trigger('pageChange', options.currentPage - 1)
			return false;
		});
		(0, _event.on)(this.$ul.querySelector('[role="next"] a'), 'click', function () {
			if (parseInt(options.currentPage) + 1 > options.totalPages) return;
			me.nextPage();
			//me.$element.trigger('pageChange', parseInt(options.currentPage) + 1)
			return false;
		});
		(0, _event.on)(this.$ul.querySelector('[role="last"] a'), 'click', function () {
			if (options.currentPage == options.totalPages) return;
			me.lastPage();
			//me.$element.trigger('pageChange', options.totalPages - 1)
			return false;
		});
		(0, _util.each)(this.$ul.querySelectorAll('[role="page"] a'), function (i, node) {
			(0, _event.on)(node, 'click', function () {
				var pz = me.$element.querySelector(".page_z") && me.$element.querySelector(".page_z").value || options.pageSize;
				me.page(parseInt(this.innerHTML), options.totalPages, pz);
				//me.$element.trigger('pageChange', parseInt($(this).html()) - 1)

				return false;
			});
		});
		(0, _event.on)(this.$ul.querySelector('.page_z'), 'change', function () {
			var pz = me.$element.querySelector(".page_z") && me.$element.querySelector(".page_z").value || options.pageSize;
			me.trigger('sizeChange', pz);
		});
	};

	pagination.prototype.page = function (pageIndex, totalPages, pageSize) {

		var options = this.options;

		if (totalPages === undefined) {
			totalPages = options.totalPages;
		}
		if (pageSize === undefined) {
			pageSize = options.pageSize;
		}
		var oldPageSize = options.pageSize;
		// if (pageIndex > 0 && pageIndex <= totalPages) {
		// 	if (options.page(pageIndex)) {

		// 		this.$ul.innerHTML="";
		// 		options.pageSize = pageSize;
		// 		options.currentPage = pageIndex;
		// 		options.totalPages = totalPages;
		// 		this.render();

		// 	}
		// }else{
		// 	return false;
		// }

		if (options.page(pageIndex)) {
			if (pageIndex < 0) {
				pageIndex = 0;
			}

			if (pageIndex > totalPages) {
				pageIndex = totalPages;
			}
			this.$ul.innerHTML = "";
			options.pageSize = pageSize;
			options.currentPage = pageIndex;
			options.totalPages = totalPages;
			this.render();
		}
		if (pageSize != oldPageSize) {
			this.trigger('sizeChange', [pageSize, pageIndex - 1]);
		} else {
			this.trigger('pageChange', pageIndex - 1);
		}

		//this.$element.trigger('pageChange', pageIndex)

		return false;
	};

	pagination.prototype.firstPage = function () {
		return this.page(1);
	};

	pagination.prototype.lastPage = function () {
		return this.page(this.options.totalPages);
	};

	pagination.prototype.nextPage = function () {
		return this.page(parseInt(this.options.currentPage) + 1);
	};

	pagination.prototype.prevPage = function () {
		return this.page(this.options.currentPage - 1);
	};

	pagination.prototype.disableChangeSize = function () {
		this.$element.querySelector('.page_z').setAttribute('readonly', true);
	};

	pagination.prototype.enableChangeSize = function () {
		this.$element.querySelector('.page_z').removeAttribute('readonly');
	};

	function Plugin(option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('u.pagination');
			var options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option;

			if (!data) $this.data('u.pagination', data = new Pagination(this, options));else data.update(options);
		});
	}

	// var old = $.fn.pagination;

	// $.fn.pagination = Plugin
	// $.fn.pagination.Constructor = Pagination

	if (_compMgr.compMgr) _compMgr.compMgr.regComp({
		comp: pagination,
		compAsString: 'u.pagination',
		css: 'u-pagination'
	});

	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.pagination = pagination;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Progress = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _env = __webpack_require__(6);

	var _event = __webpack_require__(5);

	var _compMgr = __webpack_require__(9);

	var Progress = _BaseComponent.BaseComponent.extend({
		_Constant: {},
		_CssClasses: {
			INDETERMINATE_CLASS: 'u-progress__indeterminate'
		},
		setProgress: function setProgress(p) {

			if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
				return;
			}

			this.progressbar_.style.width = p + '%';
			return this;
		},
		/**
	  * 设置竖向进度条的进度
	  * @param p 要设置的进度
	  * @returns {u.Progress}
	     */
		setProgressHeight: function setProgressHeight(p) {

			if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
				return;
			}

			this.progressbar_.style.height = p + '%';
			this.progressbar_.style.width = '100%';
			return this;
		},
		/**
	  * 设置进度条中的html内容
	  * @param p 要设置的html内容
	  * @returns {u.Progress}
	  */
		setProgressHTML: function setProgressHTML(html) {

			if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
				return;
			}

			this.progressbar_.innerHTML = html;
			return this;
		},
		setBuffer: function setBuffer(p) {
			this.bufferbar_.style.width = p + '%';
			this.auxbar_.style.width = 100 - p + '%';
			return this;
		},

		init: function init() {
			var el = document.createElement('div');
			el.className = 'progressbar bar bar1';
			this.element.appendChild(el);
			this.progressbar_ = el;

			el = document.createElement('div');
			el.className = 'bufferbar bar bar2';
			this.element.appendChild(el);
			this.bufferbar_ = el;

			el = document.createElement('div');
			el.className = 'auxbar bar bar3';
			this.element.appendChild(el);
			this.auxbar_ = el;

			this.progressbar_.style.width = '0%';
			this.bufferbar_.style.width = '100%';
			this.auxbar_.style.width = '0%';

			(0, _dom.addClass)(this.element, 'is-upgraded');

			if (_env.env.isIE8 || _env.env.isIE9) {

				if ((0, _dom.hasClass)(this.element, this._CssClasses.INDETERMINATE_CLASS)) {
					var p = 0;
					var oThis = this;
					setInterval(function () {
						p += 5;
						p = p % 100;
						oThis.progressbar_.style.width = p + '%';
					}, 100);
				}
			}
		}

	}); /**
	     * Module : neoui-progress
	     * Author : Kvkens(yueming@yonyou.com)
	     * Date	  : 2016-08-03 10:46:37
	     */

	_compMgr.compMgr.regComp({
		comp: Progress,
		compAsString: 'u.Progress',
		css: 'u-progress'
	});
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}
	exports.Progress = Progress;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Radio = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _env = __webpack_require__(6);

	var _event = __webpack_require__(5);

	var _ripple = __webpack_require__(13);

	var _compMgr = __webpack_require__(9);

	/**
	 * Module : neoui-radio
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-03 11:16:00
	 */

	var Radio = _BaseComponent.BaseComponent.extend({
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

	    init: function init() {
	        this._btnElement = this.element.querySelector('input');

	        this._boundChangeHandler = this._onChange.bind(this);
	        this._boundFocusHandler = this._onChange.bind(this);
	        this._boundBlurHandler = this._onBlur.bind(this);
	        this._boundMouseUpHandler = this._onMouseup.bind(this);

	        var outerCircle = document.createElement('span');
	        (0, _dom.addClass)(outerCircle, this._CssClasses.RADIO_OUTER_CIRCLE);

	        var innerCircle = document.createElement('span');
	        (0, _dom.addClass)(innerCircle, this._CssClasses.RADIO_INNER_CIRCLE);

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
	        new _ripple.URipple(rippleContainer);
	        //}

	        this._btnElement.addEventListener('change', this._boundChangeHandler);
	        this._btnElement.addEventListener('focus', this._boundFocusHandler);
	        this._btnElement.addEventListener('blur', this._boundBlurHandler);
	        this.element.addEventListener('mouseup', this._boundMouseUpHandler);

	        this._updateClasses();
	        (0, _dom.addClass)(this.element, this._CssClasses.IS_UPGRADED);
	    },

	    _onChange: function _onChange(event) {
	        // Since other radio buttons don't get change events, we need to look for
	        // them to update their classes.
	        var radios = document.querySelectorAll('.' + this._CssClasses.JS_RADIO);
	        for (var i = 0; i < radios.length; i++) {
	            var button = radios[i].querySelector('.' + this._CssClasses.RADIO_BTN);
	            // Different name == different group, so no point updating those.
	            if (button.getAttribute('name') === this._btnElement.getAttribute('name')) {
	                if (radios[i]['u.Radio']) {
	                    radios[i]['u.Radio']._updateClasses();
	                }
	            }
	        }
	        this.trigger('change', { isChecked: this._btnElement.checked });
	    },

	    /**
	     * Handle focus.
	     *
	     * @param {Event} event The event that fired.
	     * @private
	     */
	    _onFocus: function _onFocus(event) {
	        (0, _dom.addClass)(this.element, this._CssClasses.IS_FOCUSED);
	    },

	    /**
	     * Handle lost focus.
	     *
	     * @param {Event} event The event that fired.
	     * @private
	     */
	    _onBlur: function _onBlur(event) {
	        (0, _dom.removeClass)(this.element, this._CssClasses.IS_FOCUSED);
	    },

	    /**
	     * Handle mouseup.
	     *
	     * @param {Event} event The event that fired.
	     * @private
	     */
	    _onMouseup: function _onMouseup(event) {
	        this._blur();
	    },

	    /**
	     * Update classes.
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
	            this._btnElement.blur();
	        }.bind(this), /** @type {number} */this.Constant_.TINY_TIMEOUT);
	    },

	    // Public methods.

	    /**
	     * Check the components disabled state.
	     *
	     * @public
	     */
	    checkDisabled: function checkDisabled() {
	        if (this._btnElement.disabled) {
	            (0, _dom.addClass)(this.element, this._CssClasses.IS_DISABLED);
	        } else {
	            (0, _dom.removeClass)(this.element, this._CssClasses.IS_DISABLED);
	        }
	    },

	    /**
	     * Check the components toggled state.
	     *
	     * @public
	     */
	    checkToggleState: function checkToggleState() {
	        if (this._btnElement.checked) {
	            (0, _dom.addClass)(this.element, this._CssClasses.IS_CHECKED);
	        } else {
	            (0, _dom.removeClass)(this.element, this._CssClasses.IS_CHECKED);
	        }
	    },

	    /**
	     * Disable radio.
	     *
	     * @public
	     */
	    disable: function disable() {
	        this._btnElement.disabled = true;
	        this._updateClasses();
	    },

	    /**
	     * Enable radio.
	     *
	     * @public
	     */
	    enable: function enable() {
	        this._btnElement.disabled = false;
	        this._updateClasses();
	    },

	    /**
	     * Check radio.
	     *
	     * @public
	     */
	    check: function check() {
	        this._btnElement.checked = true;
	        this._updateClasses();
	    },

	    uncheck: function uncheck() {
	        this._btnElement.checked = false;
	        this._updateClasses();
	    }

	});

	_compMgr.compMgr.regComp({
	    comp: Radio,
	    compAsString: 'u.Radio',
	    css: 'u-radio'
	});

	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}

	exports.Radio = Radio;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.refer = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _extend = __webpack_require__(7);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _util = __webpack_require__(4);

	var _neouiDialog = __webpack_require__(27);

	/**
	 * Module : neoui-refer
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-03 11:29:40
	 */
	var Refer = function Refer(options) {
	    var contentId = options['contentId'];
	    if ((0, _util.isEmptyObject)(contentId)) throw new Error('contentId is null');
	    this.options = (0, _extend.extend)({}, Refer.DEFAULTS, options);
	    this.params = this.options['params'];
	    this.create();
	    this.loaded = false;
	};

	Refer.DEFAULTS = {
	    isPOPMode: false,
	    searchInput: null,
	    contentId: null,
	    okId: 'okBtn',
	    cancelId: 'cancelBtn',
	    width: null,
	    height: null,
	    title: '参照',
	    setVal: function setVal() {},
	    onOk: function onOk() {},
	    onCancel: function onCancel() {}
	};

	Refer.fn = Refer.prototype;

	Refer.fn.create = function () {
	    var self = this;
	    self.setVal = this.options.setVal;
	    self.searchInput = this.options.searchInput;

	    var prefixID = this.options.contentId.replace(/[^\w\s]/gi, '\\$&');
	    if (!this.options.isPOPMode) {
	        //TODO 后续支持非弹窗模式

	        //if ($('#' + this.options.contentId).length === 0) {
	        //    $('body').append($('<div>').attr('id', this.options.contentId));
	        //}
	        //this.$contentEle = $('#' + prefixID)
	        //this.$okBtn = $('#' + prefixID + this.options.okId)
	        //this.$cancelBtn = $('#' + prefixID + this.options.cancelId)
	    } else {
	        var dialog = document.querySelector('#' + prefixID);
	        self.isDefaultDialog = true;
	        if (dialog == null) {
	            //var d = document.createElement('DIV')
	            //d.innerHTML = '<div class="modal" id="' + prefixID + '"><div class="modal-dialog"><div class="modal-content">' + '<div class="modal-header"><h4 class="modal-title">Modal title</h4></div>' + '<div class="modal-body"></div><div class="modal-footer">' + '<button   type="button" class="btn btn-primary okBtn">确定</button>' + '<button  type="button" class="btn btn-default cancelBtn" data-dismiss="modal">取消</button></div></div></div></div>'
	            dialog = (0, _dom.makeDOM)('	<div style="display:none;height:100%" id="' + prefixID + '">' + '<div class="u-msg-title"><h4 class="title">单据名称</h4></div>' + '<div class="u-msg-content">' + '<div class="content"></div>' + '</div>' + '<div class="u-msg-footer">' + '<button class="u-msg-ok u-button">确定<span class="u-button-container"><span class="u-ripple"></span></span></button>' + '<button class="u-msg-cancel u-button">取消<span class="u-button-container"><span class="u-ripple"></span></span></button>' + '</div>' + '</div>');
	            document.body.appendChild(dialog);
	            //dialog = document.body.querySelector('#' + prefixID);
	        }
	        //this.$contentEle = dialog.find('.modal-body');
	        this.titleDiv = dialog.querySelector('.title');
	        this.contentDiv = dialog.querySelector('.content');
	        this.okBtn = dialog.querySelector('.u-msg-ok');
	        this.cancelBtn = dialog.querySelector('.u-msg-cancel');
	        this.dialog = dialog;
	        //if (this.options.width)
	        //    dialog.find('.modal-content').css('width', this.options.width)
	        //if (this.options.height)
	        //    this.$contentEle.css('height', this.options.height)
	        //this.dialog.find('.modal-title').html(this.options.title)
	        this.titleDiv.innerHTML = this.options.title;
	    }
	    (0, _event.on)(this.okBtn, 'click', function () {
	        self.submit();
	    });

	    (0, _event.on)(this.cancelBtn, 'click', function () {
	        self.cancel();
	    });
	};

	Refer.fn.submit = function () {
	    var data = this.submitData();
	    this.options.onOk(data);
	    Plugin.destroy(this);
	};

	Refer.fn.cancel = function () {
	    this.options.onCancel();
	    Plugin.destroy(this);
	};

	Refer.fn.open = function () {
	    var self = this;
	    if (self.isDefaultDialog) {
	        var opt = { id: this.options.contentId, content: '#' + this.options.contentId, hasCloseMenu: true };
	        if (this.options.height) opt.height = this.options.height;
	        if (this.options.width) opt.width = this.options.width;
	        self.modalDialog = (0, _neouiDialog.dialog)(opt);
	        //self.dialog.modal('show')
	    }
	    if (this.options['module']) {
	        self.contentDiv.innerHTML = this.options['module'].template;
	        this.options['module'].init(self);
	    } else if (__webpack_require__(42)) {
	        __webpack_require__.e/* require */(23, function(__webpack_require__) { /* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(42)(this.options.pageUrl)]; (function (module) {
	            self.contentDiv.innerHTML = module.template;
	            module.init(self);
	            self.loaded = true;
	        }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));
	/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(50)(module)))});
	    }
	};

	/**
	 * 参照页面中需注册此方法
	 */
	Refer.fn.registerSubmitFunc = function (func) {
	    this.submitData = func;
	};

	Refer.fn.submitData = function () {};

	var Plugin = function Plugin(options) {
	    var r = new Refer(options);

	    Plugin.addRefer(r);
	    r.open();
	    return r;
	};

	Refer.fn.destroy = function () {
	    if (this.dialog) {
	        if (this.isDefaultDialog) {
	            //this.dialog.modal('hide');
	            //	            this.dialog.modal('removeBackdrop');
	            this.modalDialog.close();
	        }
	        //this.dialog.parent().remove();
	        this.dialog.parentElement.removeChild(this.dialog);
	    }
	    delete this.options;
	};

	/**
	 * 参照实列
	 */
	Plugin.instances = {};

	Plugin.openRefer = function (options) {
	    var r = new Refer(options);
	    Plugin.addRefer(r);
	    r.open();
	};

	Plugin.getRefer = function (id) {
	    return Plugin.instances[id];
	};

	Plugin.addRefer = function (refer) {
	    Plugin.instances[refer.options.id] = refer;
	};

	Plugin.destroy = function (refer) {
	    var r = Plugin.instances[refer.options.id];
	    delete Plugin.instances[refer.options.id];
	    r.destroy();
	};

	var refer = Plugin;

	exports.refer = refer;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./index": 43,
		"./index.js": 43,
		"./neoui-autocomplete": 1,
		"./neoui-autocomplete.js": 1,
		"./neoui-button": 12,
		"./neoui-button.js": 12,
		"./neoui-checkbox": 14,
		"./neoui-checkbox.js": 14,
		"./neoui-clockpicker": 15,
		"./neoui-clockpicker.js": 15,
		"./neoui-combo": 19,
		"./neoui-combo.js": 19,
		"./neoui-combobox": 21,
		"./neoui-combobox.js": 21,
		"./neoui-data-table": 22,
		"./neoui-data-table.js": 22,
		"./neoui-datetimepicker": 23,
		"./neoui-datetimepicker.js": 23,
		"./neoui-dialog": 27,
		"./neoui-dialog.js": 27,
		"./neoui-layout.md": 28,
		"./neoui-layout.md.js": 28,
		"./neoui-layout.nav": 29,
		"./neoui-layout.nav.js": 29,
		"./neoui-loader": 30,
		"./neoui-loader.js": 30,
		"./neoui-loading": 31,
		"./neoui-loading.js": 31,
		"./neoui-menu": 32,
		"./neoui-menu.js": 32,
		"./neoui-message": 33,
		"./neoui-message.js": 33,
		"./neoui-month": 34,
		"./neoui-month.js": 34,
		"./neoui-monthdate": 35,
		"./neoui-monthdate.js": 35,
		"./neoui-multilang": 36,
		"./neoui-multilang.js": 36,
		"./neoui-navmenu": 37,
		"./neoui-navmenu.js": 37,
		"./neoui-pagination": 38,
		"./neoui-pagination.js": 38,
		"./neoui-progress": 39,
		"./neoui-progress.js": 39,
		"./neoui-radio": 40,
		"./neoui-radio.js": 40,
		"./neoui-refer": 41,
		"./neoui-refer.js": 41,
		"./neoui-slidePanel": 44,
		"./neoui-slidePanel.js": 44,
		"./neoui-switch": 45,
		"./neoui-switch.js": 45,
		"./neoui-tabs": 46,
		"./neoui-tabs.js": 46,
		"./neoui-textfield": 20,
		"./neoui-textfield.js": 20,
		"./neoui-time": 47,
		"./neoui-time.js": 47,
		"./neoui-tooltip": 25,
		"./neoui-tooltip.js": 25,
		"./neoui-validate": 24,
		"./neoui-validate.js": 24,
		"./neoui-year": 48,
		"./neoui-year.js": 48,
		"./neoui-yearmonth": 49,
		"./neoui-yearmonth.js": 49
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 42;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.u = undefined;

	var _extend = __webpack_require__(7);

	var _neouiAutocomplete = __webpack_require__(1);

	var _neouiButton = __webpack_require__(12);

	var _neouiCheckbox = __webpack_require__(14);

	var _neouiCombo = __webpack_require__(19);

	var _neouiCombobox = __webpack_require__(21);

	var _neouiDataTable = __webpack_require__(22);

	var _neouiDialog = __webpack_require__(27);

	var _neouiLayout = __webpack_require__(28);

	var _neouiLayout2 = __webpack_require__(29);

	var _neouiLoader = __webpack_require__(30);

	var _neouiLoading = __webpack_require__(31);

	var _neouiMenu = __webpack_require__(32);

	var _neouiMessage = __webpack_require__(33);

	var _neouiMultilang = __webpack_require__(36);

	var _neouiNavmenu = __webpack_require__(37);

	var _neouiPagination = __webpack_require__(38);

	var _neouiProgress = __webpack_require__(39);

	var _neouiRadio = __webpack_require__(40);

	var _neouiRefer = __webpack_require__(41);

	var _neouiSlidePanel = __webpack_require__(44);

	var _neouiSwitch = __webpack_require__(45);

	var _neouiTabs = __webpack_require__(46);

	var _neouiTextfield = __webpack_require__(20);

	var _neouiTooltip = __webpack_require__(25);

	var _neouiValidate = __webpack_require__(24);

	var _neouiDatetimepicker = __webpack_require__(23);

	var _neouiTime = __webpack_require__(47);

	var _neouiClockpicker = __webpack_require__(15);

	var _neouiMonth = __webpack_require__(34);

	var _neouiYear = __webpack_require__(48);

	var _neouiYearmonth = __webpack_require__(49);

	var _neouiMonthdate = __webpack_require__(35);

	//import {setCookie,getCookie} from 'tinper-sparrow/lib/cookies';
	//import {createShellObject,execIgnoreError,getFunction,getJSObject,isDate,isNumber,isArray,isEmptyObject,inArray,isDomElement,each} from 'tinper-sparrow/lib/util';
	//import {env} from 'tinper-sparrow/lib/env';
	//import {on,off,trigger,stopEvent,event} from 'tinper-sparrow/lib/event';
	//import {addClass,removeClass,hasClass,toggleClass,closest,css,wrap,getStyle,getZIndex,makeDOM,makeModal,getOffset,getScroll,showPanelByEle} from 'tinper-sparrow/lib/dom';
	//import {Class} from 'tinper-sparrow/lib/class';
	//import {core} from 'tinper-sparrow/lib/core';
	//import {compMgr} from 'tinper-sparrow/lib/compMgr';
	//import {BaseComponent} from 'tinper-sparrow/lib/BaseComponent';
	//import {ajax} from 'tinper-sparrow/lib/ajax';
	//import {floatRender,integerRender,dateRender,dateTimeRender,timeRender,percentRender,dateToUTCString} from 'tinper-sparrow/lib/util/dataRender';
	//import {NumberFormater,DateFormater} from 'tinper-sparrow/lib/util/formater';
	//import {date} from 'tinper-sparrow/lib/util/dateUtils';
	//import {AddressMasker,NumberMasker,CurrencyMasker,PercentMasker} from 'tinper-sparrow/lib/util/masker'
	//import {hotkeys} from 'tinper-sparrow/lib/util/hotKeys';
	//import {Ripple} from 'tinper-sparrow/lib/util/ripple';
	//import {RSAUtils,BigInt,BarrettMu,twoDigit} from 'tinper-sparrow/lib/util/rsautils';
	//import {trans} from 'tinper-sparrow/lib/util/i18n';

	//Neoui import
	var ex = {
		Autocomplete: _neouiAutocomplete.Autocomplete,
		Button: _neouiButton.Button,
		Checkbox: _neouiCheckbox.Checkbox,
		Combo: _neouiCombo.Combo,
		Combobox: _neouiCombobox.Combobox,
		Table: _neouiDataTable.Table,
		messageDialog: _neouiDialog.messageDialog,
		confirmDialog: _neouiDialog.confirmDialog,
		dialogMode: _neouiDialog.dialogMode,
		dialog: _neouiDialog.dialog,
		dialogWizard: _neouiDialog.dialogWizard,
		iframeDialog: _neouiDialog.iframeDialog,
		Loading: _neouiLoading.Loading,
		showLoading: _neouiLoading.showLoading,
		hideLoading: _neouiLoading.hideLoading,
		showWaiting: _neouiLoading.showWaiting,
		removeWaiting: _neouiLoading.removeWaiting,
		MDLayout: _neouiLayout.MDLayout,
		NavLayout: _neouiLayout2.NavLayout,
		NavLayoutTab: _neouiLayout2.NavLayoutTab,
		showLoader: _neouiLoader.showLoader,
		hideLoader: _neouiLoader.hideLoader,
		Menu: _neouiMenu.Menu,
		showMessageDialog: _neouiMessage.showMessageDialog,
		showMessage: _neouiMessage.showMessage,
		Multilang: _neouiMultilang.Multilang,
		NavMenu: _neouiNavmenu.NavMenu,
		pagination: _neouiPagination.pagination,
		Progress: _neouiProgress.Progress,
		Radio: _neouiRadio.Radio,
		refer: _neouiRefer.refer,
		slidePanel: _neouiSlidePanel.slidePanel,
		Switch: _neouiSwitch.Switch,
		Tabs: _neouiTabs.Tabs,
		Text: _neouiTextfield.Text,
		Tooltip: _neouiTooltip.Tooltip,
		Validate: _neouiValidate.Validate,
		validate: _neouiValidate.validate,
		doValidate: _neouiValidate.doValidate,
		DateTimePicker: _neouiDatetimepicker.DateTimePicker,
		Time: _neouiTime.Time,
		ClockPicker: _neouiClockpicker.ClockPicker,
		Month: _neouiMonth.Month,
		Year: _neouiYear.Year,
		YearMonth: _neouiYearmonth.YearMonth,
		MonthDate: _neouiMonthdate.MonthDate

		//	ajax: ajax,
		//	extend : extend,
		//	setCookie: setCookie,
		//	getCookie: getCookie,
		//	createShellObject: createShellObject,
		//	execIgnoreError: execIgnoreError,
		//	getFunction: getFunction,
		//	getJSObject: getJSObject,
		//	isDate: isDate,
		//	isNumber: isNumber,
		//	isArray: isArray,
		//	isEmptyObject: isEmptyObject,
		//	inArray: inArray,
		//	isDomElement: isDomElement,
		//	each: each,
		//	on: on,
		//	off: off,
		//	trigger: trigger,
		//	stopEvent: stopEvent,
		//	event: event,
		//	addClass: addClass,
		//	removeClass: removeClass,
		//	hasClass: hasClass,
		//	toggleClass: toggleClass,
		//	closest: closest,
		//	css: css,
		//	wrap: wrap,
		//	getStyle: getStyle,
		//	getZIndex: getZIndex,
		//	makeDOM: makeDOM,
		//	makeModal: makeModal,
		//	getOffset: getOffset,
		//	getScroll: getScroll,
		//	showPanelByEle: showPanelByEle,
		//	Class: Class,
		//	core: core,
		//	compMgr: compMgr,
		//	BaseComponent: BaseComponent,
		//	floatRender: floatRender,
		//	integerRender: integerRender,
		//	dateRender: dateRender,
		//	dateTimeRender: dateTimeRender,
		//	timeRender: timeRender,
		//	percentRender: percentRender,
		//	dateToUTCString: dateToUTCString,
		//	date: date,
		//	NumberFormater: NumberFormater,
		//	DateFormater: DateFormater,
		//	AddressMasker: AddressMasker,
		//	NumberMasker: NumberMasker,
		//	CurrencyMasker: CurrencyMasker,
		//	PercentMasker: PercentMasker,
		//	hotkeys: hotkeys,
		//	Ripple: Ripple,
		//	RSAUtils: RSAUtils,
		//	BigInt: BigInt,
		//	BarrettMu: BarrettMu,
		//	twoDigit: twoDigit,
		//	trans: trans

	};
	//extend(ex,env);

	/**
	 * Module : Neoui webpack entry index
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-10 16:19:39
	 */

	//Sparrow import
	(0, _extend.extend)(ex, window.u || {});
	window.u = ex;
	exports.u = ex;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.slidePanel = undefined;

	var _dom = __webpack_require__(10);

	var _ajax = __webpack_require__(11);

	var _event = __webpack_require__(5);

	var _env = __webpack_require__(6);

	/**
	 * Module : neoui-slidePanel
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-03 13:18:48
	 */

	var slidePanelTemplate = ['<div class="slidePanel slidePanel-right  slidePanel-show slidePanel-dragging" style="transform:translate3d(100%,0,0);">', '<div class="slidePanel-content site-sidebar-content"></div>', '<div class="slidePanel-handler"></div>', '</div>'];

	var slidePanel = function slidePanel(options) {
		var url = options['url'],
		    width = options['width'] || '700px',
		    callback = options['callback'] || function () {},
		    slideDom = (0, _dom.makeDOM)(slidePanelTemplate.join('')),
		    overlayDiv = makeModal(slideDom);
		slideDom.style.width = width;
		overlayDiv.style.opacity = 0;
		document.body.appendChild(slideDom);
		//overlayDiv.style.opacity = 0.5;
		(0, _ajax.ajax)({
			type: 'get',
			url: url,
			success: function success(data) {
				var content = slideDom.querySelector('.slidePanel-content');
				content.innerHTML = data;
				callback();
				setTimeout(function () {
					slideDom.style.transform = 'translate3d(0,0,0)';
					overlayDiv.style.opacity = 0.5;
				}, 1);
			}
		});

		(0, _event.on)(overlayDiv, 'click', function () {
			(0, _event.on)(slideDom, 'transitionend', function () {
				document.body.removeChild(slideDom);
				document.body.removeChild(overlayDiv);
			});
			(0, _event.on)(slideDom, 'webkitTransitionEnd', function () {
				document.body.removeChild(slideDom);
				document.body.removeChild(overlayDiv);
			});
			slideDom.style.transform = 'translate3d(100%,0,0)';
			overlayDiv.style.opacity = 0;
			if (_env.env.isIE8) {
				document.body.removeChild(slideDom);
				document.body.removeChild(overlayDiv);
			}
		});

		return {
			close: function close() {
				overlayDiv.click();
			}
		};
	};

	exports.slidePanel = slidePanel;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Switch = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _ripple = __webpack_require__(13);

	var _compMgr = __webpack_require__(9);

	var Switch = _BaseComponent.BaseComponent.extend({
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

		init: function init() {
			this._inputElement = this.element.querySelector('.' + this._CssClasses.INPUT);

			var track = document.createElement('div');
			(0, _dom.addClass)(track, this._CssClasses.TRACK);

			var thumb = document.createElement('div');
			(0, _dom.addClass)(thumb, this._CssClasses.THUMB);
			/*swith按钮点击时，会闪一下，注释以下代码，取消此效果*/
			/*var focusHelper = document.createElement('span');
	  addClass(focusHelper, this._CssClasses.FOCUS_HELPER);
	  	thumb.appendChild(focusHelper);*/

			this.element.appendChild(track);
			this.element.appendChild(thumb);

			this.boundMouseUpHandler = this._onMouseUp.bind(this);

			//if (this.element.classList.contains(this._CssClasses.RIPPLE_EFFECT)) {
			//  addClass(this.element,this._CssClasses.RIPPLE_IGNORE_EVENTS);
			this._rippleContainerElement = document.createElement('span');
			//this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_CONTAINER);
			//this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_EFFECT);
			//this._rippleContainerElement.classList.add(this._CssClasses.RIPPLE_CENTER);
			this._rippleContainerElement.addEventListener('mouseup', this.boundMouseUpHandler);

			//var ripple = document.createElement('span');
			//ripple.classList.add(this._CssClasses.RIPPLE);

			//this._rippleContainerElement.appendChild(ripple);
			this.element.appendChild(this._rippleContainerElement);
			new _ripple.URipple(this._rippleContainerElement);
			//}

			this.boundChangeHandler = this._onChange.bind(this);
			this.boundFocusHandler = this._onFocus.bind(this);
			this.boundBlurHandler = this._onBlur.bind(this);

			this._inputElement.addEventListener('change', this.boundChangeHandler);
			this._inputElement.addEventListener('focus', this.boundFocusHandler);
			this._inputElement.addEventListener('blur', this.boundBlurHandler);
			this.element.addEventListener('mouseup', this.boundMouseUpHandler);

			this._updateClasses();
			(0, _dom.addClass)(this.element, 'is-upgraded');
		},

		_onChange: function _onChange(event) {
			this._updateClasses();
			this.trigger('change', {
				isChecked: this._inputElement.checked
			});
		},

		_onFocus: function _onFocus(event) {
			(0, _dom.addClass)(this.element, this._CssClasses.IS_FOCUSED);
		},

		_onBlur: function _onBlur(event) {
			(0, _dom.removeClass)(this.element, this._CssClasses.IS_FOCUSED);
		},

		_onMouseUp: function _onMouseUp(event) {
			this._blur();
		},

		_updateClasses: function _updateClasses() {
			this.checkDisabled();
			this.checkToggleState();
		},

		_blur: function _blur() {
			// TODO: figure out why there's a focus event being fired after our blur,
			// so that we can avoid this hack.
			window.setTimeout(function () {
				this._inputElement.blur();
			}.bind(this), /** @type {number} */this._Constant.TINY_TIMEOUT);
		},

		// Public methods.

		checkDisabled: function checkDisabled() {
			if (this._inputElement.disabled) {
				(0, _dom.addClass)(this.element, this._CssClasses.IS_DISABLED);
			} else {
				(0, _dom.removeClass)(this.element, this._CssClasses.IS_DISABLED);
			}
		},

		checkToggleState: function checkToggleState() {
			if (this._inputElement.checked) {
				(0, _dom.addClass)(this.element, this._CssClasses.IS_CHECKED);
			} else {
				(0, _dom.removeClass)(this.element, this._CssClasses.IS_CHECKED);
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

		disable: function disable() {
			this._inputElement.disabled = true;
			this._updateClasses();
		},

		enable: function enable() {
			this._inputElement.disabled = false;
			this._updateClasses();
		},

		check: function check() {
			this._inputElement.checked = true;
			this._updateClasses();
		},

		uncheck: function uncheck() {
			this._inputElement.checked = false;
			this._updateClasses();
		}

	}); /**
	     * Module : neoui-switch
	     * Author : Kvkens(yueming@yonyou.com)
	     * Date	  : 2016-08-03 13:39:55
	     */

	_compMgr.compMgr.regComp({
		comp: Switch,
		compAsString: 'u.Switch',
		css: 'u-switch'
	});

	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.Switch = Switch;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Tabs = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _dom = __webpack_require__(10);

	var _event = __webpack_require__(5);

	var _ripple = __webpack_require__(13);

	var _compMgr = __webpack_require__(9);

	var Tabs = _BaseComponent.BaseComponent.extend({
		_Constant: {},
		_CssClasses: {
			TAB_CLASS: 'u-tabs__tab',
			PANEL_CLASS: 'u-tabs__panel',
			ACTIVE_CLASS: 'is-active',
			UPGRADED_CLASS: 'is-upgraded',

			U_JS_RIPPLE_EFFECT: 'u-js-ripple-effect',
			U_RIPPLE_CONTAINER: 'u-tabs__ripple-container',
			U_RIPPLE: 'u-ripple',
			U_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'u-js-ripple-effect--ignore-events'
		},

		/**
	  * Handle clicks to a tabs component
	  *
	  * @private
	  */
		initTabs_: function initTabs_() {
			(0, _dom.addClass)(this.element, this._CssClasses.U_JS_RIPPLE_EFFECT_IGNORE_EVENTS);

			// Select element tabs, document panels
			this.tabs_ = this.element.querySelectorAll('.' + this._CssClasses.TAB_CLASS);
			this.panels_ = this.element.querySelectorAll('.' + this._CssClasses.PANEL_CLASS);

			// Create new tabs for each tab element
			for (var i = 0; i < this.tabs_.length; i++) {
				new Tab(this.tabs_[i], this);
			}
			(0, _dom.addClass)(this.element, this._CssClasses.UPGRADED_CLASS);
		},

		/**
	  * Reset tab state, dropping active classes
	  *
	  * @private
	  */
		resetTabState_: function resetTabState_() {
			for (var k = 0; k < this.tabs_.length; k++) {
				(0, _dom.removeClass)(this.tabs_[k], this._CssClasses.ACTIVE_CLASS);
			}
		},

		/**
	  * Reset panel state, droping active classes
	  *
	  * @private
	  */
		resetPanelState_: function resetPanelState_() {
			for (var j = 0; j < this.panels_.length; j++) {
				(0, _dom.removeClass)(this.panels_[j], this._CssClasses.ACTIVE_CLASS);
			}
		},
		show: function show(itemId) {
			var panel = this.element.querySelector('#' + itemId);
			var tab = this.element.querySelector("[href='#" + itemId + "']");
			this.resetTabState_();
			this.resetPanelState_();
			(0, _dom.addClass)(tab, this._CssClasses.ACTIVE_CLASS);
			(0, _dom.addClass)(panel, this._CssClasses.ACTIVE_CLASS);
		},

		/**
	  * Initialize element.
	  */
		init: function init() {
			if (this.element) {
				this.initTabs_();
			}
		}
	});

	/**
	 * Constructor for an individual tab.
	 *
	 * @constructor
	 * @param {Element} tab The HTML element for the tab.
	 * @param {Tabs} ctx The Tabs object that owns the tab.
	 */
	/**
	 * Module : neoui-tabs
	 * Author : Kvkens(yueming@yonyou.com)
	 * Date	  : 2016-08-03 14:12:27
	 */

	function Tab(tab, ctx) {
		if (tab) {
			var rippleContainer = document.createElement('span');
			(0, _dom.addClass)(rippleContainer, ctx._CssClasses.U_RIPPLE_CONTAINER);
			(0, _dom.addClass)(rippleContainer, ctx._CssClasses.U_JS_RIPPLE_EFFECT);
			var ripple = document.createElement('span');
			(0, _dom.addClass)(ripple, ctx._CssClasses.U_RIPPLE);
			rippleContainer.appendChild(ripple);
			tab.appendChild(rippleContainer);

			tab.ripple = new _ripple.Ripple(tab);

			tab.addEventListener('click', function (e) {
				(0, _event.stopEvent)(e);
				// e.preventDefault();
				var href = tab.href.split('#')[1];
				var panel = ctx.element.querySelector('#' + href);
				ctx.resetTabState_();
				ctx.resetPanelState_();
				(0, _dom.addClass)(tab, ctx._CssClasses.ACTIVE_CLASS);
				(0, _dom.addClass)(panel, ctx._CssClasses.ACTIVE_CLASS);
			});
		}
	}

	_compMgr.compMgr.regComp({
		comp: Tabs,
		compAsString: 'u.Tabs',
		css: 'u-tabs'
	});
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.Tabs = Tabs;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Time = undefined;

	var _extend = __webpack_require__(7);

	var _BaseComponent = __webpack_require__(2);

	var _env = __webpack_require__(6);

	var _event = __webpack_require__(5);

	var _dom = __webpack_require__(10);

	var _compMgr = __webpack_require__(9);

	var Time = _BaseComponent.BaseComponent.extend({
		DEFAULTS: {},
		init: function init() {
			var self = this;
			var element = this.element;
			this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
			this.panelDiv = null;
			this.input = this.element.querySelector("input");
			(0, _dom.addClass)(this.element, 'u-text');

			(0, _event.on)(this.input, 'blur', function (e) {
				self._inputFocus = false;
				this.setValue(this.input.value);
			}.bind(this));

			// 添加focus事件
			this.focusEvent();
			// 添加右侧图标click事件
			this.clickEvent();
		}
	});

	Time.fn = Time.prototype;

	Time.fn.createPanel = function () {
		if (this.panelDiv) return;
		var oThis = this;
		this.panelDiv = (0, _dom.makeDOM)('<div class="u-date-panel" style="padding:0px;"></div>');
		this.panelContentDiv = (0, _dom.makeDOM)('<div class="u-time-content"></div>');
		this.panelDiv.appendChild(this.panelContentDiv);
		this.panelHourDiv = (0, _dom.makeDOM)('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelHourDiv);
		this.panelHourInput = (0, _dom.makeDOM)('<input class="u-time-input">');
		this.panelHourDiv.appendChild(this.panelHourInput);
		this.panelMinDiv = (0, _dom.makeDOM)('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelMinDiv);
		this.panelMinInput = (0, _dom.makeDOM)('<input class="u-time-input">');
		this.panelMinDiv.appendChild(this.panelMinInput);
		this.panelSecDiv = (0, _dom.makeDOM)('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelSecDiv);
		this.panelSecInput = (0, _dom.makeDOM)('<input class="u-time-input">');
		this.panelSecDiv.appendChild(this.panelSecInput);
		this.panelNavDiv = (0, _dom.makeDOM)('<div class="u-time-nav"></div>');
		this.panelDiv.appendChild(this.panelNavDiv);
		this.panelOKButton = (0, _dom.makeDOM)('<button class="u-button" style="float:right;">OK</button>');
		this.panelNavDiv.appendChild(this.panelOKButton);
		(0, _event.on)(this.panelOKButton, 'click', function () {
			var v = oThis.panelHourInput.value + ':' + oThis.panelMinInput.value + ':' + oThis.panelSecInput.value;
			oThis.setValue(v);
			oThis.hide();
		});
		this.panelCancelButton = (0, _dom.makeDOM)('<button class="u-button" style="float:right;">Cancel</button>');
		this.panelNavDiv.appendChild(this.panelCancelButton);
		(0, _event.on)(this.panelCancelButton, 'click', function () {
			oThis.hide();
		});

		var d = new Date();
		this.panelHourInput.value = d.getHours() > 9 ? '' + d.getHours() : '0' + d.getHours();
		this.panelMinInput.value = d.getMinutes() > 9 ? '' + d.getMinutes() : '0' + d.getMinutes();
		this.panelSecInput.value = d.getSeconds() > 9 ? '' + d.getSeconds() : '0' + d.getSeconds();
	};

	Time.fn.setValue = function (value) {
		var hour = '',
		    min = '',
		    sec = '';
		value = value ? value : '';
		if (value == this.input.value) return;
		if (value && value.indexOf(':') > -1) {
			var vA = value.split(":");
			var hour = vA[0];
			hour = hour % 24;
			hour = hour > 9 ? '' + hour : '0' + hour;
			var min = vA[1];
			min = min % 60;
			min = min > 9 ? '' + min : '0' + min;
			var sec = vA[2];
			sec = sec % 60;
			sec = sec > 9 ? '' + sec : '0' + sec;

			value = hour + ':' + min + ':' + sec;
		}
		this.input.value = value;
		this.createPanel();

		this.panelHourInput.value = hour;
		this.panelMinInput.value = min;
		this.panelSecInput.value = sec;
		this.trigger('valueChange', { value: value });
	};

	Time.fn.focusEvent = function () {
		var self = this;
		(0, _event.on)(this.input, 'focus', function (e) {
			self._inputFocus = true;
			self.show(e);
			(0, _event.stopEvent)(e);
		});
	};

	//下拉图标的点击事件
	Time.fn.clickEvent = function () {
		var self = this;
		var caret = this.element.nextSibling;
		(0, _event.on)(caret, 'click', function (e) {
			self.input.focus();
			(0, _event.stopEvent)(e);
		});
	};

	Time.fn.show = function (evt) {

		var inputValue = this.input.value;
		this.setValue(inputValue);

		var oThis = this;
		this.createPanel();

		/*因为元素可能变化位置，所以显示的时候需要重新计算*/
		this.width = this.element.offsetWidth;
		if (this.width < 300) this.width = 300;

		this.panelDiv.style.width = this.width + 'px';
		this.panelDiv.style.maxWidth = this.width + 'px';
		if (this.options.showFix) {
			document.body.appendChild(this.panelDiv);
			this.panelDiv.style.position = 'fixed';
			(0, _dom.showPanelByEle)({
				ele: this.input,
				panel: this.panelDiv,
				position: "bottomLeft"
			});
		} else {
			// this.element.parentNode.appendChild(this.panelDiv);
			// //调整left和top
			// this.left = this.element.offsetLeft;
			// var inputHeight = this.element.offsetHeight;
			// this.top = this.element.offsetTop + inputHeight;
			// this.panelDiv.style.left = this.left + 'px';
			// this.panelDiv.style.top = this.top + 'px';

			var bodyWidth = document.body.clientWidth,
			    bodyHeight = document.body.clientHeight,
			    panelWidth = this.panelDiv.offsetWidth,
			    panelHeight = this.panelDiv.offsetHeight;

			this.element.appendChild(this.panelDiv);
			this.element.style.position = 'relative';
			this.left = this.input.offsetLeft;
			var inputHeight = this.input.offsetHeight;
			this.top = this.input.offsetTop + inputHeight;

			if (this.left + panelWidth > bodyWidth) {
				this.left = bodyWidth - panelWidth;
			}

			if (this.top + panelHeight > bodyHeight) {
				this.top = bodyHeight - panelHeight;
			}

			this.panelDiv.style.left = this.left + 'px';
			this.panelDiv.style.top = this.top + 'px';
		}

		this.panelDiv.style.zIndex = (0, _dom.getZIndex)();
		(0, _dom.addClass)(this.panelDiv, 'is-visible');

		var callback = function (e) {
			if (e !== evt && e.target !== this.input && !oThis.clickPanel(e.target) && oThis._inputFocus != true) {
				(0, _event.off)(document, 'click', callback);
				// document.removeEventListener('click', callback);
				this.hide();
			}
		}.bind(this);
		(0, _event.on)(document, 'click', callback);
		// document.addEventListener('click', callback);
	};

	Time.fn.clickPanel = function (dom) {
		while (dom) {
			if (dom == this.panelDiv) {
				return true;
			} else {
				dom = dom.parentNode;
			}
		}
		return false;
	};

	Time.fn.hide = function () {
		(0, _dom.removeClass)(this.panelDiv, 'is-visible');
		this.panelDiv.style.zIndex = -1;
	};

	_compMgr.compMgr.regComp({
		comp: Time,
		compAsString: 'u.Time',
		css: 'u-time'
	});
	if (_env.env.isIE8) {
		_compMgr.compMgr.regComp({
			comp: Time,
			compAsString: 'u.ClockPicker',
			css: 'u-clockpicker'
		});
	}

	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}

	exports.Time = Time;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.Year = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _event = __webpack_require__(5);

	var _dom = __webpack_require__(10);

	var _extend = __webpack_require__(7);

	var _compMgr = __webpack_require__(9);

	var _ripple = __webpack_require__(13);

	/**
	 * Module : neoui-year
	 * Author : liuyk(liuyk@yonyou.com)
	 * Date	  : 2016-08-11 15:17:07
	 */

	var Year = _BaseComponent.BaseComponent.extend({
		DEFAULTS: {},
		init: function init() {
			var self = this;
			var element = this.element;
			this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
			this.panelDiv = null;
			this.input = this.element.querySelector("input");

			var d = new Date();
			this.year = d.getFullYear();
			this.defaultYear = this.year;
			this.startYear = this.year - this.year % 10 - 1;

			(0, _event.on)(this.input, 'blur', function (e) {
				self._inputFocus = false;
				self.setValue(self.input.value);
			});

			// 添加focus事件
			this.focusEvent();
			// 添加右侧图标click事件
			this.clickEvent();
			// 添加keydown事件
			this.keydownEvent();
		},

		createPanel: function createPanel() {
			if (this.panelDiv) {
				this._fillYear();
				return;
			}
			var oThis = this;
			this.panelDiv = (0, _dom.makeDOM)('<div class="u-date-panel" style="margin:0px;"></div>');
			this.panelContentDiv = (0, _dom.makeDOM)('<div class="u-date-content"></div>');
			this.panelDiv.appendChild(this.panelContentDiv);

			this.preBtn = (0, _dom.makeDOM)('<button class="u-date-pre-button u-button mini">&lt;</button>');
			this.nextBtn = (0, _dom.makeDOM)('<button class="u-date-next-button u-button mini">&gt;</button>');

			(0, _event.on)(this.preBtn, 'click', function (e) {
				oThis.startYear -= 10;
				oThis._fillYear();
			});
			(0, _event.on)(this.nextBtn, 'click', function (e) {
				oThis.startYear += 10;
				oThis._fillYear();
			});
			this.panelContentDiv.appendChild(this.preBtn);
			this.panelContentDiv.appendChild(this.nextBtn);
			this._fillYear();
		},

		/**
	  *填充年份选择面板
	  * @private
	  */
		_fillYear: function _fillYear(type) {
			var oldPanel, year, template, yearPage, titleDiv, yearDiv, i, cell;
			oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
			if (oldPanel) this.panelContentDiv.removeChild(oldPanel);
			template = ['<div class="u-date-content-page">', '<div class="u-date-content-title"></div>', '<div class="u-date-content-panel"></div>', '</div>'].join("");
			yearPage = (0, _dom.makeDOM)(template);
			titleDiv = yearPage.querySelector('.u-date-content-title');
			titleDiv.innerHTML = this.startYear + '-' + (this.startYear + 11);
			yearDiv = yearPage.querySelector('.u-date-content-panel');
			for (i = 0; i < 12; i++) {
				cell = (0, _dom.makeDOM)('<div class="u-date-content-year-cell">' + (this.startYear + i) + '</div>');
				new _ripple.URipple(cell);
				if (this.startYear + i == this.year) {
					(0, _dom.addClass)(cell, 'current');
				}
				cell._value = this.startYear + i;
				yearDiv.appendChild(cell);
			}
			(0, _event.on)(yearDiv, 'click', function (e) {
				var _y = e.target._value;
				this.year = _y;
				this.setValue(_y);
				this.hide();
				(0, _event.stopEvent)(e);
			}.bind(this));

			this.preBtn.style.display = 'block';
			this.nextBtn.style.display = 'block';
			this.panelContentDiv.appendChild(yearPage);

			this.currentPanel = 'year';
		},

		setValue: function setValue(value) {
			value = value ? value : '';
			this.value = value;
			if (value) {
				this.year = value;
			} else {
				this.year = this.defaultYear;
			}
			this.startYear = this.year - this.year % 10 - 1;
			this.input.value = value;
			this.trigger('valueChange', { value: value });
		},

		focusEvent: function focusEvent() {
			var self = this;
			(0, _event.on)(this.input, 'focus', function (e) {
				self._inputFocus = true;
				self.show(e);
				(0, _event.stopEvent)(e);
			});
		},
		keydownEvent: function keydownEvent() {
			var self = this;
			(0, _event.on)(self.input, "keydown", function (e) {
				var code = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
				if (!(code >= 48 && code <= 57 || code == 37 || code == 39 || code == 8 || code == 46)) {
					//阻止默认浏览器动作(W3C)
					if (e && e.preventDefault) e.preventDefault();
					//IE中阻止函数器默认动作的方式
					else window.event.returnValue = false;
					return false;
				}
			});
		},
		//下拉图标的点击事件
		clickEvent: function clickEvent() {
			var self = this;
			var caret = this.element.nextSibling;
			(0, _event.on)(caret, 'click', function (e) {
				self.input.focus();
				(0, _event.stopEvent)(e);
			});
		},

		show: function show(evt) {
			var oThis = this;
			this.createPanel();

			this.width = this.element.offsetWidth;
			if (this.width < 300) this.width = 300;

			this.panelDiv.style.width = 152 + 'px';
			if (this.options.showFix) {
				document.body.appendChild(this.panelDiv);
				this.panelDiv.style.position = 'fixed';
				(0, _dom.showPanelByEle)({
					ele: this.input,
					panel: this.panelDiv,
					position: "bottomLeft"
				});
			} else {
				var bodyWidth = document.body.clientWidth,
				    bodyHeight = document.body.clientHeight,
				    panelWidth = this.panelDiv.offsetWidth,
				    panelHeight = this.panelDiv.offsetHeight;

				this.element.appendChild(this.panelDiv);
				this.element.style.position = 'relative';
				this.left = this.input.offsetLeft;
				var inputHeight = this.input.offsetHeight;
				this.top = this.input.offsetTop + inputHeight;

				if (this.left + panelWidth > bodyWidth) {
					this.left = bodyWidth - panelWidth;
				}

				if (this.top + panelHeight > bodyHeight) {
					this.top = bodyHeight - panelHeight;
				}

				this.panelDiv.style.left = this.left + 'px';
				this.panelDiv.style.top = this.top + 'px';
			}
			this.panelDiv.style.zIndex = (0, _dom.getZIndex)();
			(0, _dom.addClass)(this.panelDiv, 'is-visible');

			var callback = function (e) {
				if (e !== evt && e.target !== this.input && !oThis.clickPanel(e.target) && oThis._inputFocus != true) {
					(0, _event.off)(document, 'click', callback);
					// document.removeEventListener('click', callback);
					this.hide();
				}
			}.bind(this);
			(0, _event.on)(document, 'click', callback);
			// document.addEventListener('click', callback);
		},

		clickPanel: function clickPanel(dom) {
			while (dom) {
				if (dom == this.panelDiv) {
					return true;
				} else {
					dom = dom.parentNode;
				}
			}
			return false;
		},
		hide: function hide() {
			(0, _dom.removeClass)(this.panelDiv, 'is-visible');
			this.panelDiv.style.zIndex = -1;
		}
	});

	_compMgr.compMgr.regComp({
		comp: Year,
		compAsString: 'u.Year',
		css: 'u-year'
	});
	if (document.readyState && document.readyState === 'complete') {
		_compMgr.compMgr.updateComp();
	} else {
		(0, _event.on)(window, 'load', function () {
			//扫描并生成控件
			_compMgr.compMgr.updateComp();
		});
	}
	exports.Year = Year;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.YearMonth = undefined;

	var _BaseComponent = __webpack_require__(2);

	var _event = __webpack_require__(5);

	var _dom = __webpack_require__(10);

	var _extend = __webpack_require__(7);

	var _env = __webpack_require__(6);

	var _compMgr = __webpack_require__(9);

	var _ripple = __webpack_require__(13);

	var YearMonth = _BaseComponent.BaseComponent.extend({
	    DEFAULTS: {},
	    init: function init() {
	        var self = this;
	        var element = this.element;
	        this.options = (0, _extend.extend)({}, this.DEFAULTS, this.options);
	        this.panelDiv = null;
	        this.input = this.element.querySelector("input");

	        var d = new Date();
	        this.year = d.getFullYear();
	        this.startYear = this.year - this.year % 10 - 1;
	        this.month = d.getMonth() + 1;

	        (0, _event.on)(this.input, 'blur', function (e) {
	            self._inputFocus = false;
	            self.setValue(self.input.value);
	        });

	        // 添加focus事件
	        this.focusEvent();
	        // 添加右侧图标click事件
	        this.clickEvent();
	    },

	    createPanel: function createPanel() {
	        if (this.panelDiv) {
	            this._fillYear();
	            return;
	        }
	        var oThis = this;
	        this.panelDiv = (0, _dom.makeDOM)('<div class="u-date-panel" style="margin:0px;"></div>');
	        this.panelContentDiv = (0, _dom.makeDOM)('<div class="u-date-content"></div>');
	        this.panelDiv.appendChild(this.panelContentDiv);

	        // this.preBtn = makeDOM('<button class="u-date-pre-button u-button flat floating mini" style="display:none;">&lt;</button>');
	        // this.nextBtn = makeDOM('<button class="u-date-next-button u-button flat floating mini" style="display:none;">&gt;</button>');
	        this.preBtn = (0, _dom.makeDOM)('<button class="u-date-pre-button u-button mini">&lt;</button>');
	        this.nextBtn = (0, _dom.makeDOM)('<button class="u-date-next-button u-button mini">&gt;</button>');

	        (0, _event.on)(this.preBtn, 'click', function (e) {
	            oThis.startYear -= 10;
	            oThis._fillYear();
	        });
	        (0, _event.on)(this.nextBtn, 'click', function (e) {
	            oThis.startYear += 10;
	            oThis._fillYear();
	        });
	        this.panelContentDiv.appendChild(this.preBtn);
	        this.panelContentDiv.appendChild(this.nextBtn);
	        this._fillYear();
	    },

	    /**
	     *填充年份选择面板
	     * @private
	     */
	    _fillYear: function _fillYear(type) {
	        var oldPanel, year, template, yearPage, titleDiv, yearDiv, i, cell;
	        oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
	        if (oldPanel) this.panelContentDiv.removeChild(oldPanel);
	        template = ['<div class="u-date-content-page">', '<div class="u-date-content-title"></div>', '<div class="u-date-content-panel"></div>', '</div>'].join("");
	        yearPage = (0, _dom.makeDOM)(template);
	        titleDiv = yearPage.querySelector('.u-date-content-title');
	        titleDiv.innerHTML = this.startYear + '-' + (this.startYear + 11);
	        yearDiv = yearPage.querySelector('.u-date-content-panel');
	        for (i = 0; i < 12; i++) {
	            cell = (0, _dom.makeDOM)('<div class="u-date-content-year-cell">' + (this.startYear + i) + '</div>');
	            new _ripple.URipple(cell);
	            if (this.startYear + i == this.year) {
	                (0, _dom.addClass)(cell, 'current');
	            }
	            cell._value = this.startYear + i;
	            yearDiv.appendChild(cell);
	        }
	        var oThis = this;
	        (0, _event.on)(yearDiv, 'click', function (e) {
	            var _y = e.target._value;
	            oThis.year = _y;
	            oThis._fillMonth();
	            (0, _event.stopEvent)(e);
	        });

	        this.preBtn.style.display = 'block';
	        this.nextBtn.style.display = 'block';
	        // this._zoomIn(yearPage);
	        this.panelContentDiv.appendChild(yearPage);
	        this.contentPage = yearPage;
	        this.currentPanel = 'year';
	    },

	    /**
	     * 填充月份选择面板
	     * @private
	     */
	    _fillMonth: function _fillMonth() {
	        var oldPanel, template, monthPage, _month, cells, i;
	        oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
	        if (oldPanel) this.panelContentDiv.removeChild(oldPanel);
	        _month = this.month;
	        template = ['<div class="u-date-content-page">', '<div class="u-date-content-title">' + _month + '月</div>', '<div class="u-date-content-panel">', '<div class="u-date-content-year-cell">1月</div>', '<div class="u-date-content-year-cell">2月</div>', '<div class="u-date-content-year-cell">3月</div>', '<div class="u-date-content-year-cell">4月</div>', '<div class="u-date-content-year-cell">5月</div>', '<div class="u-date-content-year-cell">6月</div>', '<div class="u-date-content-year-cell">7月</div>', '<div class="u-date-content-year-cell">8月</div>', '<div class="u-date-content-year-cell">9月</div>', '<div class="u-date-content-year-cell">10月</div>', '<div class="u-date-content-year-cell">11月</div>', '<div class="u-date-content-year-cell">12月</div>', '</div>', '</div>'].join("");

	        monthPage = (0, _dom.makeDOM)(template);
	        cells = monthPage.querySelectorAll('.u-date-content-year-cell');
	        for (i = 0; i < cells.length; i++) {
	            if (_month == i + 1) {
	                (0, _dom.addClass)(cells[i], 'current');
	            }
	            cells[i]._value = i + 1;
	            new _ripple.URipple(cells[i]);
	        }
	        var oThis = this;
	        (0, _event.on)(monthPage, 'click', function (e) {
	            var _m = e.target._value;
	            oThis.month = _m;
	            monthPage.querySelector('.u-date-content-title').innerHTML = _m + '月';
	            oThis.setValue(oThis.year + '-' + oThis.month);
	            oThis.hide();
	        });

	        this.preBtn.style.display = 'none';
	        this.nextBtn.style.display = 'none';
	        this._zoomIn(monthPage);
	        this.currentPanel = 'month';
	    },

	    /**
	     * 淡入动画效果
	     * @private
	     */
	    _zoomIn: function _zoomIn(newPage) {
	        if (!this.contentPage) {
	            this.panelContentDiv.appendChild(newPage);
	            this.contentPage = newPage;
	            return;
	        }
	        (0, _dom.addClass)(newPage, 'zoom-in');
	        this.panelContentDiv.appendChild(newPage);
	        if (_env.isIE8) {
	            this.contentPage = newPage;
	        } else {
	            var cleanup = function () {
	                newPage.removeEventListener('transitionend', cleanup);
	                newPage.removeEventListener('webkitTransitionEnd', cleanup);
	                // this.panelContentDiv.removeChild(this.contentPage);
	                this.contentPage = newPage;
	            }.bind(this);
	            if (this.contentPage) {
	                newPage.addEventListener('transitionend', cleanup);
	                newPage.addEventListener('webkitTransitionEnd', cleanup);
	            }
	            window.requestAnimationFrame(function () {
	                (0, _dom.addClass)(this.contentPage, 'is-hidden');
	                (0, _dom.removeClass)(newPage, 'zoom-in');
	            }.bind(this));
	        }
	    },

	    setValue: function setValue(value) {
	        value = value ? value : '';
	        if (value && value.indexOf('-') > -1) {
	            var vA = value.split("-");
	            this.year = vA[0];
	            var month = vA[1];
	            this.month = month % 12;
	            if (this.month == 0) this.month = 12;

	            value = this.year + '-' + this.month;
	        }
	        this.value = value;
	        this.input.value = value;
	        this.trigger('valueChange', { value: value });
	    },

	    focusEvent: function focusEvent() {
	        var self = this;
	        (0, _event.on)(this.input, 'focus', function (e) {
	            self._inputFocus = true;
	            self.show(e);
	            (0, _event.stopEvent)(e);
	        });
	    },

	    //下拉图标的点击事件
	    clickEvent: function clickEvent() {
	        var self = this;
	        var caret = this.element.nextSibling;
	        (0, _event.on)(caret, 'click', function (e) {
	            self.input.focus();
	            (0, _event.stopEvent)(e);
	        });
	    },

	    show: function show(evt) {
	        var oThis = this;
	        if (this.value && this.value.indexOf('-') > -1) {
	            var vA = this.value.split("-");
	            this.year = vA[0];
	            var month = vA[1];
	            this.month = month % 12;
	            if (this.month == 0) this.month = 12;
	        }
	        this.createPanel();
	        /*因为元素可能变化位置，所以显示的时候需要重新计算*/
	        this.width = this.element.offsetWidth;
	        if (this.width < 300) this.width = 300;

	        this.panelDiv.style.width = this.width + 'px';

	        if (this.options.showFix) {
	            document.body.appendChild(this.panelDiv);
	            this.panelDiv.style.position = 'fixed';
	            (0, _dom.showPanelByEle)({
	                ele: this.input,
	                panel: this.panelDiv,
	                position: "bottomLeft"
	            });
	        } else {
	            //    this.element.parentNode.appendChild(this.panelDiv);
	            // //调整left和top
	            //    this.left = this.element.offsetLeft;
	            //    var inputHeight = this.element.offsetHeight;
	            //    this.top = this.element.offsetTop + inputHeight;
	            //    this.panelDiv.style.left = this.left + 'px';
	            //    this.panelDiv.style.top = this.top + 'px';

	            var bodyWidth = document.body.clientWidth,
	                bodyHeight = document.body.clientHeight,
	                panelWidth = this.panelDiv.offsetWidth,
	                panelHeight = this.panelDiv.offsetHeight;

	            this.element.appendChild(this.panelDiv);
	            this.element.style.position = 'relative';
	            this.left = this.input.offsetLeft;
	            var inputHeight = this.input.offsetHeight;
	            this.top = this.input.offsetTop + inputHeight;

	            if (this.left + panelWidth > bodyWidth) {
	                this.left = bodyWidth - panelWidth;
	            }

	            if (this.top + panelHeight > bodyHeight) {
	                this.top = bodyHeight - panelHeight;
	            }

	            this.panelDiv.style.left = this.left + 'px';
	            this.panelDiv.style.top = this.top + 'px';
	        }

	        this.panelDiv.style.zIndex = (0, _dom.getZIndex)();
	        (0, _dom.addClass)(this.panelDiv, 'is-visible');
	        var oThis = this;
	        var callback = function callback(e) {
	            if (e !== evt && e.target !== oThis.input && !oThis.clickPanel(e.target) && oThis._inputFocus != true) {
	                // document.removeEventListener('click', callback);
	                (0, _event.off)(document, 'click', callback);
	                oThis.hide();
	            }
	        };
	        (0, _event.on)(document, 'click', callback);
	        // document.addEventListener('click', callback);
	    },

	    clickPanel: function clickPanel(dom) {
	        while (dom) {
	            if (dom == this.panelDiv) {
	                return true;
	            } else {
	                dom = dom.parentNode;
	            }
	        }
	        return false;
	    },

	    hide: function hide() {
	        (0, _dom.removeClass)(this.panelDiv, 'is-visible');
	        this.panelDiv.style.zIndex = -1;
	    }
	}); /**
	     * Module : neoui-year
	     * Author : liuyk(liuyk@yonyou.com)
	     * Date   : 2016-08-11 15:17:07
	     */

	_compMgr.compMgr.regComp({
	    comp: YearMonth,
	    compAsString: 'u.YearMonth',
	    css: 'u-yearmonth'
	});
	if (document.readyState && document.readyState === 'complete') {
	    _compMgr.compMgr.updateComp();
	} else {
	    (0, _event.on)(window, 'load', function () {
	        //扫描并生成控件
	        _compMgr.compMgr.updateComp();
	    });
	}
	exports.YearMonth = YearMonth;

/***/ }
/******/ ]);