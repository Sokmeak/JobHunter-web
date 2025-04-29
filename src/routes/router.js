import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/views/Landing.vue";
import FindJobs from "@/pages/views/FindJobs.vue";
import BrowseCompanies from "@/pages/views/BrowseCompanies.vue";
import Layout from "@/pages/Layout.vue";
import UserDashboard from "@/pages/views/applicants/UserDashboard.vue";
import MyApplications from "@/pages/views/applicants/MyApplications.vue";

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

  {
    path:"/applicant/dashboard",
    name: "UserDashboard",
    component: UserDashboard,
    props: true,
  },

  {
    path:"/applicant/myapplications",
    name: "MyApplications",
    component: MyApplications,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
