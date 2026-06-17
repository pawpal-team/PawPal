<script setup>
import Header from '@/components/layout/AppHeader.vue'
import Footer from '@/components/layout/AppFooter.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[55px] lg:pt-[68px]">
    <Header />
    <LoginForm class="flex-1" />
    <Footer />
  </div>
</template>
