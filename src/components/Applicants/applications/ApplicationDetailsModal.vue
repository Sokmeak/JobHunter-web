<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <div class="modal-title-section">
          <div class="company-logo-large" :style="{ backgroundColor: application.logoBackground }">
            <img :src="application.logo" :alt="application.company" />
          </div>
          <div class="title-info">
            <h2 class="modal-title">{{ application.role }}</h2>
            <p class="company-name">{{ application.company }}</p>
          </div>
        </div>
        <button class="close-button" @click="$emit('close')">
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
              <span class="detail-value">#{{ application.id }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Date Applied</span>
              <span class="detail-value">{{ application.dateApplied }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status</span>
              <StatusBadge :status="application.status" />
            </div>
            <div class="detail-item">
              <span class="detail-label">Location</span>
              <span class="detail-value">{{ application.location }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Employment Type</span>
              <span class="detail-value">{{ application.employmentType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Salary Range</span>
              <span class="detail-value">{{ application.salaryRange }}</span>
            </div>
          </div>
        </div>

        <!-- Job Description -->
        <div class="detail-section">
          <h3 class="section-heading">Job Description</h3>
          <p class="job-description">{{ application.jobDescription }}</p>
        </div>

        <!-- Requirements -->
        <div class="detail-section">
          <h3 class="section-heading">Requirements</h3>
          <ul class="requirements-list">
            <li v-for="(requirement, index) in application.requirements" :key="index">
              {{ requirement }}
            </li>
          </ul>
        </div>

        <!-- Application Timeline -->
        <div class="detail-section">
          <h3 class="section-heading">Application Timeline</h3>
          <ApplicationTimeline :timeline="application.timeline" />
        </div>

        <!-- Contact Information -->
        <div class="detail-section">
          <h3 class="section-heading">Contact Information</h3>
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-avatar">
                <img :src="application.recruiter.avatar" :alt="application.recruiter.name" />
              </div>
              <div class="contact-details">
                <h4 class="contact-name">{{ application.recruiter.name }}</h4>
                <p class="contact-role">{{ application.recruiter.role }}</p>
                <p class="contact-email">{{ application.recruiter.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" @click="$emit('close')">Close</button>
        <button class="btn btn-primary" @click="$emit('withdraw')">Withdraw Application</button>
        <button class="btn btn-primary" @click="$emit('contact')">Contact Recruiter</button>
      </div>
    </div>
  </div>
</template>

<script>
import StatusBadge from './StatusBadge.vue';
import ApplicationTimeline from './ApplicationTimeline.vue';

export default {
  name: 'ApplicationDetailsModal',
  components: {
    StatusBadge,
    ApplicationTimeline
  },
  props: {
    application: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
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

@media (max-width: 768px) {
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