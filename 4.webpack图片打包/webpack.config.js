
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry:'./src/index.js',
	output:{
		filename:'build.js',
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.less$/,
				use:[
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				//处理图片资源 问题：不能处理html 中 img图片
				test:/.(jpg|png|gif)$/,
				//下载url-loader file-loader
				// use:[
				// 	'url-loader'
				// ],
				loader:'url-loader',
				options:{
					//图片大小小于8kb，就会被base64处理
					//优点：减少请求数量（减轻服务器压力）
					//缺点：图片体积会更大
					limit:8 * 1024,
					//问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonJS
					//解析时会出现问题：[object Module]
					//解决：关闭url-loader的es6模块化，使用commonJS解析
					esModule:false,
					//重命名图片 hash值前10加原扩展名
					name:'[hash:10].[ext]'
				}
			},
			{
				test:/.html$/,
				//处理html文件的img图片(负责引入img，从而能被url-loader进行处理)
				loader:'html-loader'
			}
			
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html'
		})
	],
	mode:'development'
}