import { defineStore } from 'pinia'

export const usePrintStore = defineStore('print_store', {
  state: () => ({
    form: {
      nama: 'apem',
      reff: null,
      faktur: null,
      qty: null,
      kasir: null,
      supplier: null,
      customer: null,
      dokter: null
    },
    produks: [],
    prevUrl: ''

  }),
  persist: true,
  actions: {
    setUrl(url) {
      this.prevUrl = url
    },
    setProduks(val) {
      this.produks = val
    },
    setWholeForm(val) {
      this.form = val
    },
    setForm(attr, val) {
      this.form[attr] = val
    },
    resetForm() {
      // console.log(this.form)
      this.form = {}
      // console.log(this.form)
    },
    resetProducts() {
      this.produks = []
    }
  }
})
