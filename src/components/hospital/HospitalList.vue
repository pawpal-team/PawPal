<script setup>
import { hospitals } from '@/data/hospitals.js'
import hospitalCard from '@/components/hospital/HospitalCard.vue'
</script>

<template>
  <div class="w-full flex flex-col bg-transparent">
    <div class="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
      <hospitalCard v-for="item in hospitals" :key="item.id" :hospital="item" />
    </div>
  </div>
</template>
