<template>
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Pending Approvals</h2>
      
      <div class="space-y-0">
        <div v-for="(approval, index) in approvals" :key="approval.id">
          <div class="p-4">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-medium text-gray-800">{{ approval.company }}</h3>
              <div 
                class="px-3 py-0.5 rounded-full text-sm"
                :class="{
                  'bg-[#FFF4D9] text-[#B98900]': approval.priority === 'medium',
                  'bg-[#FFEBEB] text-[#E53535]': approval.priority === 'high',
                  'bg-[#E5F6FF] text-[#0090E1]': approval.priority === 'low'
                }"
              >
                {{ approval.priority }}
              </div>
            </div>
            
            <p class="text-gray-600">{{ approval.type }}</p>
            <p class="text-gray-400 text-sm mt-1">{{ approval.time }}</p>
            
            <div class="flex justify-end gap-2 mt-2">
              <button class="w-8 h-8 rounded-md bg-[#E7F9F0] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
              <button class="w-8 h-8 rounded-md bg-[#FEE2E2] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <div v-if="index !== approvals.length - 1" class="h-px bg-gray-200 mx-4"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const approvals = ref([
    {
      id: 1,
      company: "Acme Solution",
      priority: "medium",
      type: "Employer Verification",
      time: "Today, 10:23 AM",
    },
    {
      id: 2,
      company: "Acme Solution",
      priority: "high",
      type: "Employer Verification",
      time: "Today, 10:23 AM",
    },
    {
      id: 3,
      company: "Acme Solution",
      priority: "low",
      type: "Employer Verification",
      time: "Today, 10:23 AM",
    },
    {
      id: 4,
      company: "Acme Solution",
      priority: "medium",
      type: "Employer Verification",
      time: "Today, 10:23 AM",
    },
    {
      id: 5,
      company: "Acme Solution",
      priority: "low",
      type: "Employer Verification",
      time: "Today, 10:23 AM",
    },
    {
      id: 6,
      company: "Acme Solution",
      priority: "low",
      type: "Employer Verification",
      time: "Today, 10:23 AM",
    },
  ]);
  </script>