<template>
  <div class="d-flex">
    <div class="container py-4">
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      <div v-else-if="selectedProfile" class="row">
        <div class="col-md-8">
          <profile-header
            :profile="selectedProfile"
            @update-profile="updateProfile"
          />
          <about-me :about="selectedProfile?.about" />
          <experience-section
            :experiences="selectedProfile?.experiences"
            :more-count="selectedProfile?.moreExperiences"
            @add-experience="handleAddExperience"
            @update-experience="handleUpdateExperience"
            @delete-experience="handleDeleteExperience"
          />
          <education-section
            :education="selectedProfile?.education"
            @add-education="handleAddEducation"
            @update-education="handleUpdateEducation"
            @delete-education="handleDeleteEducation"
          />
          <skills-section
            :skills="selectedProfile?.skills"
            @add-skill="handleAddSkill"
            @remove-skill="handleRemoveSkill"
          />
          <portfolio-section
            :portfolios="selectedProfile?.portfolios"
            @add-portfolio="handleAddPortfolio"
            @edit-portfolio="handleEditPortfolio"
            @delete-portfolio="handleDeletePortfolio"
          />
        </div>
        <div class="col-md-4">
          <additional-details
            :email="selectedProfile?.email"
            :phone="selectedProfile?.phone"
            :languages="selectedProfile?.languages"
          />
          <social-links
            :social-links="selectedProfile?.socialLinks"
            @save-social-links="handleSocialLinksSave"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  name: "App",
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
    return { userProfileStore };
  },

  async created() {
    await this.userProfileStore.fetchAllProfiles();
    if (this.userProfileStore.userProfiles.length > 0) {
      await this.userProfileStore.fetchProfileByUserId(
        this.userProfileStore.userProfiles[0].userId
      );
      console.log("Fetched profile:", this.userProfileStore.selectedProfile);
    } else {
      console.warn("No profiles available");
      this.userProfileStore.error =
        "No profiles available. Please add a profile.";
    }
  },

  computed: {
    selectedProfile() {
      return this.userProfileStore.selectedProfile;
    },
    error() {
      return this.userProfileStore.error;
    },
  },

  methods: {
    async updateProfile(updatedProfile) {
      if (this.selectedProfile?.userId) {
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          updatedProfile
        );
        if (success) {
          console.log("Updated profile:", updatedProfile);
        } else {
          console.error(
            "Failed to update profile:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleAddEducation(educationData) {
      if (this.selectedProfile?.userId) {
        const updatedEducation = [
          ...(this.selectedProfile.education || []),
          { ...educationData, id: Date.now() },
        ];
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            education: updatedEducation,
          }
        );
        if (success) {
          console.log("Added education:", educationData);
        } else {
          console.error(
            "Failed to add education:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleUpdateEducation(index, educationData) {
      if (
        this.selectedProfile?.userId &&
        index >= 0 &&
        index < this.selectedProfile.education.length
      ) {
        const updatedEducation = [...this.selectedProfile.education];
        updatedEducation.splice(index, 1, educationData);
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            education: updatedEducation,
          }
        );
        if (success) {
          console.log("Updated education at index", index, ":", educationData);
        } else {
          console.error(
            "Failed to update education:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleDeleteEducation(index) {
      if (
        this.selectedProfile?.userId &&
        index >= 0 &&
        index < this.selectedProfile.education.length
      ) {
        const updatedEducation = [...this.selectedProfile.education];
        updatedEducation.splice(index, 1);
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            education: updatedEducation,
          }
        );
        if (success) {
          console.log("Deleted education at index:", index);
        } else {
          console.error(
            "Failed to delete education:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleAddSkill(skill) {
      if (
        this.selectedProfile?.userId &&
        skill &&
        !this.selectedProfile.skills.includes(skill)
      ) {
        const updatedSkills = [...(this.selectedProfile.skills || []), skill];
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            skills: updatedSkills,
          }
        );
        if (success) {
          console.log("Added skill:", skill);
        } else {
          console.error("Failed to add skill:", this.userProfileStore.error);
        }
      }
    },

    async handleRemoveSkill(index) {
      if (
        this.selectedProfile?.userId &&
        Number.isInteger(index) &&
        index >= 0 &&
        index < this.selectedProfile.skills.length
      ) {
        const updatedSkills = [...this.selectedProfile.skills];
        const removedSkill = updatedSkills.splice(index, 1)[0];
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            skills: updatedSkills,
          }
        );
        if (success) {
          console.log("Removed skill:", removedSkill);
        } else {
          console.error("Failed to remove skill:", this.userProfileStore.error);
        }
      } else {
        console.error("Invalid skill index or no profile selected:", index);
        this.userProfileStore.error =
          "Cannot remove skill: Invalid index or no profile selected";
      }
    },

    async handleAddPortfolio(portfolioData) {
      if (this.selectedProfile?.userId) {
        const updatedPortfolios = [
          ...(this.selectedProfile.portfolios || []),
          { ...portfolioData, id: Date.now() },
        ];
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            portfolios: updatedPortfolios,
          }
        );
        if (success) {
          console.log("Added portfolio:", portfolioData);
        } else {
          console.error(
            "Failed to add portfolio:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleEditPortfolio(index, portfolioData) {
      if (
        this.selectedProfile?.userId &&
        index >= 0 &&
        index < this.selectedProfile.portfolios.length
      ) {
        const updatedPortfolios = [...this.selectedProfile.portfolios];
        updatedPortfolios.splice(index, 1, portfolioData);
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            portfolios: updatedPortfolios,
          }
        );
        if (success) {
          console.log("Updated portfolio at index:", index, portfolioData);
        } else {
          console.error(
            "Failed to update portfolio:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleDeletePortfolio(index) {
      if (
        this.selectedProfile?.userId &&
        index >= 0 &&
        index < this.selectedProfile.portfolios.length
      ) {
        const updatedPortfolios = [...this.selectedProfile.portfolios];
        const removedPortfolio = updatedPortfolios.splice(index, 1)[0];
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            portfolios: updatedPortfolios,
          }
        );
        if (success) {
          console.log("Deleted portfolio:", removedPortfolio);
        } else {
          console.error(
            "Failed to delete portfolio:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleSocialLinksSave(updatedLinks) {
      if (this.selectedProfile?.userId) {
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            socialLinks: updatedLinks,
          }
        );
        if (success) {
          console.log("Updated social links:", updatedLinks);
        } else {
          console.error(
            "Failed to update social links:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleAddExperience(experienceData) {
      if (this.selectedProfile?.userId) {
        const updatedExperiences = [
          ...(this.selectedProfile.experiences || []),
          { ...experienceData, id: Date.now() },
        ];
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            experiences: updatedExperiences,
          }
        );
        if (success) {
          console.log("Added experience:", experienceData);
        } else {
          console.error(
            "Failed to add experience:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleUpdateExperience(index, experienceData) {
      if (
        this.selectedProfile?.userId &&
        index >= 0 &&
        index < this.selectedProfile.experiences.length
      ) {
        const updatedExperiences = [...this.selectedProfile.experiences];
        updatedExperiences.splice(index, 1, experienceData);
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            experiences: updatedExperiences,
          }
        );
        if (success) {
          console.log(
            "Updated experience at index",
            index,
            ":",
            experienceData
          );
        } else {
          console.error(
            "Failed to update experience:",
            this.userProfileStore.error
          );
        }
      }
    },

    async handleDeleteExperience(index) {
      if (
        this.selectedProfile?.userId &&
        index >= 0 &&
        index < this.selectedProfile.experiences.length
      ) {
        const updatedExperiences = [...this.selectedProfile.experiences];
        updatedExperiences.splice(index, 1);
        const success = await this.userProfileStore.updateUserProfile(
          this.selectedProfile.userId,
          {
            experiences: updatedExperiences,
          }
        );
        if (success) {
          console.log("Deleted experience at index:", index);
        } else {
          console.error(
            "Failed to delete experience:",
            this.userProfileStore.error
          );
        }
      }
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
