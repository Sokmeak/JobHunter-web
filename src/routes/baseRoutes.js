// import JobDescription from "@/views/landing/JobDescription.vue";
import CompanyProfile from "@/views/landing/CompanyProfile.vue";

import LandingPage from "../views/landing/Landing.vue";
import FindJobs from "@/views/landing/FindJobs.vue";
import BrowseCompanies from "@/views/landing/BrowseCompanies.vue";
import Layout from "@/views/Layout.vue";
export default [
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
        meta: { title: "Job Hunter - Home" },
        component: LandingPage,
      },
      {
        path: "jobs",
        name: "jobs",
        component: FindJobs,
        meta: { title: "Job Hunter - Find Jobs" },
      },

      {
        path: "jobs/:id",
        name: "JobDescription",
        component: () =>
          import("@/components/job-description/JobDescription.vue"),

        props: true,
        meta: { title: "Job Hunter - Job Description" },
      },
      {
        path: "/applicationform",
        name: "Application Form",
        component: () =>
          import("@/components/job-description/JobApplicationModel.vue"),
        meta: { title: "Job Hunter - Application Form" },
        beforeEnter: (to, from, next) => {
          if (!to.query.jobId) {
            return next({ name: "LandingPage" }); // Redirect to home or error page
          }
          next();
        },
      },

      {
        path: "all-companies",
        name: "all-companies",
        component: BrowseCompanies,
        meta: { title: "Job Hunter - Browse Companies" },
      },
      {
        path: "/company/:id",
        name: "CompanyProfile",
        component: CompanyProfile,
        beforeEnter: (to, from, next) => {
          if (!to.params.id) {
            return next({ name: "LandingPage" }); // Redirect to home or error page
          }
          next();
        },
        props: true,
        meta: { title: "Job Hunter - Company Profile" },
      },
    ],
  },
];
