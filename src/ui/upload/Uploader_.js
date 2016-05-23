/**
 * 文件上传组件
 * 
 * @author dingrf,zuopf
 * @since v65
 */

/**
 * 文件上传组件命名空间
 *
 */
Lfw.file = Lfw.file  || {};

/**
 * 文件上传调用方法
 * 
 * @param {Ojbect} params
 * @since v65
 */
Lfw.file.upload = function(params){
 	if (Lfw.IS_IPAD){
 		showMessageDialog(trans("ml_uploader_notpad")/*IPAD不支持文件上传操作，请用PC端操作!*/);
 		return;
 	}
	if (Lfw.IS_IE7 || Lfw.IS_IE8 || Lfw.IS_IE9){
        var url =window.globalPath +  "/core/file.jsp?pageId=file"; //&billitem=test&method=afterTestFileUpload&isalert=true&multi=true&sysid=default&sizeLimit=50K&queueSizeLimit=15";
		for (var param in params){
			if (typeof params[param] == 'function'){
				var funcid = 'tempfunc';
				if (window.isPopView == true)
					getTrueParent()[funcid] = params[param];
				else	
					window[funcid] = params[param]; 			
				url += '&' + param + '=' +  funcid;//params[param].name;
			}
			else	
				url += '&' + param + '=' + escape(params[param]); 
		}
        showDialog(url,trans("ml_uploader_uploadfile")/*上传文件*/,450 ,430,"file select", null,{isShowLine:false}) ;
	}
	else{
		//已经有文件上传窗口打开
		if (Lfw.file._uploader && !Lfw.file._uploader.canClose()){
			showMessageDialog(trans("ml_uploader_wait")/*请等待文件上传成功后再上传新文件!*/);
			return;
		}
		else if (Lfw.file._uploader)
			Lfw.file._uploader.hideUploaderDialog();
		var uploader = new Lfw.file.Uploader(params);
		uploader.execute();
		Lfw.file._uploader = uploader;
	}
};

/**
 * 
 * @description 文件上传控件构造函数
 * @param {Object} params
 * 
 */
