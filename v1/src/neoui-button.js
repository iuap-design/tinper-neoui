/**
 * Module : neoui-button
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-02 13:01:05
 */

import {BaseComponent} from './sparrow/BaseComponent';
import {addClass} from './sparrow/dom';
import {env} from './sparrow/env';
import {on} from './sparrow/event';
import {Ripple} from './sparrow/util/ripple';
import {compMgr} from './sparrow/compMgr';

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
	compAsString: 'u.Button',
	css: 'u-button'
});

export {Button};
