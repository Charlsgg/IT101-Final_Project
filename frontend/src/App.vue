<script setup>
import { ref, reactive, computed, provide } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

const cart = reactive([]);
const isAnimatingCart = ref(false);

const products = reactive([
  { id: 1, name: "Nike Air Zoom Pegasus", price: 6995, category: "Running", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Nike Air Force 1 '07", price: 6395, category: "Lifestyle", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Nike Dunk Low Retro", price: 8150, category: "Streetwear", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Nike Metcon 8", price: 7550, category: "Training", image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Nike Air Max 97", price: 10150, category: "Lifestyle", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Nike Blazer Mid '77", price: 6095, category: "Vintage", image: "https://images.unsplash.com/photo-1588117260148-447885057ec3?auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "Air Jordan 1 High OG", price: 10450, category: "Basketball", image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=500&q=80" },
  { id: 8, name: "Nike Air Huarache", price: 7250, category: "Lifestyle", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80" },
  { id: 9, name: "Nike Zoom Fly 5", price: 9295, category: "Running", image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=500&q=80" },
  { id: 10, name: "Nike Air Max 90", price: 7550, category: "Classic", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=500&q=80" },
  { id: 11, name: "Nike Free Run 5.0", price: 5800, category: "Running", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80" },
  { id: 12, name: "Nike SB Chron 2", price: 4950, category: "Skateboarding", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80" },
  { id: 13, name: "Nike Sportswear Club Fleece", price: 3495, category: "Apparel", image: "https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=500&q=80" },
  { id: 14, name: "Nike Heritage Backpack", price: 2195, category: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80" },
  { id: 15, name: "Nike Pro Dri-FIT Tee", price: 1895, category: "Apparel", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=500&q=80" },
  { id: 16, name: "Nike Legacy91 Cap", price: 1295, category: "Accessories", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80" },
  { id: 17, name: "Nike Tech Fleece Joggers", price: 4995, category: "Apparel", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80" },
  { id: 18, name: "Nike HyperCharge Bottle", price: 995, category: "Accessories", image: "https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&w=500&q=80" }
]);

const addToCart = (product) => {
  cart.push({ ...product });
  isAnimatingCart.value = true;
  setTimeout(() => isAnimatingCart.value = false, 300);
};

const removeFromCart = (index) => {
  cart.splice(index, 1);
};

const clearCart = () => {
  cart.length = 0;
};

provide('products', products);
provide('cart', cart);
provide('addToCart', addToCart);
provide('removeFromCart', removeFromCart);
provide('clearCart', clearCart);

const cartCount = computed(() => cart.length);
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans bg-bg text-text-main leading-relaxed">
    
    <NavBar :cartCount="cartCount" :isAnimating="isAnimatingCart" />

    <main class="flex-1 pt-[80px] w-full">
      <RouterView />
    </main>

    <AppFooter />
    
  </div>
</template>