// import $ from 'expose-loader?$!jquery';
import 'zui';
import $ from 'jquery';
window.$ = $;
import _ from 'lodash';
import './style.css';
import './less.less';
import './less2.less';
import Icon from './logo.png';
import Data from './data.xml';
import './test'
console.log(321)
function component () {
    var element = document.createElement('h1')

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    element.classList.add('hello');
    let myIcon = new Image();
    myIcon.src = Icon;
    document.body.appendChild(myIcon);
    console.log(Data);

    return element
}

document.body.appendChild(component())