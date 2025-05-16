<template>
  <div class="sd-flex">
    <!-- Header -->
    <div class="flex-grow-1 vh-100 overflow-auto">
      <DashboardHeader title="Help Center" />

    <div class="row">
      <!-- Left Column - Topics and Search -->
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="mb-3">
          <label class="form-label">Type your question or search keyword</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Search" 
              v-model="searchQuery"
              @input="searchArticles"
            />
          </div>
        </div>

        <!-- Help Topics -->
        <div class="help-topics">
          <div 
            v-for="topic in helpTopics" 
            :key="topic.id"
            class="help-topic-item"
            :class="{ 'active': activeTopic === topic.id }"
            @click="activeTopic = topic.id"
          >
            {{ topic.title }}
          </div>
        </div>

        <!-- Contact Support -->
        <div class="contact-support mt-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title">Didn't find what you were looking for?</h5>
              <p class="card-text">Contact our customer service</p>
              <button class="btn btn-light" @click="openContactForm">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Articles -->
      <div class="col-md-8">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span>Sort by:</span>
          <div class="dropdown">
            <button 
              class="btn btn-outline-secondary dropdown-toggle" 
              type="button" 
              id="sortDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              {{ sortOption }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="sortDropdown">
              <li v-for="option in sortOptions" :key="option">
                <a 
                  class="dropdown-item" 
                  href="#" 
                  @click.prevent="sortOption = option"
                >
                  {{ option }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Articles -->
        <div class="articles">
          <div v-for="article in filteredArticles" :key="article.id" class="article-card mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                  <h5 class="card-title">{{ article.title }}</h5>
                  <button class="btn btn-sm btn-link text-muted" @click="toggleArticleOptions(article.id)">
                    <i class="bi bi-three-dots"></i>
                  </button>
                </div>
                <p class="card-text">{{ article.content }}</p>
                
                <div class="article-feedback mt-3 pt-3 border-top">
                  <span class="me-2">Was this article helpful?</span>
                  <button 
                    class="btn btn-sm btn-outline-primary me-2" 
                    :class="{ 'active': article.feedback === 'yes' }"
                    @click="provideArticleFeedback(article.id, 'yes')"
                  >
                    <i class="bi bi-hand-thumbs-up me-1"></i> Yes
                  </button>
                  <button 
                    class="btn btn-sm btn-outline-primary" 
                    :class="{ 'active': article.feedback === 'no' }"
                    @click="provideArticleFeedback(article.id, 'no')"
                  >
                    <i class="bi bi-hand-thumbs-down me-1"></i> No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Finish Preview Button -->
        <div class="d-flex justify-content-end mt-4">
          <button class="btn btn-primary">
            <i class="bi bi-check-circle me-2"></i>
            Finish Preview
          </button>
        </div>
      </div>
    </div>

    <!-- Contact Form Modal -->
    <div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contactModalLabel">Contact Support</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitContactForm">
              <div class="mb-3">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" class="form-control" id="subject" v-model="contactForm.subject" required>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea class="form-control" id="message" rows="5" v-model="contactForm.message" required></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="submitContactForm">Submit</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from '@/components/Applicants/layout/DashboardHeader.vue';
import * as bootstrap from 'bootstrap';
export default {
  name: 'HelpCenter',
  components: {
  DashboardHeader,
  },
  data() {
    return {
      searchQuery: '',
      activeTopic: 'getting-started',
      sortOption: 'Most relevant',
      sortOptions: ['Most relevant', 'Newest', 'Oldest'],
      contactForm: {
        subject: '',
        message: ''
      },
      helpTopics: [
        { id: 'getting-started', title: 'Getting Started' },
        { id: 'my-profile', title: 'My Profile' },
        { id: 'applying-for-job', title: 'Applying for a job' },
        { id: 'job-search-tips', title: 'Job Search Tips' },
        { id: 'job-alerts', title: 'Job Alerts' }
      ],
      articles: [
        {
          id: 1,
          topicId: 'my-profile',
          title: 'What is My Applications?',
          content: 'My Applications is a way for you to track jobs as you move through the application process. Depending on the job you applied to, you may also receive notifications indicating that an application has been actioned by an employer.',
          feedback: null
        },
        {
          id: 2,
          topicId: 'my-profile',
          title: 'How to access my applications history',
          content: 'To access applications history, go to your My Applications page on your dashboard profile. You must be signed in to your JobHuntly account to view this page.',
          feedback: null
        },
        {
          id: 3,
          topicId: 'my-profile',
          title: 'Not seeing jobs you applied in your my application list?',
          content: 'Please note that we are unable to track materials submitted for jobs you apply to via an employer\'s site. As a result, these applications are not recorded in the My Applications section of your JobHuntly account. We suggest keeping a personal record of all positions you have applied to externally.',
          feedback: null
        },
        {
          id: 4,
          topicId: 'applying-for-job',
          title: 'How to apply for a job',
          content: 'To apply for a job, navigate to the job listing page and click on the "Apply" button. You will be prompted to complete an application form and submit your resume.',
          feedback: null
        },
        {
          id: 5,
          topicId: 'job-search-tips',
          title: 'How to optimize your job search',
          content: 'Use filters to narrow down your search results. You can filter by location, job type, salary range, and more. Save your searches to receive notifications when new jobs matching your criteria are posted.',
          feedback: null
        }
      ]
    };
  },
  computed: {
    filteredArticles() {
      let filtered = this.articles;
      
      // Filter by topic
      if (this.activeTopic) {
        filtered = filtered.filter(article => article.topicId === this.activeTopic);
      }
      
      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(query) || 
          article.content.toLowerCase().includes(query)
        );
      }
      
      // Sort articles
      if (this.sortOption === 'Newest') {
        filtered = [...filtered].sort((a, b) => b.id - a.id);
      } else if (this.sortOption === 'Oldest') {
        filtered = [...filtered].sort((a, b) => a.id - b.id);
      }
      
      return filtered;
    }
  },
  methods: {
    searchArticles() {
      // This method can be expanded if needed
      // Currently the filtering is handled by the computed property
    },
    toggleArticleOptions(articleId) {
      // This would show a dropdown with options like "Share", "Print", etc.
      console.log(`Toggle options for article ${articleId}`);
    },
    provideArticleFeedback(articleId, feedback) {
      const article = this.articles.find(a => a.id === articleId);
      if (article) {
        article.feedback = feedback;
        console.log(`Article ${articleId} feedback: ${feedback}`);
        // Here you would typically send this feedback to your backend
      }
    },
    openContactForm() {
      // Using Bootstrap's modal
      const modal = new bootstrap.Modal(document.getElementById('contactModal'));
      modal.show();
    },
    submitContactForm() {
      console.log('Contact form submitted:', this.contactForm);
      // Here you would send the form data to your backend
      
      // Reset form and close modal
      this.contactForm = {
        subject: '',
        message: ''
      };
      
      const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
      if (modal) {
        modal.hide();
      }
      
      // Show success message
      alert('Your message has been sent. We will get back to you soon.');
    }
  }
};
</script>

<style scoped>
.help-center-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
}

.help-topics {
  margin-top: 20px;
}

.help-topic-item {
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 5px;
  transition: background-color 0.2s;
}

.help-topic-item:hover {
  background-color: #f8f9fa;
}

.help-topic-item.active {
  background-color: #e9ecef;
  font-weight: 500;
  color: #6366f1;
  border-left: 3px solid #6366f1;
}

.article-card .card {
  border-radius: 8px;
  transition: box-shadow 0.3s;
}

.article-card .card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.article-feedback .btn.active {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
}

.contact-support .card {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border: none;
  border-radius: 8px;
}

.btn-outline-primary {
  color: #6366f1;
  border-color: #6366f1;
}

.btn-outline-primary:hover {
  background-color: #6366f1;
  color: white;
}

.btn-primary {
  background-color: #6366f1;
  border-color: #6366f1;
}

.btn-primary:hover {
  background-color: #5253cc;
  border-color: #5253cc;
}
</style>