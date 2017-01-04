/**
 * Module : neoui-validate
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-06 14:03:15
 */
import { BaseComponent } from 'tinper-sparrow/js/BaseComponent';
import { extend } from 'tinper-sparrow/js/extend.js';
import { makeDOM } from 'tinper-sparrow/js/dom';
import { on } from 'tinper-sparrow/js/event';
import { isNumber, inArray, each } from 'tinper-sparrow/js/util';
import { Tooltip } from './neoui-tooltip';
import { trans } from 'tinper-sparrow/js/util/i18n';
import { compMgr } from 'tinper-sparrow/js/compMgr';

var Validate = BaseComponent.extend({

    init: function() {
        var self = this
        this.$element = this.element
        this.$form = this.form
        this.referDom = this.$element;
        if (this.referDom.tagName !== 'INPUT' && this.referDom.tagName !== "TEXTAREA") {
            this.referDom = this.$element.querySelector('input');
            // 如果referDom的父元素不是this.$element说明时单选框、复选框。则referDom还为$element
            if (!this.referDom || this.referDom.parentNode !== this.$element) {
                this.referDom = this.$element
            }
        }
        this.options = extend({}, this.DEFAULTS, this.options, JSON.parse(this.element.getAttribute('uvalidate')));
        this.required = false
        this.timeout = null;
        this.tipAliveTime = this.options['tipAliveTime'] === undefined ? 3000 : this.options['tipAliveTime'];
        //所有属性优先级 ：  options参数  > attr属性  > 默认值
        this.required = this.options['required'] ? this.options['required'] : false
        this.validType = this.options['validType'] ? this.options['validType'] : null
            //校验模式  blur  submit
        this.validMode = this.options['validMode'] ? this.options['validMode'] : Validate.DEFAULTS.validMode
            //空提示
        this.nullMsg = this.options['nullMsg'] ? this.options['nullMsg'] : Validate.NULLMSG[this.validType]
        // input输入提示
        this.inputMsg = Validate.INPUTMSG;
            //是否必填
        if (this.required && !this.nullMsg)
            this.nullMsg = Validate.NULLMSG['required']
            //错误必填
        this.errorMsg = this.options['errorMsg'] ? this.options['errorMsg'] : Validate.ERRORMSG[this.validType]
            //正则校验
        this.regExp = this.options['reg'] ? this.options['reg'] : Validate.REG[this.validType]
        try {
            if (typeof this.regExp == 'string')
                this.regExp = eval(this.regExp)
        } catch (e) {

        }

        this.notipFlag = this.options['notipFlag']; // 错误信息提示方式是否为tip，默认为false
        this.hasSuccess = this.options['hasSuccess']; //是否含有正确提示

        this.showFix = this.options['showFix'];

        //提示div的id 为空时使用tooltop来提示
        this.tipId = this.options['tipId'] ? this.options['tipId'] : null
            //校验成功提示信息的div
        this.successId = this.options['successId'] ? this.options['successId'] : null;

        // 要求显示成功提示，并没有成功提示dom的id时，则创建成功提示dom
        if (this.hasSuccess && !this.successId) {
            this.successId = makeDOM('<span class="u-form-control-success uf uf-correct" ></span>');

            if (this.referDom.nextSibling) {
                this.referDom.parentNode.insertBefore(this.successId, this.referDom.nextSibling);
            } else {
                this.referDom.parentNode.appendChild(this.successId);
            }

        }
        //不是默认的tip提示方式并且tipId没有定义时创建默认tipid
        if (this.notipFlag && !this.tipId) {
            this.tipId = makeDOM('<span class="u-form-control-info uf uf-exc-c-o "></span>');
            this.referDom.parentNode.appendChild(this.tipId);

            if (this.referDom.nextSibling) {
                this.referDom.parentNode.insertBefore(this.tipId, this.referDom.nextSibling);
            } else {
                this.referDom.parentNode.appendChild(this.tipId);
            }
        }
        //提示框位置
        this.placement = this.options['placement'] ? this.options['placement'] : Validate.DEFAULTS.placement
            //
        this.minLength = this.options['minLength'] > 0 ? this.options['minLength'] : null
        this.maxLength = this.options['maxLength'] > 0 ? this.options['maxLength'] : null
        this.min = this.options['min'] !== undefined ? this.options['min'] : null
        this.max = this.options['max'] !== undefined ? this.options['max'] : null
        this.minNotEq = this.options['minNotEq'] !== undefined ? this.options['minNotEq'] : null
        this.maxNotEq = this.options['maxNotEq'] !== undefined ? this.options['maxNotEq'] : null
        this.min = isNumber(this.min) ? this.min : null
        this.max = isNumber(this.max) ? this.max : null
        this.minNotEq = isNumber(this.minNotEq) ? this.minNotEq : null
        this.maxNotEq = isNumber(this.maxNotEq) ? this.maxNotEq : null
        this.create()
    }
});

