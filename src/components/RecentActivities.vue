<template>
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
      
      <div class="space-y-0">
        <div v-for="(activity, index) in activities" :key="activity.id">
          <div
            class="flex items-start gap-3 p-4 rounded-md"
            :class="index === 0 ? 'bg-[#f0f2fa]' : 'bg-white'"
          >
            <div class="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                :src="activity.avatar"
                :alt="activity.name"
                class="h-full w-full object-cover"
                @error="onImageError"
              />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <h3 class="font-medium text-gray-800">{{ activity.name }}</h3>
                <span class="text-gray-500 text-sm">{{ activity.time }}</span>
              </div>
              <p class="text-gray-600 mt-1">{{ activity.action }}</p>
            </div>
          </div>
          <div v-if="index !== activities.length - 1" class="h-px bg-gray-200 mx-4"></div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  
  const activities = ref([
    {
      id: 1,
      name: "Jan Mayer",
      time: "12 mins ago",
      action: "Created a job new posting Senior Reach Developer",
      //avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GXcd4NxWToQqDZjfSJ6I6JyAeWs1X4.png",
      highlighted: true,
    },
    {
      id: 2,
      name: "Ally Wales",
      time: "30mins ago",
      action: "Created a job new posting Senior Reach Developer",
    },
    {
      id: 3,
      name: "James Gardner",
      time: "50 mins ago",
      action: "Created a job new posting Senior Reach Developer",
    },
    {
      id: 4,
      name: "Allison Geidt",
      time: "1 hour ago",
      action: "Created a job new posting Senior Reach Developer",
    },
    {
      id: 5,
      name: "Ruben Culhane",
      time: "1 hour ago",
      action: "Created a job new posting Senior Reach Developer",
    },
    {
      id: 6,
      name: "Lydia Diaz",
      time: "1 hour ago",
      action: "Created a job new posting Senior Reach Developer",
    },
    {
      id: 7,
      name: "James Dokidis",
      time: "1 hour ago",
      action: "Created a job new posting Senior Reach Developer",
    },
    {
      id: 8,
      name: "Angelina Swann",
      time: "1 hour ago",
      action: "Created a job new posting Senior Reach Developer",
    },
  ]);
  
  const onImageError = (event) => {
  // Fallback to a default avatar if image fails to load
  event.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23E5E7EB'/%3E%3Cpath d='M20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20Z' fill='%239CA3AF'/%3E%3Cpath d='M10 30C10 25.5817 14.4817 22 20 22C25.5183 22 30 25.5817 30 30C30 31.6569 28.6569 33 27 33H13C11.3431 33 10 31.6569 10 30Z' fill='%239CA3AF'/%3E%3C/svg%3E";
};

  </script>
