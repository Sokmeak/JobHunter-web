<template>
  <span class="status-badge" :class="statusClass">
    {{ status }}
  </span>
</template>

<script>
export default {
  name: "StatusBadge",
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusClass() {
      switch (this.status) {
        case "In Review":
          return "status-review";
        case "Shortlisted":
          return "status-shortlisted";
        case "Offered":
          return "status-offered";
        case "Interviewing":
          return "status-interviewing";
        case "Unsuitable":
          return "status-unsuitable";
        case "Assessment":
          return "status-assessment";
        case "Hired":
          return "status-hired";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
:root {
  --primary-color: #4640de;
  --bg-primary-color: #4640de;
  --secondary-color: #ccccf5;
  --tertiary-color: #e7f6fd;
  --cyan-accent-color: #26a4ff;
  --red-accent-color: #ff6550;
  --green-accent-color: #56cdad;
  --purple-accent-color: #7b61ff;
  --yellow-accent-color: #ffb836;
  --neutral-color: #25324b;
}
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-review {
  /* background-color: #FFF8E6; */
  color: #ffb836;
  border: 1px solid #ffb836;
}

.status-shortlisted {
  /* background-color: #E6F7F0; */
  color: #56cdad;
  border: 1px solid #56cdad;
}

.status-offered {
  /* background-color: #EEE9FF; */
  color: #7b61ff;
  border: 1px solid #7b61ff;
}

.status-interviewing {
  /* background-color: #FFF8E6; */
  color: #ffb836;
  border: 1px solid #ffb836;
}

.status-unsuitable {
  /* background-color: #FFF0ED; */
  color: #ff6550;
  border: 1px solid #ff6550;
}
.status-assessment {
  /* background-color: #F0F4FF; */
  color: #26a4ff;
  border: 1px solid #26a4ff;
}
.status-hired {
  /* background-color: #E6F7F0; */
  color: #56cdad;
  border: 1px solid #56cdad;
}
</style>
