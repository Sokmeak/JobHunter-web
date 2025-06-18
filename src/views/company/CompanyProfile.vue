<template>
  <div class="company-profile-settings">
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Company Profile</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveProfile">
          <!-- Company Logo with Drag & Drop -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Company Logo</label>
            <div
              class="d-flex align-items-center logo-dropzone"
              :class="{ dragover: isDragOver }"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
            >
              <div class="me-3">
                <img
                  :src="
                    companyData.logo || '/placeholder.svg?height=80&width=80'
                  "
                  class="rounded"
                  width="80"
                  height="80"
                  alt="Company Logo"
                />
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2"
                  @click="triggerFileInput"
                >
                  <i class="bi bi-upload me-1"></i>Upload New Logo
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm me-2"
                  @click="showOnlinePicker = true"
                >
                  <i class="bi bi-cloud-upload me-1"></i>Select from Online
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="removeLogo"
                >
                  Remove
                </button>
                <div class="small text-muted mt-1">
                  Recommended size: 400x400px. Max file size: 2MB.
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

          <!-- Form Fields -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Company Name <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                v-model="companyData.name"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Industry</label>
              <select class="form-select" v-model="companyData.industry">
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Company Size</label>
              <select class="form-select" v-model="companyData.size">
                <option value="">Select Company Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Founded Year</label>
              <input
                type="number"
                class="form-control"
                v-model="companyData.foundedYear"
                min="1800"
                :max="new Date().getFullYear()"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Website</label>
              <input
                type="url"
                class="form-control"
                v-model="companyData.website"
                placeholder="https://example.com"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">LinkedIn</label>
              <input
                type="url"
                class="form-control"
                v-model="companyData.linkedin"
                placeholder="https://linkedin.com/company/example"
              />
            </div>
            <div class="col-12 mb-3">
              <label class="form-label fw-semibold">Company Description</label>
              <textarea
                class="form-control"
                rows="4"
                v-model="companyData.description"
                placeholder="Tell us about your company..."
              ></textarea>
            </div>
          </div>

          <!-- Address Information -->
          <h6 class="fw-bold mb-3 mt-4">Address Information</h6>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Street Address</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.street"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">City</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.city"
              />
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-semibold">State/Province</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.state"
              />
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-semibold">ZIP/Postal Code</label>
              <input
                type="text"
                class="form-control"
                v-model="companyData.address.zipCode"
              />
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label fw-semibold">Country</label>
              <select class="form-select" v-model="companyData.address.country">
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-2 mt-4">
            <button type="button" class="btn btn-outline-secondary">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Online Picker Modal -->
    <div
      class="modal fade show d-block"
      tabindex="-1"
      v-if="showOnlinePicker"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Select Logo from Online</h5>
            <button
              type="button"
              class="btn-close"
              @click="showOnlinePicker = false"
            ></button>
          </div>
          <div class="modal-body">
            <p>Paste the image URL from your online drive or source:</p>
            <input
              type="url"
              class="form-control"
              v-model="onlineImageUrl"
              placeholder="https://example.com/image.png"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="showOnlinePicker = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="selectOnlineImage"
              :disabled="!onlineImageUrl"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCompanyProfileStore } from "@/stores/company/companyProfileStore";

const store = useCompanyProfileStore();
const { companyData } = storeToRefs(store);
const { saveProfile } = store;

const showOnlinePicker = ref(false);
const onlineImageUrl = ref(null);
const fileInput = ref(null);
const isDragOver = ref(false);

const triggerFileInput = () => {
  if (fileInput.value) fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("File size exceeds 2MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    companyData.value.logo = e.target.result; // base64 image URL
  };
  reader.readAsDataURL(file);
};

const onDragOver = () => {
  isDragOver.value = true;
};

const onDragLeave = () => {
  isDragOver.value = false;
};

const onDrop = (event) => {
  isDragOver.value = false;
  const file = event.dataTransfer.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please drop a valid image file.");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("File size exceeds 2MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    companyData.value.logo = e.target.result;
  };
  reader.readAsDataURL(file);
};

const selectOnlineImage = () => {
  companyData.value.logo = onlineImageUrl.value;
  onlineImageUrl.value = null;
  showOnlinePicker.value = false;
};

const removeLogo = () => {
  companyData.value.logo = "";
};
</script>

<style scoped>
.logo-dropzone {
  padding: 12px;
  border: 2px dashed var(--light-gray);
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s ease;
  user-select: none;

  /* Make dropzone bigger */
  min-height: 100px;
  align-items: center;
}

.logo-dropzone.dragover {
  border-color: var(--primary-color);
  background-color: var(--bg-light);
  display: flex;
}
</style>
