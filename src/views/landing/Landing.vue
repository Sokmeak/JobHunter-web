<template>
  <div>
    <HeroSection />
    <CompaniesSection />
    <CategorySection />
    <JobPostingCTA />
    <FeaturedJobs />
    <LatestJobs />
  </div>
</template>

<script>
import HeroSection from "@/components/landing/HeroSection.vue";
import CompaniesSection from "@/components/landing/CompaniesSection.vue";
import CategorySection from "@/components/landing/CategorySection.vue";
import JobPostingCTA from "@/components/landing/JobPostingCTA.vue";
import FeaturedJobs from "@/components/landing/FeaturedJob.vue";
import LatestJobs from "@/components/landing/LatestJobs.vue";

export default {
  name: "Landing",
  components: {
    HeroSection,
    CompaniesSection,
    CategorySection,
    JobPostingCTA,
    FeaturedJobs,
    LatestJobs,
  },
};
</script>

<style></style>
