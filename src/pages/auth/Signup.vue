<template>
  <div class="landing-page">
    <!-- Background shapes for visual interest -->
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>

    <!-- Header -->
    <header
      class="container py-3 d-flex justify-content-between align-items-center"
    >
      <!-- logo -->

      <PrimaryLogo />
      <div class="d-flex align-items-center g-4 w-full">
        <div class="nav-toggle d-flex w-200 gap-3">
          <button
            class="btn role-toggle"
            :class="{
              'btn-primary': activeRole === 'job-seeker',
              'btn-outline-primary': activeRole !== 'job-seeker',
            }"
            @click="activeRole = 'job-seeker'"
          >
            Job Seeker
          </button>

          <button
            class="btn role-toggle"
            :class="{
              'btn-primary': activeRole === 'company',
              'btn-outline-primary': activeRole !== 'company',
            }"
            @click="activeRole = 'company'"
          >
            Company
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container my-5">
      <div class="row align-items-start g-4">
        <!-- Left Section (Testimonial) -->
        <div class="col-lg-6 mb-5 mb-lg-0">
          <div class="welcome-message mb-4">
            <h2 class="fw-bold text-primary-dark">Welcome to JobHunter</h2>
            <!-- <p class="text-secondary fs-5">
              Join thousands of professionals finding their dream opportunities
              every day.
            </p> -->
          </div>

          <div class="stats-box mb-4">
            <div class="stats-icon">
              <i class="bi bi-people-fill"></i>
            </div>
            <div>
              <p class="stats-number">100,000+</p>
              <p class="stats-label">Successful career matches</p>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-quote-icon">
              <i class="bi bi-quote"></i>
            </div>
            <p class="testimonial-quote">
              "JobHunter helped me find my dream job at a tech company that
              perfectly matches my values and career goals. The process was
              seamless!"
            </p>
            <div class="testimonial-footer">
              <div>
                <p class="testimonial-author mb-0">Sarah Johnson</p>
                <p class="testimonial-role mb-0">
                  Senior Product Designer at Figma
                </p>
                <div class="rating">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="trusted-by mt-4">
            <p class="text-muted mb-2 small">TRUSTED BY LEADING COMPANIES</p>
            <div
              class="d-flex flex-wrap gap-4 align-items-center justify-center"
            >
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
                alt="Amazon"
                class="company-logo"
              />
            </div>
          </div>
        </div>

        <!-- Right Section (Signup Form) -->
        <div class="col-lg-6">
          <div class="signup-box">
            <h2 class="signup-title">
              {{
                activeRole === "job-seeker"
                  ? "Find Your Dream Job"
                  : "Hire Top Talent"
              }}
            </h2>
            <!-- <p class="text-center text-muted mb-4">
              {{
                activeRole === "job-seeker"
                  ? "Create your profile and get matched with top companies"
                  : "Create your company profile and find the perfect candidates"
              }}
            </p> -->

            <div class="social-signup mb-4">
              <button class="btn btn-google w-100 mb-2">
                <i class="bi bi-google me-2"></i> Continue with Google
                <!-- <img
                  class="logo-gogole"
                  src="/src/assets/images/gg.png"
                  alt="google logo"
                />Continue with Google -->
              </button>
              <button class="btn btn-linkedin w-100">
                <i class="bi bi-linkedin me-2"></i> Continue with LinkedIn
              </button>
            </div>

            <div class="divider my-4">
              <span>Or continue with email</span>
            </div>

            <form @submit.prevent="handleSubmit" class="signup-form">
              <!-- Common Fields -->
              <div class="mb-3">
                <label for="fullName" class="form-label">Full Name</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-person text-muted"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control border-start-0"
                    id="fullName"
                    placeholder="Enter your full name"
                    v-model="form.fullName"
                    required
                  />
                </div>
              </div>

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
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-lock text-muted"></i>
                  </span>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control border-start-0 border-end-0"
                    id="password"
                    placeholder="Create a secure password"
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
                <div class="password-strength mt-1" v-if="form.password">
                  <div class="progress" style="height: 5px">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style="width: 75%"
                    ></div>
                  </div>
                  <small class="text-muted">Strong password</small>
                </div>
              </div>

              <!-- Company-Specific Fields -->
              <transition name="fade">
                <div v-if="activeRole === 'company'">
                  <div class="mb-3">
                    <label for="companyName" class="form-label"
                      >Company Name</label
                    >
                    <div class="input-group">
                      <span class="input-group-text bg-light border-end-0">
                        <i class="bi bi-building text-muted"></i>
                      </span>
                      <input
                        type="text"
                        class="form-control border-start-0"
                        id="companyName"
                        placeholder="Enter your company name"
                        v-model="form.companyName"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="companySize" class="form-label"
                      >Company Size</label
                    >
                    <select
                      class="form-select"
                      id="companySize"
                      v-model="form.companySize"
                      required
                    >
                      <option value="" disabled selected>
                        Select company size
                      </option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="websiteUrl" class="form-label"
                      >Company Website
                      <span class="text-muted">(optional)</span></label
                    >
                    <div class="input-group">
                      <span class="input-group-text bg-light border-end-0">
                        <i class="bi bi-globe text-muted"></i>
                      </span>
                      <input
                        type="url"
                        class="form-control border-start-0"
                        id="websiteUrl"
                        placeholder="https://yourcompany.com"
                        v-model="form.websiteUrl"
                      />
                    </div>
                  </div>
                </div>
              </transition>

              <div class="form-check mb-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="agreeTerms"
                  required
                />
                <label class="form-check-label small" for="agreeTerms">
                  I agree to the
                  <a href="#" class="text-primary">Terms of Service</a> and
                  <a href="#" class="text-primary">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center"
              >
                <span>Create Account</span>
                <i class="bi bi-arrow-right-circle ms-2"></i>
              </button>
            </form>

            <p class="text-center mt-4 mb-0">
              Already have an account?
              <RouterLink to="/signin" class="login-link">Sign in</RouterLink>
            </p>
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
import { ref, watch } from "vue";
import PrimaryLogo from "@/components/sharecomponents/PrimaryLogo.vue";