Lfw.file.Uploader = function(params){
 	if (params != null){
	 	//单据类型
	 	this.billtype = getString(params.billtype, "");
	 	//单据pk
	 	this.billitem = getString(params.billitem, "");
	 	//新建billitem
	 	if (this.billitem.toLowerCase() == "neednew"){
	 		this.billitem = String.UUID();
			this.billitem = this.billitem.substring(0,20);
	 	}
	 	//分类
	 	this.category = getString(params.category, "");
	 	//是否覆盖
	 	this.iscover = getString(params.iscover, "");
	 	//文件管理器
	 	this.filemanager = getString(params.filemanager, "");
	 	//单据所在片段
	 	this.widget = getString(params.widget, "");
	 	//数据集
	 	this.dataset = getString(params.dataset, "");
	 	//文件名
	 	this.filename = getString(params.filename, "");
	 	//url
	 	this.fileurl = getString(params.fileurl, "");
	 	//回调函数（单个文件上传成功）
	 	this.method = typeof(params.method) == "function"?params.method:eval(params.method);
	 	//回调函数
	 	//this.filesizemethod = getString(params.filesizemethod, "");
	 	//回调函数（全部文件上传成功）
	 	this.allmethod = typeof(params.allmethod) == "function"?params.allmethod:eval(params.allmethod);
	 	//是否多文件
	 	this.multi = getBoolean(params.multi, false);
	 	//是否自动保存
	 	this.auto = getBoolean(params.auto, true);
	 	//sysid
	 	this.sysid = getString(params.sysid, "");
	 	//parentwidget
	 	this.parentwidget = getString(params.parentwidget, "");
	 	//parentdataset
	 	this.parentdataset = getString(params.parentdataset, "");
	 	//回调listener
	 	this.uploadlistener = getString(params.uploadlistener, "");
	 	//文件大小限制
	 	this.sizeLimit = getString(params.sizeLimit, "20M");
	 	//总文件大小
	 	this.allSizeLimit = getString(params.allSizeLimit, "50M");
	 	//后缀名
	 	this.fileExt = getString(params.fileExt, "*.*");
	 	//后缀描述
	 	this.fileDesc = getString(params.fileDesc, "");
	 	//文件数量
	 	this.queueSizeLimit = getString(params.queueSizeLimit, "10");
	 	//创建状态,如果是1则不会被视为垃圾文件
	 	this.createstatus = getString(params.createstatus, "1");
	 	//是否立即关闭窗口
	 	this.closeDialog = getBoolean(params.closeDialog, true);
	 	//是否不显示窗口
	 	this.hiddenDialog = getBoolean(params.hiddenDialog, false);
	 	//是否弹出上传成功
	 	this.isalert = getBoolean(params.isalert, true);
	 	//立即上传
	 	this.isquick = getBoolean(params.isquick, true);
	 	//filePK，如果传入filePK则覆盖原文件
	 	this.filepk = Lfw.getString(params.filepk, "");
	 	//bamodule
	 	this.bamodule = getString(params.bamodule, "");
	 	//数据源
	 	this.dsName = window.datasourceName;
	 	//extendclass,扩展类，继承自nc.uap.lfw.file.IFileUploadExtender
	 	this.extendclass = getString(params.extendclass, "");
		//this.uploadurl = getString(params.uploadurl, "/portal/pt/file/upload");
	 	this.uploadurl = getString(params.uploadurl, "");
	 	this.ext1 = Lfw.getString(params.ext1, "");
	 	this.ext2 = Lfw.getString(params.ext2, "");
	 	this.ext3 = Lfw.getString(params.ext3, "");
	 	this.ext4 = Lfw.getString(params.ext4, "");
	 	this.ext5 = Lfw.getString(params.ext5, "");
	 	if (this.uploadurl == "")
	 		this.uploadurl = getFileService().execute("getUploadUrl", "$S_" + this.filemanager, "$S_" + this.sysid);
	 	
 	}
 	this.create();
 };
 
 /**
  * 不能上传的文件类型
  */
 Lfw.file.Uploader.prototype.notAllowType = ['.exe','.msi','.bat','.html','.js'];
 
 /**
  * 创建提交文件的input框
  */
 Lfw.file.Uploader.prototype.create = function(){
	var oThis = this;
	//this.submitForm = $ce("FORM");
	//this.submitForm.method = "POST";
	//this.submitForm.style.display = "none";
	//this.submitForm.action = "portal/pt/file/upload";
    //this.createFormElement("input", "fileInput", "file");
    this.fileInput =  $ce("input");
    this.fileInput.type = "file";
    this.fileInput.name = "fileInput_name";
    this.fileInput.id = "fileInput_id";
	//this.fileInput.style.display = "none";
    this.fileInput.style.position = "absolute";
    this.fileInput.style.left = "-2222px";
    this.fileInput.style.top = "-2222px";
    if(this.fileExt != "*.*")
    	this.fileInput.accept = this.fileExt.replace(/\*/g,"").replace(/\;/g,",");
	//accept属性只有firefox支持	
    //this.fileInput.accept = "image/gif";	
    if (this.multi)
		this.fileInput.multiple = true;
	if(Lfw.IS_SAFARI){
		this.fileInput.multiple = false;
	}
	this._totalSize = 0;
	if (!isNull(this.billitem)){
		var files = getFileService().execute("getFiles", "$S_" + this.billitem, "$S_" + this.sysid);
		if (files != null){
			for (var i=0; i < files.length; i++){
				if(files[i] != ""){
					var file = eval("(" + files[i] + ")");
					this._totalSize += parseFloat(file.filesize);
				}
			}
		}
	}
	this.fileInput.onchange = function(){
		//this.submitForm.submit();
		var canUpload = oThis.checkFiles();
		if (canUpload && canUpload == true)
			oThis.ajaxUpload();
	};
    getLfwTop().document.body.appendChild(this.fileInput);
};

 Lfw.file.Uploader.prototype.execute = function(){
 	this.fileInput.focus();
	this.fileInput.click();
//	this.ajaxUpload();
 };
 
