'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.doValidate = exports.validate = exports.Validate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * Module : neoui-validate
                                                                                                                                                                                                                                                   * Author : Kvkens(yueming@yonyou.com)
                                                                                                                                                                                                                                                   * Date	  : 2016-08-06 14:03:15
                                                                                                                                                                                                                                                   */


var _BaseComponent = require('neoui-sparrow/lib/BaseComponent');

var _extend = require('neoui-sparrow/lib/extend.js');

var _dom = require('neoui-sparrow/lib/dom');

var _event = require('neoui-sparrow/lib/event');

var _util = require('neoui-sparrow/lib/util');

var _neouiTooltip = require('./neoui-tooltip');

var _i18n = require('neoui-sparrow/lib/util/i18n');

var _compMgr = require('neoui-sparrow/lib/compMgr');

var Validate = _BaseComponent.BaseComponent.extend({

	init: function init() {
		var self = this;
		this.$element = this.element;
		this.$form = this.form;
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

		this.notipFlag = this.options['notipFlag']; // 错误信息提示方式是否为tip，默认为true
		this.hasSuccess = this.options['hasSuccess']; //是否含有正确提示

		this.showFix = this.options['showFix'];

		//提示div的id 为空时使用tooltop来提示
		this.tipId = this.options['tipId'] ? this.options['tipId'] : null;
		//校验成功提示信息的div
		this.successId = this.options['successId'] ? this.options['successId'] : null;

		// 要求显示成功提示，并没有成功提示dom的id时，则创建成功提示dom
		if (this.hasSuccess && !this.successId) {
			this.successId = (0, _dom.makeDOM)('<span class="u-form-control-success uf uf-checkedsymbol" ></span>');

			if (this.$element.nextSibling) {
				this.$element.parentNode.insertBefore(this.successId, this.$element.nextSibling);
			} else {
				this.$element.parentNode.appendChild(this.successId);
			}
		}
		//不是默认的tip提示方式并且tipId没有定义时创建默认tipid	
		if (this.notipFlag && !this.tipId) {
			this.tipId = (0, _dom.makeDOM)('<span class="u-form-control-info uf uf-exclamationsign "></span>');
			this.$element.parentNode.appendChild(this.tipId);

			if (this.$element.nextSibling) {
				this.$element.parentNode.insertBefore(this.tipId, this.$element.nextSibling);
			} else {
				this.$element.parentNode.appendChild(this.tipId);
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
		this.min = env.isNumber(this.min) ? this.min : null;
		this.max = env.isNumber(this.max) ? this.max : null;
		this.minNotEq = env.isNumber(this.minNotEq) ? this.minNotEq : null;
		this.maxNotEq = env.isNumber(this.maxNotEq) ? this.maxNotEq : null;
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
	"datetime": (0, _i18n.trans)('validate.datetime', "请填写日期！")

};

Validate.ERRORMSG = {
	"integer": (0, _i18n.trans)('validate.error_integer', "整数格式不对！"),
	"float": (0, _i18n.trans)('validate.error_float', "数字格式不对！"),
	"zipCode": (0, _i18n.trans)('validate.error_zipCode', "邮政编码格式不对！"),
	"phone": (0, _i18n.trans)('validate.error_phone', "手机号码格式不对！"),
	"landline": (0, _i18n.trans)('validate.error_landline', "座机号码格式不对！"),
	"email": (0, _i18n.trans)('validate.error_email', "邮箱地址格式不对！"),
	"url": (0, _i18n.trans)('validate.error_url', "网址格式不对！"),
	"datetime": (0, _i18n.trans)('validate.error_datetime', "日期格式不对！")
};

Validate.REG = {
	"integer": /^-?\d+$/,
	"float": /^-?\d+(\.\d+)?$/,
	"zipCode": /^[0-9]{6}$/,
	"phone": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
	"landline": /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
	"email": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	"url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
	"datetime": /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/
};

Validate.fn.create = function () {
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
		if (typeof value == 'number') value = value + "";
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
		var successleft = this.$element.offsetLeft + this.$element.offsetWidth + 5;
		var successtop = this.$element.offsetTop + 10;
		if (typeof successDiv === 'string') successDiv = document.getElementById(successDiv);
		successDiv.style.display = 'inline-block';
		successDiv.style.top = successtop + 'px';
		successDiv.style.left = successleft + 'px';
		clearTimeout(this.timeout);
		this.timeout = setTimeout(function () {
			// self.tooltip.hide();
			successDiv.style.display = 'none';
		}, 3000);
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
		this.$element.style.borderColor = 'rgb(241,90,74)';
		var tipdiv = this.tipId;
		if (typeof tipdiv === 'string') {
			tipdiv = document.getElementById(tipdiv);
		}
		tipdiv.innerHTML = msg;
		//如果notipFlag为true说明，可能是平台创建的，需要添加left、top值
		if (this.notipFlag) {
			var left = this.$element.offsetLeft;
			var top = this.$element.offsetTop + this.$element.offsetHeight + 4;
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
		if (!this.tooltip) this.tooltip = new _neouiTooltip.Tooltip(this.element, tipOptions);
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
		this.$element.style.borderColor = '';
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