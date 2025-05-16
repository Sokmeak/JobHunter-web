// Simulated API service for job data

/**
 * Fetch a job by ID
 * @param {string} id - The job ID
 * @returns {Promise<Object>} - The job data
 */
export const fetchJobById = async (id) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock job data
  const jobs = {
    "job-1": {
      id: "job-1",
      title: "Social Media Assistant",
      company: "Stripe",
      location: "Paris, France",
      type: "Full-Time",
      companyLogo:
        "https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
      description:
        "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social-media channels, creating content, finding effective ways to engage the community and contribute ideas to engage our channels.",
      salary: "€70k-€85k USD",
      postedDate: "2023-07-01",
      deadline: "2023-07-31",
    },
    "job-2": {
      id: "job-2",
      title: "Brand Designer",
      company: "Nomad",
      location: "Remote",
      type: "Full-Time",
      companyLogo:
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
      description:
        "Nomad is looking for a Brand Designer to help shape our visual identity.",
      salary: "$85k-$110k USD",
      postedDate: "2023-06-15",
      deadline: "2023-08-15",
    },
  };

  // Return the job or throw an error if not found
  if (jobs[id]) {
    return jobs[id];
  } else {
    throw new Error(`Job with ID ${id} not found`);
  }
};

/**
 * Fetch similar jobs
 * @param {string} jobId - The current job ID to exclude
 * @param {number} limit - Maximum number of jobs to return
 * @returns {Promise<Array>} - Array of similar job data
 */
export const fetchSimilarJobs = async (jobId, limit = 4) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock similar jobs
  const similarJobs = [
    {
      id: "similar-1",
      title: "Social Media Assistant",
      company: "Nomad",
      location: "Paris, France",
      type: "Full-Time",
      categories: ["Marketing", "Design"],
      companyLogo: "N",
      logoColor: "bg-purple-subtle text-purple",
    },
    {
      id: "similar-2",
      title: "Social Media Assistant",
      company: "Netflix",
      location: "Paris, France",
      type: "Full-Time",
      categories: ["Marketing", "Design"],
      companyLogo: "N",
      logoColor: "bg-red-subtle text-red",
    },
    {
      id: "similar-3",
      title: "Brand Designer",
      company: "Dropbox",
      location: "San Francisco, USA",
      type: "Full-Time",
      categories: ["Marketing", "Design"],
      companyLogo: "D",
      logoColor: "bg-cyan-subtle text-cyan",
    },
    {
      id: "similar-4",
      title: "Brand Designer",
      company: "Maze",
      location: "San Francisco, USA",
      type: "Full-Time",
      categories: ["Marketing", "Design"],
      companyLogo: "M",
      logoColor: "bg-green-subtle text-green",
    },
  ];

  // Filter out the current job and limit the results
  return similarJobs.filter((job) => job.id !== jobId).slice(0, limit);
};
