# Autocomplete
## 基本使用
下面的例子是autocomplete的基本使用   
html 代码
``` html
<!--html-->
<input id="test1"/><br/>
```
javascript 代码
``` javascript
// JS
var sourceValue = [
        {
            label : "C++"
        },
        {
            label : 'Java'
        },
        {
            label : 'Python'
        },
        {
            label : 'JavaScript'
        },
        {
            label : 'C#'
        },
        {
            label : 'C'
        },
        {
            label : 'Jython'
        },
        {
            label : 'Html'
        },
        {
            label : 'html'
        }
    ];

    new u.Autocomplete({
        el:'#test1',
        source: sourceValue,
        select: function(item){
            alert('select');
        }
    })
```
## 参数详解
###### source
数据源

###### select
选中之后的回调函数。

###### multiSelect
是否允许多选

###### maxItemsToShow
最多显示的条数。默认为-1，为不限制显示条数

###### minChars
控制智能提示时输入的最少字符数。默认为1

###### delay
设置弹出智能提示的延迟时间（单位ms）。默认为400ms

###### inputClass
input框的自定义样式。

###### resultsClass
下拉框的自定义样式

###### lineSeparator
ajax请求返回数据的行的分隔符。默认为\n

###### cellSeparator
ajax请求返回数据的数据项的分隔符。默认为|

###### matchCase
是否区分大小写。默认为否

###### cacheLength
是否缓存数据。默认为是

###### loadingClass
加载数据时input框的样式

###### selectFirst
是否默认选中第一项。默认为false

replaceExamp