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
      profile: {
        name: "Jake Gyll",
        title: "Product Designer",
        company: "Twitter",
        location: "Manchester, UK",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        about:
          "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
        email: "jakegyll@email.com",
        phone: "+44 1245 572 135",
        languages: ["English", "French"],
        socialLinks: [
          { platform: "Instagram", url: "instagram.com/jakegyll" },
          { platform: "Twitter", url: "twitter.com/jakegyll" },
          { platform: "Website", url: "www.jakegyll.com" },
        ],
        experiences: [
          {
            title: "Product Designer",
            company: "Twitter",
            type: "Full-Time",
            period: "Jun 2019 - Present (1y 1m)",
            location: "Manchester, UK",
            logo: "https://logo.clearbit.com/twitter.com",
            description:
              "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
          },
          {
            title: "Growth Marketing Designer",
            company: "GoDaddy",
            type: "Full-Time",
            period: "Jun 2011 - May 2019 (8y)",
            location: "Manchester, UK",
            logo: "https://logo.clearbit.com/godaddy.com",
            description:
              "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives",
          },
        ],
        moreExperiences: 3,
        education: [
          {
            id: 1,
            university: "Harvard University",
            degree: "Postgraduate degree, Applied Psychology",
            years: "2010 - 2012",
            logo: "https://logo.clearbit.com/harvard.edu",
            description:
              "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.",
          },
          {
            id: 2,
            university: "University of Toronto",
            degree: "Bachelor of Arts, Visual Communication",
            years: "2005 - 2009",
            logo: "https://logo.clearbit.com/utoronto.ca",
            description: "",
          },
        ],
        moreEducation: 2,
        skills: [
          "Communication",
          "Analytics",
          "Facebook Ads",
          "Content Planning",
          "Community Manager",
        ],
        portfolios: [
          {
            title: "Clinically - clinic & health care website",
            image: "https://via.placeholder.com/150/e8e8ff/333333?text=Health",
          },
          {
            title: "Growthy - SaaS Analytics & Sales Website",
            image: "https://via.placeholder.com/150/d8d8ff/333333?text=SaaS",
          },
          {
            title: "Planna - Project Management App",
            image: "https://via.placeholder.com/150/c8c8ff/333333?text=PM",
          },
          {
            title: "Furnio - furniture ecommerce",
            image: "https://via.placeholder.com/150/b8b8ff/333333?text=Ecom",
          },
        ],
      },
    };
  }, // Fixed: Added missing comma here

  methods: {
    updateProfile(updatedProfile) {
      this.profile = { ...this.profile, ...updatedProfile };
    },
    handleAddEducation(educationData) {
      this.profile.education.unshift(educationData);
      console.log("Added education:", educationData);
    },
    handleUpdateEducation(index, educationData) {
      this.profile.education.splice(index, 1, educationData);
      console.log("Updated education at index", index, ":", educationData);
    },
    handleDeleteEducation(index) {
      this.profile.education.splice(index, 1);
      console.log("Deleted education at index:", index);
    },

    // Skills management methods
    handleAddSkill(skill) {
      if (!this.profile.skills.includes(skill)) {
        this.profile.skills.push(skill);
        console.log("Added skill:", skill);
      }
    },

    handleRemoveSkill(index) {
      if (index >= 0 && index < this.profile.skills.length) {
        const removedSkill = this.profile.skills.splice(index, 1)[0];
        console.log("Removed skill:", removedSkill);
      }
    },

    // Portfolio management methods
    handleAddPortfolio(portfolioData) {
      this.profile.portfolios.unshift(portfolioData);
      console.log("Added portfolio:", portfolioData);
    },

    handleEditPortfolio(index) {
      // You can implement inline editing or open a modal
      console.log(
        "Edit portfolio at index:",
        index,
        this.profile.portfolios[index]
      );
      // For now, just log - you can expand this later
    },

    handleDeletePortfolio(index) {
      if (index >= 0 && index < this.profile.portfolios.length) {
        const removedPortfolio = this.profile.portfolios.splice(index, 1)[0];
        console.log("Removed portfolio:", removedPortfolio);
      }
    },
    handleSocialLinksSave(updatedLinks) {
      // Save to database or update parent state
      this.profile.socialLinks = updatedLinks;
    },

    // Add to your parent component methods
    handleAddExperience(experienceData) {
      this.profile.experiences.unshift(experienceData);
      console.log("Added experience:", experienceData);
    },

    handleUpdateExperience(index, experienceData) {
      this.profile.experiences.splice(index, 1, experienceData);
      console.log("Updated experience at index", index, ":", experienceData);
    },

    handleDeleteExperience(index) {
      this.profile.experiences.splice(index, 1);
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