/**
 * 校验上传文件
 */ 
 Lfw.file.Uploader.prototype.checkFiles = function(){
	var files = this.fileInput.files;
	//未选择文件
	if (files == null || files.length == 0){
		showMessageDialog(trans("ml_uploader_nofile")/*未选择文件!*/);
		return false;
	}
	//文件类型
	for(var i = 0; i < files.length; i++){
		var fileName = files[i].name;
		var fileType = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
		//不允许上传的类型
		if(this.notAllowType.indexOf(fileType) != -1){
			showMessageDialog(trans("ml_uploader_typelimit")/*不能上传该文件类型(*/+fileType+trans("ml_uploader_sizelimit2")/*)!*/);
			return false;
		}
		//允许上传的类型
		if(this.fileExt != "*.*"){
			var allowType = this.fileExt.replace(/\*/g,"").split(";");
			if(allowType.indexOf(fileType) == -1){
				showMessageDialog(trans("ml_uploader_typelimit")/*不能上传该文件类型(*/+fileType+trans("ml_uploader_sizelimit2")/*)!*/);
				return false;
			}
		}	
	}
	
	//文件数量
	var filecount = files.length;
	if (filecount > this.queueSizeLimit){
		showMessageDialog(trans("ml_uploader_numberlimit")/*上传文件数量超过限制(*/+this.queueSizeLimit+trans("ml_uploader_numberlimit_ge")/*个)!*/);
		return false;
	}
	//文件大小
	var size = -1;
	if (this.sizeLimit.toUpperCase().indexOf("M") != -1){
		size = parseFloat(this.sizeLimit) * 1024 * 1024;
	}
	else if (this.sizeLimit.toUpperCase().indexOf("K") != -1){
		size = parseFloat(this.sizeLimit) * 1024;
	}
	else{
		size = parseFloat(this.sizeLimit);
	}
	for (var i = 0; i < files.length; i++){
		this._totalSize += files[i].size;
		if (files[i].size >size){
			showMessageDialog(trans("ml_uploader_sizelimit0")/*文件:*/+ files[i].name +trans("ml_uploader_sizelimit1")/*大小超过限制(*/ +this.sizeLimit+ trans("ml_uploader_sizelimit2")/*)!*/);
			return false;
		}
	}
	
	//文件总大小
	var allSize = -1;
	if (this.allSizeLimit.toUpperCase().indexOf("M") != -1){
		allSize = parseFloat(this.allSizeLimit) * 1024 * 1024;
	}
	else if (this.allSizeLimit.toUpperCase().indexOf("K") != -1){
		allSize = parseFloat(this.allSizeLimit) * 1024;
	}
	else{
		allSize = parseFloat(this.allSizeLimit);
	}
	if (this._totalSize > allSize){
		showMessageDialog(trans("ml_uploader_sizelimit3")/*所选文件超过允许上传文件总数限制:*/ +this.allSizeLimit+ trans("ml_uploader_sizelimit2")/*)!*/);
		return false;
	}
	
	return true;
};

/**
 * ajax方式提交file
 */ 
 Lfw.file.Uploader.prototype.ajaxUpload = function(){
 	var files = this.fileInput.files;
	this.createUploaderDialog(files);
	Lfw.file._nextFile = 0;
	this.uploadFile(files[0]);
};


