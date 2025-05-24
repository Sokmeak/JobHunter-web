<template>
  <div class="status-tabs">
    <button 
      v-for="tab in visibleTabs" 
      :key="tab.key"
      class="status-tab"
      :class="{ active: activeTab === tab.key }"
      @click="selectTab(tab.key)"
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
    },
    hideEmptyTabs: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    visibleTabs() {
      if (this.hideEmptyTabs) {
        return this.tabs.filter(tab => tab.count > 0 || tab.key === 'all');
      }
      return this.tabs;
    }
  },
  methods: {
    selectTab(tabKey) {
      this.$emit('tab-changed', tabKey);
    }
  }
};
</script>

<style scoped>
.status-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 32px;
  border-bottom: 1px solid #e8eaed;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.status-tab {
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #5f6368;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.status-tab:hover {
  color: #202124;
}

.status-tab.active {
  color: #4285f4;
  border-bottom-color: #4285f4;
}

@media (max-width: 768px) {
  .status-tabs {
    padding-bottom: 0;
  }
}
</style>