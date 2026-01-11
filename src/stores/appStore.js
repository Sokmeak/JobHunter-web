// src/stores/appStore.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    isFirst: true, // Initialize isFirst in the store
  }),
  actions: {
    setIsFirst(value) {
      this.isFirst = value;
    },
  },
});