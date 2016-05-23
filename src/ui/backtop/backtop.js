/* ========================================================================
 * UUI: backtop.js v0.0.1
 *
 * ========================================================================
 * Copyright 2014 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */


u.BackTop = u.BaseComponent.extend({
    defaults: {
        toggleHeight: 100
    },
    init: function () {
        //TODO 重新实现
        //var self = this;
        //this.$element = $(element)
        //this.options = $.extend({}, BackTop.DEFAULTS, options);
        //
        //$(window).scroll(function (e) {
        //    if ($(document).scrollTop() > me.options.toggleHeight) {
        //        me.$element.addClass("active");
        //    } else {
        //        me.$element.removeClass("active");
        //    }
        //});
        //this.$element.click(function () {
        //    $(document).scrollTop(0);
        //});


    }
});


u.compMgr.regComp({
    comp: u.BackTop,
    compAsString: 'u.BackTop',
    css: 'u-backtop'
});
