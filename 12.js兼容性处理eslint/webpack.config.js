
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
						css 兼容性处理 ：postcss --> postcss-loader postcss-preset-env
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
		   },
		   
		   
		   /*
			js兼容性处理  babel-loader @babel/core @babel/preset-env
				1.基本js兼容性处理 -->@babel/preset-env
					只能转换基本语法，如promise 无法转换
				2.全部js兼容处理 --->@babel/polyfill
					问题：我只要解决部分兼容性问题，但是将所有的兼容性代码全部引入，体积太大了
			    3.需要做兼容的就做：按需加载 -->core.js
				
		   */
		  {
			  test:/\.js$/,
			  exclude:/node_module/,
			  loader:'babel-loader',
			  options:{
				  //预设 ：指示babel做怎么样的兼容性处理
				  presets:[
						[
							'@babel/preset-env',
							{ 	//按需加载
								useBuiltIns:'usage',
								//指定corejs版本
								corejs:{
									version:3
								},
								//指定兼容到哪个版本浏览器
								targets:{
									chrome:'60',
									firefox:'60',
									ie:'9',
									safari:'10',
									edge:'17'
								}
							}
						]
						
					  ]
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