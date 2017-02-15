u.compMgr.apply({
        el:'body'
})
var msgBtn2 = document.body.querySelector("#msgDialogBtn2");
u.on(msgBtn2,'click', function(){
        u.confirmDialog({
            msg: "是否保存单据？",
            title: "测试确认",
            onOk: function () {
                alert('ok')
            },
            onCancel: function () {
                alert('cancel')
            }
        });
})