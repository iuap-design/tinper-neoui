var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;
var fs = require('fs');

var plugins = [],
	entryobj = {},
	libraryName,
	outputFile,
	entryFile,
	devToolSelect;

// entry js文件目录
var exportJs = './js/';
var indexJs = '/js/index.js';

// out js文件目录
// var outJs = '/dist/js';
var outJs;

// 多路径配置
var entries =  fs.readdirSync(exportJs).filter(function(file) {
	return file.match(/\.js$/);
});

function objpush(element, index, array) {
	var name = element.split('.js')[0];
	if(name === 'index'){

	} else {
		entryobj[name] = [ exportJs + element ];
	}
}
entries.forEach(objpush);


// var PROD = JSON.parse(process.env.PROD_ENV || '0');
// console.log(PROD);

/**
 * product_normal 用于输出合并后未压缩版
 * product_min 用于输出合并后压缩版
 * build_normal 用于输出未压缩的插件
 * build_min 用于输出压缩的插件
 */
if(env === 'build_normal') {
	devToolSelect = '';
	libraryName = '[name]';
	outputFile = libraryName + '.js';
	entryFile = entryobj;
	outJs = '/dist/js/plugin';
} else if(env === 'build_min'){
	plugins.push(new UglifyJsPlugin({
		minimize: true
	}));
	devToolSelect = 'source-map';
	libraryName = '[name]';
	outputFile = libraryName + '.min.js';
	entryFile = entryobj;
	outJs = '/dist/js/plugin';
} else if(env === 'product_normal'){
	libraryName = 'neoui';
	devToolSelect = '';
	outputFile = libraryName + '.js';
	entryFile = __dirname + indexJs;
	outJs = '/dist/js';
} else if(env === 'product_min'){
	libraryName = 'neoui';
	devToolSelect = '';
	plugins.push(new UglifyJsPlugin({
		minimize: true
	}));
	outputFile = libraryName + '.min.js';
	entryFile = __dirname + indexJs;
	outJs = '/dist/js';	
}


var config = {
	// entry: __dirname + '/v1/src/index.js',
	// entry : fs.readdirSync('./v1/src/').filter(function(file) {
	// 	return file.match(/\.js$/);
	// }),
	entry: entryFile,
	devtool: devToolSelect,
	output: {
		path: __dirname + outJs,
		filename: outputFile,
		//library: 'u',
		libraryTarget: 'var',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /(\.jsx|\.js)$/,
			loader: 'babel',
			exclude: /(bower_components)/
		}, {
			test: /(\.jsx|\.js)$/,
			loader: "eslint-loader",
			exclude: /node_modules/
		}]
	},
	resolve: {
		root: path.resolve('./js'),
		extensions: ['', '.js']
	},
	plugins: plugins
};

module.exports = config;