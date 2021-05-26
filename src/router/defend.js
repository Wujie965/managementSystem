import router from "./index";
import store from "../store/index";

import { getToken, removeToken, removeUsername } from "@/utils/common";

const permitPage = ["/login"];

//路由守卫
router.beforeEach((to, form, next) => {
    if(getToken()) {
        if(to.path == "/login") {
            removeToken();
            removeUsername();
            store.commit("app/SET_TOKEN", "");
            store.commit("app/SET_USERNAME", "");
        }
        next();
        //如有动态添加，分配菜单，每个角色分配不同的菜单
    }
    else {
        permitPage.indexOf(to.path) === -1 ? next("/login") : next();
    }
});