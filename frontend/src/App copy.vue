<script setup>
import { ref, reactive, computed } from 'vue';

// --- STATE MANAGEMENT ---
const currentView = ref('home');
const cart = reactive([]);
const isAnimatingCart = ref(false);
const selectedProduct = ref(null);
const showConfirmModal = ref(false); // HCI: Slip Prevention
const products = reactive([
  // --- ROW 1: THE BESTSELLERS ---
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

  // --- ROW 2: VINTAGE & CLASSICS ---
  { 
    id: 5, 
    name: "Nike Air Max 97", 
    price: 175, 
    category: "Lifestyle", 
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 6, 
    name: "Nike Blazer Mid '77", 
    price: 105, 
    category: "Vintage", 
    image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/389b709e-5102-4e55-aa5d-07099b500831/blazer-mid-77-vintage-mens-shoes-nw30B2.png"
  },
  { 
    id: 7, 
    name: "Air Jordan 1 High OG", 
    price: 180, 
    category: "Basketball", 
    image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 8, 
    name: "Nike Air Huarache", 
    price: 125, 
    category: "Lifestyle", 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80"
  },
  // --- ROW 3: PERFORMANCE & SPORT ---
  { 
    id: 9, 
    name: "Nike Zoom Fly 5", 
    price: 160, 
    category: "Running", 
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 10, 
    name: "Nike Air Max 90", 
    price: 130, 
    category: "Classic", 
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 11, 
    name: "Nike Free Run 5.0", 
    price: 100, 
    category: "Running", 
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 12, 
    name: "Nike SB Chron 2", 
    price: 85, 
    category: "Skateboarding", 
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=500&q=80" 
  }
]);

// --- FORM STATE (HCI: Error Prevention) ---
const form = reactive({
  email: '',
  name: '',
  address: '',
  card: '',
  expiry: '',
  cvc: ''
});

const errors = reactive({});

// HCI Principle: Immediate Feedback
const validate = (field) => {
  if (field === 'email') {
    // Simple regex to check for @ and .
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    errors.email = valid ? null : "Invalid email format";
  }
  if (field === 'name') {
    const valid = form.name.length > 2;
    errors.name = valid ? null : "Name must be at least 3 chars";
  }
  if (field === 'card') {
    const valid = form.card.length === 19; // 16 digits + 3 spaces
    errors.card = valid ? null : "Incomplete number";
  }
  if (field === 'cvc') {
    const valid = form.cvc.length === 3;
    errors.cvc = valid ? null : "3 digits";
  }
};

// --- INPUT CONSTRAINTS (HCI: Constraints) ---
// Prevents the user from typing the wrong characters entirely
const formatCard = (e) => {
  let val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  form.card = val;
  validate('card');
};

const formatCVC = (e) => {
  let val = e.target.value.replace(/\D/g, ''); // Remove non-digits
  form.cvc = val.slice(0, 3);
  validate('cvc');
};

const formatName = (e) => {
  let val = e.target.value.replace(/[0-9]/g, ''); // Remove numbers
  form.name = val;
  validate('name');
};

// HCI Principle: Forcing Function (Button disabled if invalid)
const isFormValid = computed(() => {
  return form.email && !errors.email &&
         form.name && !errors.name &&
         form.address &&
         form.card && !errors.card &&
         form.cvc && !errors.cvc;
});

const cartTotal = computed(() => cart.reduce((total, item) => total + item.price, 0));

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

const initiateCheckout = () => {
  if (isFormValid.value) showConfirmModal.value = true;
};

const confirmOrder = () => {
  showConfirmModal.value = false;
  alert("Order Placed Successfully!");
  cart.length = 0;
  Object.keys(form).forEach(key => form[key] = ''); // Reset form
  navigateTo('home');
};
</script>

