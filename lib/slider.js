"use strict";

!function () {
	var Uslider = function Uslider(ele, opt) {
		var me = this,
		    ele = $(ele);
		var opt = $.extend(true, {}, me.slider_default, opt),
		    sp = {};
		opt.parent_box.css("height", opt.height);
		ele.wrap(opt.parent_box);
		var slider = $("<div class='slider_box'></div>"),
		    button_height = opt.height / ele.height();
		var s_button = $("<div class='slider_button'></div>");
		var u_slider_box = $("<div class='u_slider_box'></div>");
		slider.append(s_button);
		u_slider_box.append(slider);
		s_button.css("height", button_height * 100 + "%");
		ele.parent().after(u_slider_box);

		//滚动条高度
		sp.box_height = slider.height();
		//按钮高度
		sp.button_height = s_button.height();
		//元素高度
		sp.ele_height = ele.height();
		//显示高度
		sp.con_height = opt.height;
		s_button.on({
			"mousedown": function mousedown(e) {
				opt.button_move = true;
				sp.b_clientY = e.clientY;
				//console.log(e)
			},
			"mouseleave": function mouseleave() {

				//				opt.button_move = false;	

			},
			"mouseup": function mouseup() {

				opt.button_move = false;
			}
		});
		slider.on({
			"mousemove": function mousemove(e) {

				if (opt.button_move) {

					var tmptop = s_button.position().top + (e.clientY - sp.b_clientY),
					    tmptop;
					var tmpparent = ele.parent(".u_slider_con");
					if (tmptop < 3) {
						s_button.css("top", 3);
						tmpparent.scrollTop(0);
						//						s_button.trigger("mouseup")

						return false;
					} else if (tmptop + sp.button_height > sp.box_height - 3) {
						s_button.css("top", sp.box_height - sp.button_height - 3);
						tmpparent.scrollTop(ele.height());
						//						s_button.trigger("mouseup")

						return false;
					} else {
						s_button.css("top", tmptop);
						var tmptop = (sp.ele_height - sp.con_height) * tmptop / (sp.box_height - sp.button_height);
						tmpparent.scrollTop(tmptop);
					}
					sp.b_clientY = e.clientY;
					e.stopPropagation();
					return false;
				}
			},
			"mouseup": function mouseup(e) {
				opt.button_move = false;
				e.stopPropagation();
				return false;
			}
		});
	};
	Uslider.prototype = {
		slider_default: {
			parent_box: $("<div class='u_slider'><div class='u_slider_con' style='position:relative'></div></div>"),
			height: 400,
			button_move: false
		}

	};

	$.fn.slider = function (opt) {
		$.each(this, function (i, node) {
			new Uslider(node, opt);
		});
	};
}();