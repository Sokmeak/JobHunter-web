<template>
  <div class="container py-4">
    <HeroSection
      :title="title"
      :subtitle="subtitle"
      :popular-tags="popularTags"
    ></HeroSection>

    <div class="container py-4">
      <div class="row g-4">
        <div class="col-lg-3">
          <filter-sidebar
            :employmentTypes="employmentTypes"
            :categories="categories"
            :jobLevels="jobLevels"
            :salaryRanges="salaryRanges"
            :selectedFilters="selectedFilters"
            @update:filters="updateFilters"
          />
        </div>

        <div class="col-lg-9">
          <job-listings
            :jobs="filteredJobs"
            :totalResults="totalJobs"
            :currentPage="currentPage"
            :totalPages="Math.ceil(totalJobs / itemsPerPage)"
            @update:page="currentPage = $event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import HeroSection from "@/components/sharecomponents/HeroSection.vue";
import FilterSidebar from "@/components/findjob/FilterSidebar.vue";
import JobListings from "@/components/findjob/JobListings.vue";

// Data for filters
const title = "Dream Job";
const subtitle = "Explore thousands of job opportunities in one place.";
const popularTags = ["UI Designer", "UX Developer", "Android", "Admin"];

const employmentTypes = [
  { id: "full-time", label: "Full-time", count: 3 },
  { id: "part-time", label: "Part-Time", count: 5 },
  { id: "internship", label: "Internship", count: 24 },
];

const categories = [
  { id: "design", label: "Design", count: 24 },
  { id: "sales", label: "Sales", count: 3 },
  { id: "marketing", label: "Marketing", count: 3 },
  { id: "business", label: "Business", count: 3 },
  { id: "hr", label: "Human Resource", count: 6 },
  { id: "finance", label: "Finance", count: 4 },
  { id: "engineering", label: "Engineering", count: 4 },
  { id: "technology", label: "Technology", count: 5 },
];

const jobLevels = [
  { id: "entry", label: "Entry Level", count: 57 },
  { id: "junior", label: "Junior", count: 3 },
  { id: "senior", label: "Senior Level", count: 5 },
  { id: "manager", label: "Manager", count: 12 },
];

const salaryRanges = [
  { id: "range1", label: "$700 - $1000", count: 4 },
  { id: "range2", label: "$100 - $1500", count: 6 },
  { id: "range3", label: "$1500 - $2000", count: 10 },
  { id: "range4", label: "$3000 or above", count: 4 },
];

// Jobs data
const jobs = ref([
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    logo: "/company-logos/nomad.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    logo: "/company-logos/dropbox.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 2,
    capacity: 8,
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    logo: "/company-logos/terraform.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 8,
    capacity: 12,
  },
  {
    id: 4,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    logo: "/company-logos/revolut.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 0,
    capacity: 10,
  },
  {
    id: 5,
    title: "Lead Engineer",
    company: "Canva",
    location: "Ankara, Turkey",
    logo: "/company-logos/canva.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 6,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    logo: "/company-logos/classpass.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 7,
    title: "Customer Manager",
    company: "Pitch",
    location: "Berlin, Germany",
    logo: "/company-logos/pitch.png",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 8,
    title: "UI/UX Designer",
    company: "Figma",
    location: "New York, USA",
    logo: "/company-logos/figma.png",
    tags: ["Remote", "Design"],
    applied: 3,
    capacity: 7,
  },
  {
    id: 9,
    title: "Frontend Developer",
    company: "Vercel",
    location: "Amsterdam, Netherlands",
    logo: "/company-logos/vercel.png",
    tags: ["Full-Time", "Engineering"],
    applied: 4,
    capacity: 9,
  },
  {
    id: 10,
    title: "Community Manager",
    company: "Notion",
    location: "Toronto, Canada",
    logo: "/company-logos/notion.png",
    tags: ["Part-Time", "Marketing"],
    applied: 6,
    capacity: 10,
  },
  {
    id: 11,
    title: "DevOps Engineer",
    company: "GitLab",
    location: "Remote",
    logo: "/company-logos/gitlab.png",
    tags: ["Remote", "Engineering"],
    applied: 2,
    capacity: 5,
  },
  {
    id: 12,
    title: "Content Writer",
    company: "Buffer",
    location: "London, UK",
    logo: "/company-logos/buffer.png",
    tags: ["Freelance", "Writing"],
    applied: 1,
    capacity: 4,
  },
  {
    id: 13,
    title: "QA Tester",
    company: "Trello",
    location: "Rome, Italy",
    logo: "/company-logos/trello.png",
    tags: ["Full-Time", "Engineering"],
    applied: 4,
    capacity: 6,
  },
  {
    id: 14,
    title: "Growth Marketer",
    company: "Zapier",
    location: "Sydney, Australia",
    logo: "/company-logos/zapier.png",
    tags: ["Full-Time", "Marketing"],
    applied: 3,
    capacity: 10,
  },
  {
    id: 15,
    title: "Support Specialist",
    company: "Slack",
    location: "Lisbon, Portugal",
    logo: "/company-logos/slack.png",
    tags: ["Remote", "Support"],
    applied: 2,
    capacity: 6,
  },
  {
    id: 16,
    title: "Data Analyst",
    company: "Klarna",
    location: "Stockholm, Sweden",
    logo: "/company-logos/klarna.png",
    tags: ["Full-Time", "Data"],
    applied: 7,
    capacity: 10,
  },
  {
    id: 17,
    title: "Motion Designer",
    company: "Adobe",
    location: "Tokyo, Japan",
    logo: "/company-logos/adobe.png",
    tags: ["Full-Time", "Design"],
    applied: 2,
    capacity: 8,
  },
  {
    id: 18,
    title: "Tech Recruiter",
    company: "LinkedIn",
    location: "Dublin, Ireland",
    logo: "/company-logos/linkedin.png",
    tags: ["Full-Time", "HR"],
    applied: 6,
    capacity: 9,
  },
  {
    id: 19,
    title: "Mobile Developer",
    company: "Spotify",
    location: "Oslo, Norway",
    logo: "/company-logos/spotify.png",
    tags: ["Full-Time", "Engineering"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 20,
    title: "AI Research Intern",
    company: "DeepMind",
    location: "London, UK",
    logo: "/company-logos/deepmind.png",
    tags: ["Internship", "AI"],
    applied: 10,
    capacity: 10,
  },
]);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 7;
const totalJobs = computed(() => jobs.value.length);

// Selected filters
const selectedFilters = ref({
  employmentTypes: ["business", "technology"],
  categories: [],
  jobLevels: ["manager"],
  salaryRanges: ["range4"],
});

// Update filters
const updateFilters = (filterType, value) => {
  selectedFilters.value = {
    ...selectedFilters.value,
    [filterType]: value,
  };
};

// Filtered jobs
const filteredJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return jobs.value.slice(start, end);
});
</script>

<style>
/* Import Bootstrap CSS */
@import "bootstrap/dist/css/bootstrap.min.css";

body {
  font-family: "Inter", sans-serif;
  color: #333;
  background-color: #f8f9fa;
}
</style>
