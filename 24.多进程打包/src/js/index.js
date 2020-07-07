import {
  mul,
} from './test';


import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 3, 6, 4, 5));
// eslint-disable-next-line
console.log(mul());


/*
1.eslint不认识window、navigator全局变量
解决：需要修改packgae.json中的eslintConfig配置
"env":{
"browser":true
}
2.sw代码必须运行在服务器上
*/
// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => {
        // eslint-disable-next-line
				console.log('service-worker 注册成功');
      }).catch(() => {
        // eslint-disable-next-line
				console.log('service-worker 注册失败了');
      });
  });
}
