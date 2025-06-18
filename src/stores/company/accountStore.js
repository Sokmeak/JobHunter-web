import { defineStore } from "pinia";
import { ref } from "vue";

export const useAccountStore = defineStore("account", () => {
  const account = ref({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@stripe.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "HR Manager",
    department: "Human Resources",
    timezone: "America/New_York",
    language: "en",
    avatar: "/placeholder.svg?height=80&width=80",
    emailPreferences: {
      notifications: true,
      marketing: false,
      weeklyDigest: true,
    },
    connectedAccounts: {
      google: true,
      linkedin: false,
      microsoft: false,
    },
  });

  const password = ref({
    current: "",
    new: "",
    confirm: "",
  });

  const updateAccount = () => {
    alert("Account settings updated successfully!");
  };

  const changePassword = () => {
    if (password.value.new !== password.value.confirm) {
      alert("New passwords do not match!");
      return;
    }
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!regex.test(password.value.new)) {
      alert(
        "Password must be at least 8 characters and include a number and special character."
      );
      return;
    }
    alert("Password updated successfully!");
    password.value = { current: "", new: "", confirm: "" };
  };

  const updateEmailPreferences = () => {
    alert("Email preferences updated successfully!");
  };

  const toggleConnection = (key) => {
    account.value.connectedAccounts[key] =
      !account.value.connectedAccounts[key];
    alert(
      `${key.charAt(0).toUpperCase() + key.slice(1)} ${
        account.value.connectedAccounts[key] ? "connected" : "disconnected"
      } successfully!`
    );
  };

  const confirmDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deletion request submitted.");
    }
  };

  return {
    account,
    password,
    updateAccount,
    changePassword,
    updateEmailPreferences,
    toggleConnection,
    confirmDeleteAccount,
  };
});
