


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry:'./src/index.js',
	output:{
		filename:'build.js',
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
				//打包其他资源（除了html/css/js/img资源以外的资源）
				exclude:/\.(css|js|html|)$/,
				loader:'file-loader',
				options:{
					name:'[hash:10].[ext]'
				}
				
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