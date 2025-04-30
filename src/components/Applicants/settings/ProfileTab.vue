<!-- src/components/settings/ProfileTab.vue -->
<template>
  <div class="profile-tab">
    <!-- Basic Information Section -->
    <div class="section mb-4">
      <h5 class="section-title">Basic Information</h5>
      <p class="text-muted">
        This is your personal information that you can update anytime.
      </p>
      <hr />
    </div>

    <!-- Profile Photo Section -->
    <ProfilePhoto :photoUrl="userData.photoUrl" @photo-updated="updatePhoto" />

    <!-- Personal Details Section -->
    <PersonalDetails :userData="userData" @user-data-updated="updateUserData" />

    <!-- Account Type Section -->
    <AccountType
      :accountType="userData.accountType"
      @account-type-updated="updateAccountType"
    />

    <!-- Save Button -->
    <div class="d-flex justify-content-end mt-4">
      <button class="btn btn-primary" @click="saveProfile">Save Profile</button>
    </div>
  </div>
</template>

<script>
import ProfilePhoto from "./ProfilePhoto.vue";
import PersonalDetails from "./PersonalDetails.vue";
import AccountType from "./AccountType.vue";

export default {
  name: "ProfileTab",
  components: {
    ProfilePhoto,
    PersonalDetails,
    AccountType,
  },
  data() {
    return {
      userData: {
        fullName: "Jake Gyll",
        phoneNumber: "+44 1245 572 135",
        email: "Jakegyll@gmail.com",
        dateOfBirth: "09/08/1997",
        gender: "Male",
        photoUrl: null, // Will be populated from the server
        accountType: "Job Seeker",
      },
    };
  },
  methods: {
    updatePhoto(photoUrl) {
      this.userData.photoUrl = photoUrl;
    },
    updateUserData(updatedData) {
      this.userData = { ...this.userData, ...updatedData };
    },
    updateAccountType(type) {
      this.userData.accountType = type;
    },
    saveProfile() {
      // Here you would make an API call to save the profile data
      console.log("Saving profile data:", this.userData);
      // Show success message or handle errors
      alert("Profile saved successfully!");
    },
  },
  mounted() {
    // Here you would fetch the user data from your API
    // For demo purposes, we're using the hardcoded data

    // Simulating API response
    setTimeout(() => {
      this.userData.photoUrl = "https://via.placeholder.com/150";
    }, 300);
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>
