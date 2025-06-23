<template>
  <div class="pending-approvals">
    <h2 class="section-title">Pending Approvals</h2>
    <div class="approvals-list">
      <ApprovalItem
        v-for="(approval, index) in filteredApprovals"
        :key="approval.id || index"
        :company="approval.company"
        :type="approval.type"
        :priority="approval.priority"
        :time="approval.time"
        @approve="approveItem(approval.id)"
        @reject="rejectItem(approval.id)"
      />
      <p v-if="filteredApprovals.length === 0" class="no-approvals-message">
        No pending approvals for the selected date.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import ApprovalItem from './ApprovalItem.vue';

const selectedDate = inject('selectedDate');

// Data for pending approvals. In a real application, this would come from an API.
// Added a unique 'id' to each approval for better keying in v-for and easier management.
const approvals = ref([
  {
    id: 1, // Added unique ID
    company: 'Acme Solution',
    type: 'Employer Verification',
    priority: 'medium',
    time: '2025-05-27T10:23:00',
    status: 'pending'
  },
  {
    id: 2, // Added unique ID
    company: 'Acme Solution',
    type: 'Employer Verification',
    priority: 'high',
    time: '2025-05-27T10:30:00',
    status: 'pending'
  },
  {
    id: 3, // Added unique ID
    company: 'Acme Solution',
    type: 'Employer Verification',
    priority: 'low',
    time: '2025-05-26T10:45:00', // Example from yesterday
    status: 'pending'
  },
  {
    id: 4, // Added unique ID
    company: 'Acme Solution',
    type: 'Employer Verification',
    priority: 'medium',
    time: '2025-05-27T11:00:00',
    status: 'pending'
  },
  {
    id: 5, // Added unique ID
    company: 'Acme Solution',
    type: 'Employer Verification',
    priority: 'low',
    time: '2025-05-27T11:15:00',
    status: 'pending'
  },
  {
    id: 6, // Added unique ID
    company: 'Acme Solution',
    type: 'Employer Verification',
    priority: 'low',
    time: '2025-05-26T11:30:00', // Example from yesterday
    status: 'pending'
  }
]);

// Computed property to filter approvals based on the selected date and status
const filteredApprovals = computed(() => {
  const selected = selectedDate.value ? new Date(selectedDate.value).toDateString() : null;

  return approvals.value.filter(a => {
    // Only show items that are 'pending'
    if (a.status !== 'pending') {
      return false;
    }

    // If a date is selected, filter by date
    if (selected) {
      const approvalDate = new Date(a.time);
      return approvalDate.toDateString() === selected;
    }
    // If no date is selected, show all pending approvals
    return true;
  });
});

// Function to approve an item
const approveItem = (id) => {
  const item = approvals.value.find(approval => approval.id === id);
  if (item) {
    item.status = 'approved';
    console.log(`Approval ${id} approved.`);
    // In a real application, you would send this update to your backend.
  }
};

// Function to reject an item
const rejectItem = (id) => {
  const item = approvals.value.find(approval => approval.id === id);
  if (item) {
    item.status = 'rejected';
    console.log(`Approval ${id} rejected.`);
    // In a real application, you would send this update to your backend.
  }
};
</script>

<style scoped>

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");

.pending-approvals {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  height: 100%;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.approvals-list {
  display: flex;
  flex-direction: column;
}

.no-approvals-message {
  text-align: center;
  color: #6b7280;
  padding: 20px;
  font-style: italic;
}
</style>