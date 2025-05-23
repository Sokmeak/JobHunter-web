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
      switch(this.status) {
        case 'In Review':
          return 'status-review';
        case 'Shortlisted':
          return 'status-shortlisted';
        case 'Offered':
          return 'status-offered';
        case 'Interviewing':
          return 'status-interviewing';
        case 'Unsuitable':
          return 'status-unsuitable';
        case 'Hired':
          return 'status-hired';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-review {
  background-color: #FFF8E6;
  color: #B98900;
  border: 1px solid #FFE7A0;
}

.status-shortlisted {
  background-color: #E6F7F0;
  color: #027A48;
  border: 1px solid #B8DBCA;
}

.status-offered {
  background-color: #EEE9FF;
  color: #5925DC;
  border: 1px solid #D9CFFF;
}

.status-interviewing {
  background-color: #FFF8E6;
  color: #B98900;
  border: 1px solid #FFE7A0;
}

.status-unsuitable {
  background-color: #FFF0ED;
  color: #C4320A;
  border: 1px solid #FFD6CC;
}

.status-hired {
  background-color: #E6F7F0;
  color: #027A48;
  border: 1px solid #B8DBCA;
}
</style>