/**
 * 多文件上传的独立方法
 * @param {} file
 */
 Lfw.file.Uploader.prototype.uploadFile = function(file){
 	var oThis = this;
	var files = this.fileInput.files;
 	if(Lfw.file._nextFile < files.length &&  Lfw.file._nextFile != files.length) {
		var xhr = new XMLHttpRequest(); 
		var upload = xhr.upload; 
		upload.fileName = file.name;
		xhr.fileName= file.name;
		var uploadItem = this.uploadItems.get(file.name);
		uploadItem.xhr = xhr;
		// 设置上传文件相关的事件处理函数
		// XMLHttpRequest.upload对象才有progress等新特性事件
		upload.addEventListener("progress", function(event){
			 if (event.lengthComputable){ 
				var item = oThis.uploadItems.get(event.target.fileName);
			 	item.stateDiv.innerHTML = trans("ml_uploader_uplaoding0")/*正在上传...*/;
			    // 将进度换算成百分比
				 var percentage = Math.round((event.loaded * 100) / event.total); 
				 if (percentage <= 100){
				 	item.itemProgressDiv.style.width = percentage + "%";
				 	item.meterDiv.innerHTML =  oThis.getMeter(event.loaded, event.total);
				 } 
			 } 
		 }); 
		 
	//		 upload.addEventListener("load", function(event){
	//		 	var item = oThis.uploadItems.get(event.target.fileName);
	//		 	item.changeState(UploadItem.COMPLETE);
	//		 });
		 
		 upload.addEventListener("error", function(error){
		 	var item = oThis.uploadItems.get(error.target.fileName);
		 	item.changeState(Lfw.file.UploadItem.FAILURE);
		 });
		 
		 xhr.onreadystatechange = function(event){
			if (this.readyState == 4) {//数据接收完毕
				if (this.status == 200) {//服务器返回状态正常
					// 实现多个文件的串行上传
				 	oThis.uploadFile(oThis.fileInput.files[++Lfw.file._nextFile]);
				 	// 上传成功后处理逻辑
					oThis.afterLoaded(event.target.fileName, this.responseText);	
				}	
			}
		 };
		 
		 // 上传文件
		 var data = new FormData();
		 data.append('sysid',this.sysid);//添加表单项数据
		 data.append('billtype',this.billtype);
		 data.append('billitem',this.billitem);
		 data.append('category',this.category);
		 data.append('iscover',this.iscover);
		 data.append('filemanager',this.filemanager);
		 data.append('filepk',this.filepk);
		 data.append('extendclass',this.extendclass);
		 data.append('sys_datasource',this.dsName);
		 data.append('bamodule',this.bamodule);
		 data.append('ext1',this.ext1);
		 data.append('ext2',this.ext2);
		 data.append('ext3',this.ext3);
		 data.append('ext4',this.ext4);
		 data.append('ext5',this.ext5);
		 data.append('curruser',window.usercode);
		 data.append('filekey',file);
		 data.append("type", "ajax");
	     //xhr.open("POST", "/portal/pt/file/upload?fileName="+file.name); 
		 xhr.open("POST", this.uploadurl); 
	     //xhr.overrideMimeType("application/octet-stream"); 
	     //xhr.setRequestHeader("content-type","multipart/form-data");
	     //xhr.sendAsBinary(file.getAsBinary()); 
		 xhr.send(data); 
 	}
 	
};
 
 Lfw.file.Uploader.prototype.getMeter = function(loadedSize, totalSize){
	return this.sizeformat(loadedSize) + '/' + this.sizeformat(totalSize); 
};

 Lfw.file.Uploader.prototype.sizeformat = function(bytesize){
        var i=0;
         //当$bytesize 大于是1024字节时，开始循环，当循环到第4次时跳出；
        while(Math.abs(bytesize)>=1024){        
	        bytesize=bytesize/1024;
	        i++;
	        if(i==4)break;
        }
        //将Bytes,KB,MB,GB,TB定义成一维数组；
        var units= new Array("Bytes","KB","MB","GB","TB");
        var newsize=Math.round(bytesize,2);
        return newsize + units[i];
};
	
