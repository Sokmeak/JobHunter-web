import { createRouter, createWebHistory } from "vue-router";

import Layout from "@/pages/Layout.vue";
import LandingPage from "@/pages/views/landing/Landing.vue";
import FindJobs from "@/pages/views/landing/FindJobs.vue";
import BrowseCompanies from "@/pages/views/landing/BrowseCompanies.vue";

import ApplicantLayout from "@/pages/views/applicants/ApplicantLayout.vue";
import UserDashboard from "@/pages/views/applicants/UserDashboard.vue";
import MyApplications from "@/pages/views/applicants/MyApplications.vue";
import Messages from "@/pages/views/applicants/Messages.vue";
import Profile from "@/pages/views/applicants/Profile.vue";
import Settings from "@/pages/views/applicants/setting.vue";
import HelpCenter from "@/pages/views/applicants/HelpCenter.vue";
import FindJob from "@/pages/views/applicants/FindJob.vue";
import BrowseCompany from "@/pages/views/applicants/BrowseCompany.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/landing",
    children: [
      {
        path: "landing",
        name: "LandingPage",
        component: LandingPage,
      },
      {
        path: "find-jobs",
        name: "FindJobs",
        component: FindJobs,
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
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
