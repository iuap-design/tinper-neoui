## 参照组件

参照组件是基于`模态框组件`进行的开发，配合`kero`可实现赋值，传值等复杂操作。


### 使用方法

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


#### 参数说明

* `isPOPMode`:弹出层模式

* `title`:弹出层标题，默认值`'参照'`

* `contentId`:弹出层ID，默认值`referWrap`

* `module`:`template`为弹出层内容，默认为空

* `onOk`:弹出层确认后的回调函数

* `onCancel`:弹出层取消后的回调函数

  ​
