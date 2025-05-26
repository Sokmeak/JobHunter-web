import { createRouter, createWebHistory } from "vue-router";

import authRoutes from "../routes/authRoutes";
import testRoutes from "../routes/testRoutes";
import applicantRoutes from "../routes/applicantRoutes";
import baseRoutes from "../routes/baseRoutes";
import adminRoutes from "../routes/adminRoutes";
import companyRoutes from "../routes/companyRoutes";

const routes = [
  ...companyRoutes,
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
