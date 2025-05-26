<template>
  <div
    class="min-vh-100 d-flex align-items-center justify-content-center custom-bg"
  >
    <div class="card shadow" style="width: 100%; max-width: 400px">
      <!-- Card Header -->
      <div class="card-header text-center bg-white border-0 pt-4">
        <div class="d-flex justify-content-center mb-3">
          <div class="icon-container">
            <!-- <Shield class="icon-primary" :size="24" /> -->
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_559_28516)">
                <circle
                  cx="16.7529"
                  cy="16.7109"
                  r="16"
                  transform="rotate(-0.431599 16.7529 16.7109)"
                  fill="#4640DE"
                />
                <mask id="path-2-inside-1_559_28516" fill="white">
                  <path
                    d="M16.836 27.7106C19.5011 27.6905 22.1504 25.5658 23.8677 23.8365C24.2639 23.4376 23.7789 22.8703 23.2839 23.1368C21.4106 24.1451 18.8359 25.2955 16.8179 25.3107C14.7999 25.3259 12.2082 24.2144 10.3198 23.2344C9.82085 22.9755 9.34453 23.55 9.74664 23.9429C11.4898 25.6461 14.1708 27.7307 16.836 27.7106Z"
                  />
                </mask>
                <path
                  d="M23.8677 23.8365L25.9964 25.9505L25.9964 25.9505L23.8677 23.8365ZM9.74664 23.9429L7.65006 26.0887L7.65006 26.0887L9.74664 23.9429ZM10.3198 23.2344L11.7017 20.5716L11.7017 20.5716L10.3198 23.2344ZM23.2839 23.1368L21.8621 20.4951L21.8621 20.4951L23.2839 23.1368ZM21.739 21.7226C20.975 22.4919 20.0679 23.2815 19.1271 23.8644C18.1607 24.4632 17.3805 24.7064 16.8134 24.7107L16.8586 30.7105C18.9565 30.6947 20.8336 29.8655 22.2874 28.9646C23.7669 28.0479 25.0431 26.9104 25.9964 25.9505L21.739 21.7226ZM16.8134 24.7107C16.2462 24.715 15.4625 24.4836 14.4871 23.8993C13.5377 23.3306 12.6187 22.5549 11.8432 21.7971L7.65006 26.0887C8.61771 27.0341 9.91085 28.1522 11.404 29.0466C12.8712 29.9255 14.7606 30.7263 16.8586 30.7105L16.8134 24.7107ZM8.938 25.8972C9.95749 26.4263 11.2133 27.0158 12.5274 27.4767C13.8044 27.9245 15.3326 28.3219 16.8405 28.3106L16.7953 22.3108C16.2852 22.3146 15.5085 22.1639 14.513 21.8148C13.5548 21.4787 12.5705 21.0225 11.7017 20.5716L8.938 25.8972ZM16.8405 28.3106C18.3484 28.2992 19.8704 27.8788 21.1405 27.4118C22.4475 26.9312 23.6943 26.3228 24.7057 25.7785L21.8621 20.4951C21.0002 20.959 20.0229 21.43 19.0698 21.7804C18.0797 22.1445 17.3054 22.3069 16.7953 22.3108L16.8405 28.3106ZM25.9964 25.9505C26.5859 25.3568 26.9899 24.5335 27.0124 23.5931C27.034 22.6887 26.6973 21.8887 26.2031 21.3028C25.1903 20.1021 23.4077 19.6632 21.8621 20.4951L24.7057 25.7785C23.6552 26.3439 22.3625 26.0554 21.6169 25.1715C21.2562 24.7439 20.9975 24.1439 21.0141 23.4498C21.0315 22.7196 21.3476 22.1168 21.739 21.7226L25.9964 25.9505ZM11.8432 21.7971C12.2406 22.1854 12.5657 22.7833 12.5941 23.5132C12.6212 24.207 12.3715 24.8109 12.0173 25.2438C11.2851 26.1389 9.99692 26.4468 8.938 25.8972L11.7017 20.5716C10.1438 19.7632 8.36796 20.2288 7.37332 21.4447C6.88798 22.0379 6.56343 22.8429 6.59867 23.7469C6.6353 24.6869 7.05164 25.504 7.65006 26.0887L11.8432 21.7971Z"
                  fill="white"
                  mask="url(#path-2-inside-1_559_28516)"
                />
                <path
                  d="M22.4136 9.98406C22.0913 9.66437 22.0874 9.14806 22.4049 8.82355L24.1072 6.68178L24.1069 6.64482C24.539 6.21085 25.2448 6.20554 25.6834 6.63295C26.122 7.06036 26.1272 7.75864 25.6951 8.19261L23.6837 9.97449L23.6086 10.0421C23.4515 10.1682 23.2549 10.2386 23.0506 10.2402C22.8123 10.242 22.5831 10.1498 22.4136 9.98406ZM9.41295 15.9514C9.39867 14.0557 10.1462 12.2318 11.491 10.8812C12.8358 9.53048 14.6677 8.76356 16.5838 8.74913C20.574 8.71907 23.8327 11.8949 23.8624 15.8425C23.8922 19.7902 20.6816 23.0147 16.6915 23.0448C12.7014 23.0748 9.44269 19.899 9.41295 15.9514Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_559_28516">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(0.632812 0.831879) rotate(-0.431599)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <h3 class="card-title h4 fw-bold mb-2 text-neutral">Admin Login</h3>
        <p class="text-muted small">
          Enter your credentials to access the admin panel
        </p>
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <!-- Email field -->
          <div class="mb-3">
            <label for="email" class="form-label text-neutral">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control custom-input"
              placeholder="admin@example.com"
              required
            />
          </div>

          <!-- Password field -->
          <div class="mb-3">
            <label for="password" class="form-label text-neutral"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control custom-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Submit Button -->
          <div class="d-grid">
            <button
              type="submit"
              :disabled="loading"
              class="btn btn-custom-primary"
            >
              <span v-if="loading">
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Signing in...
              </span>
              <span v-else>Sign In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Shield } from "lucide-vue-next";
