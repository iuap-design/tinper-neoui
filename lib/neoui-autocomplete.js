'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Autocomplete = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _extend = require('neoui-sparrow/lib/extend');

var _env = require('neoui-sparrow/lib/env');

var _util = require('neoui-sparrow/lib/util');

var _ajax = require('neoui-sparrow/lib/ajax');

var _compMgr = require('neoui-sparrow/lib/compMgr');

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