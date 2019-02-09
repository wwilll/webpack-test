function createXHR () {
    if (XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (ActiveXObject) {
        if (typeof arguments.callee.activeXString != 'string') {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], i, len;
            for (i = 0; i < versions.length; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (e) {
                    console.log(e);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error('No XHR object available.');
    }
}

//同步ajax
var synchronizationAjax = function (url, ...o) {
    var xhr = createXHR();
    xhr.open('get', url, false);
    xhr.send(null);
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.responseText);
    } else {
        console.log("Request was unsuccessful: " + xhr.status);
    }
}
//异步ajax
var asynchronousAjax = function (url, ...o) {
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            console.log(xhr.responseText);
        } else {
            console.log("Request was unsuccessful: " + xhr.status);
        }
    }
    xhr.open('get', url, true);
    xhr.send(null);
}
export {synchronizationAjax as TB, asynchronousAjax as YB};