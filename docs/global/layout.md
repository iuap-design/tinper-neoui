## 布局
 布局的栅格化系统使用了12列响应式网格布局。其工作原理如下：

* “行（row）”必须包含在 .container （固定宽度）或 .container-fluid （100% 宽度）中，以便为其赋予合适的排列（aligment）和内补（padding）。
* 通过“行（row）”在水平方向创建一组“列（column）”。
* 具体内容放置在“列（col）”内，并且`col`可以作为`row`的直接元素
* 栅格系统中的列指1到12的值来表示
* 如果一“行（row）”中包含的“列（column）”大于12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列
* 响应式断点

|class|区间|
|----------:|----------:|
|u-col-xs-*|手机、小于768px|
|u-col-sm-*|平板、大于等于768px|
|u-col-md-*|桌面显示器、大于等于992px|
|u-col-lg-*|大桌面显示器、大于等于992px|


### 基础

使用单一的一组`Row`和`col`栅格组件，就可以创建一个基本的栅格系统。所有的列`col`必须放在`Row`中。

<div class="examples-code"><pre><code>
&lt;div class="u-container-fluid example">
	&lt;div class="u-row">
	    &lt;div class="u-col-4">&lt;div class="example-col">4&lt;/div>&lt;/div>
	    &lt;div class="u-col-4">&lt;div class="example-col">4&lt;/div>&lt;/div>
	    &lt;div class="u-col-4">&lt;div class="example-col">4&lt;/div>&lt;/div>
	&lt;/div>
	&lt;div class="u-row">
	    &lt;div class="u-col-6">&lt;div class="example-col">6&lt;/div>&lt;/div>
	    &lt;div class="u-col-4">&lt;div class="example-col">4&lt;/div>&lt;/div>
	    &lt;div class="u-col-2">&lt;div class="example-col">2&lt;/div>&lt;/div>
	&lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example {
    margin-top: 20px;
    margin-bottom: 20px;
}
.example .example-col {
    margin-bottom: 20px;
    min-height: 0;
    padding: 10px 15px 12px;
    background-color: rgb(189, 189, 189);
    border-radius: 0;
}</code></pre>
</div>




### 移动和桌面屏幕

是否不希望在小屏幕设备上所有的列都堆叠在一起？那就使用针对超小屏幕和中等屏幕设备所定义的类吧，即 `.u-col-xs-*` 和 `.u-col-md-*`

<div class="examples-code"><pre><code>
&lt;div class="u-container-fluid example">
    &lt;div class="u-row">
        &lt;div class="u-col-xs-12 u-col-md-8">
            &lt;div class="example-col">u-col-xs-12 u-col-md-8&lt;/div>
        &lt;/div>
        &lt;div class="u-col-xs-6 u-col-md-4">
            &lt;div class="example-col">u-col-xs-6 u-col-md-4&lt;/div>
        &lt;/div>
        &lt;div class="u-col-xs-6 u-col-md-4">
            &lt;div class="example-col">u-col-xs-6 u-col-md-4&lt;/div>
        &lt;/div>
        &lt;div class="u-col-xs-6 u-col-md-4">
            &lt;div class="example-col">u-col-xs-6 u-col-md-4&lt;/div>
        &lt;/div>
        &lt;div class="u-col-xs-6 u-col-md-4">
            &lt;div class="example-col">u-col-xs-6 u-col-md-4&lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example {
    margin-top: 20px;
    margin-bottom: 20px;
}
.example .example-col {
    margin-bottom: 20px;
    min-height: 0;
    padding: 10px 15px 12px;
    background-color: rgb(189, 189, 189);
    border-radius: 0;
}</code></pre>
</div>




### 响应式列重置

即便有上面给出的栅格class，你也不免会碰到一些问题，例如，在某些阈值时，某些列可能会出现比别的列高的情况。为了克服这一问题，建议联合使用 `.clearfix` 和 响应式工具类（参考辅助类的响应式布局）。

