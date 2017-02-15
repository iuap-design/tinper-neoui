var msgBtn = document.body.querySelector("#msgBtn");
var rightInfo='<i class="uf uf-checkedsymbol margin-r-5"></i>成功信息!!!';
u.on(msgBtn,'click', function(){ 
    u.showMessage({msg:rightInfo,position:"center"})
})