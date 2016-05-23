	u.dialog = function(op) {
		var wrapdiv = document.createElement("div")
		wrapdiv.className = "move-dialog";
		var msgdiv = document.createElement("div")
		
		if(op.type){
		    msgdiv.className = "move-alert alert alert-"+op.type + " alert-dismissible"		   
		}else{
		    msgdiv.className = "move-alert alert alert-warning alert-dismissible"
		}
      	//var msgdiv = $('<div class="move-dialog "><div class="move-alert alert alert-'+op.type+' alert-dismissible"></div></div>');
        closebtn = '<button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        op.title = op.title || trans('dialog.info_dialog', '提示窗口')
		var titlediv = '<h4>'+op.title+'</h4>';
	    	       
	    
        if(op.url){
			 var contentdiv = '<p class="dialog_p"><iframe class="dialog_iframe" src='+op.url+'></iframe></p>'
		}else{
			 var contentdiv = '<p style="position: absolute;top: 50px;bottom: 20px;overflow: auto;left: 30px;right: 25px;"></p>'         			 
        }
       	
        var btndiv,movable,mouseX_down,mouseY_down,mouseX_move,mouseY_move,diawidth,diaheight,tmpmove,bodywidth,bodyheight;
     
        bodywidth = window.innerWidth?window.innerWidth:document.body.clientWidth;
        bodyheight = window.innerHeight?window.innerHeight:document.body.clientHeight

		if(op.width){
       		u.css(wrapdiv,{width:op.width})
	    }else{
			u.css(wrapdiv,{width:"520px"})
		}
	    if(op.height){
	       	u.css(wrapdiv,{height:op.height})
	    }
		if(op.url){
			msgdiv.insertAdjacentHTML("beforeEnd",closebtn+titlediv+contentdiv)
		}else{
			msgdiv.insertAdjacentHTML("beforeEnd",closebtn+titlediv)
			var p = u.makeDOM(contentdiv);
			msgdiv.appendChild(p);
			p.insertAdjacentHTML("beforeEnd",op.msg);
		}
        //msgdiv.find(".alert").append(closebtn).append(titlediv).append(contentdiv).append(btndiv)
		//msgdiv.wrap("<div style='padding:5px'></div>");
		
		u.on(msgdiv.querySelector('[aria-label="Close"]'),'click',closeDialog) 
        function closeDialog(){
		    u.removeDialog()
			if(op.cancelfn){
				op.cancelfn
			}
		}
		if(op.backdrop) { 
	      //添加遮罩层
	        document.body.insertAdjacentHTML("beforeEnd",'<div class="alert-backdrop" role="alert-dialog-backdrop"></div>');     
	    }
        
		
		wrapdiv.appendChild(msgdiv)		
       
		
		if(op.movable){								
        	u.on(wrapdiv,"mousedown",function(e){
				
        		diawidth = wrapdiv.clientWidth,diaheight = wrapdiv.clientHeight;
	        	mouseX_down = e.clientX - wrapdiv.offsetLeft 
	        	mouseY_down = e.clientY - wrapdiv.offsetTop
				//调整同时调整宽度高度
				if(mouseX_move < 11 && mouseY_move < 12){
	    		//左上角
	    			
					wrapdiv_change()
	    			movable = 9;
	    			u.css(wrapdiv,{cursor: "se-resize"})
	    		
	    		}else if(mouseX_move > (diawidth - 20)  && mouseY_move > (diaheight- 10)){
	    		//右下角
	    			
					wrapdiv_change()
	    			movable = 8;
	    			u.css(wrapdiv,{cursor: "se-resize"})
	    		}else if(mouseX_move < 11 && mouseY_move > (diaheight- 10)){
	    		//左下角
	    			
					wrapdiv_change()
	    			movable = 7;
	    			 u.css(wrapdiv,{cursor: "ne-resize"})
	    		}else if( mouseX_move > (diawidth - 20) && mouseY_move < 12 ){
	    		//右上角
	    			
					wrapdiv_change()
	    			movable = 6;
	    			 u.css(wrapdiv,{cursor: "ne-resize"})
	    		//调整窗口宽度	
	    		}else if(mouseX_move < 12 ){
					
					wrapdiv_change()
					movable = 5;
					 u.css(wrapdiv,{cursor: "e-resize"})
	    		
	    		}else if(mouseX_move > (diawidth - 20)){
	    			
					wrapdiv_change()
					movable = 4;
					 u.css(wrapdiv,{cursor: "e-resize"})
	    		//调整窗口高度	
	    		}else if(mouseY_move < 11 ){
	    			
	    			movable = 3;
	    			wrapdiv_change()
	    			 u.css(wrapdiv,{cursor: "n-resize"})
	    		
	    		}else if(mouseY_move > (diaheight- 10) ){
	    			
	    			movable = 2;
	    			wrapdiv_change()
	    			 u.css(wrapdiv,{cursor: "n-resize"})
	    		//移动窗口	
	    		}else if(e.target.nodeName == 'H4'){
	    			movable = 1;
	    			wrapdiv_move();
	    			 u.css(wrapdiv,{cursor: "auto"})
	    		}
        		
        	})
			u.on(document,"mousemove",function(e){				
				diawidth = wrapdiv.clientWidth,diaheight = wrapdiv.clientHeight;
        		mouseX_move = (e.clientX - wrapdiv.offsetLeft)
        		mouseY_move = (e.clientY - wrapdiv.offsetTop)
			
        		if(movable == 1){       			
	        		 u.css(wrapdiv,{left:e.clientX-mouseX_down,top:e.clientY-mouseY_down,cursor: "all-scroll"})
	        		return
        		}else if(movable == 2){
        			 u.css(wrapdiv,{bottom:bodyheight - e.clientY -20 })        			
	        		return
        		}else if(movable == 3){
        			  u.css(wrapdiv,{top:e.clientY -20 })   			
	        		return
        		}else if(movable == 4){
        			console.log(bodywidth - e.clientX -20 )
        			 u.css(wrapdiv,{right:bodywidth - e.clientX -20 })   
	        		return
	        	}else if(movable == 5){
        			 u.css(wrapdiv,{left:e.clientX -20 })
	        		return
        		}else if(movable == 6){
        			 u.css(wrapdiv,{top:e.clientY -20,right:bodywidth- e.clientX -20 })  
	        		return
				}else if(movable == 7){
        			 u.css(wrapdiv,{left:e.clientX -20,bottom:bodyheight - e.clientY -20 })  
	        		return
				}else if(movable == 8){
        			 u.css(wrapdiv,{bottom:bodyheight - e.clientY -20,right:bodywidth- e.clientX -20 })  
	        		return
        		}else if(movable == 9){
        			 u.css(wrapdiv,{top:e.clientY -20,left:e.clientX -20 })  
	        		return

        		}else{
					
        			if((mouseX_move < 11 && mouseY_move < 12)||(mouseX_move > (diawidth - 20)  && mouseY_move > (diaheight- 10)) ){
	        			 u.css(wrapdiv,{cursor: "se-resize"})
	        		}else if((mouseX_move < 11 && mouseY_move > (diaheight- 10))||(mouseX_move > (diawidth - 20)  && mouseY_move < 12) ){
	        			 u.css(wrapdiv,{cursor: "ne-resize"})
	        		}else if( mouseX_move < 12 || mouseX_move > (diawidth - 20) ){
        				 u.css(wrapdiv,{cursor: "e-resize"})
	        		}else if(mouseY_move < 11 || mouseY_move > (diaheight- 10) ){
	        			 u.css(wrapdiv,{cursor: "n-resize"})
	        		}else {
	        			 u.css(wrapdiv,{cursor: "auto"})
	        		}
        		}
        	})
        	u.on(document,"mouseup",function(){       		
        		movable = false;
        		u.css(wrapdiv,{cursor: "auto"});
        	})
        
        } 
		
		function wrapdiv_move(){
			console.log(wrapdiv.clientWidth,  wrapdiv.clientHeight,1)
			 u.css(wrapdiv,{width:wrapdiv.clientWidth-20,height:wrapdiv.clientHeight-20,right:"auto",bottom:"auto"})
		}
		function wrapdiv_change(){
		
			console.log(wrapdiv.clientWidth,  wrapdiv.clientHeight,2)
			 u.css(wrapdiv,{width:"auto",height:"auto",
						left:wrapdiv.offsetLeft, 
						top:wrapdiv.offsetTop,
						right:bodywidth- wrapdiv.offsetLeft - wrapdiv.clientWidth, 
						bottom:bodyheight - wrapdiv.offsetTop -  wrapdiv.clientHeight
			})
		}
		
		document.body.appendChild(wrapdiv)
		wrapdiv_resize();
		function wrapdiv_resize(){
			var divWidth = wrapdiv.offsetWidth || 500,divHeight = wrapdiv.offsetHeight    	
			wrapdiv.style.left = ((window.innerWidth?window.innerWidth:document.body.clientWidth)- divWidth)/2 + "px"; 
			wrapdiv.style.top = ((window.innerHeight?window.innerHeight:document.body.clientHeight) - divHeight)/2 + "px"			
		}
		
    }
	u.removeDialog = function(){
		 // var tmp;
      	// (tmp = $('.move-dialog ')).length && tmp.remove();
		// (tmp = $('.alert-backdrop')).length && tmp.remove(); 
		var divs = document.querySelectorAll('.move-dialog,.alert-backdrop');
		for(var i = 0;i < divs.length;i++){
			document.body.removeChild(divs[i]);
		}
		//u.off(document,'mouseup.dialog')		
	}