<template>
  <div class="empty-state" :class="{ 'compact': compact }">
    <div class="empty-state-content">
      <i :class="icon"></i>
      <h4>{{ title }}</h4>
      <p>{{ message }}</p>
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      default: 'No data found'
    },
    message: {
      type: String,
      default: 'There are no items to display at this time.'
    },
    icon: {
      type: String,
      default: 'bi bi-file-earmark-text'
    },
    compact: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.empty-state {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 48px 20px;
  text-align: center;
  margin-bottom: 24px;
}

.empty-state.compact {
  padding: 24px 16px;
}

.empty-state-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-state i {
  font-size: 48px;
  color: #9aa0a6;
  margin-bottom: 16px;
}

.empty-state.compact i {
  font-size: 32px;
  margin-bottom: 12px;
}

.empty-state h4 {
  font-size: 18px;
  font-weight: 600;
  color: #202124;
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 16px;
}

.empty-state.compact p {
  margin-bottom: 12px;
}
</style>