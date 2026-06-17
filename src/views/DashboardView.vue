<script setup>
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <AppHeader variant="member" />
  <main class="min-h-screen pt-[55px] lg:pl-52 lg:pt-[68px]">
    <div>Dashboard（施工中）</div>
    <button
      type="button"
      class="rounded-full bg-brand-orange px-5 py-2 text-white"
      @click="handleLogout"
    >
      登出
    </button>
  </main>
</template>
