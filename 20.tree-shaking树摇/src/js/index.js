import { mul } from './test';


import '../css/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// elint-disabled-next-line
console.log(sum(1, 3, 6, 4, 5));
console.log(mul());
