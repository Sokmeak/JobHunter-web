<template>
  <div>
    <!-- Simple Application Status Modal -->
    <div v-if="isVisible" class="modal-backdrop" @click="closeModal"></div>
    <div v-if="isVisible" class="status-modal">
      <div class="status-modal-content">
        <div class="status-modal-body text-center p-4">
          <!-- Loading State -->
          <div v-if="isLoading" class="py-4">
            <div class="spinner-border text-primary mb-3" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mb-0">Processing your application...</p>
          </div>

          <!-- Success State -->
          <div v-else-if="status === 'success'" class="py-4">
            <div class="status-icon success-icon mb-3">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <h4 class="mb-2">Application Submitted!</h4>
            <p class="text-muted mb-3">
              Your application has been successfully submitted.
            </p>
            <p class="small mb-0">
              Reference ID: <span class="fw-medium">{{ applicationId }}</span>
            </p>
          </div>

          <!-- Error State -->
          <div v-else-if="status === 'error'" class="py-4">
            <div class="status-icon error-icon mb-3">
              <i class="bi bi-x-circle-fill"></i>
            </div>
            <h4 class="mb-2">Submission Failed</h4>
            <p class="text-muted mb-3">
              {{
                errorMessage ||
                "There was an error submitting your application. Please try again."
              }}
            </p>
          </div>
        </div>

        <div class="status-modal-footer">
          <button class="btn btn-secondary me-2" @click="closeModal">
            Close
          </button>
          <button
            v-if="status === 'error'"
            class="btn btn-primary"
            @click="retrySubmission"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "loading", // 'loading', 'success', 'error'
    validator: (value) => ["loading", "success", "error"].includes(value),
  },
  applicationId: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "retry"]);

const closeModal = () => {
  emit("close");
};

const retrySubmission = () => {
  emit("retry");
};
</script>

<style scoped>
/* Modal backdrop */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

/* Status Modal Styles */
.status-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.status-modal-content {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: modal-in 0.3s ease-out forwards;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-modal-body {
  padding: 2rem 1.5rem;
}

.status-modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

/* Status Icons */
.status-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 2rem;
}

.success-icon {
  background-color: rgba(86, 205, 173, 0.1);
  color: #56cdad;
}

.error-icon {
  background-color: rgba(255, 101, 80, 0.1);
  color: #ff6550;
}

/* Bootstrap overrides */
.btn-primary {
  background-color: #4640de;
  border-color: #4640de;
}

.btn-primary:hover {
  background-color: #3935b8;
  border-color: #3935b8;
}

.text-primary {
  color: #4640de !important;
}

.spinner-border.text-primary {
  color: #4640de !important;
}
</style>
