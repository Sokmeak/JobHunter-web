import { createRouter, createWebHistory } from "vue-router";

import authRoutes from "./authRoutes";
import testRoutes from "./testRoutes";
import applicantRoutes from "./applicantRoutes";
import baseRoutes from "./baseRoutes";

const routes = [
  ...authRoutes,
  ...testRoutes,
  ...applicantRoutes,
  ...baseRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
