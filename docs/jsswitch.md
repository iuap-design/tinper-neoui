# 开关

开关控件实现了两种状态的切换，提供了多种色彩、多种尺寸样式。



##基础开关

`<input>`元素的属性`id`值与`<label>`元素的属性`for`值需保持一致

在switch控件中input元素添加如下属性来实现多种效果

- `checked` 选中
- `disabled` 不可用
<div class="example-content">
<label class="u-switch u-switch-info" for="switch-info-unchecked">
    <input type="checkbox" id="switch-info-unchecked" class="u-switch-input">
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-info" for="switch-info-checked">
    <input type="checkbox" id="switch-info-checked" class="u-switch-input" checked>
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-info" for="switch-info-disable">
    <input type="checkbox" id="switch-info-disable" class="u-switch-input" disabled>
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-info" for="switch-info-checkdisalbed">
    <input type="checkbox" id="switch-info-checkdisalbed" class="u-switch-input" checked disabled>
    <span class="u-switch-label"></span>
</label>
</div>
<div class="examples-code"><pre><code>&lt;label class="u-switch u-switch-info" for="switch-info-unchecked">
    &lt;input type="checkbox" id="switch-info-unchecked" class="u-switch-input">
    &lt;span class="u-switch-label">&lt;/span>
&lt;/label></code></pre>
</div>

##多彩开关

* `.u-switch-primary` - 主色开关
* `.u-switch-success` - 绿色开关
* `.u-switch-info` - 蓝色开关
* `.u-switch-warning` - 橙色开关
* `.u-switch-danger` - 红色开关
* `.u-switch-dark` - 灰色开关
<div class="example-content">
<label class="u-switch u-switch-primary" for="switch-primary">
    <input type="checkbox" id="switch-primary" class="u-switch-input" checked="true">
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-success" for="switch-success">
    <input type="checkbox" id="switch-success" class="u-switch-input" checked>
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-info" for="switch-info">
    <input type="checkbox" id="switch-info" class="u-switch-input" checked>
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-warning" for="switch-warning">
    <input type="checkbox" id="switch-warning" class="u-switch-input" checked>
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-danger" for="switch-danger">
    <input type="checkbox" id="switch-danger" class="u-switch-input" checked>
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-dark" for="switch-dark">
    <input type="checkbox" id="switch-dark" class="u-switch-input" checked>
    <span class="u-switch-label"></span>
</label>
</div>
<div class="examples-code"><pre><code>&lt;label class="u-switch u-switch-primary" for="switch-primary">
    &lt;input type="checkbox" id="switch-primary" class="u-switch-input" checked="true">
    &lt;span class="u-switch-label">&lt;/span>
&lt;/label></code></pre>
</div>

##多种尺寸开关

* `.u-switch-lg` - 大尺寸开关
* `.u-switch-default` - 默认尺寸开关
* `.u-switch-sm` - 小尺寸开关
<div class="example-content">
<label class="u-switch u-switch-primary u-switch-lg margin-bottom-20" for="switch-primary-lg">
    <input type="checkbox" id="switch-primary-lg" class="u-switch-input" checked="true">
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-primary u-switch-default margin-bottom-10" for="switch-primary-default">
    <input type="checkbox" id="switch-primary-default" class="u-switch-input" checked="true">
    <span class="u-switch-label"></span>
</label>
<label class="u-switch u-switch-primary u-switch-sm" for="switch-primary-sm">
    <input type="checkbox" id="switch-primary-sm" class="u-switch-input" checked="true">
    <span class="u-switch-label"></span>
</label>
</div>
<div class="examples-code"><pre><code>&lt;label class="u-switch u-switch-primary u-switch-lg" for="switch-primary-lg">
    &lt;input type="checkbox" id="switch-primary-lg" class="u-switch-input" checked="true">
    &lt;span class="u-switch-label">&lt;/span>
&lt;/label></code></pre>
</div>


[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/switch)


# API

## \# switch对象

* 类型：`Object`
* 说明： 获取switch对象
* 用法：

获取方式：1、获取绑定switch的dom元素 ； 2、读取dom元素上的属性'u.Switch'


```

var switchObject = document.getElementById('domId')['u.Switch'];

```

## \# check

* 类型：`Function`
* 说明： 调用switch对象的check方法，打开开关
* 用法：

```

switchObject.check();

```

## \# uncheck

* 类型：`Function`
* 说明： 调用switch对象的uncheck方法，关闭开关
* 用法：

```

switchObject.uncheck();

```

## \# disable

* 类型：`Function`
* 说明： 调用switch对象的disable方法，使开关不可用
* 用法：

```

switchObject.disable();

```
## \# enable

* 类型：`Function`
* 说明： 调用switch对象的enable方法，使开关可用
* 用法：

```

switchObject.enable();

```

## \# toggle

* 类型：`Function`
* 说明： 调用switch对象的toggle方法，反选开关的另一个状态
* 用法：

```

switchObject.toggle();

```

## \# isChecked

* 类型：`Function`
* 说明： 调用switch对象的isChecked方法，获取当前开关的状态，true为打开，false为关闭
* 用法：

```

switchObject.isChecked();

```


相关内容：

[开关在kero中使用](http://design.yyuap.com/dist/pages/kero/ex_switch.html)    

[开关在grid中使用](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/grids/edit)