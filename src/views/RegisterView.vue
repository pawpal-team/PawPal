<script setup>
import Header from '@/components/layout/AppHeader.vue'
import Footer from '@/components/layout/AppFooter.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[55px] lg:pt-[68px]">
    <Header variant="public" />
    <RegisterForm class="flex-1" />
    <Footer />
  </div>
</template>
