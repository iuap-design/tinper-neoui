u.on(window, 'load', function() {
    'use strict';
   $('.u-hamburger').click(function(){
      var attrTarget = $(this).attr('data-target');
      var $targetDom = $(attrTarget);
      $(this).toggleClass("u-collapsed");
      $targetDom.toggleClass("in");

   });
});