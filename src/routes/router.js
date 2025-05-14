import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/views/landing/Landing.vue";
import FindJobs from "@/pages/views/landing/FindJobs.vue";
import BrowseCompanies from "@/pages/views/landing/BrowseCompanies.vue";
import Layout from "@/pages/Layout.vue";
import Signup from "@/pages/auth/Signup.vue";
import Signin from "@/pages/auth/SignIn.vue";

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/signin",
    name: "signin",
    component: Signin,
  },
  {
    path: "/",
    name: "Layout", // base route
    redirect: "",
    component: Layout,
    children: [
      // the first child route
      {
        path: "",
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
