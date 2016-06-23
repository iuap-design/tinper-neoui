# panel控件

panel控件

# 如何使用

暂无

# 示例


##head和foot具有的panel
<style>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}
</style>
<div class="example-content"><div class="panel-example">
    <!-- Example Panel With All -->
    <div class="u-panel u-panel-bordered">
        <div class="u-panel-heading">
          <h3 class="u-panel-title">Panel Heading</h3>
        </div>
        <div class="u-panel-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit
            tortor, dictum in gravida nec, aliquet non lorem. pellentesque.ipiscing
            elit. Fusce velit tortor.</P>
        </div>
        <div class="u-panel-footer">Panel Footer</div>
    </div>
      <!-- End Example Panel With All -->
</div>
</div>
<div class="examples-code"><pre><code>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="panel-example">
    &lt;!-- Example Panel With All -->
    &lt;div class="u-panel u-panel-bordered">
        &lt;div class="u-panel-heading">
          &lt;h3 class="u-panel-title">Panel Heading&lt;/h3>
        &lt;/div>
        &lt;div class="u-panel-body">
          &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit
            tortor, dictum in gravida nec, aliquet non lorem. pellentesque.ipiscing
            elit. Fusce velit tortor.&lt;/P>
        &lt;/div>
        &lt;div class="u-panel-footer">Panel Footer&lt;/div>
    &lt;/div>
      &lt;!-- End Example Panel With All -->
&lt;/div></code></pre>
</div>

##只有footer的panel
<style>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}
</style>
<div class="example-content"><div class="panel-example">
      <!-- Example Panel With Footer -->
    <div class="u-panel u-panel-bordered">
        <div class="u-panel-body">
          <h4>Body Heading</h4>
          <p>Wrap buttons or secondary text in <code>.panel-footer</code>. Note
            that panel footers do not inherit colors and borders when using
            contextual variations as they are not meant to be in the foreground.</p>
        </div>
        <div class="u-panel-footer">Panel Footer</div>
    </div>
      <!-- End Example Panel With Footer -->
</div>
</div>
<div class="examples-code"><pre><code>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="panel-example">
      &lt;!-- Example Panel With Footer -->
    &lt;div class="u-panel u-panel-bordered">
        &lt;div class="u-panel-body">
          &lt;h4>Body Heading&lt;/h4>
          &lt;p>Wrap buttons or secondary text in &lt;code>.panel-footer&lt;/code>. Note
            that panel footers do not inherit colors and borders when using
            contextual variations as they are not meant to be in the foreground.&lt;/p>
        &lt;/div>
        &lt;div class="u-panel-footer">Panel Footer&lt;/div>
    &lt;/div>
      &lt;!-- End Example Panel With Footer -->
&lt;/div></code></pre>
</div>

##只有body的panel
<div class="example-content"><div class="panel-example">
      <!-- Example Heading With Desc -->
      <div class="u-panel">
        <div class="u-panel-heading">
          <h3 class="u-panel-title">Heading With Desc
            <small>Panel Description Here..</small>
          </h3>
        </div>
        <div class="u-panel-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit
            tortor, dictum in gravida nec, aliquet non lorem. pellentesque.ipiscing
            elit. Fusce velit tortor.</P>
        </div>
    </div>
      <!-- End Example Heading With Desc -->
</div>
</div>
<style>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}
</style>
<div class="examples-code"><pre><code>&lt;div class="panel-example">
      &lt;!-- Example Heading With Desc -->
      &lt;div class="u-panel">
        &lt;div class="u-panel-heading">
          &lt;h3 class="u-panel-title">Heading With Desc
            &lt;small>Panel Description Here..&lt;/small>
          &lt;/h3>
        &lt;/div>
        &lt;div class="u-panel-body">
          &lt;p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce velit
            tortor, dictum in gravida nec, aliquet non lorem. pellentesque.ipiscing
            elit. Fusce velit tortor.&lt;/P>
        &lt;/div>
    &lt;/div>
      &lt;!-- End Example Heading With Desc -->
&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}</code></pre>
</div>

##只有head的panel

<style>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}
</style>
<div class="example-content"><div class="panel-example">
  <!-- Example Panel With Heading -->
  <div class="u-panel u-panel-bordered">
    <div class="u-panel-heading">
      <h3 class="u-panel-title">Panel Heading</h3>
    </div>
    <div class="u-panel-body">
      <h4>Body Heading</h4>
      <p>Easily add a heading container to your panel with <code>.u-panel-heading</code>.
        You may also include any <code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>                with a <code>.panel-title</code> class to add a pre-styled heading.</p>
      <p>For proper link coloring, be sure to place links in headings within
        <code>.u-panel-title</code>.</p>
    </div>
  </div>
  <!-- End Example Panel With Heading -->
</div>
</div>
<div class="examples-code"><pre><code>.content{
    background: #eceff1;
    padding: 10px;
}
.panel-example{
    width: 60%;
    margin-left: 15%;
    margin-top: 40px;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="panel-example">
  &lt;!-- Example Panel With Heading -->
  &lt;div class="u-panel u-panel-bordered">
    &lt;div class="u-panel-heading">
      &lt;h3 class="u-panel-title">Panel Heading&lt;/h3>
    &lt;/div>
    &lt;div class="u-panel-body">
      &lt;h4>Body Heading&lt;/h4>
      &lt;p>Easily add a heading container to your panel with &lt;code>.u-panel-heading&lt;/code>.
        You may also include any &lt;code>&lt;h1&gt;&lt;/code>-&lt;code>&lt;h6&gt;&lt;/code>                with a &lt;code>.panel-title&lt;/code> class to add a pre-styled heading.&lt;/p>
      &lt;p>For proper link coloring, be sure to place links in headings within
        &lt;code>.u-panel-title&lt;/code>.&lt;/p>
    &lt;/div>
  &lt;/div>
  &lt;!-- End Example Panel With Heading -->
&lt;/div></code></pre>
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
