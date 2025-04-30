<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{ active: currentPage === 1 }">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">4</a></li>
      <li class="page-item"><a class="page-link" href="#">5</a></li>
      <li class="page-item">
        <a class="page-link" href="#">...</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">{{ totalPages }}</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

.page-link {
  color: #6c757d;
  border: none;
  padding: 8px 12px;
}

.page-item.active .page-link {
  background-color: #5138ee;
  color: white;
  border-radius: 5px;
}

.page-item:not(.active) .page-link:hover {
  background-color: #f8f9fa;
  border-radius: 5px;
}
</style>