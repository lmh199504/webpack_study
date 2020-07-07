

const path = require("path")

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	entry:path.join(__dirname,'./src/js/index.js'),
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
		compress:true
	}
}