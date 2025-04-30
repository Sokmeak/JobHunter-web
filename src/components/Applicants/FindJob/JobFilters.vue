<template>
    <div class="job-filters">
      <div class="filter-section">
        <div class="filter-header" data-bs-toggle="collapse" data-bs-target="#employmentType">
          <h3 class="h6 mb-0">Type of Employment</h3>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div id="employmentType" class="collapse show">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="fullTime">
            <label class="form-check-label" for="fullTime">
              Full-time (3)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="partTime">
            <label class="form-check-label" for="partTime">
              Part-Time (5)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="remote">
            <label class="form-check-label" for="remote">
              Remote (2)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="internship">
            <label class="form-check-label" for="internship">
              Internship (24)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="contract">
            <label class="form-check-label" for="contract">
              Contract (3)
            </label>
          </div>
        </div>
      </div>
      
      <div class="filter-section">
        <div class="filter-header" data-bs-toggle="collapse" data-bs-target="#categories">
          <h3 class="h6 mb-0">Categories</h3>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div id="categories" class="collapse show">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="design">
            <label class="form-check-label" for="design">
              Design (24)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="sales">
            <label class="form-check-label" for="sales">
              Sales (3)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="marketing">
            <label class="form-check-label" for="marketing">
              Marketing (3)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="business">
            <label class="form-check-label" for="business">
              Business (3)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="hr">
            <label class="form-check-label" for="hr">
              Human Resource (6)
            </label>
          </div>
        </div>
      </div>
      
      <div class="filter-section">
        <div class="filter-header" data-bs-toggle="collapse" data-bs-target="#jobLevel">
          <h3 class="h6 mb-0">Job Level</h3>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div id="jobLevel" class="collapse show">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="entry">
            <label class="form-check-label" for="entry">
              Entry Level (57)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="mid">
            <label class="form-check-label" for="mid">
              Mid Level (3)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="senior">
            <label class="form-check-label" for="senior">
              Senior Level (5)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="director">
            <label class="form-check-label" for="director">
              Director (12)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="vp">
            <label class="form-check-label" for="vp">
              VP or Above (8)
            </label>
          </div>
        </div>
      </div>
      
      <div class="filter-section">
        <div class="filter-header" data-bs-toggle="collapse" data-bs-target="#salaryRange">
          <h3 class="h6 mb-0">Salary Range</h3>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div id="salaryRange" class="collapse show">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="range1">
            <label class="form-check-label" for="range1">
              $100 - $1000 (4)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="range2">
            <label class="form-check-label" for="range2">
              $100 - $1500 (6)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="range3">
            <label class="form-check-label" for="range3">
              $1500 - $2000 (10)
            </label>
          </div>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="range4">
            <label class="form-check-label" for="range4">
              $3000 or above (4)
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No props or emits needed for this component
  </script>
  
  <style scoped>
  .job-filters {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .filter-section {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9ecef;
  }
  
  .filter-section:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer;
  }
  
  .form-check-label {
    color: #6c757d;
    font-size: 14px;
  }
  </style>