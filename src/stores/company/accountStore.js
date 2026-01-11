import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "./auth"; // Same folder import

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const useAccountStore = defineStore("accountStore", () => {
  const authStore = useAuthStore();

  const loading = ref(false);
  const error = ref(null);
  const accountExists = ref(false);
  const hasTriedFetching = ref(false);

  const account = ref({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    timezone: "",
    language: "en",
    avatar: "",
    emailPreferences: {
      notifications: true,
      marketing: false,
      weeklyDigest: true,
    },
    connectedAccounts: {
      google: false,
      linkedin: false,
      microsoft: false,
    },
  });

  const password = ref({
    current: "",
    new: "",
    confirm: "",
  });

  const getAuthHeaders = () => {
    const token = authStore.token || localStorage.getItem("access_token");
    if (!token) {
      authStore.logout();
      throw new Error("No authentication token found. Please log in again.");
    }
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchAccount = async () => {
    if (hasTriedFetching.value && !accountExists.value) {
      return null;
    }

    try {
      loading.value = true;
      error.value = null;
      hasTriedFetching.value = true;

      // Use company data from your existing auth store
      if (authStore.company) {
        account.value.email = authStore.company.hr_contact_email || "";
        account.value.firstName = authStore.company.hr_contact_name || "";
        accountExists.value = true;
      } else {
        // Try to fetch company profile if not in store
        await authStore.fetchCompanyProfile();
        if (authStore.company) {
          account.value.email = authStore.company.hr_contact_email || "";
          account.value.firstName = authStore.company.hr_contact_name || "";
          accountExists.value = true;
        } else {
          accountExists.value = false;
        }
      }

      return authStore.company;
    } catch (err) {
      if (err.response?.status === 401) {
        error.value = "Authentication failed. Please log in again.";
        authStore.logout();
      } else {
        error.value = err.message || "Failed to fetch account data";
        accountExists.value = false;
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateAccount = async () => {
    try {
      loading.value = true;
      error.value = null;

      alert(
        "Account update functionality needs to be implemented in the backend"
      );
      return { success: true };
    } catch (err) {
      if (err.response?.status === 401) {
        error.value = "Authentication failed. Please log in again.";
        authStore.logout();
      } else {
        error.value = err.message || "Failed to update account";
        alert("Error: " + error.value);
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const changePassword = async () => {
    try {
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

      loading.value = true;
      error.value = null;

      alert(
        "Password change functionality needs to be implemented in the backend"
      );
      password.value = { current: "", new: "", confirm: "" };
      return { success: true };
    } catch (err) {
      alert("Failed to change password. Please try again.");
    } finally {
      loading.value = false;
    }
  };

  const updateEmailPreferences = async () => {
    try {
      loading.value = true;
      error.value = null;

      alert(
        "Email preferences functionality needs to be implemented in the backend"
      );
      return { success: true };
    } catch (err) {
      alert("Failed to update email preferences");
    } finally {
      loading.value = false;
    }
  };

  const toggleConnection = async (key) => {
    try {
      account.value.connectedAccounts[key] =
        !account.value.connectedAccounts[key];

      const status = account.value.connectedAccounts[key]
        ? "connected"
        : "disconnected";
      const serviceName = key.charAt(0).toUpperCase() + key.slice(1);
      alert(`${serviceName} ${status} successfully!`);
    } catch (err) {
      account.value.connectedAccounts[key] =
        !account.value.connectedAccounts[key];
      alert(`Failed to toggle ${key} connection`);
    }
  };

  const confirmDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    const passwordConfirmation = prompt(
      "Please enter your password to confirm:"
    );
    if (!passwordConfirmation) {
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const headers = getAuthHeaders();
      await axios.delete(`${API_BASE_URL}/companies`, { headers });

      alert("Account deleted successfully!");
      authStore.logout();
    } catch (err) {
      alert("Failed to delete account. Please try again.");
    } finally {
      loading.value = false;
    }
  };

  const resetAccount = () => {
    account.value = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      department: "",
      timezone: "",
      language: "en",
      avatar: "",
      emailPreferences: {
        notifications: true,
        marketing: false,
        weeklyDigest: true,
      },
      connectedAccounts: {
        google: false,
        linkedin: false,
        microsoft: false,
      },
    };
    accountExists.value = false;
    hasTriedFetching.value = false;
    error.value = null;
  };

  const isEmptyAccount = () => {
    return !accountExists.value && hasTriedFetching.value;
  };

  return {
    account,
    password,
    loading,
    error,
    accountExists,
    hasTriedFetching,
    fetchAccount,
    updateAccount,
    changePassword,
    updateEmailPreferences,
    toggleConnection,
    confirmDeleteAccount,
    resetAccount,
    isEmptyAccount,
  };
});
