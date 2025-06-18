import { defineStore } from "pinia";

export const useInterviewStore = defineStore("companyInterviewStore", {
  state: () => ({
    interviews: [
      {
        id: 1,
        title: "Technical Interview with John Doe",
        date: "2021-11-10",
        time: "10:00 AM",
        type: "technical",
        duration: "1.5 hours",
      },
      {
        id: 2,
        title: "HR Interview with Jane Smith",
        date: "2021-11-12",
        time: "2:00 PM",
        type: "hr",
        duration: "1 hour",
      },
      {
        id: 3,
        title: "Final Interview",
        date: "2021-11-15",
        time: "11:00 AM",
        type: "final",
        duration: "2 hours",
      },
      {
        id: 4,
        title: "Team Meeting",
        date: "2021-11-18",
        time: "9:00 AM",
        type: "meeting",
        duration: "30 minutes",
      },
    ],
  }),
  actions: {
    addInterview(interview) {
      this.interviews.push(interview);
    },
    removeInterview(id) {
      this.interviews = this.interviews.filter((i) => i.id !== id);
    },
    updateInterview(updatedInterview) {
      const index = this.interviews.findIndex(
        (i) => i.id === updatedInterview.id
      );
      if (index !== -1) {
        this.interviews[index] = updatedInterview;
      }
    },
  },
});
