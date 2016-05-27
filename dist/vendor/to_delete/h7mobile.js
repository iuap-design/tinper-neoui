/*======================================================
************   mobile   ************
======================================================*/
!(function(){
if(!navigator.userAgent.match(/iPhone|iPod|Android|ios|iPad/i)){
	
	return;
}
$.fn.extend({
transform: function(transform) {
		for (var i = 0; i < this.length; i++) {
			var elStyle = this[i].style;
			elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
		}
		return this;
	},
transition: function(duration) {
		if (typeof duration !== 'string') {
			duration = duration + 'ms';
		}
		for (var i = 0; i < this.length; i++) {
			var elStyle = this[i].style;
			elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
		}
		return this;
	},
transitionEnd: function (callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            i, j, dom = this;
        function fireCallBack(e) {
            /*jshint validthis:true */
            if (e.target !== this) return;
            callback.call(this, e);
            for (i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (i = 0; i < events.length; i++) {
                dom.on(events[i], fireCallBack);
            }
        }
        return this;
    }})
$.app = {}
var app=$.app;
app.btn = true;
app.openModal = function (modal) {
		//if(app.closebutton){
            modal = $(modal);
           
            var isModal = modal.hasClass('modal');
            if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
                app.modalStack.push(function () {
                    app.openModal(modal);
                });
                return;
            }
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            if (isModal) {
                modal.show();
                modal.css({
                    marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
                });
            }
        
            var overlay;
            if (!isLoginScreen && !isPickerModal) {
                if ($('.modal-overlay').length === 0 && !isPopup) {
                    $('body').append('<div class="modal-overlay"></div>');
                }
                if ($('.popup-overlay').length === 0 && isPopup) {
                    $('body').append('<div class="popup-overlay"></div>');
                }
                overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            }
        
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').addClass('with-picker-modal');
                //$("html").addClass("hidden_srocll")
            }
        
            // Classes for transition in
            if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
            modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                if (modal.hasClass('modal-out')) modal.trigger('closed');
                else modal.trigger('opened');
            });
     //    }
            return true;
  };
 app.pickerModal = function (pickerModal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = false;
            if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
                pickerModal = $(pickerModal);
				
                if (pickerModal.length > 0) {
                    if (removeOnClose) pickerModal.addClass('remove-on-close');
                  
                    $('body').append(pickerModal[0]);
					//$(top.document.body).append(pickerModal[0]);
					
                }
                else return false; //nothing found
            }
            pickerModal = $(pickerModal);
            if (pickerModal.length === 0) return false;
//          pickerModal.show();
//          app.openModal(pickerModal);
// 			pickerModal.hide();
 	//		app.closeModal(pickerModal);
            return pickerModal[0];
 };
 app.closeModal = function (modal) {
 			
 			modal.find(".refer_input").blur();
 			modal.removeClass("refer_modal");
            modal = $(modal || '.modal-in');
            if (typeof modal !== 'undefined' && modal.length === 0) {
                return;
            }
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
        
            var removeOnClose = modal.hasClass('remove-on-close');
        
            var overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            if (isPopup){
                if (modal.length === $('.popup.modal-in').length) {
                    overlay.removeClass('modal-overlay-visible');    
                }  
            }
            else if (!isPickerModal) {
                overlay.removeClass('modal-overlay-visible');
            }
			
            modal.trigger('close');
            //取消消失动画
			//modal.css("display","none")
            
            // Picker modal body class
            if (isPickerModal) {
                $('body').removeClass('with-picker-modal');
                $("html").removeClass("hidden_srocll")
                $('body').addClass('picker-modal-closing');
            }
        
            if (!isPopover) {
                modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed');
                    else modal.trigger('opened');
                    
                    if (isPickerModal) {
                        $('body').removeClass('picker-modal-closing');
                        $("html").removeClass("hidden_srocll")
                    }
                    if (isPopup || isLoginScreen || isPickerModal) {
                        //modal.removeClass('modal-out').hide();
                         modal.removeClass('modal-out');
                        if (removeOnClose && modal.length > 0) {
                            modal.remove();
                            
                        }
                    }
                    else {
                        modal.remove();
                       
                    }
                });
                if (isModal && app.params.modalStack) {
                	
                    app.modalStackClearQueue();
                }
            }
            else {
                modal.removeClass('modal-in modal-out').trigger('closed').hide();
                if (removeOnClose) {
                    modal.remove();
                   
                }
            }
            $(".refer_select").removeClass("refer_select");
            
            app.btn = true
            return true;
        };
