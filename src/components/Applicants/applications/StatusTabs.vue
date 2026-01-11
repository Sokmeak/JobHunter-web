<template>
  <div class="status-tabs">
    <button 
      v-for="tab in tabs" 
      :key="tab.status" 
      class="tab-button" 
      :class="{ 'active': activeTab === tab.status }"
      @click="$emit('update:activeTab', tab.status)"
    >
      {{ tab.label }} ({{ tab.count }})
    </button>
  </div>
</template>

<script>
export default {
  name: 'StatusTabs',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.status-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
  overflow-x: auto;
  white-space: nowrap;
}

.tab-button {
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 16px;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
}

.tab-button.active {
  color: #4640DE;
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #4640DE;
  border-radius: 3px 3px 0 0;
}
</style>