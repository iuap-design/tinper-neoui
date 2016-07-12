# rating控件

评级评分

# 插件依赖

依赖于  http://design.yyuap.com/static/uui/3.0.6/js/u.js
		http://design.yyuap.com/static/raty/raty.js

# 用法

1.定义类``u-rating`的父元素,并配置属性`data-plugin=rating`

```
<div class="u-rating" data-score="3" data-plugin="rating"></div>

```

2.设置参数

```
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
})

```

3.调用初始raty方法

```
	$('[data-plugin="rating"]').each(function() {
          $(this).raty(options);
     });

```




# 示例

replaceExamp


# API

详情参见与 http://testweb3.iecworld.com/jsdemo/js/lq_js_point/