import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import app from "./moudles/app";
import login from "./moudles/login";

export default new Vuex.Store({
  modules: {
    app,
    login
  }
});
