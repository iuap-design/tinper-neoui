
u.MDLayout = u.BaseComponent.extend({
	_CssClasses: {
	MASTER: 'u-mdlayout-master',
	DETAIL: 'u-mdlayout-detail',
	PAGE: 'u-mdlayout-page',
	PAGE_HEADER: 'u-mdlayout-page-header',
	PAGE_SECTION: 'u-mdlayout-page-section',
	PAGE_FOOTER: 'u-mdlayout-page-footer'
},
	init: function(){
		//this.browser = _getBrowserInfo();
		var me = this;
		this.minWidth = 600;
		//this.options = $.extend({}, MDLayout.DEFAULTS, options)
		//this.$element.css('position','relative').css('width','100%').css('height','100%').css('overflow','hidden')
		this._master =  this.element.querySelector('.' + this._CssClasses.MASTER);
		this._detail =  this.element.querySelector('.' + this._CssClasses.DETAIL);

		//this.$master.css('float','left').css('height','100%')
		//this.$detail.css('height','100%').css('overflow','hidden').css('position','relative');

		this.masterWidth = this._master.offsetWidth;
		this.detailWidth = this._detail.offsetWidth;
		this.mPages = this._master.querySelectorAll('.' + this._CssClasses.PAGE);
		this.dPages = this._detail.querySelectorAll('.' + this._CssClasses.PAGE);
		this.mPageMap = {};
		this.dPageMap = {};
		this.initPages(this.mPages, 'master');
		this.initPages(this.dPages, 'detail');

		this.mHistory = [];
		this.dHistory = [];
		this.isNarrow = null;
		this.response();
		u.on(window, 'resize', function(){
			me.response();
		})
	},

initPages: function(pages, type){
	var pageMap,pWidth;
	if (type === 'master'){
		pageMap = this.mPageMap;
		pWidth = this.masterWidth;
	}else{
		pageMap = this.dPageMap;
		pWidth = this.detailWidth;
	}
	for (var i = 0; i< pages.length; i++){
		var pid = pages[i].getAttribute('id');
		if (!pid)
			throw new Error('u-mdlayout-page mast have id attribute')
		pageMap[pid] = pages[i];
		if (i === 0){
			if (type === 'master')
				this.current_m_pageId = pid;
			else
				this.current_d_pageId = pid;
			u.addClass(pages[i],'current');
			//pages[i].style.transform = 'translate3d('+ pWidth +'px,0,0)';
			pages[i].style.transform = 'translate3d(0,0,0)';
		}else{
			pages[i].style.transform = 'translate3d('+ pWidth +'px,0,0)';
		}
		if (u.isIE8 || u.isIE9){
			u.addClass(pages[i],'let-ie9');
		}
	}
},




//	MDLayout.DEFAULTS = {
//		minWidth: 600,
////		masterFloat: false,
//		afterNarrow:function(){},
//		afterUnNarrow:function(){},
//		afterMasterGo:function(pageId){},
//		afterMasterBack:function(pageId){},
//		afterDetailGo:function(pageId){},
//		afterDetailBack:function(pageId){}
//	}

response: function() {
	var totalWidth = this.element.offsetWidth;
	if (totalWidth < this.minWidth){
		if (this.isNarrow == null || this.isNarrow == false)
			this.isNarrow = true
		this.hideMaster()
	}
	else{
		if (this.isNarrow == null || this.isNarrow == true)
			this.isNarrow = false
		this.showMaster()
	}
	this.calcWidth();

},

calcWidth: function(){
	if (!(u.isIE8 || u.isIE9)){
		this.detailWidth = this._detail.offsetWidth;
		this.masterWidth = this._master.offsetWidth;
		//TODO this.mHistory中的panel应该置为-值
		for (var i = 0; i<this.dPages.length; i++){
			var pid = this.dPages[i].getAttribute('id');
			if (pid !== this.current_d_pageId){
				this.dPages[i].style.transform = 'translate3d('+ this.detailWidth +'px,0,0)';
			}
		}
		//this.$detail.find('[data-role="page"]').css('transform','translate3d('+ this.detailWidth +'px,0,0)')
		//this.$detail.find('#' + this.current_d_pageId).css('transform','translate3d(0,0,0)')
	}

},

mGo: function(pageId) {
	if (this.current_m_pageId == pageId) return;
	this.mHistory.push(this.current_m_pageId);
	_hidePage(this.mPageMap[this.current_m_pageId],this,'-' + this.masterWidth)
	this.current_m_pageId = pageId
	_showPage(this.mPageMap[this.current_m_pageId],this)
},

mBack: function() {
	if (this.mHistory.length == 0) return;
	_hidePage(this.mPageMap[this.current_m_pageId],this,this.masterWidth)
	this.current_m_pageId = this.mHistory.pop();
	_showPage(this.mPageMap[this.current_m_pageId],this)
},

dGo: function(pageId) {
	if (this.current_d_pageId == pageId) return;
	this.dHistory.push(this.current_d_pageId);
	_hidePage(this.dPageMap[this.current_d_pageId],this,'-' + this.detailWidth)
	this.current_d_pageId = pageId
	_showPage(this.dPageMap[this.current_d_pageId],this)
},

dBack: function() {
	if (this.dHistory.length == 0) return;
	_hidePage(this.dPageMap[this.current_d_pageId],this,this.detailWidth)
	this.current_d_pageId = this.dHistory.pop();
	_showPage(this.dPageMap[this.current_d_pageId],this)
},

showMaster: function() {
	if (u.isIE8 || u.isIE9)
		this._master.style.display = 'block';
	else{
		this._master.style.transform = 'translate3d(0,0,0)';
	}
	if (!this.isNarrow)
		this._master.style.position = 'relative';
},

hideMaster: function() {
	if (this._master.offsetLeft < 0 || this._master.style.display == 'none')
		return;
	if (u.isIE8 || u.isIE9)
		this._master.style.display = 'none';
	else{
		this._master.style.transform = 'translate3d(-'+ this.masterWidth +'px,0,0)';
	}
	this._master.style.position = 'absolute';
	this._master.style.zIndex = 5;
	this.calcWidth()
}
});

/**
 * masterFloat属性只有在宽屏下起作用，为true时，master层浮动于detail层之上
 *
 */
//	MDLayout.fn.setMasterFloat = function(float){
//		this.masterFloat = float;
//
//	}

//function _getBrowserInfo(){
//	var browser = {};
//	var ua = navigator.userAgent.toLowerCase();
//	var s;
//	(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? browser.ie = parseInt(s[1]) :
//			(s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] :
//					(s = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
//							(s = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
//									(s = ua.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
//											(s = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
//	return browser;
//}

function _showPage(el,me){
	u.addClass(el,'current');
	if (!(u.isIE8 || u.isIE9))
		el.style.transform = 'translate3d(0,0,0)';
}

function _hidePage(el,me,width){
	u.removeClass(el,'current');
	if (!(u.isIE8 || u.isIE9))
		el.style.transform = 'translate3d('+ width +'px,0,0)';
}


u.compMgr.regComp({
	comp: u.MDLayout,
	compAsString: 'u.MDLayout',
	css: 'u-mdlayout'
});


