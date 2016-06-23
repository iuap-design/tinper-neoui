# message控件

用于即时信息的提示，消息背景色取决于消息类型，易可添加相对应的`icon`

# 如何使用

给父元素添加`.u-message`类
自定义类型背景  例如new  在父元素添加`.u-mesnews`类

# 示例


##基础Message

消息类型对应不同class属性则显示不同的背景色
``news --  u-mesnews`
`info --  u-mesinfo`
`success -- u-messuccess`
`danger -- u-mesdanger`
`warning -- u-meswarning`

<div class="csstag" style="display:none">.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
.example{
	width: 300px;
}
</div>
<div class="example-content"><div class="example">
    <div class="u-message u-mesnews active" >    
        <span class="u-msg-close fa fa-close"></span>
        News!
    </div>
    <div class="u-message u-mesinfo active">
        <span class="u-msg-close fa fa-close"></span>
        Info!
    </div>
    <div class="u-message u-messuccess active">    
        <span class="u-msg-close fa fa-close"></span>
        Success!
    </div>
    <div class="u-message u-mesdanger active">
        <span class="u-msg-close fa fa-close"></span>
        Danger!
    </div>
    <div class="u-message u-meswarning active">
        <span class="u-msg-close fa fa-close"></span>
        Warning!
    </div>
</div>
</div>
<div class="examples-code"><pre><code>.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
.example{
	width: 300px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example">
    &lt;div class="u-message u-mesnews active" >    
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        News!
    &lt;/div>
    &lt;div class="u-message u-mesinfo active">
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        Info!
    &lt;/div>
    &lt;div class="u-message u-messuccess active">    
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        Success!
    &lt;/div>
    &lt;div class="u-message u-mesdanger active">
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        Danger!
    &lt;/div>
    &lt;div class="u-message u-meswarning active">
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        Warning!
    &lt;/div>
&lt;/div></code></pre>
</div>

##带`icon`的加深颜色版Message

背景色加深 `.dark`类提供了选择

消息类型对应相应的icon
`news -- fa fa-bell`
`info -- fa fa-info-circle`
`success -- fa fa-check-circle`
`danger -- fa fa-times-circle`
`warning -- fa fa-warning`

<div class="example-content"><div class="example">
    <div class="u-message dark u-mesnews active" >    
        <span class="u-msg-close fa fa-close"></span>
        <i class="fa fa-bell margin-r-10"></i>News!
    </div>
    <div class="u-message dark u-mesinfo active">
        <span class="u-msg-close fa fa-close"></span>
        <i class="fa fa-info-circle margin-r-10"></i>Info!
    </div>
    <div class="u-message dark u-messuccess active">    
        <span class="u-msg-close fa fa-close"></span>
        <i class="fa fa-check-circle margin-r-10"></i>Success!
    </div>
    <div class="u-message dark u-mesdanger active">
        <span class="u-msg-close fa fa-close"></span>
        <i class="fa fa-times-circle margin-r-10"></i>Danger!
    </div>
    <div class="u-message dark u-meswarning active">
        <span class="u-msg-close fa fa-close"></span>
        <i class="fa fa-warning margin-r-10"></i>Warning!
    </div>
</div>
</div>
<div class="csstag" style="display:none">.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
.example{
	width: 300px;
}
</div>
<div class="examples-code"><pre><code>&lt;div class="example">
    &lt;div class="u-message dark u-mesnews active" >    
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        &lt;i class="fa fa-bell margin-r-10">&lt;/i>News!
    &lt;/div>
    &lt;div class="u-message dark u-mesinfo active">
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        &lt;i class="fa fa-info-circle margin-r-10">&lt;/i>Info!
    &lt;/div>
    &lt;div class="u-message dark u-messuccess active">    
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        &lt;i class="fa fa-check-circle margin-r-10">&lt;/i>Success!
    &lt;/div>
    &lt;div class="u-message dark u-mesdanger active">
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        &lt;i class="fa fa-times-circle margin-r-10">&lt;/i>Danger!
    &lt;/div>
    &lt;div class="u-message dark u-meswarning active">
        &lt;span class="u-msg-close fa fa-close">&lt;/span>
        &lt;i class="fa fa-warning margin-r-10">&lt;/i>Warning!
    &lt;/div>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
.example{
	width: 300px;
}</code></pre>
</div>

##点击触发Message
<div class="csstag" style="display:none">.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
.example{
	width: 300px;
}
</div>
<div class="example-content"><button id="msgBtn" class="u-button" >Success</button>
<button id="errorBtn" class="u-button" >Error</button>
<button id="warnBtn" class="u-button" >Warning</button>
</div>
<div class="examples-code"><pre><code>.margin-r-10{
    margin-right: 10px; 
}
.example .u-message{
    position: inherit;
}
.example{
	width: 300px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;button id="msgBtn" class="u-button" >Success&lt;/button>
&lt;button id="errorBtn" class="u-button" >Error&lt;/button>
&lt;button id="warnBtn" class="u-button" >Warning&lt;/button></code></pre>
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
