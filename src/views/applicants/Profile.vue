<template>
  <div class="d-flex">
    <div class="container py-4">
      <div class="row">
        <div class="col-md-8">
          <profile-header :profile="profile" @update-profile="updateProfile" />
          <about-me :about="profile.about" />
          <experience-section
            :experiences="profile.experiences"
            :more-count="profile.moreExperiences"
            @add-experience="handleAddExperience"
            @update-experience="handleUpdateExperience"
            @delete-experience="handleDeleteExperience"
          />
          <education-section
            :education="profile.education"
            @add-education="handleAddEducation"
            @update-education="handleUpdateEducation"
            @delete-education="handleDeleteEducation"
          />
          <skills-section
            :skills="profile.skills"
            @add-skill="handleAddSkill"
            @remove-skill="handleRemoveSkill"
          />
          <portfolio-section
            :portfolios="profile.portfolios"
            @add-portfolio="handleAddPortfolio"
            @edit-portfolio="handleEditPortfolio"
            @delete-portfolio="handleDeletePortfolio"
          />
        </div>
        <div class="col-md-4">
          <additional-details
            :email="profile.email"
            :phone="profile.phone"
            :languages="profile.languages"
          />
          <SocialLinks
            :social-links="profile.socialLinks"
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
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import { userStore } from "@/stores/ApplicantStore/userProfile.js";

export default {
  name: "App",
  components: {
    ProfileHeader,
    AboutMe,
    DashboardHeader,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    PortfolioSection,
    AdditionalDetails,
    SocialLinks,
  },

  data() {
    return {
      profile: userStore.getUserProfile(),
    };
  },

  methods: {
    updateProfile(updatedProfile) {
      this.profile = { ...this.profile, ...updatedProfile };
      userStore.updateUserProfile(this.profile);
    },

    handleAddEducation(educationData) {
      this.profile.education.unshift(educationData);
      userStore.updateUserProfile(this.profile);
      console.log("Added education:", educationData);
    },

    handleUpdateEducation(index, educationData) {
      this.profile.education.splice(index, 1, educationData);
      userStore.updateUserProfile(this.profile);
      console.log("Updated education at index", index, ":", educationData);
    },

    handleDeleteEducation(index) {
      this.profile.education.splice(index, 1);
      userStore.updateUserProfile(this.profile);
      console.log("Deleted education at index:", index);
    },

    handleAddSkill(skill) {
      if (!this.profile.skills.includes(skill)) {
        this.profile.skills.push(skill);
        userStore.updateUserProfile(this.profile);
        console.log("Added skill:", skill);
      }
    },

    handleRemoveSkill(index) {
      if (index >= 0 && index < this.profile.skills.length) {
        const removedSkill = this.profile.skills.splice(index, 1)[0];
        userStore.updateUserProfile(this.profile);
        console.log("Removed skill:", removedSkill);
      }
    },
        handleAddPortfolio(portfolioData) {
      this.profile.portfolios.unshift(portfolioData);
      userStore.updateUserProfile(this.profile);
      console.log("Added portfolio:", portfolioData);
    },

    handleEditPortfolio(index) {
      console.log(
        "Edit portfolio at index:",
        index,
        this.profile.portfolios[index]
      );
    },

    handleDeletePortfolio(index) {
      if (index >= 0 && index < this.profile.portfolios.length) {
        const removedPortfolio = this.profile.portfolios.splice(index, 1)[0];
        userStore.updateUserProfile(this.profile);
        console.log("Removed portfolio:", removedPortfolio);
      }
    },

    handleSocialLinksSave(updatedLinks) {
      this.profile.socialLinks = updatedLinks;
      userStore.updateUserProfile(this.profile);
    },

    handleAddExperience(experienceData) {
      this.profile.experiences.unshift(experienceData);
      userStore.updateUserProfile(this.profile);
      console.log("Added experience:", experienceData);
    },

    handleUpdateExperience(index, experienceData) {
      this.profile.experiences.splice(index, 1, experienceData);
      userStore.updateUserProfile(this.profile);
      console.log("Updated experience at index", index, ":", experienceData);
    },

    handleDeleteExperience(index) {
      this.profile.experiences.splice(index, 1);
      userStore.updateUserProfile(this.profile);
      console.log("Deleted experience at index:", index);
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