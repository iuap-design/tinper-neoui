'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.showMessage = exports.showMessageDialog = undefined;

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

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
	(0, _event.on)(closeBtn, 'click', function () {
		(0, _dom.removeClass)(msgDom, "active");
		setTimeout(function () {
			try {
				document.body.removeChild(msgDom);
			} catch (e) {}
		}, 500);
	});
	document.body.appendChild(msgDom);

	if (showSeconds > 0) {
		setTimeout(function () {
			closeBtn.click();
		}, showSeconds * 1000);
	}
	setTimeout(function () {
		(0, _dom.addClass)(msgDom, "active");
	}, showSeconds * 1);
};

var showMessageDialog = showMessage;

exports.showMessageDialog = showMessageDialog;
exports.showMessage = showMessage;