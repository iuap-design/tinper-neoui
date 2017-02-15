# 导航条

提供了几条常用的导航，包括基础导航、工具导航、图片导航、不同颜色导航。具体代码在[webIDE](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/navbar)进行在线测试。


# 示例



<div class="example-content"><nav class="u-navbar u-navbar-default" role="navigation">
    <div class="u-container-fluid">
        <div class="u-navbar-header">
            <button type="button" class="u-navbar-toggle u-hamburger u-hamburger-close  u-collapsed" data-target="#example-default-collapse" data-toggle="collapse">
                <!-- <span class="sr-only">Toggle navigation</span> -->
                <span class="u-hamburger-bar"></span>
            </button>
            <a class="u-navbar-brand" href="javascript:void(0)">Brand</a>
        </div>
        <ul class="nav-list u-navbar-nav hidden-xs">
            <li>
                <a href="javascript:void(0)">
                    <i class="uf uf-book" aria-hidden="true"></i>
                </a>
            </li>
            <li class="hidden-xs">
                <a class="uf uf-bellmusicaltool" data-toggle="fullscreen" href="#" role="button">
                </a>
            </li>
            <li class="hidden-xs">
                <a class="uf uf-zoomin" data-toggle="collapse" href="#example-default-search" role="button">
                    <!-- <span class="sr-only">Toggle Search</span> -->
                </a>
            </li>
        </ul>
        <div class="u-collapse u-navbar-collapse u-navbar-collapse-group" id="example-default-collapse">
            <ul class="nav-list u-navbar-toolbar u-navbar-right u-navbar-toolbar-right">
                <li class="dropdown">
                    <a class="u-avatar w-32 u-avatar-online">
                        <img src="http://design.yyuap.com/static/img/navimg1.jpg" alt="..." class="img-circle">
                        <i></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="u-badge w-20 m" data-badge="1">
                        <i class="uf uf-bellmusicaltool"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="u-badge u-badge-info w-20 m" data-badge="3">
                        <i class="uf uf-envelope"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</div>
<div class="example-content ex-hide"><script>u.on(window, 'load', function() {
    'use strict';
   $('.u-hamburger').click(function(){
      var attrTarget = $(this).attr('data-target');
      var $targetDom = $(attrTarget);
      $(this).toggleClass("u-collapsed");
      $targetDom.toggleClass("in");

   });
});
</script></div>
<div class="examples-code"><pre><code>&lt;nav class="u-navbar u-navbar-default" role="navigation">
    &lt;div class="u-container-fluid">
        &lt;div class="u-navbar-header">
            &lt;button type="button" class="u-navbar-toggle u-hamburger u-hamburger-close  u-collapsed" data-target="#example-default-collapse" data-toggle="collapse">
                &lt;!-- &lt;span class="sr-only">Toggle navigation&lt;/span> -->
                &lt;span class="u-hamburger-bar">&lt;/span>
            &lt;/button>
            &lt;a class="u-navbar-brand" href="javascript:void(0)">Brand&lt;/a>
        &lt;/div>
        &lt;ul class="nav-list u-navbar-nav hidden-xs">
            &lt;li>
                &lt;a href="javascript:void(0)">
                    &lt;i class="uf uf-book" aria-hidden="true">&lt;/i>
                &lt;/a>
            &lt;/li>
            &lt;li class="hidden-xs">
                &lt;a class="uf uf-bellmusicaltool" data-toggle="fullscreen" href="#" role="button">
                &lt;/a>
            &lt;/li>
            &lt;li class="hidden-xs">
                &lt;a class="uf uf-zoomin" data-toggle="collapse" href="#example-default-search" role="button">
                    &lt;!-- &lt;span class="sr-only">Toggle Search&lt;/span> -->
                &lt;/a>
            &lt;/li>
        &lt;/ul>
        &lt;div class="u-collapse u-navbar-collapse u-navbar-collapse-group" id="example-default-collapse">
            &lt;ul class="nav-list u-navbar-toolbar u-navbar-right u-navbar-toolbar-right">
                &lt;li class="dropdown">
                    &lt;a class="u-avatar w-32 u-avatar-online">
                        &lt;img src="http://design.yyuap.com/static/img/navimg1.jpg" alt="..." class="img-circle">
                        &lt;i>&lt;/i>
                    &lt;/a>
                &lt;/li>
                &lt;li class="dropdown">
                    &lt;a class="u-badge w-20 m" data-badge="1">
                        &lt;i class="uf uf-bellmusicaltool">&lt;/i>
                    &lt;/a>
                &lt;/li>
                &lt;li class="dropdown">
                    &lt;a class="u-badge u-badge-info w-20 m" data-badge="3">
                        &lt;i class="uf uf-envelope">&lt;/i>
                    &lt;/a>
                &lt;/li>
            &lt;/ul>
        &lt;/div>
    &lt;/div>
&lt;/nav>
</code></pre>
</div>
<div class="examples-code"><pre><code>u.on(window, 'load', function() {
    'use strict';
   $('.u-hamburger').click(function(){
      var attrTarget = $(this).attr('data-target');
      var $targetDom = $(attrTarget);
      $(this).toggleClass("u-collapsed");
      $targetDom.toggleClass("in");

   });
});</code></pre>
</div>



[试一试](http://design.yyuap.com/dist/pages/webIDE/index.html#/demos/ui/navbar)