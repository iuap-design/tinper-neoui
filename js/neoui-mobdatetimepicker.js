import {extend} from 'tinper-sparrow/js/extend';
import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {env} from 'tinper-sparrow/js/env';
import {on,off,trigger,stopEvent} from 'tinper-sparrow/js/event';
import {addClass,removeClass,hasClass,closest,makeDOM,makeModal,showPanelByEle,getElementLeft,getElementTop} from 'tinper-sparrow/js/dom';
import {core} from 'tinper-sparrow/js/core';
import {date as udate} from 'tinper-sparrow/js/util/dateUtils';
import {Validate} from './neoui-validate';
import {compMgr} from 'tinper-sparrow/js/compMgr';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {dateFormat} from 'tinper-sparrow/js/util'

var MobDateTimePicker = BaseComponent.extend({
});

MobDateTimePicker.fn = MobDateTimePicker.prototype;


MobDateTimePicker.fn.init = function(){
    var self = this,_fmt,_defaultFmt;
    
    var self = this,adapterType,format;
    this._element = this.element;
    this._input = this._element.querySelector("input");
     if (hasClass(this._element, 'time')){
        this.type = 'datetime';
        _defaultFmt = 'YYYY-MM-DD hh:mm:ss';
    }else{
        this.type = 'date';
        _defaultFmt = 'YYYY-MM-DD';
    }
    _fmt = this._element.getAttribute("format");
    this.format = _fmt || this.options['format']  ||  _defaultFmt;
    this.isShow = false;
    this.op = {};
    var mobileDateFormat = "", mobileTimeFormat = "", dateOrder = "", timeOrder = "";
    if(env.isMobile){
        switch (format) {
            case "YYYY-MM-DD":
                mobileDateFormat = "yy-mm-dd";
                dateOrder = mobileDateFormat.replace(/-/g, '');
                break;
            case "YYYY-MM-DD HH:mm":
                mobileDateFormat = "yy-mm-dd";
                mobileTimeFormat = "HH:ii";
                dateOrder = mobileDateFormat.replace(/-/g, '');
                timeOrder = mobileTimeFormat.replace(/\:/g, '');
                break;
            case "YYYY-MM":
                mobileDateFormat = "yy-mm";
                dateOrder = mobileDateFormat.replace(/-/g, '');
                break;
            default:
                mobileDateFormat = "yy-mm-dd";
                mobileTimeFormat = "HH:ii:ss";
                dateOrder = mobileDateFormat.replace(/-/g, '');
                timeOrder = mobileTimeFormat.replace(/\:/g, '');
        }

        this.op = {
            theme:"ios",
            mode:"scroller",
            lang: "zh",
            cancelText: null,
            dateFormat: mobileDateFormat,
            timeWheels: timeOrder,
            dateWheels: dateOrder,
            timeFormat: mobileTimeFormat,
            onSelect:function(val){
                if(typeof self.options.beforeValueChangeFun == 'function'){
                    if(!self.options.beforeValueChangeFun.call(this,this.pickerDate)){
                        return;
                    }
                }
                self.setValue(val);
            }
        }
        this._span = this.element.querySelector("span");
        this.element = this.element.querySelector("input");
        this.element.setAttribute('readonly','readonly');
        if (this._span){
            on(this._span, 'click', function(e){
                self.element.focus();
                stopEvent(e);
            });
        }
        if(this.adapterType == 'date'){
            $(this.element).mobiscroll().date(this.op);
        }else{
            $(this.element).mobiscroll().datetime(this.op);
        }
    }else{
        this.comp = new DateTimePicker({el:this.element,format:this.maskerMeta.format,showFix:this.options.showFix,beforeValueChangeFun:this.beforeValueChangeFun});
    }

    this.element['u.DateTimePicker'] = this.comp;

    if(!env.isMobile){
        this.comp.on('select', function(event){
            self.setValue(event.value);
        });
    }

    if(!env.isMobile){
        // 校验
        this.comp.on('validate', function(event){
            self.doValidate();
        });
    }
};

MobDateTimePicker.fn.setValue= function(value){
    if (!value){
        this.date = null;
        this._input.value = '';
        return;
    }

    var _date = udate.getDateObj(value);
    if(_date){
        if(_date){
            this.resetDataObj(_date);
        }
        if(this.beginDateObj){
            if(this.beginDateObj){
                this.resetDataObj(this.beginDateObj);
            }
            if(_date.getTime() < this.beginDateObj.getTime())
                return;
        }
        if(this.overDateObj){
            if(this.overDateObj){
                this.resetDataObj(this.overDateObj);
            }
            if(_date.getTime() > this.overDateObj.getTime())
                return;
        }
        this.date = _date;
        this._input.value = udate.format(this.date,this.format);
    }
    this.trigger('valueChange', {value:value});
};

MobDateTimePicker.fn.resetDataObj = function(dataObj){
    if(this.format.indexOf('h') < 0 && this.format.indexOf('H') < 0){
        dataObj.setHours(0);
    }
    if(this.format.indexOf('m') < 0){
        dataObj.setMinutes(0);
    }
    if(this.format.indexOf('s') < 0){
        dataObj.setSeconds(0);
        dataObj.setMilliseconds(0);
    }
};

if(env.isMobile){
    compMgr.regComp({
        comp: MobDateTimePicker,
        compAsString: 'u.DateTimePicker',
        css: 'u-datepicker'
    });
}

if(document.readyState && document.readyState === 'complete') {
    compMgr.updateComp();
} else {
    on(window, 'load', function() {
        //扫描并生成控件
        compMgr.updateComp();
    });
}

export {MobDateTimePicker};
