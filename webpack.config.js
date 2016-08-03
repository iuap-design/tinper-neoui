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

// 多路径配置
var entries =  fs.readdirSync('./v1/src/').filter(function(file) {
	return file.match(/\.js$/);
});

function objpush(element, index, array) {
	var name = element.split('.js')[0];
	if(name === 'index'){

	} else {
		entryobj[name] = [ './v1/src/' + element ];
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
	entryFile = __dirname + '/v1/src/index.js';
}


var config = {
	// entry: __dirname + '/v1/src/index.js',
	// entry : fs.readdirSync('./v1/src/').filter(function(file) {
	// 	return file.match(/\.js$/);
	// }),
	entry: entryFile,
	devtool: 'source-map',
	output: {
		path: __dirname + '/v1/lib/js',
		filename: outputFile,
		library: 'u',
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
		root: path.resolve('./v1/src'),
		extensions: ['', '.js']
	},
	plugins: plugins
};

module.exports = config;