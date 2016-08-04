/**
 * Module : Sparrow touch event
 * Author : Kvkens(yueming@yonyou.com)
 * Date	  : 2016-07-28 14:41:17
 */
import { env } from './env';

var u = {};
u.event = {};

var touchStartEvent = env.hasTouch ? "touchstart" : "mousedown",
	touchStopEvent = env.hasTouch ? "touchend" : "mouseup",
	touchMoveEvent = env.hasTouch ? "touchmove" : "mousemove";

// tap和taphold
u.event.tap = {
	tapholdThreshold: 750,
	emitTapOnTaphold: true,
	touchstartFun: function() {
		trigger(this, 'vmousedown');
	},
	touchendFun: function() {
		trigger(this, 'vmouseup');
		trigger(this, 'vclick');
	},
	setup: function() {
		var thisObject = this,
			isTaphold = false;

		on(thisObject, "vmousedown", function(event) {
			isTaphold = false;
			if(event.which && event.which !== 1) {
				return false;
			}

			var origTarget = event.target,
				timer;

			function clearTapTimer() {
				clearTimeout(timer);
			}

			function clearTapHandlers() {
				clearTapTimer();

				off(thisObject, 'vclick');
				off(thisObject, 'vmouseup');
				off(document, 'vmousecancel');
			}

			function clickHandler(event) {
				clearTapHandlers();

				// ONLY trigger a 'tap' event if the start target is
				// the same as the stop target.
				if(!isTaphold && origTarget === event.target) {
					trigger(thisObject, 'tap');
				} else if(isTaphold) {
					event.preventDefault();
				}
			}
			on(thisObject, 'vmouseup', clearTapTimer);
			on(thisObject, 'vclick', clickHandler);
			on(document, 'vmousecancel', clearTapHandlers);

			timer = setTimeout(function() {
				if(!u.event.tap.emitTapOnTaphold) {
					isTaphold = true;
				}
				trigger(thisObject, "taphold");
				clearTapHandlers();
			}, u.event.tap.tapholdThreshold);
		});

		on(thisObject, 'touchstart', u.event.tap.touchstartFun);
		on(thisObject, 'touchend', u.event.tap.touchendFun);
	},
	teardown: function() {
		off(thisObject, 'vmousedown');
		off(thisObject, 'vclick');
		off(thisObject, 'vmouseup');
		off(document, 'vmousecancel');
	}
};

u.event.taphold = u.event.tap;

u.event.swipe = {

	// More than this horizontal displacement, and we will suppress scrolling.
	scrollSupressionThreshold: 30,

	// More time than this, and it isn't a swipe.
	durationThreshold: 1000,

	// Swipe horizontal displacement must be more than this.
	horizontalDistanceThreshold: 30,

	// Swipe vertical displacement must be less than this.
	verticalDistanceThreshold: 30,

	getLocation: function(event) {
		var winPageX = window.pageXOffset,
			winPageY = window.pageYOffset,
			x = event.clientX,
			y = event.clientY;

		if(event.pageY === 0 && Math.floor(y) > Math.floor(event.pageY) ||
			event.pageX === 0 && Math.floor(x) > Math.floor(event.pageX)) {

			// iOS4 clientX/clientY have the value that should have been
			// in pageX/pageY. While pageX/page/ have the value 0
			x = x - winPageX;
			y = y - winPageY;
		} else if(y < (event.pageY - winPageY) || x < (event.pageX - winPageX)) {

			// Some Android browsers have totally bogus values for clientX/Y
			// when scrolling/zooming a page. Detectable since clientX/clientY
			// should never be smaller than pageX/pageY minus page scroll
			x = event.pageX - winPageX;
			y = event.pageY - winPageY;
		}

		return {
			x: x,
			y: y
		};
	},

	start: function(event) {
		var data = event.touches ?
			event.touches[0] : event,
			location = u.event.swipe.getLocation(data);
		return {
			time: (new Date()).getTime(),
			coords: [location.x, location.y],
			origin: event.target
		};
	},

	stop: function(event) {
		var data = event.touches ?
			event.touches[0] : event,
			location = u.event.swipe.getLocation(data);
		return {
			time: (new Date()).getTime(),
			coords: [location.x, location.y]
		};
	},

	handleSwipe: function(start, stop, thisObject, origTarget) {
		if(stop.time - start.time < u.event.swipe.durationThreshold &&
			Math.abs(start.coords[0] - stop.coords[0]) > u.event.swipe.horizontalDistanceThreshold &&
			Math.abs(start.coords[1] - stop.coords[1]) < u.event.swipe.verticalDistanceThreshold) {
			var direction = start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight";

			trigger(thisObject, "swipe");
			trigger(thisObject, direction);
			return true;
		}
		return false;

	},

	// This serves as a flag to ensure that at most one swipe event event is
	// in work at any given time
	eventInProgress: false,

	setup: function() {
		var events,
			thisObject = this,
			context = {};

		// Retrieve the events data for this element and add the swipe context
		events = thisObject["mobile-events"];
		if(!events) {
			events = {
				length: 0
			};
			thisObject["mobile-events"] = events;
		}
		events.length++;
		events.swipe = context;

		context.start = function(event) {

			// Bail if we're already working on a swipe event
			if(u.event.swipe.eventInProgress) {
				return;
			}
			u.event.swipe.eventInProgress = true;

			var stop,
				start = u.event.swipe.start(event),
				origTarget = event.target,
				emitted = false;

			context.move = function(event) {
				// if ( !start || event.isDefaultPrevented() ) {
				if(!start) {
					return;
				}

				stop = u.event.swipe.stop(event);
				if(!emitted) {
					emitted = u.event.swipe.handleSwipe(start, stop, thisObject, origTarget);
					if(emitted) {

						// Reset the context to make way for the next swipe event
						u.event.swipe.eventInProgress = false;
					}
				}
				// prevent scrolling
				if(Math.abs(start.coords[0] - stop.coords[0]) > u.event.swipe.scrollSupressionThreshold) {
					event.preventDefault();
				}
			};

			context.stop = function() {
				emitted = true;

				// Reset the context to make way for the next swipe event
				u.event.swipe.eventInProgress = false;
				off(document, touchMoveEvent, context.move);
				context.move = null;
			};

			on(document, touchMoveEvent, context.move);
			on(document, touchStopEvent, context.stop);
		};
		on(thisObject, touchStartEvent, context.start);
	},

	teardown: function() {
		var events, context;

		events = thisObject["mobile-events"];
		if(events) {
			context = events.swipe;
			delete events.swipe;
			events.length--;
			if(events.length === 0) {
				thisObject["mobile-events"] = null;
			}
		}

		if(context) {
			if(context.start) {
				off(thisObject, touchStartEvent, context.start);
			}
			if(context.move) {
				off(document, touchMoveEvent, context.move);
			}
			if(context.stop) {
				off(document, touchStopEvent, context.stop);
			}
		}
	}
};

