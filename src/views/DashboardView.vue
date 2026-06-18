<script setup>
import { computed, ref } from 'vue'
import { calendarEvents } from '@/data/calendarEvents'
import { pets as rawPets } from '@/data/pets'
import { mockUsers } from '@/data/user'
import PetCard from '@/components/pet/PetCard.vue'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import EventList from '@/components/calendar/EventList.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import memberBanner from '@/assets/images/member_banner_dashboard.png'

const themeColors = ['green', 'orange', 'blue']

const dashboardPets = rawPets.map((p) => ({
  ...p,
  image: p.photoUrl ?? null,
  ageUnit: '',
}))

const isScrollable = dashboardPets.length > 5

const userName = ref(mockUsers[0]?.name ?? '使用者')

const upcomingEvents = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return calendarEvents
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
})
</script>

<template>
  <AppHeader />
  <div class="dashboard-sidebar-wrapper hidden lg:block">
    <DashboardSidebar />
  </div>

  <div class="lg:pl-52">
    <section class="w-full relative mt-[55px] lg:mt-[68px]">
      <img
        :src="memberBanner"
        class="w-full block min-h-[160px] object-cover object-[20%_top]"
        alt="banner"
      />
      <div class="absolute inset-0 flex items-center">
        <div
          class="ml-[50%] -translate-x-1/2 md:ml-[22%] md:translate-x-0 text-center md:text-left"
        >
          <h1 class="text-lg md:text-2xl font-bold text-[var(--color-brand-navy)]">
            Hi，{{ userName }}！
          </h1>
          <p class="text-xs md:text-sm text-[var(--color-brand-gray)]">毛孩的一切都在這裡</p>
        </div>
      </div>
    </section>

    <div class="w-full px-4 lg:px-8 pb-16 mt-2 md:mt-6">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-x-6 lg:gap-y-8">
        <CalendarGrid />

        <!-- EventList wrapper：提供 card 樣式、高度對齊 CalendarGrid、內容可捲動 -->
        <div
          class="min-h-0 min-w-0 overflow-y-auto overflow-x-hidden rounded-3xl border border-brand-lightblue bg-brand-white shadow-[0_8px_28px_rgba(61,74,122,0.08)] p-4"
        >
          <EventList
            :events="upcomingEvents"
            :compact="true"
            @edit="() => {}"
            @delete="() => {}"
            @add="() => {}"
          />
        </div>

        <section class="lg:col-span-2 min-w-0">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-[var(--color-brand-orange)] text-xl">🐾</span>
            <h2 class="text-lg font-semibold text-[var(--color-brand-darkgray)]">寵物健康護照</h2>
          </div>

          <div
            class="flex gap-3 md:gap-4"
            :class="
              isScrollable
                ? 'w-full flex-col overflow-y-auto max-h-[360px] md:flex-row md:overflow-y-hidden md:overflow-x-auto md:max-h-none pb-2'
                : 'flex-col md:flex-row md:w-full'
            "
          >
            <PetCard
              v-for="(pet, index) in dashboardPets"
              :key="pet.id"
              :pet="pet"
              :theme="themeColors[index % themeColors.length]"
              :class="isScrollable ? 'md:shrink-0 md:w-[132px]' : 'md:flex-1'"
            />
          </div>
        </section>
      </div>
    </div>
  </div>

  <AppFooter class="lg:hidden" />
</template>
