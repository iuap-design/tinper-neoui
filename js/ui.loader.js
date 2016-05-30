/*
*加载loading
*/
u.loadTemplate="<div class='u-loader-container'><div class='u-loader'>{centerContent}</div>{loadDesc}</div>";//{centerContent}为加载条中间内容
/**
 * @param  {Object} options 
 * @return {[type]}
 */
u.showLoader=function(options){
	// hasback:是否含有遮罩层，centerContent加载图标中的内容，parEle加载图标的父元素,hasDesc加载条说明
	var hasback,centerContent,template,parEle,templateDom,loadDesc;
	options=options||{};
	hasback=options["hasback"];
	centerContent=options["centerContent"]||'';
	// hasDesc=options["hasDesc"];
	template=u.loadTemplate.replace('{centerContent}',centerContent);
	loadDesc=options["hasDesc"]?"<div class='u-loader-desc'>页面加载中，请稍后。。。</div>":" ";
	
	template=template.replace("{loadDesc}",loadDesc);

	templateDom=u.makeDOM(template);
	parEle=options["parEle"]||document.body;
	if(hasback){
		var overlayDiv = u.makeModal(templateDom);
	}
	if(parEle==document.body){
		templateDom.style.position='fixed';
	}
	parEle.appendChild(templateDom);
};
u.hideLoader=function(){
	var divs = document.querySelectorAll('.u-overlay,.u-loader-container');
	for(var i = 0;i < divs.length;i++){
		divs[i].parentNode.removeChild(divs[i]);
	}
};