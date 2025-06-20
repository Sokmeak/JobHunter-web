import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/Signup.vue";
export default [
  {
    path: "/signin",
    name: "Signin",
    component: SignIn,
    meta: { title: "Job Hunter - Sign In" },
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp,
    meta: { title: "Job Hunter - Sign Up" },
  },
];
