var msgBtn = document.body.querySelector("#msgBtn");
var errorBtn = document.body.querySelector("#errorBtn");
var warnBtn = document.body.querySelector("#warnBtn");
var rightInfo='<i class="uf uf-checkedsymbol margin-r-5"></i>成功信息!!!';
u.on(msgBtn,'click', function(){ 
    u.showMessage({msg:rightInfo,position:"center"})
})

var errorInfo='<i class="uf uf-crossmarkonablackcirclebackground margin-r-5"></i>错误信息!!!'
u.on(errorBtn,'click', function(){ 
    u.showMessage({msg:errorInfo,position:"center",msgType:"error"})
})

var warningInfo='<i class="uf uf-exclamationsign margin-r-5"></i>警告信息!!!';
u.on(warnBtn,'click', function(){ 
    u.showMessage({msg:warningInfo,position:"center",msgType:"warning"})
})