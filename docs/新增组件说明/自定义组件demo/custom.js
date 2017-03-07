
u.customComp = u.BaseComponent.extend({
    // 入口方法
    init:function(){
        var self = this;
        var options1 = this.options['options1'];
        $(this.element).append('<div id="' + options1 + '" style="width:100%;height:100%;"></div>');

        this.$div = $('div',$(this.element));
        u.on(this.element,'click',function(){
            self.toggleValue();
        })
    },

    toggleValue:function(){
        if(this.value){
            this.value = false;
        }else{
            this.value = true;
        }
        this.setShowValue(this.value);
        this.trigger('change',{ value:this.value});
    },

    setValue: function(value){
        this.value = value;
        this.setShowValue(this.value);
    },

    setShowValue:function(value){
        if(value){
            this.$div.css('background','red');
        }else{
            this.$div.css('background','yellow');
        }
    }
});

u.compMgr.regComp({
    comp: u.customComp,
    compAsString: 'u.custom',
    css: 'u-custom'
});
