import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import ForgotPassword from '@/views/ForgotPasswordView.vue'
import Home from '@/views/HomeView.vue'
import Medical from '@/views/MedicalView.vue'
import Dashboard from '@/views/DashboardView.vue'
import Growth from '@/views/GrowthView.vue'

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
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/medical',
      name: 'Medical',
      component: Medical,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/growth',
      name: 'Growth',
      component: Growth,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return '/login'
  }

  if (to.path === '/login' && authStore.isLoggedIn) {
    return '/dashboard'
  }
})

export default router
