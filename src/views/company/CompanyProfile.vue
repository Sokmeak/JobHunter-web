<template>
  <div class="company-profile-settings">
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Company Profile</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="saveProfile">
          <!-- Company Logo -->
          <div class="mb-4">
            <label class="form-label fw-semibold">Company Logo</label>
            <div class="d-flex align-items-center">
              <div class="me-3">
                <img
                  :src="companyData.logo"
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
                >
                  <i class="bi bi-upload me-1"></i>
                  Upload New Logo
                </button>
                <button type="button" class="btn btn-outline-secondary btn-sm">
                  Remove
                </button>
                <div class="small text-muted mt-1">
                  Recommended size: 400x400px. Max file size: 2MB.
                </div>
              </div>
            </div>
          </div>

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
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CompanyProfile",
  setup() {
    const companyData = ref({
      name: "Stripe",
      logo: "/placeholder.svg?height=80&width=80",
      industry: "Technology",
      size: "1000+",
      foundedYear: 2010,
      website: "https://stripe.com",
      linkedin: "https://linkedin.com/company/stripe",
      description:
        "Stripe is a technology company that builds economic infrastructure for the internet.",
      address: {
        street: "354 Oyster Point Blvd",
        city: "South San Francisco",
        state: "CA",
        zipCode: "94080",
        country: "US",
      },
    });

    const saveProfile = () => {
      // Save profile logic
      alert("Company profile updated successfully!");
    };

    return {
      companyData,
      saveProfile,
    };
  },
};
</script>
