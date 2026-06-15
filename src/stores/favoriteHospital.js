import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { hospitals } from '@/data/hospitals.js'

export const useFavoriteHospitalStore = defineStore('favoriteHospital', () => {
  const favoriteIds = ref(
    hospitals.filter((hospital) => hospital.isFavorite).map((hospital) => hospital.id),
  )

  const favorites = computed(() =>
    hospitals.filter((hospital) => favoriteIds.value.includes(hospital.id)),
  )

  function isFavorite(hospitalId) {
    return favoriteIds.value.includes(hospitalId)
  }

  function toggleFavorite(hospitalId) {
    if (isFavorite(hospitalId)) {
      favoriteIds.value = favoriteIds.value.filter((id) => id !== hospitalId)
      return
    }

    favoriteIds.value = [...favoriteIds.value, hospitalId]
  }

  return { favoriteIds, favorites, isFavorite, toggleFavorite }
})
