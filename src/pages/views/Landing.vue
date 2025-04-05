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
import HeroSection from "@/components/HeroSection.vue";
import CompaniesSection from "@/components/CompaniesSection.vue";
import CategorySection from "@/components/CategorySection.vue";
import JobPostingCTA from "@/components/JobPostingCTA.vue";
import FeaturedJobs from "@/components/FeaturedJob.vue";
import LatestJobs from "@/components/LatestJobs.vue";

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
