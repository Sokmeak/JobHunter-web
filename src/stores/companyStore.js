import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companies", () => {
  // Search query state
  const searchQuery = ref({ keyword: "", location: "" });

  const recommendedCompanies = ref([
    {
      id: 1,
      name: "Nomad",
      logo: "https://nomadlist.com/assets/logo.png",
      logoBg: "#e7f5f0",
      description:
        "Nomad is a company based in Paris, France, focused on digital innovation and community building.",
      tags: ["Business Service"],
      jobIds: [1, 100, 99, 98, 97, 96, 101],
      location: "Paris, France",
      size: "1-10",
    },
    {
      id: 2,
      name: "Dropbox",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png",
      logoBg: "#0061ff",
      description:
        "Dropbox is a file hosting service based in San Francisco, USA, known for cloud storage solutions.",
      tags: ["Tech", "Cloud Storage"],
      jobIds: [2, 22, 95, 94, 93, 92, 102],
      location: "San Francisco, USA",
      size: "501+",
    },
    {
      id: 3,
      name: "CryptoFlow",
      logo: "https://via.placeholder.com/100x100/8b5cf6/ffffff?text=CF",
      logoBg: "#8b5cf6",
      description:
        "Next-generation cryptocurrency exchange with advanced trading.",
      tags: ["Crypto", "Blockchain", "Fintech"],
      jobIds: [1, 2, 3],
      location: "New York, NY",
      size: "201-500",
      website: "https://cryptoflow.com",
    },
    {
      id: 4,
      name: "Terraform",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
      logoBg: "#7b42bc",
      description:
        "Terraform is a tech company in Hamburg, Germany, specializing in infrastructure as code.",
      tags: ["Tech", "Infrastructure"],
      jobIds: [3, 91, 90, 89, 88, 87, 103],
      location: "Hamburg, Germany",
      size: "51-200",
    },
    {
      id: 5,
      name: "Revolut",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Revolut_logo.svg",
      logoBg: "#0084ff",
      description:
        "Revolut is a fintech company based in Madrid, Spain, offering banking and financial services.",
      tags: ["Fintech"],
      jobIds: [4, 86, 186, 85, 84, 83, 104],
      location: "Madrid, Spain",
      size: "201-500",
    },
    {
      id: 6,
      name: "Canva",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_Icon_2021.svg",
      logoBg: "#00c4b4",
      description:
        "Canva is a design platform based in Ankara, Turkey, empowering users to create visual content.",
      tags: ["Design", "Tech"],
      jobIds: [5, 82, 81, 80, 79, 78, 105],
      location: "Ankara, Turkey",
      size: "501+",
    },
    {
      id: 7,
      name: "ClassPass",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/ClassPass_logo.svg",
      logoBg: "#ff4f4f",
      description:
        "ClassPass is a fitness platform based in Berlin, Germany, connecting users with workout classes.",
      tags: ["Fitness", "Tech"],
      jobIds: [6, 77, 76, 75, 74, 73, 106],
      location: "Berlin, Germany",
      size: "51-200",
    },
    {
      id: 8,
      name: "Pitch",
      logo: "https://pitch.com/favicon.ico",
      logoBg: "#000000",
      description:
        "Pitch is a presentation software company based in Berlin, Germany, focused on collaborative tools.",
      tags: ["Tech", "Productivity"],
      jobIds: [7, 72, 71, 70, 69, 68, 107],
      location: "Berlin, Germany",
      size: "11-50",
    },
    {
      id: 9,
      name: "Figma",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      logoBg: "#f24e1e",
      description:
        "Figma is a collaborative design platform based in New York, USA, known for real-time design tools.",
      tags: ["Design", "Tech"],
      jobIds: [8, 21, 108, 109, 110, 111, 112],
      location: "New York, USA",
      size: "201-500",
    },
    {
      id: 10,
      name: "Vercel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
      logoBg: "#000000",
      description:
        "Vercel is a platform for frontend developers based in Amsterdam, Netherlands, simplifying web deployment.",
      tags: ["Tech", "Web Development"],
      jobIds: [9, 113, 114, 115, 116, 117, 118],
      location: "Amsterdam, Netherlands",
      size: "51-200",
    },
    {
      id: 11,
      name: "Notion",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
      logoBg: "#ffffff",
      description:
        "Notion is a productivity tool company based in Toronto, Canada, offering all-in-one workspace solutions.",
      tags: ["Tech", "Productivity"],
      jobIds: [10, 119, 120, 121, 122, 123, 124],
      location: "Toronto, Canada",
      size: "201-500",
    },
    {
      id: 12,
      name: "GitLab",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/GitLab_logo.svg",
      logoBg: "#fc6d26",
      description:
        "GitLab is a web-based DevOps lifecycle tool based remotely, providing a Git repository manager.",
      tags: ["Tech", "DevOps"],
      jobIds: [11, 125, 126, 127, 128, 129, 130],
      location: "Remote",
      size: "501+",
    },
    {
      id: 13,
      name: "Buffer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Buffer_Logo.svg",
      logoBg: "#000000",
      description:
        "Buffer is a social media management platform based in London, UK, simplifying content scheduling.",
      tags: ["Tech", "Social Media"],
      jobIds: [12, 131, 132, 133, 134, 135, 136],
      location: "London, UK",
      size: "11-50",
    },
    {
      id: 14,
      name: "Trello",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Trello-logo-blue.svg",
      logoBg: "#0079bf",
      description:
        "Trello is a project management tool based in Rome, Italy, known for its Kanban boards.",
      tags: ["Tech", "Productivity"],
      jobIds: [13, 137, 138, 139, 140, 141, 142],
      location: "Rome, Italy",
      size: "51-200",
    },
    {
      id: 15,
      name: "Zapier",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Zapier_logo.svg",
      logoBg: "#ff4a00",
      description:
        "Zapier is an automation platform based in Sydney, Australia, connecting apps for workflows.",
      tags: ["Tech", "Automation"],
      jobIds: [14, 143, 144, 145, 146, 147, 148],
      location: "Sydney, Australia",
      size: "201-500",
    },
    {
      id: 16,
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      logoBg: "#4a154b",
      description:
        "Slack is a communication platform based in Lisbon, Portugal, enhancing team collaboration.",
      tags: ["Tech", "Communication"],
      jobIds: [15, 149, 150, 151, 152, 153, 154],
      location: "Lisbon, Portugal",
      size: "501+",
    },
    {
      id: 17,
      name: "Klarna",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Klarna_Logo_2022.svg",
      logoBg: "#ffb3c7",
      description:
        "Klarna is a fintech company based in Stockholm, Sweden, offering buy-now-pay-later services.",
      tags: ["Fintech"],
      jobIds: [16, 155, 156, 157, 158, 159, 160],
      location: "Stockholm, Sweden",
      size: "501+",
    },
    {
      id: 18,
      name: "Adobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Adobe_2020_Logo.svg",
      logoBg: "#ff0000",
      description:
        "Adobe is a software company based in Tokyo, Japan, known for creative and multimedia tools.",
      tags: ["Tech", "Creative"],
      jobIds: [17, 161, 162, 163, 164, 165, 166],
      location: "Tokyo, Japan",
      size: "501+",
    },
    {
      id: 19,
      name: "LinkedIn",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      logoBg: "#0a66c2",
      description:
        "LinkedIn is a professional networking platform based in Dublin, Ireland, connecting professionals.",
      tags: ["Tech", "Networking"],
      jobIds: [18, 167, 168, 169, 170, 171, 172],
      location: "Dublin, Ireland",
      size: "501+",
    },
    {
      id: 20,
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
      logoBg: "#1db954",
      description:
        "Spotify is a music streaming service based in Oslo, Norway, offering a vast library of audio content.",
      tags: ["Tech", "Music"],
      jobIds: [19, 24, 173, 174, 175, 176, 177],
      location: "Oslo, Norway",
      size: "501+",
    },
    {
      id: 21,
      name: "DeepMind",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      logoBg: "#4285f4",
      description:
        "DeepMind is an AI research company based in London, UK, advancing artificial intelligence.",
      tags: ["Tech", "AI"],
      jobIds: [20, 178, 179, 180, 181, 182, 183],
      location: "London, UK",
      size: "201-500",
    },
    {
      id: 22,
      name: "Webflow",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEUUbvUAaPUAa/UMbPWTs/mOsPmSsvlfkfdEg/ZIhfYAZ/VmlvdMh/b///+owPoAV/Ti6/11n/htmviyx/uEqfnv9P5wnfjr8P4AX/Qnd/b2+f/V4f00e/Y7fvbE1fy7zvsAY/QccfWfu/qWWPS4AAAAm0lEQVR4Ad2MAQ7CIAxFSwtDkU6nm0Onyrz/IaWJMjCeYC/Ja5qXfFgdKoFAyQQoDxVRG9NYtdFGb92uMUb7XIk40e4PyZ1jAZeI8uuj2J7EvYI6mkF8Fo0BoJ4dOdsiFBVVuFz5yxSgjOHW8sKdyob84SF6RvgX7SAuU47TrOW8XB1JFm2YWYgENb2PEcl3CY/wg0IxqQTCGnkDnMkKhb6wqhEAAAAASUVORK5CYII=",
      logoBg: "#4353ff",
      description:
        "Webflow is a web design platform based in San Francisco, CA, enabling no-code website creation.",
      tags: ["Tech", "Web Design"],
      jobIds: [23, 184, 185, 187, 188, 189, 190],
      location: "San Francisco, USA",
      size: "51-200",
    },
    {
      id: 23,
      name: "Shopify",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAn1BMVEX////1+PGuzoGawk+ixmPk7dX7/Pnx9uuQvCygxV2QvDrP4bX8/fybwlfp8d/s8+O404/K3qzC2Z7S47ve6sumyGqpyHra4taVv0eTvkGQukZIgyi+15iVv0hcjD5ViS5xmlhik07k6uKUv0dejj5JgxvK18WtzXeuwqSEtgq00ISOrnuKuR+PuzVfjkC50456oWhBgAi8zbSctosfcwAVHUP+AAABXElEQVR4AW3ShWLCMBAA0HahIYS6bBdWF7SC/f+3LckS/KD6aifGPcwvNLOw8THmxDIXhC4/me24BvJ8a+Z+wCA0wqURRHHy/fNq2LFxYs99oGz1+6pWasSIvzLLYJUXZVU/3pgmiDSQAQDHtu3WN4o3jApgrFFYbLWZO8aF0mS/nylsDxrdHrilpnjG8I9jqTEmACr5iUrkYesUB2AbUaM5dhqFnalwYjDEhpFSyk2jzjUBIB7fsEyn8pALyiSa+wFuqHPBNAMaiL2I3rA9ql71In9L7C6HTOFYqTQFNvJejDS2BZYYEQBGMyIy3TCNp1piSAE2S9YH8sP1Y1Uum0Z8j+mJKrP7Y88SF5mogYyUgsb2Is/IZgUmv89/SGWUuWCScaUEoUGaxlGg1/c9zWTAA7adzAXP4zBBpCeskRdwHMe8uD6MEXbjNIG+Hxo+YKfieNb2eEk0JQcNf/qmMR8K5c7QAAAAAElFTkSuQmCC",
      logoBg: "#95bf47",
      description:
        "Shopify is an e-commerce platform based remotely, empowering merchants to build online stores.",
      tags: ["Tech", "E-commerce"],
      jobIds: [25, 191, 192, 193, 194, 195, 196],
      location: "Remote",
      size: "501+",
    },
    {
      id: 24,
      name: "Dribbble",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEX/q+fYe72zSJS3T5m4UJq1TJfkisr/r+v/sezafsD6peHBXaSyR5T/rOjTdbj/renGY6nnjs3fhMTwmdf0ntv/ruq/WqLPcLTslNO8VZ7La69lEsuzAAABPklEQVR4AWWRB5aFMAhFI4Ehk2rU6Nf9L3TANt/js+Klay51YBGRfvi03S/hDdkHEBo7p1biDHhDtbsoFDqJLakXdkMVV6VxYDciIVprHnQEja1Z61uazENtp0R6m30xraS7amE3KJCwuOj37uPZOWbHbap5PRl+WN0JgObQ92EFebO4i3wzqt1xFx5BWpEy7/ByPgDEvv4KjT4pXGZNp2ekkKtxrUlJ6lghu+LHj2jyze2tN+2YGrdjhFRE6R6pKNx6BPNScr7XBcn1QjxucPT4gm7qIx2E4Jm2FF35kZIWX54/ZSVFsG4WaeNHyiFaRXN1I6GdvyEvoJWwckleXql8sU0ZLElnb/IeTfpnpCmrOyz18xfkDNrk1E5ztQjTCXlQhtr8C5ZJmb3ZI20TR/E82bOh1hEiVb7ZMUozf5iDED8WsD32AAAAAElFTkSuQmCC",
      logoBg: "#ea4c89",
      description:
        "Dribbble is a design community based remotely, showcasing creative work and connecting designers.",
      tags: ["Design", "Community"],
      jobIds: [26, 197, 198, 199, 200, 201, 202],
      location: "Remote",
      size: "51-200",
    },
    {
      id: 25,
      name: "Behance",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANS--------------------------------------------------------",
      logoBg: "#1769ff",
      description:
        "Behance is a creative platform based in New York, NY, for showcasing and discovering creative work.",
      tags: ["Design", "Creative"],
      jobIds: [27, 203, 204, 205, 206, 207, 208],
      location: "New York, USA",
      size: "201-500",
    },
    {
      id: 26,
      name: "Twitter",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEUAAAD////8/PwEBASxsbHR0dH39/f---",
      logoBg: "#1da1f2",
      description:
        "Twitter is a social media platform based in San Francisco, CA, connecting users through real-time updates.",
      tags: ["Tech", "Social Media"],
      jobIds: [28, 209, 210, 211, 212, 213, 214],
      location: "San Francisco, USA",
      size: "501+",
    },
  ]);

  // Mock API for simulating backend interactions
  const mockApi = {
    async fetchCompanies({ keyword = "", location = "" } = {}) {
      // Simulate network delay (500ms-2s)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1500 + 500)
      );
      // Simulate occasional API failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch companies from server");
      }
      let result = recommendedCompanies.value;
      // Filter by keyword
      if (keyword) {
        const searchTerms = keyword.toLowerCase().split(" ");
        result = result.filter((company) =>
          searchTerms.some(
            (term) =>
              company.name.toLowerCase().includes(term) ||
              company.description.toLowerCase().includes(term) ||
              company.tags.some((tag) => tag.toLowerCase().includes(term))
          )
        );
      }
      // Filter by location
      if (location) {
        result = result.filter((company) =>
          company.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      return result;
    },

    async addCompany(company) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1500 + 500)
      );
      if (Math.random() < 0.1) {
        throw new Error("Failed to add company to server");
      }
      const newCompany = {
        id: Math.max(...recommendedCompanies.value.map((c) => c.id)) + 1,
        ...company,
        jobIds: company.jobIds || [],
        location: company.location || "",
      };
      recommendedCompanies.value.push(newCompany);
      return newCompany;
    },

    async updateCompany(companyId, updatedData) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1500 + 500)
      );
      if (Math.random() < 0.1) {
        throw new Error("Failed to update company on server");
      }
      const index = recommendedCompanies.value.findIndex(
        (c) => c.id === companyId
      );
      if (index === -1) {
        throw new Error("Company not found");
      }
      const updatedCompany = {
        ...recommendedCompanies.value[index],
        ...updatedData,
        jobIds: updatedData.jobIds || recommendedCompanies.value[index].jobIds,
        location:
          updatedData.location || recommendedCompanies.value[index].location,
      };
      recommendedCompanies.value[index] = updatedCompany;
      return updatedCompany;
    },

    async removeCompany(companyId) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1500 + 500)
      );
      if (Math.random() < 0.1) {
        throw new Error("Failed to remove company from server");
      }
      const index = recommendedCompanies.value.findIndex(
        (c) => c.id === companyId
      );
      if (index === -1) {
        throw new Error("Company not found");
      }
      const removedCompany = recommendedCompanies.value.splice(index, 1)[0];
      return removedCompany;
    },

    async addJobToCompany(companyId, jobId) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1500 + 500)
      );
      if (Math.random() < 0.1) {
        throw new Error("Failed to add job to company on server");
      }
      const company = recommendedCompanies.value.find(
        (c) => c.id === companyId
      );
      if (!company) {
        throw new Error("Company not found");
      }
      if (!company.jobIds.includes(jobId)) {
        company.jobIds.push(jobId);
      }
      return company;
    },

    async removeJobFromCompany(companyId, jobId) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1500 + 500)
      );
      if (Math.random() < 0.1) {
        throw new Error("Failed to remove job from company on server");
      }
      const company = recommendedCompanies.value.find(
        (c) => c.id === companyId
      );
      if (!company) {
        throw new Error("Company not found");
      }
      company.jobIds = company.jobIds.filter((id) => id !== jobId);
      return company;
    },
  };

  // Computed properties
  const totalCompanyCount = computed(() => recommendedCompanies.value.length);

  const getCompaniesByTag = computed(() => {
    return (tag) =>
      recommendedCompanies.value.filter((company) =>
        company.tags.includes(tag)
      );
  });

  const getCompanyById = computed(() => {
    return (companyId) =>
      recommendedCompanies.value.find((company) => company.id === companyId);
  });

  // Search-related computed property
  const searchedCompanies = computed(() => {
    let result = recommendedCompanies.value;
    let { keyword, location } = searchQuery.value;

    // Normalize inputs
    keyword = keyword ? keyword.toLowerCase().trim() : "";
    location = location ? location.toLowerCase().trim() : "";

    // Early return if no filters
    if (!keyword && !location) {
      return result;
    }

    // Split keyword into terms, remove empty terms
    const searchTerms = keyword.split(/\s+/).filter((term) => term.length > 0);

    // Filter companies
    result = result.filter((company) => {
      let keywordMatch = true;
      let locationMatch = true;

      // Keyword matching (name, description, tags)
      if (searchTerms.length > 0) {
        const companyText = [
          company.name.toLowerCase(),
          company.description.toLowerCase(),
          ...company.tags.map((tag) => tag.toLowerCase()),
        ].join(" ");

        keywordMatch =
          searchTerms.every((term) => companyText.includes(term)) ||
          searchTerms.some((term) =>
            companyText.split(/\s+/).some((word) => word.startsWith(term))
          );
      }

      // Location matching (location field and tags)
      if (location) {
        const locationText = [
          company.location.toLowerCase(),
          ...company.tags.map((tag) => tag.toLowerCase()),
        ].join(" ");

        locationMatch =
          company.location.toLowerCase().includes(location) ||
          locationText.split(/\s+/).some((word) => word.startsWith(location)) ||
          // Allow partial city/country matches (e.g., "San" matches "San Francisco")
          company.location
            .toLowerCase()
            .split(",")[0]
            .trim()
            .includes(location);
      }

      return keywordMatch && locationMatch;
    });

    return result;
  });
  // Actions
  async function fetchCompanies({ keyword = "", location = "" } = {}) {
    try {
      const companies = await mockApi.fetchCompanies({ keyword, location });
      if (!keyword && !location) {
        // Only update recommendedCompanies if no query parameters are provided
        recommendedCompanies.value = companies;
      }
      return companies;
    } catch (error) {
      console.error("Error fetching companies:", error.message);
      throw error;
    }
  }

  function setSearchQuery({ keyword = "", location = "" }) {
    searchQuery.value = { keyword, location };
  }

  async function addCompany(company) {
    try {
      const newCompany = await mockApi.addCompany(company);
      return newCompany;
    } catch (error) {
      console.error("Error adding company:", error.message);
      throw error;
    }
  }

  async function updateCompany(companyId, updatedData) {
    try {
      const updatedCompany = await mockApi.updateCompany(
        companyId,
        updatedData
      );
      return updatedCompany;
    } catch (error) {
      console.error("Error updating company:", error.message);
      throw error;
    }
  }

  async function removeCompany(companyId) {
    try {
      const removedCompany = await mockApi.removeCompany(companyId);
      return removedCompany;
    } catch (error) {
      console.error("Error removing company:", error.message);
      throw error;
    }
  }

  async function addJobToCompany(companyId, jobId) {
    try {
      const updatedCompany = await mockApi.addJobToCompany(companyId, jobId);
      return updatedCompany;
    } catch (error) {
      console.error("Error adding job to company:", error.message);
      throw error;
    }
  }

  async function removeJobFromCompany(companyId, jobId) {
    try {
      const updatedCompany = await mockApi.removeJobFromCompany(
        companyId,
        jobId
      );
      return updatedCompany;
    } catch (error) {
      console.error("Error removing job from company:", error.message);
      throw error;
    }
  }

  return {
    recommendedCompanies,
    searchQuery,
    totalCompanyCount,
    getCompaniesByTag,
    getCompanyById,
    searchedCompanies,
    fetchCompanies,
    setSearchQuery,
    addCompany,
    updateCompany,
    removeCompany,
    addJobToCompany,
    removeJobFromCompany,
  };
});
