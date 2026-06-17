<script setup>
import { storeToRefs } from 'pinia'
import { usePetStore } from '@/stores/petStore'

const petStore = usePetStore()
const { pets, selectedPetId } = storeToRefs(petStore)
const { setSelectedPet } = petStore
</script>

<template>
  <div class="flex gap-0.5 overflow-x-auto px-1 py-2 md:gap-1 lg:gap-2">
    <button
      v-for="pet in pets"
      :key="pet.id"
      type="button"
      class="flex shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-1 transition cursor-pointer lg:hover:bg-brand-lightblue/60 active:scale-95"
      @click="setSelectedPet(pet.id)"
    >
      <div
        class="h-10 w-10 overflow-hidden rounded-full border-2 bg-brand-lightblue transition md:h-12 md:w-12 lg:h-14 lg:w-14"
        :class="
          selectedPetId === pet.id
            ? 'border-brand-orange shadow-[0_0_0_3px_rgba(255,160,2,0.25)]'
            : 'border-white'
        "
      >
        <img v-if="pet.image" :src="pet.image" :alt="pet.name" class="h-full w-full object-cover" />
      </div>
      <span
        class="text-xs md:text-sm"
        :class="selectedPetId === pet.id ? 'text-brand-orange' : 'text-brand-gray'"
      >
        {{ pet.name }}
      </span>
    </button>

    <button
      type="button"
      class="flex shrink-0 flex-col items-center gap-1 rounded-2xl px-2 py-1 transition cursor-pointer lg:hover:bg-brand-lightblue/60 active:scale-95"
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
