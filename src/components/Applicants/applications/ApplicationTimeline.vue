<template>
  <div class="timeline">
    <div 
      v-for="(event, index) in timeline" 
      :key="index"
      class="timeline-item"
      :class="{ 'completed': event.completed }"
    >
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h4 class="timeline-title">{{ event.title }}</h4>
        <p class="timeline-date">{{ event.date }}</p>
        <p class="timeline-description">{{ event.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationTimeline',
  props: {
    timeline: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.timeline-item {
  display: flex;
  gap: 16px;
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 11px;
  top: 24px;
  width: 2px;
  height: calc(100% + 8px);
  background-color: #e5e7eb;
}

.timeline-item.completed::after {
  background-color: #4640DE;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e5e7eb;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #e5e7eb;
  flex-shrink: 0;
  margin-top: 2px;
}

.timeline-item.completed .timeline-dot {
  background-color: #4640DE;
  box-shadow: 0 0 0 2px #4640DE;
}

.timeline-content {
  flex: 1;
}

.timeline-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.timeline-date {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.timeline-description {
  font-size: 14px;
  color: #374151;
  margin: 0;
}
</style>