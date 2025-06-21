<template>
  <div class="d-flex">
    <div class="container py-4">
      <!-- Loading State -->
      <div v-if="userProfileStore.loading" class="text-center">
        <p>Loading profile...</p>
      </div>
      <!-- Error State -->
      <div v-else-if="userProfileStore.error" class="alert alert-danger">
        {{ userProfileStore.error }}
      </div>
      <!-- Profile Data -->
      <div v-else-if="userProfileStore.selectedProfile" class="row">
        <div class="col-md-8">
          <profile-header
            :profile="userProfileStore.selectedProfile"
            @update-profile="updateProfile"
          />
          <about-me :about="userProfileStore.selectedProfile.bio || ''" />
          <experience-section
            :experiences="userProfileStore.selectedProfile.workExperience || []"
            :more-count="3"
            @add-experience="handleAddExperience"
            @update-experience="handleUpdateExperience"
            @delete-experience="handleDeleteExperience"
          />
          <education-section
            :education="userProfileStore.selectedProfile.educationHistory || []"
            @add-education="handleAddEducation"
            @update-education="handleUpdateEducation"
            @delete-education="handleDeleteEducation"
          />
          <skills-section
            :skills="userProfileStore.selectedProfile.skillTags || []"
            @add-skill="handleAddSkill"
            @remove-skill="handleRemoveSkill"
          />
          <portfolio-section
            :portfolios="userProfileStore.selectedProfile.portfolios || []"
            @add-portfolio="handleAddPortfolio"
            @update-portfolio="handleUpdatePortfolio"
            @delete-portfolio="handleDeletePortfolio"
          />
        </div>
        <div class="col-md-4">
          <additional-details
            :email="userProfileStore.selectedProfile.email || 'Not specified'"
            :phone="userProfileStore.selectedProfile.phone || 'Not specified'"
            :languages="userProfileStore.selectedProfile.languages || []"
            @update-email="handleUpdateEmail"
            @update-phone="handleUpdatePhone"
            @update-languages="handleUpdateLanguages"
          />
          <social-links
            :social-links="userProfileStore.selectedProfile.socialLinks || []"
            @save-social-links="handleSaveSocialLinks"
          />
        </div>
      </div>
      <!-- No Profile Found -->
      <div v-else class="text-center py-4">
        <p>No profile data available. Please create a profile.</p>
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
import AdditionalDetails from "@/components/Applicants/Profile/AdditionalDetails.vue";
import PortfolioSection from "@/components/Applicants/Profile/PortfolioSection.vue";
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
    AdditionalDetails,
    PortfolioSection,
    SocialLinks,
  },
  setup() {
    const userProfileStore = useUserProfileStore();

    // Fetch profile data on mount
    onMounted(async () => {
      if (!userProfileStore.selectedProfile) {
        await userProfileStore.fetchProfile();
      }
      console.log("Mounted - Selected Profile:", userProfileStore.selectedProfile);
    });

    // Methods
    const updateProfile = async (updatedProfile) => {
      try {
        await userProfileStore.updateProfile(updatedProfile);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    };

    const handleUpdateEmail = async (email) => {
      try {
        await userProfileStore.updateProfile({ email });
      } catch (error) {
        console.error("Failed to update email:", error);
      }
    };

    const handleUpdatePhone = async (phone) => {
      try {
        await userProfileStore.updateProfile({ phone });
      } catch (error) {
        console.error("Failed to update phone:", error);
      }
    };

    const handleUpdateLanguages = async (languages) => {
      try {
        await userProfileStore.updateProfile({ languages });
      } catch (error) {
        console.error("Failed to update languages:", error);
      }
    };

    const handleAddEducation = async (educationData) => {
      try {
        await userProfileStore.addEducation(educationData);
      } catch (error) {
        console.error("Failed to add education:", error);
      }
    };

    const handleUpdateEducation = async (index, educationData) => {
      try {
        await userProfileStore.updateEducation(index, educationData);
      } catch (error) {
        console.error("Failed to update education:", error);
      }
    };

    const handleDeleteEducation = async (index) => {
      try {
        await userProfileStore.deleteEducation(index);
      } catch (error) {
        console.error("Failed to delete education:", error);
      }
    };

    const handleAddSkill = async (skill) => {
      try {
        await userProfileStore.addSkill({ skill });
      } catch (error) {
        console.error("Failed to add skill:", error);
      }
    };

    const handleRemoveSkill = async (index) => {
      try {
        await userProfileStore.removeSkill(index);
      } catch (error) {
        console.error("Failed to remove skill:", error);
      }
    };

    const handleAddPortfolio = async (portfolioData) => {
      try {
        await userProfileStore.addPortfolio(portfolioData);
      } catch (error) {
        console.error("Failed to add portfolio:", error);
      }
    };

    const handleUpdatePortfolio = async (index, portfolioData) => {
      try {
        await userProfileStore.updatePortfolio(index, portfolioData);
      } catch (error) {
        console.error("Failed to update portfolio:", error);
      }
    };

    const handleDeletePortfolio = async (index) => {
      try {
        await userProfileStore.deletePortfolio(index);
      } catch (error) {
        console.error("Failed to delete portfolio:", error);
      }
    };

    const handleSaveSocialLinks = async (socialLinks) => {
      try {
        await userProfileStore.saveSocialLinks(socialLinks);
      } catch (error) {
        console.error("Failed to save social links:", error);
      }
    };

    const handleAddExperience = async (experienceData) => {
      try {
        await userProfileStore.addExperience(experienceData);
      } catch (error) {
        console.error("Failed to add experience:", error);
      }
    };

    const handleUpdateExperience = async (index, experienceData) => {
      try {
        await userProfileStore.updateExperience(index, experienceData);
      } catch (error) {
        console.error("Failed to update experience:", error);
      }
    };

    const handleDeleteExperience = async (index) => {
      try {
        await userProfileStore.deleteExperience(index);
      } catch (error) {
        console.error("Failed to delete experience:", error);
      }
    };

    return {
      userProfileStore,
      updateProfile,
      handleUpdateEmail,
      handleUpdatePhone,
      handleUpdateLanguages,
      handleAddEducation,
      handleUpdateEducation,
      handleDeleteEducation,
      handleAddSkill,
      handleRemoveSkill,
      handleAddPortfolio,
      handleUpdatePortfolio,
      handleDeletePortfolio,
      handleSaveSocialLinks,
      handleAddExperience,
      handleUpdateExperience,
      handleDeleteExperience,
    };
  },
};
</script>

<style lang="scss" scoped>
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

@media (max-width: 768px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .row {
    flex-direction: column;
  }

  .col-md-8,
  .col-md-4 {
    max-width: 100%;
  }
}
</style>