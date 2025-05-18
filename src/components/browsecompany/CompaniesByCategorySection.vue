<template>
  <section class="companies-by-category">
    <h2 class="section-title">Companies by Category</h2>

    <div class="categories-grid">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :is-active="category.id === activeCategory"
        @select="setActiveCategory"
      />
    </div>

    <div class="results-header">
      <div class="results-count">
        <span class="results-icon">
          <i :class="['bi', getActiveCategoryIcon()]"></i>
        </span>
        <span class="results-text">{{ filteredCompanies.length }} Results</span>
      </div>
    </div>

    <div class="companies-results-grid">
      <CompanyResultCard
        v-for="company in filteredCompanies"
        :key="company.id"
        :company="company"
        @click="viewCompanyDetails"
      />
    </div>

    <div class="view-more">
      <a href="#" class="view-more-link">
        View more {{ getActiveCategoryName() }} companies
        <span class="view-more-icon">→</span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import CategoryCard from "./CategoryCard.vue";
import CompanyResultCard from "./CompanyResultCard.vue";

// Categories data (icon field now contains only the icon-specific class)
const categories = ref([
  { id: 1, name: "Design", icon: "bi-palette", jobCount: "235 jobs available" },
  {
    id: 2,
    name: "Sales",
    icon: "bi bi-graph-up",
    jobCount: "340 jobs available",
  },
  {
    id: 3,
    name: "Marketing",
    icon: "bi bi-megaphone",
    jobCount: "120 jobs available",
  },
  {
    id: 4,
    name: "Finance",
    icon: "bi bi-cash-coin",
    jobCount: "80 jobs available",
  },
  {
    id: 5,
    name: "Technology",
    icon: "bi bi-pc-display",
    jobCount: "320 jobs available",
  },
  {
    id: 6,
    name: "Engineering",
    icon: "bi bi-code-slash",
    jobCount: "170 jobs available",
  },
  {
    id: 7,
    name: "Business",
    icon: "bi bi-briefcase",
    jobCount: "210 jobs available",
  },
  {
    id: 8,
    name: "Human Resources",
    icon: "bi bi-people",
    jobCount: "75 jobs available",
  },
]);

