# tabs控件

多内容分类切换显示

# 插件依赖

依赖于 http://design.yyuap.com/static/uui/latest/js/u.js

# 用法

定义锚链接，与内容id匹配，详情见示例



# 示例









## 背景tabs

切换 背景色跟随作为`active`状态
<div class="examples-code"><pre><code>
&lt;div class="u-widget-body">
    &lt;div class="u-tabs u-tabs-pill">
        &lt;div class="u-tabs__tab-bar">
            &lt;a href="#tab-pills-panel-1" class="u-tabs__tab is-active">页签1&lt;/a>
            &lt;a href="#tab-pills-panel-2" class="u-tabs__tab">页签2&lt;/a>
            &lt;a href="#tab-pills-panel-3" class="u-tabs__tab">页签3&lt;/a>
        &lt;/div>
        &lt;div class="u-tabs__panel is-active" id="tab-pills-panel-1">
            &lt;ul>
                &lt;li>项目1&lt;/li>
                &lt;li>项目2&lt;/li>
                &lt;li>项目3&lt;/li>
                &lt;li>项目4&lt;/li>
                &lt;li>项目5&lt;/li>
            &lt;/ul>
        &lt;/div>
        &lt;div class="u-tabs__panel" id="tab-pills-panel-2">
            &lt;ul>
                &lt;li>项目1&lt;/li>
                &lt;li>项目2&lt;/li>
                &lt;li>项目3&lt;/li>
            &lt;/ul>
        &lt;/div>
        &lt;div class="u-tabs__panel" id="tab-pills-panel-3">
            &lt;ul>
                &lt;li>项目1&lt;/li>
                &lt;li>项目2&lt;/li>
            &lt;/ul>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.ws{
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
}</code></pre>
</div>




## 线性tabs

切换 线性跟随作为`active`状态
<div class="examples-code"><pre><code>
&lt;div class="u-tabs">
    &lt;div class="u-tabs__tab-bar">
        &lt;a href="#tab-panel-1" class="u-tabs__tab is-active">页签1&lt;/a>
        &lt;a href="#tab-panel-2" class="u-tabs__tab">页签2&lt;/a>
        &lt;a href="#tab-panel-3" class="u-tabs__tab">页签3&lt;/a>
    &lt;/div>
    &lt;div class="u-tabs__panel is-active" id="tab-panel-1">
        &lt;ul>
            &lt;li>项目1&lt;/li>
            &lt;li>项目2&lt;/li>
            &lt;li>项目3&lt;/li>
            &lt;li>项目4&lt;/li>
            &lt;li>项目5&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;div class="u-tabs__panel" id="tab-panel-2">
        &lt;ul>
            &lt;li>项目1&lt;/li>
            &lt;li>项目2&lt;/li>
            &lt;li>项目3&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;div class="u-tabs__panel" id="tab-panel-3">
        &lt;ul>
            &lt;li>项目1&lt;/li>
            &lt;li>项目2&lt;/li>
        &lt;/ul>
    &lt;/div>
&lt;/div>
</code></pre>
</div>

<div class="examples-code"><pre><code>
.ws{
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
}</code></pre>
</div>


