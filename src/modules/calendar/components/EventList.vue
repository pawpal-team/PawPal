<template>
  <div
    class="w-full max-w-[1024px] mx-auto px-4 mt-6 mb-4 md:mb-6 md:bg-white md:rounded-3xl md:shadow-md md:p-6"
  >
    <div class="flex items-center justify-between mt-6 mb-4 md:mb-6">
      <div class="flex items-center gap-2">
        <div
          class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-purple-100"
        >
          <img src="@/assets/icons/calendar.svg" alt="" class="w-5 h-5" />
        </div>
        <span class="text-base md:text-lg font-semibold text-gray-800">行程列表</span>
        <span class="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
          {{ events.length }} 項行程
        </span>
      </div>
      <button
        @click="$emit('add')"
        class="hover:text-[#FFA002] flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-xl px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <img src="@/assets/icons/plus.svg" alt="" class="w-3 h-3" />
        新增行程
      </button>
    </div>

    <div v-if="!events || events.length === 0" class="text-center py-12 text-gray-400 text-sm">
      目前沒有行程，點擊上方「+ 新增行程」來新增。
    </div>

    <template v-else>
      <EventCard
        v-for="event in visibleEvents"
        :key="event.id"
        :event="event"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </template>

    <button
      v-if="events.length > defaultCount"
      @click="showAll = !showAll"
      class="hover:text-[#FFA002] flex items-center justify-center gap-1 w-full mt-2 py-3 text-sm text-gray-400 transition-colors cursor-pointer"
    >
      {{ showAll ? '收起' : '查看完整行程' }}
      <img
        src="@/assets/icons/angle-down.svg"
        alt=""
        class="w-4 h-4 transition-transform duration-200"
        :class="showAll ? 'rotate-180' : ''"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import EventCard from './EventCard.vue'

const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit', 'delete', 'add'])

const defaultCount = 4
const expandedCount = 8
const showAll = ref(false)

const visibleEvents = computed(() =>
  showAll.value ? props.events.slice(0, expandedCount) : props.events.slice(0, defaultCount),
)
</script>
