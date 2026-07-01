<template>
  <button
    type="button"
    class="group flex w-full cursor-pointer items-center gap-4 rounded-[28px] border-2 border-dashed border-brand-orange/60 bg-white p-4 text-left transition hover:border-brand-orange hover:bg-brand-orange/5 active:scale-[0.99] md:max-w-[132px] md:flex-col md:items-center md:gap-3 md:px-5 md:py-6 md:text-center"
    aria-label="新增寵物"
  >
    <span
      class="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full border-2 border-dashed border-brand-orange bg-brand-orange/10 text-4xl font-light leading-none text-brand-orange transition group-hover:bg-brand-orange group-hover:text-white md:h-[88px] md:w-[88px]"
      aria-hidden="true"
    >
      +
    </span>

    <span class="min-w-0">
      <span class="block text-[18px] tracking-[0.12em] text-brand-orange md:text-[15px]">
        新增寵物
      </span>
    </span>
  </button>
</template>
