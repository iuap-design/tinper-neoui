#辅助类
辅助类中提供了对齐模块、文字相关方法、盒模型等其他常用类。

* 对齐模块：浮动模块、垂直对齐、居中
* 文字相关：大小写转换、包裹文字的各种方法（隐藏、一行显示所有内容、折行显示等）、文字垂直、水平居中方法、常用字体大小、字体加粗
* 盒模型： 常用padding、margin、height以及width数值
* 其他辅助类： display、响应式的visibility

#如何使用
根据文档说明，添加对应样式即可。例如向左浮动只需添加`pull-left`就能达到向左浮动效果
#示例
 
#块级元素水平居中
添加`.center-block`实现水平居中
<div class="example-content"> <div class="example example-box">
	<div class="h-64 w-64 bg-blue center-block ">
		我是内容
	</div>
</div></div>

##浮动
浮动是创建各种布局的基础。但是浮动需要被清理。下面的类将帮助你设置基本的布局

* `.pull-left`: 向左浮动
* `.pull-right`: 向右浮动
* `.clearfix`: 清除浮动 
<div class="example-content"><div class="example example-box">
  <button type="button" class="u-button  u-button-success ">Left</button>
  <button type="button" class="u-button  u-button-success  pull-right" >Pull right</button>
</div></div>

##行内块级元素垂直对齐
添加如下样式即可实现垂直居中、垂直向下。

* `.vertical-align`:添加这个样式到父元素上，该父元素需要指定高度
* `.vertical-align-middle`:添加这个样式到到子元素上，实现垂直居中
* `.vertical-align-bottom`:添加这个样式到子元素上，实现垂直向下
<div class="example-content ex-hide"><style>.vertical-align-bottom.u-button{
	vertical-align: bottom;
}
</style></div>
<div class="example-content"><div class="example example-box u-container-fluid">
	<div class="u-row">

		<div class="u-col-6">
			<div class="vertical-align h" >
      		    <button type="button" class="vertical-align-middle u-button  u-button-success ">垂直居中</button>
	        </div>
		</div>
		<div class="u-col-6">
			<div class="vertical-align h" >
	 			<button type="button" class="vertical-align-bottom u-button  u-button-success ">垂直向下</button>
	 		</div>
		</div>
	</div>
</div></div>

##字体粗细
字体粗细提供了如下粗细数值：unset、100、200、300、400、500、600、700、800、900。

添加如下样式即可实现对应的效果。

* `.font-weight-unset`: font-weight值为unset
* `.font-weight-100`: font-weight值为100
* `.font-weight-200`: font-weight值为200
* `.font-weight-300`: font-weight值为300
* `.font-weight-400`: font-weight值为400
* `.font-weight-500`: font-weight值为500
* `.font-weight-600`: font-weight值为600
* `.font-weight-700`: font-weight值为700
* `.font-weight-800`: font-weight值为800
* `.font-weight-900`: font-weight值为900

##字体大小
字体尺寸提供了如下大小的字体：0，10，12，14，16，18，20，24，26，30，40，50，60，70，80。

添加如下样式即可实现对应的效果。

* `.font-size-0`: 字体号为0px
* `.font-size-10`: 字体号为10px
* `.font-size-12`: 字体号为12px
* `.font-size-14`: 字体号为14px
* `.font-size-16`: 字体号为16px
* `.font-size-18`: 字体号为18px
* `.font-size-20`: 字体号为20px
* `.font-size-24`: 字体号为24px
* `.font-size-26`: 字体号为26px
* `.font-size-30`: 字体号为30px
* `.font-size-40`: 字体号为40px
* `.font-size-50`: 字体号为50px
* `.font-size-60`: 字体号为60px
* `.font-size-70`: 字体号为70px
* `.font-size-80`: 字体号为80px

##字体大小写转换
添加如下样式即可实现文字大小写转换

* `text-lowercase`: 将字母全部变成小写
* `text-uppercase`: 将字母全部变成大写
* `text-capitalize`: 将单词首字母大写
<div class="example-content"><div class="example example-box">
	<p class="text-lowercase">Lowercased text.</p>
	<p class="text-uppercase">Uppercased text.</p>
	<p class="text-capitalize">Capitalized text.</p>
</div></div>

##文字包裹
添加如下类实现文字包裹的各种样式

* `.text-hide`: 元素中的内容隐藏
* `text-truncate`: 内容显示到一行，多余的内容用`...`代替
* `text-break`: 当内容超出容器宽度时，将自动折行
* `text-nowrap`: 当内容超出容器宽度时，在一行显示，不折行。
<div class="example-content ex-hide"><style>.vertical-align-bottom.u-button {
    vertical-align: bottom;
}
</style></div>
<div class="example-content"><p>文字是否包裹换行</p>
<div class="example example-box u-container-fluid " style="width:500px">
    <div class="u-row">
        <div class="u-col-md-3">
            <div class="text-hide h" style="border:1px solid #e6e8ea;">
                我被隐藏了
            </div>
        </div>
        <div class="u-col-md-3">
            <div class="text-truncate h" style="border:1px solid #e6e8ea;">
                内容显示一行，超出的内容使用“...”代替 This is text truncate.This is text truncate.
            </div>
        </div>
        <div class="u-col-md-3">
            <div class="text-break h " style="border:1px solid #e6e8ea;">
                This-is-text-break.This-is-text-break.This-is-text-break.This-is-text-break.
            </div>
        </div>
        <div class="u-col-md-3">
            <div class="text-nowrap h" style="border:1px solid #e6e8ea;overflow: hidden;">
                内容显示一行，不换行 This is text nowrap.This is text nowrap.
            </div>
        </div>
    </div>
