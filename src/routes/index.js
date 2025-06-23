import { createRouter, createWebHistory } from "vue-router";

import companyRoutes from "./companyRoutes";
import authRoutes from "./authRoutes";

import applicantRoutes from "./applicantRoutes";
import baseRoutes from "./baseRoutes";
import adminRoutes from "./adminRoutes";

const routes = [
  ...companyRoutes,
  ...authRoutes,

  ...applicantRoutes,
  ...baseRoutes,
  ...adminRoutes,
  { path: "/:catchAll(.*)", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Job Hunter"; // Fallback title
  next();
});

export default router;
