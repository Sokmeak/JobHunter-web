<template>
  <div 
    class="table-row"
    :class="{ 'odd-row': isOdd }"
    @click="$emit('click')"
  >
    <div class="cell index-cell">{{ application.id }}</div>
    <div class="cell company-cell">
      <div class="company-info">
        <div class="company-logo" :style="{ backgroundColor: application.logoBackground }">
          <img :src="application.companyLogo" :alt="application.companyName" />
        </div>
        <span>{{ application.companyName }}</span>
      </div>
    </div>
    <div class="cell role-cell">{{ application.role }}</div>
    <div class="cell date-cell">{{ application.dateApplied }}</div>
    <div class="cell status-cell">
      <StatusBadge :status="application.status" />
    </div>
    <div class="cell actions-cell">
      <button class="action-button" @click.stop="$emit('action-menu')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import StatusBadge from './StatusBadge.vue';

export default {
  name: 'ApplicationRow',
  components: {
    StatusBadge
  },
  props: {
    application: {
      type: Object,
      required: true
    },
    isOdd: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.table-row {
  display: flex;
  /* border-bottom: 1px solid #e0e0e0; */
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f8fafc;
}

.odd-row {
  background-color: #F8F8FD;
}

.odd-row:hover {
  background-color: #f1f5f9;
}

.cell {
  padding: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.index-cell {
  width: 5%;
  justify-content: center;
}

.company-cell {
  width: 25%;
}

.role-cell {
  width: 25%;
}

.date-cell {
  width: 20%;
}

.status-cell {
  width: 20%;
}

.actions-cell {
  width: 5%;
  justify-content: center;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.company-logo {
  width: 50px;
  height: 50px;
  /* border-radius: 8px; */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.company-logo img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

@media (max-width: 768px) {
  .table-row {
    width: 800px;
  }
}
</style>