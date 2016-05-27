/* ========================================================================
 * UUI: statemanager.js v 1.0.0
 *
 * ========================================================================
 * Copyright 2015 yonyou, Inc.
 * Licensed under MIT ()
 * ======================================================================== */

/**
 * 状态管理工具，管理两种状态：visible,readonly
 */
+ function($) {

	var StateManager = function(element, options) {
		this.$element = $(element)
		this.options = $.extend({}, StateManager.DEFAULTS, options)
		StateManager.instances.push(this)
		this.update()
	}

	StateManager.DEFAULTS = {
		visible: 'true',
		readonly: 'false'
	}

	/**
	 * 被管理的元素实例
	 */
	StateManager.instances = []

	/**
	 * 更新所有的按钮状态
	 */
	StateManager.update = function() {
		for (var i=0, count = StateManager.instances.length; i< count; i++)
			StateManager.instances[i].update()
	}

	StateManager.fn = StateManager.prototype

	StateManager.fn.update = function() {
		var visible = eval(this.options.visible)
		var readonly = eval(this.options.readonly)
		if (visible)
			this.$element.show()
		else
			this.$element.hide()
		if (readonly)
			this.$element.attr("readonly", true)
		else
			this.$element.attr("readonly", false)
	}

	function Plugin(option) {
		if (this.length != 1) return;
		var $this = $(this)
		var data = $this.data('u.statemanager')
		var options = typeof option == 'object' && option

		if (!data) $this.data('u.statemanager', (data = new StateManager(this, options)))
			//	else data.update(options);
		return data;
	}

	var old = $.fn.stateManager

	$.fn.stateManager = Plugin
	$.fn.stateManager.Constructor = StateManager


	$.fn.stateManager.noConflict = function() {
		$.fn.stateManager = old
		return this
	}

	$.StateManager = StateManager
}(jQuery)