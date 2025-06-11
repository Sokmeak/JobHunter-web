import AppLayout from "@/components/company/layout/AppLayout.vue";

// Main Company Views
import Dashboard from "@/views/company/Dashboard.vue";
import JobListing from "@/views/company/JobListing.vue";
import PostJob from "@/views/company/PostJob.vue";
import JobDetails from "@/views/company/JobDetails.vue";
import AllApplicants from "@/views/company/AllApplicants.vue";
import MySchedule from "@/views/company/MySchedule.vue";
import Settings from "@/views/company/Settings.vue";
import HelpCenter from "@/views/company/HelpCenter.vue";

// Settings Sub-Views
import CompanyProfile from "@/views/company/CompanyProfile.vue";
import AccountSetting from "@/views/company/AccountSetting.vue";
import TeamManagement from "@/views/company/TeamManagement.vue";
import BillingPlan from "@/views/company/BillingPlan.vue";
import Notifications from "@/views/company/Notifications.vue";
import Security from "@/views/company/Security.vue";
import Integrations from "@/views/company/Integrations.vue";
import ApiKeys from "@/views/company/ApiKeys.vue";

export default [
  {
    path: "/company",
    component: AppLayout,
    redirect: "/company/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "Dashboard", requiresAuth: true },
      },
      {
        path: "job-listing",
        name: "JobListing",
        component: JobListing,
        meta: { title: "Job Listings", requiresAuth: true },
      },
      {
        path: "post-job",
        name: "PostJob",
        component: PostJob,
        meta: { title: "Post New Job", requiresAuth: true },
      },
      {
        path: "job-details/:id",
        name: "JobDetails",
        component: JobDetails,
        props: true,
        meta: { title: "Job Details", requiresAuth: true },
      },
      {
        path: "all-applicants",
        name: "AllApplicants",
        component: AllApplicants,
        meta: { title: "All Applicants", requiresAuth: true },
      },
      {
        path: "schedule",
        name: "MySchedule",
        component: MySchedule,
        meta: { title: "My Schedule", requiresAuth: true },
      },
      {
        path: "settings",
        name: "Company-Settings",
        component: Settings,
        meta: { title: "Settings", requiresAuth: true },
        redirect: "/company/settings/profile",
        children: [
          {
            path: "profile",
            component: CompanyProfile,
          },
          {
            path: "account",
            component: AccountSetting,
          },
          {
            path: "team",
            component: TeamManagement,
          },
          {
            path: "billing",
            component: BillingPlan,
          },
          {
            path: "notifications",
            component: Notifications,
          },
          {
            path: "security",
            component: Security,
          },
          {
            path: "integrations",
            component: Integrations,
          },
          {
            path: "api",
            component: ApiKeys,
          },
        ],
      },
      {
        path: "help",
        name: "HelpCenter",
        component: HelpCenter,
        meta: { title: "Help Center", requiresAuth: true },
      },
    ],
  },
];
