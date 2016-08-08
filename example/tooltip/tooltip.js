var toptoolEle=document.getElementById('top');
var bottomtoolEle=document.getElementById('down');
var lefttoolEle=document.getElementById('left');
var righttoolEle=document.getElementById('right');

var toptip=new u.Tooltip(toptoolEle,{
title:'默认向上显示'
});


var bottomtip=new u.Tooltip(bottomtoolEle,{
title:'向下显示',
placement:'bottom'

});

var leftTip=new u.Tooltip(lefttoolEle,{
title:'向左显示',
placement:'left'
});

var rightTip=new u.Tooltip(righttoolEle,{
title:'向右显示',
placement:'right'
});


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
