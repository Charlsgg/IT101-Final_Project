<script setup>
import { ref, reactive, computed } from 'vue';

// --- STATE MANAGEMENT ---
const currentView = ref('home');
const cart = reactive([]);
const isAnimatingCart = ref(false);
const selectedProduct = ref(null);

// Replace the old furniture products with this:
const products = reactive([
  { 
    id: 1, 
    name: "Nike Air Zoom Pegasus", 
    price: 120, 
    category: "Running", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 2, 
    name: "Nike Air Force 1 '07", 
    price: 110, 
    category: "Lifestyle", 
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 3, 
    name: "Nike Dunk Low Retro", 
    price: 140, 
    category: "Streetwear", 
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 4, 
    name: "Nike Metcon 8", 
    price: 130, 
    category: "Training", 
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=500&q=80" 
  },
]);

// --- ACTIONS ---
const navigateTo = (page, product = null) => {
  currentView.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (product) selectedProduct.value = product;
};

const addToCart = (product) => {
  cart.push({ ...product });
  isAnimatingCart.value = true;
  setTimeout(() => isAnimatingCart.value = false, 300);
};

const cartTotal = computed(() => cart.reduce((total, item) => total + item.price, 0));

const cardInput = ref('');
const formatCard = (e) => {
  let val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  cardInput.value = val;
};

const submitOrder = () => {
  alert("Order Placed Successfully!");
  cart.length = 0;
  navigateTo('home');
};
</script>

