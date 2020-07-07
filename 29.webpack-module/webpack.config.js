

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

	
	
	entry:'./src/js/index.js',
	output:{
		filename:'js/[name].js',
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			//loader 的配置
			{
				test:/\.css$/,
				//多个loader用use
				use:[
					'style-loader',
					'css-loader'
				]
			},{
				test:/\.js$/,
				//排除node_modules下的js文件
				exclude:/node_modules/,
				//只检查src下的js文件
				include:path.join(__dirname,'src'),
				
				//优先执行
				enforce:'pre',
				//延后执行
				// emforce:'post',
				//单个loader 用loader
				loader:'eslint-loader'
			},
			//以下配置只检查一个
			{
				oneOf:[]
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin()
	],
	mode:'development'
}