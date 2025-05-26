<template>
  <div class="settings-team">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-4">
          <h5 class="mb-2">Basic Information</h5>
          <p class="text-muted">Add team members of your company</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h5 class="mb-0">{{ teamMembers.length }} Members</h5>
          <div class="d-flex align-items-center gap-3">
            <button class="btn btn-primary" @click="addMembers">
              <i class="bi bi-plus me-1"></i>Add Members
            </button>
            <div class="btn-group">
              <button
                class="btn"
                :class="
                  viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'
                "
                @click="setViewMode('grid')"
              >
                <i class="bi bi-grid-3x3-gap"></i>
              </button>
              <button
                class="btn"
                :class="
                  viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'
                "
                @click="setViewMode('list')"
              >
                <i class="bi bi-list"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="row g-3">
          <div v-for="member in teamMembers" :key="member.id" class="col-md-4">
            <div class="card border h-100">
              <div class="card-body text-center">
                <img
                  :src="member.avatar"
                  :alt="member.name"
                  class="rounded-circle mb-3"
                  style="width: 60px; height: 60px; object-fit: cover"
                />
                <h6 class="mb-1">{{ member.name }}</h6>
                <p class="text-muted small mb-3">{{ member.position }}</p>
                <div class="d-flex justify-content-center gap-2">
                  <a
                    v-if="member.instagram"
                    :href="member.instagram"
                    class="text-muted"
                    @click.prevent="
                      openSocialLink('instagram', member.instagram)
                    "
                  >
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a
                    v-if="member.linkedin"
                    :href="member.linkedin"
                    class="text-muted"
                    @click.prevent="openSocialLink('linkedin', member.linkedin)"
                  >
                    <i class="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="list-group">
          <div
            v-for="member in teamMembers"
            :key="member.id"
            class="list-group-item d-flex align-items-center"
          >
            <img
              :src="member.avatar"
              :alt="member.name"
              class="rounded-circle me-3"
              style="width: 40px; height: 40px; object-fit: cover"
            />
            <div class="flex-grow-1">
              <h6 class="mb-0">{{ member.name }}</h6>
              <small class="text-muted">{{ member.position }}</small>
            </div>
            <div class="d-flex gap-2">
              <a
                v-if="member.instagram"
                :href="member.instagram"
                class="text-muted"
                @click.prevent="openSocialLink('instagram', member.instagram)"
              >
                <i class="bi bi-instagram"></i>
              </a>
              <a
                v-if="member.linkedin"
                :href="member.linkedin"
                class="text-muted"
                @click.prevent="openSocialLink('linkedin', member.linkedin)"
              >
                <i class="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <button class="btn btn-primary px-4" @click="saveTeamChanges">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const viewMode = ref("grid");

const teamMembers = ref([
  {
    id: 1,
    name: "Celestin Gardinier",
    position: "CEO & Co-Founder",
    avatar:
      "/placeholder.svg?height=60&width=60&query=professional+man+with+glasses",
    instagram: "https://instagram.com/celestin",
    linkedin: "https://linkedin.com/in/celestin",
  },
  {
    id: 2,
    name: "Reynaud Colbert",
    position: "Co-Founder",
    avatar:
      "/placeholder.svg?height=60&width=60&query=professional+man+blue+shirt",
    instagram: "https://instagram.com/reynaud",
    linkedin: "https://linkedin.com/in/reynaud",
  },
  {
    id: 3,
    name: "Arienne Lyon",
    position: "Managing Director",
    avatar:
      "/placeholder.svg?height=60&width=60&query=professional+woman+blonde",
    instagram: "https://instagram.com/arienne",
    linkedin: "https://linkedin.com/in/arienne",
  },
  {
    id: 4,
    name: "Bernard Alexander",
    position: "Managing Director",
    avatar:
      "/placeholder.svg?height=60&width=60&query=professional+man+dark+hair",
    instagram: "https://instagram.com/bernard",
    linkedin: "https://linkedin.com/in/bernard",
  },
  {
    id: 5,
    name: "Christine Jhonson",
    position: "Managing Director",
    avatar:
      "/placeholder.svg?height=60&width=60&query=professional+woman+dark+hair",
    instagram: "https://instagram.com/christine",
    linkedin: "https://linkedin.com/in/christine",
  },
  {
    id: 6,
    name: "Aaron Morgan",
    position: "Managing Director",
    avatar: "/placeholder.svg?height=60&width=60&query=professional+man+beard",
    instagram: "https://instagram.com/aaron",
    linkedin: "https://linkedin.com/in/aaron",
  },
]);

const setViewMode = (mode) => {
  viewMode.value = mode;
  console.log("View mode changed to:", mode);
};

const addMembers = () => {
  console.log("Adding new team members");
  // Here you would typically open a modal or navigate to add member form
};

const openSocialLink = (platform, url) => {
  console.log(`Opening ${platform} link:`, url);
  // Here you would typically open the link in a new tab
};

const saveTeamChanges = () => {
  console.log("Saving team changes");
  alert("Team changes saved successfully!");
};
</script>
