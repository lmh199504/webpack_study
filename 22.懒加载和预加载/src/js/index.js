console.log("index被加载了")


// import { mul } from './test'



const myBtn = document.getElementById('btn');
myBtn.addEventListener('click',function(){
	//懒加载
	//预加载webpackPrefetch :会在使用之前，提前加载js文件
	//正常加载可以认为是并行加载，（同一时间加载多个文件）预加载webpackPrefetch：等其他资源加载完了，浏览器空闲了，再偷偷加载资源
	import(/* webpackChunkName:'test' ,webpackPrefetch:true*/'./test').then(({mul})=>{
		console.log(mul(4,6))
	})
},false)
