import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([
    { id: 1, name: 'Jan Mayer', email: 'jan.mayer@example.com', role: 'admin', status: 'active', joinedDate: 'Jan 15, 2023', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Ally Wales', email: 'ally.wales@example.com', role: 'employer', status: 'active', joinedDate: 'Feb 3, 2023', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'James Gardner', email: 'james.gardner@example.com', role: 'jobseeker', status: 'inactive', joinedDate: 'Mar 12, 2023', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 4, name: 'Allison Geidt', email: 'allison.geidt@example.com', role: 'employer', status: 'pending', joinedDate: 'Apr 5, 2023', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 5, name: 'Ruben Culhane', email: 'ruben.culhane@example.com', role: 'jobseeker', status: 'active', joinedDate: 'May 22, 2023', avatar: '/placeholder.svg?height=40&width=40' }
  ])

  const searchQuery = ref('')
  const roleFilter = ref('')
  const statusFilter = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10

  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesRole = !roleFilter.value || user.role === roleFilter.value
      const matchesStatus = !statusFilter.value || user.status === statusFilter.value
      return matchesSearch && matchesRole && matchesStatus
    })
  })

  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredUsers.value.slice(start, start + itemsPerPage)
  })

  return {
    users,
    searchQuery,
    roleFilter,
    statusFilter,
    currentPage,
    totalPages,
    paginatedUsers
  }
})
