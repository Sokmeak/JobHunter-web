<template>
    <div class="toggle-switch" :class="{ active: modelValue, disabled }">
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="handleChange"
        class="toggle-input"
      />
      <label :for="id" class="toggle-label">
        <span class="toggle-slider">
          <span class="toggle-thumb"></span>
        </span>
      </label>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const handleChange = (event) => {
    emit('update:modelValue', event.target.checked);
  };
  </script>
  
  <style scoped>
  .toggle-switch {
    display: inline-block;
    position: relative;
  }
  
  .toggle-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-label {
    display: block;
    cursor: pointer;
  }
  
  .toggle-slider {
    position: relative;
    display: block;
    width: 48px;
    height: 24px;
    background-color: #e5e7eb;
    border-radius: 24px;
    transition: all 0.3s ease;
  }
  
  .toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .toggle-switch.active .toggle-slider {
    background-color: #4f46e5;
  }
  
  .toggle-switch.active .toggle-thumb {
    transform: translateX(24px);
  }
  
  .toggle-switch.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  
  .toggle-switch:not(.disabled) .toggle-label:hover .toggle-slider {
    background-color: #d1d5db;
  }
  
  .toggle-switch.active:not(.disabled) .toggle-label:hover .toggle-slider {
    background-color: #4338ca;
  }
  </style>