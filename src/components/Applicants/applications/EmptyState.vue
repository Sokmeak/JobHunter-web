<template>
  <div class="empty-state">
    <div class="empty-state-icon">
      <i :class="`bi bi-${icon}`"></i>
    </div>
    <h3 class="empty-state-title">{{ title }}</h3>
    <p class="empty-state-message">{{ message }}</p>
    <slot name="action"></slot>
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
      default: 'There are no items to display.'
    },
    icon: {
      type: String,
      default: 'inbox'
    }
  }
};
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px dashed #e5e7eb;
}

.empty-state-icon {
  font-size: 48px;
  color: #9ca3af;
  margin-bottom: 16px;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.empty-state-message {
  font-size: 14px;
  color: #6b7280;
  max-width: 400px;
  margin: 0 0 24px 0;
}
</style>