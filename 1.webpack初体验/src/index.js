/*
	webpack 入口文件
	
	1.运行指令：
		开发环境：webpack ./src/index.js -o ./dist/build.js --mode=development
			webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ..dist/build.js 
			整体打包环境是开发环境
		生产环境：webpack ./src/index.js -o ./dist/build.js --mode=production
			webpack 会以 ./src/index.js 为入口文件开始打包，打包后输出到 ..dist/build.js 
			整体打包环境是开发环境
	2.结论
	    (1).webpack 可以打包js、json文件,不能处理css/img等其他资源
		(2).生产环境开发环境的区别 ，生产环境比开发环境多一个压缩
		(3).生产环境和开发环境能将ES6模块化编译成浏览器能识别的模块化
*/

import data from './data.json'
console.log(data)

// import './index.css'   //这里没有设置css-loader会打包失败
function add(x,y){
	return x + y
}

console.log(add(1,2))