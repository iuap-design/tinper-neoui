/**
 * Module : Neoui webpack entry index
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-08-10 16:19:39
 */

//Sparrow import
import {extend} from 'tinper-sparrow/src/extend';
import {BaseComponent} from './neoui-BaseComponent';
import {on} from 'tinper-sparrow/src/event';



import {compMgr} from 'compox/src/compMgr';
//Neoui import
import {Autocomplete} from './neoui-autocomplete';
import {Button} from './neoui-button';
import {Cascader} from './neoui-cascader';
import {Checkbox} from './neoui-checkbox';
import {Combo} from './neoui-combo';
import {showCollapse} from './neoui-collapse';
import {Combobox} from './neoui-combobox';
import {Table} from './neoui-data-table';
import {messageDialog,confirmDialog,dialogMode,dialog,dialogWizard,iframeDialog} from './neoui-dialog';
import {MDLayout} from './neoui-layout.md';
import {NavLayout,NavLayoutTab} from './neoui-layout.nav';
import {showLoader,hideLoader} from './neoui-loader';
import {Loading,showLoading,hideLoading,showWaiting,removeWaiting} from './neoui-loading';
import {Menu} from './neoui-menu';
import {showMessageDialog,showMessage} from './neoui-message';
import {Multilang} from './neoui-multilang';
import {NavMenu} from './neoui-navmenu';
import {pagination} from './neoui-pagination';
import {Progress} from './neoui-progress';
import {Radio} from './neoui-radio';
import {refer} from './neoui-refer';
import {slidePanel} from './neoui-slidePanel';
import {Switch} from './neoui-switch';
import {Tabs} from './neoui-tabs';
import {Text} from './neoui-textfield';
import {Tooltip} from './neoui-tooltip';
import {Validate,validate,doValidate} from './neoui-validate';
import {DateTimePicker} from './neoui-datetimepicker';
import {MobDateTimePicker} from './neoui-mobdatetimepicker';
import {Time} from './neoui-time';
import {ClockPicker} from './neoui-clockpicker';
import {Month} from './neoui-month';
import {Year} from './neoui-year';
import {YearMonth} from './neoui-yearmonth';
import {MonthDate} from './neoui-monthdate';


var ex = {
	BaseComponent: BaseComponent,
	Autocomplete : Autocomplete,
	Button : Button,
	Cascader : Cascader,
	Checkbox : Checkbox,
	Combo : Combo,
	showCollapse : showCollapse,
	Combobox : Combobox,
	Table : Table,
	messageDialog : messageDialog,
	confirmDialog : confirmDialog,
	dialogMode : dialogMode,
	dialog : dialog,
	dialogWizard : dialogWizard,
	iframeDialog : iframeDialog,
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
	DateTimePicker: DateTimePicker,
	MobDateTimePicker:MobDateTimePicker,
	Time: Time,
	ClockPicker : ClockPicker,
	Month : Month,
	Year : Year,
	YearMonth : YearMonth,
	MonthDate : MonthDate,
	compMgr :compMgr


//	ajax: ajax,
//	extend : extend,
//	setCookie: setCookie,
//	getCookie: getCookie,
//	createShellObject: createShellObject,
//	execIgnoreError: execIgnoreError,
//	getFunction: getFunction,
//	getJSObject: getJSObject,
//	isDate: isDate,
//	isNumber: isNumber,
//	isArray: isArray,
//	isEmptyObject: isEmptyObject,
//	inArray: inArray,
//	isDomElement: isDomElement,
//	each: each,
//	on: on,
//	off: off,
//	trigger: trigger,
//	stopEvent: stopEvent,
//	event: event,
//	addClass: addClass,
//	removeClass: removeClass,
//	hasClass: hasClass,
//	toggleClass: toggleClass,
//	closest: closest,
//	css: css,
//	wrap: wrap,
//	getStyle: getStyle,
//	getZIndex: getZIndex,
//	makeDOM: makeDOM,
//	makeModal: makeModal,
//	getOffset: getOffset,
//	getScroll: getScroll,
//	showPanelByEle: showPanelByEle,
//	Class: Class,
//	core: core,
//	compMgr: compMgr,
//	BaseComponent: BaseComponent,
//	floatRender: floatRender,
//	integerRender: integerRender,
//	dateRender: dateRender,
//	dateTimeRender: dateTimeRender,
//	timeRender: timeRender,
//	percentRender: percentRender,
//	dateToUTCString: dateToUTCString,
//	date: date,
//	NumberFormater: NumberFormater,
//	DateFormater: DateFormater,
//	AddressMasker: AddressMasker,
//	NumberMasker: NumberMasker,
//	CurrencyMasker: CurrencyMasker,
//	PercentMasker: PercentMasker,
//	hotkeys: hotkeys,
//	Ripple: Ripple,
//	RSAUtils: RSAUtils,
//	BigInt: BigInt,
//	BarrettMu: BarrettMu,
//	twoDigit: twoDigit,
//	trans: trans

};
//extend(ex,env);

extend(ex,window.u || {});
window.u = ex;


export {ex as u};
