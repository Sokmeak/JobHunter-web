import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useApiKeyStore = defineStore('apiKeyStore', () => {
  const showCreateModal = ref(false)

  const apiKeys = ref([
    {
      id: 1,
      name: 'Production API',
      description: 'Main production API key',
      value: 'jh_live_1234567890abcdef1234567890abcdef',
      masked: 'jh_live_1234...cdef',
      created: 'Dec 1, 2023',
    },
  ])

  const newKey = ref({
    name: '',
    description: '',
  })

  const toggleCreateModal = (value) => {
    showCreateModal.value = value
  }

  const copyKey = (keyValue) => {
    navigator.clipboard.writeText(keyValue).then(() => {
      alert('API key copied to clipboard!')
    })
  }

  const createApiKey = () => {
    if (!newKey.value.name) {
      alert('Please enter a key name')
      return
    }

    const value = 'jh_live_' + Math.random().toString(36).substring(2, 34)
    apiKeys.value.push({
      id: Date.now(),
      name: newKey.value.name,
      description: newKey.value.description,
      value,
      masked: value.substring(0, 12) + '...' + value.slice(-4),
      created: 'Just now',
    })

    newKey.value = { name: '', description: '' }
    showCreateModal.value = false
    alert('API key created successfully!')
  }

  const deleteKey = (id) => {
    const index = apiKeys.value.findIndex((key) => key.id === id)
    if (index > -1 && confirm('Are you sure you want to delete this API key?')) {
      apiKeys.value.splice(index, 1)
    }
  }

  return {
    apiKeys,
    showCreateModal,
    newKey,
    toggleCreateModal,
    copyKey,
    createApiKey,
    deleteKey,
  }
})
