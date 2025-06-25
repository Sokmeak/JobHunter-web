import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { parse, isWithinInterval } from 'date-fns';

// Ensure the API base URL is set in your environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const subPrefixJobSeeker = 'job-seekers';

// Mock API functions
const mockApi = {
  async getApplications() {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Raw /applications response:', response.data);

    return response.data; // Returns array of applications
  },
  async getApplicationById(id) {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.get(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns single application
  },
  async updateApplication(id, updatedApplication) {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No authentication token found');

    const response = await axios.patch(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      updatedApplication,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns updated application
  },
  async deleteApplication(id) {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No authentication token found');

    await axios.delete(
      `${API_BASE_URL}/${subPrefixJobSeeker}/applications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

// Pinia store for applications
export const useApplicationStore = defineStore('application', () => {
  // Reactive state
  const applications = ref([]);
  const selectedApplication = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const dateRange = ref({
    start: '2025-05-15',
    end: '2025-05-30',
  });

  // Function to update date range
  const updateDateRange = (newDateRange) => {
    dateRange.value = { ...newDateRange };
  };

  // Function to get applications within date range
  const getApplicationsInDateRange = (startDate, endDate) => {
    try {
      const start = parse(startDate, 'yyyy-MM-dd', new Date());
      const end = parse(endDate, 'yyyy-MM-dd', new Date());
      return applications.value.filter((app) => {
        const appDate = parse(app.dateApplied, 'yyyy-MM-dd', new Date());
        return isWithinInterval(appDate, { start, end });
      });
    } catch (err) {
      console.error('Error filtering applications by date range:', err);
      return [];
    }
  };

  // Utility functions for data manipulation
  const getRecentApplications = (maxItems = 5) => {
    return applications.value
      .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
      .slice(0, maxItems);
  };

  const getApplicationsByStatus = (status) => {
    if (status === 'all') return applications.value;
    const statusMap = {
      'in-review': 'In Review',
      interviewing: 'Interviewing',
      assessment: 'Assessment',
      offered: 'Offered',
      hired: 'Hired',
      unsuitable: 'Unsuitable',
      declined: 'Declined',
      shortlisted: 'Shortlisted',
      interviewed: 'Interviewed',
    };
    return applications.value.filter(
      (app) =>
        app.status === statusMap[status] ||
        app.status?.toLowerCase() === status.toLowerCase()
    );
  };

  const getStatusCounts = () => {
    const filteredApplications = getApplicationsInDateRange(
      dateRange.value.start,
      dateRange.value.end
    );
    const total = filteredApplications.length;
    const counts = {
      all: total,
      hired: 0,
      interviewed: 0,
      interviewing: 0,
      inReview: 0,
      assessment: 0,
      offered: 0,
      unsuitable: 0,
      declined: 0,
      shortlisted: 0,
      percentage: {
        hired: 0,
        interviewed: 0,
        interviewing: 0,
        inReview: 0,
        assessment: 0,
        offered: 0,
        unsuitable: 0,
        declined: 0,
        shortlisted: 0,
      },
    };

    filteredApplications.forEach((app) => {
      const status = app.status?.toLowerCase() || '';
      if (status === 'hired') counts.hired += 1;
      else if (status === 'interviewed') counts.interviewed += 1;
      else if (status === 'interviewing') counts.interviewing += 1;
      else if (status === 'in review') counts.inReview += 1;
      else if (status === 'assessment') counts.assessment += 1;
      else if (status === 'offered') counts.offered += 1;
      else if (status === 'unsuitable') counts.unsuitable += 1;
      else if (status === 'declined') counts.declined += 1;
      else if (status === 'shortlisted') counts.shortlisted += 1;
    });

    if (total > 0) {
      counts.percentage.hired = Math.round((counts.hired / total) * 100);
      counts.percentage.interviewed = Math.round((counts.interviewed / total) * 100);
      counts.percentage.interviewing = Math.round((counts.interviewing / total) * 100);
      counts.percentage.inReview = Math.round((counts.inReview / total) * 100);
      counts.percentage.assessment = Math.round((counts.assessment / total) * 100);
      counts.percentage.offered = Math.round((counts.offered / total) * 100);
      counts.percentage.unsuitable = Math.round((counts.unsuitable / total) * 100);
      counts.percentage.declined = Math.round((counts.declined / total) * 100);
      counts.percentage.shortlisted = Math.round((counts.shortlisted / total) * 100);
    }

    return counts;
  };

  const searchApplications = (query) => {
    if (!query.trim()) return applications.value;
    const searchTerm = query.toLowerCase();
    return applications.value.filter(
      (app) =>
        app.companyName?.toLowerCase().includes(searchTerm) ||
        app.role?.toLowerCase().includes(searchTerm) ||
        app.jobTitle?.toLowerCase().includes(searchTerm)
    );
  };

  // Fetch all applications
  const fetchApplications = async () => {
    loading.value = true;
    error.value = null;
    try {
      const apps = await mockApi.getApplications();
      applications.value = Array.isArray(apps)
        ? apps
        : [
            {
              id: 1,
              companyName: 'Nomad',
              jobTitle: 'Social Media Assistant',
              dateApplied: '2025-05-24',
              status: 'Interviewing',
              recruiter: { name: 'Sarah Johnson', role: 'HR Manager', email: 'sarah.johnson@nomad.com' },
              timeline: [
                { title: 'Application Submitted', date: '2025-05-24', completed: true },
                { title: 'Phone Screening', date: '2025-05-28', completed: false },
              ],
            },
          ];
      console.log('Normalized applications:', applications.value);
    } catch (err) {
      error.value = err.message || 'Failed to fetch applications';
      console.error('Fetch applications error:', err);
      applications.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single application by ID
  const fetchApplication = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const app = await mockApi.getApplicationById(id);
      selectedApplication.value = app;
    } catch (err) {
      error.value = err.message || 'Failed to fetch application';
      console.error('Error fetching application:', err);
      selectedApplication.value = null;
    } finally {
      loading.value = false;
    }
  };

  // Update an application
  const updateApplication = async (id, updatedApplication) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedApp = await mockApi.updateApplication(id, updatedApplication);
      const index = applications.value.findIndex((app) => app.id === id);
      if (index !== -1) {
        applications.value[index] = updatedApp;
        if (selectedApplication.value && selectedApplication.value.id === id) {
          selectedApplication.value = updatedApp;
        }
      } else {
        throw new Error('Application not found');
      }
    } catch (err) {
      error.value = err.message || 'Failed to update application';
      console.error('Update application error:', err);
    } finally {
      loading.value = false;
    }
  };

  // Delete an application
  const deleteApplication = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await mockApi.deleteApplication(id);
      applications.value = applications.value.filter((app) => app.id !== id);
      if (selectedApplication.value && selectedApplication.value.id === id) {
        selectedApplication.value = null;
      }
    } catch (err) {
      error.value = err.message || 'Failed to delete application';
      console.error('Delete application error:', err);
    } finally {
      loading.value = false;
    }
  };

  // Return reactive state and methods
  return {
    applications,
    selectedApplication,
    loading,
    error,
    dateRange,
    updateDateRange,
    getApplicationsInDateRange,
    getRecentApplications,
    getApplicationsByStatus,
    getStatusCounts,
    searchApplications,
    fetchApplications,
    fetchApplication,
    updateApplication,
    deleteApplication,
  };
});