<template>
  <div class="login-page">
    <!-- Header -->
    <header
      class="container py-3 d-flex justify-content-between align-items-center"
    >
      <!-- Logo -->
      <PrimaryLogo />

      <!-- Role Toggle -->
      <div class="d-flex align-items-center gap-2">
        <button
          class="btn role-toggle me-2 px-4 mt-2 mt-lg-0"
          :class="{
            'btn-primary': activeRole === 'job-seeker',
            'btn-outline-primary': activeRole !== 'job-seeker',
          }"
          @click="setActiveRole('job-seeker')"
        >
          Job Seeker
        </button>
        <button
          class="btn role-toggle me-2 px-4 mt-2 mt-lg-0"
          :class="{
            'btn-primary': activeRole === 'company',
            'btn-outline-primary': activeRole !== 'company',
          }"
          @click="setActiveRole('company')"
        >
          Company
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container my-4">
      <div class="row g-4 align-items-center">
        <!-- LEFT SECTION: Login Form -->
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="login-box slide-up">
            <h2 class="login-title">
              {{
                activeRole === "job-seeker"
                  ? "Find Your Next Career"
                  : "Access Your Hiring Dashboard"
              }}
            </h2>

            <p class="text-center text-muted mb-4">
              {{
                activeRole === "job-seeker"
                  ? "Sign in to access personalized job opportunities"
                  : "Manage your recruiting pipeline and find top talent"
              }}
            </p>

            <div class="social-login mb-4">
              <button
                class="btn btn-google w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
              >
                <i class="bi bi-google me-2"></i>
                <span>Continue with Google</span>
              </button>
              <button
                class="btn btn-linkedin w-100 d-flex align-items-center justify-content-center gap-2"
              >
                <i class="bi bi-linkedin"></i>
                <span>Continue with LinkedIn</span>
              </button>
            </div>

            <div class="divider my-4">
              <span>Or continue with email</span>
            </div>

            <form @submit.prevent="handleSubmit" class="login-form">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-envelope text-muted"></i>
                  </span>
                  <input
                    type="email"
                    class="form-control border-start-0"
                    id="email"
                    placeholder="name@example.com"
                    v-model="form.email"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <label for="password" class="form-label">Password</label>
                  <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control border-start-0 border-end-0"
                    id="password"
                    placeholder="Enter your password"
                    v-model="form.password"
                    required
                  />
                  <button
                    type="button"
                    class="input-group-text bg-light border-start-0"
                    @click="showPassword = !showPassword"
                  >
                    <i
                      class="bi"
                      :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
                    ></i>
                  </button>
                </div>
              </div>

              <div class="form-check mb-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  v-model="form.rememberMe"
                />
                <label class="form-check-label" for="rememberMe">
                  Remember me on this device
                </label>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center"
              >
                <span v-if="!isLoading">Sign In</span>
                <span v-else>Loading...</span>
                <i class="bi bi-box-arrow-in-right ms-2" v-if="!isLoading"></i>
              </button>
            </form>

            <p class="text-center mt-4 mb-0">
              Don't have an account?
              <RouterLink to="/signup" class="register-link"
                >Create Account</RouterLink
              >
            </p>
          </div>
        </div>

        <!-- RIGHT SECTION: Info Content -->
        <div class="col-lg-6 order-1 order-lg-2">
          <div class="info-content slide-in-right">
            <div class="welcome-message mb-4">
              <h2 class="fw-bold text-primary-dark">Welcome Back!</h2>
              <p class="text-secondary">
                Stay connected to opportunities that match your skills and
                career goals.
              </p>
            </div>

            <div class="info-card mb-4 fade-in" style="animation-delay: 200ms">
              <div class="info-icon">
                <i class="bi bi-graph-up-arrow"></i>
              </div>
              <div>
                <h3>Track Your Progress</h3>
                <p class="mb-0">
                  Monitor your application status and interview offers in
                  real-time.
                </p>
              </div>
            </div>

            <div class="info-card mb-4 fade-in" style="animation-delay: 400ms">
              <div class="info-icon">
                <i class="bi bi-bell"></i>
              </div>
              <div>
                <h3>Job Alerts</h3>
                <p class="mb-0">
                  Get notified instantly when new matching opportunities are
                  available.
                </p>
              </div>
            </div>

            <div class="info-card fade-in" style="animation-delay: 600ms">
              <div class="info-icon">
                <i class="bi bi-people"></i>
              </div>
              <div>
                <h3>Network Connections</h3>
                <p class="mb-0">
                  Connect directly with recruiters and hiring managers from top
                  companies.
                </p>
              </div>
            </div>

            <div
              class="companies-section mt-5 fade-in"
              style="animation-delay: 800ms"
            >
              <p class="text-muted mb-3 small text-uppercase">
                Trusted by leading companies
              </p>
              <div class="companies-row">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google"
                  class="company-logo"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft"
                  class="company-logo"
                />
                <img
                  src="https://logotyp.us/files/amazon.svg"
                  alt="Amazon"
                  class="company-logo"
                />
                <img
                  src="https://logo.clearbit.com/digitalocean.com"
                  alt="DigitalOcean"
                  class="company-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="container mt-5 py-4 border-top">
      <div class="row">
        <div class="col-md-6">
          <p class="mb-0 text-muted small">
            © 2025 JobHunter. All rights reserved.
          </p>
        </div>
        <div class="col-md-6">
          <div class="d-flex justify-content-md-end gap-3">
            <a href="#" class="text-muted small">Privacy</a>
            <a href="#" class="text-muted small">Terms</a>
            <a href="#" class="text-muted small">Support</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import PrimaryLogo from "@/components/sharecomponents/PrimaryLogo.vue";
