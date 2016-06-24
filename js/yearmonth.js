u.YearMonth = u.BaseComponent.extend({
		DEFAULTS : {
		},
		init:function(){
			var self = this;			 
			var element = this.element;
			this.options = u.extend({}, this.DEFAULTS, this.options);
			this.panelDiv = null;
			this.input = this.element.querySelector("input");
			//u.addClass(this.element,'u-text');
			
			var d = new Date();
			this.year = d.getFullYear();
			this.startYear = this.year - this.year % 10 - 1;
			this.month = d.getMonth() + 1;
			
			u.on(this.input, 'blur',function(e){
	        	this.setValue(this.input.value);
	        }.bind(this));
	        
			// 添加focus事件
			this.focusEvent();
			// 添加右侧图标click事件
			this.clickEvent();
		}
	})

	

u.YearMonth.fn = u.YearMonth.prototype;

u.YearMonth.fn.createPanel = function(){
	if(this.panelDiv){
		this._fillYear();
		return;
	}
	var oThis = this;
	this.panelDiv = u.makeDOM('<div class="u-date-panel" style="padding:0px;margin:0px;"></div>');
	this.panelContentDiv = u.makeDOM('<div class="u-date-content"></div>');
	this.panelDiv.appendChild(this.panelContentDiv);
	
	// this.preBtn = u.makeDOM('<button class="u-date-pre-button u-button flat floating mini" style="display:none;">&lt;</button>');
    // this.nextBtn = u.makeDOM('<button class="u-date-next-button u-button flat floating mini" style="display:none;">&gt;</button>');
	this.preBtn = u.makeDOM('<button class="u-date-pre-button u-button mini">&lt;</button>');
    this.nextBtn = u.makeDOM('<button class="u-date-next-button u-button mini">&gt;</button>');
    
	u.on(this.preBtn, 'click', function(e){
        oThis.startYear -= 10;
        oThis._fillYear();
    });
    u.on(this.nextBtn, 'click', function(e){
        oThis.startYear += 10;
        oThis._fillYear();
    });
    this.panelContentDiv.appendChild(this.preBtn);
    this.panelContentDiv.appendChild(this.nextBtn);
    this._fillYear();
	this.element.parentNode.appendChild(this.panelDiv);
}

/**
 *填充年份选择面板
 * @private
 */
u.YearMonth.fn._fillYear = function(type){
    var oldPanel,year,template,yearPage,titleDiv,yearDiv, i,cell;
    oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
    if(oldPanel)
        this.panelContentDiv.removeChild(oldPanel);
    template = ['<div class="u-date-content-page">',
                    '<div class="u-date-content-title"></div>',
                    '<div class="u-date-content-panel"></div>',
                '</div>'].join("");
    yearPage = u.makeDOM(template);
    titleDiv = yearPage.querySelector('.u-date-content-title');
    titleDiv.innerHTML = (this.startYear) + '-' + (this.startYear + 11);
    yearDiv = yearPage.querySelector('.u-date-content-panel');
    for(i = 0; i < 12; i++){
        cell = u.makeDOM('<div class="u-date-content-year-cell">'+ (this.startYear + i) +'</div>');
        new URipple(cell);
        if (this.startYear + i == this.year){
            u.addClass(cell, 'current');
        }
        cell._value = this.startYear + i;
        yearDiv.appendChild(cell);
    }
    var oThis = this;
    u.on(yearDiv, 'click', function(e){
        var _y = e.target._value;
        oThis.year = _y;
        oThis._fillMonth();
        u.stopEvent(e);
    });
	
	this.preBtn.style.display = 'block';
	this.nextBtn.style.display = 'block';
	// this._zoomIn(yearPage);
	this.panelContentDiv.appendChild(yearPage);
	this.contentPage = yearPage;
    this.currentPanel = 'year';
};

/**
 * 填充月份选择面板
 * @private
 */