<template>
  <div class="app-container">

    <nav class="navbar">
      <div class="logo" @click="navigateTo('home')">NikeHCI<span class="dot">.</span></div>
      <div class="nav-links">
        <a @click="navigateTo('home')" :class="{ active: currentView === 'home' }">Home</a>
        <a @click="navigateTo('products')" :class="{ active: currentView === 'products' }">New Releases</a>
        
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
          <p>The latest drops.</p>
        </div>
        <div class="grid">
          <article v-for="p in products" :key="p.id" class="product-card" @click="navigateTo('details', p)">
            <div class="img-wrapper">
              <img :src="p.image" :alt="p.name">
              <div class="overlay">Quick View</div>
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
        <button class="back-btn" @click="navigateTo('products')"><i class="fas fa-arrow-left"></i> Back</button>
        
        <div class="product-split">
          <div class="product-image-large">
            <img :src="selectedProduct.image" class="detail-img">
          </div>
          <div class="product-info">
            <span class="tag">Best Seller</span>
            <h1>{{ selectedProduct.name }}</h1>
            <h2 class="price-display">${{ selectedProduct.price }}</h2>
            <p class="description">
              Expertly crafted for performance. Features Nike Air cushioning for all-day comfort 
              and premium leather overlays for durability.
            </p>
            
            <button class="btn-primary full" @click="addToCart(selectedProduct)">
              Add to Cart — ${{ selectedProduct.price }}
            </button>

            <div class="features">
              <div class="feature"><i class="fas fa-shipping-fast"></i> Free Shipping</div>
              <div class="feature"><i class="fas fa-undo"></i> 60-Day Returns</div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="currentView === 'cart'" class="page-section cart-view">
        <h2>Your Bag <span style="color:#94a3b8">({{ cart.length }})</span></h2>
        
        <div v-if="cart.length === 0" class="empty-state">
          <p>Your bag is empty.</p>
          <button class="btn-secondary" @click="navigateTo('products')">View Products</button>
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
            <div class="sum-row total"><span>Total</span> <span>${{ cartTotal }}</span></div>
            <button class="btn-primary full" @click="navigateTo('checkout')">Member Checkout</button>
          </div>
        </div>
      </section>

      <section v-if="currentView === 'checkout'" class="page-section checkout-view">
        <div class="checkout-card">
          <div class="checkout-header">
            <h2>Secure Checkout</h2>
            <p>Enter your details below.</p>
          </div>

          <form @submit.prevent="initiateCheckout">
            
            <div class="form-group">
              <label>Email Address</label>
              <input 
                v-model="form.email" 
                @blur="validate('email')" 
                type="email" 
                placeholder="you@example.com" 
                class="styled-input" 
                :class="{ 'has-error': errors.email, 'is-valid': form.email && !errors.email }"
              >
              <span class="error-msg" v-if="errors.email">{{ errors.email }}</span>
            </div>
            
            <div class="form-group">
              <label>Full Name</label>
              <input 
                v-model="form.name" 
                @input="formatName" 
                type="text" 
                placeholder="Jane Doe" 
                class="styled-input"
                :class="{ 'has-error': errors.name, 'is-valid': form.name && !errors.name }"
              >
              <span class="hint" v-if="!errors.name">Numbers are not allowed.</span>
            </div>

            <div class="form-group">
              <label>Address</label>
              <input v-model="form.address" type="text" class="styled-input">
            </div>

            <div class="form-group">
              <label>Card Details</label>
              <div class="card-input-wrapper">
                <i class="fas fa-credit-card icon"></i>
                <input 
                  :value="form.card" 
                  @input="formatCard" 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  maxlength="19"
                  class="styled-input with-icon"
                  :class="{ 'has-error': errors.card, 'is-valid': form.card && !errors.card }"
                >
              </div>
              <span class="error-msg" v-if="errors.card">{{ errors.card }}</span>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label>Expiry</label>
                <input v-model="form.expiry" type="text" placeholder="MM/YY" class="styled-input" maxlength="5">
              </div>
              
              <div class="form-group">
                <label>CVC</label>
                <input 
                  :value="form.cvc" 
                  @input="formatCVC" 
                  type="text" 
                  placeholder="123" 
                  class="styled-input"
                  :class="{ 'has-error': errors.cvc, 'is-valid': form.cvc && !errors.cvc }"
                >
              </div>
            </div>

            <button type="submit" class="btn-primary full mt-4" :disabled="!isFormValid">
              {{ isFormValid ? `Pay $${cartTotal}` : 'Complete Form to Pay' }}
            </button>
          </form>
        </div>
      </section>

    </main>

    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirm Order</h3>
        <p>You are about to pay <b>${{ cartTotal }}</b>. Is this correct?</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showConfirmModal = false">Cancel</button>
          <button class="btn-primary" @click="confirmOrder">Yes, Pay Now</button>
        </div>
      </div>
    </div>

    <footer>
      <p>&copy; 2026 NikeHCI. <br><span class="faded">Designed with intention.</span></p>
    </footer>

  </div>
</template>

