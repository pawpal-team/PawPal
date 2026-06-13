<script setup>
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import home from '@/assets/icons/home.svg'
import home_o from '@/assets/icons/home_o.svg'
import petIcon from '@/assets/icons/pet_gray.svg'
import petIcon_o from '@/assets/icons/pet.svg'
import location from '@/assets/icons/location_gray.svg'
import location_o from '@/assets/icons/location_o.svg'
import diagnostic from '@/assets/icons/diagnostic_gray.svg'
import diagnostic_o from '@/assets/icons/diagnostic.svg'
import growth from '@/assets/icons/pet-growth.svg'
import growth_o from '@/assets/icons/pet-growth_o.svg'
import notice from '@/assets/icons/notice.svg'
import notice_o from '@/assets/icons/notice_o.svg'
import setting from '@/assets/icons/setting.svg'
import setting_o from '@/assets/icons/setting_o.svg'

const sidebarStore = useSidebarStore()
const activeItem = ref('home')

const navItems = [
  { key: 'home', icon: home, activeIcon: home_o, label: '首頁' },
  { key: 'map', icon: location, activeIcon: location_o, label: '醫院地圖' },
  { key: 'records', icon: diagnostic, activeIcon: diagnostic_o, label: '病歷紀錄' },
  { key: 'growth', icon: growth, activeIcon: growth_o, label: '成長歷程' },
  { key: 'profile', icon: petIcon, activeIcon: petIcon_o, label: '毛孩資料' },
  { key: 'notifications', icon: notice, activeIcon: notice_o, label: '通知中心' },
  { key: 'setting', icon: setting, activeIcon: setting_o, label: '設定' },
]
</script>

<template>
  <!-- 手機版 overlay -->
  <div class="fixed inset-0 z-50 lg:hidden">
    <!-- 遮罩 -->
    <div
      class="absolute inset-0 bg-white/10 backdrop-opacity-60"
      @click="sidebarStore.closeSidebar()"
    />

    <!-- 選單本體 -->
    <aside
      class="absolute right-0 top-0 flex h-full w-80 flex-col overflow-y-auto overflow-x-hidden bg-brand-white"
    >
      <div class="flex items-center justify-end px-5 pt-5">
        <button
          type="button"
          class="grid h-9 w-9 cursor-pointer place-items-center text-brand-gray hover:text-brand-orange"
          aria-label="關閉選單"
          @click="sidebarStore.closeSidebar()"
        >
          <img src="@/assets/icons/close.svg" alt="Close Icon" class="h-4 w-4" />
        </button>
      </div>

      <nav class="flex flex-col gap-5 px-8 pt-2 pb-5">
        <section>
          <ul class="flex flex-col gap-4">
            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >關於我們</a
              >
            </li>

            <li>
              <span class="text-base font-bold tracking-wider text-brand-navy">醫療專區</span>
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >搜尋醫療院所</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >線上看診</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >緊急處置教學</a
              >
            </li>
          </ul>
        </section>

        <section>
          <ul class="flex flex-col gap-4">
            <li>
              <span class="text-base font-bold tracking-wider text-brand-navy">
                寵物知識<span class="relative -top-0.5">+</span>
              </span>
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >經驗分享討論區</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >衛教文章</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >小知識測驗</a
              >
            </li>
          </ul>
        </section>
        <section>
          <ul class="flex flex-col gap-4">
            <li>
              <span class="text-base font-bold tracking-wider text-brand-navy">會員專區</span>
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >會員主頁</a
              >
            </li>
          </ul>
        </section>

        <!-- Dashboard（新增） -->
        <section>
          <ul class="flex flex-col gap-4">
            <li>
              <span class="text-base font-bold tracking-wider text-brand-navy">寵物專區</span>
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >首頁</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >醫院地圖</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >病歷紀錄</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >寵物成長</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >寵物資料</a
              >
            </li>

            <li>
              <a
                href="#"
                class="cursor-pointer px-3 text-sm font-medium text-brand-gray active:text-brand-orange"
                >通知中心</a
              >
            </li>

            <!-- 登出 -->
            <li>
              <div
                class="flex items-center justify-center border-t border-brand-lightblue pt-[50px]"
              >
                <RouterLink
                  to="/"
                  @click="sidebarStore.closeSidebar()"
                  class="flex items-center gap-1.5 text-base font-medium text-brand-gray active:text-brand-orange"
                >
                  <img src="@/assets/icons/login.svg" alt="Logout Icon" class="h-4 w-4" />
                  登出
                </RouterLink>
              </div>
            </li>
          </ul>
        </section>
      </nav>

      <div class="px-6 pb-8">
        <button
          type="button"
          class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-orange py-4 text-base font-medium text-brand-white shadow-md transition active:bg-[#E08F00]"
        >
          <img src="@/assets/icons/search-hospital.svg" alt="Hospital Icon" class="h-5 w-5" />
          搜尋附近醫院
        </button>
      </div>
    </aside>
  </div>

  <!-- 電腦版 sidebar -->
  <aside class="hidden lg:flex fixed left-0 top-0 h-full w-50 flex-col bg-[#ECF1FD] z-40">
    <nav class="flex flex-1 flex-col py-6">
      <ul class="flex flex-col">
        <li v-for="item in navItems" :key="item.key">
          <a
            href="#"
            class="group flex items-center gap-3 px-5 py-3 text-sm font-medium hover:text-brand-orange hover:bg-[#e6eaf4]"
            :class="
              activeItem === item.key
                ? 'text-brand-orange border-l-4 border-brand-orange'
                : 'text-brand-gray'
            "
            @click.prevent="activeItem = item.key"
          >
            <img
              v-if="item.icon"
              :src="item.icon"
              class="h-5 w-5 shrink-0"
              :class="activeItem === item.key ? 'hidden' : 'block group-hover:hidden'"
            />
            <img
              v-if="item.activeIcon"
              :src="item.activeIcon"
              class="h-5 w-5 shrink-0"
              :class="activeItem === item.key ? 'block' : 'hidden group-hover:block'"
            />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
