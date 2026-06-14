<script setup>
import MedicalRecordCard from '@/components/medical/MedicalRecordCard.vue'
import { medicalRecords } from '@/data/medicalRecords.js'
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-6">
    <div class="relative w-full pb-8">
      <div
        class="absolute top-2 bottom-0 left-[7px] md:left-[148px] w-[2px] bg-brand-blue/30 z-0"
        aria-hidden="true"
      ></div>
      <div class="space-y-8">
        <div
          v-for="record in medicalRecords"
          :key="record.id"
          class="relative z-10 grid grid-cols-1 md:grid-cols-[120px_24px_1fr] md:gap-4 items-start"
        >
          <div class="hidden md:block text-right text-base font-medium text-brand-gray pt-0.5">
            {{ record.date }}
          </div>
          <div class="flex items-center gap-3 md:justify-center md:mt-1 mb-2.5 md:mb-0">
            <div
              class="w-4 h-4 shrink-0 rounded-full border-4 border-white bg-brand-blue shadow-sm"
              aria-hidden="true"
            ></div>
            <div class="md:hidden flex flex-wrap items-center gap-2 text-sm text-brand-gray">
              <span class="font-medium text-brand-gray">{{ record.date }}</span>
              <span
                class="px-1.5 py-0.5 text-xs bg-brand-blue text-brand-white rounded font-medium whitespace-nowrap"
              >
                {{ record.type }}
              </span>
              <span class="text-brand-navy font-medium truncate max-w-[150px]">
                {{ record.title }}
              </span>
            </div>
          </div>
          <div class="pl-7 md:pl-0 w-full min-w-0">
            <div class="hidden md:flex items-center gap-2 mb-3 text-base text-brand-navy">
              <span
                class="px-2 py-0.5 text-xs bg-brand-blue text-brand-white rounded font-bold whitespace-nowrap"
              >
                {{ record.type }}
              </span>
              <span class="font-bold">{{ record.hospitalName }}</span>
              <span class="opacity-40 text-brand-navy">|</span>
              <span class="text-brand-navy font-medium">{{ record.title }}</span>
            </div>
            <MedicalRecordCard :record="record" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
