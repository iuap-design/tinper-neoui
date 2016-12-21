/**
 * Module : neoui-collapse
 * Author :  yaoxinc(yaoxinc@yonyou.com)
 * Date   : 2016/11/30
 *
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {addClass,removeClass,makeDOM} from 'tinper-sparrow/js/dom';
import {extend} from 'tinper-sparrow/js/extend';
import {on, off} from 'tinper-sparrow/js/event';
import {compMgr} from 'tinper-sparrow/js/compMgr';

        /* COLLAPSIBLE PLUGIN DEFINITION
         *
         */
		 
		 
        function Collapse (element, options) {

            this.$element = $(element) //数值是下面的class等，且只执行一次
            this.options = $.extend({}, {toggle: true}, options)//数值是Oject{toggle:collapse}
            this.options.toggle && this.toggle() //undefined

        }

        Collapse.prototype = {
            constructor: Collapse,
            dimension: function () {
                /*  console.log(this.$element)*/
                var hasWidth = this.$element.hasClass('width'); //false
                return hasWidth ? 'width' : 'height';  //返回height
            },
            show: function () {
                var dimension = this.dimension(), //数值是height
                        scroll = $.camelCase(['scroll', dimension].join('-')), //数值scrollHeight
                        actives = this.$parent && this.$parent.find('.in'), //数值undefined
                        hasData;

                if (actives && actives.length) {
                    hasData = actives.data('collapse');
                    actives.collapse('hide');
                    hasData || actives.data('collapse', null);
                }
                this.$element[dimension](0);   //数值是下面的class等
                this.transition('addClass', 'show', 'shown');
                this.$element[dimension](this.$element[0][scroll]);

            },
            transition: function (method, startEvent, completeEvent) {   //'addClass', 'show', 'shown'
                var that = this,
                        complete = function () {
                            if (startEvent == 'show')
                                that.reset();
                            that.$element.trigger(completeEvent);
                        }
                this.$element.trigger(startEvent)[method]('in');

                $.support.transition && this.$element.hasClass('collapse') ? this.$element.one($.support.transition.end, complete) : complete()

            },
            reset: function (size) {
                var dimension = this.dimension(); //数值一直是height
                this.$element.removeClass('collapse')[dimension](size || 'auto')[0].offsetWidth;//1200
                this.$element.addClass('collapse');
            },
            hide: function () {
                var dimension = this.dimension();
                this.reset(this.$element[dimension]());
                this.transition('removeClass', 'hide', 'hidden');
                this.$element[dimension](0);
            },

            toggle: function () {
                this[this.$element.hasClass('in') ? 'hide' : 'show']();
            }

        }
			

var showCollapse = BaseComponent.extend({

    /* COLLAPSIBLE DATA-API
     * ==================== */
    init: function () {
        off(this.element, 'click');
        on(this.element, 'click', function (e) {
            var $this = $(this);
           
            var href;
            var target = (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') ||$this.attr('u-data-toggle') || e.preventDefault(); //strip for ie7

            var option = $(target).data('collapse') ? 'toggle' : $this.data();
            var $this_down = $(target);
            
            var data = $this_down.data('collapse'),
                options = typeof option == 'object' && option;

            if (!data) {
                $this_down.data('collapse', data = new Collapse( target, options));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        });

    }

})



compMgr.regComp({
    comp: showCollapse,
    compAsString: 'u.collapse.updown',
    css: 'u-collapse-updown'
});
if (document.readyState && document.readyState === 'complete') {
    compMgr.updateComp();
} else {
    on(window, 'load', function () {
        //扫描并生成控件
        compMgr.updateComp();
    });
}
export {showCollapse};