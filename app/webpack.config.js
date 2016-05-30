var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
    __dirname + '/assets/index',
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public/assets/'),
		publicPath: '/assets/',
		filename: 'bundle.js'
	},
	resolve: {
    //root: path.resolve(__dirname),
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders
	},
	devServer: {},
	plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
	],
  postcss: [ autoprefixer({ browsers: ['last 4 versions'] }) ],
};
