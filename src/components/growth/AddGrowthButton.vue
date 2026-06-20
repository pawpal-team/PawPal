<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer items-center gap-0.5 bg-transparent border-dashed border-2 rounded-xl border-[#E8DDD4] px-2 py-1 md:gap-1 md:px-2.5 md:py-1.5 lg:px-3 lg:py-2 text-xs md:text-sm lg:text-base font-medium text-[var(--color-brand-darkgray)] transition hover:bg-brand-orange hover:text-white active:scale-95"
    @click="emit('click')"
  >
    <img
      class="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5"
      src="@/assets/icons/plus_g.svg"
      alt="add"
    />
    新增指標
  </button>
</template>
