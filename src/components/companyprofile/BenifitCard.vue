<template>
  <div class="benefit-card">
    <div class="card border-0 shadow-sm h-100 rounded-3 benefit-card-inner">
      <div class="card-body p-3">
        <div class="d-flex">
          <div class="benefit-icon-container me-3">
            <div class="benefit-icon">
              <i :class="`bi ${benefit.icon}`"></i>
            </div>
          </div>
          <div>
            <h3 class="benefit-title mb-2">{{ benefit.title }}</h3>
            <p class="benefit-description mb-0">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  benefit: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.benefit-card {
  transition: all 0.3s ease;
}

.benefit-card-inner {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.benefit-card-inner:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(70, 64, 222, 0.1) !important;
}

.benefit-icon-container {
  flex-shrink: 0;
}

.benefit-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #e7f6fd;
  color: #4640de;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.benefit-title {
  font-size: 1rem;
  font-weight: 700;
  color: #25324b;
}

.benefit-description {
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.5;
}
</style>