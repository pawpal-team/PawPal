<script>
export default {
  name: 'PetProfileCard',
  props: {
    pet: {
      type: Object,
      required: true,
    },
  },
  computed: {
    genderLabel() {
      return this.pet.gender === '公' ? '公' : '母'
    },
    neuteredLabel() {
      return this.pet.neutered ? '已結紮' : '未結紮'
    },
    weightDisplay() {
      if (!this.pet.weight) return '—'
      return `${this.pet.weight} kg`
    },
  },
}
</script>

<template>
  <div class="pet-profile-card max-w-[1024px] mx-auto px-4 flex justify-center">
    <div class="md:hidden bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex items-center gap-4 p-4 border-b border-gray-200">
        <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            v-if="pet.photoUrl"
            :src="pet.photoUrl"
            :alt="pet.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
            🐾
          </div>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-lg text-gray-800">{{ pet.name }}</span>
            <button class="text-gray-400 hover:text-orange-500 transition-colors" aria-label="編輯">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
          <p class="text-xs text-gray-500">{{ pet.breed }}・{{ pet.gender }}</p>
          <p class="text-xs text-gray-500 mt-0.5">{{ pet.age }} （{{ pet.birthday }}）</p>
        </div>
      </div>

      <div class="divide-y divide-gray-300 px-4">
        <div class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">體重</span>
          <span class="text-sm text-gray-700">{{ weightDisplay }}</span>
        </div>
        <div class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">晶片號碼</span>
          <span class="text-sm text-gray-700 break-all">{{ pet.microchipNumber || '—' }}</span>
        </div>
        <div class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">結紮狀態</span>
          <span class="text-sm text-gray-700">{{ neuteredLabel }}</span>
        </div>
        <div v-if="pet.bloodType" class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">血型</span>
          <span class="text-sm text-gray-700">{{ pet.bloodType }}</span>
        </div>
        <div v-if="pet.furColor" class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">毛色</span>
          <span class="text-sm text-gray-700">{{ pet.furColor }}</span>
        </div>
        <div v-if="pet.note" class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">備註</span>
          <span class="text-sm text-gray-700">{{ pet.note }}</span>
        </div>
      </div>
    </div>

    <div
      class="hidden md:inline-flex gap-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
    >
      <div class="flex flex-col items-start gap-2 min-w-[160px]">
        <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            v-if="pet.photoUrl"
            :src="pet.photoUrl"
            :alt="pet.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            🐾
          </div>
        </div>
        <div class="mt-2">
          <div class="flex items-center gap-2">
            <span class="text-2xl text-gray-800">{{ pet.name }}</span>
            <button class="text-gray-400 hover:text-orange-500 transition-colors" aria-label="編輯">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-0.5">{{ pet.breed }}</p>
          <p class="text-sm text-gray-500">{{ pet.gender }}</p>
          <p class="text-sm text-gray-500 mt-0.5">{{ pet.age }} （{{ pet.birthday }}）</p>
        </div>
      </div>

      <div class="flex flex-col content-start pt-2 divide-y divide-gray-300">
        <div class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">體重</span>
          <span class="text-sm text-gray-700">{{ weightDisplay }}</span>
        </div>
        <div class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">晶片號碼</span>
          <span class="text-sm text-gray-700 break-all">{{ pet.microchipNumber || '—' }}</span>
        </div>
        <div class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">結紮狀態</span>
          <span class="text-sm text-gray-700">{{ neuteredLabel }}</span>
        </div>
        <div v-if="pet.bloodType" class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">血型</span>
          <span class="text-sm text-gray-700">{{ pet.bloodType }}</span>
        </div>
        <div v-if="pet.furColor" class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">毛色</span>
          <span class="text-sm text-gray-700">{{ pet.furColor }}</span>
        </div>
        <div v-if="pet.note" class="flex items-baseline gap-2 py-2">
          <span class="text-sm text-gray-400 w-20 flex-shrink-0">備註</span>
          <span class="text-sm text-gray-700">{{ pet.note }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