// Companies data
const companies = ref([
  // Design (categoryId: 1)
  {
    id: 1,
    name: "Pentagram",
    logo: "https://logo.clearbit.com/pentagram.com",
    logoBg: "#e53e3e",
    jobCount: 3,
    categoryId: 1,
  },
  {
    id: 2,
    name: "Wolff Olins",
    logo: "https://logo.clearbit.com/wolffolins.com",
    logoBg: "#000000",
    jobCount: 3,
    categoryId: 1,
  },
  {
    id: 3,
    name: "IDEO",
    logo: "https://logo.clearbit.com/ideo.com",
    logoBg: "#1a365d",
    jobCount: 5,
    categoryId: 1,
  },
  {
    id: 4,
    name: "Frog Design",
    logo: "https://logo.clearbit.com/frogdesign.com",
    logoBg: "#2b6cb0",
    jobCount: 4,
    categoryId: 1,
  },
  {
    id: 5,
    name: "Landor",
    logo: "https://logo.clearbit.com/landor.com",
    logoBg: "#4a5568",
    jobCount: 2,
    categoryId: 1,
  },
  {
    id: 6,
    name: "Chermayeff & Geismar",
    logo: "https://logo.clearbit.com/cgstudionyc.com",
    logoBg: "#d53f8c",
    jobCount: 3,
    categoryId: 1,
  },
  {
    id: 7,
    name: "Sagmeister & Walsh",
    logo: "https://logo.clearbit.com/sagmeisterwalsh.com",
    logoBg: "#f6ad55",
    jobCount: 2,
    categoryId: 1,
  },
  {
    id: 8,
    name: "MetaDesign",
    logo: "https://logo.clearbit.com/metadesign.com",
    logoBg: "#38a169",
    jobCount: 4,
    categoryId: 1,
  },
  {
    id: 9,
    name: "Collins",
    logo: "https://logo.clearbit.com/wearecollins.com",
    logoBg: "#9f7aea",
    jobCount: 3,
    categoryId: 1,
  },
  {
    id: 10,
    name: "Interbrand",
    logo: "https://logo.clearbit.com/interbrand.com",
    logoBg: "#e53e3e",
    jobCount: 5,
    categoryId: 1,
  },
  {
    id: 11,
    name: "AKQA",
    logo: "https://logo.clearbit.com/akqa.com",
    logoBg: "#2d3748",
    jobCount: 6,
    categoryId: 1,
  },
  {
    id: 12,
    name: "R/GA",
    logo: "https://logo.clearbit.com/rga.com",
    logoBg: "#3182ce",
    jobCount: 4,
    categoryId: 1,
  },

  // Sales (categoryId: 2)
  {
    id: 13,
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    logoBg: "#00a1e0",
    jobCount: 10,
    categoryId: 2,
  },
  {
    id: 14,
    name: "HubSpot",
    logo: "https://logo.clearbit.com/hubspot.com",
    logoBg: "#ff7a59",
    jobCount: 8,
    categoryId: 2,
  },

  // Marketing (categoryId: 3)
  {
    id: 15,
    name: "Hootsuite",
    logo: "https://logo.clearbit.com/hootsuite.com",
    logoBg: "#003087",
    jobCount: 6,
    categoryId: 3,
  },
  {
    id: 16,
    name: "Mailchimp",
    logo: "https://logo.clearbit.com/mailchimp.com",
    logoBg: "#ffe01b",
    jobCount: 5,
    categoryId: 3,
  },

  // Finance (categoryId: 4)
  {
    id: 17,
    name: "Stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    logoBg: "#6772e5",
    jobCount: 9,
    categoryId: 4,
  },
  {
    id: 18,
    name: "Plaid",
    logo: "https://logo.clearbit.com/plaid.com",
    logoBg: "#1a1f2c",
    jobCount: 7,
    categoryId: 4,
  },
  {
    id: 19,
    name: "Revolut",
    logo: "https://logo.clearbit.com/revolut.com",
    logoBg: "#000000",
    jobCount: 12,
    categoryId: 4,
  },
  {
    id: 20,
    name: "Chime",
    logo: "https://logo.clearbit.com/chime.com",
    logoBg: "#00d2c5",
    jobCount: 6,
    categoryId: 4,
  },
  {
    id: 21,
    name: "Robinhood",
    logo: "https://logo.clearbit.com/robinhood.com",
    logoBg: "#00c805",
    jobCount: 8,
    categoryId: 4,
  },
  {
    id: 22,
    name: "Square",
    logo: "https://logo.clearbit.com/squareup.com",
    logoBg: "#003d45",
    jobCount: 11,
    categoryId: 4,
  },
  {
    id: 23,
    name: "TransferWise",
    logo: "https://logo.clearbit.com/wise.com",
    logoBg: "#9fe870",
    jobCount: 5,
    categoryId: 4,
  },
  {
    id: 24,
    name: "Coinbase",
    logo: "https://logo.clearbit.com/coinbase.com",
    logoBg: "#1652f0",
    jobCount: 15,
    categoryId: 4,
  },

  // Technology (categoryId: 5)
  {
    id: 25,
    name: "Vercel",
    logo: "https://logo.clearbit.com/vercel.com",
    logoBg: "#000000",
    jobCount: 7,
    categoryId: 5,
  },
  {
    id: 26,
    name: "Netlify",
    logo: "https://logo.clearbit.com/netlify.com",
    logoBg: "#32e6e2",
    jobCount: 5,
    categoryId: 5,
  },
  {
    id: 27,
    name: "DigitalOcean",
    logo: "https://logo.clearbit.com/digitalocean.com",
    logoBg: "#008bcf",
    jobCount: 8,
    categoryId: 5,
  },
  {
    id: 28,
    name: "Heroku",
    logo: "https://logo.clearbit.com/heroku.com",
    logoBg: "#430098",
    jobCount: 4,
    categoryId: 5,
  },
  {
    id: 29,
    name: "AWS",
    logo: "https://logo.clearbit.com/amazonaws.com",
    logoBg: "#ff9900",
    jobCount: 22,
    categoryId: 5,
  },
  {
    id: 30,
    name: "Cloudflare",
    logo: "https://logo.clearbit.com/cloudflare.com",
    logoBg: "#f38020",
    jobCount: 9,
    categoryId: 5,
  },
  {
    id: 31,
    name: "Linode",
    logo: "https://logo.clearbit.com/linode.com",
    logoBg: "#00a95c",
    jobCount: 6,
    categoryId: 5,
  },
  {
    id: 32,
    name: "Render",
    logo: "https://logo.clearbit.com/render.com",
    logoBg: "#5e6ad2",
    jobCount: 3,
    categoryId: 5,
  },

  // Engineering (categoryId: 6)
  {
    id: 33,
    name: "GitHub",
    logo: "https://logo.clearbit.com/github.com",
    logoBg: "#181717",
    jobCount: 14,
    categoryId: 6,
  },
  {
    id: 34,
    name: "GitLab",
    logo: "https://logo.clearbit.com/gitlab.com",
    logoBg: "#fc6d26",
    jobCount: 9,
    categoryId: 6,
  },
  {
    id: 35,
    name: "JetBrains",
    logo: "https://logo.clearbit.com/jetbrains.com",
    logoBg: "#d44333",
    jobCount: 7,
    categoryId: 6,
  },
  {
    id: 36,
    name: "Postman",
    logo: "https://logo.clearbit.com/postman.com",
    logoBg: "#ff6c37",
    jobCount: 6,
    categoryId: 6,
  },
  {
    id: 37,
    name: "Vercel",
    logo: "https://logo.clearbit.com/vercel.com",
    logoBg: "#000000",
    jobCount: 5,
    categoryId: 6,
  },
  {
    id: 38,
    name: "npm",
    logo: "https://logo.clearbit.com/npmjs.com",
    logoBg: "#cb3837",
    jobCount: 4,
    categoryId: 6,
  },
  {
    id: 39,
    name: "Docker",
    logo: "https://logo.clearbit.com/docker.com",
    logoBg: "#2496ed",
    jobCount: 8,
    categoryId: 6,
  },
  {
    id: 40,
    name: "Slack",
    logo: "https://logo.clearbit.com/slack.com",
    logoBg: "#4a154b",
    jobCount: 11,
    categoryId: 6,
  },

  // Business (categoryId: 7)
  {
    id: 41,
    name: "Deloitte",
    logo: "https://logo.clearbit.com/deloitte.com",
    logoBg: "#86bc25",
    jobCount: 18,
    categoryId: 7,
  },
  {
    id: 42,
    name: "McKinsey",
    logo: "https://logo.clearbit.com/mckinsey.com",
    logoBg: "#036c59",
    jobCount: 15,
    categoryId: 7,
  },
  {
    id: 43,
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    logoBg: "#a100ff",
    jobCount: 20,
    categoryId: 7,
  },
  {
    id: 44,
    name: "PwC",
    logo: "https://logo.clearbit.com/pwc.com",
    logoBg: "#bc1b23",
    jobCount: 12,
    categoryId: 7,
  },
  {
    id: 45,
    name: "EY",
    logo: "https://logo.clearbit.com/ey.com",
    logoBg: "#2e3192",
    jobCount: 14,
    categoryId: 7,
  },
  {
    id: 46,
    name: "KPMG",
    logo: "https://logo.clearbit.com/kpmg.com",
    logoBg: "#ff0000",
    jobCount: 10,
    categoryId: 7,
  },
  {
    id: 47,
    name: "Bain & Company",
    logo: "https://logo.clearbit.com/bain.com",
    logoBg: "#ff3d00",
    jobCount: 9,
    categoryId: 7,
  },
  {
    id: 48,
    name: "Boston Consulting",
    logo: "https://logo.clearbit.com/bcg.com",
    logoBg: "#0084ff",
    jobCount: 11,
    categoryId: 7,
  },

  // Human Resources (categoryId: 8)
  {
    id: 49,
    name: "Workday",
    logo: "https://logo.clearbit.com/workday.com",
    logoBg: "#1e88e5",
    jobCount: 7,
    categoryId: 8,
  },
  {
    id: 50,
    name: "BambooHR",
    logo: "https://logo.clearbit.com/bamboohr.com",
    logoBg: "#4caf50",
    jobCount: 5,
    categoryId: 8,
  },
]);

// Active category state
const activeCategory = ref(1);

// Set active category
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId;
};

// Filtered companies based on active category
const filteredCompanies = computed(() => {
  return companies.value.filter(
    (company) => company.categoryId === activeCategory.value
  );
});

// Get active category name
const getActiveCategoryName = () => {
  const category = categories.value.find(
    (cat) => cat.id === activeCategory.value
  );
  return category ? category.name : "";
};

// Get active category icon
const getActiveCategoryIcon = () => {
  const category = categories.value.find(
    (cat) => cat.id === activeCategory.value
  );
  return category ? category.icon : "";
};

// View company details
const viewCompanyDetails = (companyId) => {
  console.log("View company details:", companyId);
  // Navigate to company details page or show modal
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *;
.primary-color {
  color: var(--primary-color);
}
.companies-by-category {
  margin: 3rem 0;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.results-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.results-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.results-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  width: 1rem;
  height: 1rem;
}

.results-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.companies-results-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .companies-results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .companies-results-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.view-more {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}

.view-more-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4f46e5;
  font-weight: 500;
  text-decoration: none;
}

.view-more-icon {
  font-size: 1rem;
}
</style>
