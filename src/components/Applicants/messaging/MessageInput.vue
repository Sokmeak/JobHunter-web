<template>
  <div class="message-input-container">
    <div class="input-group">
      <button class="btn btn-light" type="button">
        <i class="bi bi-emoji-smile"></i>
      </button>
      <button class="btn btn-light" type="button">
        <i class="bi bi-paperclip"></i>
      </button>
      <input
        type="text"
        class="form-control"
        placeholder="Type a message..."
        v-model="newMessage"
        @keyup.enter="sendMessage"
      />
      <button
        class="btn btn-primary"
        type="button"
        @click="sendMessage"
        :disabled="!newMessage.trim()"
      >
        <i class="bi bi-send"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageInput",
  data() {
    return {
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (!this.newMessage.trim()) return;

      this.$emit("send", this.newMessage);
      this.newMessage = "";
    },
  },
};
</script>

<style scoped>
.message-input-container {
  padding: 15px;
  border-top: 1px solid #e9ecef;
}

.btn-primary {
  background-color: #6366f1;
  border-color: #6366f1;
}

.btn-primary:hover {
  background-color: #5253cc;
  border-color: #5253cc;
}
</style>
