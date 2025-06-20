import { defineStore } from "pinia";
import { ref } from "vue";

export const useCompanyProfileStore = defineStore("companyProfileStore", () => {
  const companyData = ref({
    name: "Stripe",
    hr_contact_name: "techcorp_admin",
    hr_contact_email: "admin@gmail.com",
    logo: "/placeholder.svg?height=80&width=80",
    industry: "Technology",
    size: "1000+",
    foundedYear: 2010,
    website: "https://stripe.com",
    linkedin: "https://linkedin.com/company/stripe",
    description:
      "Stripe is a technology company that builds economic infrastructure for the internet.",
    address: {
      street: "354 Oyster Point Blvd",
      city: "South San Francisco",
      state: "CA",
      zipCode: "94080",
      country: "US",
    },
  });

  const saveProfile = () => {
    alert("Company profile updated successfully!");
  };

  return {
    companyData,
    saveProfile,
  };
});
