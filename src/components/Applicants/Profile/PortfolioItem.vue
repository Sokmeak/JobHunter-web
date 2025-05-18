<template>
  <div class="portfolio-item">
    <img :src="portfolio.image" :alt="portfolio.title" class="img-fluid rounded mb-2">
    <p class="small mb-0">{{ portfolio.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'PortfolioItem',
  props: {
    portfolio: {
      type: Object,
      required: true
    }
  }
}
</script>