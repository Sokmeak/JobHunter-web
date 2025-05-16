<template>
  <div class="messaging-container">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Messages</h2>
      <button class="btn btn-outline-primary">
        Back to homepage
      </button>
    </div>

    <div class="row h-100">
      <!-- Left Column - Conversations List -->
      <div class="col-md-4 col-lg-3">
        <conversation-list 
          :conversations="conversations"
          :active-filter="activeFilter"
          :search-query="searchQuery"
          @update:search-query="searchQuery = $event"
          @update:active-filter="activeFilter = $event"
          @select-conversation="selectConversation"
          @new-conversation="startNewConversation"
        />
      </div>

      <!-- Right Column - Message Thread -->
      <div class="col-md-8 col-lg-9">
        <message-thread 
          v-if="selectedConversation"
          :conversation="selectedConversation"
          @send-message="sendMessage"
          @mark-as-read="markAsRead"
          @archive-conversation="archiveConversation"
          @block-contact="blockContact"
          @delete-conversation="deleteConversation"
        />
        
        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="text-center">
            <i class="bi bi-chat-text text-muted display-1"></i>
            <h4 class="mt-3">No conversation selected</h4>
            <p class="text-muted">Select a conversation from the list or start a new one</p>
            <button class="btn btn-primary mt-2" @click="startNewConversation">
              <i class="bi bi-plus-circle me-2"></i>
              New Message
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Message Modal -->
    <new-message-modal
      :contacts="contacts"
      @create-conversation="createNewConversation"
    />
  </div>
</template>

<script>
import ConversationList from '@/components/Applicants/messaging/ConversationList.vue';
import * as bootstrap from 'bootstrap';
import MessageThread from '@/components/Applicants/messaging/MessageThread.vue';
import NewMessageModal from '@/components/Applicants/messaging/NewMessageModal.vue';

