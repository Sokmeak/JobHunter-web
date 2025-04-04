<template>
  <section class="latest-jobs py-5 bg-light">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">Latest <span class="text-primary">jobs open</span></h2>
        <a href="#" class="text-decoration-none text-primary"
          >Show all jobs <i class="bi bi-arrow-right"></i
        ></a>
      </div>

      <div class="row g-4">
        <div class="col-md-6" v-for="(job, index) in latestJobs" :key="index">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="d-flex">
                <div class="company-logo me-3">
                  <img
                    :src="job.logo"
                    :alt="job.company"
                    class="rounded"
                    width="50"
                    height="50"
                  />
                </div>
                <div class="flex-grow-1">
                  <h5 class="card-title mb-1">{{ job.title }}</h5>
                  <p class="text-muted small mb-2">
                    {{ job.company }} • {{ job.location }}
                  </p>

                  <div class="d-flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="(tag, tagIndex) in job.tags"
                      :key="tagIndex"
                      class="badge bg-light text-dark"
                      >{{ tag }}</span
                    >
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span class="badge bg-light text-dark me-2">{{
                        job.type
                      }}</span>
                      <span class="text-muted small">{{ job.postedTime }}</span>
                    </div>
                    <a href="#" class="btn btn-sm btn-outline-primary">Apply</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LatestJobs",
  data() {
    return {
      latestJobs: [
        {
          title: "Social Media Assistant",
          company: "Figma",
          location: "New York",
          type: "Full Time",
          logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
          tags: ["Marketing", "Social Media"],
          postedTime: "2 days ago",
        },
        {
          title: "Brand Designer",
          company: "Dropbox",
          location: "San Francisco",
          type: "Full Time",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png",
          tags: ["Design", "Branding"],
          postedTime: "3 days ago",
        },
        {
          title: "Interactive Developer",
          company: "Stripe",
          location: "Remote",
          type: "Full Time",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEVjW/9gWP9bUv9XTv9aUf9dVf9hWf9USv+Efv+7uf/T0v/b2f/Bvv+cmP9pYf/m5f/////8+/9sZP/Fw//Jx/+yrv/e3f89L/9VTP/k4/+hnf/39v99d/9zbP95c/+zsP+no//Lyf/eGvq0AAAAqUlEQVR4AcWSxQGAMAwAqSW4u7P/kLi3vLnvtXHtZwhljHEBCgWoG6Zl2g4Q+Zvr+TsuvP+RwD8I35JH/rfE9WOc2KlC0sV5Gec5TySZ+wu2iwLkXpjlrxRlLncCob9T1ULRZ3roRvEX22jr1WRvx4VGOHaLDPDt4jJnlGbVYvN3tekcruuHtSRUt7J1y79lIEDKeTjPlTthYR9bqWnoqLwEwdlcMNH+ZQK2xg1GP7/6BwAAAABJRU5ErkJggg==",
          tags: ["Frontend", "JavaScript"],
          postedTime: "1 day ago",
        },
        {
          title: "UI Designer",
          company: "Webflow",
          location: "San Francisco",
          type: "Full Time",
          logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEUUbvUAaPUAa/UMbPWTs/mOsPmSsvlfkfdEg/ZIhfYAZ/VmlvdMh/b///+owPoAV/Ti6/11n/htmviyx/uEqfnv9P5wnfjr8P4AX/Qnd/b2+f/V4f00e/Y7fvbE1fy7zvsAY/QccfWfu/qWWPS4AAAAm0lEQVR4Ad2MAQ7CIAxFSwtDkU6nm0Onyrz/IaWJMjCeYC/Ja5qXfFgdKoFAyQQoDxVRG9NYtdFGb92uMUb7XIk40e4PyZ1jAZeI8uuj2J7EvYI6mkF8Fo0BoJ4dOdsiFBVVuFz5yxSgjOHW8sKdyob84SF6RvgX7SAuU47TrOW8XB1JFm2YWYgENb2PEcl3CY/wg0IxqQTCGnkDnMkKhb6wqhEAAAAASUVORK5CYII=",

          tags: ["Design", "UI/UX"],
          postedTime: "5 days ago",
        },
      ],
    };
  },
};
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>
