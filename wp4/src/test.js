// import $ from 'jquery';
import {TB, YB} from './ajax.js';
console.log(1213 + '====');
@log
class A {
    a = 1;
}
let a = new A();
console.log(a.a);

function log(target) {
    console.log(target)
}
console.log(window.$)
// console.log(TB, YB, asynchronousAjax)
console.log(TB, YB)
// TB('/api/test/test-get')
YB('/user')