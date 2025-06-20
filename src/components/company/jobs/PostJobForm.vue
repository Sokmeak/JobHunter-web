<template>
  <div class="post-job-form">
    <!-- Step 1: Job Information -->
    <div v-if="currentStep === 1" class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Job Information</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleNext">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Job Title <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="e.g. Software Engineer"
                v-model="localJobData.title"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Job Category <span class="text-danger">*</span></label
              >
              <select
                class="form-select"
                v-model="localJobData.category"
                required
              >
                <option value="">Select job category</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Job Type <span class="text-danger">*</span></label
              >
              <select
                class="form-select"
                v-model="localJobData.jobType"
                required
              >
                <option value="">Select job type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Salary Type</label>
              <select class="form-select" v-model="localJobData.salaryType">
                <option value="">Select salary type</option>
                <option value="Range">Range</option>
                <option value="Starting Amount">Starting Amount</option>
                <option value="Maximum Amount">Maximum Amount</option>
                <option value="Exact Amount">Exact Amount</option>
              </select>
            </div>
            <div class="col-md-4 mb-3" v-if="localJobData.salaryType">
              <label class="form-label fw-semibold">Currency</label>
              <select class="form-select" v-model="localJobData.currency">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
            <div
              class="col-md-4 mb-3"
              v-if="localJobData.salaryType === 'Range'"
            >
              <label class="form-label fw-semibold">Minimum Salary</label>
              <input
                type="number"
                class="form-control"
                placeholder="e.g. 50000"
                v-model="localJobData.salaryMin"
              />
            </div>
            <div
              class="col-md-4 mb-3"
              v-if="localJobData.salaryType === 'Range'"
            >
              <label class="form-label fw-semibold">Maximum Salary</label>
              <input
                type="number"
                class="form-control"
                placeholder="e.g. 80000"
                v-model="localJobData.salaryMax"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Education</label>
              <select class="form-select" v-model="localJobData.education">
                <option value="">Select education level</option>
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Experience</label>
              <select class="form-select" v-model="localJobData.experience">
                <option value="">Select experience level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Job Level</label>
              <select class="form-select" v-model="localJobData.jobLevel">
                <option value="">Select job level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Application Deadline</label>
              <input
                type="date"
                class="form-control"
                v-model="localJobData.expireDate"
              />
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
              Next: Job Description <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Step 2: Job Description -->
    <div v-if="currentStep === 2" class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Job Description</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleNext">
          <div class="mb-4">
            <label class="form-label fw-semibold"
              >Job Description <span class="text-danger">*</span></label
            >
            <textarea
              class="form-control"
              rows="6"
              placeholder="Enter job description..."
              v-model="localJobData.description"
              required
            ></textarea>
            <small class="text-muted">Maximum 500 words</small>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Responsibilities</label>
            <div
              class="mb-2"
              v-for="(responsibility, index) in localJobData.responsibilities"
              :key="index"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="localJobData.responsibilities[index]"
                  placeholder="Enter responsibility..."
                />
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="removeResponsibility(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="addResponsibility"
            >
              <i class="bi bi-plus me-1"></i>
              Add Responsibility
            </button>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Who You Are</label>
            <div
              class="mb-2"
              v-for="(requirement, index) in localJobData.whoYouAre"
              :key="index"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="localJobData.whoYouAre[index]"
                  placeholder="Enter requirement..."
                />
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="removeRequirement(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="addRequirement"
            >
              <i class="bi bi-plus me-1"></i>
              Add Requirement
            </button>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Nice-To-Haves</label>
            <div
              class="mb-2"
              v-for="(niceToHave, index) in localJobData.niceToHaves"
              :key="index"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="localJobData.niceToHaves[index]"
                  placeholder="Enter nice-to-have..."
                />
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="removeNiceToHave(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="addNiceToHave"
            >
              <i class="bi bi-plus me-1"></i>
              Add Nice-To-Have
            </button>
          </div>

          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="$emit('prev-step')"
            >
              <i class="bi bi-arrow-left me-1"></i>
              Previous
            </button>
            <button type="submit" class="btn btn-primary">
              Next: Perks & Benefits <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Step 3: Perks & Benefits -->
    <div v-if="currentStep === 3" class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Perks & Benefits</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="form-label fw-semibold">Perks</label>
            <p class="text-muted small">
              Encourage more people to apply by sharing the attractive rewards
              and benefits you offer your employees
            </p>
            <div class="row">
              <div
                class="col-md-6 mb-2"
                v-for="perk in availablePerks"
                :key="perk.id"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="perk.id"
                    v-model="localJobData.perks"
                    :id="'perk-' + perk.id"
                  />
                  <label class="form-check-label" :for="'perk-' + perk.id">
                    <i :class="perk.icon + ' me-2'"></i>
                    {{ perk.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Benefits</label>
            <div class="row">
              <div
                class="col-md-6 mb-2"
                v-for="benefit in availableBenefits"
                :key="benefit.id"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="benefit.id"
                    v-model="localJobData.benefits"
                    :id="'benefit-' + benefit.id"
                  />
                  <label
                    class="form-check-label"
                    :for="'benefit-' + benefit.id"
                  >
                    <i :class="benefit.icon + ' me-2'"></i>
                    {{ benefit.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="$emit('prev-step')"
            >
              <i class="bi bi-arrow-left me-1"></i>
              Previous
            </button>
            <button type="submit" class="btn btn-primary">
              <i class="bi bi-check me-1"></i>
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "PostJobForm",
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    jobData: {
      type: Object,
      required: true,
    },
  },
  emits: ["update-job", "next-step", "prev-step", "submit"],
  setup(props, { emit }) {
    const localJobData = ref({ ...props.jobData });
    const jobObject = ref({}); // Object to store final job data

    const availablePerks = ref([
      {
        id: "full-healthcare",
        name: "Full Healthcare",
        icon: "bi bi-heart-pulse",
      },
      {
        id: "unlimited-vacation",
        name: "Unlimited Vacation",
        icon: "bi bi-calendar-heart",
      },
      {
        id: "skill-development",
        name: "Skill Development",
        icon: "bi bi-mortarboard",
      },
      { id: "team-summits", name: "Team Summits", icon: "bi bi-people" },
      { id: "remote-working", name: "Remote Working", icon: "bi bi-house" },
      {
        id: "commuter-benefits",
        name: "Commuter Benefits",
        icon: "bi bi-bus-front",
      },
      { id: "we-give-back", name: "We Give Back", icon: "bi bi-heart" },
      { id: "free-gym", name: "Free Gym Membership", icon: "bi bi-activity" },
    ]);

    const availableBenefits = ref([
      {
        id: "health-insurance",
        name: "Health Insurance",
        icon: "bi bi-shield-plus",
      },
      {
        id: "dental-insurance",
        name: "Dental Insurance",
        icon: "bi bi-emoji-smile",
      },
      { id: "vision-insurance", name: "Vision Insurance", icon: "bi bi-eye" },
      {
        id: "life-insurance",
        name: "Life Insurance",
        icon: "bi bi-shield-check",
      },
      {
        id: "paid-time-off",
        name: "Paid Time Off",
        icon: "bi bi-calendar-check",
      },
      {
        id: "retirement-plan",
        name: "Retirement Plan",
        icon: "bi bi-piggy-bank",
      },
      {
        id: "flexible-schedule",
        name: "Flexible Schedule",
        icon: "bi bi-clock",
      },
      {
        id: "professional-development",
        name: "Professional Development",
        icon: "bi bi-graph-up-arrow",
      },
    ]);

    // Initialize arrays if they don't exist
    if (!localJobData.value.responsibilities)
      localJobData.value.responsibilities = [""];
    if (!localJobData.value.whoYouAre) localJobData.value.whoYouAre = [""];
    if (!localJobData.value.niceToHaves) localJobData.value.niceToHaves = [""];
    if (!localJobData.value.perks) localJobData.value.perks = [];
    if (!localJobData.value.benefits) localJobData.value.benefits = [];

    // Watch for changes and emit updates
    watch(
      localJobData,
      (newData) => {
        emit("update-job", newData);
      },
      { deep: true }
    );

    const handleNext = () => {
      emit("update-job", localJobData.value);
      emit("next-step");
    };

    // const handleSubmit = () => {
    //   // Save data to jobObject
    //   jobObject.value = { ...localJobData.value };
    //   // Log the jobObject data to the console
    //   console.log(
    //     "Job Data Submitted:",
    //     JSON.stringify(jobObject.value, null, 2)
    //   );
    //   emit("update-job", localJobData.value);
    //   emit("submit");
    // };

    const handleSubmit = async () => {
      // Save data to jobObject
      jobObject.value = { ...localJobData.value };
      console.log(
        "Job Data Submitted:",
        JSON.stringify(jobObject.value, null, 2)
      );

      // Transform frontend data to backend format
      const backendData = {
        title: localJobData.value.title,
        description: localJobData.value.description,
        responsibility: localJobData.value.responsibilities
          .filter((r) => r.trim())
          .join(","),
        qualification: [
          ...(localJobData.value.education
            ? [localJobData.value.education]
            : []),
          ...(localJobData.value.experience
            ? [localJobData.value.experience]
            : []),
          ...localJobData.value.whoYouAre.filter((q) => q.trim()),
        ].join(","),
        job_type: localJobData.value.jobType,
        skill_required: localJobData.value.category,
        salary_range:
          localJobData.value.salaryType === "Range" &&
          localJobData.value.salaryMin &&
          localJobData.value.salaryMax
            ? `${localJobData.value.currency}${localJobData.value.salaryMin} - ${localJobData.value.currency}${localJobData.value.salaryMax}`
            : "",
        expired_date: localJobData.value.expireDate || null,
        who_you_are: localJobData.value.whoYouAre.filter((q) => q.trim()),
        nice_to_haves: localJobData.value.niceToHaves.filter((n) => n.trim()),
        perks_benefits: {
          health_coverage: localJobData.value.perks.includes("full-healthcare")
            ? "Comprehensive health coverage."
            : undefined,
          remote_work: localJobData.value.perks.includes("remote-working")
            ? "Option to work from home or office."
            : undefined,
          wellness_program: localJobData.value.perks.includes("free-gym")
            ? "Gym memberships and mental health support."
            : undefined,
          team_retreats: localJobData.value.perks.includes("team-summits")
            ? "Annual team retreats."
            : undefined,
          commuter_benefits: localJobData.value.perks.includes(
            "commuter-benefits"
          )
            ? "Subsidized commuting costs."
            : undefined,
          learning_stipend: localJobData.value.perks.includes(
            "skill-development"
          )
            ? "Funding for professional learning."
            : undefined,
          professional_development: localJobData.value.benefits.includes(
            "professional-development"
          )
            ? "Mentorship and training opportunities."
            : undefined,
          retirement_plan: localJobData.value.benefits.includes(
            "retirement-plan"
          )
            ? "401(k) or similar retirement plan."
            : undefined,
          paid_time_off: localJobData.value.benefits.includes("paid-time-off")
            ? "Generous paid time off."
            : undefined,
          flexible_hours: localJobData.value.benefits.includes(
            "flexible-schedule"
          )
            ? "Flexible working hours."
            : undefined,
        },
        company_id: localJobData.value.company_id || 1, // Default if not provided
        created_by: localJobData.value.created_by || 1, // Default user ID
      };

      try {
        const response = await fetch("http://localhost:3000/companies/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(backendData),
        });

        if (!response.ok) {
          throw new Error("Failed to create job");
        }

        const createdJob = await response.json();
        console.log("Job created successfully:", createdJob);
        emit("update-job", localJobData.value);
        emit("submit");
      } catch (error) {
        console.error("Error creating job:", error);
      }
    };

    const addResponsibility = () => {
      localJobData.value.responsibilities.push("");
    };

    const removeResponsibility = (index) => {
      localJobData.value.responsibilities.splice(index, 1);
    };

    const addRequirement = () => {
      localJobData.value.whoYouAre.push("");
    };

    const removeRequirement = (index) => {
      localJobData.value.whoYouAre.splice(index, 1);
    };

    const addNiceToHave = () => {
      localJobData.value.niceToHaves.push("");
    };

    const removeNiceToHave = (index) => {
      localJobData.value.niceToHaves.splice(index, 1);
    };

    return {
      localJobData,
      availablePerks,
      availableBenefits,
      handleNext,
      handleSubmit,
      addResponsibility,
      removeResponsibility,
      addRequirement,
      removeRequirement,
      addNiceToHave,
      removeNiceToHave,
    };
  },
};
</script>
