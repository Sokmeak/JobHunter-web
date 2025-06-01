// stores/NotificationsStore.js
import { reactive, computed } from "vue";

// Shared store for notifications and interviews
export const notificationsStore = reactive({
  // Raw data
  interviews: [
    {
      id: 1,
      time: "10:30 AM",
      name: "Joe Bartmann",
      position: "HR Manager at Divvy",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      date: "2025-05-25",
      company: "Divvy",
      role: "Senior Frontend Developer",
      contactEmail: "joe.bartmann@divvy.com",
    },
    {
      id: 2,
      time: "2:00 PM",
      name: "Sarah Johnson",
      position: "Tech Lead at StartupCo",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      date: "2025-05-26",
      company: "StartupCo",
      role: "Full Stack Developer",
      contactEmail: "sarah.johnson@startupco.com",
    },
    {
      id: 3,
      time: "12:00 PM",
      name: "Jake Gyll",
      position: "Product Manager at Digital Ocean",
      avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
      date: "2025-07-20",
      company: "Digital Ocean",
      role: "Social Media Manager",
      contactEmail: "jakegyll@email.com",
    },
  ],

  notifications: [
    {
      id: 1,
      sender: {
        name: "Jan Mayer",
        avatar: "https://v0.dev/placeholder.svg?height=80&width=80",
      },
      text: "invited you to interview with Nomad",
      badge: "New",
      time: "12 mins ago",
      read: false,
      type: "simple",
    },
    {
      id: 2,
      sender: {
        name: "Jana Alicia",
        avatar: "https://v0.dev/placeholder.svg?height=80&width=80",
      },
      text: "from Udacity updated your job applications status",
      badge: "Shortlisted",
      time: "3 days ago",
      read: false,
      type: "simple",
    },
    {
      id: 3,
      sender: {
        name: "Ally Wales",
        avatar: "https://v0.dev/placeholder.svg?height=80&width=80",
      },
      text: "from Digital Ocean sent you an interview invitation",
      time: "14 July 2021 • 3:26 PM",
      read: false,
      type: "interview",
      interviewId: 3, // Links to interview with id 3
      interview: {
        title: "Interview - Jake Gyll",
        role: "Social Media Manager Role",
        date: "Mon, 20 July 2021",
        time: "12 PM - 12:30 PM",
        contact: {
          name: "Jake Gyll",
          email: "jakegyll@email.com",
          avatar: "https://v0.dev/placeholder.svg?height=50&width=50",
        },
      },
    },
  ],
});

// Computed properties
export const upcomingInterviews = computed(() => {
  const today = new Date();
  return notificationsStore.interviews
    .filter((interview) => new Date(interview.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
});

export const unreadNotifications = computed(() => {
  return notificationsStore.notifications.filter(
    (notification) => !notification.read
  );
});

export const unreadCount = computed(() => {
  return unreadNotifications.value.length;
});

// Actions
export const notificationsActions = {
  // Notification actions
  markAsRead(notificationId) {
    const notification = notificationsStore.notifications.find(
      (n) => n.id === notificationId
    );
    if (notification) {
      notification.read = true;
    }
  },

  markAllAsRead() {
    notificationsStore.notifications.forEach((notification) => {
      notification.read = true;
    });
  },

  addNotification(notification) {
    const newNotification = {
      id: Date.now(),
      read: false,
      time: "Just now",
      ...notification,
    };
    notificationsStore.notifications.unshift(newNotification);
  },

  // Interview actions
  addInterview(interview) {
    const newInterview = {
      id: Date.now(),
      ...interview,
    };
    notificationsStore.interviews.push(newInterview);

    // Automatically create a notification for the new interview
    this.addNotification({
      sender: {
        name: interview.name,
        avatar: interview.avatar,
      },
      text: `sent you an interview invitation for ${interview.role}`,
      type: "interview",
      interviewId: newInterview.id,
      interview: {
        title: `Interview - ${interview.role}`,
        role: interview.role,
        date: interview.date,
        time: interview.time,
        contact: {
          name: interview.name,
          email: interview.contactEmail,
          avatar: interview.avatar,
        },
      },
    });
  },

  updateInterview(interviewId, updates) {
    const interview = notificationsStore.interviews.find(
      (i) => i.id === interviewId
    );
    if (interview) {
      Object.assign(interview, updates);

      // Update related notification if exists
      const relatedNotification = notificationsStore.notifications.find(
        (n) => n.interviewId === interviewId
      );
      if (relatedNotification && relatedNotification.interview) {
        relatedNotification.interview = {
          ...relatedNotification.interview,
          title: `Interview - ${updates.role || interview.role}`,
          role: updates.role || interview.role,
          date: updates.date || interview.date,
          time: updates.time || interview.time,
          contact: {
            name: updates.name || interview.name,
            email: updates.contactEmail || interview.contactEmail,
            avatar: updates.avatar || interview.avatar,
          },
        };
      }
    }
  },

  deleteInterview(interviewId) {
    const index = notificationsStore.interviews.findIndex(
      (i) => i.id === interviewId
    );
    if (index !== -1) {
      notificationsStore.interviews.splice(index, 1);

      // Remove related notification
      const notificationIndex = notificationsStore.notifications.findIndex(
        (n) => n.interviewId === interviewId
      );
      if (notificationIndex !== -1) {
        notificationsStore.notifications.splice(notificationIndex, 1);
      }
    }
  },

  // Get specific interview by ID
  getInterviewById(interviewId) {
    return notificationsStore.interviews.find((i) => i.id === interviewId);
  },

  // Get notifications for a specific interview
  getNotificationsByInterviewId(interviewId) {
    return notificationsStore.notifications.filter(
      (n) => n.interviewId === interviewId
    );
  },
};

// Export everything for easy access
export default {
  store: notificationsStore,
  upcomingInterviews,
  unreadNotifications,
  unreadCount,
  actions: notificationsActions,
};
