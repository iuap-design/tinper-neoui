## 图标

图标字体不用依赖任何JavaScript，只要CSS支持，无论颜色、大小或者其它任何效果，都可以轻易展现。

#### 引入图标字体文件

1、引入项目下面生成的fontclass代码

````
<link rel="stylesheet" type="text/css" href="./iconfont.css">
````

2、挑选相应图标并获取类名，应用于页面

```
<i class="uf uf-xxx"></i>
```



#### 显示某个图标

使用方法

`<i class="uf uf-图标字体类名"></i>`

例如：显示咨询的图标

`<i class="uf uf-advice"></i>`

<i class="uf uf-advice"></i>

是不是很简单，快上手试试吧！


#### 具体的图标

<div class="examples-code"><pre><code>
&lt;ul class="icon_lists clear">

    &lt;li>
        &lt;i class="icon uf uf-wechat">&lt;/i>
        &lt;div class="name">微信&lt;/div>
        &lt;div class="fontclass">.uf-wechat&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-add-c-o">&lt;/i>
        &lt;div class="name">加&lt;/div>
        &lt;div class="fontclass">.uf-add-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-search">&lt;/i>
        &lt;div class="name">搜索&lt;/div>
        &lt;div class="fontclass">.uf-search&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-histogram-arrow-up">&lt;/i>
        &lt;div class="name">图表 折线图&lt;/div>
        &lt;div class="fontclass">.uf-histogram-arrow-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-close-bold">&lt;/i>
        &lt;div class="name">关闭&lt;/div>
        &lt;div class="fontclass">.uf-close-bold&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-umbrella">&lt;/i>
        &lt;div class="name">雨伞&lt;/div>
        &lt;div class="fontclass">.uf-umbrella&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-qq">&lt;/i>
        &lt;div class="name">QQ&lt;/div>
        &lt;div class="fontclass">.uf-qq&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-4square-3">&lt;/i>
        &lt;div class="name">分类&lt;/div>
        &lt;div class="fontclass">.uf-4square-3&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-send">&lt;/i>
        &lt;div class="name">发送&lt;/div>
        &lt;div class="fontclass">.uf-send&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-map">&lt;/i>
        &lt;div class="name">地图&lt;/div>
        &lt;div class="fontclass">.uf-map&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-9square-2">&lt;/i>
        &lt;div class="name">标定&lt;/div>
        &lt;div class="fontclass">.uf-9square-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-navmenu">&lt;/i>
        &lt;div class="name">汉堡包&lt;/div>
        &lt;div class="fontclass">.uf-navmenu&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pc-2">&lt;/i>
        &lt;div class="name">显示器&lt;/div>
        &lt;div class="fontclass">.uf-pc-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-search-light-2">&lt;/i>
        &lt;div class="name">zoom&lt;/div>
        &lt;div class="fontclass">.uf-search-light-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-check-s-2">&lt;/i>
        &lt;div class="name">任务&lt;/div>
        &lt;div class="fontclass">.uf-check-s-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pencil">&lt;/i>
        &lt;div class="name">编辑&lt;/div>
        &lt;div class="fontclass">.uf-pencil&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-repeat">&lt;/i>
        &lt;div class="name">撤销&lt;/div>
        &lt;div class="fontclass">.uf-repeat&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-security-2">&lt;/i>
        &lt;div class="name">安全&lt;/div>
        &lt;div class="fontclass">.uf-security-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-lexi">&lt;/i>
        &lt;div class="name">女&lt;/div>
        &lt;div class="fontclass">.uf-lexi&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pencil-s">&lt;/i>
        &lt;div class="name">编辑&lt;/div>
        &lt;div class="fontclass">.uf-pencil-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-del">&lt;/i>
        &lt;div class="name">删除&lt;/div>
        &lt;div class="fontclass">.uf-del&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bi-o">&lt;/i>
        &lt;div class="name">比价&lt;/div>
        &lt;div class="fontclass">.uf-bi-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pencil-c">&lt;/i>
        &lt;div class="name">编辑&lt;/div>
        &lt;div class="fontclass">.uf-pencil-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-qrcode">&lt;/i>
        &lt;div class="name">二维码&lt;/div>
        &lt;div class="fontclass">.uf-qrcode&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rmb-c-o">&lt;/i>
        &lt;div class="name">免费报价&lt;/div>
        &lt;div class="fontclass">.uf-rmb-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-search-c-o">&lt;/i>
        &lt;div class="name">搜索&lt;/div>
        &lt;div class="fontclass">.uf-search-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bell">&lt;/i>
        &lt;div class="name">铃铛&lt;/div>
        &lt;div class="fontclass">.uf-bell&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pass-3">&lt;/i>
        &lt;div class="name">机检通过&lt;/div>
        &lt;div class="fontclass">.uf-pass-3&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-treeline">&lt;/i>
        &lt;div class="name">树形线&lt;/div>
        &lt;div class="fontclass">.uf-treeline&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-training">&lt;/i>
        &lt;div class="name">培训&lt;/div>
        &lt;div class="fontclass">.uf-training&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-group-2">&lt;/i>
        &lt;div class="name">组织架构&lt;/div>
        &lt;div class="fontclass">.uf-group-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-zoom-in">&lt;/i>
        &lt;div class="name">zoom-in&lt;/div>
        &lt;div class="fontclass">.uf-zoom-in&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-security-o">&lt;/i>
        &lt;div class="name">安全&lt;/div>
        &lt;div class="fontclass">.uf-security-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-baojia-c">&lt;/i>
        &lt;div class="name">报价&lt;/div>
        &lt;div class="fontclass">.uf-baojia-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rulerpen">&lt;/i>
        &lt;div class="name">定制&lt;/div>
        &lt;div class="fontclass">.uf-rulerpen&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-erpsearch">&lt;/i>
        &lt;div class="name">erp&lt;/div>
        &lt;div class="fontclass">.uf-erpsearch&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-group-o">&lt;/i>
        &lt;div class="name">组织机构&lt;/div>
        &lt;div class="fontclass">.uf-group-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cloud-o-updown">&lt;/i>
        &lt;div class="name">同步中2-同步&lt;/div>
        &lt;div class="fontclass">.uf-cloud-o-updown&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-close-c-o">&lt;/i>
        &lt;div class="name">关闭&lt;/div>
        &lt;div class="fontclass">.uf-close-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-add-s">&lt;/i>
        &lt;div class="name">加&lt;/div>
        &lt;div class="fontclass">.uf-add-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pc">&lt;/i>
        &lt;div class="name">工作台&lt;/div>
        &lt;div class="fontclass">.uf-pc&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rain">&lt;/i>
        &lt;div class="name">空气_雨天&lt;/div>
        &lt;div class="fontclass">.uf-rain&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-nodata">&lt;/i>
        &lt;div class="name">无数据&lt;/div>
        &lt;div class="fontclass">.uf-nodata&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-close-c">&lt;/i>
        &lt;div class="name">关闭&lt;/div>
        &lt;div class="fontclass">.uf-close-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bohui-s-o">&lt;/i>
        &lt;div class="name">审批-驳回&lt;/div>
        &lt;div class="fontclass">.uf-bohui-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cloud">&lt;/i>
        &lt;div class="name">天气&lt;/div>
        &lt;div class="fontclass">.uf-cloud&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bag-s">&lt;/i>
        &lt;div class="name">商品&lt;/div>
        &lt;div class="fontclass">.uf-bag-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-table-2">&lt;/i>
        &lt;div class="name">made&lt;/div>
        &lt;div class="fontclass">.uf-table-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-anglearrowpointingtoright">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-anglearrowpointingtoright&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-exc-c-o">&lt;/i>
        &lt;div class="name">叹号&lt;/div>
        &lt;div class="fontclass">.uf-exc-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-group">&lt;/i>
        &lt;div class="name">组织机构&lt;/div>
        &lt;div class="fontclass">.uf-group&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-personin-o">&lt;/i>
        &lt;div class="name">认证激活&lt;/div>
        &lt;div class="fontclass">.uf-personin-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-calendar">&lt;/i>
        &lt;div class="name">gm_日历&lt;/div>
        &lt;div class="fontclass">.uf-calendar&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-add-s-o">&lt;/i>
        &lt;div class="name">加&lt;/div>
        &lt;div class="fontclass">.uf-add-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sync-c-o">&lt;/i>
        &lt;div class="name">同步&lt;/div>
        &lt;div class="fontclass">.uf-sync-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-grid">&lt;/i>
        &lt;div class="name">grid&lt;/div>
        &lt;div class="fontclass">.uf-grid&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-anglepointingtoleft">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-anglepointingtoleft&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-activate-3">&lt;/i>
        &lt;div class="name">激活&lt;/div>
        &lt;div class="fontclass">.uf-activate-3&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-caven">&lt;/i>
        &lt;div class="name">男&lt;/div>
        &lt;div class="fontclass">.uf-caven&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-back">&lt;/i>
        &lt;div class="name">返回&lt;/div>
        &lt;div class="fontclass">.uf-back&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pass-2">&lt;/i>
        &lt;div class="name">授权&lt;/div>
        &lt;div class="fontclass">.uf-pass-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-reduce-s-o">&lt;/i>
        &lt;div class="name">显示树&lt;/div>
        &lt;div class="fontclass">.uf-reduce-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-area">&lt;/i>
        &lt;div class="name">图表图标-面积图&lt;/div>
        &lt;div class="fontclass">.uf-area&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-flag">&lt;/i>
        &lt;div class="name">旗帜&lt;/div>
        &lt;div class="fontclass">.uf-flag&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-box-o-2">&lt;/i>
        &lt;div class="name">购买盒子&lt;/div>
        &lt;div class="fontclass">.uf-box-o-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-s-o-down">&lt;/i>
        &lt;div class="name">下架&lt;/div>
        &lt;div class="fontclass">.uf-arrow-s-o-down&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-s-o-up">&lt;/i>
        &lt;div class="name">上架&lt;/div>
        &lt;div class="fontclass">.uf-arrow-s-o-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-building">&lt;/i>
        &lt;div class="name">企业信息&lt;/div>
        &lt;div class="fontclass">.uf-building&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-tapp">&lt;/i>
        &lt;div class="name">天气&lt;/div>
        &lt;div class="fontclass">.uf-tapp&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-treefolder">&lt;/i>
        &lt;div class="name">搜索&lt;/div>
        &lt;div class="fontclass">.uf-treefolder&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-advice">&lt;/i>
        &lt;div class="name">咨询&lt;/div>
        &lt;div class="fontclass">.uf-advice&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-2collayout">&lt;/i>
        &lt;div class="name">序列布局&lt;/div>
        &lt;div class="fontclass">.uf-2collayout&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-check-s">&lt;/i>
        &lt;div class="name">审批&lt;/div>
        &lt;div class="fontclass">.uf-check-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sign">&lt;/i>
        &lt;div class="name">采购合同&lt;/div>
        &lt;div class="fontclass">.uf-sign&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-listsearch">&lt;/i>
        &lt;div class="name">查看详情&lt;/div>
        &lt;div class="fontclass">.uf-listsearch&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-mi">&lt;/i>
        &lt;div class="name">必填&lt;/div>
        &lt;div class="fontclass">.uf-mi&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-eye-c-o">&lt;/i>
        &lt;div class="name">查看&lt;/div>
        &lt;div class="fontclass">.uf-eye-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-check-c-o">&lt;/i>
        &lt;div class="name">许可&lt;/div>
        &lt;div class="fontclass">.uf-check-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-seal">&lt;/i>
        &lt;div class="name">审批&lt;/div>
        &lt;div class="fontclass">.uf-seal&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-erpbox">&lt;/i>
        &lt;div class="name">erp&lt;/div>
        &lt;div class="fontclass">.uf-erpbox&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rulerpen-o">&lt;/i>
        &lt;div class="name">定制&lt;/div>
        &lt;div class="fontclass">.uf-rulerpen-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-role">&lt;/i>
        &lt;div class="name">角色&lt;/div>
        &lt;div class="fontclass">.uf-role&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-exc-c-2">&lt;/i>
        &lt;div class="name">提示叹号&lt;/div>
        &lt;div class="fontclass">.uf-exc-c-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pad">&lt;/i>
        &lt;div class="name">pad&lt;/div>
        &lt;div class="fontclass">.uf-pad&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-treefolder-closed">&lt;/i>
        &lt;div class="name">tree-new-sbling-node&lt;/div>
        &lt;div class="fontclass">.uf-treefolder-closed&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-reduce-c-o">&lt;/i>
        &lt;div class="name">减号&lt;/div>
        &lt;div class="fontclass">.uf-reduce-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pass-s-o">&lt;/i>
        &lt;div class="name">通过&lt;/div>
        &lt;div class="fontclass">.uf-pass-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-setting">&lt;/i>
        &lt;div class="name">维护&lt;/div>
        &lt;div class="fontclass">.uf-setting&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-close-s">&lt;/i>
        &lt;div class="name">ZSX号&lt;/div>
        &lt;div class="fontclass">.uf-close-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-map-o">&lt;/i>
        &lt;div class="name">地图&lt;/div>
        &lt;div class="fontclass">.uf-map-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-move">&lt;/i>
        &lt;div class="name">移动&lt;/div>
        &lt;div class="fontclass">.uf-move&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-2arrow-down">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-2arrow-down&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-2arrow-right">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-2arrow-right&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-c-o-left">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-arrow-c-o-left&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-plus">&lt;/i>
        &lt;div class="name">plus&lt;/div>
        &lt;div class="fontclass">.uf-plus&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-c-o-right">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-arrow-c-o-right&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-c-o-down">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-arrow-c-o-down&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-list-s-o">&lt;/i>
        &lt;div class="name">暂无数据&lt;/div>
        &lt;div class="fontclass">.uf-list-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cloud-o-down">&lt;/i>
        &lt;div class="name">云下载&lt;/div>
        &lt;div class="fontclass">.uf-cloud-o-down&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-nodata-2">&lt;/i>
        &lt;div class="name">无效数据&lt;/div>
        &lt;div class="fontclass">.uf-nodata-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-file-s">&lt;/i>
        &lt;div class="name">文档文件-01&lt;/div>
        &lt;div class="fontclass">.uf-file-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-2arrow-up">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-2arrow-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-piechart">&lt;/i>
        &lt;div class="name">图表_饼&lt;/div>
        &lt;div class="fontclass">.uf-piechart&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cloud-o-up">&lt;/i>
        &lt;div class="name">云_上传&lt;/div>
        &lt;div class="fontclass">.uf-cloud-o-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-close">&lt;/i>
        &lt;div class="name">取消&lt;/div>
        &lt;div class="fontclass">.uf-close&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-correct">&lt;/i>
        &lt;div class="name">对号&lt;/div>
        &lt;div class="fontclass">.uf-correct&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-histogram-s-o-2">&lt;/i>
        &lt;div class="name">图表切换&lt;/div>
        &lt;div class="fontclass">.uf-histogram-s-o-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-4square-2">&lt;/i>
        &lt;div class="name">应用中心&lt;/div>
        &lt;div class="fontclass">.uf-4square-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sunny">&lt;/i>
        &lt;div class="name">天气 &lt;/div>
        &lt;div class="fontclass">.uf-sunny&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-link">&lt;/i>
        &lt;div class="name">复制链接&lt;/div>
        &lt;div class="fontclass">.uf-link&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-eye">&lt;/i>
        &lt;div class="name">查看&lt;/div>
        &lt;div class="fontclass">.uf-eye&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-eye-o">&lt;/i>
        &lt;div class="name">查看&lt;/div>
        &lt;div class="fontclass">.uf-eye-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-qian">&lt;/i>
        &lt;div class="name">签&lt;/div>
        &lt;div class="fontclass">.uf-qian&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-widgetab">&lt;/i>
        &lt;div class="name">小部件授权&lt;/div>
        &lt;div class="fontclass">.uf-widgetab&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rmb-s">&lt;/i>
        &lt;div class="name">报价&lt;/div>
        &lt;div class="fontclass">.uf-rmb-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-link-off">&lt;/i>
        &lt;div class="name">断开链接&lt;/div>
        &lt;div class="fontclass">.uf-link-off&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-shang-s">&lt;/i>
        &lt;div class="name">上架&lt;/div>
        &lt;div class="fontclass">.uf-shang-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-xia-s">&lt;/i>
        &lt;div class="name">下架&lt;/div>
        &lt;div class="fontclass">.uf-xia-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-box-2">&lt;/i>
        &lt;div class="name">盒子full&lt;/div>
        &lt;div class="fontclass">.uf-box-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pass-o">&lt;/i>
        &lt;div class="name">授权&lt;/div>
        &lt;div class="fontclass">.uf-pass-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-down">&lt;/i>
        &lt;div class="name">angle-arrow-down&lt;/div>
        &lt;div class="fontclass">.uf-arrow-down&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-right">&lt;/i>
        &lt;div class="name">angle-arrow-pointing-to-right&lt;/div>
        &lt;div class="fontclass">.uf-arrow-right&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-left">&lt;/i>
        &lt;div class="name">angle-pointing-to-left&lt;/div>
        &lt;div class="fontclass">.uf-arrow-left&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-box">&lt;/i>
        &lt;div class="name">archive-black-box&lt;/div>
        &lt;div class="fontclass">.uf-box&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-triangle-right">&lt;/i>
        &lt;div class="name">arrowhead-pointing-to-the-right&lt;/div>
        &lt;div class="fontclass">.uf-triangle-right&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-histogram-s-o">&lt;/i>
        &lt;div class="name">bar-graph-on-a-rectangle&lt;/div>
        &lt;div class="fontclass">.uf-histogram-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-book">&lt;/i>
        &lt;div class="name">book&lt;/div>
        &lt;div class="fontclass">.uf-book&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bookmark-o">&lt;/i>
        &lt;div class="name">bookmark-white&lt;/div>
        &lt;div class="fontclass">.uf-bookmark-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-leaf">&lt;/i>
        &lt;div class="name">branch-with-leaves-black-shape&lt;/div>
        &lt;div class="fontclass">.uf-leaf&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bullseye">&lt;/i>
        &lt;div class="name">bullseye&lt;/div>
        &lt;div class="fontclass">.uf-bullseye&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-camera-2">&lt;/i>
        &lt;div class="name">camera-retro&lt;/div>
        &lt;div class="fontclass">.uf-camera-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-triangle-up">&lt;/i>
        &lt;div class="name">caret-arrow-up&lt;/div>
        &lt;div class="fontclass">.uf-triangle-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-triangle-down">&lt;/i>
        &lt;div class="name">caret-down&lt;/div>
        &lt;div class="fontclass">.uf-triangle-down&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cloud-down">&lt;/i>
        &lt;div class="name">cloud-storage-download&lt;/div>
        &lt;div class="fontclass">.uf-cloud-down&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cloud-up">&lt;/i>
        &lt;div class="name">cloud-storage-uploading-option&lt;/div>
        &lt;div class="fontclass">.uf-cloud-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bubble">&lt;/i>
        &lt;div class="name">comment-black-oval-bubble-shape&lt;/div>
        &lt;div class="fontclass">.uf-bubble&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bubble-o">&lt;/i>
        &lt;div class="name">comment-white-oval-bubble&lt;/div>
        &lt;div class="fontclass">.uf-bubble-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-copy">&lt;/i>
        &lt;div class="name">copy-document&lt;/div>
        &lt;div class="fontclass">.uf-copy&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-correct-2">&lt;/i>
        &lt;div class="name">correct-symbol&lt;/div>
        &lt;div class="fontclass">.uf-correct-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-2arrow-left">&lt;/i>
        &lt;div class="name">double-left-chevron&lt;/div>
        &lt;div class="fontclass">.uf-2arrow-left&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-down-2">&lt;/i>
        &lt;div class="name">down-arrow&lt;/div>
        &lt;div class="fontclass">.uf-arrow-down-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-download">&lt;/i>
        &lt;div class="name">download-to-storage-drive&lt;/div>
        &lt;div class="fontclass">.uf-download&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-earth">&lt;/i>
        &lt;div class="name">earth-globe&lt;/div>
        &lt;div class="fontclass">.uf-earth&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-mail-o">&lt;/i>
        &lt;div class="name">envelope-of-white-paper&lt;/div>
        &lt;div class="fontclass">.uf-mail-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-mail">&lt;/i>
        &lt;div class="name">envelope&lt;/div>
        &lt;div class="fontclass">.uf-mail&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-exc">&lt;/i>
        &lt;div class="name">exclamation&lt;/div>
        &lt;div class="fontclass">.uf-exc&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-externallink">&lt;/i>
        &lt;div class="name">external-link-symbol&lt;/div>
        &lt;div class="fontclass">.uf-externallink&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-video">&lt;/i>
        &lt;div class="name">facetime-button&lt;/div>
        &lt;div class="fontclass">.uf-video&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-films">&lt;/i>
        &lt;div class="name">film-strip-with-two-photograms&lt;/div>
        &lt;div class="fontclass">.uf-films&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-folder">&lt;/i>
        &lt;div class="name">folder-closed-black-shape&lt;/div>
        &lt;div class="fontclass">.uf-folder&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-folder-o">&lt;/i>
        &lt;div class="name">folder-white-shape&lt;/div>
        &lt;div class="fontclass">.uf-folder-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-4square">&lt;/i>
        &lt;div class="name">four-black-squares&lt;/div>
        &lt;div class="fontclass">.uf-4square&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-gift">&lt;/i>
        &lt;div class="name">gift-box&lt;/div>
        &lt;div class="fontclass">.uf-gift&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-github-c">&lt;/i>
        &lt;div class="name">github-logo&lt;/div>
        &lt;div class="fontclass">.uf-github-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-github-s">&lt;/i>
        &lt;div class="name">github-sign&lt;/div>
        &lt;div class="fontclass">.uf-github-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-heart-o">&lt;/i>
        &lt;div class="name">heart-shape-outline&lt;/div>
        &lt;div class="fontclass">.uf-heart-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-heart">&lt;/i>
        &lt;div class="name">heart-shape-silhouette&lt;/div>
        &lt;div class="fontclass">.uf-heart&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-home">&lt;/i>
        &lt;div class="name">home&lt;/div>
        &lt;div class="fontclass">.uf-home&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-i-c-2">&lt;/i>
        &lt;div class="name">information-button&lt;/div>
        &lt;div class="fontclass">.uf-i-c-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-i">&lt;/i>
        &lt;div class="name">information-symbol&lt;/div>
        &lt;div class="fontclass">.uf-i&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-triangle-left">&lt;/i>
        &lt;div class="name">left-arrow&lt;/div>
        &lt;div class="fontclass">.uf-triangle-left&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-symlist">&lt;/i>
        &lt;div class="name">listing-option&lt;/div>
        &lt;div class="fontclass">.uf-symlist&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-left-2">&lt;/i>
        &lt;div class="name">long-arrow-pointing-to-left&lt;/div>
        &lt;div class="fontclass">.uf-arrow-left-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-right-2">&lt;/i>
        &lt;div class="name">long-arrow-pointing-to-the-right&lt;/div>
        &lt;div class="fontclass">.uf-arrow-right-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-up-2">&lt;/i>
        &lt;div class="name">long-arrow-pointing-up&lt;/div>
        &lt;div class="fontclass">.uf-arrow-up-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-reduce-c">&lt;/i>
        &lt;div class="name">minus-sign-inside-a-black-circle&lt;/div>
        &lt;div class="fontclass">.uf-reduce-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-reduce-s">&lt;/i>
        &lt;div class="name">minus-sign-inside-a-black-rounded-square-shape&lt;/div>
        &lt;div class="fontclass">.uf-reduce-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-minus">&lt;/i>
        &lt;div class="name">minus-symbol&lt;/div>
        &lt;div class="fontclass">.uf-minus&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-mobile">&lt;/i>
        &lt;div class="name">mobile-phone&lt;/div>
        &lt;div class="fontclass">.uf-mobile&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bell-o">&lt;/i>
        &lt;div class="name">musical-bell-outline&lt;/div>
        &lt;div class="fontclass">.uf-bell-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-9square">&lt;/i>
        &lt;div class="name">nine-black-tiles&lt;/div>
        &lt;div class="fontclass">.uf-9square&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-numlist">&lt;/i>
        &lt;div class="name">numbered-list&lt;/div>
        &lt;div class="fontclass">.uf-numlist&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-folderopen-o">&lt;/i>
        &lt;div class="name">open-folder-outline&lt;/div>
        &lt;div class="fontclass">.uf-folderopen-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-treefolderopen">&lt;/i>
        &lt;div class="name">open-folder&lt;/div>
        &lt;div class="fontclass">.uf-treefolderopen&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-mac">&lt;/i>
        &lt;div class="name">open-laptop-computer&lt;/div>
        &lt;div class="fontclass">.uf-mac&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-camera">&lt;/i>
        &lt;div class="name">photo-camera&lt;/div>
        &lt;div class="fontclass">.uf-camera&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-picture">&lt;/i>
        &lt;div class="name">picture&lt;/div>
        &lt;div class="fontclass">.uf-picture&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-play">&lt;/i>
        &lt;div class="name">play-sign&lt;/div>
        &lt;div class="fontclass">.uf-play&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-play-o">&lt;/i>
        &lt;div class="name">play-video-button&lt;/div>
        &lt;div class="fontclass">.uf-play-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-qm-c">&lt;/i>
        &lt;div class="name">question-mark-on-a-circular-black-background&lt;/div>
        &lt;div class="fontclass">.uf-qm-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-qm">&lt;/i>
        &lt;div class="name">question-sign&lt;/div>
        &lt;div class="fontclass">.uf-qm&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-navmenu-light">&lt;/i>
        &lt;div class="name">reorder-option&lt;/div>
        &lt;div class="fontclass">.uf-navmenu-light&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-settings">&lt;/i>
        &lt;div class="name">settings&lt;/div>
        &lt;div class="fontclass">.uf-settings&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cart">&lt;/i>
        &lt;div class="name">shopping-cart-black-shape&lt;/div>
        &lt;div class="fontclass">.uf-cart&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-histogram">&lt;/i>
        &lt;div class="name">signal-bars&lt;/div>
        &lt;div class="fontclass">.uf-histogram&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-finetune">&lt;/i>
        &lt;div class="name">sort-arrows-couple-pointing-up-and-down&lt;/div>
        &lt;div class="fontclass">.uf-finetune&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sortup">&lt;/i>
        &lt;div class="name">sort-by-attributes-interface-button-option&lt;/div>
        &lt;div class="fontclass">.uf-sortup&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sortdown">&lt;/i>
        &lt;div class="name">sort-by-attributes&lt;/div>
        &lt;div class="fontclass">.uf-sortdown&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sort19">&lt;/i>
        &lt;div class="name">sort-by-numeric-order&lt;/div>
        &lt;div class="fontclass">.uf-sort19&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sort91">&lt;/i>
        &lt;div class="name">sort-by-order&lt;/div>
        &lt;div class="fontclass">.uf-sort91&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-za">&lt;/i>
        &lt;div class="name">sort-reverse-alphabetical-order&lt;/div>
        &lt;div class="fontclass">.uf-za&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-star-o">&lt;/i>
        &lt;div class="name">star-1&lt;/div>
        &lt;div class="fontclass">.uf-star-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-star-2">&lt;/i>
        &lt;div class="name">star-half-empty&lt;/div>
        &lt;div class="fontclass">.uf-star-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-star">&lt;/i>
        &lt;div class="name">star&lt;/div>
        &lt;div class="fontclass">.uf-star&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-luggage">&lt;/i>
        &lt;div class="name">suitcase-with-white-details&lt;/div>
        &lt;div class="fontclass">.uf-luggage&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-table">&lt;/i>
        &lt;div class="name">table-grid&lt;/div>
        &lt;div class="fontclass">.uf-table&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-tel">&lt;/i>
        &lt;div class="name">telephone-handle-silhouette&lt;/div>
        &lt;div class="fontclass">.uf-tel&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-tel-s">&lt;/i>
        &lt;div class="name">telephone-symbol-button&lt;/div>
        &lt;div class="fontclass">.uf-tel-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-terminal">&lt;/i>
        &lt;div class="name">terminal&lt;/div>
        &lt;div class="fontclass">.uf-terminal&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-file">&lt;/i>
        &lt;div class="name">text-file-1&lt;/div>
        &lt;div class="fontclass">.uf-file&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-file-o">&lt;/i>
        &lt;div class="name">text-file&lt;/div>
        &lt;div class="fontclass">.uf-file-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-3dot-h">&lt;/i>
        &lt;div class="name">three-small-square-shapes&lt;/div>
        &lt;div class="fontclass">.uf-3dot-h&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-time-c-o">&lt;/i>
        &lt;div class="name">time&lt;/div>
        &lt;div class="fontclass">.uf-time-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-upload">&lt;/i>
        &lt;div class="name">upload&lt;/div>
        &lt;div class="fontclass">.uf-upload&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-3dot-v">&lt;/i>
        &lt;div class="name">vertical-ellipsis&lt;/div>
        &lt;div class="fontclass">.uf-3dot-v&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rmb">&lt;/i>
        &lt;div class="name">yen-symbol&lt;/div>
        &lt;div class="fontclass">.uf-rmb&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-c-o-up">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-arrow-c-o-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-reject-2">&lt;/i>
        &lt;div class="name">驳回&lt;/div>
        &lt;div class="fontclass">.uf-reject-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-barcode">&lt;/i>
        &lt;div class="name">barcode-1&lt;/div>
        &lt;div class="fontclass">.uf-barcode&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-zoom-out">&lt;/i>
        &lt;div class="name">zoom-out&lt;/div>
        &lt;div class="fontclass">.uf-zoom-out&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-exc-t-o">&lt;/i>
        &lt;div class="name">三角叹号&lt;/div>
        &lt;div class="fontclass">.uf-exc-t-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-pass">&lt;/i>
        &lt;div class="name">通过&lt;/div>
        &lt;div class="fontclass">.uf-pass&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-flow">&lt;/i>
        &lt;div class="name">关系网络&lt;/div>
        &lt;div class="fontclass">.uf-flow&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-add-c">&lt;/i>
        &lt;div class="name">加&lt;/div>
        &lt;div class="fontclass">.uf-add-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-c-o-right-2">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-arrow-c-o-right-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-shelf-on">&lt;/i>
        &lt;div class="name">上架&lt;/div>
        &lt;div class="fontclass">.uf-shelf-on&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-shelf-off">&lt;/i>
        &lt;div class="name">下架&lt;/div>
        &lt;div class="fontclass">.uf-shelf-off&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-file-o-2">&lt;/i>
        &lt;div class="name">文件&lt;/div>
        &lt;div class="fontclass">.uf-file-o-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-truck-o">&lt;/i>
        &lt;div class="name">到货确认&lt;/div>
        &lt;div class="fontclass">.uf-truck-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-super">&lt;/i>
        &lt;div class="name">功能强大&lt;/div>
        &lt;div class="fontclass">.uf-super&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-equipment">&lt;/i>
        &lt;div class="name">设备&lt;/div>
        &lt;div class="fontclass">.uf-equipment&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-c-o-left-2">&lt;/i>
        &lt;div class="name">箭头&lt;/div>
        &lt;div class="fontclass">.uf-arrow-c-o-left-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-files-o">&lt;/i>
        &lt;div class="name">资源文件&lt;/div>
        &lt;div class="fontclass">.uf-files-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cloud-o">&lt;/i>
        &lt;div class="name">云&lt;/div>
        &lt;div class="fontclass">.uf-cloud-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rmb-s-o-2">&lt;/i>
        &lt;div class="name">对账&lt;/div>
        &lt;div class="fontclass">.uf-rmb-s-o-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-3dot-c-o">&lt;/i>
        &lt;div class="name">管理中心&lt;/div>
        &lt;div class="fontclass">.uf-3dot-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-dafeng">&lt;/i>
        &lt;div class="name">天气_大风&lt;/div>
        &lt;div class="fontclass">.uf-dafeng&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-baoxue">&lt;/i>
        &lt;div class="name">天气_暴雪&lt;/div>
        &lt;div class="fontclass">.uf-baoxue&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bingbao">&lt;/i>
        &lt;div class="name">天气_冰雹&lt;/div>
        &lt;div class="fontclass">.uf-bingbao&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-fengbao">&lt;/i>
        &lt;div class="name">天气_风暴&lt;/div>
        &lt;div class="fontclass">.uf-fengbao&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-xiaoyu">&lt;/i>
        &lt;div class="name">天气_小雨&lt;/div>
        &lt;div class="fontclass">.uf-xiaoyu&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-zhenxue">&lt;/i>
        &lt;div class="name">天气_阵雪&lt;/div>
        &lt;div class="fontclass">.uf-zhenxue&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-zhongyu">&lt;/i>
        &lt;div class="name">天气_中雨&lt;/div>
        &lt;div class="fontclass">.uf-zhongyu&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-es">&lt;/i>
        &lt;div class="name">ES&lt;/div>
        &lt;div class="fontclass">.uf-es&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-flow-o-2">&lt;/i>
        &lt;div class="name">流程&lt;/div>
        &lt;div class="fontclass">.uf-flow-o-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-activate-2">&lt;/i>
        &lt;div class="name">激活-01&lt;/div>
        &lt;div class="fontclass">.uf-activate-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-flow-o">&lt;/i>
        &lt;div class="name">流程&lt;/div>
        &lt;div class="fontclass">.uf-flow-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bulb-2">&lt;/i>
        &lt;div class="name">技术支持&lt;/div>
        &lt;div class="fontclass">.uf-bulb-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-mi-c">&lt;/i>
        &lt;div class="name">必填&lt;/div>
        &lt;div class="fontclass">.uf-mi-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-top-up">&lt;/i>
        &lt;div class="name">返回顶部&lt;/div>
        &lt;div class="fontclass">.uf-top-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-creditcard">&lt;/i>
        &lt;div class="name">credit-card&lt;/div>
        &lt;div class="fontclass">.uf-creditcard&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-align-center">&lt;/i>
        &lt;div class="name">align-center&lt;/div>
        &lt;div class="fontclass">.uf-align-center&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-align-justify">&lt;/i>
        &lt;div class="name">align-justify&lt;/div>
        &lt;div class="fontclass">.uf-align-justify&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-align-left">&lt;/i>
        &lt;div class="name">align-left&lt;/div>
        &lt;div class="fontclass">.uf-align-left&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-align-right">&lt;/i>
        &lt;div class="name">align-right&lt;/div>
        &lt;div class="fontclass">.uf-align-right&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-ju-c-o">&lt;/i>
        &lt;div class="name">拒&lt;/div>
        &lt;div class="fontclass">.uf-ju-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-truck">&lt;/i>
        &lt;div class="name">货到付款&lt;/div>
        &lt;div class="fontclass">.uf-truck&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-setting-c-o">&lt;/i>
        &lt;div class="name">流程&lt;/div>
        &lt;div class="fontclass">.uf-setting-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-users-o">&lt;/i>
        &lt;div class="name">楼宇图标_用户组&lt;/div>
        &lt;div class="fontclass">.uf-users-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bag-s-o">&lt;/i>
        &lt;div class="name">商品&lt;/div>
        &lt;div class="fontclass">.uf-bag-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cai-s">&lt;/i>
        &lt;div class="name">采购&lt;/div>
        &lt;div class="fontclass">.uf-cai-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-listcheck">&lt;/i>
        &lt;div class="name">定标&lt;/div>
        &lt;div class="fontclass">.uf-listcheck&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-users">&lt;/i>
        &lt;div class="name">群&lt;/div>
        &lt;div class="fontclass">.uf-users&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-i-c">&lt;/i>
        &lt;div class="name">查看详情&lt;/div>
        &lt;div class="fontclass">.uf-i-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-building-o">&lt;/i>
        &lt;div class="name">企业信息&lt;/div>
        &lt;div class="fontclass">.uf-building-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rmb-s-o">&lt;/i>
        &lt;div class="name">报价管理&lt;/div>
        &lt;div class="fontclass">.uf-rmb-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-reject">&lt;/i>
        &lt;div class="name">已驳回&lt;/div>
        &lt;div class="fontclass">.uf-reject&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-9dot">&lt;/i>
        &lt;div class="name">菜单&lt;/div>
        &lt;div class="fontclass">.uf-9dot&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-gateway">&lt;/i>
        &lt;div class="name">网关&lt;/div>
        &lt;div class="fontclass">.uf-gateway&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-ticket-s-o">&lt;/i>
        &lt;div class="name">发票&lt;/div>
        &lt;div class="fontclass">.uf-ticket-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-userset">&lt;/i>
        &lt;div class="name">管理中心&lt;/div>
        &lt;div class="fontclass">.uf-userset&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-puzzle-o">&lt;/i>
        &lt;div class="name">组件&lt;/div>
        &lt;div class="fontclass">.uf-puzzle-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-box-o">&lt;/i>
        &lt;div class="name">物料管理&lt;/div>
        &lt;div class="fontclass">.uf-box-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bulb">&lt;/i>
        &lt;div class="name">激活&lt;/div>
        &lt;div class="fontclass">.uf-bulb&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-exc-t">&lt;/i>
        &lt;div class="name">感叹号_icon&lt;/div>
        &lt;div class="fontclass">.uf-exc-t&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-rmb-c">&lt;/i>
        &lt;div class="name">报价&lt;/div>
        &lt;div class="fontclass">.uf-rmb-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-table-s-o">&lt;/i>
        &lt;div class="name">发票&lt;/div>
        &lt;div class="fontclass">.uf-table-s-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-umbrella-o">&lt;/i>
        &lt;div class="name">伞&lt;/div>
        &lt;div class="fontclass">.uf-umbrella-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-dropbox">&lt;/i>
        &lt;div class="name">dropbox&lt;/div>
        &lt;div class="fontclass">.uf-dropbox&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-search-light">&lt;/i>
        &lt;div class="name">搜索-搜索&lt;/div>
        &lt;div class="fontclass">.uf-search-light&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-cart-o">&lt;/i>
        &lt;div class="name">shopping-cart-black-shape&lt;/div>
        &lt;div class="fontclass">.uf-cart-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-kero-col">&lt;/i>
        &lt;div class="name">kero&lt;/div>
        &lt;div class="fontclass">.uf-kero-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-uba-col">&lt;/i>
        &lt;div class="name">uba&lt;/div>
        &lt;div class="fontclass">.uf-uba-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-tinperzc-col">&lt;/i>
        &lt;div class="name">tinperzc&lt;/div>
        &lt;div class="fontclass">.uf-tinperzc-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-tinperzch-col">&lt;/i>
        &lt;div class="name">tinperzch&lt;/div>
        &lt;div class="fontclass">.uf-tinperzch-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-iuap-col">&lt;/i>
        &lt;div class="name">iuap&lt;/div>
        &lt;div class="fontclass">.uf-iuap-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-iuapdesign-col">&lt;/i>
        &lt;div class="name">iuapdesignz&lt;/div>
        &lt;div class="fontclass">.uf-iuapdesign-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-bee-col">&lt;/i>
        &lt;div class="name">bee&lt;/div>
        &lt;div class="fontclass">.uf-bee-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-neoui-col">&lt;/i>
        &lt;div class="name">neoui&lt;/div>
        &lt;div class="fontclass">.uf-neoui-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-sparrow-col">&lt;/i>
        &lt;div class="name">sparrow&lt;/div>
        &lt;div class="fontclass">.uf-sparrow-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-tinpercn-col">&lt;/i>
        &lt;div class="name">tinpercn&lt;/div>
        &lt;div class="fontclass">.uf-tinpercn-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-tinperen-col">&lt;/i>
        &lt;div class="name">tinperen&lt;/div>
        &lt;div class="fontclass">.uf-tinperen-col&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-arrow-up">&lt;/i>
        &lt;div class="name">angle-arrow-down&lt;/div>
        &lt;div class="fontclass">.uf-arrow-up&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-mailsym">&lt;/i>
        &lt;div class="name">webmail&lt;/div>
        &lt;div class="fontclass">.uf-mailsym&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-print">&lt;/i>
        &lt;div class="name">办公用品&lt;/div>
        &lt;div class="fontclass">.uf-print&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-ticket-3">&lt;/i>
        &lt;div class="name">报销&lt;/div>
        &lt;div class="fontclass">.uf-ticket-3&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-loan">&lt;/i>
        &lt;div class="name">借款&lt;/div>
        &lt;div class="fontclass">.uf-loan&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-ticket-2">&lt;/i>
        &lt;div class="name">凭证中心&lt;/div>
        &lt;div class="fontclass">.uf-ticket-2&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-offwork">&lt;/i>
        &lt;div class="name">请假&lt;/div>
        &lt;div class="fontclass">.uf-offwork&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-todolist">&lt;/i>
        &lt;div class="name">待办&lt;/div>
        &lt;div class="fontclass">.uf-todolist&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-personin">&lt;/i>
        &lt;div class="name">员工入职&lt;/div>
        &lt;div class="fontclass">.uf-personin&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-ticket">&lt;/i>
        &lt;div class="name">票务&lt;/div>
        &lt;div class="fontclass">.uf-ticket&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-linechart">&lt;/i>
        &lt;div class="name">小icon-图表&lt;/div>
        &lt;div class="fontclass">.uf-linechart&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-4leaf">&lt;/i>
        &lt;div class="name">应用中心&lt;/div>
        &lt;div class="fontclass">.uf-4leaf&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-listset">&lt;/i>
        &lt;div class="name">信息维护&lt;/div>
        &lt;div class="fontclass">.uf-listset&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-qi-c-o">&lt;/i>
        &lt;div class="name">企业认证&lt;/div>
        &lt;div class="fontclass">.uf-qi-c-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-exc-c">&lt;/i>
        &lt;div class="name">叹号&lt;/div>
        &lt;div class="fontclass">.uf-exc-c&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-plug-o">&lt;/i>
        &lt;div class="name">热拔插&lt;/div>
        &lt;div class="fontclass">.uf-plug-o&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-search-s">&lt;/i>
        &lt;div class="name">搜索&lt;/div>
        &lt;div class="fontclass">.uf-search-s&lt;/div>
    &lt;/li>

    &lt;li>
        &lt;i class="icon uf uf-treeadd">&lt;/i>
        &lt;div class="name">tree-new-sbling-node&lt;/div>
        &lt;div class="fontclass">.uf-treeadd&lt;/div>
    &lt;/li>

&lt;/ul>
&lt;/div>
</code></pre>
</div>

<div class="examples-code"><pre><code>

/* 清除浮动 */

.ks-clear:after,
.clear:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
}

.ks-clear,
.clear {
    overflow:hidden;
    *zoom: 1;
}

.main {
    padding: 30px 100px;
}

.main h1 {
    font-size: 36px;
    color: #333;
    text-align: left;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
}

.helps {
    margin-top: 40px;
}

.helps pre {
    padding: 20px;
    margin: 10px 0;
    border: solid 1px #e7e1cd;
    background-color: #fffdef;
    overflow: auto;
}

.icon_lists li {
    float: left;
    width: 100px;
    height: 100px;
    text-align: center;
    list-style: none;
}

.icon_lists .icon {
    font-size: 32px;
    line-height: 60px;
    margin: 10px 0;
    color: #616161;
    -webkit-transition: font-size 0.25s ease-out 0s;
    -moz-transition: font-size 0.25s ease-out 0s;
    transition: font-size 0.25s ease-out 0s;
}
.icon_lists li .name{
    display:none;
}

.icon_lists li .fontclass{
    font-size:12px!important;
	color:#616161;
}

.icon_lists .icon:hover {
    font-size: 50px;
}
</code></pre>
</div>


