<template>
  <div class="company-profile">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <div class="company-logo me-4">
          <div
            class="bg-success rounded-3 p-4"
            style="width: 120px; height: 120px; position: relative"
          >
            <div
              class="text-white fw-bold"
              style="
                font-size: 3rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
            >
              N
            </div>
            <i
              class="bi bi-pencil position-absolute top-0 end-0 bg-white text-dark rounded-circle p-1"
              style="margin: -8px"
            ></i>
          </div>
        </div>
        <div>
          <h2 class="fw-bold mb-1">Nomad</h2>
          <a
            href="#"
            class="text-primary text-decoration-none"
            @click="openCompanyWebsite"
          >
            https://nomad.com
          </a>
        </div>
      </div>
      <div>
        <button class="btn btn-outline-primary me-2" @click="togglePublicView">
          <i class="bi bi-eye me-1"></i>Public View
        </button>
        <button class="btn btn-primary" @click="openProfileSettings">
          <i class="bi bi-gear me-1"></i>Profile Settings
        </button>
      </div>
    </div>

    <!-- Company Info Row -->
    <div class="row mb-4">
      <div class="col-md-3" v-for="info in companyInfo" :key="info.label">
        <div class="d-flex align-items-center">
          <i :class="`bi ${info.icon} text-primary me-2`"></i>
          <div>
            <small class="text-muted">{{ info.label }}</small>
            <div>{{ info.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Left Column -->
    <div class="row">
      <div class="col-lg-8">
        <!-- Company Profile -->
        <div class="card border-0 shadow-sm mb-4">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">Company Profile</h5>
            <button
              class="btn btn-sm btn-outline-primary"
              @click="editCompanyProfile"
            >
              <i class="bi bi-pencil"></i>
            </button>
          </div>
          <div class="card-body">
            <p class="text-muted">
              Nomad is a software platform for starting and running internet
              businesses...
            </p>
          </div>
        </div>

        <!-- Contact -->
        <div class="card border-0 shadow-sm mb-4">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">Contact</h5>
            <div>
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="addContact"
              >
                <i class="bi bi-plus"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-primary"
                @click="editContact"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div
                class="col-md-6"
                v-for="link in socialLinks"
                :key="link.platform"
              >
                <button
                  class="btn btn-outline-primary w-100"
                  @click="openSocialLink(link.platform)"
                >
                  <i :class="`bi ${link.icon} me-2`"></i>{{ link.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Working at Nomad -->
        <div class="card border-0 shadow-sm">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">Working at Nomad</h5>
            <div>
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="addWorkingImage"
              >
                <i class="bi bi-plus"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-primary"
                @click="editWorkingSection"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <img
                  :src="placeholder"
                  class="img-fluid rounded"
                  alt="Office workspace"
                />
              </div>
              <div class="col-md-6">
                <img
                  :src="placeholder"
                  class="img-fluid rounded"
                  alt="Team meeting"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-lg-4">
        <!-- Tech Stack -->
        <div class="card border-0 shadow-sm mb-4">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">Tech Stack</h5>
            <div>
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="addTechStack"
              >
                <i class="bi bi-plus"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-primary"
                @click="editTechStack"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="row g-3 mb-3">
              <div class="col-4" v-for="tech in techStack" :key="tech.name">
                <div
                  class="tech-item text-center p-3 border rounded"
                  @click="viewTechDetails(tech.key)"
                >
                  <div
                    :class="`bg-${tech.color} rounded p-2 mb-2 mx-auto`"
                    style="width: 40px; height: 40px"
                  >
                    <span class="text-white fw-bold small">{{
                      tech.short
                    }}</span>
                  </div>
                  <small>{{ tech.name }}</small>
                </div>
              </div>
            </div>
            <button
              class="btn btn-outline-primary w-100"
              @click="viewFullTechStack"
            >
              View tech stack <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        <!-- Office Locations -->
        <div class="card border-0 shadow-sm">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <h5 class="mb-0">Office Locations</h5>
            <div>
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="addOfficeLocation"
              >
                <i class="bi bi-plus"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-primary"
                @click="editOfficeLocations"
              >
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div
              class="office-location d-flex justify-content-between align-items-center mb-3"
              v-for="location in officeLocations"
              :key="location.id"
            >
              <div class="d-flex align-items-center">
                <img
                  :src="placeholder"
                  class="me-2"
                  style="width: 24px; height: 16px"
                  :alt="location.country"
                />
                <span>{{ location.country }}</span>
              </div>
              <span
                v-if="location.isHeadquarters"
                class="badge bg-primary-subtle text-primary"
              >
                {{ location.type }}
              </span>
            </div>
            <button
              class="btn btn-outline-primary w-100"
              @click="viewAllCountries"
            >
              View countries <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import placeholder from "@/assets/images/placeholder.svg";

const companyInfo = [
  { label: "Founded", value: "July 31, 2011", icon: "bi-calendar" },
  { label: "Employees", value: "4000+", icon: "bi-people" },
  { label: "Location", value: "20 countries", icon: "bi-geo-alt" },
  { label: "Industry", value: "Social & Non-Profit", icon: "bi-building" },
];

const socialLinks = [
  { platform: "twitter", label: "twitter.com/Nomad", icon: "bi-twitter" },
  { platform: "facebook", label: "facebook.com/NomadHQ", icon: "bi-facebook" },
  {
    platform: "linkedin",
    label: "linkedin.com/company/nomad",
    icon: "bi-linkedin",
  },
  { platform: "email", label: "nomad@gmail.com", icon: "bi-envelope" },
];

const techStack = [
  { key: "html", name: "HTML 5", short: "H5", color: "danger" },
  { key: "css", name: "CSS 3", short: "C3", color: "primary" },
  { key: "js", name: "JavaScript", short: "JS", color: "warning" },
  { key: "ruby", name: "Ruby", short: "Rb", color: "danger" },
  { key: "mixpanel", name: "Mixpanel", short: "Mp", color: "primary" },
  { key: "framer", name: "Framer", short: "Fr", color: "dark" },
];

const officeLocations = ref([
  {
    id: 1,
    country: "United States",
    isHeadquarters: true,
    type: "Head Quarters",
  },
  { id: 2, country: "England", isHeadquarters: false },
  { id: 3, country: "Japan", isHeadquarters: false },
  { id: 4, country: "Australia", isHeadquarters: false },
  { id: 5, country: "China", isHeadquarters: false },
]);

const openCompanyWebsite = () => window.open("https://nomad.com", "_blank");
const togglePublicView = () => console.log("Toggling public view");
const openProfileSettings = () => console.log("Opening profile settings");
const editCompanyProfile = () => console.log("Editing company profile");
const addContact = () => console.log("Adding new contact");
const editContact = () => console.log("Editing contact information");
const openSocialLink = (platform) => console.log(`Opening ${platform} link`);
const addWorkingImage = () => console.log("Adding working image");
const editWorkingSection = () => console.log("Editing working section");
const addTechStack = () => console.log("Adding tech stack item");
const editTechStack = () => console.log("Editing tech stack");
const viewTechDetails = (tech) => console.log(`Viewing details for ${tech}`);
const viewFullTechStack = () => console.log("Viewing full tech stack");
const addOfficeLocation = () => console.log("Adding office location");
const editOfficeLocations = () => console.log("Editing office locations");
const viewAllCountries = () => console.log("Viewing all countries");
</script>

<style scoped>
.tech-item {
  cursor: pointer;
  transition: all 0.2s ease;
}
.tech-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.office-location {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}
.office-location:last-child {
  border-bottom: none;
}
</style>
