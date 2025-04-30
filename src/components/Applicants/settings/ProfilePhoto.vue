<!-- src/components/settings/ProfilePhoto.vue -->
<template>
  <div class="profile-photo-section mb-4">
    <h5 class="section-title">Profile Photo</h5>
    <p class="text-muted">
      This image will be shown publicly as your profile picture, it will help
      recruiters recognize you!
    </p>

    <div class="d-flex mt-3">
      <div class="profile-image-container me-4">
        <img
          :src="displayPhotoUrl"
          alt="Profile Photo"
          class="profile-image rounded-circle"
        />
      </div>

      <div class="upload-area d-flex align-items-center justify-content-center">
        <div class="upload-box border rounded p-4 text-center">
          <i class="bi bi-image mb-2 d-block" style="font-size: 1.5rem"></i>
          <div>
            <button class="btn btn-link p-0" @click="triggerFileInput">
              Click to replace
            </button>
            <span> or drag and drop</span>
          </div>
          <small class="text-muted d-block mt-1"
            >SVG, PNG, JPG or GIF (max. 400 x 400px)</small
          >

          <input
            type="file"
            ref="fileInput"
            class="d-none"
            accept="image/*"
            @change="onFileSelected"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePhoto",
  props: {
    photoUrl: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      selectedFile: null,
    };
  },
  computed: {
    displayPhotoUrl() {
      return this.photoUrl || "https://via.placeholder.com/150";
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit("photo-updated", e.target.result);
        };
        reader.readAsDataURL(this.selectedFile);
      }
    },
  },
};
</script>

<style scoped>
.profile-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.upload-box {
  width: 300px;
  height: 120px;
  border-style: dashed !important;
  cursor: pointer;
}

.upload-box:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
