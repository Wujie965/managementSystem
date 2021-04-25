import Vue from "vue";
//---------------  add composition-api -----------------
import VueCompositionApi from '@vue/composition-api';
//----------------------  end --------------------------
import App from "./App.vue";
import router from "./router";
import store from "./store";
//------------------  add element-ui -------------------
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
//----------------------  end --------------------------
//---------------  add composition-api -----------------
Vue.use(VueCompositionApi);
//----------------------  end --------------------------

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
