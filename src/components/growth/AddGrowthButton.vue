<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer items-center gap-1 md:gap-1 rounded-full bg-brand-orange px-3 py-2 md:px-2.5 md:py-1.5 lg:px-3 lg:py-2 text-xs md:text-sm lg:text-base font-medium text-white transition hover:bg-[#ee9300] active:scale-95"
    @click="emit('click')"
  >
    <img
      class="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5"
      src="@/assets/icons/plus_w.svg"
      alt="add"
    />
    新增指標
  </button>
</template>