<div class="examples-code"><pre><code>
&lt;div class="u-container-fluid example">
    &lt;div class="u-row">
        &lt;div class="u-col-xs-6 u-col-sm-3">
            &lt;div class="example-col">.col-xs-6 .col-sm-3我的内容比较多。修改屏幕的宽度或者在手机端可以看到clearfix所起到的效果&lt;/div>
        &lt;/div>
        &lt;div class="u-col-xs-6 u-col-sm-3">
            &lt;div class="example-col">.col-xs-6 .col-sm-3&lt;/div>
        &lt;/div>
        &lt;!-- Add the extra clearfix for only the required viewport -->
        &lt;div class="clearfix visible-xs-block">&lt;/div>
        &lt;div class="u-col-xs-6 u-col-sm-3">
            &lt;div class="example-col">.col-xs-6 .col-sm-3&lt;/div>
        &lt;/div>
        &lt;div class="u-col-xs-6 u-col-sm-3">
            &lt;div class="example-col">.col-xs-6 .col-sm-3&lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div>
</code></pre>
</div>

<div class="examples-code"><pre><code>
.example {
    margin-top: 20px;
    margin-bottom: 20px;
}
.example .example-col {
    margin-bottom: 20px;
    min-height: 0;
    padding: 10px 15px 12px;
    background-color: rgb(189, 189, 189);
    border-radius: 0;
}</code></pre>
</div>




### 列嵌套

为了在内容中嵌套默认的网格，请添加一个新的 `.u-row`，并在一个已有的 `.u-col-md-*` 列内添加一组 `.u-col-md-*` 列。被嵌套的行应包含一组列，这组列个数不能超过12（其实，没有要求你必须占满12列）。

<div class="examples-code"><pre><code>
&lt;div class="u-container-fluid example">
    &lt;div class="u-row">
        &lt;div class="u-col-sm-9">
            &lt;div class="example-col">Level 1: .col-sm-9
                &lt;div class="u-row">
                    &lt;div class="u-col-xs-8 u-col-sm-6">
                        &lt;div class="example-col-sub">Level 2: .col-xs-8 .col-sm-6&lt;/div>
                    &lt;/div>
                    &lt;div class="u-col-xs-4 u-col-sm-6">
                        &lt;div class="example-col-sub">Level 2: .col-xs-4 .col-sm-6&lt;/div>
                    &lt;/div>
                &lt;/div>
            &lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example {
    margin-top: 20px;
    margin-bottom: 20px;
}
.example .example-col {
    margin-bottom: 20px;
    min-height: 0;
    padding: 10px 15px 12px;
    background-color: rgb(189, 189, 189);
    border-radius: 0;
}

.example .example-col-sub {
    background-color: rgb(0, 189, 189);
}</code></pre>
</div>




### 列偏移
为了在大屏幕显示器上使用偏移，请使用 `.col-md-offset-* `类。这些类会把一个列的左外边距（margin）增加 * 列，其中 * 范围是从 1 到 11。例如，`.u-col-md-offset-4`类将 `.u-col-md-4`元素向右侧偏移了4个列（column）的宽度。

<div class="examples-code"><pre><code>
&lt;div class="u-container-fluid example">
    &lt;div class="u-row">
        &lt;div class="u-col-md-4  u-col-md-offset-4">
            &lt;div class="example-col">.u-col-md-4  .u-col-md-offset-4&lt;/div>
        &lt;/div>
        &lt;div class="u-col-md-4">
            &lt;div class="example-col">.u-col-md-4&lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example {
    margin-top: 20px;
    margin-bottom: 20px;
}
.example .example-col {
    margin-bottom: 20px;
    min-height: 0;
    padding: 10px 15px 12px;
    background-color: rgb(189, 189, 189);
    border-radius: 0;
}</code></pre>
</div>




### 列排序

使用`.col-md-push-*` and `.col-md-pull-* `能改变我们的内置网格列的顺序。*越大值越大，push值到左边距，pull值到右边距。

<div class="examples-code"><pre><code>
&lt;div class="u-container-fluid example">
    &lt;div class="u-row">
        &lt;div class="u-col-md-8 u-col-md-push-4">
            &lt;div class="example-col">.u-col-md-8 .u-col-md-push-4&lt;/div>
        &lt;/div>
        &lt;div class="u-col-md-4 u-col-md-pull-8">
            &lt;div class="example-col">.u-col-md-4 .u-col-md-pull-8&lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>

<div class="examples-code"><pre><code>
.example {
    margin-top: 20px;
    margin-bottom: 20px;
}
.example .example-col {
    margin-bottom: 20px;
    min-height: 0;
    padding: 10px 15px 12px;
    background-color: rgb(189, 189, 189);
    border-radius: 0;
}</code></pre>
</div>


