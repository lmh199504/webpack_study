// import add from './add';
import count from './count'


console.log('index被加载了')

import('./add').then(({default:add})=>{
	console.log(add(1,2))
})


// console.log(add(1,1))
console.log(count(2,3))