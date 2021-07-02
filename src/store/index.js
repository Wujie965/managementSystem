import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./moudles/app";
import login from "./moudles/login";
import category from "./moudles/category";
import news from "./moudles/news";

export default new Vuex.Store({
    modules: {
        app,
        login,
        category,
        news
    }
});
