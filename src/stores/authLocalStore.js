import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthLocalStore = defineStore("authLocalStore", () => {
  // State
  const token = ref(null);
  const userId = ref(null);
  const userRole = ref(null);
  const companyId = ref(null);
  const userEmail = ref(null);

  // Actions
  function setAuthData({ accessToken, userId, role, email, companyId }) {
    token.value = accessToken;
    userId = userId;
    userRole.value = role;
    userEmail.value = email;
    companyId = companyId;

    // Persist to localStorage
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user_id", userId);
    localStorage.setItem("user_role", role);
    if (email) localStorage.setItem("user_email", email);
    if (companyId) localStorage.setItem("company_id", companyId);
  }

  function clearAuthData() {
    token.value = null;
    userId.value = null;
    userRole.value = null;
    userEmail.value = null;
    companyId.value = null;

    // Clear from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    localStorage.removeItem("company_id");
  }

  function initializeFromStorage() {
    token.value = localStorage.getItem("access_token") || null;
    userId.value = localStorage.getItem("user_id") || null;
    userRole.value = localStorage.getItem("user_role") || null;
    userEmail.value = localStorage.getItem("user_email") || null;
    companyId.value = localStorage.getItem("company_id") || null;
  }

  return {
    token,
    userId,
    userRole,
    companyId,
    userEmail,
    setAuthData,
    clearAuthData,
    initializeFromStorage,
  };
});
