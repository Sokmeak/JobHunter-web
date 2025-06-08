<template>
  <div class="container my-1">
    <div class="card">
      <!-- Banner Section -->
      <div
        class="banner-section position-relative"
        :style="{
          height: '140px',
          background: currentBanner
            ? `url(${currentBanner}) center/cover`
            : profile.bannerGradient,
        }"
      >
        <div
          v-if="isEditing"
          class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style="background-color: rgba(0, 0, 0, 0.4); cursor: pointer"
          @click="triggerBannerInput"
        >
          <div class="text-center text-white">
            <i class="bi bi-camera-fill" style="font-size: 2rem"></i>
            <div class="mt-2">Upload Banner</div>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="card-body pt-5 mt-4 position-relative">
        <!-- Profile Image -->
        <div
          class="position-absolute profile-image-container"
          style="top: -80px; left: 25px; z-index: 1"
        >
          <div
            class="rounded-circle border border-4 border-white overflow-hidden position-relative"
            style="height: 120px; width: 120px; background-color: #4da9ff"
          >
            <div
              v-if="!currentAvatar"
              class="d-flex align-items-center justify-content-center h-100 w-100 text-white"
            >
              <i class="bi bi-person-fill" style="font-size: 3rem"></i>
            </div>
            <img
              v-else
              :src="currentAvatar"
              class="w-100 h-100 object-fit-cover"
              alt="Profile image"
            />
            <div
              v-if="isEditing"
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style="background-color: rgba(0, 0, 0, 0.6); cursor: pointer"
              @click="triggerFileInput"
            >
              <div class="text-center text-white">
                <i class="bi bi-camera-fill" style="font-size: 1.5rem"></i>
                <div class="small mt-1">Upload</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hidden file inputs -->
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleProfileUpload"
        />
        <input
          ref="bannerInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="handleBannerUpload"
        />

        <!-- Profile Info Section -->
        <div class="row align-items-end mb-3">
          <div class="col-md-8">
            <div v-if="!isEditing" class="h1 mb-1">{{ profile.name }}</div>
            <input
              v-else
              type="text"
              class="form-control form-control-lg mb-2"
              v-model="editableProfile.name"
              placeholder="Your Name"
              required
            />
            <div v-if="!isEditing" class="h4 text-muted mb-0">
              {{ profile.title }} at
              <span class="text-dark">{{ profile.company }}</span>
            </div>
            <div v-else class="d-flex gap-2">
              <input
                type="text"
                class="form-control mb-2"
                v-model="editableProfile.title"
                placeholder="Position"
              />
              <span class="align-self-center">at</span>
              <input
                type="text"
                class="form-control mb-2"
                v-model="editableProfile.company"
                placeholder="Company"
              />
            </div>
          </div>
          <div class="col-md-4 text-md-end mt-3 mt-md-0">
            <button
              class="btn btn-outline-primary px-4"
              @click="toggleEditMode"
              :disabled="isEditing && (!editableProfile.name || !editableProfile.email)"
            >
              {{ isEditing ? "Save Changes" : "Edit Profile" }}
            </button>
          </div>
        </div>

        <!-- Location -->
        <div class="d-flex align-items-center mb-3">
          <i class="bi bi-geo-alt me-2 text-muted"></i>
          <div v-if="!isEditing" class="text-muted fs-5">
            {{ profile.location }}
          </div>
          <input
            v-else
            type="text"
            class="form-control"
            v-model="editableProfile.location"
            placeholder="Location"
          />
        </div>

        <!-- Open for Opportunities -->
        <div class="mb-3">
          <div
            v-if="!isEditing && profile.openToOpportunities"
            class="d-inline-flex align-items-center bg-light-success text-success px-3 py-2 rounded"
          >
            <i class="bi bi-flag me-2"></i>
            <span class="fw-medium">OPEN FOR OPPORTUNITIES</span>
          </div>
          <div v-if="isEditing" class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="editableProfile.openToOpportunities"
              id="opportunitiesCheck"
            />
            <label class="form-check-label" for="opportunitiesCheck">
              Open for opportunities
            </label>
          </div>
        </div>

        <!-- Profile Image Upload Section (Edit Mode) -->
        <div v-if="isEditing" class="mb-3">
          <div class="d-flex gap-2 align-items-center">
            <button
              v-if="currentAvatar"
              class="btn btn-outline-danger btn-sm"
              @click="removeImage"
            >
              Remove Profile Image
            </button>
          </div>
        </div>

        <!-- Banner Upload Section (Edit Mode) -->
        <div v-if="isEditing" class="mb-3">
          <div class="d-flex gap-2 align-items-center">
            <button
              v-if="currentBanner"
              class="btn btn-outline-danger btn-sm"
              @click="removeBanner"
            >
              Remove Banner
            </button>
          </div>
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
  name: "ProfileCard",
  props: {
    profile: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        title: "",
        company: "",
        location: "",
        email: "",
        openToOpportunities: false,
        bannerGradient: "linear-gradient(90deg, #ffd1dc 0%, #c995c0 50%, #6b4887 100%)",
        avatar: null,
        banner: null,
      }),
    },
    error: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isEditing: false,
      currentAvatar: null,
      currentBanner: null,
      uploadError: null,
      editableProfile: {
        name: "",
        title: "",
        company: "",
        location: "",
        email: "",
        openToOpportunities: false,
        bannerGradient: "",
        avatar: null,
        banner: null,
      },
    };
  },
  methods: {
    toggleEditMode() {
      if (this.isEditing) {
        if (!this.editableProfile.name) {
          this.uploadError = "Name is required";
          return;
        }
        if (!this.validateEmail(this.editableProfile.email)) {
          this.uploadError = "Valid email is required";
          return;
        }
        this.$emit("update-profile", { ...this.editableProfile });
        this.currentAvatar = this.editableProfile.avatar;
        this.currentBanner = this.editableProfile.banner;
        this.isEditing = false;
        this.uploadError = null;
      } else {
        this.editableProfile = { ...this.profile };
        this.isEditing = true;
        this.uploadError = null;
      }
    },

    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
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
      if (!this.validateFile(file)) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editableProfile.avatar = e.target.result;
        this.currentAvatar = e.target.result;
      };
      reader.onerror = () => {
        this.uploadError = "Error reading the profile image. Please try again.";
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    },

    handleBannerUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (!this.validateFile(file)) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.editableProfile.banner = e.target.result;
        this.currentBanner = e.target.result;
      };
      reader.onerror = () => {
        this.uploadError = "Error reading the banner image. Please try again.";
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    },

    validateFile(file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        this.uploadError = "Please select a valid image file (JPG, PNG, or GIF).";
        return false;
      }
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.uploadError = "File size must be less than 5MB.";
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
    },
  },
  watch: {
    profile: {
      immediate: true,
      deep: true,
      handler(newProfile) {
        this.currentAvatar = newProfile.avatar;
        this.currentBanner = newProfile.banner;
        if (!this.isEditing) {
          this.editableProfile = { ...newProfile };
        }
      },
    },
    error(newError) {
      if (newError) {
        this.uploadError = newError;
      }
    },
  },
};
</script>

<style scoped>
.bg-light-success {
  background-color: rgba(25, 135, 84, 0.1);
}
.object-fit-cover {
  object-fit: cover;
}
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");
</style>