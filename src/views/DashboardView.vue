<script setup>
import { useRouter } from 'vue-router'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div>Dashboard（施工中）</div>
  <button
    type="button"
    class="rounded-full bg-brand-orange px-5 py-2 text-white"
    @click="handleLogout"
  >
    登出
  </button>
</template>
