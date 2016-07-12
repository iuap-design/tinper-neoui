(function(document, window, $) {
    'use strict';
    
      var  defaults= {
        targetKeep: true,
        icon: "font",
        starType: "i",
        starOff: "icon uf uf-star",
        starOn: "icon uf uf-star orange-600",
        cancelOff: "icon uf uf-minussigninsideablackcircle",
        cancelOn: "icon  uf uf-minussigninsideablackcircle orange-600",
        starHalf: "icon uf uf-starhalfempty orange-500"
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