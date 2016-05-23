+ function($) {
	
    $.showLoading = function(op) {
      $(document.body).append('<div class="alert alert-waiting"><i class="fa fa-spinner fa-spin"></i></div>')
                      .append('<div class="alert-backdrop" role="waiting-backdrop"></div>');
    }

    $.hideLoading = function() {
      var tmp;
      (tmp = $('.alert.alert-waiting')).length && tmp.remove();
      (tmp = $('.alert-backdrop[role="waiting-backdrop"]')).length && tmp.remove();
    }	
    
    //兼容性保留
    $.showWaiting = $.showLoading
    $.removeWaiting = $.hideLoading

}($)