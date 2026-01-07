<script setup>
// We define what data this component needs from the parent (App.vue)
defineProps({
  currentView: String,
  cartCount: Number,
  isAnimating: Boolean
});

// We define the events this component sends back to the parent
const emit = defineEmits(['navigate']);
</script>

<template>
  <nav class="navbar">
    <div class="logo" @click="$emit('navigate', 'home')">NikeHCI<span class="dot">.</span></div>
    
    <div class="nav-links">
      <a @click="$emit('navigate', 'home')" :class="{ active: currentView === 'home' }">Home</a>
      <a @click="$emit('navigate', 'products')" :class="{ active: currentView === 'products' }">New Releases</a>
      
      <button class="cart-btn" @click="$emit('navigate', 'cart')" :class="{ bump: isAnimating }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed; top: 0; width: 100%; height: 70px; z-index: 1000;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: space-between; padding: 0 5%;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
.logo { font-weight: 900; font-size: 1.5rem; cursor: pointer; letter-spacing: -1px; font-style: italic; }
.dot { color: var(--accent); }
.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-links a { text-decoration: none; color: var(--text-muted); font-weight: 500; cursor: pointer; transition: color 0.2s; }
.nav-links a:hover, .nav-links a.active { color: var(--primary); }
.cart-btn { background: none; border: none; cursor: pointer; position: relative; color: var(--text-main); transition: transform 0.2s; display: flex; align-items: center; }
.cart-btn.bump { transform: scale(1.2); color: var(--accent); }
.badge { position: absolute; top: -5px; right: -8px; background: var(--text-main); color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 10px; font-weight: 700; }
</style>