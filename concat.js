var fs = require('fs');
var path = require('path');

// js原始文件目录 
var src = __dirname + '/dist/js';

// css原始文件目录
var src_css = __dirname + '/dist/css/plugin';

var files = fs.readdirSync(src);

var rootPath = './dist/plugin';





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
			readable = fs.readFileSync( _src );
			writable = fs.writeFileSync( _dst, readable );
			// readable.pipe(writable);			
		}

		// css
		var _src_css = src_css + '/' + dirNameLower + '.css';
		var _dst_css = rootPath + '/' + dirNameLower + '/' + dirNameLower + '.css';
		var cssExist = fs.existsSync(_src_css);
		var readablecss,writablecss;
		if(cssExist){
			var now_css = fs.statSync(_src_css);
			if(now_css.isFile()){
				readablecss = fs.readFileSync( _src_css );
				writablecss = fs.writeFileSync( _dst_css, readablecss );
				// readablecss.pipe(readablecss);			
			}			
		}
	}
}