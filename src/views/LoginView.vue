<script setup>
import { useRouter } from 'vue-router'
import Header from '@/components/layout/AppHeader.vue'
import Footer from '@/components/layout/AppFooter.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()

function handleLogin(payload) {
  const success = authStore.login(payload.email, payload.password)
  if (success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[55px] lg:pt-[68px]">
    <Header />
    <LoginForm class="flex-1" @login="handleLogin" />
    <Footer />
  </div>
</template>
