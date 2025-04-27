<template>
    <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
            <chevron-left-icon size="16" />
          </a>
        </li>
        
        <li 
          v-for="page in visiblePages" 
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        
        <li v-if="showEllipsis" class="page-item disabled">
          <span class="page-link">...</span>
        </li>
        
        <li 
          v-if="showLastPage"
          class="page-item"
          :class="{ active: currentPage === totalPages }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
        </li>
        
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
            <chevron-right-icon size="16" />
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits } from 'vue';
  import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
  
  const props = defineProps({
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      required: true
    }
  });
  
  const emit = defineEmits(['update:page']);
  
  const visiblePages = computed(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, props.currentPage - 2);
    let endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  });
  
  const showEllipsis = computed(() => {
    return props.totalPages > 5 && !visiblePages.value.includes(props.totalPages);
  });
  
  const showLastPage = computed(() => {
    return props.totalPages > 5 && !visiblePages.value.includes(props.totalPages);
  });
  
  const changePage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
      emit('update:page', page);
    }
  };
  </script>