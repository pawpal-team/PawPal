import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

function readSource(path) {
  const url = new URL(path, import.meta.url)
  return existsSync(url) ? readFileSync(url, 'utf8') : ''
}

const dashboardView = readSource('./src/views/DashboardView.vue')
const petCard = readSource('./src/components/pet/PetCard.vue')
const profileModal = readSource('./src/components/pet/PetProfileModal.vue')

test('Dashboard 點擊一般寵物卡片會開啟寵物基本資料彈窗', () => {
  assert.match(dashboardView, /PetProfileModal/)
  assert.match(dashboardView, /selectedPet/)
  assert.match(dashboardView, /openPetProfile/)
  assert.match(dashboardView, /@click="openPetProfile\(pet\)"/)
})

test('PetCard 是可點擊卡片，但新增寵物卡片不共用這個事件', () => {
  assert.match(petCard, /defineEmits\(\['click'\]\)/)
  assert.match(petCard, /@click="emit\('click'\)"/)
})

test('PetProfileModal 顯示基本資料並使用共用 BaseButton 關閉', () => {
  assert.match(profileModal, /petPhoto/)
  assert.match(profileModal, /petImage/)
  assert.match(profileModal, /BaseButton/)
  assert.match(profileModal, /pet\.weight/)
  assert.match(profileModal, /pet\.microchipNumber/)
  assert.match(profileModal, /pet\.neutered/)
  assert.match(profileModal, /pet\.bloodType/)
  assert.match(profileModal, /pet\.furColor/)
  assert.match(profileModal, /pet\.note/)
})
