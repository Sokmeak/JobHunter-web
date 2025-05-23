<template>
  <div class="applications-container">
    <!-- Status Tabs -->
    <div class="status-tabs">
      <button 
        v-for="tab in statusTabs" 
        :key="tab.status" 
        class="tab-button" 
        :class="{ 'active': activeTab === tab.status }"
        @click="activeTab = tab.status"
      >
        {{ tab.label }} ({{ tab.count }})
      </button>
    </div>

    <!-- Main Content -->
    <div class="content-section">
      <div class="header-section">
        <h1 class="section-title">Applications History</h1>
        <div class="action-buttons">
          <div class="search-button">
            <input type="text" placeholder="Search" v-model="searchQuery" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <button class="filter-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter-icon">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <!-- Applications Table -->
      <div class="applications-table">
        <div class="table-header">
          <div class="header-cell index-cell">#</div>
          <div class="header-cell company-cell">Company Name</div>
          <div class="header-cell role-cell">Roles</div>
          <div class="header-cell date-cell">Date Applied</div>
          <div class="header-cell status-cell">Status</div>
          <div class="header-cell actions-cell"></div>
        </div>

        <div 
          v-for="(application, index) in filteredApplications" 
          :key="application.id"
          class="table-row"
          :class="{ 'odd-row': index % 2 === 0 }"
          @click="openApplicationDetails(application)"
        >
          <div class="cell index-cell">{{ application.id }}</div>
          <div class="cell company-cell">
            <div class="company-info">
              <div class="company-logo" :style="{ backgroundColor: application.logoBackground }">
                <img :src="application.logo" :alt="application.company" />
              </div>
              <span>{{ application.company }}</span>
            </div>
          </div>
          <div class="cell role-cell">{{ application.role }}</div>
          <div class="cell date-cell">{{ application.dateApplied }}</div>
          <div class="cell status-cell">
            <span 
              class="status-badge" 
              :class="getStatusClass(application.status)"
            >
              {{ application.status }}
            </span>
          </div>
          <div class="cell actions-cell">
            <button class="action-button" @click.stop="openActionMenu(application)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="pagination-button prev">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          v-for="page in totalPages" 
          :key="page" 
          class="pagination-button page-number" 
          :class="{ 'active': currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <span class="pagination-ellipsis">...</span>
        <button class="pagination-button page-number">{{ totalPages }}</button>
        <button class="pagination-button next">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <!-- Application Details Modal -->
    <div v-if="showDetailsModal" class="modal-overlay" @click="closeDetailsModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="modal-title-section">
            <div class="company-logo-large" :style="{ backgroundColor: selectedApplication.logoBackground }">
              <img :src="selectedApplication.logo" :alt="selectedApplication.company" />
            </div>
            <div class="title-info">
              <h2 class="modal-title">{{ selectedApplication.role }}</h2>
              <p class="company-name">{{ selectedApplication.company }}</p>
            </div>
          </div>
          <button class="close-button" @click="closeDetailsModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <!-- Application Overview -->
          <div class="detail-section">
            <h3 class="section-heading">Application Overview</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-label">Application ID</span>
                <span class="detail-value">#{{ selectedApplication.id }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Date Applied</span>
                <span class="detail-value">{{ selectedApplication.dateApplied }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Status</span>
                <span 
                  class="status-badge" 
                  :class="getStatusClass(selectedApplication.status)"
                >
                  {{ selectedApplication.status }}
                </span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Location</span>
                <span class="detail-value">{{ selectedApplication.location }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Employment Type</span>
                <span class="detail-value">{{ selectedApplication.employmentType }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Salary Range</span>
                <span class="detail-value">{{ selectedApplication.salaryRange }}</span>
              </div>
            </div>
          </div>

          <!-- Job Description -->
          <div class="detail-section">
            <h3 class="section-heading">Job Description</h3>
            <p class="job-description">{{ selectedApplication.jobDescription }}</p>
          </div>

          <!-- Requirements -->
          <div class="detail-section">
            <h3 class="section-heading">Requirements</h3>
            <ul class="requirements-list">
              <li v-for="requirement in selectedApplication.requirements" :key="requirement">
                {{ requirement }}
              </li>
            </ul>
          </div>

          <!-- Application Timeline -->
          <div class="detail-section">
            <h3 class="section-heading">Application Timeline</h3>
            <div class="timeline">
              <div 
                v-for="(event, index) in selectedApplication.timeline" 
                :key="index"
                class="timeline-item"
                :class="{ 'completed': event.completed }"
              >
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <h4 class="timeline-title">{{ event.title }}</h4>
                  <p class="timeline-date">{{ event.date }}</p>
                  <p class="timeline-description">{{ event.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="detail-section">
            <h3 class="section-heading">Contact Information</h3>
            <div class="contact-info">
              <div class="contact-item">
                <div class="contact-avatar">
                  <img :src="selectedApplication.recruiter.avatar" :alt="selectedApplication.recruiter.name" />
                </div>
                <div class="contact-details">
                  <h4 class="contact-name">{{ selectedApplication.recruiter.name }}</h4>
                  <p class="contact-role">{{ selectedApplication.recruiter.role }}</p>
                  <p class="contact-email">{{ selectedApplication.recruiter.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeDetailsModal">Close</button>
          <button class="btn btn-primary" @click="withdrawApplication">Withdraw Application</button>
          <button class="btn btn-primary" @click="contactRecruiter">Contact Recruiter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationsHistory',
  data() {
    return {
      activeTab: 'all',
      searchQuery: '',
      currentPage: 1,
      totalPages: 33,
      showDetailsModal: false,
      selectedApplication: null,
      statusTabs: [
        { status: 'all', label: 'All', count: 45 },
        { status: 'in-review', label: 'In Review', count: 34 },
        { status: 'interviewing', label: 'Interviewing', count: 18 },
        { status: 'assessment', label: 'Assessment', count: 5 },
        { status: 'offered', label: 'Offered', count: 2 },
        { status: 'hired', label: 'Hired', count: 1 }
      ],
      applications: [
        {
          id: 1,
          company: 'Nomad',
          logo: 'https://v0.dev/placeholder.svg?height=40&width=40',
          logoBackground: '#e6f7f0',
          role: 'Social Media Assistant',
          dateApplied: '24 July 2021',
          status: 'In Review',
          location: 'Remote',
          employmentType: 'Full-time',
          salaryRange: '$40,000 - $60,000',
          jobDescription: 'We are looking for a creative and enthusiastic Social Media Assistant to join our marketing team. You will be responsible for creating engaging content, managing social media accounts, and analyzing performance metrics.',
          requirements: [
            'Bachelor\'s degree in Marketing, Communications, or related field',
            '2+ years of experience in social media management',
            'Proficiency in social media platforms (Instagram, Facebook, Twitter, LinkedIn)',
            'Strong written and verbal communication skills',
            'Experience with social media analytics tools'
          ],
          timeline: [
            {
              title: 'Application Submitted',
              date: '24 July 2021',
              description: 'Your application has been successfully submitted.',
              completed: true
            },
            {
              title: 'Application Under Review',
              date: '25 July 2021',
              description: 'Our team is currently reviewing your application.',
              completed: true
            },
            {
              title: 'Phone Screening',
              date: 'Pending',
              description: 'Initial phone screening with HR team.',
              completed: false
            },
            {
              title: 'Technical Interview',
              date: 'Pending',
              description: 'Technical interview with the hiring manager.',
              completed: false
            }
          ],
          recruiter: {
            name: 'Sarah Johnson',
            role: 'HR Manager',
            email: 'sarah.johnson@nomad.com',
            avatar: 'https://v0.dev/placeholder.svg?height=50&width=50'
          }
        },
        {
          id: 2,
          company: 'Udacity',
          logo: 'https://v0.dev/placeholder.svg?height=40&width=40',
          logoBackground: '#e6f7ff',
          role: 'Social Media Assistant',
          dateApplied: '20 July 2021',
          status: 'Shortlisted',
          location: 'San Francisco, CA',
          employmentType: 'Full-time',
          salaryRange: '$45,000 - $65,000',
          jobDescription: 'Join our dynamic marketing team as a Social Media Assistant. You\'ll help create compelling content and manage our social media presence across multiple platforms.',
          requirements: [
            'Bachelor\'s degree in Marketing or related field',
            '1-3 years of social media experience',
            'Creative mindset with attention to detail',
            'Knowledge of content creation tools',
            'Understanding of social media trends'
          ],
          timeline: [
            {
              title: 'Application Submitted',
              date: '20 July 2021',
              description: 'Your application has been successfully submitted.',
              completed: true
            },
            {
              title: 'Application Reviewed',
              date: '22 July 2021',
              description: 'Your application has been reviewed and shortlisted.',
              completed: true
            },
            {
              title: 'First Interview Scheduled',
              date: '28 July 2021',
              description: 'First round interview scheduled.',
              completed: false
            }
          ],
          recruiter: {
            name: 'Mike Chen',
            role: 'Talent Acquisition Specialist',
            email: 'mike.chen@udacity.com',
            avatar: 'https://v0.dev/placeholder.svg?height=50&width=50'
          }
        },
        {
          id: 3,
          company: 'Packer',
          logo: 'https://v0.dev/placeholder.svg?height=40&width=40',
          logoBackground: '#fff1ee',
          role: 'Social Media Assistant',
          dateApplied: '16 July 2021',
          status: 'Offered',
          location: 'New York, NY',
          employmentType: 'Full-time',
          salaryRange: '$50,000 - $70,000',
          jobDescription: 'We\'re seeking a talented Social Media Assistant to help grow our brand presence and engage with our community across various social platforms.',
          requirements: [
            'Degree in Marketing, Communications, or equivalent experience',
            '2+ years in social media marketing',
            'Experience with paid social advertising',
            'Strong analytical skills',
            'Portfolio of successful social media campaigns'
          ],
          timeline: [
            {
              title: 'Application Submitted',
              date: '16 July 2021',
              description: 'Your application has been successfully submitted.',
              completed: true
            },
            {
              title: 'Phone Interview',
              date: '18 July 2021',
              description: 'Completed phone screening with HR.',
              completed: true
            },
            {
              title: 'Final Interview',
              date: '22 July 2021',
              description: 'Final interview with the marketing director.',
              completed: true
            },
            {
              title: 'Job Offer Extended',
              date: '25 July 2021',
              description: 'Congratulations! We\'ve extended a job offer.',
              completed: true
            }
          ],
          recruiter: {
            name: 'Emily Rodriguez',
            role: 'Senior Recruiter',
            email: 'emily.rodriguez@packer.com',
            avatar: 'https://v0.dev/placeholder.svg?height=50&width=50'
          }
        },
        {
          id: 4,
          company: 'Divvy',
          logo: 'https://v0.dev/placeholder.svg?height=40&width=40',
          logoBackground: '#f8f8f8',
          role: 'Social Media Assistant',
          dateApplied: '14 July 2021',
          status: 'Interviewing',
          location: 'Chicago, IL',
          employmentType: 'Full-time',
          salaryRange: '$42,000 - $58,000',
          jobDescription: 'Looking for a passionate Social Media Assistant to join our growing team and help us connect with our audience through creative and engaging content.',
          requirements: [
            'Bachelor\'s degree preferred',
            '1-2 years of social media experience',
            'Familiarity with design tools (Canva, Photoshop)',
            'Strong communication skills',
            'Ability to work in a fast-paced environment'
          ],
          timeline: [
            {
              title: 'Application Submitted',
              date: '14 July 2021',
              description: 'Your application has been successfully submitted.',
              completed: true
            },
            {
              title: 'Application Reviewed',
              date: '16 July 2021',
              description: 'Your application has been reviewed.',
              completed: true
            },
            {
              title: 'First Interview',
              date: '20 July 2021',
              description: 'Completed first round interview.',
              completed: true
            },
            {
              title: 'Second Interview',
              date: '26 July 2021',
              description: 'Second round interview in progress.',
              completed: false
            }
          ],
          recruiter: {
            name: 'David Kim',
            role: 'Hiring Manager',
            email: 'david.kim@divvy.com',
            avatar: 'https://v0.dev/placeholder.svg?height=50&width=50'
          }
        },
        {
          id: 5,
          company: 'DigitalOcean',
          logo: 'https://v0.dev/placeholder.svg?height=40&width=40',
          logoBackground: '#e6f7ff',
          role: 'Social Media Assistant',
          dateApplied: '10 July 2021',
          status: 'Unsuitable',
          location: 'Remote',
          employmentType: 'Full-time',
          salaryRange: '$38,000 - $55,000',
          jobDescription: 'We are seeking a Social Media Assistant to support our marketing efforts and help build our online community presence.',
          requirements: [
            'Degree in Marketing or related field',
            '1+ years of social media experience',
            'Knowledge of cloud computing (preferred)',
            'Strong writing skills',
            'Experience with community management'
          ],
          timeline: [
            {
              title: 'Application Submitted',
              date: '10 July 2021',
              description: 'Your application has been successfully submitted.',
              completed: true
            },
            {
              title: 'Application Reviewed',
              date: '12 July 2021',
              description: 'Your application has been reviewed.',
              completed: true
            },
            {
              title: 'Application Declined',
              date: '15 July 2021',
              description: 'Unfortunately, we decided to move forward with other candidates.',
              completed: true
            }
          ],
          recruiter: {
            name: 'Lisa Wang',
            role: 'Talent Acquisition Manager',
            email: 'lisa.wang@digitalocean.com',
            avatar: 'https://v0.dev/placeholder.svg?height=50&width=50'
          }
        }
      ]
    };
  },
  computed: {
    filteredApplications() {
      let filtered = this.applications;
      
      // Filter by active tab
      if (this.activeTab !== 'all') {
        const statusMap = {
          'in-review': 'In Review',
          'interviewing': 'Interviewing',
          'assessment': 'Assessment',
          'offered': 'Offered',
          'hired': 'Hired'
        };
        
        filtered = filtered.filter(app => app.status === statusMap[this.activeTab]);
      }
      
      // Filter by search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(app => 
          app.company.toLowerCase().includes(query) || 
          app.role.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    }
  },
  methods: {
    getStatusClass(status) {
      switch(status) {
        case 'In Review':
          return 'status-review';
        case 'Shortlisted':
          return 'status-shortlisted';
        case 'Offered':
          return 'status-offered';
        case 'Interviewing':
          return 'status-interviewing';
        case 'Unsuitable':
          return 'status-unsuitable';
        case 'Hired':
          return 'status-hired';
        default:
          return '';
      }
    },
    openApplicationDetails(application) {
      this.selectedApplication = application;
      this.showDetailsModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
      this.selectedApplication = null;
      document.body.style.overflow = 'auto';
    },
    openActionMenu(application) {
      // Handle action menu click
      console.log('Action menu for:', application.company);
    },
    withdrawApplication() {
      // Handle withdraw application
      console.log('Withdrawing application for:', this.selectedApplication.company);
      this.closeDetailsModal();
    },
    contactRecruiter() {
      // Handle contact recruiter
      console.log('Contacting recruiter:', this.selectedApplication.recruiter.name);
      this.closeDetailsModal();
    }
  }
};
</script>

<style scoped>
.applications-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Status Tabs */
.status-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
  overflow-x: auto;
  white-space: nowrap;
}

.tab-button {
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 16px;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
}

.tab-button.active {
  color: #4640DE;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #4640DE;
  border-radius: 3px 3px 0 0;
}

/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.search-button {
  position: relative;
  width: 200px;
}

.search-button input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.filter-icon {
  color: #6b7280;
}

/* Applications Table */
.applications-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table-header {
  display: flex;
  background-color: #f9fafb;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  color: #6b7280;
}

.header-cell {
  padding: 16px;
  text-align: left;
  font-size: 14px;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f8fafc;
}

.odd-row {
  background-color: #f9fafb;
}

.odd-row:hover {
  background-color: #f1f5f9;
}

.cell {
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.index-cell {
  width: 5%;
  justify-content: center;
}

.company-cell {
  width: 25%;
}

.role-cell {
  width: 25%;
}

.date-cell {
  width: 20%;
}

.status-cell {
  width: 20%;
}

.actions-cell {
  width: 5%;
  justify-content: center;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.company-logo {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.company-logo img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-review {
  background-color: #FFF8E6;
  color: #B98900;
  border: 1px solid #FFE7A0;
}

.status-shortlisted {
  background-color: #E6F7F0;
  color: #027A48;
  border: 1px solid #B8DBCA;
}

.status-offered {
  background-color: #EEE9FF;
  color: #5925DC;
  border: 1px solid #D9CFFF;
}

.status-interviewing {
  background-color: #FFF8E6;
  color: #B98900;
  border: 1px solid #FFE7A0;
}

.status-unsuitable {
  background-color: #FFF0ED;
  color: #C4320A;
  border: 1px solid #FFD6CC;
}

.status-hired {
  background-color: #E6F7F0;
  color: #027A48;
  border: 1px solid #B8DBCA;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
}

.pagination-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
}

.pagination-button.active {
  background-color: #4640DE;
  color: white;
  border-color: #4640DE;
}

.pagination-ellipsis {
  color: #6b7280;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.company-logo-large {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.company-logo-large img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.title-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.company-name {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background-color: #f3f4f6;
}

.modal-body {
  padding: 24px;
}

.detail-section {
  margin-bottom: 32px;
}

.section-heading {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.detail-value {
  font-size: 14px;
  color: #111827;
}

.job-description {
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
  margin: 0;
}

.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirements-list li {
  font-size: 14px;
  color: #374151;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
  position: relative;
  padding-left: 20px;
}

.requirements-list li:before {
  content: '•';
  color: #4640DE;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.requirements-list li:last-child {
  border-bottom: none;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 11px;
  top: 24px;
  width: 2px;
  height: calc(100% + 8px);
  background-color: #e5e7eb;
}

.timeline-item.completed::after {
  background-color: #4640DE;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #e5e7eb;
  flex-shrink: 0;
  margin-top: 2px;
}

.timeline-item.completed .timeline-dot {
  background-color: #4640DE;
  box-shadow: 0 0 0 2px #4640DE;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.timeline-date {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.timeline-description {
  font-size: 14px;
  color: #374151;
  margin: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  gap: 16px;
  align-items: center;
}

.contact-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.contact-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-details {
  flex: 1;
}

.contact-name {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.contact-role {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.contact-email {
  font-size: 14px;
  color: #4640DE;
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e0e0e0;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn-primary {
  background-color: #4640DE;
  color: white;
}

.btn-primary:hover {
  background-color: #3730a3;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .action-buttons {
    width: 100%;
  }
  
  .search-button {
    width: 100%;
  }
  
  .applications-table {
    overflow-x: auto;
    display: block;
  }
  
  .table-header, .table-row {
    width: 800px;
  }

  .modal-content {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }

  .modal-header {
    padding: 16px;
  }

  .modal-body {
    padding: 16px;
  }

  .modal-footer {
    padding: 16px;
    flex-direction: column;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }

  .modal-title-section {
    gap: 12px;
  }

  .company-logo-large {
    width: 50px;
    height: 50px;
  }

  .company-logo-large img {
    width: 30px;
    height: 30px;
  }
}
</style>