<template>
  <header class="bg-white border-bottom px-4 py-3">
    <div class="d-flex justify-content-between align-items-center">
      <!-- Company Selector -->
      <div class="company-selector d-flex align-items-center">
        <div
          class="bg-success rounded-3 p-2 me-3"
          style="
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <span class="text-white fw-bold">N</span>
        </div>
        <div class="dropdown">
          <button
            class="btn btn-link text-decoration-none text-dark dropdown-toggle p-0 d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <div class="text-start">
              <div class="small text-muted">Company</div>
              <div class="fw-medium">Nomad</div>
            </div>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#" @click="switchCompany('nomad')"
                >Nomad</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="switchCompany('other')"
                >Other Company</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="#" @click="addCompany"
                >Add Company</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Side Actions -->
      <div class="d-flex align-items-center gap-3">
        <NotificationBell />

        <button class="btn btn-primary px-4" @click="postJob">
          <i class="bi bi-plus me-2"></i>Post a job
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject } from "vue";
import NotificationBell from "./NotificationBell.vue";

const navigate = inject("navigate");

const switchCompany = (company) => {
  console.log("Switching to company:", company);
};

const addCompany = () => {
  console.log("Adding new company");
};

const postJob = () => {
  navigate("post-job");
};
</script>