/**
 * 创建上传对话框
 * @private
 */
 Lfw.file.Uploader.prototype.createUploaderDialog = function(files){
	var oThis = this;
	// 上传窗口下面的透明背景层
	this.uploaderDialogBg = $ce('DIV');
	this.uploaderDialogBg.className = "uploader_uploaderDialogBg";
	this.uploaderDialogBg.style.zIndex = getZIndex();
	getLfwTop().document.body.appendChild(this.uploaderDialogBg);
	
	// 上传窗口层
	this.uploaderDialog = $ce('Div');
	this.uploaderDialog.className = "uploader_uploaderDialog";
	this.uploaderDialog.style.zIndex = getZIndex();
	if(this.hiddenDialog)
		this.uploaderDialog.style.display = "none";
//	window.document.body.appendChild(this.uploaderDialog);
	getLfwTop().document.body.appendChild(this.uploaderDialog);
	
	// headerDiv
	this.headerDiv =  $ce('Div');
	this.headerDiv.className = "uploader_headerDiv";
	this.uploaderDialog.appendChild(this.headerDiv);
	
	// 标题上的进度条
	this.titleProgressDiv = $ce("Div");
	this.titleProgressDiv.className = "uploader_titleProgress";
	this.titleProgressDiv.style.zIndex = getZIndex();
	this.headerDiv.appendChild(this.titleProgressDiv);
	
	// header的title层
	this.titleDiv = $ce('Div');
	this.titleDiv.className = "uploader_titleDiv";
	this.titleDiv.style.zIndex = getZIndex();
	this.headerDiv.appendChild(this.titleDiv);
	
	this.leftTitle = $ce('DIV');
	this.leftTitle.style.zIndex = getZIndex();
	this.leftTitle.className = "uploader_leftTitle";
	this.leftTitleSpan = $ce('SPAN');
	this.leftTitleSpan.style.marginLeft="10px";
	this.leftTitleSpan.innerHTML = trans("ml_uploader_uplaoding1")/*正在上传:*/;
	this.leftTitle.appendChild(this.leftTitleSpan);
	this.meterShowDiv = $ce('SPAN');
	this.meterShowDiv.className = "uploader_metershow";
	this.meterShowDiv.innerHTML="0/" + files.length;
	this.leftTitle.appendChild(this.meterShowDiv);
	
	this.titleDiv.appendChild(this.leftTitle);
	
	// 关闭按钮
	this.closeButton = $ce('Div');
	this.closeButton.style.zIndex = getZIndex();
	this.closeButton.className = "uploader_closeButton";
	this.titleDiv.appendChild(this.closeButton);
	this.closeButton.onmouseover = function(e){
		this.className = "uploader_closeButton_mouseover";
	};
	this.closeButton.onmouseout = function(e){
		this.className = "uploader_closeButton";
	};
	this.closeButton.onclick = function(e){
		oThis.hideUploaderDialog();
	};
	
	// 最小化按钮
	this.minButton = $ce('Div');
	this.minButton.style.zIndex = getZIndex();
	this.minButton.style.visibility = "hidden";
	this.minButton.className = "uploader_minButton";
	this.titleDiv.appendChild(this.minButton);
	this.minButton.onmouseover = function(e){
		this.className = "uploader_minButton_mouseover";
	};
	this.minButton.onmouseout = function(e){
		this.className = "uploader_minButton";
	};
	this.minButton.onclick = function(e){
		oThis.closeButton.style.display = 'none';
		oThis.minButton.style.display = 'none';
		oThis.maxButton.style.display = 'inline';
		oThis.bodyDiv.style.display = "none";
		oThis.uploaderDialog.style.height = "40px";
		// 显示标题栏上的进度条
		if(oThis.uploadItems.size() > 0)
			oThis.titleProgressDiv.style.visibility = "visible";
	};
	
	// 最大化按钮
	this.maxButton = $ce('Div');
	this.maxButton.style.zIndex = getZIndex();
	this.maxButton.className = "uploader_maxButton";
	this.maxButton.style.display = 'none';
	this.titleDiv.appendChild(this.maxButton);
	this.maxButton.onmouseover = function(e){
		this.className = "uploader_maxButton_mouseover";
	};
	this.maxButton.onmouseout = function(e){
		this.className = "uploader_maxButton";
	};
	this.maxButton.onclick = function(e){
		oThis.maxButton.style.display = 'none';
		oThis.closeButton.style.display = 'inline';
		oThis.minButton.style.display = 'inline';
		oThis.uploaderDialog.style.height = "360px";
		oThis.bodyDiv.style.display = "";
		oThis.titleProgressDiv.style.visibility = "hidden";
	};

	// bodyDiv
	this.bodyDiv = $ce('Div');
	this.bodyDiv.className = "uploader_bodyDiv";
	this.uploaderDialog.appendChild(this.bodyDiv);
	
	// 初始化上传条目
	this.uploadItems = new HashMap(); 
	for (var i = 0; i< files.length; i++){
		var file = files[i];
		var fileName = file.name;
		var fileSize = file.size;
		var item = new Lfw.file.UploadItem(this, this.bodyDiv, fileName, fileSize);
		this.uploadItems.put(fileName,item);
	}
};

