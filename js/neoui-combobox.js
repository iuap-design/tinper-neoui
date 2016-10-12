/**
 * Module : neoui-combobox
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 18:42:07
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,removeClass,hasClass,getStyle} from 'tinper-sparrow/js/dom';
import {on,stopEvent,trigger} from 'tinper-sparrow/js/event';
import {extend} from 'tinper-sparrow/js/extend';
import {env} from 'tinper-sparrow/js/env';
import {compMgr} from 'tinper-sparrow/js/compMgr';


var Combobox = BaseComponent.extend({
		DEFAULTS : {
			dataSource:{},
			mutil: false,
			enable: true,
			single: true,
			onSelect: function() {}
		},
		init:function(){
			var self = this;			 
			var element = this.element;
			this.options = extend({}, this.DEFAULTS, this.options);
			this.items = [];
			//this.oLis = [];
			this.mutilPks = [];
			this.oDiv = null;
			Object.defineProperty(element, 'value', {
				get: function() {

					return this.trueValue;
				},
				set: function(pk) {

					var items = self.items;
					//var oLis = self.oLis;
					var oLis = self.oDiv.childNodes;

					if (self.options.single == "true" || self.options.single == true ) {

						for (var i = 0, length = items.length; i < length; i++) {

							var ipk = items[i].pk;
							if (ipk == pk) {
								this.innerHTML = items[i].name;
								this.trueValue = pk;
								break;
							} else {

								this.trueValue = '';
								this.innerHTML = '';
							}

						}

					} else if (self.options.mutil == "true" || self.options.mutil == true) {
						
						if(!env.isArray(pk) ){
							if(typeof pk == "string" && pk !== ""){                   		
								pk = pk.split(',');
								self.mutilPks = pk;
							}else{
								return
							}
						}
						
						if (self.mutilPks.length == 0) {
							self.mutilPks = pk;
						}

						this.innerHTML = '';
						var valueArr = [];

						for (var j = 0; j < pk.length; j++) {

							for (var i = 0, length = oLis.length; i < length; i++) {
								var ipk = oLis[i].item.pk;
								if (pk[j] == ipk) {

									valueArr.push(pk[j]);

									oLis[i].style.display = 'none';
									var activeSelect = document.createElement("Div")
									activeSelect.className = "mutil-select-div"
									var selectName = "<i class='itemName'>" + items[i].name + "</i>"																	
									var imageFont = "<i class='uf uf-removesymbol'></i>"
									activeSelect.insertAdjacentHTML("beforeEnd",imageFont+selectName); 
									this.appendChild(activeSelect);
									    
									//activeSelect.append(imageFont);
								//	activeSelect.append(selectName);
								
									on(activeSelect.querySelector(".uf-removesymbol"),'mousedown', function() {

										//var $this = $(this);
										//var lis = self.oLis;
										//var lis = $(self.oDiv).find('li');
										var lis = self.oDiv.childNodes;
										for (var j = 0, len = lis.length; j < len; j++) {
											if (lis[j].item.name == this.nextSibling.innerHTML) {
												lis[j].style.display = 'block';

												for (var h = 0; h < self.mutilPks.length; h++) {
													if (self.mutilPks[h] == lis[j].item.pk) {
														self.mutilPks.splice(h, 1);
														h--;
													}
												}

												for (var b = 0; b < valueArr.length; b++) {
													if (valueArr[b] == lis[j].item.pk) {
														valueArr.splice(b, 1);
														b--;
													}
												}

											}
										}

										activeSelect.removeChild(this.parentNode);
										element.trueValue = '';
										element.trueValue = valueArr.toString();
										trigger(element,'mutilSelect',valueArr.toString())
									});



								//	var selectName = $("<i class='itemName'>" + items[i].name + "</i>");

								//	var activeSelect = $("<div class='mutil-select-div'></div>")

									

									


								}

							}


						}

						this.trueValue = valueArr.toString();
						

					}


				}
			})
			//禁用下拉框
			if(this.options.readonly === "readonly")return;
			
			if (this.options.single == "true" || this.options.single == true) {
				this.singleSelect()
			}

			if (this.options.mutil == "true" || this.options.mutil == true) {
				this.mutilSelect();
			}
			
			this.clickEvent();

			this.blurEvent();
			
			this.comboFilter();
			
			this.comboFilterClean();
		}
	})

	

	Combobox.fn = Combobox.prototype;

	Combobox.fn.createDom = function() {

		var data = this.options.dataSource;
		if (env.isEmptyObject(data)) {
			throw new Error("dataSource为空！");
		}

		var oDiv = document.createElement("div");
		oDiv.className = 'select-list-div';
        //this.oDiv
		this.oDiv = oDiv;
		//新增搜索框
		
        var searchDiv = document.createElement("div");
        searchDiv.className = 'select-search';
		var searchInput =  document.createElement("input");
		searchDiv.appendChild(searchInput);
		oDiv.appendChild(searchDiv);
		//禁用搜索框
		if(this.options.readchange){
			searchDiv.style.display = "none"
		}
		var oUl = document.createElement("ul");

		oUl.className = 'select-list-ul';
	
		for (var i = 0; i < data.length; i++) {
			var item = {
				pk: data[i].pk,
				name: data[i].name
			}
			this.items.push(item)
			var oLi = document.createElement("li");

			oLi.item = item;
			oLi.innerHTML = data[i]['name'];

			//this.oLis.push(oLi);

			oUl.appendChild(oLi);

		}


		oDiv.appendChild(oUl);
		oDiv.style.display = 'none';
		document.body.appendChild(oDiv);

	}

	Combobox.fn.focusEvent = function() {
		var self = this;
		on(this.element,'click', function(e) {
			if(self.options.readchange == true) return;
			var returnValue = self.show();

			if (returnValue === 1) return;
			// self.show();

			self.floatLayer();

			self.floatLayerEvent();

			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}

		});
	}

	//下拉图标的点击事件
	Combobox.fn.clickEvent = function() {
		var self = this;		
		//var caret = this.$element.next('.input-group-addon')[0] || this.$element.next(':button')[0];
		var caret = this.element.nextSibling
		on(caret,'click',function(e) {
			self.show();
			self.floatLayer();
			self.floatLayerEvent();
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}

		})
	}

	//tab键切换 下拉隐藏	
	Combobox.fn.blurEvent = function() {
		var self = this;
        
		on(this.element,'keyup', function(e) {
			var key = e.which || e.keyCode;
			if (key == 9)
				self.show();
			
		})
		on(this.element,'keydown', function(e) {
			var key = e.which || e.keyCode;
			if(key == 9)
			self.hide();
		});
	}



	Combobox.fn.floatLayer = function() {

		if (!document.querySelector(".select-floatDiv")) {

			var oDivTwo = document.createElement("div");
			oDivTwo.className = 'select-floatDiv';
			document.body.appendChild(oDivTwo);
		}

	}

	Combobox.fn.floatLayerEvent = function() {
		var self = this;
		on(document.querySelector(".select-floatDiv"),"click",function(e) {

			self.hide();
			this.parentNode.removeChild(this);

			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
		});


	}

	Combobox.fn.show = function() {

		//var oLis = this.oLis;
		var oLis = this.oDiv.querySelector("ul").childNodes;
		var vote = 0;
		for (var i = 0, length = oLis.length; i < length; i++) {

			if (oLis[i].style.display == 'none') {
				vote++;
			}
		}

		if (vote === length) return 1;

		var left = this.element.offsetLeft;
		var top = this.element.offsetTop;

		var selectHeight = this.options.dataSource.length * 30 + 10 + 10;

		var differ = (top + getStyle(this.element,"height") + selectHeight) - (window.outerHeight + window.scrollY);
		var oDiv = this.oDiv;

		if (differ > 0) {

			oDiv.style.left = left + 'px';
			oDiv.style.top = top - selectHeight + 'px';

		} else {

			oDiv.style.left = left + 'px';
			oDiv.style.top = top + getStyle(this.element,"height") + 'px';

		}

		oDiv.style.display = 'block';
	}

	Combobox.fn.hide = function() {
		this.oDiv.style.display = 'none';
	}

	Combobox.fn.singleDivValue = function() {
		var self = this;
		//var oLis = this.oLis;
		var oLis = this.oDiv.querySelector("ul").childNodes;
		for (var i = 0; i < oLis.length; i++) {
			
			on(oLis[i],"click",function(){
				
				var item = this.item
				self.element.value = item.pk;

				self.oDiv.style.display = 'none';

				self.options.onSelect(item);

				trigger(self.element,'change');
				
			})

		}
	}

	Combobox.fn.mutilDivValue = function() {
		var self = this;
		//var oLis = this.oLis;
		var oLis = this.oDiv.querySelector("ul").childNodes;
		for (var i = 0; i < oLis.length; i++) {
			on(oLis[i],"click",function(){
				
				var pk = this.item.pk;
				var mutilpks = self.mutilPks;
				var mutilLenth = mutilpks.length;

				if (mutilLenth > 0) {

					for (var k = 0; k < mutilLenth; k++) {

						if (pk == mutilpks[k]) {

							mutilpks.splice(k, 1);
                            k--;
						}

					}

				}

				mutilpks.push(pk);

				self.element.value = mutilpks;
                trigger(self.element,'mutilSelect',mutilpks.toString());
               // element.trigger('mutilSelect',mutilpks.toString())

				self.oDiv.style.display = 'none';
				this.style.display = 'none';
				trigger(self.element,'change');
				
				
				
			})

		}
	}

	Combobox.fn.singleSelect = function() {

		this.createDom();
		this.focusEvent();
		this.singleDivValue();

	}

	Combobox.fn.mutilSelect = function() {

		this.createDom();
		this.mutilDivValue();
		this.focusEvent();

	}
   //过滤下拉选项
   Combobox.fn.comboFilter = function(){
   	 var self = this;
	 on(this.oDiv,"keyup",function(){
   	
   	 	 var content = this.querySelector('.select-search input').value
   	 	
   	 	 var oLis = this.oDiv.querySelector("ul").childNodes;
   	 	 for(var i=0;i<oLis.length;i++){
   	 	 	 if(oLis[i].item.name.indexOf(content) != -1){
   	 	 	 	oLis[i].style.display = 'block';
   	 	 	 }else{
   	 	 	 	oLis[i].style.display = 'none';
   	 	 	
   	 	 	 }
   	 	 }
   	 	 
   	 	 
   	 })
   }
   
   //过滤的后续处理
   Combobox.fn.comboFilterClean = function(){
   	  var self = this;
	   on(self.element,"click",function(){
   	 // $(this.$element).on('click',function(){
   	  	// $(self.oDiv).find('.select-search input').val('')  	
		 self.oDiv.querySelector('.select-search input').value = ""	 
   	  	var oLis = this.oDiv.querySelector("ul").childNodes;
   	  	 if(self.options.single == "true" || self.options.single == true){
   	  	 	for(var i=0;i<oLis.length;i++){
   	  	 	  oLis[i].style.display = 'block'
   	  	   }
   	  	 }else if(self.options.mutil == "true" || self.options.mutil == true ){
   	  	 	 var selectLisIndex = [];
   	  	 	 var selectLisSpan = this.querySelector('.mutil-select-div .itemName');
   	  	 	
   	  	 	 for(var i=0;i<selectLisSpan.length;i++){
   	  	 	 	 for(var k=0;k<oLis.length;k++){
   	  	 	 	 	if(selectLisSpan[i].innerHTML == oLis[k].item.name){
   	  	 	 	 		//oLis[k].style.display = 'none';
   	  	 	 	 		selectLisIndex.push(k)
 	  	 	 	 	}
   	  	 	 	 }
   	  	 	 }
   	  	 	 
   	  	 	for(var l=0; l<oLis.length;l++) {
   	  	 		oLis[l].style.display = 'block'
   	  	 		for(var j=0;j<selectLisIndex.length;j++){
   	  	 	 	if(l == selectLisIndex[j])
   	  	 	 	  oLis[l].style.display = 'none'
   	  	 	   }
   	  	 	}
   	  	 	 
   	  	 	 
   	  	 }
   	  	 
   	  	  
   	  })
   }
	// var Plugin = function(option) {

		// var $this = $(this);
		// var data = $this.data('s.select');
		// var options = typeof option == 'object' && option

		// if (!data) $this.data('s.select', (new Combobox(this, options)))

	// }

    //动态设置li值
	// $.fn.setComboData = function(dataSourse) {
        // var $this = $(this).data('s.select');
        // if(!$this)return;
		// var data = dataSourse;
		// if (!$.isArray(data) || data.length == 0) return;
		
		// $this.items.length = 0;

		// var Olis = $($this.oDiv).find('li');
		
		
	    // if(data.length < Olis.length){
			
			// for(var k=data.length;k<Olis.length;k++){
				   // $(Olis[k]).remove();
			// }		
			
		// }else if(data.length > Olis.length){
			// var liTemplate = Olis[0]
			// var oUl = $($this.oDiv).find('ul')
			// for(var j=0;j<(data.length-Olis.length);j++){
				// $(liTemplate).clone(true).appendTo(oUl)
			// }
		// }
        
        // Olis = $($this.oDiv).find('li');
        
		// for (var i = 0; i < data.length; i++) {
			// var item = {
				// pk: data[i].pk,
				// name: data[i].name
			// }
			// $this.items.push(item)
			// Olis[i].item = item;
			// Olis[i].innerHTML = data[i]['name']
		 // }
		
	// }

	// $.fn.Combobox = Plugin;
compMgr.regComp({
	comp: Combobox,
	compAsString: 'u.Combobox',
	css: 'u-combobox'
});

if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}


export {Combobox};
