import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/LoginView.vue'
import Home from '@/views/HomeView.vue'
import ForgotPassword from '@/views/ForgotPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
  ],
})

export default router
