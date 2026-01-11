<script setup>
import { useCounterStore } from "@/stores/counterStore";

const counter = useCounterStore();
</script>

<template>
  <div class="container py-4">
    <h1>Count: {{ counter.count }}</h1>
    <button @click="counter.increment">Count + 1</button>
    <button @click="counter.decrement">Count -1</button>
  </div>
</template>
