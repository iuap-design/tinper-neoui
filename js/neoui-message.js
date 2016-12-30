/**
 * Module : neoui-message
 * Author : Kvkens(yueming@yonyou.com)
 * Date      : 2016-08-02 19:40:59
 */

import {addClass,removeClass,makeDOM} from 'tinper-sparrow/js/dom';
import {on} from 'tinper-sparrow/js/event';


var messageTemplate = '<div class="u-message"><span class="u-msg-close uf uf-close"></span>{msg}</div>';

var showMessage = function (options) {
    var msg, position, width, height, showSeconds, msgType, template;
    //新增深色
    var darkType;
    if (typeof options === 'string') {
        options = {
            msg: options
        };
    }
    msg = options['msg'] || "";
    position = options['position'] || "bottom"; //center. top-left, top-center, top-right, bottom-left, bottom-center, bottom-right,
    //TODO 后面改规则：没设宽高时，自适应
    width = options['width'] || "";
    // height = options['height'] || "100px";
    msgType = options['msgType'] || 'info';
    //默认为当用户输入的时间，当用户输入的时间为false并且msgType=='info'时，默认显示时间为2s
    showSeconds = parseInt(options['showSeconds']) || (msgType == 'info' ? 2 : 0);

    darkType = options['darkType'] || "";

    template = options['template'] || messageTemplate;

    template = template.replace('{msg}', msg);
    var msgDom = makeDOM(template);
    addClass(msgDom, 'u-mes' + msgType);

    if (!darkType == "") {
        addClass(msgDom, darkType);
    }

    msgDom.style.width = width;
    // msgDom.style.height = height;
    // msgDom.style.lineHeight = height;
    if (position == 'bottom' || position == 'top' || position == 'center') {
			//msgDom.style.bottom = '10px';
			addClass(msgDom, 'u-mes-' + position);
	}
	
	if (position == 'topleft' || position == 'bottomleft') {
		if(width == ""){
			    msgDom.style.right = '2.4rem';
			    addClass(msgDom, 'u-mes-' + position);
		}else{
			    addClass(msgDom, 'u-mes-' + position);
			}	
	}
	if (position == 'topright' || position == 'bottomright') {
		if(width == ""){
				msgDom.style.left = '2.4rem';
				addClass(msgDom, 'u-mes-' + position);
		}else{
				addClass(msgDom, 'u-mes-' + position);
			}
		
	}	
    var closeBtn = msgDom.querySelector('.u-msg-close');
    //new Button({el:closeBtn});
    var closeFun = function () {
        removeClass(msgDom, "active")
        setTimeout(function () {
            try {
                document.body.removeChild(msgDom);
            } catch (e) {

            }
        }, 500)
    }
    on(closeBtn, 'click', closeFun);
    document.body.appendChild(msgDom);

    if (showSeconds > 0) {
        setTimeout(function () {
            closeFun();
        }, showSeconds * 1000)
    }

    setTimeout(function () {
        addClass(msgDom, "active")
    }, showSeconds * 1)

}

var showMessageDialog = showMessage;

export {showMessageDialog,showMessage};
