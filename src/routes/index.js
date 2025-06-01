import { createRouter, createWebHistory } from "vue-router";

import companyRoutes from "./companyRoutes";
import authRoutes from "./authRoutes";
import testRoutes from "./testRoutes";
import applicantRoutes from "./applicantRoutes";
import baseRoutes from "./baseRoutes";
import adminRoutes from "./adminRoutes";

const routes = [
  ...companyRoutes,
  ...authRoutes,
  ...testRoutes,
  ...applicantRoutes,
  ...baseRoutes,
  ...adminRoutes,
  { path: "/:catchAll(.*)", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
