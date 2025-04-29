<template>
    <ul class="nav nav-tabs mt-4">
      <li v-for="tab in tabs" :key="tab.label" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: tab.label === activeTab }"
          href="#"
          @click.prevent="$emit('update:activeTab', tab.label)"
        >
          {{ tab.label }} ({{ tab.count }})
        </a>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: 'ApplicationsTabs',
    props: { tabs: Array, activeTab: String }
  };
  </script>
  