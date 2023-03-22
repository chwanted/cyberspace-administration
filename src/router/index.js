import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@views/user-center/index"),
    },
    {
      path: "/application",
      name: "application",
      component: () => import("@views/user-center/application"),
    },
    {
      path: "/application/success",
      name: "application-success",
      component: () => import("@views/user-center/applySuccess"),
    },
  ],
});

export default router;
