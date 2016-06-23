# tooltip控件

当您想要描述一个链接的时候，提示工具（Tooltip）就显得非常有用。

# 如何使用

<<<<<<< HEAD
暂无

# 示例


##基础tooltip


当前选中状态 li 添加 active class
不可用状态   li 添加 disable 属性 
<style>.ws{
=======
##创建tooltip对象
```
var toptip=new u.Tooltip(toptoolEle,{
title:'默认向上显示'
});

```
##参数设置
创建对象时，添加显示内容title、显示位置placement、显示颜色级别colorLevel

# 示例

##基础tooltip
<div class="csstag" style="display:none">.ws{
>>>>>>> eb19c08bbbc1281f37d827e3eefc1803a1b61497
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 
</div>
<div class="example-content"><div id='example'>
	<label id="top" class="ws">上提示</label>
	<label id="down" class="ws">下提示</label>
	<label id="left" class="ws">左提示</label>
	<label id="right" class="ws">右提示</label>
</div>
</div>
<div class="jstag" style="display:none">var toptoolEle=document.getElementById('top');
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
<<<<<<< HEAD
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
=======
});
</div>
>>>>>>> eb19c08bbbc1281f37d827e3eefc1803a1b61497
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
#example{
	margin-left: 60px;
}
#example label:first-child,#example1 label:first-child{
	margin-left: 0px;
}
 </code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div id='example'>
	&lt;label id="top" class="ws">上提示&lt;/label>
	&lt;label id="down" class="ws">下提示&lt;/label>
	&lt;label id="left" class="ws">左提示&lt;/label>
	&lt;label id="right" class="ws">右提示&lt;/label>
&lt;/div></code></pre>
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
<<<<<<< HEAD
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
=======
});</code></pre>
</div>

##不同色彩的tooltip
  创建对象时添加colorLevel属性即可
<div class="csstag" style="display:none">.ws{
>>>>>>> eb19c08bbbc1281f37d827e3eefc1803a1b61497
	width: 60px;
	display: inline-block;
	border: 1px solid #ddd;
	height:30px;
	line-height: 30px;
	text-align: center;
	margin-left: 60px;
	margin-top: 10px;
}
#example1{
	margin-left: 60px;
}
</div>
<div class="example-content">
<div id='example1'>
	<p>各种颜色tooltips</p>
	<label id="primary" class="ws">primary</label>
	<label id="info" class="ws">info</label>
	<label id="warning" class="ws">warning</label>
	<label id="success" class="ws">success</label>
	<label id="danger" class="ws">danger</label>
</div>
</div>
<div class="jstag" style="display:none">var primaryEle=document.getElementById('primary');
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
#example1{
	margin-left: 60px;
}</code></pre>
</div>
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
<div class="examples-code"><pre><code>var primaryEle=document.getElementById('primary');
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
});</code></pre>
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



# API

## 创建Tooltip对象

###描述
创建一个Tooltip对象，方法：new u.Tooltip(paramter)

###参数paramter字段说明

* 类型 ：object
* 内容说明
	
	title ：显示内容

	colorLevel：显示颜色的级别`tooltip-primary`、`tooltip-info`、`tooltip-warning`、`tooltip-success`、`tooltip-danger`不同样式代表不同的颜色情感

	placement： 显示的位置`top`、`bottom`、`left`、`right`，默认为向上显示（top）
###例子

	var rightTip=new u.Tooltip(righttoolEle,{
		title:'向右显示',
		placement:'right',
		colorLevel:'tooltip-primary'
	});
