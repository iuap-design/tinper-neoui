/**
 * Created by dingrf on 2015-11-18.
 */
'use strict';
// u.messageTemplate ='<div class="u-message"><button type="button" class="u-msg-close u-button floating  mini"><span class="">X</span></button>{msg}</div>';
u.messageTemplate ='<div class="u-message"><span class="u-msg-close fa fa-close"></span>{msg}</div>';
// u.nocloseTemplate ='<div class="u-message">{msg}</div>';

u.showMessage = function(options) {
    var msg,position, width, height, showSeconds,msgType, template;
    if (typeof options === 'string'){
        options = {msg:options};
    }
    msg = options['msg'] || "";
    position = options['position'] || "bottom-right";  //center. top-left, top-center, top-right, bottom-left, bottom-center, bottom-right,
    //TODO 后面改规则：没设宽高时，自适应
    width = options['width'] || "300px";
    // height = options['height'] || "100px";
     msgType = options['msgType'] || 'info';
    //默认为当用户输入的时间，当用户输入的时间为false并且msgType=='info'时，默认显示时间为2s
    showSeconds = parseInt(options['showSeconds']) || (msgType=='info'?2:0);
   
    template = options['template'] || u.messageTemplate;

    template = template.replace('{msg}', msg);
    var msgDom = u.makeDOM(template);
    u.addClass(msgDom,'u-mes' + msgType);
    msgDom.style.width = width;
   // msgDom.style.height = height;
   // msgDom.style.lineHeight = height;
   if (position == 'bottom-right'){
       msgDom.style.bottom = '10px';
   }
   
   if(position=='center'){
        msgDom.style.bottom = '50%';
        msgDom.style.transform ='translateY(50%)';
   }
    var closeBtn = msgDom.querySelector('.u-msg-close');
    //new u.Button({el:closeBtn});
    u.on(closeBtn, 'click', function(){
        u.removeClass(msgDom,"active")
        setTimeout(function(){
            try{
                document.body.removeChild(msgDom);
            }catch(e){

            }
          
        },500)  
    })
    document.body.appendChild(msgDom);
    
    if (showSeconds > 0 ){
        setTimeout(function(){
            closeBtn.click();
        },showSeconds* 1000)
    }
    setTimeout(function(){
            u.addClass(msgDom,"active")
    },showSeconds* 1)


}


u.showMessageDialog = u.showMessage;