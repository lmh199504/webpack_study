/*
	HMR 热替换模块 hot module replacement 热替换模块 / 模块热替换
		作用：只打包变化的模块，
		样式文件：可以使用HMR功能：因为style-loader内部实现了
		js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
		html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了
			解决：修改entry入口文件，将html文件引入
*/



const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	entry:[path.join(__dirname,'./src/js/index.js'),path.join(__dirname,'./src/index.html')],
	output:{
		filename:"build.js",
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			
			{ //处理css
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},{//处理less
				test:/\.less$/,
				use:[
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{ // 处理图片资源
				test:/\.(jpg|gif|png|bmp|jepg)$/,
				loader:'url-loader',
				options:{
					limit:8 * 1024,
					name:'[hash:10].[ext]',
					esModule:false,
					outputPath:'imgs'
				}
			},
			{
				test:/\.html$/,
				loader:'html-loader'
			},
			{  //字体资源
				test:/\.(ttf|eot|woff|woff2|svg)$/,
				loader:'file-loader',
				options:{
					outputPath:'font'
				}
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'./src/index.html')
		})
	],
	mode:"development",
	devServer:{
		port:3000,
		open:true,
		compress:true,
		//开启HMR功能
		hot:true
	},

}