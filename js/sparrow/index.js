/**
 * Module : Sparrow entry index
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-29 10:21:33
 */

//对外暴露接口用于外部访问
var u = window.u || {};
window.u = u;
//相关依赖导入
import {
	extend
} from './extend';
//import {U_LANGUAGES,U_THEME,U_LOCALE,U_USERCODE} from './enumerables'
import {
	setCookie,
	getCookie
} from './cookies';
import {
	createShellObject,
	execIgnoreError,
	getFunction,
	getJSObject,
	isDate,
	isNumber,
	isArray,
	isEmptyObject,
	inArray,
	isDomElement,
	each
} from './util';
import {
	env
} from './env';
import {
	on,
	off,
	trigger,
	stopEvent,
	event
} from './event';
import {
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
} from './dom';
import {
	Class
} from './class';
import {
	core
} from './core';

import {
	compMgr
} from './compMgr';
import {
	BaseComponent
} from './BaseComponent';

import {
	ajax
} from './ajax';

import {
	floatRender,
	integerRender,
	dateRender,
	dateTimeRender,
	timeRender,
	percentRender,
	dateToUTCString
} from './util/dataRender';

import {
	NumberFormater,
	DateFormater
} from './util/formater';

import {
	date
} from './util/dateUtils';
import {
	AddressMasker,
	NumberMasker,
	CurrencyMasker,
	PercentMasker
} from './util/masker'

import {
	hotkeys
} from './util/hotKeys';

import {
	Ripple
} from './util/ripple';

import {
	RSAUtils,
	BigInt,
	BarrettMu,
	twoDigit
} from './util/rsautils';

import {
	trans
} from './util/i18n';

//window.U_LANGUAGES = U_LANGUAGES;
//公开接口、属性对外暴露
u.extend = extend;
u.extend(u, {
	setCookie: setCookie,
	getCookie: getCookie
});
u.extend(u, {
	createShellObject: createShellObject,
	execIgnoreError: execIgnoreError,
	getFunction: getFunction,
	getJSObject: getJSObject,
	isDate: isDate,
	isNumber: isNumber,
	isArray: isArray,
	isEmptyObject: isEmptyObject,
	inArray: inArray,
	isDomElement: isDomElement,
	each: each
});
u.extend(u, env);

u.extend(u, {
	on: on,
	off: off,
	trigger: trigger,
	stopEvent: stopEvent,
	event: event
});
u.extend(u, {
	addClass: addClass,
	removeClass: removeClass,
	hasClass: hasClass,
	toggleClass: toggleClass,
	closest: closest,
	css: css,
	wrap: wrap,
	getStyle: getStyle,
	getZIndex: getZIndex,
	makeDOM: makeDOM,
	makeModal: makeModal,
	getOffset: getOffset,
	getScroll: getScroll,
	showPanelByEle: showPanelByEle
});
u.extend(u, {
	Class: Class
});
u.extend(u, {
	core: core
});
u.extend(u, {
	compMgr: compMgr
});
u.extend(u, {
	BaseComponent: BaseComponent
});

if(document.readyState && document.readyState === 'complete') {
	compMgr.updateComp();
} else {
	on(window, 'load', function() {
		compMgr.updateComp();
	});
}
u.extend(u, {
	ajax: ajax
});

u.extend(u, {
	floatRender: floatRender,
	integerRender: integerRender,
	dateRender: dateRender,
	dateTimeRender: dateTimeRender,
	timeRender: timeRender,
	percentRender: percentRender,
	dateToUTCString: dateToUTCString
});

u.extend(u, {
	date: date
});

u.extend(u, {
	NumberFormater: NumberFormater,
	DateFormater: DateFormater
});

u.extend(u, {
	AddressMasker: AddressMasker,
	NumberMasker: NumberMasker,
	CurrencyMasker: CurrencyMasker,
	PercentMasker: PercentMasker
});

u.extend(u, {
	hotkeys: hotkeys
});

u.extend(u, {
	Ripple: Ripple
});
u.extend(u, {
	RSAUtils: RSAUtils,
	BigInt: BigInt,
	BarrettMu: BarrettMu,
	twoDigit: twoDigit
});
u.extend(u, {
	trans: trans
});
window.trans = trans;
window.URipple = Ripple;