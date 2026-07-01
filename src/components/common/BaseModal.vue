<script setup>
import { ref } from 'vue'

defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: '新增寵物' },
  subtitle: { type: String, default: '請填寫寵物基本資料' },
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  species: '',
  breed: '',
  gender: '',
  birthday: '',
  weight: '',
  microchip_number: '',
  neutered: false,
  blood_type: '',
  fur_color: '',
  notes: '',
  avatar_url: '',
})

const speciesOptions = ['狗', '貓', '其他']
const genderOptions = ['公', '母', '未知']

const inputClass =
  'w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-brand-darkgray placeholder-brand-gray/40 outline-none transition duration-200 hover:border-brand-blue hover:bg-brand-blue/5 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/10'

const resetForm = () => {
  form.value = {
    name: '',
    species: '',
    breed: '',
    gender: '',
    birthday: '',
    weight: '',
    microchip_number: '',
    neutered: false,
    blood_type: '',
    fur_color: '',
    notes: '',
    avatar_url: '',
  }
}

const normalizeOptionalValue = (value) => {
  if (typeof value === 'string') {
    const trimmedValue = value.trim()
    return trimmedValue === '' ? undefined : trimmedValue
  }

  return value
}

const handleClose = () => emit('close')

const handleSubmit = () => {
  const payload = {
    name: form.value.name.trim(),
    species: form.value.species.trim(),
    breed: normalizeOptionalValue(form.value.breed),
    gender: normalizeOptionalValue(form.value.gender),
    birthday: normalizeOptionalValue(form.value.birthday),
    weight: form.value.weight === '' ? undefined : Number(form.value.weight),
    microchip_number: normalizeOptionalValue(form.value.microchip_number),
    neutered: form.value.neutered,
    blood_type: normalizeOptionalValue(form.value.blood_type),
    fur_color: normalizeOptionalValue(form.value.fur_color),
    notes: normalizeOptionalValue(form.value.notes),
    avatar_url: normalizeOptionalValue(form.value.avatar_url),
  }

  emit('submit', payload)
  resetForm()
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div
        class="modal-card relative flex max-h-[90vh] w-full max-w-2xl flex-col gap-6 overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition duration-300 md:p-8"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold tracking-wide text-brand-navy">{{ title }}</h2>
            <span v-if="subtitle" class="pt-1 text-xs text-brand-gray">{{ subtitle }}</span>
          </div>

          <button
            type="button"
            class="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-lg text-brand-gray transition duration-200 hover:bg-brand-blue/20 hover:text-brand-navy active:scale-95"
            aria-label="關閉"
            @click="handleClose"
          >
            x
          </button>
        </div>

        <form class="flex min-h-0 flex-col gap-5 overflow-y-auto pr-2" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">
                寵物名稱
                <span class="font-normal text-red-600">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="請輸入寵物名稱"
                :class="inputClass"
                required
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">
                種類
                <span class="font-normal text-red-600">*</span>
              </label>
              <select v-model="form.species" :class="inputClass" required>
                <option value="" disabled>請選擇種類</option>
                <option v-for="species in speciesOptions" :key="species" :value="species">
                  {{ species }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">品種</label>
              <input
                v-model="form.breed"
                type="text"
                placeholder="例如：米克斯犬"
                :class="inputClass"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">性別</label>
              <select v-model="form.gender" :class="inputClass">
                <option value="">請選擇性別</option>
                <option v-for="gender in genderOptions" :key="gender" :value="gender">
                  {{ gender }}
                </option>
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">生日</label>
              <input v-model="form.birthday" type="date" :class="inputClass" />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">體重</label>
              <div class="relative">
                <input
                  v-model="form.weight"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="例如：12"
                  :class="`${inputClass} pr-12`"
                />
                <span
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-gray"
                >
                  kg
                </span>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">晶片號碼</label>
              <input
                v-model="form.microchip_number"
                type="text"
                placeholder="請輸入晶片號碼"
                :class="inputClass"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">血型</label>
              <input
                v-model="form.blood_type"
                type="text"
                placeholder="例如：DEA 1.1"
                :class="inputClass"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">毛色</label>
              <input
                v-model="form.fur_color"
                type="text"
                placeholder="例如：黑色"
                :class="inputClass"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-bold text-brand-navy">結紮狀態</label>
              <label
                class="flex h-full min-h-[46px] cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium text-brand-darkgray transition duration-200 hover:border-brand-blue hover:bg-brand-blue/5"
              >
                <input
                  v-model="form.neutered"
                  type="checkbox"
                  class="h-4 w-4 accent-brand-blue"
                />
                已結紮
              </label>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-base font-bold text-brand-navy">照片網址</label>
            <input
              v-model="form.avatar_url"
              type="url"
              placeholder="請輸入照片網址"
              :class="inputClass"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-base font-bold text-brand-navy">備註</label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="請輸入生活習慣、注意事項或其他備註"
              :class="`${inputClass} resize-none`"
            ></textarea>
          </div>

          <div class="mt-4 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              class="cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-500 transition duration-200 hover:bg-slate-100 hover:text-slate-700 active:scale-95"
              @click="handleClose"
            >
              取消
            </button>
            <button
              type="submit"
              class="cursor-pointer rounded-xl bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-blue/20 transition duration-200 hover:bg-[#7b94ee] hover:shadow-lg active:scale-95"
            >
              新增寵物
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .modal-card,
.fade-leave-active .modal-card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-from .modal-card,
.fade-leave-to .modal-card {
  transform: scale(0.95);
}
</style>
