# 输入框组

由input和按钮组成,按钮里可以是单纯的字体或者是checkbox、radio,还可以是下拉框

# 如何使用

添加含有`u-button-group`样式的父元素，然后包裹一个以上的类为`u-button`button元素

# 示例




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
</div></div>



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
</div>
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
</div></div>



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
</div>
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
</div>
</div>
