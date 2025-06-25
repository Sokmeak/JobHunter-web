<template>
  <div class="messaging-center">
    <!-- Header -->
    <!-- <div class="messaging-header">
      <div class="header-content">
        <h1 class="header-title">Messages</h1>
        <button 
          class="btn btn-primary"
          @click="startNewConversation"
        >
          <span class="icon">+</span>
          New Message
        </button>
      </div>
    </div> -->

    <div class="messaging-body">
      <!-- Sidebar - Conversations List -->
      <div class="conversations-sidebar">
        <!-- Search and Filters -->
        <div class="sidebar-header">
          <div class="search-container">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search conversations..."
              class="search-input"
            />
          </div>

          <div class="filter-tabs">
            <button
              v-for="filter in filters"
              :key="filter.key"
              :class="['filter-tab', { active: activeFilter === filter.key }]"
              @click="activeFilter = filter.key"
            >
              {{ filter.label }}
              <span v-if="filter.count > 0" class="filter-count">{{
                filter.count
              }}</span>
            </button>
          </div>
        </div>

        <!-- Conversations List -->
        <div class="conversations-list">
          <div
            v-for="conversation in filteredConversations"
            :key="conversation.id"
            :class="[
              'conversation-item',
              {
                active: selectedConversation?.id === conversation.id,
                unread: conversation.unreadCount > 0,
              },
            ]"
            @click="selectConversation(conversation)"
          >
            <div class="conversation-avatar">
              <img :src="conversation.avatar" :alt="conversation.name" />
              <div v-if="conversation.online" class="online-indicator"></div>
            </div>

            <div class="conversation-content">
              <div class="conversation-header">
                <h3 class="conversation-name">{{ conversation.name }}</h3>
                <span
                  v-if="conversation.lastMessageTime"
                  class="conversation-time"
                >
                  {{ formatTime(conversation.lastMessageTime) }}
                </span>
              </div>

              <div class="conversation-preview">
                <p class="last-message">
                  {{
                    conversation.lastMessage || "Click to start conversation"
                  }}
                </p>
                <div class="conversation-meta">
                  <span
                    v-if="conversation.unreadCount > 0"
                    class="unread-badge"
                  >
                    {{ conversation.unreadCount }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Chat Area -->
      <div class="chat-area">
        <div v-if="selectedConversation" class="chat-container">
          <!-- Chat Header -->
          <div class="chat-header">
            <div class="chat-contact-info">
              <div class="contact-avatar">
                <img
                  :src="selectedConversation.avatar"
                  :alt="selectedConversation.name"
                />
                <div
                  v-if="selectedConversation.online"
                  class="online-indicator"
                ></div>
              </div>
              <div class="contact-details">
                <h2 class="contact-name">{{ selectedConversation.name }}</h2>
                <p class="contact-status">
                  <span v-if="isTyping" class="typing-status">typing...</span>
                  <span v-else>
                    {{
                      selectedConversation.online
                        ? "Online"
                        : `Last seen ${formatTime(
                            selectedConversation.lastSeen
                          )}`
                    }}
                  </span>
                </p>
              </div>
            </div>

            <div class="chat-actions">
              <button
                class="action-btn"
                @click="markAsRead"
                title="Mark as read"
              >
                <span>✓✓</span>
              </button>
              <button
                class="action-btn"
                @click="archiveConversation"
                title="Archive"
              >
                <span>📁</span>
              </button>
              <button
                class="action-btn"
                @click="showMoreActions = !showMoreActions"
                title="More"
              >
                <span>⋮</span>
              </button>
              <div v-if="showMoreActions" class="dropdown-menu">
                <button @click="blockContact">Block Contact</button>
                <button @click="deleteConversation" class="text-danger">
                  Delete Conversation
                </button>
              </div>
            </div>
          </div>

          <!-- Messages Area -->
          <div class="messages-container" ref="messagesContainer">
            <!-- Empty State for New Conversation -->
            <div
              v-if="selectedConversation.messages.length === 0"
              class="conversation-starter"
            >
              <div class="starter-content">
                <div class="starter-avatar">
                  <img
                    :src="selectedConversation.avatar"
                    :alt="selectedConversation.name"
                  />
                </div>
                <h3 class="starter-name">{{ selectedConversation.name }}</h3>
                <p class="starter-text">
                  Start your conversation with
                  {{ selectedConversation.name.split(" ")[0] }}
                </p>
                <div class="starter-suggestions">
                  <button
                    v-for="suggestion in getConversationStarters()"
                    :key="suggestion"
                    class="suggestion-btn"
                    @click="sendSuggestion(suggestion)"
                  >
                    {{ suggestion }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages -->
            <div
              v-for="(message, index) in selectedConversation.messages"
              :key="index"
              :class="[
                'message',
                message.sender === 'user' ? 'message-sent' : 'message-received',
              ]"
            >
              <div class="message-content">
                <p class="message-text">{{ message.text }}</p>
                <div class="message-meta">
                  <span class="message-time">{{
                    formatTime(message.timestamp)
                  }}</span>
                  <span
                    v-if="message.sender === 'user'"
                    :class="['message-status', message.read ? 'read' : 'sent']"
                  >
                    {{ message.read ? "✓✓" : "✓" }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="contactTyping" class="message message-received">
              <div class="message-content typing-indicator">
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- CHAT INPUT BAR -->
          <div class="chat-input-bar">
            <div class="chat-input-container">
              <!-- Attachment Button -->
              <button
                class="input-action-btn attachment-btn"
                @click="handleAttachment"
                title="Attach file"
              >
                <span>📎</span>
              </button>

              <!-- Emoji Button -->
              <button
                class="input-action-btn emoji-btn"
                @click="showEmojiPicker = !showEmojiPicker"
                title="Add emoji"
              >
                <span>😊</span>
              </button>

              <!-- Emoji Picker -->
              <div v-if="showEmojiPicker" class="emoji-picker">
                <div class="emoji-grid">
                  <button
                    v-for="emoji in commonEmojis"
                    :key="emoji"
                    class="emoji-btn"
                    @click="addEmoji(emoji)"
                  >
                    {{ emoji }}
                  </button>
                </div>
              </div>

              <!-- Message Input -->
              <div class="message-input-wrapper">
                <textarea
                  ref="messageInput"
                  v-model="newMessage"
                  :placeholder="getInputPlaceholder()"
                  class="message-input"
                  rows="1"
                  @keydown="handleKeyDown"
                  @input="handleInput"
                  @focus="handleInputFocus"
                  @blur="handleInputBlur"
                ></textarea>
              </div>

              <!-- Voice Message Button -->
              <button
                class="input-action-btn voice-btn"
                @mousedown="startVoiceRecording"
                @mouseup="stopVoiceRecording"
                @mouseleave="stopVoiceRecording"
                :class="{ recording: isRecording }"
                title="Hold to record voice message"
              >
                <span>{{ isRecording ? "🔴" : "🎤" }}</span>
              </button>

              <!-- Send Button -->
              <button
                class="send-button"
                :disabled="!canSendMessage"
                @click="sendMessage"
                title="Send message"
              >
                <span class="send-icon">➤</span>
              </button>
            </div>

            <!-- Message Actions Bar -->
            <div v-if="newMessage.trim()" class="message-actions">
              <div class="message-preview">
                <span class="character-count"
                  >{{ newMessage.length }}/1000</span
                >
              </div>
              <div class="quick-actions">
                <button
                  class="quick-action-btn"
                  @click="clearMessage"
                  title="Clear"
                >
                  <span>✕</span>
                </button>
                <button
                  class="quick-action-btn"
                  @click="formatBold"
                  title="Bold"
                >
                  <span><strong>B</strong></span>
                </button>
                <button
                  class="quick-action-btn"
                  @click="formatItalic"
                  title="Italic"
                >
                  <span><em>I</em></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-state-content">
            <div class="empty-state-icon">💬</div>
            <h3 class="empty-state-title">No conversation selected</h3>
            <p class="empty-state-text">
              Choose a conversation from the sidebar or start a new one
            </p>
            <button class="btn btn-primary" @click="startNewConversation">
              <span>+</span>
              Start New Conversation
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Message Modal -->
    <div
      v-if="showNewMessageModal"
      class="modal-overlay"
      @click="closeNewMessageModal"
    >
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5 class="modal-title">New Message</h5>
          <button type="button" class="btn-close" @click="closeNewMessageModal">
            ×
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">To:</label>
            <select v-model="selectedContact" class="form-select">
              <option value="">Select a contact...</option>
              <option
                v-for="contact in contacts"
                :key="contact.id"
                :value="contact"
              >
                {{ contact.name }} - {{ contact.title }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Message:</label>
            <textarea
              v-model="newConversationMessage"
              class="form-control"
              rows="4"
              placeholder="Type your message..."
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeNewMessageModal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            :disabled="!selectedContact || !newConversationMessage.trim()"
            @click="createNewConversation"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>

    <!-- Voice Recording Indicator -->
    <div v-if="isRecording" class="voice-recording-overlay">
      <div class="voice-recording-content">
        <div class="recording-animation">
          <div class="pulse"></div>
          <span class="recording-icon">🎤</span>
        </div>
        <p>Recording voice message...</p>
        <p class="recording-time">{{ recordingTime }}s</p>
        <p class="recording-hint">Release to send, drag away to cancel</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessagingCenter",
  data() {
    return {
      searchQuery: "",
      activeFilter: "all",
      selectedConversation: null,
      newMessage: "",
      selectedContact: "",
      newConversationMessage: "",
      showNewMessageModal: false,
      showMoreActions: false,
      showEmojiPicker: false,
      isTyping: false,
      contactTyping: false,
      isRecording: false,
      recordingTime: 0,
      typingTimeout: null,
      recordingInterval: null,
      commonEmojis: [
        "😊",
        "😂",
        "❤️",
        "👍",
        "👎",
        "😢",
        "😮",
        "😡",
        "🎉",
        "🔥",
        "💯",
        "👏",
        "🙏",
        "💪",
        "✨",
        "🎯",
        "💡",
        "🚀",
      ],
      filters: [
        { key: "all", label: "All", count: 0 },
        { key: "unread", label: "Unread", count: 0 },
        { key: "archived", label: "Archived", count: 0 },
      ],
      // EMPTY CONVERSATIONS - Start fresh!
      conversations: [
        {
          id: 1,
          name: "Sarah Johnson",
          title: "HR Manager at TechCorp",
          avatar:
            "data:image/webp;base64,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",
          lastMessage: "",
          lastMessageTime: null,
          unreadCount: 0,
          online: true,
          archived: false,
          messages: [], // Empty - ready for first conversation!
        },
        {
          id: 2,
          name: "Tech Innovations Inc.",
          title: "Recruiting Team",
          avatar:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
          lastMessage: "",
          lastMessageTime: null,
          unreadCount: 0,
          online: false,
          lastSeen: new Date(Date.now() - 30 * 60000),
          archived: false,
          messages: [], // Empty - ready for first conversation!
        },
        {
          id: 3,
          name: "Creative Agency",
          title: "Design Team",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          lastMessage: "",
          lastMessageTime: null,
          unreadCount: 0,
          online: true,
          archived: false,
          messages: [], // Empty - ready for first conversation!
        },
        {
          id: 4,
          name: "StartupXYZ",
          title: "Talent Acquisition",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          lastMessage: "",
          lastMessageTime: null,
          unreadCount: 0,
          online: false,
          lastSeen: new Date(Date.now() - 2 * 3600000),
          archived: false,
          messages: [], // Empty - ready for first conversation!
        },
      ],
      contacts: [
        {
          id: 101,
          name: "Sarah Johnson",
          title: "HR Manager at TechCorp",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: 102,
          name: "Michael Chen",
          title: "Recruiter at InnovateTech",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: 103,
          name: "Emily Rodriguez",
          title: "Talent Acquisition at GlobalSoft",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        },
        {
          id: 104,
          name: "David Kim",
          title: "Technical Recruiter at DevHub",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
      ],
    };
  },
  computed: {
    filteredConversations() {
      let filtered = this.conversations.filter((conv) => {
        const matchesSearch =
          conv.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (conv.lastMessage &&
            conv.lastMessage
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()));

        switch (this.activeFilter) {
          case "unread":
            return matchesSearch && conv.unreadCount > 0;
          case "archived":
            return matchesSearch && conv.archived;
          default:
            return matchesSearch && !conv.archived;
        }
      });

      // Update filter counts
      this.filters[0].count = this.conversations.filter(
        (c) => !c.archived
      ).length;
      this.filters[1].count = this.conversations.filter(
        (c) => c.unreadCount > 0
      ).length;
      this.filters[2].count = this.conversations.filter(
        (c) => c.archived
      ).length;

      return filtered.sort((a, b) => {
        // Sort by last message time, but put conversations without messages at the top
        if (!a.lastMessageTime && !b.lastMessageTime) return 0;
        if (!a.lastMessageTime) return -1;
        if (!b.lastMessageTime) return 1;
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      });
    },
    canSendMessage() {
      return (
        this.newMessage.trim().length > 0 && this.newMessage.length <= 1000
      );
    },
  },
  methods: {
    formatTime(date) {
      if (!date) return "";
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return "Just now";
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString();
    },
    getInputPlaceholder() {
      if (!this.selectedConversation) return "Type your message...";
      if (this.selectedConversation.messages.length === 0) {
        return `Say hello to ${
          this.selectedConversation.name.split(" ")[0]
        }...`;
      }
      return "Type your message...";
    },
    getConversationStarters() {
      if (!this.selectedConversation) return [];

      const starters = [
        `Hi ${this.selectedConversation.name.split(" ")[0]}! 👋`,
        "Hello! Hope you're doing well",
        "Hi there! Thanks for connecting",
        "Good morning! How are you?",
        "Hello! Nice to meet you",
      ];

      return starters.slice(0, 3); // Show 3 suggestions
    },
    sendSuggestion(suggestion) {
      this.newMessage = suggestion;
      this.sendMessage();
    },
    selectConversation(conversation) {
      this.selectedConversation = conversation;
      this.showMoreActions = false;
      this.showEmojiPicker = false;

      if (conversation.unreadCount > 0) {
        conversation.messages.forEach((msg) => {
          if (!msg.read) msg.read = true;
        });
        conversation.unreadCount = 0;
      }

      this.$nextTick(() => {
        this.scrollToBottom();
        this.focusInput();
      });
    },
    handleKeyDown(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    },
    handleInput() {
      this.adjustTextareaHeight();
      this.handleTyping();
    },
    handleInputFocus() {
      this.showEmojiPicker = false;
    },
    handleInputBlur() {
      setTimeout(() => {
        if (!this.$el.querySelector(".emoji-picker:hover")) {
          this.showEmojiPicker = false;
        }
      }, 100);
    },
    adjustTextareaHeight() {
      const textarea = this.$refs.messageInput;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      }
    },
    focusInput() {
      this.$nextTick(() => {
        if (this.$refs.messageInput) {
          this.$refs.messageInput.focus();
        }
      });
    },
    sendMessage() {
      if (!this.canSendMessage || !this.selectedConversation) return;

      const messageText = this.newMessage.trim();
      const newMsg = {
        sender: "user",
        text: messageText,
        timestamp: new Date(),
        read: false,
      };

      this.selectedConversation.messages.push(newMsg);
      this.selectedConversation.lastMessage = messageText;
      this.selectedConversation.lastMessageTime = new Date();

      this.newMessage = "";
      this.adjustTextareaHeight();
      this.scrollToBottom();

      // Only simulate response after first message is sent
      this.simulateResponse();
    },
    handleTyping() {
      this.isTyping = true;

      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }

      this.typingTimeout = setTimeout(() => {
        this.isTyping = false;
      }, 1000);
    },
    simulateResponse() {
      if (!this.selectedConversation) return;

      // Show contact typing
      this.contactTyping = true;

      setTimeout(() => {
        this.contactTyping = false;

        if (!this.selectedConversation) return;

        // UPDATED RESPONSES - More natural and contextual
        const responses = [
          "Hi! Thanks for reaching out! 😊",
          "Hello! Great to hear from you!",
          "Hey there! How can I help you today?",
          "Hi! Thanks for your message. I'm excited to connect!",
          "Hello! I appreciate you getting in touch.",
          "Hi! Thanks for starting this conversation.",
          "Hey! Good to hear from you. What's on your mind?",
          "Hello! I'm glad you reached out. How are you doing?",
          "Hi there! Thanks for your message. Looking forward to chatting!",
          "Hey! Great to connect with you. What would you like to discuss?",
        ];

        // For first message, use more welcoming responses
        const isFirstResponse = this.selectedConversation.messages.length === 1;
        let responseText;

        if (isFirstResponse) {
          const welcomeResponses = [
            "Hi! Thanks for reaching out! 😊 How can I help you today?",
            "Hello! Great to connect with you! What brings you here?",
            "Hey there! Thanks for your message. I'm excited to chat!",
            "Hi! Good to hear from you. What would you like to discuss?",
            "Hello! I appreciate you getting in touch. How are you doing?",
          ];
          responseText =
            welcomeResponses[
              Math.floor(Math.random() * welcomeResponses.length)
            ];
        } else {
          responseText =
            responses[Math.floor(Math.random() * responses.length)];
        }

        const responseMsg = {
          sender: "contact",
          text: responseText,
          timestamp: new Date(),
          read: true,
        };

        this.selectedConversation.messages.push(responseMsg);
        this.selectedConversation.lastMessage = responseText;
        this.selectedConversation.lastMessageTime = new Date();
        this.scrollToBottom();
      }, 1500 + Math.random() * 1000);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    addEmoji(emoji) {
      this.newMessage += emoji;
      this.showEmojiPicker = false;
      this.focusInput();
    },
    handleAttachment() {
      alert("File attachment feature would be implemented here");
    },
    startVoiceRecording() {
      this.isRecording = true;
      this.recordingTime = 0;
      this.recordingInterval = setInterval(() => {
        this.recordingTime++;
      }, 1000);
    },
    stopVoiceRecording() {
      if (this.isRecording) {
        this.isRecording = false;
        if (this.recordingInterval) {
          clearInterval(this.recordingInterval);
        }

        if (this.recordingTime > 1) {
          const voiceMsg = {
            sender: "user",
            text: `🎤 Voice message (${this.recordingTime}s)`,
            timestamp: new Date(),
            read: false,
            type: "voice",
          };

          if (this.selectedConversation) {
            this.selectedConversation.messages.push(voiceMsg);
            this.selectedConversation.lastMessage = `Voice message (${this.recordingTime}s)`;
            this.selectedConversation.lastMessageTime = new Date();
            this.scrollToBottom();
            this.simulateResponse();
          }
        }
      }
    },
    clearMessage() {
      this.newMessage = "";
      this.adjustTextareaHeight();
      this.focusInput();
    },
    formatBold() {
      const textarea = this.$refs.messageInput;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = this.newMessage.substring(start, end);

      if (selectedText) {
        this.newMessage =
          this.newMessage.substring(0, start) +
          `**${selectedText}**` +
          this.newMessage.substring(end);
      }
      this.focusInput();
    },
    formatItalic() {
      const textarea = this.$refs.messageInput;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = this.newMessage.substring(start, end);

      if (selectedText) {
        this.newMessage =
          this.newMessage.substring(0, start) +
          `*${selectedText}*` +
          this.newMessage.substring(end);
      }
      this.focusInput();
    },
    markAsRead() {
      if (!this.selectedConversation) return;

      this.selectedConversation.messages.forEach((msg) => {
        msg.read = true;
      });
      this.selectedConversation.unreadCount = 0;
    },
    archiveConversation() {
      if (!this.selectedConversation) return;

      this.selectedConversation.archived = !this.selectedConversation.archived;
      this.showMoreActions = false;

      if (
        (this.selectedConversation.archived &&
          this.activeFilter !== "archived") ||
        (!this.selectedConversation.archived &&
          this.activeFilter === "archived")
      ) {
        this.selectedConversation = null;
      }
    },
    blockContact() {
      if (!this.selectedConversation) return;

      alert(`${this.selectedConversation.name} has been blocked.`);
      this.showMoreActions = false;
    },
    deleteConversation() {
      if (!this.selectedConversation) return;

      if (
        confirm(
          `Are you sure you want to delete your conversation with ${this.selectedConversation.name}?`
        )
      ) {
        const index = this.conversations.findIndex(
          (c) => c.id === this.selectedConversation.id
        );
        if (index !== -1) {
          this.conversations.splice(index, 1);
          this.selectedConversation = null;
        }
      }
      this.showMoreActions = false;
    },
    startNewConversation() {
      this.selectedContact = "";
      this.newConversationMessage = "";
      this.showNewMessageModal = true;
    },
    closeNewMessageModal() {
      this.showNewMessageModal = false;
      this.selectedContact = "";
      this.newConversationMessage = "";
    },
    createNewConversation() {
      if (!this.selectedContact || !this.newConversationMessage.trim()) return;

      const existingConv = this.conversations.find(
        (c) => c.name === this.selectedContact.name
      );

      if (existingConv) {
        existingConv.messages.push({
          sender: "user",
          text: this.newConversationMessage.trim(),
          timestamp: new Date(),
          read: false,
        });

        existingConv.lastMessage = this.newConversationMessage.trim();
        existingConv.lastMessageTime = new Date();
        existingConv.archived = false;

        this.selectConversation(existingConv);
      } else {
        const newConv = {
          id: Date.now(),
          name: this.selectedContact.name,
          avatar: this.selectedContact.avatar,
          lastMessage: this.newConversationMessage.trim(),
          lastMessageTime: new Date(),
          unreadCount: 0,
          online: Math.random() > 0.5,
          archived: false,
          messages: [
            {
              sender: "user",
              text: this.newConversationMessage.trim(),
              timestamp: new Date(),
              read: false,
            },
          ],
        };

        this.conversations.unshift(newConv);
        this.selectConversation(newConv);
      }

      this.closeNewMessageModal();
      this.simulateResponse();
    },
  },
  mounted() {
    // Don't auto-select any conversation - let user choose
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".chat-actions")) {
        this.showMoreActions = false;
      }
      if (
        !e.target.closest(".emoji-picker") &&
        !e.target.closest(".emoji-btn")
      ) {
        this.showEmojiPicker = false;
      }
    });
  },
  beforeUnmount() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    if (this.recordingInterval) {
      clearInterval(this.recordingInterval);
    }
  },
};
</script>

