import { defineStore } from 'pinia'

export const useLaporanKeuanganMenuStore = defineStore('menu_laporan_keuangan', {
  state: () => ({
    isOpen: false
  })
})