</div></div>

##文字对齐
添加如下样式来实现文字的对齐

* `text-top`: 文字垂直向上对齐
* `text-middle`: 文字垂直居中对齐
* `text-bottom`: 文字垂直向下对齐
* `text-left`: 文字水平向左对齐
* `text-center`: 文字水平居中对齐
* `text-right`: 文字水平向右对齐
* `text-justify`: 文字两端对齐
<div class="example-content"><div class="example example-box u-container-fluid">
    <div class="row">
        <div class="col-md-4 m-b-sm bg-grey h-64">
    		<img src="../../static/img/img2.png" height="64" width="64" style="vertical-align:top">
           <span class="text-top">文字顶部对齐</span>
        </div>
        <div class="col-md-4  m-b-sm bg-grey h-64" >
        <img src="../../static/img/img2.png" height="64" width="64" style="vertical-align:middle">
           <span class="text-middle">文字居中对齐</span>
        </div>
        <div class="col-md-4  m-b-sm bg-grey h-64" >
          <img src="../../static/img/img2.png" height="64" width="64" style="vertical-align:bottom">
            <span class="text-bottom">文字底部对齐</span>
        </div>
    </div>
    <div class="margin-top-20">
        <p class="text-left">文字向左对齐</p>
        <p class="text-center">文字居中对齐</p>
        <p class="text-right">文件向右对齐</p>
        <p class="text-justify">文件两端对齐</p>
    </div>
</div></div>

##高度
高度提供了如下数值： 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, auto, 100%

添加如下样式即可实现对应的效果。

* `.height-50`: height高度为50px
* `.height-100`: height高度为100px
* `.height-150`: height高度为150px
* `.height-200`: height高度为200px
* `.height-250`: height高度为250px
* `.height-300`: height高度为300px
* `.height-350`: height高度为350px
* `.height-400`: height高度为400px
* `.height-450`: height高度为450px
* `.height-500`: height高度为500px
* `.height-auto`: height高度为auto
* `.height-full`: height高度为100%

##外间距
margin提供了如下数值：0，3，5，10, 15, 20, 25, 30, 35, 40, 45, 50.

以外边距5为例说明具体margin的使用方式


| 样式名        | 描述           |
| ------------- |:-------------:|
| .margin-5   | margin:为5px |
| .margin-vertical-5    | margin-top和margin-bottom均为 5px   |
| .margin-horizontal-5 | margin-left和margin-right均为 5px    | 
| .margin-top-5    | margin-top为 5px   |
| .margin-right-5 | margin-right为 5px    | 
| .margin-bottom-5   | margin-bottom为 5px   |
| .margin-left-5 | margin-left为 5px    | 

##内间距
padding提供了如下数值：0，3，5，10, 15, 20, 25, 30, 35, 40, 45, 50.

以内边距5为例说明具体padding的使用方式


| 样式名        | 描述           |
| ------------- |:-------------:|
| .padding-5   | padding:为5px |
| .padding-vertical-5    | padding-top和padding-bottom均为 5px   |
| .padding-horizontal-5 | padding-left和padding-right均为 5px    | 
| .padding-top-5    | padding-top为 5px   |
| .padding-right-5 | padding-right为 5px    | 
| .padding-bottom-5   | padding-bottom为 5px   |
| .padding-left-5 | padding-left为 5px    | 

##宽度
宽度提供了如下数值：50, 100, 150, 200, 250, 300, 350, 400, 450, 500, auto, 100%

添加如下样式即可实现对应的效果。

* `.width-50`: width宽度为50px
* `.width-100`: width宽度为100px
* `.width-150`: width宽度为150px
* `.width-200`: width宽度为200px
* `.width-250`: width宽度为250px
* `.width-300`: width宽度为300px
* `.width-350`: width宽度为350px
* `.width-400`: width宽度为400px
* `.width-450`: width宽度为450px
* `.width-500`: width宽度为500px
* `.width-auto`: width宽度为auto
* `.width-full`: width宽度为100%

##display
添加如下属性可以修改元素的display属性值。

* `.inline`: 是元素变成内联元素，元素前后没有换行符
* `.inline-block`: 行内块元素
* `.block`: 块级元素，此元素前后会带有换行符

##响应式显示
通过单独或联合使用以下列出的类，可以针对不同屏幕尺寸隐藏或显示页面内容

|  样式名        |超小屏幕   (<768px)         |小屏幕(≥768PX)  |中等屏幕(≥992PX)|大屏幕(≥1200px)|
| ------------- |:-------------:| :-----:| :-----:| -----:|
| .show      | 可见 |可见 | 可见 |可见 |
| .hide      | 隐藏 |隐藏 |隐藏 |隐藏 |
| .visible-xs-* | 可见    | 隐藏 |隐藏 |隐藏 |
| .visible-sm-* | 隐藏 |可见 |  隐藏 |隐藏 |
| .visible-md-*  | 隐藏 |隐藏 |可见|隐藏 |
| .visible-lg-* |   隐藏 |隐藏 |隐藏 |可见  |
| .hidden-xs      | 隐藏 |可见 | 可见 |可见 |
| .hidden-sm      | 可见 |隐藏 | 可见 |可见 |
|.hidden-md      | 可见 |可见 | 隐藏 |可见 |
| .hidden-lg    | 可见 |可见 | 可见 |隐藏 |

形如 .visible-\*-\* 的类针对每种屏幕大小都有了三种变体，每个针对 CSS 中不同的 display 属性，列表如下：


|样式名|描述|
| ------ | ---:|
|.visible-*-block|display: block|
|.visible-*-inline|display: inline|
|.visible-*-inline-block|display: inline-block|

