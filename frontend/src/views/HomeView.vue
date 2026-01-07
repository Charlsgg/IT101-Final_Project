<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goShop = (filter = 'All') => {
  router.push({ name: 'products', query: { filter: filter } });
};
</script>

<template>
  <div class="animate-[fadeIn_0.5s_ease]">
    
    <section class="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-8 gap-16">
      
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-6xl md:text-7xl font-black uppercase leading-[0.95] mb-6 tracking-tighter">
          Your Workout, <br>
          <span class="text-text-main">Your Space.</span>
        </h1>
        
        <p class="text-lg text-text-muted mb-8 max-w-md mx-auto md:mx-0">
          Equip your home gym with our new recovery rollers, yoga mats, and training gear.
        </p>
        
        <button class="btn-primary large" @click="goShop('All')">
          Shop All Products
        </button>
      </div>
      
      <div class="flex-1 w-full">
         <img 
           src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80" 
           alt="Home Workout"
           class="w-full max-h-[500px] object-cover object-center rounded-3xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-out"
         >
      </div>
    </section>

    <section class="max-w-7xl mx-auto my-20 px-8">
      <h2 class="text-3xl font-black mb-8">Shop by Collection</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div 
          class="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300" 
          @click="goShop('Home & Gym')"
        >
          <img 
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" 
            alt="Gym Equipment"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 class="text-2xl font-bold mb-2">Home Gym</h3>
            <span class="text-sm font-semibold underline decoration-2 underline-offset-4 opacity-90">Equip Now &rarr;</span>
          </div>
        </div>

        <div 
          class="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300" 
          @click="goShop('Shoes')"
        >
          <img 
            src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80" 
            alt="Running Shoes"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 class="text-2xl font-bold mb-2">Running</h3>
            <span class="text-sm font-semibold underline decoration-2 underline-offset-4 opacity-90">Find Your Pace &rarr;</span>
          </div>
        </div>

        <div 
          class="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300" 
          @click="goShop('Lifestyle')"
        >
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" 
            alt="Lifestyle"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <h3 class="text-2xl font-bold mb-2">Lifestyle</h3>
            <span class="text-sm font-semibold underline decoration-2 underline-offset-4 opacity-90">Shop The Look &rarr;</span>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>