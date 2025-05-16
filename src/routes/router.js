import { createRouter, createWebHistory } from "vue-router";



import ApplicantLayout from "@/pages/views/applicants/ApplicantLayout.vue";
import UserDashboard from "@/pages/views/applicants/UserDashboard.vue";
import MyApplications from "@/pages/views/applicants/MyApplications.vue";
import Messages from "@/pages/views/applicants/Messages.vue";
import Profile from "@/pages/views/applicants/Profile.vue";
import Settings from "@/pages/views/applicants/setting.vue";
import HelpCenter from "@/pages/views/applicants/HelpCenter.vue";
import FindJob from "@/pages/views/applicants/FindJob.vue";
import BrowseCompany from "@/pages/views/applicants/BrowseCompany.vue";
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
    component: Layout,
    redirect: "/landing",
    name: "Layout", // base route
    redirect: "",
    component: Layout,
    children: [
      {
        path: "landing",
        name: "LandingPage",
        path: "",
        component: LandingPage,
      },
      {
        path: "find-jobs",
        name: "FindJobs",
        component: FindJobs,
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
        name: "BrowseCompanies",
        component: BrowseCompanies,
      },
    ],
  },
  {
    path: "/applicant",
    component: ApplicantLayout,
    redirect: "/applicant/dashboard",
    children: [
      {
        path: "dashboard",
        name: "UserDashboard",
        component: UserDashboard,
      },
      {
        path: "messages",
        name: "Messages",
        component: Messages,
      },
      {
        path: "my-applications",
        name: "Applications",
        component: MyApplications,
      },
      {
        path: "find-jobs",
        name: "ApplicantFindJobs",
        component: FindJob,
      },
      {
        path: "BrowseCompany",
        name: "ApplicantCompany",
        component: BrowseCompany,
      },
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
      },
      {
        path: "help",
        name: "Help",
        component: HelpCenter,
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
