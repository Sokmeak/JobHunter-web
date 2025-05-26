<template>
  <div class="settings-page">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Settings</h2>
      <button class="btn btn-primary" @click="finishPreview">
        <i class="bi bi-clock me-1"></i>Finish Preview
      </button>
    </div>

    <!-- Settings Tabs -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'overview' }"
          @click="setActiveTab('overview')"
        >
          Overview
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'social-links' }"
          @click="setActiveTab('social-links')"
        >
          Social Links
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'team' }"
          @click="setActiveTab('team')"
        >
          Team
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="tab-pane active">
        <SettingsOverview />
      </div>

      <!-- Social Links Tab -->
      <div v-else-if="activeTab === 'social-links'" class="tab-pane active">
        <SettingsSocialLinks />
      </div>

      <!-- Team Tab -->
      <div v-else-if="activeTab === 'team'" class="tab-pane active">
        <SettingsTeam />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import SettingsOverview from "./SettingsOverview.vue";
import SettingsSocialLinks from "./SettingsSocialLinks.vue";
import SettingsTeam from "./SettingsTeam.vue";

const navigate = inject("navigate");
const activeTab = ref("overview");

const setActiveTab = (tab) => {
  activeTab.value = tab;
  console.log("Active tab changed to:", tab);
};

const finishPreview = () => {
  console.log("Finishing preview");
};
</script>
