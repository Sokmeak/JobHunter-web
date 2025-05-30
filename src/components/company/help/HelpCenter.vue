<template>
<div class="help-center">
  <!-- Header -->
  <div class="text-center mb-5">
    <h2 class="mb-3 fw-bold">Help Center</h2>
    <p class="text-muted mb-4">Find answers to your questions and get support</p>
    
    <!-- Search Bar -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="position-relative">
          <i class="bi bi-search position-absolute search-icon"></i>
          <input 
            type="text" 
            class="form-control search-input" 
            placeholder="Search for help articles..."
            v-model="searchQuery"
          >
        </div>
      </div>
    </div>
  </div>

  <div class="row g-4">
    <!-- Help Categories -->
    <div class="col-lg-8">
      <!-- Quick Help Cards -->
      <div class="row g-3 mb-5">
        <div v-for="category in helpCategories" :key="category.id" class="col-md-4">
          <div class="card border-0 shadow-sm h-100 help-category-card" @click="selectCategory(category.id)">
            <div class="card-body p-4 text-center">
              <div class="help-icon mb-3">
                <i :class="category.icon" class="fs-1 text-primary"></i>
              </div>
              <h6 class="mb-2 fw-bold">{{ category.title }}</h6>
              <p class="text-muted small mb-0">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Frequently Asked Questions</h5>
          
          <div class="accordion" id="faqAccordion">
            <div v-for="(faq, index) in faqs" :key="faq.id" class="accordion-item border-0 mb-3">
              <h2 class="accordion-header">
                <button 
                  class="accordion-button collapsed fw-medium"
                  type="button" 
                  data-bs-toggle="collapse" 
                  :data-bs-target="`#faq${index}`"
                >
                  {{ faq.question }}
                </button>
              </h2>
              <div :id="`faq${index}`" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  {{ faq.answer }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Articles -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Popular Articles</h5>
          
          <div class="articles-list">
            <div v-for="article in popularArticles" :key="article.id" class="d-flex align-items-start mb-3 p-3 border rounded-3 article-item">
              <div class="article-icon me-3">
                <i class="bi bi-file-text text-primary fs-5"></i>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1 fw-medium">{{ article.title }}</h6>
                <p class="text-muted small mb-2">{{ article.excerpt }}</p>
                <div class="d-flex align-items-center gap-3">
                  <small class="text-muted">{{ article.readTime }} read</small>
                  <small class="text-muted">{{ article.views }} views</small>
                </div>
              </div>
              <button class="btn btn-sm btn-outline-primary">Read</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <!-- Contact Support -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Need More Help?</h6>
          <p class="text-muted small mb-3">Can't find what you're looking for? Our support team is here to help.</p>
          
          <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="contactSupport">
              <i class="bi bi-chat-dots me-2"></i>Contact Support
            </button>
            <button class="btn btn-outline-primary" @click="scheduleCall">
              <i class="bi bi-telephone me-2"></i>Schedule a Call
            </button>
            <button class="btn btn-outline-secondary" @click="sendFeedback">
              <i class="bi bi-envelope me-2"></i>Send Feedback
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Quick Links</h6>
          
          <div class="quick-links">
            <a href="#" class="d-flex align-items-center text-decoration-none mb-3 p-2 rounded quick-link">
              <i class="bi bi-play-circle me-3 text-primary"></i>
              <span>Video Tutorials</span>
            </a>
            <a href="#" class="d-flex align-items-center text-decoration-none mb-3 p-2 rounded quick-link">
              <i class="bi bi-download me-3 text-primary"></i>
              <span>User Guide (PDF)</span>
            </a>
            <a href="#" class="d-flex align-items-center text-decoration-none mb-3 p-2 rounded quick-link">
              <i class="bi bi-code-square me-3 text-primary"></i>
              <span>API Documentation</span>
            </a>
            <a href="#" class="d-flex align-items-center text-decoration-none mb-3 p-2 rounded quick-link">
              <i class="bi bi-people me-3 text-primary"></i>
              <span>Community Forum</span>
            </a>
          </div>
        </div>
      </div>

      <!-- System Status -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">System Status</h6>
          
          <div class="status-items">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span>Application System</span>
              <span class="badge bg-success-subtle text-success">Operational</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span>Email Notifications</span>
              <span class="badge bg-success-subtle text-success">Operational</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span>File Uploads</span>
              <span class="badge bg-warning-subtle text-warning">Degraded</span>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <span>API Services</span>
              <span class="badge bg-success-subtle text-success">Operational</span>
            </div>
          </div>
          
          <div class="mt-3">
            <a href="#" class="text-decoration-none small">View Status Page →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const helpCategories = ref([
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using JobHunter',
    icon: 'bi bi-rocket-takeoff'
  },
  {
    id: 'job-posting',
    title: 'Job Posting',
    description: 'How to create and manage job postings',
    icon: 'bi bi-briefcase'
  },
  {
    id: 'applicant-management',
    title: 'Applicant Management',
    description: 'Managing candidates and applications',
    icon: 'bi bi-people'
  },
  {
    id: 'interviews',
    title: 'Interviews',
    description: 'Scheduling and conducting interviews',
    icon: 'bi bi-calendar-check'
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    description: 'Understanding your hiring metrics',
    icon: 'bi bi-graph-up'
  },
  {
    id: 'account',
    title: 'Account & Billing',
    description: 'Account settings and billing questions',
    icon: 'bi bi-gear'
  }
])