Validate.fn = Validate.prototype
    //Validate.tipTemplate = '<div class="tooltip" role="tooltip"><div class="tooltip-arrow tooltip-arrow-c"></div><div class="tooltip-arrow"></div><div class="tooltip-inner" style="color:#ed7103;border:1px solid #ed7103;background-color:#fff7f0;"></div></div>'

Validate.DEFAULTS = {
    validMode: 'blur',
    placement: "top"
}

Validate.NULLMSG = {
    "required": trans('validate.required', "不能为空！"),
    "integer": trans('validate.integer', "请填写整数！"),
    "float": trans('validate.float', "请填写数字！"),
    "zipCode": trans('validate.zipCode', "请填写邮政编码！"),
    "phone": trans('validate.phone', "请填写手机号码！"),
    "landline": trans('validate.landline', "请填写座机号码！"),
    "email": trans('validate.email', "请填写邮箱地址！"),
    "url": trans('validate.url', "请填写网址！"),
    "datetime": trans('validate.datetime', "请填写日期！"),
    "phoneNumber": trans('validate.phoneNumber', "请填写正确号码！")

}

Validate.ERRORMSG = {
    "integer": trans('validate.error_integer', "整数格式不对！"),
    "float": trans('validate.error_float', "数字格式不对！"),
    "zipCode": trans('validate.error_zipCode', "邮政编码格式不对！"),
    "phone": trans('validate.error_phone', "手机号码格式不对！"),
    "landline": trans('validate.error_landline', "座机号码格式不对！"),
    "email": trans('validate.error_email', "邮箱地址格式不对！"),
    "url": trans('validate.error_url', "网址格式不对！"),
    "datetime": trans('validate.error_datetime', "日期格式不对！"),
    "phoneNumber": trans('validate.error_phoneNumber', "号码格式不对！")
}

Validate.INPUTMSG = {
    "minLength": trans('validate.input_minlength',"输入长度不能小于"),
    "maxLength": trans('validate.input_maxlength',"输入长度不能大于"),
    "unit": trans('validate.input_unit',"位"),
    "maxValue": trans('validate.input_maxvalue',"输入值不能大于"),
    "minValue": trans('validate.input_minvalue',"输入值不能小于"),
    "equalMax": trans('validate.input_equalMax',"输入值不能大于或等于"),
    "equalMin": trans('validate.input_equalMin',"输入值不能小于或等于")

}

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
}

Validate.fn.create = function() {
    if($(this.element).attr('hasValidate')){
        return;
    }
    var self = this
    on(this.element, 'blur', function(e) {
        if (self.validMode == 'blur') {
            self.passed = self.doValid()

        }
    })
    on(this.element, 'focus', function(e) {
        //隐藏错误信息
        self.hideMsg()
    })
    on(this.element, 'change', function(e) {
        //隐藏错误信息
        self.hideMsg()
    })
    on(this.element, 'keydown', function(e) {
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
            } else if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (inArray(event.keyCode, [8, 110, 190, 189, 109]) > -1))) {
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
            var tmp = self.element.value

            if (event.shiftKey) {
                event.returnValue = false;
                return false;
            } else if (event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46) {
                // tab键 左箭头 右箭头 delete键
                return true;
            } else if (event.ctrlKey && (event.keyCode == 67 || event.keyCode == 86)) {
                //复制粘贴
                return true;
            } else if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (inArray(event.keyCode, [8, 109, 189]) > -1))) {
                event.returnValue = false;
                return false;
            }

            if (tmp && (tmp + '').split('.')[0].length >= 25) {
                return false;
            }
        }

    })

    $(this.element).attr('hasValidate',true);
}

