<template>
  <div class="notifications-container">
    <div class="notifications-header">
      <h1 class="notifications-title">Notifications</h1>
      <button class="mark-all-read" @click="markAllAsRead">
        Mark all as read
      </button>
    </div>

    <div class="notifications-list">
      <div v-for="(notification, index) in notifications" :key="index" class="notification-item" :class="{ 'unread': !notification.read }">
        <div class="notification-avatar">
          <img :src="notification.sender.avatar" :alt="notification.sender.name" class="avatar-img">
        </div>
        
        <div class="notification-content">
          <div class="notification-header">
            <span class="sender-name">{{ notification.sender.name }}</span>
            <span class="notification-text" v-html="notification.text"></span>
          </div>
          
          <div v-if="notification.badge" class="notification-badge" :class="notification.badge.toLowerCase()">
            {{ notification.badge }}
          </div>
          
          <!-- Interview details card -->
          <div v-if="notification.type === 'interview'" class="interview-card">
            <div class="interview-header">
              <h3 class="interview-title">{{ notification.interview.title }}</h3>
              <p class="interview-role">{{ notification.interview.role }}</p>
            </div>
            
            <div class="interview-details">
              <div class="interview-date">
                <i class="bi bi-calendar"></i>
                <div>
                  <div class="detail-label">Date</div>
                  <div class="detail-value">{{ notification.interview.date }}</div>
                </div>
              </div>
              
              <div class="interview-time">
                <i class="bi bi-clock"></i>
                <div>
                  <div class="detail-label">Time</div>
                  <div class="detail-value">{{ notification.interview.time }}</div>
                </div>
              </div>
            </div>
            
            <div class="interview-contact">
              <img :src="notification.interview.contact.avatar" :alt="notification.interview.contact.name" class="contact-avatar">
              <div class="contact-info">
                <div class="contact-name">{{ notification.interview.contact.name }}</div>
                <div class="contact-email">{{ notification.interview.contact.email }}</div>
              </div>
            </div>
          </div>
          
          <div class="notification-time">{{ notification.time }}</div>
        </div>
      </div>
      
      <div v-if="notifications.length === 0" class="no-notifications">
        <i class="bi bi-bell-slash"></i>
        <p>No notifications yet</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  data() {
    return {
      notifications: [
        {
          id: 1,
          sender: {
            name: 'Jan Mayer',
            avatar: 'https://v0.dev/placeholder.svg?height=80&width=80'
          },
          text: 'invited you to interview with Nomad',
          badge: 'New',
          time: '12 mins ago',
          read: false,
          type: 'simple'
        },
        {
          id: 2,
          sender: {
            name: 'Jana Alicia',
            avatar: 'https://v0.dev/placeholder.svg?height=80&width=80'
          },
          text: 'from Udacity updated your job applications status',
          badge: 'Shortlisted',
          time: '3 days ago',
          read: false,
          type: 'simple'
        },
        {
          id: 3,
          sender: {
            name: 'Ally Wales',
            avatar: 'https://v0.dev/placeholder.svg?height=80&width=80'
          },
          text: 'from Digital Ocean sent you an interview invitation',
          time: '14 July 2021 • 3:26 PM',
          read: false,
          type: 'interview',
          interview: {
            title: 'Interview - Jake Gyll',
            role: 'Social Media Manager Role',
            date: 'Mon, 20 July 2021',
            time: '12 PM - 12:30 PM',
            contact: {
              name: 'Jake Gyll',
              email: 'jakegyll@email.com',
              avatar: 'https://v0.dev/placeholder.svg?height=50&width=50'
            }
          }
        }
      ]
    };
  },
  methods: {
    markAllAsRead() {
      this.notifications.forEach(notification => {
        notification.read = true;
      });
    }
  }
};
</script>

<style scoped>
.notifications-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 800px;
  margin: 0 auto;
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e8eaed;
}

.notifications-title {
  font-size: 24px;
  font-weight: 600;
  color: #202124;
  margin: 0;
}

.mark-all-read {
  background: none;
  border: none;
  color: #4285f4;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.mark-all-read:hover {
  text-decoration: underline;
}

.notifications-list {
  max-height: 600px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 20px 24px;
  border-bottom: 1px solid #e8eaed;
  transition: background-color 0.2s ease;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: #f8f9fa;
}

.notification-item.unread {
  background-color: #FFFFFF;
}

.notification-avatar {
  margin-right: 16px;
  flex-shrink: 0;
}

.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.notification-content {
  flex: 1;
}

.notification-header {
  margin-bottom: 8px;
}

.sender-name {
  font-weight: 600;
  color: #202124;
  margin-right: 4px;
}

.notification-text {
  color: #5f6368;
}

.notification-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.notification-badge.new {
  color: #f29900;
  background-color: rgba(242, 153, 0, 0.1);
  border: 1px solid rgba(242, 153, 0, 0.2);
}

.notification-badge.shortlisted {
  color: #34a853;
  background-color: rgba(52, 168, 83, 0.1);
  border: 1px solid rgba(52, 168, 83, 0.2);
}

.notification-time {
  font-size: 14px;
  color: #9aa0a6;
  margin-top: 8px;
}

.interview-card {
  background-color: #F9FAFC;
  border-radius: 6px;
  padding: 16px;
  margin: 12px 0;
  border-left: 4px solid #4640DE;
}

.interview-header {
  margin-bottom: 16px;
}

.interview-title {
  font-size: 18px;
  font-weight: 600;
  color: #202124;
  margin: 0 0 4px 0;
}

.interview-role {
  font-size: 14px;
  color: #5f6368;
  margin: 0;
}

.interview-details {
  display: flex;
  margin-bottom: 16px;
  gap: 24px;
}

.interview-date, .interview-time {
  display: flex;
  align-items: flex-start;
}

.interview-date i, .interview-time i {
  margin-right: 12px;
  font-size: 20px;
  color: #5f6368;
}

.detail-label {
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 15px;
  color: #202124;
  font-weight: 500;
}

.interview-contact {
  display: flex;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e8eaed;
}

.contact-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
}

.contact-name {
  font-size: 15px;
  font-weight: 500;
  color: #202124;
}

.contact-email {
  font-size: 14px;
  color: #5f6368;
}

.no-notifications {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  color: #9aa0a6;
}

.no-notifications i {
  font-size: 48px;
  margin-bottom: 16px;
}

.no-notifications p {
  font-size: 16px;
}

@media (max-width: 576px) {
  .notifications-header {
    padding: 16px;
  }
  
  .notifications-title {
    font-size: 20px;
  }
  
  .notification-item {
    padding: 16px;
  }
  
  .avatar-img {
    width: 40px;
    height: 40px;
  }
  
  .interview-details {
    flex-direction: column;
    gap: 12px;
  }
}
</style>