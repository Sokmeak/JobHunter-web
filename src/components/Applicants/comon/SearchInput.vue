<template>
  <div class="search-button">
    <input 
      type="text" 
      placeholder="Search" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" 
    />
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.search-button {
  position: relative;
  width: 200px;
}

.search-button input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
}

@media (max-width: 768px) {
  .search-button {
    width: 100%;
  }
}
</style>