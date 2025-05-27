<template>
  <div class="pagination">
    <button 
      class="pagination-button prev" 
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    
    <button 
      v-for="page in visiblePages" 
      :key="page" 
      class="pagination-button page-number" 
      :class="{ 'active': currentPage === page }"
      @click="$emit('update:page', page)"
    >
      {{ page }}
    </button>
    
    <span v-if="showEllipsis" class="pagination-ellipsis">...</span>
    
    <button 
      v-if="showLastPage" 
      class="pagination-button page-number"
      @click="$emit('update:page', totalPages)"
    >
      {{ totalPages }}
    </button>
    
    <button 
      class="pagination-button next" 
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    visiblePages() {
      // Show first 5 pages or less if totalPages < 5
      if (this.totalPages <= 5) {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
      }
      
      // If current page is among first 3 pages
      if (this.currentPage <= 3) {
        return [1, 2, 3, 4, 5];
      }
      
      // If current page is among last 3 pages
      if (this.currentPage > this.totalPages - 3) {
        return Array.from(
          { length: 5 }, 
          (_, i) => this.totalPages - 4 + i
        );
      }
      
      // Otherwise show 2 pages before and after current page
      return [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2
      ];
    },
    showEllipsis() {
      return this.totalPages > 5 && this.currentPage < this.totalPages - 2;
    },
    showLastPage() {
      return this.totalPages > 5 && this.currentPage < this.totalPages - 2;
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update:page', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:page', this.currentPage + 1);
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
}

.pagination-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button.active {
  background-color: #4640DE;
  color: white;
  border-color: #4640DE;
}

.pagination-ellipsis {
  color: #6b7280;
}
</style>