/**
 *  数据过滤，export 用来暴露函数
 * @param {*} str 
 * @returns 
 */
 export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 用户名校验
 * @param {*} str 
 * @returns 
 */
export function checkUname(str) {
    let regExp = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !regExp.test(str);
}

/**
 * 密码校验
 * @param {*} str 
 * @returns 
 */
export function checkPwd(str) {
    let regExp = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !regExp.test(str);
}

/**
 * 验证码校验
 * @param {*} str 
 * @returns 
 */
export function checkCod(str) {
    let regExp = /^[a-zA-Z0-9]{6}$/;
    return !regExp.test(str);
}

/**
 * 仅使用 export 时，可以多次使用，当使用 import 引入时必须加花括号
 */
