/**
 * Created by dingrf on 2015-11-19.
 */

'use strict';

/**
 * 消息提示框
 * @param options
 */

u.messageDialogTemplate = '<div class="u-msg-dialog">'+
                            '<div class="u-msg-title">'+
                            '<h4>{title}</h4>'+
                            '</div>'+
                            '<div class="u-msg-content">'+
                                '<p>{msg}</p>'+
                            '</div>'+
                            '<div class="u-msg-footer"><button class="u-msg-button u-button">{btnText}</button></div>'+
                           '</div>';

u.messageDialog = function(options){
    var title,msg, btnText,template;
    if (typeof options === 'string'){
        options = {msg:options};
    }
    msg = options['msg'] || "";
    title = options['title'] || "提示";
    btnText = options['btnText'] || "确定";
    template = options['template'] || u.messageDialogTemplate;

    template = template.replace('{msg}', msg);
    template = template.replace('{title}', title);
    template = template.replace('{btnText}', btnText);

    var msgDom = u.makeDOM(template);

    var closeBtn = msgDom.querySelector('.u-msg-button');
    new u.Button({el:closeBtn});
    u.on(closeBtn, 'click', function(){
        document.body.removeChild(msgDom);
        document.body.removeChild(overlayDiv);
    })
    var overlayDiv = u.makeModal(msgDom);
    document.body.appendChild(msgDom);

    this.resizeFun = function(){
        var cDom = msgDom.querySelector('.u-msg-content');
        if (!cDom) return;
        cDom.style.height = '';
        var wholeHeight = msgDom.offsetHeight;
        var contentHeight = msgDom.scrollHeight;
        if(contentHeight > wholeHeight && cDom)
            cDom.style.height = wholeHeight - (56+46) + 'px';

    }.bind(this);

    this.resizeFun();
    u.on(window,'resize',this.resizeFun);
};


