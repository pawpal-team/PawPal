<template>
  <header class="bg-white shadow-sm">
    <!-- 手機版 -->
    <div class="md:hidden">
      <div class="mx-auto flex h-[55px] px-4 items-center justify-between">
        <a href="#" class="items-center">
          <img src="../assets/icons/PawPal_logo_p.webp" alt="logo" class="h-10 w-auto" />
        </a>

        <button type="button" class="flex h-10 w-10 items-center justify-center">
          <img src="../assets/images/bars-solid.png" alt="menu" class="h-5 w-5 object-contain" />
        </button>
      </div>
    </div>

    <!-- 平板版&電腦版 -->
    <div class="mx-auto hidden h-[68px] max-w-6xl items-center px-4 md:flex md:justify-between">
      <a href="#" class="flex items-center">
        <img src="../assets/icons/PawPal_logo_p.webp" alt="logo" class="h-[68px] w-auto" />
      </a>

      <div class="flex items-center gap-5 lg:contents">
        <nav class="flex items-center gap-5 text-[#717182]">
          <a href="#" class="transition hover:text-[#606060]">關於我們</a>

          <div v-for="group in navGroups" :key="group.id" class="group relative">
            <button
              type="button"
              class="flex cursor-pointer items-center gap-1 transition hover:text-[#606060]"
            >
              <span>{{ group.label }}</span>
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>

            <div
              class="invisible absolute left-0 z-50 mt-2 w-40 rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100"
            >
              <a
                v-for="item in group.items"
                :key="item.label"
                :href="item.href"
                class="block px-4 py-2 transition hover:bg-gray-50 hover:text-[#606060]"
              >
                {{ item.label }}
              </a>
            </div>
          </div>

          <a href="#" class="transition hover:text-[#606060]">會員專區</a>
        </nav>

        <div class="flex items-center gap-2">
          <a
            href="#"
            class="flex items-center justify-center rounded-full bg-[#FFA002] px-4 py-2 text-white transition hover:opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            搜尋附近醫院
          </a>
          <a
            href="#"
            class="flex items-center justify-center px-4 py-2 text-[#717182] transition hover:text-[#606060]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clip-rule="evenodd"
              />
            </svg>
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
