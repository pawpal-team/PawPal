<script setup>
import { ref } from 'vue'

const activeTab = ref('全部')
const tabs = ['全部', '看診', '疫苗', '手術', '用藥', '體檢']
</script>

<template>
  <div
    class="flex w-full items-center gap-2 overflow-x-auto rounded-xl bg-brand-white px-3 py-3 shadow-[0_4px_18px_rgba(31,41,55,0.12)] md:gap-4 md:px-5 md:py-4"
  >
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      class="shrink-0 cursor-pointer rounded-full px-2 py-1 text-xs font-bold shadow-[0_3px_10px_rgba(31,41,55,0.12)] transition active:scale-95 md:px-4 md:py-2 md:text-sm lg:px-7 lg:py-3 lg:text-[18px]"
      :class="
        activeTab === tab
          ? 'bg-brand-blue text-brand-white shadow-[0_8px_18px_rgba(146,168,245,0.36)]'
          : 'bg-brand-white text-brand-gray hover:text-brand-blue'
      "
      @click="activeTab = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>
