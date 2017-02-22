# message控件

用于即时信息的提示，添加.u-message即可实现一个基本的消息提示。其他效果的消息实现只需添加相应的样式即可。


# 示例

## 基础message

* `.u-mesnews` - 新闻类提示
* `.u-mesinfo` - 普通信息提示
* `.u-messuccess` - 成功信息提示
* `.u-mesdanger` - 错误信息提示
* `.u-meswarning` - 警告信息提示


<div class="example-content"><div class="example">
    <div class="u-message u-mesnews active">
        <span class="u-msg-close uf uf-close"></span>
        News!
    </div>
    <div class="u-message u-mesinfo active">
        <span class="u-msg-close uf uf-close"></span>
        Info!
    </div>
    <div class="u-message u-messuccess active">
        <span class="u-msg-close uf uf-close"></span>
        Success!
    </div>
    <div class="u-message u-mesdanger active">
        <span class="u-msg-close uf uf-close"></span>
        Danger!
    </div>
    <div class="u-message u-meswarning active">
        <span class="u-msg-close uf uf-close"></span>
        Warning!
    </div>
</div>
</div>

<div class="example-content ex-hide"><style>
.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
</style></div>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;div class="example">
    &lt;div class="u-message u-mesnews active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        News!
    &lt;/div>
    &lt;div class="u-message u-mesinfo active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        Info!
    &lt;/div>
    &lt;div class="u-message u-messuccess active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        Success!
    &lt;/div>
    &lt;div class="u-message u-mesdanger active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        Danger!
    &lt;/div>
    &lt;div class="u-message u-meswarning active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        Warning!
    &lt;/div>
&lt;/div>
</code></pre>
</div>

<div class="examples-code"><pre><code>
.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}</code></pre>
</div>


</div>

## 带`icon`的加深颜色版message

背景色加深 `.dark`类提供了选择

消息类型对应相应的icon

<div class="example-content"><div class="example">
    <div class="u-message dark u-mesnews active" >    
        <span class="u-msg-close uf uf-close"></span>
        <i class="uf uf-bell margin-r-10"></i>News!
    </div>
    <div class="u-message dark u-mesinfo active">
        <span class="u-msg-close uf uf-close"></span>
        <i class="uf uf-i-c-2 margin-r-10"></i>Info!
    </div>
    <div class="u-message dark u-messuccess active">    
        <span class="u-msg-close uf uf-close"></span>
        <i class="uf uf-correct margin-r-10"></i>Success!
    </div>
    <div class="u-message dark u-mesdanger active">
        <span class="u-msg-close uf uf-close"></span>
        <i class="uf uf-close-c margin-r-10"></i>Danger!
    </div>
    <div class="u-message dark u-meswarning active">
        <span class="u-msg-close uf uf-close"></span>
        <i class="uf uf-exc-t-o margin-r-10"></i>Warning!
    </div>
</div></div>

<div class="example-content ex-hide"><style>
.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
</style></div>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;div class="example">
    &lt;div class="u-message dark u-mesnews active" >    
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        &lt;i class="uf uf-bell margin-r-10">&lt;/i>News!
    &lt;/div>
    &lt;div class="u-message dark u-mesinfo active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        &lt;i class="uf uf-i-c-2 margin-r-10">&lt;/i>Info!
    &lt;/div>
    &lt;div class="u-message dark u-messuccess active">    
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        &lt;i class="uf uf-correct margin-r-10">&lt;/i>Success!
    &lt;/div>
    &lt;div class="u-message dark u-mesdanger active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        &lt;i class="uf uf-close-c margin-r-10">&lt;/i>Danger!
    &lt;/div>
    &lt;div class="u-message dark u-meswarning active">
        &lt;span class="u-msg-close uf uf-close">&lt;/span>
        &lt;i class="uf uf-exc-t-o margin-r-10">&lt;/i>Warning!
    &lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}</code></pre>
</div>


</div>





<script>
var msgBtn = document.body.querySelector("#msgBtn");
var errorBtn = document.body.querySelector("#errorBtn");
var warnBtn = document.body.querySelector("#warnBtn");
var rightInfo='<i class="uf uf-correct margin-r-5"></i>成功信息!!!';
u.on(msgBtn,'click', function(){ 
    u.showMessage({msg:rightInfo,position:"center"})
})

var errorInfo='<i class="uf uf-close-c margin-r-5"></i>错误信息!!!'
u.on(errorBtn,'click', function(){ 
    u.showMessage({msg:errorInfo,position:"center",msgType:"error"})
})

var warningInfo='<i class="uf uf-exc-t-o margin-r-5"></i>警告信息!!!';
u.on(warnBtn,'click', function(){ 
    u.showMessage({msg:warningInfo,position:"center",msgType:"warning"})
})
</script>

<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button>

<pre class="examples-code"><code>
var msgBtn = document.body.querySelector("#msgBtn");
var errorBtn = document.body.querySelector("#errorBtn");
var warnBtn = document.body.querySelector("#warnBtn");
var rightInfo='<i class="uf uf-correct margin-r-5"></i>成功信息!!!';
u.on(msgBtn,'click', function(){ 
    u.showMessage({msg:rightInfo,position:"center"})
})

var errorInfo='<i class="uf uf-close-c margin-r-5"></i>错误信息!!!'
u.on(errorBtn,'click', function(){ 
    u.showMessage({msg:errorInfo,position:"center",msgType:"error"})
})

var warningInfo='<i class="uf uf-exc-t-o margin-r-5"></i>警告信息!!!';
u.on(warnBtn,'click', function(){ 
    u.showMessage({msg:warningInfo,position:"center",msgType:"warning"})
})</code></pre>

</div>