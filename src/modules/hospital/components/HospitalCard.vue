<script setup>
import { ref } from 'vue'

const props = defineProps({
  hospital: {
    type: Object,
    required: true,
  },
})

const isFav = ref(props.hospital.isFavorite)
const toggleFavorite = () => {
  isFav.value = !isFav.value
}

const getIconUrl = (name) => {
  return new URL(`../../../assets/icons/${name}`, import.meta.url).href
}
</script>

<template>
  <div
    class="group relative flex items-center justify-between bg-brand-white rounded-3xl p-6 border border-[#E2E8F0] shadow-[0_4px_25px_rgba(0,0,0,0.015)] transition-all duration-200 lg:hover:shadow-[0_10px_30px_rgba(146,168,245,0.12)] lg:hover:border-brand-blue/30 active:bg-[#F8FAFC] active:scale-[0.995] cursor-pointer"
  >
    <div class="flex-1 min-w-0">
      <div class="flex flex-wrap items-start justify-between sm:justify-start gap-2 mb-2.5">
        <h3
          class="font-bold text-brand-navy text-lg group-hover:text-brand-orange transition-colors duration-200 truncate max-w-[200px] sm:max-w-none"
        >
          {{ hospital.name }}
        </h3>
        <div class="flex items-center gap-1.5 shrink-0">
          <span
            v-if="hospital.isOpen"
            class="text-xs font-semibold px-3 py-0.5 rounded-full bg-brand-lightblue text-brand-blue whitespace-nowrap"
          >
            營業中
          </span>
          <span
            v-if="hospital.is24H"
            class="text-xs font-medium tracking-wider px-3 py-0.5 rounded-full bg-brand-orange text-white whitespace-nowrap"
          >
            24H
          </span>
        </div>
      </div>
      <div class="flex flex-wrap items-center text-sm text-brand-gray gap-x-2 gap-y-1 mb-2.5">
        <span class="flex items-center">
          <img
            :src="getIconUrl('pin.svg')"
            alt="位置"
            class="w-4 h-4 mr-1 object-contain opacity-80"
          />
          <span class="text-brand-gray">{{ hospital.district }}</span>
        </span>
        <span class="opacity-40">·</span>
        <span class="text-brand-gray">{{ hospital.distance }} km</span>
        <span class="opacity-40">·</span>
        <span class="flex items-center">
          <img
            :src="getIconUrl('clock.svg')"
            alt="時間"
            class="w-4 h-4 mr-1 object-contain opacity-80"
          />
          <span class="text-brand-gray">{{ hospital.businessHours }}</span>
        </span>
      </div>
      <div class="flex items-center text-sm text-brand-gray">
        <img :src="getIconUrl('star.svg')" alt="評分" class="w-4 h-4 mr-1.5 object-contain" />
        <span class="font-bold text-brand-navy mr-2">{{ hospital.rating.toFixed(1) }}</span>
        <span class="opacity-40">·</span>
        <span class="ml-2">{{ hospital.reviewCount }} 則評論</span>
      </div>
    </div>
    <div class="ml-4 flex-shrink-0">
      <button
        @click.stop="toggleFavorite"
        class="cursor-pointer p-2 rounded-full bg-transparent hover:bg-red-50 transition-all duration-200 active:scale-90"
      >
        <img
          :src="isFav ? getIconUrl('heart-filled.svg') : getIconUrl('heart-empty.svg')"
          alt="收藏按鈕"
          class="w-6 h-6 object-contain"
        />
      </button>
    </div>
  </div>
</template>
