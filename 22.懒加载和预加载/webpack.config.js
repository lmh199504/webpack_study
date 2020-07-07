


const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.NODE_ENV = 'production' //定义nodejs环境变量，决定使用哪个browserslist的环境

module.exports = {
	entry:'./src/js/index.js',
	// entry:{
	// 	//多入口：有一个入口，最终输出就有一个bundle
	// 	main:"./src/js/index.js",
	// 	test:"./src/js/test.js"
	// },
	output:{
		//[name]：取文件名
		filename:'js/[name].[contenthash:10].js',
		path:path.join(__dirname,'dist')
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			minify:{
				collapseWhitespace:true,
				removeComments:true
			}
		})
	],
	/*
		1.可以将node_module中的代码单独打包成一个chunk输出
		2.自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独一个文件
	*/
	optimization:{
		splitChunks:{
			chunks:'all'
		}
	},
	// mode:'development',
	mode:"production",
	devtool:"source-map"
	
}