// stores/Admin/Store/usersManag.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUsersStore = defineStore('usersStore', () => {
    const users = ref([
        {
            id: 1,
            name: "John Doe",
            email: "john1@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 2,
            name: "John Doe",
            email: "john2@gmail.com",
            role: "Employer",
            status: "Suspended",
            verified: false,
            joinDate: "Feb 2, 2023",
        },
        {
            id: 3,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 4,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 5,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 6,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 7,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 8,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 9,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Job Seekers",
            status: "Active",
            verified: true,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 10,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 11,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 12,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 13,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 14,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 15,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 16,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 17,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
        {
            id: 18,
            name: "Jonh Doe",
            email: "jonhdoe@gmail.com",
            role: "Employer",
            status: "Active",
            verified: false,
            joinDate: "Jan 15, 2023",
        },
    ])

    function addUser(user) {
        user.id = users.value.length + 1
        users.value.unshift(user)
    }

    function deleteUser(userId) {
        users.value = users.value.filter((u) => u.id !== userId)
    }

    function toggleVerification(userId) {
        const user = users.value.find((u) => u.id === userId)
        if (user) user.verified = !user.verified
    }

    function suspendUser(userId) {
        const user = users.value.find((u) => u.id === userId)
        if (user) {
            user.status = user.status === 'Suspended' ? 'Active' : 'Suspended'
        }
    }


    return {
        users,
        addUser,
        deleteUser,
        toggleVerification,
        suspendUser,

    }
})
