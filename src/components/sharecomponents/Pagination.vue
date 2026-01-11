<template>
  <div class="pagination mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-muted">
        Showing {{ startItem }}-{{ endItem }} of {{ totalItems }} results
      </span>
      <div class="d-flex align-items-center">
        <span class="me-2">Per page:</span>
        <select
          v-model="perPage"
          class="form-select form-select-sm"
          style="width: 70px"
        >
          <option :value="6">6</option>
          <option :value="12">12</option>
          <option :value="24">24</option>
        </select>
      </div>
    </div>

    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            aria-label="Previous"
          >
            <span aria-hidden="true">&lt;</span>
          </button>
        </li>
        <li
          v-for="page in visiblePages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            aria-label="Next"
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  initialPage: {
    type: Number,
    default: 1,
  },
  initialPerPage: {
    type: Number,
    default: 6,
  },
});

const emit = defineEmits(["page-change", "per-page-change"]);

const currentPage = ref(props.initialPage);
const perPage = ref(props.initialPerPage);

// Watch for prop changes
watch(
  () => props.initialPage,
  (newVal) => {
    currentPage.value = newVal;
  }
);
watch(
  () => props.initialPerPage,
  (newVal) => {
    perPage.value = newVal;
  }
);

// Reset to page 1 when perPage changes
watch(perPage, (newVal) => {
  emit("per-page-change", newVal);
  if (currentPage.value !== 1) {
    currentPage.value = 1;
    emit("page-change", 1);
  }
});

// Computed properties
const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.totalItems / perPage.value))
);

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (currentPage.value - 1) * perPage.value + 1;
});

const endItem = computed(() =>
  Math.min(currentPage.value * perPage.value, props.totalItems)
);

const visiblePages = computed(() => {
  const maxVisiblePages = 5;
  const pages = [];
  const total = totalPages.value;

  if (total <= maxVisiblePages) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    let start = Math.max(
      1,
      currentPage.value - Math.floor(maxVisiblePages / 2)
    );
    let end = start + maxVisiblePages - 1;
    if (end > total) {
      end = total;
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
  }
  return pages;
});

// Navigate to a specific page
function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  emit("page-change", page);
}
</script>
