// import '@babel/polyfill';
import '../css/index.css';

const y = 555;
console.log(y);
const promise = new Promise(((resolve) => {
  setTimeout(() => {
    resolve(666);
  }, 2000);
}));
console.log(promise);
promise.then(res=>{
	console.log(res)
})