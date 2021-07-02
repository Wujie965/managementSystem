import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/Login/index.vue";

Vue.use(VueRouter);

import Admin from "@/views/Admin";

const routes = [
  {
    path: "/",
    redirect: "login",
    isDisplay: false,
    meta: {
      name: "系统首页"
    }
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: Login
    isDisplay: false,
    meta: {
      name: "登录/注册"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    isDisplay: true,
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: Admin,
    children: [
    {
      path: "/index",
      name: "Index",
      isDisplay: true,
      meta: {
        name: "首页"
      },
      component: () => import("../views/Console/index.vue")
    }]
  },
  {
    path: "/info",
    name: "Info",
    isDisplay: true,
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: Admin,
    children: [
    {
      path: "/infoList",
      name: "InfoList",
      isDisplay: true,
      meta: {
        name: "信息列表"
      },
      component: () => import("../views/Info/index.vue")
    },
    {
      path: "/infoCategory",
      name: "InfoCategory",
      isDisplay: true,
      meta: {
        name: "信息分类"
      },
      component: () => import("../views/Info/category.vue")
    }]
  },
  {
    path: "/user",
    name: "User",
    isDisplay: true,
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Admin,
    children: [
    {
      path: "/userIndex",
      name: "UserIndex",
      isDisplay: true,
      meta: {
        name: "用户列表"
      },
      component: () => import("../views/User/index.vue")
    }]
  }
];

const router = new VueRouter({
  routes
});

export default router;
