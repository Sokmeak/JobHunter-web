<template>
  <div class="mb-6 border rounded-lg p-4 bg-white">
    <div
      class="flex justify-between items-center cursor-pointer mb-3"
      @click="isOpen = !isOpen"
    >
      <h3 class="font-semibold text-gray-700">{{ title }}</h3>
      <chevron-up-icon v-if="isOpen" class="h-5 w-5 text-gray-500" />
      <chevron-down-icon v-else class="h-5 w-5 text-gray-500" />
    </div>

    <div v-if="isOpen" class="space-y-2">
      <div v-for="item in items" :key="item.id" class="flex items-center">
        <input
          type="checkbox"
          :id="item.id"
          :value="item.id"
          :checked="selectedItems.includes(item.id)"
          @change="toggleItem(item.id)"
          class="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label :for="item.id" class="ml-2 text-sm text-gray-700 flex-1">
          {{ item.label }}
        </label>
        <span class="text-xs text-gray-500">({{ item.count }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-vue-next";

const props = defineProps({
  title: String,
  items: Array,
  selectedItems: Array,
});

const emit = defineEmits(["update:selected"]);

const isOpen = ref(true);

const toggleItem = (itemId) => {
  const newSelectedItems = [...props.selectedItems];
  const index = newSelectedItems.indexOf(itemId);

  if (index === -1) {
    newSelectedItems.push(itemId);
  } else {
    newSelectedItems.splice(index, 1);
  }

  emit("update:selected", newSelectedItems);
};
</script>
