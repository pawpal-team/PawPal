<script setup>
import { computed, ref } from 'vue'
import { calendarEvents } from '@/data/calendarEvents'
import PetCard from '@/modules/pet/components/PetCard.vue'
import CalendarGrid from '@/modules/calendar/components/CalendarGrid.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
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

const pets = [
  { id: 1, name: '阿肥', breed: '柴犬', age: '2', ageUnit: '歲', image: null },
  { id: 2, name: '學妹', breed: '貴賓犬', age: '2', ageUnit: '歲', image: null },
  { id: 3, name: '小白', breed: '哈士奇', age: '2', ageUnit: '歲', image: null },
]

const checkedIds = ref([])
const userName = ref('Xxx')

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

  <section class="w-full relative mt-[55px] lg:mt-[68px]">
    <img
      :src="memberBanner"
      class="w-full block min-h-[160px] object-cover object-[10%_top]"
      alt="banner"
    />
    <div class="absolute inset-0 flex items-center">
      <div class="ml-[50%] -translate-x-1/2 md:ml-[22%] md:translate-x-0 text-center md:text-left">
        <h1 class="text-lg md:text-2xl font-bold text-[var(--color-brand-navy)]">
          Hi，{{ userName }}！
        </h1>
        <p class="text-xl md:text-xl text-[var(--color-brand-gray)]">毛孩的一切都在這裡</p>
      </div>
    </div>
  </section>

  <div class="w-full max-w-[1024px] mx-auto px-4 flex flex-col gap-8 pb-16 mt-2 md:mt-6">
    <section class="flex flex-col gap-6 lg:flex-row">
      <div class="md:flex-1">
        <CalendarGrid />
      </div>

      <div class="lg:w-[340px] lg:pt-[85px]">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-[var(--color-brand-orange)] text-xl">🔔</span>
          <h2 class="text-lg font-semibold text-[var(--color-brand-darkgray)]">近期重要提醒</h2>
        </div>

        <div class="flex flex-col gap-3">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
            class="flex items-center justify-between rounded-2xl px-4 py-3"
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
    </section>

    <section>
      <div class="flex items-center gap-2 mb-4">
        <span class="text-[var(--color-brand-orange)] text-xl">🐾</span>
        <h2 class="text-lg font-semibold text-[var(--color-brand-darkgray)]">寵物健康護照</h2>
      </div>

      <div class="flex flex-col gap-3 md:flex-row md:gap-4 md:w-full">
        <PetCard
          v-for="(pet, index) in pets"
          :key="pet.id"
          :pet="pet"
          :theme="themeColors[index % themeColors.length]"
          class="md:flex-1"
        />
      </div>
    </section>
  </div>

  <AppFooter />
</template>
