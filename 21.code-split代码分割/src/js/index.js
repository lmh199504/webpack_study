
import $ from 'jquery'

// import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// import(/*webpackChunkName:'test' */'./test').then(res=>{
// 	console.log(res.mul())
// }).catch(err=>{
// 	console.log(err)
// })

// elint-disabled-next-line
console.log(sum(1, 3, 6, 4, 5));

