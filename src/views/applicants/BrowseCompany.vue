<template>
  <div class="d-flex">
    <div class="flex-grow-1 vh-100 overflow-auto">
    <DashboardHeader title="BrowseCompany" />

    <div class="search-section mb-4">
      <div class="row g-3">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <i class="bi bi-search"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="Company title or keyword"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0">
              <i class="bi bi-geo-alt"></i>
            </span>
            <input
              type="text"
              class="form-control border-start-0"
              placeholder="Location"
              value="Florence, Italy"
            />
            <span class="input-group-text bg-white border-start-0">
              <i class="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100">Search</button>
        </div>
      </div>

      <div class="popular-searches mt-3">
        <span class="text-muted me-2">Popular:</span>
        <span class="popular-tag">Twitter</span>
        <span class="popular-tag">Microsoft</span>
        <span class="popular-tag">Apple</span>
        <span class="popular-tag">Facebook</span>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <CompanyFilters />
      </div>
      <div class="col-md-9">
        <div
          class="companies-header d-flex justify-content-between align-items-center mb-3"
        >
          <div>
            <h2 class="h5 mb-1">All Companies</h2>
            <p class="text-muted mb-0">Showing 73 results</p>
          </div>
          <div class="d-flex align-items-center">
            <div class="dropdown me-2">
              <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
              >
                Most relevant
              </button>
            </div>
            <div class="view-options">
              <button class="btn btn-outline-secondary me-1 active">
                <i class="bi bi-grid"></i>
              </button>
              <button class="btn btn-outline-secondary">
                <i class="bi bi-list"></i>
              </button>
            </div>
          </div>
        </div>

        <CompanyGrid :companies="companies" />

        <Pagination :currentPage="1" :totalPages="33" />
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import DashboardHeader from "@/components/Applicants/layout/DashboardHeader.vue";
import CompanyFilters from "@/components/Applicants/BrowseCompany/CompanyFilters.vue";
import CompanyGrid from "@/components/Applicants/BrowseCompany/CompanyGrid.vue";
import Pagination from "@/components/Applicants/applications/Pagination.vue";
const companies = [
  {
    id: 1,
    name: "Stripe",
    logo: "https://logo.clearbit.com/Stripe.com",
    description:
      "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools...",
    jobCount: 7,
    tags: ["Business", "Payment gateway"],
  },
  {
    id: 2,
    name: "Truebill",
    logo: "https://logo.clearbit.com/Truebill.com",
    description:
      "Take control of your money. Truebill develops a mobile app that helps consumers take control of their financial...",
    jobCount: 7,
    tags: ["Business"],
  },
  {
    id: 3,
    name: "Square",
    logo: "https://logo.clearbit.com/Stripe.com",
    description:
      "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.",
    jobCount: 7,
    tags: ["Business", "Blockchain"],
  },
  {
    id: 4,
    name: "Coinbase",
    logo: "https://logo.clearbit.com/Coinbase.com",
    description:
      "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies.",
    jobCount: 7,
    tags: ["Business", "Blockchain"],
  },
  {
    id: 5,
    name: "Robinhood",
    logo: "https://logo.clearbit.com/Robinhood.com",
    description:
      "Robinhood is lowering barriers, removing fees, and providing greater access to financial information.",
    jobCount: 7,
    tags: ["Business"],
  },
  {
    id: 6,
    name: "Kraken",
    logo: "https://logo.clearbit.com/Kraken.com",
    description:
      "Based in San Francisco, Kraken is the world's largest global bitcoin exchange in euro volume and liquidity.",
    jobCount: 7,
    tags: ["Business", "Blockchain"],
  },
];
</script>

<style scoped>
.browse-companies {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.popular-tag {
  display: inline-block;
  margin-right: 8px;
  font-size: 14px;
  color: #5138ee;
  cursor: pointer;
}

.popular-tag:hover {
  text-decoration: underline;
}

.view-options .btn.active {
  background-color: #e9ecef;
}
</style>
