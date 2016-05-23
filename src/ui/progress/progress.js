u.Progress = u.BaseComponent.extend({
	_Constant: {},
	_CssClasses: {
		INDETERMINATE_CLASS: 'u-progress__indeterminate'
	},
	setProgress: function(p) {
		
		if (u.hasClass(this.element,this._CssClasses.INDETERMINATE_CLASS)) {
			return;
		}

		this.progressbar_.style.width = p + '%';
		return this;
	},
	setBuffer: function(p) {
		this.bufferbar_.style.width = p + '%';
		this.auxbar_.style.width = (100 - p) + '%';
		return this;
	},

	init: function() {
		var el = document.createElement('div');
		el.className = 'progressbar bar bar1';
		this.element.appendChild(el);
		this.progressbar_ = el;

		el = document.createElement('div');
		el.className = 'bufferbar bar bar2';
		this.element.appendChild(el);
		this.bufferbar_ = el;

		el = document.createElement('div');
		el.className = 'auxbar bar bar3';
		this.element.appendChild(el);
		this.auxbar_ = el;

		this.progressbar_.style.width = '0%';
		this.bufferbar_.style.width = '100%';
		this.auxbar_.style.width = '0%';

		u.addClass(this.element,'is-upgraded');

		if(u.isIE8 || u.isIE9){

			if (u.hasClass(this.element,this._CssClasses.INDETERMINATE_CLASS)) {
				var p = 0;
				var oThis = this;
				setInterval(function(){
					p += 5;
					p = p % 100;
					oThis.progressbar_.style.width = p + '%';
				},100)
			}
		}
			
	}

});


u.compMgr.regComp({
	comp: u.Progress,
	compAsString: 'u.Progress',
	css: 'u-progress'
})