export default {
  name: 'MessagingCenter',
  components: {
    ConversationList,
    MessageThread,
    NewMessageModal
  },
  data() {
    return {
      searchQuery: '',
      activeFilter: 'all',
      selectedConversation: null,
      conversations: [
        {
          id: 1,
          name: 'Sarah Johnson',
          avatar: '/placeholder.svg?height=40&width=40',
          lastMessage: 'Thanks for your application! We would like to schedule an interview.',
          lastMessageTime: new Date(Date.now() - 25 * 60000), // 25 minutes ago
          unreadCount: 2,
          online: true,
          archived: false,
          messages: [
            {
              sender: 'contact',
              text: 'Hello Jake, I noticed your application for the Senior Developer position.',
              timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
              read: true
            },
            {
              sender: 'contact',
              text: 'Your experience looks great! Are you available for an interview next week?',
              timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
              read: true
            },
            {
              sender: 'contact',
              text: 'Thanks for your application! We would like to schedule an interview.',
              timestamp: new Date(Date.now() - 25 * 60000), // 25 minutes ago
              read: false
            }
          ]
        },
        {
          id: 2,
          name: 'Tech Innovations Inc.',
          avatar: '/placeholder.svg?height=40&width=40',
          lastMessage: 'We reviewed your portfolio and would like to discuss the UX Designer role.',
          lastMessageTime: new Date(Date.now() - 2 * 3600000), // 2 hours ago
          unreadCount: 0,
          online: false,
          lastSeen: new Date(Date.now() - 30 * 60000), // 30 minutes ago
          archived: false,
          messages: [
            {
              sender: 'contact',
              text: 'Hi Jake, this is Mark from Tech Innovations Inc.',
              timestamp: new Date(Date.now() - 3 * 3600000), // 3 hours ago
              read: true
            },
            {
              sender: 'user',
              text: 'Hello Mark, nice to hear from you!',
              timestamp: new Date(Date.now() - 2.5 * 3600000), // 2.5 hours ago
              read: true
            },
            {
              sender: 'contact',
              text: 'We reviewed your portfolio and would like to discuss the UX Designer role.',
              timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
              read: true
            }
          ]
        },
        {
          id: 3,
          name: 'JobHuntly Support',
          avatar: '/placeholder.svg?height=40&width=40',
          lastMessage: 'Is there anything else you need help with?',
          lastMessageTime: new Date(Date.now() - 1 * 86400000), // 1 day ago
          unreadCount: 0,
          online: true,
          archived: false,
          messages: [
            {
              sender: 'contact',
              text: 'Hello Jake, how can I help you today?',
              timestamp: new Date(Date.now() - 1.2 * 86400000), // 1.2 days ago
              read: true
            },
            {
              sender: 'user',
              text: 'I\'m having trouble updating my resume. The upload keeps failing.',
              timestamp: new Date(Date.now() - 1.1 * 86400000), // 1.1 days ago
              read: true
            },
            {
              sender: 'contact',
              text: 'I\'m sorry to hear that. Let me help you troubleshoot. What file format are you using?',
              timestamp: new Date(Date.now() - 1.05 * 86400000), // 1.05 days ago
              read: true
            },
            {
              sender: 'user',
              text: 'I\'m using a PDF file.',
              timestamp: new Date(Date.now() - 1.03 * 86400000), // 1.03 days ago
              read: true
            },
            {
              sender: 'contact',
              text: 'Is there anything else you need help with?',
              timestamp: new Date(Date.now() - 1 * 86400000), // 1 day ago
              read: true
            }
          ]
        },
        {
          id: 4,
          name: 'Global Tech Solutions',
          avatar: '/placeholder.svg?height=40&width=40',
          lastMessage: 'Thank you for your interest. We\'ll be in touch soon.',
          lastMessageTime: new Date(Date.now() - 3 * 86400000), // 3 days ago
          unreadCount: 0,
          online: false,
          lastSeen: new Date(Date.now() - 1 * 86400000), // 1 day ago
          archived: true,
          messages: [
            {
              sender: 'user',
              text: 'Hello, I\'m interested in the Full Stack Developer position at Global Tech Solutions.',
              timestamp: new Date(Date.now() - 4 * 86400000), // 4 days ago
              read: true
            },
            {
              sender: 'contact',
              text: 'Thank you for your interest. We\'ll be in touch soon.',
              timestamp: new Date(Date.now() - 3 * 86400000), // 3 days ago
              read: true
            }
          ]
        }
      ],
      contacts: [
        { id: 101, name: 'Sarah Johnson', title: 'HR Manager at TechCorp', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 102, name: 'Michael Chen', title: 'Recruiter at InnovateTech', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 103, name: 'Emily Rodriguez', title: 'Talent Acquisition at GlobalSoft', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 104, name: 'David Kim', title: 'Technical Recruiter at DevHub', avatar: '/placeholder.svg?height=40&width=40' },
        { id: 105, name: 'Lisa Wang', title: 'HR Director at FutureTech', avatar: '/placeholder.svg?height=40&width=40' }
      ]
    };
  },
  methods: {
    selectConversation(conversation) {
      this.selectedConversation = conversation;
      
      // Mark messages as read
      if (conversation.unreadCount > 0) {
        conversation.messages.forEach(msg => {
          if (!msg.read) msg.read = true;
        });
        conversation.unreadCount = 0;
      }
    },
    sendMessage(text) {
      if (!text.trim() || !this.selectedConversation) return;
      
      // Add message to current conversation
      const newMsg = {
        sender: 'user',
        text: text,
        timestamp: new Date(),
        read: false
      };
      
      this.selectedConversation.messages.push(newMsg);
      this.selectedConversation.lastMessage = text;
      this.selectedConversation.lastMessageTime = new Date();
      
      // Simulate typing indicator and response
      this.simulateResponse();
    },
    simulateResponse() {
      // Only respond if we're still on the same conversation
      if (this.selectedConversation) {
        setTimeout(() => {
          const responses = [
            "Thanks for your message! I'll get back to you soon.",
            "Got it, I'll review this and follow up.",
            "Thank you for the update.",
            "I appreciate your prompt response.",
            "Great! Let me check my calendar and get back to you."
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          const responseMsg = {
            sender: 'contact',
            text: randomResponse,
            timestamp: new Date(),
            read: true
          };
          
          this.selectedConversation.messages.push(responseMsg);
          this.selectedConversation.lastMessage = randomResponse;
          this.selectedConversation.lastMessageTime = new Date();
        }, 2000 + Math.random() * 1000);
      }
    },
    markAsRead() {
      if (!this.selectedConversation) return;
      
      this.selectedConversation.messages.forEach(msg => {
        msg.read = true;
      });
      this.selectedConversation.unreadCount = 0;
    },
    archiveConversation() {
      if (!this.selectedConversation) return;
      
      this.selectedConversation.archived = !this.selectedConversation.archived;
      
      // If we're archiving and the current filter is not 'archived',
      // or if we're unarchiving and the current filter is 'archived',
      // then we should clear the selection
      if ((this.selectedConversation.archived && this.activeFilter !== 'archived') ||
          (!this.selectedConversation.archived && this.activeFilter === 'archived')) {
        this.selectedConversation = null;
      }
    },
    blockContact() {
      if (!this.selectedConversation) return;
      
      // This would typically involve an API call
      alert(`${this.selectedConversation.name} has been blocked.`);
    },
    deleteConversation() {
      if (!this.selectedConversation) return;
      
      if (confirm(`Are you sure you want to delete your conversation with ${this.selectedConversation.name}?`)) {
        const index = this.conversations.findIndex(c => c.id === this.selectedConversation.id);
        if (index !== -1) {
          this.conversations.splice(index, 1);
          this.selectedConversation = null;
        }
      }
    },
    startNewConversation() {
      const modal = new bootstrap.Modal(document.getElementById('newMessageModal'));
      modal.show();
    },
    createNewConversation(recipient, message) {
      if (!recipient || !message.trim()) return;
      
      // Check if conversation already exists
      const existingConv = this.conversations.find(c => c.name === recipient.name);
      
      if (existingConv) {
        // Add message to existing conversation
        existingConv.messages.push({
          sender: 'user',
          text: message,
          timestamp: new Date(),
          read: false
        });
        
        existingConv.lastMessage = message;
        existingConv.lastMessageTime = new Date();
        
        // Select the conversation
        this.selectConversation(existingConv);
      } else {
        // Create new conversation
        const newConv = {
          id: Date.now(), // Simple ID generation
          name: recipient.name,
          avatar: recipient.avatar,
          lastMessage: message,
          lastMessageTime: new Date(),
          unreadCount: 0,
          online: Math.random() > 0.5, // Random online status for demo
          archived: false,
          messages: [
            {
              sender: 'user',
              text: message,
              timestamp: new Date(),
              read: false
            }
          ]
        };
        
        this.conversations.push(newConv);
        this.selectConversation(newConv);
      }
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('newMessageModal'));
      if (modal) {
        modal.hide();
      }
      
      // Simulate response
      this.simulateResponse();
    }
  },
  mounted() {
    // Select first conversation by default
    if (this.conversations.length > 0) {
      this.selectConversation(this.conversations[0]);
    }
  }
};
</script>

<style scoped>
.messaging-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

.row {
  flex: 1;
  overflow: hidden;
}

.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.btn-primary {
  background-color: #6366f1;
  border-color: #6366f1;
}

.btn-primary:hover {
  background-color: #5253cc;
  border-color: #5253cc;
}

.btn-outline-primary {
  color: #6366f1;
  border-color: #6366f1;
}

.btn-outline-primary:hover {
  background-color: #6366f1;
  color: white;
}
</style>