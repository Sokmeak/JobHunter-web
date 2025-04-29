<template>
    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="$emit('prevPage')">&laquo;</button>
        </li>
        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="$emit('changePage', page)">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="$emit('nextPage')">&raquo;</button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'ApplicationsPagination',
    props: { currentPage: Number, totalPages: Number }
  };
  </script>
  