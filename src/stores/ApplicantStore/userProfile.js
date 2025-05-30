// userStore.js
export const userStore = {
  // Initial user profile data
  userProfile: {
    name: "Jake Gyll",
    title: "Product Designer",
    company: "Twitter",
    location: "Manchester, UK",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    about:
      "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    languages: ["English", "French"],
    socialLinks: [
      { platform: "Instagram", url: "instagram.com/jakegyll" },
      { platform: "Twitter", url: "twitter.com/jakegyll" },
      { platform: "Website", url: "www.jakegyll.com" },
    ],
    experiences: [
      {
        title: "Product Designer",
        company: "Twitter",
        type: "Full-Time",
        period: "Jun 2019 - Present (1y 1m)",
        location: "Manchester, UK",
        logo: "https://logo.clearbit.com/twitter.com",
        description:
          "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
      },
      {
        title: "Growth Marketing Designer",
        company: "GoDaddy",
        type: "Full-Time",
        period: "Jun 2011 - May 2019 (8y)",
        location: "Manchester, UK",
        logo: "https://logo.clearbit.com/godaddy.com",
        description:
          "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives",
      },
    ],
    moreExperiences: 3,
    education: [
      {
        id: 1,
        university: "Harvard University",
        degree: "Postgraduate degree, Applied Psychology",
        years: "2010 - 2012",
        logo: "https://logo.clearbit.com/harvard.edu",
        description:
          "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.",
      },
      {
        id: 2,
        university: "University of Toronto",
        degree: "Bachelor of Arts, Visual Communication",
        years: "2005 - 2009",
        logo: "https://logo.clearbit.com/utoronto.ca",
        description: "",
      },
    ],
    moreEducation: 2,
    skills: [
      "Communication",
      "Analytics",
      "Facebook Ads",
      "Content Planning",
      "Community Manager",
    ],
    portfolios: [
      {
        title: "Clinically - clinic & health care website",
        image: "https://via.placeholder.com/150/e8e8ff/333333?text=Health",
      },
      {
        title: "Growthy - SaaS Analytics & Sales Website",
        image: "https://via.placeholder.com/150/d8d8ff/333333?text=SaaS",
      },
      {
        title: "Planna - Project Management App",
        image: "https://via.placeholder.com/150/c8c8ff/333333?text=PM",
      },
      {
        title: "Furnio - furniture ecommerce",
        image: "https://via.placeholder.com/150/b8b8ff/333333?text=Ecom",
      },
    ],
  },

  // Methods to interact with the user profile data
  getUserProfile() {
    return JSON.parse(JSON.stringify(this.userProfile)); // Return a deep copy
  },

  updateUserProfile(updatedProfile) {
    this.userProfile = { ...this.userProfile, ...updatedProfile };
    this.saveToLocalStorage();
  },

  // Save to localStorage (optional - for persistence)
  saveToLocalStorage() {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("userProfile", JSON.stringify(this.userProfile));
    }
  },

  // Load from localStorage (optional - for persistence)
  loadFromLocalStorage() {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("userProfile");
      if (stored) {
        this.userProfile = JSON.parse(stored);
      }
    }
  },

  // Initialize the store
  init() {
    this.loadFromLocalStorage();
  },

  // Reset to default data
  resetProfile() {
    this.userProfile = this.getDefaultProfile();
    this.saveToLocalStorage();
  },

  // Get default profile (useful for reset functionality)
  getDefaultProfile() {
    return {
      name: "Jake Gyll",
      title: "Product Designer",
      company: "Twitter",
      location: "Manchester, UK",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      about:
        "I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.\n\nFor 10 years, I've specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.",
      email: "jakegyll@email.com",
      phone: "+44 1245 572 135",
      languages: ["English", "French"],
      socialLinks: [
        { platform: "Instagram", url: "instagram.com/jakegyll" },
        { platform: "Twitter", url: "twitter.com/jakegyll" },
        { platform: "Website", url: "www.jakegyll.com" },
      ],
      experiences: [
        {
          title: "Product Designer",
          company: "Twitter",
          type: "Full-Time",
          period: "Jun 2019 - Present (1y 1m)",
          location: "Manchester, UK",
          logo: "https://logo.clearbit.com/twitter.com",
          description:
            "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
        },
        {
          title: "Growth Marketing Designer",
          company: "GoDaddy",
          type: "Full-Time",
          period: "Jun 2011 - May 2019 (8y)",
          location: "Manchester, UK",
          logo: "https://logo.clearbit.com/godaddy.com",
          description:
            "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives",
        },
      ],
      moreExperiences: 3,
      education: [
        {
          id: 1,
          university: "Harvard University",
          degree: "Postgraduate degree, Applied Psychology",
          years: "2010 - 2012",
          logo: "https://logo.clearbit.com/harvard.edu",
          description:
            "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.",
        },
        {
          id: 2,
          university: "University of Toronto",
          degree: "Bachelor of Arts, Visual Communication",
          years: "2005 - 2009",
          logo: "https://logo.clearbit.com/utoronto.ca",
          description: "",
        },
      ],
      moreEducation: 2,
      skills: [
        "Communication",
        "Analytics",
        "Facebook Ads",
        "Content Planning",
        "Community Manager",
      ],
      portfolios: [
        {
          title: "Clinically - clinic & health care website",
          image: "https://via.placeholder.com/150/e8e8ff/333333?text=Health",
        },
        {
          title: "Growthy - SaaS Analytics & Sales Website",
          image: "https://via.placeholder.com/150/d8d8ff/333333?text=SaaS",
        },
        {
          title: "Planna - Project Management App",
          image: "https://via.placeholder.com/150/c8c8ff/333333?text=PM",
        },
        {
          title: "Furnio - furniture ecommerce",
          image: "https://via.placeholder.com/150/b8b8ff/333333?text=Ecom",
        },
      ],
    };
  },
};

// Initialize the store when imported
userStore.init();
