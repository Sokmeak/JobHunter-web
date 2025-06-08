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
        meta: { title: "Job Hunter - Applicant Dashboard" },
      },
      {
        path: "messages",
        name: "Messages",
        component: Messages,
        meta: { title: "Job Hunter - Messages" },
        props: true,
      },
      {
        path: "my-applications",
        name: "Applications",
        component: MyApplications,
        meta: { title: "Job Hunter - My Applications" },
      },
      {
        path: "find-jobs",
        name: "ApplicantFindJobs",
        component: () => import("@/views/applicants/FindJob.vue"),
        props: true,
        meta: { title: "Job Hunter - Find Jobs" },
      },
      {
        path: "find-jobs/:id",
        name: "JobDescription-Applicant",
        props: true,
        component: () => import("@/views/applicants/JobDescription.vue"),
        meta: { title: "Job Hunter - Job Description" },
      },
      {
        path: "BrowseCompany",
        name: "ApplicantCompany",
        component: () => import("@/views/applicants/BrowseCompany.vue"),
        meta: { title: "Job Hunter - Browse Companies" },
        props: true,
      },

      {
        path: "BrowseCompany/:id",
        name: "CompanyProfile-Applicant",
        component: () => import("@/views/landing/CompanyProfile.vue"),
        meta: {
          title: "Job Hunter - Company Profile",
        },
        props: true,
      },
      {
        path: "profile",
        name: "Applicant-Profile",
        component: Profile,
        meta: { title: "Job Hunter - Profile" },
        props: true,
      },
      {
        path: "applicant-settings",
        name: "Applicant-Settings",
        component: Settings,
        meta: { title: "Job Hunter - Settings" },
        props: true,
      },

      {
        path: "applicant-help",
        name: "Help",
        component: HelpCenter,
        meta: { title: "Job Hunter - Help Center" },

        props: true,
      },
    ],
  },
];
