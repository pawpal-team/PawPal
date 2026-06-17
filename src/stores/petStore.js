import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePetStore = defineStore('pet', () => {
  const pets = ref([
    { id: 1, name: '阿肥', image: '#' },
    { id: 2, name: '學妹', image: '#' },
    { id: 3, name: '卡比', image: '#' },
  ])
  const selectedPetId = ref(1)

  const currentPet = computed(() => pets.value.find((p) => p.id === selectedPetId.value) ?? null)

  function setSelectedPet(id) {
    selectedPetId.value = id
  }

  return { pets, selectedPetId, currentPet, setSelectedPet }
})
