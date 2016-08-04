/**
 * Module : webpack entry index
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-04 13:39:34
 */

//Sparrow import
import {extend} from './sparrow/extend';
import {setCookie,getCookie} from './sparrow/cookies';
import {createShellObject,execIgnoreError,getFunction,getJSObject,isDate,isNumber,isArray,isEmptyObject,inArray,isDomElement,each} from './sparrow/util';
import {env} from './sparrow/env';
import {on,off,trigger,stopEvent,event} from './sparrow/event';
import {addClass,removeClass,hasClass,toggleClass,closest,css,wrap,getStyle,getZIndex,makeDOM,makeModal,getOffset,getScroll,showPanelByEle} from './sparrow/dom';
import {Class} from './sparrow/class';
import {core} from './sparrow/core';
import {compMgr} from './sparrow/compMgr';
import {BaseComponent} from './sparrow/BaseComponent';
import {ajax} from './sparrow/ajax';
import {floatRender,integerRender,dateRender,dateTimeRender,timeRender,percentRender,dateToUTCString} from './sparrow/util/dataRender';
import {NumberFormater,DateFormater} from './sparrow/util/formater';
import {date} from './sparrow/util/dateUtils';
import {AddressMasker,NumberMasker,CurrencyMasker,PercentMasker} from './sparrow/util/masker'
import {hotkeys} from './sparrow/util/hotKeys';
import {Ripple} from './sparrow/util/ripple';
import {RSAUtils,BigInt,BarrettMu,twoDigit} from './sparrow/util/rsautils';
import {trans} from './sparrow/util/i18n';

//Neoui import
import {Autocomplete} from 'neoui-autocomplete';
import {Button} from 'neoui-button';
import {Checkbox} from 'neoui-checkbox';
import {Combo} from 'neoui-combo';
import {Combobox} from 'neoui-combobox';
import {Table} from 'neoui-data-table';
import {messageDialog,confirmDialog,dialogMode,dialog,dialogWizard} from 'neoui-dialog';
import {MDLayout} from 'neoui-layout.md';
import {NavLayout,NavLayoutTab} from 'neoui-layout.nav';
import {showLoader,hideLoader} from 'neoui-loader';
import {Loading,showLoading,hideLoading,showWaiting,removeWaiting} from 'neoui-loading';
import {Menu} from 'neoui-menu';
import {showMessageDialog,showMessage} from 'neoui-message';
import {Multilang} from 'neoui-multilang';
import {NavMenu} from 'neoui-navmenu';
import {pagination} from 'neoui-pagination';
import {Progress} from 'neoui-progress';
import {Radio} from 'neoui-radio';
import {refer} from 'neoui-refer';
import {slidePanel} from 'neoui-slidePanel';
import {Switch} from 'neoui-switch';
import {Tabs} from 'neoui-tabs';
import {Text} from 'neoui-textfield';
import {Tooltip} from 'neoui-tooltip';
import {Validate,validate,doValidate} from 'neoui-validate';


var ex = {
	Autocomplete : Autocomplete,
	Button : Button,
	Checkbox : Checkbox,
	Combo : Combo,
	Combobox : Combobox,
	Table : Table,
	messageDialog : messageDialog,
	confirmDialog : confirmDialog,
	dialogMode : dialogMode,
	dialog : dialog,
	dialogWizard : dialogWizard,
	Loading : Loading,
	showLoading : showLoading,
	hideLoading : hideLoading,
	showWaiting : showWaiting,
	removeWaiting : removeWaiting,
	MDLayout : MDLayout,
	NavLayout : NavLayout,
	NavLayoutTab : NavLayoutTab,
	showLoader : showLoader,
	hideLoader : hideLoader,
	Menu : Menu,
	showMessageDialog : showMessageDialog,
	showMessage : showMessage,
	Multilang : Multilang,
	NavMenu : NavMenu,
	pagination : pagination,
	Progress : Progress,
	Radio : Radio,
	refer : refer,
	slidePanel : slidePanel,
	Switch : Switch,
	Tabs : Tabs,
	Text : Text,
	Tooltip : Tooltip,
	Validate : Validate,
	validate : validate,
	doValidate :doValidate,
	
	ajax: ajax,
	extend : extend,
	setCookie: setCookie,
	getCookie: getCookie,
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
	each: each,
	on: on,
	off: off,
	trigger: trigger,
	stopEvent: stopEvent,
	event: event,
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
	showPanelByEle: showPanelByEle,
	Class: Class,
	core: core,
	compMgr: compMgr,
	BaseComponent: BaseComponent,
	floatRender: floatRender,
	integerRender: integerRender,
	dateRender: dateRender,
	dateTimeRender: dateTimeRender,
	timeRender: timeRender,
	percentRender: percentRender,
	dateToUTCString: dateToUTCString,
	date: date,
	NumberFormater: NumberFormater,
	DateFormater: DateFormater,
	AddressMasker: AddressMasker,
	NumberMasker: NumberMasker,
	CurrencyMasker: CurrencyMasker,
	PercentMasker: PercentMasker,
	hotkeys: hotkeys,
	Ripple: Ripple,
	RSAUtils: RSAUtils,
	BigInt: BigInt,
	BarrettMu: BarrettMu,
	twoDigit: twoDigit,
	trans: trans

};
export default ex;
