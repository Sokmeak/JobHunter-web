import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useHelpCenterStore = defineStore("helpCenterStore", () => {
  const searchQuery = ref("");
  const selectedCategory = ref("All");
  const expandedTopics = ref([]);
  const categories = [
    "All",
    "Getting Started",
    "Applications",
    "Job Posting",
    "Account Settings",
    "Billing",
    "Integrations",
  ];

  const allTopics = ref([
    {
      id: 1,
      question: "What is My Application?",
      answer:
        "My Application is the place for you to track jobs you have applied for...",
      category: "Getting Started",
      helpful: null,
    },
    {
      id: 2,
      question: "How to access my applications history",
      answer:
        "You can access your application history by navigating to the Applications section...",
      category: "Applications",
      helpful: null,
    },
    {
      id: 3,
      question: "Not seeing jobs you applied to your my application list?",
      answer:
        "If you are not seeing jobs you applied to in your application list, please check if you were logged in...",
      category: "Applications",
      helpful: null,
    },
    {
      id: 4,
      question: "How do I post a new job?",
      answer:
        'To post a new job, click the "Post a job" button in the top right corner...',
      category: "Job Posting",
      helpful: null,
    },
    {
      id: 5,
      question: "How to edit my company profile?",
      answer:
        "You can edit your company profile by going to Settings > Overview...",
      category: "Account Settings",
      helpful: null,
    },
    {
      id: 6,
      question: "How to manage team members?",
      answer: "Team member management can be found in Settings > Team...",
      category: "Account Settings",
      helpful: null,
    },
  ]);

  const filteredTopics = computed(() => {
    let topics = allTopics.value;

    if (selectedCategory.value !== "All") {
      topics = topics.filter((t) => t.category === selectedCategory.value);
    }

    if (searchQuery.value) {
      topics = topics.filter(
        (t) =>
          t.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          t.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    return topics;
  });

  const toggleTopic = (id) => {
    const index = expandedTopics.value.indexOf(id);
    if (index > -1) expandedTopics.value.splice(index, 1);
    else expandedTopics.value.push(id);
  };

  const markHelpful = (id, helpful) => {
    const topic = allTopics.value.find((t) => t.id === id);
    if (topic) topic.helpful = helpful;
  };

  return {
    searchQuery,
    selectedCategory,
    expandedTopics,
    categories,
    allTopics,
    filteredTopics,
    toggleTopic,
    markHelpful,
  };
});
