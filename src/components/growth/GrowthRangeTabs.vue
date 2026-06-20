<script setup>
import { ref } from 'vue'

const ranges = ['3 個月', '6 個月', '1 年']
const activeRange = ref('6 個月')
</script>

<template>
  <div
    class="grid w-full max-w-80 grid-cols-[repeat(auto-fit,minmax(min(100%,5rem),1fr))] gap-1 rounded-2xl bg-brand-white p-1 shadow-sm md:gap-2 md:p-2"
  >
    <button
      v-for="range in ranges"
      :key="range"
      type="button"
      class="min-w-0 cursor-pointer overflow-hidden whitespace-nowrap rounded-3xl px-2 py-1 text-sm font-bold shadow-[0_4px_12px_rgba(31,41,55,0.1)] transition active:scale-95 md:rounded-full md:px-4 md:py-2 md:text-sm"
      :class="
        activeRange === range
          ? 'bg-brand-blue text-brand-white shadow-[0_8px_18px_rgba(146,168,245,0.36)]'
          : 'bg-brand-white text-brand-gray hover:text-brand-blue'
      "
      @click="activeRange = range"
    >
      {{ range }}
    </button>
  </div>
</template>
