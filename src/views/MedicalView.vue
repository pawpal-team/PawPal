<script setup>
import MedicalFilterTabs from '@/components/medical/MedicalFilterTabs.vue'
import MedicalTimeline from '@/components/medical/MedicalTimeline.vue'
import AddMedicalButton from '@/components/medical/AddMedicalButton.vue'
</script>
<template>
  <main class="w-full px-4 py-6 md:px-8 lg:px-10">
    <section class="medical-record-section mx-auto w-full">
      <div class="mb-5 flex items-center justify-between gap-4 md:mb-6">
        <h1 class="text-2xl font-bold text-brand-navy md:text-3xl">病歷紀錄</h1>
        <AddMedicalButton />
      </div>
      <div
        class="overflow-hidden rounded-[24px] border border-brand-lightblue bg-brand-white shadow-[0_8px_28px_rgba(61,74,122,0.08)]"
      >
        <div class="border-b border-brand-lightblue bg-brand-lightblue px-2 py-1 md:px-8">
          <MedicalFilterTabs />
        </div>
        <div class="py-4 md:py-6">
          <MedicalTimeline />
        </div>
      </div>
    </section>
  </main>
</template>
