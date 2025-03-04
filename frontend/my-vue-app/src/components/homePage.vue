<template>
    <div class="landing-container">
      <header>
        <h1>Welcome to Our Company</h1>
        <p>Your success starts here. Explore our services now.</p>
      </header>
  
      <div class="buttons">
        <button @click="goTo('/userlist')" class="user-btn">User Panel</button>
        <button @click="goTo('/Login')" class="signin-btn">Sign In</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const goTo = (path) => {
    router.push(path);
  };
  </script>
  
  <style lang="scss" scoped>
  .landing-container {
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f8f9fa;
    color: #333;
    padding: 20px;
  }
  
  header {
    margin-bottom: 30px;
  
    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    p {
      font-size: 1.2rem;
      color: #555;
    }
  }
  
  .buttons {
    display: flex;
    gap: 15px;
  
    button {
      padding: 12px 24px;
      font-size: 1.1rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
  
    .user-btn {
      background: #007bff;
      color: white;
  
      &:hover {
        background: #0056b3;
      }
    }
  
    .signin-btn {
      background: #28a745;
      color: white;
  
      &:hover {
        background: #1e7e34;
      }
    }
  }
  
  /* Responsive Design */
  @media (max-width: 600px) {
    header h1 {
      font-size: 2rem;
    }
  
    header p {
      font-size: 1rem;
    }
  
    .buttons {
      flex-direction: column;
      width: 80%;
  
      button {
        width: 100%;
      }
    }
  }
  </style>
  