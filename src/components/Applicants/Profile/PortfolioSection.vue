<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Portfolios</h5>
        <div>
          <button 
            class="btn btn-link text-primary p-0 me-2"
            @click="toggleAddMode"
            :title="showAddForm ? 'Cancel' : 'Add portfolio'"
          >
            <i :class="showAddForm ? 'bi bi-x' : 'bi bi-plus'"></i>
          </button>
        </div>
      </div>

      <!-- Add/Edit Portfolio Form -->
      <div v-if="showAddForm || editingIndex !== null" class="border rounded p-3 mb-4 bg-light">
        <h6 class="mb-3">{{ editingIndex !== null ? 'Edit Portfolio Item' : 'Add New Portfolio Item' }}</h6>
        <form @submit.prevent="savePortfolio">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Project Title *</label>
              <input 
                v-model="formData.title"
                type="text" 
                class="form-control"
                placeholder="e.g., E-commerce Website Redesign"
                required
              >
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Project URL</label>
              <input 
                v-model="formData.url"
                type="url" 
                class="form-control"
                placeholder="https://example.com"
              >
            </div>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea 
              v-model="formData.description"
              class="form-control"
              rows="3"
              placeholder="Brief description of the project, technologies used, your role, etc."
            ></textarea>
          </div>

          <!-- Image Upload Section -->
          <div class="mb-3">
            <label class="form-label">Portfolio Image *</label>
            <div class="image-upload-container">
              <!-- Image Preview -->
              <div v-if="imagePreview" class="image-preview mb-3">
                <img :src="imagePreview" alt="Preview" class="img-fluid rounded" style="max-height: 200px;">
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-danger mt-2"
                  @click="removeImage"
                >
                  <i class="bi bi-trash me-1"></i>Remove Image
                </button>
              </div>

              <!-- Upload Options -->
              <div v-else class="upload-options">
                <!-- File Upload -->
                <div class="upload-method mb-3">
                  <label class="form-label small text-muted">Upload from device:</label>
                  <input 
                    ref="fileInput"
                    type="file" 
                    class="form-control"
                    accept="image/*"
                    @change="handleFileUpload"
                  >
                </div>

                <!-- URL Input -->
                <div class="upload-method">
                  <label class="form-label small text-muted">Or enter image URL:</label>
                  <div class="input-group">
                    <input 
                      v-model="imageUrl"
                      type="url" 
                      class="form-control"
                      placeholder="https://example.com/image.jpg"
                    >
                    <button 
                      class="btn btn-outline-primary" 
                      type="button"
                      @click="loadImageFromUrl"
                      :disabled="!imageUrl.trim()"
                    >
                      Load
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tags/Categories -->
          <div class="mb-3">
            <label class="form-label">Tags (comma-separated)</label>
            <input 
              v-model="formData.tags"
              type="text" 
              class="form-control"
              placeholder="web design, ui/ux, react, responsive"
            >
            <small class="text-muted">Separate tags with commas</small>
          </div>

          <div class="d-flex gap-2">
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="!canSave"
            >
              <i :class="editingIndex !== null ? 'bi bi-check' : 'bi bi-plus'" class="me-1"></i>
              {{ editingIndex !== null ? 'Update Portfolio Item' : 'Add Portfolio Item' }}
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelForm">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Portfolio Grid -->
      <div class="row">
        <!-- Empty State -->
        <div v-if="portfolios.length === 0" class="col-12">
          <div class="text-center py-5 text-muted">
            <i class="bi bi-folder2-open display-4 mb-3"></i>
            <h6>No portfolio items yet</h6>
            <p>Showcase your best work by adding your first portfolio item.</p>
            <button class="btn btn-outline-primary" @click="toggleAddMode">
              <i class="bi bi-plus me-2"></i>Add Your First Project
            </button>
          </div>
        </div>

        <!-- Portfolio Items -->
        <div v-for="(portfolio, index) in portfolios" :key="portfolio.id || index" class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <portfolio-item 
            :portfolio="portfolio" 
            :index="index"
            :is-editing="editingIndex === index"
            @edit="editPortfolio"
            @delete="deletePortfolio"
          />
        </div>
      </div>

      <!-- Portfolio Count -->
      <div v-if="portfolios.length > 0" class="mt-3 pt-3 border-top">
        <small class="text-muted">
          <i class="bi bi-collection me-1"></i>
          {{ portfolios.length }} portfolio item{{ portfolios.length !== 1 ? 's' : '' }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioItem from './PortfolioItem.vue'

export default {
  name: 'PortfolioSection',
  components: {
    PortfolioItem
  },
  props: {
    portfolios: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showAddForm: false,
      editingIndex: null,
      imagePreview: null,
      imageUrl: '',
      formData: {
        title: '',
        description: '',
        url: '',
        tags: '',
        image: ''
      }
    }
  },
  computed: {
    canSave() {
      return this.formData.title.trim() && this.imagePreview
    }
  },
  methods: {
    toggleAddMode() {
      this.showAddForm = !this.showAddForm
      if (!this.showAddForm) {
        this.resetForm()
      }
    },
    editPortfolio(index) {
      const portfolio = this.portfolios[index]
      
      // Close add form if open
      this.showAddForm = false
      
      // Set editing state
      this.editingIndex = index
      
      // Populate form with existing data
      this.formData = {
        title: portfolio.title || '',
        description: portfolio.description || '',
        url: portfolio.url || '',
        tags: portfolio.tags ? portfolio.tags.join(', ') : '',
        image: portfolio.image || ''
      }
      
      // Set image preview
      this.imagePreview = portfolio.image || null
      
      // Scroll to form
      this.$nextTick(() => {
        const form = this.$el.querySelector('.border.rounded')
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert('File size must be less than 5MB')
          return
        }
        
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = e.target.result
          this.formData.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    loadImageFromUrl() {
      if (this.imageUrl.trim()) {
        // Test if the URL is valid by trying to load it
        const img = new Image()
        img.onload = () => {
          this.imagePreview = this.imageUrl
          this.formData.image = this.imageUrl
          this.imageUrl = ''
        }
        img.onerror = () => {
          alert('Failed to load image from URL. Please check the URL and try again.')
        }
        img.src = this.imageUrl
      }
    },
    removeImage() {
      this.imagePreview = null
      this.formData.image = ''
      this.imageUrl = ''
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    savePortfolio() {
      const portfolioData = {
        title: this.formData.title.trim(),
        description: this.formData.description.trim(),
        url: this.formData.url.trim(),
        image: this.formData.image,
        tags: this.formData.tags ? this.formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []
      }

      if (this.editingIndex !== null) {
        // Editing existing portfolio
        portfolioData.id = this.portfolios[this.editingIndex].id || Date.now()
        this.$emit('update-portfolio', this.editingIndex, portfolioData)
        this.editingIndex = null
      } else {
        // Adding new portfolio
        portfolioData.id = Date.now()
        this.$emit('add-portfolio', portfolioData)
        this.showAddForm = false
      }
      
      this.resetForm()
    },
    deletePortfolio(index) {
      if (confirm('Are you sure you want to delete this portfolio item?')) {
        // If we're currently editing this item, cancel the edit
        if (this.editingIndex === index) {
          this.editingIndex = null
          this.resetForm()
        }
        // If we're editing an item after this one, adjust the index
        else if (this.editingIndex !== null && this.editingIndex > index) {
          this.editingIndex--
        }
        
        this.$emit('delete-portfolio', index)
      }
    },
    cancelForm() {
      this.resetForm()
      this.showAddForm = false
      this.editingIndex = null
    },
    resetForm() {
      this.formData = {
        title: '',
        description: '',
        url: '',
        tags: '',
        image: ''
      }
      this.imagePreview = null
      this.imageUrl = ''
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    }
  },
  emits: ['add-portfolio', 'update-portfolio', 'delete-portfolio']
}
</script>

<style scoped>
.image-upload-container {
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fafafa;
}

.image-preview img {
  max-width: 100%;
  border: 1px solid #e5e7eb;
}

.upload-options {
  text-align: center;
}

.upload-method {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Highlight the item being edited */
.portfolio-item.editing {
  box-shadow: 0 0 0 2px #007bff;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .col-lg-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>