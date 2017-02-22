# tree控件

tree控件其实就是[zTree](http://www.treejs.cn/v3/main.php#_zTreeInfo)，是一个依靠 jQuery 实现的多功能 “树插件”。


[试一试](http://tinper.org/webide/#/demos/ui/tree)


# API

API参见[zTree官网API介绍](http://www.treejs.cn/v3/api.php)


相关内容：

[树在kero中使用](http://tinper.org/dist/kero/docs/tree.html) 

## 基础Tree - 标准JSON数据

用于多层目录的嵌套结构的数据。

<div class="example-content"><ul id="treeDemo" class="ztree"></ul>
       
</div>



<script>
var zTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {};
// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
var zNodes = [
{
    name:"test1",
    open:false, //设置折叠状态，默认为false折叠
    children:[
        {name:"test1_1"},
        {name:"test1_2"}]
    },
{
    name:"test2",
    open:true,
    children:[
        {name:"test2_1"},
        {name:"test2_2"}]}
];
$(document).ready(function(){
  zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});

</script>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;ul id="treeDemo" class="ztree">&lt;/ul>
       
</code></pre>
</div>


<pre class="examples-code"><code>
var zTreeObj;
// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {};
// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
var zNodes = [
{
    name:"test1",
    open:false, //设置折叠状态，默认为false折叠
    children:[
        {name:"test1_1"},
        {name:"test1_2"}]
    },
{
    name:"test2",
    open:true,
    children:[
        {name:"test2_1"},
        {name:"test2_2"}]}
];
$(document).ready(function(){
  zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});
</code></pre>

</div>

## 基础Tree - 简单JSON数据

用于多层目录的嵌套结构的数据。

<div class="example-content"><ul id="treeSimple" class="ztree"></ul>
</div>



<script>
var simpleObj;
var simpleSet = {
    data: {
        // 开启简单数据模式
        simpleData: {
            enable: true
        }
    }
};
// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
var simpleNodes =[
    { id:1, pId:0, name:"父节点1 - 展开", open:true},
    { id:11, pId:1, name:"父节点11 - 折叠"},
    { id:111, pId:11, name:"叶子节点111"},
    { id:112, pId:11, name:"叶子节点112"},
    { id:113, pId:11, name:"叶子节点113"},
    { id:114, pId:11, name:"叶子节点114"},
    { id:12, pId:1, name:"父节点12 - 折叠"},
    { id:121, pId:12, name:"叶子节点121"},
    { id:122, pId:12, name:"叶子节点122"},
    { id:123, pId:12, name:"叶子节点123"},
    { id:124, pId:12, name:"叶子节点124"},
    { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
    { id:2, pId:0, name:"父节点2 - 折叠"},
    { id:21, pId:2, name:"父节点21 - 展开", open:true},
    { id:211, pId:21, name:"叶子节点211"},
    { id:212, pId:21, name:"叶子节点212"},
    { id:213, pId:21, name:"叶子节点213"},
    { id:214, pId:21, name:"叶子节点214"},
    { id:22, pId:2, name:"父节点22 - 折叠"},
    { id:221, pId:22, name:"叶子节点221"},
    { id:222, pId:22, name:"叶子节点222"},
    { id:223, pId:22, name:"叶子节点223"},
    { id:224, pId:22, name:"叶子节点224"},
    { id:23, pId:2, name:"父节点23 - 折叠"},
    { id:231, pId:23, name:"叶子节点231"},
    { id:232, pId:23, name:"叶子节点232"},
    { id:233, pId:23, name:"叶子节点233"},
    { id:234, pId:23, name:"叶子节点234"},
    { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
];
$(document).ready(function(){
  simpleObj = $.fn.zTree.init($("#treeSimple"), simpleSet, simpleNodes);
});

</script>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;ul id="treeSimple" class="ztree">&lt;/ul>
</code></pre>
</div>


<pre class="examples-code"><code>
var simpleObj;
var simpleSet = {
    data: {
        // 开启简单数据模式
        simpleData: {
            enable: true
        }
    }
};
// zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
var simpleNodes =[
    { id:1, pId:0, name:"父节点1 - 展开", open:true},
    { id:11, pId:1, name:"父节点11 - 折叠"},
    { id:111, pId:11, name:"叶子节点111"},
    { id:112, pId:11, name:"叶子节点112"},
    { id:113, pId:11, name:"叶子节点113"},
    { id:114, pId:11, name:"叶子节点114"},
    { id:12, pId:1, name:"父节点12 - 折叠"},
    { id:121, pId:12, name:"叶子节点121"},
    { id:122, pId:12, name:"叶子节点122"},
    { id:123, pId:12, name:"叶子节点123"},
    { id:124, pId:12, name:"叶子节点124"},
    { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
    { id:2, pId:0, name:"父节点2 - 折叠"},
    { id:21, pId:2, name:"父节点21 - 展开", open:true},
    { id:211, pId:21, name:"叶子节点211"},
    { id:212, pId:21, name:"叶子节点212"},
    { id:213, pId:21, name:"叶子节点213"},
    { id:214, pId:21, name:"叶子节点214"},
    { id:22, pId:2, name:"父节点22 - 折叠"},
    { id:221, pId:22, name:"叶子节点221"},
    { id:222, pId:22, name:"叶子节点222"},
    { id:223, pId:22, name:"叶子节点223"},
    { id:224, pId:22, name:"叶子节点224"},
    { id:23, pId:2, name:"父节点23 - 折叠"},
    { id:231, pId:23, name:"叶子节点231"},
    { id:232, pId:23, name:"叶子节点232"},
    { id:233, pId:23, name:"叶子节点233"},
    { id:234, pId:23, name:"叶子节点234"},
    { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
];
$(document).ready(function(){
  simpleObj = $.fn.zTree.init($("#treeSimple"), simpleSet, simpleNodes);
});
</code></pre>

</div>

## Tree - 点击事件

数据增加点击效果。

<div class="example-content"><ul id="clickTree" class="ztree"></ul>
</div>



<script>
var clickSet = {
    data: {
        key: {
            title:"t"
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        onClick: onClick
    }
};

var clickNodes =[
    { id:1, pId:0, name:"普通的父节点", t:"我很普通，随便点我吧", open:true},
    { id:11, pId:1, name:"叶子节点 - 1", t:"我很普通，随便点我吧"},
    { id:12, pId:1, name:"叶子节点 - 2", t:"我很普通，随便点我吧"},
    { id:13, pId:1, name:"叶子节点 - 3", t:"我很普通，随便点我吧"}
];

var log, className = "dark";
function beforeClick(treeId, treeNode, clickFlag) {
    className = (className === "dark" ? "":"dark");
    alert("[ "+getTime()+" beforeClick ] " + treeNode.name );
    return (treeNode.click != false);
}
function onClick(event, treeId, treeNode, clickFlag) {
    alert("[ "+getTime()+" onClick ] clickFlag = " + clickFlag + " (" + (clickFlag===1 ? "普通选中": (clickFlag===0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
}
function getTime() {
    var now= new Date(),
    h=now.getHours(),
    m=now.getMinutes(),
    s=now.getSeconds();
    return (h+":"+m+":"+s);
}

$(document).ready(function(){
    $.fn.zTree.init($("#clickTree"), clickSet, clickNodes);
});

</script>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;ul id="clickTree" class="ztree">&lt;/ul>
</code></pre>
</div>


<pre class="examples-code"><code>
var clickSet = {
    data: {
        key: {
            title:"t"
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        onClick: onClick
    }
};

var clickNodes =[
    { id:1, pId:0, name:"普通的父节点", t:"我很普通，随便点我吧", open:true},
    { id:11, pId:1, name:"叶子节点 - 1", t:"我很普通，随便点我吧"},
    { id:12, pId:1, name:"叶子节点 - 2", t:"我很普通，随便点我吧"},
    { id:13, pId:1, name:"叶子节点 - 3", t:"我很普通，随便点我吧"}
];

var log, className = "dark";
function beforeClick(treeId, treeNode, clickFlag) {
    className = (className === "dark" ? "":"dark");
    alert("[ "+getTime()+" beforeClick ] " + treeNode.name );
    return (treeNode.click != false);
}
function onClick(event, treeId, treeNode, clickFlag) {
    alert("[ "+getTime()+" onClick ] clickFlag = " + clickFlag + " (" + (clickFlag===1 ? "普通选中": (clickFlag===0 ? "<b>取消选中</b>" : "<b>追加选中</b>")) + ")");
}
function getTime() {
    var now= new Date(),
    h=now.getHours(),
    m=now.getMinutes(),
    s=now.getSeconds();
    return (h+":"+m+":"+s);
}

$(document).ready(function(){
    $.fn.zTree.init($("#clickTree"), clickSet, clickNodes);
});
</code></pre>

</div>