app.accordionToggle = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('accordion-item-expanded')) app.accordionClose(item);
            else app.accordionOpen(item);
        };
app.accordionOpen = function (item) {
    item = $(item);
    var list = item.parents('.accordion-list').eq(0);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
    
    if (expandedItem.length > 0) {
        app.accordionClose(expandedItem);
    }
    content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('open');
    item.addClass('accordion-item-expanded');
};
app.accordionClose = function (item) {
    item = $(item);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    item.removeClass('accordion-item-expanded');
    content.transition(0);
    content.css('height', content[0].scrollHeight + 'px');
    // Relayout
    var clientLeft = content[0].clientLeft;
    // Close
    content.transition('');
    content.css('height', '').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('close');
};
app.support = (function () {
            var support = {
                touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
            };
        
            // Export object
            return support;

})();
app.mobile=(function () {
            var support = navigator.userAgent.match(/iPhone|iPod|Android|ios|iPad/i)?true:false
            // Export object
            return support;

})();
$.getPickerArray = function(tmparray,type){		
		if(tmparray){
		var tmp,tmpdd		
       	tmp = tmparray.split(' ')       	
       	if(!tmp[1]) tmp[1] = "00:00"
       	tmpdd = (tmp[0].split('-')).concat(tmp[1].split(':'))       	       	
       	return tmpdd
		}
}
$.getTranslate = function (el, axis) {
    var matrix, curTransform, curStyle, transformMatrix;
    
        // automatic axis detection
        if (typeof axis === 'undefined') {
            axis = 'x';
        }
    
        curStyle = window.getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            // Some old versions of Webkit choke when 'none' is passed; pass
            // empty string instead in this case
            transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
        }
        else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
            matrix = transformMatrix.toString().split(',');
        }
    
        if (axis === 'x') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m41;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[12]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[4]);
        }
        if (axis === 'y') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m42;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[13]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[5]);
        }
        
        return curTransform || 0;
};
$.requestAnimationFrame = function (callback) {
        if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
        else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
        else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
        else {
            return window.setTimeout(callback, 1000 / 60);
        }
};
$.cancelAnimationFrame = function (id) {
        if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
        else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
        else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
        else {
            return window.clearTimeout(id);
        }  
};
$(document).on('touchend', '.refer_prev, .refer_next, .accordion-item-toggle, .close-picker', handleClicks);
$(document).on('focus', '.refer_input', handleClicks);
 function handleClicks(e) {
 	
 	var clicked = $(this);
 	if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parent('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
     }
 	if (clicked.hasClass('close-picker')) {
        var pickerToClose = $('.picker-modal.modal-in');
        if (pickerToClose.length > 0) {
        	
            app.closeModal(pickerToClose);
        }
        else {
            pickerToClose = $('.popover.modal-in .picker-modal');
            if (pickerToClose.length > 0) {
                app.closeModal(pickerToClose.parents('.popover'));
            }
        }
        
    }
 	if (clicked.hasClass('refer_prev')) {
 		var tmpfield = $(".refer_select").parents(" fieldset[enable='true']")
 		
 		if(tmpfield.length > 0){
 			var tmpdate = tmpfield.prev("fieldset[enable='true']").find("[data-provide='datetimepicker'] div")
 			
 			if(tmpdate.length > 0){
 				tmpdate.triggerHandler("touchend");
 				
 				return;
 			}	
 			var tmpadd = tmpfield.prev("fieldset[enable='true']").find("input")
 			if(tmpadd)tmpadd.triggerHandler("touchend")
 		}
 	}
 	if (clicked.hasClass('refer_next')) {
 		var tmpfield = $(".refer_select").parents("fieldset[enable='true']")
 		if(tmpfield.length > 0){
 			var tmpdate = tmpfield.next("fieldset[enable='true']").find("[data-provide='datetimepicker'] div")
 			
 			if(tmpdate.length > 0 ){
 				tmpdate.triggerHandler("touchend");
 				
 				
 				return;
 			}	
 			var tmpadd = tmpfield.next("fieldset[enable='true']").find("input")
 			if(tmpadd)tmpadd.triggerHandler("toucend")
 		}
 	}
 	if (clicked.hasClass('refer_input')) {
 		
 		e.preventDefault();
 		var pickerToHigh = $('.picker-modal.modal-in');
 		pickerToHigh.addClass("refer_modal")
 		clicked.focus();
 	}	
 }
