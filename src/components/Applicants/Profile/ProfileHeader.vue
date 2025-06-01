<template>
  <div class="container my-4">
    <div class="card shadow">
      <!-- Banner Section -->
      <div class="banner-section position-relative"
           :style="{ 
             height: '140px', 
             background: currentBanner ? `url(${currentBanner}) center/cover` : (editableProfile.bannerGradient || profile.bannerGradient)
           }">
        <!-- Edit Button -->
        <div class="position-absolute top-0 end-0 m-3" style="z-index: 2;">
          <button class="btn btn-light btn-sm rounded-circle p-2"
                  @click="toggleEditMode"
                  :title="isEditing ? 'Save Changes' : 'Edit Profile'">
            <i class="bi" :class="isEditing ? 'bi-check-lg' : 'bi-pencil'"></i>
          </button>
        </div>
        
        <!-- Banner Upload Overlay (Edit Mode) -->
        <div v-if="isEditing" 
             class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
             style="background-color: rgba(0,0,0,0.4); cursor: pointer;"
             @click="triggerBannerInput">
          <div class="text-center text-white">
            <i class="bi bi-camera-fill" style="font-size: 2rem;"></i>
            <div class="mt-2">Upload Banner</div>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="card-body pt-5 mt-4 position-relative">
        <!-- Profile Image -->
        <div class="position-absolute profile-image-container"
             style="top: -80px; left: 25px; z-index: 1;">
          <div class="rounded-circle border border-4 border-white overflow-hidden position-relative"
               style="height: 120px; width: 120px; background-color: #4da9ff;">
            <!-- Default avatar background when no image -->
            <div v-if="!currentAvatar" 
                 class="d-flex align-items-center justify-content-center h-100 w-100 text-white">
              <i class="bi bi-person-fill" style="font-size: 3rem;"></i>
            </div>
            <!-- Profile image -->
            <img v-else :src="currentAvatar" class="w-100 h-100 object-fit-cover" alt="Profile image" />
            
            <!-- Upload overlay for edit mode -->
            <div v-if="isEditing" 
                 class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                 style="background-color: rgba(0,0,0,0.6); cursor: pointer;"
                 @click="triggerFileInput">
              <div class="text-center text-white">
                <i class="bi bi-camera-fill" style="font-size: 1.5rem;"></i>
                <div class="small mt-1">Upload</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hidden file inputs -->
        <input ref="fileInput" 
               type="file" 
               accept="image/*" 
               style="display: none;"
               @change="handleProfileUpload">
        
        <input ref="bannerInput" 
               type="file" 
               accept="image/*" 
               style="display: none;"
               @change="handleBannerUpload">

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

        <!-- Profile Image Upload Section (Edit Mode) -->
        <div v-if="isEditing" class="mb-3">
      
          <div class="d-flex gap-2 align-items-center">
          </div>
        </div>
        <!-- Banner Upload Section (Edit Mode) -->
        <div v-if="isEditing" class="mb-3">
          <!-- Error message -->
          <div v-if="uploadError" class="alert alert-danger mt-2">
            {{ uploadError }}
          </div>
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
      currentAvatar: null,
      currentBanner: null,
      uploadError: null,
      profile: {
        name: 'Jake Gyll',
        position: 'Product Designer',
        company: 'Twitter',
        location: 'Manchester, UK',
        openToOpportunities: true,
        bannerGradient: 'linear-gradient(90deg, #ffd1dc 0%, #c995c0 50%, #6b4887 100%)',
        avatar: null,
        banner: null
      },
      editableProfile: {
        name: '',
        position: '',
        company: '',
        location: '',
        openToOpportunities: false,
        bannerGradient: '',
        avatar: null,
        banner: null
      }
    };
  },
  methods: {
    toggleEditMode() {
      if (this.isEditing) {
        // Save changes
        this.profile = { ...this.editableProfile };
        this.currentAvatar = this.profile.avatar;
        this.currentBanner = this.profile.banner;
        this.isEditing = false;
        this.uploadError = null;
      } else {
        // Enter edit mode
        this.editableProfile = { ...this.profile };
        this.isEditing = true;
        this.uploadError = null;
      }
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    triggerBannerInput() {
      this.$refs.bannerInput.click();
    },

    handleProfileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.uploadError = null;

      if (!this.validateFile(file)) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.editableProfile.avatar = e.target.result;
        this.currentAvatar = e.target.result;
      };
      reader.onerror = () => {
        this.uploadError = 'Error reading the file. Please try again.';
      };
      reader.readAsDataURL(file);

      event.target.value = '';
    },

    handleBannerUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.uploadError = null;

      if (!this.validateFile(file)) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.editableProfile.banner = e.target.result;
        this.currentBanner = e.target.result;
      };
      reader.onerror = () => {
        this.uploadError = 'Error reading the banner file. Please try again.';
      };
      reader.readAsDataURL(file);

      event.target.value = '';
    },

    validateFile(file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        this.uploadError = 'Please select a valid image file (JPG, PNG, or GIF).';
        return false;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        this.uploadError = 'File size must be less than 5MB.';
        return false;
      }

      return true;
    },

    removeImage() {
      this.editableProfile.avatar = null;
      this.currentAvatar = null;
      this.uploadError = null;
    },

    removeBanner() {
      this.editableProfile.banner = null;
      this.currentBanner = null;
      this.uploadError = null;
    }
  },

  mounted() {
    // Initialize current images from profile
    this.currentAvatar = this.profile.avatar;
    this.currentBanner = this.profile.banner;
  }
}
</script>

<style scoped>
.bg-light-success {
  background-color: rgba(25, 135, 84, 0.1);
}

.object-fit-cover {
  object-fit: cover;
}

/* Add Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");
</style>