Validate.fn.updateOptions = function(options) {

}

Validate.fn.doValid = function(options) {
    var self = this;
    var pValue;
    this.showMsgFlag = true;
    if (options) {
        pValue = options.pValue;
        this.showMsgFlag = options.showMsg;
    }
    this.needClean = false
        //只读的也需要校验，所以注释
        // if (this.element && this.element.getAttribute("readonly")) return {passed:true}
    var value = null
    if (typeof pValue != 'undefined')
        value = pValue
    else if (this.element)
        // value = this.element.value
         value = this.element.value?this.element.value:this.referDom.value

    if (this.isEmpty(value) && this.required) {
        this.showMsg(this.nullMsg)
        return {
            passed: false,
            Msg: this.nullMsg
        }
    } else if (this.isEmpty(value) && !this.required) {
        return {
            passed: true
        }
    }
    if (this.regExp) {
        var reg = new RegExp(this.regExp);
        if (typeof value == 'number')
            value = value + ""
        else if (typeof value == 'boolean')
            return {
                passed:true
            }
        var r = value.match(reg);
        if (r === null || r === false) {
            this.showMsg(this.errorMsg)
            this.needClean = true
            return {
                passed: false,
                Msg: this.errorMsg
            }
        }
    }
    if (this.minLength) {
        if (value.lengthb() < this.minLength) {
            var Msg = this.inputMsg.minLength + this.minLength + this.inputMsg.unit;
            this.showMsg(Msg)
            return {
                passed: false,
                Msg: Msg
            }
        }
    }
    if (this.maxLength) {
        if (value.lengthb() > this.maxLength) {
            var Msg = this.inputMsg.maxLength + this.maxLength + this.inputMsg.unit;
            this.showMsg(Msg)
            return {
                passed: false,
                Msg: Msg
            }
        }
    }
    if (this.max != undefined && this.max != null) {
        if (parseFloat(value) > this.max) {
            var Msg = this.inputMsg.maxValue + this.max;
            this.showMsg(Msg)
            return {
                passed: false,
                Msg: Msg
            }
        }
    }
    if (this.min != undefined && this.min != null) {
        if (parseFloat(value) < this.min) {
            var Msg = this.inputMsg.minValue + this.min;
            this.showMsg(Msg)
            return {
                passed: false,
                Msg: Msg
            }
        }
    }
    if (this.maxNotEq != undefined && this.maxNotEq != null) {
        if (parseFloat(value) >= this.maxNotEq) {
            var Msg = this.inputMsg.equalMax + this.maxNotEq;
            this.showMsg(Msg)
            return {
                passed: false,
                Msg: Msg
            }
        }
    }
    if (this.minNotEq != undefined && this.minNotEq != null) {
        if (parseFloat(value) <= this.minNotEq) {
            var Msg = this.inputMsg.equalMin + this.minNotEq;
            this.showMsg(Msg)
            return {
                passed: false,
                Msg: Msg
            }
        }
    }
    //succes时，将成功信息显示
    if (this.successId) {
        // addClass(this.element.parentNode,'u-has-success');
        var successDiv = this.successId;
        var successleft = this.referDom.offsetLeft + this.referDom.offsetWidth + 5;
        var successtop = this.referDom.offsetTop + 10;
        if (typeof successDiv === 'string')
            successDiv = document.getElementById(successDiv);
        successDiv.style.display = 'inline-block';
        successDiv.style.top = successtop + 'px';
        successDiv.style.left = successleft + 'px';
        clearTimeout(this.successtimeout)
        this.successtimeout = setTimeout(function() {
            // self.tooltip.hide();
            successDiv.style.display = 'none';
        }, this.tipAliveTime)

    }
    return {
        passed: true
    }
}

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

Validate.fn.some = Array.prototype.some ?
    Array.prototype.some : function() {
        var flag;
        for (var i = 0; i < this.length; i++) {
            if (typeof arguments[0] == "function") {
                flag = arguments[0](this[i])
                if (flag) break;
            }
        }
        return flag;
    };

