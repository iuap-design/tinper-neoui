# breadcrumb控件

用于带有层次的导航，active状态表明当前页面的位置

# 如何使用

给父元素添加`.u-breadcrumb`,自定义导航结构的分隔符

# 示例


##默认面包屑

"/"为分隔符

<div class="example-content">
<ol class="u-breadcrumb">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Library</li>
</ol>
<ol class="u-breadcrumb">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol>
</div>

##图标面包屑

"/"为分隔符,并添加Home icon

<div class="example-content ex-hide"><style>.md-home:before {
    content: "\e6a2";
    font-family: 'uf';
}
</style></div>
<div class="example-content">
<ol class="u-breadcrumb">
    <li><a class="icon md-home u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Data</li>
</ol>
<ol class="u-breadcrumb breadcrumb-arrow">
    <li><a class="icon md-home u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol></div>

##">>"为分隔符的面包屑
<div class="example-content ex-hide"><style>.md-home:before {
    content: "\e6a2";
    font-family: 'uf';
}
</style></div>
<div class="example-content">
<ol class="u-breadcrumb u-breadcrumb-arrow">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li class="active">Library</li>
</ol>
<ol class="u-breadcrumb u-breadcrumb-arrow">
    <li><a class="u-link" href="javascript:void(0)">Home</a></li>
    <li><a class="u-link" href="javascript:void(0)">Library</a></li>
    <li class="active">Data</li>
</ol></div>


<!--### 示例1

示例1说明

### 示例2

示例2说-->

