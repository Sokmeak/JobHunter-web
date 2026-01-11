<template>
    <div class="conversations-container">
      <!-- Search -->
      <div class="search-container mb-3">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            class="form-control border-start-0" 
            placeholder="Search messages..." 
            :value="searchQuery"
            @input="$emit('update:search-query', $event.target.value)"
          />
        </div>
      </div>
  
      <!-- Filter Tabs -->
      <div class="filter-tabs mb-3">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a 
              class="nav-link" 
              :class="{ 'active': activeFilter === 'all' }"
              href="#" 
              @click.prevent="$emit('update:active-filter', 'all')"
            >
              
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link" 
              :class="{ 'active': activeFilter === 'unread' }"
              href="#" 
              @click.prevent="$emit('update:active-filter', 'unread')"
            >
              Unread
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link" 
              :class="{ 'active': activeFilter === 'archived' }"
              href="#" 
              @click.prevent="$emit('update:active-filter', 'archived')"
            >
              Archived
            </a>
          </li>
        </ul>
      </div>
  
      <!-- Conversations List -->
      <div class="conversations-list">
        <conversation-item
          v-for="conversation in filteredConversations" 
          :key="conversation.id"
          :conversation="conversation"
          :is-active="selectedConversationId === conversation.id"
          @click="$emit('select-conversation', conversation)"
        />
  
        <div v-if="filteredConversations.length === 0" class="text-center py-4">
          <i class="bi bi-chat-left-text text-muted fs-1"></i>
          <p class="mt-2 text-muted">No conversations found</p>
          <button class="btn btn-primary mt-2" @click="$emit('new-conversation')">
            <i class="bi bi-plus-circle me-2"></i>
            New Message
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ConversationItem from './ConversationItem.vue';
  
  export default {
    name: 'ConversationList',
    components: {
      ConversationItem
    },
    props: {
      conversations: {
        type: Array,
        required: true
      },
      activeFilter: {
        type: String,
        default: 'all'
      },
      searchQuery: {
        type: String,
        default: ''
      },
      selectedConversationId: {
        type: [Number, String],
        default: null
      }
    },
    computed: {
      filteredConversations() {
        let filtered = [...this.conversations];
        
        // Apply search filter
        if (this.searchQuery.trim()) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(conv => 
            conv.name.toLowerCase().includes(query) || 
            conv.lastMessage.toLowerCase().includes(query)
          );
        }
        
        // Apply tab filter
        if (this.activeFilter === 'unread') {
          filtered = filtered.filter(conv => conv.unreadCount > 0);
        } else if (this.activeFilter === 'archived') {
          filtered = filtered.filter(conv => conv.archived);
        } else if (this.activeFilter === 'all') {
          filtered = filtered.filter(conv => !conv.archived);
        }
        
        // Sort by last message time (most recent first)
        filtered.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
        
        return filtered;
      }
    }
  };
  </script>
  
  <style scoped>
  .conversations-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e9ecef;
  }
  
  .conversations-list {
    flex: 1;
    overflow-y: auto;
  }
  
  .filter-tabs .nav-link {
    color: #6c757d;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 0.875rem;
  }
  
  .filter-tabs .nav-link.active {
    background-color: #6366f1;
    color: white;
  }
  </style>