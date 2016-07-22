# rating控件

评级评分

# 插件依赖

首先依赖于 http://design.yyuap.com/static/uui/latest/js/u.js

再引入js: http://design.yyuap.com/static/raty/raty.js


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
        starOff: "icon uf uf-star",
        starOn: "icon uf uf-star orange-600",
        cancelOff: "icon uf uf-minussigninsideablackcircle",
        cancelOn: "icon  uf uf-minussigninsideablackcircle orange-600",
        starHalf: "icon uf uf-starhalfempty orange-500"
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