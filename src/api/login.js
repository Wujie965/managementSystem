import service from "@/utils/request"

/**
 * 获取验证码
 * @param {*} data 
 * @returns 
 */
export function GetSms(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data
    })
}

/**
 * 用户注册
 * @param {*} data 
 * @returns 
 */
export function Register(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}

/**
 * 用户登录
 * @param {*} data 
 * @returns 
 */
export function Login(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data
    })
}
