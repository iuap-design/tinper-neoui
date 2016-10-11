import {extend} from 'tinper-sparrow/js/extend';
import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {env} from 'tinper-sparrow/js/env';
import {on,off,trigger,stopEvent} from 'tinper-sparrow/js/event';
import {addClass,removeClass,makeDOM,showPanelByEle,getZIndex} from 'tinper-sparrow/js/dom';
import {compMgr} from 'tinper-sparrow/js/compMgr';


var Time = BaseComponent.extend({
		DEFAULTS : {
		},
		init:function(){
			var self = this;			 
			var element = this.element;
			this.options = extend({}, this.DEFAULTS, this.options);
			this.panelDiv = null;
			this.input = this.element.querySelector("input");
			addClass(this.element,'u-text');
			
			
	        on(this.input, 'blur',function(e){
	        	self._inputFocus = false;
	        	this.setValue(this.input.value);
	        }.bind(this));
			
			// 添加focus事件
			this.focusEvent();
			// 添加右侧图标click事件
			this.clickEvent();
		}
	})

	

	Time.fn = Time.prototype;

	Time.fn.createPanel = function(){
		if(this.panelDiv)
			return;
		var oThis = this;
		this.panelDiv = makeDOM('<div class="u-date-panel" style="padding:0px;"></div>');
		this.panelContentDiv = makeDOM('<div class="u-time-content"></div>');
		this.panelDiv.appendChild(this.panelContentDiv);
		this.panelHourDiv = makeDOM('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelHourDiv);
		this.panelHourInput = makeDOM('<input class="u-time-input">');
		this.panelHourDiv.appendChild(this.panelHourInput);
		this.panelMinDiv = makeDOM('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelMinDiv);
		this.panelMinInput = makeDOM('<input class="u-time-input">');
		this.panelMinDiv.appendChild(this.panelMinInput);
		this.panelSecDiv = makeDOM('<div class="u-time-cell"></div>');
		this.panelContentDiv.appendChild(this.panelSecDiv);
		this.panelSecInput = makeDOM('<input class="u-time-input">');
		this.panelSecDiv.appendChild(this.panelSecInput);
		this.panelNavDiv = makeDOM('<div class="u-time-nav"></div>');
		this.panelDiv.appendChild(this.panelNavDiv);
		this.panelOKButton = makeDOM('<button class="u-button" style="float:right;">OK</button>');
		this.panelNavDiv.appendChild(this.panelOKButton);
		on(this.panelOKButton,'click',function(){
			var v = oThis.panelHourInput.value + ':' + oThis.panelMinInput.value + ':' + oThis.panelSecInput.value;
			oThis.setValue(v);
			oThis.hide();
		})
		this.panelCancelButton = makeDOM('<button class="u-button" style="float:right;">Cancel</button>');
		this.panelNavDiv.appendChild(this.panelCancelButton);
		on(this.panelCancelButton,'click',function(){
			oThis.hide();
		})
		
		var d = new Date();
		this.panelHourInput.value = d.getHours() > 9? '' + d.getHours():'0' + d.getHours();
		this.panelMinInput.value = d.getMinutes() > 9? '' + d.getMinutes():'0' + d.getMinutes();	
		this.panelSecInput.value = d.getSeconds() > 9? '' + d.getSeconds():'0' + d.getSeconds();
		
	}
	
	Time.fn.setValue = function(value) {
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
	
	Time.fn.focusEvent = function() {
		var self = this;
		on(this.input,'focus', function(e) {
			self._inputFocus = true;
			self.show(e);
			stopEvent(e);
		});
	}
	
	//下拉图标的点击事件
	Time.fn.clickEvent = function() {
		var self = this;		
		var caret = this.element.nextSibling
		on(caret,'click',function(e) {
			self.input.focus();
        	stopEvent(e);
		})
	}


	Time.fn.show = function(evt) {

		var inputValue = this.input.value;
		this.setValue(inputValue);
		
		var oThis = this;
		this.createPanel();
		
		/*因为元素可能变化位置，所以显示的时候需要重新计算*/
		this.width = this.element.offsetWidth;
		if(this.width < 300)
			this.width = 300;
		
		this.panelDiv.style.width = this.width + 'px';
		this.panelDiv.style.maxWidth = this.width + 'px';
		if(this.options.showFix){
			document.body.appendChild(this.panelDiv);
    		this.panelDiv.style.position = 'fixed';
    		showPanelByEle({
	            ele:this.input,
	            panel:this.panelDiv,
	            position:"bottomLeft"
	        });
    	}else{
    		// this.element.parentNode.appendChild(this.panelDiv);
    		// //调整left和top
		    // this.left = this.element.offsetLeft;
		    // var inputHeight = this.element.offsetHeight;
		    // this.top = this.element.offsetTop + inputHeight;
		    // this.panelDiv.style.left = this.left + 'px';
		    // this.panelDiv.style.top = this.top + 'px';

		    var bodyWidth = document.body.clientWidth,bodyHeight = document.body.clientHeight,
            panelWidth = this.panelDiv.offsetWidth,panelHeight = this.panelDiv.offsetHeight;

            this.element.appendChild(this.panelDiv);
            this.element.style.position = 'relative'; 
       		this.left = this.input.offsetLeft;
        	var inputHeight = this.input.offsetHeight;
        	this.top = this.input.offsetTop + inputHeight;

            if(this.left + panelWidth > bodyWidth){
                this.left = bodyWidth - panelWidth;
            }

            if((this.top + panelHeight) > bodyHeight){
                this.top = bodyHeight - panelHeight;
            }
        

            this.panelDiv.style.left = this.left + 'px';
            this.panelDiv.style.top = this.top + 'px';
    	}
		
		this.panelDiv.style.zIndex = getZIndex();
        addClass(this.panelDiv, 'is-visible');

        var callback = function (e) {
            if (e !== evt && e.target !== this.input && !oThis.clickPanel(e.target) && oThis._inputFocus != true) {
            	off(document,'click',callback);
                // document.removeEventListener('click', callback);
                this.hide();
            }
        }.bind(this);
        on(document,'click',callback);
        // document.addEventListener('click', callback);
	}
	
	Time.fn.clickPanel = function(dom){
		while(dom){
			if(dom == this.panelDiv){
				return true
			}else{
				dom = dom.parentNode;
			}
		}
		return false;
	}

	Time.fn.hide = function() {
		removeClass(this.panelDiv, 'is-visible');
        this.panelDiv.style.zIndex = -1;
	}


compMgr.regComp({
	comp: Time,
	compAsString: 'u.Time',
	css: 'u-time'
})
if(env.isIE8){
	compMgr.regComp({
		comp: Time,
		compAsString: 'u.ClockPicker',
		css: 'u-clockpicker'
	})
}

if(document.readyState && document.readyState === 'complete') {
    compMgr.updateComp();
} else {
    on(window, 'load', function() {
        //扫描并生成控件
        compMgr.updateComp();
    });
}	
	
export { Time };


