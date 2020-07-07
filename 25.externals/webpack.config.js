/*
	externals 与cdn结合使用
*/

const path = require("path");



const HtmlWebpackPlugin = require('html-webpack-plugin');



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

		
	],
	// mode:'development',
	mode:"production",
	externals:{
		//忽略库名 -- npm 包名
		jquery:'jQuery'
	}
}