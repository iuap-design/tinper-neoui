!(function(){
	var Uprogress  = function(ele,opt){	
	var me = this,ele = $(ele)
	var opt = $.extend(true,{},me.progress_default,opt);				
	opt.tmpbox = $('<div class="progress"></div>');
	opt.tmpbar = $('<div class="progress-bar" style="width:50%"></div>');
	opt.render = function(ele,opt,change){			
		opt.tmpbar.addClass(opt.type)			
		if(opt.animate){
			opt.tmpbox.addClass("active")
		}
		if(opt.striped){
			opt.tmpbox.addClass("progress-striped")
		}
	
		opt.tmpbox.css({"height":opt.height,"width":opt.width})		
		opt.tmpbar.css({"line-height":opt.tmpbox.css("height"),"width":opt.value+'%'}).text(opt.value+'%')			
		opt.propess = opt.tmpbox.append(opt.tmpbar)
		if(!change){
			ele.html('').append(opt.propess).data("progress",opt)				
		}else{
			ele.data("progress",opt)	
		}
		
		
	}
	opt.render(ele,opt)		
	opt.update = function(ele,newopt){
		ele = $(ele)
		opt = $.extend(true,{},opt,newopt)
		opt.render(ele,opt,true)
		}		
	}
	Uprogress.prototype = {
		progress_default:{
			value:0,
			type:' ',
			height:20,
			width:'100%',
			animate:false,
			striped:false
		}
		
		
	}
	
	$.fn.progress  = function(opt){
		$.each(this, function(i,node) {
			var old = $(node).data("progress")
			if(old){
				old.update(node,opt)
			}else{
				new Uprogress(node,opt)
			}
			
		}); 
	}
})();	