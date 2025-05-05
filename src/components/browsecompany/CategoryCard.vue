<template>
  <div
    class="category-card"
    :class="{ active: isActive }"
    @click="$emit('select', category.id)"
  >
    <div class="category-icon" :class="{ 'active-icon': isActive }">
      <i :class="category.icon" class="fs-4"></i>
    </div>
    <h3 class="category-name">{{ category.name }}</h3>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  category: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.id !== undefined && value.name && value.icon;
    },
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["select"]);
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */
.primary-color {
  color: var(--primary-color);
}
.category-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;
}

.category-card:hover {
  border-color: #4f46e5;
  transform: translateY(-2px);
}

.category-card.active {
  border-color: #4f46e5;
  background-color: #4f46e5;
}

.category-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  margin-bottom: 0.75rem;
}

.active-icon {
  color: white;
}

.category-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
}

.active .category-name {
  color: white;
}
</style>
