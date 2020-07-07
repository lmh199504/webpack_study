
//npm i mini-css-extract-plugin -D


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//设置nodejs环境变量
// process.env.NODE_ENV = 'production'
//optimize-css-assets-webpack-plugin  //压缩css插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
	entry:path.join(__dirname,"./src/js/index.js"),
	output:{
		filename:'js/build.js',
		path:path.resolve(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.join(__dirname,'./src/index.html'),
			//压缩html
			minify:{
				//移除空格
				collapseWhitespace:true,
				//移除注释
				removeComments:true
			}
		}),
		new MiniCssExtractPlugin({
			//对输出文件重命名,
			filename:'css/build.css'
		}),
		
		//压缩css插件
		new OptimizeCssAssetsWebpackPlugin()
	],
	
	//压缩js只需把mode 改为production
	// mode:'development',
	mode:'production',
	devServer:{
		compress:true,
		open:true,
		port:3000
	}
}