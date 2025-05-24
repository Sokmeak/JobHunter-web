import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Mock API functions to simulate backend calls
const mockApi = {
  async fetchJobs() {
    // Simulate network delay (1-2 seconds)
    // await new Promise((resolve) => setTimeout(resolve, 500));

    // // Simulate occasional API failure (10% chance)
    // if (Math.random() < 0.1) {
    //   throw new Error("Failed to fetch jobs from server");
    // }

    return [
      {
        id: 1,
        title: "Social Media Assistant",
        companyId: 1,
        location: "Paris, France",
        type: "Full-Time",
        description:
          "Nomad is seeking a Social Media Assistant to enhance our brand presence across digital platforms. You will create engaging content, manage community interactions, and analyze performance metrics to drive growth.",
        salary: "€60k-€75k",
        postedDate: "2025-04-01",
        deadline: "2025-05-30",
        applied: 5,
        capacity: 10,
        tags: ["Marketing", "Design"],
        responsibilities: [
          "Develop and schedule social media content across platforms",
          "Engage with followers to build community relationships",
          "Analyze campaign performance and report insights",
          "Collaborate with marketing team on brand strategy",
          "Stay updated on social media trends",
        ],
        whoYouAre: [
          "Creative with a passion for storytelling",
          "Strong communicator with attention to detail",
          "Familiar with social media analytics tools",
          "Team player with a proactive attitude",
          "Comfortable in a fast-paced environment",
        ],
        niceToHaves: [
          "Experience with graphic design tools like Canva",
          "Knowledge of SEO principles",
          "Fluency in French",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Comprehensive medical and dental plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Flexible Hours",
            description: "Work-life balance with flexible scheduling.",
            icon: "bi-clock-fill",
          },
          {
            title: "Learning Stipend",
            description: "Annual budget for courses and workshops.",
            icon: "bi-mortarboard-fill",
          },
          {
            title: "Team Retreats",
            description: "Annual company-wide retreats for collaboration.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 2,
        title: "Brand Designer",
        companyId: 2,
        location: "San Francisco, USA",
        type: "Full-Time",
        description:
          "Dropbox is looking for a Brand Designer to shape our visual identity. You will design marketing materials, ensure brand consistency, and collaborate with cross-functional teams to elevate our brand.",
        salary: "$90k-$120k",
        postedDate: "2025-03-15",
        deadline: "2025-06-15",
        applied: 2,
        capacity: 8,
        tags: ["Marketing", "Design"],
        responsibilities: [
          "Create visually compelling brand assets",
          "Maintain brand guidelines across all channels",
          "Collaborate with product and marketing teams",
          "Design for digital and print media",
          "Iterate based on stakeholder feedback",
        ],
        whoYouAre: [
          "Skilled in typography and color theory",
          "Proficient in Adobe Creative Suite",
          "Detail-oriented with a creative mindset",
          "Able to manage multiple projects",
          "Passionate about brand storytelling",
        ],
        niceToHaves: [
          "Experience with motion graphics",
          "Knowledge of UI/UX design",
          "Familiarity with tech industry trends",
        ],
        benefits: [
          {
            title: "Stock Options",
            description: "Equity in a leading tech company.",
            icon: "bi-cash-coin",
          },
          {
            title: "Remote Work",
            description: "Option to work from home or office.",
            icon: "bi-house-fill",
          },
          {
            title: "Wellness Program",
            description: "Gym memberships and mental health support.",
            icon: "bi-heart-fill",
          },
          {
            title: "Career Growth",
            description: "Mentorship and training opportunities.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 3,
        title: "Interactive Developer",
        companyId: 3,
        location: "Hamburg, Germany",
        type: "Full-Time",
        description:
          "Terraform seeks an Interactive Developer to build engaging web experiences. You will code interactive features, optimize performance, and work with designers to bring ideas to life.",
        salary: "€80k-€100k",
        postedDate: "2025-04-10",
        deadline: "2025-06-10",
        applied: 8,
        capacity: 12,
        tags: ["Marketing", "Design"],
        responsibilities: [
          "Develop interactive web applications",
          "Optimize code for performance and scalability",
          "Collaborate with designers on UI/UX",
          "Test and debug across browsers",
          "Integrate APIs and third-party services",
        ],
        whoYouAre: [
          "Proficient in JavaScript, HTML, and CSS",
          "Experienced with frameworks like React or Vue",
          "Problem-solver with a focus on user experience",
          "Able to work in a collaborative environment",
          "Passionate about emerging web technologies",
        ],
        niceToHaves: [
          "Experience with WebGL or Three.js",
          "Knowledge of backend development",
          "Familiarity with DevOps tools",
        ],
        benefits: [
          {
            title: "Relocation Support",
            description: "Assistance for moving to Hamburg.",
            icon: "bi-house-fill",
          },
          {
            title: "Health Benefits",
            description: "Comprehensive medical coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Tech Budget",
            description: "Budget for tools and hardware.",
            icon: "bi-laptop",
          },
          {
            title: "Team Events",
            description: "Regular team-building activities.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 4,
        title: "Email Marketing",
        companyId: 4,
        location: "Madrid, Spain",
        type: "Full-Time",
        description:
          "Revolut is hiring an Email Marketing specialist to drive customer engagement. You will design email campaigns, analyze performance, and optimize for conversions.",
        salary: "€65k-€80k",
        postedDate: "2025-04-20",
        deadline: "2025-06-20",
        applied: 0,
        capacity: 10,
        tags: ["Marketing", "Design"],
        responsibilities: [
          "Create and manage email marketing campaigns",
          "Segment audiences for personalized content",
          "Analyze campaign metrics and optimize",
          "Collaborate with content and design teams",
          "Ensure compliance with email regulations",
        ],
        whoYouAre: [
          "Experienced with email marketing platforms",
          "Data-driven with strong analytical skills",
          "Creative in crafting compelling content",
          "Organized and detail-oriented",
          "Able to work under tight deadlines",
        ],
        niceToHaves: [
          "Experience with A/B testing",
          "Knowledge of CRM systems",
          "Fluency in Spanish",
        ],
        benefits: [
          {
            title: "Stock Options",
            description: "Equity in a fast-growing fintech.",
            icon: "bi-cash-coin",
          },
          {
            title: "Flexible Work",
            description: "Hybrid work model.",
            icon: "bi-house-fill",
          },
          {
            title: "Health Insurance",
            description: "Full medical and dental coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Learning Opportunities",
            description: "Access to training programs.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 5,
        title: "Lead Engineer",
        companyId: 5,
        location: "Ankara, Turkey",
        type: "Full-Time",
        description:
          "Canva is seeking a Lead Engineer to oversee development projects. You will lead a team, architect solutions, and ensure high-quality code delivery.",
        salary: "₺500k-₺650k",
        postedDate: "2025-03-25",
        deadline: "2025-05-25",
        applied: 5,
        capacity: 10,
        tags: ["Marketing", "Design"],
        responsibilities: [
          "Lead and mentor a team of engineers",
          "Architect scalable software solutions",
          "Ensure code quality and best practices",
          "Collaborate with product managers",
          "Drive technical innovation",
        ],
        whoYouAre: [
          "Experienced in leading engineering teams",
          "Proficient in modern tech stacks",
          "Strong problem-solving skills",
          "Excellent communicator",
          "Passionate about design tools",
        ],
        niceToHaves: [
          "Experience with Node.js or Go",
          "Knowledge of cloud infrastructure",
          "Familiarity with design platforms",
        ],
        benefits: [
          {
            title: "Equity Program",
            description: "Stock options for employees.",
            icon: "bi-cash-coin",
          },
          {
            title: "Health Benefits",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Remote Options",
            description: "Flexible work-from-home policy.",
            icon: "bi-house-fill",
          },
          {
            title: "Team Retreats",
            description: "Global team gatherings.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 6,
        title: "Product Designer",
        companyId: 6,
        location: "Berlin, Germany",
        type: "Full-Time",
        description:
          "ClassPass is looking for a Product Designer to craft user-centric experiences. You will design interfaces, conduct user research, and collaborate with developers.",
        salary: "€75k-€95k",
        postedDate: "2025-04-05",
        deadline: "2025-06-05",
        applied: 5,
        capacity: 10,
        tags: ["Marketing", "Design"],
        responsibilities: [
          "Design intuitive user interfaces",
          "Conduct user research and testing",
          "Create wireframes and prototypes",
          "Collaborate with developers and PMs",
          "Iterate based on feedback",
        ],
        whoYouAre: [
          "Skilled in Figma and prototyping tools",
          "Empathetic to user needs",
          "Strong visual design skills",
          "Collaborative and communicative",
          "Passionate about fitness tech",
        ],
        niceToHaves: [
          "Experience with animation design",
          "Knowledge of HTML/CSS",
          "Familiarity with fitness industry",
        ],
        benefits: [
          {
            title: "Gym Membership",
            description: "Free ClassPass subscription.",
            icon: "bi-heart-fill",
          },
          {
            title: "Flexible Hours",
            description: "Work when you’re most productive.",
            icon: "bi-clock-fill",
          },
          {
            title: "Learning Budget",
            description: "Funds for professional growth.",
            icon: "bi-mortarboard-fill",
          },
          {
            title: "Team Events",
            description: "Regular social and team activities.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 7,
        title: "Customer Manager",
        companyId: 7,
        location: "Berlin, Germany",
        type: "Full-Time",
        description:
          "Pitch seeks a Customer Manager to support our clients. You will handle inquiries, provide solutions, and ensure customer satisfaction.",
        salary: "€60k-€80k",
        postedDate: "2025-05-15",
        deadline: "2025-06-15",
        applied: 5,
        capacity: 10,
        tags: ["Marketing", "Design"],
        responsibilities: [
          "Respond to customer inquiries promptly",
          "Resolve issues and escalate when needed",
          "Maintain customer satisfaction metrics",
          "Collaborate with product teams",
          "Provide feedback for improvements",
        ],
        whoYouAre: [
          "Empathetic and patient",
          "Strong communication skills",
          "Organized and detail-oriented",
          "Experienced in customer support",
          "Passionate about client success",
        ],
        niceToHaves: [
          "Experience with CRM tools",
          "Knowledge of presentation software",
          "Fluency in German",
        ],
        benefits: [
          {
            title: "Health Insurance",
            description: "Full medical coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Flexible Work",
            description: "Hybrid work options.",
            icon: "bi-house-fill",
          },
          {
            title: "Team Outings",
            description: "Regular team-building events.",
            icon: "bi-people-fill",
          },
          {
            title: "Learning Support",
            description: "Access to training resources.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 8,
        title: "UI/UX Designer",
        companyId: 8,
        location: "New York, USA",
        type: "Remote",
        description:
          "Figma is hiring a UI/UX Designer to create seamless user experiences. You will design interfaces, conduct research, and collaborate remotely with global teams.",
        salary: "$100k-$130k",
        postedDate: "2025-04-01",
        deadline: "2025-05-31",
        applied: 3,
        capacity: 7,
        tags: ["Design"],
        responsibilities: [
          "Design user-friendly interfaces",
          "Conduct user research and usability tests",
          "Create prototypes and wireframes",
          "Collaborate with developers and PMs",
          "Ensure design consistency",
        ],
        whoYouAre: [
          "Expert in Figma and design tools",
          "Strong understanding of UX principles",
          "Creative with a user-centric mindset",
          "Able to work independently",
          "Passionate about collaborative design",
        ],
        niceToHaves: [
          "Experience with accessibility standards",
          "Knowledge of front-end development",
          "Familiarity with remote work tools",
        ],
        benefits: [
          {
            title: "Remote Work",
            description: "Fully remote with flexible hours.",
            icon: "bi-house-fill",
          },
          {
            title: "Equity Options",
            description: "Stock in a growing company.",
            icon: "bi-cash-coin",
          },
          {
            title: "Health Benefits",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Learning Stipend",
            description: "Budget for professional growth.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 9,
        title: "Frontend Developer",
        companyId: 9,
        location: "Amsterdam, Netherlands",
        type: "Full-Time",
        description:
          "Vercel is seeking a Frontend Developer to build high-performance web applications. You will work on our platform, optimize user interfaces, and ensure scalability.",
        salary: "€85k-€110k",
        postedDate: "2025-05-10",
        deadline: "2025-06-10",
        applied: 4,
        capacity: 9,
        tags: ["Engineering"],
        responsibilities: [
          "Develop responsive web applications",
          "Optimize front-end performance",
          "Collaborate with designers and backend teams",
          "Write clean, maintainable code",
          "Participate in code reviews",
        ],
        whoYouAre: [
          "Proficient in React and Next.js",
          "Experienced with modern JavaScript",
          "Detail-oriented with a focus on quality",
          "Collaborative and communicative",
          "Passionate about web performance",
        ],
        niceToHaves: [
          "Experience with TypeScript",
          "Knowledge of serverless architecture",
          "Familiarity with Vercel platform",
        ],
        benefits: [
          {
            title: "Stock Options",
            description: "Equity in a leading platform.",
            icon: "bi-cash-coin",
          },
          {
            title: "Health Coverage",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Remote Options",
            description: "Flexible work arrangements.",
            icon: "bi-house-fill",
          },
          {
            title: "Team Retreats",
            description: "Global team gatherings.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 10,
        title: "Community Manager",
        companyId: 10,
        location: "Toronto, Canada",
        type: "Part-Time",
        description:
          "Notion is looking for a Community Manager to engage our user base. You will moderate forums, organize events, and foster a vibrant community.",
        salary: "CA$40k-$50k",
        postedDate: "2025-04-05",
        deadline: "2025-06-05",
        applied: 6,
        capacity: 10,
        tags: ["Marketing"],
        responsibilities: [
          "Moderate community forums and social media",
          "Organize virtual and in-person events",
          "Gather user feedback for product teams",
          "Create engaging community content",
          "Build campagna with community leaders",
        ],
        whoYouAre: [
          "Outgoing and empathetic",
          "Strong written and verbal skills",
          "Organized with event planning experience",
          "Passionate about productivity tools",
          "Able to work part-time hours",
        ],
        niceToHaves: [
          "Experience with Notion",
          "Knowledge of community platforms",
          "Fluency in French",
        ],
        benefits: [
          {
            title: "Flexible Hours",
            description: "Work around your schedule.",
            icon: "bi-clock-fill",
          },
          {
            title: "Health Benefits",
            description: "Part-time medical coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Team Events",
            description: "Access to company gatherings.",
            icon: "bi-people-fill",
          },
          {
            title: "Tool Access",
            description: "Free Notion subscription.",
            icon: "bi-laptop",
          },
        ],
      },
      {
        id: 11,
        title: "DevOps Engineer",
        companyId: 11,
        location: "Remote",
        type: "Remote",
        description:
          "GitLab is hiring a DevOps Engineer to enhance our CI/CD pipelines. You will automate infrastructure, monitor systems, and ensure reliability.",
        salary: "$110k-$140k",
        postedDate: "2025-04-01",
        deadline: "2025-05-31",
        applied: 2,
        capacity: 5,
        tags: ["Engineering"],
        responsibilities: [
          "Automate infrastructure with IaC tools",
          "Optimize CI/CD pipelines",
          "Monitor system performance and uptime",
          "Collaborate with development teams",
          "Ensure security best practices",
        ],
        whoYouAre: [
          "Experienced with Kubernetes and Docker",
          "Proficient in scripting languages",
          "Strong problem-solving skills",
          "Comfortable in a remote setting",
          "Passionate about DevOps culture",
        ],
        niceToHaves: [
          "Experience with GitLab CI",
          "Knowledge of cloud providers",
          "Familiarity with security frameworks",
        ],
        benefits: [
          {
            title: "Fully Remote",
            description: "Work from anywhere.",
            icon: "bi-house-fill",
          },
          {
            title: "Equity Options",
            description: "Stock in a growing company.",
            icon: "bi-cash-coin",
          },
          {
            title: "Health Benefits",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Learning Budget",
            description: "Funds for certifications.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 12,
        title: "Content Writer",
        companyId: 12,
        location: "London, UK",
        type: "Freelance",
        description:
          "Buffer is seeking a Content Writer to create engaging blog posts and social media content. You will craft stories that resonate with our audience.",
        salary: "£30k-£40k",
        postedDate: "2025-04-15",
        deadline: "2025-06-15",
        applied: 1,
        capacity: 4,
        tags: ["Writing"],
        responsibilities: [
          "Write blog posts and social media content",
          "Collaborate with marketing team on strategy",
          "Optimize content for SEO",
          "Edit and proofread drafts",
          "Meet project deadlines",
        ],
        whoYouAre: [
          "Skilled in storytelling and copywriting",
          "Familiar with SEO best practices",
          "Self-motivated and organized",
          "Able to work independently",
          "Passionate about social media",
        ],
        niceToHaves: [
          "Experience with Buffer tools",
          "Knowledge of analytics tools",
          "Background in marketing",
        ],
        benefits: [
          {
            title: "Flexible Schedule",
            description: "Work on your own time.",
            icon: "bi-clock-fill",
          },
          {
            title: "Remote Work",
            description: "Freelance from anywhere.",
            icon: "bi-house-fill",
          },
          {
            title: "Tool Access",
            description: "Free Buffer subscription.",
            icon: "bi-laptop",
          },
          {
            title: "Community",
            description: "Join our freelance network.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 13,
        title: "QA Tester",
        companyId: 13,
        location: "Rome, Italy",
        type: "Full-Time",
        description:
          "Trello is hiring a QA Tester to ensure product quality. You will test features, report bugs, and collaborate with developers to maintain high standards.",
        salary: "€55k-€70k",
        postedDate: "2025-04-10",
        deadline: "2025-06-10",
        applied: 4,
        capacity: 6,
        tags: ["Engineering"],
        responsibilities: [
          "Test software features and functionality",
          "Write and execute test cases",
          "Report and track bugs",
          "Collaborate with developers on fixes",
          "Ensure product meets quality standards",
        ],
        whoYouAre: [
          "Detail-oriented with strong analytical skills",
          "Experienced in manual and automated testing",
          "Familiar with Agile methodologies",
          "Strong communicator",
          "Passionate about productivity tools",
        ],
        niceToHaves: [
          "Experience with Trello",
          "Knowledge of automation tools",
          "Fluency in Italian",
        ],
        benefits: [
          {
            title: "Health Insurance",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Flexible Hours",
            description: "Balance work and life.",
            icon: "bi-clock-fill",
          },
          {
            title: "Team Retreats",
            description: "Annual company gatherings.",
            icon: "bi-people-fill",
          },
          {
            title: "Tool Access",
            description: "Free Trello subscription.",
            icon: "bi-laptop",
          },
        ],
      },
      {
        id: 14,
        title: "Growth Marketer",
        companyId: 14,
        location: "Sydney, Australia",
        type: "Full-Time",
        description:
          "Zapier is seeking a Growth Marketer to drive user acquisition. You will design campaigns, analyze data, and optimize for growth.",
        salary: "A$100k-A$130k",
        postedDate: "2025-04-05",
        deadline: "2025-06-05",
        applied: 3,
        capacity: 10,
        tags: ["Marketing"],
        responsibilities: [
          "Plan and execute growth campaigns",
          "Analyze user acquisition metrics",
          "Optimize marketing funnels",
          "Collaborate with product and content teams",
          "Experiment with new growth strategies",
        ],
        whoYouAre: [
          "Data-driven with strong analytical skills",
          "Experienced in digital marketing",
          "Creative in campaign design",
          "Collaborative and proactive",
          "Passionate about automation",
        ],
        niceToHaves: [
          "Experience with Zapier",
          "Knowledge of paid advertising",
          "Familiarity with SaaS metrics",
        ],
        benefits: [
          {
            title: "Remote Work",
            description: "Flexible work-from-home policy.",
            icon: "bi-house-fill",
          },
          {
            title: "Health Benefits",
            description: "Comprehensive medical coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Equity Options",
            description: "Stock in a growing company.",
            icon: "bi-cash-coin",
          },
          {
            title: "Learning Budget",
            description: "Funds for professional growth.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 15,
        title: "Support Specialist",
        companyId: 15,
        location: "Lisbon, Portugal",
        type: "Remote",
        description:
          "Slack is hiring a Support Specialist to assist users. You will troubleshoot issues, provide guidance, and ensure a positive user experience.",
        salary: "€50k-€65k",
        postedDate: "2025-04-01",
        deadline: "2025-05-31",
        applied: 2,
        capacity: 6,
        tags: ["Support"],
        responsibilities: [
          "Respond to user inquiries via chat and email",
          "Troubleshoot technical issues",
          "Document solutions and processes",
          "Collaborate with product teams",
          "Maintain high customer satisfaction",
        ],
        whoYouAre: [
          "Patient and empathetic",
          "Strong problem-solving skills",
          "Experienced in customer support",
          "Familiar with Slack’s platform",
          "Able to work remotely",
        ],
        niceToHaves: [
          "Experience with ticketing systems",
          "Knowledge of APIs",
          "Fluency in Portuguese",
        ],
        benefits: [
          {
            title: "Fully Remote",
            description: "Work from anywhere.",
            icon: "bi-house-fill",
          },
          {
            title: "Health Coverage",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Team Events",
            description: "Virtual and in-person gatherings.",
            icon: "bi-people-fill",
          },
          {
            title: "Tool Access",
            description: "Free Slack subscription.",
            icon: "bi-laptop",
          },
        ],
      },
      {
        id: 16,
        title: "Data Analyst",
        companyId: 16,
        location: "Stockholm, Sweden",
        type: "Full-Time",
        description:
          "Klarna is seeking a Data Analyst to derive insights from financial data. You will analyze trends, create reports, and support strategic decisions.",
        salary: "SEK 600k-SEK 800k",
        postedDate: "2025-04-10",
        deadlineSHIP: "2025-06-10",
        applied: 7,
        capacity: 10,
        tags: ["Data"],
        responsibilities: [
          "Analyze financial and user data",
          "Create dashboards and reports",
          "Collaborate with business teams",
          "Identify trends and opportunities",
          "Ensure data accuracy",
        ],
        whoYouAre: [
          "Proficient in SQL and Python",
          "Experienced with data visualization tools",
          "Analytical with strong attention to detail",
          "Collaborative and communicative",
          "Passionate about fintech",
        ],
        niceToHaves: [
          "Experience with Tableau",
          "Knowledge of machine learning",
          "Fluency in Swedish",
        ],
        benefits: [
          {
            title: "Health Benefits",
            description: "Comprehensive medical coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Equity Options",
            description: "Stock in a leading fintech.",
            icon: "bi-cash-coin",
          },
          {
            title: "Flexible Hours",
            description: "Balance work and life.",
            icon: "bi-clock-fill",
          },
          {
            title: "Team Retreats",
            description: "Annual company gatherings.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 17,
        title: "Motion Designer",
        companyId: 17,
        location: "Tokyo, Japan",
        type: "Full-Time",
        description:
          "Adobe is hiring a Motion Designer to create dynamic visuals. You will produce animations, design motion graphics, and enhance our creative tools.",
        salary: "¥10M-¥13M",
        postedDate: "2025-04-05",
        deadline: "2025-06-05",
        applied: 2,
        capacity: 8,
        tags: ["Design"],
        responsibilities: [
          "Create engaging motion graphics",
          "Design animations for digital platforms",
          "Collaborate with creative and product teams",
          "Test and iterate on designs",
          "Ensure brand consistency",
        ],
        whoYouAre: [
          "Expert in After Effects and Premiere",
          "Creative with a strong design sense",
          "Detail-oriented and organized",
          "Collaborative and communicative",
          "Passionate about motion design",
        ],
        niceToHaves: [
          "Experience with 3D animation",
          "Knowledge of UI/UX design",
          "Fluency in Japanese",
        ],
        benefits: [
          {
            title: "Health Insurance",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Stock Options",
            description: "Equity in a global leader.",
            icon: "bi-cash-coin",
          },
          {
            title: "Creative Tools",
            description: "Free Adobe Creative Cloud.",
            icon: "bi-laptop",
          },
          {
            title: "Team Events",
            description: "Global creative retreats.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 18,
        title: "Tech Recruiter",
        companyId: 18,
        location: "Dublin, Ireland",
        type: "Full-Time",
        description:
          "LinkedIn is seeking a Tech Recruiter to source top talent. You will manage hiring pipelines, conduct interviews, and build candidate relationships.",
        salary: "€70k-€90k",
        postedDate: "2025-04-15",
        deadline: "2025-06-15",
        applied: 6,
        capacity: 9,
        tags: ["HR"],
        responsibilities: [
          "Source and screen candidates",
          "Manage hiring pipelines",
          "Conduct interviews and assessments",
          "Collaborate with hiring managers",
          "Build candidate relationships",
        ],
        whoYouAre: [
          "Experienced in tech recruiting",
          "Strong interpersonal skills",
          "Organized with attention to detail",
          "Familiar with ATS systems",
          "Passionate about talent acquisition",
        ],
        niceToHaves: [
          "Experience with LinkedIn Recruiter",
          "Knowledge of tech roles",
          "Fluency in Irish Gaelic",
        ],
        benefits: [
          {
            title: "Health Benefits",
            description: "Comprehensive medical coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Flexible Work",
            description: "Hybrid work model.",
            icon: "bi-house-fill",
          },
          {
            title: "Equity Options",
            description: "Stock in a global platform.",
            icon: "bi-cash-coin",
          },
          {
            title: "Learning Budget",
            description: "Funds for professional growth.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 19,
        title: "Mobile Developer",
        companyId: 19,
        location: "Oslo, Norway",
        type: "Full-Time",
        description:
          "Spotify is hiring a Mobile Developer to enhance our app. You will build features, optimize performance, and ensure a seamless user experience.",
        salary: "NOK 800k-NOK 1M",
        postedDate: "2025-04-01",
        deadline: "2025-05-31",
        applied: 5,
        capacity: 10,
        tags: ["Engineering"],
        responsibilities: [
          "Develop and maintain mobile apps",
          "Optimize app performance",
          "Collaborate with designers and backend teams",
          "Write clean, testable code",
          "Participate in code reviews",
        ],
        whoYouAre: [
          "Proficient in Swift or Kotlin",
          "Experienced with mobile frameworks",
          "Detail-oriented with a focus on quality",
          "Collaborative and communicative",
          "Passionate about music tech",
        ],
        niceToHaves: [
          "Experience with React Native",
          "Knowledge of audio streaming",
          "Fluency in Norwegian",
        ],
        benefits: [
          {
            title: "Health Benefits",
            description: "Comprehensive medical plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Stock Options",
            description: "Equity in a global leader.",
            icon: "bi-cash-coin",
          },
          {
            title: "Music Access",
            description: "Free Spotify Premium.",
            icon: "bi-music-note",
          },
          {
            title: "Team Retreats",
            description: "Global team gatherings.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 20,
        title: "AI Research Intern",
        companyId: 20,
        location: "London, UK",
        type: "Internship",
        description:
          "DeepMind is seeking an AI Research Intern to contribute to cutting-edge projects. You will assist in experiments, analyze data, and support research efforts.",
        salary: "£25k-£30k (pro-rated)",
        postedDate: "2025-04-10",
        deadline: "2025-05-10",
        applied: 10,
        capacity: 15,
        tags: ["Internship", "AI"],
        responsibilities: [
          "Assist in AI research experiments",
          "Analyze and process datasets",
          "Collaborate with research teams",
          "Document findings and methodologies",
          "Stay updated on AI advancements",
        ],
        whoYouAre: [
          "Pursuing a degree in AI or related field",
          "Familiar with Python and ML frameworks",
          "Analytical with strong problem-solving skills",
          "Eager to learn and contribute",
          "Passionate about AI research",
        ],
        niceToHaves: [
          "Experience with TensorFlow or PyTorch",
          "Knowledge of reinforcement learning",
          "Published research papers",
        ],
        benefits: [
          {
            title: "Mentorship",
            description: "Guidance from top AI researchers.",
            icon: "bi-mortarboard-fill",
          },
          {
            title: "Health Coverage",
            description: "Medical plans for interns.",
            icon: "bi-heart-fill",
          },
          {
            title: "Networking",
            description: "Access to AI community events.",
            icon: "bi-people-fill",
          },
          {
            title: "Flexible Hours",
            description: "Work around your studies.",
            icon: "bi-clock-fill",
          },
        ],
      },
      {
        id: 21,
        title: "Email Marketing Manager",
        companyId: 8,
        location: "San Francisco, CA",
        type: "Full-Time",
        description:
          "Figma is seeking a mid-level Email Marketing Manager to join our team. You will design and execute email campaigns to engage our user base and drive product adoption.",
        salary: "$80k-$100k",
        postedDate: "2025-03-15",
        deadline: "2025-06-劳动",
        applied: 12,
        capacity: 20,
        tags: ["Marketing"],
        responsibilities: [
          "Develop and manage email marketing campaigns",
          "Segment audiences for targeted outreach",
          "Analyze campaign performance metrics",
          "Collaborate with design and product teams",
          "Optimize email content for engagement",
        ],
        whoYouAre: [
          "Experienced in email marketing platforms",
          "Data-driven with strong analytical skills",
          "Creative in crafting compelling content",
          "Organized and detail-oriented",
          "Team player with excellent communication",
        ],
        niceToHaves: [
          "Experience with Figma or design tools",
          "Knowledge of HTML/CSS for email templates",
          "Familiarity with CRM systems",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Comprehensive medical, dental, and vision plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Stock Options",
            description: "Equity in a fast-growing company.",
            icon: "bi-graph-up",
          },
          {
            title: "Remote Work",
            description: "Flexible remote work options.",
            icon: "bi-house-fill",
          },
          {
            title: "Wellness Stipend",
            description: "Monthly allowance for fitness and wellness.",
            icon: "bi-bicycle",
          },
        ],
      },
      {
        id: 22,
        title: "Brand Designer",
        companyId: 2,
        location: "San Francisco, CA",
        type: "Full-Time",
        description:
          "Dropbox is looking for a Brand Designer to help with our rebrand. You will create visual assets to strengthen our brand identity across all platforms.",
        salary: "$90k-$110k",
        postedDate: "2025-03-20",
        deadline: "2025-06-20",
        applied: 12,
        capacity: 15,
        tags: ["Design"],
        responsibilities: [
          "Design brand assets for digital and print",
          "Collaborate on rebranding initiatives",
          "Ensure brand consistency across channels",
          "Work with marketing to develop campaigns",
          "Present design concepts to stakeholders",
        ],
        whoYouAre: [
          "Skilled in visual design and typography",
          "Proficient in Adobe Creative Suite",
          "Creative with a strong portfolio",
          "Collaborative and open to feedback",
          "Able to manage multiple projects",
        ],
        niceToHaves: [
          "Experience with motion graphics",
          "Knowledge of UX/UI principles",
          "Familiarity with Dropbox products",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Full medical, dental, and vision coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Parental Leave",
            description: "Generous paid parental leave policy.",
            icon: "bi-person-fill",
          },
          {
            title: "Learning Budget",
            description: "Annual stipend for professional development.",
            icon: "bi-mortarboard-fill",
          },
          {
            title: "Team Events",
            description: "Regular team-building activities.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 23,
        title: "Email Marketing Manager",
        companyId: 21,
        location: "San Francisco, CA",
        type: "Full-Time",
        description:
          "Webflow is seeking a mid-level Email Marketing Manager to join our team. You will craft email strategies to nurture leads and enhance customer engagement.",
        salary: "$85k-$105k",
        postedDate: "2025-04-01",
        deadline: "2025-07-01",
        applied: 11,
        capacity: 18,
        tags: ["Marketing"],
        responsibilities: [
          "Create and execute email marketing plans",
          "Optimize email funnels for conversions",
          "Monitor and report on campaign performance",
          "Collaborate with content creators",
          "Test and refine email strategies",
        ],
        whoYouAre: [
          "Experienced in email automation tools",
          "Analytical with a focus on metrics",
          "Creative in developing engaging copy",
          "Organized and able to meet deadlines",
          "Collaborative with strong communication",
        ],
        niceToHaves: [
          "Experience with Webflow or web design",
          "Knowledge of A/B testing",
          "Familiarity with customer journey mapping",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Comprehensive health and wellness plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Equity Options",
            description: "Stock options for long-term growth.",
            icon: "bi-graph-up",
          },
          {
            title: "Flexible Work",
            description: "Remote-first with flexible hours.",
            icon: "bi-house-fill",
          },
          {
            title: "Growth Budget",
            description: "Support for continuous learning.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 24,
        title: "Visual Designer",
        companyId: 19,
        location: "New York, NY",
        type: "Full-Time",
        description:
          "Spotify is looking for a Visual Designer to join our team. You will create compelling visuals to enhance our user experience and brand presence.",
        salary: "$95k-$115k",
        postedDate: "2025-05-18",
        deadline: "2025-07-05",
        applied: 15,
        capacity: 25,
        tags: ["Design"],
        responsibilities: [
          "Design visuals for digital platforms",
          "Collaborate on user interface projects",
          "Maintain brand consistency",
          "Create assets for marketing campaigns",
          "Iterate based on user feedback",
        ],
        whoYouAre: [
          "Proficient in design software",
          "Creative with a strong aesthetic sense",
          "Experienced in UI/UX design",
          "Collaborative and open to iteration",
          "Able to work under tight deadlines",
        ],
        niceToHaves: [
          "Experience with animation tools",
          "Knowledge of music industry trends",
          "Familiarity with Spotify’s design system",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Full medical and mental health support.",
            icon: "bi-heart-fill",
          },
          {
            title: "Music Perks",
            description: "Free Spotify Premium subscription.",
            icon: "bi-music-note",
          },
          {
            title: "Flexible PTO",
            description: "Generous paid time off policy.",
            icon: "bi-calendar-fill",
          },
          {
            title: "Global Teams",
            description: "Work with diverse, global teams.",
            icon: "bi-globe",
          },
        ],
      },
      {
        id: 25,
        title: "Product Designer",
        companyId: 22,
        location: "Remote",
        type: "Full-Time",
        description:
          "Shopify is seeking a Product Designer to join our team. You will design intuitive interfaces to empower merchants on our platform.",
        salary: "$100k-$120k",
        postedDate: "2025-04-10",
        deadline: "2025-07-10",
        applied: 20,
        capacity: 30,
        tags: ["Design"],
        responsibilities: [
          "Design user-friendly product interfaces",
          "Conduct user research and testing",
          "Collaborate with developers and product managers",
          "Create wireframes and prototypes",
          "Iterate based on feedback and data",
        ],
        whoYouAre: [
          "Skilled in UX/UI design tools",
          "Empathetic to user needs",
          "Experienced in product design",
          "Collaborative with strong communication",
          "Able to balance creativity and functionality",
        ],
        niceToHaves: [
          "Experience with e-commerce platforms",
          "Knowledge of front-end development",
          "Familiarity with Shopify’s ecosystem",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Comprehensive health and dental plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Remote Work",
            description: "Fully remote with flexible hours.",
            icon: "bi-house-fill",
          },
          {
            title: "Equity Options",
            description: "Stock options for all employees.",
            icon: "bi-graph-up",
          },
          {
            title: "Learning Support",
            description: "Access to courses and conferences.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
      {
        id: 26,
        title: "Lead Designer",
        companyId: 23,
        location: "Remote",
        companyLogo:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEX/q+fYe72zSJS3T5m4UJq1TJfkisr/r+v/sezafsD6peHBXaSyR5T/rOjTdbj/renGY6nnjs3fhMTwmdf0ntv/ruq/WqLPcLTslNO8VZ7La69lEsuzAAABPklEQVR4AWWRB5aFMAhFI4Ehk2rU6Nf9L3TANt/js+Klay51YBGRfvi03S/hDdkHEBo7p1biDHhDtbsoFDqJLakXdkMVV6VxYDciIVprHnQEja1Z61uazENtp0R6m30xraS7amE3KJCwuOj37uPZOWbHbap5PRl+WN0JgObQ92EFebO4i3wzqt1xFx5BWpEy7/ByPgDEvv4KjT4pXGZNp2ekkKtxrUlJ6lghu+LHj2jyze2tN+2YGrdjhFRE6R6pKNx6BPNScr7XBcn1QjxucPT4gm7qIx2E4Jm2FF35kZIWX54/ZSVFsG4WaeNHyiFaRXN1I6GdvyEvoJWwckleXql8sU0ZLElnb/IeTfpnpCmrOyz18xfkDNrk1E5ztQjTCXlQhtr8C5ZJmb3ZI20TR/E82bOh1hEiVb7ZMUozf5iDED8WsD32AAAAAElFTkSuQmCC",
        type: "Full-Time",
        description:
          "Dribbble is looking for a Lead Designer to join our team. You will oversee design projects and mentor a team of designers to elevate our platform’s creative direction.",
        salary: "$110k-$130k",
        postedDate: "2025-05-17",
        deadline: "2025-07-15",
        applied: 11,
        capacity: 20,
        tags: ["Design", "Leadership"],
        responsibilities: [
          "Lead design strategy and execution",
          "Mentor and guide junior designers",
          "Collaborate with product and engineering teams",
          "Ensure high-quality visual output",
          "Drive creative innovation",
        ],
        whoYouAre: [
          "Experienced in leading design teams",
          "Skilled in UI/UX and visual design",
          "Strategic thinker with a creative vision",
          "Strong communicator and mentor",
          "Able to manage complex projects",
        ],
        niceToHaves: [
          "Experience with community-driven platforms",
          "Knowledge of design systems",
          "Familiarity with Dribbble’s community",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Full medical and wellness coverage.",
            icon: "bi-heart-fill",
          },
          {
            title: "Remote Work",
            description: "Fully remote with flexible scheduling.",
            icon: "bi-house-fill",
          },
          {
            title: "Creative Stipend",
            description: "Budget for design tools and resources.",
            icon: "bi-palette-fill",
          },
          {
            title: "Team Retreats",
            description: "Annual retreats for collaboration.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 27,
        title: "Brand Strategist",
        companyId: 24,
        location: "New York, NY",
        companyLogo:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEUFWP8AVv8ATP8ASv8AUf+lt/+ywf9lhf8ARv8AU/8AQP/y9f////91kv/q8P8ARP/S2v9ujf/l7P8ASP8yZv8ATv+5xv9nh//M1f+Spv/BzP/Y3/+4xP+ZrP+su/8AJv8AN/8APf/f5v8AL/8oX/88af9Qd/+Kof8IPKxZAAAAvUlEQVR4Ac3RRQKDMAAAwZLgLO5ab///w7qgZxZnLpHNcspsa0UhHwl1CqWmP9IM8/5hPfpD2+GVLlX38fT8P/QIQteNIFYUVUnSB/1h5qdmDqq6KYDS76Mt0oratqBuoBX/yCMnjjuq7S6BHkZZljkQR9RVlYGh/mG2l7ENbYQXRdEhynvoq+rRoykoj/bxdB5OJdShzME4lSDHi1Cbfseji/pF2WWPOuM+vfjcdldVnVl4KxXp8patFhe6ATwRD2y5uYPGAAAAAElFTkSuQmCC",
        type: "Full-Time",
        description:
          "Behance is seeking a Brand Strategist to join our team. You will develop strategies to elevate our brand and engage our creative community.",
        salary: "$85k-$105k",
        postedDate: "2025-04-20",
        deadline: "2025-05-20",
        applied: 12,
        capacity: 15,
        tags: ["Marketing"],
        responsibilities: [
          "Develop brand positioning and messaging",
          "Analyze market trends and competitors",
          "Collaborate on marketing campaigns",
          "Engage with creative community",
          "Measure brand performance metrics",
        ],
        whoYouAre: [
          "Strategic thinker with marketing experience",
          "Creative in crafting brand stories",
          "Analytical with a focus on data",
          "Strong communicator and collaborator",
          "Passionate about creative communities",
        ],
        niceToHaves: [
          "Experience with creative platforms",
          "Knowledge of social media strategy",
          "Familiarity with Behance’s community",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Comprehensive medical and dental plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Flexible Hours",
            description: "Flexible scheduling for work-life balance.",
            icon: "bi-clock-fill",
          },
          {
            title: "Creative Budget",
            description: "Support for creative tools and resources.",
            icon: "bi-palette-fill",
          },
          {
            title: "Community Events",
            description: "Access to exclusive creative events.",
            icon: "bi-people-fill",
          },
        ],
      },
      {
        id: 28,
        title: "Data Analyst",
        companyId: 25,
        location: "San Francisco, CA",
        companyLogo:
          "data:image/png;base64,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",
        type: "Full-Time",
        description:
          "Twitter is looking for a Data Analyst to join our team. You will analyze user data to provide insights that drive platform improvements and engagement.",
        salary: "$90k-$110k",
        postedDate: "2025-05-17",
        deadline: "2025-07-25",
        applied: 18,
        capacity: 25,
        tags: ["Technology"],
        responsibilities: [
          "Analyze user behavior and platform metrics",
          "Develop reports and visualizations",
          "Collaborate with product and engineering teams",
          "Identify trends to inform strategy",
          "Ensure data accuracy and integrity",
        ],
        whoYouAre: [
          "Proficient in SQL and data tools",
          "Analytical with strong problem-solving skills",
          "Experienced in data visualization",
          "Detail-oriented and organized",
          "Able to communicate insights clearly",
        ],
        niceToHaves: [
          "Experience with Python or R",
          "Knowledge of social media analytics",
          "Familiarity with Twitter’s platform",
        ],
        benefits: [
          {
            title: "Health Coverage",
            description: "Comprehensive medical and wellness plans.",
            icon: "bi-heart-fill",
          },
          {
            title: "Stock Options",
            description: "Equity in a dynamic company.",
            icon: "bi-graph-up",
          },
          {
            title: "Flexible Work",
            description: "Hybrid work options with flexibility.",
            icon: "bi-house-fill",
          },
          {
            title: "Learning Stipend",
            description: "Support for professional growth.",
            icon: "bi-mortarboard-fill",
          },
        ],
      },
    ];
  },

  async fetchFilterOptions() {
    // Simulate network delay (0.5-1.5 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );

    // Simulate occasional API failure (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Failed to fetch filter options from server");
    }

    return {
      employmentTypes: [
        { id: "full-time", label: "Full-time", count: 3 },
        { id: "part-time", label: "Part-Time", count: 5 },
        { id: "internship", label: "Internship", count: 24 },
      ],
      categories: [
        { id: "design", label: "Design", count: 24 },
        { id: "sales", label: "Sales", count: 3 },
        { id: "marketing", label: "Marketing", count: 3 },
        { id: "business", label: "Business", count: 3 },
        { id: "hr", label: "Human Resource", count: 6 },
        { id: "finance", label: "Finance", count: 4 },
        { id: "engineering", label: "Engineering", count: 4 },
        { id: "technology", label: "Technology", count: 5 },
      ],
      jobLevels: [
        { id: "entry", label: "Entry Level", count: 57 },
        { id: "junior", label: "Junior", count: 3 },
        { id: "senior", label: "Senior Level", count: 5 },
        { id: "manager", label: "Manager", count: 12 },
      ],
      salaryRanges: [
        { id: "range1", label: "$700 - $1000", count: 4 },
        { id: "range2", label: "$100 - $1500", count: 6 },
        { id: "range3", label: "$1500 - $2000", count: 10 },
        { id: "range4", label: "$3000 or above", count: 4 },
      ],
    };
  },
};

export const useJobStore = defineStore("jobStore", () => {
  // State
  const searchQuery = ref({ keyword: "", location: "" });
  const selectedFilters = ref({
    employmentTypes: [],
    categories: [],
    jobLevels: [],
    salaryRanges: [],
  });
  const highDemandJobs = ref([]);
  const latestJobs = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = ref(6);
  const jobs = ref([]);
  const employmentTypes = ref([]);
  const categories = ref([]);
  const jobLevels = ref([]);
  const salaryRanges = ref([]);
  const isLoading = ref(false);
  const error = ref(false);

  

  // Computed properties
  const totalJobs = computed(() => applyFilters(jobs.value).length);
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalJobs.value / itemsPerPage.value))
  );
  const hasFilters = computed(() => {
    const { employmentTypes, categories, jobLevels, salaryRanges } =
      selectedFilters.value;
    return (
      employmentTypes.length > 0 ||
      categories.length > 0 ||
      jobLevels.length > 0 ||
      salaryRanges.length > 0
    );
  });
  const filteredJobs = computed(() => {
    const results = applyFilters(jobs.value);
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return results.slice(start, end);
  });

  // Reusable filter function
  function applyFilters(jobs) {
    let results = [...jobs];

    const keyword = searchQuery.value.keyword?.toLowerCase().trim() || "";
    const location = searchQuery.value.location?.toLowerCase().trim() || "";
    const { employmentTypes, categories, jobLevels, salaryRanges } =
      selectedFilters.value;

    // Apply search filters
    if (keyword || location) {
      results = results.filter((job) => {
        const matchesKeyword = keyword
          ? job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.tags.some((tag) => tag.toLowerCase().includes(keyword))
          : true;
        const matchesLocation = location
          ? job.location
              .split(",")[0]
              .trim()
              .toLowerCase()
              .replace(/\s+/g, "-") === location
          : true;
        return matchesKeyword && matchesLocation;
      });
    }

    // Apply sidebar filters

    if (employmentTypes.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => employmentTypes.includes(tag.toLowerCase()))
      );
    }
    if (categories.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => categories.includes(tag.toLowerCase()))
      );
    }
    if (jobLevels.length > 0) {
      results = results.filter((job) =>
        job.tags.some((tag) => jobLevels.includes(tag.toLowerCase()))
      );
    }
    if (salaryRanges.length > 0) {
      // Placeholder: Implement salary range filtering if job data includes salary
    }

    return results;
  }

  // Actions

  async function fetchJobs() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await mockApi.fetchJobs();
      jobs.value = data;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  // Getters (as functions)
  const getJobById = (id) => {
    return jobs.value.find((job) => job.id === id);
  };
  const getAllJobs = () => {
    return jobs.value;
  };

  async function fetchFilterOptions() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await mockApi.fetchFilterOptions();
      employmentTypes.value = data.employmentTypes;
      categories.value = data.categories;
      jobLevels.value = data.jobLevels;
      salaryRanges.value = data.salaryRanges;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchHighDemandHighSalaryJobs() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await mockApi.fetchJobs();
      jobs.value = data;
      console.log("Fetched jobs for high demand and high salary:", jobs.value);

      highDemandJobs.value = data.filter((job) => {
        const isHighDemand = job.applied > 5;
        console.log(
          `Job ${job.id}: applied=${job.applied}, isHighDemand=${isHighDemand}`
        );
        return isHighDemand;
      });
      console.log("Fetch completed, highDemandJobs:", highDemandJobs.value);
    } catch (err) {
      error.value = err.message || "Failed to fetch jobs";
      console.error("Fetch error:", error.value);
    } finally {
      isLoading.value = false; // Reset loading state
      console.log("Loading state set to false");
      console.log("High demand jobs:", highDemandJobs.value);
    }
  }

  async function fetchLatestJobs() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await mockApi.fetchJobs();
      jobs.value = data;

      // Sort jobs by postedDate in descending order (newest first)
      const sortedJobs = [...data].sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );

      // Get the most recent jobs (e.g., last 5 or 10)
      latestJobs.value = sortedJobs.slice(0, 4); // Adjust the number as needed

      console.log("Fetch completed, latestJobs:", latestJobs.value);
    } catch (err) {
      error.value = err.message || "Failed to fetch jobs";
      console.error("Fetch error:", error.value);
    } finally {
      isLoading.value = false;
      console.log("Loading state set to false");
    }
  }

  function setSearchQuery(queryObj) {
    searchQuery.value = queryObj;
    currentPage.value = 1;
  }

  function clearSearch() {
    searchQuery.value = { keyword: "", location: "" };
    selectedFilters.value = {
      employmentTypes: [],
      categories: [],
      jobLevels: [],
      salaryRanges: [],
    };
    currentPage.value = 1;
  }

  function updateFilters(filterType, value) {
    selectedFilters.value = {
      ...selectedFilters.value,
      [filterType]: value,
    };
    currentPage.value = 1;
  }

  function updatePage(page) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updatePerPage(perPage) {
    itemsPerPage.value = perPage;
    currentPage.value = 1;
  }

  function updateUrl() {
    const url = new URL(window.location);
    if (searchQuery.value.keyword) {
      url.searchParams.set("keyword", searchQuery.value.keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    if (searchQuery.value.location) {
      url.searchParams.set("location", searchQuery.value.location);
    } else {
      url.searchParams.delete("location");
    }
    window.history.pushState({}, "", url);
  }

  function initializeFromUrl() {
    const url = new URL(window.location);
    searchQuery.value = {
      keyword: url.searchParams.get("keyword") || "",
      location: url.searchParams.get("location") || "",
    };
  }

  return {
    highDemandJobs,
    searchQuery,
    selectedFilters,
    employmentTypes,
    categories,
    jobLevels,
    salaryRanges,
    jobs,
    currentPage,
    itemsPerPage,
    totalJobs,
    totalPages,
    hasFilters,
    filteredJobs,
    isLoading,
    error,
    latestJobs,
    fetchJobs,
    fetchFilterOptions,
    setSearchQuery,
    clearSearch,
    updateFilters,
    updatePage,
    updatePerPage,
    updateUrl,
    initializeFromUrl,
    getJobById,
    getAllJobs,
    fetchHighDemandHighSalaryJobs,
    fetchLatestJobs,
  };
});
