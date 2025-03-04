<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  errorMessage.value = ''; // Reset error message

  if (!email.value || !password.value) {
    errorMessage.value = "Email and password are required";
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email: email.value,
      password: password.value,
    });

    console.log('Login successful:', response.data);
    
 
    localStorage.setItem('token', response.data.token);
    const mytoken = localStorage.getItem("token")
    console.log("the token is",mytoken);

    // Redirect to dashboard
    router.push('/userlist');
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = error.response?.data?.error || "Login failed. Please try again.";
  }
};

const goToSignup = () => {
  router.push('/signup');
};
</script>

<template>
  <div class="page-container">
    <div class="form-container">
      <div class="form-header">
        <div class="logo"><span>✨</span></div>
        <h1>Welcome Back</h1>
        <p>Enter your credentials to continue your journey</p>
      </div>
      
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <div class="input-icon"><i class="icon">✉️</i></div>
          <input type="email" v-model="email" required placeholder=" ">
          <label>Email Address</label>
        </div>
        
        <div class="input-group">
          <div class="input-icon"><i class="icon">🔒</i></div>
          <input type="password" v-model="password" required placeholder=" ">
          <label>Password</label>
        </div>

        <!-- Error message display -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        
        <div class="remember-forgot">
          <label class="remember-me">
            <input type="checkbox">
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-link">Forgot Password?</a>
        </div>
        
        <button type="submit" class="submit-btn">
          <span>Login</span>
          <div class="btn-icon">→</div>
        </button>
      </form>
      
      <div class="signup-link">
        <p>Don't have an account? <a @click="goToSignup">Sign up</a></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #6c63ff;
$secondary-color: #4c46b6;
$text-color: #333;
$light-text: #666;
$lighter-text: #999;
$input-bg: #f5f5f5;
$white: #fff;
$shadow-color: rgba(108, 99, 255, 0.2);
$transition-time: 0.3s;
:root {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  width: 100%;
  height: 100vh;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.page-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.form-container {
  width: 100%;
  max-width: 450px;
  background: $white;
  border-radius: 20px;
  box-shadow: 0 15px 30px $shadow-color;
  padding: 40px;
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
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

.form-header {
  text-align: center;
  margin-bottom: 30px;
  
  .logo {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    animation: float 6s ease-in-out infinite;
    
    span {
      font-size: 2rem;
      color: $white;
    }
  }
  
  h1 {
    font-size: 2rem;
    color: $text-color;
    margin-bottom: 10px;
  }
  
  p {
    color: $light-text;
    font-size: 1rem;
  }
}

form {
  margin-bottom: 30px;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
  
  input {
    width: 100%;
    padding: 15px 15px 15px 50px;
    border: none;
    border-radius: 12px;
    background-color: $input-bg;
    font-size: 1rem;
    color: $text-color;
    transition: all $transition-time;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.3);
      
      & + label {
        top: -10px;
        left: 15px;
        font-size: 0.8rem;
        color: $primary-color;
        background: $white;
        padding: 0 5px;
      }
    }
    
    &:not(:placeholder-shown) + label {
      top: -10px;
      left: 15px;
      font-size: 0.8rem;
      color: $primary-color;
      background: $white;
      padding: 0 5px;
    }
  }
  
  label {
    position: absolute;
    top: 15px;
    left: 50px;
    color: $lighter-text;
    font-size: 1rem;
    pointer-events: none;
    transition: all $transition-time;
  }
  
  .input-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: $primary-color;
    font-size: 1.2rem;
    z-index: 1;
  }
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  .remember-me {
    display: flex;
    align-items: center;
    color: $light-text;
    font-size: 0.9rem;
    
    input {
      margin-right: 8px;
    }
  }
  
  .forgot-link {
    color: $primary-color;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all $transition-time;
    
    &:hover {
      color: $secondary-color;
      text-decoration: underline;
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(to right, $primary-color, $secondary-color);
  color: $white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all $transition-time;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  span {
    position: relative;
    z-index: 1;
  }
  
  .btn-icon {
    margin-left: 10px;
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba($primary-color, 0.3);
    
    .btn-icon {
      transform: translateX(5px);
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, $secondary-color, $primary-color);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
}

.social-login {
  margin-bottom: 30px;
  
  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    
    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background-color: #eee;
    }
    
    span {
      padding: 0 15px;
      color: $lighter-text;
      font-size: 0.9rem;
    }
  }
  
  .social-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    
    .social-btn {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      border: 1px solid #eee;
      background: $white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all $transition-time;
      
      span {
        font-size: 1.2rem;
        font-weight: bold;
      }
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      &.google span {
        color: #DB4437;
      }
      
      &.facebook span {
        color: #4267B2;
      }
      
      &.apple span {
        color: #000;
      }
    }
  }
}

.signup-link {
  text-align: center;
  
  p {
    color: $light-text;
    font-size: 0.9rem;
    
    a {
      color: $primary-color;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all $transition-time;
      
      &:hover {
        color: $secondary-color;
        text-decoration: underline;
      }
    }
  }
}

// Responsive styles
@media (max-width: 576px) {
  .form-container {
    padding: 30px 20px;
    border-radius: 15px;
  }
  
  .form-header {
    margin-bottom: 25px;
    
    .logo {
      width: 60px;
      height: 60px;
      margin-bottom: 15px;
    }
    
    h1 {
      font-size: 1.8rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
  
  .input-group {
    margin-bottom: 20px;
    
    input {
      padding: 12px 12px 12px 45px;
      font-size: 0.95rem;
    }
    
    label {
      font-size: 0.95rem;
      left: 45px;
    }
  }
  
  .remember-forgot {
    margin-bottom: 25px;
    font-size: 0.85rem;
  }
  
  .submit-btn {
    padding: 13px;
  }
  
  .social-buttons .social-btn {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 400px) {
  .form-container {
    padding: 25px 15px;
  }
  
  .form-header {
    .logo {
      width: 50px;
      height: 50px;
    }
    
    h1 {
      font-size: 1.6rem;
    }
  }
  
  .input-group input {
    padding: 10px 10px 10px 40px;
  }
  
  .social-buttons {
    gap: 10px;
    
    .social-btn {
      width: 40px;
      height: 40px;
    }
  }
}
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
}
</style>