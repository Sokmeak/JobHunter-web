<template>
  <div class="feature-banner" v-if="visible">
    <div class="banner-content">
      <div class="banner-icon">
        <i :class="iconClass"></i>
      </div>
      <div class="banner-text">
        <h4>{{ title }}</h4>
        <p>{{ message }}</p>
      </div>
    </div>
    <button class="close-banner" @click="closeBanner" v-if="dismissible">
      <i class="bi bi-x"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ApplicationBanner',
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      default: 'bi bi-file-earmark-text'
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: this.show
    };
  },
  watch: {
    show(newVal) {
      this.visible = newVal;
    }
  },
  methods: {
    closeBanner() {
      this.visible = false;
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.feature-banner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background-color: #e8f0fe;
  border-left: 4px solid #4640DE;
  margin-bottom: 24px;
  position: relative;
}

.banner-content {
  display: flex;
  gap: 12px;
  flex: 1;
}

.banner-icon {
  width: 40px;
  height: 40px;
  background-color: #4640DE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.banner-text h4 {
  font-size: 16px;
  font-weight: 600;
  color: #4640DE;
  margin: 0 0 4px 0;
}

.banner-text p {
  font-size: 14px;
  color: #5f6368;
  margin: 0;
  line-height: 1.4;
}

.close-banner {
  background: none;
  border: none;
  color: #5f6368;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.close-banner:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
