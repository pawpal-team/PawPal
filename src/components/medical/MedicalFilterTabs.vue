<script setup>
import { ref } from 'vue'

const activeTab = ref('全部')
const tabs = ['全部', '看診', '疫苗', '手術', '用藥', '體檢']
</script>

<template>
  <div
    class="flex w-full items-center gap-4 overflow-x-auto rounded-xl bg-brand-white px-5 py-4 shadow-[0_4px_18px_rgba(31,41,55,0.12)]"
  >
    <button
      v-for="tab in tabs"
      :key="tab"
      type="button"
      class="shrink-0 cursor-pointer rounded-full px-7 py-3 text-[18px] font-bold shadow-[0_3px_10px_rgba(31,41,55,0.12)] transition active:scale-95"
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
