import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApplicantStore = defineStore('applicantStore', () => {
  const currentView = ref('table')
  const jobFilter = ref('')
  const stageFilter = ref('')
  const dateFilter = ref('')
  const showApplicantDetails = ref(false)
  const selectedApplicantId = ref(null)

  const switchView = (view) => {
    currentView.value = view
  }

  const clearFilters = () => {
    jobFilter.value = ''
    stageFilter.value = ''
    dateFilter.value = ''
  }

  const exportData = (format) => {
    console.log('Exporting data as:', format)
  }

  const viewApplicantDetails = (id) => {
    selectedApplicantId.value = id
    showApplicantDetails.value = true
  }

  const closeApplicantDetails = () => {
    showApplicantDetails.value = false
    selectedApplicantId.value = null
  }

  return {
    currentView,
    jobFilter,
    stageFilter,
    dateFilter,
    showApplicantDetails,
    selectedApplicantId,
    switchView,
    clearFilters,
    exportData,
    viewApplicantDetails,
    closeApplicantDetails,
  }
})