<template>
  <div class="app-container">

    <nav class="navbar">
      <div class="logo" @click="navigateTo('home')">NikeHCI<span class="dot">.</span></div>
      <div class="nav-links">
        <a @click="navigateTo('home')" :class="{ active: currentView === 'home' }">Home</a>
        <a @click="navigateTo('products')" :class="{ active: currentView === 'products' }">Shop</a>
        
        <button class="cart-btn" @click="navigateTo('cart')" :class="{ bump: isAnimatingCart }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          
          <span class="badge" v-if="cart.length > 0">{{ cart.length }}</span>
        </button>
      </div>
    </nav>

    <main class="content-wrapper">

      <section v-if="currentView === 'home'" class="hero-section">
        <div class="hero-content">
          <h1>Just Do <br><span class="highlight">It.</span></h1>
          <p>Engineered for speed, designed for comfort. Experience the next evolution of motion.</p>
          <button class="btn-primary large" @click="navigateTo('products')">Shop New Arrivals</button>
        </div>
        <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80" alt="Nike Running">
        </div>
      </section>

      <section v-if="currentView === 'products'" class="page-section">
        <div class="section-header">
          <h2>Trending Now</h2>
          <p>Curated items for your workspace.</p>
        </div>
        <div class="grid">
          <article v-for="p in products" :key="p.id" class="product-card" @click="navigateTo('details', p)">
            <div class="img-wrapper">
              <img :src="p.image" :alt="p.name">
              <div class="overlay">View Details</div>
            </div>
            <div class="card-details">
              <span class="category">{{ p.category }}</span>
              <h4>{{ p.name }}</h4>
              <p class="price">${{ p.price }}</p>
            </div>
          </article>
        </div>
      </section>

      <section v-if="currentView === 'details'" class="page-section details-view">
        <button class="back-btn" @click="navigateTo('products')">
          <i class="fas fa-arrow-left"></i> Back
        </button>
        
        <div class="product-split">
          <div class="product-image-large">
            <img :src="selectedProduct.image" class="detail-img">
          </div>
          <div class="product-info">
            <span class="tag">Best Seller</span>
            <h1>{{ selectedProduct.name }}</h1>
            <h2 class="price-display">${{ selectedProduct.price }}</h2>
            <p class="description">
              Expertly crafted for professionals. This item features premium build quality, 
              ergonomic design, and is backed by our 2-year comprehensive warranty.
            </p>
            
            <div class="actions">
              <button class="btn-primary full" @click="addToCart(selectedProduct)">
                Add to Cart — ${{ selectedProduct.price }}
              </button>
            </div>

            <div class="features">
              <div class="feature"><i class="fas fa-shipping-fast"></i> 2-Day Shipping</div>
              <div class="feature"><i class="fas fa-shield-alt"></i> Secure Checkout</div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="currentView === 'cart'" class="page-section cart-view">
        <h2>Your Bag <span style="color:#94a3b8">({{ cart.length }})</span></h2>
        
        <div v-if="cart.length === 0" class="empty-state">
          <i class="fas fa-shopping-basket"></i>
          <p>Your cart is empty.</p>
          <button class="btn-secondary" @click="navigateTo('products')">Start Shopping</button>
        </div>
        
        <div v-else class="cart-container">
          <div class="cart-list">
            <div v-for="(item, index) in cart" :key="index" class="cart-row">
              <img :src="item.image" class="thumb">
              <div class="row-info">
                <h4>{{ item.name }}</h4>
                <span class="row-price">${{ item.price }}</span>
              </div>
            </div>
          </div>
          <div class="cart-summary">
            <h3>Summary</h3>
            <div class="sum-row"><span>Subtotal</span> <span>${{ cartTotal }}</span></div>
            <div class="sum-row"><span>Tax</span> <span>$0.00</span></div>
            <hr>
            <div class="sum-row total"><span>Total</span> <span>${{ cartTotal }}</span></div>
            <button class="btn-primary full" @click="navigateTo('checkout')">Checkout</button>
          </div>
        </div>
      </section>

      <section v-if="currentView === 'checkout'" class="page-section checkout-view">
        <div class="checkout-card">
          <div class="checkout-header">
            <h2>Secure Checkout</h2>
            <p>Complete your purchase securely.</p>
          </div>

          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" class="styled-input" required>
            </div>
            
            <div class="form-group">
              <label>Shipping Address</label>
              <input type="text" placeholder="123 Design St." class="styled-input" required>
            </div>

            <div class="form-group">
              <label>Card Details</label>
              <div class="card-input-wrapper">
                <i class="fas fa-credit-card icon"></i>
                <input 
                  v-model="cardInput" 
                  @input="formatCard" 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  maxlength="19"
                  class="styled-input with-icon"
                  required
                >
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label>Expiry</label>
                <input type="text" placeholder="MM/YY" class="styled-input" required>
              </div>
              <div class="form-group">
                <label>CVC</label>
                <input type="text" placeholder="123" class="styled-input" required>
              </div>
            </div>

            <button type="submit" class="btn-primary full mt-4">Pay ${{ cartTotal }}</button>
          </form>
        </div>
      </section>

    </main>

    <footer>
      <p>&copyright; 2026 NikeHCI. <br><span class="faded">Designed with intention.</span></p>
    </footer>

  </div>
</template>

<style>
/* --- 1. GLOBAL DESIGN TOKENS --- */
:root {
  --primary: #0f172a; /* Slate 900 */
  --accent: #3b82f6;  /* Blue 500 */
  --bg: #f8fafc;      /* Slate 50 */
  --surface: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --radius: 12px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }

/* --- 2. COMPONENTS --- */

/* Buttons */
.btn-primary {
  background: var(--primary); color: white; border: none; padding: 0.75rem 1.5rem;
  border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  font-size: 0.95rem; box-shadow: var(--shadow-md);
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); background: #1e293b; }
.btn-primary.large { padding: 1rem 2rem; font-size: 1.1rem; }
.btn-primary.full { width: 100%; }

.btn-secondary {
  background: white; border: 1px solid var(--border); padding: 0.75rem 1.5rem;
  border-radius: 8px; cursor: pointer; font-weight: 600; color: var(--text-main);
}

/* Inputs */
.styled-input {
  width: 100%; padding: 0.85rem; border: 1px solid var(--border); border-radius: 8px;
  font-size: 1rem; transition: border 0.2s; background: var(--bg);
}
.styled-input:focus { outline: none; border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
.with-icon { padding-left: 2.5rem; }

/* --- 3. LAYOUT & SECTIONS --- */

/* Navbar */
.navbar {
  position: fixed; top: 0; width: 100%; height: 70px; z-index: 1000;
  background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); /* Glassmorphism */
  border-bottom: 1px solid rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: space-between; padding: 0 5%;
}
.logo { font-weight: 800; font-size: 1.5rem; cursor: pointer; letter-spacing: -0.5px; }
.dot { color: var(--accent); }

