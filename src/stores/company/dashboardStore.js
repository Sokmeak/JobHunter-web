import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore("dashboardStore", () => {
  const stats = ref({
    totalApplications: 1247,
    activeJobs: 23,
    interviewsScheduled: 45,
    interviewsToday: 8,
    hiredThisMonth: 12,
    hireRate: 15,
  });

  const recentApplications = ref([
    {
      id: 1,
      name: "Jake Gyll",
      email: "jake.gyll@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Social Media Assistant",
      department: "Marketing",
      appliedDate: "2 hours ago",
      status: "New",
    },
    {
      id: 2,
      name: "Guy Hawkins",
      email: "guy.hawkins@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Frontend Developer",
      department: "Engineering",
      appliedDate: "5 hours ago",
      status: "In Review",
    },
    {
      id: 3,
      name: "Cyndy Lillibridge",
      email: "cyndy.l@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "UX Designer",
      department: "Design",
      appliedDate: "1 day ago",
      status: "Shortlisted",
    },
    {
      id: 4,
      name: "Rodney Stratton",
      email: "rodney.s@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      position: "Product Manager",
      department: "Product",
      appliedDate: "2 days ago",
      status: "Interview",
    },
  ]);

  const upcomingInterviews = ref([
    {
      id: 1,
      candidateName: "Sarah Johnson",
      candidateAvatar: "/placeholder.svg?height=40&width=40",
      position: "Frontend Developer",
      date: "Today",
      time: "2:00 PM",
      type: "Video",
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      candidateAvatar: "/placeholder.svg?height=40&width=40",
      position: "UX Designer",
      date: "Tomorrow",
      time: "10:30 AM",
      type: "In-Person",
    },
    {
      id: 3,
      candidateName: "Emily Davis",
      candidateAvatar: "/placeholder.svg?height=40&width=40",
      position: "Product Manager",
      date: "Dec 18",
      time: "3:00 PM",
      type: "Phone",
    },
  ]);

  const recentActivity = ref([
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      description: "Jake Gyll applied for Social Media Assistant position",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "interview",
      title: "Interview Scheduled",
      description:
        "Interview scheduled with Sarah Johnson for Frontend Developer",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "job",
      title: "Job Posted",
      description: "Senior Backend Developer position was published",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "hire",
      title: "Candidate Hired",
      description: "Alex Thompson was hired for Marketing Manager position",
      time: "2 days ago",
    },
  ]);

  const getStatusBadgeClass = (status) => {
    const classes = {
      New: "badge bg-primary",
      "In Review": "badge bg-warning",
      Shortlisted: "badge bg-info",
      Interview: "badge bg-success",
      Rejected: "badge bg-danger",
    };
    return classes[status] || "badge bg-secondary";
  };

  const getInterviewTypeBadge = (type) => {
    const classes = {
      Video: "badge bg-primary",
      "In-Person": "badge bg-success",
      Phone: "badge bg-info",
    };
    return classes[type] || "badge bg-secondary";
  };

  const getActivityMarkerClass = (type) => {
    const classes = {
      application: "bg-primary",
      interview: "bg-success",
      job: "bg-info",
      hire: "bg-warning",
    };
    return classes[type] || "bg-secondary";
  };

  const getActivityIcon = (type) => {
    const icons = {
      application: "bi bi-person-plus",
      interview: "bi bi-calendar-check",
      job: "bi bi-briefcase",
      hire: "bi bi-trophy",
    };
    return icons[type] || "bi bi-circle";
  };

  return {
    stats,
    recentApplications,
    upcomingInterviews,
    recentActivity,
    getStatusBadgeClass,
    getInterviewTypeBadge,
    getActivityMarkerClass,
    getActivityIcon,
  };
});
