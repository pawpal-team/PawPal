<script setup>
import Header from '@/components/layout/AppHeader.vue'
import Footer from '@/components/layout/AppFooter.vue'
import ForgotPasswordForm from '@/modules/auth/ForgotPasswordForm.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <ForgotPasswordForm class="flex-1" />
    <Footer />
  </div>
</template>
