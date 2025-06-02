<template>
<div class="applicant-details">
  <div v-if="applicant" class="row g-4">
    <!-- Profile Section -->
    <div class="col-md-4">
      <div class="text-center mb-4">
        <img :src="applicant.avatar" :alt="applicant.name" class="rounded-circle mb-3" style="width: 120px; height: 120px; object-fit: cover;">
        <h4 class="mb-1 fw-bold">{{ applicant.name }}</h4>
        <p class="text-muted mb-2">{{ applicant.email }}</p>
        <p class="text-muted">{{ applicant.location }}</p>
        
        <div class="d-flex justify-content-center align-items-center mb-3">
          <i class="bi bi-star-fill text-warning me-1"></i>
          <span class="fw-bold">{{ applicant.score }}</span>
          <span class="text-muted ms-1">/ 5.0</span>
        </div>
        
        <span class="badge px-3 py-2" :class="getStageClass(applicant.stage)">
          {{ applicant.stage }}
        </span>
      </div>

      <!-- Quick Actions -->
      <div class="d-grid gap-2">
        <button class="btn btn-primary" @click="scheduleInterview">
          <i class="bi bi-calendar-plus me-2"></i>Schedule Interview
        </button>
        <button class="btn btn-success" @click="moveToShortlist">
          <i class="bi bi-check-circle me-2"></i>Move to Shortlist
        </button>
        <button class="btn btn-outline-primary" @click="sendMessage">
          <i class="bi bi-envelope me-2"></i>Send Message
        </button>
        <button class="btn btn-outline-danger" @click="rejectApplicant">
          <i class="bi bi-x-circle me-2"></i>Reject
        </button>
      </div>
    </div>

    <!-- Details Section -->
    <div class="col-md-8">
      <!-- Application Info -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Application Information</h6>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label text-muted small">Applied For</label>
              <p class="mb-0 fw-medium">{{ applicant.jobTitle }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small">Department</label>
              <p class="mb-0">{{ applicant.department }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small">Applied Date</label>
              <p class="mb-0">{{ applicant.appliedDate }}</p>
            </div>
            <div class="col-md-6">
              <label class="form-label text-muted small">Experience</label>
              <p class="mb-0">{{ applicant.experience || '5+ years' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Resume/CV -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Resume/CV</h6>
          <div class="d-flex align-items-center p-3 border rounded-3">
            <i class="bi bi-file-earmark-pdf text-danger fs-3 me-3"></i>
            <div class="flex-grow-1">
              <div class="fw-medium">{{ applicant.name }}_Resume.pdf</div>
              <small class="text-muted">2.4 MB • Uploaded {{ applicant.appliedDate }}</small>
            </div>
            <button class="btn btn-outline-primary btn-sm">
              <i class="bi bi-download me-1"></i>Download
            </button>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Skills</h6>
          <div class="d-flex flex-wrap gap-2">
            <span v-for="skill in applicant.skills" :key="skill" class="badge bg-primary-subtle text-primary border border-primary px-3 py-2">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0 fw-bold">Notes</h6>
            <button class="btn btn-sm btn-outline-primary" @click="addNote">
              <i class="bi bi-plus me-1"></i>Add Note
            </button>
          </div>
          
          <div class="notes-list">
            <div v-for="note in applicant.notes" :key="note.id" class="note-item mb-3 p-3 border rounded-3">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div class="fw-medium">{{ note.author }}</div>
                <small class="text-muted">{{ note.date }}</small>
              </div>
              <p class="mb-0 text-muted">{{ note.content }}</p>
            </div>
            
            <div v-if="!applicant.notes || applicant.notes.length === 0" class="text-center py-3">
              <i class="bi bi-sticky text-muted fs-3"></i>
              <p class="text-muted mt-2 mb-0">No notes yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  applicantId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['close'])

// Mock applicant data - in real app, fetch from API
const applicant = ref({
  id: props.applicantId,
  name: 'Jake Gyll',
  email: 'jake.gyll@email.com',
  location: 'New York, USA',
  jobTitle: 'Senior Frontend Developer',
  department: 'Engineering',
  stage: 'In Review',
  appliedDate: '13 July, 2021',
  score: '4.0',
  experience: '5+ years',
  avatar: '/placeholder.svg?height=120&width=120&query=professional+man+jake',
  skills: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'CSS', 'JavaScript', 'Git'],
  notes: [
    {
      id: 1,
      author: 'John Doe',
      date: '2 days ago',
      content: 'Strong technical background. Good communication skills during initial screening.'
    },
    {
      id: 2,
      author: 'Sarah Smith',
      date: '1 day ago',
      content: 'Portfolio shows excellent work. Recommended for technical interview.'
    }
  ]
})

const getStageClass = (stage) => {
  switch (stage) {
    case 'In Review':
      return 'bg-warning-subtle text-warning border border-warning'
    case 'Shortlisted':
      return 'bg-primary-subtle text-primary border border-primary'
    case 'Interview':
      return 'bg-info-subtle text-info border border-info'
    case 'Hired':
      return 'bg-success-subtle text-success border border-success'
    default:
      return 'bg-secondary-subtle text-secondary border border-secondary'
  }
}

const scheduleInterview = () => {
  console.log('Schedule interview for:', applicant.value.name)
}

const moveToShortlist = () => {
  console.log('Move to shortlist:', applicant.value.name)
}

const sendMessage = () => {
  console.log('Send message to:', applicant.value.name)
}

const rejectApplicant = () => {
  console.log('Reject applicant:', applicant.value.name)
}

const addNote = () => {
  console.log('Add note for:', applicant.value.name)
}
</script>

<style scoped>
.note-item:hover {
  background-color: #f8fafc;
}
</style>
