<script setup>
import Header from '@/components/layout/AppHeader.vue'
import Footer from '@/components/layout/AppFooter.vue'
import SearchBar from '@/modules/hospital/components/SearchBar.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[55px] lg:pt-[68px]">
    <Header />
    <main class="flex flex-1 justify-center bg-brand-lightblue/40 px-4 py-8 md:py-12">
      <SearchBar />
    </main>
    <Footer />
  </div>
</template>
