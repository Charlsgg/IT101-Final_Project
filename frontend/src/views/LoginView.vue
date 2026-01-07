<script setup>
import { reactive, inject } from 'vue'; 

const login = inject('login');

const form = reactive({ email: '', password: '' });
const errors = reactive({ email: null, password: null });

const validate = () => {
  let isValid = true;
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
    isValid = false;
  } else { errors.email = null; }

  if (!form.password || form.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
    isValid = false;
  } else { errors.password = null; }
  
  return isValid;
};

const handleLogin = () => {
  if (validate()) {
    login(); 
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="w-full max-w-md p-8">
      <div class="text-center mb-8">
          <svg class="w-12 h-12 mx-auto mb-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.601.575-1.16 1.14-1.577 1.774-.208.316-.361.626-.457.924-.097.298-.131.574-.105.828.026.254.097.473.206.65.11.177.251.309.412.394.16.085.343.126.538.126.515 0 1.234-.229 2.023-.597l12.035-5.533c.993-.456 1.655-1.386 1.766-2.483.11-1.097-.301-2.207-1.097-2.961-.796-.754-1.886-1.086-2.906-.916-1.02.169-1.984.664-2.746 1.358l-12 11c-.924.847-1.239 2.185-.807 3.428.433 1.243 1.561 2.173 2.888 2.381 1.327.208 2.706-.29 3.687-1.33l12-12.7c.981-1.04 1.349-2.544 1.026-4.033-.323-1.489-1.251-2.714-2.507-3.447-1.256-.733-2.786-.93-4.129-.494-1.343.435-2.524 1.44-3.157 2.686L7.18 18.33l-4.36 1.85Z"/></svg>
          <h2 class="text-2xl font-black uppercase tracking-tight mb-2">Your Account for <br> Everything Nike</h2>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input v-model="form.email" type="email" placeholder="Email address" class="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-black transition-colors" :class="{ 'border-red-500': errors.email }">
          <span v-if="errors.email" class="text-red-500 text-xs mt-1 block">{{ errors.email }}</span>
        </div>
        <div>
          <input v-model="form.password" type="password" placeholder="Password" class="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-black transition-colors" :class="{ 'border-red-500': errors.password }">
          <span v-if="errors.password" class="text-red-500 text-xs mt-1 block">{{ errors.password }}</span>
        </div>
        <button type="submit" class="btn-primary w-full mt-6 uppercase tracking-wider text-sm font-bold">Sign In</button>
      </form>
    </div>
  </div>
</template>