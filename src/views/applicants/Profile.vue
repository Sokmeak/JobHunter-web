<template>
  <div class="d-flex">
    <div class="container py-4">
      <!-- Error State -->
      <div v-if="userProfileStore.error" class="alert alert-danger">
        {{ userProfileStore.error }}
      </div>
      <!-- Profile Data -->
      <div v-else-if="userProfileStore.selectedProfile" class="row">
        <div class="col-md-8">
          <profile-header
            :profile="userProfileStore.selectedProfile"
            @update-profile="updateProfile"
          />
          <about-me :about="userProfileStore.selectedProfile.about" />
          <experience-section
            :experiences="userProfileStore.selectedProfile.experiences"
            :more-count="userProfileStore.selectedProfile.moreExperiences"
            @add-experience="handleAddExperience"
            @update-experience="handleUpdateExperience"
            @delete-experience="handleDeleteExperience"
          />
          <education-section
            :education="userProfileStore.selectedProfile.education"
            @add-education="handleAddEducation"
            @update-education="handleUpdateEducation"
            @delete-education="handleDeleteEducation"
          />
          <skills-section
            :skills="userProfileStore.selectedProfile.skills"
            @add-skill="handleAddSkill"
            @remove-skill="handleRemoveSkill"
          />
          <portfolio-section
            :portfolios="userProfileStore.selectedProfile.portfolios"
            @add-portfolio="handleAddPortfolio"
            @edit-portfolio="handleEditPortfolio"
            @delete-portfolio="handleDeletePortfolio"
          />
        </div>
        <div class="col-md-4">
          <additional-details
            :email="userProfileStore.selectedProfile.email"
            :phone="userProfileStore.selectedProfile.phone"
            :languages="userProfileStore.selectedProfile.languages"
          />
          <SocialLinks
            :social-links="userProfileStore.selectedProfile.socialLinks"
            @save-social-links="handleSocialLinksSave"
          />
        </div>
      </div>
      <!-- No Profile Found -->
      <div v-else class="text-center py-4">
        <p>No profile data available.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import ProfileHeader from "@/components/Applicants/Profile/ProfileHeader.vue";
import AboutMe from "@/components/Applicants/Profile/AboutMe.vue";
import ExperienceSection from "@/components/Applicants/Profile/ExperienceSection.vue";
import EducationSection from "@/components/Applicants/Profile/EducationSection.vue";
import SkillsSection from "@/components/Applicants/Profile/SkillsSection.vue";
import PortfolioSection from "@/components/Applicants/Profile/PortfolioSection.vue";
import AdditionalDetails from "@/components/Applicants/Profile/AdditionalDetails.vue";
import SocialLinks from "@/components/Applicants/Profile/SocialLinks.vue";
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";

export default {
  name: "Profile",
  components: {
    ProfileHeader,
    AboutMe,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    PortfolioSection,
    AdditionalDetails,
    SocialLinks,
  },
  setup() {
    const userProfileStore = useUserProfileStore();

    // Fetch profile data on mount
    onMounted(async () => {
      if (!userProfileStore.selectedProfile) {
        await userProfileStore.fetchProfileByUserId(userProfileStore.defaultUserId);
      }
    });

    return { userProfileStore };
  },
  computed: {
    profile() {
      return this.userProfileStore.selectedProfile;
    },
  },
  methods: {
    async updateProfile(updatedProfile) {
      await this.userProfileStore.updateProfile(this.userProfileStore.selectedProfile.userId, updatedProfile);
    },
    async handleAddEducation(educationData) {
      await this.userProfileStore.addEducation(this.userProfileStore.selectedProfile.userId, educationData);
    },
    async handleUpdateEducation(index, educationData) {
      await this.userProfileStore.updateEducation(this.userProfileStore.selectedProfile.userId, index, educationData);
    },
    async handleDeleteEducation(index) {
      await this.userProfileStore.deleteEducation(this.userProfileStore.selectedProfile.userId, index);
    },
    async handleAddSkill(skill) {
      await this.userProfileStore.addSkill(this.userProfileStore.selectedProfile.userId, skill);
    },
    async handleRemoveSkill(index) {
      await this.userProfileStore.removeSkill(this.userProfileStore.selectedProfile.userId, index);
    },
    async handleAddPortfolio(portfolioData) {
      await this.userProfileStore.addPortfolio(this.userProfileStore.selectedProfile.userId, portfolioData);
    },
    async handleEditPortfolio(index, portfolioData) {
      await this.userProfileStore.editPortfolio(this.userProfileStore.selectedProfile.userId, index, portfolioData);
    },
    async handleDeletePortfolio(index) {
      await this.userProfileStore.deletePortfolio(this.userProfileStore.selectedProfile.userId, index);
    },
    async handleSocialLinksSave(updatedLinks) {
      await this.userProfileStore.saveSocialLinks(this.userProfileStore.selectedProfile.userId, updatedLinks);
    },
    async handleAddExperience(experienceData) {
      await this.userProfileStore.addExperience(this.userProfileStore.selectedProfile.userId, experienceData);
    },
    async handleUpdateExperience(index, experienceData) {
      await this.userProfileStore.updateExperience(this.userProfileStore.selectedProfile.userId, index, experienceData);
    },
    async handleDeleteExperience(index) {
      await this.userProfileStore.deleteExperience(this.userProfileStore.selectedProfile.userId, index);
    },
  },
};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

.card {
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.btn-outline-primary {
  color: #6366f1;
  border-color: #6366f1;
}

.btn-outline-primary:hover {
  background-color: #6366f1;
  color: white;
}

.text-primary {
  color: #6366f1 !important;
}

.btn-link.text-primary {
  color: #6366f1 !important;
}
</style>