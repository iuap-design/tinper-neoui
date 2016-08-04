var fs = require('fs');
var path = require('path');

// js原始文件目录 
var src = __dirname + '/js';

// css原始文件目录
var src_css = __dirname + '/dist/css/plugin';
// var src_css = __dirname + '/v1/lib/css';

var files = fs.readdirSync(src);

var rootPath = './dist/plugin';
// var rootPath = './v1/lib/plugins';





// 创建初始目录
var rootExist = fs.existsSync(rootPath);
if(!rootExist){
	fs.mkdirSync(rootPath);
}


// 创建各plugin插件文件夹,复制plugin JS文件到各插件中
var pluginAry = [];
for(var i=0; i<files.length; i++){
	var dirName = files[i].split('.')[0];

	// 筛除不符合js的文件
	if(dirName !== ''){
		var dirIndex = pluginAry.indexOf(dirName);
		// console.log(dirIndex);
		var dirNameLower = dirName.toLocaleLowerCase();
		var dirExist = fs.existsSync(rootPath + '/' + dirNameLower);
		if(!dirExist){
			fs.mkdirSync(rootPath + '/' + dirNameLower);
		}

		// js
		var _src = src + '/' + files[i];
		var _dst = rootPath + '/' + dirNameLower + '/' + files[i];
		var readable,writable;
		var now = fs.statSync(_src);
		if(now.isFile()){
			readable = fs.createReadStream( _src );
			writable = fs.createWriteStream( _dst );
			readable.pipe(writable);			
		}

		// css
		var _src_css = src_css + '/' + dirNameLower + '.css';
		// console.log(_src_css);
		var _dst_css = rootPath + '/' + dirNameLower + '/' + dirNameLower + '.css';
		var cssExist = fs.existsSync(_src_css);
		var readable_css,writable_css;
		if(cssExist){
			var now_css = fs.statSync(_src_css); 
			// console.log(now_css);
			if(now_css.isFile()){
				readable_css = fs.createReadStream( _src_css );
				writable_css = fs.createWriteStream( _dst_css );
				readable_css.pipe(writable);			
			}			
		}
	}
}