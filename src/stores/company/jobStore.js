import { defineStore } from "pinia";
import { ref } from "vue";

export const useJobStore = defineStore("jobStore", () => {
  const jobs = ref({
    1: {
      id: 1,
      title: "Social Media Assistant",
      department: "Design",
      type: "Full-Time",
      applicants: 19,
      capacity: 20,
      status: "Live",
      datePosted: "20 May 2020",
      dueDate: "24 May 2020",
      salary: "$75k-$85k USD",
      description:
        "Stripe is looking for Social Media Marketing expert to help manage our online networks. As a Social Media Assistant, you will be responsible for developing and implementing our Social Media strategy in order to increase our online presence and improve our marketing and sales efforts.",
      responsibilities: [
        "Community engagement to ensure that is supported and actively represented online",
        "Focus on social media content development and publication",
        "Marketing and strategy support",
        "Stay up to date with the latest social media best practices and technologies",
      ],
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "2+ years of experience in social media marketing",
        "Excellent written and verbal communication skills",
        "Strong analytical and project management skills",
      ],
      perks: [
        "Full Healthcare",
        "Unlimited Vacation",
        "Skill Development",
        "Team Summits",
      ],
      benefits: [
        "Health Insurance",
        "Dental Insurance",
        "Paid Time Off",
        "Retirement Plan",
      ],
    },
  });

  const recentApplicants = ref([
    {
      id: 1,
      name: "Jake Gyll",
      avatar: "/placeholder.svg?height=40&width=40",
      appliedDate: "2 days ago",
      stage: "In Review",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      avatar: "/placeholder.svg?height=40&width=40",
      appliedDate: "3 days ago",
      stage: "Shortlisted",
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      avatar: "/placeholder.svg?height=40&width=40",
      appliedDate: "1 week ago",
      stage: "Interview",
    },
  ]);

  const getJobById = (id) => jobs.value[id] || null;

  return {
    jobs,
    recentApplicants,
    getJobById,
  };
});
