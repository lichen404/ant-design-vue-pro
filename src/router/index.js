import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Error404 from "@/views/Error404";
import Error403 from "@/views/Error403";
import { findLast } from "lodash";
import { check, isLogin } from "@/utils/auth";
import { notification } from "ant-design-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
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
    meta: {
      authority: ["user", "admin"]
    },

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
        meta: {
          icon: "dashboard",
          title: "仪表盘"
        },

        component: {
          render: h => h("router-view")
        },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
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
    component: () =>
      import(/* webpackChunkName:"layout" */ "../layouts/BasicLayout"),
    meta: { icon: "form", title: "表单", authority: ["admin"] },
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
          import(
            /* webpackChunkName: "form" */ "../views/Forms/StepForm/index"
          ),
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
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Error403
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
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
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "403 Forbidden"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
