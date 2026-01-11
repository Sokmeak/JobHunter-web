<template>
  <div
    :class="['avatar-container', sizeClass]"
    :style="{ backgroundColor: fallbackBgColor }"
  >
    <img
      v-if="!imageError"
      :src="src"
      :alt="alt"
      :class="['avatar-image', { rounded: rounded, 'rounded-circle': circle }]"
      @error="handleImageError"
      @load="handleImageLoad"
    />

    <div
      v-if="imageError || !src"
      :class="[
        'avatar-fallback',
        { rounded: rounded, 'rounded-circle': circle },
      ]"
    >
      {{ fallbackText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md", // xs, sm, md, lg, xl
    validator: (value) => ["xs", "sm", "md", "lg", "xl"].includes(value),
  },
  rounded: {
    type: Boolean,
    default: true,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: "",
  },
});

const imageError = ref(false);

const handleImageError = () => {
  imageError.value = true;
};

const handleImageLoad = () => {
  imageError.value = false;
};

const sizeClass = computed(() => {
  const sizes = {
    xs: "avatar-xs",
    sm: "avatar-sm",
    md: "avatar-md",
    lg: "avatar-lg",
    xl: "avatar-xl",
  };
  return sizes[props.size];
});

const fallbackText = computed(() => {
  if (!props.name) return "??";

  // Get initials from name - always try to get 2 letters
  const words = props.name.trim().split(/\s+/);

  if (words.length === 1) {
    // For single word, take first 2 characters if available
    const word = words[0];
    return word.length >= 2
      ? word.substring(0, 2).toUpperCase()
      : word.charAt(0).toUpperCase() + word.charAt(0).toUpperCase();
  }

  // For multiple words, take first letter of first 2 words
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
});

const fallbackBgColor = computed(() => {
  if (props.bgColor) return props.bgColor;

  // Generate consistent color based on name
  const colors = [
    "#3B82F6",
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
    "#6366F1",
    "#84CC16",
    "#F97316",
  ];

  let hash = 0;
  for (let i = 0; i < props.name.length; i++) {
    hash = props.name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
});
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875em;
}

/* Size variants */
.avatar-xs {
  width: 24px;
  height: 24px;
}

.avatar-xs .avatar-fallback {
  font-size: 0.625rem;
}

.avatar-sm {
  width: 32px;
  height: 32px;
}

.avatar-sm .avatar-fallback {
  font-size: 0.75rem;
}

.avatar-md {
  width: 48px;
  height: 48px;
}

.avatar-md .avatar-fallback {
  font-size: 1rem;
}

.avatar-lg {
  width: 64px;
  height: 64px;
}

.avatar-lg .avatar-fallback {
  font-size: 1.25rem;
}

.avatar-xl {
  width: 80px;
  height: 80px;
}

.avatar-xl .avatar-fallback {
  font-size: 1.5rem;
}

.rounded {
  border-radius: 0.5rem;
}

.rounded-circle {
  border-radius: 50%;
}
</style>
