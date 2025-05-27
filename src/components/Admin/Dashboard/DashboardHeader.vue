<template>
  <header class="dashboard-header">
    <div class="header-content">
      <div class="title-section">
        <h1 class="title">Dashboard</h1>
        <p class="welcome-message">
          Welcome back, {{ dashboardData.username }}! Here is what's happening on
          <span class="highlight">JobHunter</span> Today.
        </p>
      </div>
      <div class="actions">
        <button class="action-button" @click="toggleDatepickerAndSetToday">
          <Calendar class="button-icon" />
          <span>Today</span>
        </button>

        <div v-if="showDatepicker" class="datepicker-container">
          <VueDatePicker
            v-model="selectedDate"
            @update:model-value="hideDatepicker"
            :inline="false"   
            :enable-time-picker="false" 
            auto-apply              
            :close-on-auto-apply="true" 
            :clearable="true"    
            :text-input="false"  
          />
        </div>

        <button class="action-button" @click="refreshPage">
          <RefreshCw class="button-icon" />
          <span>Refresh</span>
        </button>
        <button class="action-button" @click="exportStatCardsToPdf">
                    <Download class="button-icon" />
          <span>Export</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject, ref } from 'vue';
import { Calendar, RefreshCw, Download } from 'lucide-vue-next';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const dashboardData = inject('dashboardData');
const selectedDate = inject('selectedDate');

const exportStatCardsToPdf = inject('exportStatCardsToPdf');

const showDatepicker = ref(false);

const toggleDatepickerAndSetToday = () => {
  // Bascule l'affichage du datepicker
  showDatepicker.value = !showDatepicker.value;
  // Si on ouvre le datepicker (et qu'il n'était pas déjà ouvert), on met la date à aujourd'hui
  if (showDatepicker.value && selectedDate.value) {
    selectedDate.value = new Date();
  }
};

const hideDatepicker = () => {
  // Cette fonction est appelée quand VueDatePicker met à jour sa valeur (par exemple, après une sélection)
  showDatepicker.value = false;
};

function refreshPage() {
  window.location.reload();
}
</script>

<style scoped>
.dashboard-header {
  margin-bottom: 20px;
  position: relative;
  /* Assure que le datepicker peut se positionner par rapport à lui */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.title-section {
  flex: 1;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.welcome-message {
  color: #6b7280;
  font-size: 14px;
}

.highlight {
  color: #4f46e5;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #f9fafb;
}

.button-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

/* Important pour que le datepicker soit visible et interactif */
.datepicker-container {
  position: absolute;
  z-index: 1000; /* Assure que le datepicker est au-dessus des autres éléments */
  top: 80%;
  right: 20px;
  margin-top: 1px;
  border-radius: 8px;
  overflow: hidden;
  min-width: 300px; /* Ou plus, juste pour le test */
  min-height: 400px; /* Ou plus, juste pour le test */
}

.dp__main {
  width: auto !important;
  min-width: 280px; /* Exemple, ajuste selon tes besoins */
}

@media (max-width: 640px) {
  .header-content {
    flex-direction: column;
  }

  .actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>