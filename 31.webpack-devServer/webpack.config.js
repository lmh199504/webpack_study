

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
		extensions:['js','json','jsx']
	},
	,
	devServer:{
		//运行代码的目录
		contentBase:path.join(__dirname,'dist'),
		//监视 contentBase 目录下所有文件，一旦发生变化就会 reload
		watchContentBase:true,
		//
		watchOptions:{
			//忽略文件
			ignored:/node_modules/
		},
		//启动gzip压缩
		compress:true,
		//端口号
		port:3000,
		//域名
		host:'localhost',
		//自动打开浏览器
		open:true,
		//开启HMR功能
		hot:true,
		//不要显示启动服务器日志信息
		clientLogLevel:'none',
		//除了一些基本的启动信息以外，其他内容都不显示
		quiet:true,
		//如果出错，不要全屏提示
		overlay:false,
		//服务器代理 -->解决开发环境跨域问题
		proxy:{
			//一旦devServer（3000）接受到请求 '/api/xxx',就会把这个请求转发到另外一个服务器（5000）
			'/api':{
				target:'http://localhost:5000',
				//发送请求时，请求路径重写：将'/api/xxx' -->'/xxx' 去掉 '/api'
				pathRewrite:{
					'^/api':''
				}
			}
		}
		
	}
}