<script setup>
import { computed } from 'vue'
import PublicSidebar from '@/components/layout/PublicSidebar.vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import { useSidebarStore } from '@/stores/sidebar'

const props = defineProps({
  variant: {
    type: String,
    default: 'public',
    validator: (value) => ['public', 'member'].includes(value),
  },
})

const sidebarStore = useSidebarStore()

const isMemberVariant = computed(() => props.variant === 'member')

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

<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
    <!-- 手機版與平板版 -->
    <div class="lg:hidden">
      <div class="mx-auto flex h-[55px] items-center justify-between px-4">
        <router-link to="/" class="items-center">
          <img src="@/assets/images/PawPal_logo.PNG" alt="logo" class="h-10 w-auto md:h-8" />
        </router-link>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-end"
          @click="sidebarStore.toggleSidebar()"
        >
          <img src="@/assets/icons/header-bars.svg" alt="menu" class="h-5 w-5 object-contain" />
        </button>
      </div>
    </div>

    <!-- 電腦版 -->
    <div class="mx-auto hidden h-17 items-center px-4 lg:flex lg:justify-between">
      <router-link to="/" class="flex items-center">
        <img src="@/assets/images/PawPal_logo.PNG" alt="logo" class="h-12 w-auto" />
      </router-link>

      <div class="flex items-center gap-5 lg:contents">
        <nav class="flex items-center gap-5 lg:gap-16 text-brand-gray">
          <a href="#" class="transition hover:text-[#FFA002]">關於我們</a>

          <div v-for="group in navGroups" :key="group.id" class="group relative">
            <button
              type="button"
              class="group flex cursor-pointer items-center gap-1 transition group-hover:text-brand-orange"
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
                class="block px-4 py-2 transition hover:bg-brand-lightblue hover:text-brand-darkgray"
              >
                {{ item.label }}
              </a>
            </div>
          </div>

          <a href="#" class="transition hover:text-brand-orange">會員專區</a>
        </nav>

        <div class="flex items-center gap-2">
          <a
            href="#"
            class="flex items-center justify-center rounded-full bg-brand-orange px-4 py-2 text-white transition hover:bg-[#e58f04]"
          >
            <img src="@/assets/icons/location.svg" class="size-5" />
            搜尋附近醫院
          </a>
          <router-link
            to="/login"
            class="flex items-center justify-center px-4 py-2 text-brand-gray transition hover:text-brand-darkgray"
          >
            <img
              src="@/assets/icons/member.svg"
              class="member-icon size-11 transition duration-150"
              alt="member"
            />
          </router-link>
        </div>
      </div>
    </div>
  </header>

  <DashboardSidebar v-if="isMemberVariant" />

  <!-- Sidebar Overlay -->
  <div
    v-if="sidebarStore.isOpen && !isMemberVariant"
    class="fixed inset-0 z-40 bg-black/50 lg:hidden"
    @click="sidebarStore.closeSidebar()"
  />

  <!-- Sidebar -->
  <transition name="slide">
    <div
      v-if="sidebarStore.isOpen && !isMemberVariant"
      class="fixed inset-y-0 right-0 z-50 overflow-y-auto bg-white lg:hidden"
    >
      <PublicSidebar />
    </div>
  </transition>
</template>

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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
