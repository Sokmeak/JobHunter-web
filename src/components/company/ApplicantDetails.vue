<template>
  <div class="applicant-details">
    <h1>Applicant Details</h1>
    <button @click="goBackToApplicants">Back to Applicants</button>

    <div class="applicant-info">
      <img :src="applicant.avatar" alt="Applicant Avatar" />
      <h2>{{ applicant.name }}</h2>
      <p>Job Title: {{ applicant.jobTitle }}</p>
      <p>Department: {{ applicant.department }}</p>
      <p>Stage: {{ applicant.stage }}</p>
    </div>

    <div class="contact-info">
      <h3>Contact Information</h3>
      <p>Email: {{ applicant.email }}</p>
      <p>Phone: {{ applicant.phone }}</p>
      <p>Location: {{ applicant.location }}</p>
    </div>

    <div class="application-info">
      <h3>Application Information</h3>
      <p>Applied Date: {{ applicant.appliedDate }}</p>
      <p>Score: {{ applicant.score }}</p>
      <p>Resume: <a :href="applicant.resume" target="_blank">View Resume</a></p>
      <p>Cover Letter: {{ applicant.coverLetter }}</p>
    </div>

    <div class="experience-info">
      <h3>Experience & Education</h3>
      <p>Experience: {{ applicant.experience }}</p>
      <p>Education: {{ applicant.education }}</p>
      <p>Skills: {{ applicant.skills.join(", ") }}</p>
      <p>
        Portfolio:
        <a :href="applicant.portfolio" target="_blank">View Portfolio</a>
      </p>
      <p>
        LinkedIn:
        <a :href="applicant.linkedin" target="_blank">View LinkedIn</a>
      </p>
    </div>

    <div class="salary-info">
      <h3>Salary Expectations & Availability</h3>
      <p>Expected Salary: {{ applicant.expectedSalary }}</p>
      <p>Availability: {{ applicant.availability }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const navigate = inject("navigate");

const applicant = ref({
  id: 1,
  name: "Jake Gyll",
  email: "jake.gyll@email.com",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  jobTitle: "Social Media Assistant",
  department: "Marketing",
  stage: "In Review",
  appliedDate: "13 July, 2021",
  score: "4.0",
  avatar: "/placeholder.svg?height=120&width=120&query=professional+man+jake",
  resume: "Jake_Gyll_Resume.pdf",
  coverLetter:
    "I am excited to apply for the Social Media Assistant position...",
  experience: "3 years",
  education: "Bachelor of Marketing, NYU",
  skills: [
    "Social Media Marketing",
    "Content Creation",
    "Analytics",
    "Copywriting",
  ],
  portfolio: "https://jakegyll.portfolio.com",
  linkedin: "https://linkedin.com/in/jakegyll",
  expectedSalary: "$65,000 - $75,000",
  availability: "Immediate",
});

const goBackToApplicants = () => {
  if (navigate) {
    navigate("all-applicants");
  }
};
</script>

<style scoped>
.applicant-details {
  padding: 20px;
  font-family: sans-serif;
}

.applicant-info,
.contact-info,
.application-info,
.experience-info,
.salary-info {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.applicant-info img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
}

h1,
h2,
h3 {
  margin-bottom: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #0056b3;
}
</style>