import { useAuthLocalStore } from "@/stores/authLocalStore";

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// State
const form = ref({ email: "", password: "", rememberMe: false });
const activeRole = ref("job-seeker");
const showPassword = ref(false);
const isLoading = ref(false);

const router = useRouter();
const authStore = useAuthLocalStore();

// Role toggle with animation
function setActiveRole(role) {
  if (role === activeRole.value) return;

  const loginBox = document.querySelector(".login-box");
  const infoContent = document.querySelector(".info-content");

  loginBox?.classList.add("fade-transition");
  infoContent?.classList.add("fade-transition");

  setTimeout(() => {
    activeRole.value = role;
    setTimeout(() => {
      loginBox?.classList.remove("fade-transition");
      infoContent?.classList.remove("fade-transition");
    }, 50);
  }, 100);
}

// Handle login
async function handleSubmit() {
  isLoading.value = true;
  const loginButton = document.querySelector('button[type="submit"]');

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: form.value.email,
      password: form.value.password,
    });

    const decoded = jwtDecode(data.access_token);
    const { id, email, role } = decoded;

    let companyId = null;

    if (role.type === "EMPLOYER") {
      const { data: companyData } = await axios.get(
        `${API_BASE_URL}/companies/profile`,
        { headers: { Authorization: `Bearer ${data.access_token}` } }
      );
      companyId = companyData.id;
    }

    // Store login state
    authStore.setAuthData({
      accessToken: data.access_token,
      userId: id,
      role: role.type,
      email: form.value.rememberMe ? email : null,
      companyId,
    });

    // Redirect based on role and UI role selection
    const isMatchingRole =
      (role.type === "JOB SEEKER" && activeRole.value === "job-seeker") ||
      (role.type === "EMPLOYER" && activeRole.value === "company");

    if (isMatchingRole) {
      loginButton.innerHTML = '<i class="bi bi-check-circle"></i> Success!';
      loginButton.classList.add("btn-success");

      setTimeout(() => {
        window.location.href =
          role.type === "JOB SEEKER" ? "/applicant" : "/company/dashboard";
      }, 1000);
    } else {
      loginButton.innerHTML =
        '<i class="bi bi-exclamation-circle"></i> Error, Role mismatch!';
      loginButton.classList.add("btn-danger");

      setTimeout(() => {
        loginButton.innerHTML =
          '<span>Sign In</span><i class="bi bi-box-arrow-in-right ms-2"></i>';
        loginButton.classList.remove("btn-danger");
        isLoading.value = false;
      }, 3000);
    }
  } catch (err) {
    console.error("Login error:", err);
    let errorMessage = "Login failed. Please try again.";
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 401) errorMessage = "Invalid email or password.";
      else if (status === 404) errorMessage = "User not found.";
      else if (status === 500)
        errorMessage = "Server error. Please try again later.";
    }

    loginButton.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${errorMessage}`;
    loginButton.classList.add("btn-danger");

    setTimeout(() => {
      loginButton.innerHTML =
        '<span>Sign In</span><i class="bi bi-box-arrow-in-right ms-2"></i>';
      loginButton.classList.remove("btn-danger");
      isLoading.value = false;
    }, 3000);
  }
}
</script>
<style scoped>
/* Import Bootstrap CSS and icons */
:root {
  --primary-color: #4640de;
  --primary-light: #6b67e8;
  --primary-dark: #3b36b8;
  --primary-subtle: rgba(70, 64, 222, 0.1);
  --bs-primary: #4640de;
  --bs-primary-rgb: 70, 64, 222;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #fff;
  color: #333;
}

.login-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.company-logo {
  width: 90px;
  height: 30px;
  object-fit: contain;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, 15px) rotate(5deg);
  }
  50% {
    transform: translate(5px, -10px) rotate(-5deg);
  }
  75% {
    transform: translate(-10px, 5px) rotate(3deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

header {
  border-bottom: 1px solid rgba(233, 236, 239, 0.5);
  position: relative;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(70, 64, 222, 0.2);
}

.btn-primary:hover,
.btn-primary:focus {
  border-color: var(--primary-dark);
  box-shadow: 0 4px 8px rgba(70, 64, 222, 0.3);
  transform: translateY(-1px);
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 4px rgba(70, 64, 222, 0.2);
}

.login-box,
.info-content {
  position: relative;
  z-index: 1;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.login-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 10px;
  text-align: center;
}

.social-login .btn {
  padding: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-google {
  background-color: white;
  color: #333;
  border: 1px solid #e0e0e0;
}

.btn-google:hover {
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.btn-linkedin {
  background-color: white;
  color: #0077b5;
  border: 1px solid #e0e0e0;
}

.btn-linkedin:hover {
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e5e7eb;
}

.divider span {
  padding: 0 15px;
}

.form-label {
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 6px;
  font-size: 0.95rem;
}

.form-control,
.form-select,
.input-group-text {
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.input-group .form-control {
  padding-left: 10px;
}

.input-group-text {
  color: #6b7280;
}

.form-control:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(70, 64, 222, 0.15);
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.forgot-password {
  color: var(--primary-color);
  font-size: 0.85rem;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.register-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.register-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.info-content {
  padding: 20px;
}

.welcome-message h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(
    45deg,
    var(--primary-color),
    var(--primary-light)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid rgba(233, 236, 239, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(70, 64, 222, 0.1);
  border-color: rgba(70, 64, 222, 0.2);
}

.info-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: var(--primary-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.info-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.info-card p {
  color: #6b7280;
  font-size: 0.95rem;
}

.companies-section {
  text-align: center;
}

.companies-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.company-logo {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.company-logo:hover {
  opacity: 1;
}

.logo-animate {
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

.slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-transition {
  animation: fadeOut 0.3s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
}

.btn-success {
  background-color: #22c55e;
  border-color: #22c55e;
  animation: successPulse 0.5s;
}

.btn-danger {
  background-color: #ef4444;
  border-color: #ef4444;
}

@keyframes successPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 992px) {
  .login-box {
    padding: 30px;
  }

  .info-card {
    padding: 20px;
  }

  .welcome-message h2 {
    font-size: 1.8rem;
  }

  .info-content {
    margin-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .login-box {
    padding: 25px;
  }

  .info-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .info-card h3 {
    font-size: 1.1rem;
  }
}
</style>
