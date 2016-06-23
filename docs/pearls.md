# tree控件

tree控件

# 如何使用

暂无

# 示例


##基础Pearls

常用于流程步骤的跟踪。
<style>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}
</style>
<div class="example-content"><div class="example-wrap">
    <h4 class="example-title">Default</h4>
    <div class="example">
      <div class="pearls row">
        <div class="pearl done col-xs-4">
          <span class="pearl-number">1</span>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <span class="pearl-number">2</span>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl col-xs-4">
          <span class="pearl-number">3</span>
          <span class="pearl-title">Confirmation</span>
        </div>
      </div>
    </div>
</div>
</div>
<div class="examples-code"><pre><code>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example-wrap">
    &lt;h4 class="example-title">Default&lt;/h4>
    &lt;div class="example">
      &lt;div class="pearls row">
        &lt;div class="pearl done col-xs-4">
          &lt;span class="pearl-number">1&lt;/span>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;span class="pearl-number">2&lt;/span>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl col-xs-4">
          &lt;span class="pearl-number">3&lt;/span>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
      &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

##带icon的Pearls

将数据换成icon，适用于多场景的流程步骤。
<style>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}
</style>
<div class="example-content"><div class="example-wrap">
    <h4 class="example-title">Icon</h4>
    <div class="example">
      <div class="pearls row">
        <div class="pearl done col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-user" aria-hidden="true"></i></div>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-check" aria-hidden="true"></i></div>
          <span class="pearl-title">Confirmation</span>
        </div>
      </div>
    </div>
</div>
</div>
<div class="examples-code"><pre><code>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example-wrap">
    &lt;h4 class="example-title">Icon&lt;/h4>
    &lt;div class="example">
      &lt;div class="pearls row">
        &lt;div class="pearl done col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-user" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-check" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
      &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

##不同尺寸Pearls

pearls-xs pearls-sm pearls-lg 供尺寸的选择
<style>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}
</style>
<div class="example-content"><div class="example">
    <div class="pearls pearls-xs row">
        <div class="pearl done col-xs-4">
          <span class="pearl-number">1</span>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <span class="pearl-number">2</span>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl col-xs-4">
          <span class="pearl-number">3</span>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
<div class="example">
    <div class="pearls pearls-sm row">
        <div class="pearl done col-xs-4">
          <span class="pearl-number">1</span>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <span class="pearl-number">2</span>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl col-xs-4">
          <span class="pearl-number">3</span>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
<div class="example">
    <div class="pearls row">
        <div class="pearl done col-xs-4">
          <span class="pearl-number">1</span>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <span class="pearl-number">2</span>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl col-xs-4">
          <span class="pearl-number">3</span>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
<div class="example">
    <div class="pearls pearls-lg row">
        <div class="pearl done col-xs-4">
          <span class="pearl-number">1</span>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <span class="pearl-number">2</span>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl col-xs-4">
          <span class="pearl-number">3</span>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
</div>
<div class="examples-code"><pre><code>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example">
    &lt;div class="pearls pearls-xs row">
        &lt;div class="pearl done col-xs-4">
          &lt;span class="pearl-number">1&lt;/span>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;span class="pearl-number">2&lt;/span>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl col-xs-4">
          &lt;span class="pearl-number">3&lt;/span>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div>
&lt;div class="example">
    &lt;div class="pearls pearls-sm row">
        &lt;div class="pearl done col-xs-4">
          &lt;span class="pearl-number">1&lt;/span>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;span class="pearl-number">2&lt;/span>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl col-xs-4">
          &lt;span class="pearl-number">3&lt;/span>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div>
&lt;div class="example">
    &lt;div class="pearls row">
        &lt;div class="pearl done col-xs-4">
          &lt;span class="pearl-number">1&lt;/span>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;span class="pearl-number">2&lt;/span>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl col-xs-4">
          &lt;span class="pearl-number">3&lt;/span>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div>
&lt;div class="example">
    &lt;div class="pearls pearls-lg row">
        &lt;div class="pearl done col-xs-4">
          &lt;span class="pearl-number">1&lt;/span>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;span class="pearl-number">2&lt;/span>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl col-xs-4">
          &lt;span class="pearl-number">3&lt;/span>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

##多状态Pearls

通过icon和边框颜色表明当前状态
<div class="example-content"><div class="example">
    <div class="pearls row">
        <div class="pearl current col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-user" aria-hidden="true"></i></div>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl disabled col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl disabled col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
<div class="example">
    <div class="pearls row">
        <div class="pearl done col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-user" aria-hidden="true"></i></div>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl disabled col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
<div class="example">
    <div class="pearls row">
        <div class="pearl done col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-user" aria-hidden="true"></i></div>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl current error col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl disabled col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
<div class="example">
    <div class="pearls row">
        <div class="pearl done col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-user" aria-hidden="true"></i></div>
          <span class="pearl-title">Account Info</span>
        </div>
        <div class="pearl done col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Billing Info</span>
        </div>
        <div class="pearl current col-xs-4">
          <div class="pearl-icon"><i class="icon fa fa-credit-card" aria-hidden="true"></i></div>
          <span class="pearl-title">Confirmation</span>
        </div>
    </div>
</div>
</div>
<style>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}
</style>
<div class="examples-code"><pre><code>&lt;div class="example">
    &lt;div class="pearls row">
        &lt;div class="pearl current col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-user" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl disabled col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl disabled col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div>
&lt;div class="example">
    &lt;div class="pearls row">
        &lt;div class="pearl done col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-user" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl disabled col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div>
&lt;div class="example">
    &lt;div class="pearls row">
        &lt;div class="pearl done col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-user" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current error col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl disabled col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div>
&lt;div class="example">
    &lt;div class="pearls row">
        &lt;div class="pearl done col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-user" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Account Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl done col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Billing Info&lt;/span>
        &lt;/div>
        &lt;div class="pearl current col-xs-4">
          &lt;div class="pearl-icon">&lt;i class="icon fa fa-credit-card" aria-hidden="true">&lt;/i>&lt;/div>
          &lt;span class="pearl-title">Confirmation&lt;/span>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}</code></pre>
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
