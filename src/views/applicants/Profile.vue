<template>
  <div class="d-flex">
    <div class="container py-4">
      <!-- Error State -->
      <div v-if="userProfileStore.error" class="alert alert-danger">
        {{ userProfileStore.error }}
      </div>
      <!-- Profile Data -->
      <div v-if="userProfileStore.selectedProfile" class="row">
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
            :email="userProfileStore.selectedProfile.email || 'Not specified'"
            :phone="userProfileStore.selectedProfile.phone || 'Not specified'"
            :languages="userProfileStore.selectedProfile.languages || 'Not specified'"
            @update-email="handleUpdateEmail"
            @update-phone="handleUpdatePhone"
            @update-languages="handleUpdateLanguages"
          />
          <social-links
            :social-links="userProfileStore.selectedProfile.socialLinks"
            @save-social-links="handleSocialLinksSave"
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
      if (!userProfileStore.userProfiles.length) {
        await userProfileStore.fetchAllProfiles();
      }
      if (!userProfileStore.selectedProfile) {
        await userProfileStore.fetchProfileByUserId(userProfileStore.defaultUserId);
      }
      console.log("Mounted - Selected Profile:", userProfileStore.selectedProfile);
      $emit("update-page-title", "My Public Profile");
    });

    // Methods
    const updateProfile = async (updatedProfile) => {
      try {
        await userProfileStore.updateProfile(userProfileStore.selectedProfile.userId, updatedProfile);
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    };

    const handleUpdateEmail = async (email) => {
      try {
        await userProfileStore.updateProfile(userProfileStore.selectedProfile.userId, { email });
      } catch (error) {
        console.error("Failed to update email:", error);
      }
    };

    const handleUpdatePhone = async (phone) => {
      try {
        await userProfileStore.updateProfile(userProfileStore.selectedProfile.userId, { phone });
      } catch (error) {
        console.error("Failed to update phone:", error);
      }
    };

    const handleUpdateLanguages = async (languages) => {
      try {
        await userProfileStore.updateProfile(userProfileStore.selectedProfile.userId, { languages });
      } catch (error) {
        console.error("Failed to update languages:", error);
      }
    };

    const handleAddEducation = async (educationData) => {
      try {
        await userProfileStore.addEducation(userProfileStore.selectedProfile.userId, educationData);
      } catch (error) {
        console.error("Failed to add education:", error);
      }
    };

    const handleUpdateEducation = async (index, educationData) => {
      try {
        await userProfileStore.updateEducation(userProfileStore.selectedProfile.userId, index, educationData);
      } catch (error) {
        console.error("Failed to update education:", error);
      }
    };

    const handleDeleteEducation = async (index) => {
      try {
        await userProfileStore.deleteEducation(userProfileStore.selectedProfile.userId, index);
      } catch (error) {
        console.error("Failed to delete education:", error);
      }
    };

    const handleAddSkill = async (skill) => {
      try {
        await userProfileStore.addSkill(userProfileStore.selectedProfile.userId, skill);
      } catch (error) {
        console.error("Failed to add skill:", error);
      }
    };

    const handleRemoveSkill = async (index) => {
      try {
        await userProfileStore.removeSkill(userProfileStore.selectedProfile.userId, index);
      } catch (error) {
        console.error("Failed to remove skill:", error);
      }
    };

    const handleAddPortfolio = async (portfolioData) => {
      try {
        await userProfileStore.addPortfolio(userProfileStore.selectedProfile.userId, portfolioData);
      } catch (error) {
        console.error("Failed to add portfolio:", error);
      }
    };

    const handleEditPortfolio = async (index, portfolioData) => {
      try {
        await userProfileStore.editPortfolio(userProfileStore.selectedProfile.userId, index, portfolioData);
      } catch (error) {
        console.error("Failed to edit portfolio:", error);
      }
    };

    const handleDeletePortfolio = async (index) => {
      try {
        await userProfileStore.deletePortfolio(userProfileStore.selectedProfile.userId, index);
      } catch (error) {
        console.error("Failed to delete portfolio:", error);
      }
    };

    const handleSocialLinksSave = async (updatedLinks) => {
      try {
        await userProfileStore.saveSocialLinks(userProfileStore.selectedProfile.userId, updatedLinks);
      } catch (error) {
        console.error("Failed to save social links:", error);
      }
    };

    const handleAddExperience = async (experienceData) => {
      try {
        await userProfileStore.addExperience(userProfileStore.selectedProfile.userId, experienceData);
      } catch (error) {
        console.error("Failed to add experience:", error);
      }
    };

    const handleUpdateExperience = async (index, experienceData) => {
      try {
        await userProfileStore.updateExperience(userProfileStore.selectedProfile.userId, index, experienceData);
      } catch (error) {
        console.error("Failed to update experience:", error);
      }
    };

    const handleDeleteExperience = async (index) => {
      try {
        await userProfileStore.deleteExperience(userProfileStore.selectedProfile.userId, index);
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
      handleEditPortfolio,
      handleDeletePortfolio,
      handleSocialLinksSave,
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

/* Responsive adjustments */
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