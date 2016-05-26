/**
 * 密码控件
 */
u.PassWordAdapter = u.StringAdapter.extend({
    init: function () {
        u.PassWordAdapter.superclass.init.apply(this);
        var oThis = this;
        this.element.type = "password";
        this._element = this.element.parentNode;
        this.span = this._element.querySelector("span");
        if(this.span){
            u.on(this.span,'click',function(){
                if(oThis.element.type == 'password'){
                    oThis.element.type = 'text';
                }else{
                    oThis.element.type = 'password';
                }
            });
        }
        
    }
});
u.compMgr.addDataAdapter(
    {
        adapter: u.PassWordAdapter,
        name: 'password'
    });


