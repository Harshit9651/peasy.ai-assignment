<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const user = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const email = route.params.email; 
  console.log("🔍 Fetching user details for:", email);

  try {
    const response = await fetch("http://localhost:3000/user/userdata", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email }),
});
    if (!response.ok) throw new Error("User not found");

    const data = await response.json();
  
    console.log("User Data:", JSON.stringify(data, null, 2));

    user.value = data.user;

  } catch (err) {
    error.value = "Failed to load user details. Please try again later.";
    console.error("Error fetching user:", err);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.replace("/userlist"); 
};
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="user-detail-container">
    <button class="back-button" @click="goBack">
      <span class="back-arrow">←</span>
      <span>Back to List</span>
    </button>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading user details...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="goBack">Go Back</button>
    </div>

    <div v-else-if="user" class="user-card">
      <div class="user-header">
        <div class="user-avatar">
          <img :src="user?.details?.picture?.large || '/default-avatar.png'" :alt="`${user?.details?.name?.first} ${user?.details?.name?.last}`" />
        </div>
        <div class="user-name">
          <h1>{{ user?.details?.name?.title }} {{ user?.details?.name?.first }} {{ user?.details?.name?.last }}</h1>
          <p>{{ user?.details?.email }}</p>
        </div>
      </div>

      <div class="user-details">
        <div class="detail-section">
          <h2>Personal Information</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Age</span>
              <span class="value">{{ user?.details?.dob?.age || "N/A" }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Gender</span>
              <span class="value">{{ user?.details?.gender || "N/A" }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Date of Birth</span>
              <span class="value">{{ formatDate(user?.details?.dob?.date) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Nationality</span>
              <span class="value">{{ user?.details?.nat || "N/A" }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h2>Contact Information</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Email</span>
              <span class="value">{{ user?.details?.email }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Phone</span>
              <span class="value">{{ user?.details?.phone || "N/A" }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Cell</span>
              <span class="value">{{ user?.details?.cell || "N/A" }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Username</span>
              <span class="value">{{ user?.details?.login?.username || "N/A" }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h2>Address</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Street</span>
              <span class="value">{{ user?.details?.location?.street?.number }} {{ user?.details?.location?.street?.name }}</span>
            </div>
            <div class="detail-item">
              <span class="label">City</span>
              <span class="value">{{ user?.details?.location?.city || "N/A" }}</span>
            </div>
            <div class="detail-item">
              <span class="label">State</span>
              <span class="value">{{ user?.details?.location?.state || "N/A" }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Country</span>
              <span class="value">{{ user?.details?.location?.country || "N/A" }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Postcode</span>
              <span class="value">{{ user?.details?.location?.postcode || "N/A" }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h2>Account Information</h2>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Registered Date</span>
              <span class="value">{{ formatDate(user?.details?.registered?.date) }}</span>
            </div>
            <div class="detail-item">
              <span class="label">Account Age</span>
              <span class="value">{{ user?.details?.registered?.age }} years</span>
            </div>
            <div class="detail-item">
              <span class="label">UUID</span>
              <span class="value">{{ user?.details?.login?.uuid || "N/A" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
$primary-color: #4a6bff;
$secondary-color: #6c63ff;
$text-color: #333;
$light-text: #666;
$lighter-text: #999;
$background-color: #f8f9fa;
$card-bg: #fff;
$shadow-color: rgba(0, 0, 0, 0.1);
$border-color: #eee;
$transition-time: 0.3s;

.user-detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
  
  .back-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    color: $primary-color;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 30px;
    padding: 0;
    transition: color $transition-time;
    
    .back-arrow {
      margin-right: 8px;
      font-size: 1.2rem;
      transition: transform $transition-time;
    }
    
    &:hover {
      color: darken($primary-color, 15%);
      
      .back-arrow {
        transform: translateX(-5px);
      }
    }
  }
  
  .loading, .error {
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
  
  .user-card {
    background-color: $card-bg;
    border-radius: 16px;
    box-shadow: 0 10px 30px $shadow-color;
    overflow: hidden;
    animation: fadeIn 0.5s ease-out;
    
    .user-header {
      display: flex;
      align-items: center;
      padding: 30px;
      background: linear-gradient(135deg, $primary-color, $secondary-color);
      color: white;
      
      .user-avatar {
        margin-right: 25px;
        
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      }
      
      .user-name {
        h1 {
          font-size: 2rem;
          margin-bottom: 5px;
        }
        
        p {
          font-size: 1.1rem;
          opacity: 0.9;
        }
      }
    }
    
    .user-details {
      padding: 30px;
      
      .detail-section {
        margin-bottom: 30px;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        h2 {
          font-size: 1.5rem;
          color: $primary-color;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid $border-color;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          
          .detail-item {
            display: flex;
            flex-direction: column;
            
            .label {
              font-size: 0.9rem;
              color: $lighter-text;
              margin-bottom: 5px;
            }
            
            .value {
              font-size: 1.1rem;
              color: $text-color;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive styles
@media (max-width: 768px) {
  .user-detail-container {
    padding: 20px 15px;
    
    .user-card {
      .user-header {
        padding: 25px 20px;
        
        .user-avatar {
          margin-right: 20px;
          
          img {
            width: 80px;
            height: 80px;
          }
        }
        
        .user-name {
          h1 {
            font-size: 1.6rem;
          }
          
          p {
            font-size: 1rem;
          }
        }
      }
      
      .user-details {
        padding: 20px;
        
        .detail-section {
          h2 {
            font-size: 1.3rem;
          }
          
          .detail-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
          }
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .user-detail-container {
    padding: 15px 10px;
    
    .user-card {
      .user-header {
        flex-direction: column;
        text-align: center;
        padding: 20px 15px;
        
        .user-avatar {
          margin-right: 0;
          margin-bottom: 15px;
        }
        
        .user-name {
          h1 {
            font-size: 1.4rem;
          }
        }
      }
      
      .user-details {
        padding: 15px;
        
        .detail-section {
          margin-bottom: 20px;
          
          h2 {
            font-size: 1.2rem;
          }
          
          .detail-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      }
    }
  }
}
</style>