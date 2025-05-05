<template>
  <div class="manual-pagination mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div>
        <span class="text-muted"
          >Showing {{ startItem }}-{{ endItem }} of
          {{ totalItems }} results</span
        >
      </div>

      <div class="d-flex align-items-center">
        <span class="me-2">Items per page:</span>
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
        <!-- First page button -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="goToPage(1)"
            :disabled="currentPage === 1"
            aria-label="First"
          >
            <span aria-hidden="true">&laquo;&laquo;</span>
          </button>
        </li>

        <!-- Previous page button -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button
            class="page-link"
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        <!-- Page numbers -->
        <li
          v-for="page in visiblePages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>

        <!-- Next page button -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>

        <!-- Last page button -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="goToPage(totalPages)"
            :disabled="currentPage === totalPages"
            aria-label="Last"
          >
            <span aria-hidden="true">&raquo;&raquo;</span>
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

// Watch for perPage changes
watch(perPage, (newVal) => {
  emit("per-page-change", newVal);
  // Reset to page 1 when changing items per page
  if (currentPage.value !== 1) {
    currentPage.value = 1;
    emit("page-change", 1);
  }
});

// Computed properties
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.totalItems / perPage.value));
});

const startItem = computed(() => {
  if (props.totalItems === 0) return 0;
  return (currentPage.value - 1) * perPage.value + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * perPage.value, props.totalItems);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    // Show all pages if there are few
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Calculate which pages to show
    let startPage = Math.max(
      1,
      currentPage.value - Math.floor(maxVisiblePages / 2)
    );
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages.value) {
      endPage = totalPages.value;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
});

// Methods
function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;
  emit("page-change", page);
}
</script>
