<template>
  <div class="container my-4">
    <div class="card shadow">
      <!-- Banner Section -->
      <div class="banner-section"
           :style="{ height: '140px', background: editableProfile.bannerGradient || profile.bannerGradient }">
        <!-- Edit Button -->
        <div class="position-absolute top-0 end-0 m-3" style="z-index: 2;">
          <button class="btn btn-light btn-sm rounded-circle p-2"
                  @click="toggleEditMode"
                  :title="isEditing ? 'Save Changes' : 'Edit Profile'">
            <i class="bi" :class="isEditing ? 'bi-check-lg' : 'bi-pencil'"></i>
          </button>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="card-body pt-5 mt-4 position-relative">
        <!-- Profile Image -->
        <div class="position-absolute profile-image-container"
             style="top: -80px; left: 25px; z-index: 1;">
          <div class="rounded-circle border border-4 border-white overflow-hidden"
               style="height: 120px; width: 120px; background-color: #4da9ff;">
            <div v-if="!avatar" style="height: 100%; width: 100%;"></div>
            <img v-else :src="avatar" class="w-100 h-100" alt="Profile image" />
          </div>
        </div>

        <!-- Profile Info Section -->
        <div class="row align-items-end mb-3">
          <div class="col-md-8">
            <!-- Name -->
            <div v-if="!isEditing" class="h1 mb-1">{{ profile.name }}</div>
            <input v-else type="text" class="form-control form-control-lg mb-2"
                   v-model="editableProfile.name" placeholder="Your Name">

            <!-- Position and Company -->
            <div v-if="!isEditing" class="h4 text-muted mb-0">
              {{ profile.position }} at <span class="text-dark">{{ profile.company }}</span>
            </div>
            <div v-else class="d-flex gap-2">
              <input type="text" class="form-control mb-2"
                     v-model="editableProfile.position" placeholder="Position">
              <span class="align-self-center">at</span>
              <input type="text" class="form-control mb-2"
                     v-model="editableProfile.company" placeholder="Company">
            </div>
          </div>

          <div class="col-md-4 text-md-end mt-3 mt-md-0">
            <button class="btn btn-outline-primary px-4" @click="toggleEditMode">
              {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
            </button>
          </div>
        </div>

        <!-- Location -->
        <div class="d-flex align-items-center mb-3">
          <i class="bi bi-geo-alt me-2 text-muted"></i>
          <div v-if="!isEditing" class="text-muted fs-5">{{ profile.location }}</div>
          <input v-else type="text" class="form-control"
                 v-model="editableProfile.location" placeholder="Location">
        </div>

        <!-- Open for Opportunities -->
        <div class="mb-3">
          <div v-if="!isEditing && profile.openToOpportunities"
               class="d-inline-flex align-items-center bg-light-success text-success px-3 py-2 rounded">
            <i class="bi bi-flag me-2"></i>
            <span class="fw-medium">OPEN FOR OPPORTUNITIES</span>
          </div>

          <div v-if="isEditing" class="form-check">
            <input class="form-check-input" type="checkbox"
                   v-model="editableProfile.openToOpportunities" id="opportunitiesCheck">
            <label class="form-check-label" for="opportunitiesCheck">
              Open for opportunities
            </label>
          </div>
        </div>

        <!-- Banner Gradient Input -->
        <div v-if="isEditing" class="mb-3">
          <label class="form-label">Banner Background (CSS Gradient or Color)</label>
          <input type="text" class="form-control"
                 v-model="editableProfile.bannerGradient"
                 placeholder="e.g. linear-gradient(90deg, #ffd1dc, #c995c0, #6b4887)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  data() {
    return {
      isEditing: false,
      avatar: null,
      profile: {
        name: 'Jake Gyll',
        position: 'Product Designer',
        company: 'Twitter',
        location: 'Manchester, UK',
        openToOpportunities: true,
        bannerGradient: 'linear-gradient(90deg, #ffd1dc 0%, #c995c0 50%, #6b4887 100%)'
      },
      editableProfile: {
        name: '',
        position: '',
        company: '',
        location: '',
        openToOpportunities: false,
        bannerGradient: ''
      }
    };
  },
  methods: {
    toggleEditMode() {
      if (this.isEditing) {
        // Save changes
        this.profile = { ...this.editableProfile };
        this.isEditing = false;
      } else {
        // Enter edit mode
        this.editableProfile = { ...this.profile };
        this.isEditing = true;
      }
    }
  }
}
</script>

<style scoped>
.bg-light-success {
  background-color: rgba(25, 135, 84, 0.1);
}

/* Add Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");
</style>
