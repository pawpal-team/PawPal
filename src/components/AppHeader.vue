<template>
  <header class="bg-white shadow-sm">
    <!-- 手機版 -->
    <div class="md:hidden">
      <div class="mx-auto flex h-[55px] px-4 items-center justify-between">
        <a href="#" class="items-center">
          <img src="@/assets/images/PawPal-logo_p.webp" alt="logo" class="h-10 w-auto" />
        </a>

        <button type="button" class="flex h-10 w-10 items-center justify-center">
          <img src="@/assets/icons/header-bars.svg" alt="menu" class="h-5 w-5 object-contain" />
        </button>
      </div>
    </div>

    <!-- 平板版&電腦版 -->
    <div class="mx-auto hidden h-17 max-w-5xl items-center px-4 md:flex md:justify-between">
      <a href="#" class="flex items-center">
        <img src="@/assets/images/PawPal-logo_p.webp" alt="logo" class="h-17 w-auto" />
      </a>

      <div class="flex items-center gap-5 lg:contents">
        <nav class="flex items-center gap-5 text-[#717182]">
          <a href="#" class="transition hover:text-[#FFA002]">關於我們</a>

          <div v-for="group in navGroups" :key="group.id" class="group relative">
            <button
              type="button"
              class="group flex cursor-pointer items-center gap-1 transition group-hover:text-[#FFA002]"
            >
              <span>{{ group.label }}</span>
              <img
                src="@/assets/icons/angle-arrow.svg"
                alt="angle-arrow"
                class="size-4 arrow-icon transition duration-150"
              />
            </button>

            <div
              class="invisible absolute left-0 z-50 mt-2 w-40 rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100"
            >
              <a
                v-for="item in group.items"
                :key="item.label"
                :href="item.href"
                class="block px-4 py-2 transition hover:bg-[#E9EDFC] hover:text-[#606060]"
              >
                {{ item.label }}
              </a>
            </div>
          </div>

          <a href="#" class="transition hover:text-[#FFA002]">會員專區</a>
        </nav>

        <div class="flex items-center gap-2">
          <a
            href="#"
            class="flex items-center justify-center rounded-full bg-[#FFA002] px-4 py-2 text-white transition hover:bg-[#e58f04]"
          >
            <img src="@/assets/icons/location.svg" class="size-5" />
            搜尋附近醫院
          </a>
          <a
            href="#"
            class="flex items-center justify-center px-4 py-2 text-[#717182] transition hover:text-[#606060]"
          >
            <img
              src="@/assets/icons/member.svg"
              class="member-icon size-6 transition duration-150"
              alt="member"
            />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const navGroups = [
  {
    id: 'medical',
    label: '醫療專區',
    items: [
      { label: '搜尋醫療院所', href: '#' },
      { label: '線上看診', href: '#' },
      { label: '緊急處置教學', href: '#' },
    ],
  },
  {
    id: 'knowledge',
    label: '寵物知識+',
    items: [
      { label: '經驗分享討論區', href: '#' },
      { label: '衛教文章', href: '#' },
      { label: '小知識測驗', href: '#' },
    ],
  },
]
</script>

<style scoped>
.arrow-icon {
  filter: invert(46%) sepia(8%) saturate(567%) hue-rotate(202deg) brightness(92%) contrast(88%);
}

.group:hover .arrow-icon {
  filter: invert(63%) sepia(95%) saturate(700%) hue-rotate(1deg) brightness(103%) contrast(101%);
}

.member-icon {
  filter: brightness(0) invert(47%) sepia(8%) saturate(546%) hue-rotate(202deg) brightness(91%)
    contrast(87%);
}

.member-icon:hover {
  filter: brightness(0) invert(38%) sepia(0%) saturate(1%) hue-rotate(198deg) brightness(94%)
    contrast(92%);
}
</style>
