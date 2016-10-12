/**
 * Module : neoui-slidePanel
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-03 13:18:48
 */

import {makeDOM} from 'tinper-sparrow/js/dom';
import {ajax} from 'tinper-sparrow/js/ajax';
import {on} from 'tinper-sparrow/js/event';
import {env} from 'tinper-sparrow/js/env';

var slidePanelTemplate = ['<div class="slidePanel slidePanel-right  slidePanel-show slidePanel-dragging" style="transform:translate3d(100%,0,0);">',
	'<div class="slidePanel-content site-sidebar-content"></div>',
	'<div class="slidePanel-handler"></div>',
	'</div>'
]

var slidePanel = function(options) {
	var url = options['url'],
		width = options['width'] || '700px',
		callback = options['callback'] || function() {},
		slideDom = makeDOM(slidePanelTemplate.join('')),
		overlayDiv = makeModal(slideDom);
	slideDom.style.width = width;
	overlayDiv.style.opacity = 0;
	document.body.appendChild(slideDom);
	//overlayDiv.style.opacity = 0.5;
	ajax({
		type: 'get',
		url: url,
		success: function(data) {
			var content = slideDom.querySelector('.slidePanel-content');
			content.innerHTML = data;
			callback();
			setTimeout(function() {
				slideDom.style.transform = 'translate3d(0,0,0)';
				overlayDiv.style.opacity = 0.5;
			}, 1);
		}
	})

	on(overlayDiv, 'click', function() {
		on(slideDom, 'transitionend', function() {
			document.body.removeChild(slideDom);
			document.body.removeChild(overlayDiv);
		});
		on(slideDom, 'webkitTransitionEnd', function() {
			document.body.removeChild(slideDom);
			document.body.removeChild(overlayDiv);
		});
		slideDom.style.transform = 'translate3d(100%,0,0)';
		overlayDiv.style.opacity = 0;
		if(env.isIE8) {
			document.body.removeChild(slideDom);
			document.body.removeChild(overlayDiv);
		}
	})

	return {
		close: function() {
			overlayDiv.click();
		}
	}

}


export {slidePanel};
