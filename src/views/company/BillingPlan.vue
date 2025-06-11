<template>
  <div class="billing-plans">
    <!-- Current Plan -->
    <div class="card mb-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Current Plan</h5>
      </div>
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="d-flex align-items-center mb-2">
              <h4 class="fw-bold text-primary mb-0 me-2">
                {{ currentPlan.name }}
              </h4>
              <span class="badge bg-success">Active</span>
            </div>
            <p class="text-muted mb-2">{{ currentPlan.description }}</p>
            <div class="d-flex align-items-center">
              <span class="h5 fw-bold mb-0">${{ currentPlan.price }}</span>
              <span class="text-muted ms-1">/month</span>
              <span class="text-muted ms-3"
                >• Next billing: {{ currentPlan.nextBilling }}</span
              >
            </div>
          </div>
          <div class="col-md-4 text-end">
            <button class="btn btn-outline-primary me-2">Change Plan</button>
            <button class="btn btn-outline-danger">Cancel Plan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Plans -->
    <div class="mb-4">
      <h5 class="fw-bold mb-3">Available Plans</h5>
      <div class="row">
        <div
          class="col-lg-4 mb-4"
          v-for="plan in availablePlans"
          :key="plan.id"
        >
          <div class="card h-100" :class="{ 'border-primary': plan.popular }">
            <div
              class="card-header bg-white border-bottom text-center"
              v-if="plan.popular"
            >
              <span class="badge bg-primary">Most Popular</span>
            </div>
            <div class="card-body text-center">
              <h5 class="fw-bold">{{ plan.name }}</h5>
              <div class="mb-3">
                <span class="h2 fw-bold">${{ plan.price }}</span>
                <span class="text-muted">/month</span>
              </div>
              <p class="text-muted mb-4">{{ plan.description }}</p>
              <ul class="list-unstyled text-start">
                <li
                  v-for="feature in plan.features"
                  :key="feature"
                  class="mb-2"
                >
                  <i class="bi bi-check-circle text-success me-2"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="card-footer bg-white border-top text-center">
              <button
                class="btn w-100"
                :class="
                  plan.id === currentPlan.id
                    ? 'btn-outline-secondary'
                    : 'btn-primary'
                "
                :disabled="plan.id === currentPlan.id"
                @click="selectPlan(plan)"
              >
                {{
                  plan.id === currentPlan.id ? "Current Plan" : "Select Plan"
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Billing History -->
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-bold">Billing History</h5>
          <button class="btn btn-outline-primary btn-sm">
            <i class="bi bi-download me-1"></i>
            Download All
          </button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th class="border-0">Invoice</th>
              <th class="border-0">Date</th>
              <th class="border-0">Amount</th>
              <th class="border-0">Status</th>
              <th class="border-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in billingHistory" :key="invoice.id">
              <td>
                <div>
                  <h6 class="mb-0 fw-semibold">{{ invoice.number }}</h6>
                  <small class="text-muted">{{ invoice.plan }}</small>
                </div>
              </td>
              <td class="text-muted">{{ invoice.date }}</td>
              <td class="fw-semibold">${{ invoice.amount }}</td>
              <td>
                <span :class="getInvoiceStatusClass(invoice.status)">
                  {{ invoice.status }}
                </span>
              </td>
              <td>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-eye"></i>
                  </button>
                  <button class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-download"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Method -->
    <div class="card mt-4">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Payment Method</h5>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i
              class="bi bi-credit-card text-primary me-3"
              style="font-size: 2rem"
            ></i>
            <div>
              <h6 class="mb-0 fw-semibold">•••• •••• •••• 4242</h6>
              <small class="text-muted">Expires 12/25</small>
            </div>
          </div>
          <div>
            <button class="btn btn-outline-primary btn-sm me-2">Update</button>
            <button class="btn btn-outline-secondary btn-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "BillingPlans",
  setup() {
    const currentPlan = ref({
      id: 2,
      name: "Professional",
      price: 49,
      description: "Perfect for growing teams",
      nextBilling: "January 15, 2024",
    });

    const availablePlans = ref([
      {
        id: 1,
        name: "Starter",
        price: 19,
        description: "Perfect for small teams",
        popular: false,
        features: [
          "Up to 5 job postings",
          "Basic applicant tracking",
          "Email support",
          "1 team member",
          "Basic analytics",
        ],
      },
      {
        id: 2,
        name: "Professional",
        price: 49,
        description: "Perfect for growing teams",
        popular: true,
        features: [
          "Up to 25 job postings",
          "Advanced applicant tracking",
          "Priority support",
          "5 team members",
          "Advanced analytics",
          "Custom branding",
          "Interview scheduling",
        ],
      },
      {
        id: 3,
        name: "Enterprise",
        price: 99,
        description: "Perfect for large organizations",
        popular: false,
        features: [
          "Unlimited job postings",
          "Full applicant management",
          "24/7 phone support",
          "Unlimited team members",
          "Custom integrations",
          "Advanced reporting",
          "API access",
          "Dedicated account manager",
        ],
      },
    ]);

    const billingHistory = ref([
      {
        id: 1,
        number: "INV-2024-001",
        plan: "Professional Plan",
        date: "Dec 15, 2023",
        amount: "49.00",
        status: "Paid",
      },
      {
        id: 2,
        number: "INV-2023-012",
        plan: "Professional Plan",
        date: "Nov 15, 2023",
        amount: "49.00",
        status: "Paid",
      },
      {
        id: 3,
        number: "INV-2023-011",
        plan: "Starter Plan",
        date: "Oct 15, 2023",
        amount: "19.00",
        status: "Paid",
      },
    ]);

    const getInvoiceStatusClass = (status) => {
      const classes = {
        Paid: "badge bg-success",
        Pending: "badge bg-warning",
        Failed: "badge bg-danger",
      };
      return classes[status] || "badge bg-secondary";
    };

    const selectPlan = (plan) => {
      if (
        confirm(`Are you sure you want to switch to the ${plan.name} plan?`)
      ) {
        currentPlan.value = { ...plan, nextBilling: "January 15, 2024" };
        alert(`Successfully switched to ${plan.name} plan!`);
      }
    };

    return {
      currentPlan,
      availablePlans,
      billingHistory,
      getInvoiceStatusClass,
      selectPlan,
    };
  },
};
</script>
