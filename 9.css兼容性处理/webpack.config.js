
//npm i mini-css-extract-plugin -D


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


process.env.NODE_ENV = 'development'
module.exports = {
	entry:"./src/js/index.js",
	output:{
		filename:'js/build.js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					//会创建style标签，将样式放入
					// 'style-loader',
					MiniCssExtractPlugin.loader,
					//这个loader 取代 style-loader 作用：提取js中的css成单独文件 
					'css-loader',
					/*
						css 兼容性处理 ：postcss --> psotcss-loader postcss-preset-env
					*/
				   {
					   loader:"postcss-loader",
					   options:{
						   ident:'postcss',
						   plugins:()=>[
							   //postcss插件
							   require('postcss-preset-env')()
						   ]
					   }
				   }
				]
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'./src/index.html')
		}),
		new MiniCssExtractPlugin({
			//对输出文件重命名,
			filename:'css/build.css'
		})
	],
	mode:'development',
	devServer:{
		compress:true,
		open:true,
		port:3000
	}
}