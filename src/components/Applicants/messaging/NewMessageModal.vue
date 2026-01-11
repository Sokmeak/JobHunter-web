<template>
  <div
    class="modal fade"
    id="newMessageModal"
    tabindex="-1"
    aria-labelledby="newMessageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="newMessageModalLabel">New Message</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="recipientSearch" class="form-label">To:</label>
            <input
              type="text"
              class="form-control"
              id="recipientSearch"
              placeholder="Search for a contact..."
              v-model="recipientSearch"
            />
          </div>

          <div v-if="recipientSearch.trim()" class="recipient-results mb-3">
            <div
              v-for="contact in filteredContacts"
              :key="contact.id"
              class="recipient-item"
              @click="selectRecipient(contact)"
            >
              <img
                :src="contact.avatar || '/placeholder.svg?height=30&width=30'"
                :alt="contact.name"
                class="rounded-circle me-2"
                width="30"
                height="30"
              />
              <div>
                <div>{{ contact.name }}</div>
                <small class="text-muted">{{ contact.title }}</small>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="messageContent" class="form-label">Message:</label>
            <textarea
              class="form-control"
              id="messageContent"
              rows="5"
              placeholder="Type your message here..."
              v-model="newMessage"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="createNewConversation"
            :disabled="!selectedRecipient || !newMessage.trim()"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMessageModal",
  props: {
    contacts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      recipientSearch: "",
      selectedRecipient: null,
      newMessage: "",
    };
  },
  computed: {
    filteredContacts() {
      if (!this.recipientSearch.trim()) return [];

      const query = this.recipientSearch.toLowerCase();
      return this.contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.title.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    selectRecipient(contact) {
      this.selectedRecipient = contact;
      this.recipientSearch = contact.name;
    },
    createNewConversation() {
      if (!this.selectedRecipient || !this.newMessage.trim()) return;

      this.$emit(
        "create-conversation",
        this.selectedRecipient,
        this.newMessage
      );

      // Reset form
      this.recipientSearch = "";
      this.selectedRecipient = null;
      this.newMessage = "";
    },
  },
};
</script>

<style scoped>
.recipient-results {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.recipient-item {
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.recipient-item:hover {
  background-color: #f8f9fa;
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
