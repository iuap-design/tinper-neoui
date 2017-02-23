# 参照组件

参照组件是基于`模态框组件`进行的开发，配合`kero`可实现赋值，传值等复杂操作。





# 使用方法

```
u.refer({
      title:'测试项目',
      contentId: 'testitemid_ref',
      height:'300px',
      module:{
          template: 'Module: Refer Template Content'
      },
      onOk: function(){
          alert('ok');
      },
      onCancel: function(){
          alert('cancel');
      },
      isPOPMode: true
})
```



## # 参数说明

* `isPOPMode`:弹出层模式

* `title`:弹出层标题，默认值`'参照'`

* `contentId`:弹出层ID，默认值`referWrap`

* `module`:`template`为弹出层内容，默认为空

* `onOk`:弹出层确认后的回调函数

* `onCancel`:弹出层取消后的回调函数

  ​


## 参照示例

点击id为`referdom`元素的按钮，弹出参照层

<div class="examples-code"><pre><code>

&lt;button class="u-button u-button-primary langbtn" id="referdom">弹出参照&lt;/button>
</code></pre>
</div>


<pre class="examples-code"><code>
var referDOM = document.getElementById('referdom');
u.on(referDOM, 'click', function(){
    u.refer({
      // 模式 弹出层
      isPOPMode: true,
      // 弹出层id
      contentId: 'testitemid_ref',
      // 设定参照层标题
      title:'测试项目',
      // 设置而参照层高度
      height:'300px',
      // 设置参照层内容
      module:{
          template: 'Module: Refer Template Content'
      },
      // 点击确认后回调事件
      onOk: function(){
          alert('ok');
      },
      // 点击取消后回调事件
      onCancel: function(){
          alert('cancel');
      }
    })
})
</code></pre>

