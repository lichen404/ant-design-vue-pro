import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Error404 from "@/views/Error404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: () =>
      import(/* webpackChunkName:"layout" */ "../layouts/UserLayout"),
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName:"user" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName:"user" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName:"layout" */ "../layouts/BasicLayout"),
    children: [
      //dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: {
          render: h => h("router-view")
        },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      }
    ]
  },
  // form
  {
    path: "/form",
    name: "form",
    component: { render: h => h("router-view") },
    meta: { icon: "form", title: "表单" },
    children: [
      {
        path: "/form/basic-form",
        name: "basicForm",
        meta: { title: "基础表单" },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
      },
      {
        path: "/form/step-form",
        name: "stepForm",
        hideChildrenInMenu: true,
        meta: { title: "分布表单" },
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
        children: [
          {
            path: "/form/step-form",
            redirect: "/form/step-form/info"
          },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
              )
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
              )
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () =>
              import(
                /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
              )
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: Error404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