const faqs = ref([
  {
    id: 1,
    question: 'How do I post a new job?',
    answer: 'To post a new job, navigate to the Job Listing page and click the "Post New Job" button. Fill in the required information including job title, description, requirements, and other details. Once submitted, your job will be reviewed and published.'
  },
  {
    id: 2,
    question: 'How can I manage applicants for my jobs?',
    answer: 'You can manage applicants through the Applicants section. Here you can view all applications, move candidates through different stages of your hiring process, schedule interviews, and communicate with candidates.'
  },
  {
    id: 3,
    question: 'Can I schedule interviews directly through the platform?',
    answer: 'Yes, you can schedule interviews using our built-in scheduling system. Go to the Schedule section or use the quick actions in the applicant management area to set up interviews with candidates.'
  },
  {
    id: 4,
    question: 'How do I upgrade my subscription plan?',
    answer: 'To upgrade your plan, go to Settings > Billing and select the plan that best fits your needs. You can upgrade or downgrade at any time, and changes will be reflected in your next billing cycle.'
  },
  {
    id: 5,
    question: 'What analytics are available?',
    answer: 'Our analytics dashboard provides insights into job performance, application rates, candidate sources, time-to-hire metrics, and more. You can access detailed reports for each job posting and overall hiring performance.'
  }
])

const popularArticles = ref([
  {
    id: 1,
    title: 'Setting up your first job posting',
    excerpt: 'A comprehensive guide to creating effective job postings that attract the right candidates.',
    readTime: '5 min',
    views: '1.2k'
  },
  {
    id: 2,
    title: 'Best practices for candidate screening',
    excerpt: 'Learn how to efficiently screen candidates and identify the best fits for your roles.',
    readTime: '8 min',
    views: '890'
  },
  {
    id: 3,
    title: 'Using the applicant pipeline effectively',
    excerpt: 'Maximize your hiring efficiency with our pipeline management features.',
    readTime: '6 min',
    views: '756'
  },
  {
    id: 4,
    title: 'Interview scheduling and management',
    excerpt: 'Streamline your interview process with automated scheduling and reminders.',
    readTime: '4 min',
    views: '623'
  }
])

const selectCategory = (categoryId) => {
  console.log('Selected category:', categoryId)
}

const contactSupport = () => {
  console.log('Contact support')
}

const scheduleCall = () => {
  console.log('Schedule call')
}

const sendFeedback = () => {
  console.log('Send feedback')
}
</script>

<style scoped>
.search-input {
  padding-left: 2.5rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 12px 20px 12px 2.5rem;
}

.search-input:focus {
  background-color: white;
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.search-icon {
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 0.875rem;
  z-index: 5;
}

.help-category-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.help-category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.help-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accordion-button {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px !important;
}

.accordion-button:not(.collapsed) {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
}

.accordion-button:focus {
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.article-item:hover {
  border-color: #6366f1 !important;
  background-color: #f8fafc;
}

.quick-link:hover {
  background-color: #f8fafc;
  color: #6366f1;
}

.status-items {
  font-size: 0.875rem;
}
</style>
