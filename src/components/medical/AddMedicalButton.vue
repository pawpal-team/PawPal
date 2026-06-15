<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="flex cursor-pointer items-center gap-0.5 md:gap-1 rounded-full bg-[#3dba6e] px-2 py-1 md:px-2.5 md:py-1.5 lg:px-3 lg:py-2 text-xs md:text-sm lg:text-base font-medium text-white transition hover:bg-[#34a660] active:bg-[#2d9455]"
    @click="emit('click')"
  >
    <img
      class="w-2 h-2 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5"
      src="@/assets/icons/plus_w.svg"
      alt="addRecord"
    />
    新增紀錄
  </button>
</template>
