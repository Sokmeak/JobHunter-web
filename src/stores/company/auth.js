// // src/stores/auth.js
// import { defineStore } from "pinia";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     // user: {
//     //   id: 1,
//     //   name: "Maria Kelly",
//     //   email: "MariaKlly@email.com",
//     //   avatar: "/placeholder.svg?height=40&width=40",
//     //   role: "Admin",
//     // },
//     // company: {
//     //   id: 1,
//     //   name: "Nomad",
//     //   logo: "/placeholder.svg?height=100&width=100",
//     //   website: "https://nomad.com",
//     //   founded: "July 31, 2011",
//     //   employees: "4000+",
//     //   locations: ["United States", "England", "Japan", "Australia", "China"],
//     //   industry: "Social & Non-Profit",
//     //   techStack: [
//     //     "HTML 5",
//     //     "CSS 3",
//     //     "JavaScript",
//     //     "Ruby",
//     //     "Mixpanel",
//     //     "Framer",
//     //   ],
//     //   description:
//     //     "Nomad is a software platform for starting and running internet businesses...",
//     // },
//     isAuthenticated: true,
//   }),

//   getters: {
//     currentUser: (state) => state.user,
//     currentCompany: (state) => state.company,
//     isLoggedIn: (state) => state.isAuthenticated,
//   },

//   actions: {
//     async login(credentials) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           this.isAuthenticated = true;
//           resolve({ success: true });
//         }, 1000);
//       });
//     },

//     async logout() {
//       this.isAuthenticated = false;
//       this.user = null;
//     },

//     updateUser(userData) {
//       this.user = { ...this.user, ...userData };
//     },

//     updateCompany(companyData) {
//       this.company = { ...this.company, ...companyData };
//     },
//   },
// });
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    company: null,
    isAuthenticated: !!localStorage.getItem("access_token"),
    token: localStorage.getItem("access_token") || null,
  }),

  getters: {
    currentCompany: (state) => state.company,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          credentials
        );

        // Save token to localStorage
        const token = response.data.access_token;
        localStorage.setItem("access_token", token);

        // Update store state
        this.token = token;
        this.isAuthenticated = true;

        // Fetch company profile
        const companyResponse = await axios.get(
          "http://localhost:3000/companies/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.company = companyResponse.data;
        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        return { success: false, message: error.message };
      }
    },

    async fetchCompanyProfile() {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:3000/companies/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.company = response.data;
        console.log("the current company profile: ", this.company);
      } catch (error) {
        console.error("Failed to fetch company profile:", error);
      }
    },

    logout() {
      localStorage.removeItem("access_token");
      this.token = null;
      this.isAuthenticated = false;

      this.company = null;
    },
  },
});
