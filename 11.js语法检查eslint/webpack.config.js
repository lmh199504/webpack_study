
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
			},
			
			/*
			 语法检查：  eslint-loader eslint
			 注意：只检查自己写的js代码，第三方库不需要检查
			 设置检查规则：
				package.json 中eslintConfig中设置
				"eslintConfig":{
					"extends":"airbnb-base"
				},
				
				airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
				
			*/
		   {
			   test:/\.js$/,
			   exclude:/node_modules/,
			   loader:'eslint-loader',
			   options:{
				   fix:true
			   }
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
		}),
		
		//压缩css插件
		new OptimizeCssAssetsWebpackPlugin()
	],
	mode:'development',
	devServer:{
		compress:true,
		open:true,
		port:3000
	}
}