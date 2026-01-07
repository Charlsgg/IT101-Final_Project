import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductList
    },
    {
      path: '/product/:id', 
      name: 'details',
      component: ProductDetails,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  }
});

export default router;