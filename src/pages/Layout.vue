<template>
  <div class="layout">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Landing from "./views/Landing.vue";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    NavBar,
    Landing,
    Footer,
  },
};
</script>
<style>
.layout {
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
