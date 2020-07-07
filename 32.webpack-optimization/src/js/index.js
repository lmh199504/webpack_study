// import add from './add';
import count from './count'

import '$css/index.css'

console.log('index被加载了')


// console.log(add(1,1))
console.log(count(2,3))

import(/* webpackChunkName:'add' */'./add')
.then(({add})=>{
	console.log(add(1,2))
})