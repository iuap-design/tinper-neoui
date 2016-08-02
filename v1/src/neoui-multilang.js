/**
 * Module : neoui-multilang
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 20:19:37
 */

import {BaseComponent} from './sparrow/BaseComponent';
import {extend} from './sparrow/extend';
import {each,isArray} from './sparrow/util';
import {wrap,css,hasClass,removeClass} from './sparrow/dom';
import {on,trigger} from './sparrow/event';
import {compMgr} from './sparrow/compMgr';


var Multilang = BaseComponent.extend({
	DEFAULTS: {
		dataSource: {},
		onSelect: function() {}
	},
	init: function() {
		var self = this;
		var element = this.element;
		this.options = extend({}, this.DEFAULTS, this.options);
		this.multinfo(this.options.multinfo);
		this.addData(this.options.multidata);

	}
})
Multilang.fn = Multilang.prototype;
Multilang.fn.addData = function(val) {
	var target = this.element,
		tmparray, target_div = target.parentNode;
	if(typeof(val) == "object") {
		tmparray = val
	} else {
		tmparray = val.split(",")
	}
	target_div.value = tmparray
	each(tmparray, function(i, node) {
		target_div.querySelectorAll(".m_context")[i].innerHTML = node
	})

};
Multilang.fn.multinfo = function(sort) {

	var target = this.element,
		me = this,
		tmplabel = "",
		close_menu = true,
		tmpfield = "name";
	if(sort.lang_name) {
		tmpfield = sort.lang_name
	}
	if(isArray(sort)) {

		wrap(target, "<div class='multilang_body'><input class='lang_value' contenteditable='true'><span class='uf uf-caretdown lang_icon'><span class='m_icon'></span></span>")
		css(target, "display", "none")

		each(sort, function(i, node) {
			if(i) {
				tmplabel += "<label attr='" + tmpfield + (i + 1) + "'><span class='m_context'></span><span class='m_icon'>" + node + "</span></label>"
			} else {
				tmplabel += "<label attr='" + tmpfield + "'><span class='m_context'></span><span class='m_icon'>" + node + "</span></label>"
			}
		})
		var target_div = target.parentNode

		target_div.insertAdjacentHTML("beforeEnd", "<div class='multilang_menu '>" + tmplabel + "</div>")
		var tmpIconv = target_div.querySelector(".lang_icon"),
			target_menu = target_div.querySelector(".multilang_menu"),
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

		on(tmpvaluebox, "blur", function() {
			//this//
			//target_box = me.fixtarget(target_input),
			//target_div = target_input.parents(".multilang_body"),
			target = this
			tmpkey = target.className.split(" ")[2],
				tmptext = target.value;

			if(hasClass(target, "ready_change")) {
				me.changeData(target_div, tmpkey, tmptext);
			}
			if(close_menu) {
				css(target_menu, "display", "none")
			}

		})
		on(target_menu, "click", "label", function() {
			var target_label = this,
				tmpfield = target_label.getAttribute("attr"),
				tmptext = target_label.querySelector(".m_context").innerHTML,
				tmpicon = target_label.querySelector(".m_icon").cloneNode(true);

			tmpvaluebox.setAttribute("class", "ready_change lang_value " + tmpfield)
			tmpvaluebox.value = tmptext
			tmpvaluebox.focus();
			var tmpicom = target_div.querySelector(".lang_icon"),
				oldicon = target_div.querySelector(".m_icon")
			removeClass(tmpicom, "uf-caretdown")
			tmpicom.replaceChild(tmpicon, oldicon)
		})

	} else {
		console.error('Not object')
	}
}
Multilang.fn.changeData = function(target_div, field, text) {
	var tmpdata = target_div.value;
	tmplabel = target_div.querySelector("label[attr='" + field + "']");
	tmpcontext = tmplabel.querySelector(".m_context");
	tmpcontext.innerHTML = text
	tmpcontext.value = text
	each(target_div.querySelectorAll(".m_context"), function(i, node) {
		tmpdata[i] = node.innerHTML
	})

	trigger(this.element, 'change.u.multilang', {
		newValue: text,
		field: field
	})

}
Multilang.fn.getData = function() {
	var target = $(multilang.target).next(".multilang_body")[0],
		multilang_data = target.value;
	return multilang_data;
}
compMgr.regComp({
	comp: Multilang,
	compAsString: 'u.Multilang',
	css: 'u-multilang'
});


export {Multilang};
