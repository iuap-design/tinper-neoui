u.NavMenu = u.BaseComponent.extend({
    _Constant: {
    },
    _CssClasses: {
        NAV: 'u-navmenu',
        NAV_LINK: 'u-navmenu-link',
        NAV_LINK_CURRENT: 'u-navmenu-link-current',
        NAV_LINK_OPEN: 'u-navmenu-link-open',
        NAV_SUB: 'u-navmenu-sub'
    },
    init: function(){

        u.on(this.element,'click', this._navlinkClickHander.bind(this));

        var items = this.element.querySelectorAll('.' + this._CssClasses.NAV_LINK);
        for(var i=0;i<items.length;i++) {
            new u.Ripple(items[i])
        }

    },

   
    _navlinkClickHander: function (e) {
        //var _target = e.currentTarget || e.target || e.srcElement;
        var curlink = this.element.querySelector('.'+this._CssClasses.NAV_LINK_CURRENT);
        curlink && u.removeClass(curlink, this._CssClasses.NAV_LINK_CURRENT);
        // if (curlink && u.isIE8){
        // 	var sub = curlink.parentNode.querySelector('.'+this._CssClasses.NAV_SUB);
        // 	if (sub){
        // 		sub.style.maxHeight = '0';
        // 	}
        // }

        var item = u.closest(e.target, this._CssClasses.NAV_LINK);

        if(item){
            u.addClass(item, this._CssClasses.NAV_LINK_CURRENT);
            var sub = item.parentNode.querySelector('.'+this._CssClasses.NAV_SUB),
                open = u.hasClass(item, this._CssClasses.NAV_LINK_OPEN);
            if (sub && open){
                u.removeClass(item, this._CssClasses.NAV_LINK_OPEN);
                if (u.isIE8)
                    sub.style.maxHeight = 0;
            }
            if (sub && !open){
                u.addClass(item, this._CssClasses.NAV_LINK_OPEN);
                if (u.isIE8)
                    sub.style.maxHeight = '999px';
            }
            // sub && open && u.removeClass(item, this._CssClasses.NAV_LINK_OPEN);
            // sub && !open && u.addClass(item, this._CssClasses.NAV_LINK_OPEN);
        }
        
    }
});





u.compMgr.regComp({
    comp: u.NavMenu,
    compAsString: 'u.NavMenu',
    css: 'u-navmenu'
})
