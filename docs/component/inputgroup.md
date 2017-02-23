# 输入框组

由input和按钮组成,按钮里可以是单纯的字体或者是checkbox、radio,还可以是下拉框

# 如何使用

添加含有`u-button-group`样式的父元素，然后包裹一个以上的类为`u-button`button元素

# 示例





<div class="examples-code"><pre><code>
&lt;div class="u-input-group">
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







<div class="examples-code"><pre><code>
&lt;div class="u-input-group u-input-group-lg">
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

<div class="examples-code"><pre><code>
.example-content .u-button-group{
	margin: 5px;
}</code></pre>
</div>






<div class="examples-code"><pre><code>
&lt;div class="u-input-group">
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
&lt;/div></code></pre>
</div>







<div class="examples-code"><pre><code>
&lt;div class="u-input-group">
    &lt;div class="u-input-group-btn">
   		&lt;button class="u-button  u-button-default" id="demo-menu">
            success
            &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-default" for="demo-menu">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
    &lt;input type="text" class="u-form-control">
&lt;/div>
&lt;div class="u-input-group">
	&lt;input type="text" class="u-form-control">
    &lt;div class="u-input-group-btn">
   		&lt;button class="u-button  u-button-u-button-default" id="demo-menu-sucess">
            success
            &lt;span class="u-right-icon uf uf-arrow-down">&lt;/span>
        &lt;/button>
        &lt;ul class="u-menu u-menu-default" for="demo-menu-sucess">
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action zero&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action one&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action two&lt;/a>&lt;/li>
            &lt;li class="u-menu-item">&lt;a href="javascript:void(0)">action three&lt;/a>&lt;/li>
        &lt;/ul>
    &lt;/div>
&lt;/div></code></pre>
</div>



