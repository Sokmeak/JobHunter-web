import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/Signup.vue";
export default [
  {
    path: "/signin",
    name: "Signin",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp,
  },
];
