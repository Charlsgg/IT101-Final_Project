<script setup>
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const cart = inject('cart');
const removeFromCart = inject('removeFromCart');

const cartTotal = computed(() => cart.reduce((total, item) => total + item.price, 0));

const goToCheckout = () => {
  router.push('/checkout');
};
</script>

<template>
  <section class="max-w-7xl mx-auto p-8 animate-[fadeIn_0.3s_ease]">
    
    <h2 class="text-2xl font-black mb-6">Your Bag <span class="text-gray-400 font-normal">({{ cart.length }})</span></h2>
    
    <div v-if="cart.length === 0" class="text-center py-20 text-text-muted">
      <p class="mb-6 text-lg">Your bag is empty.</p>
      <button class="btn-secondary" @click="router.push('/products')">View Products</button>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-8">
      
      <div class="flex flex-col">
        <div v-for="(item, index) in cart" :key="index" class="flex items-center gap-4 bg-surface p-4 mb-4 rounded-lg shadow-sm border border-transparent hover:border-border transition-colors">
          <img :src="item.image" class="w-20 h-20 object-cover rounded-md">
          
          <div class="flex-1">
            <h4 class="font-bold text-primary">{{ item.name }}</h4>
            <span class="font-medium text-text-muted">₱{{ item.price.toLocaleString() }}</span>
          </div>

          <button 
            class="w-8 h-8 rounded-full bg-red-100 text-red-500 text-xl leading-none flex items-center justify-center pb-1 transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110" 
            @click="removeFromCart(index)" 
            title="Remove item"
          >
            &minus;
          </button>
        </div>
      </div>
      
      <div class="bg-surface p-8 rounded-2xl h-fit shadow-sm border border-border">
        <h3 class="text-xl font-bold mb-6">Summary</h3>
        
        <div class="flex justify-between mb-3 text-text-muted font-medium">
          <span>Subtotal</span> 
          <span>₱{{ cartTotal.toLocaleString() }}</span>
        </div>
        
        <div class="flex justify-between mb-3 text-text-muted font-medium">
          <span>Tax</span> 
          <span>₱0.00</span>
        </div>
        
        <hr class="border-border my-6">
        
        <div class="flex justify-between font-extrabold text-primary text-xl mb-6">
          <span>Total</span> 
          <span>₱{{ cartTotal.toLocaleString() }}</span>
        </div>
        
        <button class="btn-primary full" @click="goToCheckout">Member Checkout</button>
      </div>
    </div>
  </section>
</template>