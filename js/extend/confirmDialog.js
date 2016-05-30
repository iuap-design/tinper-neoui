/**
 * Created by dingrf on 2015-11-19.
 */

/**
 * 确认框
 */
u.confirmDialogTemplate = '<div class="u-msg-dialog">'+
    '<div class="u-msg-title">'+
    '<h4>{title}</h4>'+
    '</div>'+
    '<div class="u-msg-content">'+
    '<p>{msg}</p>'+
    '</div>'+
    '<div class="u-msg-footer"><button class="u-msg-ok u-button">{okText}</button><button class="u-msg-cancel u-button">{cancelText}</button></div>'+
    '</div>';

u.confirmDialog = function(options){
    var title,msg, okText,cancelText,template,onOk,onCancel;
    msg = options['msg'] || "";
    title = options['title'] || "确认";
    okText = options['okText'] || "确定";
    cancelText = options['cancelText'] || "取消";
    onOk = options['onOk'] || function(){};
    onCancel = options['onCancel'] || function(){};
    template = options['template'] || u.confirmDialogTemplate;

    template = template.replace('{msg}', msg);
    template = template.replace('{title}', title);
    template = template.replace('{okText}', okText);
    template = template.replace('{cancelText}', cancelText);

    var msgDom = u.makeDOM(template);
    var okBtn = msgDom.querySelector('.u-msg-ok');
    var cancelBtn = msgDom.querySelector('.u-msg-cancel');
    new u.Button({el:okBtn});
    new u.Button({el:cancelBtn});
    u.on(okBtn, 'click', function(){
        if (onOk() !== false) {
            document.body.removeChild(msgDom);
            document.body.removeChild(overlayDiv);
        }
    })
    u.on(cancelBtn, 'click', function(){
        if (onCancel() !== false) {
            document.body.removeChild(msgDom);
            document.body.removeChild(overlayDiv);
        }
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