/**
 * 隐藏UploaderDialog
 */
 Lfw.file.Uploader.prototype.hideUploaderDialog = function(){
	if (!this.canClose()){
			showConfirmDialog(trans("ml_uploader_closedialog0")/*关闭窗口将取消上传未完成的文件!*/,  Lfw.file.Uploader.forceClose,null, this, null, null,null,null,trans("ml_uploader_closedialog1")/*确认关闭*/);
			return;
	}
	this.destroySelf();
	Lfw.file._uploader = null;
};

/**
 * 强制关闭
 * 
 * @param {} uploader
 */
 Lfw.file.Uploader.forceClose = function(){
 	var uploader = Lfw.file._uploader;
	if (uploader.uploadItems && uploader.uploadItems.size() > 0){
		for (var i = 0; i< uploader.uploadItems.size(); i++){
			if (uploader.uploadItems.values()[i].state == Lfw.file.UploadItem.UNCOMPLETE){
				uploader.uploadItems.values()[i].cancel();
			}
		}
	}
	uploader.hideUploaderDialog();
};

/**
 * 销毁自己
 */
 Lfw.file.Uploader.prototype.destroySelf = function(){
	if (this.uploadItems && this.uploadItems.size() > 0){
		for (var i = 0; i< this.uploadItems.size(); i++){
			this.uploadItems.values()[i].destroySelf();
		}
	}
	this.uploadItems = null;
	try{
		getLfwTop().document.body.removeChild(this.fileInput);
	//	window.document.body.removeChild(this.uploaderDialog);
		getLfwTop().document.body.removeChild(this.uploaderDialog);
		getLfwTop().document.body.removeChild(this.uploaderDialogBg);
	}catch(e){
		Logger.info(e, e.stack);
	}
};
 
/**
 * 上传成功后
 * 
 * @param {} filename
 * @param {} data
 */
 Lfw.file.Uploader.prototype.afterLoaded = function(filename, data){
	var req = data.split("||");
 	var item = this.uploadItems.get(filename);
 	// 上传成功后改变状态
 	item.changeState(Lfw.file.UploadItem.COMPLETE);
 	// 文件太小的话不会监听progress事件
 	if(item.meterDiv.innerHTML == ''){// 矫正item.meterDiv.innerHTML
 		var size = Math.ceil(item.size/1024) + "KB";
 		item.meterDiv.innerHTML = size+"/"+size;
 	}
 	item.filePk = req[0];
 	// 每个子项上传成功后的回调函数
	if (typeof(this.method)!="undefined" && typeof(this.method)=="function"){
		this.method.call(this, req[0], req[1],req[2],req[3],req[4], req[5],req[6],this.billitem);
	}
	
	var allLoaded = true;
	for (var i = 0; i< this.uploadItems.size(); i++){
		if (this.uploadItems.values()[i].state == Lfw.file.UploadItem.UNCOMPLETE){
			allLoaded = false;
			break;
		}
	}
	// 全部上传成功
	if(allLoaded){
		this.leftTitleSpan.innerHTML = trans("ml_uploader_success0")/*上传成功:*/;
		// 全部上传成功后的回调函数
		if (typeof(this.allmethod)!="undefined" && typeof(this.allmethod)=="function")
			this.allmethod.call(this);
		//上传成功后自动关闭上传dialog
		var oThis = this;
		if(this.closeDialog)
			setTimeout(function(){oThis.hideUploaderDialog();},3000);
	}
	
};

/**
 * 是否可关闭
 * @return {Boolean}
 */
 Lfw.file.Uploader.prototype.canClose = function(){
	if (this.uploadItems && this.uploadItems.size() > 0){
		for (var i = 0; i< this.uploadItems.size(); i++){
			if (this.uploadItems.values()[i].state == Lfw.file.UploadItem.UNCOMPLETE)
				return false;
		}
	}
	return true;
};

