<template>
  <div class="d-flex">
    <div class="flex-grow-1 vh-100 overflow-auto">
      <DashboardHeader title="Profile" />
   
    <div class="row">
      <div class="col-md-8">
        <!-- Profile Header -->
        <div class="profile-header mb-4">
          <div class="profile-cover" style="background: linear-gradient(to right, #e6a8d7, #6a5acd);"></div>
          <div class="profile-info">
            <div class="profile-avatar">
              <img :src="profile.avatar" alt="Profile avatar" class="rounded-circle" />
            </div>
            <div class="profile-details">
              <h2 class="h4 mb-1">{{ profile.name }}</h2>
              <p class="text-muted mb-2">{{ profile.title }} at {{ profile.company }}</p>
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-geo-alt me-2"></i>
                <span>{{ profile.location }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm">Edit Profile</button>
            </div>
          </div>
          <div class="profile-status">
            <div class="status-badge">
              <i class="bi bi-check-circle me-2"></i>
              <span>OPEN FOR OPPORTUNITIES</span>
            </div>
          </div>
        </div>
        
        <!-- About Me Section -->
        <div class="profile-section mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">About Me</h3>
            <button class="btn btn-sm btn-link">
              <i class="bi bi-pencil-square"></i>
            </button>
          </div>
          <p>{{ profile.about }}</p>
          <p>{{ profile.experience }}</p>
        </div>
        
        <!-- Experiences Section -->
        <div class="profile-section mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">Experiences</h3>
            <button class="btn btn-sm btn-link">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          
          <div class="experience-item mb-4" v-for="(exp, index) in profile.experiences" :key="index">
            <div class="d-flex">
              <div class="experience-logo me-3">
                <img :src="exp.logo" :alt="exp.company + ' logo'" class="rounded" />
              </div>
              <div class="experience-details flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                  <h4 class="h6 mb-1">{{ exp.title }}</h4>
                  <button class="btn btn-sm btn-link">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </div>
                <p class="company-info mb-1">
                  {{ exp.company }} • {{ exp.type }} • {{ exp.period }}
                </p>
                <p class="location mb-2">{{ exp.location }}</p>
                <p class="description">{{ exp.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <button class="btn btn-link">Show {{ profile.moreExperiences }} more experiences</button>
          </div>
        </div>
        
        <!-- Education Section -->
        <div class="profile-section mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">Educations</h3>
            <button class="btn btn-sm btn-link">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          
          <div class="education-item mb-4" v-for="(edu, index) in profile.education" :key="index">
            <div class="d-flex">
              <div class="education-logo me-3">
                <img :src="edu.logo" :alt="edu.school + ' logo'" class="rounded" />
              </div>
              <div class="education-details flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                  <h4 class="h6 mb-1">{{ edu.school }}</h4>
                  <button class="btn btn-sm btn-link">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </div>
                <p class="degree-info mb-1">
                  {{ edu.degree }}
                </p>
                <p class="period mb-2">{{ edu.period }}</p>
                <p class="description">{{ edu.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <button class="btn btn-link">Show {{ profile.moreEducation }} more educations</button>
          </div>
        </div>
        
        <!-- Skills Section -->
        <div class="profile-section mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">Skills</h3>
            <div>
              <button class="btn btn-sm btn-link">
                <i class="bi bi-plus-lg"></i>
              </button>
              <button class="btn btn-sm btn-link">
                <i class="bi bi-pencil-square"></i>
              </button>
            </div>
          </div>
          
          <div class="skills-list">
            <span class="skill-tag" v-for="(skill, index) in profile.skills" :key="index">
              {{ skill }}
            </span>
          </div>
        </div>
        
        <!-- Portfolios Section -->
        <div class="profile-section">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">Portfolios</h3>
            <button class="btn btn-sm btn-link">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          
          <div class="row g-3">
            <div class="col-md-6 col-lg-3" v-for="(portfolio, index) in profile.portfolios" :key="index">
              <div class="portfolio-item">
                <div class="portfolio-image mb-2">
                  <img :src="portfolio.image" :alt="portfolio.title" class="img-fluid rounded" />
                </div>
                <h5 class="portfolio-title h6 mb-1">{{ portfolio.title }}</h5>
                <p class="portfolio-description small text-muted">{{ portfolio.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <!-- Additional Details Card -->
        <div class="profile-sidebar-card mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">Additional Details</h3>
            <button class="btn btn-sm btn-link">
              <i class="bi bi-pencil-square"></i>
            </button>
          </div>
          
          <div class="detail-item mb-3">
            <div class="d-flex align-items-start">
              <i class="bi bi-envelope me-3 mt-1"></i>
              <div>
                <p class="detail-label mb-0">Email</p>
                <p class="detail-value mb-0">{{ profile.email }}</p>
              </div>
            </div>
          </div>
          
          <div class="detail-item mb-3">
            <div class="d-flex align-items-start">
              <i class="bi bi-telephone me-3 mt-1"></i>
              <div>
                <p class="detail-label mb-0">Phone</p>
                <p class="detail-value mb-0">{{ profile.phone }}</p>
              </div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="d-flex align-items-start">
              <i class="bi bi-translate me-3 mt-1"></i>
              <div>
                <p class="detail-label mb-0">Languages</p>
                <p class="detail-value mb-0">{{ profile.languages.join(', ') }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Social Links Card -->
        <div class="profile-sidebar-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h3 class="h5 mb-0">Social Links</h3>
            <button class="btn btn-sm btn-link">
              <i class="bi bi-pencil-square"></i>
            </button>
          </div>
          
          <div class="detail-item mb-3" v-for="(social, index) in profile.socialLinks" :key="index">
            <div class="d-flex align-items-start">
              <i :class="`bi bi-${social.icon} me-3 mt-1`"></i>
              <div>
                <p class="detail-label mb-0">{{ social.platform }}</p>
                <p class="detail-value mb-0">{{ social.url }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DashboardHeader from '@/components/Applicants/layout/DashboardHeader.vue';
const profile = ref({
  name: 'Jake Gyll',
  title: 'Product Designer',
  company: 'Twitter',
  location: 'Manchester, UK',
  avatar: 'https://v0.dev/placeholder.svg?height=80&width=80',
  about: 'I\'m a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I\'m passionate about designing digital products that have a positive impact on the world.',
  experience: 'For 10 years, I\'ve specialized in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.',
  email: 'jakegyll@email.com',
  phone: '+44 1245 572 125',
  languages: ['English', 'French'],
  moreExperiences: 3,
  moreEducation: 2,
  experiences: [
    {
      title: 'Product Designer',
      company: 'Twitter',
      type: 'Full-Time',
      period: 'Jun 2019 - Present (1y 1m)',
      location: 'Manchester, UK',
      logo: 'https://logo.clearbit.com/Twitte.com',
      description: 'Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.'
    },
    {
      title: 'Growth Marketing Designer',
      company: 'GoDaddy',
      type: 'Full-Time',
      period: 'Jun 2011 - May 2019 (8y)',
      location: 'Manchester, UK',
      logo: 'https://logo.clearbit.com/Godaddy.com',
      description: 'Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives'
    }
  ],
  education: [
    {
      school: 'Harvard University',
      degree: 'Postgraduate degree, Applied Psychology',
      period: '2010 - 2012',
      logo: 'https://logo.clearbit.com/harvard.edu',
      description: 'As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analyzing, researching and changing behaviour.'
    },
    {
      school: 'University of Toronto',
      degree: 'Bachelor of Arts, Visual Communication',
      period: '2005 - 2009',
      logo: 'https://logo.clearbit.com/utoronto.ca',
      description: ''
    }
  ],
  skills: ['Communication', 'Analytics', 'Facebook Ads', 'Content Planning', 'Community Manager'],
  portfolios: [
    {
      title: 'Clinically - Clinic & health care website',
      description: '',
      image: 'https://example.com/images/image 3.png'
    },
    {
      title: 'Growthly - SaaS Analytics & Sales Website',
      description: '',
      image: 'https://v0.dev/placeholder.svg?height=150&width=250'
    },
    {
      title: 'Planna - Project Management App',
      description: '',
      image: 'https://v0.dev/placeholder.svg?height=150&width=250'
    },
    {
      title: 'Funro - furniture',
      description: '',
      image: 'https://v0.dev/placeholder.svg?height=150&width=250'
    }
  ],
  socialLinks: [
    {
      platform: 'Instagram',
      url: 'instagram.com/jakegyll',
      icon: 'instagram'
    },
    {
      platform: 'Twitter',
      url: 'twitter.com/jakegyll',
      icon: 'twitter'
    },
    {
      platform: 'Website',
      url: 'www.jakegyll.com',
      icon: 'globe'
    }
  ]
});
</script>

<style scoped>
.public-profile {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-header {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.profile-cover {
  height: 120px;
  width: 100%;
}

.profile-info {
  padding: 0 20px 20px;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
  overflow: hidden;
  margin-top: -50px;
  position: relative;
  z-index: 1;
  background-color: white;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-details {
  margin-left: 20px;
  flex-grow: 1;
}

.profile-status {
  padding: 0 20px 20px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #e8f5e9;
  color: #4caf50;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
}

.profile-section {
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.experience-logo, .education-logo {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.experience-logo img, .education-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-info, .location, .degree-info, .period {
  color: #6c757d;
  font-size: 14px;
}

.skill-tag {
  display: inline-block;
  padding: 6px 12px;
  background-color: #f1f3f5;
  color: #4640DE;
  border-radius: 100px;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.portfolio-item {
  height: 100%;
  transition: all 0.2s;
}

.portfolio-item:hover {
  transform: translateY(-5px);
}

.portfolio-image {
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-sidebar-card {
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.detail-label {
  color: #6c757d;
  font-size: 12px;
}

.detail-value {
  font-size: 14px;
}
</style>