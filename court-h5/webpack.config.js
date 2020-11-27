const resolve = require('path').resolve
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (options = {}) => ({
	entry: {
		app: ["babel-polyfill", "./src/main.js"],
		vendor: './src/vendor',
		// index: './src/main.js'
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
		chunkFilename: '[id].js?[chunkhash]',
		publicPath: options.dev ? '/assets/' : publicPath
	},
	module: {
		rules: [{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				},
				include: [resolve('src'), resolve('node_modules')]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']

			},

			{
				test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|ico)(\?.+)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10000
					}
				}]
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
	],
	resolve: {
		alias: {
			'~': resolve(__dirname, 'src')
		},
		extensions: ['.js', '.vue', '.json', '.css']
	},
	devServer: {
		host: '0.0.0.0',
		port: 8070,
		proxy: {
			'/api/': {
				target: 'http://127.0.0.1:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		disableHostCheck: true,
		historyApiFallback: {
			index: url.parse(options.dev ? '/assets/' : publicPath).pathname
		}
	},
	devtool: options.dev ? '#eval-source-map' : '#source-map'
})
