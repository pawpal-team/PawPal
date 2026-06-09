import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const isOpen = ref(false)

  function toggleSidebar() {
    isOpen.value = !isOpen.value
  }

  function closeSidebar() {
    isOpen.value = false
  }

  function openSidebar() {
    isOpen.value = true
  }

  return { isOpen, toggleSidebar, closeSidebar, openSidebar }
})
