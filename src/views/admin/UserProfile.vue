<template>
    <div class="user-profile">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Users Management</h1>
          <p class="page-subtitle">Manage user accounts, verify users and handle suspensions</p>
        </div>
        <button class="finish-review-btn">
          <Clock class="btn-icon" />
          Finish Review
        </button>
      </div>
  
      <div class="profile-section">
        <div class="section-header">
          <h2 class="section-title">View Detail Info</h2>
        </div>
  
        <div class="profile-content">
          <UserProfileCard :user="userProfile" />
          <UserAboutSection :about="userProfile.about" />
          <UserExperienceSection :experiences="userProfile.experiences" />
          <UserEducationSection :educations="userProfile.educations" />
          <UserSkillsSection :skills="userProfile.skills" />
          <UserPortfolioSection :portfolios="userProfile.portfolios" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { Clock } from 'lucide-vue-next';
  import UserProfileCard from '@/components/Admin/Users/UserProfileCard.vue';
  import UserAboutSection from '@/components/Admin/Users/UserAboutSection.vue';
  import UserExperienceSection from '@/components/Admin/Users/UserExperienceSection.vue';
  import UserEducationSection from '@/components/Admin/Users/UserEducationSection.vue';
  import UserSkillsSection from '@/components/Admin/Users/UserSkillsSection.vue';
  import UserPortfolioSection from '@/components/Admin/Users/UserPortfolioSection.vue';
  
  const route = useRoute();
  
  const userProfile = ref({
    id: route.params.id,
    name: 'Jake Gyll',
    title: 'Product Designer at Twitter',
    location: 'Manchester, UK',
    status: 'OPEN FOR OPPORTUNITIES',
    avatar: '/placeholder.svg?height=120&width=120',
    about: "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
    experiences: [
      {
        id: 1,
        company: 'Twitter',
        position: 'Product Designer',
        type: 'Full-time',
        duration: 'Jun 2019 - Present (1y 1m)',
        location: 'Manchester, UK',
        description: 'Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement and leads.',
        logo: '/placeholder.svg?height=48&width=48'
      },
      {
        id: 2,
        company: 'GoDaddy',
        position: 'Growth Marketing Designer',
        type: 'Full-time',
        duration: 'Jun 2011 - May 2019 (8y)',
        location: 'Manchester, UK',
        description: 'Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives',
        logo: '/placeholder.svg?height=48&width=48'
      }
    ],
    educations: [
      {
        id: 1,
        institution: 'Harvard University',
        degree: 'Postgraduate degree, Applied Psychology',
        duration: '2010 - 2012',
        description: 'As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.',
        logo: '/placeholder.svg?height=48&width=48'
      },
      {
        id: 2,
        institution: 'University of Toronto',
        degree: 'Bachelor of Arts, Visual Communication',
        duration: '2005 - 2009',
        description: '',
        logo: '/placeholder.svg?height=48&width=48'
      }
    ],
    skills: [
      'Communication',
      'Analytics',
      'Facebook Ads',
      'Content Planning',
      'Community Manager'
    ],
    portfolios: [
      {
        id: 1,
        title: 'Clinically - clinic & health care website',
        image: '/placeholder.svg?height=200&width=300',
        category: 'Web Design'
      },
      {
        id: 2,
        title: 'GrowthX - SaaS Analytics & Sales Website',
        image: '/placeholder.svg?height=200&width=300',
        category: 'Web Design'
      },
      {
        id: 3,
        title: 'Planner - Project Management App',
        image: '/placeholder.svg?height=200&width=300',
        category: 'Mobile App'
      },
      {
        id: 4,
        title: 'Furno - Furniture Store',
        image: '/placeholder.svg?height=200&width=300',
        category: 'E-commerce'
      }
    ]
  });
  
  onMounted(() => {
    // In a real app, you would fetch user data based on route.params.id
    console.log('Loading user profile for ID:', route.params.id);
  });
  </script>
  
  <style scoped>
  .user-profile {
    padding: 0;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .page-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }
  
  .finish-review-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .finish-review-btn:hover {
    background-color: #4338ca;
  }
  
  .btn-icon {
    width: 16px;
    height: 16px;
  }
  
  .profile-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .section-header {
    padding: 16px 24px;
    background-color: #f8f9ff;
    border-radius: 8px;
    border: 1px solid #e0e7ff;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 500;
    color: #4f46e5;
    margin: 0;
  }
  
  .profile-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    
    .finish-review-btn {
      align-self: flex-start;
    }
  }
  </style>