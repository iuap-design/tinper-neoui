# 输入框组

由input和按钮组成,按钮里可以是单纯的字体或者是checkbox、radio,还可以是下拉框

# 如何使用

添加含有`u-button-group`样式的父元素，然后包裹一个以上的类为`u-button`button元素

# 示例


## 基础按钮组
类`u-group-button`包裹类`u-button`的button
<div class="example-content"><div class="u-input-group">
  <span class="u-input-group-addon">@</span>
  <input type="text" class="u-form-control" placeholder="Username">
</div>
<div class="u-input-group">
  <input type="text" class="u-form-control" placeholder="Username">
  <span class="u-input-group-addon">@example.com</span>
</div>
<div class="u-input-group">
<span class="u-input-group-addon">@</span>
  <input type="text" class="u-form-control" placeholder="Username">
  <span class="u-input-group-addon">.00</span>
</div>
</div>
<div class="examples-code"><pre><code>&lt;div class="u-input-group">
  &lt;span class="u-input-group-addon">@&lt;/span>
  &lt;input type="text" class="u-form-control" placeholder="Username">
&lt;/div>
&lt;div class="u-input-group">
  &lt;input type="text" class="u-form-control" placeholder="Username">
  &lt;span class="u-input-group-addon">@example.com&lt;/span>
&lt;/div>
&lt;div class="u-input-group">
&lt;span class="u-input-group-addon">@&lt;/span>
  &lt;input type="text" class="u-form-control" placeholder="Username">
  &lt;span class="u-input-group-addon">.00&lt;/span>
&lt;/div>
</code></pre>
</div>


<div class="example-content"><div class="u-input-group">
  <span class="u-input-group-addon">
    <label  class="u-checkbox">
        <input type="checkbox" class="u-checkbox-input" checked>
    </label>
  </span>
  <input type="text" class="u-form-control">
</div>
<div class="u-input-group">
  <span class="u-input-group-addon">
    <label  class="u-radio">
        <input type="radio" class="u-radio-button" checked>
    </label>
  </span>
  <input type="text" class="u-form-control">
</div>
</div>
<div class="examples-code"><pre><code>&lt;div class="u-input-group">
  &lt;span class="u-input-group-addon">
    &lt;label  class="u-checkbox">
        &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;/label>
  &lt;/span>
  &lt;input type="text" class="u-form-control">
&lt;/div>
&lt;div class="u-input-group">
  &lt;span class="u-input-group-addon">
    &lt;label  class="u-radio">
        &lt;input type="radio" class="u-radio-button" checked>
    &lt;/label>
  &lt;/span>
  &lt;input type="text" class="u-form-control">
&lt;/div>
</code></pre>
</div>

## 尺寸
`u-input-group`后添加尺寸类`u-input-group-lg`,'u-input-group-sm',不添加是默认尺寸
<div class="example-content ex-hide"><style>.example-content .u-button-group{
	margin: 5px;
}
</style></div>
<div class="example-content"><div class="u-input-group u-input-group-lg">
  <span class="u-input-group-addon">@</span>
  <input type="text" class="u-form-control" placeholder="Username">
</div>
<div class="u-input-group">
  <span class="u-input-group-addon">@</span>
  <input type="text" class="u-form-control" placeholder="Username">
</div>
<div class="u-input-group u-input-group-sm">
  <span class="u-input-group-addon">@</span>
  <input type="text" class="u-form-control" placeholder="Username">
</div></div>
<div class="examples-code"><pre><code>.example-content .u-button-group{
	margin: 5px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="u-input-group u-input-group-lg">
  &lt;span class="u-input-group-addon">@&lt;/span>
  &lt;input type="text" class="u-form-control" placeholder="Username">
&lt;/div>
&lt;div class="u-input-group">
  &lt;span class="u-input-group-addon">@&lt;/span>
  &lt;input type="text" class="u-form-control" placeholder="Username">
&lt;/div>
&lt;div class="u-input-group u-input-group-sm">
  &lt;span class="u-input-group-addon">@&lt;/span>
  &lt;input type="text" class="u-form-control" placeholder="Username">
&lt;/div></code></pre>
</div>

## 基础按钮组
在 `u-button` 后添加`default`,`primary`,`u-button-danger`,`u-button-warning`,`u-button-info`,`u-button-success` ,来改变button背景
<div class="example-content"><div class="u-input-group">
    <div class="u-input-group-btn">
   		 <button class="u-button  u-button-default" id="demo-menu">
            success
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-default" for="demo-menu">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
    <input type="text" class="u-form-control">
</div
<div class="u-input-group">
	<input type="text" class="u-form-control">
    <div class="u-input-group-btn">
   		 <button class="u-button  u-button-u-button-default" id="demo-menu-sucess">
            success
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-default" for="demo-menu-sucess">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
    
</div
</div>
<div class="examples-code"><pre><code>&lt;div class="u-input-group">
    &lt;div class="u-input-group-btn">
   		 &lt;button class="u-button  u-button-default" id="demo-menu">
            success
            &lt;span class="u-right-icon uf uf-anglearrowdown">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-default" for="demo-menu">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;input type="text" class="u-form-control">
&lt;/div
&lt;div class="u-input-group">
	&lt;input type="text" class="u-form-control">
    &lt;div class="u-input-group-btn">
   		 &lt;button class="u-button  u-button-u-button-default" id="demo-menu-sucess">
            success
            &lt;span class="u-right-icon uf uf-anglearrowdown">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-default" for="demo-menu-sucess">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    
&lt;/div
</code></pre>
</div>

## 基础按钮组
在 `u-button` 后添加`default`,`primary`,`u-button-danger`,`u-button-warning`,`u-button-info`,`u-button-success` ,来改变button背景
<div class="example-content"><div class="u-input-group">
    <div class="u-input-group-btn">
    	<button class="u-button  u-button-default">
            success
        </button>
   		 <button class="u-button  u-button-default" id="demo-menu">
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-u-menu-default" for="demo-menu">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
    <input type="text" class="u-form-control">
</div
<div class="u-input-group">
	<input type="text" class="u-form-control">
    <div class="u-input-group-btn">
   		 <button class="u-button  u-button-default">
            info
        </button>
   		 <button class="u-button  u-button-default" id="demo-menu-info">
            <span class="u-right-icon uf uf-anglearrowdown"></span>
        </button>
        <ul class="u-menu u-menu-default" for="demo-menu-info">
            <li class="u-menu-item"><a href="javascript:void(0)">action zero</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action one</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action two</a></li>
            <li class="u-menu-item"><a href="javascript:void(0)">action three</a></li>
        </ul>
    </div>
    
</div
</div>
<div class="examples-code"><pre><code>&lt;div class="u-input-group">
    &lt;div class="u-input-group-btn">
    	&lt;button class="u-button  u-button-default">
            success
        &lt;/button>
   		 &lt;button class="u-button  u-button-default" id="demo-menu">
            &lt;span class="u-right-icon uf uf-anglearrowdown">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-u-menu-default" for="demo-menu">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;input type="text" class="u-form-control">
&lt;/div
&lt;div class="u-input-group">
	&lt;input type="text" class="u-form-control">
    &lt;div class="u-input-group-btn">
   		 &lt;button class="u-button  u-button-default">
            info
        &lt;/button>
   		 &lt;button class="u-button  u-button-default" id="demo-menu-info">
            &lt;span class="u-right-icon uf uf-anglearrowdown">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-default" for="demo-menu-info">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    
&lt;/div
</code></pre>
</div>


