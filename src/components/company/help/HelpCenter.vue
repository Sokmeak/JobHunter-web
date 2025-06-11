<template>
  <div class="help-center">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-0">Help Center</h2>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="text-muted">Back to knowledge</span>
        <i class="bi bi-arrow-right text-muted"></i>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0"
            placeholder="Ask any questions to search support..."
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Help Topics Sidebar -->
      <div class="col-md-3">
        <div class="card">
          <div class="card-header bg-white border-bottom">
            <h6 class="mb-0 fw-bold">Help Topics</h6>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <a
                href="#"
                class="list-group-item list-group-item-action border-0"
                :class="{ active: selectedCategory === category }"
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
              >
                {{ category }}
              </a>
            </div>
          </div>
        </div>

        <!-- Getting Started Card -->
        <div class="card mt-4">
          <div
            class="card-body text-center"
            style="
              background: linear-gradient(
                135deg,
                var(--primary-color),
                #6366f1
              );
            "
          >
            <div class="text-white">
              <h6 class="fw-bold mb-2">Getting started for your business</h6>
              <p class="small mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button class="btn btn-light btn-sm">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-md-9">
        <div class="card">
          <div class="card-body">
            <!-- FAQ Items -->
            <div
              class="faq-item border-bottom pb-3 mb-3"
              v-for="topic in filteredTopics"
              :key="topic.id"
            >
              <div
                class="d-flex justify-content-between align-items-center cursor-pointer"
                @click="toggleTopic(topic.id)"
              >
                <h6 class="fw-semibold mb-0">{{ topic.question }}</h6>
                <i
                  :class="[
                    'bi',
                    expandedTopics.includes(topic.id)
                      ? 'bi-chevron-up'
                      : 'bi-chevron-down',
                  ]"
                ></i>
              </div>

              <div v-if="expandedTopics.includes(topic.id)" class="mt-3">
                <p class="text-muted mb-3">{{ topic.answer }}</p>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="text-muted small me-3"
                      >Was this article helpful?</span
                    >
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-success btn-sm"
                        :class="{ active: topic.helpful === true }"
                        @click="markHelpful(topic.id, true)"
                      >
                        <i class="bi bi-hand-thumbs-up me-1"></i>
                        Yes
                      </button>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        :class="{ active: topic.helpful === false }"
                        @click="markHelpful(topic.id, false)"
                      >
                        <i class="bi bi-hand-thumbs-down me-1"></i>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- No Results -->
            <div v-if="filteredTopics.length === 0" class="text-center py-5">
              <i class="bi bi-search fs-1 text-muted mb-3"></i>
              <h5 class="text-muted">No results found</h5>
              <p class="text-muted">
                Try adjusting your search terms or browse categories.
              </p>
            </div>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="card mt-4">
          <div class="card-body text-center">
            <h6 class="fw-bold mb-2">Still need help?</h6>
            <p class="text-muted mb-3">
              Can't find what you're looking for? Contact our support team.
            </p>
            <button class="btn btn-primary">
              <i class="bi bi-chat-dots me-1"></i>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "HelpCenter",
  data() {
    return {
      searchQuery: "",
      selectedCategory: "All",
      expandedTopics: [],
      categories: [
        "All",
        "Getting Started",
        "Applications",
        "Job Posting",
        "Account Settings",
        "Billing",
        "Integrations",
      ],
      allTopics: [
        {
          id: 1,
          question: "What is My Application?",
          answer:
            "My Application is the place for you to track jobs you have applied for. You can see the status of your applications, upcoming interviews, and any feedback from employers. This feature helps you stay organized throughout your job search process.",
          category: "Getting Started",
          helpful: null,
        },
        {
          id: 2,
          question: "How to access my applications history",
          answer:
            "You can access your application history by navigating to the Applications section in your dashboard. Here you will find a complete list of all jobs you have applied for, along with their current status and any updates from employers.",
          category: "Applications",
          helpful: null,
        },
        {
          id: 3,
          question: "Not seeing jobs you applied to your my application list?",
          answer:
            "If you are not seeing jobs you applied to in your application list, please check if you were logged in when you applied. Only applications submitted while logged in will appear in your dashboard. You can also try refreshing the page or clearing your browser cache.",
          category: "Applications",
          helpful: null,
        },
        {
          id: 4,
          question: "How do I post a new job?",
          answer:
            'To post a new job, click the "Post a job" button in the top right corner of your dashboard. You will be guided through a 3-step process where you can add job details, description, and benefits. Once completed, your job will be live and visible to candidates.',
          category: "Job Posting",
          helpful: null,
        },
        {
          id: 5,
          question: "How to edit my company profile?",
          answer:
            "You can edit your company profile by going to Settings > Overview. Here you can update your company logo, description, contact information, tech stack, and other details that will be visible to job seekers.",
          category: "Account Settings",
          helpful: null,
        },
        {
          id: 6,
          question: "How to manage team members?",
          answer:
            "Team member management can be found in Settings > Team. You can add new team members, assign roles (Admin, Recruiter, Hiring Manager), and manage permissions. Each team member will receive an invitation email to join your company account.",
          category: "Account Settings",
          helpful: null,
        },
      ],
    };
  },
  computed: {
    ...mapState(["helpTopics"]),
    filteredTopics() {
      let topics = this.allTopics;

      // Filter by category
      if (this.selectedCategory !== "All") {
        topics = topics.filter(
          (topic) => topic.category === this.selectedCategory
        );
      }

      // Filter by search query
      if (this.searchQuery) {
        topics = topics.filter(
          (topic) =>
            topic.question
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            topic.answer.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return topics;
    },
  },
  methods: {
    ...mapMutations(["markHelpful"]),
    toggleTopic(id) {
      const index = this.expandedTopics.indexOf(id);
      if (index > -1) {
        this.expandedTopics.splice(index, 1);
      } else {
        this.expandedTopics.push(id);
      }
    },
    markHelpful(id, helpful) {
      const topic = this.allTopics.find((t) => t.id === id);
      if (topic) {
        topic.helpful = helpful;
      }
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.faq-item:hover {
  background-color: var(--bg-light);
  border-radius: 8px;
  padding: 1rem;
  margin: -1rem;
  margin-bottom: 0.5rem;
}

.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-group .btn.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}
</style>
