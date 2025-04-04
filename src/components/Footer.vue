<template>
  <footer class="footer py-5">
    <div class="container">
      <div class="row gy-4">
        <!-- Brand and Description -->
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="d-flex align-items-center mb-4">
            <PrimaryLogo brandColor='white' />
          </div>
          <p class="brand-description mb-4">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
          <div class="social-links d-flex gap-3 mb-4">
            <a href="#" class="social-link" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="social-link" aria-label="Dribbble">
              <i class="bi bi-dribbble"></i>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>

        <!-- About Links -->
        <div class="col-6 col-md-4 col-lg-2">
          <h5 class="footer-heading mb-4">About</h5>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Companies</a></li>
            <li><a href="#" class="footer-link">Pricing</a></li>
            <li><a href="#" class="footer-link">Terms</a></li>
            <li><a href="#" class="footer-link">Advice</a></li>
            <li><a href="#" class="footer-link">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Resources Links -->
        <div class="col-6 col-md-4 col-lg-2">
          <h5 class="footer-heading mb-4">Resources</h5>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">Help Docs</a></li>
            <li><a href="#" class="footer-link">Guide</a></li>
            <li><a href="#" class="footer-link">Updates</a></li>
            <li><a href="#" class="footer-link">Contact Us</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-md-4 col-lg-4">
          <h5 class="footer-heading mb-4">Get job notifications</h5>
          <p class="newsletter-text mb-3">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div class="newsletter-form">
            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="Email Address"
                aria-label="Email Address"
              />
              <button class="btn subscribe-btn" type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <hr class="footer-divider my-4" />

      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-center"
      >
        <p class="copyright mb-3 mb-md-0">
          © {{ new Date().getFullYear() }} JobHunter. All rights reserved.
        </p>

        <!-- use the social instead -->
        <div class="d-flex gap-3 align-items-center">
          <a href="#" class="text-decoration-none footer-bottom-link">Terms</a>
          <span class="separator">•</span>
          <a href="#" class="text-decoration-none footer-bottom-link"
            >Privacy</a
          >
          <span class="separator">•</span>
          <a href="#" class="text-decoration-none footer-bottom-link"
            >Cookies</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import PrimaryLogo from "./PrimaryLogo.vue";
export default {
  name: "Footer",
  components: {
    PrimaryLogo,
  },
};
</script>

<style scoped>
.footer {
  background-color: #1e2235;
  color: #ffffff;
  position: relative;
}

.logo-circle {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4640de 0%, #5c59df 100%);
  color: white;
}

.brand-name {
  color: white;
  letter-spacing: -0.5px;
}

.brand-description {
  color: #a0a3bd;
  max-width: 360px;
  line-height: 1.6;
}

.footer-heading {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-link {
  color: #a0a3bd;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
}

.footer-link:hover {
  color: white;
  transform: translateX(5px);
}

.newsletter-text {
  color: #a0a3bd;
  line-height: 1.6;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 12px 16px;
  height: auto;
}

.form-control::placeholder {
  color: #a0a3bd;
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: none;
  border-color: #4640de;
}

.subscribe-btn {
  background-color: #4640de;
  color: white;
  border: none;
  padding: 0 24px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.subscribe-btn:hover {
  background-color: #3530c0;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: #4640de;
  transform: translateY(-3px);
}

.footer-divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

.copyright {
  color: #a0a3bd;
  font-size: 0.9rem;
}

.footer-bottom-link {
  color: #a0a3bd;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-bottom-link:hover {
  color: white;
}

.separator {
  color: #a0a3bd;
  font-size: 0.9rem;
}

@media (max-width: 767.98px) {
  .social-links {
    justify-content: center;
  }

  .copyright {
    text-align: center;
  }
}
</style>
