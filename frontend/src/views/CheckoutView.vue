<script setup>
import { reactive, computed, ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = inject('cart');
const clearCart = inject('clearCart');

const showConfirmModal = ref(false);

const total = computed(() => {
  return cart ? cart.reduce((sum, item) => sum + item.price, 0) : 0;
});

const form = reactive({
  email: '',
  name: '',
  address: '',
  card: '',
  expiry: '',
  cvc: ''
});

const errors = reactive({});

const validate = (field) => {
  if (field === 'email') {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    errors.email = valid ? null : "Invalid email format";
  }
  if (field === 'name') {
    const valid = form.name.length > 2;
    errors.name = valid ? null : "Name must be at least 3 chars";
  }
  if (field === 'card') {
    const valid = form.card.length === 19; 
    errors.card = valid ? null : "Incomplete number";
  }
  if (field === 'cvc') {
    const valid = form.cvc.length === 3;
    errors.cvc = valid ? null : "3 digits";
  }
};

const isFormValid = computed(() => {
  return form.email && !errors.email &&
         form.name && !errors.name &&
         form.address &&
         form.card && !errors.card &&
         form.cvc && !errors.cvc;
});

const formatCard = (e) => {
  let val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  form.card = val;
  validate('card');
};

const formatCVC = (e) => {
  let val = e.target.value.replace(/\D/g, '').slice(0, 3);
  form.cvc = val;
  validate('cvc');
};

const formatName = (e) => {
  let val = e.target.value.replace(/[0-9]/g, ''); 
  form.name = val;
  validate('name');
};

const initiateCheckout = () => {
  if (isFormValid.value) {
    showConfirmModal.value = true;
  }
};

const confirmOrder = () => {
  showConfirmModal.value = false;
  alert("Order Placed Successfully!");
  
  if (clearCart) clearCart(); 
  
  router.push('/');
};
</script>

<template>
  <section class="min-h-screen flex items-center justify-center p-4 bg-bg">
    
    <div class="bg-surface p-8 md:p-12 rounded-2xl w-full max-w-lg shadow-xl border border-border">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-black mb-2">Secure Checkout</h2>
        <p class="text-text-muted">Enter your payment details below.</p>
      </div>

      <form @submit.prevent="initiateCheckout" class="space-y-5">
        
        <div>
          <label class="block text-sm font-bold mb-2 ml-1">Email Address</label>
          <input 
            v-model="form.email" 
            @blur="validate('email')" 
            type="email" 
            placeholder="you@example.com" 
            class="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            :class="{ 
              'border-red-500 bg-red-50 text-red-900': errors.email, 
              'border-green-500 bg-green-50 text-green-900': form.email && !errors.email 
            }"
          >
          <span class="text-red-500 text-xs mt-1 block font-medium" v-if="errors.email">{{ errors.email }}</span>
        </div>
        
        <div>
          <label class="block text-sm font-bold mb-2 ml-1">Full Name</label>
          <input 
            v-model="form.name" 
            @input="formatName" 
            type="text" 
            placeholder="Jane Doe" 
            class="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            :class="{ 
              'border-red-500 bg-red-50 text-red-900': errors.name, 
              'border-green-500 bg-green-50 text-green-900': form.name && !errors.name 
            }"
          >
          <span class="text-text-muted text-xs mt-1 block" v-if="!errors.name">Numbers are not allowed.</span>
        </div>

        <div>
          <label class="block text-sm font-bold mb-2 ml-1">Address</label>
          <input v-model="form.address" type="text" class="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
        </div>

        <div>
          <label class="block text-sm font-bold mb-2 ml-1">Card Details</label>
          <input 
            :value="form.card" 
            @input="formatCard" 
            type="text" 
            placeholder="0000 0000 0000 0000" 
            maxlength="19" 
            class="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            :class="{ 
              'border-red-500 bg-red-50 text-red-900': errors.card, 
              'border-green-500 bg-green-50 text-green-900': form.card && !errors.card 
            }"
          >
          <span class="text-red-500 text-xs mt-1 block font-medium" v-if="errors.card">{{ errors.card }}</span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-bold mb-2 ml-1">Expiry</label>
            <input v-model="form.expiry" type="text" placeholder="MM/YY" maxlength="5" class="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
          </div>
          <div>
            <label class="block text-sm font-bold mb-2 ml-1">CVC</label>
            <input 
              :value="form.cvc" 
              @input="formatCVC" 
              type="text" 
              placeholder="123" 
              class="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              :class="{ 
                'border-red-500 bg-red-50 text-red-900': errors.cvc, 
                'border-green-500 bg-green-50 text-green-900': form.cvc && !errors.cvc 
              }"
            >
          </div>
        </div>

        <button 
          type="submit" 
          class="btn-primary w-full mt-6 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
          :disabled="!isFormValid"
        >
          {{ isFormValid ? `Pay ₱${total.toLocaleString()}` : 'Complete Form to Pay' }}
        </button>
      </form>
    </div>

    <div v-if="showConfirmModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[2000] p-4">
      <div class="bg-surface p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl animate-[fadeIn_0.2s_ease-out]">
        <h3 class="text-2xl font-black mb-4">Confirm Order</h3>
        <p class="text-text-muted mb-8">You are about to pay <b class="text-primary">₱{{ total.toLocaleString() }}</b>. Is this correct?</p>
        
        <div class="flex gap-4 justify-center">
          <button class="btn-secondary" @click="showConfirmModal = false">Cancel</button>
          <button class="btn-primary" @click="confirmOrder">Yes, Pay Now</button>
        </div>
      </div>
    </div>

  </section>
</template>