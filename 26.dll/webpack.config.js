/*
	externals 与cdn结合使用
*/

const path = require("path");

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

//自动引入打包后的js文件
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')


module.exports = {
	entry:'./src/js/index.js',
	output:{
		filename:'js/build.[contenthash:10].js',
		path:path.join(__dirname,'dist')
	},

	plugins:[

		new HtmlWebpackPlugin({
			template:'./src/index.html',
			minify:{
				collapseWhitespace:true,
				removeComments:true
			}
		}),
		
		// //告诉webpack 哪些库不参与打包，同时使用时的名称也要变
		new webpack.DllReferencePlugin({
			manifest:path.join(__dirname,'dll/manifest.json')
		}),
		//将某个打包文件输出去，并在html中自动引入该资源
		new AddAssetHtmlWebpackPlugin({
			filepath:path.join(__dirname,'dll/jquery.js')
		})

		
	],
	// mode:'development',
	mode:"production",
	// externals:{
	// 	//忽略库名 -- npm 包名
	// 	jquery:'jQuery'
	// }
}