Validate.fn.getValue = function() {
    var inputval = '';
    //checkbox、radio为u-meta绑定时
    var bool = this.some.call(this.$element.querySelectorAll('[type="checkbox"],[type="radio"]'), function(ele) {
        return ele.type == "checkbox" || ele.type == "radio"
    });
    if (this.$element.childNodes.length > 0 && bool) {
        var eleArr = this.$element.querySelectorAll('[type="checkbox"],[type="radio"]')
        var ele = eleArr[0]
        if (ele.type == "checkbox") {
            this.$element.querySelectorAll(":checkbox[name='" + $(ele).attr("name") + "']:checked").each(function() {
                inputval += $(this).val() + ',';
            })
        } else if (ele.type == "radio") {
            inputval = this.$element.querySelectorAll(":radio[name='" + $(ele).attr("name") + "']:checked").value;
        }
    } else if (this.$element.is(":radio")) { //valid-type 绑定
        inputval = this.$element.parent().querySelectorAll(":radio[name='" + this.$element.attr("name") + "']:checked").val();
    } else if (this.$element.is(":checkbox")) {
        inputval = "";
        this.$element.parent().find(":checkbox[name='" + this.$element.attr("name") + "']:checked").each(function() {
            inputval += $(this).val() + ',';
        })
    } else if (this.$element.find('input').length > 0) {
        inputval = this.$element.find('input').val()
    } else {
        inputval = this.$element.val();
    }
    inputval = inputval.trim;
    return this.isEmpty(inputval) ? "" : inputval;
}

Validate.fn.isEmpty = function(val) {
    return val === "" || val === undefined || val === null //|| val === $.trim(this.$element.attr("tip"));
}

Validate.fn.showMsg = function(msg) {

    if (this.showMsgFlag == false || this.showMsgFlag == 'false') {
        return;
    }
    //因为grid中自定义的editType使用的是document.body,只处理校验不现实提示信息
    if(this.element == document.body){
        return;
    }
    var self = this
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
        }




        if (this.options.tipTemplate)
            tipOptions.template = this.options.tipTemplate

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
        if(this.tooltip){
            this.tooltip.hide();
        }

        this.tooltip = new Tooltip(this.referDom, tipOptions)
        this.tooltip.setTitle(msg);
        this.tooltip.show();

    }
    if (this.tipAliveTime !== -1) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function() {
            // self.tooltip.hide();
            self.hideMsg();
        }, this.tipAliveTime)

    }

}
Validate.fn.hideMsg = function() {
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
        if (this.tooltip)
            this.tooltip.hide()
    }

}

/**
 * 只有单一元素时使用
 */
Validate.fn._needClean = function() {
    return true; //this.validates[0].needClean
}

var validate = function(element) {
    var self = this,
        options, childEle;
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    //element本身需要校验
    if (element.attributes["uvalidate"]) {
        options = element.attributes["uvalidate"] ? JSON.parse(element.attributes["uvalidate"].value) : {};
        options = extend({
            el: element
        }, options);
        element['Validate'] = new Validate(options);
    }

    //element是个父元素，校验子元素
    childEle = element.querySelectorAll('[uvalidate]');
    each(childEle, function(i, child) {
        if (!child['Validate']) { //如果该元素上没有校验
            options = child.attributes["validate"] ? JSON.parse(child.attributes["validate"].value) : {};
            options = extend({
                el: child
            }, options);
            child['Validate'] = new Validate(options);
        }
    });
}

// 对某个dom容器内的元素进行校验
var doValidate = function(element) {
    var passed = true,
        childEle, result;
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    childEle = element.querySelectorAll('input');
    each(childEle, function(i, child) {
        if (child['Validate'] && child['Validate'].check) {
            result = child['Validate'].check({
                trueValue: true,
                showMsg: true
            });
            if (typeof result === 'object')
                passed = result['passed'] && passed
            else
                passed = result && passed
        }
    });
    return passed;
}



compMgr.regComp({
    comp: Validate,
    compAsString: 'u.Validate',
    css: 'u-validate'
});
if (document.readyState && document.readyState === 'complete') {
    compMgr.updateComp();
} else {
    on(window, 'load', function() {
        //扫描并生成控件
        compMgr.updateComp();
    });
}
export {
    Validate,
    validate,
    doValidate
};