<style scoped>
/* All previous styles remain the same, plus these new ones: */

* {
  box-sizing: border-box;
}

.messaging-center {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.messaging-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.messaging-body {
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
}

.conversations-sidebar {
  width: 320px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.search-container {
  position: relative;
  margin-bottom: 1rem;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 14px;
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #f8fafc;
  outline: none;
}

.search-input:focus {
  border-color: #3b82f6;
  background: white;
}

.filter-tabs {
  display: flex;
  gap: 0.25rem;
}

.filter-tab {
  padding: 0.375rem 0.75rem;
  border: none;
  background: none;
  color: #64748b;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s;
}

.filter-tab:hover {
  background: #f1f5f9;
  color: #334155;
}

.filter-tab.active {
  background: #3b82f6;
  color: white;
}

.filter-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.375rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 1.25rem;
  text-align: center;
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.2s;
}

.conversation-item:hover {
  background: #f8fafc;
}

.conversation-item.active {
  background: #eff6ff;
  border-right: 3px solid #3b82f6;
}

.conversation-item.unread {
  background: #fefefe;
}

.conversation-item.unread .conversation-name {
  font-weight: 700;
}

.conversation-avatar {
  position: relative;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.conversation-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.conversation-content {
  flex: 1;
  min-width: 0;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.conversation-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.conversation-time {
  font-size: 0.75rem;
  color: #64748b;
  white-space: nowrap;
  margin-left: 0.5rem;
}

.conversation-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-message {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  font-style: italic;
}

.unread-badge {
  background: #3b82f6;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 0.75rem;
  min-width: 1.25rem;
  text-align: center;
  margin-left: 0.5rem;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  flex-shrink: 0;
}

.chat-contact-info {
  display: flex;
  align-items: center;
}

.contact-avatar {
  position: relative;
  margin-right: 0.75rem;
}

.contact-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.contact-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.125rem 0;
}

.contact-status {
  font-size: 0.8125rem;
  color: #64748b;
  margin: 0;
}

.typing-status {
  color: #10b981;
  font-style: italic;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
  position: relative;
}

.action-btn {
  padding: 0.5rem;
  border: none;
  background: none;
  color: #64748b;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
}

.action-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 150px;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
}

.dropdown-menu button:hover {
  background: #f9fafb;
}

.dropdown-menu button.text-danger {
  color: #dc2626;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f8fafc;
}

/* NEW: Conversation Starter Styles */
.conversation-starter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
}

