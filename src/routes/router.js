import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/views/landing/Landing.vue";
import FindJobs from "@/pages/views/landing/FindJobs.vue";
import BrowseCompanies from "@/pages/views/landing/BrowseCompanies.vue";
import Layout from "@/pages/Layout.vue";

const routes = [
  {
    path: "/",
    name: "Layout", // base route
    redirect: "/landing",
    component: Layout,
    children: [
      // the first child route
      {
        path: "landing",
        component: LandingPage,
        name: "LandingPage",
        props: true,
      },
      {
        path: "find-jobs",
        component: FindJobs,
        name: "FindJobs",
        props: true,
      },
      {
        path: "all-companies",
        component: BrowseCompanies,
        name: "BrowseCompanies",
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
