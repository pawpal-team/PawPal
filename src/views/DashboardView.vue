<script setup>
import { computed, ref } from 'vue'
import { calendarEvents } from '@/data/calendarEvents'
import { pets as rawPets } from '@/data/pets'
import { mockUsers } from '@/data/user'
import PetCard from '@/components/pet/PetCard.vue'
import CalendarGrid from '@/components/calendar/CalendarGrid.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import memberBanner from '@/assets/images/member_banner_dashboard.png'

const themeColors = ['green', 'orange', 'blue']

const colorMap = {
  green: 'bg-[var(--color-brand-green)] border-l-4 border-[#7BC67E]',
  orange: 'bg-[#FFF3E0] border-l-4 border-[var(--color-brand-orange)]',
  blue: 'bg-[var(--color-brand-lightblue)] border-l-4 border-[var(--color-brand-blue)]',
}

const circleBorderMap = {
  green: 'border-[#7BC67E]',
  orange: 'border-[var(--color-brand-orange)]',
  blue: 'border-[var(--color-brand-blue)]',
}

const circleFillMap = {
  green: 'bg-[#7BC67E]',
  orange: 'bg-[var(--color-brand-orange)]',
  blue: 'bg-[var(--color-brand-blue)]',
}

const dashboardPets = rawPets.map((p) => ({
  ...p,
  image: p.photoUrl ?? null,
  ageUnit: '',
}))

const isScrollable = dashboardPets.length > 5

const checkedIds = ref([])
const userName = ref(mockUsers[0]?.name ?? '使用者')

const upcomingEvents = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return calendarEvents
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3)
    .map((e) => ({
      ...e,
      theme: themeColors[(e.petId - 1) % themeColors.length],
    }))
})

function formatDate(dateStr) {
  return dateStr.replace(/-/g, ' - ')
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(':')
  const hour = parseInt(h)
  const period = hour < 12 ? 'AM' : 'PM'
  const displayHour = hour % 12 || 12
  return `${period} ${String(displayHour).padStart(2, '0')} : ${m}`
}

function toggleCheck(id) {
  checkedIds.value.includes(id)
    ? (checkedIds.value = checkedIds.value.filter((i) => i !== id))
    : checkedIds.value.push(id)
}
</script>

<template>
  <AppHeader />
  <div class="dashboard-sidebar-wrapper">
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

    <div
      class="w-full max-w-[1024px] mx-auto lg:mx-0 lg:max-w-none lg:px-8 px-4 pb-16 mt-2 md:mt-6"
    >
      <div
        class="lg:max-w-[calc(1024px_+_1.5rem_+_340px)] lg:mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-x-6 lg:gap-y-8"
      >
        <div class="lg:col-start-1 lg:row-start-1">
          <CalendarGrid />
        </div>

        <div
          class="overflow-hidden rounded-3xl border border-brand-lightblue bg-brand-white shadow-[0_8px_28px_rgba(61,74,122,0.08)] p-4"
        >
          <div class="flex items-center gap-2 mb-4">
            <span class="text-[var(--color-brand-orange)] text-xl">🔔</span>
            <h2 class="text-lg font-semibold text-[var(--color-brand-darkgray)]">近期重要提醒</h2>
          </div>

          <div class="flex flex-col gap-3">
            <div
              v-for="event in upcomingEvents"
              :key="event.id"
              class="flex items-center justify-between rounded-2xl px-6 py-4"
              :class="colorMap[event.theme]"
            >
              <div class="flex items-center gap-4">
                <div class="text-xs text-[var(--color-brand-gray)] leading-5 shrink-0">
                  <p>{{ formatDate(event.date) }}</p>
                  <p>{{ formatTime(event.time) }}</p>
                </div>
                <div class="flex flex-col gap-0.5">
                  <p class="text-sm font-semibold text-[var(--color-brand-darkgray)]">
                    {{ event.petName }}
                  </p>
                  <p class="text-sm text-[var(--color-brand-gray)]">
                    {{ event.title }}
                  </p>
                </div>
              </div>

              <button
                class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer"
                :class="[
                  circleBorderMap[event.theme],
                  checkedIds.includes(event.id) ? circleFillMap[event.theme] : 'bg-transparent',
                ]"
                @click="toggleCheck(event.id)"
                :aria-label="`標記 ${event.petName} ${event.title}`"
              />
            </div>
          </div>
        </div>

        <section class="lg:col-start-1 lg:row-start-2 lg:col-span-2 min-w-0">
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

<style scoped>
@media (min-width: 1024px) {
  .dashboard-sidebar-wrapper :deep(aside) {
    top: 68px;
    height: calc(100% - 68px);
  }
}
</style>
