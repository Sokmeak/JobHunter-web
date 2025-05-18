export default [
  {
    path: "/test/load",
    name: "loader",
    component: () => import("@/components/Loader.vue"),
  },
];
