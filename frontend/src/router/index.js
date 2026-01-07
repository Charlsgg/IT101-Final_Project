import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetails from '../views/ProductDetails.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/products', name: 'products', component: ProductList },
    { path: '/product/:id', name: 'details', component: ProductDetails },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/checkout', name: 'checkout', component: CheckoutView },
    { path: '/login', name: 'login', component: LoginView }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router   