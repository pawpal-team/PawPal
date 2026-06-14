<script setup>
import { computed } from 'vue'

const props = defineProps({
  record: {
    type: Object,
    default: null,
  },
})

const images = computed(() => props.record?.images ?? [])
</script>

<template>
  <article
    class="flex w-full flex-col gap-6 rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_8px_28px_rgba(31,41,55,0.08)] md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-9"
  >
    <div class="min-w-0 flex-1">
      <div class="space-y-4 md:space-y-6">
        <div v-if="props.record?.symptoms">
          <p class="font-black tracking-[0.08em] text-brand-navy md:text-lg">
            症狀：
            <span class="ml-2 font-bold tracking-normal text-brand-darkgray">
              {{ props.record?.symptoms }}
            </span>
          </p>
        </div>

        <div v-if="props.record?.diagnosis">
          <p class="font-black tracking-[0.08em] text-brand-navy md:text-lg">
            診斷：
            <span class="ml-2 font-bold tracking-normal text-brand-darkgray">
              {{ props.record?.diagnosis }}
            </span>
          </p>
        </div>

        <div v-if="props.record?.prescription">
          <p class="font-black tracking-[0.08em] text-brand-navy md:text-lg">
            處方：
            <span class="ml-2 font-bold tracking-normal text-brand-darkgray">
              {{ props.record?.prescription }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <div v-if="images.length > 0" class="flex shrink-0 items-center gap-3 overflow-x-auto md:gap-4">
      <div
        v-for="(image, index) in images"
        :key="`${props.record?.id ?? 'record'}-${index}`"
        class="h-28 w-21 overflow-hidden rounded-2xl bg-[#F5F7FB] ring-1 ring-black/5 md:h-35 md:w-27"
      >
        <img
          :src="image"
          :alt="`${props.record?.title || 'medical record'} image ${index + 1}`"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
  </article>
</template>