$(document).on("touchstart",function(e){
	if ($(e.target).parents('.picker-modal').length === 0  ){
		 if($(".modal-out").length > 0 ) app.closeModal($(".modal-out"));	
		 if($(".modal-in").length > 0) app.closeModal($(".modal-in"));
		 return;
	}else if($(e.target).parents('.est').length === 0 && $(e.target).parents('.toolbar-inner').length === 0 ){
		
		e.preventDefault();
		return;
	};
})
var Picker = function (params) {
    var p = this;
    var defaults = {
        updateValuesOnMomentum: false,
        updateValuesOnTouchmove: true,
        rotateEffect: false,
        momentumRatio: 7,
        freeMode: false,
        // Common settings
        scrollToInput: true,
        inputReadOnly: true,
        convertToPopover: true,
        onlyInPopover: false,
        toolbar: true,
       
        toolbarCloseText: 'DONE',
        toolbarTemplate: 
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left"><input style="margin-left:30px" class="refer_input" type="text"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">{{closeText}}</a>' +
                    '</div>' +
                '</div>' +
            '</div>'
    };
    
 	
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
 
    p.touchEvents = {
            start: app.support.touch ? 'touchstart' : 'mousedown',
            move: app.support.touch ? 'touchmove' : 'mousemove',
            end: app.support.touch ? 'touchend' : 'mouseup'
    };
   
    p.params = params;
    
    p.cols = [];
    p.initialized = false;
    
    // Inline flag
    p.inline = p.params.container ? true : false;
	
    // 3D Transforms origin bug, only on safari
    var originBug = true; 
    //app.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android;

    // Should be converted to popover
    function isPopover() {
        var toPopover = false;
        if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
        if (!p.inline && p.params.input) {
            if (p.params.onlyInPopover) toPopover = true;
            else {
                if (app.device.ios) {
                    toPopover = app.device.ipad ? true : false;
                }
                else {
                    if ($(window).width() >= 768) toPopover = true;
                }
            }
        } 
        return toPopover; 
    }
    function inPopover() {
        if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
        else return false;
    }

    // Value
    p.setValue = function (arrValues, transition) {
    	
        var valueIndex = 0;
        for (var i = 0; i < p.cols.length; i++) {
            if (p.cols[i] && !p.cols[i].divider) {
                p.cols[i].setValue(arrValues[valueIndex], transition);
                valueIndex++;
            }
        }
    };
    p.updateValue = function () {
        var newValue = [];
        var newDisplayValue = [];
        for (var i = 0; i < p.cols.length; i++) {
            if (!p.cols[i].divider) {
                newValue.push(p.cols[i].value);
                newDisplayValue.push(p.cols[i].displayValue);
            }
        }
        if (newValue.indexOf(undefined) >= 0) {
            return;
        }
        p.value = newValue;
        p.displayValue = newDisplayValue;
        if (p.params.onChange) {
            p.params.onChange(p, p.value, p.displayValue);
        }
        if (p.input && p.input.length > 0) {
            $(p.input).find("input").data("dd",p.value).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));          	
           	$(p.input).find("input").trigger('picker_close');
        }
    };

    // Columns Handlers
    p.initPickerCol = function (colElement, updateItems) {
        var colContainer = $(colElement);
        var colIndex = colContainer.index();
        var col = p.cols[colIndex];
        if (col.divider) return;
        col.container = colContainer;
        col.wrapper = col.container.find('.picker-items-col-wrapper');
        col.items = col.wrapper.find('.picker-item');
        
        var i, j;
        var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
        col.replaceValues = function (values, displayValues) {
            col.destroyEvents();
            col.values = values;
            col.displayValues = displayValues;
            var newItemsHTML = p.columnHTML(col, true);
            col.wrapper.html(newItemsHTML);
            col.items = col.wrapper.find('.picker-item');
            col.calcSize();
            col.setValue(col.values[0], 0, true);
            col.initEvents();
        };
        col.calcSize = function () {
            if (p.params.rotateEffect) {
                col.container.removeClass('picker-items-col-absolute');
                if (!col.width) col.container.css({width:''});
            }
            
            var colWidth, colHeight;
            colWidth = 0;
            colHeight = col.container[0].offsetHeight;
            wrapperHeight = col.wrapper[0].offsetHeight;
            itemHeight = col.items[0].offsetHeight;
            itemsHeight = itemHeight * col.items.length;
            minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
            maxTranslate = colHeight / 2 - itemHeight / 2;    
            if (col.width) {
                colWidth = col.width;
                if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                col.container.css({width: colWidth});
            }
            if (p.params.rotateEffect) {
                if (!col.width) {
                    col.items.each(function () {
                        var item = $(this);
                        item.css({width:'auto'});
                        colWidth = Math.max(colWidth, item[0].offsetWidth);
                        item.css({width:''});
                    });
                    col.container.css({width: (colWidth + 2) + 'px'});
                }
                col.container.addClass('picker-items-col-absolute');
            }
        };
        col.calcSize();
      
        col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);


        var activeIndex = 0;
        var animationFrameId;

        // Set Value Function
        col.setValue = function (newValue, transition, valueCallbacks) {
            if (typeof transition === 'undefined') transition = '';
            var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
            if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                return;
            }
            var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
            // Update wrapper
            col.wrapper.transition(transition);
            col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
                
            // Watch items
            if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
                $.cancelAnimationFrame(animationFrameId);
                col.wrapper.transitionEnd(function(){
                    $.cancelAnimationFrame(animationFrameId);
                });
                updateDuringScroll();
            }

            // Update items
            col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
        };

        col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
            if (typeof translate === 'undefined') {
                translate = $.getTranslate(col.wrapper[0], 'y');
            }
            if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
            if (activeIndex < 0) activeIndex = 0;
            if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
            var previousActiveIndex = col.activeIndex;
            col.activeIndex = activeIndex;
            col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');

            col.items.transition(transition);
            var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
            var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
            var nextItems = selectedItem.nextAll().addClass('picker-after-selected');

            if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                // Update values
                col.value = selectedItem.attr('data-picker-value');
                col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                // On change callback
                if (previousActiveIndex !== activeIndex) {
                    if (col.onChange) {
                        col.onChange(p, col.value, col.displayValue);
                    }
                    p.updateValue();
                }
            }
                
            // Set 3D rotate effect
            if (!p.params.rotateEffect) {
                return;
            }
            var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
            
            col.items.each(function () {
                var item = $(this);
                var itemOffsetTop = item.index() * itemHeight;
                var translateOffset = maxTranslate - translate;
                var itemOffset = itemOffsetTop - translateOffset;
                var percentage = itemOffset / itemHeight;

                var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                
                var angle = (-18*percentage);
                if (angle > 180) angle = 180;
                if (angle < -180) angle = -180;
                // Far class
                if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                else item.removeClass('picker-item-far');
                // Set transform
                item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
            });
        };

        function updateDuringScroll() {
            animationFrameId = $.requestAnimationFrame(function () {
                col.updateItems(undefined, undefined, 0);
                updateDuringScroll();
            });
        }

        // Update items on init
        if (updateItems) col.updateItems(0, maxTranslate, 0);

        var allowItemClick = true;
        var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
        function handleTouchStart (e) {
        	
            if (isMoved || isTouched) return;
            e.preventDefault();
            isTouched = true;
            
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.originalEvent.targetTouches[0].pageY : e.pageY;
            touchStartTime = (new Date()).getTime();
            
            allowItemClick = true;
            startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
        }
        function handleTouchMove (e) {
            if (!isTouched) return;
            e.preventDefault();
            allowItemClick = false;
            touchCurrentY = e.type === 'touchmove' ? e.originalEvent.targetTouches[0].pageY : e.pageY;
            if (!isMoved) {
                // First move
                $.cancelAnimationFrame(animationFrameId);
                isMoved = true;
                startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                col.wrapper.transition(0);
            }
            e.preventDefault();

            var diff = touchCurrentY - touchStartY;
            currentTranslate = startTranslate + diff;
            returnTo = undefined;

            // Normalize translate
            if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                returnTo = 'min';
            }
            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                returnTo = 'max';
            }
            // Transform wrapper
            col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

            // Update items
            col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
            
            // Calc velocity
            velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
            velocityTime = (new Date()).getTime();
            prevTranslate = currentTranslate;
        }
        function handleTouchEnd (e) {
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
            col.wrapper.transition('');
            if (returnTo) {
                if (returnTo === 'min') {
                    col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                }
                else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
            }
            touchEndTime = new Date().getTime();
            var velocity, newTranslate;
            if (touchEndTime - touchStartTime > 300) {
                newTranslate = currentTranslate;
            }
            else {
                velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
            }

            newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

            // Active Index
            var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

            // Normalize translate
            if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

            // Transform wrapper
            col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');

            // Update items
            col.updateItems(activeIndex, newTranslate, '', true);

            // Watch items
            if (p.params.updateValuesOnMomentum) {
                updateDuringScroll();
                col.wrapper.transitionEnd(function(){
                    $.cancelAnimationFrame(animationFrameId);
                });
            }

            // Allow click
            setTimeout(function () {
                allowItemClick = true;
            }, 100);
        }

        function handleClick(e) {
            if (!allowItemClick) return;
            $.cancelAnimationFrame(animationFrameId);
            /*jshint validthis:true */
            var value = $(this).attr('data-picker-value');
            col.setValue(value);
        }

        col.initEvents = function (detach) {
            var method = detach ? 'off' : 'on';
            
            col.container[method](p.touchEvents.start, handleTouchStart);
            col.container[method](p.touchEvents.move, handleTouchMove);
            col.container[method](p.touchEvents.end, handleTouchEnd);
            col.items[method]('click', handleClick);
        };
        col.destroyEvents = function () {
            col.initEvents(true);
        };

        col.container[0].f7DestroyPickerCol = function () {
            col.destroyEvents();
        };

        col.initEvents();

    };
    p.destroyPickerCol = function (colContainer) {
        colContainer = $(colContainer);
        if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
    };
    // Resize cols
    function resizeCols() {
    	
        if (!p.opened) return;
       
        for (var i = 0; i < p.cols.length; i++) {
            if (!p.cols[i].divider) {
                p.cols[i].calcSize();
                p.cols[i].setValue(p.cols[i].value, 0, false);
            }
        }
    }
    $(window).on('resize', resizeCols);
	
    // HTML Layout
    p.columnHTML = function (col, onlyItems) {
        var columnItemsHTML = '';
        var columnHTML = '';
        if (col.divider) {
            columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
        }
        else {
            for (var j = 0; j < col.values.length; j++) {
                columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
            }
            columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
        }
        return onlyItems ? columnItemsHTML : columnHTML;
    };
    p.layout = function () {
        var pickerHTML = '';
        var pickerClass = '';
        var i;
        var modalNumber = "modal" + Math.floor(Math.random() * (1000 + 1));
        p.cols = [];
        var colsHTML = '';
        for (i = 0; i < p.params.cols.length; i++) {
            var col = p.params.cols[i];
            colsHTML += p.columnHTML(p.params.cols[i]);
            p.cols.push(col);
        }
        pickerClass = 'picker-modal picker-columns '+ modalNumber + " " + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
        if(p.params.refer){
         pickerHTML =
            '<div class="' + (pickerClass) + '">' +
                (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                '<div class="picker-modal-inner picker-items">' +
                    p.params.refer+
                '</div>' +
            '</div>';	
        	
        }else{
        
        pickerHTML =
            '<div class="' + (pickerClass) + '">' +
                (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '') +
                '<div class="picker-modal-inner picker-items">' +
                    colsHTML +
                    '<div class="picker-center-highlight"></div>' +
                '</div>' +
            '</div>';
        }    
        p.modalNumber = "."+modalNumber
        p.pickerHTML = pickerHTML;    
    };

    // Input Events
   function openOnInput(e) {
    	

		
      // e.preventDefault();
       //$(".picker-modal").hide()
       if ($(p.input).find("input").attr("h7picker") === "false") return;
       if (p.opened) return;
       
       $(p.input).find("input").trigger("picker_open")
       var tmparray =  moment($(p.input).find("input").val()).format("YYYY-M-D HH:mm") 
	  
       p.value = tmparray;        
       if(p.params.pickerType){       		
       		p.value = $.getPickerArray(tmparray)
       }
      
      // $(p.input).find("input").data("dd")
       if(!p.value){
		   p.value = p.params.value 
	   }
      
       if(p.modalNumber){
       	  
       	  if($(".modal-out").length > 0 ) app.closeModal($(".modal-out"));	
       	  if($(".modal-in").length > 0) app.closeModal($(".modal-in"));
       	 
	     $(p.container).addClass("picker-iframe").show()
       
	//  定位至input之下
	//	 $(p.container).css({top:$(p.input).offset().top+50}).addClass("picker-iframe").show()
       	  
       	  
       	  if(p.params.refer){
			
		  }else if(!p.datestart) {
	            // Init Events
	           
	          	 p.container.find('.picker-items-col').each(function () {
	                var updateItems = true;
	                if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
	               
	                p.initPickerCol(this, updateItems);
	     	     });
	            
	            
	            // Set value
//	            if (!p.initialized) {
//	                if (p.params.value) {
//	                	
//	                    p.setValue(p.params.value, 0);
//	                }
//	            }
//	            else {
//	            	
//	                if (p.value) p.setValue(p.value, 0);
//	            }
				if (p.value) {
						 p.setValue(p.value, 0)
				}else{
						 p.setValue(p.params.value, 0); 	
				};
          }
		  
		  p.input.parents(".input-group").addClass("refer_select")
		 
		  app.openModal($(p.container))
		 
		  p.datestart = false;
       	  p.opened = true;
          p.initialized = true;
          
       	  return
       }
		  
       
   		$(e.target).attr("load","ready")
        if (p.params.scrollToInput && !isPopover()) {
            var pageContent = p.input.parents('.page-content');
            if (pageContent.length === 0) return;

            var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                newPaddingBottom;
            var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
            if (inputTop > pageHeight) {
                var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                if (scrollTop + pageHeight > pageScrollHeight) {
                    newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                    if (pageHeight === pageScrollHeight) {
                        newPaddingBottom = p.container.height();
                    }
                    pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                }
                pageContent.scrollTop(scrollTop, 300);
            }
        }
    }
    function closeOnHTMLClick(e) {
    	
        if (inPopover()) return;
        if (p.input && p.input.length > 0) {
        	
        	
           if (e.target !== p.input[0] || $(e.target).parents('.picker-modal').length === 0) {
           	p.close();
           }	
        }
        else {
        	
            if ($(e.target).parents('.picker-modal').length === 0) p.close();   
      }
    }

    if (p.params.input) {
        p.input = $(p.params.input);
        if (p.input.length > 0) {
            if (p.params.inputReadOnly) p.input.prop('readOnly', true);
            if (!p.inline) {
                p.input.on('touchend', openOnInput);    
            }
            if (p.params.inputReadOnly) {
                p.input.on('focus mousedown', function (e) {
                    e.preventDefault();
                });
            }
        }
            
    }
    
    

    // Open
    function onPickerClose() {
        p.opened = false;
        if (p.input && p.input.length > 0) p.input.parents('.page-content').css({'padding-bottom': ''});
        if (p.params.onClose) p.params.onClose(p);

        // Destroy events
//      p.container.find('.picker-items-col').each(function () {
//          p.destroyPickerCol(this);
//      });
    }

    p.opened = false;
    p.open = function (e) {
        var toPopover = isPopover();
		
        if (!p.opened) {

            // Layout
            p.layout();

            // Append
            if (toPopover) {
                p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                p.popover = app.popover(p.pickerHTML, p.params.input, true);
                p.container = $(p.popover).find('.picker-modal');
                $(p.popover).on('close', function () {
                    onPickerClose();
                });
            }
            else if (p.inline) {
                p.container = $(p.pickerHTML);
                p.container.addClass('picker-modal-inline');
                $(p.params.container).append(p.container);
            }
            else  {
				
               p.container = $(app.pickerModal(p.pickerHTML));
              // p.container = p.pickerHTML
                $(p.container)
                .on('close', function () {
					
                    onPickerClose();
                });
            }
			
            // Store picker instance
           p.container[0].f7Picker = p;
		  
        }

        // Set flag
        p.opened = false;
        p.initialized = false;

        if (p.params.onOpen) p.params.onOpen(p);
    };

    // Close
    p.close = function () {
    	
        if (!p.opened || p.inline) return;
        if (inPopover()) {
            app.closeModal(p.popover);
            return;
        }
        else {
        	
            app.closeModal(p.container);
            return;
        }
    };

    // Destroy
    p.destroy = function () {
        p.close();
        if (p.params.input && p.input.length > 0) {
            p.input.off('touchend focus', openOnInput);
        }
        //$('html').off('click', closeOnHTMLClick);
        $(window).off('resize', resizeCols);
    };

    if (p.inline) {
        p.open();
    }    
	//p.input.triggerHandler("touchend") 
	p.open();
    return p;

};
$.app.picker_mobile = function (params) {
	
    return new Picker(params);
};
$.app.switch_mobile = function(){
	if($.app){
		$(".mobile_switch").wrap("<label class='label-switch'></label>").after("<div class='checkbox'></div>").removeClass("mobile_switch")
	}else{
		$(".mobile_switch").css("display","block")
	}
	
}
$(function(){
	$.app.switch_mobile();
})		
})();

