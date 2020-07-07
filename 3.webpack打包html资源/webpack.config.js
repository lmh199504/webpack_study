
/*	
	loader ：1.下载 2.使用（配置loader）
	plugins：1.下载 2.引入 3.配置
*/


const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:'./src/index.js',
	output:{
		filename:"build.js",
		path:path.join(__dirname,'dist')
	},
	
	module:{
		rules:[
			//loader配置
			
		]
	},
	plugins:[
		//插件配置
		//html-webpack-plugin
		//功能：默认会创建一个空的html文件，自动将引入打包的输出的所有资源（js/css）
		//需求：需要有结构的html文件
		new HtmlWebpackPlugin({
			//复制 './src/index.html'文件，并自动引入打包输出的所有资源（js/css）
			template:'./src/index.html'
		})
	],
	mode:'development'
}