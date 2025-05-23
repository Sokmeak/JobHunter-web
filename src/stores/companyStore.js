import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCompanyStore = defineStore("companies", () => {
  // Companies data with job IDs
  const recommendedCompanies = ref([
    {
      id: 1,
      name: "Nomad",
      logo: "https://nomadlist.com/assets/logo.png",
      logoBg: "#e7f5f0",
      description:
        "Nomad is a company based in Paris, France, focused on digital innovation and community building.",
      tags: ["Business Service"],
      jobIds: [1, 100, 99, 98, 97, 96, 101], // Added 101
    },
    {
      id: 2,
      name: "Dropbox",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png",
      logoBg: "#0061ff",
      description:
        "Dropbox is a file hosting service based in San Francisco, USA, known for cloud storage solutions.",
      tags: ["Tech", "Cloud Storage"],
      jobIds: [2, 22, 95, 94, 93, 92, 102], // Added 102
    },
    {
      id: 3,
      name: "Terraform",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
      logoBg: "#7b42bc",
      description:
        "Terraform is a tech company in Hamburg, Germany, specializing in infrastructure as code.",
      tags: ["Tech", "Infrastructure"],
      jobIds: [3, 91, 90, 89, 88, 87, 103], // Added 103
    },
    {
      id: 4,
      name: "Revolut",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Revolut_logo.svg",
      logoBg: "#0084ff",
      description:
        "Revolut is a fintech company based in Madrid, Spain, offering banking and financial services.",
      tags: ["Fintech"],
      jobIds: [4, 86, 186, 85, 84, 83, 104], // Fixed duplicate 86 -> 186, Added 104
    },
    {
      id: 5,
      name: "Canva",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_Icon_2021.svg",
      logoBg: "#00c4b4",
      description:
        "Canva is a design platform based in Ankara, Turkey, empowering users to create visual content.",
      tags: ["Design", "Tech"],
      jobIds: [5, 82, 81, 80, 79, 78, 105], // Added 105
    },
    {
      id: 6,
      name: "ClassPass",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/ClassPass_logo.svg",
      logoBg: "#ff4f4f",
      description:
        "ClassPass is a fitness platform based in Berlin, Germany, connecting users with workout classes.",
      tags: ["Fitness", "Tech"],
      jobIds: [6, 77, 76, 75, 74, 73, 106], // Added 106
    },
    {
      id: 7,
      name: "Pitch",
      logo: "https://pitch.com/favicon.ico",
      logoBg: "#000000",
      description:
        "Pitch is a presentation software company based in Berlin, Germany, focused on collaborative tools.",
      tags: ["Tech", "Productivity"],
      jobIds: [7, 72, 71, 70, 69, 68, 107], // Added 107
    },
    {
      id: 8,
      name: "Figma",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
      logoBg: "#f24e1e",
      description:
        "Figma is a collaborative design platform based in New York, USA, known for real-time design tools.",
      tags: ["Design", "Tech"],
      jobIds: [8, 21, 108, 109, 110, 111, 112], // Added 108, 109, 110, 111, 112
    },
    {
      id: 9,
      name: "Vercel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
      logoBg: "#000000",
      description:
        "Vercel is a platform for frontend developers based in Amsterdam, Netherlands, simplifying web deployment.",
      tags: ["Tech", "Web Development"],
      jobIds: [9, 113, 114, 115, 116, 117, 118], // Added 113, 114, 115, 116, 117, 118
    },
    {
      id: 10,
      name: "Notion",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
      logoBg: "#ffffff",
      description:
        "Notion is a productivity tool company based in Toronto, Canada, offering all-in-one workspace solutions.",
      tags: ["Tech", "Productivity"],
      jobIds: [10, 119, 120, 121, 122, 123, 124], // Added 119, 120, 121, 122, 123, 124
    },
    {
      id: 11,
      name: "GitLab",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/GitLab_logo.svg",
      logoBg: "#fc6d26",
      description:
        "GitLab is a web-based DevOps lifecycle tool based remotely, providing a Git repository manager.",
      tags: ["Tech", "DevOps"],
      jobIds: [11, 125, 126, 127, 128, 129, 130], // Added 125, 126, 127, 128, 129, 130
    },
    {
      id: 12,
      name: "Buffer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Buffer_Logo.svg",
      logoBg: "#000000",
      description:
        "Buffer is a social media management platform based in London, UK, simplifying content scheduling.",
      tags: ["Tech", "Social Media"],
      jobIds: [12, 131, 132, 133, 134, 135, 136], // Added 131, 132, 133, 134, 135, 136
    },
    {
      id: 13,
      name: "Trello",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Trello-logo-blue.svg",
      logoBg: "#0079bf",
      description:
        "Trello is a project management tool based in Rome, Italy, known for its Kanban boards.",
      tags: ["Tech", "Productivity"],
      jobIds: [13, 137, 138, 139, 140, 141, 142], // Added 137, 138, 139, 140, 141, 142
    },
    {
      id: 14,
      name: "Zapier",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Zapier_logo.svg",
      logoBg: "#ff4a00",
      description:
        "Zapier is an automation platform based in Sydney, Australia, connecting apps for workflows.",
      tags: ["Tech", "Automation"],
      jobIds: [14, 143, 144, 145, 146, 147, 148], // Added 143, 144, 145, 146, 147, 148
    },
    {
      id: 15,
      name: "Slack",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
      logoBg: "#4a154b",
      description:
        "Slack is a communication platform based in Lisbon, Portugal, enhancing team collaboration.",
      tags: ["Tech", "Communication"],
      jobIds: [15, 149, 150, 151, 152, 153, 154], // Added 149, 150, 151, 152, 153, 154
    },
    {
      id: 16,
      name: "Klarna",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Klarna_Logo_2022.svg",
      logoBg: "#ffb3c7",
      description:
        "Klarna is a fintech company based in Stockholm, Sweden, offering buy-now-pay-later services.",
      tags: ["Fintech"],
      jobIds: [16, 155, 156, 157, 158, 159, 160], // Added 155, 156, 157, 158, 159, 160
    },
    {
      id: 17,
      name: "Adobe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Adobe_2020_Logo.svg",
      logoBg: "#ff0000",
      description:
        "Adobe is a software company based in Tokyo, Japan, known for creative and multimedia tools.",
      tags: ["Tech", "Creative"],
      jobIds: [17, 161, 162, 163, 164, 165, 166], // Added 161, 162, 163, 164, 165, 166
    },
    {
      id: 18,
      name: "LinkedIn",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      logoBg: "#0a66c2",
      description:
        "LinkedIn is a professional networking platform based in Dublin, Ireland, connecting professionals.",
      tags: ["Tech", "Networking"],
      jobIds: [18, 167, 168, 169, 170, 171, 172], // Added 167, 168, 169, 170, 171, 172
    },
    {
      id: 19,
      name: "Spotify",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
      logoBg: "#1db954",
      description:
        "Spotify is a music streaming service based in Oslo, Norway, offering a vast library of audio content.",
      tags: ["Tech", "Music"],
      jobIds: [19, 24, 173, 174, 175, 176, 177], // Added 173, 174, 175, 176, 177
    },
    {
      id: 20,
      name: "DeepMind",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
      logoBg: "#4285f4",
      description:
        "DeepMind is an AI research company based in London, UK, advancing artificial intelligence.",
      tags: ["Tech", "AI"],
      jobIds: [20, 178, 179, 180, 181, 182, 183], // Added 178, 179, 180, 181, 182, 183
    },
    {
      id: 21,
      name: "Webflow",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEUUbvUAaPUAa/UMbPWTs/mOsPmSsvlfkfdEg/ZIhfYAZ/VmlvdMh/b///+owPoAV/Ti6/11n/htmviyx/uEqfnv9P5wnfjr8P4AX/Qnd/b2+f/V4f00e/Y7fvbE1fy7zvsAY/QccfWfu/qWWPS4AAAAm0lEQVR4Ad2MAQ7CIAxFSwtDkU6nm0Onyrz/IaWJMjCeYC/Ja5qXfFgdKoFAyQQoDxVRG9NYtdFGb92uMUb7XIk40e4PyZ1jAZeI8uuj2J7EvYI6mkF8Fo0BoJ4dOdsiFBVVuFz5yxSgjOHW8sKdyob84SF6RvgX7SAuU47TrOW8XB1JFm2YWYgENb2PEcl3CY/wg0IxqQTCGnkDnMkKhb6wqhEAAAAASUVORK5CYII=",
      logoBg: "#4353ff",
      description:
        "Webflow is a web design platform based in San Francisco, CA, enabling no-code website creation.",
      tags: ["Tech", "Web Design"],
      jobIds: [23, 184, 185, 187, 188, 189, 190], // Added 184, 185, 187, 188, 189, 190
    },
    {
      id: 22,
      name: "Shopify",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAn1BMVEX////1+PGuzoGawk+ixmPk7dX7/Pnx9uuQvCygxV2QvDrP4bX8/fybwlfp8d/s8+O404/K3qzC2Z7S47ve6sumyGqpyHra4taVv0eTvkGQukZIgyi+15iVv0hcjD5ViS5xmlhik07k6uKUv0dejj5JgxvK18WtzXeuwqSEtgq00ISOrnuKuR+PuzVfjkC50456oWhBgAi8zbSctosfcwAVHUP+AAABXElEQVR4AW3ShWLCMBAA0HahIYS6bBdWF7SC/f+3LckS/KD6aifGPcwvNLOw8THmxDIXhC4/me24BvJ8a+Z+wCA0wqURRHHy/fNq2LFxYs99oGz1+6pWasSIvzLLYJUXZVU/3pgmiDSQAQDHtu3WN4o3jApgrFFYbLWZO8aF0mS/nylsDxrdHrilpnjG8I9jqTEmACr5iUrkYesUB2AbUaM5dhqFnalwYjDEhpFSyk2jzjUBIB7fsEyn8pALyiSa+wFuqHPBNAMaiL2I3rA9ql71In9L7C6HTOFYqTQFNvJejDS2BZYYEQBGMyIy3TCNp1piSAE2S9YH8sP1Y1Uum0Z8j+mJKrP7Y88SF5mogYyUgsb2Is/IZgUmv89/SGWUuWCScaUEoUGaxlGg1/c9zWTAA7adzAXP4zBBpCeskRdwHMe8uD6MEXbjNIG+Hxo+YKfieNb2eEk0JQcNf/qmMR8K5c7QAAAAAElFTkSuQmCC",
      logoBg: "#95bf47",
      description:
        "Shopify is an e-commerce platform based remotely, empowering merchants to build online stores.",
      tags: ["Tech", "E-commerce"],
      jobIds: [25, 191, 192, 193, 194, 195, 196], // Added 191, 192, 193, 194, 195, 196
    },
    {
      id: 23,
      name: "Dribbble",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEX/q+fYe72zSJS3T5m4UJq1TJfkisr/r+v/sezafsD6peHBXaSyR5T/rOjTdbj/renGY6nnjs3fhMTwmdf0ntv/ruq/WqLPcLTslNO8VZ7La69lEsuzAAABPklEQVR4AWWRB5aFMAhFI4Ehk2rU6Nf9L3TANt/js+Klay51YBGRfvi03S/hDdkHEBo7p1biDHhDtbsoFDqJLakXdkMVV6VxYDciIVprHnQEja1Z61uazENtp0R6m30xraS7amE3KJCwuOj37uPZOWbHbap5PRl+WN0JgObQ92EFebO4i3wzqt1xFx5BWpEy7/ByPgDEvv4KjT4pXGZNp2ekkKtxrUlJ6lghu+LHj2jyze2tN+2YGrdjhFRE6R6pKNx6BPNScr7XBcn1QjxucPT4gm7qIx2E4Jm2FF35kZIWX54/ZSVFsG4WaeNHyiFaRXN1I6GdvyEvoJWwckleXql8sU0ZLElnb/IeTfpnpCmrOyz18xfkDNrk1E5ztQjTCXlQhtr8C5ZJmb3ZI20TR/E82bOh1hEiVb7ZMUozf5iDED8WsD32AAAAAElFTkSuQmCC",
      logoBg: "#ea4c89",
      description:
        "Dribbble is a design community based remotely, showcasing creative work and connecting designers.",
      tags: ["Design", "Community"],
      jobIds: [26, 197, 198, 199, 200, 201, 202], // Added 197, 198, 199, 200, 201, 202
    },
    {
      id: 24,
      name: "Behance",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEUFWP8AVv8ATP8ASv8AUf+lt/+ywf9lhf8ARv8AU/8AQP/y9f////91kv/q8P8ARP/S2v9ujf/l7P8ASP8yZv8ATv+5xv9nh//M1f+Spv/BzP/Y3/+4xP+ZrP+su/8AJv8AN/8APf/f5v8AL/8oX/88af9Qd/+Kof8IPKxZAAAAvUlEQVR4Ac3RRQKDMAAAwZLgLO5ab///w7qgZxZnLpHNcspsa0UhHwl1CqWmP9IM8/5hPfpD2+GVLlX38fT8P/QIQteNIFYUVUnSB/1h5qdmDqq6KYDS76Mt0oratqBuoBX/yCMnjjuq7S6BHkZZljkQR9RVlYGh/mG2l7ENbYQXRdEhynvoq+rRoykoj/bxdB5OJdShzME4lSDHi1Cbfseji/pF2WWPOuM+vfjcdldVnVl4KxXp8patFhe6ATwRD2y5uYPGAAAAAElFTkSuQmCC",
      logoBg: "#1769ff",
      description:
        "Behance is a creative platform based in New York, NY, for showcasing and discovering creative work.",
      tags: ["Design", "Creative"],
      jobIds: [27, 203, 204, 205, 206, 207, 208], // Added 203, 204, 205, 206, 207, 208
    },
    {
      id: 25,
      name: "Twitter",
      logo: "data:image/png;base64,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",
      logoBg: "#1da1f2",
      description:
        "Twitter is a social media platform based in San Francisco, CA, connecting users through real-time updates.",
      tags: ["Tech", "Social Media"],
      jobIds: [28, 209, 210, 211, 212, 213, 214], // Added 209, 210, 211, 212, 213, 214
    },
  ]);

  // Mock API for simulating backend interactions
  const mockApi = {
    async fetchCompanies() {
      // Simulate network delay (500ms-2s)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1500 + 500)
      );
      // Simulate occasional API failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch companies from server");
      }
      return recommendedCompanies.value;
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

  // Actions
  async function fetchCompanies() {
    try {
      const companies = await mockApi.fetchCompanies();
      recommendedCompanies.value = companies;
      return companies;
    } catch (error) {
      console.error("Error fetching companies:", error.message);
      throw error;
    }
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
    totalCompanyCount,
    getCompaniesByTag,
    getCompanyById,
    fetchCompanies,
    addCompany,
    updateCompany,
    removeCompany,
    addJobToCompany,
    removeJobFromCompany,
  };
});
