# 单选框

radio提供了基本的单选框和不同色彩的单选框



[试一试](http://tinper.org/webide/#/demos/ui/radio)

# API

## \# radio对象

* 类型：`Object`
* 说明： 获取radio对象
* 用法：

获取方式：1、获取绑定radio的dom元素 ； 2、读取dom元素上的属性'u.Radio'

```

var radioObject = document.getElementById('domId')['u.Radio'];

```

## \# check

* 类型：`Function`
* 说明： 调用radio对象的check方法，选中单选框
* 用法：

```

radioObject.check();

```

## \# uncheck

* 类型：`Function`
* 说明： 调用radio对象的uncheck方法，取消选中单选框
* 用法：

```

radioObject.uncheck();

```

## \# disable

* 类型：`Function`
* 说明： 调用radio对象的disable方法，使单选框不可用
* 用法：

```

radioObject.disable();

```
## \# enable

* 类型：`Function`
* 说明： 调用radio对象的enable方法，使单选框可用
* 用法：

```

radioObject.enable();

```

相关内容：

[单选框在kero中使用](http://tinper.org/dist/kero/docs/ex_radio.html)    

[单选框在grid中使用](http://tinper.org/webide/#/demos/grids/edit)

## 基础radio

在单选框中input元素上添加如下属性可以实现多种效果。

* `checked`单选框选中
* `disabled`单选框不可用

<div class="examples-code"><pre><code>
&lt;span>可用未选radio&lt;/span>
&lt;label class="u-radio" for="option-1">
    &lt;input type="radio" id="option-1" class="u-radio-button" name="options" value="1">
    &lt;span class="u-radio-label">First&lt;/span>
&lt;/label>
&lt;span>可用已选radio&lt;/span>
&lt;label class="u-radio" for="option-6">
    &lt;input type="radio" id="option-6" class="u-radio-button" name="options" value="1" checked>
    &lt;span class="u-radio-label">First&lt;/span>
&lt;/label>
&lt;span>不可用未选radio&lt;/span>
&lt;label class="u-radio" for="option-2">
    &lt;input type="radio" disabled id="option-2" class="u-radio-button" name="options" value="2">
    &lt;span class="u-radio-label">Second&lt;/span>
&lt;/label>
&lt;span>不可用已选radio&lt;/span>
&lt;label class="u-radio" for="option-3">
    &lt;input type="radio" disabled checked id="option-3" class="u-radio-button" name="options1" value="3">
    &lt;span class="u-radio-label">Second&lt;/span>
&lt;/label></code></pre>
</div>





## 不同色彩radio

* `u-radio-success` - 绿色按钮
* `u-radio-info` - 蓝色按钮
* `u-radio-warning` - 黄色按钮
* `u-radio-danger` - 红色按钮
* `u-radio-dark` - 灰色按钮

<div class="examples-code"><pre><code>
&lt;label class="u-radio u-radio-success" >
    &lt;input type="radio" class="u-radio-button"  checked>
    &lt;span class="u-radio-label">green&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-info">
    &lt;input type="radio" class="u-radio-button"   checked>
    &lt;span class="u-radio-label">blue&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-warning">
    &lt;input type="radio" class="u-radio-button"  checked>
    &lt;span class="u-radio-label">yellow&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-danger">
    &lt;input type="radio" class="u-radio-button"   checked>
    &lt;span class="u-radio-label">red&lt;/span>
&lt;/label>
&lt;label class="u-radio u-radio-dark">
    &lt;input type="radio" class="u-radio-button"  checked>
    &lt;span class="u-radio-label">grey&lt;/span>
&lt;/label></code></pre>
</div>



