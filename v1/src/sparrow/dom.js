/**
 * Module : Sparrow dom
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */
import { on,stopEvent } from './event';
/**
 * 元素增加指定样式
 * @param value
 * @returns {*}
 */
var addClass = function(element, value) {
	if(typeof element.classList === 'undefined') {
		if(u._addClass)
			u._addClass(element, value);
	} else {
		element.classList.add(value);
	}
	return u;
};
/**
 * 删除元素上指定样式
 * @param {Object} element
 * @param {Object} value
 */
var removeClass = function(element, value) {
	if(typeof element.classList === 'undefined') {
		if(u._removeClass)
			u._removeClass(element, value);
	} else {
		element.classList.remove(value);
	}
	return u;
};
/**
 * 元素上是否存在该类
 * @param {Object} element
 * @param {Object} value
 */
var hasClass = function(element, value) {
	if(!element) return false;
	if(element.nodeName && (element.nodeName === '#text' || element.nodeName === '#comment')) return false;
	if(typeof element.classList === 'undefined') {
		if(u._hasClass)
			return u._hasClass(element, value);
		return false;
	} else {
		return element.classList.contains(value);
	}
};
/**
 * 选择元素类切换
 * @param {Object} element
 * @param {Object} value
 */
var toggleClass = function(element, value) {
	if(typeof element.classList === 'undefined') {
		return u._toggleClass(element, value);
	} else {
		return element.classList.toggle(value);
	}
};

/**
 * 向上查找指定类元素
 * @param {Object} element
 * @param {Object} selector
 */
var closest = function(element, selector) {
	var tmp = element;
	while(tmp != null && !hasClass(tmp, selector) && tmp != document.body) {
		tmp = tmp.parentNode;
	}
	if(tmp == document.body) return null;
	return tmp;
};

/**
 * 元素CSS操作
 * @param {Object} element
 * @param {Object} csstext
 * @param {Object} val
 */
var css = function(element, csstext, val) { //TO DO : 实现u.相关方法
	if(csstext instanceof Object) {
		for(var k in csstext) {
			var tmpcss = csstext[k]
			if(["width", "height", "top", "bottom", "left", "right"].indexOf(k) > -1 && isNumber(tmpcss)) {
				tmpcss = tmpcss + "px"
			}
			element.style[k] = tmpcss
		}
	} else {
		if(arguments.length > 2) {
			element.style[csstext] = val
		} else {
			return getStyle(element, csstext);
		}
	}
};

var wrap = function(element, parent) {
	var p = makeDOM(parent)
	element.parentNode.insertBefore(p, element)
	p.appendChild(element)
};
var getStyle = function(element, key) {
	//不要在循环里用
	var allCSS
	if(window.getComputedStyle) {
		allCSS = window.getComputedStyle(element)
	} else {
		allCSS = element.currentStyle
	}
	if(allCSS[key] !== undefined) {
		return allCSS[key]
	} else {
		return ""
	}
};
var globalZIndex;
/**
 * 统一zindex值, 不同控件每次显示时都取最大的zindex，防止显示错乱
 */
var getZIndex = function() {
	if(!globalZIndex) {
		globalZIndex = 2000;
	}
	return globalZIndex++;
};
var makeDOM = function(htmlString) {
	var tempDiv = document.createElement("div");
	tempDiv.innerHTML = htmlString;
	var _dom = tempDiv.children[0];
	return _dom;
};
/**
 * element
 */
var makeModal = function(element, parEle) {
	var overlayDiv = document.createElement('div');
	addClass(overlayDiv, 'u-overlay');
	overlayDiv.style.zIndex = getZIndex();
	// 如果有父元素则插入到父元素上，没有则添加到body上
	if(parEle && parEle != document.body) {
		addClass(overlayDiv, 'hasPar');
		parEle.appendChild(overlayDiv);
	} else {
		document.body.appendChild(overlayDiv)
	}

	element.style.zIndex = getZIndex();
	on(overlayDiv, 'click', function(e) {
		stopEvent(e);
	})
	return overlayDiv;
};

var getOffset = function(Node, offset) {
	if(!offset) {
		offset = {};
		offset.top = 0;
		offset.left = 0;
	}
	if(Node == document.body) {
		return offset;
	}
	offset.top += Node.offsetTop;
	offset.left += Node.offsetLeft;
	if(Node.offsetParent)
		return getOffset(Node.offsetParent, offset);
	else
		return offset;
};
var getScroll = function(Node, offset) {
	if(!offset) {
		offset = {};
		offset.top = 0;
		offset.left = 0;
	}
	if(Node == document.body) {
		offset.top += Node.scrollTop || document.documentElement.scrollTop;
		offset.left += Node.scrollLeft || document.documentElement.scrollLeft;
		return offset;
	}
	offset.top += Node.scrollTop;
	offset.left += Node.scrollLeft;
	if(Node.parentNode)
		return getScroll(Node.parentNode, offset);
	else
		return offset;
};
var showPanelByEle = function(obj) {
	var ele = obj.ele,
		panel = obj.panel,
		position = obj.position,
		off = getOffset(ele),
		scroll = getScroll(ele),
		offLeft = off.left,
		offTop = off.top,
		scrollLeft = scroll.left,
		scrollTop = scroll.top,
		eleWidth = ele.offsetWidth,
		eleHeight = ele.offsetHeight,
		panelWidth = panel.offsetWidth,
		panelHeight = panel.offsetHeight,
		bodyWidth = document.body.clientWidth,
		bodyHeight = document.body.clientHeight,
		position = position || 'top',
		left = offLeft - scrollLeft,
		top = offTop - scrollTop;
	// 基准点为Ele的左上角
	// 后续根据需要完善
	if(position == 'left') {
		left = left - panelWidth;
		top = top + (eleHeight - panelHeight) / 2;
	} else if(position == 'right') {
		left = left + eleWidth;
		top = top + (eleHeight - panelHeight) / 2;
	} else if(position == 'top' || position == 'topCenter') {
		left = left + (eleWidth - panelWidth) / 2;
		top = top - panelHeight;
	} else if(position == 'bottom' || position == 'bottomCenter') {
		left = left + (eleWidth - panelWidth) / 2;
		top = top + eleHeight;
	} else if(position == 'bottomLeft') {
		left = left;
		top = top + eleHeight;
	}

	// if((left + panelWidth) > bodyWidth)
	//     left = bodyWidth - panelWidth;
	// if(left < 0)
	//     left = 0;

	// if((top + panelHeight) > bodyHeight)
	//     top = bodyHeight - panelHeight;
	// if(top < 0)
	//     top = 0;
	panel.style.left = left + 'px';
	panel.style.top = top + 'px';
};

export {
	addClass,
	removeClass,
	hasClass,
	toggleClass,
	closest,
	css,
	wrap,
	getStyle,
	getZIndex,
	makeDOM,
	makeModal,
	getOffset,
	getScroll,
	showPanelByEle
};
