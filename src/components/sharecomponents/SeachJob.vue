<template>
  <div class="search-form p-3 bg-white rounded shadow-sm mb-3">
    <div class="d-flex flex-row justify-content-between g-1">
      <div class="col-md-4">
        <div class="input-group">
          <span class="input-group-text bg-white border-0">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control search"
            @keyup.enter="search"
            v-model="searchInput"
            placeholder="Job title or keyword"
          />
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group">
          <span class="input-group-text bg-white border-0">
            <i class="bi bi-geo-alt"></i>
          </span>
          <div class="position position-relative">
            <select
              class="form-select border-0 shadow-none ps-3 pe-5 custom-select"
            >
              <option selected disabled>Location, City</option>
              <option value="phnom-penh">Phnom Penh</option>
              <option value="siem-reap">Siem Reap</option>
              <option value="battambang">Battambang</option>
              <option value="sihanoukville">Sihanoukville</option>
              <option value="kampong-cham">Kampong Cham</option>
              <option value="kampot">Kampot</option>
              <option value="kandal">Kandal</option>
              <option value="takeo">Takeo</option>
              <option value="prey-veng">Prey Veng</option>
              <option value="svay-rieng">Svay Rieng</option>
              <option value="kampong-thom">Kampong Thom</option>
              <option value="kratie">Kratie</option>
              <option value="mondulkiri">Mondulkiri</option>
              <option value="ratanakiri">Ratanakiri</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <button
          class="btn btn-primary bg-primary-color hovered-btn-primary"
          @click="search"
        >
          Search my job
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["search"]);

const searchInput = ref("");
const hoveredTag = ref(null);

function search() {
  if (searchInput.value.trim()) {
    emit("search", searchInput.value.trim());
    console.log("Search:", searchInput.value.trim());
  }
}
// how can I use this search feaceure in the landing page
</script>

<style lang="css" scoped>
@import "@/style/variables.css"; /* Import your CSS variables here */
/* Search form styling */

.bg-primary-color {
  background-color: var(--primary-color) !important;
}
.search-form {
  width: 100%;
  border-radius: 8px;
  position: relative;
  z-index: 2;
}

.search,
.position {
  border: none;
  border-radius: 0;
  border-bottom: gray 1px solid;
}

.search:focus {
  outline: none;
  box-shadow: none;
}

.custom-select:focus {
  outline: none;
  box-shadow: none;
}
</style>