/**
 * 计算标题栏的进度条
 */
 Lfw.file.Uploader.prototype.calcProcess = function(){
	var total = 0;
	var complete = 0;
	if (this.uploadItems){
		total = this.uploadItems.size();
		for (var i = 0; i < this.uploadItems.size(); i++){
			if (this.uploadItems.values()[i].state == Lfw.file.UploadItem.COMPLETE)
				complete +=1;
		}
	}
	this.meterShowDiv.innerHTML= complete + "/" + total;
	var pro = 100;
	if (total != 0){
		pro = complete * 100 / total; 	
	}
	if(total == 0)
		this.titleProgressDiv.style.visibility = "hidden";
	this.titleProgressDiv.style.width=pro + "%";
};

// Lfw.file.Uploader.prototype.afterAllLoaded = function(data){
////	this.hideUploaderDialog();
//	if (this.allmethod)
//		this.allmethod.call(this, data);
//	
//}; 

/**
 * @description 上传项构造函数
 *
 * @param {} uploader 上传控件引用
 * @param {} parentDiv 父容器
 * @param {} fileName 文件名
 * @param {} fileSize 文件大小
 */
 Lfw.file.UploadItem = function(uploader, parentDiv, fileName, fileSize){
	this.uploader = uploader;
	this.parentDiv = parentDiv;
	this.id = fileName; 	
	this.size = fileSize;
	this.state =  Lfw.file.UploadItem.UNCOMPLETE; 
	this.create();
};

 Lfw.file.UploadItem.UNCOMPLETE = 0; 
 Lfw.file.UploadItem.COMPLETE = 1; 
 Lfw.file.UploadItem.CANCEL = 2; 
 Lfw.file.UploadItem.FAILURE = 3; 
 Lfw.file.UploadItem.DELETE = 4; 

 /**
  * 创建上传项
  */
 Lfw.file.UploadItem.prototype.create = function(){
		var oThis = this;
		this.itemDiv = $ce("DIV");
		this.itemDiv.className = "uploader_item";
		this.parentDiv.appendChild(this.itemDiv);
		
		// itemProgressDiv
		this.itemProgressDiv = $ce("DIV");
		this.itemProgressDiv.className = "uploader_item_progress";
		this.itemProgressDiv.style.zIndex = getZIndex();
		this.itemDiv.appendChild(this.itemProgressDiv);
		
		// itemContentDiv
		var itemContentDiv = $ce("DIV");
		itemContentDiv.className = "uploader_item_content";
		itemContentDiv.style.zIndex = getZIndex();
		this.itemDiv.appendChild(itemContentDiv);
		
		// 文件名称
		var nameDiv = $ce("DIV");
		nameDiv.className = "uploader_item_name";
		itemContentDiv.appendChild(nameDiv);
		nameDiv.innerHTML = this.id;
		
		// 上传兆数
		this.meterDiv = $ce("DIV");
		this.meterDiv.className = "uploader_item_meter";
		itemContentDiv.appendChild(this.meterDiv);
		//this.meterDiv.innerHTML = "12.34k/394.56M";
		
		// 上传状态
		this.stateDiv = $ce("DIV");
		this.stateDiv.className = "uploader_item_state";
		this.stateDiv.innerHTML = trans("ml_uploader_queue")/*排队中...*/;
		itemContentDiv.appendChild(this.stateDiv);
	
		//rightDiv
		this.rightDiv = $ce("DIV");
		this.rightDiv.className = "uploader_item_right";
		itemContentDiv.appendChild(this.rightDiv);
		this.rightDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemcancel.png)";
		this.rightDiv.onmouseover = function(e){
			switch(oThis.state){
				case Lfw.file.UploadItem.UNCOMPLETE :
					this.style.backgroundImage = "url(" +  window.themePath + "/ui/ctrl/file/images/itemcancel_high.png)";
					break;
				case Lfw.file.UploadItem.COMPLETE: 	
//					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemdelete_high.png)";
					this.style.backgroundImage = "";
					break;
				case Lfw.file.UploadItem.CANCEL: 	
					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose_high.png)";
					break;
				case Lfw.file.UploadItem.FAILURE: 	
					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose_high.png)";
					break;
				case Lfw.file.UploadItem.DELETE: 	
					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose_high.png)";
					break;
			}
		};
		this.rightDiv.onmouseout = function(e){
			switch(oThis.state){
				case Lfw.file.UploadItem.UNCOMPLETE :
					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemcancel.png)";
					break;
				case Lfw.file.UploadItem.COMPLETE: 	
//					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemdelete.png)";
					this.style.backgroundImage = "";
					break;
				case Lfw.file.UploadItem.CANCEL: 	
					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose.png)";
					break;
				case Lfw.file.UploadItem.FAILURE: 	
					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose.png)";
					break;
				case Lfw.file.UploadItem.DELETE: 	
					this.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose.png)";
					break;
			}
		};
		this.rightDiv.onclick = function(e){
			switch(oThis.state){
				case Lfw.file.UploadItem.UNCOMPLETE :
					oThis.cancel();
					break;
				case Lfw.file.UploadItem.COMPLETE: 	
//					oThis.deleteFile();
					break;
				case Lfw.file.UploadItem.CANCEL: 	
					oThis.closeItem();
					break;
				case Lfw.file.UploadItem.FAILURE: 	
					oThis.closeItem();
					break;
				case Lfw.file.UploadItem.DELETE: 	
					oThis.closeItem();
					break;
			}
		};
};

