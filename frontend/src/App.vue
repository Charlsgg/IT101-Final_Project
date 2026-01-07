<script setup>
import { ref, reactive, computed, provide } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

const router = useRouter();

const cart = reactive([]);
const isAnimatingCart = ref(false);
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

const login = () => {
  isLoggedIn.value = true;
  localStorage.setItem('isLoggedIn', 'true');
  router.push('/');
};

const logout = () => {
  isLoggedIn.value = false;
  localStorage.removeItem('isLoggedIn');
  router.push('/login');
};

const products = reactive([
  { 
    id: 1, 
    name: "Nike Air Zoom Pegasus", 
    price: 6995, 
    category: "Running", 
    image: "https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 2, 
    name: "Nike Air Force 1 '07", 
    price: 6395, 
    category: "Lifestyle", 
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 3, 
    name: "Nike Dunk Low Retro", 
    price: 8150, 
    category: "Streetwear", 
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 4, 
    name: "Nike Metcon 8", 
    price: 7550, 
    category: "Training", 
    image: "https://images.pexels.com/photos/8472917/pexels-photo-8472917.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 5, 
    name: "Nike Air Max 97", 
    price: 10150, 
    category: "Lifestyle", 
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 6, 
    name: "Nike Blazer Mid '77", 
    price: 6095, 
    category: "Vintage", 
    image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  { 
    id: 7, 
    name: "Air Jordan 1 High OG", 
    price: 10450, 
    category: "Basketball", 
    image: "https://images.pexels.com/photos/6050919/pexels-photo-6050919.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 8, 
    name: "Nike Air Huarache", 
    price: 7250, 
    category: "Lifestyle", 
    image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 9, 
    name: "Nike Zoom Fly 5", 
    price: 9295, 
    category: "Running", 
    image: "https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 10, 
    name: "Nike Air Max 90", 
    price: 7550, 
    category: "Classic", 
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 11, 
    name: "Nike Free Run 5.0", 
    price: 5800, 
    category: "Running", 
    image: "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 12, 
    name: "Nike SB Chron 2", 
    price: 4950, 
    category: "Skateboarding", 
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 13, 
    name: "Nike Sportswear Club Fleece", 
    price: 3495, 
    category: "Apparel", 
    image: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 14, 
    name: "Nike Heritage Backpack", 
    price: 2195, 
    category: "Accessories", 
    image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 15, 
    name: "Nike Pro Dri-FIT Tee", 
    price: 1895, 
    category: "Apparel", 
    image: "https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 16, 
    name: "Nike Legacy91 Cap", 
    price: 1295, 
    category: "Accessories", 
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 17, 
    name: "Nike Tech Fleece Joggers", 
    price: 4995, 
    category: "Apparel", 
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 18, 
    name: "Nike HyperCharge Bottle", 
    price: 995, 
    category: "Accessories", 
    image: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=600" 
  }
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
provide('login', login);
provide('logout', logout);

const cartCount = computed(() => cart.length);
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans bg-bg text-text-main leading-relaxed">
    
    <NavBar v-if="isLoggedIn" :cartCount="cartCount" :isAnimating="isAnimatingCart" />

    <main class="flex-1 w-full" :class="{ 'pt-[80px]': isLoggedIn }">
      <RouterView />
    </main>

    <AppFooter v-if="isLoggedIn" />
    
  </div>
</template>