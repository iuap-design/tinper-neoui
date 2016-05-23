

	u.showMessage = function(op) {
        var msgdiv = document.createElement("div")
		if(op.type){
		    msgdiv.className = "alert alert-"+op.type		   
		}else{
		    msgdiv.className = "alert alert-warning"
		}
        msgdiv.className = "alert alert-"+op.type+" alert-dismissible"        
        var closebtn = '<button type="button" class="close"><span>&times;</span></button>';
        msgdiv.insertAdjacentHTML("beforeEnd",closebtn);
        msgdiv.insertAdjacentText("beforeEnd",op.msg);
        msgdiv.style.cssText = 'position:fixed;display:block'
        
        if(op.pos) {
          if(op.pos.top && op.pos.left) {
            msgdiv.style.top = op.pos.top;
			msgdiv.style.left = op.pos.left;
          } else if(op.pos.top && op.pos.right) {
			msgdiv.style.top = op.pos.top;
			msgdiv.style.right = op.pos.right;
           
          } else if(op.pos.bottom && op.pos.left) {
			msgdiv.style.bottom = op.pos.bottom;
			msgdiv.style.left = op.pos.left;
        
          } else if(op.pos.bottom && op.pos.right) {
            msgdiv.style.bottom = op.pos.bottom;
			msgdiv.style.right = op.pos.right;
			
          } else if(op.pos.top) {
            msgdiv.style.top = op.pos.top;
			msgdiv.style.left = "10px";
			
          } else if(op.pos.bottom) {
			msgdiv.style.bottom = op.pos.bottom;
			msgdiv.style.left = "10px";
            
          } else if(op.pos.left) {
            msgdiv.style.top = "10px";
			msgdiv.style.left = op.pos.left;
			
          } else if(op.pos.right) {
			msgdiv.style.top = "10px";
			msgdiv.style.right = op.pos.right;
          
          }
        } else {
			msgdiv.style.bottom = "10px";
			msgdiv.style.right = "10px";
         
        }
       // msgdiv.style.z-index = 99;
        setTimeout(function() {
          msgdiv.style.opacity = 0
          msgdiv.parentNode.removeChild(msgdiv)
        }, 3000);

        document.body.appendChild(msgdiv)
        msgdiv_resize()
        function msgdiv_resize(){
    		var divWidth = msgdiv.offsetWidth || 500,divHeight = msgdiv.offsetHeight    	
			msgdiv.style.left = ((window.innerWidth?window.innerWidth:document.body.clientWidth)- divWidth)/2 + "px"; 
			msgdiv.style.top = ((window.innerHeight?window.innerHeight:document.body.clientHeight) - divHeight)/2 + "px"			
		}
        
    }
  
   u.showMessageDialog = function(op) {

	    var msgdiv = document.createElement("div")
		if(op.type){
		    msgdiv.className = "alert alert-"+op.type		   
		}else{
		    msgdiv.className = "alert alert-warning"
		}
	    var closebtn = '<button type="button" class="close"  aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	    if(op.title){
	        var titlediv = '<h4>'+op.title+'</h4>';
	    }else{
	        var titlediv = '<h4>提示</h4>';
	    }
     	op.msg = op.msg.replace(/&lt;br&gt;/g,"<br>")
	     var contentdiv = '<div class="alert-content"><p>'+op.msg+'</p></div>'
	     var btndiv;
	     if(op.type == 'danger' || op.type == 'warning') {
	        btndiv = '<div class="alert-dialog-footer"><div class="col-md-4 diag_detail" ></div><div class="col-md-4" ><button type="button" role="okbtn" class="btn btn-danger btn-block">确定</button></div><div class="col-md-4"><button type="button" role="cancelbtn" class="btn btn-default btn-block">取消</button></div></div>';
	     } else {
	        btndiv = '<div class="alert-dialog-footer"><div class="col-md-4"></div><div class="col-md-4 diag_detail" ></div><div class="col-md-4" ><button type="button" role="okbtn"  class="btn  btn-block">确定</button></div>';
	     }
	
	
		msgdiv.insertAdjacentHTML("beforeEnd",closebtn+titlediv+contentdiv+btndiv);
	    // msgdiv.append(closebtn).append(titlediv).append(contentdiv).append(btndiv);
	    if(op.width){
	       		msgdiv.style.width = u.isNumber(op.width)?op.width+"px":op.width
	    }
	    if(op.height){
	       		msgdiv.style.height = u.isNumber(op.height)?op.height+"px":op.height
	    }
	   
		if(op.detail){
				
			var  tmpdetail = msgdiv.querySelector(".diag_detail")
			tmpdetail.insertAdjacentHTML("beforeEnd","<button type='button'  class='btn btn-block'>详细</button>")
			u.on(msgdiv.querySelector(".diag_detail"),"click",function(){
				if(msgdiv.querySelector(".detail_p")){
					msgdiv.removeChild(msgdiv.querySelector(".detail_p"));
				}else{	
					msgdiv.insertAdjacentHTML("beforeEnd","<p class='detail_p'>"+op.detail+"</p>")				
				}
			})
		}
	    if(op.backdrop) { 
	      //添加遮罩层
	        document.body.insertAdjacentHTML("beforeEnd",'<div class="alert-backdrop" role="alert-dialog-backdrop"></div>');     
	    }
	    u.on(msgdiv.querySelector('[role="okbtn"]'),'click', op.okfn);
	    u.on(msgdiv.querySelector('[role="cancelbtn"]'),'click',closeAlert) 
		u.on(msgdiv.querySelector('[aria-label="Close"]'),'click',closeAlert) 
		function closeAlert(){
		    u.removeAlert()
			if(op.cancelfn){
				op.cancelfn
			}
		}
	   
	
	  
	   
	   	document.body.appendChild(msgdiv)
	    
	   	msgdiv_resize()
	    function msgdiv_resize(){
			var divWidth = msgdiv.offsetWidth || 500,divHeight = msgdiv.offsetHeight    	
			msgdiv.style.left = ((window.innerWidth?window.innerWidth:document.body.clientWidth)- divWidth)/2 + "px"; 
			msgdiv.style.top = ((window.innerHeight?window.innerHeight:document.body.clientHeight) - divHeight)/2 + "px"			
		}
	
	}

	u.removeAlert = function(){	   
       document.body.removeChild(document.querySelectorAll('.alert,.alert-backdrop'));
	}