<style>
/* --- GLOBAL TOKENS --- */
:root {
  --primary: #111111;
  --accent: #3b82f6;
  --success: #10b981;
  --error: #ef4444;
  --bg: #f5f5f5;
  --surface: #ffffff;
  --text-main: #111111;
  --text-muted: #757575;
  --border: #e5e5e5;
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', -apple-system, sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }

/* --- KEY LAYOUT FIX (Sticky Footer) --- */
.app-container {
  min-height: 100vh;      /* Force full height */
  display: flex;          /* Use flexbox */
  flex-direction: column; /* Stack vertically */
}

.content-wrapper {
  flex: 1;                /* Grow to fill available space */
  padding-top: 80px;      /* Clear the fixed navbar */
  width: 100%;
}

/* --- UI COMPONENTS --- */
.btn-primary {
  background: var(--primary); color: white; border: none; padding: 0.85rem 1.5rem;
  border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.2s; width: 100%;
}
.btn-primary:hover { transform: scale(1.02); opacity: 0.9; }
.btn-primary:disabled { background: #999; cursor: not-allowed; transform: none; }

.btn-secondary {
  background: white; border: 1px solid var(--border); padding: 0.75rem 1.5rem;
  border-radius: 30px; cursor: pointer; font-weight: 600;
}

.styled-input {
  width: 100%; padding: 0.85rem; border: 1px solid var(--border); border-radius: 8px;
  font-size: 1rem; transition: all 0.2s; background: var(--bg);
}

.styled-input.has-error { border-color: var(--error); background: #fff5f5; }
.styled-input.is-valid { border-color: var(--success); background: #f0fdf4; }
.error-msg { color: var(--error); font-size: 0.8rem; margin-top: 4px; display: block; }
.hint { color: var(--text-muted); font-size: 0.8rem; margin-top: 4px; display: block; }

/* --- NAVBAR --- */
.navbar {
  position: fixed; top: 0; width: 100%; height: 70px; z-index: 1000;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: space-between; padding: 0 5%;
}
.logo { font-weight: 900; font-size: 1.5rem; cursor: pointer; letter-spacing: -1px; font-style: italic; }
.dot { color: var(--accent); }

.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-links a { text-decoration: none; color: var(--text-muted); font-weight: 500; cursor: pointer; transition: color 0.2s; }
.nav-links a:hover, .nav-links a.active { color: var(--primary); }

.cart-btn { background: none; border: none; cursor: pointer; position: relative; color: var(--text-main); transition: transform 0.2s; display: flex; align-items: center; }
.cart-btn.bump { transform: scale(1.2); color: var(--accent); }
.badge { position: absolute; top: -5px; right: -8px; background: var(--text-main); color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 10px; font-weight: 700; }

/* --- PAGE SECTIONS --- */
.page-section { max-width: 1200px; margin: 0 auto; padding: 2rem; animation: fadeIn 0.4s ease; }

.hero-section {
  display: flex; align-items: center; justify-content: space-between; max-width: 1200px;
  margin: 2rem auto; padding: 2rem; gap: 2rem;
}
.hero-content h1 { font-size: 4rem; line-height: 0.95; margin-bottom: 1.5rem; font-weight: 900; letter-spacing: -2px; text-transform: uppercase; }
.highlight { color: var(--text-main); }
.hero-image img { border-radius: 20px; width: 100%; max-width: 600px; transform: rotate(-5deg); transition: transform 0.5s; }
.hero-image img:hover { transform: rotate(0deg) scale(1.05); }

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin-top: 2rem; }
.product-card { background: white; cursor: pointer; transition: all 0.3s ease; }
.product-card:hover { transform: translateY(-5px); }

.img-wrapper { height: 300px; background: #f6f6f6; position: relative; overflow: hidden; }
.img-wrapper img { width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply; }
.overlay {
  position: absolute; bottom: 0; left: 0; right: 0; background: rgba(17,17,17,0.8);
  color: white; padding: 10px; text-align: center; font-size: 0.85rem;
  transform: translateY(100%); transition: transform 0.3s;
}
.product-card:hover .overlay { transform: translateY(0); }
.card-details { padding: 1rem 0; }
.category { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
.price { font-weight: 600; }

.product-split { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; margin-top: 2rem; }
.product-image-large img { width: 100%; border-radius: 12px; }
.tag { background: #111; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
.price-display { font-size: 2rem; margin: 0.5rem 0 1.5rem; }
.features { margin-top: 2rem; display: flex; gap: 2rem; color: var(--text-muted); font-size: 0.9rem; }
.back-btn { background: none; border: none; cursor: pointer; color: var(--text-muted); margin-bottom: 1rem; display: flex; align-items: center; gap: 8px; font-weight: 600; }

.cart-container { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
.cart-row { display: flex; align-items: center; gap: 1rem; background: white; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; }
.thumb { width: 80px; height: 80px; object-fit: cover; }
.cart-summary { background: white; padding: 2rem; border-radius: 12px; height: fit-content; }
.sum-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--text-muted); }
.total { font-weight: 800; color: var(--primary); font-size: 1.2rem; margin-top: 1rem; border-top: 1px solid var(--border); padding-top: 1rem; }

.checkout-view { display: flex; justify-content: center; }
.checkout-card { background: white; padding: 3rem; border-radius: 16px; box-shadow: var(--shadow-lg); width: 100%; max-width: 550px; }
.form-group { margin-bottom: 1.5rem; }
.card-input-wrapper { position: relative; }
.card-input-wrapper .icon { position: absolute; left: 12px; top: 14px; color: var(--text-muted); }
.with-icon { padding-left: 2.5rem; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal { background: white; padding: 2rem; border-radius: 12px; max-width: 400px; text-align: center; }
.modal-actions { display: flex; gap: 1rem; margin-top: 1.5rem; justify-content: center; }

/* --- FOOTER FIX --- */
footer {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
  background: white; /* Added background so it doesn't look transparent over content */
  width: 100%;
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 768px) {
  .hero-section { flex-direction: column-reverse; text-align: center; }
  .product-split, .cart-container { grid-template-columns: 1fr; }
}
</style>