u.Time = u.BaseComponent.extend({
		DEFAULTS : {
		},
		init:function(){
			var self = this;			 
			var element = this.element;
			this.options = u.extend({}, this.DEFAULTS, this.options);
			this.panelDiv = null;
			this.input = this.element.querySelector("input");
			u.addClass(this.element,'u-text');
			
			
	        u.on(this.input, 'blur',function(e){
	        	this.setValue(this.input.value);
	        }.bind(this));
			
			// 添加focus事件
			this.focusEvent();
			// 添加右侧图标click事件
			this.clickEvent();
		}
	})

	

	u.Time.fn = u.Time.prototype;

	u.Time.fn.createPanel = function(){
		if(this.panelDiv)
			return;
		var oThis = this;
		this.panelDiv = u.makeDOM('<div class="u-combo-ul" style="padding:0px;"></div>');
		this.panelContentDiv = u.makeDOM('<div class="u-time-content"></div>');
		this.panelDiv.appendChild(this.panelContentDiv);
		this.panelHourDiv = u.makeDOM('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelHourDiv);
		this.panelHourInput = u.makeDOM('<input class="u-time-input">');
		this.panelHourDiv.appendChild(this.panelHourInput);
		this.panelMinDiv = u.makeDOM('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelMinDiv);
		this.panelMinInput = u.makeDOM('<input class="u-time-input">');
		this.panelMinDiv.appendChild(this.panelMinInput);
		this.panelSecDiv = u.makeDOM('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelSecDiv);
		this.panelSecInput = u.makeDOM('<input class="u-time-input">');
		this.panelSecDiv.appendChild(this.panelSecInput);
		this.panelNavDiv = u.makeDOM('<div class="u-time-nav"></div>');
		this.panelDiv.appendChild(this.panelNavDiv);
		this.panelOKButton = u.makeDOM('<button class="u-button" style="float:right;">OK</button>');
		this.panelNavDiv.appendChild(this.panelOKButton);
		u.on(this.panelOKButton,'click',function(){
			var v = oThis.panelHourInput.value + ':' + oThis.panelMinInput.value + ':' + oThis.panelSecInput.value;
			oThis.setValue(v);
			oThis.hide();
		})
		this.panelCancelButton = u.makeDOM('<button class="u-button" style="float:right;">Cancel</button>');
		this.panelNavDiv.appendChild(this.panelCancelButton);
		u.on(this.panelCancelButton,'click',function(){
			oThis.hide();
		})
		
		var d = new Date();
		this.panelHourInput.value = d.getHours() > 9? '' + d.getHours():'0' + d.getHours();
		this.panelMinInput.value = d.getMinutes() > 9? '' + d.getMinutes():'0' + d.getMinutes();	
		this.panelSecInput.value = d.getSeconds() > 9? '' + d.getSeconds():'0' + d.getSeconds();
		this.element.parentNode.appendChild(this.panelDiv);
	}
	
	u.Time.fn.setValue = function(value) {
		var hour = '',min = '', sec = '';
		value = value? value: '';
		if (value == this.input.value) return;
		if(value && value.indexOf(':') > -1){
			var vA = value.split(":");
			var hour = vA[0];
			hour = hour % 24;
			hour = hour > 9 ?'' + hour : '0' + hour;
			var min = vA[1];
			min = min % 60;
			min = min > 9 ?'' + min : '0' + min;
			var sec = vA[2];
			sec = sec % 60;
			sec = sec > 9 ?'' + sec : '0' + sec;
			
			value = hour + ':' + min + ':' + sec;
		}
		this.input.value = value;
		this.createPanel();
		
		this.panelHourInput.value = hour;
		this.panelMinInput.value = min;	
		this.panelSecInput.value = sec;
		this.trigger('valueChange', {value:value})
	}
	
	u.Time.fn.focusEvent = function() {
		var self = this;
		u.on(this.element,'click', function(e) {
			self.show(e);

			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}

		});
	}
	
	//下拉图标的点击事件
	u.Time.fn.clickEvent = function() {
		var self = this;		
		var caret = this.element.nextSibling
		u.on(caret,'click',function(e) {
			self.show(e);
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}

		})
	}


	u.Time.fn.show = function(evt) {

		var inputValue = this.input.value;
		this.setValue(inputValue);
		
		var oThis = this;
		this.createPanel();
		
		/*因为元素可能变化位置，所以显示的时候需要重新计算*/
		this.width = this.element.offsetWidth;
		if(this.width < 300)
			this.width = 300;
		
		this.panelDiv.style.width = this.width + 'px';
		u.showPanelByEle({
            ele:this.input,
            panel:this.panelDiv,
            position:"bottomLeft"
        });
		this.panelDiv.style.zIndex = u.getZIndex();
        u.addClass(this.panelDiv, 'is-visible');

        document.body.onscroll = function(){
            u.showPanelByEle({
                ele:oThis.input,
                panel:oThis.panelDiv,
                position:"bottomLeft"
            });
        }
        
        var callback = function (e) {
            if (e !== evt && e.target !== this.input && !oThis.clickPanel(e.target)) {
            	u.off(document,'click',callback);
                // document.removeEventListener('click', callback);
                this.hide();
            }
        }.bind(this);
        u.on(document,'click',callback);
        // document.addEventListener('click', callback);
	}
	
	u.Time.fn.clickPanel = function(dom){
		while(dom){
			if(dom == this.panelDiv){
				return true
			}else{
				dom = dom.parentNode;
			}
		}
		return false;
	}

	u.Time.fn.hide = function() {
		u.removeClass(this.panelDiv, 'is-visible');
        this.panelDiv.style.zIndex = -1;
	}

	if (u.compMgr){
		u.compMgr.regComp({
			comp: u.Time,
			compAsString: 'u.Time',
			css: 'u-time'
		})
		if(u.isIE8){
			u.compMgr.regComp({
				comp: u.Time,
				compAsString: 'u.ClockPicker',
				css: 'u-clockpicker'
			})
		}
	}
	
	



