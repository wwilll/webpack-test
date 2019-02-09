let path = require('path');
console.log('test:' + path.join(__dirname));
let a = 123;
module.exports = function () {
    return __dirname;
}