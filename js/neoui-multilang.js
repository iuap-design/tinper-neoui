/**
 * Module : neoui-multilang
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 20:19:37
 */

import {BaseComponent} from 'tinper-sparrow/js/BaseComponent';
import {extend} from 'tinper-sparrow/js/extend';
import {each,isArray} from 'tinper-sparrow/js/util';
import {wrap,css,hasClass,removeClass} from 'tinper-sparrow/js/dom';
import {on,trigger} from 'tinper-sparrow/js/event';
import {compMgr} from 'tinper-sparrow/js/compMgr';


var Multilang = BaseComponent.extend({
	init: function() {
		var self = this;
		var element = this.element;
		this.options = extend({}, this.DEFAULTS, this.options);
		this.field = this.options.field || 'name';
		this.multinfo(this.options.multinfo);
		this.addData(this.options.multidata);

	}
})
Multilang.fn = Multilang.prototype;
Multilang.fn.addData = function(val) {
	var target = this.element,
		tmparray, 
		target_div = target.parentNode;
	if(val === null || typeof(val) === 'undefined' ){
		tmparray = [];
	} else if (typeof(val) == "object") {
		tmparray = val
	} else {
		tmparray = val.split(",")
	}
	target_div.value = tmparray;
	each(tmparray, function(i, node) {
		target_div.querySelectorAll(".m_context")[i].innerHTML = node
	})

};
Multilang.fn.multinfo = function(sort) {

	var target = this.element,
		self = this,
		tmplabel = "",
		close_menu = false;
	if(isArray(sort)) {

		wrap(target, "<div class='multilang_body'><input class='lang_value' contenteditable='true'><span class='uf uf-caretdown lang_icon'><span class='m_icon'></span></span>")
		css(target, "display", "none")

		each(sort, function(i, node) {
			if(i) {
				tmplabel += "<label attr='" + self.field + (i + 1) + "'><span class='m_context'></span><span class='m_icon'>" + node + "</span></label>"
			} else {
				tmplabel += "<label attr='" + self.field + "'><span class='m_context'></span><span class='m_icon'>" + node + "</span></label>"
			}
		})
		var target_div = target.parentNode;

		target_div.insertAdjacentHTML("beforeEnd", "<div class='multilang_menu '>" + tmplabel + "</div>");
		var tmpIconv = target_div.querySelector(".lang_icon"),
			target_menu = target_div.querySelector(".multilang_menu"),
			target_labels = target_menu.querySelectorAll('label'),
			tmpvaluebox = target_div.querySelector(".lang_value");
		on(tmpIconv, "click", function() {
			var target_icon = this;
			target_div.querySelector(".lang_value").focus()
			if(css(target_menu, "display") == "block") {
				css(target_menu, "display", "none")
			} else {
				css(target_menu, "display", "block")
			}
		})
		on(target_menu, "mouseenter", function() {
			close_menu = false;
		})
		on(target_menu, "mouseleave", function() {
			close_menu = true;
		})

		on(tmpvaluebox, "blur", function(e) {
			var target_input = $(this),
				target_div = target_input.parents(".multilang_body"),
				target = e.target,
				tmpkey = target.className.split(" ")[2],
				tmptext = target.value;

			if(hasClass(target, "ready_change")) {
				self.changeData(target_div[0], tmpkey, tmptext);
			}
			// if(close_menu) {
			// 	css(target_menu, "display", "none")
			// }

		})

		target_labels.forEach(function(ele){
			on(ele, "click", function() {
				var target_label = this,
					tempField = target_label.getAttribute("attr"),
					tmptext = target_label.querySelector(".m_context").innerHTML,
					tmpicon = target_label.querySelector(".m_icon").cloneNode(true);

				tmpvaluebox.setAttribute("class", "ready_change lang_value " + tempField)
				tmpvaluebox.value = tmptext
				tmpvaluebox.focus();
				var tmpicom = target_div.querySelector(".lang_icon"),
					oldicon = target_div.querySelector(".m_icon");
				removeClass(tmpicom, "uf-caretdown");
				tmpicom.replaceChild(tmpicon, oldicon);
			})
		})

	} else {
		console.error('Not object')
	}
}
Multilang.fn.changeData = function(target_div, field, text) {
	var tmpdata = target_div.value,
		tmplabel = target_div.querySelector("label[attr='" + field + "']"),
		tmpcontext = tmplabel.querySelector(".m_context");
	tmpcontext.innerHTML = text;
	tmpcontext.value = text;
	each(target_div.querySelectorAll(".m_context"), function(i, node) {
		tmpdata[i] = node.innerHTML
	})

	this.trigger('change.u.multilang', {
		newValue: text,
		field: field
	})

}
Multilang.fn.getData = function() {
	var target = $(multilang.target).next(".multilang_body")[0],
		multilang_data = target.value;

	return multilang_data;
}

Multilang.fn.setDataValue = function(field, value){
	var target_div = this.element.closest('.multilang_body'),
		tmplabel = target_div.querySelector("label[attr='" + field + "']"),
		tmpcontext = tmplabel.querySelector(".m_context");
	tmpcontext.innerHTML = value;
	tmpcontext.value = value;

	var tmpdata = [];
	each(this.element.closest('.multilang_body').querySelectorAll(".m_context"), function(i, node) {
		tmpdata[i] = node.innerHTML
	})
	this.element.closest('.multilang_body').value = tmpdata;

}

compMgr.regComp({
	comp: Multilang,
	compAsString: 'u.Multilang',
	css: 'u-multilang'
});

if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}


export {Multilang};
