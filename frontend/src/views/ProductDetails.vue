<script setup>
import { computed, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 1. GET TOOLS
const route = useRoute();    
const router = useRouter();  

// 2. INJECT DATA & ACTIONS
const products = inject('products');
const addToCart = inject('addToCart');

// 3. FIND THE PRODUCT
const productId = Number(route.params.id);
const product = computed(() => products.find(p => p.id === productId));

const goBack = () => {
  router.push('/products');
};
</script>

<template>
  <section class="max-w-7xl mx-auto p-8 animate-[fadeIn_0.3s_ease]">
    
    <div v-if="product">
      <button 
        class="flex items-center gap-2 text-text-muted font-semibold mb-8 hover:text-primary transition-colors" 
        @click="goBack"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Browse
      </button>
      
      <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 md:gap-16 items-start">
        
        <div>
          <img 
            :src="product.image" 
            class="w-full h-auto max-h-[600px] rounded-2xl shadow-xl object-cover object-center" 
            :alt="product.name"
          >
        </div>
        
        <div class="flex flex-col justify-center top-0">
          <span class="w-fit bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase">
            Best Seller
          </span>
          
          <h1 class="text-4xl md:text-5xl font-black mb-2 tracking-tight text-primary">
            {{ product.name }}
          </h1>
          
          <h2 class="text-3xl font-medium mb-6 text-text-main">
            ₱{{ product.price.toLocaleString() }}
          </h2>
          
          <p class="text-text-muted leading-relaxed mb-10 text-lg">
            Expertly crafted for performance. Features premium materials for durability 
            and designed to elevate your daily routine, whether at the gym or on the street.
          </p>
          
          <button class="btn-primary w-full text-lg py-4 shadow-lg hover:shadow-xl" @click="addToCart(product)">
            Add to Cart — ₱{{ product.price.toLocaleString() }}
          </button>

          <div class="flex gap-8 mt-10 text-sm text-text-muted font-semibold">
            <div class="flex items-center gap-2 cursor-help" title="Free standard shipping on all orders">
              <span>🚚</span> Free Shipping
            </div>
            <div class="flex items-center gap-2 cursor-help" title="Returns accepted within 60 days">
              <span>↩️</span> 60-Day Returns
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-24">
      <h2 class="text-2xl font-bold mb-6 text-primary">Product not found</h2>
      <button class="btn-secondary" @click="goBack">Go Back</button>
    </div>

  </section>
</template>