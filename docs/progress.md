# progress控件

progress控件

# 如何使用

暂无

# 示例


##不同尺寸的Progress

`.u-progress-md` `.u-progress-sm`提供了额外可供选择的尺寸
<script>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});
</script>
<div class="example-content"><div id="p22" class="u-progress u-progress-lg"></div>
<br/>
<div id="p23" class="u-progress u-progress-md"></div>
<br/>
<div id="p24" class="u-progress u-progress-sm"></div>
<br/>
<div id="p25" class="u-progress"></div>
</div>
<div class="examples-code"><pre><code>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div id="p22" class="u-progress u-progress-lg">&lt;/div>
&lt;br/>
&lt;div id="p23" class="u-progress u-progress-md">&lt;/div>
&lt;br/>
&lt;div id="p24" class="u-progress u-progress-sm">&lt;/div>
&lt;br/>
&lt;div id="p25" class="u-progress">&lt;/div></code></pre>
</div>

##缓冲Progress

有缓冲标识的进度条
<div class="example-content"><div id="p3" class="u-progress"></div>
</div>
<script>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});
</script>
<div class="examples-code"><pre><code>&lt;div id="p3" class="u-progress">&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});</code></pre>
</div>

##不同颜色的Progress

 `.u-progress-primary` `.u-progress-danger` `.u-progress-info` `.u-progress-success` `.u-progress-warning` `.u-progress-dark` 六种颜色可供选择
<div class="example-content"><div id="p11" class="u-progress"></div>
<br/>
<div id="p12" class="u-progress u-progress-primary"></div>
<br/>
<div id="p13" class="u-progress u-progress-danger"></div>
<br/>
<div id="p14" class="u-progress u-progress-info"></div>
<br/>
<div id="p15" class="u-progress u-progress-success"></div>
<br/>
<div id="p16" class="u-progress u-progress-warning"></div>
<br/>
<div id="p17" class="u-progress u-progress-dark"></div>
</div>
<script>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});
</script>
<div class="examples-code"><pre><code>&lt;div id="p11" class="u-progress">&lt;/div>
&lt;br/>
&lt;div id="p12" class="u-progress u-progress-primary">&lt;/div>
&lt;br/>
&lt;div id="p13" class="u-progress u-progress-danger">&lt;/div>
&lt;br/>
&lt;div id="p14" class="u-progress u-progress-info">&lt;/div>
&lt;br/>
&lt;div id="p15" class="u-progress u-progress-success">&lt;/div>
&lt;br/>
&lt;div id="p16" class="u-progress u-progress-warning">&lt;/div>
&lt;br/>
&lt;div id="p17" class="u-progress u-progress-dark">&lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});</code></pre>
</div>

##不确定Progress
<div class="example-content"><div id="p2" class="u-progress u-progress__indeterminate"></div>
</p>
</div>
<script>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});
</script>
<div class="examples-code"><pre><code>&lt;div id="p2" class="u-progress u-progress__indeterminate">&lt;/div>
&lt;/p></code></pre>
</div>
<div class="examples-code"><pre><code>u.on(window, 'load', function() {
    'use strict';
    document.querySelector('#p11')['u.Progress'].setProgress(69);
    document.querySelector('#p3')['u.Progress'].setProgress(33).setBuffer(87);
    document.querySelector('#p12')['u.Progress'].setProgress(69);
    document.querySelector('#p13')['u.Progress'].setProgress(69);
    document.querySelector('#p14')['u.Progress'].setProgress(69);
    document.querySelector('#p15')['u.Progress'].setProgress(69)
    document.querySelector('#p16')['u.Progress'].setProgress(69);
    document.querySelector('#p17')['u.Progress'].setProgress(69);
    document.querySelector('#p22')['u.Progress'].setProgress(69);
    document.querySelector('#p23')['u.Progress'].setProgress(69)
    document.querySelector('#p24')['u.Progress'].setProgress(69);
    document.querySelector('#p25')['u.Progress'].setProgress(69);

});</code></pre>
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
