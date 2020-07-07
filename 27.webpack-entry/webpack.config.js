

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	/*
		entry:入口起点
			1.string --> './src/js/index.js'
				打包成一个chunk 输出一个bundle文件
				此时chunk的默认名称是 main 
			2.array	 --> ['./src/js/index.js'，'./src/js/add.js']
				多入口
				所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
				--> 只有在HMR功能中让html热更新生效
			3.object
				多入口
				有几个入口文件，就形成几个chunk，输出几个bundle 文件
				此时chunk 的名称是key
			4.特殊
				{	
					
					//入口文件最终会形成一个chunk，输出只有一个bundle文件
					index:['./src/js/index.js','./src/js/count.js'],
					//形成一个chunk，输出一个bundle
					add:'./src/js/add.js'
				},
 	*/	
	
	
	entry:{
		index:['./src/js/index.js','./src/js/count.js'],
		add:'./src/js/add.js'
	},
	output:{
		filename:'js/[name].js',
		path:path.join(__dirname,'dist')
	},
	module:{
		
	},
	plugins:[
		new HtmlWebpackPlugin()
	],
	mode:'development'
}