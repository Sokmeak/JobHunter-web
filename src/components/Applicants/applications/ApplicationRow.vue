<template>
  <div class="table-row">
    <div class="col-number">{{ index + 1 }}</div>
    <div class="col-company">
      <div class="company-info">
        <img :src="application.companyLogo" :alt="application.companyName" class="company-logo">
        <span class="company-name">{{ application.companyName }}</span>
      </div>
    </div>
    <div class="col-role">{{ application.role }}</div>
    <div class="col-date">{{ formattedDate }}</div>
    <div class="col-status">
      <StatusBadge :status="application.status" />
    </div>
    <div class="col-actions">
      <div class="dropdown">
        <button class="action-btn" data-bs-toggle="dropdown">
          <i class="bi bi-three-dots"></i>
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" @click.prevent="viewDetails">View Details</a></li>
          <li v-if="canFollowUp"><a class="dropdown-item" href="#" @click.prevent="followUp">Follow Up</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="withdraw">Withdraw</a></li>
        </ul>
      </div>
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
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedDate() {
      const date = new Date(this.application.dateApplied);
      return date.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    },
    canFollowUp() {
      return this.application.status === 'In Review';
    }
  },
  methods: {
    viewDetails() {
      this.$emit('view-details', this.application);
    },
    followUp() {
      this.$emit('follow-up', this.application);
    },
    withdraw() {
      this.$emit('withdraw', this.application);
    }
  }
};
</script>

<style scoped>
.table-row {
  display: grid;
  grid-template-columns: 60px 1fr 1fr 120px 120px 60px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f3f4;
  align-items: center;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f8f9fa;
}

.table-row:last-child {
  border-bottom: none;
}

.col-number {
  font-size: 14px;
  color: #5f6368;
  font-weight: 500;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.company-logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
}

.company-name {
  font-size: 14px;
  font-weight: 500;
  color: #202124;
}

.col-role {
  font-size: 14px;
  color: #5f6368;
}

.col-date {
  font-size: 14px;
  color: #5f6368;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: #f1f3f4;
}

@media (max-width: 768px) {
  .table-row {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
    border: 1px solid #e8eaed;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .table-row > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .col-number::before { content: "No: "; }
  .col-company::before { content: "Company: "; }
  .col-role::before { content: "Role: "; }
  .col-date::before { content: "Applied: "; }
  .col-status::before { content: "Status: "; }
  
  .table-row > div::before {
    font-weight: 600;
    color: #5f6368;
  }
}
</style>
