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
            :placeholder="placeholder"
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
              v-model="locationInput"
            >
              <option value="" selected>Location, City</option>
              <option value="paris">Paris</option>
              <option value="san-francisco">San Francisco</option>
              <option value="hamburg">Hamburg</option>
              <option value="madrid">Madrid</option>
              <option value="ankara">Ankara</option>
              <option value="berlin">Berlin</option>
              <option value="new-york">New York</option>
              <option value="amsterdam">Amsterdam</option>
              <option value="toronto">Toronto</option>
              <option value="london">London</option>
              <option value="rome">Rome</option>
              <option value="sydney">Sydney</option>
              <option value="lisbon">Lisbon</option>
              <option value="stockholm">Stockholm</option>
              <option value="tokyo">Tokyo</option>
              <option value="dublin">Dublin</option>
              <option value="oslo">Oslo</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary" @click="search">Search my job</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { defineProps, defineEmits, defineExpose } from "vue";

// Props
const props = defineProps({
  placeholder: {
    type: String,
    default: "Job title or keyword",
  },
  modelValue: {
    type: Object,
    default: () => ({ keyword: "", location: "" }),
  },
});

// Emits
const emit = defineEmits(["update:modelValue", "search"]);

// Reactive state
const searchInput = ref(props.modelValue.keyword);
const locationInput = ref(props.modelValue.location);

// Sync v-model with internal state
watch([searchInput, locationInput], ([newSearch, newLocation]) => {
  emit("update:modelValue", {
    keyword: newSearch,
    location: newLocation,
  });
});

// Watch modelValue to sync external changes
watch(
  () => props.modelValue,
  (newValue) => {
    searchInput.value = newValue.keyword;
    locationInput.value = newValue.location;
  },
  { deep: true }
);

// Methods
function search() {
  const trimmedSearchInput = searchInput.value.trim();
  const trimmedLocationInput = locationInput.value.trim();
  if (trimmedSearchInput || trimmedLocationInput) {
    emit("search", {
      keyword: trimmedSearchInput,
      location: trimmedLocationInput,
    });
  }
}

function clearSearch() {
  searchInput.value = "";
  locationInput.value = "";
  emit("update:modelValue", { keyword: "", location: "" });
}

// Expose clearSearch to parent
defineExpose({
  clearSearch,
});
</script>

<style lang="css" scoped>
@import "@/style/variables.css";

.search-form {
  width: 100%;
  border-radius: 8px;
  position: relative;
  z-index: 2;
}

.search {
  border: none;
  border-radius: 6px;
  background-color: #f8f9fa;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #333;
  transition: background-color 0.2s;
}

.search:focus {
  outline: none;
  border: none;
  box-shadow: none;
  background-color: #fff;
}

.input-group-text {
  background-color: #f8f9fa;
  border: none;
  border-radius: 6px 0 0 6px;
}

.position {
  border: none;
}

.custom-select {
  border: none;
  border-radius: 6px;
  background-color: #f8f9fa;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #333;
  transition: background-color 0.2s;
}

.custom-select:focus {
  outline: none;
  box-shadow: none;
  background-color: #fff;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  cursor: pointer;
  background-color: rgb(53, 53, 238);
  transform: translateY(-1px);
}
</style>
