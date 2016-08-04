/**
 * Module : Sparrow browser environment
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-27 21:46:50
 */

import {extend} from './extend';
var u = {};


extend(u, {
	isIE:  false,
	isFF: false,
	isOpera: false,
	isChrome: false,
	isSafari: false,
	isWebkit: false,
	isIE8_BEFORE: false,
	isIE8: false,
	isIE8_CORE: false,
	isIE9: false,
	isIE9_CORE: false,
	isIE10: false,
	isIE10_ABOVE: false,
	isIE11: false,
	isIOS: false,
	isIphone: false,
	isIPAD: false,
	isStandard: false,
	version: 0,
	isWin: false,
	isUnix: false,
	isLinux: false,
	isAndroid: false,
	isMac: false,
	hasTouch: false,
	isMobile: false
});

(function() {
	var userAgent = navigator.userAgent,
		rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
		rFirefox = /(firefox)\/([\w.]+)/,
		rOpera = /(opera).+version\/([\w.]+)/,
		rChrome = /(chrome)\/([\w.]+)/,
		rSafari = /version\/([\w.]+).*(safari)/,
		version,
		ua = userAgent.toLowerCase(),
		s,
		browserMatch = {
			browser: "",
			version: ''
		},
		match = rMsie.exec(ua);

	if(match != null) {
		browserMatch = {
			browser: "IE",
			version: match[2] || "0"
		};
	}
	match = rFirefox.exec(ua);
	if(match != null) {
		browserMatch = {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}
	match = rOpera.exec(ua);
	if(match != null) {
		browserMatch = {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}
	match = rChrome.exec(ua);
	if(match != null) {
		browserMatch = {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}
	match = rSafari.exec(ua);
	if(match != null) {
		browserMatch = {
			browser: match[2] || "",
			version: match[1] || "0"
		};
	}
	if(match != null) {
		browserMatch = {
			browser: "",
			version: "0"
		};
	}

	if(s = ua.match(/opera.([\d.]+)/)) {
		u.isOpera = true;
	} else if(browserMatch.browser == "IE" && browserMatch.version == 11) {
		u.isIE11 = true;
		u.isIE = true;
	} else if(s = ua.match(/chrome\/([\d.]+)/)) {
		u.isChrome = true;
		u.isStandard = true;
	} else if(s = ua.match(/version\/([\d.]+).*safari/)) {
		u.isSafari = true;
		u.isStandard = true;
	} else if(s = ua.match(/gecko/)) {
		//add by licza : support XULRunner
		u.isFF = true;
		u.isStandard = true;
	} else if(s = ua.match(/msie ([\d.]+)/)) {
		u.isIE = true;
	} else if(s = ua.match(/firefox\/([\d.]+)/)) {
		u.isFF = true;
		u.isStandard = true;
	}
	if(ua.match(/webkit\/([\d.]+)/)) {
		u.isWebkit = true;
	}
	if(ua.match(/ipad/i)) {
		u.isIOS = true;
		u.isIPAD = true;
		u.isStandard = true;
	}
	if(ua.match(/iphone/i)) {
		u.isIOS = true;
		u.isIphone = true;
	}

	if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")) {
		//u.isIOS = true;
		u.isMac = true;
	}

	if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64")) {
		u.isWin = true;
	}

	if((navigator.platform == "X11") && !u.isWin && !u.isMac) {
		u.isUnix = true;
	}
	if((String(navigator.platform).indexOf("Linux") > -1)) {
		u.isLinux = true;
	}

	if(ua.indexOf('Android') > -1 || ua.indexOf('android') > -1 || ua.indexOf('Adr') > -1 || ua.indexOf('adr') > -1) {
		u.isAndroid = true;
	}

	u.version = version ? (browserMatch.version ? browserMatch.version : 0) : 0;
	if(u.isIE) {
		var intVersion = parseInt(u.version);
		var mode = document.documentMode;
		if(mode == null) {
			if(intVersion == 6 || intVersion == 7) {
				u.isIE8_BEFORE = true;
			}
		} else {
			if(mode == 7) {
				u.isIE8_BEFORE = true;
			} else if(mode == 8) {
				u.isIE8 = true;
			} else if(mode == 9) {
				u.isIE9 = true;
				u.isSTANDARD = true;
			} else if(mode == 10) {
				u.isIE10 = true;
				u.isSTANDARD = true;
				u.isIE10_ABOVE = true;
			} else {
				u.isSTANDARD = true;
			}
			if(intVersion == 8) {
				u.isIE8_CORE = true;
			} else if(intVersion == 9) {
				u.isIE9_CORE = true;
			} else if(browserMatch.version == 11) {
				u.isIE11 = true;
			} else {

			}
		}
	}
	if("ontouchend" in document) {
		u.hasTouch = true;
	}
	if(u.isIOS || u.isAndroid)
		u.isMobile = true;

})();

var env = u;
export {env};