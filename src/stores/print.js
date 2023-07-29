import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

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
    prevUrl: '',
    info: {
      nama: 'Apotik Setyawan',
      alamat: 'Jl. Hos Cokroaminoto No.56, Kebonsari Kulon, Kec. Kanigaran, Kota Probolinggo, Jawa Timur 67214'
    }

  }),
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
    },
    setInfo(val) {
      this.info = val
    },
    // get print
    getPrint(val) {
      const param = {
        params: {
          invoice: val
        }
      }
      return new Promise(resolve => {
        api.get('v1/print/print', param).then(resp => {
          this.setInfo(resp.data.info.infos)
          this.setProduks(resp.data.form.detail_transaction)
          this.setWholeForm(resp.data.form)
          resolve(resp.data)
          console.log(resp.data)
        })
      })
    }
  }
})
