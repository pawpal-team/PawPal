<script setup>
import HospitalCard from './HospitalCard.vue'

defineProps({
  hospitals: {
    type: Array,
    required: false,
    default: () => [
      {
        id: 1,
        name: '啦啦啦動物醫院',
        isOpen: true,
        is24H: true,
        district: '某某區',
        distance: 0.4,
        businessHours: '24 小時營業',
        rating: 4.8,
        reviewCount: 326,
        isFavorite: false,
      },
      {
        id: 2,
        name: '哈哈哈寵物醫院',
        isOpen: true,
        is24H: false,
        district: '某某區',
        distance: 1.2,
        businessHours: '09:00 - 22:00',
        rating: 4.6,
        reviewCount: 215,
        isFavorite: true,
      },
      {
        id: 3,
        name: '嘿嘿動物醫院',
        isOpen: false,
        is24H: false,
        district: '某某區',
        distance: 2.5,
        businessHours: '10:00 - 18:00',
        rating: 4.2,
        reviewCount: 89,
        isFavorite: false,
      },
      {
        id: 4,
        name: '呵呵寵物醫院',
        isOpen: true,
        is24H: true,
        district: '某某區',
        distance: 3.8,
        businessHours: '24 小時營業',
        rating: 4.9,
        reviewCount: 412,
        isFavorite: true,
      },
      {
        id: 5,
        name: '喵喵喵動物醫院',
        isOpen: false,
        is24H: false,
        district: '某某區',
        distance: 4.2,
        businessHours: '08:00 - 20:00',
        rating: 4.3,
        reviewCount: 134,
        isFavorite: false,
      },
    ],
  },
})
</script>

<template>
  <div class="w-full flex flex-col bg-transparent">
    <div class="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
      <HospitalCard v-for="item in hospitals" :key="item.id" :hospital="item" />
    </div>
  </div>
</template>
