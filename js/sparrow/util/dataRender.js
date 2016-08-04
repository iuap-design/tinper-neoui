/**
 * Module : Sparrow data display formater
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 15:39:01
 */
import {
	core
} from '../core';
import {
	NumberFormater
} from './formater';
import {
	AddressMasker,
	NumberMasker,
	CurrencyMasker,
	PercentMasker
} from './masker';
import {
	date
} from './dateUtils';

var floatRender = function(value, precision) {
	var trueValue = value;
	if(typeof value === 'undefined' || value === null)
		return value;
	//value 为 ko对象
	if(typeof value === 'function')
		trueValue = value();
	var maskerMeta = core.getMaskerMeta('float') || {};
	if(typeof precision === 'number')
		maskerMeta.precision = precision;
	var formater = new NumberFormater(maskerMeta.precision);
	var masker = new NumberMasker(maskerMeta);
	return masker.format(formater.format(trueValue)).value;
};

var integerRender = function(value) {
	var trueValue = value;
	if(typeof value === 'undefined' || value === null)
		return value;
	//value 为 ko对象
	if(typeof value === 'function')
		trueValue = value();
	return trueValue
};

var _dateRender = function(value, format, type) {
	var trueValue = value;
	if(typeof value === 'undefined' || value === null)
		return value
			//value 为 ko对象
	if(typeof value === 'function')
		trueValue = value()
	var maskerMeta = core.getMaskerMeta(type) || {}
	if(typeof format != 'undefined')
		maskerMeta.format = format
	var maskerValue = date.format(trueValue, maskerMeta.format);
	return maskerValue;
}

var dateRender = function(value, format) {
	return _dateRender(value, format, 'date');
};

var dateTimeRender = function(value, format) {
	return _dateRender(value, format, 'datetime');
};

var timeRender = function(value, format) {
	return _dateRender(value, format, 'time');
};

var percentRender = function(value) {
	var trueValue = value
	if(typeof value === 'undefined' || value === null)
		return value
			//value 为 ko对象
	if(typeof value === 'function')
		trueValue = value()
	var maskerMeta = core.getMaskerMeta('percent') || {}
	var masker = new PercentMasker(maskerMeta);
	var maskerValue = masker.format(trueValue);
	return(maskerValue && maskerValue.value) ? maskerValue.value : '';
};

var dateToUTCString = function(date) {
	if(!date) return ''
	if(date.indexOf("-") > -1)
		date = date.replace(/\-/g, "/");
	var utcString = Date.parse(date);
	if(isNaN(utcString)) return "";
	return utcString;
}

export {
	floatRender,
	integerRender,
	dateRender,
	dateTimeRender,
	timeRender,
	percentRender,
	dateToUTCString
};