<script setup>
import Header from '@/components/layout/AppHeader.vue'
import Footer from '@/components/layout/AppFooter.vue'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[55px] lg:pt-[68px]">
    <Header variant="public" />
    <ForgotPasswordForm class="flex-1" />
    <Footer />
  </div>
</template>
