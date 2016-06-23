(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon fa fa-star",
        starOn: "icon fa fa-star orange-600",
        cancelOff: "icon fa fa-minus-circle",
        cancelOn: "icon  fa fa-minus-circle orange-600",
        starHalf: "icon fa fa-half-o orange-500"
      };
      $('[data-plugin="rating"]').each(function() {
          var $this = $(this);
          var options = $.extend(true, {}, defaults, $this.data());

          if (options.hints) {
            options.hints = options.hints.split(',');
          }

          $this.raty(options);
      });
      // }
    // });
  })(document, window, jQuery);