<template>
  <div class="applications-table">
    <div class="table-header">
      <div class="col-number">#</div>
      <div class="col-company">Company Name</div>
      <div class="col-role">Roles</div>
      <div class="col-date">Date Applied</div>
      <div class="col-status">Status</div>
      <div class="col-actions"></div>
    </div>

    <div class="table-body">
      <ApplicationRow
        v-for="(application, index) in applications"
        :key="application.id"
        :application="application"
        :index="startIndex + index"
        @view-details="$emit('view-details', $event)"
        @follow-up="$emit('follow-up', $event)"
        @withdraw="$emit('withdraw', $event)"
      />
    </div>

    <div v-if="applications.length === 0" class="empty-state">
      <i class="bi bi-file-earmark-text"></i>
      <p>No applications found</p>
    </div>
  </div>
</template>

<script>
import ApplicationRow from './ApplicationRow.vue';

export default {
  name: 'ApplicationTable',
  components: {
    ApplicationRow
  },
  props: {
    applications: {
      type: Array,
      required: true
    },
    startIndex: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.applications-table {
  border: 1px solid #e8eaed;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.table-header {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 120px 120px 60px;
  gap: 16px;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e8eaed;
  font-size: 14px;
  font-weight: 600;
  color: #5f6368;
}

.table-body {
  background-color: #ffffff;
}

.empty-state {
  padding: 48px 20px;
  text-align: center;
  color: #9aa0a6;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.empty-state p {
  font-size: 16px;
  margin: 0;
}

@media (max-width: 768px) {
  .table-header {
    display: none;
  }
}
</style>
