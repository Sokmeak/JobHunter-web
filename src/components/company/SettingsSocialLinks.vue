<template>
  <div class="settings-social-links">
    <div class="row">
      <div class="col-md-6">
        <div class="mb-4">
          <h5 class="mb-2">Basic Information</h5>
          <p class="text-muted">
            Add elsewhere links to your company profile. You can add only
            username without full https links.
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <form @submit.prevent="saveSocialLinks">
          <div class="mb-3">
            <label for="instagram" class="form-label">Instagram</label>
            <input
              type="url"
              class="form-control"
              id="instagram"
              v-model="socialLinks.instagram"
              placeholder="https://www.instagram.com/nomad/"
            />
          </div>

          <div class="mb-3">
            <label for="twitter" class="form-label">Twitter</label>
            <input
              type="url"
              class="form-control"
              id="twitter"
              v-model="socialLinks.twitter"
              placeholder="https://twitter.com/nomad/"
            />
          </div>

          <div class="mb-3">
            <label for="facebook" class="form-label">Facebook</label>
            <input
              type="url"
              class="form-control"
              id="facebook"
              v-model="socialLinks.facebook"
              placeholder="https://web.facebook.com/nomad/"
            />
          </div>

          <div class="mb-3">
            <label for="linkedin" class="form-label">LinkedIn</label>
            <input
              type="url"
              class="form-control"
              id="linkedin"
              v-model="socialLinks.linkedin"
              placeholder="Enter your LinkedIn address"
            />
          </div>

          <div class="mb-4">
            <label for="youtube" class="form-label">Youtube</label>
            <input
              type="url"
              class="form-control"
              id="youtube"
              v-model="socialLinks.youtube"
              placeholder="Enter your youtube address"
            />
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary px-4">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const socialLinks = ref({
  instagram: "https://www.instagram.com/nomad/",
  twitter: "https://twitter.com/nomad/",
  facebook: "https://web.facebook.com/nomad/",
  linkedin: "",
  youtube: "",
});

const saveSocialLinks = () => {
  console.log("Saving social links:", socialLinks.value);
  // Here you would typically send the data to your API
  alert("Social links saved successfully!");
};
</script>
