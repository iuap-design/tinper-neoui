'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.slidePanel = undefined;

var _dom = require('neoui-sparrow/lib/dom');

var _ajax = require('neoui-sparrow/lib/ajax');

var _event = require('neoui-sparrow/lib/event');

var _env = require('neoui-sparrow/lib/env');

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