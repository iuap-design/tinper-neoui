var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;
var fs = require('fs');

var plugins = [],
	entryobj = {},
	libraryName,
	outputFile,
	entryFile;

// entry js文件目录
var exportJs = './js/';
var indexJs = '/js/index.js';

// out js文件目录
var outJs = '/dist/js';

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



if(env === 'build') {
	plugins.push(new UglifyJsPlugin({
		minimize: true
	}));
	libraryName = '[name]';
	outputFile = libraryName + '.min.js';
	entryFile = entryobj;
} else {
	libraryName = 'neoui';
	outputFile = libraryName + '.js';
	entryFile = __dirname + indexJs;
}


var config = {
	// entry: __dirname + '/v1/src/index.js',
	// entry : fs.readdirSync('./v1/src/').filter(function(file) {
	// 	return file.match(/\.js$/);
	// }),
	entry: entryFile,
	devtool: 'source-map',
	output: {
		path: __dirname + outJs,
		filename: outputFile,
		//library: 'u',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /(\.jsx|\.js)$/,
			loader: 'babel',
			exclude: /(node_modules|bower_components)/
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