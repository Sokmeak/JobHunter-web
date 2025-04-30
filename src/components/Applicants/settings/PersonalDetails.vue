<!-- src/components/settings/PersonalDetails.vue -->
<template>
  <div class="personal-details-section mb-4">
    <h5 class="section-title">Personal Details</h5>

    <form @submit.prevent="saveDetails">
      <div class="row mb-3">
        <div class="col-12">
          <label for="fullName" class="form-label"
            >Full Name <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            id="fullName"
            v-model="localUserData.fullName"
            required
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6 mb-3 mb-md-0">
          <label for="phoneNumber" class="form-label"
            >Phone Number <span class="text-danger">*</span></label
          >
          <input
            type="tel"
            class="form-control"
            id="phoneNumber"
            v-model="localUserData.phoneNumber"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label"
            >Email <span class="text-danger">*</span></label
          >
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="localUserData.email"
            required
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3 mb-md-0">
          <label for="dateOfBirth" class="form-label"
            >Date of Birth <span class="text-danger">*</span></label
          >
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              id="dateOfBirth"
              v-model="localUserData.dateOfBirth"
              placeholder="MM/DD/YYYY"
              required
            />
            <span class="input-group-text">
              <i class="bi bi-calendar"></i>
            </span>
          </div>
        </div>
        <div class="col-md-6">
          <label for="gender" class="form-label"
            >Gender <span class="text-danger">*</span></label
          >
          <select
            class="form-select"
            id="gender"
            v-model="localUserData.gender"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PersonalDetails",
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localUserData: { ...this.userData },
    };
  },
  watch: {
    userData: {
      handler(newValue) {
        this.localUserData = { ...newValue };
      },
      deep: true,
    },
    localUserData: {
      handler(newValue) {
        this.$emit("user-data-updated", newValue);
      },
      deep: true,
    },
  },
  methods: {
    saveDetails() {
      this.$emit("user-data-updated", this.localUserData);
    },
  },
};
</script>

<style scoped>
.form-label {
  font-weight: 500;
}
</style>
