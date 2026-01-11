import { defineStore } from "pinia";
import { ref } from "vue";

export const useBillingStore = defineStore("billingStore", () => {
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
    if (confirm(`Are you sure you want to switch to the ${plan.name} plan?`)) {
      currentPlan.value = {
        ...plan,
        nextBilling: "January 15, 2024",
      };
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
});
