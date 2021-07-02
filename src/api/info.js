import service from "@/utils/request";

/**
 * 编辑一级菜单
 * @param {*} data 
 * @returns 
 */
export function EditCategory(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}

/**
 * 添加一级菜单
 * @param {*} data 
 * @returns 
 */
export function AddFirstCategory(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}

/**
 * 获取一级菜单
 * @param {*} data 
 * @returns 
 */
export function GetCategory(data) {
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}

/**
 * 删除一级菜单
 * @param {*} data 
 * @returns 
 */
export function DeleteCategory(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}

/**
 * 添加新闻信息
 * @param {*} data 
 * @returns 
 */
export function AddNews(data) {
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}

/**
 * 获取新闻信息
 * @param {*} data 
 * @returns 
 */
export function GetNews(data) {
    return service.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

export function DeleteNews(data) {
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    })
}
