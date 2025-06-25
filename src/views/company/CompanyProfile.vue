<template>
  <div class="company-profile-settings">
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Company Profile</h5>
        <small class="text-muted">
          {{
            profileExists
              ? "Update your company information"
              : "Create your company profile"
          }}
        </small>
      </div>
      <div class="card-body">
        <!-- Loading State -->
        <div v-if="loading && !hasTriedFetching" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading company profile...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger">
          <h6>Error Loading Profile</h6>
          <p>{{ error }}</p>
          <button @click="loadProfile" class="btn btn-sm btn-primary">
            Try Again
          </button>
        </div>

        <!-- New Profile Message -->
        <div v-else-if="isEmptyProfile" class="alert alert-info">
          <h6>
            <i class="bi bi-info-circle me-2"></i>Welcome! Let's set up your
            company profile
          </h6>
          <p class="mb-0">
            It looks like this is your first time here. Fill out the information
            below to create your company profile.
          </p>
        </div>

        <!-- Profile Form -->
        <form
          v-if="!loading || hasTriedFetching"
          @submit.prevent="handleSaveProfile"
        >
          <!-- Company Logo Section -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Company Logo</label>
            <div class="d-flex align-items-center logo-upload-section">
              <div class="me-3">
                <div class="logo-container">
                  <img
                    v-if="companyData.logo"
                    :src="companyData.logo"
                    class="rounded company-logo-preview"
                    width="80"
                    height="80"
                    alt="Company Logo"
                    @error="companyData.logo = ''"
                  />
                  <div
                    v-else
                    class="logo-placeholder rounded d-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-building fs-1 text-muted"></i>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2"
                  @click="triggerFileInput"
                  :disabled="loading"
                >
                  <i class="bi bi-upload me-1"></i>
                  {{ companyData.logo ? "Change Logo" : "Upload Logo" }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm me-2"
                  @click="showOnlinePicker = true"
                  :disabled="loading"
                >
                  <i class="bi bi-link me-1"></i>From URL
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="handleRemoveLogo"
                  :disabled="loading || !companyData.logo"
                >
                  <i class="bi bi-trash me-1"></i>Remove
                </button>
                <div class="small text-muted mt-1">
                  Recommended: 400x400px, max 2MB. Supports JPG, PNG, GIF.
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref="fileInput"
                  class="d-none"
                  @change="handleFileUpload"
                />
              </div>
            </div>
          </div>

          <!-- Basic Information -->
          <h6 class="fw-bold mb-3 mt-4">
            <i class="bi bi-building me-2"></i>Basic Information
          </h6>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">
                Company Name <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.name"
                placeholder="Enter company name"
                required
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">HR Contact Name</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.hr_contact_name"
                placeholder="Enter HR contact name"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">HR Contact Email</label>
              <input
                type="email"
                class="form-control"
                v-model="companyData.hr_contact_email"
                placeholder="hr@company.com"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Industry</label>
              <select
                class="form-select"
                v-model="companyData.industry"
                :disabled="loading"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Consulting">Consulting</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Media & Entertainment">
                  Media & Entertainment
                </option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="Government">Government</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Company Size</label>
              <select
                class="form-select"
                v-model="companyData.size"
                :disabled="loading"
              >
                <option value="">Select Company Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001-5000">1001-5000 employees</option>
                <option value="5000+">5000+ employees</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Founded Year</label>
              <input
                type="number"
                class="form-control"
                v-model.number="companyData.foundedYear"
                min="1800"
                :max="currentYear"
                placeholder="e.g. 2010"
                :disabled="loading"
              />
            </div>
          </div>

          <!-- Online Presence -->
          <h6 class="fw-bold mb-3 mt-4 border-top pt-4">
            <i class="bi bi-globe me-2"></i>Online Presence
          </h6>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Website</label>
              <input
                type="url"
                class="form-control"
                v-model="companyData.website"
                placeholder="https://www.company.com"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">LinkedIn</label>
              <input
                type="url"
                class="form-control"
                v-model="companyData.linkedin"
                placeholder="https://linkedin.com/company/yourcompany"
                :disabled="loading"
              />
            </div>
          </div>

          <!-- Company Description -->
          <div class="col-12 mb-3">
            <label class="form-label fw-semibold">Company Description</label>
            <textarea
              class="form-control"
              rows="4"
              v-model="companyData.description"
              placeholder="Describe your company, mission, values, and what makes you unique..."
              :disabled="loading"
              maxlength="500"
            ></textarea>
            <div class="form-text">
              {{
                companyData.description ? companyData.description.length : 0
              }}/500 characters
            </div>
          </div>

          <!-- Address Information -->
          <h6 class="fw-bold mb-3 mt-4 border-top pt-4">
            <i class="bi bi-geo-alt me-2"></i>Address Information
          </h6>
          <div class="row">
            <div class="col-md-12 mb-3">
              <label class="form-label fw-semibold">Street Address</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.street"
                placeholder="123 Business Street, Suite 100"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">City</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.city"
                placeholder="City"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">State/Province</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.state"
                placeholder="State/Province"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">ZIP/Postal Code</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.zipCode"
                placeholder="12345"
                :disabled="loading"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Country</label>
              <select
                class="form-select"
                v-model="companyData.address.country"
                :disabled="loading"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
                <option value="NL">Netherlands</option>
                <option value="BE">Belgium</option>
                <option value="CH">Switzerland</option>
                <option value="SE">Sweden</option>
                <option value="NO">Norway</option>
                <option value="DK">Denmark</option>
                <option value="FI">Finland</option>
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="CN">China</option>
                <option value="IN">India</option>
                <option value="SG">Singapore</option>
                <option value="HK">Hong Kong</option>
                <option value="BR">Brazil</option>
                <option value="MX">Mexico</option>
                <option value="AR">Argentina</option>
                <option value="ZA">South Africa</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="resetForm"
              :disabled="loading"
            >
              <i class="bi bi-arrow-clockwise me-1"></i>Reset
            </button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              <i v-else class="bi bi-check-circle me-1"></i>
              {{ profileExists ? "Update Profile" : "Create Profile" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Online Image URL Modal -->
    <div
      v-if="showOnlinePicker"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">
              <i class="bi bi-link me-2"></i>Add Logo from URL
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeOnlinePicker"
            ></button>
          </div>
          <div class="modal-body">
            <p class="text-muted">
              Enter the direct URL to your company logo image:
            </p>
            <input
              type="url"
              class="form-control"
              v-model="onlineImageUrl"
              placeholder="https://example.com/logo.png"
              @keyup.enter="selectOnlineImage"
            />
            <div class="mt-2">
              <small class="text-muted">
                Make sure the URL points directly to an image file (jpg, png,
                gif, webp, etc.)
              </small>
            </div>
            <!-- URL Preview -->
            <div v-if="onlineImageUrl" class="mt-3">
              <small class="text-muted d-block mb-2">Preview:</small>
              <img
                :src="onlineImageUrl"
                class="img-thumbnail"
                style="max-width: 100px; max-height: 100px"
                @error="handlePreviewError"
                @load="handlePreviewLoad"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeOnlinePicker"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="selectOnlineImage"
              :disabled="!onlineImageUrl || loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Set Logo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/company/accountStore";
import { useCompanyProfileStore } from "@/stores/company/companyProfileStore";
import { useAuthStore } from "@/stores/company/auth";

// Store setup
const store = useCompanyProfileStore();
const { companyData, loading, error, profileExists, hasTriedFetching } =
  storeToRefs(store);
const {
  fetchProfile,
  saveProfile,
  uploadLogo,
  setLogoFromUrl,
  removeLogo,
  isEmptyProfile,
} = store;

// Component state
const showOnlinePicker = ref(false);
const onlineImageUrl = ref("");
const fileInput = ref(null);

// Computed properties
const currentYear = computed(() => new Date().getFullYear());

// Load profile data when component mounts
onMounted(async () => {
  console.log("🚀 CompanyProfile component mounted");

  if (!hasTriedFetching.value) {
    await loadProfile();
  } else {
    console.log("ℹ️ Already tried fetching, skipping to avoid loops");
  }
});

// Load profile data
const loadProfile = async () => {
  try {
    console.log("📥 Attempting to load company profile...");
    await fetchProfile();

    if (profileExists.value) {
      console.log("✅ Profile loaded successfully");
    } else {
      console.log("ℹ️ No profile exists yet - ready for creation");
    }
  } catch (err) {
    console.error("❌ Failed to load profile:", err);
  }
};

// Handle form submission
const handleSaveProfile = async () => {
  try {
    console.log("💾 Saving company profile...");
    await saveProfile();
    console.log("✅ Profile saved successfully");
  } catch (err) {
    console.error("❌ Failed to save profile:", err);
  }
};

// File input trigger
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  console.log("📤 Uploading file:", file.name, file.size, "bytes");

  try {
    await uploadLogo(file);
    console.log("✅ Logo uploaded successfully");
  } catch (err) {
    console.error("❌ Failed to upload logo:", err);
  }

  // Clear the input
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

// Online image selection
const selectOnlineImage = async () => {
  if (!onlineImageUrl.value) return;

  try {
    console.log("🖼️ Setting logo from URL:", onlineImageUrl.value);
    setLogoFromUrl(onlineImageUrl.value);
    closeOnlinePicker();
    console.log("✅ Logo set from URL successfully");
  } catch (err) {
    console.error("❌ Failed to set logo from URL:", err);
  }
};

// Close online picker modal
const closeOnlinePicker = () => {
  showOnlinePicker.value = false;
  onlineImageUrl.value = "";
};

// Handle logo removal
const handleRemoveLogo = async () => {
  if (!confirm("Are you sure you want to remove the company logo?")) {
    return;
  }

  try {
    console.log("🗑️ Removing logo...");
    removeLogo();
    console.log("✅ Logo removed successfully");
  } catch (err) {
    console.error("❌ Failed to remove logo:", err);
  }
};

// Handle preview image errors in modal
const handlePreviewError = (event) => {
  console.warn("⚠️ Preview image failed to load");
  event.target.style.display = "none";
};

// Handle preview image load success
const handlePreviewLoad = (event) => {
  console.log("✅ Preview image loaded successfully");
  event.target.style.display = "block";
};

// Reset form
const resetForm = () => {
  if (
    confirm(
      "Are you sure you want to reset all changes? This will reload the original data."
    )
  ) {
    if (profileExists.value) {
      loadProfile();
    } else {
      store.resetProfile();
    }
  }
};
</script>

<style scoped>
.logo-container {
  width: 80px;
  height: 80px;
}

.logo-placeholder {
  width: 80px;
  height: 80px;
  border: 2px dashed #dee2e6;
  background-color: #f8f9fa;
  transition: border-color 0.2s ease;
}

.logo-placeholder:hover {
  border-color: #4640de;
  background-color: #f0f4ff;
}

.company-logo-preview {
  border: 2px solid #e9ecef;
  object-fit: cover;
  transition: border-color 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.company-logo-preview:hover {
  border-color: #4640de;
}

.logo-upload-section {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.form-control:disabled,
.form-select:disabled {
  background-color: #f8f9fa;
  opacity: 0.8;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.modal.show {
  display: block !important;
}

.border-top {
  border-color: #e9ecef !important;
}

.alert-info {
  background-color: #e7f3ff;
  border-color: #b3d9ff;
  color: #0c5460;
}

.form-control:focus,
.form-select:focus {
  border-color: #4640de;
  box-shadow: 0 0 0 0.2rem rgba(70, 64, 222, 0.25);
}

.btn-primary {
  background-color: #4640de;
  border-color: #4640de;
}

.btn-primary:hover {
  background-color: #3b36b8;
  border-color: #3b36b8;
}

.btn-outline-primary {
  color: #4640de;
  border-color: #4640de;
}

.btn-outline-primary:hover {
  background-color: #4640de;
  border-color: #4640de;
  color: white;
}

.img-thumbnail {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 2px;
}

@media (max-width: 768px) {
  .logo-upload-section {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .logo-upload-section .me-3 {
    margin-right: 0 !important;
    margin-bottom: 1rem;
  }

  .d-flex.justify-content-end {
    flex-direction: column;
    gap: 0.5rem;
  }

  .d-flex.justify-content-end .btn {
    width: 100%;
  }
}
</style>
