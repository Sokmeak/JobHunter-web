<template>
  <div class="team-member-card">
    <div class="card border-0 shadow-sm h-100 rounded-3 team-card">
      <div class="card-body p-3 text-center">
        <div class="position-relative mb-3 mx-auto">
          <div class="member-photo-container">
            <img :src="member.photo" :alt="member.name" class="member-photo" />
          </div>
          <div class="member-status"></div>
        </div>
        <h3 class="member-name mb-1">{{ member.name }}</h3>
        <p class="member-position mb-3">{{ member.position }}</p>
        <div class="social-links d-flex justify-content-center gap-2">
          <a :href="member.social.linkedin" class="social-link linkedin">
            <i class="bi bi-linkedin"></i>
          </a>
          <a :href="member.social.twitter" class="social-link twitter">
            <i class="bi bi-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.team-member-card {
  transition: all 0.3s ease;
}

.team-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(70, 64, 222, 0.1) !important;
}

.member-photo-container {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  border: 3px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.member-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #56cdad;
  border: 2px solid #fff;
}

.member-name {
  font-size: 1rem;
  font-weight: 700;
  color: #25324b;
}

.member-position {
  font-size: 0.85rem;
  color: #6b7280;
}

.social-links {
  margin-top: auto;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #6b7280;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-2px);
}

.social-link.linkedin:hover {
  background-color: #0077b5;
  color: white;
}

.social-link.twitter:hover {
  background-color: #1da1f2;
  color: white;
}
</style>
