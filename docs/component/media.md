# 媒体对象

允许在一个内容块的左边或右边展示一个多媒体内容（图像、视频、音频）


# 示例





## 默认样式
<div class="examples-code"><pre><code>
&lt;div class="u-media">
  &lt;div class="u-media-left">
    &lt;a href="#">
      &lt;img class="u-media-object" src="http://design.yyuap.com/static/img/navimg1.jpg" style="width: 64px;height: 64px;">
    &lt;/a>
  &lt;/div>
  &lt;div class="u-media-body">
    &lt;h4 class="u-media-heading">u-Media heading&lt;/h4>
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
  &lt;/div>
&lt;/div></code></pre>
</div>





## 嵌套

媒体对象里嵌套媒体对象，只要整要嵌套的媒体对象放在父的`media-body`标签里
<div class="examples-code"><pre><code>
&lt;div class="u-media">
  &lt;div class="u-media-left">
    &lt;a href="#">
      &lt;img class="u-media-object" src="http://design.yyuap.com/static/img/navimg1.jpg" style="width: 64px;height: 64px;">
    &lt;/a>
  &lt;/div>
  &lt;div class="u-media-body">
    &lt;h4 class="u-media-heading">u-Media heading&lt;/h4>
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    &lt;div class="u-media">
	  &lt;div class="u-media-left">
	    &lt;a href="#">
	      &lt;img class="u-media-object" src="http://design.yyuap.com/static/img/navimg1.jpg" style="width: 64px;height: 64px;">
	    &lt;/a>
	  &lt;/div>
	  &lt;div class="u-media-body">
	    &lt;h4 class="u-media-heading">u-Media heading&lt;/h4>
	    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
	  &lt;/div>
	&lt;/div>
  &lt;/div>
&lt;/div></code></pre>
</div>





## 对齐
默认上对齐
`media-middle`: 中对齐
`media-bottom`: 底对齐
<div class="examples-code"><pre><code>
&lt;div class="u-media">
  &lt;div class="u-media-left">
    &lt;a href="#">
      &lt;img class="u-media-object" src="http://design.yyuap.com/static/img/navimg1.jpg" style="width: 64px;height: 64px;">
    &lt;/a>
  &lt;/div>
  &lt;div class="u-media-body">
    &lt;h4 class="u-media-heading">u-Media heading&lt;/h4>
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

    Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  &lt;/div>
&lt;/div>
&lt;div class="u-media">
  &lt;div class="u-media-left u-media-middle">
    &lt;a href="#">
      &lt;img class="u-media-object" src="http://design.yyuap.com/static/img/navimg1.jpg" style="width: 64px;height: 64px;">
    &lt;/a>
  &lt;/div>
  &lt;div class="u-media-body">
    &lt;h4 class="u-media-heading">u-Media heading&lt;/h4>
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

    Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  &lt;/div>
&lt;/div>
&lt;div class="u-media">
  &lt;div class="u-media-left u-media-bottom">
    &lt;a href="#">
      &lt;img class="u-media-object" src="http://design.yyuap.com/static/img/navimg1.jpg" style="width: 64px;height: 64px;">
    &lt;/a>
  &lt;/div>
  &lt;div class="u-media-body">
    &lt;h4 class="u-media-heading">u-Media heading&lt;/h4>
    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

    Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
  &lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example-content .u-button-group{
	margin: 5px;
}</code></pre>
</div>


