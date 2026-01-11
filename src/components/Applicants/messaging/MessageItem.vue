<template>
  <div
    class="message"
    :class="{
      outgoing: message.sender === 'user',
      incoming: message.sender !== 'user',
    }"
  >
    <div class="message-content">
      {{ message.text }}
    </div>
    <div class="message-meta">
      <span class="message-time">{{
        formatMessageTime(message.timestamp)
      }}</span>
      <span v-if="message.sender === 'user'" class="message-status">
        <i class="bi" :class="message.read ? 'bi-check-all' : 'bi-check'"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatMessageTime(date) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>

<style scoped>
.message {
  max-width: 75%;
  margin-bottom: 10px;
  position: relative;
}

.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  display: inline-block;
}

.message.incoming .message-content {
  background-color: white;
  border: 1px solid #e9ecef;
  border-bottom-left-radius: 4px;
}

.message.outgoing {
  margin-left: auto;
}

.message.outgoing .message-content {
  background-color: #6366f1;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-meta {
  font-size: 0.75rem;
  margin-top: 2px;
  display: flex;
  align-items: center;
}

.message.incoming .message-meta {
  justify-content: flex-start;
}

.message.outgoing .message-meta {
  justify-content: flex-end;
}

.message-time {
  color: #6c757d;
}

.message.outgoing .message-time {
  color: #e9ecef;
}

.message-status {
  margin-left: 4px;
}
</style>
