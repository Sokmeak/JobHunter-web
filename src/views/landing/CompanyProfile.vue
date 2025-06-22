<template>
  <div class="container py-4">
    <!-- Loading and Error States -->
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <div v-else>
      <!-- Company Header Card -->
      <div class="company-header-card p-4 mb-4">
        <div class="row align-items-center">
          <div class="col-lg-3 col-md-4 mb-3 mb-md-0">
            <div class="company-logo-container">
              <div
                class="company-logo rounded-3 d-flex align-items-center justify-content-center"
              >
                <span class="display-4 fw-bold text-white">{{
                  company.logoInitial
                }}</span>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="d-flex flex-wrap align-items-center mb-2">
              <h1 class="company-name me-3 mb-0">{{ company.name }}</h1>
              <span
                class="verified-badge me-3"
                title="Verified Company"
                v-if="company.isVerified"
              >
                <i class="bi bi-patch-check-fill"></i>
              </span>
              <span class="jobs-badge">{{ company.jobs.length }} Jobs</span>
            </div>
            <a
              :href="company.website"
              class="company-website mb-4 d-inline-block"
              >{{ company.website }}</a
            >

            <div class="row mt-4">
              <div class="col-md-3 col-6 mb-3 mb-md-0">
                <div class="company-stat d-flex align-items-center">
                  <div class="stat-icon me-2">
                    <i class="bi bi-fire text-primary"></i>
                  </div>
                  <div>
                    <p class="stat-label mb-0">Founded</p>
                    <p class="stat-value mb-0">{{ company.founded }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6 mb-3 mb-md-0">
                <div class="company-stat d-flex align-items-center">
                  <div class="stat-icon me-2">
                    <i class="bi bi-people text-primary"></i>
                  </div>
                  <div>
                    <p class="stat-label mb-0">Employees</p>
                    <p class="stat-value mb-0">{{ company.employees }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="company-stat d-flex align-items-center">
                  <div class="stat-icon me-2">
                    <i class="bi bi-globe text-primary"></i>
                  </div>
                  <div>
                    <p class="stat-label mb-0">Location</p>
                    <p class="stat-value mb-0">{{ company.locations }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="company-stat d-flex align-items-center">
                  <div class="stat-icon me-2">
                    <i class="bi bi-building text-primary"></i>
                  </div>
                  <div>
                    <p class="stat-label mb-0">Industry</p>
                    <p class="stat-value mb-0">{{ company.industry }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <floating-status-card
        :company="{
          name: company.name,
          logoInitial: company.logoInitial,
          jobs: company.jobs.length,
          employees: company.employees,
          locations: company.locations,
        }"
      />

      <div class="row g-4">
        <!-- Left Column -->
        <div class="col-lg-8">
          <!-- Company Profile Section -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <h2 class="section-title mb-3">Company Profile</h2>
              <p class="text-muted mb-0">{{ company.profile }}</p>
            </div>
          </div>

          <!-- Contact Section -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <h2 class="section-title mb-3">Contact</h2>
              <div
                v-if="company.contacts.length > 0"
                class="d-flex flex-wrap gap-2"
              >
                <a
                  v-for="(contact, index) in company.contacts"
                  :key="index"
                  :href="contact.url"
                  class="btn btn-outline-primary rounded-pill"
                >
                  <i :class="`bi bi-${contact.icon} me-2`"></i>
                  {{ contact.label }}
                </a>
              </div>
              <p v-else class="text-muted mb-0">
                No contact information available.
              </p>
            </div>
          </div>

          <!-- Office Photos Section -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <h2 class="section-title mb-3">Office Photos</h2>
              <div v-if="company.photos.length > 0" class="row g-3">
                <div class="col-md-6">
                  <img
                    :src="
                      company.photos[0]?.url ||
                      'https://via.placeholder.com/500x300'
                    "
                    :alt="company.photos[0]?.alt || 'Office photo'"
                    class="img-fluid rounded-3 w-100 h-100 object-fit-cover"
                  />
                </div>
                <div class="col-md-6">
                  <div class="row g-3 h-100">
                    <div class="col-6">
                      <img
                        :src="
                          company.photos[1]?.url ||
                          'https://via.placeholder.com/250x150'
                        "
                        :alt="company.photos[1]?.alt || 'Office photo'"
                        class="img-fluid rounded-3 w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div class="col-6">
                      <img
                        :src="
                          company.photos[2]?.url ||
                          'https://via.placeholder.com/250x150'
                        "
                        :alt="company.photos[2]?.alt || 'Office photo'"
                        class="img-fluid rounded-3 w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div class="col-12">
                      <img
                        :src="
                          company.photos[3]?.url ||
                          'https://via.placeholder.com/500x120'
                        "
                        :alt="company.photos[3]?.alt || 'Office photo'"
                        class="img-fluid rounded-3 w-100 object-fit-cover"
                        style="height: 120px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p v-else class="text-muted mb-0">No office photos available.</p>
            </div>
          </div>

          <!-- Team Section -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <h2 class="section-title mb-0">Team</h2>
                <a href="#" class="text-primary text-decoration-none">
                  See all ({{ company.teamMembers.length }})
                  <i class="bi bi-arrow-right ms-1"></i>
                </a>
              </div>
              <div v-if="company.teamMembers.length > 0" class="row g-4">
                <div
                  class="col-md-4 col-lg-4 col-6"
                  v-for="(member, index) in company.teamMembers"
                  :key="index"
                >
                  <team-member-card :member="member" />
                </div>
              </div>
              <p v-else class="text-muted mb-0">No team members listed.</p>
            </div>
          </div>

          <!-- Perks & Benefits Section -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <h2 class="section-title mb-3">Perks & Benefits</h2>
              <p class="text-muted mb-4">
                This job comes with several perks and benefits
              </p>
              <div v-if="company.benefits.length > 0" class="row g-4">
                <div
                  v-for="(benefit, index) in company.benefits"
                  :key="index"
                  class="col-md-6"
                >
                  <div class="d-flex">
                    <div
                      class="benefit-icon rounded-circle p-3 text-primary me-3 d-flex align-items-center justify-content-center"
                    >
                      <i :class="`bi ${benefit.icon}`"></i>
                    </div>
                    <div>
                      <h3 class="fs-6 fw-bold mb-1">{{ benefit.title }}</h3>
                      <p class="text-muted small mb-0">
                        {{ benefit.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p v-else class="text-muted mb-0">No perks or benefits listed.</p>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-lg-4">
          <!-- Tech Stack Section -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h2 class="section-title mb-0">Tech Stack</h2>
                <a href="#" class="text-primary text-decoration-none">
                  See tech stack <i class="bi bi-arrow-right ms-1"></i>
                </a>
              </div>
              <p class="text-muted small mb-3">
                Learn what technologies and tools that {{ company.name }} uses.
              </p>
              <div v-if="company.techStack.length > 0" class="row g-3">
                <div
                  class="col-4"
                  v-for="(tech, index) in company.techStack"
                  :key="index"
                >
                  <div class="tech-card p-2 rounded-3 text-center">
                    <img
                      :src="tech.icon"
                      :alt="tech.name"
                      class="img-fluid mb-2"
                      style="height: 40px"
                    />
                    <p class="small mb-0">{{ tech.name }}</p>
                  </div>
                </div>
              </div>
              <p v-else class="text-muted mb-0">
                No tech stack information available.
              </p>
            </div>
          </div>

          <!-- Office Location Section -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h2 class="section-title mb-0">Office Locations</h2>
                <a href="#" class="text-primary text-decoration-none">
                  View on Google Maps <i class="bi bi-arrow-right ms-1"></i>
                </a>
              </div>
              <div class="location-list mt-3">
                <div
                  class="d-flex align-items-center mb-3"
                  v-for="(location, index) in company.officeLocations"
                  :key="index"
                >
                  <img
                    :src="location.flag"
                    :alt="location.country"
                    class="me-3"
                    style="width: 24px; height: 18px"
                  />
                  <span>{{ location.country }}</span>
                </div>
                <p
                  v-if="company.officeLocations.length === 0"
                  class="text-muted mb-0"
                >
                  No office locations listed.
                </p>
                <a
                  href="#"
                  class="text-primary text-decoration-none d-block mt-2"
                  v-if="company.officeLocations.length > 0"
                >
                  View countries <i class="bi bi-arrow-right ms-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Jobs Section -->
      <div class="similar-jobs mt-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fs-5 fw-bold mb-0">Open Jobs</h2>
          <div class="d-flex align-items-center">
            <button
              class="btn btn-sm btn-outline-primary rounded-circle me-2 scroll-btn scroll-left"
              aria-label="Scroll left"
              @click="scrollJobsLeft"
              :disabled="company.openJobs.length === 0"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-primary rounded-circle me-3 scroll-btn scroll-right"
              aria-label="Scroll right"
              @click="scrollJobsRight"
              :disabled="company.openJobs.length === 0"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
            <a
              href="#"
              class="text-primary text-decoration-none d-flex align-items-center"
            >
              Show all jobs
              <i class="bi bi-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
        <div class="position-relative">
          <div class="jobs-scroll-container" ref="jobsContainer">
            <div v-if="company.openJobs.length > 0" class="d-flex flex-nowrap">
              <div
                class="job-card-wrapper"
                v-for="(job, index) in company.openJobs"
                :key="index"
              >
                <job-card :job="job" />
              </div>
            </div>
            <p v-else class="text-muted mb-0">No open jobs available.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import JobCard from "@/components/landing/JobCard.vue";
import TeamMemberCard from "@/components/companyprofile/TeamMemberCard.vue";

import FloatingStatusCard from "@/components/companyprofile/FloatingStatusCard.vue";
import { useCompanyStore } from "@/stores/companyStore";

// Initialize store and route
const companyStore = useCompanyStore();
const route = useRoute();

// State
const company = ref({
  id: 0,
  name: "",
  logoInitial: "",
  jobs: [],
  employees: "",
  locations: "",
  website: "",
  founded: "",
  industry: "",
  profile: "",
  contacts: [],
  photos: [],
  teamMembers: [],
  benefits: [],
  techStack: [],
  officeLocations: [],
  openJobs: [],
  isVerified: false,
});
const isLoading = ref(false);
const error = ref(null);

// Scroll methods for similar jobs
const jobsContainer = ref(null);

const scrollJobsRight = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};

const scrollJobsLeft = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
};

// Transform CompanyResponseDto to component's expected structure
const transformCompanyData = (data) => {
  return {
    id: data.id || 0,
    name: data.name || "Unknown Company",
    logoInitial: data.name ? data.name.charAt(0).toUpperCase() : "U",
    jobs: data.jobs || [],

    employees: data.employee_count || "N/A",
    locations: data.headquartersLocation || "N/A",
    website: data.website_url || "#",
    founded: data.founded_date || "N/A",
    industry: data.industry || "N/A",
    profile: data.cultureDescription || "No description available.",
    isVerified: data.isActive || false, // Assuming isActive indicates verification status
    contacts: [
      data.twitter_url && {
        icon: "twitter",
        url: data.twitter_url,
        label: data.twitter_url.replace("https://twitter.com/", "twitter.com/"),
      },
      data.facebook_url && {
        icon: "facebook",
        url: data.facebook_url,
        label: data.facebook_url.replace(
          "https://facebook.com/",
          "facebook.com/"
        ),
      },
      data.email && {
        icon: "envelope",
        url: `mailto:${data.email}`,
        label: data.email,
      },
      data.linkedin_url && {
        icon: "linkedin",
        url: data.linkedin_url,
        label: data.linkedin_url.replace(
          "https://linkedin.com/",
          "linkedin.com/"
        ),
      },
    ].filter(Boolean),
    photos:
      data.officeImages?.map((img, index) => ({
        url:
          img.image_url ||
          `https://via.placeholder.com/500x${index === 3 ? 120 : 300}`,
        alt: img.caption || `Office photo ${index + 1}`,
      })) || [],
    teamMembers:
      data.members?.map((member) => ({
        name: member.name || "Unknown",
        position: member.position || "N/A",
        photo: member.photo || "https://via.placeholder.com/150",
        social: {
          linkedin: member.linkedin_url || "#",
          twitter: member.twitter_url || "#",
        },
      })) || [],
    benefits: data.benefits || ["a", "b"],

    // ?.map((benefit) => ({
    //   title: benefit| "N/A",
    //   description: benefit.description || "No description available.",
    //   icon: benefit.icon || "bi-star-fill",
    // })) || [
    //   {
    //     title: "N/A",
    //     description: "No benefits available.",
    //     icon: "bi-star-fill",
    //   }

    techStack:
      data.technologies?.map((tech) => ({
        name: tech.technology.name || "Unknown",
        icon: tech.technology.icon || "https://via.placeholder.com/40",
      })) || [],
    officeLocations:
      data.office_location?.map((loc) => ({
        country: loc.country || loc.city || "Unknown",
        flag:
          loc.flag ||
          `https://flagcdn.com/w40/${
            loc.country_code?.toLowerCase() || "us"
          }.png`,
      })) || [],
    openJobs:
      data.jobs?.map((job) => ({
        job_id: job.id,
        company_id: data.id,
        title: job.title || "Untitled Job",
        company: data.name,
        location: job.location || "N/A",
        type: job.type || "N/A",
        logo:
          job.logo ||
          data.brand_logo ||
          data.brand_logo_thumbnail ||
          "https://via.placeholder.com/40",
        description: job.description || "No description available.",
        tags: job.tags || [],
      })) || [],
  };
};

// Sample company data aligned with CompanyResponseDto
const sampleCompanyData = {
  id: 122,
  name: "Adobe",
  isActive: true,
  headquartersLocation: "Tokyo, Japan",
  cultureDescription:
    "Adobe is a global leader in digital media and marketing solutions, empowering creativity and innovation.",
  tags: ["Tech", "Creative"],
  brand_logo: "https://via.placeholder.com/40",
  members: [
    {
      name: "Jane Smith",
      position: "Creative Director",
      photo: "https://via.placeholder.com/150",
      linkedin_url: "https://linkedin.com/in/janesmith",
      twitter_url: "https://twitter.com/janesmith",
    },
    {
      name: "John Doe",
      position: "CTO",
      photo: "https://via.placeholder.com/150",
      linkedin_url: "https://linkedin.com/in/johndoe",
    },
  ],
  documents: [],
  jobs: [
    {
      id: 1,
      title: "Senior Software Engineer",
      location: "Tokyo, Japan",
      type: "Full-time",
      description:
        "Develop innovative software solutions for Adobe's c  ,mkreative tools.",
      tags: ["Engineering", "Full-time"],
    },
    {
      id: 2,
      title: "UX Designer",
      location: "Tokyo, Japan",
      type: "Full-time",
      description: "Design user-friendly interfaces for Adobe's products.",
      tags: ["Design", "Full-time"],
    },
  ],
  techStacks: [],
  website_url: "https://www.adobe.com",
  founded_date: "1982-12-01",
  employee_count: "501-1000",
  industry: "Software",
  office_location: [
    {
      id: 1,
      country: "Japan",
      city: "Tokyo",
      country_code: "JP",
      flag: "https://flagcdn.com/w40/jp.png",
    },
    {
      id: 2,
      country: "United States",
      city: "San Jose",
      country_code: "US",
      flag: "https://flagcdn.com/w40/us.png",
    },
  ],
  twitter_url: "https://twitter.com/Adobe",
  facebook_url: "https://facebook.com/Adobe",
  linkedin_url: "https://linkedin.com/company/adobe",
  email: "contact@adobe.com",
  hr_contact_name: "HR Adobe",
  hr_contact_email: "hr@adobe.com",
  officeImages: [
    {
      id: 1,
      image_url: "https://via.placeholder.com/500x300",
      thumbnail_url: "https://via.placeholder.com/100x60",
      caption: "Tokyo Headquarters",
    },
    {
      id: 2,
      image_url: "https://via.placeholder.com/250x150",
      thumbnail_url: "https://via.placeholder.com/100x60",
      caption: "Open Workspace",
    },
    {
      id: 3,
      image_url: "https://via.placeholder.com/250x150",
      thumbnail_url: "https://via.placeholder.com/100x60",
      caption: "Meeting Room",
    },
    {
      id: 4,
      image_url: "https://via.placeholder.com/500x120",
      thumbnail_url: "https://via.placeholder.com/100x60",
      caption: "Lounge Area",
    },
  ],
  technologies: [
    {
      id: 1,
      technology: { name: "Photoshop", icon: "https://via.placeholder.com/40" },
    },
    {
      id: 2,
      technology: {
        name: "Illustrator",
        icon: "https://via.placeholder.com/40",
      },
    },
    {
      id: 3,
      technology: { name: "React", icon: "https://via.placeholder.com/40" },
    },
  ],
  brand_logo_thumbnail: "https://via.placeholder.com/40",
  benefits: [
    {
      title: "Health Insurance",
      description: "Comprehensive health coverage for employees and families.",
      icon: "bi-heart-fill",
    },
    {
      title: "Flexible Work Hours",
      description: "Work-life balance with flexible scheduling.",
      icon: "bi-clock-fill",
    },
    {
      title: "Professional Development",
      description: "Access to training and career growth opportunities.",
      icon: "bi-briefcase-fill",
    },
  ],
};

// Fetch company data on mount
onMounted(async () => {
  const companyId = Number(route.params.id);
  if (!companyId || isNaN(companyId)) {
    error.value = "Invalid company ID";
    return;
  }

  isLoading.value = true;
  try {
    const companyData = await companyStore.fetchCompanyDetails(companyId);
    company.value = transformCompanyData(companyData);
  } catch (err) {
    console.error("API fetch failed, using sample data for demo purposes");
    company.value = transformCompanyData(sampleCompanyData); // Fallback to sample data
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
:root {
  --primary-color: #4640de;
  --bg-primary-color: #4640de;
  --secondary-color: #ccccf5;
  --tertiary-color: #e7f6fd;
  --cyan-accent-color: #26a4ff;
  --red-accent-color: #ff6550;
  --green-accent-color: #56cdad;
  --purple-accent-color: #7b61ff;
  --yellow-accent-color: #ffb836;
  --neutral-color: #25324b;
}

.jobs-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding-bottom: 10px;
}

.jobs-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.job-card-wrapper {
  flex: 0 0 auto;
  width: 100%;
  padding-right: 16px;
}

@media (min-width: 576px) {
  .job-card-wrapper {
    width: 80%;
  }
}

@media (min-width: 768px) {
  .job-card-wrapper {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .job-card-wrapper {
    width: 33.333%;
  }
}

@media (min-width: 1200px) {
  .job-card-wrapper {
    width: 25%;
  }
}

.verified-badge {
  color: #4640de;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}

.verified-badge i {
  filter: drop-shadow(0 1px 2px rgba(70, 64, 222, 0.2));
}

.company-profile-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Company Header Card Styling */
.company-header-card {
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0ff;
  box-shadow: 0 2px 10px rgba(70, 64, 222, 0.05);
}

.company-logo-container {
  max-width: 120px;
  margin: 0 auto;
}

.company-logo {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4640de 0%, #6e66ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #25324b;
}

.jobs-badge {
  background-color: #e7f6fd;
  color: #4640de;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
}

.company-website {
  color: #4640de;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
}

.company-website:hover {
  text-decoration: underline;
}

.company-stat {
  margin-bottom: 10px;
}

.stat-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.stat-label {
  color: #6b7280;
  font-size: 0.85rem;
  margin-bottom: 2px;
}

.stat-value {
  color: #25324b;
  font-weight: 600;
  font-size: 0.95rem;
}

/* Section Titles */
.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #25324b;
}

.tech-card {
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.tech-card:hover {
  background-color: var(--tertiary-color);
  transform: translateY(-3px);
}

.object-fit-cover {
  object-fit: cover;
}

/* Bootstrap overrides */
.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #3935b8;
  border-color: #3935b8;
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

.bg-secondary {
  background-color: var(--secondary-color) !important;
}

.bg-tertiary {
  background-color: var(--tertiary-color) !important;
}

.bg-primary-subtle {
  background-color: rgba(70, 64, 222, 0.1) !important;
}

.text-cyan {
  color: var(--cyan-accent-color) !important;
}

.bg-cyan-subtle {
  background-color: rgba(38, 164, 255, 0.1) !important;
}

.text-red {
  color: var(--red-accent-color) !important;
}

.bg-red-subtle {
  background-color: rgba(255, 101, 80, 0.1) !important;
}

.text-green {
  color: var(--green-accent-color) !important;
}

.bg-green-subtle {
  background-color: rgba(86, 205, 173, 0.1) !important;
}

.text-purple {
  color: var(--purple-accent-color) !important;
}

.bg-purple-subtle {
  background-color: rgba(123, 97, 255, 0.1) !important;
}

.text-yellow {
  color: var(--yellow-accent-color) !important;
}

.bg-yellow-subtle {
  background-color: rgba(255, 184, 54, 0.1) !important;
}
</style>
