import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    dark: false,
    info: {
      nama: 'apotek sehat selalu',
      alamat: 'alamat belum di isi',
      tlp: 'nomor telepon belum ada'
    }
  }),
  actions: {
    increment() {
      this.counter++
    }
  }
})
