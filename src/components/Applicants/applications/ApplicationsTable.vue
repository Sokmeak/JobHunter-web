<template>
  <div class="applications-table">
    <div class="table-header">
      <div class="header-cell index-cell">#</div>
      <div class="header-cell company-cell">Company Name</div>
      <div class="header-cell role-cell">Roles</div>
      <div class="header-cell date-cell">Date Applied</div>
      <div class="header-cell status-cell">Status</div>
      <div class="header-cell actions-cell"></div>
    </div>

    <ApplicationRow 
      v-for="(application, index) in applications" 
      :key="application.id"
      :application="application"
      :isOdd="index % 2 === 0"
      @click="$emit('view-application', application)"
      @action-menu="$emit('action-menu', application)"
    />
  </div>
</template>

<script>
import ApplicationRow from './ApplicationRow.vue';

export default {
  name: 'ApplicationsTable',
  components: {
    ApplicationRow
  },
  props: {
    applications: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.applications-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(137, 19, 19, 0.05);
}

.table-header {
  display: flex;
  background-color: #f9fafb;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 500;
  color: #6b7280;
}

.header-cell {
  padding: 16px;
  text-align: left;
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

@media (max-width: 768px) {
  .applications-table {
    overflow-x: auto;
    display: block;
  }
  
  .table-header {
    width: 800px;
  }
}
</style>