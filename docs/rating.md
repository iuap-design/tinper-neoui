# rating控件

用于评级评分

# 如何使用

创建类为`.u-rating`的`<div>`,`dom`上添加属性`data-plugin=rating`

# 示例


##基础rating

常用于评级评分
<script>(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon fa fa-star",
        starOn: "icon fa fa-star orange-600",
        cancelOff: "icon fa fa-minus-circle",
        cancelOn: "icon  fa fa-minus-circle orange-600",
        starHalf: "icon fa fa-half-o orange-500"
      };
      $('[data-plugin="rating"]').each(function() {
          var $this = $(this);
          var options = $.extend(true, {}, defaults, $this.data());

          if (options.hints) {
            options.hints = options.hints.split(',');
          }

          $this.raty(options);
      });
      // }
    // });
  })(document, window, jQuery);
</script>
<style>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}
</style>
<div class="example-content"> <div class="u-rating" data-score="3" data-plugin="rating"></div>
</div>
<div class="examples-code"><pre><code>(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon fa fa-star",
        starOn: "icon fa fa-star orange-600",
        cancelOff: "icon fa fa-minus-circle",
        cancelOn: "icon  fa fa-minus-circle orange-600",
        starHalf: "icon fa fa-half-o orange-500"
      };
      $('[data-plugin="rating"]').each(function() {
          var $this = $(this);
          var options = $.extend(true, {}, defaults, $this.data());

          if (options.hints) {
            options.hints = options.hints.split(',');
          }

          $this.raty(options);
      });
      // }
    // });
  })(document, window, jQuery);</code></pre>
</div>
<div class="examples-code"><pre><code>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}</code></pre>
</div>
<div class="examples-code"><pre><code> &lt;div class="u-rating" data-score="3" data-plugin="rating">&lt;/div></code></pre>
</div>

##多个star的rating

通过在`dom`上添加属性`data-number` 改变数量
<style>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}
</style>
<div class="example-content"><div class="example">
      <div class="u-rating" data-number="10" data-plugin="rating"></div>
  </div>
</div>
<script>(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon fa fa-star",
        starOn: "icon fa fa-star orange-600",
        cancelOff: "icon fa fa-minus-circle",
        cancelOn: "icon  fa fa-minus-circle orange-600",
        starHalf: "icon fa fa-half-o orange-500"
      };
      $('[data-plugin="rating"]').each(function() {
          var $this = $(this);
          var options = $.extend(true, {}, defaults, $this.data());

          if (options.hints) {
            options.hints = options.hints.split(',');
          }

          $this.raty(options);
      });
  })(document, window, jQuery);
</script>
<div class="examples-code"><pre><code>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example">
      &lt;div class="u-rating" data-number="10" data-plugin="rating">&lt;/div>
  &lt;/div></code></pre>
</div>
<div class="examples-code"><pre><code>(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon fa fa-star",
        starOn: "icon fa fa-star orange-600",
        cancelOff: "icon fa fa-minus-circle",
        cancelOn: "icon  fa fa-minus-circle orange-600",
        starHalf: "icon fa fa-half-o orange-500"
      };
      $('[data-plugin="rating"]').each(function() {
          var $this = $(this);
          var options = $.extend(true, {}, defaults, $this.data());

          if (options.hints) {
            options.hints = options.hints.split(',');
          }

          $this.raty(options);
      });
  })(document, window, jQuery);</code></pre>
</div>


##不同尺寸rating

u-rating-lg u-rating-sm供尺寸的选择
<script>(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon fa fa-star",
        starOn: "icon fa fa-star orange-600",
        cancelOff: "icon fa fa-minus-circle",
        cancelOn: "icon  fa fa-minus-circle orange-600",
        starHalf: "icon fa fa-half-o orange-500"
      };
      $('[data-plugin="rating"]').each(function() {
          var $this = $(this);
          var options = $.extend(true, {}, defaults, $this.data());

          if (options.hints) {
            options.hints = options.hints.split(',');
          }

          $this.raty(options);
      });
      // }
    // });
  })(document, window, jQuery);
</script>
<style>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}
</style>
<div class="example-content"><div class="example">
    <div class="margin-bottom-10">
        <div class="u-rating u-rating-sm" data-score="4" data-plugin="rating"></div>
    </div>
    <div class="margin-bottom-10">
        <div class="u-rating" data-score="4" data-plugin="rating"></div>
    </div>
    <div>
        <div class="u-rating u-rating-lg" data-score="4" data-plugin="rating"></div>
    </div>
</div>
</div>
<div class="examples-code"><pre><code>(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon fa fa-star",
        starOn: "icon fa fa-star orange-600",
        cancelOff: "icon fa fa-minus-circle",
        cancelOn: "icon  fa fa-minus-circle orange-600",
        starHalf: "icon fa fa-half-o orange-500"
      };
      $('[data-plugin="rating"]').each(function() {
          var $this = $(this);
          var options = $.extend(true, {}, defaults, $this.data());

          if (options.hints) {
            options.hints = options.hints.split(',');
          }

          $this.raty(options);
      });
      // }
    // });
  })(document, window, jQuery);</code></pre>
</div>
<div class="examples-code"><pre><code>.content{
    padding: 10px;
}
.example{
    width: 60%;
    margin: 80px;
}
.col-xs-4{
    width: 33.3%;
    float: left;
}</code></pre>
</div>
<div class="examples-code"><pre><code>&lt;div class="example">
    &lt;div class="margin-bottom-10">
        &lt;div class="u-rating u-rating-sm" data-score="4" data-plugin="rating">&lt;/div>
    &lt;/div>
    &lt;div class="margin-bottom-10">
        &lt;div class="u-rating" data-score="4" data-plugin="rating">&lt;/div>
    &lt;/div>
    &lt;div>
        &lt;div class="u-rating u-rating-lg" data-score="4" data-plugin="rating">&lt;/div>
    &lt;/div>
&lt;/div></code></pre>
</div>



# API

## 属性

data-plugin="rating" 设置此`dom`具有rating效果
data-number:设置星星个数
data-score:设置评分默认值

## 方法

$this.raty(option):获取dom调用raty，自动生成具有rating效果的控件

