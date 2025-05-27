<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Additional Details</h5>
        <button
          class="btn btn-link text-primary p-0"
          @click="toggleEditMode"
          :title="isEditing ? 'Cancel editing' : 'Edit details'"
        >
          <i :class="isEditing ? 'bi bi-x' : 'bi bi-pencil'"></i>
        </button>
      </div>

      <!-- View Mode -->
      <div v-if="!isEditing">
        <div class="detail-item mb-3">
          <p class="text-muted mb-1">Email</p>
          <p class="mb-0">{{ currentData.email || "Not specified" }}</p>
        </div>
        <div class="detail-item mb-3">
          <p class="text-muted mb-1">Phone</p>
          <p class="mb-0">{{ currentData.phone || "Not specified" }}</p>
        </div>
        <div class="detail-item">
          <p class="text-muted mb-1">Languages</p>
          <p class="mb-0">{{ displayLanguages }}</p>
        </div>
      </div>

      <!-- Edit Mode -->
      <div v-else>
        <form @submit.prevent="saveChanges">
          <div class="mb-3">
            <label class="form-label">Email *</label>
            <input
              ref="emailInput"
              v-model="editData.email"
              type="email"
              class="form-control"
              placeholder="your.email@example.com"
              required
            />
            <div v-if="emailError" class="text-danger small mt-1">
              {{ emailError }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Phone</label>
            <input
              v-model="editData.phone"
              type="tel"
              class="form-control"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Languages</label>
            <div class="languages-input-container">
              <!-- Language tags -->
              <div
                v-if="editData.languages.length > 0"
                class="language-tags mb-2"
              >
                <span
                  v-for="(language, index) in editData.languages"
                  :key="index"
                  class="badge bg-light text-dark me-2 mb-1 language-tag"
                >
                  {{ language }}
                  <button
                    type="button"
                    class="btn-close btn-close-sm ms-1"
                    @click="removeLanguage(index)"
                    aria-label="Remove language"
                  ></button>
                </span>
              </div>

              <!-- Add language input -->
              <div class="input-group">
                <input
                  ref="languageInput"
                  v-model="newLanguage"
                  type="text"
                  class="form-control"
                  placeholder="Add a language (e.g., English, Spanish)"
                  @keyup.enter="addLanguage"
                  @input="clearLanguageError"
                />
                <button
                  class="btn btn-outline-primary"
                  type="button"
                  @click="addLanguage"
                  :disabled="!canAddLanguage"
                >
                  Add
                </button>
              </div>
              <div v-if="languageError" class="text-danger small mt-1">
                {{ languageError }}
              </div>
              <small v-else class="text-muted"
                >Press Enter or click Add to include a language</small
              >
            </div>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="!canSave">
              <i class="bi bi-check me-1"></i>Save Changes
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdditionalDetails",
  props: {
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    languages: {
      type: Array,
      default: () => [],
    },
    // Add a prop to control whether to use localStorage
    useLocalStorage: {
      type: Boolean,
      default: true,
    },
    // Add a storage key prop for flexibility
    storageKey: {
      type: String,
      default: "additional-details",
    },
  },
  data() {
    return {
      isEditing: false,
      newLanguage: "",
      emailError: "",
      languageError: "",
      editData: {
        email: "",
        phone: "",
        languages: [],
      },
      // Store current data locally in component
      currentData: {
        email: "",
        phone: "",
        languages: [],
      },
    };
  },
  computed: {
    displayLanguages() {
      return this.currentData.languages.length > 0
        ? this.currentData.languages.join(", ")
        : "Not specified";
    },
    canSave() {
      return (
        this.editData.email.trim() !== "" &&
        this.isValidEmail(this.editData.email.trim())
      );
    },
    canAddLanguage() {
      return this.newLanguage.trim() !== "";
    },
  },
  methods: {
    // Load data from localStorage
    loadFromStorage() {
      if (!this.useLocalStorage) return null;

      try {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.warn("Error loading from localStorage:", error);
        return null;
      }
    },

    // Save data to localStorage
    saveToStorage(data) {
      if (!this.useLocalStorage) return;

      try {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (error) {
        console.warn("Error saving to localStorage:", error);
      }
    },

    // Initialize current data
    initializeData() {
      // First try to load from localStorage
      const storedData = this.loadFromStorage();

      if (storedData) {
        // Use stored data if available
        this.currentData = {
          email: storedData.email || "",
          phone: storedData.phone || "",
          languages: storedData.languages || [],
        };
      } else {
        // Fall back to props
        this.currentData = {
          email: this.email || "",
          phone: this.phone || "",
          languages: [...(this.languages || [])],
        };
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    validateEmail() {
      const email = this.editData.email.trim();
      if (!email) {
        this.emailError = "Email is required";
        return false;
      }
      if (!this.isValidEmail(email)) {
        this.emailError = "Please enter a valid email address";
        return false;
      }
      this.emailError = "";
      return true;
    },

    toggleEditMode() {
      if (this.isEditing) {
        this.cancelEdit();
      } else {
        this.startEdit();
      }
    },

    startEdit() {
      this.isEditing = true;
      // Clone current data for editing
      this.editData = {
        email: this.currentData.email || "",
        phone: this.currentData.phone || "",
        languages: [...(this.currentData.languages || [])],
      };
      this.newLanguage = "";
      this.emailError = "";
      this.languageError = "";

      // Focus on email input after DOM update
      this.$nextTick(() => {
        if (this.$refs.emailInput) {
          this.$refs.emailInput.focus();
        }
      });
    },

    addLanguage() {
      const language = this.newLanguage.trim();

      if (!language) {
        this.languageError = "Please enter a language";
        return;
      }

      if (
        this.editData.languages.some(
          (lang) => lang.toLowerCase() === language.toLowerCase()
        )
      ) {
        this.languageError = "This language is already added";
        return;
      }

      this.editData.languages.push(language);
      this.newLanguage = "";
      this.languageError = "";

      // Focus back on language input
      this.$nextTick(() => {
        if (this.$refs.languageInput) {
          this.$refs.languageInput.focus();
        }
      });
    },

    removeLanguage(index) {
      this.editData.languages.splice(index, 1);
    },

    clearLanguageError() {
      this.languageError = "";
    },

    saveChanges() {
      if (!this.validateEmail()) {
        return;
      }

      if (!this.canSave) return;

      // Clean and validate data before saving
      const cleanedData = {
        email: this.editData.email.trim(),
        phone: this.editData.phone.trim(),
        languages: this.editData.languages
          .map((lang) => lang.trim())
          .filter((lang) => lang !== ""),
      };

      // Update current data
      this.currentData = { ...cleanedData };

      // Save to localStorage
      this.saveToStorage(cleanedData);

      // Emit update event for parent component
      this.$emit("update-details", cleanedData);

      this.isEditing = false;
      this.newLanguage = "";
      this.emailError = "";
      this.languageError = "";

      // Show success message (optional)
      this.$emit("data-saved", "Details saved successfully!");
    },

    cancelEdit() {
      this.isEditing = false;
      this.newLanguage = "";
      this.emailError = "";
      this.languageError = "";
      // Reset edit data
      this.editData = {
        email: "",
        phone: "",
        languages: [],
      };
    },

    // Method to clear all stored data
    clearStoredData() {
      if (this.useLocalStorage) {
        localStorage.removeItem(this.storageKey);
      }
      this.currentData = {
        email: "",
        phone: "",
        languages: [],
      };
    },
  },

  watch: {
    "editData.email"() {
      if (this.emailError) {
        this.validateEmail();
      }
    },

    // Watch for prop changes and update if no stored data
    email(newVal) {
      if (!this.loadFromStorage()) {
        this.currentData.email = newVal || "";
      }
    },

    phone(newVal) {
      if (!this.loadFromStorage()) {
        this.currentData.phone = newVal || "";
      }
    },

    languages(newVal) {
      if (!this.loadFromStorage()) {
        this.currentData.languages = [...(newVal || [])];
      }
    },
  },

  // Initialize data when component is created
  created() {
    this.initializeData();
  },

  emits: ["update-details", "data-saved"],
};
</script>

<style scoped>
.detail-item {
  transition: background-color 0.2s ease;
}

.detail-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding: 8px;
  margin: -8px;
}

.languages-input-container {
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 0.75rem;
  background-color: #f8f9fa;
}

.language-tags {
  min-height: 2rem;
}

.language-tag {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
  background-color: #e9ecef !important;
  color: #495057 !important;
  position: relative;
  border: 1px solid #ced4da;
}

.language-tag .btn-close {
  font-size: 0.6rem;
  width: 0.8rem;
  height: 0.8rem;
  background-size: 0.6rem;
  opacity: 0.7;
}

.language-tag .btn-close:hover {
  opacity: 1;
}

.btn-close-sm {
  --bs-btn-close-width: 0.8rem;
  --bs-btn-close-height: 0.8rem;
}

.form-control:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-control.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Smooth transitions */
.card-body > div {
  transition: all 0.3s ease;
}

.text-danger {
  color: #dc3545 !important;
}

@media (max-width: 576px) {
  .d-flex.gap-2 {
    flex-direction: column;
  }

  .d-flex.gap-2 .btn {
    width: 100%;
  }

  .language-tag {
    margin-bottom: 0.5rem;
  }
}
</style>
