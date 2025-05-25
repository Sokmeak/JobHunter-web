import { createRouter, createWebHistory } from "vue-router";

import authRoutes from "./authRoutes";
import testRoutes from "./testRoutes";
import applicantRoutes from "./applicantRoutes";
import baseRoutes from "./baseRoutes";
import adminRoutes from "./adminRoutes";

const routes = [
  ...authRoutes,
  ...testRoutes,
  ...applicantRoutes,
  ...baseRoutes,
  ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
