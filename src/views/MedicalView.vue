<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MedicalFilterTabs from '@/components/medical/MedicalFilterTabs.vue'
import MedicalTimeline from '@/components/medical/MedicalTimeline.vue'
import AddMedicalButton from '@/components/medical/AddMedicalButton.vue'
</script>

<template>
  <div class="min-h-screen bg-brand-white">
    <div class="relative z-50">
      <AppHeader />
    </div>
    <div class="medical-dashboard-sidebar hidden lg:block">
      <DashboardSidebar />
    </div>
    <div class="relative z-0 flex min-h-screen flex-col pt-14 lg:pt-17 lg:pl-52">
      <main class="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <section class="medical-record-section mx-auto w-full">
          <div class="mb-2 flex items-center justify-between gap-4 md:mb-6">
            <h1 class="text-xl font-bold text-brand-navy md:text-2xl">病歷紀錄</h1>
            <AddMedicalButton />
          </div>
          <div
            class="overflow-hidden rounded-3xl border border-brand-lightblue bg-brand-white shadow-[0_8px_28px_rgba(61,74,122,0.08)]"
          >
            <div class="border-b border-brand-lightblue bg-brand-lightblue px-2 py-1 md:px-8">
              <MedicalFilterTabs />
            </div>
            <div class="py-3 md:py-6">
              <MedicalTimeline />
            </div>
          </div>
        </section>
      </main>
    </div>
    <AppFooter class="lg:hidden" />
  </div>
</template>

<style scoped>
.medical-dashboard-sidebar :deep(aside) {
  top: 68px;
  height: calc(100vh - 68px);
}
</style>
