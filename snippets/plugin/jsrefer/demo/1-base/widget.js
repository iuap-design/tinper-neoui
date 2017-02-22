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
