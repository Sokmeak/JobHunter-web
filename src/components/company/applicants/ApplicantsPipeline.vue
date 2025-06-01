<template>
<div class="applicants-pipeline">
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 class="mb-1 fw-bold">Applicants Pipeline</h2>
      <p class="text-muted mb-0">Track candidates through your hiring process</p>
    </div>
    
    <div class="d-flex align-items-center gap-3">
      <!-- Search Bar -->
      <div class="position-relative search-container">
        <i class="bi bi-search position-absolute search-icon"></i>
        <input 
          type="text" 
          class="form-control search-input" 
          placeholder="Search candidates"
          v-model="searchQuery"
        >
      </div>
      
      <!-- View Toggle -->
      <div class="btn-group" role="group">
        <button 
          type="button" 
          class="btn"
          :class="viewMode === 'pipeline' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="$emit('switchView', 'pipeline')"
        >
          Pipeline View
        </button>
        <button 
          type="button" 
          class="btn"
          :class="viewMode === 'table' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="$emit('switchView', 'table')"
        >
          Table View
        </button>
      </div>
    </div>
  </div>

  <!-- Pipeline Stages -->
  <div class="pipeline-container">
    <div class="row g-3">
      <div v-for="stage in pipelineStages" :key="stage.id" class="col-lg-3 col-md-6">
        <div class="pipeline-stage">
          <!-- Stage Header -->
          <div class="stage-header p-3 border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="mb-0 fw-bold" :class="stage.textColor">{{ stage.name }}</h6>
              <span class="badge rounded-pill" :class="stage.badgeClass">{{ stage.candidates.length }}</span>
            </div>
          </div>

          <!-- Candidates List -->
          <div class="stage-content p-3" style="min-height: 500px; max-height: 600px; overflow-y: auto;">
            <div 
              v-for="candidate in stage.candidates" 
              :key="candidate.id"
              class="candidate-card mb-3"
              draggable="true"
              @dragstart="onDragStart($event, candidate)"
              @dragover.prevent
              @drop="onDrop($event, stage.id)"
            >
              <div class="card border-0 shadow-sm">
                <div class="card-body p-3">
                  <div class="d-flex align-items-start">
                    <img 
                      :src="candidate.avatar" 
                      :alt="candidate.name" 
                      class="rounded-circle me-3"
                      style="width: 48px; height: 48px; object-fit: cover;"
                    >
                    <div class="flex-grow-1">
                      <h6 class="mb-1 fw-medium">{{ candidate.name }}</h6>
                      <p class="text-muted small mb-2">{{ candidate.position }}</p>
                      <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                          <i class="bi bi-star-fill text-warning me-1"></i>
                          <span class="small fw-medium">{{ candidate.score }}</span>
                        </div>
                        <small class="text-muted">{{ candidate.appliedDate }}</small>
                      </div>
                      
                      <!-- Quick Actions -->
                      <div class="mt-2 d-flex gap-1">
                        <button 
                          class="btn btn-sm btn-outline-primary"
                          @click="viewProfile(candidate.id)"
                        >
                          <i class="bi bi-eye"></i>
                        </button>
                        <button 
                          class="btn btn-sm btn-outline-success"
                          @click="scheduleInterview(candidate.id)"
                          v-if="stage.id !== 'hired'"
                        >
                          <i class="bi bi-calendar-plus"></i>
                        </button>
                        <div class="dropdown">
                          <button 
                            class="btn btn-sm btn-outline-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                          >
                            <i class="bi bi-three-dots"></i>
                          </button>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" @click="moveToNext(candidate.id, stage.id)">Move to Next Stage</a></li>
                            <li><a class="dropdown-item" href="#" @click="addNote(candidate.id)">Add Note</a></li>
                            <li><a class="dropdown-item" href="#" @click="sendEmail(candidate.id)">Send Email</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#" @click="rejectCandidate(candidate.id)">Reject</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="stage.candidates.length === 0" class="text-center py-4">
              <i class="bi bi-inbox text-muted" style="font-size: 2rem;"></i>
              <p class="text-muted mt-2 mb-0">No candidates in this stage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, inject } from 'vue'

defineEmits(['switchView'])

const viewApplicantDetails = inject('viewApplicantDetails')
const searchQuery = ref('')
const viewMode = ref('pipeline')
const draggedCandidate = ref(null)

