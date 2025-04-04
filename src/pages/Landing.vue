<template>
  <div>
    <NavBar />
    <HeroSection />
    <CompaniesSection />
    <CategorySection />
    <JobPostingCTA />
    <FeaturedJobs />
    <LatestJobs />
    <Footer> </Footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import HeroSection from "@/components/HeroSection.vue";
import CompaniesSection from "@/components/CompaniesSection.vue";
import CategorySection from "@/components/CategorySection.vue";
import JobPostingCTA from "@/components/JobPostingCTA.vue";
import FeaturedJobs from "@/components/FeaturedJob.vue";
import LatestJobs from "@/components/LatestJobs.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Landing",
  components: {
    NavBar,
    HeroSection,
    CompaniesSection,
    CategorySection,
    JobPostingCTA,
    FeaturedJobs,
    LatestJobs,
    Footer,
  },
};
</script>

<style></style>