u.event.swipeleft = u.event.swipe;

u.event.swiperight = u.event.swipe;

var event = u.event;

var on = function(element, eventName, child, listener) {
	if(!element)
		return;
	if(arguments.length < 4) {
		listener = child;
		child = undefined;
	} else {
		var childlistener = function(e) {
			if(!e) {
				return;
			}
			var tmpchildren = element.querySelectorAll(child)
			tmpchildren.forEach(function(node) {
				if(node == e.target) {
					listener.call(e.target, e)
				}
			})
		}
	}
	//capture = capture || false;

	if(!element["uEvent"]) {
		//在dom上添加记录区
		element["uEvent"] = {}
	}
	//判断是否元素上是否用通过on方法填加进去的事件
	if(!element["uEvent"][eventName]) {
		element["uEvent"][eventName] = [child ? childlistener : listener]
		if(u.event && u.event[eventName] && u.event[eventName].setup) {
			u.event[eventName].setup.call(element);
		}
		element["uEvent"][eventName + 'fn'] = function(e) {
			//火狐下有问题修改判断
			if(!e)
				e = typeof event != 'undefined' && event ? event : window.event;
			element["uEvent"][eventName].forEach(function(fn) {
				try {
					e.target = e.target || e.srcElement; //兼容IE8
				} catch(e) {}
				if(fn)
					fn.call(element, e)
			})
		}
		if(element.addEventListener) { // 用于支持DOM的浏览器
			element.addEventListener(eventName, element["uEvent"][eventName + 'fn']);
		} else if(element.attachEvent) { // 用于IE浏览器
			element.attachEvent("on" + eventName, element["uEvent"][eventName + 'fn']);
		} else { // 用于其它浏览器
			element["on" + eventName] = element["uEvent"][eventName + 'fn']
		}
	} else {
		//如果有就直接往元素的记录区添加事件
		var lis = child ? childlistener : listener;
		var hasLis = false;
		element["uEvent"][eventName].forEach(function(fn) {
			if(fn == lis) {
				hasLis = true;
			}
		});
		if(!hasLis) {
			element["uEvent"][eventName].push(child ? childlistener : listener)
		}
	}

};

var off = function(element, eventName, listener) {
	//删除事件数组
	if(listener) {
		if(element && element["uEvent"] && element["uEvent"][eventName]) {
			element["uEvent"][eventName].forEach(function(fn, i) {
				if(fn == listener) {
					element["uEvent"][eventName].splice(i, 1);
				}
			});
		}
		return;
	}
	var eventfn = element["uEvent"][eventName + 'fn']
	if(element.removeEventListener) { // 用于支持DOM的浏览器
		element.removeEventListener(eventName, eventfn);
	} else if(element.removeEvent) { // 用于IE浏览器
		element.removeEvent("on" + eventName, eventfn);
	} else { // 用于其它浏览器
		delete element["on" + eventName]
	}
	if(u.event && u.event[eventName] && u.event[eventName].teardown) {
		u.event[eventName].teardown.call(element);
	}
	element["uEvent"][eventName] = undefined
	element["uEvent"][eventName + 'fn'] = undefined

};
var trigger = function(element, eventName) {
	if(element["uEvent"] && element["uEvent"][eventName]) {
		element["uEvent"][eventName + 'fn']()
	}
};

/**
 * 阻止冒泡
 */
var stopEvent = function(e) {
	if(typeof(e) != "undefined") {
		if(e.stopPropagation)
			e.stopPropagation();
		else {
			e.cancelBubble = true;
		}
		//阻止默认浏览器动作(W3C)
		if(e && e.preventDefault)
			e.preventDefault();
		//IE中阻止函数器默认动作的方式
		else
			window.event.returnValue = false;
	}
};

export {
	on,
	off,
	trigger,
	stopEvent,
	event
};