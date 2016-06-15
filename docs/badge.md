# 徽章控件

徽章控件主要包括不同色彩的徽章、含有图标的徽章。

# 如何使用

添加含有“u-badge”就可以创建一个徽章，徽章的内容在data-badge中设置。

# 示例


﻿##绝对定位标记


用于推送消息或提醒时，在标签dom元素中添加添加具体的图标即可。
<style>.demo .u-badge{
    display: inline-block;
}
</style>
<div class="example-content"><div class="u-badge w-20 m" data-badge="1">
    <i class="fa fa-bell"></i>
</div>
<div class="u-badge u-badge-no-background w-20 m" data-badge="1">
    <i class="fa fa-bell"></i>
</div>
</div>
<div class="examples-code"><pre><code>.demo .u-badge{
    display: inline-block;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="u-badge w-20 m" data-badge="1">
    &lt;i class="fa fa-bell">&lt;/i>
&lt;/div>
&lt;div class="u-badge u-badge-no-background w-20 m" data-badge="1">
    &lt;i class="fa fa-bell">&lt;/i>
&lt;/div></code></pre>
</div>

﻿##不同颜色的badge


使用“u-badge-primary”、“u-badge-success”、“u-badge-info”、“u-badge-warning”、“u-badge-danger”、“u-badge-dark”这七个个基础类，来显示不同的颜色。
<div class="example-content"><label class="u-badge u-badge-primary" data-badge="1">
</label>
<label class="u-badge u-badge-success" data-badge="1">
</label>
<label class="u-badge u-badge-info" data-badge="1">
</label>
<label class="u-badge u-badge-warning" data-badge="1">
</label>
<label class="u-badge u-badge-danger" data-badge="1">
</label>
<label class="u-badge u-badge-dark" data-badge="1">
</label>
</div>
<style>.demo .u-badge{
    display: inline-block;
}
</style>
<div class="examples-code"><pre><code>&lt;label class="u-badge u-badge-primary" data-badge="1">
&lt;/label>
&lt;label class="u-badge u-badge-success" data-badge="1">
&lt;/label>
&lt;label class="u-badge u-badge-info" data-badge="1">
&lt;/label>
&lt;label class="u-badge u-badge-warning" data-badge="1">
&lt;/label>
&lt;label class="u-badge u-badge-danger" data-badge="1">
&lt;/label>
&lt;label class="u-badge u-badge-dark" data-badge="1">
&lt;/label></code></pre>
</div>
<div class="examples-code"><pre><code>.demo .u-badge{
    display: inline-block;
}</code></pre>
</div>

