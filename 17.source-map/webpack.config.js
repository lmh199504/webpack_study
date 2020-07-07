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
		filename:"js/build.js",
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
	devtool:'source-map'
	/*
		source-map：一种提供源代码到构建后代码的映射
		[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
		
		source-map：外部  错误代码的准确信息 和 源代码的错误位置
		inline-source-map : 内联  只生成1个内联的source-map 错误代码的准确信息 和 源代码的错误位置
		
		hidden-source-map : 外部   错误代码的错误原因，没有源代码的错误位置，不能追踪到源代码的错误，只能追踪到构建后代码的错误位置
		eval-source-map : 内联   每一个文件生成对应的source-map ，都在eval   错误代码的准确信息 和 源代码的错误位置
		
		nosources-source-map ：外部    错误代码的准确信息 和 没有任何源代码的错误信息
		cheap-source-map ：外部   错误代码的准确信息 和 和错误代码的位置 只能精确到行
		cheap-module-source-map ：外部  错误代码的准确信息 和 和错误代码的位置 moudule会将loader的source-map加入
		内联 和 外部的区别 ：1.外部生成了文件，外部没有 2.内联构建速度更快
		
		
		开发环境：速度快，调试更友好
			速度：
			（eval>inline>cheap>...）
			调试：
			source-map
			cheap-module-source-map
			cheap-source-map
			
			--> eval-source-map
			
		生产环境：源代码要不要隐藏，调试要不要更友好
		内联会使代码体积更大
		nosources-source-map
		hidden-source-map 
	*/
}