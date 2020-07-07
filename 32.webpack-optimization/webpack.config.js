

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {

	
	
	entry:'./src/js/index.js',
	output:{
		filename:'js/[name].[contenthash:10].js',
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
	mode:'production',
	//解析模块的规则
	resolve:{
		//配置解析模块路径别名:简写路径 缺点写路径没有提示
		alias:{
			$css:path.join(__dirname,'src/css')
		},
		//配置省略文件路径的后缀名，默认['js','json']
		// extensions:['js','json','jsx']
	},
	optimization:{
		splitChunks:{
			chunks:'all',
			//以下是默认值，可以不写
			minSize:30 * 1024,  //分割chunk最有小为30kb
			maxSize:0, //最大没有限制
			minChunks:1,   //模块最少被引用过一次
			maxAsyncRequests:5,   //按需加载时并行加载的文件的最大数量
			maxInitialRequests:3,  //入口文件最大并行请求数量
			automaticNameDelimiter:'~', //名称连接符
			name:true,  //可以使用命名规则
			cacheGroups:{  //分割chunk 的组
			
				// node_modules文件会被打包到 vendors 组的chunk中，--> vendor~xxx.js
				//满足上面的公共规则，如：大小超过30kb，至少被引用一次
				vendor:{
					test:/[\\/]node_modules[\\/]/,
					//打包优先级
					priority:-10
				},
				default:{
					//要提取的chunk最少被引用2次
					minChunks:2,
					priority:-20,
					//如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包
					reuseExistingChunk:true,
					
				}
			}, 
			
		},
		//将当前模块的记录其他模块的hash单独打包为一个文件 runtime
		
		runtimeChunk:{
			name:entrypoint => `runtime-${entrypoint.name}`
		},
		minimizer:[
			//配置生成环境的压缩法案：js和css
			new TerserWebpackPlugin({
				//开启缓存
				cache:true,
				//开启多进程打包
				parallel:true,
				//启动source-map
				sourceMap:true
			})
			
		]
	}
}