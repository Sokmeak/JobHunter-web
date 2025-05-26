<template>
  <div class="settings-overview">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-4">
          <h5 class="mb-2">Basic Information</h5>
          <p class="text-muted">
            This is company information that you can update anytime.
          </p>
        </div>
      </div>

      <div class="col-md-6">
        <!-- Company Logo Section -->
        <div class="mb-4">
          <div class="row">
            <div class="col-md-6">
              <h6 class="mb-2">Company Logo</h6>
              <p class="text-muted small">
                This image will be shown publicly as company logo.
              </p>
              <div class="d-flex align-items-center">
                <img
                  :src="placeholder"
                  alt="Company Logo"
                  class="rounded-3 me-3"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="upload-area border-2 border-dashed rounded p-4 text-center"
                style="border-color: #6366f1"
              >
                <i class="bi bi-image text-primary fs-1 mb-2"></i>
                <p class="mb-2">
                  <span class="text-primary">Click to replace</span> or drag and
                  drop
                </p>
                <small class="text-muted">
                  SVG, PNG, JPG or GIF (max. 400 x 400px)
                </small>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Details Form -->
        <div class="row g-3">
          <div class="col-12">
            <h6 class="mb-3">Company Details</h6>
            <p class="text-muted small mb-3">
              Introduce your company core info quickly to users by fill up
              company details
            </p>
          </div>

          <div class="col-12">
            <label class="form-label">Company Name</label>
            <input
              type="text"
              class="form-control"
              v-model="companyData.name"
              placeholder="Nomad"
            />
          </div>

          <div class="col-12">
            <label class="form-label">Website</label>
            <input
              type="url"
              class="form-control"
              v-model="companyData.website"
              placeholder="https://www.nomad.com"
            />
          </div>

          <div class="col-12">
            <label class="form-label">Location</label>
            <div class="d-flex flex-wrap gap-2 mb-2">
              <span
                v-for="location in companyData.locations"
                :key="location"
                class="badge bg-primary-subtle text-primary px-3 py-2"
              >
                {{ location }}
                <button
                  class="btn btn-sm p-0 ms-2"
                  @click="removeLocation(location)"
                  style="background: none; border: none; color: inherit"
                >
                  <i class="bi bi-x"></i>
                </button>
              </span>
            </div>
            <select class="form-select" @change="addLocation">
              <option value="">Add Location</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Employee</label>
            <select class="form-select" v-model="companyData.employeeCount">
              <option value="">Select Employee Count</option>
              <option value="1-10">1 - 10</option>
              <option value="11-50">11 - 50</option>
              <option value="51-200">51 - 200</option>
              <option value="201-500">201 - 500</option>
              <option value="500+">500+</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Industry</label>
            <select class="form-select" v-model="companyData.industry">
              <option value="">Select Industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
            </select>
          </div>

          <div class="col-12">
            <label class="form-label">Date Founded</label>
            <div class="row g-2">
              <div class="col-4">
                <select class="form-select" v-model="companyData.foundedDay">
                  <option value="">Day</option>
                  <option v-for="day in 31" :key="day" :value="day">
                    {{ day }}
                  </option>
                </select>
              </div>
              <div class="col-4">
                <select class="form-select" v-model="companyData.foundedMonth">
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div class="col-4">
                <select class="form-select" v-model="companyData.foundedYear">
                  <option value="">Year</option>
                  <option v-for="year in years" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-12">
            <label class="form-label">Tech Stack</label>
            <div class="d-flex flex-wrap gap-2 mb-2">
              <span
                v-for="tech in companyData.techStack"
                :key="tech"
                class="badge bg-primary-subtle text-primary px-3 py-2"
              >
                {{ tech }}
                <button
                  class="btn btn-sm p-0 ms-2"
                  @click="removeTech(tech)"
                  style="background: none; border: none; color: inherit"
                >
                  <i class="bi bi-x"></i>
                </button>
              </span>
            </div>
            <select class="form-select" @change="addTech">
              <option value="">Add Technology</option>
              <option value="HTML 5">HTML 5</option>
              <option value="CSS 3">CSS 3</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Vue.js">Vue.js</option>
              <option value="Node.js">Node.js</option>
              <option value="Python">Python</option>
            </select>
          </div>
        </div>

        <!-- About Company Section -->
        <div class="row g-3 mt-4">
          <div class="col-md-6">
            <h6 class="mb-2">About Company</h6>
          </div>
          <div class="col-md-6">
            <label class="form-label">Description</label>
            <textarea
              class="form-control"
              rows="4"
              v-model="companyData.description"
              placeholder="Enter company description..."
            ></textarea>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <button class="btn btn-primary px-4" @click="saveCompanyInfo">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import placeholder from "@/assets/images/placeholder.svg";

const companyData = ref({
  name: "Nomad",
  website: "https://www.nomad.com",
  locations: ["England", "Japan", "Australia"],
  employeeCount: "1 - 50",
  industry: "Technology",
  foundedDay: "31",
  foundedMonth: "July",
  foundedYear: "2021",
  techStack: ["HTML 5", "CSS 3", "Javascript"],
  description: "",
});

const years = computed(() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  return years;
});

const addLocation = (event) => {
  const location = event.target.value;
  if (location && !companyData.value.locations.includes(location)) {
    companyData.value.locations.push(location);
    event.target.value = "";
  }
};

const removeLocation = (location) => {
  const index = companyData.value.locations.indexOf(location);
  if (index > -1) {
    companyData.value.locations.splice(index, 1);
  }
};

const addTech = (event) => {
  const tech = event.target.value;
  if (tech && !companyData.value.techStack.includes(tech)) {
    companyData.value.techStack.push(tech);
    event.target.value = "";
  }
};

const removeTech = (tech) => {
  const index = companyData.value.techStack.indexOf(tech);
  if (index > -1) {
    companyData.value.techStack.splice(index, 1);
  }
};

const saveCompanyInfo = () => {
  console.log("Saving company info:", companyData.value);
  alert("Company information saved successfully!");
};
</script>

<style scoped>
.upload-area {
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-area:hover {
  background-color: rgba(99, 102, 241, 0.05);
}
</style>
