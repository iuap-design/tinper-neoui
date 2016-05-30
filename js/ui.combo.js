/**
 * Created by dingrf on 2015-11-20.
 */

u.Combo = u.BaseComponent.extend({
    init: function () {
        this.mutilSelect = this.options['mutilSelect'] || false;
        if (u.hasClass(this.element, 'mutil-select')){
            this.mutilSelect = true
        }

        this.onlySelect = this.options['onlySelect'] || false;
        if(this.mutilSelect)
            this.onlySelect = true;

        this.comboDatas = [];
        var i, option, datas = [], self = this;
        //u.addClass(this.element, 'u-text')
        new u.Text(this.element);
        var options = this.element.getElementsByTagName('option');
        for (i = 0; i < options.length; i++) {
            option = options[i];
            datas.push({value: option.value, name: option.text});
        }

        this.setComboData(datas);
        this._input = this.element.querySelector("input");
        if(this.onlySelect){
            setTimeout(function(){
                self._input.setAttribute('readonly','readonly');
            },1000);
            
        }else{
            u.on(this._input, 'blur', function(e){
                var v = this.value;
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
        u.on(this._input, 'focus', function (e) {
            self._inputFocus = true;
            self.show(e);
            u.stopEvent(e);
        })
        u.on(this._input, 'blur', function(e){
            self._inputFocus = false;
        })
        this.iconBtn = this.element.querySelector("[data-role='combo-button']");
        if (this.iconBtn){
            u.on(this.iconBtn, 'click', function(e){
                self.show(e);
                u.stopEvent(e);
            })
        }
    },

    show: function (evt) {
        var self = this,width=this.element.offsetWidth;
        u.showPanelByEle({
            ele:this._input,
            panel:this._ul,
            position:"bottomLeft"
        });
	this._ul.style.width = width + 'px';
        u.addClass(this._ul, 'is-animating');
        this._ul.style.zIndex = u.getZIndex();
        u.addClass(this._ul, 'is-visible');

        var callback = function (e) {
            if(e === evt || e.target === this._input || self._inputFocus == true) return;
            if(this.mutilSelect && (u.closest(e.target,'u-combo-ul') === self._ul || u.closest(e.target, 'u-combo-name-par') || u.closest(e.target, 'u-combo-name')) ) return;
            u.off(document,'click',callback);
            // document.removeEventListener('click', callback);
            this.hide();
        }.bind(this);
        u.on(document,'click',callback);
        // document.addEventListener('click', callback);

    },

    hide: function () {
        u.removeClass(this._ul, 'is-visible');
        this._ul.style.zIndex = -1;
        this.trigger('select', {value: this.value});
    },

    /**
     * 设置下拉数据
     * @param datas  数据项
     * @param options  指定name value对应字段 可以为空
     */
    setComboData: function (datas, options) {
        var i, li, self = this;
        if (!options)
            this.comboDatas = datas;
        else{
            this.comboDatas = []
            for(var i = 0; i< datas.length; i++){
                this.comboDatas.push({name:datas[i][options.name],value:datas[i][options.value]});
            }
        }
        if (!this._ul) {
            this._ul = u.makeDOM('<ul class="u-combo-ul"></ul>');
            // this.element.parentNode.appendChild(this._ul);
            document.body.appendChild(this._ul);
        }
        this._ul.innerHTML = '';
        //TODO 增加filter
        for (i = 0; i < this.comboDatas.length; i++) {
            li = u.makeDOM('<li class="u-combo-li">' + this.comboDatas[i].name + '</li>');//document.createElement('li');
            li._index = i;
            u.on(li, 'click', function () {
                self.selectItem(this._index);
            })
            var rippleContainer = document.createElement('span');
            u.addClass(rippleContainer, 'u-ripple');
            li.appendChild(rippleContainer);
            new URipple(li)
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
            if (index != -1){ // 已经选中
                this.value = this.value.substring(0,index) + this.value.substring(index + l)  
                flag = '-' 
            }else{
                this.value = (!this.value) ? val + ',' : this.value + val + ',';
                flag = '+'
            }
            
            if(flag == '+'){
                var nameDiv= u.makeDOM('<div class="u-combo-name" key="' + val + '">'+ name + /*<a href="javascript:void(0)" class="remove">x</a>*/'</div>');
                var parNameDiv=u.makeDOM('<div class="u-combo-name-par" style="position:absolute"></div>');
                /*var _a = nameDiv.querySelector('a');
                u.on(_a, 'click', function(){
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
                }
                this._combo_name_par.appendChild(nameDiv);
            }else{
                if(this._combo_name_par){
                    var comboDiv = this._combo_name_par.querySelector('[key="'+val+'"]');
                    if(comboDiv)
                        comboDiv.remove();
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
                    u.addClass(lis[i], 'is-selected');
                } else {
                    u.removeClass(lis[i], 'is-selected');
                }
            }
            /*根据多选区域div的高度调整input的高度*/
            var h = this._combo_name_par.offsetHeight;
            if(h < 25)
                h = 25
            this._input.style.height = h + 'px';
        } else {
            for(var i=0;i<lis.length;i++) {
                if(this.value == this.comboDatas[i].value) {
                    u.addClass(lis[i], 'is-selected');
                } else {
                    u.removeClass(lis[i], 'is-selected');
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
        }
        this.comboDatas.forEach(function(item, index){
            if (this.mutilSelect === true){
                if (values.indexOf(item.value) != -1){
                    this.selectItem(index)
                }
            }else {
                if (item.value === value) {
                    this.selectItem(index);
                    return;
                }
            }
        }.bind(this));
        if(!this.onlySelect){
            this.value = value;
            this.trigger('select', {value: this.value, name: this._input.value});
        }
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

u.compMgr.regComp({
    comp: u.Combo,
    compAsString: 'u.Combo',
    css: 'u-combo'
})