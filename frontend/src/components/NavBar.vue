<script setup>
import { useRouter } from 'vue-router';

defineProps({
  cartCount: Number,
  isAnimating: Boolean
});

const router = useRouter();

const go = (name) => {
  router.push({ name: name });
};
</script>

<template>
  <nav class="fixed top-0 w-full h-[70px] z-50 bg-surface/85 backdrop-blur-md flex items-center justify-between px-[5%] border-b border-black/5">
    
    <div class="font-black text-2xl cursor-pointer tracking-tighter italic text-primary" @click="go('home')">
      NikeHCI<span class="text-accent">.</span>
    </div>
    
    <div class="flex items-center gap-8">
      <a class="text-text-muted font-medium cursor-pointer transition-colors duration-200 hover:text-primary" @click="go('home')">Home</a>
      <a class="text-text-muted font-medium cursor-pointer transition-colors duration-200 hover:text-primary" @click="go('products')">New Releases</a>
      
      <button 
        class="relative flex items-center bg-transparent border-none cursor-pointer text-text-main transition-transform duration-200 ease-out" 
        :class="{ 'scale-125 text-accent': isAnimating }"
        @click="go('cart')" 
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        
        <span v-if="cartCount > 0" class="absolute -top-1 -right-2 bg-primary text-white text-[0.7rem] px-1.5 py-0.5 rounded-full font-bold">
          {{ cartCount }}
        </span>
      </button>
    </div>
  </nav>
</template>