// Form data
const form = ref({
  fullName: "",
  email: "",
  password: "",
  companyName: "",
  companySize: "",
  websiteUrl: "",
});

// Role toggle state
const activeRole = ref("company");

// Password visibility toggle
const showPassword = ref(false);

// Reset company-specific fields when switching to job-seeker
watch(activeRole, (newRole) => {
  if (newRole === "job-seeker") {
    form.value.companyName = "";
    form.value.companySize = "";
    form.value.websiteUrl = "";
  }
});

// Handle form submission
function handleSubmit() {
  if (activeRole.value === "job-seeker") {
    console.log("Job Seeker signup:", {
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
    });
  } else {
    console.log("Company signup:", {
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      companyName: form.value.companyName,
      companySize: form.value.companySize,
      websiteUrl: form.value.websiteUrl,
    });
  }
  // Add logic for signup (e.g., API call) here
}
</script>

<style scoped>
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
  background-color: #f8f9fa;
  color: #333;
}
.logo-gogole {
  width: 30px;
  height: 30px;
}

.landing-page {
  background: #ffffff;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.company-logo {
  width: 90px;
  height: 30px;
  object-fit: contain; /* Ensures logos scale without distortion */
}

/* Decorative background shapes */
.shape {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(
    45deg,
    var(--primary-subtle),
    rgba(107, 103, 232, 0.1)
  );
  top: -100px;
  right: -100px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(
    45deg,
    rgba(107, 103, 232, 0.1),
    var(--primary-subtle)
  );
  bottom: 20%;
  left: -100px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: linear-gradient(
    45deg,
    rgba(107, 103, 232, 0.05),
    var(--primary-subtle)
  );
  bottom: 10%;
  right: 10%;
}

header {
  border-bottom: 1px solid rgba(233, 236, 239, 0.5);
  position: relative;
  z-index: 1;
}

.role-toggle {
  padding: 10px 20px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(70, 64, 222, 0.2);
}

.btn-primary:hover,
.btn-primary:focus {
  /* background-color: var(--primary-dark); */
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

.welcome-message h2 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.stats-box {
  display: flex;
  align-items: center;
  background: linear-gradient(45deg, #f0f4ff, #e6eaff);
  padding: 24px;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid rgba(70, 64, 222, 0.1);
}

.stats-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(70, 64, 222, 0.1);
}

.stats-icon {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.stats-icon i {
  font-size: 1.8rem;
  color: var(--primary-color);
}

.stats-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 0;
  line-height: 1.2;
}

.stats-label {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
}

.testimonial-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
  margin-top: 40px;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
}

.testimonial-quote-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2.5rem;
  color: var(--primary-light);
  opacity: 0.2;
}

.testimonial-quote {
  font-style: italic;
  color: #4b5563;
  margin-bottom: 20px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.testimonial-footer {
  display: flex;
  align-items: center;
}

.testimonial-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
  border: 3px solid white;
  box-shadow: 0 0 0 2px var(--primary-light);
  object-fit: cover;
}

.testimonial-author {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 1.1rem;
}

.testimonial-role {
  color: #6b7280;
  font-size: 0.9rem;
}

.rating {
  color: #ffc107;
  font-size: 0.8rem;
  margin-top: 3px;
}

.company-logo {
  filter: grayscale(70%);
  transition: all 0.3s ease;
  opacity: 0.7;
}

.company-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.05);
}

.signup-box {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  border: 1px solid #f0f0f0;
}

.signup-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 10px;
  text-align: center;
}

.social-signup .btn {
  padding: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
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

.login-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.login-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 992px) {
  .signup-box {
    padding: 30px;
  }

  .testimonial-card {
    padding: 25px;
  }

  .welcome-message h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .signup-box {
    padding: 25px;
  }

  .stats-box {
    padding: 20px;
  }

  .stats-icon {
    width: 50px;
    height: 50px;
  }

  .stats-number {
    font-size: 1.5rem;
  }
}
</style>
