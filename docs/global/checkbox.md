# 复选框

checkbox提供了基础复选框、不同色彩复选框、图片复选框、个性复选框





[试一试](http://tinper.org/webide/#/demos/ui/checkbox)



# API

## \# checkbox对象

* 类型：`Object`
* 说明： 获取checkbox对象
* 用法：

获取方式：1、获取绑定checkbox的dom元素 ； 2、读取dom元素上的属性'u.Checkbox'


```

var checkboxObject = document.getElementById('domId')['u.Checkbox'];

```

## \# check

* 类型：`Function`
* 说明： 调用checkbox对象的check方法，选中复选框
* 用法：

```

checkboxObject.check();

```

## \# uncheck

* 类型：`Function`
* 说明： 调用checkbox对象的uncheck方法，取消选中复选框
* 用法：

```

checkboxObject.uncheck();

```

## \# disable

* 类型：`Function`
* 说明： 调用checkbox对象的disable方法，使复选框不可用
* 用法：

```

checkboxObject.disable();

```
## \# enable

* 类型：`Function`
* 说明： 调用checkbox对象的enable方法，使复选框可用
* 用法：

```

checkboxObject.enable();

```

## \# toggle

* 类型：`Function`
* 说明： 调用checkbox对象的toggle方法，反选复选框
* 用法：

```

checkboxObject.toggle();


```

相关内容：

[复选框在kero中使用](http://tinper.org/dist/kero/docs/ex_checkbox.html)    

[复选框在grid中使用](http://tinper.org/webide/#/demos/grids/edit)


## 基础checkbox
在复选框中input元素添加如下属性来实现多种效果

- `checked` 选中
- `disabled` 不可用

<div class="example-content">
<label  class="u-checkbox">
    <input type="checkbox" class="u-checkbox-input" checked>
    <span class="u-checkbox-label">Checkbox</span>
</label>
<label  class="u-checkbox">
    <input type="checkbox" class="u-checkbox-input" >
    <span class="u-checkbox-label">Checkbox</span>
</label>
<label  class="u-checkbox"  >
    <input type="checkbox" class="u-checkbox-input" disabled>
    <span class="u-checkbox-label">Checkbox</span>
</label>
<label  class="u-checkbox">
    <input type="checkbox" class="u-checkbox-input" disabled checked>
    <span class="u-checkbox-label">Checkbox</span>
</label>
</div>



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>

&lt;label  class="u-checkbox">
    &lt;input type="checkbox" class="u-checkbox-input" checked>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox">
    &lt;input type="checkbox" class="u-checkbox-input" >
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox"  >
    &lt;input type="checkbox" class="u-checkbox-input" disabled>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox">
    &lt;input type="checkbox" class="u-checkbox-input" disabled checked>
    &lt;span class="u-checkbox-label">Checkbox&lt;/span>
&lt;/label>
</code></pre>
</div>



</div>

## 不同颜色的checkbox
在复选框中label里面添加如下样式来实现不同色彩的复选框

- `u-checkbox-success` 绿色
- `u-checkbox-info` 蓝色
- `u-checkbox-warning` 黄色
- `u-checkbox-danger` 红色
- `u-checkbox-dark` 灰色

<div class="example-content"><label  class="u-checkbox u-checkbox-success w-xs">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">green</span>
</label>

<label  class="u-checkbox u-checkbox-info w-xs">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">blue</span>
</label>
<label  class="u-checkbox u-checkbox-warning w-xs">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">yellow</span>
</label>
<label  class="u-checkbox u-checkbox-danger w-xs">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">red</span>
</label>
<label  class="u-checkbox u-checkbox-dark w-xs">
    <input type="checkbox" class="u-checkbox-input"  checked>
    <span class="u-checkbox-label">grey</span>
</label></div>



<div class="ex-code-par"><button  class="u-button u-button-block u-button-accent margin-top-15 codeOptBtn" ><i class="uf uf-arrow-down"></i>查看代码</button><div class="examples-code"><pre><code>
&lt;label  class="u-checkbox u-checkbox-success w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">green&lt;/span>
&lt;/label>

&lt;label  class="u-checkbox u-checkbox-info w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">blue&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-warning w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">yellow&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-danger w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">red&lt;/span>
&lt;/label>
&lt;label  class="u-checkbox u-checkbox-dark w-xs">
    &lt;input type="checkbox" class="u-checkbox-input"  checked>
    &lt;span class="u-checkbox-label">grey&lt;/span>
&lt;/label></code></pre>
</div>



</div>