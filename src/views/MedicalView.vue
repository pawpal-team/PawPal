<script setup>
import { ref, computed } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MedicalFilterTabs from '@/components/medical/MedicalFilterTabs.vue'
import MedicalTimeline from '@/components/medical/MedicalTimeline.vue'
import AddMedicalButton from '@/components/medical/AddMedicalButton.vue'
import PetSwitcher from '@/components/pet/PetSwitcher.vue'
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal.vue'
import { medicalRecords as originalRecords } from '@/data/medicalRecords.js'
const mockRecords = ref([...originalRecords])

const currentTab = ref('全部')

const filteredRecords = computed(() => {
  if (currentTab.value === '全部') {
    return mockRecords.value
  }
  return mockRecords.value.filter((record) => record.type === currentTab.value)
})

const isDeleteOpen = ref(false)
const pendingDeleteRecord = ref(null)

const openDeleteConfirm = (record) => {
  pendingDeleteRecord.value = record
  isDeleteOpen.value = true
}

const executeDelete = () => {
  console.log('執行刪除，ID 為:', pendingDeleteRecord.value?.id)
  mockRecords.value = mockRecords.value.filter((r) => r.id !== pendingDeleteRecord.value.id)
  isDeleteOpen.value = false
}

const handleAddFirstRecord = () => {
  console.log('【測試】使用者點擊了立即新增第一筆紀錄')
}
</script>

<template>
  <div class="min-h-screen bg-brand-white">
    <AppHeader variant="member" />
    <div class="relative z-0 flex min-h-screen flex-col pt-14 lg:pt-17 lg:pl-52">
      <main class="min-w-0 flex-1 px-4 py-6 md:px-8 lg:px-10">
        <section class="mx-auto w-full">
          <PetSwitcher />
          <div class="mb-2 flex items-center justify-between gap-4 md:mb-6">
            <h1 class="text-xl font-bold text-brand-navy md:text-2xl">醫療紀錄</h1>
            <AddMedicalButton />
          </div>
          <div
            class="overflow-hidden rounded-3xl border border-brand-lightblue bg-brand-white shadow-[0_8px_28px_rgba(61,74,122,0.08)]"
          >
            <div class="border-b border-brand-lightblue bg-brand-lightblue px-2 py-1 md:px-8">
              <MedicalFilterTabs v-model="currentTab" />
            </div>
            <div v-if="filteredRecords.length > 0" class="py-3 md:py-6">
              <MedicalTimeline :records="filteredRecords" @delete-record="openDeleteConfirm" />
            </div>
            <div
              v-else
              class="flex flex-col items-center justify-center py-16 px-4 text-center md:py-24"
            >
              <div
                class="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-brand-blue/20 md:h-32 md:w-32"
              >
                <img
                  class="w-16 h-16 md:w-20 md:h-20 object-contain"
                  src="@/assets/icons/diagnosis_b.svg"
                  alt="無醫療紀錄"
                />
              </div>
              <h3 class="text-lg font-bold text-brand-navy md:text-xl">目前尚無醫療紀錄</h3>
              <p class="mt-2 text-xs font-medium text-brand-gray md:text-sm">
                目前此分類下還沒有任何資料，<br class="md:hidden" />快來為毛孩建立第一筆健康檔案吧！
              </p>

              <!-- 引導按鈕 -->
              <button
                type="button"
                @click="handleAddFirstRecord"
                class="mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-blue px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-blue/20 transition duration-200 hover:bg-brand-blue/90 hover:shadow-lg active:scale-95 md:px-6 md:py-3 md:text-sm"
              >
                <span class="text-base font-normal -mt-0.5">＋</span>
                立即新增第一筆紀錄
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
    <AppFooter class="lg:hidden" />
  </div>

  <DeleteConfirmModal
    :is-open="isDeleteOpen"
    title="確定刪除此病歷紀錄？"
    :item-name="pendingDeleteRecord?.title || ''"
    @close="isDeleteOpen = false"
    @confirm="executeDelete"
  />
</template>

<style scoped></style>
