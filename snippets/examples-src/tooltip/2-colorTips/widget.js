var primaryEle=document.getElementById('primary');
var infoEle=document.getElementById('info');
var warningEle=document.getElementById('warning');
var successEle=document.getElementById('success');
var dangerEle=document.getElementById('danger');

var primarytip=new u.Tooltip(primaryEle,{
title:'primary tooltip',
colorLevel:'tooltip-primary'
});

var infotip=new u.Tooltip(infoEle,{
title:'info tooltip',
colorLevel:'tooltip-info'
});

var warningtip=new u.Tooltip(warningEle,{
title:'warning tooltip',
colorLevel:'tooltip-warning'
});

var successtip=new u.Tooltip(successEle,{
title:'success tooltip',
colorLevel:'tooltip-success'
});

var dangertip=new u.Tooltip(dangerEle,{
title:'danger tooltip',
colorLevel:'tooltip-danger'
});