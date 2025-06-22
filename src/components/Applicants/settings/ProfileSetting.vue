<template>
  <div>
    <div class="section mb-4">
      <h5 class="mb-2">Basic Information</h5>
      <p class="text-muted mb-4">
        This is your personal information that you can update anytime.
      </p>
    </div>

    <div class="section mb-4">
      <h5 class="mb-3">Profile Photo</h5>
      <p class="text-muted mb-3">
        This image will be shown publicly as your profile picture, it will help
        recruiters recognize you!
      </p>

      <div class="d-flex align-items-center">
        <div class="profile-photo-container me-4">
          <img
            :src="profilePhotoUrl"
            alt="Profile Photo"
            class="profile-photo rounded-circle"
          />
        </div>

        <div class="upload-area">
          <div
            class="upload-box d-flex flex-column align-items-center justify-content-center"
          >
            <i class="bi bi-image fs-3 mb-2"></i>
            <p class="mb-1">Click to replace or drag and drop</p>
            <p class="text-muted small">
              SVG, PNG, JPG or GIF (max. 400 x 400px)
            </p>
            <input
              type="file"
              class="file-input"
              @change="handleFileUpload"
              accept="image/svg+xml,image/png,image/jpeg,image/gif"
            />
          </div>
        </div>
      </div>
      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </div>

    <div class="section mb-4">
      <h5 class="mb-3">Personal Details</h5>

      <div class="row mb-3">
        <div class="col-12">
          <label for="fullName" class="form-label"
            >Full Name <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="fullName"
            v-model="formData.fullName"
            required
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6 mb-3 mb-md-0">
          <label for="phone" class="form-label"
            >Phone Number <span class="text-danger">*</span></label
          >
          <input
            type="tel"
            class="form-control"
            id="phone"
            v-model="formData.phone"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label"
            >Email <span class="text-danger">*</span></label
          >
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="formData.email"
            required
            disabled
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6 mb-3 mb-md-0">
          <label for="dateOfBirth" class="form-label"
            >Date of Birth <span class="text-danger">*</span></label
          >
          <div class="input-group">
      <input
        type="date"
        class="form-control"
        id="dateOfBirth"
        v-model="formData.dateOfBirth"
        required
      />
      <span class="input-group-text">
        <i class="bi bi-calendar"></i>
      </span>
          </div>
        </div>
        <div class="col-md-6">
          <label for="gender" class="form-label"
            >Gender <span class="text-danger">*</span></label
          >
          <select
            class="form-select"
            id="gender"
            v-model="formData.gender"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>

    <div class="section mb-4">
      <h5 class="mb-3">Account Type</h5>
      <p class="text-muted mb-3">My account type</p>

      <div class="form-check mb-2">
        <input
          class="form-check-input"
          type="radio"
          name="accountType"
          id="jobSeeker"
          value="jobSeeker"
          v-model="formData.accountType"
          disabled
        />
        <label class="form-check-label" for="jobSeeker">
          <div class="fw-bold">Job Seeker</div>
          <div class="text-muted">Looking for a job</div>
        </label>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button
        class="btn btn-primary px-4"
        @click="saveProfile"
        :disabled="isSaving"
      >
        {{ isSaving ? "Saving..." : "Save Profile" }}
      </button>
    </div>
  </div>
</template>

<script>
import { useUserProfileStore } from "@/stores/ApplicantStore/userProfile";

export default {
  name: "ProfileSettings",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const profileStore = useUserProfileStore();
    return { profileStore };
  },
  data() {
    return {
      formData: {
        fullName: this.user.fullName || "",
        email: this.user.email || "",
        phone: this.user.phone || "",
        dateOfBirth: this.user.dateOfBirth || "",
        gender: this.user.gender || "",
        accountType: this.user.accountType || "jobSeeker",
        profilePhoto: null,
      },
      profilePhotoUrl:
        this.user.profilePhoto || "https://via.placeholder.com/80",
      error: null,
      isSaving: false,
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file type and size
      const allowedTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        this.error = "Invalid file type. Please upload SVG, PNG, JPG, or GIF.";
        return;
      }
      if (file.size > 400 * 400 * 4) { // Approx 400x400px image
        this.error = "File size too large. Max 400x400px.";
        return;
      }

      this.formData.profilePhoto = file;
      this.profilePhotoUrl = URL.createObjectURL(file);
      this.error = null;

      // Upload immediately
      try {
        this.isSaving = true;
        const formData = new FormData();
        formData.append("file", file);
        await this.profileStore.uploadProfileImage(formData);
        this.profilePhotoUrl = (await this.profileStore.fetchProfile()).profileImage;
      } catch (err) {
        this.error = "Failed to upload profile photo. Please try again.";
        console.error("Profile photo upload error:", err);
      } finally {
        this.isSaving = false;
      }
    },
    async saveProfile() {
      // Validate form data
      if (!this.formData.fullName.trim()) {
        this.error = "Full name is required.";
        return;
      }
      if (!this.formData.phone.trim()) {
        this.error = "Phone number is required.";
        return;
      }
      if (!this.formData.dateOfBirth) {
        this.error = "Date of birth is required.";
        return;
      }
      if (!this.formData.gender) {
        this.error = "Gender is required.";
        return;
      }

      this.error = null;
      this.isSaving = true;

      try {
        const profileData = {
          jobseeker_name: this.formData.fullName,
          phone: this.formData.phone,
          dateOfBirth: this.formData.dateOfBirth,
          gender: this.formData.gender,
          accountType: this.formData.accountType,
        };
        const success = await this.profileStore.updateProfile(profileData);
        if (success) {
          await this.profileStore.fetchProfile(); // Refresh profile
          this.$emit("saved", profileData);
        } else {
          throw new Error("Profile update failed.");
        }
      } catch (err) {
        this.error = this.profileStore.error || "Failed to save profile. Please try again.";
        console.error("Save profile error:", err);
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>

<style scoped>
.section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 20px;
}

.profile-photo {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.upload-box {
  border: 2px dashed #6366f1;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  height: 150px;
  position: relative;
  cursor: pointer;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: #6366f1;
  border-color: #6366f1;
}
</style>