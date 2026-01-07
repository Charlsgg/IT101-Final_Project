<script setup>
import { ref, computed, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const products = inject('products');
const router = useRouter();
const route = useRoute();

const viewDetails = (product) => {
  router.push({ name: 'details', params: { id: product.id } });
};

// --- FILTER LOGIC ---
const activeFilter = ref(route.query.filter || 'All');

const filteredProducts = computed(() => {
  if (activeFilter.value === 'All') return products;
  
  return products.filter(p => {
    if (activeFilter.value === 'Shoes') return !['Home', 'Apparel', 'Accessories'].includes(p.category);
    if (activeFilter.value === 'Home & Gym') return ['Home', 'Accessories', 'Training'].includes(p.category);
    if (activeFilter.value === 'Lifestyle') return ['Lifestyle', 'Streetwear', 'Vintage', 'Apparel'].includes(p.category);
    return true;
  });
});

const setFilter = (filter) => {
  activeFilter.value = filter;
  router.replace({ query: { filter: filter } }); 
};
</script>

<template>
  <section class="max-w-7xl mx-auto p-8 animate-[fadeIn_0.4s_ease]">
    
    <div class="mb-6">
      <h2 class="text-2xl font-black mb-2">New Releases</h2>
      <p class="text-text-muted">The latest drops in footwear and equipment.</p>
    </div>
    
    <div class="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
      <button 
        v-for="filter in ['All', 'Shoes', 'Home & Gym', 'Lifestyle']" 
        :key="filter"
        @click="setFilter(filter)"
        class="px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 whitespace-nowrap"
        :class="activeFilter === filter 
          ? 'bg-primary text-white border-primary' 
          : 'bg-white border-border text-text-muted hover:border-primary hover:text-primary'"
      >
        {{ filter }}
      </button>
    </div>
    
    <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
      
      <article 
        v-for="p in filteredProducts" 
        :key="p.id" 
        class="bg-surface cursor-pointer group transition-transform duration-300 hover:-translate-y-1" 
        @click="viewDetails(p)"
      >
        <div class="h-[300px] bg-gray-100 relative overflow-hidden rounded-lg">
          <img 
            :src="p.image" 
            :alt="p.name" 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          
          <div class="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2.5 text-center text-sm translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            Quick View
          </div>
        </div>

        <div class="py-4">
          <span class="text-xs font-bold text-text-muted uppercase tracking-wide">{{ p.category }}</span>
          <h4 class="font-bold text-lg mt-1 text-primary">{{ p.name }}</h4>
          <p class="font-semibold mt-1 text-text-main">₱{{ p.price.toLocaleString() }}</p>
        </div>
      </article>

    </div>

    <div v-if="filteredProducts.length === 0" class="text-center py-16 text-text-muted">
      <p>No products found in this category.</p>
    </div>

  </section>
</template>