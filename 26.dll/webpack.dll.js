

/*
	使用dll技术，对某些库进行单独打包（第三方库：jQuery、vue、react...）进行单独打包
	当你运行webpack 时，默认查找的是webpack.config.js配置文件
	需求：需要运行 webpack.dll.js 配置文件
		--> webpack --config webpack.dll.js
*/

const path = require('path');
const webpack = require('webpack')	


module.exports = {
	//最终打包生成的name --> jquery
	//['jquery'] --> 要打包的库是jquery
	entry:{
		jquery:['jquery']
	},
	output:{
		filename:'[name].js',
		path:path.join(__dirname,'dll'),
		library:'[name]_[hash]' //打包的库向外暴露出去的内容叫什么名字
	},
	plugins:[
		//打包生成一个 manifest.json -->提供和jquery的映射关系
		new webpack.DllPlugin({
			name:'[name]_[hash]',  //映射库的暴露内容的名称   jquery_3c10e36a9e6b6dab8065
			path:path.join(__dirname,'dll/manifest.json') //输出文件路径
			
		})
	],
	mode:"production"
}