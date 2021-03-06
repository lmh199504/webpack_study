/*
	webpack.config.js  webpack的配置文件
		作用：指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）
		所有的构建工具都是基于nodejs平台运行的 模块化默认采用commonJS

*/


const path = require('path');

module.exports = {
	//webpack 配置
	//入口文件
	entry:'./src/index.js',
	//输出
	output:{
		//输出文件名
		filename:"build.js",
		//输出路径
		//__dirname nodejs 的变量，代表当前文件的目录绝对路径
		path:path.join(__dirname,'dist')
	},
	module:{
		rules:[
			//详细的loader配置
			{	
				//test匹配哪些文件
				test:/\.css$/,
				//使用哪些loader
				use:[
					//use中loader执行顺序是从右到左，从下到上 依次执行
					
					//创建style 标签，将js中的样式资源插入进行，添加到head中生效
					'style-loader',
					//将css文件转成commonJS模块加载到js中，里面的内容是样式字符串
					'css-loader'
				]
			},{
				test:/\.less$/,
				use:[
					'style-loader',
					'css-loader',
					//将less编译成css文件
					'less-loader'
				]
			}
		]
	},
	plugins:[
		//插件详细配置
		
	],
	//模式
	mode:'development'    //开发模式
}