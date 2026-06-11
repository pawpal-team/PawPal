<template>
  <div class="w-full max-w-[1024px] mx-auto px-4">
    <div v-if="!events || events.length === 0" class="text-center py-12 text-gray-400 text-sm">
      目前沒有行程，點擊上方「+ 新增行程」來新增。
    </div>

    <template v-else>
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </template>
  </div>
</template>

<script setup>
import EventCard from './EventCard.vue'

defineProps({
  events: {
    type: Array,
    required: true,
  },
})

defineEmits(['edit', 'delete'])
</script>
