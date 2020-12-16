/* 
	npm i webpack-dev-server -D 安装
	
	
	npx webpack-dev-server   启动
 
 */

const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	entry:'./src/index.js',
	output:{
		filename:"build.js",
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			},{
				test:/\.(jpg|png|gif)$/,
				loader:'url-loader',
				options:{
					name:'[hash:10].[ext]'
				}
			},
			{
				test:/\.html$/,
				loader:"html-loader"
			},
			{ 
				test:/\.(ttf|eot|woff|woff2|svg)$/,
				use:['file-loader'] ,
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		})
	],
	mode:'development',
	
	//开发服务器devServer :用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
	//特点：只会在内存中编译打包，不会有任何输出
	//启动指令：npx webpack-dev-server
	devServer:{
		contentBase:path.join(__dirname,'dist'),
		//启动gzip压缩
		compress:true,
		//端口号
		port:3000,
		//自动打开浏览器
		open:true
	}
}