import { useRouter } from "vue-router"; // Import Vue Router

const email = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter(); // Initialize router

const handleLogin = async () => {
  loading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Login attempt:", {
      email: email.value,
      password: password.value,
    });

    // Here you would typically make an API call to authenticate
    // Example: await authService.login(email.value, password.value)

    alert("Login successful!");

    // Redirect to /admin after successful login
    router.push("/admin/admindashboard");

    // Clear form after successful login
    email.value = "";
    password.value = "";
  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>

<style>
/* Import Bootstrap CSS */
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";

/* Custom CSS Variables */
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

/* Background */
.custom-bg {
  background: linear-gradient(
    135deg,
    var(--tertiary-color) 0%,
    var(--secondary-color) 100%
  );
}

/* Card Styling */
.card {
  border: none;
  border-radius: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.card-header {
  border-radius: 16px 16px 0 0 !important;
  background: rgba(255, 255, 255, 0.98) !important;
}

/* Icon Container */
.icon-container {
  background: var(--secondary-color);
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-primary {
  color: var(--primary-color);
}

/* Text Colors */
.text-neutral {
  color: var(--neutral-color) !important;
}

.text-muted {
  color: #6c757d !important;
}

/* Form Controls */
.custom-input {
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
}

.custom-input:focus {
  border-color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(70, 64, 222, 0.15);
  transform: translateY(-1px);
  outline: none;
}

.custom-input::placeholder {
  color: #adb5bd;
}

/* Form Labels */
.form-label {
  font-weight: 600;
  color: var(--neutral-color);
  margin-bottom: 8px;
}

/* Custom Primary Button */
.btn-custom-primary {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--purple-accent-color) 100%
  );
  border: none;
  color: white;
  padding: 14px 24px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 16px;
}

.btn-custom-primary:hover {
  background: linear-gradient(
    135deg,
    var(--purple-accent-color) 0%,
    var(--primary-color) 100%
  );
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(70, 64, 222, 0.3);
  color: white;
}

.btn-custom-primary:active {
  transform: translateY(0);
}

.btn-custom-primary:disabled {
  background: var(--secondary-color);
  color: var(--neutral-color);
  opacity: 0.7;
  transform: none;
  box-shadow: none;
}

/* Card Shadow Enhancement */
.card.shadow {
  box-shadow: 0 20px 40px rgba(70, 64, 222, 0.1) !important;
}

/* Loading Spinner */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-color: currentColor;
  border-right-color: transparent;
}

/* Responsive Design */
@media (max-width: 576px) {
  .card {
    margin: 1rem;
    max-width: calc(100% - 2rem) !important;
  }

  .card-header {
    padding: 1.5rem 1rem;
  }

  .card-body {
    padding: 1.5rem 1rem;
  }

  .custom-bg {
    background: var(--tertiary-color);
  }
}

/* Focus States for Accessibility */
.btn-custom-primary:focus-visible {
  box-shadow: 0 0 0 0.2rem rgba(70, 64, 222, 0.5);
  outline: none;
}

.custom-input:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Additional Enhancements */
.card-title {
  letter-spacing: -0.5px;
}
</style>