.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-links a { text-decoration: none; color: var(--text-muted); font-weight: 500; cursor: pointer; transition: color 0.2s; }
.nav-links a:hover, .nav-links a.active { color: var(--primary); }

.cart-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; position: relative; color: var(--text-main); transition: transform 0.2s; }
.cart-btn.bump { transform: scale(1.3); color: var(--accent); }
.badge { position: absolute; top: -5px; right: -8px; background: var(--accent); color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 10px; font-weight: 700; }

.content-wrapper { padding-top: 80px; min-height: 90vh; }
.page-section { max-width: 1100px; margin: 0 auto; padding: 2rem; animation: fadeIn 0.4s ease; }

/* Hero */
.hero-section {
  display: flex; align-items: center; justify-content: space-between; max-width: 1100px;
  margin: 3rem auto; padding: 2rem;
}
.hero-content h1 { font-size: 3.5rem; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -1px; }
.highlight { color: var(--accent); }
.hero-image img { border-radius: 20px; box-shadow: var(--shadow-lg); width: 100%; max-width: 500px; }

/* Product Grid */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2.5rem; margin-top: 2rem; }
.product-card {
  background: var(--surface); border-radius: var(--radius); overflow: hidden;
  box-shadow: var(--shadow-sm); cursor: pointer; transition: all 0.3s ease; border: 1px solid transparent;
}
.product-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }

.img-wrapper { height: 220px; overflow: hidden; position: relative; }
.img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.product-card:hover img { transform: scale(1.1); } /* HCI: Zoom interaction */
.overlay {
  position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.7);
  color: white; padding: 8px; text-align: center; font-size: 0.85rem;
  transform: translateY(100%); transition: transform 0.3s;
}
.product-card:hover .overlay { transform: translateY(0); }

.card-details { padding: 1.25rem; }
.category { font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px; font-weight: 600; }
.card-details h4 { margin: 0.25rem 0; font-size: 1.1rem; }
.card-details .price { font-weight: 600; color: var(--accent); }

/* Details Page */
.product-split { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-top: 2rem; }
.product-image-large img { width: 100%; border-radius: 20px; box-shadow: var(--shadow-md); }
.tag { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
.price-display { font-size: 2rem; color: var(--primary); margin: 0.5rem 0 1.5rem; }
.features { margin-top: 2rem; display: flex; gap: 2rem; color: var(--text-muted); font-size: 0.9rem; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; font-weight: 600; }

/* Cart */
.cart-container { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
.cart-row { display: flex; align-items: center; gap: 1rem; background: white; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid var(--border); }
.thumb { width: 60px; height: 60px; border-radius: 6px; object-fit: cover; }
.cart-summary { background: white; padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border); height: fit-content; }
.sum-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--text-muted); }
.total { font-weight: 800; color: var(--primary); font-size: 1.2rem; margin-top: 1rem; border-top: 1px dashed var(--border); padding-top: 1rem; }

/* Checkout */
.checkout-view { display: flex; justify-content: center; }
.checkout-card { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: var(--shadow-lg); width: 100%; max-width: 500px; }
.checkout-header { text-align: center; margin-bottom: 2rem; }
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600; color: var(--text-main); }
.card-input-wrapper { position: relative; }
.card-input-wrapper .icon { position: absolute; left: 12px; top: 14px; color: var(--text-muted); }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.mt-4 { margin-top: 1.5rem; }

/* Footer */
footer { text-align: center; padding: 3rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: auto; }
.faded { font-size: 0.8rem; opacity: 0.7; }

/* Animations */
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Responsive */
@media (max-width: 768px) {
  .hero-section { flex-direction: column-reverse; text-align: center; }
  .product-split { grid-template-columns: 1fr; }
  .cart-container { grid-template-columns: 1fr; }
  .hero-image img { margin-bottom: 2rem; }
}
</style>