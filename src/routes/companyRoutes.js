import Dashboard from "@/views/company/Dashboard.vue";

export default [
  {
    path: "/company/dashboard",
    name: "CompanyDashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      role: "company",
    },
  },
  {
    path: "/company",
    redirect: "/company/dashboard",
  },
];
