<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Social Links</h5>
        <button 
          class="btn btn-link text-primary p-0"
          @click="toggleEditMode"
        >
          <i :class="isEditing ? 'bi bi-check-lg' : 'bi bi-pencil'"></i>
        </button>
      </div>
      
      <div v-for="(social, index) in localSocialLinks" :key="index" class="social-item mb-3">
        <div v-if="!isEditing">
          <p class="text-muted mb-1">{{ social.platform }}</p>
          <p class="mb-0">{{ social.url }}</p>
        </div>
        
        <div v-else class="edit-mode">
          <div class="mb-2">
            <label class="form-label text-muted small">Platform</label>
            <input 
              v-model="social.platform"
              type="text" 
              class="form-control form-control-sm"
              placeholder="Platform name"
            />
          </div>
          <div class="mb-2">
            <label class="form-label text-muted small">URL</label>
            <input 
              v-model="social.url"
              type="url" 
              class="form-control form-control-sm"
              placeholder="https://..."
            />
          </div>
          <div class="d-flex gap-2">
            <button 
              class="btn btn-outline-danger btn-sm"
              @click="removeSocialLink(index)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="isEditing" class="mt-3">
        <button 
          class="btn btn-outline-primary btn-sm"
          @click="addSocialLink"
        >
          <i class="bi bi-plus"></i> Add Social Link
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialLinks',
  props: {
    socialLinks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      localSocialLinks: []
    }
  },
  mounted() {
    // Create a deep copy of the prop to avoid mutating parent data
    this.localSocialLinks = this.socialLinks ? JSON.parse(JSON.stringify(this.socialLinks)) : [];
  },
  watch: {
    socialLinks: {
      handler(newVal) {
        if (!this.isEditing && newVal) {
          this.localSocialLinks = JSON.parse(JSON.stringify(newVal));
        }
      },
      deep: true
    }
  },
  methods: {
    toggleEditMode() {
      if (this.isEditing) {
        // Save changes
        this.$emit('update:socialLinks', this.localSocialLinks);
        this.$emit('save-social-links', this.localSocialLinks);
      }
      this.isEditing = !this.isEditing;
    },
    addSocialLink() {
      this.localSocialLinks.push({
        platform: '',
        url: ''
      });
    },
    removeSocialLink(index) {
      this.localSocialLinks.splice(index, 1);
    }
  }
}
</script>

<style scoped>
.edit-mode {
  border: 1px solid #e9ecef;
  border-radius: 0.375rem;
  padding: 1rem;
  background-color: #f8f9fa;
}

.social-item:last-child {
  margin-bottom: 0 !important;
}

.btn-link:hover {
  text-decoration: none;
}

.form-label {
  margin-bottom: 0.25rem;
}
</style>