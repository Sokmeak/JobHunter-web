<template>
  <div class="pagination-wrapper">
    <nav class="pagination">
      <button 
        class="page-btn prev" 
        @click="previousPage" 
        :disabled="currentPage === 1"
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      
      <button 
        v-for="page in visiblePages" 
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      
      <span v-if="showEllipsis" class="page-ellipsis">...</span>
      
      <button 
        v-if="showLastPage"
        class="page-btn"
        :class="{ active: totalPages === currentPage }"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </button>
      
      <button 
        class="page-btn next" 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </nav>
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
    },
    maxVisiblePages: {
      type: Number,
      default: 5
    }
  },
  computed: {
    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
      const end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    showEllipsis() {
      return this.totalPages > this.maxVisiblePages && 
             this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1;
    },
    showLastPage() {
      return this.totalPages > this.maxVisiblePages && 
             this.visiblePages[this.visiblePages.length - 1] < this.totalPages;
    }
  },
  methods: {
    goToPage(page) {
      if (page !== this.currentPage) {
        this.$emit('page-changed', page);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('page-changed', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-changed', this.currentPage + 1);
      }
    }
  }
};
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #e8eaed;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: #5f6368;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: #f8f9fa;
  border-color: #4640DE;
}

.page-btn.active {
  background-color: #4640DE;
  border-color: #4640DE;
  color: #ffffff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-ellipsis {
  padding: 0 8px;
  color: #5f6368;
}
</style>
