<template>
  <div class="hero-wrapper position-relative overflow-hidden">
    <!-- Diagonal background -->
    <div class="diagonal-background"></div>

    <!-- Hero background image -->
    <div class="hero-background"></div>

    <!-- Content -->
    <div class="container py-5">
      <!-- Hero Content -->
      <div class="row align-items-center">
        <div class="col-lg-10 g-5">
          <span class="typed-text-container">
            <!-- <h1 aria-live="polite" ref="typedElement"></h1> -->
            <h1>
              Discover<br />
              <span
                style="
                  color: #26a4ff;
                  font-weight: 600;
                  font-family: 'ClashDisplay-Semibold', sans-serif;
                "
              >
                5000+ job opportunities
              </span>
            </h1>
          </span>

          <img
            src="../../assets/images/highlight.svg"
            width="300px"
            alt="highlight"
            class="highlight-img"
          />

          <p class="lead text-muted mb-4 fw-normal">
            Great platform for the job seeker that searching for new career<br />
            heights and passionate about startups.
          </p>

          <div class="d-flex flex-wrap gap-3">
            <RouterLink
              to="/jobs"
              class="btn button-primary-color btn-primary px-4 py-2"
            >
              Find Job
            </RouterLink>
            <RouterLink
              to="/signup"
              class="btn button-secodary-color px-4 py-2"
            >
              Post a Job
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// No additional script needed
import SearchJob from "../sharecomponents/SearchJob.vue";
import Typed from "typed.js";
import { ref, onMounted } from "vue";

export default {
  name: "HeroSection",
  components: {
    SearchJob,
  },

  setup() {
    const typedElement = ref(null);

    onMounted(() => {
      if (typedElement.value) {
        new Typed(typedElement.value, {
          strings: [
            "Discover<br/><h1 style='color: #26a4ff; font-weight: 600;'>5000+ job opportunities</h1>.",
            "Unlock<br/><h1 style='color: #26a4ff; font-weight: 600;'>your dream career</h1> today.",
            "Explore<br/><h1 style='color: #26a4ff; font-weight: 600;'>5000+ open positions</h1> now.",
            "Start<br/><h1 style='color: #26a4ff; font-weight: 600;'>your professional journey</h1> with us.",
            "Browse<br/><h1 style='color: #26a4ff; font-weight: 600;'>thousands of active listings</h1>.",
            "Apply<br/><h1 style='color: #26a4ff; font-weight: 600;'>anytime, anywhere</h1>.",
            "Connect<br/><h1 style='color: #26a4ff; font-weight: 600;'>with top employers</h1> easily.",
            "Find<br/><h1 style='color: #26a4ff; font-weight: 600;'>5000+ careers</h1> waiting for you.",
            "Take<br/><h1 style='color: #26a4ff; font-weight: 600;'>your skills to the next level</h1>.",
            "Join<br/><h1 style='color: #26a4ff; font-weight: 600;'>our growing job platform</h1> today.",
          ],
          typeSpeed: 100,
          backSpeed: 100,
          backDelay: 1000,
          startDelay: 500,
          loop: true,
          smartBackspace: true,
          loopCount: Infinity,
          showCursor: true,
          cursorChar: "|",
          html: true,
        });
      } else {
        console.warn("Typed element not found");
      }
    });

    return {
      typedElement,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */

.cyan-accent-color {
  color: var(--cyan-accent-color);
}
.button-primary-color {
  background-color: var(--primary-color);
}
.button-secodary-color {
  border: var(--primary-color) 1px solid;
  color: var(--primary-color);
}
.button-secodary-color:hover {
  background-color: var(--primary-color);
  color: white;
}
.typed-text-container {
  height: 9rem;
  overflow: hidden; /* Prevents layout shifts or overflow */
  display: flex;
  align-items: center; /* Vertically center the text */

  text-align: left; /* Keep text centered */
}

.typed-text-container h1 {
  margin: 0; /* Avoid unwanted spacing */
  line-height: 1.2; /* Adjust line spacing */
}

.hero-wrapper {
  margin-top: 1rem;

  min-height: 80vh;
  background-color: white;
  position: relative;
}

/* Diagonal background pattern */
.diagonal-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      135deg,
      transparent 49.5%,
      #e8eaff 49.5%,
      #e8eaff 50.5%,
      transparent 50.5%
    ),
    linear-gradient(
      135deg,
      transparent 59.5%,
      #e8eaff 59.5%,
      #e8eaff 60.5%,
      transparent 60.5%
    ),
    linear-gradient(
      135deg,
      transparent 69.5%,
      #e8eaff 69.5%,
      #e8eaff 70.5%,
      transparent 70.5%
    ),
    linear-gradient(
      135deg,
      transparent 79.5%,
      #e8eaff 79.5%,
      #e8eaff 80.5%,
      transparent 80.5%
    );
  background-size: 100px 100px, 200px 200px, 300px 300px, 400px 400px;
  z-index: 0;
}

/* Hero background image */
.hero-background {
  position: absolute;
  top: 0;
  right: 5%;
  width: 40%;
  height: 100%;
  background-image: url("@/assets/images/handsomeboy.png");
  background-position: center right;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
}

/* Search form styling */
.search-form {
  width: 100%;
  border-radius: 8px;
  position: relative;
  z-index: 2;
}

.search,
.position {
  border: none;
  border-radius: 0;
  border-bottom: gray 1px solid;
}

.search:focus {
  outline: none;
  box-shadow: none;
}

.custom-select:focus {
  outline: none;
  box-shadow: none;
}

/* Highlight image positioning */
.highlight-img {
  position: relative;
  max-width: 200px;
  margin-top: -10px;
  z-index: 1;
}

/* Override Bootstrap colors */
/* .btn-primary {
  background-color: #6366f1;
  border-color: #6366f1;
}

*/
.btn-primary:hover {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

/* Make sure content is above the background */
.container {
  position: relative;
  z-index: 2;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .hero-background {
    opacity: 0.2;
    width: 100%;
    background-position: center bottom;
  }

  .search-form {
    width: 100%;
  }

  .d-flex.flex-row {
    flex-direction: column !important;
  }

  .col-md-4,
  .col-md-3 {
    width: 100%;
    margin-bottom: 15px;
  }
}

@media (max-width: 768px) {
  .hero-wrapper {
    min-height: 100vh;
  }

  .hero-background {
    background-size: 80%;
    background-position: center bottom;
  }
}
</style>
