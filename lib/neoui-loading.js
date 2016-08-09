'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeWaiting = exports.showWaiting = exports.hideLoading = exports.showLoading = exports.Loading = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _env = require('neoui-sparrow/lib/env');

var _event = require('neoui-sparrow/lib/event');

var _compMgr = require('neoui-sparrow/lib/compMgr');

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