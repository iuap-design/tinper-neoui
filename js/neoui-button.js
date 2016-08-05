/**
 * Module : neoui-button
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 13:01:05
 */

import {BaseComponent} from 'neoui-sparrow/lib/BaseComponent';
import {addClass} from 'neoui-sparrow/lib/dom';
import {env} from 'neoui-sparrow/lib/env';
import {on} from 'neoui-sparrow/lib/event';
import {Ripple} from 'neoui-sparrow/lib/util/ripple';
import {compMgr} from 'neoui-sparrow/lib/compMgr';

var Button = BaseComponent.extend({
	init: function() {
		var rippleContainer = document.createElement('span');
		addClass(rippleContainer, 'u-button-container');
		this._rippleElement = document.createElement('span');
		addClass(this._rippleElement, 'u-ripple');
		if(env.isIE8)
			addClass(this._rippleElement, 'oldIE');
		rippleContainer.appendChild(this._rippleElement);
		on(this._rippleElement, 'mouseup', this.element.blur);
		this.element.appendChild(rippleContainer);

		on(this.element, 'mouseup', this.element.blur);
		on(this.element, 'mouseleave', this.element.blur);
		this.ripple = new Ripple(this.element);
	}

});

compMgr.regComp({
	comp: Button,
	compAsString: 'Button',
	css: 'u-button'
});
if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		//扫描并生成控件
		compMgr.updateComp();
	});
}
export {Button};
