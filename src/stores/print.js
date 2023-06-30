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
  actions: {
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
