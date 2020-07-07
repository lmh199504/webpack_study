function add(x,y){
	return x + y
}

import '../css/index.css'
console.log(add(1,5))

import print from './print.js'
console.log(print())


if(module.hot){
	//一旦modu.hot为true，说明开启了HMR功能， -->让HMR功能代码生效
	module.hot.accept('./print.js',function(){	
		//该方法会监听print.js文件的变化，一旦变化，其他模块不会重新构建
		//会执行后面的回调函数
		print()
	})
	
}