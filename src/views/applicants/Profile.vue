<template>
  <div class="d-flex">
  <!-- <div class="container py-4"> -->
  <div class="flex-grow-1 vh-100 overflow-auto">
     <DashboardHeader title="My Profile" />
    <div class="row">
      <div class="col-md-8">
     <profile-header :profile="profile" @update-profile="updateProfile" />
      <about-me :about="profile.about" />
        <experience-section :experiences="profile.experiences" :more-count="profile.moreExperiences" />
        <education-section :education="profile.education" :more-count="profile.moreEducation" />
        <skills-section :skills="profile.skills" />
        <portfolio-section :portfolios="profile.portfolios" />
      </div>
      <div class="col-md-4">
        <additional-details 
          :email="profile.email" 
          :phone="profile.phone" 
          :languages="profile.languages" 
        />
        <social-links :social-links="profile.socialLinks" />
      </div>
    </div>
  </div>
</div>
<!-- </div> -->
</template>

<script>
import ProfileHeader from "@/components/Applicants/Profile/ProfileHeader.vue"
import AboutMe from "@/components/Applicants/Profile/AboutMe.vue"
import ExperienceSection from "@/components/Applicants/Profile/ExperienceSection.vue"
import EducationSection from "@/components/Applicants/Profile/EducationSection.vue"
import SkillsSection from "@/components/Applicants/Profile/SkillsSection.vue"
import PortfolioSection from "@/components/Applicants/Profile/PortfolioSection.vue"
import AdditionalDetails from "@/components/Applicants/Profile/AdditionalDetails.vue"
import SocialLinks from "@/components/Applicants/Profile/SocialLinks.vue"
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
export default {
  name: 'App',
  components: {
    ProfileHeader,
    AboutMe,
    DashboardHeader,
    ExperienceSection,
    EducationSection,
    SkillsSection,
    PortfolioSection,
    AdditionalDetails,
    SocialLinks
  },
  
  data() {
    return {
      profile: {
        name: 'Jake Gyll',
        title: 'Product Designer',
        company: 'Twitter',
        location: 'Manchester, UK',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        about: "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
        email: 'jakegyll@email.com',
        phone: '+44 1245 572 135',
        languages: ['English', 'French'],
        socialLinks: [
          { platform: 'Instagram', url: 'instagram.com/jakegyll' },
          { platform: 'Twitter', url: 'twitter.com/jakegyll' },
          { platform: 'Website', url: 'www.jakegyll.com' }
        ],
        experiences: [
          {
            title: 'Product Designer',
            company: 'Twitter',
            type: 'Full-Time',
            period: 'Jun 2019 - Present (1y 1m)',
            location: 'Manchester, UK',
            logo: 'https://logo.clearbit.com/twitter.com',
            description: 'Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.'
          },
          {
            title: 'Growth Marketing Designer',
            company: 'GoDaddy',
            type: 'Full-Time',
            period: 'Jun 2011 - May 2019 (8y)',
            location: 'Manchester, UK',
            logo: 'https://logo.clearbit.com/godaddy.com',
            description: 'Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives'
          }
        ],
        moreExperiences: 3,
        education: [
          {
            university: 'Harvard University',
            degree: 'Postgraduate degree, Applied Psychology',
            years: '2010 - 2012',
            logo: 'https://logo.clearbit.com/harvard.edu',
            description: 'As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.'
          },
          {
            university: 'University of Toronto',
            degree: 'Bachelor of Arts, Visual Communication',
            years: '2005 - 2009',
            logo: 'https://logo.clearbit.com/utoronto.ca',
            description: ''
          }
        ],
        moreEducation: 2,
        skills: ['Communication', 'Analytics', 'Facebook Ads', 'Content Planning', 'Community Manager'],
        portfolios: [
          { 
            title: 'Clinically - clinic & health care website', 
            image: 'https://via.placeholder.com/150/e8e8ff/333333?text=Health' 
          },
          { 
            title: 'Growthy - SaaS Analytics & Sales Website', 
            image: 'https://via.placeholder.com/150/d8d8ff/333333?text=SaaS' 
          },
          { 
            title: 'Planna - Project Management App', 
            image: 'https://via.placeholder.com/150/c8c8ff/333333?text=PM' 
          },
          { 
            title: 'Furnio - furniture ecommerce', 
            image: 'https://via.placeholder.com/150/b8b8ff/333333?text=Ecom' 
          }
        ]
      }
    }
  }
}
</script>

<style>
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