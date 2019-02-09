var greeter = require('./greeter.js');
let p = require('../test')();
console.log('p:' + p);
document.querySelector('#root').appendChild(greeter());