const pipelineStages = ref([
  {
    id: 'applied',
    name: 'Applied',
    textColor: 'text-primary',
    badgeClass: 'bg-primary',
    candidates: [
      {
        id: 1,
        name: 'Jake Gyll',
        position: 'Senior Frontend Developer',
        score: '4.0',
        appliedDate: '2 days ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+man+jake'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        position: 'Senior Frontend Developer',
        score: '3.8',
        appliedDate: '3 days ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+woman+sarah'
      },
      {
        id: 3,
        name: 'Mike Chen',
        position: 'Senior Frontend Developer',
        score: '4.2',
        appliedDate: '4 days ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+man+mike'
      }
    ]
  },
  {
    id: 'screening',
    name: 'Screening',
    textColor: 'text-warning',
    badgeClass: 'bg-warning',
    candidates: [
      {
        id: 4,
        name: 'Emily Davis',
        position: 'Senior Frontend Developer',
        score: '4.1',
        appliedDate: '5 days ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+woman+emily'
      },
      {
        id: 5,
        name: 'Alex Rodriguez',
        position: 'Senior Frontend Developer',
        score: '3.9',
        appliedDate: '6 days ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+man+alex'
      }
    ]
  },
  {
    id: 'interview',
    name: 'Interview',
    textColor: 'text-info',
    badgeClass: 'bg-info',
    candidates: [
      {
        id: 6,
        name: 'Lisa Wang',
        position: 'Senior Frontend Developer',
        score: '4.3',
        appliedDate: '1 week ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+woman+lisa'
      },
      {
        id: 7,
        name: 'David Kim',
        position: 'Senior Frontend Developer',
        score: '4.0',
        appliedDate: '1 week ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+man+david'
      }
    ]
  },
  {
    id: 'hired',
    name: 'Hired',
    textColor: 'text-success',
    badgeClass: 'bg-success',
    candidates: [
      {
        id: 8,
        name: 'Jennifer Lee',
        position: 'Senior Frontend Developer',
        score: '4.5',
        appliedDate: '2 weeks ago',
        avatar: '/placeholder.svg?height=48&width=48&query=professional+woman+jennifer'
      }
    ]
  }
])

const onDragStart = (event, candidate) => {
  draggedCandidate.value = candidate
  event.dataTransfer.effectAllowed = 'move'
}

const onDrop = (event, stageId) => {
  event.preventDefault()
  if (draggedCandidate.value) {
    moveCandidate(draggedCandidate.value.id, stageId)
    draggedCandidate.value = null
  }
}

const moveCandidate = (candidateId, newStageId) => {
  // Find and remove candidate from current stage
  let candidate = null
  for (const stage of pipelineStages.value) {
    const index = stage.candidates.findIndex(c => c.id === candidateId)
    if (index !== -1) {
      candidate = stage.candidates.splice(index, 1)[0]
      break
    }
  }
  
  // Add candidate to new stage
  if (candidate) {
    const newStage = pipelineStages.value.find(s => s.id === newStageId)
    if (newStage) {
      newStage.candidates.push(candidate)
    }
  }
}

const viewProfile = (candidateId) => {
  console.log('Viewing profile for candidate:', candidateId)
  if (viewApplicantDetails) {
    viewApplicantDetails(candidateId)
  }
}

const scheduleInterview = (candidateId) => {
  console.log('Schedule interview for:', candidateId)
}

const moveToNext = (candidateId, currentStageId) => {
  const stageOrder = ['applied', 'screening', 'interview', 'hired']
  const currentIndex = stageOrder.indexOf(currentStageId)
  if (currentIndex < stageOrder.length - 1) {
    const nextStageId = stageOrder[currentIndex + 1]
    moveCandidate(candidateId, nextStageId)
  }
}

const addNote = (candidateId) => {
  console.log('Add note for:', candidateId)
}

const sendEmail = (candidateId) => {
  console.log('Send email to:', candidateId)
}

const rejectCandidate = (candidateId) => {
  console.log('Reject candidate:', candidateId)
}
</script>

<style scoped>
.search-container {
  width: 300px;
}

.search-input {
  padding-left: 2.5rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
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

.pipeline-stage {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.stage-header {
  background-color: #f8fafc;
}

.candidate-card {
  cursor: move;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.candidate-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.candidate-card .card {
  border: 1px solid #e2e8f0;
}

.candidate-card:hover .card {
  border-color: #6366f1;
}

.stage-content::-webkit-scrollbar {
  width: 6px;
}

.stage-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.stage-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.stage-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
