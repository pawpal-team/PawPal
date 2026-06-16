<script setup>
import { ref } from 'vue'
import kabi from '@/assets/images/kabi.png'

const props = defineProps({
  pets: {
    type: Array,
    default: () => [
      { id: 1, name: '阿肥', image: kabi },
      { id: 2, name: '學妹', image: kabi },
      { id: 3, name: '卡比', image: kabi },
    ],
  },
})

// 暫時用 local state 模擬選取效果，下一階段改接 petStore
const selectedId = ref(props.pets[0]?.id ?? null)

function selectPet(id) {
  selectedId.value = id
}
</script>

<template>
  <div class="flex gap-0.5 overflow-x-auto px-1 py-2 md:gap-1 lg:gap-2">
    <button
      v-for="pet in pets"
      :key="pet.id"
      type="button"
      class="flex shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-1 transition lg:hover:bg-brand-lightblue/60 active:scale-95"
      @click="selectPet(pet.id)"
    >
      <div
        class="h-10 w-10 overflow-hidden rounded-full border-2 bg-brand-lightblue transition md:h-12 md:w-12 lg:h-14 lg:w-14"
        :class="
          selectedId === pet.id
            ? 'border-brand-orange shadow-[0_0_0_3px_rgba(255,160,2,0.25)]'
            : 'border-white'
        "
      >
        <img v-if="pet.image" :src="pet.image" :alt="pet.name" class="h-full w-full object-cover" />
      </div>
      <span
        class="text-xs md:text-sm"
        :class="selectedId === pet.id ? 'text-brand-orange' : 'text-brand-gray'"
      >
        {{ pet.name }}
      </span>
    </button>

    <button
      type="button"
      class="flex shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-1 transition lg:hover:bg-brand-lightblue/60 active:scale-95"
    >
      <div
        class="grid h-10 w-10 place-items-center rounded-full border-2 border-dashed border-brand-gray/40 text-brand-gray md:h-12 md:w-12 lg:h-14 lg:w-14"
      >
        <span class="text-xl leading-none">+</span>
      </div>
      <span class="text-xs text-brand-gray md:text-sm">新增寵物</span>
    </button>
  </div>
</template>