u.YearMonth.fn._fillMonth = function(){
    var oldPanel,template,monthPage,_month,cells,i;
    oldPanel = this.panelContentDiv.querySelector('.u-date-content-page');
    if(oldPanel)
    	this.panelContentDiv.removeChild(oldPanel);
    _month = this.month;
    template = ['<div class="u-date-content-page">',
        '<div class="u-date-content-title">'+_month+'月</div>',
        '<div class="u-date-content-panel">',
            '<div class="u-date-content-year-cell">1月</div>',
            '<div class="u-date-content-year-cell">2月</div>',
            '<div class="u-date-content-year-cell">3月</div>',
            '<div class="u-date-content-year-cell">4月</div>',
            '<div class="u-date-content-year-cell">5月</div>',
            '<div class="u-date-content-year-cell">6月</div>',
            '<div class="u-date-content-year-cell">7月</div>',
            '<div class="u-date-content-year-cell">8月</div>',
            '<div class="u-date-content-year-cell">9月</div>',
            '<div class="u-date-content-year-cell">10月</div>',
            '<div class="u-date-content-year-cell">11月</div>',
            '<div class="u-date-content-year-cell">12月</div>',
        '</div>',
        '</div>'].join("");

    monthPage = u.makeDOM(template);
    cells =monthPage.querySelectorAll('.u-date-content-year-cell');
    for (i = 0; i < cells.length; i++){
        if (_month == i + 1){
            u.addClass(cells[i],'current');
        }
        cells[i]._value = i + 1;
        new URipple(cells[i]);
    }
    var oThis = this;
    u.on(monthPage, 'click', function(e){
        var _m = e.target._value;
        oThis.month = _m;
        monthPage.querySelector('.u-date-content-title').innerHTML = _m + '月';
        oThis.setValue(oThis.year + '-' + oThis.month);
        oThis.hide();
    });
    
    this.preBtn.style.display = 'none';
	this.nextBtn.style.display = 'none';
	this._zoomIn(monthPage);
    this.currentPanel = 'month';
};


/**
 * 淡入动画效果
 * @private
 */
u.YearMonth.fn._zoomIn = function(newPage){
    if (!this.contentPage){
        this.panelContentDiv.appendChild(newPage);
        this.contentPage = newPage;
        return;
    }
    u.addClass(newPage, 'zoom-in');
    this.panelContentDiv.appendChild(newPage);
    if(u.isIE8){
        this.contentPage = newPage;
    }else{
        var cleanup = function() {
            newPage.removeEventListener('transitionend', cleanup);
            newPage.removeEventListener('webkitTransitionEnd', cleanup);
            // this.panelContentDiv.removeChild(this.contentPage);
            this.contentPage = newPage;
        }.bind(this);
        if (this.contentPage){
            newPage.addEventListener('transitionend', cleanup);
            newPage.addEventListener('webkitTransitionEnd', cleanup);
        }
        window.requestAnimationFrame(function() {
                u.addClass(this.contentPage, 'is-hidden');
                u.removeClass(newPage, 'zoom-in');
        }.bind(this));
    }
    
};


u.YearMonth.fn.setValue = function(value) {
	value = value? value: '';
	if(value && value.indexOf('-') > -1){
		var vA = value.split("-");
		this.year = vA[0];
		var month = vA[1];
		this.month = month % 12;
		if(this.month == 0)
			this.month = 12;
	
		value = this.year + '-' + this.month;
	}
	this.value = value;
	this.input.value = value;
	this.trigger('valueChange', {value:value})
}

u.YearMonth.fn.focusEvent = function() {
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
u.YearMonth.fn.clickEvent = function() {
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


u.YearMonth.fn.show = function(evt) {
	var oThis = this;
	if(this.value && this.value.indexOf('-') > -1){
		var vA = this.value.split("-");
		this.year = vA[0];
		var month = vA[1];
		this.month = month % 12;
		if(this.month == 0)
			this.month = 12;
	}
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

     document.body.onscroll = function(){
        u.showPanelByEle({
            ele:oThis.input,
            panel:oThis.panelDiv,
            position:"bottomLeft"
        });
    }
	this.panelDiv.style.zIndex = u.getZIndex();
    u.addClass(this.panelDiv, 'is-visible');
    var oThis = this;
    var callback = function (e) {
        if (e !== evt && e.target !== oThis.input && !oThis.clickPanel(e.target)) {
            // document.removeEventListener('click', callback);
            u.off(document,'click',callback);
        	oThis.hide();
    	}
    };
    u.on(document,'click',callback);
    // document.addEventListener('click', callback);
}

u.YearMonth.fn.clickPanel = function(dom){
	while(dom){
		if(dom == this.panelDiv){
			return true
		}else{
			dom = dom.parentNode;
		}
	}
	return false;
}

u.YearMonth.fn.hide = function() {
	u.removeClass(this.panelDiv, 'is-visible');
    this.panelDiv.style.zIndex = -1;
}

if (u.compMgr)

u.compMgr.regComp({
	comp: u.YearMonth,
	compAsString: 'u.YearMonth',
	css: 'u-yearmonth'
})