/**
 * 改变上传项状态
 * @param {} state
 */
 Lfw.file.UploadItem.prototype.changeState = function(state){
	this.stateDiv.innerHTML = "";
	var iconDiv = $ce("DIV");
	iconDiv.className = "uploader_item_icon";
	this.stateDiv.appendChild(iconDiv);
	var textDiv = $ce("DIV");
	textDiv.className = "uploader_item_text";
	this.stateDiv.appendChild(textDiv);
	this.state = state;	
	switch(this.state){
		case Lfw.file.UploadItem.COMPLETE:
//			this.rightDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemdelete.png)";
			this.rightDiv.style.backgroundImage = "";
			iconDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/tipfinish.png)";
			textDiv.innerHTML = trans("ml_uploader_success1")/*上传成功！*/;
			textDiv.style.color = "#41A936";
			break;
		case Lfw.file.UploadItem.CANCEL:
			this.rightDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose.png)";
			iconDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/tipcancel.png)";
			textDiv.innerHTML = trans("ml_uploader_cancel")/*上传已取消！*/;
			textDiv.style.color = "#0871CA";
			break;
		case Lfw.file.UploadItem.FAILURE: 	
			this.rightDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose.png)";
			iconDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/tipfail.png)";
			textDiv.innerHTML = trans("ml_uploader_failure")/*上传失败！*/;
			textDiv.style.color = "#FC6B2E";
			break;
		case Lfw.file.UploadItem.DELETE: 	
			this.rightDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose.png)";
			iconDiv.style.backgroundImage = "url(" + window.themePath + "/ui/ctrl/file/images/itemclose.png)";
			textDiv.innerHTML = trans("ml_uploader_delete0")/*文件已删除！*/;
			textDiv.style.color = "#FC3333";
			break;
	}
	this.itemProgressDiv.style.width = "0%";
	this.uploader.calcProcess();
};

/**
 * 取消上传
 */
 Lfw.file.UploadItem.prototype.cancel = function(){
	if (this.xhr)
		this.xhr.abort();
	this.changeState(Lfw.file.UploadItem.CANCEL);
	// 接着上传下个子项
	this.uploader.uploadFile(this.uploader.fileInput.files[++Lfw.file._nextFile]);

};

/**
 * 删除文件
 */
 Lfw.file.UploadItem.prototype.deleteFile = function(){
	showConfirmDialog(trans("ml_uploader_deletefile")/*确认删除已上传的文件?*/, function(item){
			getFileService().execute("deleteFile", "$S_" + item.filePk, "$S_" + item.uploader.sysid);
			item.changeState(Lfw.file.UploadItem.DELETE);
		},null, this, null, null,null,null,trans("ml_uploader_delete1")/*删除*/);
};

/**
 * 关闭上传项
 */
 Lfw.file.UploadItem.prototype.closeItem = function(){
	this.uploader.uploadItems.remove(this.id);
	this.uploader.calcProcess();
	this.destroySelf();
};

/**
 * 销毁上传项自身
 */
 Lfw.file.UploadItem.prototype.destroySelf = function(){
	this.xhr = null;
	this.parentDiv.removeChild(this.itemDiv);	
};
