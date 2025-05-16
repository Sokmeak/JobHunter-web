import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/landing/Landing.vue";
import FindJobs from "@/views/landing/FindJobs.vue";
import BrowseCompanies from "@/views/landing/BrowseCompanies.vue";
import Layout from "@/views/Layout.vue";
import Signup from "@/views/auth/Signup.vue";
import Signin from "@/views/auth/SignIn.vue";
import JobDescription from "@/views/landing/JobDescription.vue";
import CompanyProfile from "@/views/landing/CompanyProfile.vue";

const routes = [
  {
    path: "/test/load",
    name: "loader",
    component: () => import("@/components/Loader.vue"),
  },
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
    path: "/job-des",
    name: "job-des",
    component: () => import("@/components/job-description/JobDescription.vue"),
  },
  {},
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
        path: "jobDes",
        component: JobDescription,
        name: "Job Description",
        props: true,
      },
      {
        path: "/applicationform",
        name: "Application Form",
        component: () =>
          import("@/components/job-description/JobApplicationModel.vue"),
      },

      {
        path: "all-companies",
        component: BrowseCompanies,
        name: "BrowseCompanies",
        props: true,
        // children: [
        //   {
        //     path: ":companyId",
        //     component: CompanyProfile,
        //     name: "CompanyProfile",
        //     props: true,
        //   },
        // ],
      },
      {
        path: "company",
        component: CompanyProfile,
        name: "companyProfile",
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
