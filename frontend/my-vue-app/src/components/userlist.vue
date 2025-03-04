<template>
  <div>
    <div class="user-list-container">
      <div class="header">
        <h1>User List</h1>
        <p>Click on a user to view their details</p>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading users...</p>
      </div>

      <div v-else class="user-list">
        <div
          v-for="user in users"
          :key="user.email"
          class="user-card"
          @click="viewUserDetails(user.email)"  
        >
          <div class="user-avatar">
            <img :src="user.details.picture.thumbnail" :alt="user.name" />
          </div>
          <div class="user-info">
            <h3>{{ user.name }}</h3>
            <p>Age: {{ user.age }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- New User Notification Popup -->
    <div v-if="showPopup" class="popup">{{ popupMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { io } from "socket.io-client";

const router = useRouter();
const users = ref([]);
const newUsers = ref([]);
const loading = ref(true);
const showPopup = ref(false);
const popupMessage = ref("");
const socket = io("http://localhost:3000"); // Backend URL

onMounted(() => {
  socket.on("updateUsers", ({ allUsers, newUsers: receivedNewUsers }) => {
    console.log("🔄 Updated Users Received", { allUsers, receivedNewUsers });

    if (receivedNewUsers.length > 0) {
      showPopup.value = true;
      popupMessage.value = `${receivedNewUsers.length} new user(s) added!`;

      setTimeout(() => {
        showPopup.value = false;
      }, 4000);
    }

    newUsers.value = receivedNewUsers;
    users.value = [...receivedNewUsers, ...allUsers]; // New users on top
    loading.value = false;
  });
});

onUnmounted(() => {
  socket.disconnect();
});

// ✅ Pass only email as parameter
const viewUserDetails = (email) => {
  router.push({ name: "UserDetail", params: { email } });
};
</script>

<style lang="scss" scoped>
$primary-color: #4a6bff;
$secondary-color: #6c63ff;
$text-color: #333;
$light-text: #666;
$lighter-text: #999;
$background-color: #f8f9fa;
$card-bg: #fff;
$shadow-color: rgba(0, 0, 0, 0.1);
$transition-time: 0.3s;

.user-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 2.5rem;
      color: $primary-color;
      margin-bottom: 10px;
    }

    p {
      color: $light-text;
      font-size: 1.1rem;
    }
  }

  .loading,
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;

    p {
      margin-top: 20px;
      color: $light-text;
      font-size: 1.1rem;
    }

    button {
      margin-top: 15px;
      padding: 10px 20px;
      background-color: $primary-color;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color $transition-time;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba($primary-color, 0.2);
    border-radius: 50%;
    border-top-color: $primary-color;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .user-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .user-card {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: $card-bg;
    border-radius: 12px;
    box-shadow: 0 4px 12px $shadow-color;
    cursor: pointer;
    transition: transform $transition-time, box-shadow $transition-time;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba($primary-color, 0.2);

      .arrow {
        transform: translateX(5px);
        opacity: 1;
      }
    }

    .user-avatar {
      margin-right: 15px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid $primary-color;
      }
    }

    .user-info {
      flex: 1;

      h3 {
        font-size: 1.1rem;
        color: $text-color;
        margin-bottom: 5px;
      }

      p {
        color: $light-text;
        font-size: 0.9rem;
      }
    }

    .view-details {
      .arrow {
        font-size: 1.2rem;
        color: $primary-color;
        opacity: 0.5;
        transition: transform $transition-time, opacity $transition-time;
      }
    }
  }
}

// Responsive styles
@media (max-width: 768px) {
  .user-list-container {
    padding: 15px;

    .header {
      margin-bottom: 20px;

      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1rem;
      }
    }

    .user-list {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 480px) {
  .user-list-container {
    padding: 10px;

    .header {
      h1 {
        font-size: 1.8rem;
      }
    }

    .user-card {
      padding: 12px;

      .user-avatar img {
        width: 40px;
        height: 40px;
      }

      .user-info h3 {
        font-size: 1rem;
      }
    }
  }
}

$primary-color: #4a6bff;
$background-color: #f8f9fa;
$card-bg: #fff;
$shadow-color: rgba(0, 0, 0, 0.1);
$popup-bg: #28a745;

.user-list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .header {
    text-align: center;
    margin-bottom: 30px;

    h1 {
      font-size: 2.5rem;
      color: $primary-color;
    }

    p {
      color: #666;
      font-size: 1.1rem;
    }
  }
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: $card-bg;
  border-radius: 12px;
  box-shadow: 0 4px 12px $shadow-color;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba($primary-color, 0.2);
  }

  .user-avatar img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid $primary-color;
  }
}

/* Popup for new users */
.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: $popup-bg;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 4px 10px $shadow-color;
  animation: fadeInOut 4s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  10% {
    opacity: 1;
    transform: translateX(0);
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(20px);
  }
}
</style>
