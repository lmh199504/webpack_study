

const path = require("path");

//独立css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.NODE_ENV = 'production' //定义nodejs环境变量，决定使用哪个browserslist的环境
const commonCssLoader = [
	MiniCssExtractPlugin.loader,'css-loader',
		{
			/*
				还需要在package.json中定义browserslist
				"browserslist":{
					"development":[
						"last 1 chrome version",
						"last 1 firefox version",
						"last 1 safari version"
					],
					"production":[
						">0.2%",
						"not dead",
						"not op_mini all"
					]
				}
			*/
			loader:'postcss-loader',
			options:{
				ident:"postcss",
				plugins:()=>[
					require('postcss-preset-env')()
				]
			}
		}
	
]
module.exports = {
	entry:path.join(__dirname,'./src/js/index.js'),
	output:{
		filename:'js/build.js',
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[...commonCssLoader]
			},
			{
				test:/\.less$/,
				use:[...commonCssLoader,'less-loader']
			},
			/*
				正常来讲，一个文件只能被一个loader处理，
				当一个文件被多个loader处理时，那么一定要指定loader 的执行顺序：
					先eslint 再执行 babel
			*/
			
			//js语法检查
			{
				/*
				在package.json中的eslintConfig -->airbnb
				"eslintConfig":{
					"extends":"airbnb-base"
				}
				*/
				test:/\.js$/,
				exclude:/node_modules/,
				//优先执行
				enforce:'pre',
				loader:'eslint-loader',
				options:{
					//自动修复
					fix:true
				}
			},
			//js兼容性处理
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				options:{
					presets:[
						[
							'@babel/preset-env',
							{
								useBuiltIns:'usage',
								corejs:{
									version:3
								},
								//指定兼容到哪个版本浏览器
								targets:{
									chrome:'60',
									firefox:'60',
									ie:'9',
									safari:'10',
									edge:'17'
								}
							}
						]
					]
				}
			},
			//处理img图片
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
			//其他资源
			{
				exclude:/\.(css|less|html|js|jpg|png|jepg|bmp)$/,
				loader:'file-loader',
				options:{
					outputPath:"media"
				}
			}
		]
	},
	plugins:[
		new MiniCssExtractPlugin({
			filename:'css/build.css'
		}),
		
		//压缩css
		new OptimizeCssAssetsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			minify:{
				collapseWhitespace:true,
				removeComments:true
			}
		})
	],
	mode:'development',
	
}