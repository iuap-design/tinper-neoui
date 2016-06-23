# tooltip控件

tooltip控件

# 如何使用

暂无

# 示例


##基础tooltip


当前选中状态 li 添加 active class
不可用状态   li 添加 disable 属性 
<style>.ws{
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example,#example1{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 
</style>
<script>var toptoolEle=document.getElementById('top');
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

</script>
<div class="example-content"><div id='example'>
	<label id="top" class="ws">上提示</label>
	<label id="down" class="ws">下提示</label>
	<label id="left" class="ws">左提示</label>
	<label id="right" class="ws">右提示</label>
</div>




</div>
<div class="examples-code"><pre><code>.ws{
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example,#example1{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 </code></pre>
</div>
<div class="examples-code"><pre><code>var toptoolEle=document.getElementById('top');
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
</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div id='example'>
	&lt;label id="top" class="ws">上提示&lt;/label>
	&lt;label id="down" class="ws">下提示&lt;/label>
	&lt;label id="left" class="ws">左提示&lt;/label>
	&lt;label id="right" class="ws">右提示&lt;/label>
&lt;/div>



</code></pre>
</div>

##静态四个方向tooltip
<style> #example3,#example2{
    margin: 10px;
    float: left;
    margin-left: 115px;
}
</style>
<div class="example-content"><div id='example3'>
    <div class="tooltip tooltip-primary top active" role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">primary tooltip</div>
    </div>
</div>
<div id='example3'>
    <div class="tooltip tooltip-info top active" role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">info tooltip</div>
    </div>
</div>
<div id='example3'>
    <div class="tooltip tooltip-warning top active" role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">warning tooltip</div>
    </div>
</div>
<div id='example3'>
    <div class="tooltip tooltip-success top active" role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">success tooltip</div>
    </div>
</div>
<div id='example3'>
    <div class="tooltip tooltip-danger top active" role="tooltip" >
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">danger tooltip</div>
    </div>
</div>
</div>

<div class="examples-code"><pre><code>&lt;div id='example3'>
    &lt;div class="tooltip tooltip-primary top active" role="tooltip">
        &lt;div class="tooltip-arrow">&lt;/div>
        &lt;div class="tooltip-inner">primary tooltip&lt;/div>
    &lt;/div>
&lt;/div>
&lt;div id='example3'>
    &lt;div class="tooltip tooltip-info top active" role="tooltip">
        &lt;div class="tooltip-arrow">&lt;/div>
        &lt;div class="tooltip-inner">info tooltip&lt;/div>
    &lt;/div>
&lt;/div>
&lt;div id='example3'>
    &lt;div class="tooltip tooltip-warning top active" role="tooltip">
        &lt;div class="tooltip-arrow">&lt;/div>
        &lt;div class="tooltip-inner">warning tooltip&lt;/div>
    &lt;/div>
&lt;/div>
&lt;div id='example3'>
    &lt;div class="tooltip tooltip-success top active" role="tooltip">
        &lt;div class="tooltip-arrow">&lt;/div>
        &lt;div class="tooltip-inner">success tooltip&lt;/div>
    &lt;/div>
&lt;/div>
&lt;div id='example3'>
    &lt;div class="tooltip tooltip-danger top active" role="tooltip" >
        &lt;div class="tooltip-arrow">&lt;/div>
        &lt;div class="tooltip-inner">danger tooltip&lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

##基础tooltip


当前选中状态 li 添加 active class
不可用状态   li 添加 disable 属性 

<div class="example-content">
<div id='example1'>
	<label id="primary" class="ws">primary</label>
	<label id="info" class="ws">info</label>
	<label id="warning" class="ws">warning</label>
	<label id="success" class="ws">success</label>
	<label id="danger" class="ws">danger</label>
</div>
</div>
<style>.ws{
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example,#example1{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 
</style>
<script>var toptoolEle=document.getElementById('top');
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

</script>
<div class="examples-code"><pre><code>
&lt;div id='example1'>
	&lt;p>各种颜色tooltips&lt;/p>
	&lt;label id="primary" class="ws">primary&lt;/label>
	&lt;label id="info" class="ws">info&lt;/label>
	&lt;label id="warning" class="ws">warning&lt;/label>
	&lt;label id="success" class="ws">success&lt;/label>
	&lt;label id="danger" class="ws">danger&lt;/label>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>.ws{
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example,#example1{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 </code></pre>
</div>
<div class="examples-code"><pre><code>var toptoolEle=document.getElementById('top');
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
</code></pre>
</div>

##静态多颜色tooltip 

<style> #example3,#example2{
    margin: 10px;
    float: left;
    margin-left: 115px;
}
</style>
<div class="example-content"><div id='example2'>
    <div class="tooltip top active" role="tooltip" >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">默认向上显示</div>
  </div>
</div>
<div id='example2'>
  <div class="tooltip bottom active" role="tooltip">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">向下显示</div>
  </div>
</div>
<div id='example2'>
  <div class="tooltip left active" role="tooltip">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">向左显示</div>
  </div>
</div>
<div id='example2'>
  <div class="tooltip right active" role="tooltip">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">向右显示</div>
  </div>
</div>
</div>
<div class="examples-code"><pre><code> #example3,#example2{
    margin: 10px;
    float: left;
    margin-left: 115px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div id='example2'>
    &lt;div class="tooltip top active" role="tooltip" >
      &lt;div class="tooltip-arrow">&lt;/div>
      &lt;div class="tooltip-inner">默认向上显示&lt;/div>
  &lt;/div>
&lt;/div>
&lt;div id='example2'>
  &lt;div class="tooltip bottom active" role="tooltip">
      &lt;div class="tooltip-arrow">&lt;/div>
      &lt;div class="tooltip-inner">向下显示&lt;/div>
  &lt;/div>
&lt;/div>
&lt;div id='example2'>
  &lt;div class="tooltip left active" role="tooltip">
      &lt;div class="tooltip-arrow">&lt;/div>
      &lt;div class="tooltip-inner">向左显示&lt;/div>
  &lt;/div>
&lt;/div>
&lt;div id='example2'>
  &lt;div class="tooltip right active" role="tooltip">
      &lt;div class="tooltip-arrow">&lt;/div>
      &lt;div class="tooltip-inner">向右显示&lt;/div>
  &lt;/div>
&lt;/div></code></pre>
</div>


<!--### 示例1

示例1说明

### 示例2

示例2说-->

# API

## 属性

暂无
<!--### 属性1

属性1说明

### 属性2

属性2说明-->

## 方法

暂无
<!--### 方法1

方法1说明

### 方法2

方法2说明-->
