<template>
  <div class="container py-4">
    <!-- Company Header Card - Updated to match the image -->
    <div class="company-header-card p-4 mb-4">
      <div class="row align-items-center">
        <div class="col-lg-3 col-md-4 mb-3 mb-md-0">
          <div class="company-logo-container">
            <div
              class="company-logo rounded-3 d-flex align-items-center justify-content-center"
            >
              <span class="display-4 fw-bold text-white">S</span>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-md-8">
          <div class="d-flex flex-wrap align-items-center mb-2">
            <h1 class="company-name me-3 mb-0">Stripe</h1>
            <span class="verified-badge me-3" title="Verified Company">
              <i class="bi bi-patch-check-fill"></i>
            </span>
            <span class="jobs-badge">43 Jobs</span>
          </div>
          <a
            href="https://stripe.com"
            class="company-website mb-4 d-inline-block"
            >https://stripe.com</a
          >

          <div class="row mt-4">
            <div class="col-md-3 col-6 mb-3 mb-md-0">
              <div class="company-stat d-flex align-items-center">
                <div class="stat-icon me-2">
                  <i class="bi bi-fire text-primary"></i>
                </div>
                <div>
                  <p class="stat-label mb-0">Founded</p>
                  <p class="stat-value mb-0">July 31, 2011</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-6 mb-3 mb-md-0">
              <div class="company-stat d-flex align-items-center">
                <div class="stat-icon me-2">
                  <i class="bi bi-people text-primary"></i>
                </div>
                <div>
                  <p class="stat-label mb-0">Employees</p>
                  <p class="stat-value mb-0">4000+</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="company-stat d-flex align-items-center">
                <div class="stat-icon me-2">
                  <i class="bi bi-globe text-primary"></i>
                </div>
                <div>
                  <p class="stat-label mb-0">Location</p>
                  <p class="stat-value mb-0">20 countries</p>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-6">
              <div class="company-stat d-flex align-items-center">
                <div class="stat-icon me-2">
                  <i class="bi bi-building text-primary"></i>
                </div>
                <div>
                  <p class="stat-label mb-0">Industry</p>
                  <p class="stat-value mb-0">Payment Gateway</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <floating-status-card :company="companyData" />

    <div class="row g-4">
      <!-- Left Column -->
      <div class="col-lg-8">
        <!-- Company Profile Section -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-body p-4">
            <h2 class="section-title mb-3">Company Profile</h2>
            <p class="text-muted mb-0">
              Stripe is a software platform for starting and running internet
              businesses. Millions of businesses—from startups to Fortune 500
              companies—rely on Stripe's software tools to accept payments
              online. Stripe has been at the forefront of expanding internet
              commerce, powering new business models, and supporting the latest
              platforms, from marketplaces to mobile commerce sites,
              subscription services to software platforms, and everything in
              between. Stripe powers the technical, financial, and operational
              infrastructure for businesses around the world. Stripe's mission
              is to increase the GDP of the internet, and the company builds the
              most powerful and flexible tools for running an internet business.
              Stripe helps companies of all sizes accept payments and grow their
              revenue.
            </p>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-body p-4">
            <h2 class="section-title mb-3">Contact</h2>
            <div class="d-flex flex-wrap gap-2">
              <a
                href="https://twitter.com/stripe"
                class="btn btn-outline-primary rounded-pill"
              >
                <i class="bi bi-twitter me-2"></i> twitter.com/stripe
              </a>
              <a
                href="https://facebook.com/stripehq"
                class="btn btn-outline-primary rounded-pill"
              >
                <i class="bi bi-facebook me-2"></i> facebook.com/stripehq
              </a>
              <a
                href="mailto:info@stripe.com"
                class="btn btn-outline-primary rounded-pill"
              >
                <i class="bi bi-envelope me-2"></i> info@stripe.com
              </a>
            </div>
          </div>
        </div>

        <!-- Office Photos Section -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-body p-4">
            <h2 class="section-title mb-3">Office Photos</h2>
            <div class="row g-3">
              <div class="col-md-6">
                <img
                  src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Stripe office"
                  class="img-fluid rounded-3 w-100 h-100 object-fit-cover"
                />
              </div>
              <div class="col-md-6">
                <div class="row g-3 h-100">
                  <div class="col-6">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVhbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt="Stripe team"
                      class="img-fluid rounded-3 w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div class="col-6">
                    <img
                      src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG9mZmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt="Stripe office"
                      class="img-fluid rounded-3 w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div class="col-12">
                    <img
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG9mZmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt="Stripe meeting"
                      class="img-fluid rounded-3 w-100 object-fit-cover"
                      style="height: 120px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="section-title mb-0">Team</h2>
              <a href="#" class="text-primary text-decoration-none">
                See all (12) <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
            <div class="row g-4">
              <div
                class="col-md-4 col-lg-4 col-6"
                v-for="(member, index) in teamMembers"
                :key="index"
              >
                <team-member-card :member="member" />
              </div>
            </div>
          </div>
        </div>

        <!-- Perks & Benefits Section -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-body p-4">
            <h2 class="section-title mb-3">Perks & Benefits</h2>
            <p class="text-muted mb-4">
              This job comes with several perks and benefits
            </p>

            <div class="row g-4">
              <div
                v-for="(benefit, index) in benefits"
                :key="index"
                class="col-md-6"
              >
                <benefit-card :benefit="benefit" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-lg-4">
        <!-- Tech Stack Section -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="section-title mb-0">Tech stack</h2>
              <a href="#" class="text-primary text-decoration-none">
                See tech stack <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
            <p class="text-muted small mb-3">
              Learn what technologies and tools that Stripe uses.
            </p>
            <div class="row g-3">
              <div
                class="col-4"
                v-for="(tech, index) in techStack"
                :key="index"
              >
                <div class="tech-card p-2 rounded-3 text-center">
                  <img
                    :src="tech.icon"
                    :alt="tech.name"
                    class="img-fluid mb-2"
                    style="height: 40px"
                  />
                  <p class="small mb-0">{{ tech.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Office Location Section -->
        <div class="card border-0 shadow-sm rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="section-title mb-0">Office Location</h2>
              <a href="#" class="text-primary text-decoration-none">
                View on Google Maps <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
            <div class="location-list mt-3">
              <div
                class="d-flex align-items-center mb-3"
                v-for="(location, index) in locations"
                :key="index"
              >
                <img
                  :src="location.flag"
                  :alt="location.country"
                  class="me-3"
                  style="width: 24px; height: 18px"
                />
                <span>{{ location.country }}</span>
              </div>
              <a
                href="#"
                class="text-primary text-decoration-none d-block mt-2"
              >
                View countries <i class="bi bi-arrow-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Jobs Section -->
    <div class="similar-jobs mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fs-5 fw-bold mb-0">Opened Jobs</h2>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-sm btn-outline-primary rounded-circle me-2 scroll-btn scroll-left"
            aria-label="Scroll left"
            @click="scrollJobsLeft"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            class="btn btn-sm btn-outline-primary rounded-circle me-3 scroll-btn scroll-right"
            aria-label="Scroll right"
            @click="scrollJobsRight"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
          <a
            href="#"
            class="text-primary text-decoration-none d-flex align-items-center"
          >
            Show all jobs
            <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>

      <div class="position-relative">
        <div class="jobs-scroll-container" ref="jobsContainer">
          <div class="d-flex flex-nowrap">
            <div
              class="job-card-wrapper"
              v-for="(job, index) in openJobs"
              :key="index"
            >
              <job-card :job="job" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import JobCard from "@/components/landing/JobCard.vue";
import TeamMemberCard from "@/components/companyprofile/TeamMemberCard.vue";
import BenefitCard from "@/components/companyprofile/BenifitCard.vue";
import FloatingStatusCard from "@/components/companyprofile/FloatingStatusCard.vue";

// Scroll methods for similar jobs
const jobsContainer = ref(null);
const companyData = {
  name: "Stripe",
  logoInitial: "S",
  jobs: 43,
  employees: "4,000+",
  locations: "20 Countries",
};

const scrollJobsRight = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};

const scrollJobsLeft = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
};
const teamMembers = ref([
  {
    name: "Celestine Trantow",
    position: "CEO & Founder",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Raymond Collier",
    position: "CTO",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Katerine Lynn",
    position: "Marketing Director",
    photo: "https://randomuser.me/api/portraits/women/38.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Bernard Alexander",
    position: "Product Designer",
    photo: "https://randomuser.me/api/portraits/men/28.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
]);

const techStack = ref([
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Ruby",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
]);

const locations = ref([
  {
    country: "United States",
    flag: "https://flagcdn.com/w40/us.png",
  },
  {
    country: "England",
    flag: "https://flagcdn.com/w40/gb-eng.png",
  },
  {
    country: "Japan",
    flag: "https://flagcdn.com/w40/jp.png",
  },
  {
    country: "Australia",
    flag: "https://flagcdn.com/w40/au.png",
  },
  {
    country: "China",
    flag: "https://flagcdn.com/w40/cn.png",
  },
]);

const benefits = ref([
  {
    title: "Full Healthcare",
    description:
      "We believe in treating communities and that starts with our team staying happy and healthy.",
    icon: "bi-heart-fill",
  },
  {
    title: "Unlimited Vacation",
    description:
      "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    icon: "bi-cloud-sun-fill",
  },
  {
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it's a course or coaching.",
    icon: "bi-mortarboard-fill",
  },
  {
    title: "Team Summits",
    description:
      "Every 6 months we have a full team off-site where all team members are flown in for a week of connection and planning for the quarter.",
    icon: "bi-people-fill",
  },
  {
    title: "Remote Working",
    description:
      "You know how you perform your best work. Work from your home, a coffee shop, or anywhere when you feel like it.",
    icon: "bi-house-fill",
  },
  {
    title: "Commuter Benefits",
    description:
      "We're grateful for all the time and energy our employees put into getting to work every day.",
    icon: "bi-clock-fill",
  },
  {
    title: "We give back",
    description:
      "We anonymously match any donations team members make (up to $1,000) so they can support the organizations they care about",
    icon: "bi-cash-coin",
  },
]);

const openJobs = ref([
  {
    title: "Email Marketing",
    company: "Figma",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    description:
      "Looking for a mid-level Email Marketing Manager to join our team.",
    tags: ["Marketing"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png",
    description: "Looking for a Brand Designer to help with our rebrand.",
    tags: ["Design"],
  },
  {
    title: "Email Marketing",
    company: "Webflow",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEUUbvUAaPUAa/UMbPWTs/mOsPmSsvlfkfdEg/ZIhfYAZ/VmlvdMh/b///+owPoAV/Ti6/11n/htmviyx/uEqfnv9P5wnfjr8P4AX/Qnd/b2+f/V4f00e/Y7fvbE1fy7zvsAY/QccfWfu/qWWPS4AAAAm0lEQVR4Ad2MAQ7CIAxFSwtDkU6nm0Onyrz/IaWJMjCeYC/Ja5qXfFgdKoFAyQQoDxVRG9NYtdFGb92uMUb7XIk40e4PyZ1jAZeI8uuj2J7EvYI6mkF8Fo0BoJ4dOdsiFBVVuFz5yxSgjOHW8sKdyob84SF6RvgX7SAuU47TrOW8XB1JFm2YWYgENb2PEcl3CY/wg0IxqQTCGnkDnMkKhb6wqhEAAAAASUVORK5CYII=",
    description:
      "Looking for a mid-level Email Marketing Manager to join our team.",
    tags: ["Marketing"],
  },
  {
    title: "Visual Designer",
    company: "Spotify",
    location: "New York, NY",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    description: "Looking for a Visual Designer to join our team.",
    tags: ["Design"],
  },
  {
    title: "Product Designer",
    company: "Shopify",
    location: "Remote",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAn1BMVEX////1+PGuzoGawk+ixmPk7dX7/Pnx9uuQvCygxV2QvDrP4bX8/fybwlfp8d/s8+O404/K3qzC2Z7S47ve6sumyGqpyHra4taVv0eTvkGQukZIgyi+15iVv0hcjD5ViS5xmlhik07k6uKUv0dejj5JgxvK18WtzXeuwqSEtgq00ISOrnuKuR+PuzVfjkC50456oWhBgAi8zbSctosfcwAVHUP+AAABXElEQVR4AW3ShWLCMBAA0HahIYS6bBdWF7SC/f+3LckS/KD6aifGPcwvNLOw8THmxDIXhC4/me24BvJ8a+Z+wCA0wqURRHHy/fNq2LFxYs99oGz1+6pWasSIvzLLYJUXZVU/3pgmiDSQAQDHtu3WN4o3jApgrFFYbLWZO8aF0mS/nylsDxrdHrilpnjG8I9jqTEmACr5iUrkYesUB2AbUaM5dhqFnalwYjDEhpFSyk2jzjUBIB7fsEyn8pALyiSa+wFuqHPBNAMaiL2I3rA9ql71In9L7C6HTOFYqTQFNvJejDS2BZYYEQBGMyIy3TCNp1piSAE2S9YH8sP1Y1Uum0Z8j+mJKrP7Y88SF5mogYyUgsb2Is/IZgUmv89/SGWUuWCScaUEoUGaxlGg1/c9zWTAA7adzAXP4zBBpCeskRdwHMe8uD6MEXbjNIG+Hxo+YKfieNb2eEk0JQcNf/qmMR8K5c7QAAAAAElFTkSuQmCC",
    description: "Looking for a Product Designer to join our team.",
    tags: ["Design"],
  },
  {
    title: "Lead Designer",
    company: "Dribbble",
    location: "Remote",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEX/q+fYe72zSJS3T5m4UJq1TJfkisr/r+v/sezafsD6peHBXaSyR5T/rOjTdbj/renGY6nnjs3fhMTwmdf0ntv/ruq/WqLPcLTslNO8VZ7La69lEsuzAAABPklEQVR4AWWRB5aFMAhFI4Ehk2rU6Nf9L3TANt/js+Klay51YBGRfvi03S/hDdkHEBo7p1biDHhDtbsoFDqJLakXdkMVV6VxYDciIVprHnQEja1Z61uazENtp0R6m30xraS7amE3KJCwuOj37uPZOWbHbap5PRl+WN0JgObQ92EFebO4i3wzqt1xFx5BWpEy7/ByPgDEvv4KjT4pXGZNp2ekkKtxrUlJ6lghu+LHj2jyze2tN+2YGrdjhFRE6R6pKNx6BPNScr7XBcn1QjxucPT4gm7qIx2E4Jm2FF35kZIWX54/ZSVFsG4WaeNHyiFaRXN1I6GdvyEvoJWwckleXql8sU0ZLElnb/IeTfpnpCmrOyz18xfkDNrk1E5ztQjTCXlQhtr8C5ZJmb3ZI20TR/E82bOh1hEiVb7ZMUozf5iDED8WsD32AAAAAElFTkSuQmCC",
    description: "Looking for a Lead Designer to join our team.",
    tags: ["Design", "Leadership"],
  },
  {
    title: "Brand Strategist",
    company: "Behance",
    location: "New York, NY",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEUFWP8AVv8ATP8ASv8AUf+lt/+ywf9lhf8ARv8AU/8AQP/y9f////91kv/q8P8ARP/S2v9ujf/l7P8ASP8yZv8ATv+5xv9nh//M1f+Spv/BzP/Y3/+4xP+ZrP+su/8AJv8AN/8APf/f5v8AL/8oX/88af9Qd/+Kof8IPKxZAAAAvUlEQVR4Ac3RRQKDMAAAwZLgLO5ab///w7qgZxZnLpHNcspsa0UhHwl1CqWmP9IM8/5hPfpD2+GVLlX38fT8P/QIQteNIFYUVUnSB/1h5qdmDqq6KYDS76Mt0oratqBuoBX/yCMnjjuq7S6BHkZZljkQR9RVlYGh/mG2l7ENbYQXRdEhynvoq+rRoykoj/bxdB5OJdShzME4lSDHi1Cbfseji/pF2WWPOuM+vfjcdldVnVl4KxXp8patFhe6ATwRD2y5uYPGAAAAAElFTkSuQmCC",
    description: "Looking for a Brand Strategist to join our team.",
    tags: ["Marketing"],
  },
  {
    title: "Data Analyst",
    company: "Twitter",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA/0lEQVR4AbXPIazCMACE4d+L2qoZFEGSIGcRc/gJJB5XMzGJmK9EN0HMi+qaibkKVF1txdQe4g0YzPK5yyWXHL9TaPNQ89LojH87N1rbJcXkMF4Fk31UMrf34hm14KUeoQxGArALHTMuQD2cAWQfJXOpgTbksGr9ng8qluShJTPhyCdx63POg7rEim95ZyR68I1ggQpnCEGwyPicw6hZtPEGmnhkycqOio1zm6XuFtyw5XDXfGvuau0dXHzJp8pfBPuhIXO9ZK5ILUCdSvLYMpc6ASBtl3EaC97I4KaFaOCaBE9Zn5jUsVqR2vcTJZO1DdbGoZryVp94Ka/mQfE7f2T3df0WBhLDAAAAAElFTkSuQmCC",
    description: "Looking for a Data Analyst to join our team.",
    tags: ["Technology"],
  },
]);
</script>

<style scoped>
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

.jobs-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding-bottom: 10px;
}

.jobs-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.job-card-wrapper {
  flex: 0 0 auto;
  width: 100%;
  padding-right: 16px;
}

@media (min-width: 576px) {
  .job-card-wrapper {
    width: 80%;
  }
}

@media (min-width: 768px) {
  .job-card-wrapper {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .job-card-wrapper {
    width: 33.333%;
  }
}

@media (min-width: 1200px) {
  .job-card-wrapper {
    width: 25%;
  }
}
.verified-badge {
  color: #4640de;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}

.verified-badge i {
  filter: drop-shadow(0 1px 2px rgba(70, 64, 222, 0.2));
}

.company-profile-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Company Header Card Styling */
.company-header-card {
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #e0e0ff;
  box-shadow: 0 2px 10px rgba(70, 64, 222, 0.05);
}

.company-logo-container {
  max-width: 120px;
  margin: 0 auto;
}

.company-logo {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4640de 0%, #6e66ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: #25324b;
}

.jobs-badge {
  background-color: #e7f6fd;
  color: #4640de;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
}

.company-website {
  color: #4640de;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
}

.company-website:hover {
  text-decoration: underline;
}

.company-stat {
  margin-bottom: 10px;
}

.stat-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.stat-label {
  color: #6b7280;
  font-size: 0.85rem;
  margin-bottom: 2px;
}

.stat-value {
  color: #25324b;
  font-weight: 600;
  font-size: 0.95rem;
}

/* Section Titles */
.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #25324b;
}

.tech-card {
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.tech-card:hover {
  background-color: var(--tertiary-color);
  transform: translateY(-3px);
}

.object-fit-cover {
  object-fit: cover;
}

/* Bootstrap overrides */
.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #3935b8;
  border-color: #3935b8;
}

.btn-outline-primary {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-outline-primary:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

.bg-secondary {
  background-color: var(--secondary-color) !important;
}

.bg-tertiary {
  background-color: var(--tertiary-color) !important;
}

.bg-primary-subtle {
  background-color: rgba(70, 64, 222, 0.1) !important;
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-cyan-subtle {
  background-color: rgba(38, 164, 255, 0.1) !important;
}

.text-cyan {
  color: var(--cyan-accent-color) !important;
}

.bg-red-subtle {
  background-color: rgba(255, 101, 80, 0.1) !important;
}

.text-red {
  color: var(--red-accent-color) !important;
}

.bg-green-subtle {
  background-color: rgba(86, 205, 173, 0.1) !important;
}

.text-green {
  color: var(--green-accent-color) !important;
}

.bg-purple-subtle {
  background-color: rgba(123, 97, 255, 0.1) !important;
}

.text-purple {
  color: var(--purple-accent-color) !important;
}

.bg-yellow-subtle {
  background-color: rgba(255, 184, 54, 0.1) !important;
}

.text-yellow {
  color: var(--yellow-accent-color) !important;
}
</style>
