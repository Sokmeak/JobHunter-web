<template>
  <div class="message-thread">
    <!-- Thread Header -->
    <div class="thread-header">
      <div class="d-flex align-items-center">
        <div class="conversation-avatar me-2">
          <img
            :src="conversation.avatar || '/placeholder.svg?height=40&width=40'"
            :alt="conversation.name"
            class="rounded-circle"
          />
          <span
            v-if="conversation.online"
            class="status-indicator online"
          ></span>
        </div>
        <div>
          <h5 class="mb-0">{{ conversation.name }}</h5>
          <small class="text-muted">
            {{
              conversation.online
                ? "Online"
                : "Last seen " + formatTime(conversation.lastSeen)
            }}
          </small>
        </div>
      </div>
      <div class="thread-actions">
        <button
          class="btn btn-sm btn-light me-2"
          title="Search in conversation"
        >
          <i class="bi bi-search"></i>
        </button>
        <button class="btn btn-sm btn-light me-2" title="Call">
          <i class="bi bi-telephone"></i>
        </button>
        <div class="dropdown d-inline-block">
          <button
            class="btn btn-sm btn-light"
            type="button"
            id="threadOptionsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="threadOptionsDropdown"
          >
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="$emit('mark-as-read')"
                ><i class="bi bi-check-all me-2"></i>Mark as read</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="$emit('archive-conversation')"
                ><i class="bi bi-archive me-2"></i>Archive conversation</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="$emit('block-contact')"
                ><i class="bi bi-slash-circle me-2"></i>Block contact</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a
                class="dropdown-item text-danger"
                href="#"
                @click.prevent="$emit('delete-conversation')"
                ><i class="bi bi-trash me-2"></i>Delete conversation</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Messages -->
    <div class="messages-container" ref="messagesContainer">
      <div class="message-date-divider">
        <span>Today</span>
      </div>

      <message-item
        v-for="(message, index) in conversation.messages"
        :key="index"
        :message="message"
      />

      <div v-if="isTyping" class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!-- Message Input -->
    <message-input @send="sendMessage" />
  </div>
</template>

<script>
import MessageItem from "./MessageItem.vue";
import MessageInput from "./MessageInput.vue";

export default {
  name: "MessageThread",
  components: {
    MessageItem,
    MessageInput,
  },
  props: {
    conversation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isTyping: false,
    };
  },
  methods: {
    formatTime(date) {
      if (!date) return "recently";

      const now = new Date();
      const diff = now - date;

      // Less than an hour
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      }
      // Less than a day
      else if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      }
      // More than a day
      else {
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
      }
    },
    sendMessage(text) {
      this.$emit("send-message", text);

      // Show typing indicator
      setTimeout(() => {
        this.isTyping = true;

        // Hide typing after a delay
        setTimeout(() => {
          this.isTyping = false;
        }, 2000 + Math.random() * 1000);
      }, 500);
    },
    scrollToBottom() {
      if (this.$refs.messagesContainer) {
        this.$refs.messagesContainer.scrollTop =
          this.$refs.messagesContainer.scrollHeight;
      }
    },
  },
  watch: {
    "conversation.messages": {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.message-thread {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.thread-header {
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conversation-avatar {
  position: relative;
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

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: #f8f9fa;
}

.message-date-divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.message-date-divider::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background-color: #e9ecef;
  z-index: 1;
}

.message-date-divider span {
  background-color: #f8f9fa;
  padding: 0 10px;
  position: relative;
  z-index: 2;
  color: #6c757d;
  font-size: 0.875rem;
}

.typing-indicator {
  padding: 10px 15px;
  background-color: white;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
  width: 60px;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #6c757d;
  display: inline-block;
  margin-right: 5px;
  animation: typing 1s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
  margin-right: 0;
}

@keyframes typing {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
