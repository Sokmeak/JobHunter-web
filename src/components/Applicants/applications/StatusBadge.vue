<template>
  <span class="status-badge" :class="statusClass">
    {{ status }}
  </span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    statusClass() {
      const statusClasses = {
        'In Review': 'in-review',
        'Shortlisted': 'shortlisted',
        'Offered': 'offered',
        'Interviewing': 'interviewing',
        'Unsuitable': 'unsuitable',
        'Hired': 'hired',
        'Assessment': 'assessment'
      };
      return statusClasses[this.status] || 'default';
    }
  }
};
</script>

<style scoped>
.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-block;
}

.status-badge.in-review {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.status-badge.shortlisted {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.status-badge.offered {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-badge.interviewing {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.status-badge.assessment {
  background-color: #e2e3f1;
  color: #383d41;
  border: 1px solid #c6c8db;
}

.status-badge.unsuitable {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-badge.hired {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-badge.default {
  background-color: #e9ecef;
  color: #495057;
  border: 1px solid #ced4da;
}
</style>
