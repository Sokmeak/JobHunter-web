import DashboardLayout from "@/views/admin/DashboardLayout.vue";
import Dashboard from "@/views/admin/AdminDashboard.vue";
import UsersManagement from "@/views/admin/UsersManagement.vue";
import UserDetails from "@/views/admin/UserDetails.vue";
import UserEdit from "@/views/admin/UserEdit.vue";
import Analytics from "@/views/admin/Analytics.vue";
import Content from "@/views/admin/ContentModeration.vue";
import Settings from "@/views/admin/Setting.vue";
import AdminLogin from "@/views/auth/AdminLogin.vue";

export default [
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { title: "Admin Login" },
  },

  {
    path: "/admin",
    component: DashboardLayout,
    redirect: "/admin/login",
    children: [
      {
        path: "admindashboard",
        name: "admindashboard",
        component: Dashboard,
        meta: { title: "admindashboard" },
      },
      {
        path: "users",
        meta: { title: "Users Management" },
        children: [
          {
            path: "",
            name: "UsersManagement",
            component: UsersManagement,
            meta: { title: "Users Management" },
          },
          {
            path: ":id",
            name: "UserDetails",
            component: UserDetails,
            props: true,
            meta: { title: "User Details" },
          },
          {
            path: ":id/edit",
            name: "UserEdit",
            component: UserEdit,
            props: true,
            meta: { title: "Edit User" },
          },
        ],
      },
      {
        path: "content",
        name: "Content",
        component: Content,
        meta: { title: "Content Moderation" },
      },
      {
        path: "analytics",
        name: "Analytics",
        component: Analytics,
        meta: { title: "Platform Analytics" },
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
        meta: { title: "System Configurations" },
      },
    ],
  },
];
