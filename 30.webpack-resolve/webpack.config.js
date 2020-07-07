

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
	mode:'development',
	//解析模块的规则
	resolve:{
		//配置解析模块路径别名:简写路径 缺点写路径没有提示
		alias:{
			$css:path.join(__dirname,'src/css')
		},
		//配置省略文件路径的后缀名，默认['js','json']
		extensions:['js','json','jsx'],
		//告诉webpack解析模块的规则
		modules:[]
	}
}