.starter-content {
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

.starter-avatar {
  margin-bottom: 1rem;
}

.starter-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e2e8f0;
}

.starter-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.starter-text {
  color: #64748b;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.starter-suggestions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.suggestion-btn {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  color: #374151;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.suggestion-btn:hover {
  background: #f8fafc;
  border-color: #3b82f6;
  color: #3b82f6;
}

.message {
  margin-bottom: 1rem;
  display: flex;
}

.message-sent {
  justify-content: flex-end;
}

.message-received {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  background: white;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-sent .message-content {
  background: #3b82f6;
  color: white;
}

.message-text {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.message-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  opacity: 0.7;
}

.message-time {
  margin-right: 0.5rem;
}

.message-status {
  font-size: 12px;
}

.message-status.read {
  color: #10b981;
}

.typing-indicator {
  background: #e5e7eb !important;
  color: #6b7280 !important;
}

.typing-dots {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

/* CHAT INPUT BAR */
.chat-input-bar {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  flex-shrink: 0;
}

.chat-input-container {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 1.5rem;
  padding: 0.75rem;
  position: relative;
  transition: border-color 0.2s;
}

.chat-input-container:focus-within {
  border-color: #3b82f6;
  background: white;
}

.input-action-btn {
  padding: 0.5rem;
  border: none;
  background: none;
  color: #64748b;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.input-action-btn:hover {
  background: #e2e8f0;
  color: #334155;
}

.voice-btn.recording {
  background: #ef4444;
  color: white;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.emoji-picker {
  position: absolute;
  bottom: 100%;
  left: 60px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.25rem;
}

.emoji-btn {
  padding: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 0.25rem;
  font-size: 18px;
  transition: background-color 0.2s;
}

.emoji-btn:hover {
  background: #f1f5f9;
}

.message-input-wrapper {
  flex: 1;
  position: relative;
}

.message-input {
  width: 100%;
  border: none;
  background: none;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  outline: none;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  line-height: 1.4;
  font-family: inherit;
}

.message-input::placeholder {
  color: #9ca3af;
}

.send-button {
  padding: 0.5rem;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
  background: #2563eb;
  transform: scale(1.05);
}

.send-button:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
  transform: none;
}

.send-icon {
  transform: rotate(0deg);
  transition: transform 0.2s;
}

.send-button:hover:not(:disabled) .send-icon {
  transform: rotate(15deg);
}

.message-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
}

.message-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.character-count {
  font-size: 0.75rem;
  color: #64748b;
}

.quick-actions {
  display: flex;
  gap: 0.25rem;
}

.quick-action-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  background: none;
  color: #64748b;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.quick-action-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.empty-state-content {
  text-align: center;
  max-width: 300px;
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-state-text {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
}

.btn-close:hover {
  color: #374151;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-control,
.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  outline: none;
}

.form-control:focus,
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.voice-recording-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  color: white;
}

.voice-recording-content {
  text-align: center;
}

.recording-animation {
  position: relative;
  margin-bottom: 1rem;
}

.pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid #ef4444;
  border-radius: 50%;
  animation: pulse-ring 1.5s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.recording-icon {
  font-size: 3rem;
  position: relative;
  z-index: 1;
}

.recording-time {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.recording-hint {
  font-size: 0.875rem;
  opacity: 0.8;
}

.icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .messaging-body {
    flex-direction: column;
  }

  .conversations-sidebar {
    width: 100%;
    height: 40vh;
  }

  .chat-area {
    height: 60vh;
  }

  .message-content {
    max-width: 85%;
  }

  .chat-input-container {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .input-action-btn {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  .send-button {
    width: 32px;
    height: 32px;
  }

  .starter-suggestions {
    gap: 0.25rem;
  }

  .suggestion-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
  }
}
</style>
