<template>
  <div class="portfolio-item card h-100" :class="{ 'editing': isEditing }">
    <div class="position-relative">
      <img 
        :src="portfolio.image" 
        :alt="portfolio.title" 
        class="card-img-top portfolio-image"
        @error="handleImageError"
      >
      
      <!-- Editing indicator -->
      <div v-if="isEditing" class="editing-badge">
        <span class="badge bg-primary">
          <i class="bi bi-pencil me-1"></i>Editing
        </span>
      </div>
      
      <!-- Overlay with actions -->
      <div class="portfolio-overlay">
        <div class="portfolio-actions">
          <button 
            v-if="portfolio.url"
            class="btn btn-light btn-sm me-2"
            @click="openProject"
            title="View Project"
          >
            <i class="bi bi-eye"></i>
          </button>
          <div class="dropdown">
            <button 
              class="btn btn-light btn-sm"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              title="More options"
            >
              <i class="bi bi-three-dots"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button 
                  class="dropdown-item"
                  @click="$emit('edit', index)"
                  :disabled="isEditing"
                >
                  <i class="bi bi-pencil me-2"></i>
                  {{ isEditing ? 'Currently Editing' : 'Edit' }}
                </button>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button 
                  class="dropdown-item text-danger"
                  @click="$emit('delete', index)"
                >
                  <i class="bi bi-trash me-2"></i>Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="card-body p-3">
      <h6 class="card-title mb-2">{{ portfolio.title }}</h6>
      
      <p v-if="portfolio.description" class="card-text text-muted small mb-2">
        {{ truncatedDescription }}
      </p>

      <!-- Tags -->
      <div v-if="portfolio.tags && portfolio.tags.length" class="mb-2">
        <span 
          v-for="tag in portfolio.tags.slice(0, 3)" 
          :key="tag"
          class="badge bg-light text-dark me-1"
          style="font-size: 0.7rem;"
        >
          {{ tag }}
        </span>
        <span v-if="portfolio.tags.length > 3" class="text-muted small">
          +{{ portfolio.tags.length - 3 }} more
        </span>
      </div>

      <!-- Project Link -->
      <div v-if="portfolio.url" class="mt-auto">
        <a 
          :href="portfolio.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn btn-outline-primary btn-sm w-100"
        >
          <i class="bi bi-box-arrow-up-right me-1"></i>
          View Project
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioItem',
  props: {
    portfolio: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    truncatedDescription() {
      if (!this.portfolio.description) return ''
      return this.portfolio.description.length > 100 
        ? this.portfolio.description.substring(0, 100) + '...'
        : this.portfolio.description
    }
  },
  methods: {
    handleImageError(event) {
      // Fallback placeholder image
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xNTAgNzVMMTYwIDk1SDE4MEwxNjUgMTA1TDE3MCAxtTVMMTUwIDExNUwxMzAgMTI1TDEzNSAxMDVMMTIwIDk1SDE0MEwxNTAgNzVaIiBmaWxsPSIjOTk5OTk5Ii8+CjwvcGFnZT4='
    },
    openProject() {
      if (this.portfolio.url) {
        window.open(this.portfolio.url, '_blank', 'noopener,noreferrer')
      }
    }
  },
  emits: ['edit', 'delete']
}
</script>

<style scoped>
.portfolio-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.portfolio-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Editing state styles */
.portfolio-item.editing {
  border: 2px solid #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  transform: translateY(-2px);
}

.portfolio-item.editing:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25), 0 6px 16px rgba(0, 0, 0, 0.15);
}

.editing-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 10;
}

.portfolio-image {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-actions {
  display: flex;
  gap: 0.5rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.badge.bg-light {
  background-color: #f8f9fa !important;
  color: #6c757d !important;
}

.btn-outline-primary.btn-sm {
  font-size: 0.8rem;
  padding: 0.375rem 0.75rem;
}

.card-title {
  line-height: 1.3;
  font-weight: 600;
}

.card-text {
  line-height: 1.4;
  flex-grow: 1;
}

.dropdown-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 576px) {
  .portfolio-image {
    height: 150px;
  }
}
</style>