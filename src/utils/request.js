import axios from "axios";
import { Message } from "element-ui";
import { getToken, getUsername } from "@/utils/common";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/adminApi"

//创建一个 axios 实例，并将该实例赋给一个变量
const service = axios.create({
    baseURL: BASEURL,   //请求地址
    timeout: 10000      //请求超时时间
    // ,
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers["Tokey"] = getToken();
    config.headers["UserName"] = getUsername();

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 获取响应数据
    let data = response.data;

    //解析响应数据，若存在错误，则抛出错误，否则返回响应数据
    if(data.resCode != 0) {
        return Promise.reject(data);
    }

    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;

/**
 * 使用 export default 时，有且仅能使用一次，当使用 import 引入时可不加花括号
 */
