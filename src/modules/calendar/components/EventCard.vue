<template>
  <div class="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
    <div class="flex items-start gap-3">
      <!-- 日期區塊 -->
      <div class="flex flex-col items-center min-w-[44px]">
        <span class="text-sm font-semibold text-gray-800 leading-tight">
          {{ formattedMonth }}/{{ formattedDay }}
        </span>
        <span class="text-xs text-gray-400 mt-0.5">{{ weekday }}</span>
      </div>

      <!-- 類型 Icon -->
      <div
        class="flex items-center justify-center w-8 h-8 rounded-full mt-0.5 flex-shrink-0"
        :class="typeIconBg"
      >
        <img :src="typeIconSrc" alt="" class="w-4 h-4" />
      </div>

      <!-- 行程資訊 -->
      <div class="flex-1 min-w-0">
        <!-- 寵物名稱 + 行程名稱 -->
        <p class="text-sm font-semibold text-gray-900 leading-snug">
          {{ event.petName }} - {{ event.title }}
        </p>

        <!-- 時間 -->
        <div class="flex items-center gap-1 mt-1">
          <img src="@/assets/icons/clock-icon.svg" alt="" class="w-3 h-3" />
          <span class="text-xs text-gray-500">{{ event.time }}</span>
          <span v-if="event.location" class="flex items-center gap-0.5 ml-1">
            <img src="@/assets/icons/location-dot.svg" alt="" class="w-3 h-3" />
            <span class="text-xs text-gray-400">{{ event.location }}</span>
          </span>
        </div>

        <!-- 備註說明 -->
        <p v-if="event.note" class="text-xs text-gray-400 mt-1 leading-relaxed">
          {{ event.note }}
        </p>

        <!-- Tag -->
        <div class="mt-2">
          <span class="inline-block text-xs px-2 py-0.5 rounded-full font-medium" :class="tagStyle">
            {{ event.tag }}
          </span>
        </div>
      </div>

      <!-- 操作按鈕 -->
      <div class="flex flex-col gap-2 flex-shrink-0 ml-1">
        <button
          @click="$emit('edit', event)"
          class="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors p-1"
          aria-label="編輯"
        >
          <img src="@/assets/icons/edit-icon.svg" alt="編輯" class="w-4 h-4" />
        </button>
        <button
          @click="$emit('delete', event)"
          class="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1"
          aria-label="刪除"
        >
          <img src="@/assets/icons/delete-icon.svg" alt="刪除" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import checkupIcon from '@/assets/icons/checkup-icon.svg'
import vaccineIcon from '@/assets/icons/vaccine-icon.svg'
import medicineIcon from '@/assets/icons/medicine-icon.svg'
import groomingIcon from '@/assets/icons/grooming-icon.svg'
import dewormingIcon from '@/assets/icons/bugs.svg'
import defaultIcon from '@/assets/icons/default-icon.svg'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

defineEmits(['edit', 'delete'])

const WEEKDAYS = ['週日', '週一', '週二', '週三', '週四', '週五', '週六']

const dateObj = computed(() => new Date(props.event.date))
const formattedMonth = computed(() => dateObj.value.getMonth() + 1)
const formattedDay = computed(() => String(dateObj.value.getDate()).padStart(2, '0'))
const weekday = computed(() => WEEKDAYS[dateObj.value.getDay()])

const TYPE_MAP = {
  checkup: { icon: checkupIcon, bg: 'bg-purple-100' },
  vaccine: { icon: vaccineIcon, bg: 'bg-indigo-50' },
  medicine: { icon: medicineIcon, bg: 'bg-yellow-50' },
  grooming: { icon: groomingIcon, bg: 'bg-teal-100' },
  deworming: { icon: dewormingIcon, bg: 'bg-green-100' },
}

const typeIconSrc = computed(() => TYPE_MAP[props.event.type]?.icon ?? defaultIcon)
const typeIconBg = computed(() => TYPE_MAP[props.event.type]?.bg ?? 'bg-gray-100')

const TAG_STYLE_MAP = {
  回診: 'bg-purple-100 text-purple-600',
  疫苗: 'bg-indigo-50 text-blue-400',
  服藥: 'bg-yellow-50 text-yellow-500',
  美容: 'bg-teal-100   text-teal-600',
  除蟲: 'bg-green-100  text-green-600',
  用藥提醒: 'bg-red-100    text-red-500',
}

const tagStyle = computed(() => TAG_STYLE_MAP[props.event.tag] ?? 'bg-gray-100 text-gray-500')
</script>
