<template>
  <div class="help-center">
    <h2 class="mb-4">Help Center</h2>

    <div class="row">
      <div class="col-lg-8">
        <!-- Search -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <h5 class="mb-3">How can we help you?</h5>
            <div class="position-relative">
              <i
                class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              ></i>
              <input
                type="text"
                class="form-control form-control-lg ps-5"
                placeholder="Search for help articles..."
              />
            </div>
          </div>
        </div>

        <!-- FAQ Categories -->
        <div class="row g-4">
          <div
            class="col-md-6"
            v-for="category in faqCategories"
            :key="category.id"
          >
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                  <div class="bg-primary-subtle rounded-3 p-3 me-3">
                    <i :class="category.icon" class="text-primary fs-4"></i>
                  </div>
                  <h5 class="mb-0">{{ category.title }}</h5>
                </div>
                <p class="text-muted mb-3">{{ category.description }}</p>
                <ul class="list-unstyled">
                  <li
                    v-for="article in category.articles"
                    :key="article"
                    class="mb-2"
                  >
                    <a href="#" class="text-decoration-none">{{ article }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <!-- Contact Support -->
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h6 class="mb-3">Need more help?</h6>
            <p class="text-muted mb-3">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <div class="d-grid gap-2">
              <button class="btn btn-primary">
                <i class="bi bi-chat-dots me-1"></i>Start Live Chat
              </button>
              <button class="btn btn-outline-secondary">
                <i class="bi bi-envelope me-1"></i>Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const faqCategories = ref([
  {
    id: 1,
    title: "Getting Started",
    description: "Learn the basics of using JobHunter",
    icon: "bi bi-play-circle",
    articles: [
      "How to create your first job posting",
      "Setting up your company profile",
      "Understanding the dashboard",
    ],
  },
  {
    id: 2,
    title: "Managing Applications",
    description: "Handle applicants and interviews",
    icon: "bi bi-people",
    articles: [
      "Reviewing applications",
      "Scheduling interviews",
      "Managing applicant pipeline",
    ],
  },
  {
    id: 3,
    title: "Account Settings",
    description: "Manage your account and preferences",
    icon: "bi bi-gear",
    articles: [
      "Updating company information",
      "Managing team members",
      "Billing and subscriptions",
    ],
  },
  {
    id: 4,
    title: "Troubleshooting",
    description: "Common issues and solutions",
    icon: "bi bi-tools",
    articles: [
      "Login problems",
      "Email notifications not working",
      "Performance issues",
    ],
  },
]);
</script>
