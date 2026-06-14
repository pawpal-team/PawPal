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
        <div
          class="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center"
        >
          <img
            v-if="pet.photoUrl"
            :src="pet.photoUrl"
            :alt="pet.name"
            class="w-full h-full object-cover"
          />
          <img v-else src="@/assets/icons/paw.svg" class="w-8 h-8 opacity-30" alt="寵物" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-lg text-gray-800">{{ pet.name }}</span>
            <button
              class="cursor-pointer hover:opacity-70 transition-opacity p-1"
              aria-label="編輯"
            >
              <img src="@/assets/icons/edit-icon.svg" class="w-4 h-4" alt="編輯" />
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
        <div
          class="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center"
        >
          <img
            v-if="pet.photoUrl"
            :src="pet.photoUrl"
            :alt="pet.name"
            class="w-full h-full object-cover"
          />
          <img v-else src="@/assets/icons/paw.svg" class="w-12 h-12 opacity-30" alt="寵物" />
        </div>
        <div class="mt-2">
          <div class="flex items-center gap-2">
            <span class="text-2xl text-gray-800">{{ pet.name }}</span>
            <button
              class="cursor-pointer hover:opacity-70 transition-opacity p-1"
              aria-label="編輯"
            >
              <img src="@/assets/icons/edit-icon.svg" class="w-4 h-4" alt="編輯" />
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
