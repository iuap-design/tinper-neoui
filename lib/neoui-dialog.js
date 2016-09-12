'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dialogWizard = exports.dialog = exports.dialogMode = exports.confirmDialog = exports.messageDialog = undefined;

var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _extend = require('neoui-sparrow/lib/extend');

var _neouiButton = require('./neoui-button');

var _compMgr = require('neoui-sparrow/lib/compMgr');

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
	var overlayDiv = (0, _dom.makeModal)(msgDom);
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
	var overlayDiv = (0, _dom.makeModal)(msgDom);
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