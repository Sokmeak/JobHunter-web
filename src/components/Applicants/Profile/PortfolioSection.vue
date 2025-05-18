<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Portfolios</h5>
        <div>
          <button class="btn btn-link text-primary p-0 me-2">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div v-for="(portfolio, index) in portfolios" :key="index" class="col-md-3 mb-3">
          <portfolio-item :portfolio="portfolio" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioItem from './PortfolioItem.vue'

export default {
  name: 'PortfolioSection',
  components: {
    PortfolioItem
  },
  props: {
    portfolios: {
      type: Array,
      required: true
    }
  }
}
</script>