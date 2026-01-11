// Simulated API service for application status

/**
 * Submit a job application
 * @param {Object} applicationData - The application data
 * @returns {Promise<Object>} - The submission result
 */
export const submitJobApplication = async (applicationData) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Simulate successful submission (90% success rate)
  if (Math.random() > 0.1) {
    const applicationId = `APP-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      applicationId,
      status: "submitted",
      message: "Application submitted successfully",
    };
  } else {
    // Simulate error
    throw new Error("Failed to submit application. Please try again.");
  }
};

/**
 * Get application status
 * @param {string} applicationId - The application ID
 * @returns {Promise<Object>} - The application status
 */
export const getApplicationStatus = async (applicationId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock application statuses based on application ID
  const lastDigit = parseInt(applicationId.slice(-1));

  // Determine status based on last digit of application ID
  let status;
  if (lastDigit < 3) {
    status = "reviewing";
  } else if (lastDigit < 6) {
    status = "interview_scheduled";
  } else if (lastDigit < 9) {
    status = "decision_pending";
  } else {
    status = "hired";
  }

  return {
    applicationId,
    status,
    lastUpdated: new Date().toISOString(),
    nextSteps: getNextSteps(status),
  };
};

/**
 * Get next steps based on application status
 * @param {string} status - The application status
 * @returns {string} - The next steps message
 */
const getNextSteps = (status) => {
  switch (status) {
    case "reviewing":
      return "Our team is reviewing your application. We'll be in touch soon.";
    case "interview_scheduled":
      return "Prepare for your upcoming interview. Check your email for details.";
    case "decision_pending":
      return "We're finalizing our decision. You'll hear from us shortly.";
    case "hired":
      return "Congratulations! We'll be sending you an offer letter soon.";
    default:
      return "We'll update you on next steps soon.";
  }
};
