# tabs控件

多内容分类切换显示

# 插件依赖

依赖于 http://design.yyuap.com/static/uui/latest/js/u.js

# 用法

定义锚链接，与内容id匹配，详情见示例



# 示例


##背景tabs

切换 背景色跟随作为`active`状态
<div class="example-content ex-hide"><style>.ws{
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
</style></div>
<div class="example-content"><div class="u-widget-body">
    <div class="u-tabs u-tabs-pill">
        <div class="u-tabs__tab-bar">
            <a href="#tab-pills-panel-1" class="u-tabs__tab is-active">页签1</a>
            <a href="#tab-pills-panel-2" class="u-tabs__tab">页签2</a>
            <a href="#tab-pills-panel-3" class="u-tabs__tab">页签3</a>
        </div>
        <div class="u-tabs__panel is-active" id="tab-pills-panel-1">
            <ul>
                <li>项目1</li>
                <li>项目2</li>
                <li>项目3</li>
                <li>项目4</li>
                <li>项目5</li>
            </ul>
        </div>
        <div class="u-tabs__panel" id="tab-pills-panel-2">
            <ul>
                <li>项目1</li>
                <li>项目2</li>
                <li>项目3</li>
            </ul>
        </div>
        <div class="u-tabs__panel" id="tab-pills-panel-3">
            <ul>
                <li>项目1</li>
                <li>项目2</li>
            </ul>
        </div>
    </div>
</div></div>

##线性tabs

切换 线性跟随作为`active`状态
<div class="example-content ex-hide"><style>.ws{
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
</style></div>
<div class="example-content"><div class="u-tabs">
    <div class="u-tabs__tab-bar">
        <a href="#tab-panel-1" class="u-tabs__tab is-active">页签1</a>
        <a href="#tab-panel-2" class="u-tabs__tab">页签2</a>
        <a href="#tab-panel-3" class="u-tabs__tab">页签3</a>
    </div>
    <div class="u-tabs__panel is-active" id="tab-panel-1">
        <ul>
            <li>项目1</li>
            <li>项目2</li>
            <li>项目3</li>
            <li>项目4</li>
            <li>项目5</li>
        </ul>
    </div>
    <div class="u-tabs__panel" id="tab-panel-2">
        <ul>
            <li>项目1</li>
            <li>项目2</li>
            <li>项目3</li>
        </ul>
    </div>
    <div class="u-tabs__panel" id="tab-panel-3">
        <ul>
            <li>项目1</li>
            <li>项目2</li>
        </ul>
    </div>
</div>
</div>






