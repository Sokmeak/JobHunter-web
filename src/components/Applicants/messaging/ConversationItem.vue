<template>
  <div
    class="conversation-item"
    :class="{
      active: isActive,
      unread: conversation.unreadCount > 0,
    }"
    @click="$emit('click')"
  >
    <div class="conversation-avatar">
      <img
        :src="conversation.avatar || '/placeholder.svg?height=40&width=40'"
        :alt="conversation.name"
        class="rounded-circle"
      />
      <span v-if="conversation.online" class="status-indicator online"></span>
    </div>
    <div class="conversation-content">
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="mb-0">{{ conversation.name }}</h6>
        <small class="text-muted">{{
          formatTime(conversation.lastMessageTime)
        }}</small>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <p class="conversation-preview mb-0">
          {{ conversation.lastMessage }}
        </p>
        <span
          v-if="conversation.unreadCount > 0"
          class="badge bg-primary rounded-pill"
        >
          {{ conversation.unreadCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConversationItem",
  props: {
    conversation: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatTime(date) {
      const now = new Date();
      const diff = now - date;

      // Less than a day
      if (diff < 86400000) {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      // Less than a week
      else if (diff < 604800000) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days[date.getDay()];
      }
      // More than a week
      else {
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
      }
    },
  },
};
</script>

<style scoped>
.conversation-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.conversation-item:hover {
  background-color: #f8f9fa;
}

.conversation-item.active {
  background-color: #e9ecef;
}

.conversation-item.unread {
  background-color: rgba(99, 102, 241, 0.05);
}

.conversation-avatar {
  position: relative;
  margin-right: 12px;
}

.conversation-avatar img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.online {
  background-color: #10b981;
}

.conversation-content {
  flex: 1;
  min-width: 0;
}

.conversation-preview {
  color: #6c757d;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}
</style>
