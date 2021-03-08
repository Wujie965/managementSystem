import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/Login/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: Login
    component: () => import("../views/Login/index.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
