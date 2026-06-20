import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { pets as petsData } from '@/data/pets.js'

export const usePetStore = defineStore('pet', () => {
  const pets = ref(petsData)
  const selectedPetId = ref(petsData[0]?.id ?? null)

  const currentPet = computed(() => pets.value.find((p) => p.id === selectedPetId.value) ?? null)

  function setSelectedPet(id) {
    selectedPetId.value = id
  }

  return { pets, selectedPetId, currentPet, setSelectedPet }
})
