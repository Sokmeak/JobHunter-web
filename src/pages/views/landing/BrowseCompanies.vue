<!-- <template>
  <div class="container">
    <div>
      <h1>Browse Companies Page</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Browse Companies</h2>
            <p>Explore companies that are hiring in your field.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>Browse Companies Page</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Browse Companies</h2>
            <p>Explore companies that are hiring in your field.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>Browse Companies Page</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Browse Companies</h2>
            <p>Explore companies that are hiring in your field.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>Browse Companies Page</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Browse Companies</h2>
            <p>Explore companies that are hiring in your field.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>Browse Companies Page</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Browse Companies</h2>
            <p>Explore companies that are hiring in your field.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="container py-4">
    <HeroSection />
    <RecommendedCompanyCardSection />
    <CompaniesByCategorySection />
  
  </div>
</template>

<script>
import HeroSection from "@/components/sharecomponents/HeroSection.vue";
import RecommendedCompanyCardSection from "@/components/browsecompany/RecommendedCompanyCardSection.vue";
import CompaniesByCategorySection from "@/components/browsecompany/CompaniesByCategorySection.vue";

export default {
  name: "BrowseCompanies",
  components: {
    HeroSection,
    CompaniesByCategorySection,
    RecommendedCompanyCardSection,
  },
};
</script>
<style lang="scss" scoped>
@use "@/style/variables.css" as *; // <-- important
</style>
