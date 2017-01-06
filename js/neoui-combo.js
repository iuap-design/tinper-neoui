/**
 * Module : neoui-combo
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-06 13:19:10
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,removeClass,hasClass,showPanelByEle,getZIndex,closest,makeDOM} from 'tinper-sparrow/js/dom';
import {env} from 'tinper-sparrow/js/env';
import {on,off,stopEvent,trigger} from 'tinper-sparrow/js/event';
import {Text} from './neoui-textfield';
import {URipple} from 'tinper-sparrow/js/util/ripple';
import {compMgr} from 'tinper-sparrow/js/compMgr';

var Combo = BaseComponent.extend({
    init: function () {
        this.name = '';
        this.mutilSelect = this.options['mutilSelect'] || false;
        if (hasClass(this.element, 'mutil-select')){
            this.mutilSelect = true
        }



        this.onlySelect = this.options['onlySelect'] || false;
        if(this.mutilSelect)
            this.onlySelect = true;

        this.comboDatas = [];
        var i, option, datas = [], self = this;
        //addClass(this.element, 'u-text')
        new Text(this.element);
        var options = this.element.getElementsByTagName('option');
        for (i = 0; i < options.length; i++) {
            option = options[i];
            datas.push({value: option.value, name: option.text});
        }

        this._input = this.element.querySelector("input");
        this.setComboData(datas);



        if(this.mutilSelect){
            this.nowWidth = 0;
            this.fullWidth = this._input.offsetWidth;
        }


        if(this.onlySelect || env.isMobile){
            setTimeout(function(){
                self._input.setAttribute('readonly','readonly');
            },1000);

        }else{
            on(this._input, 'blur', function(e){
                var v = this.value;
                if(!v)
                    return;
                /*校验数值是否存在于datasource的name中*/
                for(var i = 0; i< self.comboDatas.length;i++){
                    if(v == self.comboDatas[i].name){
                        v = self.comboDatas[i].value;
                        break;
                    }

                }
                self.setValue(v);
            })
        }
        this._combo_name_par=this.element.querySelector(".u-combo-name-par");
        on(this._input, 'focus', function (e) {
            self._inputFocus = true;
            self.show(e);
            stopEvent(e);
        })
        on(this._input, 'blur', function(e){
            self._inputFocus = false;
        })

        this.isAutoTip = this.options['isAutoTip'] || false; //是否支持自动提示
        //if (hasClass(this.element, 'is-auto-tip')){
        //    this.isAutoTip = true;
        //}
        on(this._input, 'keydown',function(e){
            var keyCode = e.keyCode;

            if( self.isAutoTip ){
                switch (keyCode) {
                    case 38: // up
                        u.stopEvent(e);
                        break;
                    case 40: // down
                        u.stopEvent(e);
                        break;
                    case 9: // tab
                    case 13: // return
                        // make sure to blur off the current field
                        // self.element.blur();
                        u.stopEvent(e);
                        break;
                    default:
                        if (self.timeout) clearTimeout(self.timeout);
                        self.timeout = setTimeout(function() {
                            self.onChange();
                        }, 400);
                        break;
                }
            } else{
                // 回车
                if(keyCode == 13) this.blur();
            }
        });
      /*  this.iconBtn = this.element.querySelector("[data-role='combo-button']");
        if (this.iconBtn){
            on(this.iconBtn, 'click', function(e){
                self._input.focus();
                stopEvent(e);
            })
        }
       */
	   //下拉框图表点击收起打开
        this.iconBtn = this.element.querySelector("[data-role='combo-button']");
		var comonTarge=true;
        if (this.iconBtn) {
            on(this.iconBtn,'click',function(e){
                self._input.focus();
                if(comonTarge){
                    $(self._input).parent().parent().find(".u-combo-ul").addClass("is-visible");
                    comonTarge=false;
                }else{
                    $(self._input).parent().parent().find(".u-combo-ul").removeClass("is-visible");
                    comonTarge=true;
                }
            });
        }

    },

    //输入框内容发生变化时修改提示词.
    onChange: function() {
        var v = this._input.value;
        if(!v) v = '';
        var filterData = [];
        for(var i = 0, len = this.initialComboData.length; i< len; i++){
            if(this.initialComboData[i].name.indexOf(v) >= 0
                || this.initialComboData[i].value.indexOf(v) >= 0) {
                filterData.push(this.initialComboData[i]);
            }
        }
        this.setComboData(filterData);
        this.show();
    },

    show: function (evt) {

        var self = this,width=this._input.offsetWidth;
        if(this.options.showFix){
            document.body.appendChild(this._ul);
            this._ul.style.position = 'fixed';
            showPanelByEle({
                ele:this._input,
                panel:this._ul,
                position:"bottomLeft"
            });
        }else{
            // this.element.parentNode.appendChild(this._ul);
            // var left = this.element.offsetLeft,
            // inputHeight = this.element.offsetHeight,
            // top = this.element.offsetTop + inputHeight;
            // this._ul.style.left = left + 'px';
            // this._ul.style.top = top + 'px';
            var bodyWidth = document.body.clientWidth,bodyHeight = document.body.clientHeight,
                panelWidth = this._ul.offsetWidth,panelHeight = this._ul.offsetHeight;
            this.element.appendChild(this._ul);
            this.element.style.position = 'relative';
            this.left = this._input.offsetLeft;
            var inputHeight = this._input.offsetHeight;
            this.top = this._input.offsetTop + inputHeight;
            if(this.left + panelWidth > bodyWidth){
                this.left = bodyWidth - panelWidth;
            }

            if((this.top + panelHeight) > bodyHeight){
                this.top = bodyHeight - panelHeight;
            }

            this._ul.style.left = this.left + 'px';
            this._ul.style.top = this.top + 'px';
        }
	    this._ul.style.width = width + 'px';
        $(this._ul).addClass('is-animating');
        this._ul.style.zIndex = getZIndex();
        $(this._ul).addClass('is-visible');

        var callback = function (e) {
            if(e === evt || e.target === this._input || self._inputFocus == true) return;
            if(this.mutilSelect && (closest(e.target,'u-combo-ul') === self._ul || closest(e.target, 'u-combo-name-par') || closest(e.target, 'u-combo-name')) ) return;
            off(document,'click',callback);
            // document.removeEventListener('click', callback);
            this.hide();
        }.bind(this);
        this.callback = callback;
        on(document,'click',callback);
        on(document.body,'touchend',callback)
        // document.addEventListener('click', callback);

    },

    hide: function () {
        off(document,'click', this.callback);
        removeClass(this._ul, 'is-visible');
        this._ul.style.zIndex = -1;
        this.trigger('select', {value: this.value, name: this._input.value});
    },

    /**
     * 设置下拉数据
     * @param datas  数据项
     * @param options  指定name value对应字段 可以为空
     */
    setComboData: function (datas, options) {
        var i, li, self = this;

        //统一指定datas格式为[{name:"",value:""}].
        if (!options)
            this.comboDatas = datas;
        else{
            this.comboDatas = [];
            for(var i = 0; i< datas.length; i++){
                this.comboDatas.push({name:datas[i][options.name],value:datas[i][options.value]});
            }
        }

        //将初始数据保留一份,以便input输入内容改变时自动提示的数据从全部数据里头筛选.
        if(!(this.initialComboData && this.initialComboData.length)){
            this.initialComboData = this.comboDatas;
        }
        // isAutoTip 可以输入的情况下不清空内容，后续要清空内容需要重点考虑。
        // this.value = '';
        // this._input.value = '';

        //若没有下拉的ul,新生成一个ul结构.
        if (!this._ul) {
            this._ul = makeDOM('<ul class="u-combo-ul"></ul>');
        }
        this._ul.innerHTML = '';
        //TODO 增加filter
        for (i = 0; i < this.comboDatas.length; i++) {
            li = makeDOM('<li class="u-combo-li">' + this.comboDatas[i].name + '</li>');//document.createElement('li');
            li._index = i;
            on(li, 'click', function () {
                self.selectItem(this._index);
            })
            var rippleContainer = document.createElement('span');
            addClass(rippleContainer, 'u-ripple-container');
			var _rippleElement = document.createElement('span');
			addClass(_rippleElement, 'u-ripple');

			rippleContainer.appendChild(_rippleElement);
            li.appendChild(rippleContainer);
            new URipple(li);
            this._ul.appendChild(li);
        }
    },

    selectItem: function (index) {
        var self = this;

        if (this.mutilSelect){
            var val = this.comboDatas[index].value;
            var name = this.comboDatas[index].name;
            var index = (this.value + ',').indexOf(val + ',');
            var l = val.length + 1;
            var flag;
            if(this.fullWidth == 0){
                this.fullWidth = this._input.offsetWidth;
                if(this.fullWidth > 0) {
                    if(this._combo_name_par){
                        this._combo_name_par.style.maxWidth = this.fullWidth + 'px';

                    }
                }

            }

            if (index != -1){ // 已经选中
                this.value = this.value.substring(0,index) + this.value.substring(index + l)
                flag = '-'
            }else{
                this.value = (!this.value) ? val + ',' : this.value + val + ',';
                flag = '+'
            }

            if(flag == '+'){
                this.name += name + ',';
                var nameDiv= makeDOM('<div class="u-combo-name" key="' + val + '">'+ name + /*<a href="javascript:void(0)" class="remove">x</a>*/'</div>');
                var parNameDiv=makeDOM('<div class="u-combo-name-par" style="position:absolute;max-width:' + this.fullWidth + 'px;"></div>');
                
                /*var _a = nameDiv.querySelector('a');
                on(_a, 'click', function(){
                    var values = self.value.split(',');
                    values.splice(values.indexOf(val),1);
                    self.value = values.join(',');
                    self._combo_name_par.removeChild(nameDiv);
                    self._updateItemSelect();
                    self.trigger('select', {value: self.value, name: name});
                });*/
                if(!this._combo_name_par){
                    this._input.parentNode.insertBefore(parNameDiv, this._input);
                    this._combo_name_par=parNameDiv;
                    on(this._combo_name_par, 'click', function (e) {
                        trigger(self._input,'focus')
                    })
                }
                this._combo_name_par.appendChild(nameDiv);
                this._combo_name_par.title = this.name;
                var nWidth = nameDiv.offsetWidth + 20;
                this.nowWidth += nWidth;
                if(this.nowWidth > this.fullWidth && this.fullWidth > 0){
                    this.nowWidth -= nWidth;
                    this._combo_name_par.removeChild(nameDiv);
                    addClass(this._combo_name_par,'u-combo-overwidth');
                }
            }else{
                this.name = this.name.replace(name + ',' ,'');
                if(this._combo_name_par){
                    var comboDiv = this._combo_name_par.querySelector('[key="'+val+'"]');
                    if(comboDiv){
                        var nWidth = comboDiv.offsetWidth + 20;
                        this._combo_name_par.removeChild(comboDiv);
                        this.nowWidth -= nWidth;
                        removeClass(this._combo_name_par,'u-combo-overwidth');
                    }
                }
            }


            this._updateItemSelect();

            // this.trigger('select', {value: this.value, name: name});
        }else{
            this.value = this.comboDatas[index].value;
            this._input.value = this.comboDatas[index].name;
            this._updateItemSelect();
            // this.trigger('select', {value: this.value, name: this._input.value});
        }


    },

    _updateItemSelect: function() {
        var lis = this._ul.querySelectorAll('.u-combo-li')
        if (this.mutilSelect){
            var values = this.value.split(',');
            for(var i=0;i<lis.length;i++) {
                if(values.indexOf(this.comboDatas[i].value) > -1) {
                    addClass(lis[i], 'is-selected');
                } else {
                    removeClass(lis[i], 'is-selected');
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
            for(var i=0;i<lis.length;i++) {
                if(this.value == this.comboDatas[i].value) {
                    addClass(lis[i], 'is-selected');
                } else {
                    removeClass(lis[i], 'is-selected');
                }
            }

        }
    },

    /**
     *设置值
     * @param value
     */
    setValue: function(value){
        var self = this;
        value = value + '';
    	value = value || '';

        var values = value.split(',');
        if (this.mutilSelect === true) {
            if(self._combo_name_par)
                self._combo_name_par.innerHTML = '';
            this.value = '';
        }
        if(!value) {
            this._input.value = '';
            this.value = '';
            this._updateItemSelect();
        }
        var matched = false;
        this.nowWidth = 0;
        this.comboDatas.forEach(function(item, index){
            if (this.mutilSelect === true){
                if (values.indexOf(item.value) != -1){
                    this.selectItem(index)
                }
            }else {
                if (item.value+ '' === value) {
                    this.selectItem(index);
                    matched = true;
                    return;
                }
            }
        }.bind(this));
        if(!this.onlySelect && !matched){
            this.value = value;
            this._input.value = value;
            this.trigger('select', {value: this.value, name: this._input.value});
        }
    },

    emptyValue: function() {
        this.value = '';
        this._input.value = '';
    },
    /**
     * 设置显示名
     * @param name
     */
    setName: function(name){
        this.comboDatas.forEach(function(item, index){
            if(item.name === name){
                this.selectItem(index);
                return;
            }
        }.bind(this));
    }
});

compMgr.regComp({
	comp: Combo,
	compAsString: 'u.Combo',
	css: 'u-combo'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {Combo};
