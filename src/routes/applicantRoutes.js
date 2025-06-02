import ApplicantLayout from "@/views/applicants/ApplicantLayout.vue";
import UserDashboard from "@/views/applicants/UserDashboard.vue";
import MyApplications from "@/views/applicants/MyApplications.vue";
import Messages from "@/views/applicants/Messages.vue";
import Profile from "@/views/applicants/Profile.vue";
import Settings from "@/views/applicants/setting.vue";
import HelpCenter from "@/views/applicants/HelpCenter.vue";

export default [
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
        component: () => import("@/views/applicants/FindJob.vue"),
        props: true,
      },
      {
        path: "find-jobs/:id",
        name: "JobDescription-Applicant",
        props: true,
        component: () => import("@/views/applicants/JobDescription.vue"),
      },
      {
        path: "BrowseCompany",
        name: "ApplicantCompany",
        component: () => import("@/views/applicants/BrowseCompany.vue"),
      },
      {
        path: "profile",
        name: "Applicant-Profile",
        component: Profile,
      },
      {
        path: "applicant-settings",
        name: "Applicant-Settings",
        component: Settings,
      },

      {
        path: "applicant-help",
        name: "Help",
        component: HelpCenter,

        props: true,
      },
    ],
  },
];
