<template>
  <div class="search-filter">
    <div class="search-box">
      <i class="bi bi-search"></i>
      <input 
        type="text" 
        :placeholder="placeholder"
        :value="searchQuery"
        @input="updateSearch"
      >
    </div>
    <button class="filter-btn" @click="toggleFilter">
      <i class="bi bi-funnel"></i>
      Filter
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchFilter',
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search'
    }
  },
  methods: {
    updateSearch(event) {
      this.$emit('search-changed', event.target.value);
    },
    toggleFilter() {
      this.$emit('filter-clicked');
    }
  }
};
</script>

<style scoped>
.search-filter {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box i {
  position: absolute;
  left: 12px;
  color: #5f6368;
  font-size: 16px;
}

.search-box input {
  padding: 8px 12px 8px 36px;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  font-size: 14px;
  width: 200px;
  transition: border-color 0.2s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #4285f4;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #f8f9fa;
  border: 1px solid #e8eaed;
  border-radius: 8px;
  font-size: 14px;
  color: #5f6368;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filter-btn:hover {
  background-color: #f1f3f4;
}

@media (max-width: 768px) {
  .search-filter {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box input {
    width: 100%;
  }
}
</style>
