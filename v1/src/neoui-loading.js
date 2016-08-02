u.Loading = u.BaseComponent.extend({
  _Constant: {
  U_LOADING_LAYER_COUNT: 4
},

_CssClasses: {
  U_LOADING_LAYER: 'u-loading-layer',
  U_LOADING_CIRCLE_CLIPPER: 'u-loading-circle-clipper',
  U_LOADING_CIRCLE: 'u-loading-circle',
  U_LOADING_GAP_PATCH: 'u-loading-gap-patch',
  U_LOADING_LEFT: 'u-loading-left',
  U_LOADING_RIGHT: 'u-loading-right'
},

  init: function(){
    if(u.isIE8 || u.isIE9){
      var img = document.createElement('div');
      img.className="loadingImg";
      this.element.appendChild(img);
    }else{
      for (var i = 1; i <= this._Constant.U_LOADING_LAYER_COUNT; i++) {
        this.createLayer(i);
      }
    }
    u.addClass(this.element, 'is-upgraded');
    
  },

createLayer: function(index) {
  var layer = document.createElement('div');
  u.addClass(layer, this._CssClasses.U_LOADING_LAYER);
  u.addClass(layer, this._CssClasses.U_LOADING_LAYER + '-' + index);

  var leftClipper = document.createElement('div');
  u.addClass(leftClipper, this._CssClasses.U_LOADING_CIRCLE_CLIPPER);
  u.addClass(leftClipper, this._CssClasses.U_LOADING_LEFT);

  var gapPatch = document.createElement('div');
  u.addClass(gapPatch,this._CssClasses.U_LOADING_GAP_PATCH);

  var rightClipper = document.createElement('div');
  u.addClass(rightClipper,this._CssClasses.U_LOADING_CIRCLE_CLIPPER);
  u.addClass(rightClipper,this._CssClasses.U_LOADING_RIGHT)

  var circleOwners = [leftClipper, gapPatch, rightClipper];

  for (var i = 0; i < circleOwners.length; i++) {
    var circle = document.createElement('div');
    u.addClass(circle,this._CssClasses.U_LOADING_CIRCLE);
    circleOwners[i].appendChild(circle);
  }

  layer.appendChild(leftClipper);
  layer.appendChild(gapPatch);
  layer.appendChild(rightClipper);

  this.element.appendChild(layer);
},


stop: function() {
  u.removeClass(this.element,'is-active');
},



start: function() {
  u.addClass(this.element,'is-active');
}


});


u.compMgr.regComp({
  comp: u.Loading,
  compAsString: 'u.Loading',
  css: 'u-loading'
});




u.showLoading = function(op) {
	var htmlStr = '<div class="alert alert-waiting"><i class="uf uf-spinnerofdots"></i></div>';
	document.body.appendChild(u.makeDOM(htmlStr));
	htmlStr = '<div class="alert-backdrop" role="waiting-backdrop"></div>';
	document.body.appendChild(u.makeDOM(htmlStr));
}

u.hideLoading = function() {
	var divs = document.querySelectorAll('.alert-waiting,.alert-backdrop');
	for(var i = 0;i < divs.length;i++){
		document.body.removeChild(divs[i]);
	}
}	
    
//兼容性保留
u.showWaiting = u.showLoading
u.removeWaiting = u.hideLoading